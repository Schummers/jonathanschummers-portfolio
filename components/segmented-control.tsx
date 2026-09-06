import { cn } from "@/lib/cn";

interface SegmentedControlProps {
  options: string[];
  value: number;
  onChange: (index: number) => void;
  /* Nom lu par les lecteurs d'ecran pour le groupe. */
  label: string;
  className?: string;
}

/* Segmented control : un seul choix parmi 2 a 5 options courtes. Pattern
   tablist, fleches gauche/droite pour passer d'un segment a l'autre. */
export function SegmentedControl({ options, value, onChange, label, className }: SegmentedControlProps) {
  return (
    <div
      role="tablist"
      aria-label={label}
      className={cn(
        "inline-flex gap-xs rounded-sm border border-border-strong p-xs",
        className
      )}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") onChange((value + 1) % options.length);
        if (e.key === "ArrowLeft") onChange((value - 1 + options.length) % options.length);
      }}
    >
      {options.map((opt, i) => {
        const selected = i === value;
        return (
          <button
            key={opt}
            type="button"
            role="tab"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(i)}
            className={cn(
              "rounded-sm px-md py-xs font-body text-body font-semibold",
              "transition-colors duration-[var(--dur-fast)] ease-out",
              "focus-visible:outline-2 focus-visible:outline-fg focus-visible:outline-offset-2",
              selected
                ? "bg-btn-primary text-btn-primary-fg"
                : "text-text-secondary hover-supported:bg-surface active:bg-border"
            )}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
