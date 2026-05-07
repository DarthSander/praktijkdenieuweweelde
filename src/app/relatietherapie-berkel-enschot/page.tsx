import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Home, Shield, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LandingHero from "@/components/LandingHero";
import LandingCTA from "@/components/LandingCTA";
import LandingFAQ from "@/components/LandingFAQ";
import { faqJsonLd, type FAQItem } from "@/lib/faq-schema";
import { getLandingBySlug } from "@/lib/landing-pages";

const slug = "relatietherapie-berkel-enschot";
const page = getLandingBySlug(slug)!;

export const metadata: Metadata = {
  title: { absolute: page.metaTitle },
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
    q: "Kom je ook in Enschot, Heukelom en Udenhout?",
    a: "Ja. Ik werk in heel Berkel-Enschot en omgeving, inclusief Enschot, Heukelom, Udenhout, Oisterwijk en de randen van Tilburg-Noord.",
  },
  {
    q: "Wat kost relatietherapie in Berkel-Enschot?",
    a: "Een IBCT-sessie van 90 minuten kost €150, inclusief reiskosten binnen het werkgebied. Voor koppels die preventief willen werken bied ik een APK voor relaties aan: drie sessies van 75 minuten voor €325.",
  },
  {
    q: "Hoeveel sessies zijn er meestal nodig?",
    a: "Dat verschilt. Sommige koppels komen er in zes tot acht sessies uit, andere trajecten duren langer. Na een paar sessies hebben we samen een helder beeld van wat jullie nodig hebben. Ik werk niet met vaste pakketten.",
  },
  {
    q: "Kunnen wij overdag sessies plannen?",
    a: "Ja. Voor koppels die overdag flexibel zijn, zoals bij zzp-werk of wisseldiensten, bied ik ook ochtend- en middagsessies aan. Avondsessies zijn ook mogelijk.",
  },
];

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `https://www.praktijkdenieuweweelde.nl/${slug}`,
  name: "Relatiepraktijk de Nieuwe Weelde",
  description: page.description,
  url: `https://www.praktijkdenieuweweelde.nl/${slug}`,
  telephone: "+31610096923",
  email: "Info@praktijkdenieuweweelde.nl",
  image: `https://www.praktijkdenieuweweelde.nl${page.image}`,
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kasteel Nijenrodestraat 82",
    addressLocality: "Tilburg",
    postalCode: "5037 TH",
    addressCountry: "NL",
  },
  areaServed: { "@type": "AdministrativeArea", name: "Berkel-Enschot" },
  founder: {
    "@type": "Person",
    name: "Eva Mulder",
    jobTitle: "IBCT-relatietherapeut",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
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
              Voor koppels in Berkel-Enschot die helderheid zoeken
            </h2>
            <div className="text-[#5E524F] text-base md:text-lg leading-relaxed space-y-5">
              <p>
                Soms lopen gesprekken vast. Soms blijft iets hangen wat jullie niet goed kunnen
                plaatsen. Soms voelt het alsof jullie elkaar minder goed bereiken dan voorheen.
                Relatietherapie biedt ruimte om samen te onderzoeken wat er onder de oppervlakte
                gebeurt.
              </p>
              <p>
                Als IBCT-relatietherapeut kom ik bij jullie thuis in Berkel-Enschot, zodat
                jullie in jullie eigen omgeving kunnen werken aan verbinding en duidelijkheid.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-[#F5F0EB]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-6 text-center">
              IBCT-relatietherapie aan huis
            </h2>
            <div className="text-[#5E524F] text-base md:text-lg leading-relaxed space-y-5">
              <p>
                Ik werk met IBCT (Integrative Behavioral Couple Therapy), een evidence-based
                methode die acceptatie en verandering combineert. We onderzoeken waarom jullie
                reageren zoals jullie reageren, welke patronen steeds terugkomen en wat jullie
                helpt om daar anders mee om te gaan.
              </p>
              <p>
                IBCT is geschikt voor koppels die zoeken naar relatietherapie, huwelijkstherapie
                of koppeltherapie in Berkel-Enschot en omgeving.
              </p>
              <p>
                Meer over de methode vind je op de pagina over{" "}
                <Link href="/ibct-relatietherapie">IBCT relatietherapie</Link> of in het artikel{" "}
                <Link href="/blog/communicatieproblemen-in-een-relatie">wat is IBCT</Link>.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-4">
                Thema&apos;s die ik vaak zie
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                {
                  title: "Jullie praten langs elkaar heen",
                  text: "Gesprekken komen niet bij de kern. De één trekt zich terug, de ander blijft doorgaan.",
                },
                {
                  title: "Irritaties die blijven terugkomen",
                  text: "Kleine dingen die al langer spelen en steeds opnieuw de kop opsteken.",
                },
                {
                  title: "Twijfel over verder gaan",
                  text: "Een onderliggende vraag of jullie nog op dezelfde lijn zitten.",
                },
                {
                  title: "Na een breuk in vertrouwen",
                  text: "Een gebeurtenis die impact heeft gehad en waar jullie samen een weg in zoeken.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-[#F5F0EB] rounded-2xl p-6 md:p-7 card-hover">
                  <h3 className="font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#5E524F] text-sm md:text-base leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-[#F5F0EB]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-4">
                Hoe IBCT werkt
              </h2>
            </div>
            <div className="bg-white rounded-2xl p-8 md:p-10 text-[#5E524F] leading-relaxed space-y-5">
              <p>
                We beginnen met het zichtbaar maken van jullie dynamiek: wat gebeurt er tussen
                jullie, welke emoties spelen mee en waar raken jullie elkaar kwijt. Vanuit die
                helderheid ontstaat meer begrip en ruimte.
              </p>
              <p>
                Daarna werken we aan kleine, haalbare veranderingen in gedrag en communicatie,
                zodat jullie elkaar beter kunnen bereiken in het dagelijks leven.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-4">
                Praktisch: relatietherapie aan huis in Berkel-Enschot
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: Home,
                  title: "Aan huis",
                  text: "Sessies vinden plaats bij jullie thuis, in een omgeving die voor jullie vertrouwd is.",
                },
                {
                  icon: MapPin,
                  title: "Werkgebied",
                  text: "Berkel-Enschot, Enschot, Heukelom en omliggende plaatsen zoals Udenhout, Oisterwijk en de randen van Tilburg-Noord.",
                },
                {
                  icon: Shield,
                  title: "Sessieduur",
                  text: "Een sessie duurt 90 minuten. Willen jullie liever een kort en concreet traject? Dan is er de relatie-APK: drie sessies van 75 minuten.",
                },
                {
                  icon: Heart,
                  title: "Op jullie tempo",
                  text: "Na een intake bepalen jullie zelf of een traject passend is.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-[#F5F0EB] rounded-2xl p-6 md:p-7 flex gap-4">
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

        <LandingCTA
          title="Kennismaken"
          text="Stuur een bericht via het contactformulier. Ik neem binnen vierentwintig uur contact op en we plannen een intakegesprek op een moment dat voor jullie past, bij jullie thuis in Berkel-Enschot."
        />

        <LandingFAQ
          heading="Veelgestelde vragen"
          items={faqs}
        />
      </main>
      <Footer />
    </>
  );
}
