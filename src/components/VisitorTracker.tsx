"use client";

// Bezoekersanalyse: houdt per bezoeker bij welke pagina's en gedeeltes
// (secties) bekeken worden en hoe lang. Gegevens gaan naar /api/track.
// Niet actief op /admin en /intake.
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const VISITOR_KEY = "nw_vid";
const VISIT_KEY = "nw_visit";
const VISIT_TIMEOUT_MS = 30 * 60 * 1000; // nieuw bezoek na 30 min inactiviteit
const HEARTBEAT_MS = 15_000;
const MAX_SECTIONS = 40;

type SectionStat = { id: string; label: string; ms: number; since: number | null };

type PageState = {
  pageviewId: string;
  visitId: string;
  visitorId: string;
  activeMs: number;
  activeSince: number | null;
  maxScroll: number;
  sections: Map<Element, SectionStat>;
  observer: IntersectionObserver | null;
};

function uuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  // Fallback voor oudere browsers.
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (Number(c) ^ (Math.random() * 16) >> (Number(c) / 4)).toString(16)
  );
}

function getVisitorId(): string {
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = uuid();
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return uuid();
  }
}

/** Geeft het huidige bezoek-ID; start een nieuw bezoek na 30 min inactiviteit. */
function getVisit(): { id: string; isNew: boolean } {
  const now = Date.now();
  try {
    const raw = localStorage.getItem(VISIT_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { id?: string; last?: number };
      if (parsed.id && parsed.last && now - parsed.last < VISIT_TIMEOUT_MS) {
        localStorage.setItem(VISIT_KEY, JSON.stringify({ id: parsed.id, last: now }));
        return { id: parsed.id, isNew: false };
      }
    }
    const id = uuid();
    localStorage.setItem(VISIT_KEY, JSON.stringify({ id, last: now }));
    return { id, isNew: true };
  } catch {
    return { id: uuid(), isNew: true };
  }
}

function touchVisit(visitId: string) {
  try {
    localStorage.setItem(VISIT_KEY, JSON.stringify({ id: visitId, last: Date.now() }));
  } catch {
    // localStorage niet beschikbaar
  }
}

function send(data: Record<string, unknown>) {
  const body = JSON.stringify(data);
  try {
    if (navigator.sendBeacon?.("/api/track", new Blob([body], { type: "application/json" }))) {
      return;
    }
  } catch {
    // val terug op fetch
  }
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}

