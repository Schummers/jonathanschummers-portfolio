import { cn } from "@/lib/cn";

interface IPhoneFrameProps {
  children: React.ReactNode;
  className?: string;
  /* Dessine la Dynamic Island. Off par defaut : les captures d'ecran
     reelles (Bforbank, About) l'ont deja dans l'image. */
  island?: boolean;
}

export function IPhoneFrame({ children, className, island = false }: IPhoneFrameProps) {
  return (
    <div
      className={cn(
        "relative rounded-frame-iphone border-2 border-text-primary overflow-hidden",
        className
      )}
    >
      {island && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-2 z-10 h-4 w-1/4 -translate-x-1/2 rounded-full bg-black"
        />
      )}
      {children}
    </div>
  );
}
