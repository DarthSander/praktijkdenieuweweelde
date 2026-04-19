import Anthropic from "@anthropic-ai/sdk";
import type { NextRequest } from "next/server";
import { buildIntakeSystemPrompt } from "@/lib/site-knowledge";

export const runtime = "nodejs";
export const maxDuration = 60;

type Step = {
  question: string;
  answer: string;
};

const MAX_ANSWER_LEN = 600;

function sanitize(text: string): string {
  return text
    .replace(/[\w.+-]+@[\w-]+\.[\w.-]+/g, "[email]")
    .replace(/(\+?\d[\d\s\-()]{7,}\d)/g, "[telefoon]")
    .slice(0, MAX_ANSWER_LEN);
}

export async function POST(req: NextRequest) {
  let body: {
    aloneOrCouple?: "alleen" | "samen";
    gender?: string;
    problem?: string;
    history?: Step[];
    mode?: "next-question" | "summary";
  };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: "ANTHROPIC_API_KEY ontbreekt" }, { status: 500 });
  }

  const aloneOrCouple = body.aloneOrCouple === "samen" ? "samen" : "alleen";
  const gender = (body.gender ?? "").slice(0, 50);
  const problem = (body.problem ?? "").slice(0, 80);
  const history: Step[] = (body.history ?? [])
    .slice(0, 5)
    .map((s) => ({
      question: String(s.question ?? "").slice(0, 400),
      answer: sanitize(String(s.answer ?? "")),
    }));
  const mode = body.mode === "summary" ? "summary" : "next-question";

  const context = [
    `Doet de invuller dit alleen of samen: ${aloneOrCouple}`,
    gender ? `Geslacht: ${gender}` : null,
    problem ? `Hoofdprobleem (chip-keuze): ${problem}` : null,
    history.length > 0
      ? "Wat tot nu toe is besproken:\n" +
        history
          .map((s, i) => `Vraag ${i + 1}: ${s.question}\nAntwoord ${i + 1}: ${s.answer}`)
          .join("\n\n")
      : null,
  ]
    .filter(Boolean)
    .join("\n\n");

  const userInstruction =
    mode === "summary"
      ? `Geef nu een warme samenvatting in maximaal 3 zinnen voor de gebruiker. Eindig met: "Zal ik je nu naar de agenda brengen om een gratis kennismaking met Eva in te plannen?" Geen vragen meer stellen.`
      : `Stel ÉÉN warme, persoonlijke vervolgvraag (max 2 zinnen erkenning + 1 vraag). Geen IBCT-jargon. Geen advies. Alleen de tekst, geen aanhef.`;

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = await anthropic.messages.stream({
          model: "claude-sonnet-4-6",
          max_tokens: 400,
          system: [
            {
              type: "text",
              text: buildIntakeSystemPrompt(),
              cache_control: { type: "ephemeral" },
            },
          ],
          messages: [
            {
              role: "user",
              content: `${context}\n\n---\n${userInstruction}`,
            },
          ],
        });

        for await (const event of response) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch (err) {
        console.error("Anthropic intake stream error", err);
        controller.enqueue(encoder.encode("\n_Er ging iets mis._"));
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
