import { IconLinkedIn, IconMalt, IconGitHub } from "@/components/icons";

/* Absolute paths so the links stay functional on deep pages (/work/<slug>). */
const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

/* 40px minimum touch target on icon links; negative margin keeps the visual
   footprint of the 16px glyphs unchanged. */
const socialLinkClass =
  "-my-sm flex size-10 shrink-0 items-center justify-center text-text-secondary transition-colors duration-[var(--dur-fast)] ease-out hover-supported:text-text-primary";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[var(--blueprint-max)] flex-col items-center gap-md border-x border-border px-xl py-xl max-md:px-md md:flex-row md:justify-between md:max-lg:px-lg">
        <nav aria-label="Footer" className="flex gap-lg">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex min-h-10 items-center font-body text-body-sm font-medium text-text-secondary transition-colors duration-[var(--dur-fast)] ease-out hover-supported:text-text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-sm">
          <a
            href="https://linkedin.com/in/jonathanschummers"
            target="_blank"
            rel="noopener noreferrer"
            className={socialLinkClass}
            aria-label="LinkedIn"
          >
            <IconLinkedIn size={16} />
          </a>
          <a
            href="https://www.malt.fr/profile/jonathanschummers"
            target="_blank"
            rel="noopener noreferrer"
            className={socialLinkClass}
            aria-label="Malt"
          >
            <IconMalt size={16} />
          </a>
          <a
            href="https://github.com/Schummers"
            target="_blank"
            rel="noopener noreferrer"
            className={socialLinkClass}
            aria-label="GitHub"
          >
            <IconGitHub size={16} />
          </a>
          <span className="font-body text-body-sm text-text-tertiary">
            © 2026 Jonathan Schummers
          </span>
        </div>
      </div>
    </footer>
  );
}
