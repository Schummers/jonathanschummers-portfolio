import { projects } from "@/lib/data";
import { ProjectCardCompact } from "@/components/project-card-compact";
export function ProjectsCompact() {
  const compact = projects.filter((p) => p.type === "compact" && !p.hidden);

  return (
    <section>
      {compact.map((project) => (
        <ProjectCardCompact key={project.slug} project={project} />
      ))}
    </section>
  );
}
