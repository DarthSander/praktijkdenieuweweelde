import type { NextRequest } from "next/server";
import { getServerSupabase } from "@/lib/supabase";
import { sendNotificationEmail } from "@/lib/email";
import { formatSlotLabel } from "@/lib/availability";

export const runtime = "nodejs";

type Payload = {
  aloneOrCouple: "alleen" | "samen";
  gender?: string;
  problem?: string;
  aiAnswers: { question: string; answer: string }[];
  aiSummary?: string;
  naam: string;
  partnerNaam?: string;
  email: string;
  telefoon?: string;
  slotId: string;
  consentAi: boolean;
  consentStorage: boolean;
  notes?: string;
};

function isEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(req: NextRequest) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.consentStorage) {
    return Response.json({ error: "Toestemming voor opslag is verplicht" }, { status: 400 });
  }
  if (!body.naam || !body.email || !isEmail(body.email)) {
    return Response.json({ error: "Naam en geldig e-mailadres zijn verplicht" }, { status: 400 });
  }
  if (!body.slotId) {
    return Response.json({ error: "Selecteer een tijdslot" }, { status: 400 });
  }
  if (body.aloneOrCouple !== "alleen" && body.aloneOrCouple !== "samen") {
    return Response.json({ error: "Ongeldige keuze" }, { status: 400 });
  }

  const supabase = getServerSupabase();

  // 1. Haal slot op + check beschikbaarheid
  const { data: slot, error: slotErr } = await supabase
    .from("availability_slots")
    .select("id, starts_at, ends_at, is_blocked, is_booked")
    .eq("id", body.slotId)
    .single();

  if (slotErr || !slot) {
    return Response.json({ error: "Tijdslot niet gevonden" }, { status: 404 });
  }
  if (slot.is_blocked || slot.is_booked) {
    return Response.json({ error: "Dit tijdslot is helaas net geboekt" }, { status: 409 });
  }

  // 2. Insert intake
  const { data: intake, error: intakeErr } = await supabase
    .from("intake_submissions")
    .insert({
      alone_or_couple: body.aloneOrCouple,
      gender: body.gender ?? null,
      problem: body.problem ?? null,
      ai_answers: body.aiAnswers ?? [],
      ai_summary: body.aiSummary ?? null,
      naam: body.naam,
      partner_naam: body.partnerNaam ?? null,
      email: body.email,
      telefoon: body.telefoon ?? null,
      slot_id: slot.id,
      consent_ai: !!body.consentAi,
      consent_storage: !!body.consentStorage,
      notes: body.notes ?? null,
      status: "new",
    })
    .select("id")
    .single();

  if (intakeErr || !intake) {
    console.error("intake insert failed", intakeErr);
    return Response.json({ error: "Opslaan mislukt" }, { status: 500 });
  }

  // 3. Atomic boek slot (race-condition safe via filter is_booked=false)
  const { data: booked, error: bookErr } = await supabase
    .from("availability_slots")
    .update({ is_booked: true, booked_by: intake.id })
    .eq("id", slot.id)
    .eq("is_booked", false)
    .eq("is_blocked", false)
    .select("id")
    .maybeSingle();

  if (bookErr || !booked) {
    // Slot was tussendoor geboekt: rol intake terug
    await supabase.from("intake_submissions").delete().eq("id", intake.id);
    return Response.json({ error: "Dit tijdslot is helaas net geboekt" }, { status: 409 });
  }

  // 4. E-mail naar Eva
  try {
    const slotLabel = formatSlotLabel(slot.starts_at);
    const aiBlock = (body.aiAnswers ?? [])
      .map((a, i) => `Vraag ${i + 1}: ${a.question}\nAntwoord ${i + 1}: ${a.answer}`)
      .join("\n\n");

    const emailBody = `Nieuw intake-verzoek via de website.

— Persoon —
Naam: ${body.naam}${body.partnerNaam ? ` (& ${body.partnerNaam})` : ""}
E-mail: ${body.email}
Telefoon: ${body.telefoon ?? "—"}
Doet dit: ${body.aloneOrCouple}
Geslacht: ${body.gender ?? "—"}

— Geboekt slot —
${slotLabel}

— Hoofdprobleem —
${body.problem ?? "—"}

— AI-samenvatting —
${body.aiSummary ?? "—"}

— Antwoorden uit de chat —
${aiBlock || "—"}

— Status —
Intake-ID: ${intake.id}
Slot-ID: ${slot.id}

Bevestig of verplaats deze afspraak via een korte mail aan ${body.email}.`;

    await sendNotificationEmail({
      subject: `Nieuwe intake: ${body.naam} — ${slotLabel}`,
      body: emailBody,
    });
  } catch (mailErr) {
    console.error("intake mail failed", mailErr);
    // Niet rollbacken — boeking blijft geldig, Eva ziet hem in dashboard
  }

  return Response.json({ ok: true, intakeId: intake.id, slotLabel: formatSlotLabel(slot.starts_at) });
}
