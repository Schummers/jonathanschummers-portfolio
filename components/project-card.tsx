import Image from "next/image";
import Link from "next/link";
import { Tag } from "@/components/tag";
import { cn } from "@/lib/cn";
import type { ProjectEntry } from "@/lib/projects";

/**
 * Carte projet. Numero et sur-titre en label dans la zone `surface`, ecran
 * qui sort du bas de cette zone (arrondi en haut seulement, ombre portee,
 * coupe par le bloc texte qui passe par-dessus), puis sur `bg` : phrase et
 * trois tags au plus. Le bloc texte est le lien vers le repo, seul lui
 * reagit au survol ; l'ecran au-dessus repond a ce survol via `:has()`
 * (globals.css, `.project-card`).
 */

/* Meme arrondi que les cadres navigateur. Hauteur commune a tous les ecrans,
   le trio WattHunter est coupe en bas comme les autres. */
const SCREEN = "h-56 overflow-hidden rounded-t-frame-browser shadow-screen";

function ProjectImage({ project }: { project: ProjectEntry }) {
  const alt = `${project.title} screenshot`;

  if (project.frame === "trio" && project.images.length) {
    /* Below lg the column is too narrow for three phones: the third one is
       hidden, the first two share the column. */
    return (
      <div className="flex gap-xs">
        {project.images.map((src, i) => (
          <div
            key={src}
            data-project-screen
            className={cn("flex-1 min-w-0", SCREEN, i > 1 && "max-lg:hidden")}
          >
            <Image
              src={src}
              alt={i === 0 ? alt : ""}
              width={640}
              height={1385}
              className="w-full h-full object-cover object-top"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div data-project-screen className={SCREEN}>
      <Image
        src={project.image}
        alt={alt}
        width={1280}
        height={800}
        className="w-full h-full object-cover object-top"
      />
    </div>
  );
}

export function ProjectCard({
  project,
  index = 0,
}: {
  project: ProjectEntry;
  index?: number;
}) {
  const link = project.links[0];
  const number = String(index + 1).padStart(2, "0");

  const text = (
    <>
      <h3 className="px-container pt-md font-display text-h4 font-medium tracking-h4 text-text-primary">
        {project.headline}
      </h3>
      <div className="flex flex-wrap gap-xs px-container pt-sm pb-section">
        {project.tags.slice(0, 3).map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </>
  );

  /* Rows 2 to 3, one level above the screens. The link is itself a subgrid
     so the headline and tags keep their shared rows across the columns. */
  const textClass =
    "project-card-link hover-subtle relative z-10 flex flex-1 flex-col bg-bg md:grid md:grid-rows-subgrid md:row-span-2";

  return (
    <div
      data-ph-capture-attribute-project-slug={project.slug}
      data-ph-capture-attribute-card-variant="project"
      className="project-card flex flex-col md:grid md:grid-rows-subgrid md:row-span-3"
    >
      {/* Row 1, screen zone: clipped at the bottom, the text rows sit above it.
          Tablet: the eyebrow may wrap, so it reserves two lines and the three
          screens stay on the same baseline. */}
      <div className="flex flex-col overflow-hidden bg-surface px-container pt-lg">
        <p className="mb-sm font-body text-label font-bold uppercase tracking-label text-text-secondary md:max-lg:min-h-10">
          {number}. {project.eyebrow ?? project.title}
        </p>
        <ProjectImage project={project} />
      </div>

      {link ? (
        <Link
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} on ${link.label}`}
          className={cn(textClass, "cursor-pointer")}
        >
          {text}
        </Link>
      ) : (
        <div className={textClass}>{text}</div>
      )}
    </div>
  );
}
