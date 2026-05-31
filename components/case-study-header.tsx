import { Tag } from "./tag";

interface CaseStudyHeaderProps {
  company?: string;
  title: string;
  duration: string;
  tags: string[];
}

export function CaseStudyHeader({
  company,
  title,
  duration,
  tags,
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
    </div>
  );
}
