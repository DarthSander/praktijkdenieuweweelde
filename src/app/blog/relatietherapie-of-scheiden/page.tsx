import type { Metadata } from "next";
import Link from "next/link";
import BlogLayout from "@/components/BlogLayout";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog-posts";

const slug = "relatietherapie-of-scheiden";
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
        Er zijn vragen die je niet zomaar uitspreekt. Moeten wij verder, of is het tijd om los te laten? Het is misschien wel de zwaarste vraag die je samen kunt stellen. Hij laat zich niet oplossen met een lijstje voor- en nadelen, en zeker niet met advies van vrienden of familie. Toch kun je er samen helderheid in krijgen.
      </p>
      <p>
        In dit artikel deel ik hoe ik als IBCT-therapeut met koppels werk die aan dit punt zitten. Niet om jullie een kant op te duwen, maar om jullie de rust en de ruimte te geven om werkelijk te kiezen.
      </p>

      <h2>Waarom deze vraag zo moeilijk is</h2>
      <p>
        De vraag 'doorgaan of scheiden' is niet één vraag maar tientallen. Hou ik nog van mijn partner? Kan ik nog veranderen, kan hij of zij nog veranderen? Wat doet een scheiding met de kinderen? Wat doet een scheiding met mijzelf? Is het gevoel van wantrouwen weg te krijgen? En diepliggend: ben ik zonder deze relatie nog wie ik denk te zijn?
      </p>
      <p>
        In de paniek van een relatiecrisis zijn die vragen door elkaar vervlochten tot één knoop. Zolang die knoop niet losser wordt, is elke beslissing een sprong in het duister. Relatietherapie helpt niet om snel de knoop door te hakken, maar om de draden te scheiden, een voor een.
      </p>

      <h2>Wat relatietherapie níet is (en soms denken mensen dat wel)</h2>
      <p>
        Relatietherapie is geen garantie dat jullie samen blijven. Het is ook geen methode om de ander te veranderen, of om gelijk te krijgen. Wat het wel is:
      </p>
      <ul>
        <li>Een plek om eerlijk te zijn, ook over twijfel en pijn.</li>
        <li>Een proces om te begrijpen wat er tussen jullie is ontstaan.</li>
        <li>Een oefenruimte om te proberen of verandering mogelijk is.</li>
        <li>Een ondersteuning om een eventuele scheiding met minder schade te laten verlopen.</li>
      </ul>
      <p>
        Veel koppels die komen met de vraag 'samen of apart' blijven bij elkaar. Maar een aantal kiest na bewuste reflectie voor een scheiding, en ook dát kan een goede uitkomst zijn. Het doel is niet samen blijven, het doel is een eerlijk leven.
      </p>

      <h2>Drie signalen dat relatietherapie nog zinvol is</h2>
      <p>
        Als ik naar mijn dossiers kijk, vallen drie patronen op bij koppels die met succes zijn door-gegaan na een crisis.
      </p>

      <h3>1. Er is nog een sprankje beweging</h3>
      <p>
        Een van de sterkste voorspellers voor herstel is commitment. Baucom en collega's (2015) lieten zien dat huwelijksduur en commitment de stevigste voorspellers zijn van gunstige langetermijnuitkomsten van relatietherapie. Commitment betekent niet dat je gelukkig bent, maar dat je bereid bent om nog iets te proberen.
      </p>

      <h3>2. Beide partners willen begrijpen, niet alleen winnen</h3>
      <p>
        Koppels die bereid zijn om niet alleen gehoord te worden, maar ook te horen, hebben meer kans op herstel. Dat betekent: willen snappen wat de ander voelt, ook als je het er niet mee eens bent. In IBCT noemen we deze houding de <em>collaborative set</em>, de erkenning dat het probleem van beiden is.
      </p>

      <h3>3. De pijn komt voort uit patronen, niet uit beschadigend gedrag</h3>
      <p>
        Veel relatiepijn is geen gevolg van slechte bedoelingen maar van verstrikte patronen. Als jullie ellende bestaat uit terugkerende miscommunicatie, demand-withdraw-patronen of seksuele stilte, dan is herstel realistisch. Als er sprake is van structureel beschadigend gedrag (geweld, intimidatie, onbehandelde verslaving), is eerst individuele hulp nodig.
      </p>

      <h2>Drie signalen dat scheiden eerlijker kan zijn</h2>
      <p>
        Soms is de eerlijkste uitkomst van relatietherapie dat jullie zorgvuldig uit elkaar gaan. Dat is een andere uitkomst dan 'falen'. Het is een keuze op basis van echte informatie. Signalen dat dit pad eerlijker kan zijn:
      </p>

      <h3>1. Een langdurig geheim dat niet wordt opgegeven</h3>
      <p>
        Bij aanhoudende ontrouw waarbij de relatie niet beëindigd wordt, bij structureel verzwegen financiële beslissingen of bij een dubbelleven, ontbreekt het fundament voor herstel. Zonder eerlijkheid is er geen IBCT, er is dan geen gezamenlijk onderwerp om aan te werken.
      </p>

      <h3>2. Eén van jullie is al jaren mentaal vertrokken</h3>
      <p>
        Soms komt een koppel bij mij waarbij de ene partner diep geraakt wil worden, en de andere partner al een jaar of twee innerlijk afstand heeft genomen. Die discrepantie verdient eerlijkheid. Therapie dwingt niemand te voelen wat er niet meer is, het maakt wel zichtbaar wat er nog is.
      </p>

      <h3>3. Fundamentele waarden lopen ver uit elkaar</h3>
      <p>
        Verschillen zijn normaal, en IBCT helpt juist om daarmee om te gaan (zie ook het stuk over <Link href="/blog/wat-is-ibct">wat IBCT is</Link>). Maar er zijn waarden die zo diep raken aan wie je wil zijn (wel of geen kinderen, wel of geen religie, wel of geen open relatie) dat levenslange compromissen scheef gaan staan. Therapie kan helpen deze verschillen scherper te zien en er in vrede van af te stappen.
      </p>

      <h2>Hoe werkt dat in de praktijk?</h2>
      <p>
        Bij koppels die twijfelen over doorgaan of scheiden, werken we vaak in een afgebakend vooronderzoek van vier tot zes sessies. Het doel is bewust geen ja of nee, maar: begrijpen waar we staan. In deze sessies doen we:
      </p>
      <ul>
        <li>Een DEEP-analyse van jullie relatie en de patronen die jullie samen gevormd hebben.</li>
        <li>Individuele gesprekken met elk van jullie over wat jullie persoonlijk nodig hebben.</li>
        <li>Een gezamenlijk gesprek over wat er nog mogelijk is en wat reëel voelt.</li>
        <li>Een helder advies mijnerzijds over of een langer traject zinvol is.</li>
      </ul>
      <p>
        Na zes sessies is er vaak een helder beeld. Soms komt er een verrassende opening. Soms komt er rouw maar ook rust. In beide gevallen is er richting.
      </p>

      <h2>En als jullie ongelijk gemotiveerd zijn?</h2>
      <p>
        Dit is een van de meest gestelde situaties in mijn praktijk. De ene partner wil heel graag, de ander aarzelt of heeft al mentaal afgehaakt. Is therapie dan zinvol?
      </p>
      <p>
        Ja, mits de aarzelende partner bereid is om eerlijk te zijn over die aarzeling. Ik zie regelmatig koppels waarbij de twijfelende partner na drie of vier sessies meer beweging voelt dan verwacht. Ik zie ook koppels waarbij de twijfelende partner juist helder wordt in de wens om los te laten. Beide uitkomsten zijn valide.
      </p>

      <h2>De impact op kinderen</h2>
      <p>
        Veel ouders blijven bij elkaar 'voor de kinderen'. Ik snap dat, en het komt uit liefde. Maar onderzoek laat al decennia zien dat het niet zozeer de scheiding is die kinderen schaadt, maar de kwaliteit van de relatie waarin zij opgroeien en de manier waarop ouders met elkaar omgaan. Een langdurig conflictueuze relatie is voor kinderen zwaarder dan een zorgvuldig begeleide scheiding met twee aanwezige, respectvolle ouders.
      </p>
      <p>
        Dit is dus geen argument voor scheiden, maar wel voor eerlijkheid: kies bewust, niet uit angst voor de schade.
      </p>

      <h2>Wat kost helderheid?</h2>
      <p>
        Een traject van vier tot zes oriënterende sessies kost bij mij in Tilburg rond de € 600 tot € 900. Dat is niet niks. Maar vergeleken met de kosten van een gehaaste of spijtige scheiding (of van jaren doorgaan in mist) is het een eerlijke investering in helderheid.
      </p>

      <h2>Een kennismaking zonder verplichting</h2>
      <p>
        Als jullie op dit kruispunt staan, is een gesprek al een stap. Het eerste kennismakingsgesprek is gratis en vindt plaats bij jullie thuis. We verkennen samen waar jullie staan, en of relatietherapie (of juist een ander pad) passend is. Je bepaalt zelf wat daarna volgt.
      </p>
      <p>
        Stuur een bericht via het <Link href="/#contact">contactformulier</Link>, ik reageer binnen vierentwintig uur.
      </p>

      <div className="blog-sources">
        <h3>Bronnen</h3>
        <ul>
          <li>Baucom, B. R., Atkins, D. C., Simpson Rowe, L., Doss, B. D., &amp; Christensen, A. (2015). Prediction of treatment response at 5-year follow-up in a randomized clinical trial of behaviorally based couple therapies. <em>Journal of Consulting and Clinical Psychology, 83</em>(1), 103-114.</li>
          <li>Christensen, A., &amp; Doss, B. D. (2017). Integrative Behavioral Couple Therapy. <em>Current Opinion in Psychology, 13</em>, 111-114.</li>
          <li>Lebow, J. L., Chambers, A. L., Christensen, A., &amp; Johnson, S. M. (2012). Research on the treatment of couple distress. <em>Journal of Marital and Family Therapy, 38</em>(1), 145-168.</li>
        </ul>
      </div>
    </BlogLayout>
  );
}
