// Instellingen van het chatvenster op één plek, zodat de testknop in de admin
// precies aanroept wat de bezoeker ook aanroept.
//
// Sonnet 5.5 is nieuwer én goedkoper dan de 4.6 die hier eerst stond: $2 in en
// $10 uit per miljoen tokens, tegen $3 en $15. Op dit model kan denken niet
// worden uitgezet met de versie van de SDK die hier draait, dus staat het op de
// laagste inspanning; voor vragen over tarieven en werkwijze is dat ruim
// voldoende. max_tokens staat daarom op 2048: denkstappen tellen mee in dat
// getal en mogen het antwoord niet afkappen.
export const CHAT_MODEL = "claude-sonnet-5-5";
export const CHAT_MAX_TOKENS = 2048;
export const CHAT_OUTPUT_CONFIG = { effort: "low" } as const;
