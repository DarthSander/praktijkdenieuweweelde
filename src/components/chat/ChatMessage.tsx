"use client";

import LotusIcon from "../LotusIcon";
import ChatBlogCard from "./ChatBlogCard";

type Props = {
  role: "user" | "assistant";
  content: string;
  showAvatar?: boolean;
};

type Segment =
  | { type: "text"; value: string }
  | { type: "blog"; slug: string };

const TOKEN_RE = /\[\[blog:([a-z0-9-]+)\]\]/gi;

function parseSegments(content: string): Segment[] {
  const segments: Segment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  TOKEN_RE.lastIndex = 0;
  while ((match = TOKEN_RE.exec(content)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: "text", value: content.slice(lastIndex, match.index) });
    }
    segments.push({ type: "blog", slug: match[1] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < content.length) {
    segments.push({ type: "text", value: content.slice(lastIndex) });
  }
  return segments;
}

export default function ChatMessage({ role, content, showAvatar = true }: Props) {
  const isUser = role === "user";
  const segments = parseSegments(content);

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      <div className={`flex gap-2 max-w-[88%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        {!isUser && showAvatar ? (
          <div className="w-7 h-7 rounded-full bg-[#F5F0EB] flex items-center justify-center flex-shrink-0 mt-0.5 text-[#946B66]">
            <LotusIcon className="w-4 h-4" />
          </div>
        ) : !isUser ? (
          <div className="w-7 flex-shrink-0" />
        ) : null}
        <div className="space-y-1.5 min-w-0">
          {segments.map((seg, i) => {
            if (seg.type === "text") {
              const text = seg.value.replace(/^\s+|\s+$/g, "");
              if (!text) return null;
              return (
                <div
                  key={i}
                  className={`px-3.5 py-2.5 rounded-2xl text-[14px] leading-[1.55] whitespace-pre-wrap ${
                    isUser
                      ? "bg-[#946B66] text-white rounded-tr-sm"
                      : "bg-[#F5F0EB] text-[#5E524F] rounded-tl-sm"
                  }`}
                >
                  {text}
                </div>
              );
            }
            return <ChatBlogCard key={i} slug={seg.slug} />;
          })}
        </div>
      </div>
    </div>
  );
}
