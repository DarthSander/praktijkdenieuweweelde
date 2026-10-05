import { after, type NextRequest } from "next/server";
import { getSql } from "@/lib/db";
import { readSessionToken, SESSION_COOKIE } from "@/lib/auth";
import { sendPushToAll } from "@/lib/push";
import { formatLocation, ordinalVisit, referrerLabel } from "@/lib/visitor-format";

export const runtime = "nodejs";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const BOT_RE =
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly|quora link|whatsapp|telegram|preview|lighthouse|headless|pingdom|uptime|monitor|curl|wget|python-requests|axios|node-fetch/i;
const MAX_BODY = 20_000;

type Section = { id: string; label: string; ms: number };

function str(v: unknown, max: number): string | null {
  return typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null;
}

function int(v: unknown, min: number, max: number): number {
  const n = typeof v === "number" && Number.isFinite(v) ? Math.round(v) : 0;
  return Math.min(max, Math.max(min, n));
}

function header(req: NextRequest, name: string): string | null {
  const raw = req.headers.get(name);
  if (!raw) return null;
  try {
    return decodeURIComponent(raw).slice(0, 100);
  } catch {
    return raw.slice(0, 100);
  }
}

function parseUserAgent(ua: string): { device: string; browser: string; os: string } {
  const device = /ipad|tablet|(android(?!.*mobile))/i.test(ua)
    ? "Tablet"
    : /mobi|iphone|android/i.test(ua)
      ? "Mobiel"
      : "Desktop";
  const browser = /edg\//i.test(ua)
    ? "Edge"
    : /samsungbrowser/i.test(ua)
      ? "Samsung Internet"
      : /opr\/|opera/i.test(ua)
        ? "Opera"
        : /firefox|fxios/i.test(ua)
          ? "Firefox"
          : /chrome|crios/i.test(ua)
            ? "Chrome"
            : /safari/i.test(ua)
              ? "Safari"
              : "Overig";
  const os = /android/i.test(ua)
    ? "Android"
    : /iphone|ipad|ipod/i.test(ua)
      ? "iOS"
      : /windows/i.test(ua)
        ? "Windows"
        : /mac os x|macintosh/i.test(ua)
          ? "macOS"
          : /linux/i.test(ua)
            ? "Linux"
            : "Overig";
  return { device, browser, os };
}

