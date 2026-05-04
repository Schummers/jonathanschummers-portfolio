# Design System — Portfolio Jonathan Schummers

> Spec validee le 2026-03-20. Reference pour l'implementation en etape 2 de la roadmap.

---

## 1. Vue d'ensemble

Design system pour un portfolio Product Design freelance. Direction visuelle inspiree d'un layout "architectural blueprint" — structure par les bordures, pas par les ombres ni les conteneurs. Le design est carre, rectangulaire, angulaire.

**Stack** : Next.js 16 + Tailwind CSS v4 + CSS variables
**Mode** : Light par defaut, dark mode via `prefers-color-scheme` + toggle manuel

---

## 2. Design Tokens

### 2.1 Couleurs — Neutres (Tailwind Zinc)

| Token | Valeur | Usage |
|-------|--------|-------|
| `--zinc-50` | `#fafafa` | Background light mode |
| `--zinc-100` | `#f4f4f5` | Surface subtile |
| `--zinc-200` | `#e4e4e7` | Bordures light mode |
| `--zinc-300` | `#d4d4d8` | Bordures fortes, tags |
| `--zinc-400` | `#9f9fa9` | Texte faint (labels) |
| `--zinc-500` | `#71717b` | Texte subtle |
| `--zinc-600` | `#52525c` | Texte muted (body) |
| `--zinc-700` | `#3f3f47` | Bordures dark mode |
| `--zinc-800` | `#27272a` | Surface dark |
| `--zinc-900` | `#18181b` | Foreground light / background invert |
| `--zinc-950` | `#09090b` | Background dark mode |

### 2.2 Couleurs — Accent (Bright Electric)

| Token | Valeur | Usage |
|-------|--------|-------|
| `--color-accent-subtle` | `#d4e3ff` | Fond accent subtil |
| `--color-accent-muted` | `#3670f5` | Accent secondaire |
| `--color-accent` | `#0A4CF0` | Accent principal (brand CTA) — light mode |
| `--color-accent-hover` | `#0839b8` | Hover sur accent |
| `--color-accent-on-dark` | `#6d9dfa` | Accent en dark mode (contraste AA ✓ 7.1:1 sur zinc-950) |

