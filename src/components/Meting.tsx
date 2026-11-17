"use client";

/**
 * Meten gebeurt alleen met toestemming. Deze component leest de keuze uit
 * localStorage en laadt pas daarna Google Analytics en de bezoekersanalyse.
 * Zonder keuze, of na een weigering, draait er niets en wordt er niets
 * opgeslagen.
 *
 * CookieBanner stuurt bij een keuze het venster-event "cookie-consent" zodat
 * dit meteen aangaat of uitblijft, zonder de pagina te herladen.
 */

import { useEffect, useState } from "react";
import Script from "next/script";
import VisitorTracker from "@/components/VisitorTracker";

export const CONSENT_KEY = "cookie-consent";
export const CONSENT_EVENT = "cookie-consent";
const GA_ID = "G-HRJJ0SLP3D";

export type Consent = "accepted" | "declined";

export function leesConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "accepted" || v === "declined" ? v : null;
  } catch {
    return "declined";
  }
}

/** Slaat de keuze op en laat de rest van de pagina het meteen weten. */
export function zetConsent(keuze: Consent): void {
  try {
    localStorage.setItem(CONSENT_KEY, keuze);
  } catch {
    // localStorage niet beschikbaar; de keuze geldt dan alleen nu
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: keuze }));
}

export default function Meting() {
  const [consent, setConsent] = useState<Consent | null>(null);

  useEffect(() => {
    setConsent(leesConsent());
    const bij = (e: Event) => {
      const keuze = (e as CustomEvent<Consent>).detail;
      setConsent(keuze === "accepted" ? "accepted" : "declined");
    };
    window.addEventListener(CONSENT_EVENT, bij);
    return () => window.removeEventListener(CONSENT_EVENT, bij);
  }, []);

  if (consent !== "accepted") return null;

  return (
    <>
      <VisitorTracker />
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}');
      `}</Script>
    </>
  );
}
