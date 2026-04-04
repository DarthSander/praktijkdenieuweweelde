"use client";

import { Heart, RefreshCw, Users } from "lucide-react";

const pillars = [
  {
    icon: Heart,
    title: "Acceptatie",
    text: "Niet alle verschillen zijn op te lossen. We leren de verschillen niet als vijand te zien, maar als een onderdeel van jullie unieke dynamiek. Vanuit begrip ontstaat zachtheid.",
    delay: "100",
  },
  {
    icon: RefreshCw,
    title: "Verandering",
    text: "Waar destructieve patronen de relatie schaden, werken we actief aan gedragsverandering. We oefenen met communicatie en nieuwe manieren van reageren op elkaar.",
    delay: "200",
  },
  {
    icon: Users,
    title: "Verbinding",
    text: "Het uiteindelijke doel is emotionele hereniging. Jullie leren elkaars \u2018gebruiksaanwijzing\u2019 opnieuw kennen en cre\u00EBren een veilige basis om samen verder te groeien.",
    delay: "300",
  },
];

export default function IBCT() {
  return (
    <section id="ibct" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-6">
            Wat is IBCT?
          </h2>
          <p className="text-[#5E524F] text-lg max-w-2xl mx-auto leading-relaxed">
            Integrative Behavioral Couple Therapy (IBCT) is een wetenschappelijk onderbouwde vorm van relatietherapie die de balans zoekt tussen acceptatie en verandering.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              data-aos="fade-up"
              data-aos-delay={pillar.delay}
              className="card-hover card-accent-hover bg-[#F5F0EB] rounded-2xl p-8 text-center"
            >
              <div className="card-icon w-16 h-16 bg-[#E8D5D2]/40 rounded-full flex items-center justify-center mx-auto mb-6">
                <pillar.icon className="w-7 h-7 text-[#C4A4A0]" />
              </div>
              <h3 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-4">
                {pillar.title}
              </h3>
              <p className="text-[#5E524F] leading-relaxed">{pillar.text}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
