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
          <p className="text-[#B0ADAB] text-sm mb-12">Laatst bijgewerkt: april 2026</p>

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
                <li>De praktijk biedt geen crisiszorg. Bij crisis verwijzen wij naar de huisarts of relevante hulpinstanties.</li>
                <li>De therapeut heeft een <strong>inspanningsverplichting</strong>: zij zet zich volledig in voor het traject, maar kan geen specifiek resultaat of uitkomst garanderen.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-3">4. Afspraken, annulering &amp; no-show</h2>

              <h3 className="font-semibold text-[#6B6866] mt-4 mb-2">Afspraken maken</h3>
              <p className="text-sm">Afspraken worden ingepland na een telefonisch of schriftelijk contact. Na bevestiging van de afspraak is de cliënt gehouden aan de overeengekomen datum en tijd.</p>

              <h3 className="font-semibold text-[#6B6866] mt-5 mb-2">Annulering</h3>
              <div className="space-y-3 text-sm">
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold mb-1">Kosteloos annuleren</p>
                  <p>Annulering is kosteloos mogelijk tot <strong>48 uur</strong> voor aanvang van de sessie.</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold mb-1">Te late annulering</p>
                  <p>Bij annulering binnen 48 uur voor de afspraak wordt <strong>100% van het sessietarief</strong> in rekening gebracht.</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold mb-1">No-show</p>
                  <p>Indien een cliënt zonder bericht niet verschijnt, wordt de volledige sessie gefactureerd.</p>
                </div>
              </div>

              <div className="mt-4 bg-[#EDE6DD] rounded-xl p-4 text-sm">
                <p><strong>Overmacht:</strong> Bij aantoonbare overmacht (zoals een medische noodsituatie) kan in overleg een uitzondering worden gemaakt. Dit ter beoordeling van de therapeut.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-3">5. Tarieven &amp; betaling</h2>

              <h3 className="font-semibold text-[#6B6866] mt-4 mb-2">Tarieven</h3>
              <p className="text-sm">De actuele tarieven staan vermeld op de website van de praktijk. De therapeut behoudt het recht de tarieven jaarlijks aan te passen. Cliënten worden hierover tijdig geïnformeerd.</p>

              <h3 className="font-semibold text-[#6B6866] mt-5 mb-2">Betaling</h3>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Facturen worden na afloop van de sessie of het traject verstuurd per e-mail.</li>
                <li>Betaling dient te geschieden binnen <strong>14 dagen</strong> na factuurdatum.</li>
                <li>Bij uitblijven van betaling na de vervaldatum is de therapeut gerechtigd een herinnering te sturen en – bij verdere nalatigheid – incassomaatregelen te treffen. De bijkomende kosten zijn voor rekening van de cliënt.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-3">6. Aansprakelijkheid</h2>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>De therapeut is niet aansprakelijk voor keuzes, acties of beslissingen die cliënten nemen als gevolg van de sessies.</li>
                <li>Cliënten blijven te allen tijde zelf verantwoordelijk voor hun eigen welzijn en beslissingen.</li>
                <li>De aansprakelijkheid van de therapeut is beperkt tot het bedrag dat in het betreffende geval door de beroepsaansprakelijkheidsverzekering wordt gedekt.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-3">7. Privacy &amp; vertrouwelijkheid</h2>
              <p className="text-sm">
                De therapeut handelt conform de Algemene Verordening Gegevensbescherming (AVG) en heeft een professionele geheimhoudingsplicht. Gegevens van cliënten worden zorgvuldig bewaard en niet zonder uitdrukkelijke toestemming gedeeld met derden, tenzij wettelijk verplicht.
              </p>
              <p className="mt-3 text-sm">
                Voor meer informatie over hoe wij omgaan met persoonsgegevens verwijzen wij naar onze{" "}
                <Link href="/privacyverklaring" className="text-[#946B66] underline underline-offset-2">privacyverklaring</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-3">8. Klachtenregeling (Wkkgz)</h2>
              <p className="text-sm mb-4">
                Heeft u een klacht? We bespreken deze graag direct met u. Als u er samen niet uitkomt, kunt u terecht bij een onafhankelijke instantie.
              </p>
              <div className="space-y-3 text-sm">
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold mb-1">Stap 1 – Meld uw klacht bij de praktijk</p>
                  <p>Neem contact op via <a href="mailto:Info@praktijkdenieuweweelde.nl" className="text-[#946B66] underline underline-offset-2">Info@praktijkdenieuweweelde.nl</a>. We streven ernaar uw klacht binnen 10 werkdagen te beantwoorden.</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold mb-1">Stap 2 – Onafhankelijke klachtenfunctionaris</p>
                  <p>Bent u niet tevreden met de uitkomst, dan kunt u terecht bij een onafhankelijke klachtenfunctionaris, aangesloten bij onze beroepsvereniging.</p>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="font-semibold mb-1">Stap 3 – Erkende geschilleninstantie</p>
                  <p>Als ook dat niet tot een oplossing leidt, kunt u uw geschil voorleggen aan een erkende geschilleninstantie (zoals Zorggeschil). De procedure is kosteloos voor cliënten.</p>
                </div>
              </div>
              <p className="mt-4 text-sm">
                Voor meer informatie over de klachtenprocedure verwijzen wij naar onze{" "}
                <Link href="/klachtenregeling" className="text-[#946B66] underline underline-offset-2">klachtenregeling</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-3">9. Overmacht</h2>
              <p className="text-sm">
                Indien de therapeut door overmacht – zoals ziekte, een persoonlijke noodsituatie of andere omstandigheden buiten haar wil – een afspraak moet annuleren, wordt de cliënt zo spoedig mogelijk geïnformeerd en wordt de sessie opnieuw ingepland. In dergelijke gevallen is de therapeut niet gehouden tot schadevergoeding.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#6B6866] mb-3">10. Toepasselijk recht</h2>
              <p className="text-sm">
                Op deze algemene voorwaarden is Nederlands recht van toepassing. Geschillen die niet via de klachtenregeling worden opgelost, worden voorgelegd aan de bevoegde rechter in het arrondissement Zeeland-West-Brabant (rechtbank te Breda).
              </p>
            </section>

            <section>
              <div className="bg-white rounded-xl p-5 text-sm space-y-1">
                <p><strong>Relatiepraktijk de Nieuwe Weelde</strong></p>
                <p>Kasteelnijenrodestraat 82, 5037 TH Tilburg</p>
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
