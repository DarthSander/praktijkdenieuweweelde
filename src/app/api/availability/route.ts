import { getServerSupabase } from "@/lib/supabase";
import { generateSlots } from "@/lib/availability";

export const runtime = "nodejs";

const WEEKS_AHEAD = 6;

export async function GET() {
  try {
    const supabase = getServerSupabase();

    // Genereer benodigde slots vooruit en upsert ze (dubbele worden voorkomen door unique starts_at).
    const generated = generateSlots(WEEKS_AHEAD);
    if (generated.length > 0) {
      // We doen een chunk-insert; conflicten op starts_at negeren we
      const chunkSize = 100;
      for (let i = 0; i < generated.length; i += chunkSize) {
        const chunk = generated.slice(i, i + chunkSize);
        await supabase
          .from("availability_slots")
          .upsert(chunk, { onConflict: "starts_at", ignoreDuplicates: true });
      }
    }

    // Haal vrije slots op (toekomst, niet geblokkeerd, niet geboekt)
    const nowIso = new Date().toISOString();
    const { data, error } = await supabase
      .from("availability_slots")
      .select("id, starts_at, ends_at")
      .eq("is_blocked", false)
      .eq("is_booked", false)
      .gt("starts_at", nowIso)
      .order("starts_at", { ascending: true });

    if (error) throw error;
    return Response.json({ slots: data ?? [] });
  } catch (err) {
    console.error("availability error", err);
    return Response.json({ error: "Kon slots niet ophalen" }, { status: 500 });
  }
}
