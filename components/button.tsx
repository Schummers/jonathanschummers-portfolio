import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "brand" | "outline";
type ButtonSize = "default" | "xl";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
}

export function Button({
  variant = "primary",
  size = "default",
  className,
  children,
  href,
  ...props
}: ButtonProps) {
  const base = cn(
    "inline-flex items-center justify-center",
    "font-body font-semibold",
    size === "xl" ? "text-body-lg px-lg py-sm" : "text-body px-md py-xs",
    "rounded-sm",
    "transition-all duration-[var(--dur-fast)] ease-out",
    "focus-visible:outline-2 focus-visible:outline-fg focus-visible:outline-offset-2",
    "active:scale-[0.98]",
    "disabled:cursor-not-allowed disabled:bg-disabled-bg disabled:text-disabled-fg disabled:pointer-events-none"
  );

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-btn-primary text-btn-primary-fg hover-supported:bg-btn-primary-hover active:bg-btn-primary-hover active:brightness-[1.08]",
    brand:
      "bg-accent text-white hover-supported:bg-accent-hover active:bg-accent-hover active:brightness-[1.08]",
    outline:
      "border border-border-strong text-text-primary bg-transparent hover-supported:bg-surface active:bg-border",
  };

  const cls = cn(base, variants[variant], className);

  if (href) {
    const isExternal = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className={cls}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
