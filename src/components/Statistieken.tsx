"use client";

import { useEffect, useRef, useState } from "react";

interface MethodCard {
  percentage: number;
  method: string;
  subtitle: string;
  description: string;
  source: string;
  delay: string;
}

const methods: MethodCard[] = [
  {
    percentage: 71,
    method: "IBCT",
    subtitle: "Integrative Behavioral Couple Therapy",
    description:
      "Wetenschappelijk onderbouwd via de grootste gerandomiseerde studie in de relatietherapie. Effecten blijven aantoonbaar stabiel tot vijf jaar na afsluiting.",
    source: "Christensen et al., RCT",
    delay: "100",
  },
  {
    percentage: 73,
    method: "EFT",
    subtitle: "Emotionally Focused Therapy",
    description:
      "Gehechtheidsgebaseerde aanpak waarbij 82% van de behaalde resultaten stabiel blijft bij follow-up onderzoek tot twee jaar na de behandeling.",
    source: "Internationaal EFT-onderzoek",
    delay: "200",
  },
  {
    percentage: 70,
    method: "Gottman",
    subtitle: "Gottman Method",
    description:
      "Gebaseerd op meer dan 40 jaar longitudinaal onderzoek. Richt zich op concrete communicatiepatronen en het versterken van vriendschap en vertrouwen.",
    source: "Gottman Institute Research",
    delay: "300",
  },
];

function AnimatedPercentage({
  target,
  delayMs = 0,
}: {
  target: number;
  delayMs?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          setTimeout(() => {
            let current = 0;
            const steps = 60;
            const duration = 1600;
            const increment = target / steps;
            const intervalMs = duration / steps;
            const timer = setInterval(() => {
              current = Math.min(current + increment, target);
              setCount(Math.round(current));
              if (current >= target) clearInterval(timer);
            }, intervalMs);
          }, delayMs);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, delayMs]);

  return <span ref={ref}>{count}</span>;
}

export default function Statistieken() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-6">
            Relatietherapie werkt
          </h2>
          <p className="text-[#5E524F] text-lg max-w-2xl mx-auto leading-relaxed">
            Wetenschappelijk onderzoek — waaronder meta-analyses van meer dan 129
            studies — laat zien dat{" "}
            <span className="font-semibold text-[#6B6866]">
              7 op de 10 koppels
            </span>{" "}
            aantoonbaar baat heeft bij professionele relatiebegeleiding. Alle
            erkende methoden zijn evidence-based en geven vergelijkbaar goede
            resultaten.
          </p>
        </div>

        {/* Method cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {methods.map((m) => (
            <div
              key={m.method}
              data-aos="fade-up"
              data-aos-delay={m.delay}
              className="card-hover card-accent-hover bg-[#F5F0EB] rounded-2xl p-8 text-center flex flex-col"
            >
              {/* Big number */}
              <div className="mb-1">
                <span className="text-5xl md:text-6xl font-[family-name:var(--font-playfair)] font-bold text-[#946B66]">
                  <AnimatedPercentage
                    target={m.percentage}
                    delayMs={parseInt(m.delay)}
                  />
                </span>
                <span className="text-3xl font-[family-name:var(--font-playfair)] font-bold text-[#946B66]">
                  %
                </span>
              </div>
              <p className="text-xs text-[#C4A4A0] mb-5">
                van de koppels geholpen
              </p>

              <div className="border-t border-[#E8D5D2] pt-5 mb-4">
                <h3 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-1">
                  {m.method}
                </h3>
                <p className="text-xs text-[#C4A4A0]">{m.subtitle}</p>
              </div>

              <p className="text-[#5E524F] text-sm leading-relaxed flex-grow">
                {m.description}
              </p>

              <p className="mt-5 text-xs text-[#B0ADAB] border-t border-[#E8D5D2] pt-4">
                — {m.source}
              </p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p
          data-aos="fade-up"
          className="text-center text-xs text-[#B0ADAB] max-w-2xl mx-auto leading-relaxed"
        >
          Internationaal onderzoek toont geen significant verschil in
          effectiviteit tussen erkende methoden. De keuze voor een aanpak hangt
          af van de situatie en de voorkeuren van het koppel.
        </p>
      </div>
    </section>
  );
}
