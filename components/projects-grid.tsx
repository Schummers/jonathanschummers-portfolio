import { Section } from "@/components/blueprint-shell";
import { ProjectCard } from "@/components/project-card";
import { getProjects } from "@/lib/projects";

const GITHUB_PROFILE = "https://github.com/Schummers";

/**
 * Trois colonnes separees par des verticales, bornees par les lignes de
 * section, aucune ligne horizontale interne. Pas d'intro sous le titre
 * (decision du 2026-09-05). Le mot GitHub du titre est le lien vers le
 * profil, ce qui a remplace les trois boutons identiques des cartes
 * (decision du 2026-09-07) ; pas de fleche, le soulignement suffit. Le titre et la zone des ecrans partagent la
 * couleur `surface`, le bloc texte de chaque carte est sur `bg`.
 */
export function ProjectsGrid() {
  const projects = getProjects();

  return (
    <Section id="projects" padded={false} className="bg-surface">
      <h2 className="px-container pt-section pb-md font-display text-h2 font-bold leading-h2 tracking-h2 text-text-primary">
        Check my personal projects on{" "}
        <a
          href={GITHUB_PROFILE}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-2 underline-offset-4 transition-colors duration-[var(--dur-fast)] ease-out hover-supported:text-text-secondary"
        >
          GitHub
        </a>
      </h2>
      <div className="grid max-md:grid-cols-1 max-md:divide-y md:grid-cols-3 md:divide-x divide-border">
        {/* Each card spans three subgrid rows (screen, headline, tags) so the
            tags sit on the same line across the three columns. */}
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
}
