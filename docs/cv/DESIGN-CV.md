# DESIGN-CV.md — Design system du CV

> Tokens et règles **spécifiques au CV** (artefact print A4, 1 page, 2 colonnes).
> Le CV est **volontairement séparé** du design system portfolio (`DESIGN.md` / `app/globals.css`) :
> contraintes print (px fixes, densité, lisibilité papier) ≠ web responsive.
> **Source de vérité opérationnelle** : le `<style>` de `docs/cv/ui/cv-v7-design-md.html`.
> Ce fichier en est le **miroir déclaratif**. Dernière sync : 2026-06-08.

## 0. Rapport au DS portfolio

- **Primitives partagées** (mêmes valeurs que le portfolio) : familles de police, échelle d'espacement 8px, neutres `--bg/--surface/--border/--border-strong`, `--text-primary`.
- **Tokens forkés CV** (assumés différents) : gris secondary/tertiary assombris pour le print, accent CV, familles de tokens type `cv-body`/`cv-meta`, plusieurs tailles hors-échelle.
- ⚠️ Il n'y a **plus** d'objectif « réconcilier avec le DS portfolio ». Ces valeurs sont le canon du CV.

---

## 1. Couleurs

| Token | Valeur | Origine |
|---|---|---|
| `--text-primary` | `#18181b` | partagé DS |
| `--text-secondary` | `#66666f` | **fork CV** : DS `#71717b` assombri ~10% (lisibilité print) |
| `--text-tertiary` | `#9f9fa7` | **fork CV** : DS `#9f9fa9` assombri ~3% |
| `--accent-cv` | `#C2410C` | **CV-only** (terracotta ; sert uniquement aux labels de section) |
| `--bg` | `#fafafa` | partagé |
| `--surface` | `#f4f4f5` | partagé |
| `--border` | `#e4e4e7` | partagé |
| `--border-strong` | `#d4d4d8` | partagé |
| `--card-estate-bg` | `#F7F2F0` | **CV-only** (fond warm de la card Real Estate Expertise) |

## 2. Polices

| Token | Valeur |
|---|---|
| `--font-display` | `Space Grotesk` (nom, sociétés) |
| `--font-body` | `Manrope` (tout le reste) |

⚠️ **Dépendance** : Manrope est chargé en **variable** (`wght@400..700`). Les métriques (`.bullet strong`) sont à **600** (poids standard, importable en statique).

## 3. Échelle d'espacement (partagée, base 8px)

`--none 0` · `--2xs 4` · `--xs 8` · `--sm 16` · `--md 24` · `--lg 32` · `--lg-plus 40` · `--xl 48` · `--2xl 64`
Radius : `--rounded-md 8px`.

## 4. Échelle typographique

