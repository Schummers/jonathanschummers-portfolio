# ROADMAP — Agency (Portfolio · CV · Prospection · Meeting prep)

> **Doc maître de reprise. Ouvre ça en premier.** Il contient tout le contexte pour
> repartir quand tu reviens dans plusieurs jours: où tu en es, quoi faire, comment.
> Tiens les statuts à jour (✅ fait · 🔄 en cours · ⬜ à faire) au fur et à mesure.
>
> Date: 2026-06-16 · Branche portfolio: `feature/cv-generation` (poussée, pas mergée).
> Remplace `etat-des-lieux.md` (archivé) et `2026-06-08-cv-portfolio-shortterm-plan.md` (archivé).

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
| 1 | **Skills update** (gate) | ⬜ | `writing-style` ← CV générés ; `case-study` ← Spie Bat. Détail §Skills update. |
| 2 | **Case studies Nod + Smart Integrity** | ⬜ | **Priorité.** Refaire via workflow `case-study`. Dans la structure actuelle (`content/case-studies/*.md`). |
| 3 | **Migration modèle contenu (B) + séparation dossiers (A) + grand nettoyage doc** | ⬜ | Voir §Réorganisation. Rework jugé minime, donc après le contenu. |
| 4 | **Bouton CV** (lien PDF téléchargeable) | ⬜ | PDF classique généraliste dans `/public`. Pas d'affichage HTML (voir §Challenge). **Prérequis:** reporter les ~11 edits de wording de `docs/cv/TODO-sync-2col-cv.md` dans les CV 2 colonnes + regen PDF (`node docs/cv/export-pdf.mjs <variant>`), pour que le PDF public soit à jour. |
| 5 | **Reste** | ⬜ | Section services (portfolio + LinkedIn + Malt), case study Valoris (quand la donnée existe), Phase B renderer React. **Phase B:** cible d'acceptation = reproduire le CV HTML actuel (`docs/cv/ui/cv-template.html`) depuis la data ; réutiliser `docs/cv/export-pdf.mjs` (Puppeteer) comme impl de référence. Scripts de génération existants: `export-pdf.mjs`, `build-ats-docx.mjs`. |
| B | **Backlog** | ⬜ | ATS Part 1 (bug PDF Type 3, n'affecte que le parsing machine). |

Priorité explicite: **refaire le contenu vite**. La migration du modèle et la séparation
des dossiers viennent après, le rework est minime.

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

### Décision encore ouverte (à trancher pendant la migration / Phase 0)

**Q1 — où vivent les bullets CV qui sont des achievements des enfants** (BforBank, Spie sont
des projets sous Avanade, mais leurs bullets apparaissent sous le bloc Avanade du CV) ?
- (a) champ `cvBullets` sur le parent (`avanade`) — rapide.
- (b) flag `cvFeatured` sur les enfants (`bforbank`, `spie-bat`), le parent agrège — vrai modèle hub.
- (c) verbatim sur le parent maintenant, vrai modèle plus tard.

### Phase 0 — détail (à ne pas perdre, repris du shortterm-plan archivé)

But: figer le schéma des `experiences` et reporter le wording validé du CV v7. Ne change pas
le CV d'aujourd'hui (le PDF se génère du HTML, pas encore des YAML).

État actuel des champs par mission (vérifié dans le code) :

| Champ | avanade | bforbank | spie | totalenergies | valoris |
|---|:--:|:--:|:--:|:--:|:--:|
| `summary` (intro CV 1re pers.) | ❌ | ❌ | ❌ | ❌ | ❌ (manquant partout) |
| `skills` (ligne CV) | ❌ | ❌ | ✅ | ✅ | ✅ |
| `bullets` alignés CV v7 | ❌ génériques | ❌ | ❌ vides (0) | ✅ (4) | ✅ provisoires (4) |

Wording validé à reporter (CV v7) :
- **Summaries** (1re personne):
  - Valoris: "I lead product discovery and design on Valoris, improving the value proposition and market fit of a property-management SaaS."
  - Total: "I led research, design and build on 4 industrial SaaS, shipping MVPs fast and iterating through continuous discovery and usage tracking."
  - Avanade: "I delivered on the full design scope, from user research to ideation and UI design, for BforBank, Sodexo, Chanel and Schneider Electric."
- **Skills lines**: Valoris = Backlog management · Tracking plan · Data pipelines · Custom AI skills ·
  Total = Story mapping · Adoption tracking · Data mapping · Design system · Avanade = (aucune au CV).
- Corriger l'exemple de dates du `_template.md` (source du bug Total).

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

## Skills update (point 7) — workstream séparé (autre discussion)

Prérequis qualité des case studies. Met à jour les skills à partir du travail déjà fait (CV finaux, case study Spie Bat).

**Skill `writing-style`:**
1. Bloc **"Gold examples"** (après "Core rules"), étiqueté "reference, not template": tagline
   "Senior Product Designer with PM skills (6y+)", paragraphe profile ("Six years building
   early-stage products taught me that design isn't usability..."), 3-4 bullets témoins couvrant
   les 3 formes (pivot avec deux-points, résultat multi-métrique, capacité AI custom).
2. Affiner la **"Bullet formula"** avec les patterns réels: deux-points pour introduire le
   "comment"; gras sur le chiffre/levier pas le verbe; outils nommés en clair (Claude Code,
   PostHog, Meta-ads); métriques juxtaposées en fin.
3. Point **"Capture"** dans le workflow: quand une formulation est figée, proposer de l'ajouter
   au bloc Gold examples (ne plus reperdre le travail).

**Skill `case-study`:**
4. Remplacer le Good/Bad générique par le **set Spie Bat complet** (6 titres finaux comme preuve
   "lis les titres = toute l'histoire"); nommer le pattern: verbe passé + chiffre + finalité
   ("to ...") + métrique optionnelle en fin.
5. Point **"Capture"** à l'étape Verify: après validation, proposer de remonter les titres finaux
   dans le bloc d'exemples du skill.
6. Vérifier le **Title H1** (mineur): l'exemple Spie Bat (~ligne 100) colle au `project.title`
   actuel de `lib/data.ts`. Pas de changement si identique.

(Étapes 4/5/6 encore en réflexion.)

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

**Archivés / à archiver:**
- `2026-06-15-etat-des-lieux.md` — remplacé par cette ROADMAP.
- `2026-06-08-cv-portfolio-shortterm-plan.md` — absorbé par cette ROADMAP.
- `docs/cv/data/notes-experiences.md` — obsolète.
- Gargash (research + notes) — jeté (on ne postule pas).
