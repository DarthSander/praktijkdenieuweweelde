import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Home, Clock, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LandingHero from "@/components/LandingHero";
import LandingCTA from "@/components/LandingCTA";
import LandingFAQ from "@/components/LandingFAQ";
import { faqJsonLd, type FAQItem } from "@/lib/faq-schema";
import { getLandingBySlug } from "@/lib/landing-pages";

const slug = "relatietherapie-reeshof";
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
    q: "Kom je ook in de andere buurten van de Reeshof?",
    a: "Ja. Van Heerevelden en Huibeven tot Dalem, Dongewijk en de Gesworen Hoek, ik kom overal binnen de Reeshof. Ook in aangrenzende wijken en buurgemeenten zoals Dongen en Loon op Zand ben ik inzetbaar.",
  },
  {
    q: "Kunnen wij 's avonds sessies plannen als de kinderen slapen?",
    a: "Ja, dat is juist waar therapie aan huis handig voor is. Veel koppels met jonge kinderen kiezen bewust voor een sessie om 20:00 of 20:30, zodra de kinderen naar bed zijn. Geen oppas, geen reistijd, wel volle aandacht voor elkaar.",
  },
  {
    q: "Wat kost relatietherapie in de Reeshof?",
    a: "Een IBCT-sessie van 90 minuten kost € 150, inclusief reiskosten. Het kennismakingsgesprek is gratis. De APK voor relaties (drie sessies preventief) kost € 325.",
  },
  {
    q: "Wij hebben nog nooit therapie gedaan, hoe gaat dat in zijn werk?",
    a: "De eerste sessie is een kennismaking. We drinken thee, maken kennis, en jullie vertellen waar het schuurt. Ik leg uit hoe IBCT werkt en samen kijken we of het past. Jullie zitten nergens aan vast, ook niet na een eerste gesprek.",
  },
  {
    q: "Is het niet ongemakkelijk om een therapeut thuis te ontvangen?",
    a: "Die vraag krijg ik vaker en mijn ervaring is dat die ongemakkelijkheid bijna altijd binnen tien minuten verdwijnt. Koppels vertellen achteraf dat ze thuis juist sneller open durfden te zijn dan ze in een praktijkruimte hadden gekund.",
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
    streetAddress: "Kasteelnijenrodestraat 82",
    addressLocality: "Tilburg",
    postalCode: "5037 TH",
    addressCountry: "NL",
  },
  areaServed: { "@type": "AdministrativeArea", name: "Reeshof" },
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
              Gewoon hier in de wijk
            </h2>
            <div className="text-[#5E524F] text-base md:text-lg leading-relaxed space-y-5">
              <p>
                Ik woon zelf in de Reeshof, dus ik ken het ritme van de wijk. Ochtenden vol
                bagage, fietsen naar school, werken, koken, avonduren waarin jullie elkaar pas
                echt zien als alle kinderen slapen. In zo&apos;n ritme glipt de aandacht voor
                elkaar soms stilletjes weg. En voordat je het weet, praat je al een tijdje langs
                elkaar heen.
              </p>
              <p>
                Relatietherapie in de Reeshof betekent dat ik bij jullie thuis kom, op een tijd
                die past. Geen reistijd, geen oppas, geen dure parkeerplek. Gewoon jullie eigen
                keukentafel of bank, op een moment dat het rustig is in huis.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-[#F5F0EB]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-4">
                Wat ik vaak zie bij koppels in de Reeshof
              </h2>
              <p className="text-[#5E524F] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                De Reeshof is een wijk vol werkende gezinnen in verschillende levensfases. De
                thema&apos;s die ik tegenkom passen bij die drukte.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                {
                  title: "Weinig tijd voor elkaar",
                  text: "Werk, kinderen, mantelzorg, hobby&apos;s. Jullie zien elkaar wel, maar raken elkaar nauwelijks meer. Aandacht voor jullie samen is een luxe geworden.",
                },
                {
                  title: "Verschillende rollen na een kind",
                  text: "De rolverdeling na een baby of peuter loopt niet altijd soepel. De een voelt zich overvraagd, de ander gepasseerd. Dat schuurt vaker dan jullie uitspreken.",
                },
                {
                  title: "Kort lontje bij stress",
                  text: "Als de druk hoog is, reageren jullie feller dan jullie willen. Een onschuldige opmerking escaleert. Daarna voelen jullie allebei schuld, maar het patroon blijft.",
                },
                {
                  title: "Langzaam uit elkaar gegroeid",
                  text: "Er is geen grote ruzie, geen ontrouw. Er is alleen heel veel tijd voorbij en te weinig aandacht. Jullie herkennen elkaar minder dan vroeger.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-6 md:p-7 card-hover">
                  <h3 className="font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#5E524F] text-sm md:text-base leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-4">
                Hoe IBCT helpt
              </h2>
            </div>
            <div className="bg-[#F5F0EB] rounded-2xl p-8 md:p-10 text-[#5E524F] leading-relaxed space-y-5">
              <p>
                In IBCT werken we aan twee dingen tegelijk: acceptatie van wat in jullie
                partner niet of moeilijk veranderbaar is, en verandering van wat wél bijstelbaar
                is. Die combinatie zorgt ervoor dat verandering duurzaam is en niet afhangt van
                constant willen bijsturen.
              </p>
              <p>
                Vaak ontdekken koppels dat onder de dagelijkse frustratie iets zachters zit.
                Onder &quot;jij luistert nooit&quot; zit vaak &quot;ik voel dat ik er niet toe
                doe&quot;. Onder &quot;je zeikt altijd&quot; zit vaak &quot;ik voel me een
                slechte partner&quot;. Als die zachte laag zichtbaar wordt, verandert de toon
                fundamenteel.
              </p>
              <p>
                Meer over hoe IBCT in de praktijk werkt vind je op de pagina over{" "}
                <Link href="/ibct-relatietherapie">IBCT relatietherapie</Link> of in het
                artikel <Link href="/blog/wat-is-ibct">wat is IBCT</Link>.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-[#F5F0EB]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-4">
                Praktisch in de Reeshof
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: Home,
                  title: "Bij jullie thuis",
                  text: "Sessies in jullie eigen huis in de Reeshof. Veilige plek, jullie eigen sfeer.",
                },
                {
                  icon: Clock,
                  title: "Avondsessies mogelijk",
                  text: "Handig als er jonge kinderen slapen. Veel koppels kiezen bewust voor 20:00 of 20:30.",
                },
                {
                  icon: MapPin,
                  title: "Geen reistijd",
                  text: "Ik kom naar jullie toe. Jullie hoeven niet de auto in of een oppas te regelen.",
                },
                {
                  icon: Heart,
                  title: "Eerste gesprek gratis",
                  text: "De kennismaking is gratis en zonder verplichting. Zonder druk, zonder haast.",
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

        <LandingCTA
          title="Zullen wij eens kennismaken?"
          text="Stuur een bericht via het contactformulier, dan neem ik binnen vierentwintig uur contact op. We plannen een eerste gesprek op een moment dat past, bij jullie thuis in de Reeshof."
        />

        <LandingFAQ
          heading="Veelgestelde vragen over relatietherapie in de Reeshof"
          items={faqs}
        />
      </main>
      <Footer />
    </>
  );
}
