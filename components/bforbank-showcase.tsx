"use client";

import Image from "next/image";
import { IPhoneFrame } from "@/components/iphone-frame";

const COLUMNS = [
  [
    "/images/Hero/Bforbank/IMG_2622.webp",
    "/images/Hero/Bforbank/IMG_2632.webp",
  ],
  [
    "/images/Hero/Bforbank/IMG_2625.webp",
    "/images/Hero/Bforbank/IMG_2623.webp",
    "/images/Hero/Bforbank/IMG_2635.webp",
  ],
  [
    "/images/Hero/Bforbank/Frame 1597884611.webp",
    "/images/Hero/Bforbank/IMG_2628.webp",
    "/images/Hero/Bforbank/IMG_2636-1.webp",
  ],
  [
    "/images/Hero/Bforbank/IMG_2636.webp",
    "/images/Hero/Bforbank/IMG_3216 3.webp",
  ],
];

const INITIAL_OFFSETS = [0, -60, -30, -80];
const HOVER_OFFSETS = [-100, 40, -80, 30];

export function BforBankShowcase() {
  return (
    <div
      className="bfor-showcase relative h-[320px] md:h-[480px] overflow-hidden flex items-center gap-[20px] md:gap-[24px] py-[24px]"
    >
      {COLUMNS.map((screens, colIndex) => (
        <div
          key={colIndex}
          className={`${colIndex >= 2 ? "hidden md:flex" : "flex"} flex-1 flex-col gap-[20px] md:gap-[24px] transition-transform duration-[12000ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]`}
          style={{
            transform: `translateY(${INITIAL_OFFSETS[colIndex]}px)`,
          }}
          data-bfor-col={colIndex}
        >
          {screens.map((src) => (
            <IPhoneFrame key={src} className="shrink-0">
              <Image
                src={src}
                alt="BforBank app screen"
                width={300}
                height={650}
                className="w-full h-auto block"
              />
            </IPhoneFrame>
          ))}
        </div>
      ))}

      {/* Fade edges — uses CSS var that switches on parent card hover */}
      <div className="bfor-fade-top pointer-events-none absolute inset-x-0 top-0 h-[48px] z-10" />
      <div className="bfor-fade-bottom pointer-events-none absolute inset-x-0 bottom-0 h-[48px] z-10" />

      <style>{`
        .bfor-fade-top {
          background: linear-gradient(to bottom, var(--sem-bg) 0%, var(--sem-bg) 20%, transparent 100%);
          transition: background 0.3s;
        }
        .bfor-fade-bottom {
          background: linear-gradient(to top, var(--sem-bg) 0%, var(--sem-bg) 20%, transparent 100%);
          transition: background 0.3s;
        }
        .hover-subtle:hover .bfor-fade-top {
          background: linear-gradient(to bottom, var(--sem-surface) 0%, var(--sem-surface) 20%, transparent 100%);
        }
        .hover-subtle:hover .bfor-fade-bottom {
          background: linear-gradient(to top, var(--sem-surface) 0%, var(--sem-surface) 20%, transparent 100%);
        }
        .hover-subtle:hover [data-bfor-col="0"] { transform: translateY(${HOVER_OFFSETS[0]}px) !important; }
        .hover-subtle:hover [data-bfor-col="1"] { transform: translateY(${HOVER_OFFSETS[1]}px) !important; }
        .hover-subtle:hover [data-bfor-col="2"] { transform: translateY(${HOVER_OFFSETS[2]}px) !important; }
        .hover-subtle:hover [data-bfor-col="3"] { transform: translateY(${HOVER_OFFSETS[3]}px) !important; }
      `}</style>
    </div>
  );
}
