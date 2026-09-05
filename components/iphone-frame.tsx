import { cn } from "@/lib/cn";

interface IPhoneFrameProps {
  children: React.ReactNode;
  className?: string;
  /* Dessine la barre d'accueil iOS en bas de l'ecran. Off par defaut : les
     captures d'ecran reelles (Bforbank, About) l'ont deja dans l'image. */
  homeBar?: boolean;
}

export function IPhoneFrame({ children, className, homeBar = false }: IPhoneFrameProps) {
  return (
    <div
      className={cn(
        "relative rounded-frame-iphone border-2 border-text-primary overflow-hidden",
        className
      )}
    >
      {children}
      {homeBar && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-2 left-1/2 z-10 h-1 w-1/3 -translate-x-1/2 rounded-full bg-white mix-blend-difference"
        />
      )}
    </div>
  );
}
