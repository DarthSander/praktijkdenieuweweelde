import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import { aiAgent } from "@/lib/ai-agents";
import { getSql } from "@/lib/db";

// Legt vast wanneer een AI-assistent een pagina ophaalt. Dat gebeurt aan de
// serverkant, dus de bezoekersanalyse in de browser ziet het nooit.
//
// Het vastleggen gebeurt via waitUntil: de bezoeker (of de bot) wacht er niet
// op, en een database die even niet bereikbaar is mag de site nooit ophouden.

export function proxy(request: NextRequest, event: NextFetchEvent) {
  const agent = aiAgent(request.headers.get("user-agent"));
  if (!agent) return NextResponse.next();

  const path = request.nextUrl.pathname.slice(0, 300);
  const userAgent = (request.headers.get("user-agent") ?? "").slice(0, 300);

  event.waitUntil(
    (async () => {
      try {
        const sql = getSql();
        await sql`
          insert into bot_hits (bot, kind, path, user_agent)
          values (${agent.name}, ${agent.kind}, ${path}, ${userAgent})
        `;
      } catch (err) {
        console.error("AI-bezoek vastleggen mislukt", err);
      }
    })()
  );

  return NextResponse.next();
}

export const config = {
  // Alleen echte pagina's: geen api-routes, geen bestanden, geen admin.
  matcher: [
    "/((?!api|_next/static|_next/image|admin|intake|favicon.ico|icon|apple-touch-icon|sw.js|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|pdf|xml|txt|webmanifest)).*)",
  ],
};
