import Image from "next/image";
import { Tag } from "./tag";

interface CaseStudyHeaderProps {
  company?: string;
  title: string;
  duration: string;
  tags: string[];
  subtitle?: string;
  metric?: string;
  slug: string;
}

export function CaseStudyHeader({
  company,
  title,
  duration,
  tags,
  subtitle,
  metric,
  slug,
}: CaseStudyHeaderProps) {
  return (
    <div className="mx-auto max-w-content">
      {company && (
        <p className="font-body text-label font-bold uppercase tracking-label text-text-secondary">
          {company}
        </p>
      )}
      <h1 className="mt-xs font-display text-h2 font-bold leading-h2 tracking-h2 text-text-primary">
        {title}
      </h1>

      <div className="mt-md flex flex-wrap gap-sm">
        <Tag>{duration}</Tag>
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      {subtitle && (
        <p className="mt-sm font-body text-body-lg leading-body text-text-primary">
          {subtitle}
        </p>
      )}

      {metric && (
        <div className="mt-lg bg-surface px-md py-md">
          <p className="font-body text-label font-bold uppercase tracking-label text-text-secondary">
            Key results
          </p>
          <p className="mt-xs font-display text-h3 font-bold leading-h3 text-text-primary">
            {metric}
          </p>
          {slug === "bforbank" && (
            <div className="mt-md">
              <Image
                src="/images/Experiences/Bforbank/image%2055.webp"
                alt="Google Finance UX Benchmark 2023, BforBank ranked #1"
                width={640}
                height={400}
                className="w-full object-contain"
              />
              <p className="mt-xs font-body text-caption italic font-normal text-text-tertiary">
                Source :{" "}
                <a
                  href="https://www.bforbank.com/blog/parlons-vous-et-nous/google-ux-benchmark-bforbank-elue-meilleur-parcours-client"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover-supported:text-text-secondary transition-colors"
                >
                  Google Finance UX Benchmark 2023, BforBank
                </a>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
