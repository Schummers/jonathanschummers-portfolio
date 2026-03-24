# Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete homepage (Nav, Hero, Projects, Testimonials, About, CTA, Footer) as defined in `docs/superpowers/specs/2026-03-24-homepage-design.md`.

**Architecture:** Single-page homepage composed of section components rendered inside the existing `BlueprintShell`. Each section is its own file. Project data lives in a typed data file. Nav is a client component (hamburger state). All other sections are server components. Existing design system components (`Button`, `Tag`, `Section`, `DarkModeToggle`) are reused as-is.

**Tech Stack:** Next.js 16, Tailwind CSS v4, React 19, `next/image`, `next/font/google` (already configured)

**Spec:** `docs/superpowers/specs/2026-03-24-homepage-design.md`
**Design System:** `docs/superpowers/specs/2026-03-20-design-system-design.md`

---

## File Structure

```
lib/
├── data.ts                         ← CREATE: project data (titles, descriptions, metrics, tags, images, slugs)

components/
├── nav.tsx                         ← CREATE: sticky nav with hamburger mobile menu ('use client')
├── hero.tsx                        ← CREATE: hero section (copy + photo)
├── project-card-featured.tsx       ← CREATE: featured project card (image + text + metric + tags)
├── project-card-compact.tsx        ← CREATE: compact project row (text only + metric + tags)
├── projects-featured.tsx           ← CREATE: section wrapper for 3 featured projects
├── projects-compact.tsx            ← CREATE: section wrapper for 3 compact projects + "See all"
├── testimonials.tsx                ← CREATE: inverted section with quote
├── about.tsx                       ← CREATE: 2-column about (parcours + passion)
├── cta-final.tsx                   ← CREATE: final CTA section
├── footer.tsx                      ← CREATE: footer with nav links + socials
├── icons.tsx                       ← CREATE: SVG icon components (LinkedIn, GitHub, Menu, X)
├── blueprint-shell.tsx             ← MODIFY: add id prop forwarding for anchor navigation
├── button.tsx                      ← EXISTS: no changes
├── tag.tsx                         ← EXISTS: no changes
├── dark-mode-toggle.tsx            ← EXISTS: no changes

app/
├── globals.css                     ← MODIFY: add .hover-subtle utility class for project cards
├── layout.tsx                      ← MODIFY: update lang to "en", update metadata description
├── page.tsx                        ← MODIFY: replace design system demo with real homepage
```

---

## Task 1: Project Data File

**Files:**
- Create: `lib/data.ts`

- [ ] **Step 1: Create `lib/data.ts`**

```ts
export interface Project {
  slug: string;
  title: string;
  description?: string;
  metric: string;
  tags: string[];
  image?: string;
  type: "featured" | "compact";
}

export const projects: Project[] = [
  {
    slug: "nod",
    title:
      "Revamping a power plant monitoring SaaS to increase kWh tracked per operator by 23%",
    description:
      "Redesigned the app in dark mode — new diagnostic dashboard for production loss, integrated alerting system, and automated reporting for plant business owners, saving operators 3x30 min per day.",
    metric: "+23% kWh/operator",
    tags: ["Product Design", "Dark Mode", "TotalEnergies Digital Factory"],
    image: "/images/Hero/NOD.webp",
    type: "featured",
  },
  {
    slug: "valoris",
    title:
      "Designing and building a rental management SaaS for Luxembourg legal compliance",
    description:
      "Solo-built property management platform automating legal documentation — tax declarations, rent control tracking, and resale reporting. OCR-powered document processing that auto-fills ~72% of required fields for tax filings.",
    metric: "~72% of tax fields automated",
    tags: ["Product Builder", "Cursor / Claude Code", "Entrepreneurship"],
    image: undefined,
    type: "featured",
  },
  {
    slug: "bforbank",
    title:
      "Designing the onboarding flow that ranked #1 on Google's UX Benchmark 2023",
    description:
      "Built a fully compliant banking onboarding for BforBank's complete app relaunch — meeting all KYC, security, and regulatory constraints while achieving a full account opening in under 10 minutes.",
    metric: "#1 Google UX Benchmark 2023",
    tags: ["UX/UI Design", "Mobile Design", "Onboarding Flow"],
    image: "/images/Hero/BFOR.webp",
    type: "featured",
  },
  {
    slug: "spie-bat",
    title:
      "Cut manual data entry on construction sites by redesigning the activity report with 16 field workshops",
    metric: "16 workshops · 12 user tests",
    tags: ["UX Research", "Design Thinking", "ERP Construction"],
    type: "compact",
  },
  {
    slug: "smartintegrity",
    title:
      "Reduced refinery pipe leaks by 6% with a corrosion risk tool deployed to 500 inspectors across 4 sites",
    metric: "-6% leaks · 500 users · 4 sites",
    tags: ["Product Design", "Data", "TotalEnergies Digital Factory"],
    type: "compact",
  },
  {
    slug: "malaama",
    title:
      "Designing and building the website for an NGO empowering girls' education in Mauritania",
    metric: "Just released · April 2026",
    tags: ["Product Builder", "Web Design", "Social Impact"],
    type: "compact",
  },
];
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit lib/data.ts` or just `npm run dev` and check no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/data.ts
git commit -m "feat: add project data file for homepage"
```

---

## Task 2: SVG Icons Component

**Files:**
- Create: `components/icons.tsx`

- [ ] **Step 1: Create `components/icons.tsx`**

Reusable SVG icons for nav, footer, and hamburger. All icons take `className` prop and default to `size={20}`.

```tsx
interface IconProps {
  className?: string;
  size?: number;
}

