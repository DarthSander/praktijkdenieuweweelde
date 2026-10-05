import type { NextRequest } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getSql } from "@/lib/db";

export const runtime = "nodejs";

// Archiveren / terugzetten van een inzending (status wijzigen).
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdminSession();
  if (!admin) return Response.json({ error: "Niet ingelogd" }, { status: 401 });

  const { id } = await params;
  let body: { action?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Ongeldige aanvraag" }, { status: 400 });
  }

  const status =
    body.action === "archive"
      ? "archived"
      : body.action === "unarchive"
        ? "submitted"
        : null;
  if (!status) {
    return Response.json({ error: "Onbekende actie" }, { status: 400 });
  }

  try {
    const sql = getSql();
    await sql`update intake_submissions set status = ${status} where id = ${id}`;
  } catch (err) {
    console.error("Archiveren mislukt", err);
    return Response.json({ error: "Bijwerken mislukt" }, { status: 500 });
  }
  return Response.json({ ok: true, status });
}

// Definitief verwijderen: de inzending én de bijbehorende uitnodiging
// (met naam/e-mail) worden permanent gewist.
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdminSession();
  if (!admin) return Response.json({ error: "Niet ingelogd" }, { status: 401 });

  const { id } = await params;
  const sql = getSql();

  let inviteId: string | null = null;
  try {
    // Eerst de uitnodiging-id ophalen zodat we die PII ook kunnen wissen.
    const deleted = (await sql`
      delete from intake_submissions where id = ${id} returning invite_id
    `) as { invite_id: string | null }[];
    inviteId = deleted[0]?.invite_id ?? null;
  } catch (err) {
    console.error("Verwijderen inzending mislukt", err);
    return Response.json({ error: "Verwijderen mislukt" }, { status: 500 });
  }

  if (inviteId) {
    try {
      await sql`delete from intake_invites where id = ${inviteId}`;
    } catch (err) {
      // Inzending is al weg; log alleen de rest-PII die bleef staan.
      console.error("Verwijderen uitnodiging mislukt", err);
    }
  }

  return Response.json({ ok: true });
}