**Dark mode** : l'accent `#0A4CF0` n'a que 3.2:1 de contraste sur `#09090b` — insuffisant pour du texte WCAG AA. Utiliser `--color-accent-on-dark` (#6d9dfa) pour tout texte/lien accent en dark mode. Le bleu `#0A4CF0` reste utilisable en background (bouton Brand) car le texte blanc dessus a un contraste suffisant.

**Regles d'usage du bleu :**
- **1 seul CTA brand bleu par page maximum**
- Le noir (`zinc-900`) est la couleur d'interaction par defaut (boutons, hovers)
- Le bleu est reserve pour l'action la plus importante de toute la page
- Usage tres parcimonieux — le bleu doit surprendre, pas saturer

### 2.3 Couleurs — Texte (3 niveaux, inspire de Radix steps 11-12)

| Token | Light mode | Dark mode | Usage |
|-------|-----------|-----------|-------|
| `text-primary` | zinc-900 (#18181b) | zinc-200 (#e4e4e7) | Titres, body text, liens actifs |
| `text-secondary` | zinc-500 (#71717b) | zinc-400 (#9f9fa9) | Descriptions, sous-titres, labels, liens, nav |
| `text-tertiary` | zinc-400 (#9f9fa9) | zinc-500 (#71717b) | Copyright, timestamps (texte non-essentiel uniquement) |

**Accessibilite :** text-primary et text-secondary passent WCAG AA (4.5:1+) dans les deux modes. text-tertiary ne passe pas AA — reserve au texte decoratif.

### 2.3b Couleurs — Backgrounds & Borders

| Token | Light mode | Dark mode | Usage |
|-------|-----------|-----------|-------|
| `bg` | zinc-50 (#fafafa) | zinc-950 (#09090b) | Fond principal |
| `surface` | zinc-100 (#f4f4f5) | zinc-800 (#27272a) | Surfaces elevees, card hover, placeholders |
| `border` | zinc-200 (#e4e4e7) | zinc-700 (#3f3f47) | Bordures standard |
| `border-strong` | zinc-300 (#d4d4d8) | zinc-600 (#52525c) | Bordures fortes, tags, outline buttons |
| `invert-bg` | zinc-900 (#18181b) | zinc-50 (#fafafa) | Section testimonials |
| `invert-fg` | zinc-50 (#fafafa) | zinc-900 (#18181b) | Texte sur fond invert |

### 2.3c Couleurs — Bouton Primary (approche Radix : step 9 → 10 → brightness filter)

| Etat | Light mode | Dark mode |
|------|-----------|-----------|
| Default | zinc-850 (#1e1e21) | zinc-150 (#ececee) |
| Hover | zinc-950 (#09090b) | zinc-50 (#fafafa) |
| Pressed | zinc-950 + brightness(1.08) | zinc-50 + brightness(0.95) |
| Texte | zinc-50 (#fafafa) | zinc-950 (#09090b) |

### 2.4 Typographie

**2 polices :**
- **Display** : Space Grotesk (Google Fonts) — titres, headings, metriques
- **Body** : Manrope (Google Fonts) — texte courant, labels, navigation, tags

**Icones** : Heroicons (`@heroicons/react`) — bibliotheque Tailwind Labs. Custom SVG pour LinkedIn et GitHub (pas dans Heroicons).

**Echelle responsive :**

| Token | Font | Weight | Desktop | Tablet | Mobile | Leading | Tracking |
|-------|------|--------|---------|--------|--------|---------|----------|
| `text-hero` | Space Grotesk | 700 | 56px | 48px | 40px | 0.92 | -0.03em |
| `text-h1` | Space Grotesk | 700 | 48px | 40px | 36px | 1.1 | -0.02em |
| `text-h2` | Space Grotesk | 700 | 32px | 28px | 24px | 1.2 | -0.02em |
| `text-h3` | Space Grotesk | 700 | 24px | 22px | 20px | 1.3 | -0.01em |
| `text-h4` | Space Grotesk | 700 | 18px | 18px | 18px | 1.3 | -0.02em |
| `text-body-lg` | Manrope | 400 | 18px | 18px | 16px | 1.65 | — |
| `text-body` | Manrope | 400 | 16px | 16px | 16px | 1.65 | — |
| `text-body-sm` | Manrope | 400/600 | 14px | 14px | 14px | 1.5 | — |
| `text-label` | Manrope | 600 | 12px | 12px | 12px | — | 0.08em (uppercase) |

### 2.5 Spacing — Base 8px

| Token | Valeur | Usage type |
|-------|--------|------------|
| `--space-xs` | 8px | Espacement interne compact |
| `--space-sm` | 16px | Gap entre elements proches |
| `--space-md` | 24px | Padding composants |
| `--space-lg` | 32px | Gap entre groupes |
| `--space-xl` | 48px | Padding sections |
| `--space-2xl` | 64px | Separation large |
| `--space-3xl` | 96px | Padding sections majeures |
| `--space-4xl` | 128px | Hero spacing |

### 2.6 Arrondis

| Token | Valeur | Usage |
|-------|--------|-------|
| `--radius-none` | 0 | Defaut — sections, images, conteneurs |
| `--radius-sm` | 1px | Boutons CTA |
| `--radius-pill` | 3px | Tags, pills |

### 2.7 Ombres

**Aucune. Jamais.** Le design est structure par les bordures uniquement.

### 2.8 Motion

| Token | Valeur | Usage |
|-------|--------|-------|
| `--transition-fast` | 150ms ease-out | Hover boutons, liens |
| `--transition-base` | 300ms ease-out | Hover inversion (fond/texte) |
| `--transition-slow` | 400ms ease-out | Image grayscale → couleur |

**`prefers-reduced-motion`** : quand l'utilisateur demande des animations reduites, toutes les transitions passent a `0ms`. Les `filter: grayscale()` sont desactives (images toujours en couleur). Les scroll-triggered reveals apparaissent sans animation.

---

## 3. Layout Blueprint

### 3.1 Principes

Le site utilise un systeme de layout "blueprint architectural" :

1. **Bordures verticales gauche/droite** — lignes fines (`zinc-200` light / `zinc-700` dark) qui encadrent tout le contenu comme un cadre. Visibles sur toute la hauteur de la page.
2. **Separations horizontales** — entre chaque section (header, hero, contenu, footer). Bordure `1px solid` zinc-200/700.
3. **Pas de cards ni de conteneurs** — le contenu vit directement dans les zones delimitees par la grille.
4. **Max-width** : 1400px centre, avec les bordures verticales.

### 3.2 Inversions de couleur (bandes noires)

Certaines sections utilisent un fond inverse pour creer du rythme dans le scroll :

- **Light mode** : fond `zinc-900`, texte `zinc-50`, bordures `zinc-700`
- **Dark mode** : fond `zinc-50`, texte `zinc-900`, bordures `zinc-200`

Les boutons s'inversent aussi :
- Primary sur invert → fond blanc, texte noir
- Outline sur invert → bordure `zinc-700`, texte blanc

### 3.3 Responsive

| Breakpoint | Largeur | Adaptations |
|------------|---------|-------------|
| Mobile | < 768px | Bordures verticales conservees mais padding reduit (24px). Typo hero via `clamp()`. |
| Tablet | 768–1024px | Padding 32px. Grids passent de 2 colonnes a 1 si besoin. |
| Desktop | > 1024px | Layout complet, padding 48px, max-width 1400px. |

**Typographie responsive** — via CSS custom properties avec media queries (pas de clamp) :
Voir section 2.4 pour l'echelle complete. Les breakpoints sont :
- Desktop > 1024px (valeurs par defaut)
- Tablet 768–1024px (tailles reduites)
- Mobile < 768px (tailles minimales)

**Touch devices** : les hover ne s'appliquent pas (`@media (hover: hover)`). Les elements interactifs restent dans leur etat par defaut.

---

## 4. Composants de base

### 4.1 Boutons (`components/button.tsx`)

**Sizes :** `default` (text-body-sm 14px, px-md py-12px) et `xl` (text-body-lg 18px, px-lg py-sm). XL utilise pour le hero CTA.

#### Primary (approche Radix : step 9 → 10 → brightness filter)

| Etat | Light mode | Dark mode |
|------|-----------|-----------|
| Default | bg zinc-850 (#1e1e21), text zinc-50 | bg zinc-150 (#ececee), text zinc-950 |
| Hover | bg zinc-950 (#09090b) | bg zinc-50 (#fafafa) |
| Pressed | bg zinc-950 + brightness(1.08) + scale(0.98) | bg zinc-50 + brightness(0.95) + scale(0.98) |

#### Brand

| Etat | Couleur |
|------|---------|
| Default | bg accent (#0A4CF0), text white |
| Hover | bg accent-hover (#0839b8) |
| Pressed | bg accent-hover + brightness(1.08) + scale(0.98) |

**Regle** : 1 seul bouton Brand par page maximum.

#### Outline

| Etat | Light mode | Dark mode |
|------|-----------|-----------|
| Default | transparent + border zinc-300, text text-primary | transparent + border zinc-600, text text-primary |
| Hover | bg surface (zinc-100) | bg surface (zinc-800) |
| Pressed | bg border (zinc-200) + scale(0.98) | bg border (zinc-700) + scale(0.98) |

#### Ghost / Liens (pas un bouton — liens inline type "More about me", "See all projects")

| Etat | Style |
|------|-------|
| Default | text-secondary, font-semibold, pas de bg |
| Hover | text-primary (changement de couleur uniquement, pas de bg) |

**Disabled (tous variants) :**
- Background : disabled-bg (zinc-200 light / zinc-700 dark)
- Color : disabled-fg (zinc-400 light / zinc-600 dark)
- Cursor : `not-allowed`
- Pas de hover effect

**Sur fond invert (bande noire) :**
- Primary → fond blanc, texte noir
- Outline → bordure `zinc-700`, texte blanc
- Brand → reste identique (fond bleu, texte blanc) — le bleu ressort sur le noir

**Specs communes** : Manrope SemiBold 14px, padding 12px 24px. Une seule taille (pas de sm/md/lg — portfolio, pas un SaaS).

### 4.2 Tags / Pills

- Border : `zinc-300` 1px solid
- Radius : `--radius-pill` (3px)
- Font : Manrope SemiBold 11px uppercase, letter-spacing 0.08em
- Color : `zinc-600`
- Padding : 4px 10px

Les tags sont **non-interactifs** (labels informatifs). Pas de hover, pas de clic. Si un usage interactif (filtres) est ajoute plus tard, specifier les etats hover/selected a ce moment-la.

### 4.3 Hover inversion (elements interactifs)

Pattern pour les lignes de projets et elements cliquables :
- Defaut : fond transparent, texte `zinc-900`
- Hover : fond `zinc-900`, texte `zinc-50`, transition 300ms
- Images : `filter: grayscale(1)` par defaut, `grayscale(0)` au hover (transition 400ms)

### 4.4 Separateurs

- Horizontal : `1px solid zinc-200` (light) / `zinc-700` (dark) — entre sections
- Vertical : meme style — bordures gauche/droite du layout

### 4.5 Liens (inline)

- Couleur : `zinc-900` (light) / `zinc-200` (dark)
- Decoration : underline, `text-underline-offset: 3px`
- Hover : `zinc-600` (light) / `zinc-400` (dark), transition 150ms

### 4.6 Focus (accessibilite)

Tous les elements interactifs (boutons, liens, tags) :
- `outline: 2px solid zinc-900` (light) / `zinc-200` (dark)
- `outline-offset: 2px`
- Visible uniquement via `:focus-visible` (pas au clic souris)

### 4.7 Toggle dark mode

- Defere — visual spec a definir en implementation (icone soleil/lune ou similaire)
- Position : dans la navigation, cote droit

---

## 5. Dark Mode

### 5.1 Implementation

- **Defaut** : light mode
- **Detection** : `prefers-color-scheme: dark` via media query
- **Toggle** : bouton manuel qui ajoute/retire la classe `dark` sur `<html>`
- **Persistance** : `localStorage` pour le choix manuel

### 5.2 Mapping des tokens

Toutes les couleurs semantiques sont definies en CSS variables dans `:root` (light) et `.dark` / `@media (prefers-color-scheme: dark)` (dark). Voir section 2.3.

---

## 6. Composants deferes

**Nav et Footer** : ces composants seront specifies en etape 3 (homepage section-par-section). Ils dependent du contenu et du layout final — pas du design system de base.

---

## 7. Decisions a valider en etape 7 (QA)

- [ ] Re-tester Space Grotesk + Manrope avec le contenu reel — valider lisibilite et hierarchie
- [ ] Evaluer si JetBrains Mono apporte quelque chose pour les tags/labels techniques
- [ ] Placement exact des tags de section type `[SEC.01]` (concept blueprint)
- [ ] Taille exacte des titres hero (oversized MAJ) — a tester avec le vrai contenu
- [ ] Usage exact du bleu electric — confirmer la regle "1 CTA brand par page"

---

## 8. References visuelles

- Screenshots layout blueprint : `docs/layout/`
- Ancienne V15 : `docs/references/v15-reference.tsx` — pattern de grille visible, bordures
- Ancienne V-ref : `docs/references/v-ref-reference.tsx` — hover inversion, bandes noires, case studies en rangees
- Brief de recherche : `docs/references/portfolio-best-practices.md`
- Visual companion mockups : `.superpowers/brainstorm/`
