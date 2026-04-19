import type { Metadata } from "next";
import Link from "next/link";
import BlogLayout from "@/components/BlogLayout";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog-posts";

const slug = "wat-kost-relatietherapie";
const post = getPostBySlug(slug)!;

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  alternates: {
    canonical: `https://www.praktijkdenieuweweelde.nl/blog/${slug}`,
  },
  openGraph: {
    title: post.title,
    description: post.description,
    url: `https://www.praktijkdenieuweweelde.nl/blog/${slug}`,
    type: "article",
    publishedTime: post.date,
    images: [{ url: post.image, alt: post.imageAlt }],
  },
};

export default function Page() {
  const related = getRelatedPosts(slug);
  return (
    <BlogLayout post={post} related={related}>
      <p>
        Een van de eerste vragen die ik krijg, vaak nog voordat we over het waarom praten, is: wat kost relatietherapie eigenlijk? Het is een logische vraag. Jullie willen weten waar je aan begint, en of het binnen jullie budget past. In dit artikel vind je een eerlijk overzicht van de tarieven in Nederland in 2026, hoe het zit met vergoeding, en wat de investering jullie eigenlijk oplevert.
      </p>

      <h2>Tarieven voor relatietherapie in Nederland in 2026</h2>
      <p>
        De tarieven voor relatietherapie lopen in Nederland flink uiteen. Dat heeft te maken met de opleiding van de therapeut, de locatie, de duur van de sessie en of de therapeut aangesloten is bij een beroepsvereniging. Grofweg zie je dit beeld in 2026:
      </p>
      <ul>
        <li><strong>Beginnend therapeut of coach:</strong> € 90 tot € 130 per uur.</li>
        <li><strong>Ervaren relatietherapeut:</strong> € 130 tot € 180 per uur.</li>
        <li><strong>Psycholoog of systeemtherapeut met NVRG-registratie:</strong> € 150 tot € 220 per uur.</li>
        <li><strong>Seksuoloog of zeer gespecialiseerde praktijk:</strong> € 180 tot € 250 per uur.</li>
      </ul>
      <p>
        Let goed op het verschil tussen een uurtarief en een sessietarief. Een sessie duurt meestal zestig tot negentig minuten. Een tarief van € 150 voor een sessie van negentig minuten is dus iets anders dan € 150 per uur.
      </p>

      <h2>Wat kost relatietherapie bij de Nieuwe Weelde?</h2>
      <p>
        Bij <Link href="/#tarieven">Relatiepraktijk de Nieuwe Weelde</Link> hanteer ik bewust transparante tarieven zonder verborgen kosten:
      </p>
      <div className="blog-highlight">
        <h3>Tarieven 2026</h3>
        <ul>
          <li><strong>Kennismakingsgesprek:</strong> gratis, vrijblijvend, bij jullie thuis.</li>
          <li><strong>IBCT-relatiesessie (90 minuten):</strong> € 150.</li>
          <li><strong>APK voor relaties (3 sessies, preventief):</strong> € 325.</li>
        </ul>
        <p>Reiskosten zijn inbegrepen binnen het werkgebied (Tilburg, Reeshof, Centrum, Berkel-Enschot).</p>
      </div>

      <h2>Wordt relatietherapie vergoed door de zorgverzekeraar?</h2>
      <p>
        Dit is de vraag waarop het antwoord bijna altijd nee is, en dat verdient uitleg. In Nederland valt relatietherapie niet onder de basisverzekering. De reden is dat relatieproblemen geen DSM-diagnose zijn. De zorgverzekeraar vergoedt alleen behandelingen die een officiële stoornis van het individu aanpakken.
      </p>
      <p>Wat wel mogelijk is:</p>
      <ul>
        <li><strong>Aanvullende verzekering:</strong> een klein aantal aanvullende polissen vergoedt systeemtherapie tot een maximumbedrag. Check jullie polis onder de kop 'alternatieve zorg' of 'systeemtherapie'.</li>
        <li><strong>Werkgever:</strong> steeds meer werkgevers bieden via een vitaliteitsbudget of een EAP-regeling (Employee Assistance Program) vergoeding voor relatietherapie. Het lijkt gek om dat bij HR te vragen, maar de praktijk leert dat steeds meer bedrijven dit aanbieden.</li>
        <li><strong>Aftrekbaar bij ZZP'ers:</strong> als jullie samen een onderneming runnen, kan relatietherapie soms als zakelijke kosten worden aangemerkt. Overleg met jullie boekhouder.</li>
      </ul>

      <h2>Wat krijg je voor dat bedrag?</h2>
      <p>
        Een eerlijke vraag die ik zelden hardop gesteld krijg: is dit het waard? Laat ik het omdraaien: wat kost het jullie als er niets verandert? Gemiste slaap, moeizame vakanties, steeds bozer worden op elkaar, of uiteindelijk een scheiding. Volgens het Nibud kost een gemiddelde scheiding in Nederland tussen de € 18.000 en € 40.000, afgezien van de emotionele tol.
      </p>
      <p>
        Een IBCT-traject van gemiddeld tien tot vijftien sessies (€ 1.500 tot € 2.250) is vergeleken daarmee een bescheiden investering. De wetenschap laat bovendien zien dat het werkt: in de grote IBCT-trial van Christensen en collega's (2004) was de effect size op relatietevredenheid d = 0,90. Dat is groot. Vijf jaar later was vijftig procent van de koppels nog steeds klinisch significant verbeterd (Christensen, Atkins, Baucom &amp; Yi, 2010).
      </p>

      <h2>Hoeveel sessies heb je gemiddeld nodig?</h2>
      <p>
        Dit verschilt per koppel, maar een realistisch beeld: acht tot twintig sessies is gebruikelijk. Bij relatief lichte problematiek kunnen zes tot acht sessies al flink verschil maken. Bij complexere situaties, zoals na een vertrouwensbreuk, zijn soms vijftien tot twintig sessies nodig. Meer hierover lees je in het artikel <Link href="/blog/hoe-lang-duurt-relatietherapie">hoe lang duurt relatietherapie</Link>.
      </p>

      <h2>Is een goedkope therapeut altijd een slechte therapeut?</h2>
      <p>
        Nee, zeker niet. Maar prijs is wel een signaal. Een tarief onder € 90 is vaak een therapeut in opleiding of zonder specifieke systeemtraining. Dat kan prima werken voor lichte problematiek, maar bij complexere thema's zoals ontrouw, verslaving of trauma is specialisatie belangrijk.
      </p>
      <p>
        Wat je bij een therapeut altijd kunt vragen:
      </p>
      <ul>
        <li>Welke opleiding en welke methode gebruik je?</li>
        <li>Ben je aangesloten bij de NVRG of een andere beroepsvereniging?</li>
        <li>Hoeveel koppels heb je al begeleid?</li>
        <li>Hoe ga je om met vertrouwensbreuken of ongelijke motivatie?</li>
      </ul>

      <h2>Online relatietherapie: goedkoper, maar ook goed?</h2>
      <p>
        Er zijn tegenwoordig veel online platforms die relatietherapie aanbieden voor lagere tarieven, soms rond de € 50 tot € 80 per sessie. Voor bepaalde situaties werkt dat goed. Onderzoek naar OurRelationship, een online IBCT-programma, laat effect sizes rond d = 0,69 zien op relatietevredenheid (Doss et al., 2016). Dat is substantieel, maar wel iets lager dan bij live therapie.
      </p>
      <p>
        Voor koppels met complexere problematiek, of voor wie het lastig vindt om online open te zijn, geeft persoonlijk contact meestal meer diepgang. <Link href="/blog/relatietherapie-aan-huis">Therapie aan huis</Link> combineert de gemak-voordelen van online met de diepte van persoonlijk contact.
      </p>

      <h2>Conclusie: investeren in wat telt</h2>
      <p>
        Relatietherapie is een bewuste keuze, ook financieel. Maar het is een investering in de relatie die vaak nog veertig of vijftig jaar voor jullie ligt, in jullie gezin en in jullie eigen levensgeluk. De cijfers zijn duidelijk: relatietherapie werkt, en IBCT is een van de best onderzochte vormen.
      </p>
      <p>
        Wil je weten of IBCT bij jullie past? Plan een gratis kennismaking via het <Link href="/#contact">contactformulier</Link>, dan bespreken we samen wat voor jullie haalbaar en zinvol is.
      </p>

      <div className="blog-sources">
        <h3>Bronnen</h3>
        <ul>
          <li>Christensen, A., Atkins, D. C., Baucom, B., &amp; Yi, J. (2010). Marital status and satisfaction five years following a randomized clinical trial comparing traditional versus integrative behavioral couple therapy. <em>Journal of Consulting and Clinical Psychology, 78</em>(2), 225-235.</li>
          <li>Christensen, A., Atkins, D. C., Berns, S., Wheeler, J., Baucom, D. H., &amp; Simpson, L. E. (2004). Traditional versus integrative behavioral couple therapy for significantly and chronically distressed married couples. <em>Journal of Consulting and Clinical Psychology, 72</em>(2), 176-191.</li>
          <li>Doss, B. D., et al. (2016). A randomized controlled trial of the web-based OurRelationship program. <em>Journal of Consulting and Clinical Psychology, 84</em>(4), 285-296.</li>
        </ul>
      </div>
    </BlogLayout>
  );
}
