# Workflow Design → Dev

> Mon process pour passer d'une intention de design à du code livré, en forçant
> le respect du design system et une revue (auto + manuelle).
>
> Statut : brouillon de cadrage. Emplacement provisoire — à déplacer si besoin.

## Idée directrice

Une image vaut mille mots. On ne part jamais d'une page blanche : on part d'un
visuel qu'on aime, on en extrait ce qui plaît, et on **formalise** ça dans un
`DESIGN.md`. Ensuite tout le reste (exploration, dev, revue) découle de ce
document, qui devient la source de vérité.

La nouveauté par rapport à avant (ex. Malaama) : on a déjà fait « partir de 10
designs et régénérer un truc », mais sans le formaliser au format `DESIGN.md`.
Ici on systématise cette étape.

---

## Vue d'ensemble

```
[0] Design system (DESIGN.md)  ──prérequis──┐
        │                                    │
        ├─ Produit existant → déjà là        │
        └─ Nouveau produit → le créer        │
                                             ▼
[1] Exploration ──► [2] Validation d'une idée ──► [3] Spec ──► [4] Dev (workflow forcé)
                                                                      │
                                                                      ▼
                                                            [5] Revue auto (tests)
                                                                      │
                                                                      ▼
                                                            [6] Revue manuelle (designer)
                                                                      │
                                                                      ▼
                                                            [7] Documentation
```

---

## [0] Prérequis — le design system

Avant tout : il faut un design system, c.-à-d. un `DESIGN.md` quelque part.

- **Produit existant** → on l'a déjà, on saute cette étape.
- **Nouveau produit** → il faut le créer (une étape d'avance).

### Créer le `DESIGN.md` rapidement

La voie la plus rapide :

1. Partir d'un (ou plusieurs) **visuel·s qu'on aime**.
2. **Extraire** ce qui plaît (couleurs, typo, espacements, ton, layout).
3. **Régénérer** un design cohérent à partir de cette extraction.
4. **Formaliser** le résultat dans `DESIGN.md` (tokens, naming par rôle, échelle
   typo, layout, do's & don'ts).

> Réf. interne : la méthode « 10 designs → régénérer un truc » (Malaama), mais
> cette fois avec sortie au format `DESIGN.md`.

---

## [1] Exploration

Une fois le `DESIGN.md` posé, on explore les **détails plus fins** : variations
de ton, déclinaisons, petits ajustements.

Outils d'exploration possibles :
- **Stitch**
- **Claude Design** _[À PRÉCISER : « Cloud Design » dans la dictée — confirmer le nom]_
- Directement dans **Claude Code**

---

## [2] Validation d'une idée

Dès qu'une idée est validée → on passe directement au dev. Pas d'exploration
sans fin : la validation est le déclencheur du build.

---

## [3] Spec

Tout commence par une **spec très précise**.

- Besoin d'un **skill dédié** qui génère cette spec.
- Lié à l'écosystème **superpowers** (plugin déjà installé : voir
  `superpowers:writing-plans`, `superpowers:brainstorming`).

_[À PRÉCISER : intégrer « du maths » + « le mec avec les skills de Grillme / End
of » — référence dictée non identifiée. Probablement un auteur de skills connu à
nommer.]_

---

## [4] Dev — workflow spécifique (forcé)

Au moment du dev, on lance un **workflow spécifique** qui :

- **Force l'usage du design system** (pas de hex brut, pas de valeurs arbitraires,
  composants existants réutilisés — cf. règles anti-drift du repo).
- Embarque une **revue** avec des **hooks** (validation automatique à l'écriture).

> Réf. : « le workflow de Liz » _[À PRÉCISER : identifier ce workflow / cette
> personne pour s'en inspirer.]_

Hooks de garde déjà présents dans ce repo :
- `npm run ds:check` (hex bruts + brackets arbitraires)
- GitHub Action `design-check` sur chaque PR (informatif)

---

## [5] Revue automatique (tests)

Le workflow est **automatisé**, mais la revue faite par l'outil doit être
renforcée par de l'**automatisation des tests**.

- **Playwright** fait partie intégrante du workflow (tests E2E / visuels).
- _[À PRÉCISER : « amulet » dans la dictée — terme à confirmer.]_

---

## [6] Revue manuelle (designer)

Après l'accord automatique, il reste une **revue manuelle** — celle du designer.

Pistes d'outillage :
- **Figma** (comparaison design ↔ rendu)
- **Cursor**

_[À PRÉCISER : définir précisément comment se fait ce pont revue manuelle ↔
Figma / Cursor.]_

---

## [7] Documentation

Documenter le workflow et chaque décision. Important : ce qui n'est pas
documenté n'existe pas pour la prochaine itération.

---

## Briques à construire / clarifier

| # | Brique | Statut |
|---|--------|--------|
| 1 | Process « visuel → DESIGN.md » formalisé | À écrire |
| 2 | Skill de génération de spec précise | À créer |
| 3 | Workflow de dev qui force le design system + hooks | À créer |
| 4 | Intégration tests Playwright dans la revue | À cadrer |
| 5 | Pont revue manuelle (Figma / Cursor) | À cadrer |
| 6 | Réf. « workflow de Liz » | À identifier |
| 7 | Réf. « skills de [nom] » + « maths » | À identifier |
| 8 | Confirmer outils d'exploration (Stitch, Claude Design) | À confirmer |
