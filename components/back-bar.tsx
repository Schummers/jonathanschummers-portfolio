"use client";

import { useEffect, useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { cn } from "@/lib/cn";

export function BackBar() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const currentY = window.scrollY;
      if (currentY < lastScrollY || currentY < 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
      setLastScrollY(currentY);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={cn(
        "sticky top-16 z-40 border-b border-border bg-bg/95 backdrop-blur-sm transition-transform duration-[var(--dur-base)] ease-out",
        visible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="px-xl py-sm max-md:px-md md:max-lg:px-lg">
        <a
          href="/#work"
          className="inline-flex items-center gap-xs font-body text-body-sm font-semibold text-text-secondary transition-colors duration-[var(--dur-fast)] ease-out [@media(hover:hover){&:hover}]:text-text-primary"
        >
          <ArrowLeftIcon className="size-4" />
          Back to homepage
        </a>
      </div>
    </div>
  );
}
