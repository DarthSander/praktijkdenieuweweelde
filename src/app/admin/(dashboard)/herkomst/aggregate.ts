// Rekenwerk voor de herkomstpagina, los van de weergave zodat het te testen is.
import { trafficSource, type SourceCategory } from "@/lib/traffic-source";

export type VisitRow = {
  visitor_id: string;
  landing_path: string | null;
  referrer: string | null;
  utm_source: string | null;
  views: number;
  ms: number;
  converted: boolean;
};

export type LeadRow = {
  id: string;
  created_at: Date;
  path: string | null;
  visitor_id: string | null;
  landing_path: string | null;
  referrer: string | null;
  utm_source: string | null;
  paths: string[];
};

export type SourceStats = {
  label: string;
  category: SourceCategory;
  visits: number;
  visitors: number;
  views: number;
  ms: number;
  leads: number;
  /** Landingspagina's van deze bron, aflopend op aantal bezoeken. */
  landings: [string, number][];
};

export type LandingStats = {
  path: string;
  visits: number;
  leads: number;
  /** Belangrijkste bronnen voor deze pagina, maximaal drie. */
  top: [string, number][];
};

export function aggregate(rows: VisitRow[]): {
  sources: SourceStats[];
  landings: LandingStats[];
} {
  type Acc = Omit<SourceStats, "visitors" | "landings"> & {
    visitors: Set<string>;
    landings: Map<string, number>;
  };
  const sources = new Map<string, Acc>();
  const landings = new Map<string, { visits: number; leads: number; sources: Map<string, number> }>();

  for (const row of rows) {
    const source = trafficSource(row.referrer, row.utm_source);
    // "Direct" betekent alleen dat de browser geen herkomst doorgaf. Wie op de
    // homepage binnenkomt heeft de URL vermoedelijk ingetypt of stond in de
    // favorieten; wie rechtstreeks op een diepe pagina binnenkomt heeft vrijwel
    // zeker een gedeelde link gevolgd — uit een appje, een mail of een
    // AI-assistent die geen herkomst meestuurt.
    const label =
      source.category === "direct" && row.landing_path && row.landing_path !== "/"
        ? "Direct op een diepe pagina"
        : source.label;
    const category = source.category;
    let s = sources.get(label);
    if (!s) {
      s = {
        label, category, visits: 0, visitors: new Set(),
        views: 0, ms: 0, leads: 0, landings: new Map(),
      };
      sources.set(label, s);
    }
    s.visits += 1;
    s.visitors.add(row.visitor_id);
    s.views += row.views;
    s.ms += row.ms;
    if (row.converted) s.leads += 1;

    const path = row.landing_path ?? "—";
    s.landings.set(path, (s.landings.get(path) ?? 0) + 1);

    let l = landings.get(path);
    if (!l) {
      l = { visits: 0, leads: 0, sources: new Map() };
      landings.set(path, l);
    }
    l.visits += 1;
    if (row.converted) l.leads += 1;
    l.sources.set(label, (l.sources.get(label) ?? 0) + 1);
  }

  const byLeadsThenVisits = <T extends { leads: number; visits: number }>(a: T, b: T) =>
    b.leads - a.leads || b.visits - a.visits;

  return {
    sources: [...sources.values()]
      .map((s) => ({
        ...s,
        visitors: s.visitors.size,
        landings: [...s.landings.entries()].sort((a, b) => b[1] - a[1]),
      }))
      .sort(byLeadsThenVisits),
    landings: [...landings.entries()]
      .map(([path, l]) => ({
        path,
        visits: l.visits,
        leads: l.leads,
        top: [...l.sources.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3) as [string, number][],
      }))
      .sort(byLeadsThenVisits)
      .slice(0, 12),
  };
}
