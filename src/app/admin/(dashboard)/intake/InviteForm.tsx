"use client";

import { useState } from "react";

type State =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "success"; link: string; mailed: boolean; mailError?: string }
  | { status: "error"; message: string };

const inputClass =
  "w-full px-3 py-2.5 rounded-lg border border-[#EDE6DD] bg-white text-[#5E524F] text-sm focus:border-[#C4A4A0] focus:ring-0 outline-none transition placeholder:text-[#C4A4A0]/60";

export default function InviteForm() {
  const [state, setState] = useState<State>({ status: "idle" });
  const [gekopieerd, setGekopieerd] = useState(false);

  async function kopieer(link: string) {
    try {
      await navigator.clipboard.writeText(link);
      setGekopieerd(true);
      setTimeout(() => setGekopieerd(false), 2500);
    } catch {
      // Zonder toestemming voor het klembord blijft de link gewoon te selecteren.
      setGekopieerd(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState({ status: "sending" });
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;

    try {
      const res = await fetch("/api/admin/intake/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setState({ status: "error", message: json.error || "Er ging iets mis." });
        return;
      }
      setState({
        status: "success",
        link: json.link,
        mailed: json.mailed !== false,
        mailError: json.mailError,
      });
      form.reset();
    } catch {
      setState({ status: "error", message: "Netwerkfout. Probeer het opnieuw." });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-xs font-semibold text-[#C4A4A0] uppercase tracking-wide mb-1.5">
          Naam (optioneel)
        </label>
        <input id="name" name="name" type="text" placeholder="Naam van de klant" className={inputClass} />
      </div>
      <div>
        <label htmlFor="email" className="block text-xs font-semibold text-[#C4A4A0] uppercase tracking-wide mb-1.5">
          E-mailadres
        </label>
        <input id="email" name="email" type="email" required placeholder="klant@email.nl" className={inputClass} />
      </div>

      <button
        type="submit"
        disabled={state.status === "sending"}
        className={`w-full py-3 rounded-full font-semibold text-sm btn-primary transition-all ${state.status === "sending" ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        {state.status === "sending" ? "Bezig met versturen…" : "Verstuur intake-link"}
      </button>

      {state.status === "success" && state.mailed && (
        <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
          <p className="font-medium">Verstuurd!</p>
          <p className="mt-1 break-all text-green-700">{state.link}</p>
        </div>
      )}
      {state.status === "success" && !state.mailed && (
        <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-sm text-amber-900">
          <p className="font-medium">De link is aangemaakt, de e-mail niet verstuurd.</p>
          <p className="mt-1">
            Kopieer de link hieronder en stuur hem zelf. Hij werkt gewoon.
          </p>
          <p className="mt-2 break-all font-mono text-xs text-amber-800">{state.link}</p>
          <button
            type="button"
            onClick={() => kopieer(state.link)}
            className="mt-2 px-3 py-1.5 rounded-full border border-amber-300 text-xs font-semibold hover:bg-amber-100 transition"
          >
            {gekopieerd ? "Gekopieerd" : "Kopieer link"}
          </button>
          {state.mailError && (
            <p className="mt-3 text-xs text-amber-700/80">
              Wat de mailserver zei: {state.mailError}
            </p>
          )}
        </div>
      )}
      {state.status === "error" && (
        <p className="text-red-500 text-sm">{state.message}</p>
      )}
    </form>
  );
}
