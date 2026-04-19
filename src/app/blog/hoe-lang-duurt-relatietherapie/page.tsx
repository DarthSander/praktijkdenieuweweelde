import type { Metadata } from "next";
import Link from "next/link";
import BlogLayout from "@/components/BlogLayout";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog-posts";

const slug = "hoe-lang-duurt-relatietherapie";
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
        'Hoe lang zijn wij hiermee bezig?' Het is een van de eerste vragen die ik krijg in een intakegesprek. En terecht. Jullie willen weten waar je aan begint. Een heel eerlijk antwoord kan ik niet geven in één zin, want het hangt af van wat er speelt. Maar ik kan wel laten zien wat de wetenschap en mijn ervaring als IBCT-therapeut laten zien over wat een realistisch beeld is.
      </p>

      <h2>Het korte antwoord: gemiddeld 8 tot 20 sessies</h2>
      <p>
        Een gemiddeld IBCT-traject in Nederland bestaat uit acht tot twintig sessies. Dijkstra en Tamminga (2025) werken in hun Nederlandstalige protocol met een kerntraject van tien sessies, uit te breiden waar nodig. Internationaal onderzoek laat een vergelijkbaar beeld zien: in de grote RCT van Christensen en collega's (2004) werden koppels 26 sessies gezien, maar in reguliere praktijk blijkt 10 tot 15 sessies meestal voldoende.
      </p>
      <p>
        Met een frequentie van eens per twee weken betekent dat een doorloop van vijf tot negen maanden. Sommige koppels werken intensiever, elke week, en zijn dan na drie tot vijf maanden klaar. Anderen kiezen bewust voor een lager tempo.
      </p>

      <h2>Wat bepaalt de duur?</h2>
      <p>
        Een aantal factoren beïnvloedt hoe lang een traject duurt:
      </p>
      <ul>
        <li><strong>Ernst van de problematiek:</strong> langdurige conflicten zitten vaak dieper ingesleten en vragen meer tijd.</li>
        <li><strong>Complicerende factoren:</strong> ontrouw, depressie, verslaving of trauma vragen extra sessies en soms aanvullende individuele hulp.</li>
        <li><strong>Motivatie en openheid:</strong> koppels die beide eerlijk zijn en tussen sessies in oefenen, maken sneller stappen.</li>
        <li><strong>De kwaliteit van de relatie voor de crisis:</strong> wat er jarenlang is opgebouwd, helpt in herstel.</li>
        <li><strong>Commitment:</strong> Baucom en collega's (2015) toonden aan dat commitment de sterkste voorspeller is van hoe goed een koppel op lange termijn herstelt.</li>
      </ul>

      <h2>De fasen van een IBCT-traject</h2>
      <p>
        IBCT werkt in drie herkenbare fasen. Elke fase heeft zijn eigen doel en lengte.
      </p>

      <h3>Fase 1: intake en assessment (1 tot 3 sessies)</h3>
      <p>
        Dit zijn de eerste gesprekken waarin ik jullie leer kennen, jullie mij leren kennen, en we samen in kaart brengen wat er speelt. Ik zie jullie zowel samen als individueel. In deze fase wordt de <em>DEEP-analyse</em> van jullie relatie gemaakt: de verschillen, kwetsbaarheden, externe stressoren en patronen die jullie samen vormen. Aan het einde van deze fase weten we allebei waar we aan beginnen.
      </p>

      <h3>Fase 2: werken aan acceptatie en verandering (5 tot 15 sessies)</h3>
      <p>
        Dit is het hart van de therapie. We werken met twee hoofdtechnieken: <em>empathic joining</em> (onder de harde emoties de zachte emoties zichtbaar maken) en <em>unified detachment</em> (samen kijken naar het patroon zonder blame). Tegelijkertijd oefenen we met concreet ander gedrag in het dagelijks leven.
      </p>
      <p>
        In deze fase zie je vaak bewegingen: de ene week voelt het beter, de volgende week loopt er iets mis. Dat hoort erbij. Onderzoek (Doss et al., 2005) laat zien dat vooruitgang in IBCT gestaag is en tot ná de therapie doorloopt.
      </p>

      <h3>Fase 3: afronden en bestendigen (2 tot 3 sessies)</h3>
      <p>
        In de laatste sessies oefenen we hoe jullie zelf signalen leren herkennen, hoe je in zwaardere momenten terugvalt op wat je geleerd hebt, en wat je afspreekt als terugval zich aandient. Soms eindigen we met een afspraak voor een terugkombekjaar, bijvoorbeeld een halfjaarlijkse check-in.
      </p>

      <h2>Hoe vaak zie je elkaar?</h2>
      <p>
        Het protocol werkt het beste met een vaste frequentie. De meeste koppels beginnen met wekelijks of eens per twee weken. Wekelijks werkt snel en intensief, tweewekelijks geeft meer ruimte om tussen sessies te oefenen. Ik adviseer vaak te beginnen met wekelijks, en na fase 1 (drie sessies) samen te evalueren wat past.
      </p>
      <p>
        Een sessie duurt in mijn praktijk negentig minuten. Dat is ruimer dan de gebruikelijke vijftig minuten, en dat is bewust. Bij <Link href="/blog/relatietherapie-aan-huis">therapie aan huis</Link> heb je iets meer aanlooptijd nodig om echt op onderwerp te komen, en negentig minuten geeft die ruimte zonder te gehaast te zijn.
      </p>

      <h2>Hoe weet je of het werkt?</h2>
      <p>
        Progressie in relatietherapie voelt zelden lineair. De meeste koppels ervaren grofweg dit patroon:
      </p>
      <ul>
        <li><strong>Sessie 1 tot 3:</strong> opluchting, soms even meer ruzie thuis omdat er thema's weer leven.</li>
        <li><strong>Sessie 4 tot 8:</strong> eerste aha-momenten, maar ook terugval.</li>
        <li><strong>Sessie 9 tot 14:</strong> merkbaar ander samenwerken, andere gesprekken.</li>
        <li><strong>Sessie 15 en verder:</strong> de patronen zijn helder en jullie weten zelf wat jullie te doen staat.</li>
      </ul>
      <p>
        Wat ik vaak hoor rond sessie acht: 'we voelen dat er iets verandert, maar we kunnen het nog niet precies benoemen.' Dat klopt, verandering in patronen gaat sneller in gedrag dan in woorden.
      </p>

      <h2>Houdt het effect aan?</h2>
      <p>
        Dit is de mooiste vraag, en de wetenschap heeft een duidelijk antwoord. Christensen en collega's (2006) volgden koppels twee jaar na einde IBCT-therapie, en 69 procent was klinisch significant verbeterd. Een latere studie (Christensen, Atkins, Baucom &amp; Yi, 2010) volgde dezelfde koppels vijf jaar na de behandeling, en nog steeds was vijftig procent klinisch significant verbeterd.
      </p>
      <p>
        Belangrijk: de vooruitgang in IBCT is gestaag en houdt aan. Baucom en collega's (2011) toonden zelfs aan dat negativiteit en withdrawal-gedrag nog ná einde therapie bleven dalen, tot twee jaar daarna. Wat in de therapie is aangeleerd, werkt door in het dagelijks leven.
      </p>

      <h2>Hoe snel kan je starten?</h2>
      <p>
        In mijn praktijk werk ik meestal met een wachttijd van één tot twee weken voor een intakegesprek. Bij acute crisis probeer ik sneller ruimte te maken. Wil je weten wat er mogelijk is? Stuur gerust een bericht.
      </p>

      <h2>Kortere trajecten: de APK voor relaties</h2>
      <p>
        Niet elke reden om aan jullie relatie te werken vraagt om een volledig traject. Soms is een korte check-up voldoende. Voor koppels die preventief willen werken, bied ik een <Link href="/#tarieven">APK voor relaties</Link> aan: drie sessies waarin we samen jullie relatie onder de loep leggen zonder dat er een crisis is. Een soort periodieke keuring voor de liefde.
      </p>

      <h2>Eerst kennismaken, daarna pas een traject</h2>
      <p>
        Welke duur past bij jullie? Dat kunnen we het beste samen inschatten in een intakegesprek. Ik geef daarin een eerlijke indicatie van wat ik verwacht, zonder nu al een definitief aantal sessies te noemen.
      </p>
      <p>
        Plan een afspraak via het <Link href="/#contact">contactformulier</Link>, ik neem binnen vierentwintig uur contact op.
      </p>

      <div className="blog-sources">
        <h3>Bronnen</h3>
        <ul>
          <li>Baucom, K. J. W., Sevier, M., Eldridge, K. A., Doss, B. D., &amp; Christensen, A. (2011). Observed communication in couples 2 years after integrative and traditional behavioral couple therapy. <em>Journal of Consulting and Clinical Psychology, 79</em>(5), 565-576.</li>
          <li>Baucom, B. R., Atkins, D. C., Simpson Rowe, L., Doss, B. D., &amp; Christensen, A. (2015). Prediction of treatment response at 5-year follow-up. <em>Journal of Consulting and Clinical Psychology, 83</em>(1), 103-114.</li>
          <li>Christensen, A., Atkins, D. C., Yi, J., Baucom, D. H., &amp; George, W. H. (2006). Couple and individual adjustment for 2 years following a randomized clinical trial. <em>Journal of Consulting and Clinical Psychology, 74</em>(6), 1180-1191.</li>
          <li>Christensen, A., Atkins, D. C., Baucom, B., &amp; Yi, J. (2010). Marital status and satisfaction five years following a randomized clinical trial. <em>Journal of Consulting and Clinical Psychology, 78</em>(2), 225-235.</li>
          <li>Dijkstra, P., &amp; Tamminga, A. (2025). <em>IBCT-relatietherapie</em> (herziene uitgave). Amsterdam: Boom.</li>
          <li>Doss, B. D., Thum, Y. M., Sevier, M., Atkins, D. C., &amp; Christensen, A. (2005). Improving relationships: Mechanisms of change in couple therapy. <em>Journal of Consulting and Clinical Psychology, 73</em>(4), 624-633.</li>
        </ul>
      </div>
    </BlogLayout>
  );
}
