import Link from "next/link";
import { getSql } from "@/lib/db";
import { formatDateTime, formatDuration } from "@/lib/visitor-format";
import { CATEGORY_LABELS, trafficSource, type SourceCategory } from "@/lib/traffic-source";
import { aggregate, type LeadRow, type VisitRow } from "./aggregate";

export const dynamic = "force-dynamic";

const PERIODS = [7, 30, 90] as const;
const CATEGORY_ORDER: SourceCategory[] = ["ai", "zoekmachine", "sociaal", "direct", "overig"];

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4">
      <div className="text-xs font-semibold uppercase tracking-wide text-[#C4A4A0]">{label}</div>
      <div className="mt-1 text-2xl font-bold text-[#5E524F]">{value}</div>
      {sub ? <div className="text-xs text-[#5E524F]/60 mt-0.5">{sub}</div> : null}
    </div>
  );
}

export default async function HerkomstPage({
  searchParams,
}: {
  searchParams: Promise<{ dagen?: string }>;
}) {
  const requested = Number((await searchParams).dagen);
  const days = PERIODS.includes(requested as (typeof PERIODS)[number]) ? requested : 30;

  let rows: VisitRow[] = [];
  let leads: LeadRow[] = [];
  let loadError = false;
  try {
    const sql = getSql();
    const [visitRows, leadRows] = await sql.transaction([
      sql`
        select v.visitor_id::text as visitor_id,
               v.landing_path, v.referrer, v.utm_source,
               coalesce(p.views, 0)::int as views,
               coalesce(p.ms, 0)::float8 as ms,
               exists (select 1 from leads l where l.visit_id = v.id) as converted
        from visits v
        left join lateral (
          select count(*)::int as views, sum(duration_ms)::float8 as ms
          from pageviews where visit_id = v.id
        ) p on true
        where v.started_at > now() - make_interval(days => ${days})
        order by v.started_at desc
        limit 5000
      `,
      sql`
        select l.id, l.created_at, l.path, l.visitor_id::text as visitor_id,
               v.landing_path, v.referrer, v.utm_source,
               coalesce(j.paths, array[]::text[]) as paths
        from leads l
        left join visits v on v.id = l.visit_id
        left join lateral (
          select array_agg(p.path order by p.entered_at) as paths
          from pageviews p where p.visit_id = l.visit_id
        ) j on true
        where l.created_at > now() - make_interval(days => ${days})
        order by l.created_at desc
        limit 25
      `,
    ]);
    rows = visitRows as VisitRow[];
    leads = leadRows as LeadRow[];
  } catch (err) {
    console.error("Kon herkomst niet laden", err);
    loadError = true;
  }

  const { sources, landings } = aggregate(rows);
  const totalVisits = rows.length;
  const uniqueVisitors = new Set(rows.map((r) => r.visitor_id)).size;
  const totalLeads = rows.filter((r) => r.converted).length;
  const share = (category: SourceCategory) =>
    sources.filter((s) => s.category === category).reduce((n, s) => n + s.visits, 0);
  const pct = (n: number) => (totalVisits ? `${Math.round((100 * n) / totalVisits)}%` : "—");

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-[#5E524F] mb-1">
          Herkomst
        </h1>
        <p className="text-[#5E524F]/70 text-sm mb-4">
          Waar bezoekers vandaan komen, waar ze binnenkomen en wat tot een aanvraag leidt.
        </p>

        <div className="flex gap-2 mb-6">
          {PERIODS.map((p) => (
            <Link
              key={p}
              href={`/admin/herkomst?dagen=${p}`}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                p === days
                  ? "bg-[#946B66] text-white"
                  : "bg-white text-[#5E524F] shadow-sm hover:bg-[#F5F0EB]"
              }`}
            >
              {p} dagen
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard label="Bezoeken" value={String(totalVisits)} sub={`${uniqueVisitors} bezoekers`} />
          <StatCard
            label="Aanvragen"
            value={String(totalLeads)}
            sub={totalVisits ? `${((100 * totalLeads) / totalVisits).toFixed(1)}% van de bezoeken` : undefined}
          />
          <StatCard label="Via AI" value={pct(share("ai"))} sub={`${share("ai")} bezoeken`} />
          <StatCard
            label="Via zoekmachines"
            value={pct(share("zoekmachine"))}
            sub={`${share("zoekmachine")} bezoeken`}
          />
        </div>
      </section>

      {loadError ? (
        <p className="bg-white rounded-2xl shadow-sm p-6 text-sm text-red-600">
          De gegevens konden niet worden geladen.
        </p>
      ) : totalVisits === 0 ? (
        <p className="bg-white rounded-2xl shadow-sm p-6 text-sm text-[#5E524F]/60">
          Nog geen bezoeken in deze periode.
        </p>
      ) : (
        <>
          {leads.length > 0 && (
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-[#C4A4A0] mb-2">
                Aanvragen en de route ernaartoe
              </h2>
              <ul className="space-y-3">
                {leads.map((lead) => {
                  const source = trafficSource(lead.referrer, lead.utm_source);
                  const route = lead.paths.length ? lead.paths.join("  →  ") : (lead.path ?? "—");
                  const body = (
                    <>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="font-semibold text-[#5E524F]">
                          {source.label}
                          <span className="font-normal text-[#5E524F]/60">
                            {" "}· binnen op {lead.landing_path ?? "—"}
                          </span>
                        </span>
                        <span className="text-xs text-[#5E524F]/50 shrink-0">
                          {formatDateTime(lead.created_at)}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-[#5E524F]/80 break-words">{route}</p>
                    </>
                  );
                  return (
                    <li key={lead.id}>
                      {lead.visitor_id ? (
                        <Link
                          href={`/admin/analyse/${lead.visitor_id}`}
                          className="block bg-white rounded-2xl shadow-sm p-4 hover:shadow-md transition"
                        >
                          {body}
                        </Link>
                      ) : (
                        <div className="bg-white rounded-2xl shadow-sm p-4">{body}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          <section className="space-y-6">
            {CATEGORY_ORDER.map((category) => {
              const inCategory = sources.filter((s) => s.category === category);
              if (inCategory.length === 0) return null;
              return (
                <div key={category}>
                  <h2 className="text-xs font-semibold uppercase tracking-wide text-[#C4A4A0] mb-2">
                    {CATEGORY_LABELS[category]}
                  </h2>
                  <ul className="space-y-3">
                    {inCategory.map((s) => {
                      const topLanding = s.landings[0];
                      return (
                        <li key={s.label} className="bg-white rounded-2xl shadow-sm p-4">
                          <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <span className="font-semibold text-[#5E524F] truncate">{s.label}</span>
                            <span className="text-sm text-[#5E524F]/70 shrink-0">
                              {s.visits} {s.visits === 1 ? "bezoek" : "bezoeken"}
                              {s.leads > 0 ? ` · ${s.leads} ${s.leads === 1 ? "aanvraag" : "aanvragen"}` : ""}
                            </span>
                          </div>
                          <dl className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2 text-sm">
                            <div>
                              <dt className="text-xs text-[#C4A4A0]">Bezoekers</dt>
                              <dd className="text-[#5E524F]">{s.visitors}</dd>
                            </div>
                            <div>
                              <dt className="text-xs text-[#C4A4A0]">Pagina&apos;s per bezoek</dt>
                              <dd className="text-[#5E524F]">{(s.views / s.visits).toFixed(1)}</dd>
                            </div>
                            <div>
                              <dt className="text-xs text-[#C4A4A0]">Gem. tijd per bezoek</dt>
                              <dd className="text-[#5E524F]">{formatDuration(s.ms / s.visits)}</dd>
                            </div>
                            <div className="min-w-0">
                              <dt className="text-xs text-[#C4A4A0]">Komt binnen op</dt>
                              <dd className="text-[#5E524F] truncate">
                                {topLanding ? `${topLanding[0]} (${topLanding[1]}×)` : "—"}
                              </dd>
                            </div>
                          </dl>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </section>

          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-[#C4A4A0] mb-2">
              Landingspagina&apos;s
            </h2>
            <ul className="space-y-3">
              {landings.map((l) => (
                <li key={l.path} className="bg-white rounded-2xl shadow-sm p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-semibold text-[#5E524F] truncate">{l.path}</span>
                    <span className="text-sm text-[#5E524F]/70 shrink-0">
                      {l.visits} {l.visits === 1 ? "bezoek" : "bezoeken"}
                      {l.leads > 0 ? ` · ${l.leads} ${l.leads === 1 ? "aanvraag" : "aanvragen"}` : ""}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[#5E524F]/70 truncate">
                    via {l.top.map(([label, n]) => `${label} (${n})`).join(" · ")}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <p className="text-xs text-[#5E524F]/50 leading-relaxed">
            AI-assistenten sturen niet altijd een herkomst mee; een deel van dat verkeer komt
            daardoor onder &quot;Direct&quot; terecht. De cijfers bij AI zijn dus een ondergrens.
            Aanvragen worden geteld vanaf het moment dat het contactformulier verstuurd is; het
            intakeformulier staat op een pagina die bewust niet gevolgd wordt.
          </p>
        </>
      )}
    </div>
  );
}
