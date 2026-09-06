import Image from "next/image";
import { cn } from "@/lib/cn";
import { IPhoneFrame } from "./iphone-frame";

export interface PhoneStackColumn {
  /* Decalage vertical de la colonne au repos et au survol, en px. */
  offset: number;
  hoverOffset: number;
  screens: { src: string; alt: string }[];
}

interface PhoneStackShowcaseProps {
  columns: PhoneStackColumn[];
  label: string;
  /* `hero` : bande pleine largeur et haute, colonnes decalees une sur deux,
     pas d'animation. `card` : bande basse pour une carte de la home, les
     colonnes glissent au survol. */
  size?: "hero" | "card";
}

/* Bande d'iPhones en colonnes, chaque colonne empile ses ecrans et se
   decale verticalement, le haut et le bas sont rognes par un fondu. Sous md,
   seules les trois premieres colonnes s'affichent. */
export function PhoneStackShowcase({ columns, label, size = "hero" }: PhoneStackShowcaseProps) {
  const isCard = size === "card";
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "phone-stack relative flex items-center overflow-hidden",
        isCard
          ? "phone-stack-animate h-80 gap-sm md:h-120 md:gap-md"
          : "h-140 gap-sm md:h-190 md:gap-md"
      )}
    >
      {columns.map((col, colIndex) => (
        <div
          key={colIndex}
          data-stack-col
          className={cn(
            colIndex >= 3 ? "hidden md:flex" : "flex",
            "flex-1 flex-col",
            "gap-sm md:gap-md"
          )}
          style={
            {
              "--stack-y": `${col.offset}px`,
              "--stack-y-hover": `${col.hoverOffset}px`,
            } as React.CSSProperties
          }
        >
          {col.screens.map((s, i) => (
            <IPhoneFrame key={s.src} homeBar className="shrink-0">
              <Image
                src={s.src}
                alt={s.alt}
                width={300}
                height={650}
                className="w-full h-auto block"
                priority={!isCard && i === 1 && colIndex < 3}
              />
            </IPhoneFrame>
          ))}
        </div>
      ))}
      <div aria-hidden="true" className="phone-stack-fade-top pointer-events-none absolute inset-x-0 top-0 h-xl" />
      <div aria-hidden="true" className="phone-stack-fade-bottom pointer-events-none absolute inset-x-0 bottom-0 h-xl" />
    </div>
  );
}
