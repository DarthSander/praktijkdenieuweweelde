export type LandingPage = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  h1: string;
  heroKicker: string;
  heroSubtitle: string;
  image: string;
  imageAlt: string;
  areaServed: string;
};

export const landingPages: LandingPage[] = [
  {
    slug: "relatietherapie-tilburg",
    title: "Relatietherapie in Tilburg",
    metaTitle: "Relatietherapie Tilburg aan huis | Reeshof & omgeving",
    description:
      "Relatietherapie aan huis in Tilburg. Begeleiding in Reeshof, Berkel‑Enschot, Centrum en omliggende wijken. Voor koppels die vastlopen in patronen en weer verbinding willen.",
    h1: "Relatietherapie in Tilburg, gewoon bij jullie thuis",
    heroKicker: "IBCT relatietherapie in Tilburg",
    heroSubtitle:
      "Wetenschappelijk onderbouwde begeleiding voor koppels in Tilburg en omgeving. Ik kom bij jullie thuis, zodat jullie rustig en in een vertrouwde sfeer kunnen werken aan jullie relatie.",
    image: "/pampas-water.jpg",
    imageAlt: "Pampasgras bij kalm water, symbool voor rust en reflectie in Tilburg",
    areaServed: "Tilburg",
  },
  {
    slug: "relatietherapie-reeshof",
    title: "Relatietherapie in de Reeshof",
    metaTitle: "Relatietherapie Reeshof Tilburg | Aan huis & persoonlijk",
    description:
      "Wetenschappelijk onderbouwde relatietherapie aan huis in de Reeshof. Voor koppels die vastlopen in terugkerende patronen en weer rust, begrip en verbinding willen.",
    h1: "Relatietherapie in de Reeshof, gewoon bij jullie thuis",
    heroKicker: "IBCT relatietherapie in Tilburg-West",
    heroSubtitle:
      "Wetenschappelijk onderbouwde begeleiding voor koppels in Tilburg en omgeving. Ik kom bij jullie thuis in de Reeshof, zodat jullie rustig en in een vertrouwde sfeer kunnen werken aan jullie relatie.",
    image: "/pampas-breeze.jpg",
    imageAlt: "Pampasgras in de bries, symbool voor ruimte en beweging in de Reeshof",
    areaServed: "Reeshof",
  },
  {
    slug: "relatietherapie-berkel-enschot",
    title: "Relatietherapie in Berkel-Enschot",
    metaTitle: "Relatietherapie Berkel‑Enschot Tilburg | Aan huis & vertrouwd",
    description:
      "Relatietherapie aan huis in Berkel‑Enschot. Professionele, wetenschappelijk onderbouwde begeleiding voor koppels die patronen willen doorbreken en meer rust en nabijheid zoeken.",
    h1: "Relatietherapie in Berkel-Enschot, in jullie vertrouwde omgeving",
    heroKicker: "IBCT relatietherapie in Berkel-Enschot",
    heroSubtitle:
      "Wetenschappelijk onderbouwde begeleiding voor koppels in Berkel-Enschot en omgeving. Ik kom bij jullie thuis, zodat jullie in alle rust kunnen werken aan wat er speelt tussen jullie.",
    image: "/pampas-mountains.jpg",
    imageAlt: "Weids landschap met pampasgras, symbool voor ruimte in Berkel-Enschot",
    areaServed: "Berkel-Enschot",
  },
  {
    slug: "ibct-relatietherapie",
    title: "IBCT relatietherapie",
    metaTitle: "IBCT relatietherapie Tilburg | Evidence-based",
    description:
      "IBCT relatietherapie in Tilburg. Wetenschappelijk onderbouwde aanpak voor koppels die vastgelopen patronen willen begrijpen, verzachten en duurzaam doorbreken.",
    h1: "IBCT relatietherapie, acceptatie en verandering in balans",
    heroKicker: "Integrative Behavioral Couple Therapy",
    heroSubtitle:
      "IBCT combineert twee doelen: acceptatie van wat niet veranderbaar is, en verandering van wat wél kan. Een van de best onderzochte vormen van relatietherapie wereldwijd.",
    image: "/pampas-mountains.jpg",
    imageAlt: "Pampasgras voor weids landschap, symbool voor ruimte en wetenschap",
    areaServed: "Tilburg",
  },
  {
    slug: "relatietherapie-aan-huis",
    title: "Relatietherapie aan huis in Tilburg en omgeving",
    metaTitle: "Relatietherapie aan huis Tilburg | Rust & veiligheid thuis",
    description:
      "Relatietherapie aan huis in Tilburg. In jullie vertrouwde omgeving werken aan rust en duurzame verandering. Deskundig, persoonlijk en wetenschappelijk onderbouwd.",
    h1: "Relatietherapie aan huis in Tilburg en omgeving",
    heroKicker: "IBCT thuis bij jullie",
    heroSubtitle:
      "Relatietherapie in jullie eigen vertrouwde omgeving. Ik kom bij jullie thuis zodat we kunnen werken aan jullie relatie op de plek waar het leven zich afspeelt: aan tafel, op de bank of in de ruimte waar jullie samen zijn.",
    image: "/pampas-indoor.jpg",
    imageAlt: "Pampasgras in huiselijke sfeer, symbool voor therapie aan huis",
    areaServed: "Tilburg en omgeving",
  },
  {
    slug: "relatietherapie-jonge-ouders",
    title: "Relatietherapie voor jonge ouders",
    metaTitle: "Relatietherapie jonge ouders Tilburg | Stress, baby & slaaptekort",
    description:
      "Relatietherapie aan huis voor jonge ouders in Tilburg. Ik kom bij jullie thuis: vertrouwd, rustig en op jullie eigen plek. Relatiepraktijk De Nieuwe Weelde.",
    h1: "Relatietherapie voor jonge ouders: hoe houd je je relatie goed na een kind",
    heroKicker: "IBCT voor jonge ouders",
    heroSubtitle:
      "Een kind krijgen is prachtig, maar het zet jullie relatie vaak volledig op zijn kop. Minder slaap, nieuwe rollen en weinig tijd samen kunnen spanning geven. Daarom begeleid ik jonge ouders aan huis in Tilburg en omgeving, zodat jullie in jullie eigen vertrouwde omgeving de verbinding weer kunnen voelen en elkaar opnieuw kunnen vinden.",
    image: "/pampas-beige.jpg",
    imageAlt: "Warm pampasgras, symbool voor zachte herverbinding voor jonge ouders",
    areaServed: "Tilburg en omgeving",
  },
];

export function getLandingBySlug(slug: string): LandingPage | undefined {
  return landingPages.find((p) => p.slug === slug);
}
