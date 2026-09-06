import { ArrowTopRightOnSquareIcon } from "@heroicons/react/16/solid";
import { cn } from "@/lib/cn";

interface InlineLinkProps {
  href: string;
  children: React.ReactNode;
  /* Ouvre dans un nouvel onglet, avec `rel` de securite. Par defaut : les
     liens des case studies sortent tous du site. */
  external?: boolean;
  /* Icone « open in new » en fin de lien. */
  icon?: boolean;
  className?: string;
}

/* Lien dans le texte (prose, legendes). Ce n'est pas un bouton : pas de
   padding, pas de hauteur, il vit dans la ligne. Bleu `link`, token dedie
   qui bascule en dark, passe en text-primary au survol. */
export function InlineLink({
  href,
  children,
  external = true,
  icon = false,
  className,
}: InlineLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "text-link hover-supported:text-text-primary transition-colors duration-[var(--dur-fast)]",
        icon && "inline-flex items-center gap-xs",
        className
      )}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      {icon && <ArrowTopRightOnSquareIcon aria-hidden="true" className="size-3.5 shrink-0" />}
    </a>
  );
}
