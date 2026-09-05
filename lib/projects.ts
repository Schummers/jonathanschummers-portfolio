import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

export type ProjectFrame = "browser" | "iphone" | "trio" | "none";

export interface ProjectCard {
  slug: string;
  title: string;
  /* Small caps line above the screen, numbered by position */
  eyebrow?: string;
  description: string;
  /* One bold sentence, the "what it is" of variant B */
  headline?: string;
  image: string;
  /* frame "trio": three portrait captures side by side, 8px apart */
  images?: string[];
  frame: ProjectFrame;
  browserUrl?: string;
  tags: string[];
  href?: string;
  linkLabel?: string;
  /* Several CTAs (site + repo). Falls back to href/linkLabel when absent. */
  links?: { label: string; href: string }[];
  order: number;
}

/* Build-time only: reads content/projects/*.md with gray-matter, like
   lib/case-studies.ts. The slug is the file name without extension. */
export function getProjects(): ProjectCard[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const { data } = matter(
        fs.readFileSync(path.join(PROJECTS_DIR, file), "utf-8")
      );
      const fm = data as Omit<ProjectCard, "slug">;
      return {
        slug: file.replace(/\.md$/, ""),
        title: fm.title,
        eyebrow: fm.eyebrow,
        description: fm.description,
        headline: fm.headline,
        image: fm.image,
        images: fm.images,
        frame: fm.frame ?? "none",
        browserUrl: fm.browserUrl,
        tags: fm.tags ?? [],
        href: fm.href,
        linkLabel: fm.linkLabel,
        links:
          fm.links ??
          (fm.href ? [{ label: fm.linkLabel ?? "Open", href: fm.href }] : []),
        order: fm.order ?? 0,
      };
    })
    .sort((a, b) => a.order - b.order);
}
