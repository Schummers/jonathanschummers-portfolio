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

export interface CaseStudySection {
  heading: string;
  content: string;
  images: { alt: string; src: string }[];
}

export interface CaseStudy {
  frontmatter: CaseStudyFrontmatter;
  sections: CaseStudySection[];
}

function parseMarkdownSections(markdown: string): CaseStudySection[] {
  const lines = markdown.split("\n");
  const sections: CaseStudySection[] = [];
  let currentHeading = "";
  let contentLines: string[] = [];
  let images: { alt: string; src: string }[] = [];

  for (const line of lines) {
    if (line.startsWith("## ")) {
      if (currentHeading) {
        sections.push({
          heading: currentHeading,
          content: contentLines.join("\n").trim(),
          images,
        });
      }
      currentHeading = line.replace("## ", "").trim();
      contentLines = [];
      images = [];
    } else {
      const imgMatch = line.match(/!\[([^\]]*)\]\(([^)]+)\)/);
      if (imgMatch) {
        images.push({ alt: imgMatch[1], src: decodeURIComponent(imgMatch[2]) });
      } else {
        contentLines.push(line);
      }
    }
  }

  if (currentHeading) {
    sections.push({
      heading: currentHeading,
      content: contentLines.join("\n").trim(),
      images,
    });
  }

  return sections;
}

export function getCaseStudy(slug: string): CaseStudy | null {
  const filePath = path.join(CASE_STUDIES_DIR, `${slug}.md`);

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
const PUBLISHED_SLUGS = ["bforbank"];

export function getAllCaseStudySlugs(): string[] {
  return PUBLISHED_SLUGS;
}
