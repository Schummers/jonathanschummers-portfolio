import { cn } from "@/lib/cn";

export function BlueprintShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[1400px]",
        "border-x border-border",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  invert = false,
}: {
  children: React.ReactNode;
  className?: string;
  invert?: boolean;
}) {
  return (
    <section
      className={cn(
        "border-b border-border",
        "px-xl py-xl",
        "max-md:px-md",
        "md:max-lg:px-lg",
        invert && "bg-invert-bg text-invert-fg border-border-strong",
        className
      )}
    >
      {children}
    </section>
  );
}
