"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

interface TocItem {
  id: string;
  label: string;
}

export function CaseStudyToc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <nav className="hidden lg:block sticky top-36 self-start w-[204px] shrink-0">
        <ul className="flex flex-col gap-xs">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "block font-body text-body-sm transition-colors duration-[var(--dur-fast)] ease-out",
                  activeId === item.id
                    ? "text-text-primary font-semibold"
                    : "text-text-secondary [@media(hover:hover){&:hover}]:text-text-primary"
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile/Tablet: inline TOC */}
      <nav className="lg:hidden">
        <ul className="flex flex-col gap-xs">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="block font-body text-body-sm text-text-secondary transition-colors duration-[var(--dur-fast)] ease-out [@media(hover:hover){&:hover}]:text-text-primary"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
