import type { NextRequest } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getSql } from "@/lib/db";

export const runtime = "nodejs";

type SubscriptionBody = {
  endpoint?: string;
  keys?: { p256dh?: string; auth?: string };
};

// Apparaat aanmelden voor pushmeldingen.
export async function POST(req: NextRequest) {
  const admin = await getAdminSession();
  if (!admin) return Response.json({ error: "Niet ingelogd" }, { status: 401 });

  let body: SubscriptionBody;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Ongeldige aanvraag" }, { status: 400 });
  }

  const endpoint = body.endpoint ?? "";
  const p256dh = body.keys?.p256dh ?? "";
  const auth = body.keys?.auth ?? "";
  if (!endpoint.startsWith("https://") || !p256dh || !auth) {
    return Response.json({ error: "Ongeldig abonnement" }, { status: 400 });
  }

  try {
    const sql = getSql();
    await sql`
      insert into push_subscriptions (endpoint, p256dh, auth, user_agent)
      values (${endpoint}, ${p256dh}, ${auth}, ${req.headers.get("user-agent")})
      on conflict (endpoint) do update set
        p256dh = excluded.p256dh,
        auth = excluded.auth,
        user_agent = excluded.user_agent
    `;
  } catch (err) {
    console.error("Push-abonnement opslaan mislukt", err);
    return Response.json({ error: "Opslaan mislukt" }, { status: 500 });
  }
  return Response.json({ ok: true });
}

// Apparaat afmelden.
export async function DELETE(req: NextRequest) {
  const admin = await getAdminSession();
  if (!admin) return Response.json({ error: "Niet ingelogd" }, { status: 401 });

  let body: SubscriptionBody;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Ongeldige aanvraag" }, { status: 400 });
  }
  if (!body.endpoint) return Response.json({ error: "Endpoint ontbreekt" }, { status: 400 });

  try {
    const sql = getSql();
    await sql`delete from push_subscriptions where endpoint = ${body.endpoint}`;
  } catch (err) {
    console.error("Push-abonnement verwijderen mislukt", err);
    return Response.json({ error: "Verwijderen mislukt" }, { status: 500 });
  }
  return Response.json({ ok: true });
}
