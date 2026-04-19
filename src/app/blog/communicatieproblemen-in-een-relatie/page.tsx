import type { Metadata } from "next";
import Link from "next/link";
import BlogLayout from "@/components/BlogLayout";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog-posts";

const slug = "communicatieproblemen-in-een-relatie";
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
        'We praten gewoon langs elkaar heen.' 'Elk gesprek eindigt in ruzie.' 'Ik durf niets meer te zeggen.' Als koppels zich bij mij melden, staat communicatie in negen van de tien gevallen bovenaan. En dat is niet zo gek. Communicatie voelt als de lijm van een relatie: als die lijm loslaat, valt de rest uit elkaar.
      </p>
      <p>
        Maar onder de zogenaamde communicatieproblemen ligt bijna altijd iets anders. Niet een gebrek aan woorden, maar een gebrek aan veiligheid. Niet onvermogen om te luisteren, maar onvermogen om nog iets te willen horen. In dit artikel kijken we naar wat er werkelijk speelt, en hoe IBCT-therapie helpt om het te doorbreken.
      </p>

      <h2>Wat zijn communicatieproblemen eigenlijk?</h2>
      <p>
        Vaak noemen koppels 'communicatieproblemen' als verzamelterm voor alles wat schuurt. Maar als je doorvraagt, blijkt het meestal om een paar specifieke dingen te gaan:
      </p>
      <ul>
        <li><strong>Een terugkerend patroon</strong> waarin gesprekken steeds dezelfde kant op gaan.</li>
        <li><strong>Een gevoel van niet gehoord of gezien worden.</strong></li>
        <li><strong>Gesprekken die snel escaleren</strong> tot conflict, of juist wegzakken in stilte.</li>
        <li><strong>Onderwerpen die vermeden worden</strong> omdat ze altijd ruzie opleveren.</li>
        <li><strong>Interpretaties die voor jullie het verhaal geworden zijn:</strong> 'hij luistert nooit', 'zij drammt altijd'.</li>
      </ul>
      <p>
        Dit zijn geen technische communicatieproblemen. Dit zijn relationele patronen. En die vragen iets anders dan een cursus 'actief luisteren'.
      </p>

      <h2>Het demand-withdraw-patroon: het meest onderzochte conflictpatroon</h2>
      <p>
        Als er één patroon is dat in bijna elk stressend koppel voorkomt, is het dit: de één brengt iets aan, wil iets oplossen, wordt feller of emotioneler. De ander voelt het als aanval, kritiek of een eindeloze discussie, en trekt zich terug. Die terugtrekking voedt de frustratie van de eerste, die nóg feller wordt. Waarna de ander nog verder weggaat.
      </p>
      <p>
        Dit is het <em>demand-withdraw-patroon</em>. Het is onderzocht door tientallen teams, en consistent blijkt het een van de sterkste voorspellers van relatie-ontbinding. Het wrange is dat beide partners goed bedoelde redenen hebben om te doen wat ze doen. Degene die vraagt wil contact en oplossing. Degene die zich terugtrekt wil rust en de-escalatie. Allebei willen ze veiligheid, maar ze lopen in precies tegenovergestelde richting om die veiligheid te zoeken.
      </p>

      <h2>Waarom 'beter communiceren' vaak niet werkt</h2>
      <p>
        Veel koppels zijn al lang bezig om beter te communiceren. Ze hebben boeken gelezen, podcasts geluisterd, misschien een cursus gedaan. En toch loopt het steeds mis. Hoe kan dat?
      </p>
      <p>
        Omdat communicatietechnieken alleen werken als de onderliggende emotionele veiligheid er is. Zonder die veiligheid voelt 'ik-boodschappen formuleren' als nep, voelt 'actief luisteren' als toneelspel. En raken partners gefrustreerd: het werkt niet, blijkbaar ligt het aan ons.
      </p>
      <p>
        Het goede nieuws: het ligt niet aan jullie als mensen. Het ligt aan het patroon dat jullie ongewild samen onderhouden. En patronen zijn te veranderen.
      </p>

      <h2>De diepere laag: zachte emoties onder harde emoties</h2>
      <p>
        In IBCT werken we met een kernprincipe: onder elke harde emotie (woede, minachting, verachting, verwijt) ligt een zachte emotie (pijn, angst, teleurstelling, schaamte). De harde emotie is zichtbaar, de zachte emotie is kwetsbaar. En precies die zachte emotie is wat beide partners werkelijk proberen te zeggen, maar niet durven.
      </p>
      <p>
        Een paar voorbeelden:
      </p>
      <ul>
        <li>'Je luistert nooit naar me!' (woede) ligt vaak op 'Ik voel dat ik er niet toe doe.' (pijn)</li>
        <li>'Je zeikt altijd over hetzelfde!' (verwijt) ligt vaak op 'Ik voel me een slechte partner.' (schaamte)</li>
        <li>De stilte van de partner die wegtrekt ligt vaak op 'Ik weet niet hoe ik dit goed kan doen, ik ben bang om jou verder pijn te doen.' (angst)</li>
      </ul>
      <p>
        In de zichtbare ruzie horen jullie elkaar aanvallen. In de onderliggende laag willen jullie allebei gezien worden. De techniek van <em>empathic joining</em> helpt om die onderlaag zichtbaar te maken.
      </p>

      <h2>Wat maakt IBCT effectief bij communicatieproblemen?</h2>
      <p>
        In IBCT werken we niet primair aan communicatietechniek. We werken aan twee dingen tegelijk: acceptatie van wat in de partner moeilijk veranderbaar is, en verandering van wat wel veranderbaar is. Twee technieken zijn hierbij essentieel.
      </p>

      <h3>Unified detachment</h3>
      <p>
        Samen kijken naar het patroon alsof het een derde partij is. 'Daar gaat het patroon weer.' 'We zitten nu in het bekende moment, jij zegt iets, ik voel me aangevallen, ik word stil.' Deze houding haalt de hitte uit het moment. Je bent dan geen tegenstanders meer, maar twee onderzoekers die samen een taai patroon bestuderen.
      </p>

      <h3>Empathic joining</h3>
      <p>
        De therapeut helpt beide partners om onder de harde woorden de zachte laag te vinden. Niet als trucje, maar als serieuze verdieping. Als dat lukt, ontstaat er vaak een opvallende rust: 'Oh, dus dát is wat je eigenlijk wilde zeggen.' In onderzoek is aangetoond dat juist deze verschuiving de grootste impact heeft op langetermijnverbetering (Doss et al., 2005).
      </p>

      <h2>Concreet: wat jullie zelf al kunnen doen</h2>
      <p>
        Een volledig traject is vaak nodig, maar een paar concrete dingen kunnen jullie zelf nu al proberen:
      </p>
      <ul>
        <li><strong>Merk het patroon op, zonder te veroordelen.</strong> 'Ik merk dat ik feller word, ben ik nu weer in het patroon?'</li>
        <li><strong>Neem een pauze als het escaleert, met afspraak wanneer jullie terugkomen op het gesprek.</strong> Niet wegrennen zonder eind.</li>
        <li><strong>Zoek onder de harde emotie de zachte laag.</strong> Wat voel ik onder mijn woede? Angst? Pijn? Teleurstelling?</li>
        <li><strong>Spreek de zachte laag uit,</strong> niet de harde. 'Ik voel me eenzaam' werkt anders dan 'Jij bent nooit thuis'.</li>
        <li><strong>Luister om te begrijpen,</strong> niet om te reageren. Vat samen wat jullie partner zegt voordat je reageert.</li>
      </ul>
      <p>
        Als dit goed wil lukken, hebben jullie vaak een buitenstaander nodig. Juist omdat jullie al jaren in hetzelfde patroon zitten, is het moeilijk om zelf zonder hulp eruit te komen.
      </p>

      <h2>Wanneer is professionele hulp zinvol?</h2>
      <p>
        Als jullie één of meer van deze signalen herkennen, dan is een intakegesprek zinvol:
      </p>
      <ul>
        <li>Elk gesprek over gevoelige onderwerpen escaleert of loopt dood.</li>
        <li>Jullie vermijden bepaalde onderwerpen omdat ze altijd ruzie geven.</li>
        <li>Een van jullie voelt zich niet veilig meer om eerlijk te zijn.</li>
        <li>De intimiteit is merkbaar afgenomen, ook lichamelijk.</li>
        <li>Jullie verwijten elkaar inmiddels dezelfde dingen al jaren.</li>
      </ul>
      <p>
        Meer over de momenten dat therapie zinvol is, lees je in het artikel <Link href="/blog/wanneer-is-relatietherapie-zinvol">wanneer is relatietherapie zinvol</Link>.
      </p>

      <h2>Hoe lang duurt het om een patroon te doorbreken?</h2>
      <p>
        Eerlijk: dat hangt af van hoe lang het patroon er al zit. Een patroon van drie jaar is sneller te doorbreken dan een patroon van vijftien jaar. Maar onderzoek laat zien dat de vooruitgang in IBCT gestaag is en ook ná het traject nog doorgaat. Baucom en collega's (2011) toonden aan dat negativiteit in interacties nog twee jaar na einde therapie verder daalt.
      </p>
      <p>
        Een realistisch beeld: binnen acht tot twintig sessies zijn de patronen duidelijk, en beginnen andere gesprekken mogelijk te worden. Meer over tijdsverwachting lees je in <Link href="/blog/hoe-lang-duurt-relatietherapie">hoe lang duurt relatietherapie</Link>.
      </p>

      <h2>Een gesprek kan verschil maken</h2>
      <p>
        Als jullie herkennen wat in dit artikel staat, dan weten jullie dat er iets moet veranderen. Maar hoe begin je? Vaak met één simpel bericht. In een intakegesprek kijken we samen naar jullie patroon en bespreken we of IBCT passend is.
      </p>
      <p>
        Stuur een bericht via het <Link href="/#contact">contactformulier</Link>, dan nemen we binnen een dag contact op.
      </p>

      <div className="blog-sources">
        <h3>Bronnen</h3>
        <ul>
          <li>Baucom, K. J. W., Sevier, M., Eldridge, K. A., Doss, B. D., &amp; Christensen, A. (2011). Observed communication in couples 2 years after integrative and traditional behavioral couple therapy. <em>Journal of Consulting and Clinical Psychology, 79</em>(5), 565-576.</li>
          <li>Christensen, A., &amp; Doss, B. D. (2017). Integrative Behavioral Couple Therapy. <em>Current Opinion in Psychology, 13</em>, 111-114.</li>
          <li>Doss, B. D., Thum, Y. M., Sevier, M., Atkins, D. C., &amp; Christensen, A. (2005). Improving relationships: Mechanisms of change in couple therapy. <em>Journal of Consulting and Clinical Psychology, 73</em>(4), 624-633.</li>
          <li>Jacobson, N. S., &amp; Christensen, A. (1996). <em>Integrative couple therapy: Promoting acceptance and change</em>. New York: W. W. Norton.</li>
        </ul>
      </div>
    </BlogLayout>
  );
}
