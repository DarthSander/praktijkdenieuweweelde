"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import ChatMessage from "./ChatMessage";
import IntakeModal from "../intake/IntakeModal";

type Msg = { role: "user" | "assistant"; content: string };

const STORAGE_KEY = "nw_chat_v1";
const CONSENT_KEY = "nw_chat_consent_v1";
const SESSION_KEY = "nw_chat_session_v1";
const BLOG_PROMPT_KEY = "nw_blog_endprompt_v1";

const WELCOME: Msg = {
  role: "assistant",
  content:
    "Hoi, ik ben de digitale assistent van Eva. Ik kan je helpen met vragen over relatietherapie, IBCT, kosten of werkwijze. Waar zit je mee?",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [intakeOpen, setIntakeOpen] = useState(false);
  const sessionIdRef = useRef<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

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
            // Voeg alleen toe als laatste assistant-bericht niet al een blog-vraag is
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
    if (!text || streaming) return;
    setInput("");
    const newMsgs: Msg[] = [...messages, { role: "user", content: text }, { role: "assistant", content: "" }];
    setMessages(newMsgs);
    setStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMsgs.slice(0, -1).filter((m) => m.content), // skip welcome with same role rule? all good
          sessionId: sessionIdRef.current,
          pageUrl: typeof window !== "undefined" ? window.location.pathname : undefined,
        }),
      });
      if (!res.ok || !res.body) throw new Error("Request failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
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
        acc += chunk;
        setMessages((prev) => {
          const copy = prev.slice();
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => {
        const copy = prev.slice();
        copy[copy.length - 1] = {
          role: "assistant",
          content: "Sorry, er ging iets mis. Probeer het zo opnieuw.",
        };
        return copy;
      });
    } finally {
      setStreaming(false);
    }
  }, [input, messages, streaming]);

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Floating bubble */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open chat"
          className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-[#946B66] hover:bg-[#7a5752] text-white shadow-lg flex items-center justify-center transition-all hover:scale-105"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          className="fixed z-50 bg-white shadow-2xl flex flex-col
                     inset-0 md:inset-auto md:bottom-5 md:right-5
                     md:w-[380px] md:h-[560px] md:rounded-2xl
                     border border-[#E8D5D2]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#F5F0EB] bg-[#946B66] text-white md:rounded-t-2xl">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-semibold leading-tight">Assistent van Eva</div>
                <div className="text-[11px] text-white/75 leading-tight">Meestal binnen 1 minuut antwoord</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Sluit chat" className="p-1 hover:bg-white/10 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 bg-white">
            {messages.map((m, i) => (
              <ChatMessage key={i} role={m.role} content={m.content} onOpenIntake={() => setIntakeOpen(true)} />
            ))}
            {streaming && messages[messages.length - 1]?.content === "" && (
              <div className="flex gap-2 mb-3">
                <div className="w-7 h-7 rounded-full bg-[#946B66] flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
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
                  Deze chat gebruikt AI (Anthropic). Je berichten worden tijdelijk verwerkt om antwoord te geven en
                  worden 30 dagen bewaard. Geen contactgegevens nodig om te chatten — deel ze pas in de vragenlijst.
                  Lees meer in de{" "}
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
                  placeholder="Typ je vraag…"
                  className="flex-1 resize-none px-3 py-2 text-sm bg-[#F5F0EB] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#C4A4A0] max-h-32"
                  disabled={streaming}
                />
                <button
                  onClick={send}
                  disabled={streaming || !input.trim()}
                  aria-label="Verstuur"
                  className="w-9 h-9 rounded-full bg-[#946B66] hover:bg-[#7a5752] disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <IntakeModal open={intakeOpen} onClose={() => setIntakeOpen(false)} />
    </>
  );
}
