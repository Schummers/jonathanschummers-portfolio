import { cn } from "@/lib/cn";

/* Legende sous un media de case study (image, iPhone, navigateur, bloc).
   Un seul style pour toutes : caption italique en text-tertiary. Rend rien
   si la legende est vide. */
export function CaseStudyCaption({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  if (!children) return null;
  return (
    <figcaption
      className={cn(
        "mt-xs font-body text-caption italic font-normal text-text-tertiary",
        className
      )}
    >
      {children}
    </figcaption>
  );
}
