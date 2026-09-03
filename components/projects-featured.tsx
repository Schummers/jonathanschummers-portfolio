import { projects } from "@/lib/data";
import { ProjectCardFeatured } from "@/components/project-card-featured";

export function ProjectsFeatured() {
  const featured = projects.filter((p) => p.type === "featured" && !p.hidden);

  return (
    <section id="work">
      <h2 className="sr-only">Selected work</h2>
      {featured.map((project) => (
        <ProjectCardFeatured key={project.slug} project={project} />
      ))}
    </section>
  );
}
