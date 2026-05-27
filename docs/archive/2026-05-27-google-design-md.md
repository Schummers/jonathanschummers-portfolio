---
name: Blueprint Portfolio
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#434656'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#747688'
  outline-variant: '#c4c5d9'
  surface-tint: '#064bef'
  primary: '#0038bc'
  on-primary: '#ffffff'
  primary-container: '#0a4cf0'
  on-primary-container: '#d2d8ff'
  inverse-primary: '#b8c4ff'
  secondary: '#5f5e61'
  on-secondary: '#ffffff'
  secondary-container: '#e4e1e6'
  on-secondary-container: '#656467'
  tertiary: '#474750'
  on-tertiary: '#ffffff'
  tertiary-container: '#5f5f68'
  on-tertiary-container: '#dbd9e5'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b8c4ff'
  on-primary-fixed: '#001453'
  on-primary-fixed-variant: '#0037b9'
  secondary-fixed: '#e4e1e6'
  secondary-fixed-dim: '#c8c5ca'
  on-secondary-fixed: '#1b1b1e'
  on-secondary-fixed-variant: '#47464a'
  tertiary-fixed: '#e3e1ed'
  tertiary-fixed-dim: '#c6c5d0'
  on-tertiary-fixed: '#1a1b23'
  on-tertiary-fixed-variant: '#46464f'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-hero:
    fontFamily: Space Grotesk
    fontSize: 56px
    fontWeight: '700'
    lineHeight: '0.92'
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '0.92'
    letterSpacing: -0.03em
  headline-h1:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-h2:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-h3:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.65'
  body-base:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.65'
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.5'
    letterSpacing: 0.08em
  tag:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
spacing:
  xs: 8px
  sm: 16px
  md: 24px
  lg: 32px
  xl: 48px
  2xl: 64px
  3xl: 96px
  4xl: 128px
  max-width: 1400px
  prose-max: 640px
  case-center: 864px
---

## Brand & Style

The visual identity is defined by **structural sobriety** and **architectural rigor**. It mimics the aesthetic of a high-fidelity technical blueprint—precise, analytical, and intentionally disciplined. The system rejects the "softness" of modern consumer web design (heavy shadows, pill shapes) in favor of a raw, unrefined elegance characterized by:

- **Structural Borders:** 1px lines define every boundary, creating a clear vertical and horizontal "rail" system.
- **Blueprint Logic:** Layouts prioritize alignment and division over depth. Vertical lines act as architectural guides.
- **High-Voltage Contrast:** A monochromatic Zinc foundation is punctuated by a singular, high-intensity **Electric Blue (#0A4CF0)**. This blue is used with extreme restraint, acting as a functional laser to steer focus.
- **Modern Minimalism:** Clean, heavy use of whitespace based on a strict 8px grid, ensuring every element has breathing room to be analyzed.

## Colors

The system uses a **Zinc-based palette** that maintains perfect visual hierarchy across Light and Dark modes. 

- **Canvas:** The background is a "paper" gray (`#fafafa`) or "deep space" black (`#09090b`).
- **Interactive:** Electric Blue is the primary action color. In Dark mode, the text variant of this blue shifts to a lighter tone (`#6d9dfa`) to ensure AAA legibility.
- **Inversion:** Inverted sections (e.g., testimonials) flip the primary background and text tokens to create high-impact editorial bands.
- **Borders:** Borders are the primary tool for separation. Use `--sem-border` for standard layout lines and `--sem-border-strong` for higher contrast elements or interactive outlines.

## Typography

This system pairs **Space Grotesk** (Technical/Geometric) with **Manrope** (Warm/Readable).

- **Headlines:** Set tightly with negative letter spacing to create a compact, structured feel. High-level headers (Hero, H1) should feel massive and architectural.
- **Labels:** Uppercase labels use wide letter spacing (0.08em) to ensure clarity and provide a rhythmic, "cataloged" look to meta-information.
- **Body:** Manrope is used for all long-form text, using a relaxed 1.65 line height to contrast against the tight headlines.
- **Responsive:** Headlines scale down aggressively on mobile (Hero 56px → 40px) to prevent awkward wrapping while maintaining impact.

## Layout & Spacing

The layout is a **Blueprint Shell** characterized by:
- **Vertical Rails:** Content is wrapped in a 1400px container with permanent 1px left and right borders.
- **Responsive Padding:** Side gutters scale with viewport (Mobile: 24px, Tablet: 32px, Desktop: 48px).
- **Prose Constraint:** Narrative text is centered within a 864px rail but restricted to a 640px line length to optimize reading speed and focus.
- **8px Grid:** All spacing must snap to the 8px base unit. Section separators are typically `4xl` (128px) to create distinct visual phases.

## Elevation & Depth

This system avoids ambient shadows in favor of **Tonal Layers** and **1px Borders**.

- **No Shadows:** Shadows are strictly prohibited on UI components. The only exception is realistic mockup frames (iPhone/Browser) to denote physical depth within the case study.
- **Tonal Hover:** Depth is communicated through color shifts. On hover, project cards change background from `transparent` to `surface` (`#f4f4f5`).
- **Glassmorphism:** The sticky navigation uses a subtle frosted glass effect (`bg-bg/95 backdrop-blur-sm`) to maintain context while scrolling without breaking the flat blueprint aesthetic.

## Shapes

The shape language is primarily **Sharp**, emphasizing the technical nature of the portfolio.

- **Standard Buttons:** Use `rounded-sm` (1px) for an almost perfectly sharp corner.
- **Tags & Chips:** Use `rounded-md` (8px). This is the only "soft" element in the system, providing a visual distinction between interactive buttons and static metadata tags.
- **Mockup Frames:** Browser mockups use `6px` and iPhone frames use `16px` to maintain realism.

## Components

### Buttons
- **Primary:** Zinc-900 fill, sharp corners (1px), white text.
- **Brand:** Electric Blue fill, restricted to one per page.
- **Outline:** 1px `border-strong` with transparent background.
- **Interaction:** Custom `active:scale-[0.98]` tactile shrink on all buttons.

### Project Cards
- **Structure:** Horizontal 2-column grid on desktop. Left column contains metadata and labels; right column contains the mockup.
- **Hover:** Entire card highlights with `bg-surface`. Mockup images trigger a slow vertical scroll animation to reveal full layout depth.

### Tags & Chips
- **Style:** Small text (12px), Medium weight, `bg-surface`, 8px rounded corners.
- **Exception:** Spacing uses 10px horizontal padding—an intentional break from the 8px grid for optimal visual balance inside the chip.

### Editorial Bullet Lists
- **Indicator:** 5px solid circular bullet (`text-secondary`).
- **Alignment:** Offset 0.65em from top to align with the cap-height of Manrope text.
- **Gutter:** 24px left-padding for the list body.

### Navigation
- **Header:** Sticky, 64px height, frosted background, 1px bottom border.
- **Links:** 14px SemiBold, secondary color, changing to primary on hover. No underlines.
