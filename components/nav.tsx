"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { DarkModeToggle } from "@/components/dark-mode-toggle";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className={cn(
        "sticky top-0 z-50",
        "border-b border-border",
        "bg-bg/95 backdrop-blur-sm"
      )}
    >
      <div className="mx-auto flex h-16 max-w-blueprint items-center justify-between border-x border-border px-xl max-md:px-md md:max-lg:px-lg">
        <a
          href="#"
          className="font-display text-h4 font-bold tracking-h2 text-text-primary"
        >
          Jonathan S.
        </a>

        <div className="hidden items-center gap-lg md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-body-sm font-semibold text-text-secondary transition-colors duration-[var(--dur-fast)] ease-out hover-supported:text-text-primary"
            >
              {link.label}
            </a>
          ))}
          <DarkModeToggle />
        </div>

        <div className="flex items-center gap-sm md:hidden">
          <DarkModeToggle />
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="p-xs text-text-primary"
          >
            {open ? <XMarkIcon className="size-6" /> : <Bars3Icon className="size-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-b border-border bg-bg md:hidden">
          <div className="mx-auto max-w-blueprint border-x border-border px-xl py-lg max-md:px-md">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-sm font-body text-body font-semibold text-text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
