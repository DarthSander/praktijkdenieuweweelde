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
        Weinig dingen in een relatie komen zo hard binnen als het moment waarop duidelijk wordt dat er sprake is van ontrouw. De grond zakt onder jullie weg. Alles voelt ineens onzeker. Je kijkt met andere ogen naar wat er was, en de toekomst voelt onduidelijk. En toch rijst juist dan de vraag: is er nog iets te redden? Het antwoord is: vaker dan je denkt.
      </p>

      <h2>Wat voel je na de ontrouw?</h2>
      <p>
        Ontrouw wordt door veel onderzoekers beschouwd als een relationeel trauma. De bedrogen partner ervaart symptomen die sterk lijken op die van PTSS: terugkerende gedachten, slapeloosheid, verhoogde alertheid, stemmingswisselingen. De partner die vreemdging voelt vaak een mengeling van schaamte, opluchting, verdriet en verwarring. Intussen moet het dagelijks leven gewoon doorgaan: de kinderen naar school, de boodschappen gedaan.
      </p>
      <p>
        In de therapie creëren we graag een setting waarin jullie ongestoord kunnen werken aan herstel. Als jullie jonge kinderen hebben, is het voor de sessies daarom prettig als er oppas is. Maar als het echt heel lastig te regelen is en je kindje goed slaapt, dan kunnen we daar samen een passende oplossing voor vinden.
      </p>
      <p>
        Die eerste weken zijn chaotisch, en dat is normaal. In deze fase is het beter niet meteen grote beslissingen over je relatie te nemen. Belangrijker is eerst rust en veiligheid te creëren in jullie dagelijkse routine, en daarna pas te onderzoeken wat er is gebeurd en wat er nodig is.
      </p>

      <h2>Kan een relatie echt herstellen na ontrouw?</h2>
      <p>
        Ja, en niet alleen in uitzonderlijke gevallen. Grootschalig onderzoek laat dit helder zien. Atkins, Eldridge, Baucom en Christensen (2005) volgden koppels in IBCT-therapie waarvan een deel te maken had met ontrouw. Hun titel zegt genoeg: <em>Optimism in the face of betrayal</em>.
      </p>
      <p>
        De bevindingen waren opvallend. Koppels die de ontrouw voor of tijdens de therapie hadden gedeeld, begonnen met meer stress en minder vertrouwen. Maar op termijn maakten zij grotere stappen dan koppels zonder ontrouw. Ze eindigden even tevreden of zelfs tevredener dan anderen. Een latere studie (Marín, Christensen en Atkins, 2014) bevestigde dit beeld over een periode van vijf jaar.
      </p>
      <p>
        Een belangrijke voorwaarde: de ontrouw moet gedeeld en besproken worden. Geheimen die blijven doorsijpelen maken herstel niet alleen moeilijker, maar vaak onmogelijk.
      </p>

      <h2>De drie fasen van herstel</h2>
      <p>
        In IBCT-therapie werken we bij ontrouw doorgaans in drie herkenbare fasen. Ze volgen niet altijd strikt op elkaar, maar vormen wel een baken in een periode die vaak onoverzichtelijk aanvoelt.
      </p>

      <h3>Fase 1: stabiliseren</h3>
      <p>
        Het eerste doel is rust. Geen grote beslissingen, geen eindeloze verhoren, maar ruimte om te ademen. In deze fase maken we afspraken over hoe jullie samen functioneren in de tussentijd: wie slaapt waar, hoe vertellen we het aan anderen, welke gesprekken voeren we apart en welke samen. Wat in deze fase vaak onder de oppervlakte ligt, is dat beide partners in een soort overlevingsmodus zitten.
      </p>

      <h3>Fase 2: begrijpen</h3>
      <p>
        De belangrijkste vraag van de bedrogen partner is: waarom? Niet om de ontrouw goed te praten, maar om grip te krijgen. In IBCT gebruiken we hiervoor een analyse waarin we vier lagen onderzoeken:
      </p>
      <ul>
        <li>Verschillen tussen jullie die mogelijk zijn gaan schuren.</li>
        <li>Individuele kwetsbaarheden die al langer meespeelden bij een of beide partners.</li>
        <li>Externe stressoren zoals werkdruk, een sterfgeval of verhuizing.</li>
        <li>Het patroon waarin jullie samen verstrikt waren geraakt, bijvoorbeeld het vraag-en-terugtrek-patroon.</li>
      </ul>
      <p>
        Deze analyse is geen rechtvaardiging van de ontrouw. Wel geeft het een context waarin beide partners kunnen begrijpen wat zich heeft opgebouwd. Dat maakt herstel mogelijk, omdat er iets veranderbaars zichtbaar wordt.
      </p>

      <h3>Fase 3: heropbouwen</h3>
      <p>
        In deze fase draait het om twee dingen: het opnieuw opbouwen van vertrouwen en het vormen van een bewuste nieuwe relatie. Vertrouwen groeit niet door beloften, maar door voorspelbaar en transparant gedrag in de loop van de tijd. En die nieuwe relatie is echt nieuw; geen reparatie van de oude.
      </p>
      <p>
        Veel koppels vertellen achteraf dat hun relatie na de therapie dieper en eerlijker is dan ervoor. Niet ondanks de crisis, maar dankzij de eerlijkheid waartoe zij uiteindelijk bereid waren.
      </p>

      <h2>Wat werkt niet?</h2>
      <p>
        Een aantal dingen die ik regelmatig tegenkom en waarvan onderzoek laat zien dat ze herstel eerder in de weg staan:
      </p>
      <ul>
        <li><strong>Alles vergeten en vooruit kijken.</strong> Pijn die je niet uitspreekt, komt via je gedrag naar buiten.</li>
        <li><strong>Jezelf uitputten met detailvragen.</strong> De bedrogen partner heeft feiten nodig, maar eindeloze reconstructie houdt het trauma actief.</li>
        <li><strong>Straffen als methode.</strong> Het kan even opluchten, maar het voedt schaamte en verlengt het herstel.</li>
        <li><strong>In isolement werken.</strong> Zonder hulp van buitenaf blijven partners vaak vastzitten in dezelfde reactiepatronen.</li>
      </ul>

      <h2>Wat IBCT onderscheidt bij ontrouw</h2>
      <p>
        Het bijzondere van IBCT is de combinatie van acceptatie en verandering. Na ontrouw is alleen gedragsverandering onvoldoende: de bedrogen partner heeft ruimte nodig voor zijn of haar pijn, en de ontrouwe partner moet leren omgaan met schaamte en schuldgevoel.
      </p>
      <p>
        Twee werkwijzen zijn hierbij bijzonder krachtig. Ten eerste: onder de harde emoties (woede, minachting) de zachte emoties (angst, pijn, schaamte) zichtbaar maken, zodat partners elkaar weer zien als mens in plaats van als dader of slachtoffer. Ten tweede: samen kijken naar het patroon waarin jullie vast zijn geraakt, zoals je naar een film kijkt — beschrijvend, zonder direct schuld toe te wijzen. Dit haalt de hitte uit het gesprek en creëert ruimte voor begrip.
      </p>
      <p>
        Wil je meer lezen over hoe IBCT werkt, bekijk dan het artikel over <Link href="/blog/communicatieproblemen-in-een-relatie">wat IBCT is en waarom het anders is</Link>.
      </p>

      <h2>Wanneer is herstel niet realistisch?</h2>
      <p>
        Er zijn situaties waarin ik eerlijk uitspreek dat herstel niet waarschijnlijk is. Bijvoorbeeld wanneer er sprake is van een andere relatie of contact dat blijft doorgaan, van structureel misleidend gedrag, of wanneer een of beide partners niet bereid zijn tot werkelijke eerlijkheid. In zulke gevallen is onderzoeken of bewust uit elkaar gaan soms de eerlijkere keuze. Daarover lees je meer in <Link href="/blog/relatietherapie-of-scheiden">relatietherapie of scheiden</Link>.
      </p>

      <h2>Hoe lang duurt herstel na ontrouw?</h2>
      <p>
        Waarschijnlijk langer dan waar je op hoopt. Gemiddeld werken koppels die na ontrouw in therapie gaan vijftien tot twintig sessies aan herstel, verspreid over ongeveer een jaar. Maar de echte integratie duurt vaak langer, soms twee tot drie jaar. Wat zich verankert, is duurzaam: vijf jaar na IBCT-therapie ging het veel beter met vijftig procent van de onderzochte koppels (Christensen et al., 2010).
      </p>

      <h2>Een gesprek kan al verschil maken</h2>
      <p>
        Als jullie in deze situatie zitten, weet dan dat jullie niet de eersten zijn en niet de laatsten. Ontrouw is pijnlijk en ontzettend menselijk. Het eerste gesprek hoeft niet het hele plan te bevatten — alleen de stap om het bespreekbaar te maken met iemand die er verstand van heeft.
      </p>
      <p>
        Plan een intakegesprek via het <Link href="/#contact">contactformulier</Link>. We kijken samen of IBCT bij jullie situatie past en welke eerste stappen passend zijn.
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
