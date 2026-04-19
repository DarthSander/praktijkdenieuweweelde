import type { Metadata } from "next";
import Link from "next/link";
import { Home, Clock, Car, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LandingHero from "@/components/LandingHero";
import LandingCTA from "@/components/LandingCTA";
import LandingFAQ from "@/components/LandingFAQ";
import { faqJsonLd, type FAQItem } from "@/lib/faq-schema";
import { getLandingBySlug } from "@/lib/landing-pages";

const slug = "relatietherapie-aan-huis";
const page = getLandingBySlug(slug)!;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: {
    canonical: `https://www.praktijkdenieuweweelde.nl/${slug}`,
  },
  openGraph: {
    title: page.metaTitle,
    description: page.description,
    url: `https://www.praktijkdenieuweweelde.nl/${slug}`,
    type: "website",
    images: [{ url: page.image, alt: page.imageAlt }],
  },
};

const faqs: FAQItem[] = [
  {
    q: "In welke plaatsen kom je aan huis?",
    a: "Ik werk in Tilburg, de Reeshof, Berkel-Enschot, Enschot, Udenhout, Oisterwijk, Goirle, Dongen, Loon op Zand en omliggende dorpen. Voor iets verder weg gelegen plaatsen kunnen we overleggen.",
  },
  {
    q: "Wat heb ik thuis nodig voor een sessie?",
    a: "Niets bijzonders. Een rustige plek waar jullie met zijn drieën kunnen zitten, zonder kinderen of huisdieren die afleiden. Een bank en een stoel volstaan. Telefoons uit en geen TV aan, dat werkt het beste.",
  },
  {
    q: "Wat kost relatietherapie aan huis?",
    a: "Een sessie van 90 minuten kost € 150, inclusief reiskosten binnen mijn werkgebied. De prijs is dus gelijk aan een sessie in de praktijk elders, maar jullie sparen tijd en gedoe uit. Kennismaking is gratis.",
  },
  {
    q: "Is het wel professioneel om thuis therapie te krijgen?",
    a: "De kwaliteit zit in de therapeut en de methode, niet in de locatie. IBCT werkt aan huis net zo goed als in een praktijk. Veel koppels vinden thuis juist veiliger, waardoor ze sneller open durven te zijn.",
  },
  {
    q: "Hoe zit het met privacy?",
    a: "Alles wat jullie met mij bespreken is vertrouwelijk en valt onder mijn beroepsgeheim. Ik kom in een gewone auto zonder logo, zodat niemand uit de straat weet wie er op bezoek is. Jullie bepalen wat jullie delen.",
  },
  {
    q: "Kan relatietherapie aan huis ook 's avonds?",
    a: "Ja. Avondsessies zijn juist waar therapie aan huis zich goed voor leent. Veel koppels kiezen voor 20:00 of 20:30, als de kinderen slapen en de dag tot rust is gekomen. Ook in het weekend kan ik flexibel zijn.",
  },
];

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />
      <Navbar />
      <main className="bg-[#F5F0EB]">
        <LandingHero
          kicker={page.heroKicker}
          h1={page.h1}
          subtitle={page.heroSubtitle}
          image={page.image}
          imageAlt={page.imageAlt}
        />

        <section id="inhoud" className="section-padding bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-6 text-center">
              Waarom ik bij jullie thuis werk
            </h2>
            <div className="text-[#5E524F] text-base md:text-lg leading-relaxed space-y-5">
              <p>
                Als ik eerlijk ben: er is iets wat niet klopt aan een relatieprobleem bespreken
                in een steriele spreekkamer. Jullie relatie speelt zich niet af in een
                praktijkruimte. Die speelt zich af thuis. Bij de koffie, bij het avondeten, op de
                bank na een lange dag, in het gesprek dat niet gevoerd werd toen jullie allebei
                moe in bed vielen.
              </p>
              <p>
                Daarom werk ik vrijwel altijd bij mensen thuis. Jullie eigen omgeving haalt een
                laag druk weg. De schouders zakken sneller, jullie zitten op de plek waar de
                dynamiek ook echt ontstaat, en er is geen reisstress vooraf of achteraf. Voor
                werkende koppels met kinderen maakt dat vaak het verschil tussen wel of niet in
                therapie kunnen.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-[#F5F0EB]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-4">
                Wat therapie aan huis praktisch oplevert
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: Home,
                  title: "Jullie eigen omgeving",
                  text: "Geen praktijkruimte, geen wachtkamer. Jullie eigen bank, jullie eigen thee, jullie eigen tempo.",
                },
                {
                  icon: Clock,
                  title: "Avond en weekend mogelijk",
                  text: "Sessies na werktijd of in het weekend zijn heel gewoon. Handig als jullie overdag niet samen kunnen.",
                },
                {
                  icon: Car,
                  title: "Geen reistijd, geen oppas",
                  text: "Ik kom naar jullie toe. Jullie hoeven niet met de auto de stad in, geen parkeerplek te zoeken, geen oppas te regelen.",
                },
                {
                  icon: Heart,
                  title: "Minder drempel om te beginnen",
                  text: "Thuis starten voelt voor veel koppels toegankelijker. Dat maakt de stap om hulp te zoeken kleiner.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-6 md:p-7 flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#E8D5D2]/50 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-[#946B66]" />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] text-lg mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-[#5E524F] text-sm md:text-base leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-6 text-center">
              Hoe een sessie eruitziet
            </h2>
            <div className="text-[#5E524F] text-base md:text-lg leading-relaxed space-y-5">
              <p>
                Een sessie duurt 90 minuten. Ik kom binnen, we drinken thee en maken even een
                moment om te landen. Daarna gaan we aan het werk. We werken met de DEEP-analyse
                om te begrijpen welk patroon tussen jullie speelt, en we zoeken naar zachte
                emoties onder de hardere reacties. Onder frustratie zit vaak teleurstelling,
                onder afstand zit vaak gemis.
              </p>
              <p>
                Ik stuur het gesprek actief, zodat het niet verzandt in oude ruzies. Jullie
                krijgen tussen sessies door geen huiswerk in de vorm van invullijsten, wel soms
                een kleine observatie-opdracht. De meeste verandering ontstaat in de sessie zelf,
                op het moment dat jullie elkaar anders zien.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-[#F5F0EB]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-6 text-center">
              De methode: IBCT
            </h2>
            <div className="bg-white rounded-2xl p-8 md:p-10 text-[#5E524F] leading-relaxed space-y-5">
              <p>
                Ik werk met IBCT, Integrative Behavioral Couple Therapy. Dat is een van de best
                onderzochte vormen van relatietherapie wereldwijd. IBCT combineert acceptatie van
                wat moeilijk veranderbaar is met verandering van wat wél bijgesteld kan worden.
              </p>
              <p>
                Meer lezen over de methode? Zie{" "}
                <Link href="/ibct-relatietherapie">IBCT relatietherapie</Link> of het artikel{" "}
                <Link href="/blog/wat-is-ibct">wat is IBCT</Link>.
              </p>
            </div>
          </div>
        </section>

        <LandingCTA
          title="Klaar voor een eerste gesprek thuis?"
          text="Het kennismakingsgesprek is gratis en vrijblijvend. Stuur een bericht via het contactformulier, dan stemmen we samen af wanneer het jullie uitkomt."
        />

        <LandingFAQ
          heading="Veelgestelde vragen over relatietherapie aan huis"
          items={faqs}
        />
      </main>
      <Footer />
    </>
  );
}
