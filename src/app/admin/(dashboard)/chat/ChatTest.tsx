"use client";

import { useState } from "react";

type Uitslag =
  | { ok: true; ms: number; model: string; antwoord: string }
  | { ok: false; status: number | null; code: string | null; message: string; ms?: number };

export default function ChatTest() {
  const [bezig, setBezig] = useState(false);
  const [uitslag, setUitslag] = useState<Uitslag | null>(null);

  async function test() {
    setBezig(true);
    setUitslag(null);
    try {
      const res = await fetch("/api/admin/chat-test", { method: "POST" });
      setUitslag((await res.json()) as Uitslag);
    } catch {
      setUitslag({
        ok: false,
        status: null,
        code: "netwerk",
        message: "De test kon niet worden uitgevoerd. Probeer het zo nog eens.",
      });
    } finally {
      setBezig(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={test}
          disabled={bezig}
          className={`px-5 py-2.5 rounded-full font-semibold text-sm btn-primary transition ${
            bezig ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {bezig ? "Bezig met testen…" : "Test de chat"}
        </button>
        <p className="text-[#5E524F]/60 text-sm">
          Stuurt één bericht naar Anthropic, met hetzelfde model als het chatvenster.
        </p>
      </div>

      {uitslag?.ok && (
        <div className="mt-4 rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
          <p className="font-medium">De chat werkt.</p>
          <p className="mt-1 text-green-700">
            Antwoord binnen {(uitslag.ms / 1000).toFixed(1)} seconden, via {uitslag.model}.
          </p>
        </div>
      )}

      {uitslag && !uitslag.ok && (
        <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 p-3 text-sm text-amber-900">
          <p className="font-medium">De chat werkt niet.</p>
          <p className="mt-1">
            {uitslag.status === 401 || uitslag.code === "authentication_error"
              ? "De sleutel wordt geweigerd. Staat de nieuwe sleutel in Vercel bij Environment Variables voor Production, en is er daarna opnieuw uitgerold?"
              : uitslag.status === 400 && uitslag.code === "invalid_request_error"
                ? "Anthropic weigert de aanvraag zelf. Meestal betekent dat het model of een instelling."
                : uitslag.status === 429
                  ? "Te veel aanvragen of geen tegoed meer op de sleutel. Kijk in je Anthropic Console bij facturering."
                  : uitslag.code === "geen_sleutel"
                    ? "Er staat helemaal geen sleutel in deze omgeving."
                    : "Onverwachte fout."}
          </p>
          <p className="mt-3 text-xs text-amber-700/80 break-words">
            Wat Anthropic zei: {uitslag.status ? `${uitslag.status} · ` : ""}
            {uitslag.code ? `${uitslag.code} · ` : ""}
            {uitslag.message}
          </p>
        </div>
      )}
    </div>
  );
}