export async function POST(req: NextRequest) {
  const ua = req.headers.get("user-agent") ?? "";
  if (!ua || BOT_RE.test(ua)) return new Response(null, { status: 204 });

  // Bezoeken van de ingelogde admin tellen niet mee.
  if (readSessionToken(req.cookies.get(SESSION_COOKIE)?.value)) {
    return new Response(null, { status: 204 });
  }

  let data: Record<string, unknown>;
  try {
    const text = await req.text();
    if (text.length > MAX_BODY) return new Response(null, { status: 413 });
    data = JSON.parse(text);
  } catch {
    return new Response(null, { status: 400 });
  }

  const visitorId = str(data.visitorId, 36);
  const visitId = str(data.visitId, 36);
  const pageviewId = str(data.pageviewId, 36);
  if (
    !visitorId || !visitId || !pageviewId ||
    !UUID_RE.test(visitorId) || !UUID_RE.test(visitId) || !UUID_RE.test(pageviewId)
  ) {
    return new Response(null, { status: 400 });
  }

  let sql: ReturnType<typeof getSql>;
  try {
    sql = getSql();
  } catch (err) {
    console.error("Tracking: database niet beschikbaar", err);
    return new Response(null, { status: 204 });
  }

  try {
    if (data.type === "pageview") {
      const path = str(data.path, 300);
      if (!path || !path.startsWith("/")) return new Response(null, { status: 400 });

      const title = str(data.title, 200);
      const referrer = str(data.referrer, 500);
      const utmSource = str(data.utmSource, 100);
      const utmMedium = str(data.utmMedium, 100);
      const utmCampaign = str(data.utmCampaign, 100);
      const country = header(req, "x-vercel-ip-country");
      const region = header(req, "x-vercel-ip-country-region");
      const city = header(req, "x-vercel-ip-city");
      const { device, browser, os } = parseUserAgent(ua);

      await sql.transaction([
        sql`
          insert into visitors (id, country, region, city, device, browser, os)
          values (${visitorId}, ${country}, ${region}, ${city}, ${device}, ${browser}, ${os})
          on conflict (id) do update set
            last_seen = now(),
            country = coalesce(excluded.country, visitors.country),
            region  = coalesce(excluded.region, visitors.region),
            city    = coalesce(excluded.city, visitors.city),
            device  = excluded.device,
            browser = excluded.browser,
            os      = excluded.os
        `,
        sql`
          insert into visits (id, visitor_id, landing_path, current_path, referrer,
                              utm_source, utm_medium, utm_campaign, country, region, city)
          values (${visitId}, ${visitorId}, ${path}, ${path}, ${referrer},
                  ${utmSource}, ${utmMedium}, ${utmCampaign}, ${country}, ${region}, ${city})
          on conflict (id) do update set
            last_activity_at = now(),
            current_path = excluded.current_path
          where visits.visitor_id = excluded.visitor_id
        `,
        sql`
          insert into pageviews (id, visit_id, visitor_id, path, title)
          select ${pageviewId}, ${visitId}, ${visitorId}, ${path}, ${title}
          where exists (select 1 from visits where id = ${visitId} and visitor_id = ${visitorId})
          on conflict (id) do nothing
        `,
      ]);

      // Pushmelding naar de admin, zonder dat de bezoeker hoeft te wachten.
      after(async () => {
        try {
          const rows = (await sql`
            select count(*)::int as visits from visits where visitor_id = ${visitorId}
          `) as { visits: number }[];
          const visits = rows[0]?.visits ?? 1;
          const parts = [
            formatLocation(city, region, country),
            ordinalVisit(visits),
            `via ${referrerLabel(referrer, utmSource)}`,
          ];
          await sendPushToAll({
            title: `Bezoeker op ${path}`,
            body: parts.join(" · "),
            url: `/admin/analyse/${visitorId}`,
            tag: visitorId,
          });
        } catch (err) {
          console.error("Pushmelding versturen mislukt", err);
        }
      });

      return new Response(null, { status: 204 });
    }

    if (data.type === "ping") {
      const durationMs = int(data.durationMs, 0, 24 * 60 * 60 * 1000);
      const maxScroll = int(data.maxScroll, 0, 100);
      const sections: Section[] = Array.isArray(data.sections)
        ? (data.sections as unknown[])
            .slice(0, 40)
            .map((s) => {
              const o = (s ?? {}) as Record<string, unknown>;
              return {
                id: str(o.id, 80) ?? "",
                label: str(o.label, 120) ?? "",
                ms: int(o.ms, 0, 24 * 60 * 60 * 1000),
              };
            })
            .filter((s) => s.id && s.ms > 0)
        : [];

      const queries = [
        sql`
          update pageviews set
            duration_ms = greatest(duration_ms, ${durationMs}),
            max_scroll_pct = greatest(max_scroll_pct, ${maxScroll}),
            last_seen_at = now()
          where id = ${pageviewId} and visitor_id = ${visitorId}
        `,
        sql`
          update visits set last_activity_at = now()
          where id = ${visitId} and visitor_id = ${visitorId}
        `,
        sql`update visitors set last_seen = now() where id = ${visitorId}`,
      ];
      if (sections.length) {
        queries.push(sql`
          insert into section_views (pageview_id, section_id, label, visible_ms)
          select p.id, s.section_id, s.label, s.visible_ms
          from pageviews p,
               unnest(${sections.map((s) => s.id)}::text[],
                      ${sections.map((s) => s.label)}::text[],
                      ${sections.map((s) => s.ms)}::int[]) as s(section_id, label, visible_ms)
          where p.id = ${pageviewId} and p.visitor_id = ${visitorId}
          on conflict (pageview_id, section_id) do update set
            visible_ms = greatest(section_views.visible_ms, excluded.visible_ms),
            label = excluded.label
        `);
      }
      await sql.transaction(queries);
      return new Response(null, { status: 204 });
    }

    return new Response(null, { status: 400 });
  } catch (err) {
    console.error("Tracking opslaan mislukt", err);
    return new Response(null, { status: 204 });
  }
}
