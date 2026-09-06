import Image from "next/image";
import { IPhoneFrame } from "@/components/iphone-frame";

/* Les six ecrans de l'etape 3, dans l'ordre du recit : la banque, la ligne a
   valider, les ecritures, une ecriture, la facture, l'ecriture enrichie. */
const SCREENS = [
  { src: "/images/Experiences/Regis/regis-app-bank-list.webp", alt: "Bank view, lines already sorted" },
  { src: "/images/Experiences/Regis/regis-app-transaction-validate.webp", alt: "A transaction to validate" },
  { src: "/images/Experiences/Regis/regis-app-entries-cards.webp", alt: "Entries in cards" },
  { src: "/images/Experiences/Regis/regis-app-entry-detail.webp", alt: "One entry, its transaction and document" },
  { src: "/images/Experiences/Regis/regis-app-document-upload.webp", alt: "An invoice uploaded, analysis on request" },
  { src: "/images/Experiences/Regis/regis-app-entry-activity.webp", alt: "The same entry enriched by the invoice" },
];

/* Hero de la case study Regis : une rangee d'iPhones, comme BforBank. Les
   captures plus hautes qu'un ecran sont rognees a la hauteur d'un ecran
   (`case-phone-viewport`). Sous md, trois ecrans seulement. */
export function RegisShowcase() {
  return (
    <div className="grid grid-cols-6 gap-md max-md:grid-cols-3 max-md:gap-sm">
      {SCREENS.map((s, i) => (
        <IPhoneFrame key={s.src} className={i >= 3 ? "max-md:hidden" : undefined}>
          <div className="case-phone-viewport overflow-hidden">
            <Image
              src={s.src}
              alt={s.alt}
              width={390}
              height={844}
              className="w-full h-auto block"
              priority={i < 3}
            />
          </div>
        </IPhoneFrame>
      ))}
    </div>
  );
}
