export interface Project {
  slug: string;
  title: string;
  description?: string;
  company?: string;
  tags: string[];
  image?: string;
  type: "featured" | "compact";
  hidden?: boolean;
  browserUrl?: string;
  mockupType?: "browser" | "browser-scroll" | "mobile-grid";
  /* browser-scroll only: duration of the hover scroll, in ms. Nod scrolls
     about 120px in 10s ; a taller capture needs a longer duration to keep
     the same pixel speed (Regis: 2150px, 180s). */
  scrollDurationMs?: number;
  /* Mise en scene dediee (hero de la page et image de la carte featured),
     a la place de l'image : `bforbank-showcase.tsx`, `you-alive-showcase.tsx`,
     `regis-showcase.tsx` (hero seulement, la carte garde son image). */
  showcase?: "bforbank" | "you-alive" | "regis";
  externalUrl?: string;
}

/* Ordre d'affichage de la home, decide le 2026-09-07 : toutes les cartes en
   grand, plus de variante compacte sur la home (le composant reste pour
   /freelance). */
export const projects: Project[] = [
  {
    slug: "regis",
    title:
      "Built a rental tax SaaS for Luxembourg landlords on one rule: capture every invoice as it arrives, never scramble at tax return time again",
    description:
      "Solo-built SaaS that captures invoices and bank statements as they arrive, keeps a human in control of every figure, and prepares the Luxembourg form 190 per property. Built for a thirty-year family portfolio first, now in beta with twenty landlords.",
    company: "Regis",
    tags: ["Side project", "Solo founder", "Continuous capture", "Luxembourg tax"],
    /* Carte de la home : le site askregis.fr qui defile dans un cadre
       navigateur, la capture de « What we delivered » (2026-09-07). */
    image: "/images/Experiences/Regis/regis-website-desktop.webp",
    type: "featured",
    browserUrl: "askregis.fr",
    mockupType: "browser-scroll",
    scrollDurationMs: 180000,
    showcase: "regis",
  },
  {
    slug: "you-alive",
    title:
      "Built an instrumented fake-door test for a founder's Meta-ads idea: three ad-matched landing variants, one tracking chain from Pixel to Notion, and a template to run the next test without a designer",
    description:
      "A fake-door test of a digital legacy product on Meta ads: three design variants matched to their ads, one measurement chain across Meta Pixel, Conversions API, PostHog and Notion, and the honest read of the data that closed the test and became a public template.",
    company: "Fake-door website design",
    tags: ["7 weeks", "Fake-door test", "Meta Pixel + CAPI + PostHog", "Template extracted"],
    image: "/images/Hero/you-alive-card.webp",
    type: "featured",
    mockupType: "mobile-grid",
    showcase: "you-alive",
  },
  {
    slug: "nod",
    title:
      "Revamping a power plant monitoring SaaS to increase kWh tracked per operator by 23%",
    description:
      "Redesigned an industrial monitoring SaaS used by 9 control center operators managing 350+ energy assets. Through field observation, usability testing in production, and collaborative co-design workshops, delivered a responsive dashboard that increased kWh tracked per operator by 23%.",
    company: "TotalEnergies / Digital Factory",
    tags: ["16 months", "350+ assets", "Usability testing in prod", "Real-time plant data"],
    image: "/images/Experiences/NOD/Principal.webp",
    type: "featured",
    browserUrl: "nod.com",
    mockupType: "browser-scroll",
  },
  {
    slug: "bforbank",
    title:
      "Designing the onboarding flow that ranked #1 on Google's UX Benchmark 2023",
    description:
      "Built a fully compliant banking onboarding for BforBank's complete app relaunch. Meeting all KYC, security, and regulatory constraints while achieving a full account opening in under 10 minutes.",
    company: "BforBank",
    tags: ["5 months", "Banking", "Compliance workshops", "Mobile onboarding"],
    image: "/images/Hero/BFOR.webp",
    type: "featured",
    mockupType: "mobile-grid",
    showcase: "bforbank",
  },
  {
    slug: "spie-bat",
    title:
      "Designed a construction app connecting site crews' real workflows to a complex ERP, replacing 3 legacy tools with a single interface to manage personnel, equipment and procurement",
    description:
      "Two designers inside a ten-person ERP implementation team. Mapped the on-site ecosystem, ran alignment workshops with foremen and site managers, and shipped one interface for four modules: hours, equipment, material orders and procurement. Twelve site users rated it 83 on the SUS.",
    company: "Spie Batignolles",
    tags: ["11 months", ">1000 users", "Alignment workshops", "Data mapping (SaaS↔ERP)"],
    image: "/images/Hero/spie-bat-hero.webp",
    type: "featured",
    browserUrl: "spie-batignolles.com",
    mockupType: "browser",
  },
  {
    slug: "smartintegrity",
    title:
      "Reduced refinery pipe leaks by 6% with a corrosion risk tool deployed to 500 inspectors across 4 sites",
    company: "TotalEnergies / Digital Factory",
    tags: ["18 months", "500 users · 4 sites", "User testing", "Corrosion-rate model"],
    image: "/images/Hero/SMART.webp",
    type: "featured",
    browserUrl: "smint.com",
    mockupType: "browser",
    /* Decision 2026-09-07: masque, on ne voit presque rien sur la capture.
       Entree, image et case study conservees. */
    hidden: true,
  },
  {
    slug: "malaama",
    title:
      "Designing and building the website for an NGO empowering girls' education in Mauritania",
    company: "Malaama",
    tags: ["Product Builder", "Web Design", "Social Impact"],
    image: "/images/Hero/Malaama.png",
    type: "featured",
    browserUrl: "malaama.org",
    mockupType: "browser",
    externalUrl: "https://malaama.org",
    /* Decision 2026-09-04: no longer displayed. Entry and image kept. */
    hidden: true,
  },
];
