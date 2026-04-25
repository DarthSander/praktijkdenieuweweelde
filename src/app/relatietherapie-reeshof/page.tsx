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
    q: "In welke delen van de Reeshof kom je aan huis?",
    a: "Ik werk door de hele Reeshof en directe omgeving. Van Heerevelden en Huibeven tot Dalem, Dongewijk en de Gesworen Hoek, ik kom overal binnen de wijk. Stuur gerust een bericht als je wilt weten of jullie adres binnen het werkgebied valt.",
  },
  {
    q: "Wat kost relatietherapie in de Reeshof bij jou?",
    a: "Een IBCT-sessie van 90 minuten kost €150, inclusief reiskosten binnen het werkgebied. Voor koppels die preventief willen werken bied ik een APK voor relaties aan: drie sessies van 75 minuten voor €325.",
  },
  {
    q: "Hoe snel kunnen wij starten?",
    a: "De wachttijd voor een intakegesprek varieert, maar is meestal één tot twee weken. Bij acute situaties probeer ik eerder ruimte te maken.",
  },
  {
    q: "Wordt relatietherapie vergoed door de zorgverzekeraar?",
    a: "Relatietherapie valt niet onder de basisverzekering en wordt dus niet vergoed. Sommige aanvullende verzekeringen vergoeden een deel onder systeemtherapie. Steeds meer werkgevers bieden vergoeding via een vitaliteitsbudget of EAP-regeling.",
  },
  {
    q: "Wij twijfelen of relatietherapie iets voor ons is.",
    a: "Twijfel is heel normaal, zeker als jullie al veel hebben geïnvesteerd in jullie relatie. In een intakegesprek onderzoeken we samen of IBCT past bij jullie situatie.",
  },
  {
    q: "Wat als wij verschillend gemotiveerd zijn?",
    a: "Dat komt vaak voor. Zolang de twijfelende partner bereid is eerlijk te zijn over die aarzeling, kan een traject zinvol zijn.",
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
              Voor koppels in de Reeshof die elkaar even kwijt zijn
            </h2>
            <div className="text-[#5E524F] text-base md:text-lg leading-relaxed space-y-5">
              <p>
                Misschien praten jullie langs elkaar heen. Misschien is er iets gebeurd dat niet
                meer uit te praten valt. Misschien voelt het anders dan het ooit was en weten
                jullie niet precies waar het misgaat. In deze situaties is relatietherapie een
                plek om samen te onderzoeken wat er werkelijk speelt.
              </p>
              <p>
                Als IBCT-relatietherapeut kom ik bij jullie thuis in de Reeshof, zodat jullie in
                een vertrouwde omgeving kunnen werken aan verbinding en helderheid.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-[#F5F0EB]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-6 text-center">
              IBCT-relatietherapie aan huis in de Reeshof
            </h2>
            <div className="text-[#5E524F] text-base md:text-lg leading-relaxed space-y-5">
              <p>
                Ik werk met IBCT (Integrative Behavioral Couple Therapy), een evidence-based
                methode die bestaat uit vier onderdelen die elkaar versterken: acceptatie,
                tolerantie, gedragsverandering en communicatie. IBCT combineert twee sporen:
                onderlinge verschillen accepteren en gedrag veranderen waar dat wél kan.
              </p>
              <p>
                Deze aanpak past goed bij koppels die zoeken naar relatietherapie,
                huwelijkstherapie of koppeltherapie in de Reeshof en omgeving, en biedt zowel
                verdieping als praktische handvatten om vastlopende dynamieken te doorbreken.
              </p>
              <p>
                Meer over hoe IBCT in de praktijk werkt vind je op de pagina over{" "}
                <Link href="/ibct-relatietherapie">IBCT relatietherapie</Link> of in het
                artikel <Link href="/blog/wat-is-ibct">wat is IBCT</Link>.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-4">
                In welke situaties werkt IBCT?
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                {
                  title: "Vastgelopen communicatie",
                  text: "Gesprekken eindigen in ruzie of stilte. Jullie zitten vast in een patroon waarin de één fel wordt en de ander zich terugtrekt.",
                },
                {
                  title: "Na vreemdgaan of een vertrouwensbreuk",
                  text: "Er is iets gebeurd dat hard binnenkwam. Jullie willen onderzoeken of herstel mogelijk is en hoe dat eruit kan zien.",
                },
                {
                  title: "Afstand en eenzaamheid",
                  text: "Jullie zijn samen, maar zo voelt het niet. Intimiteit is afgenomen en gesprekken gaan vooral over praktische zaken.",
                },
                {
                  title: "Stress door levensfase",
                  text: "Jonge kinderen, mantelzorg, drukke banen. Externe stress zorgt ervoor dat jullie aan alles toekomen behalve aan elkaar.",
                },
                {
                  title: "Twijfel over de toekomst",
                  text: "Eén van jullie denkt aan scheiden, of jullie twijfelen beiden. Relatietherapie helpt om helderheid te krijgen, ook als dat betekent bewust loslaten.",
                },
                {
                  title: "Preventief onderhoud",
                  text: "Geen crisis, wel de wens om verbonden te blijven. Een APK voor relaties is een korte, bewuste check-up.",
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
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-4">
                Hoe IBCT werkt
              </h2>
            </div>
            <div className="bg-white rounded-2xl p-8 md:p-10 text-[#5E524F] leading-relaxed space-y-5">
              <p>
                IBCT combineert acceptatie en verandering. We onderzoeken eerst jullie dynamiek
                met emotionele acceptatie en empathische aansluiting, zodat er meer begrip en
                rust ontstaat. Daarna werken we aan tolerantie, bijvoorbeeld door exposure,
                zelfzorg en normalisatie, zodat terugkerende verschillen minder snel spanning
                oproepen.
              </p>
              <p>
                Vanuit die basis bouwen we aan positief gedrag en kleine, haalbare veranderingen
                die direct effect hebben in het dagelijks leven. Tot slot versterken we jullie
                communicatie, zodat gesprekken minder snel escaleren en jullie elkaar beter
                kunnen bereiken.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-4">
                Praktisch: relatietherapie aan huis in de Reeshof
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: Home,
                  title: "Bij jullie thuis",
                  text: "Sessies vinden plaats op jullie eigen bank of aan de keukentafel, laagdrempelig en vertrouwd.",
                },
                {
                  icon: MapPin,
                  title: "Werkgebied",
                  text: "De hele Reeshof en heel Tilburg, plus omliggende plaatsen zoals Dongen, Goirle, Udenhout en Loon op Zand.",
                },
                {
                  icon: Clock,
                  title: "Sessieduur",
                  text: "Een sessie duurt 90 minuten, zodat er genoeg ruimte is om echt de diepte in te gaan.",
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
          title="Zullen wij eens kennismaken?"
          text="Stuur een bericht via het contactformulier, dan neem ik binnen vierentwintig uur contact op. We plannen een eerste gesprek op een moment dat past, bij jullie thuis in de Reeshof."
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
