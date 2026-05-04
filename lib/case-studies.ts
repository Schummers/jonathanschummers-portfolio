import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CASE_STUDIES_DIR = path.join(process.cwd(), "content/case-studies");

export interface CaseStudyFrontmatter {
  title: string;
  slug: string;
  duration: string;
  tags: string[];
  thumbnail: string;
  heroImage: string;
  order: number;
}

export interface CaseStudyStep {
  heading: string;
  content: string;
  images: { alt: string; src: string }[];
}

export interface CaseStudySection {
  heading: string;
  content: string;
  images: { alt: string; src: string }[];
  steps: CaseStudyStep[];
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
  let sectionImages: { alt: string; src: string }[] = [];
  let steps: CaseStudyStep[] = [];

  let stepHeading = "";
  let stepContent: string[] = [];
  let stepImages: { alt: string; src: string }[] = [];
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
        if (inStep) stepImages.push(img);
        else sectionImages.push(img);
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
export const PUBLISHED_SLUGS = ["bforbank", "nod", "spie-bat", "smartintegrity"];

export function getAllCaseStudySlugs(): string[] {
  return PUBLISHED_SLUGS;
}
