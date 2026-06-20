import type { NextRequest } from "next/server";
import { recordSubmission } from "@/lib/intake";
import { sendIntakeSubmittedNotice } from "@/lib/resend";

export const runtime = "nodejs";

const MAX_ANSWERS_BYTES = 50_000;

export async function POST(req: NextRequest) {
  let body: { token?: string; answers?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Ongeldige aanvraag" }, { status: 400 });
  }

  const token = typeof body.token === "string" ? body.token : "";
  const answers =
    body.answers && typeof body.answers === "object" && !Array.isArray(body.answers)
      ? body.answers
      : null;

  if (!token || !answers) {
    return Response.json({ error: "Ontbrekende gegevens" }, { status: 400 });
  }
  if (JSON.stringify(answers).length > MAX_ANSWERS_BYTES) {
    return Response.json({ error: "Antwoorden te groot" }, { status: 413 });
  }

  let invite;
  try {
    const result = await recordSubmission(token, answers);
    invite = result.invite;
  } catch (err) {
    console.error("Intake-submit mislukt", err);
    // Niet verklappen óf de token ooit geldig was.
    return Response.json(
      { error: "Deze link is niet (meer) geldig of het formulier is al ingevuld." },
      { status: 400 }
    );
  }

  // Notificatie aan Eva is best-effort — een mislukte mail mag de opslag niet ongedaan maken.
  try {
    await sendIntakeSubmittedNotice({
      name: invite.client_name,
      email: invite.client_email,
    });
  } catch (err) {
    console.error("Intake-notificatie mislukt", err);
  }

  return Response.json({ ok: true });
}
