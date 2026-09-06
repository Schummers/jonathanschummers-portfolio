import { cn } from "@/lib/cn";

interface IPhoneFrameProps {
  children: React.ReactNode;
  className?: string;
  /* Dessine la barre d'accueil iOS en bas de l'ecran, noire et opaque comme
     dans les captures BforBank. Off par defaut : les captures d'ecran reelles
     (Bforbank, About) l'ont deja dans l'image. */
  homeBar?: boolean;
}

/* Cadre noir dans les deux themes, comme la barre d'accueil : un iPhone ne
   change pas de couleur avec le site. Avant le 2026-09-07 il suivait
   `text-primary` et devenait gris clair en mode sombre. */
export function IPhoneFrame({ children, className, homeBar = false }: IPhoneFrameProps) {
  return (
    <div
      className={cn(
        "relative rounded-frame-iphone border-2 border-black overflow-hidden",
        className
      )}
    >
      {children}
      {homeBar && (
        <span
          aria-hidden="true"
          className="iphone-home-bar pointer-events-none absolute left-1/2 z-10 -translate-x-1/2 rounded-full bg-black"
        />
      )}
    </div>
  );
}