| Token | Taille / Interligne | Usage |
|---|---|---|
| `--text-h3` / `--leading-h3` / `--tracking-h3` | 24 / 32 / −0.01em | (base ; `.name` l'override à 28/0) |
| `--text-body-sm` / `--leading-body-sm` | 14 / 20 | titre, ligne société (base) |
| `--text-tag` / `--leading-tag` | 12 / 16 | (base ; `.tag` l'override à 10) |
| `--text-cv-body` / `--leading-cv-body` | **12 / 18** | **CV-only** — corps (summary, bullets, profile) |
| `--text-cv-meta` / `--leading-cv-meta` | **11 / 16** | **CV-only** — méta (rôle, période, ville, labels, skills) |

## 5. Rôles typographiques (classe → spec)

| Classe | Police | Taille | Poids | Interligne | Couleur | Notes |
|---|---|---|---|---|---|---|
| `.name` | Space Grotesk | **28px** | 500 | 32 | primary | ls 0 · *hors-échelle* |
| `.co` (société) | Space Grotesk | **15px** | 600 | 20 | primary | *hors-échelle* |
| `.title` | Manrope | 14 | 600 | 20 | primary | |
| `.subtitle` | Manrope | 12 | 400 | 18 | secondary | `margin-top 4` |
| `.label` (section) | Manrope | 11 | 600 | 16 | **accent** | uppercase · ls 0.08 |
| `.lead` (profile) | Manrope | 12 | **600** | 18 | primary | |
| `.summary` | Manrope | 12 | **600** | 18 | primary | `margin-bottom 16` |
| `.bullet` | Manrope | 12 | 400 | 18 | **primary** | |
| `.bullet strong` (métrique) | Manrope | 12 | **600** | — | primary | ancre de scan |
| `.role` | Manrope | 11 | 400 | 16 | secondary | |
| `.location` | Manrope | 11 | 400 | 16 | tertiary | |
| `.period` | Manrope | 11 | 400 | 16 | tertiary | nowrap |
| `.contact` | Manrope | 11 | 400 | 16 | secondary | liens `underline` |
| `.contact a.cprimary` (portfolio) | Manrope | 11 | **600** | 16 | primary | |
| `.side-strong` | Manrope | 12 | 600 | 18 | primary | items sidebar |
| `.side-item` | Manrope | 11 | 400 | 16 | secondary | |
| `.stack-k` (label SKILLS) | Manrope | **9px** | 700 | — | secondary | uppercase · ls 0.08 · `::after ":"` · *hors-échelle* |
| `.stack-line` (items skills) | Manrope | 11 | 400 | 1 | secondary | flex wrap |
| `.sk-sep` (séparateur skills) | — | — | — | — | tertiary | `margin 0 6px` |
| `.tag` (pill Tools) | Manrope | **10px** | 500 | 16 | primary | border 1px `--border` · radius 6 · padding 3/8 · *hors-échelle* |

## 6. Spacing vertical — canon

Séquence dans un bloc expérience : **`2 → 8 → 16 → 8 → 20`**, et **`40`** entre expériences.

| Entre… | Valeur | Source |
|---|---|---|
| Nom société ↔ Rôle | 2px | `.xp-head gap` |
| Rôle ↔ Summary | 8px | `.xp-head margin-bottom` (`--xs`) |
| Summary ↔ 1er bullet | 16px | `.summary margin-bottom` |
| Entre bullets | 8px | `.bullets gap` (`--xs`) |
| Dernier bullet ↔ Skills | 20px | `.stack margin-top` |
| Entre expériences | 40px | `.xp-list gap` (`--lg-plus`) |
| Profile haut + bas | 32px | `header` + `.profile margin-bottom` (`--lg`) |
| Header : Nom ↔ Titre | 4px | `.id-main gap` |
| Header : Titre ↔ Localisation | 8px | gap 4 + `.subtitle margin-top 4` |
| Bloc contact : entre lignes | 8px | `.id-contact gap` (`--xs`) |
| Sidebar : entre blocs | 32px | `.side gap` (`--lg`) |

## 7. Layout / page

| Token | Valeur |
|---|---|
| `--page-w` / `--page-h` | 794 / 1123 (A4 @96dpi) |
| `--page-margin` | 40 |
| `--col-gap` (contenu ↔ sidebar) | **40px** (`--lg-plus`) |
| `--main-w` / `--sidebar-w` | **442** / 232 (`714 − 40 − 232`) |

## 8. Composants

- **Photo** : `72 × 82px` (ratio ~4:5), radius **4px**, border 1px `--border`. Image : `object-fit: cover` + `transform: scale(1.30)` origine `50% 50%` (cadrage visage, peu de vide au-dessus de la tête).
- **Card** (Real Estate) : `--surface`, radius `--rounded-md` (8), padding `--sm` (16).
- **Skills** (par expérience) : une ligne `SKILLS:` (`.stack-k`) + items dot-séparés (`.sk-sep`). Présents sur **Valoris + TotalEnergies**, **pas sur Avanade**.
- **Séparateurs `·`** : `.dot-sep` (sidebar) + `.mid-sep` (rôles & sociétés) = `padding: 0 6px` ; `.sk-sep` (skills) = `margin: 0 6px`. Tous harmonisés à **6px** (2026-06-08).
- **Tools pills** (sidebar) : `.tags` flex wrap gap 4px, `.tag` (cf. §5).

## 9. Valeurs hors-tokens (assumées CV)

Hardcodées hors de l'échelle DS, propres au print CV :
`.name 28` · `.co 15` · `.tag 10` · `.stack-k 9` · `.stack margin-top 20` · `.sk-sep 6` · `.xp-head gap 2` · `.tag radius 6 + padding 3/8` · photo `72×82` radius 4 + `scale 1.30`.

## 10. Dette / à nettoyer

- Serveur de preview jetable : `docs/cv/ui/_preview-server.cjs` + entrée `static-docs` dans `.claude/launch.json` → à supprimer en fin de projet.
- Classe `.sep` orpheline sur certains `<li>` (inerte).
- `body.guide` + `.guide .page::after` (repère pointillé rouge) : aide dev only ; le PDF se génère depuis une copie sans `guide`.
