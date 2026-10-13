// Herkomst van een bezoek bepalen uit de referrer (of utm_source).
//
// Let op bij het lezen van de cijfers: AI-assistenten sturen lang niet altijd
// een referrer mee. Een deel van het ChatGPT-verkeer belandt daardoor
// onvermijdelijk onder "Direct". De cijfers hieronder zijn dus een ondergrens.

export type SourceCategory = "ai" | "zoekmachine" | "sociaal" | "direct" | "overig";

export type TrafficSource = {
  /** Weergavenaam, bijvoorbeeld "ChatGPT" of "DuckDuckGo". */
  label: string;
  category: SourceCategory;
};

export const CATEGORY_LABELS: Record<SourceCategory, string> = {
  ai: "AI-assistenten",
  zoekmachine: "Zoekmachines",
  sociaal: "Sociale media",
  direct: "Direct",
  overig: "Overig",
};

/**
 * Volgorde is belangrijk: gemini.google.com moet vóór de algemene Google-regel.
 * `hosts` matcht het domein zelf of een subdomein ervan; `anyTld` matcht een
 * domein met willekeurige landextensie (google.nl, google.de, pinterest.co.uk).
 */
const HOST_RULES: {
  hosts?: string[];
  anyTld?: string[];
  label: string;
  category: SourceCategory;
}[] = [
  { hosts: ["chatgpt.com", "chat.openai.com", "openai.com"], label: "ChatGPT", category: "ai" },
  { hosts: ["perplexity.ai"], label: "Perplexity", category: "ai" },
  { hosts: ["claude.ai"], label: "Claude", category: "ai" },
  { hosts: ["gemini.google.com", "bard.google.com"], label: "Gemini", category: "ai" },
  { hosts: ["copilot.microsoft.com"], label: "Copilot", category: "ai" },
  { hosts: ["you.com"], label: "You.com", category: "ai" },
  { hosts: ["grok.com", "x.ai"], label: "Grok", category: "ai" },

  { hosts: ["duckduckgo.com"], label: "DuckDuckGo", category: "zoekmachine" },
  { hosts: ["bing.com"], label: "Bing", category: "zoekmachine" },
  { hosts: ["ecosia.org"], label: "Ecosia", category: "zoekmachine" },
  { hosts: ["startpage.com"], label: "Startpage", category: "zoekmachine" },
  { hosts: ["search.brave.com"], label: "Brave Search", category: "zoekmachine" },
  { hosts: ["yandex.com", "yandex.ru"], label: "Yandex", category: "zoekmachine" },
  { hosts: ["qwant.com"], label: "Qwant", category: "zoekmachine" },
  { hosts: ["search.yahoo.com", "yahoo.com"], label: "Yahoo", category: "zoekmachine" },
  { anyTld: ["google"], label: "Google", category: "zoekmachine" },

  { hosts: ["facebook.com", "fb.me"], label: "Facebook", category: "sociaal" },
  { hosts: ["instagram.com"], label: "Instagram", category: "sociaal" },
  { hosts: ["linkedin.com", "lnkd.in"], label: "LinkedIn", category: "sociaal" },
  { hosts: ["whatsapp.com"], label: "WhatsApp", category: "sociaal" },
  { hosts: ["t.co", "twitter.com", "x.com"], label: "X", category: "sociaal" },
  { anyTld: ["pinterest"], label: "Pinterest", category: "sociaal" },
  { hosts: ["reddit.com"], label: "Reddit", category: "sociaal" },
  { hosts: ["youtube.com", "youtu.be"], label: "YouTube", category: "sociaal" },
];

/** Namen zoals ze in utm_source voorkomen (bijv. ?utm_source=chatgpt.com). */
const UTM_ALIASES: Record<string, string> = {
  chatgpt: "chatgpt.com",
  openai: "chatgpt.com",
  perplexity: "perplexity.ai",
  claude: "claude.ai",
  gemini: "gemini.google.com",
  copilot: "copilot.microsoft.com",
  google: "google.com",
  bing: "bing.com",
  duckduckgo: "duckduckgo.com",
  ddg: "duckduckgo.com",
  facebook: "facebook.com",
  instagram: "instagram.com",
  linkedin: "linkedin.com",
  whatsapp: "whatsapp.com",
};

const OWN_HOST = "praktijkdenieuweweelde.nl";

function fromHost(host: string): TrafficSource | null {
  const h = host.toLowerCase().replace(/^www\./, "");
  for (const rule of HOST_RULES) {
    const exact = rule.hosts?.some((needle) => h === needle || h.endsWith(`.${needle}`));
    // Domein met willekeurige extensie: google.nl, google.co.uk, maar niet notgoogle.com.
    const anyTld = rule.anyTld?.some((needle) =>
      new RegExp(`(^|\\.)${needle}\\.[a-z]{2,}(\\.[a-z]{2,})?$`).test(h)
    );
    if (exact || anyTld) return { label: rule.label, category: rule.category };
  }
  return null;
}

export function trafficSource(referrer: string | null, utmSource: string | null): TrafficSource {
  if (utmSource) {
    const key = utmSource.toLowerCase().trim();
    const alias = UTM_ALIASES[key] ?? UTM_ALIASES[key.replace(/\.(com|nl|ai|org)$/, "")];
    const known = fromHost(alias ?? key);
    if (known) return known;
    return { label: utmSource.slice(0, 40), category: "overig" };
  }

  if (!referrer) return { label: "Direct", category: "direct" };

  let host: string;
  try {
    host = new URL(referrer).host;
  } catch {
    return { label: referrer.slice(0, 40), category: "overig" };
  }

  const clean = host.toLowerCase().replace(/^www\./, "");
  if (clean === OWN_HOST || clean.endsWith(`.${OWN_HOST}`)) {
    return { label: "Eigen site", category: "overig" };
  }

  return fromHost(clean) ?? { label: clean, category: "overig" };
}
