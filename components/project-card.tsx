import Image from "next/image";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/16/solid";
import { Tag } from "@/components/tag";
import { Button } from "@/components/button";
import { cn } from "@/lib/cn";
import type { ProjectEntry } from "@/lib/projects";

/**
 * Carte projet. Numero et sur-titre en petites capitales dans la zone
 * `border`, ecran qui sort du bas de cette zone (arrondi en haut seulement,
 * ombre courte, coupe par le bloc texte qui passe par-dessus), puis sur
 * `surface` : phrase, trois tags au plus, un bouton primary vers le repo.
 * La carte elle-meme n'est pas cliquable, seul le bouton l'est.
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
    <div className={SCREEN}>
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

  return (
    <div
      data-ph-capture-attribute-project-slug={project.slug}
      data-ph-capture-attribute-card-variant="project"
      className="flex flex-col md:grid md:grid-rows-subgrid md:row-span-4"
    >
      {/* Row 1, screen zone: clipped at the bottom, the text rows sit above it.
          Tablet: the eyebrow may wrap, so it reserves two lines and the three
          screens stay on the same baseline. */}
      <div className="flex flex-col overflow-hidden bg-surface-strong px-container pt-sm">
        <p className="mb-sm font-body text-tag font-bold uppercase tracking-wide text-text-secondary md:max-lg:min-h-8">
          {number}. {project.eyebrow ?? project.title}
        </p>
        <ProjectImage project={project} />
      </div>

      {/* Rows 2 to 4, one level above the screens */}
      <h3 className="relative z-10 bg-surface px-container pt-md font-display text-h4 font-medium tracking-h4 text-text-primary">
        {project.headline}
      </h3>
      <div className="relative z-10 flex flex-wrap gap-xs bg-surface px-container pt-sm">
        {project.tags.slice(0, 3).map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <div className="relative z-10 flex-1 bg-surface px-container pt-md pb-section">
        {link && (
          <Button variant="primary" href={link.href}>
            {link.label}
            <ArrowTopRightOnSquareIcon className="ml-2xs size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