function externalReferrer(): string | null {
  if (!document.referrer) return null;
  try {
    const ref = new URL(document.referrer);
    return ref.host === location.host ? null : document.referrer.slice(0, 500);
  } catch {
    return null;
  }
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

/** Bepaalt een stabiele id + leesbare naam voor een sectie. */
function describeSection(el: Element, index: number): { id: string; label: string } {
  const heading = el.querySelector("h1, h2, h3");
  const headingText = heading?.textContent?.trim().replace(/\s+/g, " ").slice(0, 80) ?? "";
  const explicit = el.getAttribute("data-track-section") || el.id;
  const label = headingText || explicit || `Sectie ${index + 1}`;
  const id = explicit || (headingText ? slugify(headingText) : "") || `sectie-${index + 1}`;
  return { id, label };
}

function scrollPercent(): number {
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  if (max <= 0) return 100;
  return Math.min(100, Math.round((window.scrollY / max) * 100));
}

function isTracked(path: string): boolean {
  return !path.startsWith("/admin") && !path.startsWith("/intake") && !path.startsWith("/api");
}

export default function VisitorTracker() {
  const pathname = usePathname();
  const stateRef = useRef<PageState | null>(null);

  useEffect(() => {
    if (!pathname || !isTracked(pathname)) return;

    const visitorId = getVisitorId();
    const visit = getVisit();
    const visible = document.visibilityState === "visible";
    const state: PageState = {
      pageviewId: uuid(),
      visitId: visit.id,
      visitorId,
      activeMs: 0,
      activeSince: visible ? Date.now() : null,
      maxScroll: scrollPercent(),
      sections: new Map(),
      observer: null,
    };
    stateRef.current = state;

    const params = new URLSearchParams(location.search);
    // Titel pas na een korte pauze uitlezen: bij client-navigatie wordt
    // document.title net na het renderen bijgewerkt.
    const pageviewTimer = window.setTimeout(() => {
      send({
        type: "pageview",
        visitorId,
        visitId: visit.id,
        pageviewId: state.pageviewId,
        path: pathname,
        title: document.title.slice(0, 200),
        referrer: visit.isNew ? externalReferrer() : null,
        utmSource: params.get("utm_source"),
        utmMedium: params.get("utm_medium"),
        utmCampaign: params.get("utm_campaign"),
      });
    }, 250);

    // ---- Secties ----
    const isInView = (entry: IntersectionObserverEntry) => {
      const viewport = window.innerHeight || 1;
      const needed = Math.min(entry.boundingClientRect.height * 0.5, viewport * 0.4);
      return entry.isIntersecting && entry.intersectionRect.height >= needed;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const now = Date.now();
        const pageVisible = document.visibilityState === "visible";
        for (const entry of entries) {
          const stat = state.sections.get(entry.target);
          if (!stat) continue;
          if (isInView(entry)) {
            if (stat.since === null && pageVisible) stat.since = now;
          } else if (stat.since !== null) {
            stat.ms += now - stat.since;
            stat.since = null;
          }
        }
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    );
    state.observer = observer;

    const collectSections = () => {
      const all = Array.from(document.querySelectorAll("section, [data-track-section]"));
      // Geneste secties overslaan; de buitenste sectie telt.
      const top = all.filter((el) => !el.parentElement?.closest("section, [data-track-section]"));
      const usedIds = new Set(Array.from(state.sections.values()).map((s) => s.id));
      top.forEach((el, index) => {
        if (state.sections.has(el) || state.sections.size >= MAX_SECTIONS) return;
        const desc = describeSection(el, index);
        let id = desc.id;
        let n = 2;
        while (usedIds.has(id)) id = `${desc.id}-${n++}`;
        usedIds.add(id);
        state.sections.set(el, { id, label: desc.label, ms: 0, since: null });
        observer.observe(el);
      });
    };
    const sectionTimers = [300, 1500, 4000].map((ms) => window.setTimeout(collectSections, ms));

    // ---- Tijd + scroll ----
    const currentActiveMs = () =>
      state.activeMs + (state.activeSince !== null ? Date.now() - state.activeSince : 0);

    const sectionPayload = () => {
      const now = Date.now();
      return Array.from(state.sections.values())
        .map((s) => ({
          id: s.id,
          label: s.label,
          ms: Math.round(s.ms + (s.since !== null ? now - s.since : 0)),
        }))
        .filter((s) => s.ms >= 1000);
    };

    const ping = () => {
      touchVisit(state.visitId);
      send({
        type: "ping",
        visitorId: state.visitorId,
        visitId: state.visitId,
        pageviewId: state.pageviewId,
        durationMs: Math.round(currentActiveMs()),
        maxScroll: state.maxScroll,
        sections: sectionPayload(),
      });
    };

    const onScroll = () => {
      const pct = scrollPercent();
      if (pct > state.maxScroll) state.maxScroll = pct;
    };

    const pauseTimers = () => {
      const now = Date.now();
      if (state.activeSince !== null) {
        state.activeMs += now - state.activeSince;
        state.activeSince = null;
      }
      for (const s of state.sections.values()) {
        if (s.since !== null) {
          s.ms += now - s.since;
          s.since = null;
        }
      }
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        pauseTimers();
        ping();
      } else {
        if (state.activeSince === null) state.activeSince = Date.now();
        // Secties die in beeld zijn worden bij de volgende observer-callback
        // weer gestart; forceer die door opnieuw te observeren.
        for (const el of state.sections.keys()) {
          observer.unobserve(el);
          observer.observe(el);
        }
        ping();
      }
    };

    const onPageHide = () => {
      pauseTimers();
      ping();
    };

    const heartbeat = window.setInterval(() => {
      if (document.visibilityState === "visible") ping();
    }, HEARTBEAT_MS);

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onPageHide);

    return () => {
      window.clearTimeout(pageviewTimer);
      sectionTimers.forEach((t) => window.clearTimeout(t));
      window.clearInterval(heartbeat);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onPageHide);
      // Pagina verlaten via client-navigatie: laatste stand versturen.
      pauseTimers();
      ping();
      observer.disconnect();
      if (stateRef.current === state) stateRef.current = null;
    };
  }, [pathname]);

  return null;
}
