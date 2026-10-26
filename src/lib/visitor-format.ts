// Weergave-helpers voor de bezoekersanalyse (server en client).

// Landnamen komen uit de browser- of serverbibliotheek zelf, zodat ook Spanje,
// Polen of Marokko een Nederlandse naam krijgen in plaats van een code.
let landnamen: Intl.DisplayNames | null = null;
function landnaam(code: string): string {
  try {
    landnamen ??= new Intl.DisplayNames(["nl"], { type: "region" });
    return landnamen.of(code.toUpperCase()) ?? code;
  } catch {
    return code;
  }
}

// Provincies kent Intl niet; dit zijn de twaalf codes die Vercel teruggeeft.
const PROVINCIES: Record<string, string> = {
  DR: "Drenthe",
  FL: "Flevoland",
  FR: "Friesland",
  GE: "Gelderland",
  GR: "Groningen",
  LI: "Limburg",
  NB: "Noord-Brabant",
  NH: "Noord-Holland",
  OV: "Overijssel",
  UT: "Utrecht",
  ZE: "Zeeland",
  ZH: "Zuid-Holland",
};

function regionaam(region: string, country: string | null): string {
  if (country === "NL") return PROVINCIES[region.toUpperCase()] ?? region;
  return region;
}

/**
 * De plaats komt van het IP-adres en is dus een benadering: vaak het knooppunt
 * van de provider in plaats van de woonplaats. Daarom liever een leesbare
 * provincie dan een code, en liever "Onbekend" dan iets wat suggereert dat we
 * het zeker weten.
 */
export function formatLocation(city: string | null, region: string | null, country: string | null): string {
  const countryName = country ? landnaam(country) : null;
  if (city && countryName) return country === "NL" ? city : `${city}, ${countryName}`;
  if (city) return city;
  if (region && countryName) {
    const naam = regionaam(region, country);
    return country === "NL" ? naam : `${naam}, ${countryName}`;
  }
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
