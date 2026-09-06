import { PhoneStackShowcase, type PhoneStackColumn } from "./phone-stack-showcase";

const BASE = "/images/Hero/you-alive";

/* Une colonne par section du site, la meme section sur les trois variantes :
   B en haut (rognee), A au milieu (entiere), C en bas (rognee). La section
   « problem » est laissee de cote, elle n'apporte rien de plus visuellement.
   Le hero montre cinq sections, la carte de la home quatre pour rester lisible. */
const SECTIONS: { key: string; name: string }[] = [
  { key: "hero", name: "hero" },
  { key: "how", name: "how it works" },
  { key: "pricing", name: "pricing" },
  { key: "proof", name: "testimonials" },
  { key: "faq", name: "FAQ" },
];

/* Decalages verticaux par colonne, une colonne sur deux remontee. Le hero ne
   bouge pas ; la carte glisse au survol, comme la carte BforBank. */
const LAYOUT = {
  hero: { count: 5, rest: [-120, 110, -130, 100, -110], hover: [-120, 110, -130, 100, -110] },
  card: { count: 4, rest: [-40, 60, -60, 40], hover: [50, -70, 40, -80] },
};

function columns(size: "hero" | "card"): PhoneStackColumn[] {
  const l = LAYOUT[size];
  return SECTIONS.slice(0, l.count).map((s, i) => ({
    offset: l.rest[i],
    hoverOffset: l.hover[i],
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
