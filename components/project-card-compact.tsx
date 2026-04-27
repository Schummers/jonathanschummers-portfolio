import Link from "next/link";
import Image from "next/image";
import { Tag } from "@/components/tag";
import { BrowserFrame } from "@/components/browser-frame";
import type { Project } from "@/lib/data";
import { PUBLISHED_SLUGS } from "@/lib/case-studies";

export function ProjectCardCompact({ project }: { project: Project }) {
  const hasCase = PUBLISHED_SLUGS.includes(project.slug);
  const Wrapper = hasCase ? Link : "div";
  const wrapperProps = hasCase ? { href: `/work/${project.slug}` } : {};

  return (
    <Wrapper
      {...wrapperProps as any}
      className={`group hover-subtle flex gap-xl border-b border-border px-xl py-md max-md:px-md md:max-lg:px-lg md:min-h-[200px] ${hasCase ? "cursor-pointer" : ""}`}
    >
      {/* Text left */}
      <div className="flex-1 flex flex-col justify-center gap-sm">
        <div className="flex flex-col gap-xs">
          {project.company && (
            <p className="font-body text-label font-bold uppercase tracking-label text-text-secondary">
              {project.company}
            </p>
          )}
          <h3 className="font-display text-h3 font-bold tracking-h3 leading-h3 text-text-primary">
            {project.title}
          </h3>
        </div>
        <div className="flex flex-wrap gap-sm">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>

      {/* Thumbnail right — with browser frame + perspective on hover */}
      {project.image && (
        <div className="w-[280px] shrink-0 py-[16px] overflow-visible max-md:hidden [perspective:1200px]">
          {project.browserUrl ? (
            <BrowserFrame
              url={project.browserUrl}
              className="transition-transform duration-[400ms] ease-out group-hover:[transform:rotateY(-6deg)_rotateX(3deg)]"
            >
              <Image
                src={project.image}
                alt={project.title}
                width={236}
                height={135}
                className="w-full h-auto block"
              />
            </BrowserFrame>
          ) : (
            <Image
              src={project.image}
              alt={project.title}
              width={236}
              height={135}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      )}
    </Wrapper>
  );
}
