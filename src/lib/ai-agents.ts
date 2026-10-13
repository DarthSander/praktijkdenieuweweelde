// Herkent AI-assistenten die de site aan de serverkant ophalen.
//
// Dit verkeer staat los van de bezoekersanalyse: die draait in de browser en
// bots voeren geen JavaScript uit. Juist daarom is dit de enige plek waar
// zichtbaar wordt dat een AI je pagina's gebruikt.
//
// Het onderscheid dat ertoe doet:
// - "antwoord": opgehaald omdat iemand op dat moment een vraag stelde. Jouw
//   pagina is dus vrijwel zeker in een antwoord aan een echt persoon verwerkt.
// - "index": opgehaald om de site te doorzoeken of om modellen te trainen.
//   Dat zegt niets over een bezoeker nu, wel of je straks gevonden wordt.

export type AgentKind = "antwoord" | "index";

export type AiAgent = { name: string; kind: AgentKind };

/**
 * User-agent-tokens van AI-assistenten. De lijst verandert met enige
 * regelmaat; onbekende bots worden bewust niet vastgelegd, anders loopt de
 * tabel vol met gewone zoekmachines en scanners.
 */
const AGENTS: { token: string; name: string; kind: AgentKind }[] = [
  // Opgehaald tijdens het beantwoorden van een vraag.
  { token: "chatgpt-user", name: "ChatGPT", kind: "antwoord" },
  { token: "perplexity-user", name: "Perplexity", kind: "antwoord" },
  { token: "claude-user", name: "Claude", kind: "antwoord" },
  { token: "mistralai-user", name: "Mistral", kind: "antwoord" },
  { token: "duckassistbot", name: "DuckDuckGo AI", kind: "antwoord" },

  // Opgehaald om te indexeren of te trainen.
  { token: "oai-searchbot", name: "ChatGPT (zoekindex)", kind: "index" },
  { token: "gptbot", name: "OpenAI (training)", kind: "index" },
  { token: "claude-searchbot", name: "Claude (zoekindex)", kind: "index" },
  { token: "claudebot", name: "Anthropic (training)", kind: "index" },
  { token: "anthropic-ai", name: "Anthropic (training)", kind: "index" },
  { token: "perplexitybot", name: "Perplexity (zoekindex)", kind: "index" },
  { token: "applebot-extended", name: "Apple (training)", kind: "index" },
  { token: "applebot", name: "Apple (zoekindex)", kind: "index" },
  { token: "meta-externalagent", name: "Meta AI", kind: "index" },
  { token: "bytespider", name: "ByteDance", kind: "index" },
  { token: "amazonbot", name: "Amazon", kind: "index" },
  { token: "youbot", name: "You.com", kind: "index" },
  { token: "cohere-ai", name: "Cohere", kind: "index" },
  { token: "cohere-training-data-crawler", name: "Cohere (training)", kind: "index" },
  { token: "diffbot", name: "Diffbot", kind: "index" },
  { token: "timpibot", name: "Timpi", kind: "index" },
];

/** Geeft de AI-assistent achter een user-agent, of null als het er geen is. */
export function aiAgent(userAgent: string | null): AiAgent | null {
  if (!userAgent) return null;
  const ua = userAgent.toLowerCase();
  // Langste token eerst, zodat "applebot-extended" niet als "applebot" telt.
  for (const agent of [...AGENTS].sort((a, b) => b.token.length - a.token.length)) {
    if (ua.includes(agent.token)) return { name: agent.name, kind: agent.kind };
  }
  return null;
}
