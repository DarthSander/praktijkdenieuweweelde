import type { NextRequest } from "next/server";
import { getSql } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Wist chatgesprekken ouder dan 30 dagen. De privacyverklaring belooft dat ze
 * automatisch verdwijnen, dus dit moet draaien zonder dat iemand erop klikt.
 * Vercel roept dit dagelijks aan volgens het schema in vercel.json.
 *
 * Staat CRON_SECRET in de omgeving, dan moet de aanroep die sleutel meesturen;
 * Vercel doet dat zelf. Zonder die variabele is de route open, en dat kan:
 * hij verwijdert alleen wat sowieso weg moest en geeft verder niets prijs.
 */
export async function GET(req: NextRequest) {
  const geheim = process.env.CRON_SECRET;
  if (geheim && req.headers.get("authorization") !== `Bearer ${geheim}`) {
    return new Response(null, { status: 401 });
  }

  try {
    const sql = getSql();
    const rows = (await sql`select purge_old_chat() as verwijderd`) as {
      verwijderd: number | null;
    }[];
    return Response.json({ ok: true, verwijderd: rows[0]?.verwijderd ?? 0 });
  } catch (err) {
    console.error("Opschonen van oude chats mislukt", err);
    return Response.json({ ok: false }, { status: 500 });
  }
}
