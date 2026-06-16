# État des lieux — système CV / Portfolio (point de reprise)

> Date : 2026-06-15
> Branche : `feature/cv-generation` (poussée sur origin, pas mergée dans main)
> But de ce doc : carte unique des plans, où on en est, ce qui reste. À ouvrir
> en tête d'une nouvelle session pour reprendre le chantier système.

---

## 0. Les deux horizons (à ne jamais mélanger)

| Horizon | Quoi | Fichier maître | État |
|---|---|---|---|
| **Court terme** | Candidater dès aujourd'hui : CV prêt, lettre DAMAC, hero portfolio | `2026-06-08-cv-portfolio-shortterm-plan.md` | Partiel |
| **Système (long terme)** | Hub `ProfileData` : 1 MD par expérience génère CV / LinkedIn / Malt / case studies via skills + renderer React | `2026-05-28-profile-data-and-cv-generation-design.md` | Fondations posées, code non démarré |

Règle directrice (du plan court terme) : **ne pas bloquer les candidatures derrière
le refacto système**. On livre à la main aujourd'hui, on enrichit les
`content/missions/*.md` au passage pour ne rien casser du futur système.

Différence court vs long terme, en une phrase : le **court terme** sort des
livrables business faits main (CV, lettre) ; le **long terme** automatise leur
génération depuis une source unique. Le CV HTML actuel est la cible de validation
(« acceptance target ») que le renderer React devra reproduire.

---

## 1. Inventaire des plans / docs

| Fichier | Rôle | Statut |
|---|---|---|
| `docs/superpowers/specs/2026-05-28-profile-data-and-cv-generation-design.md` | **Design système** (ProfileData, architecture, phases A→C) | Réf. long terme |
| `docs/superpowers/specs/2026-06-08-cv-portfolio-shortterm-plan.md` | **Plan court terme** (CV, lettre, hero, prep data Phase 0) | En cours |
| `docs/superpowers/specs/2026-06-08-cv-ats-parsing-plan.md` | **ATS** : fix PDF Type 3 + génération .docx + cleanup | Part 2+3 faites |
| `docs/research/cv-market/context-handoff.md` | Handoff stratégie (Gargash/DAMAC) + décisions CV v3 | Réf. |
| `docs/research/cv-market/ats-2026.md` | Règles ATS (une colonne, token matching, vocab banni) | Réf. |
| `docs/research/cv-market/senior-pd-pm-playbook.md` | Playbook bullets/structure CV senior | Réf. |
| `docs/research/cv-market/dubai-real-estate-freelance.md` | Positionnement Gulf / DAMAC | Réf. |

---

## 2. Où on en est, phase par phase

### Système (spec 2026-05-28)
- **Phase A (contenu + style)** : en place pour l'essentiel (style guide, recherche).
- **Phase A-bis (CV HTML 1 page A4)** : ✅ **FAIT** = `docs/cv/ui/cv-template.html`
  (+ variants `cv-dubai-immo.html`, `cv-classique-immo.html`). C'est la source de
  vérité du wording. C'est l'artefact de validation pour la Phase B.
- **Phase B (renderer React depuis `ProfileData`)** : ❌ non démarrée
  (pas de `content/cv/types.ts`, pas de loader missions, pas de route `/cv/print/[preset]`).
- **Phase C (LinkedIn / Malt / hero portfolio)** : ❌ non démarrée.

### Court terme (plan 2026-06-08)
- **Phase 0 — sync YAML sur le CV** : ⚠️ **PARTIEL** (détail §3 ci-dessous).
- **Phase 1 — lettre DAMAC** : ✅ faite (`applications/damac/cover-letter-v2-simple.md`
  + `ui/cover-letter-damac.html`).
- **Phase 2 — hero portfolio** : ❌ non faite.
- **Phase 3 — case studies + normalisation slugs + loader** : ❌ non faite.

