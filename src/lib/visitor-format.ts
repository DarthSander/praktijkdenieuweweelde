// Weergave-helpers voor de bezoekersanalyse (server en client).

const COUNTRY_NAMES: Record<string, string> = {
  NL: "Nederland",
  BE: "België",
  DE: "Duitsland",
  FR: "Frankrijk",
  GB: "Verenigd Koninkrijk",
  US: "Verenigde Staten",
};

export function formatLocation(city: string | null, region: string | null, country: string | null): string {
  const countryName = country ? (COUNTRY_NAMES[country] ?? country) : null;
  if (city && countryName) return country === "NL" ? city : `${city}, ${countryName}`;
  if (city) return city;
  if (region && countryName) return `${region}, ${countryName}`;
  return countryName ?? "Onbekend";
}

export function timeAgo(date: Date | string, now: number = Date.now()): string {
  const diff = Math.max(0, now - new Date(date).getTime());
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return "zojuist";
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} min geleden`;
  const hours = Math.floor(min / 60);
  if (hours < 24) return `${hours} uur geleden`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "gisteren";
  if (days < 30) return `${days} dagen geleden`;
  const months = Math.floor(days / 30);
  return months === 1 ? "1 maand geleden" : `${months} maanden geleden`;
}

export function formatDuration(ms: number): string {
  const totalSec = Math.round(ms / 1000);
  if (totalSec < 60) return `${totalSec} s`;
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  if (min < 60) return sec ? `${min} min ${sec} s` : `${min} min`;
  const hours = Math.floor(min / 60);
  return `${hours} u ${min % 60} min`;
}

export function referrerLabel(referrer: string | null, utmSource: string | null): string {
  if (utmSource) return utmSource;
  if (!referrer) return "Direct";
  try {
    return new URL(referrer).host.replace(/^www\./, "");
  } catch {
    return referrer.slice(0, 40);
  }
}

export function ordinalVisit(n: number): string {
  return n <= 1 ? "eerste bezoek" : `${n}e bezoek`;
}

export function formatDateTime(date: Date | string): string {
  return new Date(date).toLocaleString("nl-NL", {
    timeZone: "Europe/Amsterdam",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}
