import Anthropic from "@anthropic-ai/sdk";
import { getAdminSession } from "@/lib/auth";
import { chatFoutDetails } from "@/lib/chat-log";
import { CHAT_MODEL, CHAT_OUTPUT_CONFIG } from "@/lib/chat-model";

export const runtime = "nodejs";

/**
 * Stuurt één klein bericht naar Anthropic, met hetzelfde model als het
 * chatvenster zelf. Zo weet je binnen tien seconden of een nieuwe sleutel
 * goed staat, zonder op de site te gaan chatten.
 */
export async function POST() {
  const admin = await getAdminSession();
  if (!admin) {
    return Response.json({ error: "Niet ingelogd" }, { status: 401 });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({
      ok: false,
      status: null,
      code: "geen_sleutel",
      message:
        "ANTHROPIC_API_KEY staat niet in deze omgeving. Zet hem in Vercel bij Environment Variables voor Production en rol daarna opnieuw uit.",
    });
  }

  const begin = Date.now();
  try {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const bericht = await anthropic.messages.create({
      model: CHAT_MODEL,
      max_tokens: 64,
      output_config: CHAT_OUTPUT_CONFIG,
      messages: [{ role: "user", content: "Antwoord met het woord: werkt" }],
    });
    const tekst = bericht.content
      .map((blok) => (blok.type === "text" ? blok.text : ""))
      .join("")
      .trim();
    return Response.json({
      ok: true,
      ms: Date.now() - begin,
      model: bericht.model,
      antwoord: tekst.slice(0, 80),
    });
  } catch (err) {
    console.error("Chattest mislukt", err);
    return Response.json({ ok: false, ms: Date.now() - begin, ...chatFoutDetails(err) });
  }
}
