import type { NextRequest } from "next/server";
import { getAdminUser } from "@/lib/supabase-server";
import { getServerSupabase } from "@/lib/supabase";

export const runtime = "nodejs";

// Archiveren / terugzetten van een inzending (status wijzigen).
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAdminUser();
  if (!user) return Response.json({ error: "Niet ingelogd" }, { status: 401 });

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

  const supabase = getServerSupabase();
  const { error } = await supabase
    .from("intake_submissions")
    .update({ status })
    .eq("id", id);
  if (error) {
    console.error("Archiveren mislukt", error);
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
  const user = await getAdminUser();
  if (!user) return Response.json({ error: "Niet ingelogd" }, { status: 401 });

  const { id } = await params;
  const supabase = getServerSupabase();

  // Eerst de uitnodiging-id ophalen zodat we die PII ook kunnen wissen.
  const { data: sub } = await supabase
    .from("intake_submissions")
    .select("invite_id")
    .eq("id", id)
    .maybeSingle<{ invite_id: string | null }>();

  const { error } = await supabase
    .from("intake_submissions")
    .delete()
    .eq("id", id);
  if (error) {
    console.error("Verwijderen inzending mislukt", error);
    return Response.json({ error: "Verwijderen mislukt" }, { status: 500 });
  }

  if (sub?.invite_id) {
    const { error: invErr } = await supabase
      .from("intake_invites")
      .delete()
      .eq("id", sub.invite_id);
    if (invErr) {
      // Inzending is al weg; log alleen de rest-PII die bleef staan.
      console.error("Verwijderen uitnodiging mislukt", invErr);
    }
  }

  return Response.json({ ok: true });
}
