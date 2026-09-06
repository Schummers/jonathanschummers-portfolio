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

/* Hero : decalages courts, les trois quarts de B et de C restent visibles.
   Carte : decalages francs et glissement au survol, comme la carte BforBank. */
const OFFSETS = {
  hero: { rest: [0, -20, 14, -24, 10, -16], hover: [0, -20, 14, -24, 10, -16] },
  card: { rest: [0, -56, 32, -40, 24, -64], hover: [-90, 40, -70, 30, -100, 10] },
};

function columns(size: "hero" | "card"): PhoneStackColumn[] {
  return SECTIONS.map((s, i) => ({
    offset: OFFSETS[size].rest[i],
    hoverOffset: OFFSETS[size].hover[i],
    screens: (["b", "a", "c"] as const).map((v) => ({
      src: `${BASE}/${v}-${s.key}.webp`,
      alt: `Variant ${v.toUpperCase()}, ${s.name} section`,
    })),
  }));
}

export function YouAliveShowcase({ size = "hero" }: { size?: "hero" | "card" }) {
  return (
    <PhoneStackShowcase
      size={size}
      columns={columns(size)}
      label="The three You Alive landing page variants, section by section, on mobile"
    />
  );
}
