import Image from "next/image";
import { IPhoneFrame } from "./iphone-frame";

export interface PhoneStackColumn {
  /* Decalage vertical de la colonne au repos et au survol, en px. */
  offset: number;
  hoverOffset: number;
  screens: { src: string; alt: string }[];
}

/* Bande d'iPhones en colonnes, chaque colonne empile ses ecrans et se
   decale verticalement, le haut et le bas sont rognes par un fondu. Au
   survol, les colonnes glissent lentement (CSS, `.phone-stack` dans
   globals.css). Sous md, seules les trois premieres colonnes s'affichent. */
export function PhoneStackShowcase({ columns, label }: { columns: PhoneStackColumn[]; label: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="phone-stack relative flex h-120 items-center gap-sm overflow-hidden md:h-140 md:gap-md"
    >
      {columns.map((col, colIndex) => (
        <div
          key={colIndex}
          data-stack-col
          className={`${colIndex >= 3 ? "hidden md:flex" : "flex"} flex-1 flex-col gap-sm md:gap-md`}
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
                priority={i === 1 && colIndex < 3}
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
