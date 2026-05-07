import type { Metadata } from "next";
import Link from "next/link";
import BlogLayout from "@/components/BlogLayout";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog-posts";

const slug = "steeds-dezelfde-ruzie-in-je-relatie";
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
      <h2>Als jullie steeds in dezelfde ruzies belanden</h2>
      <p>
        Veel koppels herkennen dit: je begint over iets kleins, maar ineens zit je in een
        discussie die veel groter voelt. De toon wordt harder, de een haakt af, de ander
        trekt zich terug. Voor je het weet zitten jullie in een vicieuze cirkel.
      </p>
      <p>
        Het voelt vermoeiend, pijnlijk, soms zelfs ontmoedigend. Misschien vraag je je af
        of het altijd zo zal blijven, of jullie gewoon te verschillend zijn. Diep van
        binnen weet je dat het niet zo simpel is.
      </p>
      <p>
        Vaak zitten jullie vast in een patroon dat zichzelf blijft herhalen en daar kunnen
        jullie iets aan doen.
      </p>

      <h2>Waarom ruzies vaak hetzelfde verloop hebben</h2>
      <p>
        In de meeste relaties gaat het niet om het onderwerp zelf, maar om wat eronder
        ligt. In IBCT noemen we dit emotionele gevoeligheden: diepere behoeften en
        kwetsbaarheden die snel geraakt worden, zoals de behoefte aan nabijheid, de angst
        er alleen voor te staan, of het gevoel niet gezien te worden. Tijdens een ruzie
        komen die niet altijd zo naar buiten. Wat je ziet zijn de harde emoties: woede,
        cynisme of bijvoorbeeld beledigd zijn, maar daaronder liggen de zachte emoties:
      </p>
      <ul>
        <li>&ldquo;Ik voel me bezorgd&rdquo;</li>
        <li>&ldquo;Ik ben bang er alleen voor te staan en voel mij eenzaam&rdquo;</li>
        <li>&ldquo;Ik voel me onbelangrijk en niet gehoord&rdquo;</li>
      </ul>
      <p>
        Wanneer zo&rsquo;n gevoeligheid geraakt wordt, reageren we automatisch. Niet omdat
        we dat willen, maar omdat ons systeem in de beschermstand schiet, zonder dat we
        daar bewust voor kiezen. Zo ontstaat vervolgens een ruziepatroon: de &eacute;&eacute;n
        zoekt contact, de ander trekt zich terug of andersom. Hoe harder de &eacute;&eacute;n
        duwt, hoe verder de ander lijkt weg te bewegen.
      </p>

      <h2>Het patroon is het probleem</h2>
      <p>
        In IBCT kijken we niet naar &ldquo;wie er gelijk heeft&rdquo; of wie het begon,
        maar naar hoe jullie op elkaar reageren. Wat roept jouw reactie op bij de ander?
        En hoe versterken jullie elkaar daarin, zonder dat iemand dat bewust wil? Wanneer
        koppels dit patroon samen leren zien, ontstaat er vaak meteen meer rust. Niet
        omdat het conflict weg is, maar omdat jullie herkennen: &ldquo;O ja&hellip; dit is
        wat we keer op keer doen.&rdquo; Dat inzicht verzacht al.
      </p>

      <h2>Wat er in je lijf gebeurt tijdens een ruzie</h2>
      <p>
        Op het moment dat een ruzie escaleert, schiet je zenuwstelsel in de stress-stand.
        Je raakt buiten je window of tolerance: de zone waarin je nog kunt nadenken,
        luisteren en verbinding maken. Daarbuiten reageer je automatisch: aanvallen,
        verdedigen of afsluiten. Soms betekent een pauze niet &ldquo;even afkoelen&rdquo;
        maar letterlijk je zenuwstelsel de kans geven om terug te komen in de zone waar
        contact mogelijk is.
      </p>

      <h2>Wat helpt op het moment zelf</h2>
      <p>
        Je hoeft geen perfecte communicatie te hebben om uit een ruziepatroon te komen.
        Kleine, haalbare stappen maken vaak het grootste verschil:
      </p>

      <h3>Herken het moment waarop het misgaat</h3>
      <p>
        Dat is meestal eerder dan je denkt: een zucht, een blik, een onhandige opmerking.
      </p>

      <h3>Pauzeer even</h3>
      <p>
        Niet om weg te lopen van het gesprek, maar om te voorkomen dat jullie in de
        automatische stand schieten. Een korte pauze is geen afwijzing, maar een manier
        om het gesprek te redden. Lukt het niet om een constructief gesprek aan te gaan
        op dit moment? Dan kun je dat benoemen, je hoeft niets te forceren of te doen
        &lsquo;alsof&rsquo; je weer kalm bent.
      </p>

      <h3>Ga terug naar wat eronder ligt</h3>
      <p>
        Onder de harde emoties (boosheid, frustratie, irritatie) liggen bijna altijd
        zachtere gevoelens. Angst, verdriet, schaamte. Als je die kunt benoemen, verander
        je de toon van het gesprek. Niet aanvallen, maar je kwetsbaar opstellen. Want
        daar heeft je partner vaak, in tegenstelling tot harde emoties, wel oor naar.
        Houd het bij je eigen emoties, zonder verwijten. Niet als strategie, maar als
        uitnodiging om de ander een blik te gunnen in je binnenwereld.
      </p>
      <p>
        Niet: &ldquo;Je luistert nooit naar mij.&rdquo;
        <br />
        Maar: &ldquo;Ik voel me onzeker als ik niet weet of je me begrijpt.&rdquo;
      </p>
      <p>
        Niet: &ldquo;Ja, hoor. Loop maar weer weg, dat doe je altijd.&rdquo;
        <br />
        Maar: &ldquo;Ik voel me alleen als jij je terugtrekt. Ik wil graag dat je
        blijft.&rdquo;
      </p>

      <h2>Wanneer ruzies vaker voorkomen dan jullie lief is</h2>
      <p>
        Als jullie merken dat ruzies steeds sneller oplaaien, langer duren of meer impact
        hebben, kan begeleiding helpen. Niet om te bepalen wie er gelijk heeft, maar om
        de omgang tussen jullie beiden weer prettig te maken en nieuwe manieren van
        verbinding te vinden. Veel koppels merken dat er na een paar sessies al meer rust
        ontstaat. Meer helderheid over wat er speelt, meer begrip voor elkaar, en ruimte
        om elkaar weer echt te zien.
      </p>
      <p>
        Lees ook ons artikel over{" "}
        <Link href="/blog/communicatieproblemen-in-een-relatie">
          IBCT en communicatie in je relatie
        </Link>{" "}
        of{" "}
        <Link href="/blog/wanneer-is-relatietherapie-zinvol">
          wanneer relatietherapie zinvol is
        </Link>
        .
      </p>

      <h2>Herken je dit en wil je samen werken aan meer rust?</h2>
      <p>
        Soms is het fijn om iemand van buitenaf mee te laten kijken. Niet om te oordelen,
        maar om samen nieuwe wegen te vinden. Ik kom bij jullie thuis, zodat we in jullie
        vertrouwde omgeving kunnen kijken naar wat er precies speelt, met aandacht voor
        wat jullie allebei nodig hebben. Maak een afspraak voor een{" "}
        <Link href="/#contact">intakegesprek</Link>.
      </p>

      <div className="blog-sources">
        <h3>Bronnen</h3>
        <p>Deze blog is gebaseerd op inzichten uit:</p>
        <p>
          <strong>IBCT &ndash; Integrative Behavioral Couple Therapy</strong>
        </p>
        <ul>
          <li>
            Christensen, A., Doss, B. D., &amp; Jacobson, N. S. (2020).{" "}
            <em>Reconcilable Differences.</em>
          </li>
          <li>
            Jacobson, N. S., &amp; Christensen, A. (1996).{" "}
            <em>
              Integrative Couple Therapy: Promoting Acceptance and Change.
            </em>{" "}
            &rarr; Onderbouwing van: emotionele gevoeligheden, harde/zachte emoties,
            negatieve interactiepatronen, automatische beschermreacties.
          </li>
        </ul>
        <p>
          <strong>Window of tolerance &amp; stressreacties</strong>
        </p>
        <ul>
          <li>
            Siegel, D. J. (1999). <em>The Developing Mind.</em>
          </li>
          <li>
            Ogden, P., Minton, K., &amp; Pain, C. (2006).{" "}
            <em>Trauma and the Body.</em> &rarr; Onderbouwing van:
            fight/flight/freeze-reacties, het zenuwstelsel in stress-stand, het belang
            van pauzeren.
          </li>
        </ul>
        <p>
          <strong>Effectiviteit van IBCT</strong>
        </p>
        <ul>
          <li>
            Christensen, A., Atkins, D. C., Baucom, B., &amp; Yi, J. (2010).{" "}
            <em>Randomized clinical trial naar IBCT.</em> &rarr; Onderbouwing van: IBCT
            als wetenschappelijk onderbouwde relatietherapie.
          </li>
        </ul>
      </div>
    </BlogLayout>
  );
}
