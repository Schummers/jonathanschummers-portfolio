# Plan — Parsing ATS du CV (à reprendre)

> Statut : plan validé, **pas encore exécuté**. Créé le 2026-06-08.
> Objectif : rendre le CV lisible par les ATS, sur deux fronts —
> (1) réparer le PDF 2 colonnes existant, (2) produire une version ATS en .docx.

## Contexte / diagnostic (déjà fait)

- **Bug** : le PDF exporté via Chromium (Chrome CLI *et* Puppeteer) embarque les
  polices en **Type 3** — des procédures de dessin de glyphes sans table
  caractère→glyphe fiable. Résultat : texte fragmenté pour les ATS et Preview.app
  (« Luxem b ourg », « on b oarding »).
- Confirmé par `pdffonts cv.pdf` → 12 sous-ensembles, tous `Type 3 Custom`.
- **`pdftotext` MASQUE le bug** (heuristiques de reconstruction) → ne jamais s'en
  servir pour valider. Test fiable = **copier-coller réel dans TextEdit**.
- **Ce n'est PAS** le bug Fontations M131→M142 : on tourne sur Chrome 148
  (système) / 149 (Puppeteer), bien au-delà du fix d'octobre 2025.
- La **source HTML est saine** ; le problème est uniquement le générateur PDF.
- Export Figma → encore pire (glyphes positionnés un par un). À écarter.

Sources clés : puppeteer#7401 (OTF→Type 3, TTF OK), puppeteer#13442,
browserless.io (flag font-render-hinting), idrsolutions (Type 3 non cherchable),
guides ATS Jobscan / Resumly (docx = format #1, test copier-coller).

## Sources de contenu (vérité)

- **`docs/cv/ui/cv-v7-design-md.html`** = source de vérité (wording relu, figé).
- **`content/missions/*.md`** = détail par mission (valoris, totalenergies,
  avanade, bforbank, spie-batignolles).
- **`docs/cv/data/notes-experiences.md`** = brouillon ayant produit le HTML.
  Redondant / potentiellement périmé → **ne PAS utiliser** comme source.

---

## Partie 1 — Réparer le parsing du PDF 2 colonnes

1. **Baseline mesurée** : `pdffonts` (constater les `Type 3`) + copier-coller
   réel dans TextEdit.
2. **Test A/B** — critère objectif : `pdffonts` doit afficher `TrueType`/`Type0`
   (plus de `Type 3`) ET copier-coller propre.
   - **A** — flag `--font-render-hinting=none` (± `--disable-gpu`) à l'export
   - **B** — self-host Manrope + Space Grotesk en **.ttf statiques** via
     `@font-face` local (attaque directe la cause OTF→Type 3)
   - **C** — A + B combinés
   - **Fallback** — WeasyPrint (moteur d'écriture PDF différent, cmap correct,
     pas de JS requis car notre CV est du HTML statique)
3. Garder le design **intact** dans tous les cas.
4. Mettre à jour `export-pdf` + `docs/cv/CLAUDE.md` avec la recette qui marche +
   la bonne méthode de vérif (`pdffonts` + copier-coller, **jamais** `pdftotext`).

## Partie 2 — Générer le CV ATS en .docx

1. **Outil** : skill `anthropic-skills:docx` (python-docx, .docx natif).
   Sortie : `docs/cv/cv-jonathan-schummers-ats.docx`.
2. **Contenu** : CV actuel (HTML = vérité) + `content/missions/*.md` pour le
   détail. **Pas** `notes-experiences.md`.
3. **Règles ATS strictes** :
   - UNE colonne. Zéro tableau, zone de texte, encadré, colonne.
   - Police système : Calibri ou Arial (corps 10–11pt, titres 13–16pt).
   - Titres standards : Professional Summary, Work Experience, Skills,
     Education, Certifications, Languages.
   - Contact en texte brut, sans icônes (email · tel · ville · LinkedIn ·
     Portfolio en URL claires).
   - Antichronologique. Dates « Mon YYYY – Mon YYYY ».
   - Bullets simples, une réalisation chiffrée par puce.
   - Zéro image / logo / photo / barre de compétences / header-footer Word.
   - Skills = liste de mots-clés séparés par virgules (matching ATS).
   - Real Estate Expertise + UX Research Lecturer : sections courtes, mono-colonne.
4. **Vérif obligatoire** : extraction texte du .docx intacte mot à mot ;
   zéro tableau ; une colonne ; chiffres = HTML.

## Partie 3 — Cleaning

| Fichier | Action proposée | Décision à trancher |
|---|---|---|
| `ui/cv-v4-damac.html`, `cv-v6-2variants.html`, `cv-v7-color-tests.html` | itérations remplacées par v7 | archiver ou supprimer ? |
| `ui/homepage-label-accent.html` | pas un CV (expé homepage), mal rangé | déplacer ou supprimer ? |
| `data/jonathan-schummers-cv.pdf` (1,1 Mo), `data/linkedin-profile.pdf` | inputs bruts de départ | archiver hors repo ? |
| `data/notes-experiences.md` | brouillon ayant produit le HTML | garder comme historique ou supprimer ? |
| `package.json` (root) | `puppeteer` ajouté cette session | garder seulement si Partie 1 retient Chromium |
| Changements session (`export-pdf.mjs`, `export-pdf.sh`, `CLAUDE.md`, HTML, PDF) | à committer | **après** que la Partie 1 fige l'approche |

> `export-pdf.mjs` (Puppeteer) créé cette session produit **toujours** le bug
> Type 3 → sera probablement remplacé selon le résultat de la Partie 1.
> Ne pas committer en l'état.

---

## 3 décisions à trancher au démarrage

1. **Moteur d'export** retenu : Puppeteer + fix (A/B/C) **vs** WeasyPrint.
2. **Sort de `notes-experiences.md`** : archive vs suppression.
3. **Vieilles versions `ui/`** : archiver vs supprimer.
