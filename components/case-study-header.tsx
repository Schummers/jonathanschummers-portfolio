import { Tag } from "./tag";

interface CaseStudyHeaderProps {
  company?: string;
  title: string;
  tags: string[];
}

export function CaseStudyHeader({ company, title, tags }: CaseStudyHeaderProps) {
  return (
    <div className="mx-auto max-w-content">
      {company && (
        <p className="font-body text-label font-bold uppercase tracking-label text-accent-text">
          {company}
        </p>
      )}
      <h1 className="mt-xs font-display text-h2 font-bold leading-h2 tracking-h2 text-text-primary">
        {title}
      </h1>

      <div className="mt-md flex flex-wrap gap-sm">
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </div>
  );
}
