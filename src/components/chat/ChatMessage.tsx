"use client";

import { Sparkles } from "lucide-react";
import ChatBlogCard from "./ChatBlogCard";

type Props = {
  role: "user" | "assistant";
  content: string;
  onOpenIntake: () => void;
};

type Segment =
  | { type: "text"; value: string }
  | { type: "blog"; slug: string }
  | { type: "cta"; key: string };

const TOKEN_RE = /\[\[(blog|cta):([a-z0-9-]+)\]\]/gi;

function parseSegments(content: string): Segment[] {
  const segments: Segment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  TOKEN_RE.lastIndex = 0;
  while ((match = TOKEN_RE.exec(content)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: "text", value: content.slice(lastIndex, match.index) });
    }
    const kind = match[1].toLowerCase();
    const value = match[2];
    if (kind === "blog") segments.push({ type: "blog", slug: value });
    else if (kind === "cta") segments.push({ type: "cta", key: value });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < content.length) {
    segments.push({ type: "text", value: content.slice(lastIndex) });
  }
  return segments;
}

export default function ChatMessage({ role, content, onOpenIntake }: Props) {
  const isUser = role === "user";
  const segments = parseSegments(content);

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div className={`flex gap-2 max-w-[85%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        {!isUser && (
          <div className="w-7 h-7 rounded-full bg-[#946B66] flex items-center justify-center flex-shrink-0 mt-0.5">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
        )}
        <div className="space-y-2 min-w-0">
          {segments.map((seg, i) => {
            if (seg.type === "text") {
              const text = seg.value.trim();
              if (!text) return null;
              return (
                <div
                  key={i}
                  className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    isUser
                      ? "bg-[#946B66] text-white rounded-tr-sm"
                      : "bg-[#F5F0EB] text-[#5E524F] rounded-tl-sm"
                  }`}
                >
                  {text}
                </div>
              );
            }
            if (seg.type === "blog") return <ChatBlogCard key={i} slug={seg.slug} />;
            if (seg.type === "cta" && seg.key === "vragenlijst") {
              return (
                <button
                  key={i}
                  onClick={onOpenIntake}
                  className="block w-full text-center px-4 py-2.5 rounded-full text-sm font-semibold btn-primary"
                >
                  Start de korte vragenlijst
                </button>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}
