# Design System — Portfolio Jonathan Schummers

> **Source de vérité unique.** Toute évolution du design system passe d'abord par ce fichier, puis par le code (`app/globals.css` + composants).
>
> **Portabilité.** Pour réutiliser ce design system dans un autre projet, copier ce fichier + le bloc CSS de la section [9. Implémentation](#9-implémentation).
>
> **Historique.** Issu de la spec d'origine `docs/archive/2026-03-20-design-system-spec-original.md`, consolidée en mai 2026 après audit code↔spec et résolution de 31 incohérences.

---

## Sommaire

1. [Principes](#1-principes)
2. [Couleurs](#2-couleurs)
3. [Typographie](#3-typographie)
4. [Spacing](#4-spacing)
5. [Radius](#5-radius)
6. [Ombres](#6-ombres)
7. [Motion](#7-motion)
8. [Layout](#8-layout)
9. [Composants](#9-composants)
10. [Dark mode](#10-dark-mode)
11. [Accessibilité](#11-accessibilité)
12. [Implémentation](#12-implémentation)

---

## 1. Principes

- **Sobriété structurelle.** Pas de cartes ombrées pour structurer le layout — les sections sont délimitées par des bordures 1px. Une seule exception: les frames de mockup (browser/phone) peuvent porter une ombre subtile pour se détacher.
- **Tokens partout.** Aucune couleur, taille ou durée hardcodée dans les composants. Tout passe par les variables CSS sémantiques (`--sem-*`) exposées en utilitaires Tailwind.
- **Hover réservé aux pointeurs.** Toute interaction `:hover` est gardée derrière `@media (hover: hover)` pour ne pas se déclencher au tap mobile.
- **Reduced motion respecté.** `prefers-reduced-motion: reduce` neutralise toutes les transitions et animations.
- **Dark mode équivalent.** Tout token a une valeur définie en light ET en dark.

---

## 2. Couleurs

### 2.1 Texte

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--sem-text-primary` | `#18181b` (zinc-900) | `#e4e4e7` (zinc-200) | Titres, body principal |
| `--sem-text-secondary` | `#71717b` (zinc-500) | `#9f9fa9` (zinc-400) | Sous-titres, paragraphes secondaires, liens au repos |
| `--sem-text-tertiary` | `#9f9fa9` (zinc-400) | `#71717b` (zinc-500) | Métadonnées, captions, placeholders |

Utilitaires Tailwind: `text-text-primary`, `text-text-secondary`, `text-text-tertiary`.

> **Alias technique.** `--sem-fg` (alias de `--sem-text-primary`) est utilisé en interne pour `body { color }` et l'outline `:focus-visible`. Ne pas l'utiliser directement dans les composants.

### 2.2 Backgrounds & borders

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--sem-bg` | `#fafafa` (zinc-50) | `#09090b` (zinc-950) | Fond global de la page |
| `--sem-surface` | `#f4f4f5` (zinc-100) | `#27272a` (zinc-800) | Cartes subtiles, hover des cards de projet, key-results boxes |
| `--sem-border` | `#e4e4e7` (zinc-200) | `#3f3f47` (zinc-700) | Séparateurs et bordures par défaut |
| `--sem-border-strong` | `#d4d4d8` (zinc-300) | `#52525c` (zinc-600) | Bordures sur fond invert |
| `--sem-invert-bg` | `#18181b` (zinc-900) | `#fafafa` (zinc-50) | Bandes inverses (testimonials), fond bouton primary invert |
| `--sem-invert-fg` | `#fafafa` (zinc-50) | `#18181b` (zinc-900) | Texte sur fond invert |

Utilitaires Tailwind: `bg-bg`, `bg-surface`, `border-border`, `border-border-strong`, `bg-invert-bg`, `text-invert-fg`.

### 2.3 Accent

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--sem-accent` | `#0A4CF0` | `#0A4CF0` | Bouton variant `brand` |
| `--sem-accent-hover` | `#0839b8` | `#0839b8` | Hover du bouton brand |
| `--sem-accent-text` | `#0A4CF0` | `#6d9dfa` | Couleur des liens accent (ajustée en dark pour contraste) |
| `--sem-accent-muted` | `#3670f5` | `#3670f5` | Variante désaturée |
| `--sem-accent-subtle` | `#d4e3ff` | `#d4e3ff` | Fond subtil accent (badges, highlights) |

Utilitaires: `bg-accent`, `text-accent`, `text-accent-text`, etc.

### 2.4 Bouton primary

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--sem-btn-primary` | `#1e1e21` (zinc-850) | `#ececee` (zinc-150) | Fond du bouton primary par défaut |
| `--sem-btn-primary-hover` | `#09090b` (zinc-950) | `#fafafa` (zinc-50) | Fond hover |
| `--sem-btn-primary-fg` | `#fafafa` (zinc-50) | `#09090b` (zinc-950) | Couleur du texte |

> Le pressed state est obtenu via `brightness-110` (Tailwind valid) ou `brightness-[1.08]` arbitraire — pas de token couleur dédié.

### 2.5 Disabled

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--sem-disabled-bg` | `#e4e4e7` (zinc-200) | `#3f3f47` (zinc-700) | Fond des éléments désactivés |
| `--sem-disabled-fg` | `#9f9fa9` (zinc-400) | `#52525c` (zinc-600) | Texte des éléments désactivés |

Utilitaires: `bg-disabled-bg`, `text-disabled-fg`.

---

## 3. Typographie

### 3.1 Familles

| Token | Famille | Subset | Usage |
|---|---|---|---|
| `--font-display` | **Space Grotesk** | latin, weights 500/700 | Titres (hero/h1-h4), labels, accents |
| `--font-body` | **Manrope** | latin, weights 400/500/600/700 | Paragraphes, UI, métadonnées |

Chargement via `next/font/google` avec `display: swap`.

### 3.2 Échelle

Tailles en pixels desktop (>1024px). Voir [3.4 Responsive](#34-responsive) pour les breakpoints.

| Utilitaire Tailwind | Token | Size desktop | Line-height | Tracking | Usage type |
|---|---|---|---|---|---|
| `text-hero` | `--sem-text-hero` | **56px** | 0.92 | -0.03em | Hero homepage |
| `text-h1` | `--sem-text-h1` | **48px** | 1.1 | -0.02em | H1 page |
| `text-h2` | `--sem-text-h2` | **32px** | 1.2 | -0.02em | Titres de sections, titre case study |
| `text-h3` | `--sem-text-h3` | **24px** | 1.3 | -0.01em | Sous-titres, key-results |
| `text-h4` | `--sem-text-h4` | **18px** | 1.3 | -0.02em | Petits titres en card |
| `text-body-lg` | `--sem-text-body-lg` | **18px** | 1.65 | normal | Paragraphes mis en avant, lead |
| `text-body` | `--sem-text-body` | **16px** | 1.65 | normal | Paragraphes courants |
| `text-body-sm` | `--sem-text-body-sm` | **14px** | 1.5 | normal | Captions, métadonnées |
| `text-label` | `--sem-text-label` | **14px** | 1.5 | 0.08em (uppercase) | Labels de section ("Key results", "Testimonials") |
| `text-tag` | `--sem-text-tag` | **12px** | 16px | normal | Texte des Tag components |

> **Tags font-weight et casse.** Les tags utilisent `font-medium` (500) en casse normale, sans tracking custom — style "chips éditoriaux", pas "labels techniques".

> **Labels.** Les labels de section sont en uppercase via `uppercase` Tailwind, et bénéficient du tracking `0.08em` pour la lisibilité.

### 3.3 Tokens leading et tracking

| Token | Valeur | Notes |
|---|---|---|
| `--sem-leading-hero` | 0.92 | |
| `--sem-leading-h1` | 1.1 | |
| `--sem-leading-h2` | 1.2 | |
| `--sem-leading-h3` | 1.3 | |
| `--sem-leading-h4` | 1.3 | |
| `--sem-leading-body` | 1.65 | Body et body-lg |
| `--sem-leading-body-sm` | 1.5 | Body-sm et label |
| `--sem-leading-tag` | 16px | Pixel value sur grille 8px |
| `--sem-tracking-hero` | -0.03em | |
| `--sem-tracking-h1` | -0.02em | |
| `--sem-tracking-h2` | -0.02em | |
| `--sem-tracking-h3` | -0.01em | |
| `--sem-tracking-h4` | -0.02em | |
| `--sem-tracking-label` | 0.08em | Pour labels uppercase |

### 3.4 Responsive

Breakpoints: tablet `≤1024px`, mobile `≤767px`. Le passage de tablet à mobile réduit principalement les titres.

| Utilitaire | Desktop | Tablet (≤1024px) | Mobile (≤767px) |
|---|---|---|---|
| `text-hero` | 56px | 48px | 40px |
| `text-h1` | 48px | 40px | 36px |
| `text-h2` | 32px | 28px | 24px |
| `text-h3` | 24px | 22px | 20px |
| `text-h4` | 18px | 18px | 18px |
| `text-body-lg` | 18px | 18px | **16px** |
| Autres | inchangés | inchangés | inchangés |

---

## 4. Spacing

Échelle base **8px**. Toujours utiliser les tokens — pas de valeurs arbitraires (`px-[24px]` interdit, `px-md` correct).

| Token | Valeur | Utilitaire | Usage type |
|---|---|---|---|
| `--sem-space-xs` | 8px | `p-xs`, `gap-xs`, `m-xs` | Espacement atomique |
| `--sem-space-sm` | 16px | `sm` | Padding compact |
| `--sem-space-md` | 24px | `md` | Padding bouton, gap moyen |
| `--sem-space-lg` | 32px | `lg` | Espace inter-éléments dans une carte |
| `--sem-space-xl` | 48px | `xl` | Padding section standard |
| `--sem-space-2xl` | 64px | `2xl` | Espace inter-sections desktop |
| `--sem-space-xl2` | 72px | `xl2` | Padding vertical featured cards (9 × 8px) |
| `--sem-space-3xl` | 96px | `3xl` | Espace inter-sections large |
| `--sem-space-4xl` | 128px | `4xl` | Padding vertical hero |

---

## 5. Radius

| Token | Valeur | Utilitaire | Usage |
|---|---|---|---|
| `--sem-radius-none` | 0 | `rounded-none` | Edges nets (sections, cartes principales) |
| `--sem-radius-sm` | 1px | `rounded-sm` | Boutons CTA |
| `--sem-radius-pill` | 3px | `rounded-pill` | Pills très subtiles (réservé, peu utilisé) |
| `--sem-radius-md` | 8px | `rounded-md` | **Tags**, chips interactives. Override la valeur Tailwind par défaut (6px). |
| `--sem-radius-frame-browser` | 6px | `rounded-[var(--sem-radius-frame-browser)]` | Frame mockup browser |
| `--sem-radius-frame-iphone` | 16px | `rounded-[var(--sem-radius-frame-iphone)]` | Frame mockup iPhone |

> **Pas de `rounded-lg`/`rounded-xl`/`rounded-2xl` Tailwind** dans les composants. Si besoin d'un nouveau radius, ajouter un token.

---

## 6. Ombres

> **Règle générale.** Pas d'ombres pour structurer le layout — utiliser des bordures `1px` (`border-border`).
>
> **Une exception.** Les frames de mockup (browser/phone) peuvent porter une ombre subtile pour se détacher visuellement du fond.

| Token | Valeur | Usage |
|---|---|---|
| `--sem-shadow-mockup` | `0 2px 8px rgba(0, 0, 0, 0.06)` | Browser frame, iPhone frame |

---

## 7. Motion

### 7.1 Durées et easing

| Token | Valeur | Usage |
|---|---|---|
| `--dur-fast` | 150ms | Hover de couleurs, feedback bouton |
| `--dur-base` | 300ms | Transitions de fond, transformations |
| `--dur-slow` | 400ms | Image grayscale → couleur, anim hero |
| `--ease-default` | `ease-out` | Easing par défaut de toutes les transitions |

Usage Tailwind: `duration-[var(--dur-fast)]`, `ease-out`.

### 7.2 Reduced motion

`@media (prefers-reduced-motion: reduce)` neutralise toutes les transitions et animations:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 0ms !important;
    animation-duration: 0ms !important;
  }
  img, video { filter: none !important; }
}
```

### 7.3 Hover supported

Toute interaction `:hover` doit être gardée par `@media (hover: hover)` pour ne pas se déclencher au tap mobile. **Custom variant Tailwind v4 à utiliser**:

```css
@custom-variant hover-supported (@media (hover: hover) { &:hover; });
```

Usage: `hover-supported:bg-surface`, `hover-supported:text-text-primary`.

---

## 8. Layout

### 8.1 Blueprint

Le portfolio s'appuie sur un blueprint vertical délimité par des bordures `1px` (jamais d'ombres). Le composant `<BlueprintShell>` impose les paddings et les bordures latérales sur les sections enfants.

- **Largeur max contenu**: 1400px (`max-w-[1400px]`).
- **Bordures**: `border-x border-border` sur le shell pour créer les rails verticaux.
- **Padding horizontal des sections**:
  - Mobile (`<768px`): `--sem-space-md` (24px)
  - Tablet (`768-1023px`): `--sem-space-lg` (32px)
  - Desktop (`≥1024px`): `--sem-space-xl` (48px)

### 8.2 Bandes inverses

Pattern visuel utilisé pour Testimonials: une **carte `bg-surface` insérée dans un cadre `bg-invert-bg`**. La bande noire forme un cadre fin autour d'une carte claire.

```
┌─ section bg-invert-bg (zinc-900) ─────────┐
│  padding xl                                │
│  ┌──────────────────────────────────────┐ │
│  │ card bg-surface (zinc-100)            │ │
│  │ contenu texte text-text-primary       │ │
│  └──────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

### 8.3 Layout case study

Grille 3 colonnes desktop (≥1024px):
- Colonne gauche (TOC): `minmax(140px, 1fr)`
- Colonne centrale (contenu): `minmax(0, 864px)`
- Colonne droite (vide): `minmax(140px, 1fr)`

Les bordures verticales internes (entre TOC et contenu, contenu et droite) délimitent visuellement le rail de 864px.

---

## 9. Composants

### 9.1 Button

Deux tailles (`default` et `xl`), trois variants (`primary`, `brand`, `outline`).

| Variant | Default state | Hover (hover-supported) | Pressed |
|---|---|---|---|
| `primary` | `bg-btn-primary` + `text-btn-primary-fg` | `bg-btn-primary-hover` | `brightness-[1.08]` |
| `brand` | `bg-accent` + `text-white` | `bg-accent-hover` | `brightness-[1.08]` |
| `outline` | `border border-border-strong` + `text-text-primary` + `bg-transparent` | `bg-surface` | `bg-border` |

Tailles:

| Size | Padding | Font-size | Font-weight |
|---|---|---|---|
| `default` | `px-md py-[12px]` (24/12) | `text-body` (16px) | SemiBold (600) |
| `xl` | `px-lg py-sm` (32/16) | `text-body-lg` (18px) | SemiBold (600) |

Autres règles:
- `rounded-sm` (1px)
- `transition-all duration-[var(--dur-fast)] ease-out`
- `active:scale-[0.98]` (feedback tactile)
- `focus-visible:outline-2 outline-fg outline-offset-2`
- Disabled: `bg-disabled-bg text-disabled-fg cursor-not-allowed pointer-events-none`
- Brand: **un seul bouton brand par page max**.

> **Pas de prop `invert`.** Si un bouton doit apparaître sur fond invert (bande noire), utiliser le variant `outline` qui s'adapte via le contexte couleur, ou créer une variante dédiée le moment venu.

### 9.2 Tag

Métadonnée non-interactive (rôle, durée, secteur, technologie).

- Font: `text-tag` (12px), `font-medium` (500), `font-body` (Manrope)
- Casse: normale (pas d'uppercase)
- Tracking: normal (pas de letter-spacing custom)
- Couleurs: `text-text-secondary` sur `bg-surface`
- Padding: `px-[10px] py-[6px]`
- Radius: `rounded-md` (8px)
- Pas d'état hover (non-interactif)

### 9.3 Hover patterns

Un seul pattern de hover dans le projet pour les cards de projet:

**`.hover-subtle`** — fond passe à `bg-surface` au hover.

```css
.hover-subtle {
  transition: background-color var(--dur-base) var(--ease-default);
}
@media (hover: hover) {
  .hover-subtle:hover {
    background-color: var(--sem-surface);
  }
}
```

> Usage uniquement sur les cards/lignes de projet. Pour les liens et boutons, voir [9.5](#95-liens-ghost) et [9.1](#91-button).

### 9.4 Séparateurs

`1px solid var(--sem-border)`. Utilitaire: `border-border`. Aucun autre style de séparateur.

### 9.5 Liens (ghost)

**Un seul style de lien dans le portfolio.**

- Couleur au repos: `text-text-secondary`
- Couleur au hover: `text-text-primary`
- Pas de soulignement
- Transition: `transition-colors duration-[var(--dur-fast)] ease-out`
- Hover gardé par `hover-supported:` (custom variant)

```html
<a class="text-text-secondary transition-colors duration-[var(--dur-fast)] ease-out hover-supported:text-text-primary">
  Mon lien
</a>
```

> **Liens externes** (Calendly, sites tiers): ouvrir dans un nouvel onglet avec `target="_blank" rel="noopener noreferrer"`.

### 9.6 Focus

Outline globale pour `a:focus-visible` et `button:focus-visible`:

```css
a:focus-visible, button:focus-visible {
  outline: 2px solid var(--sem-fg);
  outline-offset: 2px;
}
```

### 9.7 Toggle dark mode

- Position: dans la nav (desktop) et dans le menu burger (mobile)
- Icône: SVG inline 20×20px (soleil en dark mode, lune en light mode)
- Padding minimum: respecter le touch target 44×44px (utiliser `p-sm` au minimum, `min-h-11 min-w-11` si l'icône est seule)
- Hover: `text-text-primary` → `text-text-secondary` (subtil)
- Aria-label: dynamique en anglais (cohérent avec `lang="en"`)
  - Mode courant light: `"Switch to dark mode"`
  - Mode courant dark: `"Switch to light mode"`
- Persistance: `localStorage.theme = "light" | "dark"`
- Anti-FOUC: script bloquant injecté dans `<head>` via `dangerouslySetInnerHTML` (voir layout.tsx)

---

## 10. Dark mode

### 10.1 Activation

- Classe `dark` posée sur `<html>` (Tailwind v4 standard)
- Préférence utilisateur respectée: `prefers-color-scheme: dark` au premier visit
- Toggle utilisateur stocké dans `localStorage.theme`
- Script anti-FOUC dans `<head>` pour appliquer la classe avant l'hydratation React

### 10.2 Règles

- Tout token sémantique a une valeur en light ET en dark.
- Les composants ne référencent **jamais** une couleur Zinc directement (`bg-zinc-900` interdit). Utiliser les tokens (`bg-text-primary`, `bg-invert-bg`).
- Les images dans les cards de projet peuvent passer `grayscale(1) → grayscale(0)` au hover via `.hover-invert img` (pattern défini mais usage à valider — non utilisé dans le code actuel).

---

## 11. Accessibilité

- **Contraste**: WCAG AA minimum (ratio ≥ 4.5:1 pour le texte courant, 3:1 pour le texte ≥18px). Les tokens `text-tertiary` et `accent-text` sont à utiliser avec parcimonie sur fond clair (à vérifier au cas par cas).
- **Focus visible**: outline 2px sur tous les interactifs (a, button), via le sélecteur global `:focus-visible`.
- **Touch targets**: minimum 44×44px sur tous les éléments interactifs sans label visible (icônes seules: nav burger, dark toggle, social icons).
- **Skip-to-content**: lien `Skip to content` invisible sauf au focus, à la racine du `<body>`.
- **Reduced motion**: respecté globalement (cf. [7.2](#72-reduced-motion)).
- **`lang`**: `<html lang="en">` (contenu en anglais). Si bilingue plus tard, basculer via `next-intl` ou équivalent.
- **Sémantique HTML**: `<button>` pour les actions, `<a>` pour la navigation, headings hiérarchiques (h1 unique par page).

---

## 12. Implémentation

### 12.1 Bloc CSS canonique (Tailwind v4)

À copier dans `app/globals.css`. C'est l'**état cible** — le code actuel sera aligné dans le PR `refactor/ds-code-alignment`.

```css
@import "tailwindcss";

/* ============================================
   DESIGN TOKENS — Source: docs/DESIGN_SYSTEM.md
   ============================================ */

/* --- Light mode (default) --- */
:root {
  /* Texte */
  --sem-text-primary: #18181b;
  --sem-text-secondary: #71717b;
  --sem-text-tertiary: #9f9fa9;
  --sem-fg: #18181b; /* alias technique pour body color + focus outline */

  /* Backgrounds & borders */
  --sem-bg: #fafafa;
  --sem-surface: #f4f4f5;
  --sem-border: #e4e4e7;
  --sem-border-strong: #d4d4d8;
  --sem-invert-bg: #18181b;
  --sem-invert-fg: #fafafa;

  /* Bouton primary */
  --sem-btn-primary: #1e1e21;
  --sem-btn-primary-hover: #09090b;
  --sem-btn-primary-fg: #fafafa;

  /* Disabled */
  --sem-disabled-bg: #e4e4e7;
  --sem-disabled-fg: #9f9fa9;

  /* Accent */
  --sem-accent: #0A4CF0;
  --sem-accent-hover: #0839b8;
  --sem-accent-text: #0A4CF0;
  --sem-accent-muted: #3670f5;
  --sem-accent-subtle: #d4e3ff;

  /* Spacing — base 8px */
  --sem-space-xs: 8px;
  --sem-space-sm: 16px;
  --sem-space-md: 24px;
  --sem-space-lg: 32px;
  --sem-space-xl: 48px;
  --sem-space-2xl: 64px;
  --sem-space-xl2: 72px;
  --sem-space-3xl: 96px;
  --sem-space-4xl: 128px;

  /* Radius */
  --sem-radius-none: 0px;
  --sem-radius-sm: 1px;
  --sem-radius-pill: 3px;
  --sem-radius-md: 8px;
  --sem-radius-frame-browser: 6px;
  --sem-radius-frame-iphone: 16px;

  /* Ombres */
  --sem-shadow-mockup: 0 2px 8px rgba(0, 0, 0, 0.06);

  /* Motion */
  --dur-fast: 150ms;
  --dur-base: 300ms;
  --dur-slow: 400ms;
  --ease-default: ease-out;

  /* Typographie — sizes desktop */
  --sem-text-hero: 56px;
  --sem-text-h1: 48px;
  --sem-text-h2: 32px;
  --sem-text-h3: 24px;
  --sem-text-h4: 18px;
  --sem-text-body-lg: 18px;
  --sem-text-body: 16px;
  --sem-text-body-sm: 14px;
  --sem-text-label: 14px;
  --sem-text-tag: 12px;

  /* Leading */
  --sem-leading-hero: 0.92;
  --sem-leading-h1: 1.1;
  --sem-leading-h2: 1.2;
  --sem-leading-h3: 1.3;
  --sem-leading-h4: 1.3;
  --sem-leading-body: 1.65;
  --sem-leading-body-sm: 1.5;
  --sem-leading-tag: 16px;

  /* Tracking */
  --sem-tracking-hero: -0.03em;
  --sem-tracking-h1: -0.02em;
  --sem-tracking-h2: -0.02em;
  --sem-tracking-h3: -0.01em;
  --sem-tracking-h4: -0.02em;
  --sem-tracking-label: 0.08em;
}

/* --- Responsive — Tablet --- */
@media (max-width: 1024px) {
  :root {
    --sem-text-hero: 48px;
    --sem-text-h1: 40px;
    --sem-text-h2: 28px;
    --sem-text-h3: 22px;
  }
}

/* --- Responsive — Mobile --- */
@media (max-width: 767px) {
  :root {
    --sem-text-hero: 40px;
    --sem-text-h1: 36px;
    --sem-text-h2: 24px;
    --sem-text-h3: 20px;
    --sem-text-body-lg: 16px;
  }
}

/* --- Dark mode --- */
.dark {
  --sem-text-primary: #e4e4e7;
  --sem-text-secondary: #9f9fa9;
  --sem-text-tertiary: #71717b;
  --sem-fg: #e4e4e7;

  --sem-bg: #09090b;
  --sem-surface: #27272a;
  --sem-border: #3f3f47;
  --sem-border-strong: #52525c;
  --sem-invert-bg: #fafafa;
  --sem-invert-fg: #18181b;

  --sem-btn-primary: #ececee;
  --sem-btn-primary-hover: #fafafa;
  --sem-btn-primary-fg: #09090b;

  --sem-disabled-bg: #3f3f47;
  --sem-disabled-fg: #52525c;

  --sem-accent-text: #6d9dfa;
  /* Accent: autres valeurs identiques light/dark */
}

@media (prefers-color-scheme: dark) {
  :root:not(.light) {
    /* Mêmes valeurs que .dark — voir bloc ci-dessus */
  }
}

/* --- Tailwind v4 theme registration --- */
@theme inline {
  /* Couleurs */
  --color-bg: var(--sem-bg);
  --color-text-primary: var(--sem-text-primary);
  --color-text-secondary: var(--sem-text-secondary);
  --color-text-tertiary: var(--sem-text-tertiary);
  --color-surface: var(--sem-surface);
  --color-border: var(--sem-border);
  --color-border-strong: var(--sem-border-strong);
  --color-invert-bg: var(--sem-invert-bg);
  --color-invert-fg: var(--sem-invert-fg);
  --color-btn-primary: var(--sem-btn-primary);
  --color-btn-primary-hover: var(--sem-btn-primary-hover);
  --color-btn-primary-fg: var(--sem-btn-primary-fg);
  --color-disabled-bg: var(--sem-disabled-bg);
  --color-disabled-fg: var(--sem-disabled-fg);
  --color-accent: var(--sem-accent);
  --color-accent-hover: var(--sem-accent-hover);
  --color-accent-text: var(--sem-accent-text);
  --color-accent-muted: var(--sem-accent-muted);
  --color-accent-subtle: var(--sem-accent-subtle);
  --color-fg: var(--sem-fg); /* alias technique */

  /* Spacing */
  --spacing-xs: var(--sem-space-xs);
  --spacing-sm: var(--sem-space-sm);
  --spacing-md: var(--sem-space-md);
  --spacing-lg: var(--sem-space-lg);
  --spacing-xl: var(--sem-space-xl);
  --spacing-2xl: var(--sem-space-2xl);
  --spacing-xl2: var(--sem-space-xl2);
  --spacing-3xl: var(--sem-space-3xl);
  --spacing-4xl: var(--sem-space-4xl);

  /* Radius */
  --radius-none: var(--sem-radius-none);
  --radius-sm: var(--sem-radius-sm);
  --radius-pill: var(--sem-radius-pill);
  --radius-md: var(--sem-radius-md);

  /* Fonts */
  --font-display: var(--font-space-grotesk);
  --font-body: var(--font-manrope);

  /* Typo sizes + leading */
  --text-hero: var(--sem-text-hero);
  --text-hero--line-height: var(--sem-leading-hero);
  --text-h1: var(--sem-text-h1);
  --text-h1--line-height: var(--sem-leading-h1);
  --text-h2: var(--sem-text-h2);
  --text-h2--line-height: var(--sem-leading-h2);
  --text-h3: var(--sem-text-h3);
  --text-h3--line-height: var(--sem-leading-h3);
  --text-h4: var(--sem-text-h4);
  --text-h4--line-height: var(--sem-leading-h4);
  --text-body-lg: var(--sem-text-body-lg);
  --text-body-lg--line-height: var(--sem-leading-body);
  --text-body: var(--sem-text-body);
  --text-body--line-height: var(--sem-leading-body);
  --text-body-sm: var(--sem-text-body-sm);
  --text-body-sm--line-height: var(--sem-leading-body-sm);
  --text-label: var(--sem-text-label);
  --text-label--line-height: var(--sem-leading-body-sm);
  --text-tag: var(--sem-text-tag);
  --text-tag--line-height: var(--sem-leading-tag);

  /* Tracking */
  --tracking-hero: var(--sem-tracking-hero);
  --tracking-h1: var(--sem-tracking-h1);
  --tracking-h2: var(--sem-tracking-h2);
  --tracking-h3: var(--sem-tracking-h3);
  --tracking-h4: var(--sem-tracking-h4);
  --tracking-label: var(--sem-tracking-label);
}

/* --- Custom variant: hover réservé aux pointeurs --- */
@custom-variant hover-supported (@media (hover: hover) { &:hover; });

/* --- Reduced motion --- */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 0ms !important;
    animation-duration: 0ms !important;
  }
  img, video { filter: none !important; }
}

/* --- Focus globale --- */
a:focus-visible,
button:focus-visible {
  outline: 2px solid var(--sem-fg);
  outline-offset: 2px;
}

/* --- Hover subtle (cards de projet) --- */
.hover-subtle {
  transition: background-color var(--dur-base) var(--ease-default);
}
@media (hover: hover) {
  .hover-subtle:hover {
    background-color: var(--sem-surface);
  }
}

/* --- Base styles --- */
body {
  background-color: var(--sem-bg);
  color: var(--sem-fg);
  font-family: var(--font-body), sans-serif;
}
```

### 12.2 Règles d'utilisation dans les composants

- **Tokens uniquement.** Aucune valeur Zinc/HEX/PX hardcodée.
  - ❌ `bg-zinc-900`, `border-[#e4e4e7]`, `px-[24px]`
  - ✅ `bg-text-primary`, `border-border`, `px-md`
- **Hover via custom variant.**
  - ❌ `hover:bg-surface`
  - ❌ `[@media(hover:hover){&:hover}]:bg-surface`
  - ✅ `hover-supported:bg-surface`
- **Liens externes.** Toujours `target="_blank" rel="noopener noreferrer"`.
- **Composer avec `cn()`.** Utiliser le helper `lib/cn.ts` (clsx + tailwind-merge configuré pour les classes custom `text-{hero,h1,h2,...}`).

### 12.3 Mapping spec ↔ utilitaires Tailwind

| Concept | Token CSS | Utilitaire Tailwind |
|---|---|---|
| Texte primaire | `--sem-text-primary` | `text-text-primary` |
| Fond surface | `--sem-surface` | `bg-surface` |
| Padding moyen | `--sem-space-md` | `p-md`, `px-md`, `py-md`, `gap-md` |
| Titre H2 | `--sem-text-h2` + `--sem-leading-h2` + `--sem-tracking-h2` | `text-h2 leading-h2 tracking-h2` |
| Border par défaut | `--sem-border` | `border-border` |
| Durée fast | `--dur-fast` | `duration-[var(--dur-fast)]` |

---

## Annexe A — Décisions consignées

Issues de l'audit code↔spec de mai 2026 (cf. branche `docs/design-system`):

| # | Sujet | Décision |
|---|---|---|
| A1 | Token accent en dark | Renommé `--sem-accent-text` (vs spec `--color-accent-on-dark`) |
| A4 | `--sem-surface-raised` | Retiré (jamais utilisé dans les composants) |
| B1 | `text-tag` font-size | 12px (vs spec 11px) |
| B2 | `--sem-tracking-label` | 0.08em (spec wins, vs code 0.07em) |
| B7-B9 | Style des tags | Medium + casse normale + pas de tracking custom (chips éditoriaux) |
| C1 | `--sem-space-xl2: 72px` | Ajouté (utilisé par les featured cards) |
| C2 | `--sem-radius-md: 8px` | Officialisé (override Tailwind 6px → 8px) |
| C3 | Tag radius | `rounded-md` (8px) au lieu de `rounded-pill` (3px) |
| D1 | Ombres | Règle "aucune ombre" assouplie: exception pour mockup frames |
| D2 | `--sem-shadow-mockup` | Token créé pour browser/iphone frames |
| F1 | Button — nombre de tailles | 2 tailles (`default` + `xl`) |
| F2 | Button default font-size | 16px (text-body) |
| F3 | Prop `invert` du Button | Retirée (jamais utilisée + mapping inversé) |
| F4 | Pattern `.hover-invert` | Retiré (jamais utilisé) |
| F5 | Liens inline avec underline | Retirés du DS (un seul style: ghost) |
| G1 | Bandes invert | Pattern réel décrit: cadre noir autour de carte surface |
| H1-H3 | Sections "déférés", "QA", "références visuelles" | Supprimées (obsolètes) |

---

## Annexe B — Évolutions futures

Items non incluses ici, à intégrer si besoin:
- Tokens d'icônes (taille standard, stroke-width, color-current pattern)
- Tokens de form inputs (height, padding, border, focus state)
- Tokens de modals/overlays
- Animation tokens nommés (slide-in, fade-in) si framer-motion réintroduit

---

*Dernière mise à jour: mai 2026 — branche `docs/design-system`*
