import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

/* "none": one landscape capture. "trio": three portrait captures side by
   side, the third hidden below lg. */
export type ProjectFrame = "none" | "trio";

export interface ProjectEntry {
  slug: string;
  title: string;
  /* Small caps line above the screen, numbered by position */
  eyebrow?: string;
  /* The one sentence of the card, the "what it is" */
  headline: string;
  image: string;
  /* frame "trio" only */
  images: string[];
  frame: ProjectFrame;
  tags: string[];
  /* The first one is the card's button */
  links: { label: string; href: string }[];
  order: number;
}

/* Build-time only: reads content/projects/*.md with gray-matter, like
   lib/case-studies.ts. The slug is the file name without extension. */
export function getProjects(): ProjectEntry[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const { data } = matter(
        fs.readFileSync(path.join(PROJECTS_DIR, file), "utf-8")
      );
      const fm = data as Partial<Omit<ProjectEntry, "slug">>;
      if (!fm.title || !fm.headline || !fm.image) {
        throw new Error(
          `content/projects/${file}: title, headline and image are required`
        );
      }
      return {
        slug: file.replace(/\.md$/, ""),
        title: fm.title,
        eyebrow: fm.eyebrow,
        headline: fm.headline,
        image: fm.image,
        images: fm.images ?? [],
        frame: fm.frame ?? "none",
        tags: fm.tags ?? [],
        links: fm.links ?? [],
        order: fm.order ?? 0,
      };
    })
    .sort((a, b) => a.order - b.order);
}
