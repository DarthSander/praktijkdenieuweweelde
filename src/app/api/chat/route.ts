import Anthropic from "@anthropic-ai/sdk";
import type { NextRequest } from "next/server";
import { buildChatSystemPrompt } from "@/lib/site-knowledge";
import { getSql } from "@/lib/db";

export const runtime = "nodejs";
export const maxDuration = 60;

type ChatRole = "user" | "assistant";
type ChatMessage = { role: ChatRole; content: string };

const MAX_MESSAGES = 30;
const MAX_CONTENT_LEN = 2000;

function sanitize(text: string): string {
  // Strip e-mails en telefoonnummers vóór ze naar Anthropic gaan.
  return text
    .replace(/[\w.+-]+@[\w-]+\.[\w.-]+/g, "[email]")
    .replace(/(\+?\d[\d\s\-()]{7,}\d)/g, "[telefoonnummer]")
    .slice(0, MAX_CONTENT_LEN);
}

export async function POST(req: NextRequest) {
  let body: { messages?: ChatMessage[]; sessionId?: string; pageUrl?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const messages = (body.messages ?? [])
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: sanitize(m.content) }));

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return Response.json({ error: "Last message must be from user" }, { status: 400 });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: "ANTHROPIC_API_KEY ontbreekt" }, { status: 500 });
  }

  // Session bijhouden (best-effort, faalt stil)
  let sessionId = body.sessionId;
  let sql: ReturnType<typeof getSql> | null = null;
  try {
    sql = getSql();
    if (!sessionId) {
      const rows = (await sql`
        insert into chat_sessions (page_url, user_agent)
        values (${body.pageUrl ?? null}, ${req.headers.get("user-agent") ?? null})
        returning id
      `) as { id: string }[];
      sessionId = rows[0]?.id ?? undefined;
    }
    if (sessionId) {
      const lastUser = messages[messages.length - 1];
      await sql`
        insert into chat_messages (session_id, role, content)
        values (${sessionId}, 'user', ${lastUser.content})
      `;
    }
  } catch (err) {
    console.error("Chat-sessie loggen mislukt", err);
    sql = null;
  }

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const systemPrompt = buildChatSystemPrompt();

  const encoder = new TextEncoder();
  let assistantText = "";

  const stream = new ReadableStream({
    async start(controller) {
      // Stuur sessionId als eerste event
      if (sessionId) {
        controller.enqueue(encoder.encode(`__session__:${sessionId}\n`));
      }

      try {
        const response = await anthropic.messages.stream({
          model: "claude-sonnet-4-6",
          max_tokens: 1024,
          system: [
            {
              type: "text",
              text: systemPrompt,
              cache_control: { type: "ephemeral" },
            },
          ],
          messages,
        });

        for await (const event of response) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            const chunk = event.delta.text;
            assistantText += chunk;
            controller.enqueue(encoder.encode(chunk));
          }
        }

        // Log assistant antwoord
        if (sql && sessionId && assistantText) {
          try {
            await sql`
              insert into chat_messages (session_id, role, content)
              values (${sessionId}, 'assistant', ${assistantText})
            `;
          } catch (err) {
            console.error("Chat-antwoord loggen mislukt", err);
          }
        }
      } catch (err) {
        console.error("Anthropic stream error", err);
        controller.enqueue(
          encoder.encode("\n\n_Er ging iets mis. Probeer het zo opnieuw._")
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
