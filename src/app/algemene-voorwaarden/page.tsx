import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Algemene Voorwaarden",
  description:
    "Algemene voorwaarden van Relatiepraktijk de Nieuwe Weelde – afspraken, tarieven, aansprakelijkheid en privacy voor relatietherapie in Tilburg.",
  alternates: {
    canonical: "https://www.praktijkdenieuweweelde.nl/algemene-voorwaarden",
  },
  robots: { index: true, follow: true },
};

export default function AlgemeneVoorwaarden() {
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
            Algemene Voorwaarden
          </h1>
          <p className="text-[#B0ADAB] text-sm mb-12">Laatst bijgewerkt: 22 oktober 2026</p>

          <div className="prose prose-sm max-w-none text-[#5E524F] space-y-10">

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-3">1. Definities</h2>
              <div className="space-y-3 text-sm">
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold mb-1">Praktijk / therapeut</p>
                  <p>Relatiepraktijk de Nieuwe Weelde, gedreven door Eva Mulder, gevestigd te Tilburg (KVK 72945699).</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold mb-1">Cliënt / stel</p>
                  <p>De persoon of personen die een afspraak maken voor relatietherapie of begeleiding bij de praktijk.</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold mb-1">Sessie / traject</p>
                  <p>Een individuele afspraak (sessie) of een reeks opeenvolgende afspraken (traject) in het kader van relatietherapie of -begeleiding.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-3">2. Toepasselijkheid</h2>
              <p className="text-sm">
                Deze algemene voorwaarden zijn van toepassing op alle diensten die Relatiepraktijk de Nieuwe Weelde aanbiedt. Zodra een cliënt een afspraak maakt – via het contactformulier, telefonisch of per e-mail – gaat hij of zij akkoord met deze voorwaarden. Afwijkingen zijn alleen geldig indien schriftelijk overeengekomen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-3">3. Diensten &amp; werkwijze</h2>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>De praktijk biedt relatietherapie en -begeleiding op basis van de IBCT-methode. Dit is geen medische of psychiatrische zorg.</li>
                <li>Er worden geen (medische of psychologische) diagnoses gesteld.</li>
                <li>De praktijk biedt geen crisiszorg. Bij crisis verwijs ik naar de huisarts of relevante hulpinstanties.</li>
                <li>De therapeut heeft een <strong>inspanningsverplichting</strong>: zij zet zich volledig in voor het traject, maar kan geen specifiek resultaat of uitkomst garanderen.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-3">4. Afspraken verzetten en annuleren</h2>

              <h3 className="font-semibold text-[#6B6866] mt-4 mb-2">Afspraken maken</h3>
              <p className="text-sm">Afspraken plan ik in na telefonisch of schriftelijk contact. Na bevestiging van de afspraak ben je gehouden aan de overeengekomen datum en tijd.</p>

              <h3 className="font-semibold text-[#6B6866] mt-5 mb-2">Verzetten of afzeggen</h3>
              <p className="text-sm">Het kan gebeuren dat een afspraak niet uitkomt. Laat het me dan zo vroeg mogelijk weten, dan zoeken we samen naar een nieuw moment.</p>
              <p className="mt-3 text-sm">
                Afzeggen of verzetten doe je schriftelijk, per e-mail aan{" "}
                <a href="mailto:Info@praktijkdenieuweweelde.nl" className="text-[#946B66] underline underline-offset-2">info@praktijkdenieuweweelde.nl</a>. Een afmelding is pas geldig zodra ik die per e-mail heb ontvangen.
              </p>

              <div className="mt-4 space-y-3 text-sm">
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold mb-1">Uiterlijk 24 uur van tevoren</p>
                  <p>Zeg je uiterlijk <strong>24 uur</strong> voor de afgesproken tijd af, dan breng ik daarvoor niets in rekening.</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold mb-1">Binnen 24 uur</p>
                  <p>Meld je je binnen 24 uur af, dan breng ik het <strong>volledige tarief van de sessie</strong> in rekening. De gereserveerde tijd kan ik dan namelijk niet meer aan iemand anders besteden.</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold mb-1">Niet verschijnen</p>
                  <p>Verschijn je zonder bericht niet op de afspraak, dan breng ik het volledige sessietarief in rekening. Vindt de sessie plaats op een externe locatie, dan komen daar de reserveringskosten van de ruimte bij.</p>
                </div>
              </div>

              <div className="mt-4 bg-[#EDE6DD] rounded-xl p-4 text-sm">
                <p>Bij onvoorziene omstandigheden, zoals plotselinge ziekte of een ongeval, kijk ik uiteraard naar wat redelijk is. Neem in dat geval contact met me op, dan bespreken we het samen.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-3">5. Sessies op een externe locatie</h2>
              <p className="text-sm">De sessies vinden in de regel bij jou thuis plaats. Geef je er de voorkeur aan om elders af te spreken, dan huur ik daarvoor een ruimte op een externe locatie in Tilburg. Je hoort vooraf om welk adres het gaat. Voor het huren van die ruimte breng ik geen extra kosten in rekening; je betaalt dus niet meer dan voor een sessie bij jou thuis.</p>
              <p className="mt-3 text-sm">Ik reserveer deze ruimtes per tijdsblok. Dat betekent dat de sessie begint en eindigt op het afgesproken tijdstip en niet kan uitlopen. Houd daar rekening mee bij het plannen van je reistijd. Kom je later aan dan afgesproken, dan gaat die tijd af van de sessie.</p>
              <p className="mt-3 text-sm">Is de gereserveerde ruimte onverwacht niet beschikbaar, dan neem ik zo snel mogelijk contact met je op en zoeken we samen naar een andere locatie of een ander moment. In dat geval breng ik je niets in rekening.</p>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-3">6. Tarieven &amp; betaling</h2>

              <h3 className="font-semibold text-[#6B6866] mt-4 mb-2">Tarieven</h3>
              <p className="text-sm">De actuele tarieven staan vermeld op de website van de praktijk en zijn exclusief 21% btw. De therapeut behoudt het recht de tarieven jaarlijks aan te passen. Cliënten worden hierover tijdig geïnformeerd.</p>

              <h3 className="font-semibold text-[#6B6866] mt-5 mb-2">Betaling</h3>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Facturen worden na afloop van de sessie of het traject verstuurd per e-mail.</li>
                <li>Betaling dient te geschieden binnen <strong>14 dagen</strong> na factuurdatum.</li>
                <li>Bij uitblijven van betaling na de vervaldatum is de therapeut gerechtigd een herinnering te sturen en – bij verdere nalatigheid – incassomaatregelen te treffen. De bijkomende kosten zijn voor rekening van de cliënt.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-3">7. Aansprakelijkheid</h2>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>De therapeut is niet aansprakelijk voor keuzes, acties of beslissingen die cliënten nemen als gevolg van de sessies.</li>
                <li>Cliënten blijven te allen tijde zelf verantwoordelijk voor hun eigen welzijn en beslissingen.</li>
                <li>De aansprakelijkheid van de therapeut is beperkt tot het bedrag dat in het betreffende geval door de beroepsaansprakelijkheidsverzekering wordt gedekt.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-3">8. Privacy &amp; vertrouwelijkheid</h2>
              <p className="text-sm">
                De therapeut handelt conform de Algemene Verordening Gegevensbescherming (AVG) en heeft een professionele geheimhoudingsplicht. Gegevens van cliënten worden zorgvuldig bewaard en niet zonder uitdrukkelijke toestemming gedeeld met derden, tenzij wettelijk verplicht.
              </p>
              <p className="mt-3 text-sm">
                Voor meer informatie over hoe ik met persoonsgegevens omga verwijs ik naar mijn{" "}
                <Link href="/privacyverklaring" className="text-[#946B66] underline underline-offset-2">privacyverklaring</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-3">9. Klachtenregeling (Wkkgz)</h2>
              <p className="text-sm mb-4">
                Heb je een klacht? Ik bespreek deze graag direct met je. Als je er samen niet uitkomt, kun je terecht bij een onafhankelijke instantie.
              </p>
              <div className="space-y-3 text-sm">
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold mb-1">Stap 1 – Meld je klacht bij de praktijk</p>
                  <p>Neem contact op via <a href="mailto:Info@praktijkdenieuweweelde.nl" className="text-[#946B66] underline underline-offset-2">Info@praktijkdenieuweweelde.nl</a>. Ik streef ernaar je klacht binnen 10 werkdagen te beantwoorden.</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold mb-1">Stap 2 – Onafhankelijke klachtenfunctionaris</p>
                  <p>Ben je niet tevreden met de uitkomst, dan kun je terecht bij een onafhankelijke klachtenfunctionaris, aangesloten bij mijn beroepsvereniging.</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold mb-1">Stap 3 – Erkende geschilleninstantie</p>
                  <p>Als ook dat niet tot een oplossing leidt, kun je je geschil voorleggen aan een erkende geschilleninstantie (zoals Erisietsmisgegaan). De procedure is kosteloos voor cliënten.</p>
                </div>
              </div>
              <p className="mt-4 text-sm">
                Voor meer informatie over de klachtenprocedure verwijs ik naar mijn{" "}
                <Link href="/klachtenregeling" className="text-[#946B66] underline underline-offset-2">klachtenregeling</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-3">10. Overmacht</h2>
              <p className="text-sm">
                Indien de therapeut door overmacht – zoals ziekte, een persoonlijke noodsituatie of andere omstandigheden buiten haar wil – een afspraak moet annuleren, wordt de cliënt zo spoedig mogelijk geïnformeerd en wordt de sessie opnieuw ingepland. In dergelijke gevallen is de therapeut niet gehouden tot schadevergoeding.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-3">11. Toepasselijk recht</h2>
              <p className="text-sm">
                Op deze algemene voorwaarden is Nederlands recht van toepassing. Geschillen die niet via de klachtenregeling worden opgelost, worden voorgelegd aan de bevoegde rechter in het arrondissement Zeeland-West-Brabant (rechtbank te Breda).
              </p>
            </section>

            <section>
              <div className="bg-white rounded-xl p-5 text-sm space-y-1">
                <p><strong>Relatiepraktijk de Nieuwe Weelde</strong></p>
                <p>Kasteel Nijenrodestraat 82, 5037 TH Tilburg</p>
                <p>KVK: 72945699</p>
                <p>E-mail: <a href="mailto:Info@praktijkdenieuweweelde.nl" className="text-[#946B66] underline underline-offset-2">Info@praktijkdenieuweweelde.nl</a></p>
                <p>Telefoon: 06 - 10096923</p>
              </div>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
