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
    metaTitle: "Relatietherapie Tilburg | IBCT aan huis door Eva Mulder",
    description:
      "Relatietherapie in Tilburg aan huis. IBCT-relatietherapeut Eva Mulder begeleidt koppels in Tilburg en omgeving.",
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
    metaTitle: "Relatietherapie Reeshof | IBCT aan huis in Tilburg-West",
    description:
      "Relatietherapie in de Reeshof, aan huis. IBCT-relatietherapeut Eva Mulder woont en werkt in Tilburg-West. Avondsessies mogelijk.",
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
    metaTitle: "Relatietherapie Berkel-Enschot | IBCT aan huis",
    description:
      "Relatietherapie in Berkel-Enschot aan huis. IBCT-relatietherapeut Eva Mulder begeleidt koppels in Berkel-Enschot discreet en respectvol.",
    h1: "Relatietherapie in Berkel-Enschot, in jullie vertrouwde omgeving",
    heroKicker: "IBCT relatietherapie in Berkel-Enschot",
    heroSubtitle:
      "Voor koppels in Berkel-Enschot die rust en discretie zoeken. Therapie aan huis betekent geen wachtkamer, geen bekenden in de hal. Gewoon jullie eigen bank, jullie eigen tempo.",
    image: "/pampas-mountains.jpg",
    imageAlt: "Weids landschap met pampasgras, symbool voor ruimte in Berkel-Enschot",
    areaServed: "Berkel-Enschot",
  },
  {
    slug: "ibct-relatietherapie",
    title: "IBCT relatietherapie",
    metaTitle: "IBCT relatietherapie | Wetenschappelijk onderbouwd in Tilburg",
    description:
      "IBCT relatietherapie in Tilburg door Eva Mulder. Integrative Behavioral Couple Therapy is een van de best onderzochte vormen van relatietherapie. Lees hoe het werkt.",
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
    metaTitle: "Relatietherapie aan huis | IBCT in Tilburg en omgeving",
    description:
      "Relatietherapie aan huis in Tilburg en omgeving. IBCT in jullie eigen vertrouwde omgeving door Eva Mulder. Avond- en weekendsessies mogelijk.",
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
    metaTitle: "Relatieproblemen na kind? Relatietherapie voor jonge ouders in Tilburg",
    description:
      "Relatieproblemen na een kind? IBCT-relatietherapie voor jonge ouders in Tilburg en omgeving. Eva Mulder komt bij jullie thuis, ook 's avonds als de kleine slaapt.",
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
