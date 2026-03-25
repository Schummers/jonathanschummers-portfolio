import Image from "next/image";
import { Tag } from "@/components/tag";
import { Button } from "@/components/button";
import { ArrowRightIcon } from "@heroicons/react/16/solid";
import type { Project } from "@/lib/data";

export function ProjectCardFeatured({
  project,
}: {
  project: Project;
}) {
  return (
    <a
      href={`/work/${project.slug}`}
      className="hover-subtle block border-b border-border"
    >
      <div className="h-[600px] overflow-hidden">
        {/* Tags row — full width, top */}
        <div className="flex flex-wrap gap-sm px-xl pt-xl max-md:px-md md:max-lg:px-lg">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        {/* Two-column content — tags to content gap = 48px */}
        <div className="grid md:grid-cols-2 mt-xl px-xl max-md:px-md md:max-lg:px-lg">
          {/* Text column */}
          <div className="flex flex-col">
            {project.company && (
              <p className="font-body text-label font-semibold uppercase tracking-label text-text-secondary">
                {project.company}
              </p>
            )}
            <h2 className="mt-xs font-display text-h2 font-bold tracking-h2 leading-h2 text-text-primary">
              {project.title}
            </h2>
            {project.description && (
              <p className="mt-md font-body text-body leading-body text-text-secondary max-w-[500px]">
                {project.description}
              </p>
            )}
            <div className="mt-lg">
              <Button variant="outline" size="default">
                Read case study
                <ArrowRightIcon className="ml-xs size-3.5" />
              </Button>
            </div>
          </div>

          {/* Image column — aligned with company label, overflows at bottom */}
          {project.image && (
            <div className="relative overflow-visible max-md:hidden">
              <Image
                src={project.image}
                alt={project.title}
                width={640}
                height={500}
                className="object-cover object-top"
              />
            </div>
          )}
        </div>
      </div>
    </a>
  );
}
