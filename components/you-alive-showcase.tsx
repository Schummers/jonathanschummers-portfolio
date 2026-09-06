import { PhoneStackShowcase, type PhoneStackColumn } from "./phone-stack-showcase";

const BASE = "/images/Hero/you-alive";

/* Une colonne par section du site, la meme section sur les trois variantes :
   B en haut (rognee), A au milieu (entiere), C en bas (rognee). */
const SECTIONS: { key: string; name: string }[] = [
  { key: "hero", name: "hero" },
  { key: "problem", name: "problem" },
  { key: "how", name: "how it works" },
  { key: "pricing", name: "pricing" },
  { key: "proof", name: "testimonials" },
  { key: "faq", name: "FAQ" },
];
const OFFSETS = [0, -56, 32, -40, 24, -64];
const HOVER_OFFSETS = [-90, 40, -70, 30, -100, 10];

const COLUMNS: PhoneStackColumn[] = SECTIONS.map((s, i) => ({
  offset: OFFSETS[i],
  hoverOffset: HOVER_OFFSETS[i],
  screens: (["b", "a", "c"] as const).map((v) => ({
    src: `${BASE}/${v}-${s.key}.webp`,
    alt: `Variant ${v.toUpperCase()}, ${s.name} section`,
  })),
}));

export function YouAliveShowcase() {
  return (
    <PhoneStackShowcase
      columns={COLUMNS}
      label="The three You Alive landing page variants, section by section, on mobile"
    />
  );
}
