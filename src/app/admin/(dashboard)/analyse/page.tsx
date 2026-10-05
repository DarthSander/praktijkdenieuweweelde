import Link from "next/link";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import { getSql } from "@/lib/db";
import {
  formatDuration,
  formatLocation,
  referrerLabel,
  timeAgo,
} from "@/lib/visitor-format";
import AutoRefresh from "./AutoRefresh";

export const dynamic = "force-dynamic";

// Iemand geldt als online als de laatste heartbeat (elke 15 s) minder dan 45 s geleden is.
const ONLINE_MS = 45_000;

type VisitorRow = {
  id: string;
  first_seen: Date;
  last_seen: Date;
  country: string | null;
  region: string | null;
  city: string | null;
  device: string | null;
  browser: string | null;
  os: string | null;
  visit_count: number;
  pageview_count: number;
  total_ms: number;
  landing_path: string | null;
  current_path: string | null;
  referrer: string | null;
  utm_source: string | null;
};

type Stats = {
  now: Date;
  online: number;
  today: number;
  week: number;
  pageviews_today: number;
};

function DeviceIcon({ device }: { device: string | null }) {
  const Icon = device === "Mobiel" ? Smartphone : device === "Tablet" ? Tablet : Monitor;
  return <Icon className="w-4 h-4 text-[#C4A4A0] shrink-0" aria-label={device ?? "Onbekend"} />;
}

function StatCard({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4">
      <div className="text-xs font-semibold uppercase tracking-wide text-[#C4A4A0]">{label}</div>
      <div className={`mt-1 text-2xl font-bold ${highlight ? "text-green-700" : "text-[#5E524F]"}`}>
        {value}
      </div>
    </div>
  );
}

export default async function AnalysePage() {
  let visitors: VisitorRow[] = [];
  let stats: Stats | null = null;
  let loadError = false;

  try {
    const sql = getSql();
    const [statRows, visitorRows] = await sql.transaction([
      sql`
        select
          now() as now,
          (select count(*) from visitors where last_seen > now() - interval '45 seconds')::int as online,
          (select count(*) from visitors
             where last_seen >= (date_trunc('day', now() at time zone 'Europe/Amsterdam') at time zone 'Europe/Amsterdam'))::int as today,
          (select count(*) from visitors where last_seen > now() - interval '7 days')::int as week,
          (select count(*) from pageviews
             where entered_at >= (date_trunc('day', now() at time zone 'Europe/Amsterdam') at time zone 'Europe/Amsterdam'))::int as pageviews_today
      `,
      sql`
        select v.id, v.first_seen, v.last_seen, v.country, v.region, v.city,
               v.device, v.browser, v.os,
               (select count(*) from visits x where x.visitor_id = v.id)::int as visit_count,
               (select count(*) from pageviews p where p.visitor_id = v.id)::int as pageview_count,
               (select coalesce(sum(p.duration_ms), 0) from pageviews p where p.visitor_id = v.id)::float8 as total_ms,
               lv.landing_path, lv.current_path, lv.referrer, lv.utm_source
        from visitors v
        left join lateral (
          select landing_path, current_path, referrer, utm_source
          from visits x
          where x.visitor_id = v.id
          order by x.started_at desc
          limit 1
        ) lv on true
        order by v.last_seen desc
        limit 100
      `,
    ]);
    stats = (statRows as Stats[])[0] ?? null;
    visitors = visitorRows as VisitorRow[];
  } catch (err) {
    console.error("Kon analyse niet laden", err);
    loadError = true;
  }

  // "Nu" komt uit de database, zodat de weergave niet van de serverklok afhangt.
  const now = stats ? new Date(stats.now).getTime() : 0;

  return (
    <div className="space-y-8">
      <AutoRefresh seconds={15} />

      <section>
        <h1 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-[#5E524F] mb-1">
          Bezoekers
        </h1>
        <p className="text-[#5E524F]/70 text-sm mb-6">
          Ververst automatisch elke 15 seconden. Je eigen bezoeken (ingelogd) tellen niet mee.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard label="Nu online" value={stats?.online ?? 0} highlight={(stats?.online ?? 0) > 0} />
          <StatCard label="Bezoekers vandaag" value={stats?.today ?? 0} />
          <StatCard label="Pagina's vandaag" value={stats?.pageviews_today ?? 0} />
          <StatCard label="Laatste 7 dagen" value={stats?.week ?? 0} />
        </div>
      </section>

      <section>
        {loadError ? (
          <p className="bg-white rounded-2xl shadow-sm p-6 text-sm text-red-600">
            De gegevens konden niet worden geladen. Controleer DATABASE_URL en of het schema is aangemaakt (npm run db:migrate).
          </p>
        ) : visitors.length === 0 ? (
          <p className="bg-white rounded-2xl shadow-sm p-6 text-sm text-[#5E524F]/60">Nog geen bezoekers.</p>
        ) : (
          <ul className="space-y-3">
            {visitors.map((v) => {
              const online = now - new Date(v.last_seen).getTime() < ONLINE_MS;
              return (
                <li key={v.id}>
                  <Link
                    href={`/admin/analyse/${v.id}`}
                    className="block bg-white rounded-2xl shadow-sm p-4 hover:shadow-md transition"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <DeviceIcon device={v.device} />
                        <span className="font-semibold text-[#5E524F] truncate">
                          {formatLocation(v.city, v.region, v.country)}
                        </span>
                        <span className="text-xs text-[#5E524F]/50 truncate">
                          {[v.browser, v.os].filter(Boolean).join(" · ")}
                        </span>
                      </div>
                      {online ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                          Nu online
                        </span>
                      ) : (
                        <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-[#F5F0EB] text-[#5E524F]/70">
                          {timeAgo(v.last_seen, now)}
                        </span>
                      )}
                    </div>
                    <dl className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2 text-sm">
                      <div className="min-w-0">
                        <dt className="text-xs text-[#C4A4A0]">Binnengekomen op</dt>
                        <dd className="text-[#5E524F] truncate">{v.landing_path ?? "—"}</dd>
                      </div>
                      <div className="min-w-0">
                        <dt className="text-xs text-[#C4A4A0]">{online ? "Nu op" : "Laatste pagina"}</dt>
                        <dd className="text-[#5E524F] truncate">{v.current_path ?? "—"}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-[#C4A4A0]">Bezoeken · pagina&apos;s</dt>
                        <dd className="text-[#5E524F]">
                          {v.visit_count} · {v.pageview_count}
                        </dd>
                      </div>
                      <div className="min-w-0">
                        <dt className="text-xs text-[#C4A4A0]">Totale tijd · herkomst</dt>
                        <dd className="text-[#5E524F] truncate">
                          {formatDuration(v.total_ms)} · {referrerLabel(v.referrer, v.utm_source)}
                        </dd>
                      </div>
                    </dl>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
