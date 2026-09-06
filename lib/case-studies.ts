import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CASE_STUDIES_DIR = path.join(process.cwd(), "content/case-studies");

export interface CaseStudyFrontmatter {
  heroImage: string;
}

export interface CaseStudyImage {
  alt: string;
  src: string;
}

export interface CaseStudyStep {
  heading: string;
  content: string;
  images: CaseStudyImage[];
}

export interface CaseStudySection {
  heading: string;
  content: string;
  images: CaseStudyImage[];
  steps: CaseStudyStep[];
}

/* Conventions Markdown portees par le alt d'une image `![alt](src)` :
   - `phone: <legende>`                          → iPhone (jusqu'a 3 par rangee)
   - `scroll: <url> | <legende>`                  → navigateur dont la page scrolle
   - `phone-scroll: <label> | <legende> | <url>`  → iPhone dont l'ecran scrolle,
     label court du segmented control mobile, url optionnelle (la legende
     devient un lien)
   - `row: <legende>`                             → image pleine largeur
   - `plain: <alt>`                               → grille, sans legende affichee
   - sinon                                        → grille, le alt sert de legende
   Seul endroit qui connait ces prefixes : les composants recoivent la
   directive deja lue. */
export type MediaDirective =
  | { kind: "phone"; caption: string }
  | { kind: "scroll"; url: string; caption: string }
  | { kind: "phone-scroll"; label: string; caption: string; href?: string }
  | { kind: "row"; caption: string }
  | { kind: "grid"; alt: string; caption: string };

export function parseMediaDirective(alt: string): MediaDirective {
  const m = alt.match(/^(phone-scroll|phone|scroll|row|plain):\s*(.*)$/);
  if (!m) return { kind: "grid", alt, caption: alt };
  const [, prefix, rest] = m;
  const parts = rest.split("|").map((p) => p.trim());
  switch (prefix) {
    case "phone":
      return { kind: "phone", caption: rest.trim() };
    case "scroll":
      return { kind: "scroll", url: parts[0] ?? "", caption: parts[1] ?? "" };
    case "phone-scroll":
      return {
        kind: "phone-scroll",
        label: parts[0] ?? "",
        caption: parts[1] ?? "",
        href: parts[2] || undefined,
      };
    case "row":
      return { kind: "row", caption: rest.trim() };
    default:
      return { kind: "grid", alt: rest.trim(), caption: "" };
  }
}

/* Les lignes `![alt](src)` restent dans le contenu de l'etape pour que
   CaseStudyStep place les medias entre deux paragraphes. Tout rendu qui sort
   les images par un autre chemin (Context, layouts sur mesure) doit passer le
   texte ici, sinon le alt ressort en « !lien ». */
export function stripImageLines(content: string): string {
  return content
    .split("\n")
    .filter((l) => !/^\s*!\[[^\]]*\]\([^)]+\)\s*$/.test(l))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export interface CaseStudy {
  frontmatter: CaseStudyFrontmatter;
  sections: CaseStudySection[];
}

function parseMarkdownSections(markdown: string): CaseStudySection[] {
  const lines = markdown.split("\n");
  const sections: CaseStudySection[] = [];

  let sectionHeading = "";
  let sectionContent: string[] = [];
  let sectionImages: CaseStudyImage[] = [];
  let steps: CaseStudyStep[] = [];

  let stepHeading = "";
  let stepContent: string[] = [];
  let stepImages: CaseStudyImage[] = [];
  let inStep = false;

  function flushStep() {
    if (!inStep) return;
    steps.push({
      heading: stepHeading,
      content: stepContent.join("\n").trim(),
      images: stepImages,
    });
    stepHeading = "";
    stepContent = [];
    stepImages = [];
    inStep = false;
  }

  function flushSection() {
    if (!sectionHeading) return;
    flushStep();
    sections.push({
      heading: sectionHeading,
      content: sectionContent.join("\n").trim(),
      images: sectionImages,
      steps,
    });
    sectionHeading = "";
    sectionContent = [];
    sectionImages = [];
    steps = [];
  }

  for (const line of lines) {
    if (line.startsWith("## ")) {
      flushSection();
      sectionHeading = line.replace("## ", "").trim();
    } else if (line.startsWith("### ")) {
      flushStep();
      stepHeading = line.replace("### ", "").trim();
      inStep = true;
    } else {
      const imgMatch = line.match(/!\[([^\]]*)\]\(([^)]+)\)/);
      if (imgMatch) {
        const img = { alt: imgMatch[1], src: decodeURIComponent(imgMatch[2]) };
        if (inStep) {
          stepImages.push(img);
          /* La ligne reste dans le contenu : CaseStudyStep s'en sert pour
             placer les medias entre deux paragraphes. */
          stepContent.push(line);
        } else {
          sectionImages.push(img);
        }
      } else {
        if (inStep) stepContent.push(line);
        else sectionContent.push(line);
      }
    }
  }

  flushSection();
  return sections;
}

export function getCaseStudy(slug: string): CaseStudy | null {
  /* Prefer the v2 draft if it exists, fall back to the original file */
  const v2Path = path.join(CASE_STUDIES_DIR, `${slug}-v2.md`);
  const v1Path = path.join(CASE_STUDIES_DIR, `${slug}.md`);
  const filePath = fs.existsSync(v2Path) ? v2Path : v1Path;

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    frontmatter: data as CaseStudyFrontmatter,
    sections: parseMarkdownSections(content),
  };
}

/* Only these slugs generate public pages */
export const PUBLISHED_SLUGS = ["bforbank", "nod", "spie-bat", "smartintegrity", "you-alive"];

export function getAllCaseStudySlugs(): string[] {
  return PUBLISHED_SLUGS;
}
