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
    q: "Kom je ook in Enschot, Heukelom en Udenhout?",
    a: "Ja. Ik ben actief in heel Berkel-Enschot inclusief Enschot, Heukelom en de aangrenzende buurten. Ook Udenhout, Oisterwijk en de randen van Tilburg-Noord vallen binnen mijn werkgebied.",
  },
  {
    q: "Ik woon in een klein dorp, hoe zit het met privacy?",
    a: "Dat snap ik goed. Daarom kom ik in een gewone auto, zonder logo of opvallende kleding. Voor buitenstaanders ben ik gewoon iemand die op bezoek komt. Jullie bepalen zelf wat jullie aan anderen vertellen en wanneer.",
  },
  {
    q: "Wat kost relatietherapie in Berkel-Enschot?",
    a: "Een IBCT-sessie van 90 minuten kost € 150, inclusief reiskosten naar Berkel-Enschot. De APK voor relaties (drie sessies preventief) kost € 325.",
  },
  {
    q: "Hoeveel sessies zijn er meestal nodig?",
    a: "Dat verschilt. Sommige koppels komen er in zes tot acht sessies uit, andere trajecten duren langer. Na een paar sessies hebben we samen een helder beeld van wat jullie nodig hebben. Ik werk niet met vaste pakketten.",
  },
  {
    q: "Kunnen wij overdag sessies plannen?",
    a: "Ja. Voor koppels in Berkel-Enschot die overdag flexibel zijn, zoals bij zzp-werk of wisseldiensten, bied ik ook ochtend- en middagsessies aan. Avondsessies zijn ook mogelijk.",
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
              Rust, ruimte en discretie
            </h2>
            <div className="text-[#5E524F] text-base md:text-lg leading-relaxed space-y-5">
              <p>
                Berkel-Enschot heeft iets wat grotere wijken niet hebben: een dorpskarakter waarin
                mensen elkaar kennen. Dat is fijn, en soms ingewikkeld. Want juist als het in een
                relatie moeilijker gaat, willen jullie niet dat de buurvrouw ziet dat jullie de
                zoveelste wachtkamer binnenlopen.
              </p>
              <p>
                Relatietherapie aan huis betekent dat jullie nergens naartoe hoeven. Geen
                praktijkruimte waar je een bekende kunt tegenkomen, geen parkeerplek voor een
                pand waar iedereen weet wat er achter de deur gebeurt. Gewoon jullie eigen huis,
                jullie eigen bank, op een tijd die past.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-[#F5F0EB]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-4">
                Waar koppels in Berkel-Enschot mee komen
              </h2>
              <p className="text-[#5E524F] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                Geen twee relaties zijn hetzelfde, maar een aantal thema&apos;s zie ik vaker
                terugkomen.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                {
                  title: "Praten langs elkaar heen",
                  text: "Gesprekken lopen vast voordat jullie bij de kern zijn. De een sluit zich af, de ander blijft doorpraten. Niemand voelt zich echt gehoord.",
                },
                {
                  title: "Oude irritaties die blijven hangen",
                  text: "Kleine dingen die al jaren wringen. Jullie hebben er vaak over gesproken, maar het patroon verandert niet. Dat maakt moedeloos.",
                },
                {
                  title: "Twijfel over verder gaan",
                  text: "De vraag of jullie nog op dezelfde lijn zitten. Niet per se een crisis, wel een stille onrust die op de achtergrond meespeelt.",
                },
                {
                  title: "Na een breuk in vertrouwen",
                  text: "Een incident of periode waarin het vertrouwen geraakt is. Jullie willen eruit komen, maar weten niet hoe je van daaruit weer verder bouwt.",
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
                Hoe IBCT werkt
              </h2>
            </div>
            <div className="bg-[#F5F0EB] rounded-2xl p-8 md:p-10 text-[#5E524F] leading-relaxed space-y-5">
              <p>
                IBCT combineert acceptatie van wat moeilijk veranderbaar is met verandering van
                wat wél bijgesteld kan worden. We werken met de DEEP/PEEP-analyse om te
                begrijpen waarom jullie terechtkomen in dezelfde patronen, en hoe jullie er
                anders in kunnen staan.
              </p>
              <p>
                Een belangrijk onderdeel is het zichtbaar maken van zachte emoties onder harde.
                Onder boosheid zit vaak teleurstelling. Onder afstand zit vaak angst om te
                worden afgewezen. Als die laag bespreekbaar wordt, verandert er iets in de
                dynamiek tussen jullie.
              </p>
              <p>
                Meer over de methode vind je op de pagina over{" "}
                <Link href="/ibct-relatietherapie">IBCT relatietherapie</Link> of in het artikel{" "}
                <Link href="/blog/wat-is-ibct">wat is IBCT</Link>.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-[#F5F0EB]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-4">
                Praktisch in Berkel-Enschot
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: Home,
                  title: "Aan huis",
                  text: "Sessies vinden plaats in jullie eigen huis in Berkel-Enschot of omgeving.",
                },
                {
                  icon: Shield,
                  title: "Discreet",
                  text: "Geen wachtkamer, geen opvallende auto. Jullie bepalen wat jullie delen met anderen.",
                },
                {
                  icon: MapPin,
                  title: "Ik kom naar jullie toe",
                  text: "Vanuit Tilburg werk ik in heel Berkel-Enschot, Enschot, Heukelom en omstreken.",
                },
                {
                  icon: Heart,
                  title: "Op jullie tempo",
                  text: "Na een intakegesprek beslissen jullie zelf of een traject passend is. Zonder druk, zonder haast.",
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
          title="Een eerste gesprek, zonder verplichting"
          text="Stuur een bericht via het contactformulier. Ik neem binnen vierentwintig uur contact op en we plannen een intakegesprek op een moment dat voor jullie uitkomt, bij jullie thuis in Berkel-Enschot."
        />

        <LandingFAQ
          heading="Veelgestelde vragen over relatietherapie in Berkel-Enschot"
          items={faqs}
        />
      </main>
      <Footer />
    </>
  );
}
