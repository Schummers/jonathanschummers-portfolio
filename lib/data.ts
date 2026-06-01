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
  mockupType?: "browser" | "browser-scroll" | "mobile-grid" | "iphone";
  externalUrl?: string;
}

export const projects: Project[] = [
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
    slug: "valoris",
    title:
      "Designing and building a rental management SaaS for Luxembourg legal compliance",
    description:
      "Solo-built property management platform automating legal documentation: tax declarations, rent control tracking, and resale reporting. OCR-powered document processing that auto-fills ~72% of required fields for tax filings.",
    company: "Valoris",
    tags: ["Product Builder", "Cursor / Claude Code", "Entrepreneurship"],
    image: "/images/Experiences/Smartintegrity/Principal.webp",
    type: "featured",
    hidden: true,
    browserUrl: "valoris.lu",
    mockupType: "browser",
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
  },
  {
    slug: "spie-bat",
    title:
      "Designed a construction app connecting site crews' real workflows to a complex ERP, replacing 3 legacy tools with a single interface to manage personnel, equipment and procurement",
    company: "Spie Batignolles",
    tags: ["11 months", ">1000 users", "Alignment workshops", "Data mapping (SaaS↔ERP)"],
    image: "/images/Hero/spie-bat-hero.webp",
    type: "compact",
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
    type: "compact",
    browserUrl: "smint.com",
    mockupType: "browser",
  },
  {
    slug: "malaama",
    title:
      "Designing and building the website for an NGO empowering girls' education in Mauritania",
    company: "Malaama",
    tags: ["Product Builder", "Web Design", "Social Impact"],
    image: "/images/Hero/Malaama.png",
    type: "compact",
    browserUrl: "malaama.org",
    mockupType: "browser",
    externalUrl: "https://malaama.org",
  },
];
