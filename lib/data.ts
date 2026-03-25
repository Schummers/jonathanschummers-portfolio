export interface Project {
  slug: string;
  title: string;
  description?: string;
  metric: string;
  company?: string;
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
    company: "NOD — Total Digital Factory",
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
    company: "Valoris",
    tags: ["Product Builder", "Cursor / Claude Code", "Entrepreneurship"],
    image: "/images/Experiences/Smartintegrity/Principal.webp",
    type: "featured",
  },
  {
    slug: "bforbank",
    title:
      "Designing the onboarding flow that ranked #1 on Google's UX Benchmark 2023",
    description:
      "Built a fully compliant banking onboarding for BforBank's complete app relaunch — meeting all KYC, security, and regulatory constraints while achieving a full account opening in under 10 minutes.",
    metric: "#1 Google UX Benchmark 2023",
    company: "BforBank",
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
