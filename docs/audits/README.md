# DS Audits

Rapports d'audit du design system, page par page. Générés par le slash command `/ds-audit` dans Claude Code.

## Qu'est-ce que c'est

Un audit **qualitatif** du respect de [DESIGN.md](../../DESIGN.md) et [AGENTS.md](../../AGENTS.md) sur chaque page de l'app, dispatché en parallèle via des sub-agents Claude. Complémentaire au check **déterministe** `npm run ds:check` (qui couvre déjà raw hex + brackets arbitraires en CI).

L'audit qualitatif couvre :

- Usage correct des **typography tokens** (text-h1, text-body…) et de la hiérarchie heading
- **Spacing** via tokens et alignement grille 4px
- Passage par les **composants du catalogue** (`Button`, `Tag`…) plutôt que `<button>` brut
- **Duplications** de patterns entre composants
- **Dark mode parity** (couleurs qui ne basculent pas)
- Règle **"1 brand button max par page"**
- Conformité **responsive** (breakpoints documentés)

## Comment lire un rapport

Chaque fichier `<page>.md` suit le format `_template.md` :

- **Findings** classés high → medium → low
- Chaque finding référence un `file:line` clickable dans le terminal/VS Code
- **rule** identifie la règle violée
- **found** vs **expected** : ce qui est là, ce que DESIGN.md prescrit

`SUMMARY.md` agrège tout : compte par page × sévérité, top violations transverses, pages saines.

## Sévérité

| Niveau | Sens | Exemples |
|---|---|---|
| **high** | Règle hard d'AGENTS.md violée | hex inline, `px-[24px]`, bare `hover:`, >1 brand button, `<button>` raw stylé Tailwind |
| **medium** | Token disponible mais pas utilisé | spacing arbitraire on-grid, couleur via classe Tailwind générique au lieu du token sémantique |
| **low** | Suggestion qualitative | duplication potentielle, hiérarchie heading ambiguë, label section manquant |

## Quand re-runner

- Après une grosse refonte UI
- Avant de fermer une PR qui touche plusieurs composants
- Quand DESIGN.md évolue (nouveau token, nouvelle règle)
- Pas en CI : trop coûteux, et le déterministe est déjà couvert

Lancer : `/ds-audit` dans une session Claude Code à la racine du repo.

## Convention nommage

- `home.md` → `/`
- `work-<slug>.md` → `/work/<slug>` (ex: `work-bforbank.md`)
- `SUMMARY.md` → agrégation
- `_template.md` → template suivi par chaque rapport (préfixe `_` pour le distinguer)
