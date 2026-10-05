import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  createSessionToken,
  verifyCredentials,
} from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: { email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Ongeldige aanvraag" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email : "";
  const password = typeof body.password === "string" ? body.password : "";

  let ok = false;
  try {
    ok = Boolean(email && password) && (await verifyCredentials(email, password));
  } catch (err) {
    console.error("Login-controle mislukt", err);
  }

  if (!ok) {
    // Kleine vertraging maakt raden van wachtwoorden trager.
    await new Promise((r) => setTimeout(r, 800));
    return Response.json(
      { error: "Inloggen mislukt. Controleer je gegevens." },
      { status: 401 }
    );
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, createSessionToken(email.trim().toLowerCase()), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  return Response.json({ ok: true });
}
