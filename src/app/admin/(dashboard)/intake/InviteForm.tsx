"use client";

import { useState } from "react";

type State =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "success"; link: string }
  | { status: "error"; message: string };

const inputClass =
  "w-full px-3 py-2.5 rounded-lg border border-[#EDE6DD] bg-white text-[#5E524F] text-sm focus:border-[#C4A4A0] focus:ring-0 outline-none transition placeholder:text-[#C4A4A0]/60";

export default function InviteForm() {
  const [state, setState] = useState<State>({ status: "idle" });

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
      setState({ status: "success", link: json.link });
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

      {state.status === "success" && (
        <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-800">
          <p className="font-medium">Verstuurd!</p>
          <p className="mt-1 break-all text-green-700">{state.link}</p>
        </div>
      )}
      {state.status === "error" && (
        <p className="text-red-500 text-sm">{state.message}</p>
      )}
    </form>
  );
}