### ATS (plan 2026-06-08)
- **Part 1 — fix bug PDF Type 3** : ❌ backlog (le PDF 2 colonnes reste lisible à
  l'œil ; le bug ne casse que copier-coller / parsing machine).
- **Part 2 — CV ATS .docx une colonne** : ✅ **FAIT** cette session
  (`docs/cv/cv-jonathan-schummers-ats.docx` + générateur `build-ats-docx.mjs`).
- **Part 3 — cleanup** : ✅ fait (archives `ui/_archive/`, PDF gitignorés).

---

## 3. Le point qui prête à confusion : bullets CV vs YAML missions

Deux systèmes de contenu coexistent et **ne se parlent pas encore** :

- `content/missions/*.md` = base de connaissances **visée** (doit nourrir CV /
  LinkedIn / Malt). **Lue par personne aujourd'hui** (aucun loader). Le CV se
  génère depuis le HTML, pas depuis ces YAML.
- `content/case-studies/*.md` = portfolio long-form existant (lu par `lib/case-studies.ts`).

État des bullets dans les YAML missions (≠ forcément le wording final du CV) :

| Mission | Bullets YAML | Aligné CV ? |
|---|:--:|---|
| valoris | 4 | marqués **PROVISOIRES** |
| totalenergies | 4 | oui |
| avanade | 4 | génériques, **pas** ceux du CV |
| bforbank | 5 | enfant d'Avanade, à condenser pour le CV |
| spie-batignolles | 0 | **vide** |

Donc : non, les bullets du CV ne sont **pas** tous reportés proprement dans les
YAML. C'est exactement l'objet de la **Phase 0** (rester à faire), bloquée sur Q1-Q4.

Le « contact portfolio » : il s'agit du bas de page / CTA du site
(`components/cta-final.tsx`, `footer.tsx`). **Jamais touché** sur cette branche.
Relève de la Phase 2 (hero) / Phase C (refonte home). Basse priorité.

---

## 4. Décisions en attente (Q1-Q4, plan court terme §6)

| # | Question | Options |
|---|---|---|
| Q1 | Où vivent les bullets « enfants » (BforBank, Spie) ? | (a) champ `cvBullets` sur le parent · (b) flag `cvFeatured` sur l'enfant, parent agrège · (c) verbatim parent maintenant, vrai hub plus tard |
| Q2 | TotalEnergies : salarié direct ou mission consulting (ESN) ? | employee / consulting-mission |
| Q3 | Profile haut du CV : texte actuel ou draft `notes-experiences.md §0.4` ? | CV actuel / notes |
| Q4 | DAMAC : poste précis ou spontanée ? langue ? longueur ? | — |

---

## 5. Reste à faire, priorisé (vision idéale)

1. **Trancher Q1-Q4** (débloque la Phase 0).
2. **Phase 0** : figer le schéma missions (ajouter `summary`, standardiser `skills`),
   reporter les bullets CV validés dans valoris (sortir du provisoire), spie (vide),
   avanade (génériques → CV).
3. **Phase B** : `content/cv/types.ts` + loader gray-matter + route `/cv/print/[preset]`
   + `<CVSection/>` home + `scripts/generate-cv-pdfs.mjs`. Cible = reproduire le HTML actuel.
4. **Phase 2 / C** : hero portfolio (`app/page.tsx`), puis LinkedIn / Malt alignés.
5. **Normalisation** : slugs (`spie-batignolles` vs `spie-bat`, Total → nod + smartintegrity),
   modèle hub `content/experiences/<slug>/{data.md,notes/,case-study.md}`.
6. **Backlog ATS Part 1** : fix PDF Type 3 (font-render-hinting / self-host TTF / WeasyPrint).

---

## 6. Point d'entrée nouvelle session (système)

> « On reprend le projet Profil/CV. État des lieux : `docs/superpowers/specs/2026-06-15-etat-des-lieux.md`.
> Le CV HTML (`docs/cv/ui/cv-template.html`) est figé et sert de cible. On veut
> avancer la Phase 0 (sync YAML) puis la Phase B (renderer React depuis ProfileData),
> spec `2026-05-28-...`. Commence par me faire trancher Q1-Q4. »

Branche : `feature/cv-generation`.

> Note : la session en cours (15/06) est dédiée **uniquement au CV Word ATS**
> (`docs/cv/build-ats-docx.mjs` → `cv-jonathan-schummers-ats.docx`) : tenir sur
> 1 page, retirer Real Estate, améliorer spacing/couleurs. Ne pas mélanger.
