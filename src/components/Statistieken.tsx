"use client";

import { useEffect, useRef, useState } from "react";

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

const relatiemethoden = [
  {
    method: "EFT",
    subtitle: "Emotionally Focused Therapy",
    percentage: 73,
  },
  {
    method: "IBCT",
    subtitle: "Integrative Behavioral Couple Therapy",
    percentage: 71,
  },
  {
    method: "Gottman",
    subtitle: "Gottman Method",
    percentage: 70,
  },
];

// Gemiddelde: (73 + 71 + 70) / 3 ≈ 71
const gemiddeld = 71;

export default function Statistieken() {
  return (
    <section className="section-padding bg-[#E8D5D2]">
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

        {/* Gecombineerd methode-blok */}
        <div className="max-w-2xl mx-auto mb-10" data-aos="fade-up" data-aos-delay="100">
          <div className="card-hover card-accent-hover bg-[#F5F0EB] rounded-2xl p-8 text-center flex flex-col">
            {/* Gemiddeld percentage */}
            <div className="mb-1">
              <span className="text-5xl md:text-6xl font-[family-name:var(--font-playfair)] font-bold text-[#946B66]">
                <AnimatedPercentage target={gemiddeld} delayMs={100} />
              </span>
              <span className="text-3xl font-[family-name:var(--font-playfair)] font-bold text-[#946B66]">
                %
              </span>
            </div>
            <p className="text-xs text-[#C4A4A0] mb-6">
              gemiddeld succes&shy;percentage — erkende relatietherapie&shy;methoden
            </p>

            {/* Drie methoden */}
            <div className="border-t border-[#E8D5D2] pt-6 flex flex-col gap-4">
              {relatiemethoden.map((m) => (
                <div key={m.method} className="flex items-baseline justify-between gap-4">
                  <div className="text-left">
                    <span className="text-base font-[family-name:var(--font-playfair)] font-bold text-[#6B6866]">
                      {m.method}
                    </span>
                    <span className="ml-2 text-xs text-[#C4A4A0]">{m.subtitle}</span>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-[#946B66]">{m.percentage}%</span>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs text-[#B0ADAB] border-t border-[#E8D5D2] pt-4">
              — Christensen et al., Internationaal EFT-onderzoek, Gottman Institute Research
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <p
          data-aos="fade-up"
          className="text-center text-xs text-[#8A7F7C] max-w-2xl mx-auto leading-relaxed"
        >
          Internationaal onderzoek toont geen significant verschil in
          effectiviteit tussen erkende methoden. De keuze voor een aanpak hangt
          af van de situatie en de voorkeuren van het koppel.
        </p>
      </div>
    </section>
  );
}
