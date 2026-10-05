import Link from "next/link";
import { Clock, MapPin, Monitor } from "lucide-react";
import { getSql } from "@/lib/db";
import {
  formatDateTime,
  formatDuration,
  formatLocation,
  referrerLabel,
  timeAgo,
} from "@/lib/visitor-format";
import AutoRefresh from "../AutoRefresh";

export const dynamic = "force-dynamic";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const ONLINE_MS = 45_000;

type Visitor = {
  now: Date;
  id: string;
  first_seen: Date;
  last_seen: Date;
  country: string | null;
  region: string | null;
  city: string | null;
  device: string | null;
  browser: string | null;
  os: string | null;
};

type Visit = {
  id: string;
  started_at: Date;
  last_activity_at: Date;
  landing_path: string;
  current_path: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
};

type Pageview = {
  id: string;
  visit_id: string;
  path: string;
  title: string | null;
  entered_at: Date;
  duration_ms: number;
  max_scroll_pct: number;
};

type SectionView = {
  pageview_id: string;
  section_id: string;
  label: string | null;
  visible_ms: number;
};

function BackLink() {
  return (
    <Link href="/admin/analyse" className="text-[#946B66] text-sm hover:underline">
      ← Terug naar bezoekers
    </Link>
  );
}

export default async function VisitorDetailPage({
  params,
}: {
  params: Promise<{ visitorId: string }>;
}) {
  const { visitorId } = await params;

  let visitor: Visitor | null = null;
  let visits: Visit[] = [];
  let pageviews: Pageview[] = [];
  let sections: SectionView[] = [];

  if (UUID_RE.test(visitorId)) {
    try {
      const sql = getSql();
      const [visitorRows, visitRows, pageviewRows, sectionRows] = await sql.transaction([
        sql`
          select now() as now, id, first_seen, last_seen, country, region, city, device, browser, os
          from visitors where id = ${visitorId}
        `,
        sql`
          select id, started_at, last_activity_at, landing_path, current_path, referrer,
                 utm_source, utm_medium, utm_campaign, country, region, city
          from visits where visitor_id = ${visitorId}
          order by started_at desc
          limit 50
        `,
        sql`
          select id, visit_id, path, title, entered_at, duration_ms, max_scroll_pct
          from pageviews where visitor_id = ${visitorId}
          order by entered_at asc
          limit 1000
        `,
        sql`
          select s.pageview_id, s.section_id, s.label, s.visible_ms
          from section_views s
          join pageviews p on p.id = s.pageview_id
          where p.visitor_id = ${visitorId}
          order by s.visible_ms desc
        `,
      ]);
      visitor = (visitorRows as Visitor[])[0] ?? null;
      visits = visitRows as Visit[];
      pageviews = pageviewRows as Pageview[];
      sections = sectionRows as SectionView[];
    } catch (err) {
      console.error("Kon bezoeker niet laden", err);
    }
  }

  if (!visitor) {
    return (
      <div className="space-y-4">
        <BackLink />
        <p className="text-[#5E524F]/70 text-sm">Bezoeker niet gevonden.</p>
      </div>
    );
  }

  // "Nu" komt uit de database, zodat de weergave niet van de serverklok afhangt.
  const now = new Date(visitor.now).getTime();
  const online = now - new Date(visitor.last_seen).getTime() < ONLINE_MS;
  const totalMs = pageviews.reduce((sum, p) => sum + p.duration_ms, 0);

  const pageviewsByVisit = new Map<string, Pageview[]>();
  for (const p of pageviews) {
    const list = pageviewsByVisit.get(p.visit_id) ?? [];
    list.push(p);
    pageviewsByVisit.set(p.visit_id, list);
  }
  const sectionsByPageview = new Map<string, SectionView[]>();
  for (const s of sections) {
    const list = sectionsByPageview.get(s.pageview_id) ?? [];
    list.push(s);
    sectionsByPageview.set(s.pageview_id, list);
  }

  // Meest bekeken pagina's over alle bezoeken.
  const pageTotals = new Map<string, { views: number; ms: number }>();
  for (const p of pageviews) {
    const t = pageTotals.get(p.path) ?? { views: 0, ms: 0 };
    t.views++;
    t.ms += p.duration_ms;
    pageTotals.set(p.path, t);
  }
  const topPages = Array.from(pageTotals.entries()).sort((a, b) => b[1].ms - a[1].ms);

  return (
    <div className="space-y-6">
      <AutoRefresh seconds={15} />
      <BackLink />

      <section className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-[#5E524F]">
              {formatLocation(visitor.city, visitor.region, visitor.country)}
            </h1>
            <p className="text-[#5E524F]/60 text-sm mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="inline-flex items-center gap-1">
                <Monitor className="w-3.5 h-3.5" aria-hidden />
                {[visitor.device, visitor.browser, visitor.os].filter(Boolean).join(" · ")}
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" aria-hidden />
                {[visitor.city, visitor.region, visitor.country].filter(Boolean).join(", ") || "Locatie onbekend"}
              </span>
            </p>
          </div>
          {online ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
              Nu online
            </span>
          ) : (
            <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-[#F5F0EB] text-[#5E524F]/70">
              Laatst gezien {timeAgo(visitor.last_seen, now)}
            </span>
          )}
        </div>
        <dl className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <dt className="text-xs text-[#C4A4A0]">Eerste bezoek</dt>
            <dd className="text-[#5E524F]">{formatDateTime(visitor.first_seen)}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#C4A4A0]">Aantal bezoeken</dt>
            <dd className="text-[#5E524F]">{visits.length}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#C4A4A0]">Pagina&apos;s bekeken</dt>
            <dd className="text-[#5E524F]">{pageviews.length}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#C4A4A0]">Totale tijd</dt>
            <dd className="text-[#5E524F]">{formatDuration(totalMs)}</dd>
          </div>
        </dl>
      </section>

      {topPages.length > 0 && (
        <section className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-[#5E524F] mb-3">Bekeken pagina&apos;s</h2>
          <ul className="divide-y divide-[#F5F0EB] text-sm">
            {topPages.map(([path, t]) => (
              <li key={path} className="py-2 flex justify-between gap-4">
                <span className="text-[#5E524F] truncate">{path}</span>
                <span className="text-[#5E524F]/60 whitespace-nowrap">
                  {t.views}x · {formatDuration(t.ms)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-[#5E524F]">Bezoeken</h2>
        {visits.map((visit, i) => {
          const pvs = pageviewsByVisit.get(visit.id) ?? [];
          const visitMs = pvs.reduce((sum, p) => sum + p.duration_ms, 0);
          const utm = [visit.utm_source, visit.utm_medium, visit.utm_campaign].filter(Boolean).join(" / ");
          return (
            <div key={visit.id} className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2 pb-3 mb-3 border-b border-[#EDE6DD]">
                <div className="font-semibold text-[#946B66]">
                  Bezoek {visits.length - i} · {formatDateTime(visit.started_at)}
                </div>
                <div className="text-xs text-[#5E524F]/60">
                  {pvs.length} pagina&apos;s · {formatDuration(visitMs)} · via{" "}
                  {referrerLabel(visit.referrer, visit.utm_source)}
                  {utm && ` (${utm})`}
                </div>
              </div>
              {visit.referrer && (
                <p className="text-xs text-[#5E524F]/60 mb-3 break-all">Verwijzer: {visit.referrer}</p>
              )}
              <ol className="space-y-3">
                {pvs.map((p, idx) => {
                  const secs = sectionsByPageview.get(p.id) ?? [];
                  return (
                    <li key={p.id} className="relative pl-6">
                      <span className="absolute left-0 top-1 w-4 h-4 rounded-full bg-[#F5F0EB] text-[10px] leading-4 text-center text-[#946B66] font-semibold">
                        {idx + 1}
                      </span>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="text-[#5E524F] font-medium break-all">{p.path}</span>
                        <span className="text-xs text-[#5E524F]/60 inline-flex items-center gap-1 whitespace-nowrap">
                          <Clock className="w-3 h-3" aria-hidden />
                          {formatDuration(p.duration_ms)} · {p.max_scroll_pct}% gescrold ·{" "}
                          {new Date(p.entered_at).toLocaleTimeString("nl-NL", {
                            timeZone: "Europe/Amsterdam",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      {p.title && <div className="text-xs text-[#5E524F]/50 truncate">{p.title}</div>}
                      {secs.length > 0 && (
                        <ul className="mt-2 space-y-1">
                          {secs.map((s) => (
                            <li key={s.section_id} className="flex justify-between gap-4 text-xs">
                              <span className="text-[#5E524F]/80 truncate">{s.label || s.section_id}</span>
                              <span className="text-[#5E524F]/50 whitespace-nowrap">
                                {formatDuration(s.visible_ms)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
          );
        })}
      </section>
    </div>
  );
}
