"use client";

// Placeholder-intakeformulier. De definitieve vragen volgen later; alle velden
// worden als één `answers`-object opgeslagen in een JSONB-kolom, dus uitbreiden
// kan zonder database-wijziging. Geef nieuwe velden simpelweg een `name`.
import { useState } from "react";

const inputClass =
  "w-full px-3 py-2.5 rounded-lg border border-[#EDE6DD] bg-white text-[#5E524F] text-sm focus:border-[#C4A4A0] focus:ring-0 outline-none transition placeholder:text-[#C4A4A0]/60";

export default function IntakeForm({ token }: { token: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const answers: Record<string, unknown> = {};
    for (const [key, value] of formData.entries()) {
      answers[key] = value;
    }

    try {
      const res = await fetch("/api/intake/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, answers }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error || "Er ging iets mis. Probeer het opnieuw.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setError("Netwerkfout. Probeer het opnieuw.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-6">
        <h2 className="text-lg font-[family-name:var(--font-playfair)] font-bold text-[#5E524F] mb-2">
          Bedankt!
        </h2>
        <p className="text-[#5E524F]/80 text-sm">
          Je intake is verstuurd. Ik neem contact met je op voor de afspraak.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* TODO: definitieve intakevragen toevoegen. Onderstaande velden zijn
          voorlopige placeholders zodat de flow werkt. */}
      <div>
        <label htmlFor="naam" className="block text-xs font-semibold text-[#C4A4A0] uppercase tracking-wide mb-1.5">
          Naam
        </label>
        <input id="naam" name="naam" type="text" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="telefoon" className="block text-xs font-semibold text-[#C4A4A0] uppercase tracking-wide mb-1.5">
          Telefoonnummer
        </label>
        <input id="telefoon" name="telefoon" type="tel" className={inputClass} />
      </div>
      <div>
        <label htmlFor="toelichting" className="block text-xs font-semibold text-[#C4A4A0] uppercase tracking-wide mb-1.5">
          Waar willen jullie aan werken?
        </label>
        <textarea id="toelichting" name="toelichting" rows={4} className={`${inputClass} resize-none`} />
      </div>

      {status === "error" && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className={`w-full py-3 rounded-full font-semibold text-sm btn-primary transition-all ${status === "sending" ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        {status === "sending" ? "Bezig met verzenden…" : "Verstuur intake"}
      </button>
    </form>
  );
}
