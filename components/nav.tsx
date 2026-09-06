"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { DarkModeToggle } from "@/components/dark-mode-toggle";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

/* Absolute paths so the links stay functional on deep pages (/work/<slug>),
   where bare #anchors resolve against the current page and go nowhere. */
const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Projects", href: "/#projects" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact", href: "/#contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector("a")?.focus();
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <nav
      aria-label="Main"
      className={cn(
        "sticky top-0 z-50",
        "border-b border-border",
        "bg-bg/95 backdrop-blur-sm"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[var(--blueprint-max)] items-center justify-between border-x border-border px-xl max-md:px-md md:max-lg:px-lg">
        <a
          href="/"
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
            ref={buttonRef}
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="p-xs text-text-primary"
          >
            {open ? <XMarkIcon className="size-6" /> : <Bars3Icon className="size-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" ref={menuRef} className="border-b border-border bg-bg md:hidden">
          <div className="mx-auto max-w-[var(--blueprint-max)] border-x border-border px-xl py-lg max-md:px-md">
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
