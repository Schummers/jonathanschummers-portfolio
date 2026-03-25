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
        "rounded-[4px]",
        "px-[12px] py-[6px]",
        "font-body font-normal text-tag leading-tag",
        "text-text-secondary",
        className
      )}
    >
      {children}
    </span>
  );
}
