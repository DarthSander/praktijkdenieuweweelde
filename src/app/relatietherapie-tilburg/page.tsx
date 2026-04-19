import type { Metadata } from "next";
import Link from "next/link";
import { Heart, MapPin, Home, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LandingHero from "@/components/LandingHero";
import LandingCTA from "@/components/LandingCTA";
import LandingFAQ from "@/components/LandingFAQ";
import { faqJsonLd, type FAQItem } from "@/lib/faq-schema";
import { getLandingBySlug } from "@/lib/landing-pages";

const slug = "relatietherapie-tilburg";
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
    q: "In welke wijken van Tilburg kom je aan huis?",
    a: "Ik werk door heel Tilburg en directe omgeving: Reeshof, Centrum, Oud-Noord, de Hasselt, Berkel-Enschot en aangrenzende wijken. Ook in nabijgelegen plaatsen zoals Dongen, Udenhout, Goirle en Loon op Zand kom ik meestal. Stuur gerust een bericht als je wilt weten of jullie adres binnen het werkgebied valt.",
  },
  {
    q: "Wat kost relatietherapie in Tilburg bij jou?",
    a: "Een IBCT-sessie van 90 minuten kost € 150, inclusief reiskosten binnen het werkgebied. Voor koppels die preventief willen werken bied ik een APK voor relaties aan van drie sessies voor € 325.",
  },
  {
    q: "Hoe snel kunnen wij starten?",
    a: "De wachttijd voor een intakegesprek is meestal één tot twee weken. Bij acute situaties probeer ik eerder ruimte te maken. Na het intakegesprek plannen we in onderling overleg het vervolg.",
  },
  {
    q: "Is relatietherapie vergoed door de zorgverzekeraar?",
    a: "Relatietherapie valt in Nederland niet onder de basisverzekering, omdat relatieproblemen geen DSM-diagnose zijn. Sommige aanvullende verzekeringen vergoeden een deel onder systeemtherapie. Steeds meer werkgevers bieden vergoeding via een vitaliteitsbudget of EAP-regeling.",
  },
  {
    q: "Wij twijfelen of relatietherapie iets voor ons is.",
    a: "Die twijfel is heel gewoon. In een eerste intakegesprek verkennen we samen of IBCT bij jullie situatie past, en welke stappen passend zijn. Jullie zitten nergens aan vast.",
  },
  {
    q: "Wat als wij verschillend gemotiveerd zijn?",
    a: "Dat komt vaker voor dan je denkt. De een wil heel graag, de ander twijfelt. Zolang de twijfelende partner bereid is eerlijk te zijn over die aarzeling, is een traject zinvol. Soms ontstaat in de eerste sessies juist beweging, soms komt er helderheid over welke stap passend is.",
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
  areaServed: [
    { "@type": "City", name: "Tilburg" },
    { "@type": "AdministrativeArea", name: "Reeshof" },
    { "@type": "City", name: "Berkel-Enschot" },
    { "@type": "City", name: "Dongen" },
    { "@type": "City", name: "Goirle" },
  ],
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
              Voor koppels in Tilburg die elkaar even kwijt zijn
            </h2>
            <div className="text-[#5E524F] text-base md:text-lg leading-relaxed space-y-5">
              <p>
                Misschien praten jullie langs elkaar heen. Misschien is er iets gebeurd dat niet
                meer weg te praten valt. Misschien voelt het gewoon anders dan het ooit was en
                weten jullie niet precies waar het fout is gegaan. In al die situaties is
                relatietherapie in Tilburg een plek om samen te onderzoeken wat er werkelijk
                speelt.
              </p>
              <p>
                Als IBCT-relatietherapeut kom ik bij jullie thuis, in jullie eigen woonkamer of
                aan de keukentafel. Zo is er geen wachtkamer, geen drempel, geen kans dat jullie
                de buurvrouw tegen het lijf lopen. Gewoon jullie eigen plek, jullie eigen tempo
                en volledige aandacht voor wat er tussen jullie gebeurt.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-[#F5F0EB]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-4">
                Voor welke situaties werkt IBCT?
              </h2>
              <p className="text-[#5E524F] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                IBCT is een brede methode die bij veel koppelthema&apos;s zinvol is. Deze
                situaties zie ik het meest in mijn praktijk in Tilburg.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                {
                  title: "Vastgelopen communicatie",
                  text: "Elk gesprek eindigt in ruzie of stilte. Jullie zitten vast in een demand-withdraw-patroon waarin de een fel wordt en de ander zich terugtrekt.",
                },
                {
                  title: "Na vreemdgaan of een vertrouwensbreuk",
                  text: "Er is iets gebeurd dat hard binnenkwam. Jullie willen onderzoeken of herstel mogelijk is en hoe dat eruit kan zien.",
                },
                {
                  title: "Afstand en eenzaamheid",
                  text: "Jullie wonen samen maar voelen elkaar nauwelijks meer. Intimiteit is afgenomen, gesprekken gaan alleen nog over praktische zaken.",
                },
                {
                  title: "Stress door levensfase",
                  text: "Jonge kinderen, mantelzorg, drukke banen. Door externe stress komen jullie toe aan alles behalve elkaar.",
                },
                {
                  title: "Twijfel over de toekomst",
                  text: "Een van jullie denkt aan weggaan, of jullie twijfelen beiden. Relatietherapie helpt om samen helderheid te krijgen, ook als dat betekent bewust loslaten.",
                },
                {
                  title: "Preventief onderhoud",
                  text: "Er is niet direct crisis, maar jullie willen er samen bij blijven. Een APK voor relaties is een korte, bewuste check-up.",
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
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-4">
                Wat is IBCT precies?
              </h2>
              <p className="text-[#5E524F] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                IBCT staat voor Integrative Behavioral Couple Therapy. Het is een
                wetenschappelijk onderbouwde vorm van relatietherapie die acceptatie en
                verandering combineert.
              </p>
            </div>
            <div className="bg-[#F5F0EB] rounded-2xl p-8 md:p-10 text-[#5E524F] leading-relaxed space-y-5">
              <p>
                In IBCT kijken we niet alleen naar gedrag, maar ook naar wat eronder zit. Onder
                harde emoties zoals woede en verwijt liggen bijna altijd zachte emoties: pijn,
                angst, teleurstelling, schaamte. Die zachte laag mag zichtbaar worden, met
                respect voor allebei. We noemen dat <em>empathic joining</em>.
              </p>
              <p>
                Daarnaast maken we een gezamenlijke DEEP-analyse: welke verschillen spelen
                tussen jullie, welke emotionele gevoeligheden raken geactiveerd, welke externe
                omstandigheden drukken op jullie relatie, en welk patroon hebben jullie samen
                gevormd. Vanuit die analyse werken we gericht aan verandering, zonder dat
                één van jullie de schuld krijgt.
              </p>
              <p>
                Voor wie dieper wil lezen: in het artikel <Link href="/blog/wat-is-ibct">wat is
                IBCT</Link> staat de methode uitgebreid beschreven, met de belangrijkste
                onderzoeksresultaten.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-[#F5F0EB]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-4">
                Praktisch in Tilburg
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: Home,
                  title: "Bij jullie thuis",
                  text: "Sessies vinden plaats op jullie eigen bank of aan de keukentafel. Geen praktijkruimte, wel jullie vertrouwde plek.",
                },
                {
                  icon: MapPin,
                  title: "Werkgebied",
                  text: "Heel Tilburg, Reeshof, Centrum, Berkel-Enschot, en nabijgelegen plaatsen zoals Dongen, Goirle en Udenhout.",
                },
                {
                  icon: Clock,
                  title: "Ruime sessietijd",
                  text: "Een sessie duurt 90 minuten. Dat geeft ruimte om eerst tot rust te komen en daarna echt de diepte in te gaan.",
                },
                {
                  icon: Heart,
                  title: "Op jullie tempo",
                  text: "Na een intakegesprek beslissen jullie zelf of een traject passend is. Jullie zitten nergens aan vast.",
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
          title="Een intakegesprek bij jullie thuis"
          text="Ik kom bij jullie thuis in Tilburg voor een eerste gesprek. Jullie vertellen waar het schuurt, ik leg uit hoe IBCT werkt en samen bepalen we of het past."
        />

        <LandingFAQ
          heading="Veelgestelde vragen over relatietherapie in Tilburg"
          items={faqs}
        />

        <section className="section-padding bg-[#F5F0EB]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-6">
              Meer lezen voor je de stap zet?
            </h2>
            <p className="text-[#5E524F] text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              De blog bevat artikelen over wanneer therapie zinvol is, hoe lang een traject duurt,
              en hoe IBCT-therapie er in de praktijk uitziet.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/blog/wanneer-is-relatietherapie-zinvol"
                className="bg-white border border-[#EDE6DD] hover:border-[#C4A4A0] text-[#6B6866] px-5 py-2.5 rounded-full text-sm font-semibold transition"
              >
                Wanneer is relatietherapie zinvol?
              </Link>
              <Link
                href="/blog/hoe-lang-duurt-relatietherapie"
                className="bg-white border border-[#EDE6DD] hover:border-[#C4A4A0] text-[#6B6866] px-5 py-2.5 rounded-full text-sm font-semibold transition"
              >
                Hoe lang duurt het?
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
