export interface Project {
  slug: string;
  title: string;
  description?: string;
  metric: string;
  company?: string;
  tags: string[];
  image?: string;
  type: "featured" | "compact";
  hidden?: boolean;
  browserUrl?: string;
  mockupType?: "browser" | "browser-scroll" | "mobile-grid" | "iphone";
}

export const projects: Project[] = [
  {
    slug: "nod",
    title:
      "Revamping a power plant monitoring SaaS to increase kWh tracked per operator by 23%",
    description:
      "Redesigned the app in dark mode. New diagnostic dashboard for production loss, integrated alerting system, and automated reporting for plant business owners, saving operators 3x30 min per day.",
    metric: "+23% kWh/operator",
    company: "Total Energy Digital Factory — NOD",
    tags: ["Product Design", "Dark Mode", "Industry"],
    image: "/images/Hero/NOD.webp",
    type: "featured",
    browserUrl: "app.nod-factory.com/dashboard",
    mockupType: "browser-scroll",
  },
  {
    slug: "valoris",
    title:
      "Designing and building a rental management SaaS for Luxembourg legal compliance",
    description:
      "Solo-built property management platform automating legal documentation — tax declarations, rent control tracking, and resale reporting. OCR-powered document processing that auto-fills ~72% of required fields for tax filings.",
    metric: "~72% of tax fields automated",
    company: "Valoris",
    tags: ["Product Builder", "Cursor / Claude Code", "Entrepreneurship"],
    image: "/images/Experiences/Smartintegrity/Principal.webp",
    type: "featured",
    hidden: true,
    browserUrl: "app.valoris.lu",
    mockupType: "browser",
  },
  {
    slug: "bforbank",
    title:
      "Designing the onboarding flow that ranked #1 on Google's UX Benchmark 2023",
    description:
      "Built a fully compliant banking onboarding for BforBank's complete app relaunch. Meeting all KYC, security, and regulatory constraints while achieving a full account opening in under 10 minutes.",
    metric: "#1 Google UX Benchmark 2023",
    company: "BforBank",
    tags: ["UX/UI Designer", "Mobile Design", "Onboarding Flow", "Banking"],
    image: "/images/Hero/BFOR.webp",
    type: "featured",
    mockupType: "mobile-grid",
  },
  {
    slug: "spie-bat",
    title:
      "Cut manual data entry on construction sites by redesigning the activity report with 16 field workshops",
    metric: "16 workshops · 12 user tests",
    company: "Spies Batignolles",
    tags: ["UX Research", "Design Thinking", "ERP Construction"],
    image: "/images/Hero/SPIES.webp",
    type: "compact",
    browserUrl: "spie-batignolles.intranet/reports",
    mockupType: "browser",
  },
  {
    slug: "smartintegrity",
    title:
      "Reduced refinery pipe leaks by 6% with a corrosion risk tool deployed to 500 inspectors across 4 sites",
    metric: "-6% leaks · 500 users · 4 sites",
    company: "Total Energy Digital Factory — SMINT",
    tags: ["Product Design", "Data", "Industry"],
    image: "/images/Hero/SMART.webp",
    type: "compact",
    browserUrl: "smint.totalenergies.net",
    mockupType: "browser",
  },
  {
    slug: "malaama",
    title:
      "Designing and building the website for an NGO empowering girls' education in Mauritania",
    metric: "Just released · April 2026",
    company: "Malaama",
    tags: ["Product Builder", "Web Design", "Social Impact"],
    image: "/images/Hero/Malaama.png",
    type: "compact",
    browserUrl: "malaama.org",
    mockupType: "browser",
  },
];
