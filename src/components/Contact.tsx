"use client";

import { useState } from "react";
import { MapPin, Mail, Phone } from "lucide-react";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.target as HTMLFormElement;

    const data = {
      access_key: "cd65f5d3-eb8f-4281-91e1-94e7d38bd740",
      name: (form.elements.namedItem("naam") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("bericht") as HTMLTextAreaElement).value,
      partner: (form.elements.namedItem("partner") as HTMLInputElement).value,
      telefoon: (form.elements.namedItem("telefoon") as HTMLInputElement).value,
      subject: "Nieuw contactverzoek via de website",
      from_name: "Relatiepraktijk de Nieuwe Weelde",
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        setErrorMsg(json.message || "Er ging iets mis. Probeer het later opnieuw.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Er ging iets mis. Controleer je internetverbinding.");
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section-padding bg-[#F5F0EB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div data-aos="fade-up" className="grid md:grid-cols-5 rounded-2xl overflow-hidden shadow-xl">
          {/* Left: Info panel */}
          <div className="md:col-span-2 bg-[#946B66] p-8 md:p-10 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-playfair)] font-bold !text-white mb-4">
                Laten we kennismaken
              </h2>
              <p className="text-white/75 text-sm leading-relaxed mb-8">
                Hebben jullie vragen of willen jullie direct een intake plannen? Vul het formulier in en ik neem binnen 24 uur contact op.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#E8D5D2] mt-0.5 flex-shrink-0" />
                  <span className="text-white/75 text-sm">Werkgebied: Tilburg e.o.<br />(Reeshof, Centrum, Berkel-Enschot)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#E8D5D2] flex-shrink-0" />
                  <a href="mailto:Info@praktijkdenieuweweelde.nl" className="text-white/75 hover:text-white transition text-sm">Info@praktijkdenieuweweelde.nl</a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#E8D5D2] flex-shrink-0" />
                  <a href="tel:0610096923" className="text-white/75 hover:text-white transition text-sm">06 - 10096923</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="md:col-span-3 bg-white p-8 md:p-10">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-10">
                <div className="w-16 h-16 rounded-full bg-[#E8D5D2] flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-[#946B66]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-[family-name:var(--font-playfair)] font-bold !text-[#6B6866] mb-2">Bericht verzonden!</h3>
                <p className="text-[#5E524F] text-sm">Bedankt voor je bericht. Ik neem binnen 24 uur contact op.</p>
                <button onClick={() => setStatus("idle")} className="mt-6 text-[#C4A4A0] text-sm underline underline-offset-2">Nieuw bericht sturen</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="naam" className="block text-xs font-semibold text-[#C4A4A0] uppercase tracking-wide mb-1.5">Naam</label>
                    <input type="text" id="naam" name="naam" required placeholder="Jouw naam" className="w-full px-0 py-2.5 border-0 border-b border-[#EDE6DD] bg-transparent text-[#5E524F] text-sm focus:border-[#C4A4A0] focus:ring-0 outline-none transition placeholder:text-[#E8D5D2]" />
                  </div>
                  <div>
                    <label htmlFor="partner" className="block text-xs font-semibold text-[#C4A4A0] uppercase tracking-wide mb-1.5">Naam partner</label>
                    <input type="text" id="partner" name="partner" placeholder="Naam partner" className="w-full px-0 py-2.5 border-0 border-b border-[#EDE6DD] bg-transparent text-[#5E524F] text-sm focus:border-[#C4A4A0] focus:ring-0 outline-none transition placeholder:text-[#E8D5D2]" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-[#C4A4A0] uppercase tracking-wide mb-1.5">E-mailadres</label>
                    <input type="email" id="email" name="email" required placeholder="je@email.nl" className="w-full px-0 py-2.5 border-0 border-b border-[#EDE6DD] bg-transparent text-[#5E524F] text-sm focus:border-[#C4A4A0] focus:ring-0 outline-none transition placeholder:text-[#E8D5D2]" />
                  </div>
                  <div>
                    <label htmlFor="telefoon" className="block text-xs font-semibold text-[#C4A4A0] uppercase tracking-wide mb-1.5">Telefoonnummer</label>
                    <input type="tel" id="telefoon" name="telefoon" placeholder="06 12345678" className="w-full px-0 py-2.5 border-0 border-b border-[#EDE6DD] bg-transparent text-[#5E524F] text-sm focus:border-[#C4A4A0] focus:ring-0 outline-none transition placeholder:text-[#E8D5D2]" />
                  </div>
                </div>
                <div>
                  <label htmlFor="bericht" className="block text-xs font-semibold text-[#C4A4A0] uppercase tracking-wide mb-1.5">Bericht</label>
                  <textarea id="bericht" name="bericht" rows={3} placeholder="Waar kan ik je mee helpen?" className="w-full px-0 py-2.5 border-0 border-b border-[#EDE6DD] bg-transparent text-[#5E524F] text-sm focus:border-[#C4A4A0] focus:ring-0 outline-none transition resize-none placeholder:text-[#E8D5D2]" />
                </div>
                {status === "error" && (
                  <p className="text-red-500 text-sm">{errorMsg}</p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className={`w-full py-3 rounded-full font-semibold text-sm transition-all duration-300 btn-primary ${status === "sending" ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  {status === "sending" ? "Bezig met verzenden…" : "Verstuur bericht"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
