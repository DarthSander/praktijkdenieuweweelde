import type { NextRequest } from "next/server";
import { IntakeSubmitError, recordSubmission } from "@/lib/intake";
import { sendIntakeSubmittedNotice } from "@/lib/intake-mail";
import { sendPushToAll } from "@/lib/push";

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
  let submissionId;
  try {
    const result = await recordSubmission(token, answers);
    invite = result.invite;
    submissionId = result.submissionId;
  } catch (err) {
    console.error("Intake-submit mislukt", err);
    const reason = err instanceof IntakeSubmitError ? err.reason : "error";
    if (reason === "error") {
      // Storing aan onze kant. Dat is geen 400: de invuller deed niets verkeerd.
      return Response.json(
        {
          error:
            "Het opslaan lukte niet aan mijn kant. Je antwoorden staan nog op deze " +
            "pagina, dus sluit hem niet. Probeer het over een paar minuten opnieuw. " +
            "Blijft het misgaan, mail me dan op info@praktijkdenieuweweelde.nl.",
        },
        { status: 503 }
      );
    }
    // Bij een token-probleem niet verklappen óf de token ooit geldig was.
    return Response.json(
      { error: "Deze link is niet (meer) geldig of het formulier is al ingevuld." },
      { status: 400 }
    );
  }

  // Twee keer melden, langs twee wegen. De mail loopt over SMTP en de
  // pushmelding over de adminapp; valt de een uit, dan blijft de ander staan.
  // Allebei best-effort: een mislukte melding mag de opslag niet ongedaan maken.
  const wie = invite.client_name
    ? `${invite.client_name} (${invite.client_email})`
    : invite.client_email;
  await Promise.allSettled([
    sendIntakeSubmittedNotice({
      name: invite.client_name,
      email: invite.client_email,
    }).catch((err) => {
      console.error("Intake-notificatie per mail mislukt", err);
      throw err;
    }),
    sendPushToAll({
      title: "Intakeformulier ingevuld",
      body: wie,
      url: `/admin/intake/${submissionId}`,
      tag: `intake-${submissionId}`,
    }).catch((err) => {
      console.error("Intake-pushmelding mislukt", err);
      throw err;
    }),
  ]);

  return Response.json({ ok: true });
}
