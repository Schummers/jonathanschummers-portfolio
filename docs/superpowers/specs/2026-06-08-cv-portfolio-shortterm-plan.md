# Plan court terme — CV, lettre DAMAC, hero portfolio + prep système

> Date : 2026-06-08
> Auteur : session Claude Code + Jonathan
> Statut : plan validé pour exécution Phase 0 → en attente réponses Q1-Q4
> Objectif business : **pouvoir candidater dès aujourd'hui** (goal Q2 2026 freelance).

---

## 0. Principe directeur — deux horizons à ne pas mélanger

| Horizon | Quoi | Quand |
|---|---|---|
| **Court terme (prioritaire)** | CV prêt · lettre DAMAC · hero portfolio · léger match case studies Total | Aujourd'hui |
| **Système futur** | Hub MD par expérience → génère CV / LinkedIn / Malt / case studies via skills | Ce soir / après (spec dédié) |

**Règle absolue : ne pas bloquer les candidatures derrière le refactor système.**
Pendant le court terme, on ne casse rien qui servira au système futur (les `content/missions/*.md` restent, on les enrichit au passage).

---

## 1. État réel constaté (le « à l'envers »)

### 1.1 Deux systèmes de contenu en parallèle qui ne se parlent pas

| | `content/missions/*.md` (nouveau) | `content/case-studies/*.md` (existant) |
|---|---|---|
| Rôle | Source de vérité visée (CV, LinkedIn, Malt) | Long-form portfolio `/work/<slug>` |
| Lu par | ❌ personne (aucun loader) | ✅ `lib/case-studies.ts` (gray-matter) |
| Contenu | atomes YAML (dates, bullets, métriques) | prose Markdown (## sections, ### steps, images) |
| Slugs | avanade, bforbank, spie-batignolles, totalenergies, valoris | bforbank, **nod**, **spie-bat**, **smartintegrity**, boosted |

**Désalignements clés :**
- Slugs non alignés (`spie-batignolles` ≠ `spie-bat`).
- Relation non 1:1 : **1 expérience CV (mission parent) → N case studies (sous-produits)**.
  TotalEnergies = 1 bloc CV mais 2 case studies (Nob + Smart Integrity).
  Avanade = 1 bloc CV mais 2 case studies (BforBank + Spie).
  Le champ `parent` existe déjà mais n'est pas exploité.

### 1.2 Dérive de schéma entre les 5 missions

| Champ | avanade | bforbank | spie | total | valoris |
|---|:--:|:--:|:--:|:--:|:--:|
| `summary` (ligne CV 1re pers.) | ❌ | ❌ | ❌ | ❌ | ❌ |
| `skills` (ligne CV) | ❌ | ❌ | ✅ | ✅ | ✅ |
| `bullets` alignés CV v7 | ❌ génériques | ❌ | ❌ vides | ✅ | ✅ |
| champs portfolio (heroImage, tags, order) | ❌ | ❌ | ✅ | ❌ | ❌ |

→ `spie-batignolles.md` a déjà fusionné les champs case-study dans le frontmatter mission : la voie « unifiée » était déjà amorcée.

---

## 2. PHASE 0 — Synchroniser les YAML sur le CV v7

> Prep data. Ne change PAS le CV d'aujourd'hui (le PDF se génère depuis le HTML, pas encore depuis les YAML). Sert de fondation propre pour la lettre DAMAC et pour la normalisation de ce soir.

### 2.1 Figer le schéma
- [ ] Ajouter le champ **`summary`** (phrase d'intro CV, 1re personne, distincte de `tagline` 3e personne) au `_template.md` + aux 5 missions.
- [ ] Standardiser **`skills`** partout (vide si pas de ligne skills au CV).
- [ ] Corriger l'exemple de dates du `_template.md` (`2021-12 / 2024-11` → source du bug Total).

### 2.2 Aligner chaque mission sur le CV v7

| Fichier | Modifs |
|---|---|
| `totalenergies.md` | + `summary` · `skills`/`bullets` déjà ✅ · confirmer `mode` (Q2) |
| `valoris.md` | + `summary` · reste ✅ (provisoire) |
| `avanade.md` | + `summary` · bullets CV → **Q1** |
| `bforbank.md` | bullet CV condensé (ranked first of 51) → **Q1** |
| `spie-batignolles.md` | bullet CV condensé (3 legacy tools) → **Q1** |

Contenu de référence (CV v7 actuel, validé) :

**Summaries (1re personne) :**
- Valoris : « I lead product discovery and design on Valoris, improving the value proposition and market fit of a property-management SaaS. »
- Total : « I led research, design and build on 4 industrial SaaS, shipping MVPs fast and iterating through continuous discovery and usage tracking. »
- Avanade : « I delivered on the full design scope, from user research to ideation and UI design, for BforBank, Sodexo, Chanel and Schneider Electric. »

**Skills lines :**
- Valoris : Backlog management · Tracking plan · Data pipelines · Custom AI skills
- Total : Story mapping · Adoption tracking · Data mapping · Design system
- Avanade : (aucune au CV)

### 2.3 Vérifier la cohérence transverse
- [ ] Durées : Avanade 2,5 ans + Total 3 ans + Valoris ~1 an = ~6,5 ans → titre « (6y+) » tient ✅
- [ ] **Profile** en haut du CV ≠ draft « validé » de `notes-experiences.md §0.4` → trancher **Q3**

---

## 3. PHASE 1 — Lettre de motivation DAMAC

1. [ ] Lire `docs/cv/applications/damac/research.md` + `cover-letter-notes.md`.
2. [ ] Invoquer le skill `writing-style` (ton, mots bannis ATS).
3. [ ] Draft → validation → finalisation.
- Bloquant : **Q4** (rôle visé, offre précise, langue, longueur).

## 4. PHASE 2 — Hero portfolio

1. [ ] Auditer la hero actuelle (`app/page.tsx` + composants hero) avant toute modif.
2. [ ] Présenter ce qui cloche, décider les changements ensemble.
3. [ ] Respecter `DESIGN.md` (tokens, pas de hex brut, 1 brand button max) + `npm run ds:check`.
- Détail à cadrer en arrivant dessus.

## 5. PHASE 3 — Ce soir : case studies + normalisation système

- [ ] Décider le modèle hub (unifié vs lié) → finir le brainstorm en spec dédié.
- [ ] Normaliser les slugs (`spie-batignolles`/`spie-bat`, Total → nod + smartintegrity).
- [ ] Écrire le loader missions + générateurs (skills).
- [ ] Archiver le devenu-inutile (`notes-experiences.md`, vieux HTML CV v4/v6/v7-color-tests, `_preview-server.cjs`).
- Vision cible (modèle « hub ») :

```
content/experiences/<slug>/
├── data.md        → YAML : dates, rôle, métriques, bullets, summary, skills, stack
├── notes/         → matière brute : CR réunion, transcripts, brain dumps, liens
└── case-study.md  → long-form portfolio
```

---

## 6. Décisions à trancher (Jonathan)

| # | Question | Options | Décision |
|---|---|---|---|
| **Q1** | Où vivent les bullets CV qui sont en fait des achievements des enfants (BforBank, Spie) ? | (a) champ `cvBullets` sur le parent — rapide · (b) flag `cvFeatured` sur les enfants, parent agrège — vrai modèle hub · (c) verbatim sur le parent aujourd'hui, vrai modèle ce soir | _TBD_ |
| **Q2** | TotalEnergies `mode` : salarié direct ou mission consulting (ESN) ? | employee / consulting-mission | _TBD_ |
| **Q3** | Profile haut du CV : texte actuel du CV ou draft validé des notes §0.4 ? | CV actuel / notes §0.4 | _TBD_ |
| **Q4** | DAMAC : poste précis (titre/lien) ou spontanée ? langue ? longueur ? | — | _TBD_ |

---

## 7. Journal des changements déjà faits (cette session)

- CV v7 : 5 ajustements de gras (V1, V3, V4, T3, T4).
- CV v7 : dates corrigées — TotalEnergies `Jun 2022 - Jun 2025`, Valoris `Jul 2025 - present`.
- Créé `content/missions/totalenergies.md` (atomes confirmés + bullets v7).
- Créé `content/missions/valoris.md` (bullets provisoires marqués).
