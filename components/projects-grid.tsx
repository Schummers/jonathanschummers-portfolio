import { Section } from "@/components/blueprint-shell";
import { ProjectCard } from "@/components/project-card";
import { getProjects } from "@/lib/projects";

/**
 * Trois colonnes separees par des verticales, bornees par les lignes de
 * section, aucune ligne horizontale interne. Pas d'intro sous le label
 * (decision du 2026-09-05). Le label et la zone des ecrans partagent la
 * couleur `surface-strong`, le bloc texte est sur `surface`.
 */
export function ProjectsGrid() {
  const projects = getProjects();

  return (
    <Section id="projects" padded={false} className="bg-surface">
      <h2 className="bg-surface-strong px-container pt-section pb-md font-body text-label font-bold uppercase tracking-label text-text-secondary">
        Personal projects
      </h2>
      <div className="grid max-md:grid-cols-1 max-md:divide-y md:grid-cols-3 md:divide-x divide-border">
        {/* Each card spans four subgrid rows (screen, headline, tags, CTA) so
            the tags and buttons sit on the same line across the three columns. */}
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
}
