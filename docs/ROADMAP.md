# ROADMAP — Agency (Portfolio · CV · Prospection · Meeting prep)

> **Doc maître de reprise. Ouvre ça en premier.** Il contient tout le contexte pour
> repartir quand tu reviens dans plusieurs jours: où tu en es, quoi faire, comment.
> Tiens les statuts à jour (✅ fait · 🔄 en cours · ⬜ à faire) au fur et à mesure.
>
> Date: 2026-06-16 · Branche portfolio: `feature/cv-generation` (poussée, pas mergée).
> Remplace `etat-des-lieux.md` (archivé). Absorbe `2026-06-08-cv-portfolio-shortterm-plan.md`
> (gardé actif pour l'instant, archivable quand tu veux).

---

## ▶ Prochaine action (maintenant)

1. **Skills update** (workstream séparé, autre discussion) — prérequis dur. Mettre à jour
   `writing-style` (depuis les CV générés) puis `case-study` (depuis Spie Bat). Détail §Skills update.
2. Puis **refaire les case studies Nod + Smart Integrity** avec les skills à jour, via le
   workflow `case-study` complet. Priorité absolue (le portfolio doit être nickel, DAMAC va le regarder).

Tout le reste vient après. Ne pas démarrer la réorg des dossiers avant ça.

---

## Le cap

- **Court/moyen terme:** freelance Product Designer, **2000€/mois brut au 30/06/2026**
  (portfolio + Malt + LinkedIn + prospection + candidatures). Les candidatures (CV, lettres)
  font partie du go-to-market freelance, pas un track séparé.
- **Long terme (système):** hub **ProfileData**, une source unique (1 MD par entité) qui
  génère CV / LinkedIn / Malt / case studies via skills + renderer React. Fondations posées,
  code Phase B non démarré. À ne faire qu'une fois le court terme livré.

---

## Séquence (statuts à jour)

| # | Étape | Statut | Notes |
|---|---|:--:|---|
| 0 | **LinkedIn banner generation** (parallèle, autre session) | 🔄 | À **déplacer dans `cv/`** (hub de génération), pas dans le portfolio. `docs/banners/` aussi. |
| 1 | **Skills update** (gate) | ✅ | `writing-style` ← CV générés ; `case-study` ← Spie Bat. Détail §Skills update. |
| 2 | **Case studies Nod + Smart Integrity** | ⬜ | **Priorité.** Refaire via workflow `case-study`. Dans la structure actuelle (`content/case-studies/*.md`). |
| 3 | **Migration modèle contenu (B) + séparation dossiers (A) + grand nettoyage doc** | ⬜ | Voir §Réorganisation. Rework jugé minime, donc après le contenu. |
| 4 | **Bouton CV** (lien PDF téléchargeable) | ⬜ | PDF classique généraliste dans `/public`. Pas d'affichage HTML (voir §Challenge). **Prérequis:** reporter les ~11 edits de wording de `docs/cv/TODO-sync-2col-cv.md` dans les CV 2 colonnes + regen PDF (`node docs/cv/export-pdf.mjs <variant>`), pour que le PDF public soit à jour. |
| 5 | **Reste** | ⬜ | Section services (portfolio + LinkedIn + Malt), case study Valoris (quand la donnée existe), Phase B renderer React. **Hero/services:** auditer `app/page.tsx` + composants hero, présenter ce qui cloche, décider ensemble ; respecter `DESIGN.md` (tokens, pas de hex brut, 1 brand button max) + `npm run ds:check`. **Phase B:** cible d'acceptation = reproduire le CV HTML actuel (`docs/cv/ui/cv-template.html`) depuis la data ; réutiliser `docs/cv/export-pdf.mjs` (Puppeteer) comme impl de référence. Scripts existants: `export-pdf.mjs`, `build-ats-docx.mjs`. |
| B | **Backlog** | ⬜ | ATS Part 1 (bug PDF Type 3, n'affecte que le parsing machine). |

Priorité explicite: **refaire le contenu vite**. La migration du modèle et la séparation
des dossiers viennent après, le rework est minime.

### Quick fixes portfolio (à caser dans l'urgent, DAMAC regarde le site)

- ⬜ **Lien GitHub cassé (404).** Le portfolio pointe vers `github.com/jonathanschummers`
  (inexistant). Bon profil = `github.com/Schummers`. À corriger dans
  `components/cta-final.tsx:72` et `components/footer.tsx:36`. (Vérifier au passage que
  l'URL voulue est bien le profil, pas le repo.)

---

## Décisions tranchées (ne plus re-débattre)

| Sujet | Décision |
|---|---|
| **Slugs** | UN seul slug canonique partout (ex: `spie-bat`). Aligner experiences ET projects dessus. |
| **TotalEnergies (CV)** | Salarié direct (`employee`). |
| **Texte CV** | Garder le texte du **CV HTML** + celui du **docx 1 colonne** = les 2 bons textes de référence. |
| **notes-experiences.md** | Obsolète → archiver. |
| **DAMAC** | Déjà postulé. Lettre = done, ne plus toucher. |
| **Gargash** | On ne postule pas → jeter (research + notes). |
| **Bouton CV** | Lien vers PDF téléchargeable (classique généraliste). Pas de HTML, pas de Phase B maintenant. |
| **CV sur le site** | Pas d'affichage HTML du CV (redondant + lourd). Juste le bouton download. Voir §Challenge. |
| **Content / Vercel** | Option (a): source-of-truth dans `portfolio/content/`. Les outils CV/prospection lisent via `../portfolio/content/`. |
| **Déplacement repo** | Cible = `~/Documents/Agency/portfolio`. **Pas maintenant** (finir les discussions en cours d'abord). |
| **Git sous-dossiers** | Pas de git pour l'instant (simples dossiers). Peut-être plus tard pour la sauvegarde. |
| **Skills/style globaux** | Rien de global pour l'instant. Le writing-style est scindé (CV/lettres vs prospection). Skills spécifiques par dossier. |
| **Noms de dossiers** | kebab sans espaces (`portfolio`, `cv`, `prospection`, `meeting-prep`). |
| **Modèle contenu** | 3 collections liées (experience / project / post). Validé. |
| **valoris** | `experiences/valoris` (employeur) ET `projects/valoris` (projet). Slug partagé. |
| **boosted** | = "Boosty Geo Scientist", projet de TotalEnergies → `projects/boosty` (slug à confirmer), `experience: totalenergies`. |
| **Contenu non lié** | Posts ET case studies peuvent être transverses à plusieurs entités, ou rattachés à rien. Références optionnelles et possiblement multiples. |
| **Posts liés** | Un post lié à un projet peut apparaître sur la page du projet (section articles liés). |
| **Bullets enfants (Q1)** | **Tranché:** les bullets CV des enfants vivent au niveau **projet (enfant)** ; l'experience agrège les bullets featured de ses projets. Préserver/utiliser le champ `parent` existant. |
| **Vocabulaire "proptech"** | Le retirer comme mot principal partout (portfolio, LinkedIn, Malt, CV). Ancre = "real estate tech", "proptech" en keyword secondaire entre parenthèses. Détail + phrases candidates §Vocabulaire. |
| **Case studies** | Refaire via workflow `case-study` complet. Cible: workflow assez bon pour générer une proposition quasi one-shot depuis les grandes lignes/étapes que tu donnes. |
| **Doc maître** | Tout créer dans le portfolio pour l'instant (séparation pas encore faite). Cette ROADMAP est l'index unique; on passe toujours par elle. |

---

## Architecture cible Agency

> Pas encore séparé physiquement. Le `Agency/` existe déjà avec `CV/` (vide), `Prospection/`,
> `Meeting prep/`. Le déplacement du portfolio se fait plus tard.

```
~/Documents/Agency/
├── CLAUDE.md            → identité agence, cap freelance, règles communes, pointeur ROADMAP
├── ROADMAP.md           → ce doc (migré ici plus tard ; pour l'instant dans portfolio/docs/)
├── portfolio/           → = ~/Documents/jonathan déplacé. Seul repo git/web (Vercel).
│   ├── content/         → SOURCE DE VÉRITÉ contenu (option a). Lue par les autres outils via ../portfolio/content/
│   └── .claude/skills/  → skills spécifiques portfolio (ds-audit, case-study...)
├── cv/                  → génération CV + lettres + banners (HTML, docx, PDF). Reçoit docs/cv/* + docs/banners/.
│   └── .claude/skills/  → writing-style "CV/lettres" (spécifique)
├── prospection/         → outreach clients (existe). skills/ prospection spécifiques.
└── meeting-prep/        → prep entretiens / rdv clients (existe).
```

Principes: pas de skills/style globaux pour l'instant; content reste dans `portfolio/content/`;
pas de git sur les sous-dossiers; déplacement physique plus tard.

**Hors périmètre actuel (existant, à ne pas casser):** `Agency/Prospection/` contient déjà
matière outreach (CV pdf, ranking mails, guide LinkedIn, Mabrik/, Livrables/, skills/,
design-system.md, Polices/) et `Agency/Meeting prep/` la prep rdv (call prep Qileo/Qalimo,
research). On les range/renomme (kebab) au moment de la séparation, sans y toucher avant.

### Le point dur (content + Vercel)

Le site lit `content/` à la racine de son repo au build (`lib/case-studies.ts` →
`process.cwd()/content/case-studies`). Vercel ne déploie QUE ce repo. **Décidé: option (a)** —
content source-of-truth dans `portfolio/content/`, les autres outils tournent en local et le
lisent via `../portfolio/content/`. Zéro risque de casser le site.

---

## Modèle de contenu — 3 collections liées

Trois niveaux distincts qui se référencent, pour ne pas tout confondre:

```
content/
├── experiences/<exp-slug>.md     → bloc CV: dates, rôle, mode, summary, skills, bullets, projects:[...]
│                                    (= "missions" actuelles, nettoyées)   ex: totalenergies, avanade, valoris
├── projects/<proj-slug>/
│   ├── case-study.md              → long-form portfolio (lu par le site, route /work/<proj-slug>)
│   │                                frontmatter: experience?: <slug>, heroImage, tags, order, published
│   └── notes/                     → matière brute (CR, transcripts, brain dumps)
│                                    (= "case-studies" actuelles)   ex: nod, smartintegrity, bforbank, spie-bat, boosty
└── posts/<post-slug>.md           → LinkedIn posts / articles
                                     frontmatter: project?: <slug> · experience?: <slug> (optionnels, possiblement multiples → indépendant si vide)
```

Règles:
- **Un slug unique par entité** dans sa collection. Plus de doublon `spie-batignolles`/`spie-bat`:
  l'expérience est `avanade`, le projet est `spie-bat`.
- **Relations par référence en frontmatter**, **optionnelles et possiblement multiples**:
  un contenu peut être transverse à plusieurs entités, ou rattaché à rien.
- Plusieurs articles pour une expérience → N posts avec `experience:`. Plusieurs pour un projet
  → la case-study est le long-form canonique, les autres = posts avec `project:`.

Hiérarchie à mapper en Phase 0:
- `totalenergies` → projets `nod`, `smartintegrity`, `boosty`
- `avanade` → projets `bforbank`, `spie-bat`
- `valoris` → projet `valoris` (case study plus tard)

`lib/case-studies.ts` change juste son `CASE_STUDIES_DIR`. La migration peut attendre (rework minime).

### Q1 — bullets enfants : TRANCHÉ

Les bullets CV qui sont des achievements des enfants (BforBank, Spie sous Avanade ; Nod,
Smart Integrity sous TotalEnergies) **vivent au niveau du projet (l'enfant)**, pas du parent.
L'expérience (bloc CV) **agrège** les bullets "featured" de ses projets. Concrètement: étape
de migration = ajouter sur chaque `project` un champ pour ses bullets CV (+ un flag type
`cvFeatured`), et faire remonter par l'`experience`. Le champ `parent` existe déjà sur les
case-studies actuelles mais n'est pas exploité : **le préserver et l'utiliser** dans la migration.

### Phase 0 — détail (à ne pas perdre, repris du shortterm-plan)

But: figer le schéma des `experiences` et reporter le wording validé du CV v7. Ne change pas
le CV d'aujourd'hui (le PDF se génère du HTML, pas encore des YAML). Le **CV v7 HTML est la
source de référence** pour tout le wording (summaries, bullets, skills).

État actuel des champs par mission (vérifié dans le code) :

| Champ | avanade | bforbank | spie | totalenergies | valoris |
|---|:--:|:--:|:--:|:--:|:--:|
| `summary` (intro CV 1re pers.) | ❌ | ❌ | ❌ | ❌ | ❌ (manquant partout) |
| `skills` (ligne CV) | ❌ | ❌ | ✅ | ✅ | ✅ |
| `bullets` alignés CV v7 | ❌ génériques (→ Q1) | ❌ | ❌ vides (0) | ✅ (4) | ✅ provisoires (4) |

Checklist schéma :
- Ajouter `summary` (intro CV, **1re personne**, distincte de `tagline` qui est 3e personne)
  au `_template.md` + aux 5 experiences.
- Standardiser `skills` partout (vide si pas de ligne skills au CV).
- Corriger l'exemple de dates du `_template.md` (`2021-12 / 2024-11` = source du bug Total).
- Précédent utile: `spie-batignolles.md` a **déjà fusionné** des champs case-study dans le
  frontmatter mission → la voie unifiée était amorcée, s'en servir de modèle.

Wording validé à reporter (CV v7) :
- **Summaries** (1re personne):
  - Valoris: "I lead product discovery and design on Valoris, improving the value proposition and market fit of a property-management SaaS."
  - Total: "I led research, design and build on 4 industrial SaaS, shipping MVPs fast and iterating through continuous discovery and usage tracking."
  - Avanade: "I delivered on the full design scope, from user research to ideation and UI design, for BforBank, Sodexo, Chanel and Schneider Electric."
- **Skills lines**: Valoris = Backlog management · Tracking plan · Data pipelines · Custom AI skills ·
  Total = Story mapping · Adoption tracking · Data mapping · Design system · Avanade = (aucune au CV).

Vérif cohérence: Avanade 2,5 ans + Total 3 ans + Valoris ~1 an = ~6,5 ans → titre "(6y+)" tient.

### Mapping des slugs (alignement migration)

| Expérience (mission actuelle) | Projets (case-studies actuelles) |
|---|---|
| `avanade` | `bforbank`, `spie-bat` (mission dit `spie-batignolles` → aligner sur `spie-bat`) |
| `totalenergies` | `nod`, `smartintegrity`, `boosty` (case-study `boosted`, non publiée) |
| `valoris` | `valoris` (case study plus tard) |

---

## Réorganisation — deux chantiers distincts

- **(A) Séparation physique des dossiers** (workspace): `jonathan` → `Agency/portfolio`,
  `docs/cv` → `cv/`, etc. Ne touche pas le code du site.
- **(B) Migration du modèle de contenu** (dans le repo): `missions` → `experiences`,
  `case-studies` → `projects/<slug>/`, ajout `posts`, alignement slugs + Phase 0
  (summary/skills/bullets). Touche `lib/case-studies.ts`.

Indépendants. Les deux se font à l'étape 3, après les case studies.

### Routing doc (grand nettoyage)

Principe: **un doc vit avec le livrable qu'il sert.**

| Doc actuel | Destination |
|---|---|
| `docs/cv/*`, `docs/banners/`, `docs/research/cv-market/*` (dont positionnement) | **`cv/`** |
| **Specs système** (ProfileData design, cv-ats-parsing, shortterm, etat-des-lieux) | **`cv/`** |
| `docs/research/portfolio/*`, `docs/audits/*`, `docs/workflows/*` | **reste `portfolio/docs/`** |
| Specs design-system / homepage / cards / css-mockups | **reste `portfolio/docs/`** |
| `ROADMAP.md` (ce doc) | **`Agency/`** (dans `portfolio/docs/` pour l'instant) |

**Cross-références:** quand un doc utile vit ailleurs (ex: positionnement dans `cv/` mais sert
la section services du portfolio), mettre un **pointeur/lien** dans le portfolio au moment de la
tâche. Pas de copie physique.

---

## Skills update (point 7) — workstream séparé ✅ fait

Prérequis qualité des case studies. Mis à jour à partir du travail déjà fait (CV finaux, case study Spie Bat). Volontairement minimal: on a écarté les ajouts trop prescriptifs (gold examples, gras-sur-le-chiffre, capture steps) pour ne pas brider les skills.

**Skill `writing-style`** (`.claude/skills/writing-style/SKILL.md`):
- "Bullet formula": ajout de deux lignes en "on peut", pas en "il faut": nommer les outils en clair (Claude Code, PostHog, Meta-ads) plutôt que "tooling"; un deux-points peut introduire le mécanisme concret derrière l'action ("the how").

**Skill `case-study`** (`.claude/skills/case-study/SKILL.md`):
- Ajout d'un bloc "Example step titles (inspiration, not a template)" sous le Re-read test: les 6 titres finaux de Spie Bat, à titre d'inspiration.
- Title H1: laissé tel quel (fonctionne bien). Raccourcissement éventuel plus tard.

**À faire plus tard (pas maintenant):** refaire la case study Spie Bat dans le **format complet** (comme Total / Nod / BforBank) au lieu de sa petite ligne actuelle. À placer après Nod + Smart Integrity (#2).

---

## Section Services / Positioning (portfolio + LinkedIn + Malt) — étape 5

Copy de positionnement unique → 3 canaux (section services portfolio, LinkedIn, Malt). C'est la
Phase C du système (multi-canal), utile dès le court terme pour prospecter.

**À créer:** `content/.../services-positioning.md` (emplacement selon archi content), 3 variantes
de longueur/ton selon le canal.

**Backbone stratégique (réf obligatoire):**
`docs/research/cv-market/research-discovery-positionnement-2026.md` (ira dans `cv/`; mettre un
pointeur depuis le portfolio au moment de la tâche). Positionnement à incarner: **discovery
stratégique** (réduire le risque produit vite, IA en levier, porter value + viability risk), pas
"UX researcher" pur ni exécutant UI. Services Discovery/Management/Design reflètent les 4 risks de
Cagan, formule "méthode → décision → métrique".

**Reformulation obligatoire:** "deeply passionate" = mot **banni** (writing-style / ATS). Passer
toute la copy au skill `writing-style`.

**Notes source (verbatim, à ne pas perdre):**

```
--- Brouillon A (portfolio / pitch) ---
I help proptech & fintech teams de-risk what they build, then design it end-to-end.
I believe the fastest way to learn is to ship, track and iterate. Now I use AI to shorten that loop even more.
→ Product Discovery — Running market & user research to help teams understand and prioritise the problems worth solving.
→ Product Management — Turn the insights from research into a shippable increment to the live product
→ Product Design — Turn the insights into design interfaces, with design-system compliance.
6 years designing complex & data-heavy SaaS:
· TotalEnergies: Lead designer & Proxy PO, 4 products from 0→1 (2 ML-powered)
· BforBank: Onboarding flow for the new mobile banking app (#1 Google UX Benchmark 2023)
· Spie Batignolles: Site-crew construction app unifying 3 legacy tools
My edge: deeply passionate about real estate and finance. I run a family rental portfolio
(management, renovation, accounting) and I'm a licensed real estate professional in Luxembourg.
Open for freelance.
→ Book a call: calendly.com/jonathan-schummers
→ Understand how I work: jonathanschummers.com

--- Brouillon B (variante 3 services) ---
→ Product Discovery — Running market & user research to map and prioritise the opportunities that move a desired outcome.
→ Product Management — Turning opportunities into prioritised solutions and experiments, then steering them into a live increment.
→ Product Design — Turning the chosen solutions into shippable interfaces, with design-system compliance.

--- Bloc 3 services (FR, type Malt) ---
User Research — Setting up qualitative and quantitative research protocols to ensure that the products and features address real user needs.
Digital Project Management — Structuring the product vision, prioritizing features and coordinating business, user and technical requirements.
Design — Translating those needs into concrete solutions within an interface and collaborating with engineering teams on implementation.
```

---

## Vocabulaire: remplacer "proptech" (portfolio, LinkedIn, Malt, CV)

Tâche transverse de copy: retirer "proptech" comme mot principal partout (portfolio,
LinkedIn, Malt, CV, lettres). À faire quand on touche chaque surface (sweep rapide), et
intégrer d'office dans la nouvelle copy (section services, profils).

Recherche détaillée: [`docs/research/cv-market/Proptech word.md`](research/cv-market/Proptech%20word.md).

**Pourquoi:** mot d'initié, pas grand public. Les VC / accélérateurs / recruteurs spécialisés
le cherchent, mais les entreprises elles-mêmes disent "real estate technology company" /
"real estate platform". Les offres "fintech" surpassent "proptech" de 15 à 30× (marché fintech
~11× plus grand). "proptech" = catégorie VC légitime, pas un terme mainstream.

**Label retenu:** "real estate tech" comme ancre principale, "proptech" comme keyword
secondaire entre parenthèses → **"fintech & real estate tech (proptech)"**. Compris par tous,
capte les recherches recruiter/ATS via "proptech", n'aliène pas les hiring managers non-spécialistes.

**Règle d'adaptation par audience:**

| Audience | Lead avec |
|---|---|
| VC / accélérateur EU (Pi Labs, Concrete VC) | "proptech" |
| Startup US grand public (Zillow, Compass) | "real estate technology" |
| Hiring manager non-spécialiste | "real estate tech" |
| Job post qui utilise "proptech" 3× | miroir exact |

**Phrases candidates (source, à passer au skill `writing-style` — remplacer les tirets cadratins, bannis):**
1. "Senior Product Designer — 0→1 SaaS in fintech and real estate tech (proptech)."
2. "I help fintech and real estate tech teams turn complex, regulated workflows into products people actually use — from bank onboarding to AI tools for landlords."
3. "Product designer at the intersection of fintech and real estate: 0→1 SaaS in finance, energy & industry + licensed real-estate background + founder of an AI assistant for landlords."
4. "0→1 SaaS designer in regulated industries. Licensed real-estate background + building an AI assistant for landlords — I know the property domain from the inside."
5. "Senior Product Designer — fintech & real estate tech. Six years shipping complex SaaS; currently applying that to proptech via my own AI-for-landlords venture."

Note: les brouillons de la §Section Services utilisent encore "proptech & fintech" → à corriger en appliquant cette règle.

## Challenge: pas de CV en HTML sur le site

Tu voulais (1) bouton CV → PDF, et (2) afficher le CV avant le footer. **Le (2) est écarté:**
- Redondance: le portfolio EST déjà ton CV en version longue (case studies + about + hero).
- Artefact print ≠ web: le CV est calé pour A4/ATS, le porter en responsive = re-layout, rend serré.
- Coût: un rendu HTML propre = quasi la Phase B. Pas rentable maintenant.

Retenu: **bouton "Download CV (PDF)"** (classique généraliste), une seule source. Optionnel léger:
une mini-timeline Experience (teaser, pas le CV complet). Génération HTML→PDF reste dans `cv/`.

---

## Références & archivage

**Specs/docs de référence encore valides** (dans `docs/`, iront dans `cv/` ou restent portfolio
selon §Routing):
- `docs/superpowers/specs/2026-05-28-profile-data-and-cv-generation-design.md` — design système (long terme).
- `docs/research/cv-market/` — ats-2026, senior-pd-pm-playbook, dubai-real-estate, context-handoff, research-discovery-positionnement-2026.
- `docs/research/portfolio/` — best-practices, etc. · `docs/audits/` — baseline design drift.
- `docs/cv/DESIGN-CV.md`, `docs/cv/CLAUDE.md` — canon + export CV.
- `docs/cv/TODO-sync-2col-cv.md` — wording à reporter dans les CV 2 colonnes (si pas déjà fait).

**Déjà archivé:**
- `docs/archive/2026-06-15-etat-des-lieux.md` — remplacé par cette ROADMAP.

**Pleinement absorbé dans cette ROADMAP, archivable quand tu veux** (gardé actif pour l'instant):
- `docs/superpowers/specs/2026-06-08-cv-portfolio-shortterm-plan.md` — tout son contenu utile
  (Phase 0, wording validé, schéma, slugs, Q1) est désormais dans la ROADMAP.

**À archiver / nettoyer (étape 3):**
- `docs/cv/data/notes-experiences.md` — obsolète.
- vieux HTML CV (`cv-v4`, `cv-v6-2variants`, `cv-v7-color-tests`) — déjà dans `docs/cv/ui/_archive/`.
- `docs/cv/ui/_preview-server.cjs` — jetable (preview dev).
- Gargash (research + notes) — jeté (on ne postule pas).
