import type { NextRequest } from "next/server";
import { getAdminUser } from "@/lib/supabase-server";
import { createInvite } from "@/lib/intake";
import { sendIntakeMagicLink } from "@/lib/resend";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function baseUrl(req: NextRequest): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  return req.nextUrl.origin;
}

export async function POST(req: NextRequest) {
  // Alleen ingelogde admins mogen uitnodigingen maken.
  const user = await getAdminUser();
  if (!user) {
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

  try {
    const { rawToken } = await createInvite({
      name: name || null,
      email,
      createdBy: user.id,
    });
    const link = `${baseUrl(req)}/intake/${rawToken}`;
    await sendIntakeMagicLink({ toEmail: email, name: name || null, link });
    return Response.json({ ok: true, link });
  } catch (err) {
    console.error("Intake-invite mislukt", err);
    return Response.json(
      { error: "Versturen mislukt. Controleer de e-mailinstellingen." },
      { status: 500 }
    );
  }
}
