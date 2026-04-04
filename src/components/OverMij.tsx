"use client";

import Image from "next/image";
import { Heart, BookOpen } from "lucide-react";

export default function OverMij() {
  return (
    <section id="over-mij" className="section-padding bg-[#F5F0EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Image */}
          <div data-aos="fade-right" className="relative">
            <div className="photo-filter-wrapper rounded-2xl h-[380px] md:h-[480px]">
              <Image
                src="https://img.wobbio.com/36/natalia-sobolivska-Gua91HwwJAs-unsplash.w1280.webp"
                alt="Warme vertrouwde sfeer"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover photo-filter rounded-2xl"
              />
            </div>
          </div>

          {/* Right: Text */}
          <div data-aos="fade-left" data-aos-delay="200">
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-8">
              Welkom bij de Nieuwe Weelde
            </h2>
            <div className="text-[#5E524F] text-base leading-relaxed space-y-5">
              <p>
                Ik ben Eva Mulder, relatietherapeut, gespecialiseerd in IBCT.
                Ik raak nooit uitgekeken op de complexiteit en de
                kwetsbare schoonheid van menselijke relaties. Tijdens mijn
                sessies begeleid ik koppels die elkaar even kwijt zijn, maar de
                weg naar elkaar terug willen vinden. We onderzoeken wat er is
                vastgelopen, wat er nog wel werkt en hoe jullie opnieuw in
                gesprek kunnen komen op een manier die veilig en verbindend
                voelt.
              </p>
              <p>
                Ook koppels die besluiten uit elkaar te gaan, of twijfelen over
                hun toekomst samen, zijn welkom. Ik help jullie om dit proces op
                een respectvolle en zorgzame manier vorm te geven. Goed om te
                weten: ik kom naar jullie toe. In jullie eigen veilige haven in
                Tilburg en omgeving cre&euml;ren we samen de rust en ruimte die
                nodig is om echt naar elkaar te luisteren.
              </p>
            </div>
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 fill-[#B0ADAB] text-[#B0ADAB]" />
                <div>
                  <p className="font-semibold text-sm text-[#6B6866]">
                    Gespecialiseerd in IBCT
                  </p>
                  <p className="text-xs text-[#C4A4A0]">
                    Integrative Behavioral Couple Therapy
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-[#B0ADAB] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-[#6B6866]">
                    Opleiding gevolgd bij
                  </p>
                  <p className="text-xs text-[#C4A4A0]">
                    dr. Pieternel Dijkstra &amp; drs. Aerjen Tamminga via{" "}
                    <a
                      href="https://relatieguide.nl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 hover:text-[#946B66] transition"
                    >
                      Relatie Guide
                    </a>
                    {" "}· geaccrediteerd door NVRG
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
