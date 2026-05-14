"use client";

import Image from "next/image";
import { Home, Clock, Calendar } from "lucide-react";

const features = [
  {
    icon: Home,
    title: "Vertrouwde omgeving",
    text: "Op jullie eigen bank kom je makkelijker tot een open gesprek dan in een onbekende omgeving.",
  },
  {
    icon: Clock,
    title: "Duur van begeleiding",
    text: "Een traject bestaat gemiddeld uit ongeveer 10 sessies, exclusief het intakegesprek. Dit is een richtlijn: sommige koppels hebben minder tijd nodig, anderen juist meer. We stemmen de duur altijd af op jullie proces.",
  },
  {
    icon: Calendar,
    title: "Flexibele tijden",
    text: "Sessies ook mogelijk in de avonduren en in de weekenden, passend bij jullie agenda.",
  },
];

export default function Werkwijze() {
  return (
    <section id="werkwijze" className="section-padding bg-[#F5F0EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div data-aos="fade-right">
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-6">
              Thuis in <span className="font-normal">Tilburg</span>
            </h2>
            <p className="text-[#5E524F] text-base leading-relaxed mb-10">
              Relatietherapie kan spannend voelen. Daarom draai ik het om: jullie hoeven niet naar een praktijkruimte, maar ik kom naar jullie toe, in jullie eigen vertrouwde omgeving.
            </p>
            <div className="space-y-8">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="card-icon w-10 h-10 bg-[#E8D5D2]/40 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <feature.icon className="w-5 h-5 text-[#C4A4A0]" />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-[#5E524F] text-sm leading-relaxed">{feature.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div data-aos="fade-left" data-aos-delay="200" className="photo-filter-wrapper rounded-2xl h-80 md:h-full md:min-h-[420px]">
            <Image
              src="https://img.wobbio.com/36/koen-sweers-2Jgg3hjAuek-unsplash.w640.webp"
              alt="Stadsgezicht Tilburg"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover photo-filter rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
