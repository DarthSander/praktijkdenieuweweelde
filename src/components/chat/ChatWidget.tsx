"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X, Send } from "lucide-react";
import LotusIcon from "../LotusIcon";
import ChatMessage from "./ChatMessage";
import { useStreamingText } from "@/lib/useStreamingText";

type Msg = { role: "user" | "assistant"; content: string };

const STORAGE_KEY = "nw_chat_v1";
const CONSENT_KEY = "nw_chat_consent_v1";
const SESSION_KEY = "nw_chat_session_v1";
const BLOG_PROMPT_KEY = "nw_blog_endprompt_v1";

const WELCOME: Msg = {
  role: "assistant",
  content:
    "Hoi, ik ben Bea. Ik kan je helpen met vragen over relatietherapie, IBCT, kosten of de werkwijze van Eva. Waar zit je mee?",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const sessionIdRef = useRef<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const stream = useStreamingText(45);

  // Restore state
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(CONSENT_KEY) === "1") setHasConsent(true);
    sessionIdRef.current = localStorage.getItem(SESSION_KEY);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Msg[];
        if (Array.isArray(parsed) && parsed.length > 0) setMessages(parsed);
      } catch {
        /* ignore */
      }
    }
  }, []);

  // Persist messages
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  // Sync streamed text into the last assistant message during streaming
  useEffect(() => {
    if (!stream.isStreaming && stream.visibleText === "") return;
    setMessages((prev) => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      if (last.role !== "assistant") return prev;
      if (last.content === stream.visibleText) return prev;
      const copy = prev.slice();
      copy[copy.length - 1] = { role: "assistant", content: stream.visibleText };
      return copy;
    });
  }, [stream.visibleText, stream.isStreaming]);

  // Autoscroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  // Lock body scroll on mobile when open
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (open && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // End-of-blog detector
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isBlogPage = window.location.pathname.startsWith("/blog/");
    if (!isBlogPage) return;

    const article = document.querySelector("article");
    if (!article) return;

    const sentinel = document.createElement("div");
    sentinel.style.height = "1px";
    article.appendChild(sentinel);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const slug = window.location.pathname.split("/blog/")[1]?.replace(/\/$/, "");
          if (!slug) return;
          const promptedKey = `${BLOG_PROMPT_KEY}:${slug}`;
          if (sessionStorage.getItem(promptedKey)) return;
          sessionStorage.setItem(promptedKey, "1");
          setMessages((prev) => {
            const last = prev[prev.length - 1];
            if (last && last.role === "assistant" && last.content.includes("interessant")) return prev;
            return [
              ...prev,
              {
                role: "assistant",
                content:
                  "Ik zag dat je het artikel uitgelezen hebt. Was het interessant, of is er iets dat ik nog kan verduidelijken?",
              },
            ];
          });
          setOpen(true);
        });
      },
      { rootMargin: "0px 0px -100px 0px" }
    );
    observer.observe(sentinel);
    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  const acceptConsent = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, "1");
    setHasConsent(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || stream.isStreaming) return;
    setInput("");

    const newMsgs: Msg[] = [
      ...messages,
      { role: "user", content: text },
      { role: "assistant", content: "" },
    ];
    setMessages(newMsgs);
    stream.start();

    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMsgs.slice(0, -1).filter((m) => m.content),
          sessionId: sessionIdRef.current,
          pageUrl: typeof window !== "undefined" ? window.location.pathname : undefined,
        }),
        signal: ctrl.signal,
      });
      if (!res.ok || !res.body) throw new Error("Request failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let sessionParsed = false;
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        let chunk = decoder.decode(value, { stream: true });
        if (!sessionParsed && chunk.startsWith("__session__:")) {
          const newlineIdx = chunk.indexOf("\n");
          const sid = chunk.slice("__session__:".length, newlineIdx).trim();
          if (sid) {
            sessionIdRef.current = sid;
            localStorage.setItem(SESSION_KEY, sid);
          }
          chunk = chunk.slice(newlineIdx + 1);
          sessionParsed = true;
        }
        if (chunk) stream.push(chunk);
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      console.error(err);
      stream.push("Sorry, er ging iets mis. Probeer het zo opnieuw.");
    } finally {
      stream.finish();
    }
  }, [input, messages, stream]);

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const lastIsAssistantEmpty =
    messages.length > 0 &&
    messages[messages.length - 1].role === "assistant" &&
    messages[messages.length - 1].content === "" &&
    stream.isStreaming;

  return (
    <>
      {/* Floating bubble */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open chat met Bea"
          className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-[#946B66] hover:bg-[#7a5752] text-white shadow-[0_8px_24px_rgba(148,107,102,0.35)] flex items-center justify-center transition-all hover:scale-105"
        >
          <LotusIcon className="w-7 h-7" />
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          className="fixed z-50 bg-white shadow-2xl flex flex-col
                     inset-0 md:inset-auto md:bottom-5 md:right-5
                     md:w-[400px] md:h-[600px] md:rounded-2xl
                     md:border md:border-[#EDE6DD]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-[#F5F0EB] md:rounded-t-2xl">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#F5F0EB] flex items-center justify-center text-[#946B66]">
                <LotusIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[15px] font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] leading-tight">
                  Bea
                </div>
                <div className="text-[11px] text-[#B0ADAB] leading-tight">de Nieuwe Weelde · online</div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Sluit chat"
              className="p-1.5 hover:bg-[#F5F0EB] rounded-full text-[#5E524F] transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 bg-white">
            {messages.map((m, i) => {
              const isLast = i === messages.length - 1;
              // Hide the empty assistant placeholder used as streaming sync target —
              // the typing indicator below already shows its own avatar.
              if (isLast && m.role === "assistant" && m.content === "" && stream.isStreaming) {
                return null;
              }
              const prev = messages[i - 1];
              const showAvatar = !prev || prev.role !== m.role;
              return <ChatMessage key={i} role={m.role} content={m.content} showAvatar={showAvatar} />;
            })}
            {lastIsAssistantEmpty && (
              <div className="flex gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-[#F5F0EB] flex items-center justify-center flex-shrink-0 text-[#946B66]">
                  <LotusIcon className="w-4 h-4" />
                </div>
                <div className="px-3.5 py-3 rounded-2xl bg-[#F5F0EB] flex gap-1">
                  <span className="w-1.5 h-1.5 bg-[#C4A4A0] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-[#C4A4A0] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-[#C4A4A0] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
          </div>

          {/* Input + consent */}
          <div className="border-t border-[#F5F0EB] p-3 bg-white md:rounded-b-2xl">
            {!hasConsent ? (
              <div className="text-xs text-[#5E524F] leading-relaxed space-y-2">
                <p>
                  Bea wordt aangedreven door AI (Anthropic). Je berichten worden tijdelijk verwerkt en maximaal
                  30 dagen bewaard. Je hoeft geen contactgegevens te delen om te chatten. Lees meer in de{" "}
                  <a href="/privacyverklaring" className="text-[#946B66] underline">
                    privacyverklaring
                  </a>
                  .
                </p>
                <button onClick={acceptConsent} className="w-full py-2 rounded-full text-sm font-semibold btn-primary">
                  Akkoord, start chat
                </button>
              </div>
            ) : (
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  rows={1}
                  placeholder="Stel je vraag aan Bea…"
                  className="flex-1 resize-none px-3.5 py-2.5 text-sm bg-[#F5F0EB] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#C4A4A0] max-h-32 placeholder:text-[#B0ADAB]"
                  disabled={stream.isStreaming}
                />
                <button
                  onClick={send}
                  disabled={stream.isStreaming || !input.trim()}
                  aria-label="Verstuur"
                  className="w-10 h-10 rounded-full bg-[#946B66] hover:bg-[#7a5752] disabled:opacity-30 disabled:cursor-not-allowed text-white flex items-center justify-center transition flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
