"use client";

import Image from "next/image";
import { IPhoneFrame } from "@/components/iphone-frame";

const COLUMNS = [
  // Col 1 — moves UP on hover
  [
    "/images/Hero/Bforbank/IMG_2622.webp",   // Offer selection
    "/images/Hero/Bforbank/IMG_2632.webp",   // Password step
  ],
  // Col 2 — moves DOWN on hover
  [
    "/images/Hero/Bforbank/IMG_2625.webp",   // Category select
    "/images/Hero/Bforbank/IMG_2623.webp",   // Card view
    "/images/Hero/Bforbank/IMG_2635.webp",   // Email step
  ],
  // Col 3 — moves UP on hover
  [
    "/images/Hero/Bforbank/Frame 1597884611.webp", // Home/Balance
    "/images/Hero/Bforbank/IMG_2628.webp",         // Transactions
    "/images/Hero/Bforbank/IMG_2636-1.webp",       // Fiscal info
  ],
  // Col 4 — moves DOWN on hover
  [
    "/images/Hero/Bforbank/IMG_2636.webp",       // Country select
    "/images/Hero/Bforbank/IMG_3216 3.webp",     // Transfer confirm
  ],
];

// Initial Y offsets (staggered for visual rhythm)
const INITIAL_OFFSETS = [0, -60, -30, -80];

// Hover Y offsets (alternating up/down movement)
const HOVER_OFFSETS = [-100, 40, -80, 30];

export function BforBankShowcase() {
  return (
    <div className="group relative h-[320px] md:h-[480px] overflow-hidden flex items-center gap-[20px] md:gap-[24px] py-[24px]">
      {COLUMNS.map((screens, colIndex) => (
        <div
          key={colIndex}
          className={`${colIndex >= 2 ? "hidden md:flex" : "flex"} flex-1 flex-col gap-[20px] md:gap-[24px] transition-transform duration-[8000ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]`}
          style={{
            transform: `translateY(${INITIAL_OFFSETS[colIndex]}px)`,
          }}
          data-col={colIndex}
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

      {/* Fade edges — gradient from background color to transparent */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[48px] z-10"
        style={{
          background: "linear-gradient(to bottom, var(--sem-bg) 0%, var(--sem-bg) 20%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[48px] z-10"
        style={{
          background: "linear-gradient(to top, var(--sem-bg) 0%, var(--sem-bg) 20%, transparent 100%)",
        }}
      />

      {/* Hover animations via CSS */}
      <style>{`
        .group:hover [data-col="0"] { transform: translateY(${HOVER_OFFSETS[0]}px) !important; }
        .group:hover [data-col="1"] { transform: translateY(${HOVER_OFFSETS[1]}px) !important; }
        .group:hover [data-col="2"] { transform: translateY(${HOVER_OFFSETS[2]}px) !important; }
        .group:hover [data-col="3"] { transform: translateY(${HOVER_OFFSETS[3]}px) !important; }
      `}</style>
    </div>
  );
}
