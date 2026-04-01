import Image from "next/image";
import { Tag } from "@/components/tag";
import { BrowserFrame } from "@/components/browser-frame";
import { BforBankShowcase } from "@/components/bforbank-showcase";
import type { Project } from "@/lib/data";

function FeaturedImage({ project }: { project: Project }) {
  if (project.mockupType === "mobile-grid") {
    return <BforBankShowcase />;
  }

  if (!project.image) return null;

  // Browser frame wrapper (scroll or static)
  if (project.browserUrl) {
    const isScroll = project.mockupType === "browser-scroll";

    return (
      <BrowserFrame url={project.browserUrl}>
        {isScroll ? (
          <div className="h-[400px] overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              width={640}
              height={1200}
              className="nod-scroll-img w-full object-cover object-top transition-transform duration-[10000ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
            />
            <style>{`
              .hover-subtle:hover .nod-scroll-img {
                transform: translateY(calc(-100% + 400px));
              }
            `}</style>
          </div>
        ) : (
          <Image
            src={project.image}
            alt={project.title}
            width={640}
            height={755}
            className="w-full object-cover object-top"
          />
        )}
      </BrowserFrame>
    );
  }

  // Fallback: raw image (no mockup)
  return (
    <Image
      src={project.image}
      alt={project.title}
      width={640}
      height={755}
      className="object-cover object-top w-full"
    />
  );
}

export function ProjectCardFeatured({ project }: { project: Project }) {
  return (
    <div
      className="hover-subtle block border-b border-border"
    >
      {/* Desktop: 2-col grid | Mobile: single column flex */}
      <div className="md:h-[560px] overflow-hidden">
        <div className="max-md:flex max-md:flex-col md:grid md:grid-cols-2">

          {/* Text column */}
          <div className="flex flex-col gap-md pt-xl2 pb-xl2 px-xl max-md:px-md max-md:pt-md max-md:pb-lg md:max-lg:px-lg">
            {/* Company + Title */}
            <div className="flex flex-col gap-xs">
              {project.company && (
                <p className="font-body text-label font-bold uppercase tracking-label text-text-secondary">
                  {project.company}
                </p>
              )}
              <h2 className="font-display text-h2 font-bold tracking-h2 leading-h2 text-text-primary">
                {project.title}
              </h2>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-sm">
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>

            {/* Image — inline on mobile (after tags, before description) */}
            {project.image && (
              <div className="relative h-[240px] overflow-hidden md:hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={640}
                  height={400}
                  className="object-cover object-top w-full h-full"
                />
              </div>
            )}

            {/* Divider, Description, CTA — desktop only */}
            <hr className="w-1/2 border-t border-border m-0 max-md:hidden" />

            {project.description && (
              <p className="font-body text-body leading-body text-text-secondary max-w-[500px] max-md:hidden">
                {project.description}
              </p>
            )}

          </div>

          {/* Image column — desktop only */}
          <div className="relative overflow-hidden pt-xl2 px-xl max-md:hidden">
            <FeaturedImage project={project} />
          </div>

        </div>
      </div>
    </div>
  );
}
