import type { NextRequest } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { createInvite } from "@/lib/intake";
import { sendIntakeMagicLink } from "@/lib/intake-mail";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function baseUrl(req: NextRequest): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  return req.nextUrl.origin;
}

export async function POST(req: NextRequest) {
  // Alleen ingelogde admins mogen uitnodigingen maken.
  const admin = await getAdminSession();
  if (!admin) {
    return Response.json({ error: "Niet ingelogd" }, { status: 401 });
  }

  let body: { name?: string; email?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Ongeldige aanvraag" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const name = (body.name ?? "").trim();
  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: "Vul een geldig e-mailadres in." }, { status: 400 });
  }

  // Twee stappen die los van elkaar kunnen mislukken. De uitnodiging aanmaken
  // raakt de database, de mail raakt de SMTP-server van Strato. Eén melding
  // voor allebei maakt onvindbaar welke van de twee het was.
  let link: string;
  try {
    const { rawToken } = await createInvite({
      name: name || null,
      email,
      createdBy: admin.email,
    });
    link = `${baseUrl(req)}/intake/${rawToken}`;
  } catch (err) {
    console.error("Intake-uitnodiging aanmaken mislukt", err);
    return Response.json(
      { error: "De uitnodiging kon niet worden opgeslagen. Probeer het zo nog eens." },
      { status: 500 }
    );
  }

  try {
    await sendIntakeMagicLink({ toEmail: email, name: name || null, link });
  } catch (err) {
    // De link bestaat en werkt. Alleen het versturen ging mis, dus geef hem
    // terug: dan kan hij met de hand verstuurd worden terwijl de mail hapert.
    console.error("Intake-mail versturen mislukt", err);
    return Response.json({ ok: true, link, mailed: false, mailError: mailReason(err) });
  }

  return Response.json({ ok: true, link, mailed: true });
}

/** Korte, leesbare reden uit een SMTP-fout, voor in de adminpagina. */
function mailReason(err: unknown): string {
  if (!(err instanceof Error)) return "Onbekende fout.";
  const extra = err as Error & { code?: string; responseCode?: number; response?: string };
  const delen = [
    extra.code,
    extra.responseCode ? `code ${extra.responseCode}` : null,
    err.message,
    extra.response,
  ].filter((d): d is string => Boolean(d));
  return [...new Set(delen)].join(" · ").slice(0, 300);
}
