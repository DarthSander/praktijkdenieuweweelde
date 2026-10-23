// Storingen van het chatvenster vastleggen. De bezoeker krijgt een rustige
// melding te zien; de reden hoort in de admin, anders blijft het gissen.
import { getSql } from "@/lib/db";

type ApiFout = { status?: number; error?: { error?: { type?: string } } };

/** Haalt de bruikbare brokken uit een fout van de Anthropic-SDK. */
export function chatFoutDetails(err: unknown): {
  status: number | null;
  code: string | null;
  message: string;
} {
  const api = err as ApiFout;
  return {
    status: typeof api?.status === "number" ? api.status : null,
    code: api?.error?.error?.type ?? null,
    message: err instanceof Error ? err.message.slice(0, 500) : String(err).slice(0, 500),
  };
}

/** Best-effort: een mislukte registratie mag het gesprek niet raken. */
export async function logChatFout(err: unknown): Promise<void> {
  const { status, code, message } = chatFoutDetails(err);
  try {
    const sql = getSql();
    await sql`
      insert into chat_errors (status, code, message)
      values (${status}, ${code}, ${message})
    `;
  } catch (dbErr) {
    console.error("Chatstoring vastleggen mislukt", dbErr);
  }
}
