"use client";

import { Heart, HandHeart, Sparkles, MessageCircle } from "lucide-react";

const pillars = [
  {
    icon: Heart,
    title: "Acceptatie",
    text: "Het eerste spoor van IBCT: onderlinge verschillen leren accepteren. Inzicht in elkaars belevingswereld en gevoeligheden.",
    delay: "100",
  },
  {
    icon: HandHeart,
    title: "Tolerantie bevorderen",
    text: "Het tweede spoor: leren omgaan met verschillen die niet verdwijnen. Stap voor stap oefenen, herkennen wat je nodig hebt, en begrijpen dat sommige verschillen normaal zijn.",
    delay: "200",
  },
  {
    icon: Sparkles,
    title: "Uitwisseling van positief gedrag",
    text: "Kleine, haalbare gedragsveranderingen die direct effect hebben. Waardering vaker uitspreken, momenten van verbinding opzoeken en gedrag inzetten dat wél werkt.",
    delay: "300",
  },
  {
    icon: MessageCircle,
    title: "Communicatie verbeteren",
    text: "Vaardigheden die helpen om gesprekken helder en veilig te houden. Duidelijk aangeven wat je bedoelt, luisteren zonder te onderbreken en ruzies stoppen voordat ze escaleren.",
    delay: "400",
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
            Integrative Behavioral Couple Therapy (IBCT) is een wetenschappelijk onderbouwde
            vorm van relatietherapie die de balans zoekt tussen acceptatie en verandering. We
            werken langs vier samenhangende processen.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              data-aos="fade-up"
              data-aos-delay={pillar.delay}
              className="card-hover card-accent-hover bg-[#F5F0EB] rounded-2xl p-7 text-center"
            >
              <div className="card-icon w-14 h-14 bg-[#E8D5D2]/40 rounded-full flex items-center justify-center mx-auto mb-5">
                <pillar.icon className="w-6 h-6 text-[#C4A4A0]" />
              </div>
              <h3 className="text-lg font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-3">
                {pillar.title}
              </h3>
              <p className="text-[#5E524F] text-sm leading-relaxed">{pillar.text}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
