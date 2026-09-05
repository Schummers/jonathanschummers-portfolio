import { cn } from "@/lib/cn";

export function BlueprintShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main
      className={cn(
        "relative mx-auto w-full max-w-[var(--blueprint-max)]",
        "border-x border-border",
        className
      )}
    >
      {children}
    </main>
  );
}

export function Section({
  children,
  className,
  invert = false,
  padded = true,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  invert?: boolean;
  /* false: the section lays out its own edges (full-bleed grids, hero) */
  padded?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "border-b border-border",
        padded && "px-xl py-xl max-md:px-md md:max-lg:px-lg",
        invert && "bg-invert-bg text-invert-fg border-border-strong",
        className
      )}
    >
      {children}
    </section>
  );
}
