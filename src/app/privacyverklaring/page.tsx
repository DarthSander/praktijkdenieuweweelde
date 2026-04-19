import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacyverklaring",
  description:
    "Privacyverklaring van Relatiepraktijk de Nieuwe Weelde – hoe Eva Mulder omgaat met uw persoonsgegevens conform AVG en WGBO.",
  alternates: {
    canonical: "https://www.praktijkdenieuweweelde.nl/privacyverklaring",
  },
  robots: { index: true, follow: true },
};

export default function Privacyverklaring() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F5F0EB] pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#946B66] hover:text-[#6B6866] text-sm mb-8 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Terug naar home
          </Link>
          <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-2">
            Privacyverklaring
          </h1>
          <p className="text-[#B0ADAB] text-sm mb-12">Laatst bijgewerkt: april 2026</p>

          <div className="prose prose-sm max-w-none text-[#5E524F] space-y-10">

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-3">1. Wie zijn wij?</h2>
              <p>
                Relatiepraktijk de Nieuwe Weelde is een eenmanszaak, gedreven door Eva Mulder, gespecialiseerd in IBCT-relatietherapie aan huis in Tilburg en omgeving. Als verwerkingsverantwoordelijke ben ik verantwoordelijk voor de zorgvuldige omgang met uw persoonsgegevens.
              </p>
              <div className="mt-4 bg-white rounded-xl p-5 text-sm space-y-1">
                <p><strong>Naam:</strong> Relatiepraktijk de Nieuwe Weelde</p>
                <p><strong>Eigenaar:</strong> Eva Mulder</p>
                <p><strong>KVK-nummer:</strong> 72945699</p>
                <p><strong>E-mail:</strong> <a href="mailto:Info@praktijkdenieuweweelde.nl" className="text-[#946B66] underline underline-offset-2">Info@praktijkdenieuweweelde.nl</a></p>
                <p><strong>Telefoon:</strong> 06 - 10096923</p>
                <p><strong>Werkgebied:</strong> Tilburg (Reeshof, Centrum, Berkel-Enschot)</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-3">2. Welke gegevens verwerken wij?</h2>
              <p>Ik verwerk de volgende persoonsgegevens:</p>

              <h3 className="font-semibold text-[#6B6866] mt-4 mb-2">Via het contactformulier</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Naam en naam van de partner</li>
                <li>E-mailadres</li>
                <li>Telefoonnummer</li>
                <li>De inhoud van uw bericht</li>
              </ul>

              <h3 className="font-semibold text-[#6B6866] mt-4 mb-2">In het kader van de therapie</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Naam en contactgegevens van beide partners</li>
                <li>Adresgegevens (voor huisbezoeken)</li>
                <li>Sessieaantekeningen en therapievoortgang</li>
                <li>Gegevens over de relatie en eventuele klachten</li>
                <li>Factuurgegevens</li>
              </ul>

              <div className="mt-4 bg-[#EDE6DD] rounded-xl p-4 text-sm">
                <p><strong>Let op:</strong> Therapiegegevens vallen onder <em>bijzondere persoonsgegevens</em> (gezondheidsgegevens) in de zin van de AVG. Deze gegevens worden met extra zorgvuldigheid behandeld en vallen tevens onder mijn beroepsgeheim.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-3">3. Waarom verwerken wij deze gegevens?</h2>
              <div className="space-y-3">
                <div className="bg-white rounded-xl p-4 text-sm">
                  <p className="font-semibold mb-1">Contactformulier</p>
                  <p>Om uw vraag of aanmeldverzoek te beantwoorden en een intake in te plannen.</p>
                  <p className="text-[#B0ADAB] mt-1">Grondslag: toestemming (u vult het formulier zelf in)</p>
                </div>
                <div className="bg-white rounded-xl p-4 text-sm">
                  <p className="font-semibold mb-1">Therapiedossier</p>
                  <p>Voor het leveren van verantwoorde relatietherapie en het bijhouden van uw dossier conform de WGBO.</p>
                  <p className="text-[#B0ADAB] mt-1">Grondslag: wettelijke verplichting (WGBO) en noodzakelijkheid voor goede zorgverlening (AVG art. 9 lid 2h)</p>
                </div>
                <div className="bg-white rounded-xl p-4 text-sm">
                  <p className="font-semibold mb-1">Facturering</p>
                  <p>Voor het verwerken van betalingen en het voldoen aan boekhoudkundige verplichtingen.</p>
                  <p className="text-[#B0ADAB] mt-1">Grondslag: wettelijke verplichting (belastingwetgeving)</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-3">4. Hoe lang bewaren wij uw gegevens?</h2>
              <div className="space-y-3 text-sm">
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold mb-1">Therapiedossier</p>
                  <p>20 jaar na beëindiging van de behandeling, conform artikel 7:454 van het Burgerlijk Wetboek (WGBO).</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold mb-1">Contactformulier</p>
                  <p>Zolang als noodzakelijk voor de afhandeling van uw verzoek. Als geen therapietraject volgt, worden de gegevens na 6 maanden verwijderd.</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold mb-1">Factuurgegevens</p>
                  <p>7 jaar, conform de fiscale bewaarplicht.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-3">5. Delen wij uw gegevens met anderen?</h2>
              <p>
                Uw gegevens worden niet verkocht of gedeeld met derden voor commerciële doeleinden. In de volgende situaties kunnen gegevens gedeeld worden:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3 text-sm">
                <li>Met uw uitdrukkelijke toestemming (bijvoorbeeld verwijzing naar een andere zorgverlener)</li>
                <li>Wanneer dit wettelijk verplicht is (bijvoorbeeld bij een rechterlijk bevel)</li>
                <li>Met de e-mailhostingprovider (Strato) voor de afhandeling van contactverzoeken — hiermee is een verwerkersovereenkomst gesloten</li>
              </ul>
              <p className="mt-3 text-sm">Uw gegevens worden niet buiten de Europese Economische Ruimte (EER) opgeslagen of verwerkt.</p>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-3">6. Privacy van beide partners</h2>
              <p className="text-sm">
                Bij relatietherapie zijn doorgaans twee personen betrokken. Wij beschermen de privacy van beide partners. Dat betekent:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3 text-sm">
                <li>Sessie-aantekeningen zijn bedoeld voor de therapeut en worden niet automatisch gedeeld met de individuele partner</li>
                <li>Beide partners hebben inzagerecht in de gezamenlijke dossieronderdelen</li>
                <li>Persoonlijke notities van de therapeut (werkdocumenten) hoeven niet ingezien te worden, indien dit de behandeling zou schaden</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-3">7. Uw rechten</h2>
              <p className="mb-3 text-sm">Op grond van de AVG heeft u de volgende rechten:</p>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                {[
                  ["Recht op inzage", "U kunt opvragen welke gegevens wij van u verwerken."],
                  ["Recht op rectificatie", "U kunt onjuiste of onvolledige gegevens laten corrigeren."],
                  ["Recht op vergetelheid", "U kunt verzoeken uw gegevens te verwijderen, tenzij een wettelijke bewaarplicht van toepassing is (zoals de WGBO)."],
                  ["Recht op beperking", "U kunt verzoeken de verwerking van uw gegevens tijdelijk te beperken."],
                  ["Recht op overdraagbaarheid", "U kunt uw gegevens opvragen in een gestructureerd, gangbaar formaat."],
                  ["Recht op bezwaar", "U kunt bezwaar maken tegen de verwerking van uw gegevens."],
                ].map(([title, desc]) => (
                  <div key={title} className="bg-white rounded-xl p-4">
                    <p className="font-semibold mb-1">{title}</p>
                    <p className="text-[#5E524F]">{desc}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm">
                U kunt uw verzoek indienen via <a href="mailto:Info@praktijkdenieuweweelde.nl" className="text-[#946B66] underline underline-offset-2">Info@praktijkdenieuweweelde.nl</a>. Ik reageer binnen 30 dagen.
              </p>
              <p className="mt-2 text-sm">
                Heeft u een klacht over de verwerking van uw gegevens? Dan kunt u ook een klacht indienen bij de <a href="https://www.autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer" className="text-[#946B66] underline underline-offset-2">Autoriteit Persoonsgegevens</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-3">8. Beveiliging</h2>
              <p className="text-sm">
                Ik neem passende technische en organisatorische maatregelen om uw persoonsgegevens te beveiligen tegen verlies, misbruik of onbevoegde toegang. Dit omvat onder meer versleutelde e-mailcommunicatie, beveiligde opslag van dossiers en een geheimhoudingsplicht als therapeut.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-3">9. Chatbot en AI-assistent</h2>
              <p className="text-sm mb-3">
                Op deze website staat een chatbot die wordt aangedreven door een AI-model van <strong>Anthropic</strong> (Claude). De chatbot beantwoordt vragen over relatietherapie en de praktijk. Daarnaast kan de korte intake-vragenlijst gebruikmaken van AI om persoonlijke vervolgvragen te stellen.
              </p>
              <div className="bg-white rounded-xl p-4 text-sm space-y-2">
                <p><strong>Welke gegevens worden naar Anthropic gestuurd?</strong> Alleen de tekst die u zelf in het chatvenster of in de vrije-tekstvelden van de vragenlijst typt. <em>Voordat</em> uw bericht wordt verstuurd, verwijdert onze server automatisch e-mailadressen en telefoonnummers uit de tekst.</p>
                <p><strong>Welke gegevens gaan NIET naar Anthropic?</strong> Uw naam, contactgegevens, IP-adres en factuurgegevens.</p>
                <p><strong>Hoe lang bewaren wij chat-gesprekken?</strong> Maximaal 30 dagen, daarna worden ze automatisch verwijderd. Intake-antwoorden worden tot 6 maanden bewaard, of korter als geen behandeling volgt.</p>
                <p><strong>Waar staan de gegevens?</strong> In een Supabase-database (regio Frankfurt, EU). Anthropic verwerkt aanvragen binnen de EU/VS, op basis van een Data Processing Addendum en (waar van toepassing) het EU-VS Data Privacy Framework.</p>
                <p><strong>Toestemming.</strong> Voordat de chatbot of de AI-assistent in de vragenlijst start, vragen wij uw expliciete toestemming. Zonder die toestemming kunt u de website gewoon gebruiken en kunt u via het contactformulier of telefonisch contact opnemen.</p>
                <p><strong>Geen medisch advies.</strong> De chatbot geeft geen diagnoses en is geen vervanging voor een gesprek met Eva. Bij acute nood: bel 112 of 113 Zelfmoordpreventie (0800-0113).</p>
              </div>
              <p className="text-sm mt-3">
                Grondslag: uitdrukkelijke toestemming (AVG art. 9 lid 2a) en gerechtvaardigd belang voor het beantwoorden van praktische vragen.
              </p>
            </section>

            <section id="cookies">
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-3">10. Cookies</h2>
              <p className="text-sm">
                Deze website maakt alleen gebruik van functionele cookies die noodzakelijk zijn voor een goede werking van de site. Er worden geen tracking- of marketingcookies geplaatst. Uw cookievoorkeuren worden lokaal in uw browser opgeslagen en kunt u opnieuw instellen via de cookie-instellingen onderaan deze pagina.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-3">11. Wijzigingen</h2>
              <p className="text-sm">
                Deze privacyverklaring kan worden aangepast. De meest actuele versie is altijd te vinden op deze pagina. Bij wezenlijke wijzigingen word ik u hierover informeren.
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