export function IconLinkedIn({ className, size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function IconGitHub({ className, size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export function IconMenu({ className, size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

export function IconX({ className, size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function IconArrowRight({ className, size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/icons.tsx
git commit -m "feat: add SVG icon components"
```

---

## Task 3: Fix Section Component — Add `id` Prop

**Files:**
- Modify: `components/blueprint-shell.tsx`

The `Section` component needs to forward an `id` prop so anchor navigation (`#work`, `#about`, `#contact`) works. Currently it only accepts `children`, `className`, and `invert`.

- [ ] **Step 1: Update `Section` in `components/blueprint-shell.tsx`**

Add `id` to the props interface and forward it to the `<section>` element:

```tsx
export function Section({
  children,
  className,
  invert = false,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  invert?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "border-b border-border",
        "px-xl py-xl",
        "max-md:px-md",
        "md:max-lg:px-lg",
        invert && "bg-invert-bg text-invert-fg border-border-strong",
        className
      )}
    >
      {children}
    </section>
  );
}
```

- [ ] **Step 2: Verify dev server compiles**

Run: `npm run dev` — no errors expected, existing usage unchanged.

- [ ] **Step 3: Commit**

```bash
git add components/blueprint-shell.tsx
git commit -m "feat: add id prop to Section component for anchor navigation"
```

---

## Task 4: Add Hover Subtle Utility to CSS

**Files:**
- Modify: `app/globals.css`

The homepage project cards use a subtle background hover (surface → zinc-200 / zinc-700) instead of the existing `.hover-invert` pattern.

- [ ] **Step 1: Add `.hover-subtle` class at the end of `app/globals.css`** (before the `body` block)

Add this right before `/* --- Base styles --- */`:

```css
/* --- Subtle hover for project cards (spec: homepage section 11.1) --- */
.hover-subtle {
  transition: background-color var(--dur-base) var(--ease-default);
}
@media (hover: hover) {
  .hover-subtle:hover {
    background-color: var(--sem-border);
  }
}
```

Note: `--sem-border` maps to `zinc-200` in light and `zinc-700` in dark — exactly the spec target for hover.

- [ ] **Step 2: Verify dev server compiles**

Run: `npm run dev` — check no CSS errors.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: add hover-subtle utility for project cards"
```

---

## Task 5: Nav Component

**Files:**
- Create: `components/nav.tsx`

- [ ] **Step 1: Create `components/nav.tsx`**

```tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { DarkModeToggle } from "@/components/dark-mode-toggle";
import { IconMenu, IconX } from "@/components/icons";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className={cn(
        "sticky top-0 z-50",
        "border-b border-border",
        "bg-bg/95 backdrop-blur-sm"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between border-x border-border px-xl max-md:px-md md:max-lg:px-lg">
        {/* Logo */}
        <a
          href="#"
          className="font-display text-[16px] font-bold tracking-[-0.02em]"
        >
          Jonathan S.
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-lg md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-[14px] font-semibold text-fg transition-colors duration-[var(--dur-fast)] ease-out [@media(hover:hover){&:hover}]:text-muted"
            >
              {link.label}
            </a>
          ))}
          <DarkModeToggle />
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-sm md:hidden">
          <DarkModeToggle />
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="p-xs text-fg"
          >
            {open ? <IconX /> : <IconMenu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-b border-border bg-bg md:hidden">
          <div className="mx-auto max-w-[1400px] border-x border-border px-xl py-lg max-md:px-md">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-sm font-body text-[16px] font-semibold text-fg"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npm run dev` — no errors expected (component not rendered yet).

- [ ] **Step 3: Commit**

```bash
git add components/nav.tsx
git commit -m "feat: add sticky Nav component with hamburger mobile menu"
```

---

## Task 6: Hero Section

**Files:**
- Create: `components/hero.tsx`

- [ ] **Step 1: Create `components/hero.tsx`**

```tsx
import Image from "next/image";
import { Section } from "@/components/blueprint-shell";
import { Button } from "@/components/button";

export function Hero() {
  return (
    <Section className="!py-3xl max-md:!py-xl">
      <div className="grid gap-xl md:grid-cols-2 md:items-center">
        {/* Copy */}
        <div>
          <h1 className="font-display text-[clamp(48px,8vw,96px)] font-bold uppercase leading-[0.92] tracking-[-0.03em]">
            Hi, I&apos;m
            <br />
            Jonathan.
          </h1>
          <div className="mt-lg max-w-[520px]">
            <p className="font-body text-[15px] leading-[1.65]">
              Senior Product Designer with a builder mindset. I research,
              design, and code.
            </p>
            <p className="mt-sm font-body text-[15px] leading-[1.65]">
              What drives me: solving hard problems, shipping fast, and
              iterating until it works.
            </p>
            <p className="mt-sm font-body text-[15px] leading-[1.65]">
              I focus on real estate and fintech startups — the industries
              I&apos;m passionate about and the ones I understand best.
            </p>
            <p className="mt-sm font-body text-[14px] leading-[1.65] text-muted">
              Based in Luxembourg, working remotely.
            </p>
          </div>
          <div className="mt-lg">
            <Button href="#contact">Get in touch</Button>
          </div>
        </div>

        {/* Photo */}
        <div className="flex justify-center md:justify-end">
          <Image
            src="/images/Hero/Moi.webp"
            alt="Jonathan Schummers"
            width={480}
            height={580}
            className="object-cover"
            priority
          />
        </div>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/hero.tsx
git commit -m "feat: add Hero section component"
```

---

## Task 7: Project Cards (Featured + Compact)

**Files:**
- Create: `components/project-card-featured.tsx`
- Create: `components/project-card-compact.tsx`

- [ ] **Step 1: Create `components/project-card-featured.tsx`**

```tsx
import Image from "next/image";
import { Tag } from "@/components/tag";
import type { Project } from "@/lib/data";

export function ProjectCardFeatured({ project }: { project: Project }) {
  return (
    <a
      href={`/work/${project.slug}`}
      className="hover-subtle block border-b border-border px-xl py-xl max-md:px-md md:max-lg:px-lg"
    >
      <div className="grid gap-lg md:grid-cols-2 md:items-center">
        {/* Text */}
        <div>
          <h3 className="font-display text-[clamp(18px,2vw,20px)] font-bold tracking-[-0.01em] leading-[1.3]">
            {project.title}
          </h3>
          {project.description && (
            <p className="mt-sm font-body text-[15px] leading-[1.65] text-muted max-w-[500px]">
              {project.description}
            </p>
          )}
          <p className="mt-md font-display text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em] leading-[1]">
            {project.metric}
          </p>
          <div className="mt-md flex flex-wrap gap-xs">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>

        {/* Image */}
        {project.image && (
          <div className="flex justify-center md:justify-end">
            <Image
              src={project.image}
              alt={project.slug}
              width={560}
              height={380}
              className="object-cover"
            />
          </div>
        )}
      </div>
    </a>
  );
}
```

- [ ] **Step 2: Create `components/project-card-compact.tsx`**

```tsx
import { Tag } from "@/components/tag";
import type { Project } from "@/lib/data";

export function ProjectCardCompact({ project }: { project: Project }) {
  return (
    <a
      href={`/work/${project.slug}`}
      className="hover-subtle flex flex-col gap-sm border-b border-border px-xl py-lg max-md:px-md md:max-lg:px-lg md:flex-row md:items-center md:justify-between"
    >
      <div className="flex-1">
        <h3 className="font-display text-[clamp(16px,1.5vw,18px)] font-bold tracking-[-0.01em] leading-[1.3]">
          {project.title}
        </h3>
        <div className="mt-xs flex flex-wrap gap-xs">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
      <p className="font-display text-[16px] font-bold tracking-[-0.02em] text-muted whitespace-nowrap md:text-right">
        {project.metric}
      </p>
    </a>
  );
}
```

- [ ] **Step 3: Verify they compile**

Run: `npm run dev` — no errors expected.

- [ ] **Step 4: Commit**

```bash
git add components/project-card-featured.tsx components/project-card-compact.tsx
git commit -m "feat: add ProjectCardFeatured and ProjectCardCompact components"
```

---

## Task 8: Projects Section Wrappers

**Files:**
- Create: `components/projects-featured.tsx`
- Create: `components/projects-compact.tsx`

- [ ] **Step 1: Create `components/projects-featured.tsx`**

```tsx
import { projects } from "@/lib/data";
import { ProjectCardFeatured } from "@/components/project-card-featured";

export function ProjectsFeatured() {
  const featured = projects.filter((p) => p.type === "featured");

  return (
    <section id="work">
      {featured.map((project) => (
        <ProjectCardFeatured key={project.slug} project={project} />
      ))}
    </section>
  );
}
```

- [ ] **Step 2: Create `components/projects-compact.tsx`**

```tsx
import { projects } from "@/lib/data";
import { ProjectCardCompact } from "@/components/project-card-compact";
import { IconArrowRight } from "@/components/icons";

export function ProjectsCompact() {
  const compact = projects.filter((p) => p.type === "compact");

  return (
    <section>
      {compact.map((project) => (
        <ProjectCardCompact key={project.slug} project={project} />
      ))}
      <div className="px-xl py-lg max-md:px-md md:max-lg:px-lg">
        <a
          href="#"
          className="inline-flex items-center gap-xs font-body text-[14px] font-semibold text-fg transition-colors duration-[var(--dur-fast)] ease-out [@media(hover:hover){&:hover}]:text-muted"
        >
          See all projects
          <IconArrowRight size={14} />
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/projects-featured.tsx components/projects-compact.tsx
git commit -m "feat: add ProjectsFeatured and ProjectsCompact section wrappers"
```

---

## Task 9: Testimonials Section

**Files:**
- Create: `components/testimonials.tsx`

- [ ] **Step 1: Create `components/testimonials.tsx`**

```tsx
import { Section } from "@/components/blueprint-shell";

export function Testimonials() {
  return (
    <Section invert className="!py-3xl max-md:!py-xl">
      <blockquote className="max-w-[800px]">
        <p className="font-body text-[15px] leading-[1.8] italic">
          &ldquo;J&apos;ai eu le plaisir de travailler avec Jonathan dans le
          cadre de mes fonctions de Lead Design Ops chez TotalEnergies. En tant
          que Product Designer, tu as démontré ton autonomie sur plusieurs sujets
          d&apos;une grande complexité technique et stratégique en framing et en
          build et tu t&apos;es toujours très bien intégré au sein de tes
          squads. Tu es aussi capable de t&apos;adapter à différents contextes
          opérationnels. Tu es un collaborateur appliqué, impliqué et à
          l&apos;écoute des feedbacks. En tant que membre du Design Studio (20
          designers), tu as toujours été présent dans nos rituels d&apos;équipe
          et ton caractère jovial et les questions que tu posais participaient
          grandement à la dynamique d&apos;équipe. Tu as également pris très au
          sérieux ton rôle de mentor auprès de consultants plus juniors. Pour
          moi tu as toutes les qualités requises pour poursuivre une belle
          carrière ! Je te souhaite le meilleur pour la suite :)&rdquo;
        </p>
        <footer className="mt-lg">
          <p className="font-display text-[16px] font-bold">
            Sandie Blanchaud
          </p>
          <p className="font-body text-[13px] text-invert-fg/60">
            Lead Design Ops @ TotalEnergies (The Digital Factory)
          </p>
        </footer>
      </blockquote>
    </Section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/testimonials.tsx
git commit -m "feat: add Testimonials section component"
```

---

## Task 10: About Section

**Files:**
- Create: `components/about.tsx`

- [ ] **Step 1: Create `components/about.tsx`**

```tsx
import Image from "next/image";
import { Section } from "@/components/blueprint-shell";
import { IconArrowRight } from "@/components/icons";

export function About() {
  return (
    <Section id="about" className="!py-3xl max-md:!py-xl">
      <div className="grid gap-xl md:grid-cols-2">
        {/* Left — Parcours */}
        <div>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.08em] text-muted mb-lg">
            About
          </p>
          <div className="max-w-[500px]">
            <p className="font-body text-[15px] leading-[1.65]">
              I started in user research — two master&apos;s degrees, deep in
              methodology and psychology. Then I joined TotalEnergies Digital
              Factory for 3 years, where I worked as Lead Designer in product
              squads building tools from scratch: product vision, first designs,
              user testing, iteration. Always embedded in a product team.
            </p>
            <p className="mt-sm font-body text-[15px] leading-[1.65]">
              Going freelance changed everything. I went all-in on AI — not just
              for design, but for research, product thinking, and development. I
              broadened into product management and started coding what I design.
              At the same time, I began investing in real estate in Luxembourg
              and building my own products.
            </p>
          </div>
          <a
            href="#"
            className="mt-lg inline-flex items-center gap-xs font-body text-[14px] font-semibold text-fg transition-colors duration-[var(--dur-fast)] ease-out [@media(hover:hover){&:hover}]:text-muted"
          >
            More about me
            <IconArrowRight size={14} />
          </a>
        </div>

        {/* Right — Passion */}
        <div>
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.08em] text-muted mb-lg">
            Side project
          </p>
          <div className="max-w-[500px]">
            <p className="font-body text-[15px] leading-[1.65]">
              Outside of work, I&apos;m a cycling obsessive. After 8 years
              playing fantasy cycling with the same group of friends — and 8
              years complaining about every app we tried — I decided to build my
              own.
            </p>
            <p className="mt-sm font-body text-[15px] leading-[1.65]">
              WattHunter is a fantasy cycling game designed for fans who actually
              care about the sport.
            </p>
          </div>
          {/* 2 mobile screenshots — placeholder, images to be provided */}
          <div className="mt-lg flex gap-sm">
            <div className="h-[280px] w-[140px] rounded-pill border border-border bg-surface" />
            <div className="h-[280px] w-[140px] rounded-pill border border-border bg-surface" />
          </div>
        </div>
      </div>
    </Section>
  );
}
```

Note: The WattHunter screenshots use placeholder divs. Replace with `<Image>` once the actual screenshots are provided (see spec section 14).

- [ ] **Step 2: Commit**

```bash
git add components/about.tsx
git commit -m "feat: add About section component with parcours + passion"
```

---

## Task 11: CTA Final Section

**Files:**
- Create: `components/cta-final.tsx`

- [ ] **Step 1: Create `components/cta-final.tsx`**

```tsx
import { Section } from "@/components/blueprint-shell";
import { Button } from "@/components/button";
import { IconLinkedIn } from "@/components/icons";

export function CtaFinal() {
  return (
    <Section id="contact" className="!py-3xl max-md:!py-xl">
      <div className="max-w-[600px]">
        <h2 className="font-display text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em] leading-[1.2]">
          Have a project? Let&apos;s talk.
        </h2>
        <p className="mt-sm font-body text-[14px] text-muted">
          Available for freelance projects starting May 2026
        </p>
        <div className="mt-lg flex flex-wrap items-center gap-md">
          <Button href="#">Book a call</Button>
          <a
            href="mailto:jonathan@example.com"
            className="font-body text-[14px] text-fg underline underline-offset-[3px] transition-colors duration-[var(--dur-fast)] ease-out [@media(hover:hover){&:hover}]:text-muted"
          >
            jonathan@example.com
          </a>
          <a
            href="https://linkedin.com/in/jonathanschummers"
            target="_blank"
            rel="noopener noreferrer"
            className="text-fg transition-colors duration-[var(--dur-fast)] ease-out [@media(hover:hover){&:hover}]:text-muted"
            aria-label="LinkedIn"
          >
            <IconLinkedIn size={18} />
          </a>
        </div>
      </div>
    </Section>
  );
}
```

Note: Replace `href="#"` on "Book a call" with Calendly link when available. Replace `jonathan@example.com` with real email.

- [ ] **Step 2: Commit**

```bash
git add components/cta-final.tsx
git commit -m "feat: add CTA final section component"
```

---

## Task 12: Footer

**Files:**
- Create: `components/footer.tsx`

- [ ] **Step 1: Create `components/footer.tsx`**

```tsx
import { IconLinkedIn, IconGitHub } from "@/components/icons";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-md border-x border-border px-xl py-xl max-md:px-md md:flex-row md:justify-between md:max-lg:px-lg">
        {/* Nav links */}
        <div className="flex gap-lg">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-[13px] font-medium text-muted transition-colors duration-[var(--dur-fast)] ease-out [@media(hover:hover){&:hover}]:text-fg"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Social + copyright */}
        <div className="flex items-center gap-md">
          <a
            href="https://linkedin.com/in/jonathanschummers"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors duration-[var(--dur-fast)] ease-out [@media(hover:hover){&:hover}]:text-fg"
            aria-label="LinkedIn"
          >
            <IconLinkedIn size={16} />
          </a>
          <a
            href="https://github.com/jonathanschummers"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors duration-[var(--dur-fast)] ease-out [@media(hover:hover){&:hover}]:text-fg"
            aria-label="GitHub"
          >
            <IconGitHub size={16} />
          </a>
          <span className="font-body text-[12px] text-faint">
            © 2026 Jonathan Schummers
          </span>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/footer.tsx
git commit -m "feat: add Footer component"
```

---

## Task 13: Assemble Homepage + Update Layout

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update `app/layout.tsx`**

Two changes: `lang="fr"` → `lang="en"`, and update the metadata description to English.

In `app/layout.tsx` line 32, change:
```tsx
      lang="fr"
```
to:
```tsx
      lang="en"
```

In `app/layout.tsx` lines 21-22, change the description:
```tsx
  description:
    "Portfolio de Jonathan Schummers, Product Designer freelance basé à Paris.",
```
to:
```tsx
  description:
    "Jonathan Schummers — Senior Product Designer. Research, design, and code.",
```

- [ ] **Step 2: Replace `app/page.tsx` with the real homepage**

```tsx
import { BlueprintShell } from "@/components/blueprint-shell";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { ProjectsFeatured } from "@/components/projects-featured";
import { ProjectsCompact } from "@/components/projects-compact";
import { Testimonials } from "@/components/testimonials";
import { About } from "@/components/about";
import { CtaFinal } from "@/components/cta-final";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <BlueprintShell>
        <Hero />
        <ProjectsFeatured />
        <ProjectsCompact />
        <Testimonials />
        <About />
        <CtaFinal />
      </BlueprintShell>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Run dev server and verify visually**

Run: `npm run dev`

Check:
- Nav sticky with "Jonathan S." + links + dark mode toggle
- Hero: 2 columns, photo on right, copy on left
- 3 featured projects with images, metrics, tags
- 3 compact projects (text only), "See all projects" link
- Testimonials on black band
- About: 2 columns, parcours left, passion right
- CTA: "Have a project? Let's talk."
- Footer: links + socials + copyright
- Dark mode toggle works across all sections
- Mobile (< 768px): hamburger, sections stack
- Hover on project cards: bg change to zinc-200

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx app/layout.tsx
git commit -m "feat: assemble homepage with all sections"
```

---

## Task 14: Build Check + Cleanup

**Files:**
- No new files — verification only.

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: build succeeds with no errors. Fix any TypeScript or build issues.

- [ ] **Step 2: Delete old reference pages if no longer needed**

The `app/v-ref/` and `app/v15/` directories contain old reference pages. Check with user before deleting.

- [ ] **Step 3: Update roadmap**

In `docs/roadmap.md`, mark étape 3 tasks as complete:

```markdown
### Etape 3 — Homepage section par section (4-5h)
- [x] Hero
- [x] Projets featured (grille/liste)
- [x] Metrics / Impact
- [x] About teaser
- [x] CTA Contact
```

- [ ] **Step 4: Commit**

```bash
git add docs/roadmap.md
git commit -m "docs: mark etape 3 homepage as complete"
```
