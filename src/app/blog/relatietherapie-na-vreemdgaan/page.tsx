import type { Metadata } from "next";
import Link from "next/link";
import BlogLayout from "@/components/BlogLayout";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog-posts";

const slug = "relatietherapie-na-vreemdgaan";
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
        Weinig dingen in een relatie slaan zo hard in als het moment waarop duidelijk wordt dat er sprake is van ontrouw. De grond zakt onder jullie weg. Alles wat zeker leek, trilt. Het verleden krijgt opeens een andere kleur, de toekomst lijkt opgelost in mist. En toch, juist op dat moment, is de vraag: is er nog iets te redden? Het verrassende antwoord uit de wetenschap is: vaker wel dan je denkt.
      </p>

      <h2>Wat gebeurt er emotioneel na een ontdekking?</h2>
      <p>
        Ontrouw wordt door veel onderzoekers beschouwd als een relationeel trauma. De bedrogen partner ervaart symptomen die sterk lijken op die van PTSS: indringende gedachten, slapeloosheid, hyperalertheid, stemmingswisselingen. De partner die vreemdging voelt meestal een mengeling van schaamte, opluchting, verdriet en verwarring. Tegelijkertijd moet het dagelijks leven doorgaan, de kinderen naar school, de boodschappen gedaan.
      </p>
      <p>
        Die eerste weken zijn chaotisch en dat is normaal. Beslissingen nemen over jullie relatie in deze fase is vaak te vroeg. Belangrijker is eerst rust en veiligheid te creëren in jullie dagelijkse routine, en daarna pas te onderzoeken wat er is gebeurd en wat er nodig is.
      </p>

      <h2>Kan een relatie echt herstellen na ontrouw?</h2>
      <p>
        Ja, en niet alleen in individuele gevallen. Grootschalig onderzoek laat dit helder zien. Atkins, Eldridge, Baucom en Christensen (2005) volgden koppels in IBCT-therapie waarvan een deel te maken had met ontrouw. Hun titel is veelzeggend: <em>Optimism in the face of betrayal</em>.
      </p>
      <p>
        Hun bevindingen waren verrassend. Koppels die de ontrouw vóór of tijdens de therapie hadden onthuld, startten inderdaad met meer stress en een lager vertrouwen. Maar op termijn maakten zij grotere stappen dan koppels zonder ontrouw. Zij eindigden op een vergelijkbaar of zelfs hoger tevredenheidsniveau. Een latere studie (Marín, Christensen &amp; Atkins, 2014) bevestigde dit beeld over een periode van vijf jaar.
      </p>
      <p>
        Een belangrijke voorwaarde: de ontrouw moet onthuld en besproken worden. Geheimen die doorsijpelen maken herstel niet alleen moeilijker, maar vaak onmogelijk.
      </p>

      <h2>De drie fasen van herstel</h2>
      <p>
        In IBCT-therapie werken we bij ontrouw doorgaans in drie herkenbare fasen. Ze lopen niet strikt lineair, maar vormen wel een baken tijdens een periode die vaak onoverzichtelijk aanvoelt.
      </p>

      <h3>Fase 1: stabiliseren</h3>
      <p>
        Het eerste doel is rust. Geen grote beslissingen, geen eindeloze verhoren, maar ruimte om te ademen. In deze fase maken we afspraken over hoe jullie samen functioneren in de tussentijd: wie slaapt waar, hoe vertellen we het aan de kinderen of anderen, welke gesprekken houden we apart en welke samen. Wat in deze fase vaak onder de oppervlakte ligt, is pure overlevingsmodus.
      </p>

      <h3>Fase 2: begrijpen</h3>
      <p>
        De belangrijkste vraag die de bedrogen partner heeft, is: waarom? Niet om de ontrouw goed te praten, maar om grip te krijgen. Hier gebruiken we in IBCT de <em>DEEP-analyse</em>:
      </p>
      <ul>
        <li><strong>D - Differences:</strong> verschillen tussen jullie waaraan de relatie mogelijk is gaan schuren.</li>
        <li><strong>E - Emotional sensitivities:</strong> individuele kwetsbaarheden die al langer meespeelden.</li>
        <li><strong>E - External circumstances:</strong> externe stressoren zoals werkdruk, een sterfgeval of verhuizing.</li>
        <li><strong>P - Pattern of interaction:</strong> het patroon waarin jullie samen verstrikt waren geraakt, bijvoorbeeld het demand-withdraw-patroon.</li>
      </ul>
      <p>
        Deze analyse is geen excuus voor de ontrouw. Wel geeft het een context waarin beide partners iets kunnen begrijpen over wat zich heeft opgebouwd. Dat maakt herstel mogelijk, omdat er iets veranderbaars zichtbaar wordt.
      </p>

      <h3>Fase 3: heropbouwen</h3>
      <p>
        In deze fase gaat het om twee dingen: het opnieuw opbouwen van vertrouwen, en het vormen van een bewuste nieuwe relatie. Vertrouwen groeit niet door beloften maar door voorspelbaar, transparant gedrag over langere tijd. En de nieuwe relatie is écht nieuw, niet een reparatie van de oude.
      </p>
      <p>
        Veel koppels vertellen achteraf dat hun relatie ná de therapie dieper en eerlijker is dan ervoor. Niet ondanks de crisis, maar juist dankzij de eerlijkheid waar zij toe werden gedwongen.
      </p>

      <h2>Wat werkt niet?</h2>
      <p>
        Een paar dingen die ik regelmatig tegenkom en waarvan onderzoek laat zien dat ze herstel eerder in de weg zitten:
      </p>
      <ul>
        <li><strong>Alles vergeten en vooruit kijken.</strong> Onthoud: pijn die je niet uitspreekt, spreek je met je gedrag.</li>
        <li><strong>Jezelf uitputten met detailvragen.</strong> De bedrogen partner heeft feiten nodig, maar eindeloze reconstructie houdt het trauma actief.</li>
        <li><strong>Straffen als methode.</strong> Het kan even opluchten, maar het voedt schaamte en maakt het herstel langer.</li>
        <li><strong>In isolement werken.</strong> Zonder buitenstaander blijven beide partners vaak vastzitten in dezelfde reactiepatronen.</li>
      </ul>

      <h2>Wat doet IBCT wat andere therapieën minder doen?</h2>
      <p>
        Het onderscheidende van IBCT is de combinatie van <strong>acceptatie</strong> en <strong>verandering</strong>. Na ontrouw is alleen gedragsverandering te dun: de bedrogen partner heeft ook ruimte nodig voor zijn of haar pijn, en de ontrouwe partner moet leren met schaamte en schuldgevoel om te gaan.
      </p>
      <p>
        Twee IBCT-technieken zijn bij ontrouw bijzonder krachtig:
      </p>
      <ul>
        <li><strong>Empathic joining:</strong> onder de harde emoties (woede, minachting) de zachte emoties (angst, pijn, schaamte) zichtbaar maken, zodat partners elkaar weer zien als mens in plaats van als dader of slachtoffer.</li>
        <li><strong>Unified detachment:</strong> samen kijken naar het patroon zoals je naar een film kijkt: beschrijvend, zonder blame. Dit haalt de hitte uit het gesprek en creëert ruimte voor begrip.</li>
      </ul>
      <p>
        Wil je meer lezen over hoe IBCT werkt, bekijk dan het artikel over <Link href="/blog/wat-is-ibct">wat IBCT is en waarom het anders is</Link>.
      </p>

      <h2>Wanneer is herstel niet realistisch?</h2>
      <p>
        Er zijn situaties waarin ik eerlijk uitspreek dat herstel niet waarschijnlijk is. Bijvoorbeeld als er sprake is van een langdurige parallelle relatie die niet beëindigd wordt, van structureel misleidend gedrag, of als beide partners niet bereid zijn tot werkelijke eerlijkheid. In zulke gevallen is onderzoeken of bewust uit elkaar gaan de eerlijkere keuze. Daarover lees je meer in <Link href="/blog/relatietherapie-of-scheiden">relatietherapie of scheiden</Link>.
      </p>

      <h2>Hoe lang duurt herstel na ontrouw?</h2>
      <p>
        Eerlijk: langer dan jullie willen. Gemiddeld werken koppels die na ontrouw in therapie gaan vijftien tot twintig sessies aan herstel, verspreid over ongeveer een jaar. Maar de echte integratie duurt vaak langer, soms twee tot drie jaar. Wat zich verankert, is duurzaam: vijf jaar na IBCT-therapie was vijftig procent van de onderzochte koppels nog altijd klinisch significant verbeterd (Christensen et al., 2010).
      </p>

      <h2>Een gesprek kan al verschil maken</h2>
      <p>
        Als jullie in deze situatie zitten, weet dat jullie niet de eersten zijn en niet de laatsten. Ontrouw is pijnlijk én ontzettend menselijk. Het eerste gesprek hoeft niet het hele plan te bevatten, alleen de stap om het bespreekbaar te maken met iemand die er verstand van heeft.
      </p>
      <p>
        Plan een gratis, vrijblijvende kennismaking via het <Link href="/#contact">contactformulier</Link>. We kijken samen of IBCT bij jullie situatie past, en welke eerste stappen passend zijn.
      </p>

      <div className="blog-sources">
        <h3>Bronnen</h3>
        <ul>
          <li>Atkins, D. C., Eldridge, K. A., Baucom, D. H., &amp; Christensen, A. (2005). Infidelity and behavioral couple therapy: Optimism in the face of betrayal. <em>Journal of Consulting and Clinical Psychology, 73</em>(1), 144-150.</li>
          <li>Christensen, A., Atkins, D. C., Baucom, B., &amp; Yi, J. (2010). Marital status and satisfaction five years following a randomized clinical trial comparing traditional versus integrative behavioral couple therapy. <em>Journal of Consulting and Clinical Psychology, 78</em>(2), 225-235.</li>
          <li>Marín, R. A., Christensen, A., &amp; Atkins, D. C. (2014). Infidelity and behavioral couple therapy: Relationship outcomes over 5 years following therapy. <em>Couple and Family Psychology: Research and Practice, 3</em>(1), 1-12.</li>
        </ul>
      </div>
    </BlogLayout>
  );
}
