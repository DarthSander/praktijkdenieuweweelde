<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# SEO titels en meta omschrijvingen — DEFINITIEF (NIET WIJZIGEN)

De onderstaande SEO titels en meta descriptions zijn **definitief vastgesteld** en mogen **niet meer worden aangepast**, tenzij de eigenaar daar uitdrukkelijk om vraagt. Wijzig deze waarden niet bij refactoring, opschoning of "verbeteringen". Bij twijfel: laat ze staan.

Bronlocaties:
- Homepage: `src/app/layout.tsx` (`metadata.title.default` + `metadata.description`, plus openGraph/twitter)
- Landingspagina's: `src/lib/landing-pages.ts` (`metaTitle` + `description` per slug)
- Blogoverzicht: `src/app/blog/page.tsx`

De definitieve waarden zijn:

1. **Homepage**
   - Titel: `Relatietherapie Tilburg | Aan huis met IBCT‑begeleiding`
   - Meta: `Wetenschappelijk onderbouwde relatietherapie bij jullie thuis in Tilburg. Eva Mulder biedt betrokken, professionele begeleiding voor koppels die rust, helderheid en verbinding zoeken.`

2. **Relatietherapie Tilburg** (`/relatietherapie-tilburg`)
   - Titel: `Relatietherapie Tilburg aan huis | Reeshof & omgeving`
   - Meta: `Relatietherapie aan huis in Tilburg. Begeleiding in Reeshof, Berkel‑Enschot, Centrum en omliggende wijken. Voor koppels die vastlopen in patronen en weer verbinding willen.`

3. **Relatietherapie aan huis** (`/relatietherapie-aan-huis`)
   - Titel: `Relatietherapie aan huis Tilburg | Rust & veiligheid thuis`
   - Meta: `Relatietherapie aan huis in Tilburg. In jullie vertrouwde omgeving werken aan rust en duurzame verandering. Deskundig, persoonlijk en wetenschappelijk onderbouwd.`

4. **IBCT‑pagina** (`/ibct-relatietherapie`)
   - Titel: `IBCT relatietherapie Tilburg | Evidence-based`
   - Meta: `IBCT relatietherapie in Tilburg. Wetenschappelijk onderbouwde aanpak voor koppels die vastgelopen patronen willen begrijpen, verzachten en duurzaam doorbreken.`

5. **Relatietherapie Reeshof** (`/relatietherapie-reeshof`)
   - Titel: `Relatietherapie Reeshof Tilburg | Aan huis & persoonlijk`
   - Meta: `Wetenschappelijk onderbouwde relatietherapie aan huis in de Reeshof. Voor koppels die vastlopen in terugkerende patronen en weer rust, begrip en verbinding willen.`

6. **Relatietherapie Berkel‑Enschot** (`/relatietherapie-berkel-enschot`)
   - Titel: `Relatietherapie Berkel‑Enschot Tilburg | Aan huis & vertrouwd`
   - Meta: `Relatietherapie aan huis in Berkel‑Enschot. Professionele, wetenschappelijk onderbouwde begeleiding voor koppels die patronen willen doorbreken en meer rust en nabijheid zoeken.`

7. **Blogoverzicht** (`/blog`)
   - Titel: `Relatietherapie blog | Inzichten over ruzie, jaloezie & verbinding`
   - Meta: `Wetenschappelijk onderbouwde artikelen van Eva Mulder over ruzie, jaloezie, communicatie en verbinding. Professionele inzichten voor koppels die willen groeien. Tilburg.`

8. **Voor jonge ouders** (`/relatietherapie-jonge-ouders`)
   - Titel: `Relatietherapie jonge ouders Tilburg | Stress, baby & slaaptekort`
   - Meta: `Relatietherapie aan huis voor jonge ouders in Tilburg. Ik kom bij jullie thuis: vertrouwd, rustig en op jullie eigen plek. Relatiepraktijk De Nieuwe Weelde.`

Belangrijk: voor de landingspagina's en het blogoverzicht wordt `title: { absolute: ... }` gebruikt zodat de Next.js title-template (`%s | Relatiepraktijk de Nieuwe Weelde`) **niet** wordt toegevoegd — de titels zijn exact zoals hierboven. Verander dit gedrag niet.
