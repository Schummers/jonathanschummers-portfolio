import { cn } from "@/lib/cn";

export function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block",
        "border border-border-strong",
        "rounded-md",
        "px-xs py-2xs",
        "font-body font-medium text-tag",
        "text-text-secondary",
        className
      )}
    >
      {children}
    </span>
  );
}
