// Dunne wrapper om gtag. GA4 wordt in de root layout geladen; als het script nog
// niet beschikbaar is (of geblokkeerd wordt), doet deze functie niets.

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, params?: GtagParams) => void;
  }
}

export function trackEvent(eventName: string, params?: GtagParams): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}

/**
 * Aanvraag via een van de formulieren. `formulier` maakt in GA4 onderscheid
 * tussen het contactformulier op de homepage en het intakeformulier.
 */
export function trackLead(formulier: "contact" | "intake"): void {
  trackEvent("generate_lead", { formulier });
}
