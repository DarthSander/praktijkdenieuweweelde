import type { Metadata } from "next";
import Link from "next/link";
import { Baby, Moon, Users, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LandingHero from "@/components/LandingHero";
import LandingCTA from "@/components/LandingCTA";
import LandingFAQ from "@/components/LandingFAQ";
import { faqJsonLd, type FAQItem } from "@/lib/faq-schema";
import { getLandingBySlug } from "@/lib/landing-pages";

const slug = "relatietherapie-jonge-ouders";
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
    q: "Is het normaal dat onze relatie zo veranderd is sinds ons kind er is?",
    a: "Ja. Onderzoek laat zien dat de meeste koppels in het eerste jaar na een kind een duidelijke terugval in relatiekwaliteit ervaren. Dat zegt niets over jullie als koppel. Het zegt iets over hoeveel er tegelijk verandert: slaap, tijd, rollen, aandacht, lichaam, geld.",
  },
  {
    q: "We hebben gewoon geen tijd voor therapie, kan dat wel?",
    a: "Daarom kom ik bij jullie thuis, ook 's avonds. Veel jonge ouders kiezen voor sessies om 20:00 of 20:30, zodra de kleine slaapt. Geen oppas, geen reistijd. Eén sessie per twee weken is goed haalbaar, ook als jullie leven al vol zit.",
  },
  {
    q: "Mag ons kind er bij zijn als het nog heel klein is?",
    a: "Een baby die slaapt of in de wipstoel ligt kan prima. Voor peuters en oudere kinderen adviseer ik een moment dat zij slapen of bij oma zijn, zodat jullie met volle aandacht kunnen werken. In het intakegesprek kijken we wat voor jullie realistisch is.",
  },
  {
    q: "Wij ruziën veel meer sinds de baby. Betekent dat dat er iets mis is?",
    a: "Niet per se. Als het draagvermogen van allebei de partners dichtknijpt door slaapgebrek, wordt bijna alles een trigger. Dat is geen karakterfout, dat is hoe jullie stresssysteem werkt onder druk. We kijken hoe jullie dat samen weer kunnen verruimen.",
  },
  {
    q: "Kan ik ook alleen komen als mijn partner nog niet klaar is voor therapie?",
    a: "IBCT is een koppeltherapie, dus we werken met jullie samen. Maar als je partner nog twijfelt, kan een eerste intakegesprek met één van jullie soms al helpen om die drempel lager te maken. Neem gerust contact op om te overleggen.",
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
              Een kind verandert alles, ook jullie samen
            </h2>
            <div className="text-[#5E524F] text-base md:text-lg leading-relaxed space-y-5">
              <p>
                Je krijgt een kind en iemand heeft je van tevoren verteld dat het zwaar zou zijn.
                Maar dit voelt anders dan jullie hadden verwacht. Niet alleen omdat jullie zelf
                moe zijn, maar omdat jullie samen niet meer helemaal samen lijken. Waar vroeger
                een blik of een grap genoeg was om elkaar te vinden, glijden jullie nu steeds net
                langs elkaar heen.
              </p>
              <p>
                Dat is geen teken dat jullie relatie niet deugt. Dat is een teken dat er
                tegelijkertijd heel veel is veranderd. Rollen, slaap, tijd, lichaam, aandacht,
                verantwoordelijkheden. In zo&apos;n fase is het logisch dat de dynamiek tussen
                jullie kraakt. Ik help jullie om dat kraken bespreekbaar te maken, zonder dat het
                verwijt wordt.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-[#F5F0EB]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-4">
                Wat ik vaak hoor bij jonge ouders
              </h2>
              <p className="text-[#5E524F] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                Deze thema&apos;s komen in vrijwel elke relatie na een kind ergens langs. De
                ernst verschilt, maar het patroon is herkenbaar.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                {
                  title: "Kort lontje door slaaptekort",
                  text: "Wat jullie vroeger met een glimlach konden wegwuiven, wordt nu een irritatie. Dat ligt niet aan jullie karakter. Bij slaaptekort krimpt jullie draagvermogen, waardoor zelfs kleine dingen als trigger gaan werken.",
                },
                {
                  title: "Ongelijke verdeling die schuurt",
                  text: "De een heeft het gevoel altijd de mentale last te dragen, de ander voelt zich onzichtbaar in wat hij of zij juist wel doet. Niemand voelt zich gezien, en dat stapelt zich op.",
                },
                {
                  title: "Minder intimiteit, meer afstand",
                  text: "Fysiek en emotioneel gaan vaak samen. Als het lichaam uitgeput is en de dagen vol, verdwijnt seksualiteit soms naar de achtergrond. Daar praten is lastig, dus gebeurt het vaak niet, en de afstand groeit.",
                },
                {
                  title: "De een wil praten, de ander wil rust",
                  text: "Het vraag-en-terugtrek-patroon wordt scherper als jullie moe zijn. De een zoekt verbinding via gesprek, de ander juist via even alleen zijn. Beide zijn begrijpelijk, beide voelen als afwijzing voor de ander.",
                },
                {
                  title: "Jezelf verliezen in het ouderschap",
                  text: "Veel jonge ouders worstelen met de balans: dicht genoeg bij je partner en kind blijven zonder jezelf kwijt te raken. Dat is een stille strijd die zich vaak vertaalt in prikkelbaarheid of apathie.",
                },
                {
                  title: "Onderwerpen die jullie vermijden",
                  text: "Sommige gesprekken worden uitgesteld omdat er nooit een goed moment lijkt. Geld, seks, familieverplichtingen. Die vermijding voelt praktisch, maar zorgt dat spanning langzaam oploopt.",
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
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-6 text-center">
              Waar ik jullie bij help
            </h2>
            <div className="text-[#5E524F] text-base md:text-lg leading-relaxed space-y-5">
              <p>
                In IBCT maken we eerst het patroon zichtbaar. Niet wie er gelijk heeft, maar wat
                er gebeurt tussen jullie als de moeheid hoog is en de lontjes kort. We werken met
                de DEEP/PEEP-analyse: welke persoonlijke verschillen spelen een rol, welke
                emotionele gevoeligheden raken jullie sneller dan vroeger, welke externe
                stressoren doen mee, en welke patronen ontstaan in jullie interactie als het
                schuurt.
              </p>
              <p>
                Vaak ontdekken koppels dat onder de frustratie iets zachters zit. Onder &quot;jij
                luistert nooit&quot; zit vaak &quot;ik voel me alleen in dit alles&quot;. Onder
                &quot;je zeikt altijd&quot; zit vaak &quot;ik ben bang dat ik het niet goed
                doe&quot;. Als die zachte laag tussen jullie weer bespreekbaar wordt, verandert
                de toon.
              </p>
              <p>
                Ook kijken we naar wat praktisch anders kan. Rollen die opnieuw verdeeld moeten
                worden, kleine afspraken over rust en steun, en hoe jullie als koppel tijd voor
                elkaar terugvinden zonder dat het als een extra verplichting voelt. Meer lezen
                over de methode? Zie <Link href="/ibct-relatietherapie">IBCT relatietherapie</Link>.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-[#F5F0EB]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-4">
                Praktisch voor jonge ouders
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: Baby,
                  title: "Aan huis, dus geen oppas",
                  text: "Ik kom bij jullie thuis. Als de kleine slaapt of rustig ligt, kunnen jullie gewoon beginnen.",
                },
                {
                  icon: Moon,
                  title: "Avondsessies",
                  text: "Veel koppels kiezen voor 20:00 of 20:30. Na de avondroutine, als het in huis rustig is.",
                },
                {
                  icon: Users,
                  title: "Voor elke fase",
                  text: "Of jullie net een baby hebben, een peuter, of meerdere kinderen, de thema&apos;s verschillen maar het werk past zich aan.",
                },
                {
                  icon: Heart,
                  title: "Op jullie tempo",
                  text: "Na een intakegesprek beslissen jullie zelf of een traject passend is. Zonder druk, op een moment dat past.",
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
          title="Een eerste stap, zonder verplichting"
          text="Stuur een bericht via het contactformulier. Ik neem binnen vierentwintig uur contact op en we plannen een intakegesprek op een avond die jullie uitkomt."
        />

        <LandingFAQ
          heading="Veelgestelde vragen van jonge ouders"
          items={faqs}
        />
      </main>
      <Footer />
    </>
  );
}
