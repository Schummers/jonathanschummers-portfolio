import { IconLinkedIn, IconGitHub } from "@/components/icons";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[var(--blueprint-max)] flex-col items-center gap-md border-x border-border px-xl py-xl max-md:px-md md:flex-row md:justify-between md:max-lg:px-lg">
        <div className="flex gap-lg">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-body-sm font-medium text-text-secondary transition-colors duration-[var(--dur-fast)] ease-out hover-supported:text-text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-md">
          <a
            href="https://linkedin.com/in/jonathanschummers"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary transition-colors duration-[var(--dur-fast)] ease-out hover-supported:text-text-primary"
            aria-label="LinkedIn"
          >
            <IconLinkedIn size={16} />
          </a>
          <a
            href="https://github.com/jonathanschummers"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary transition-colors duration-[var(--dur-fast)] ease-out hover-supported:text-text-primary"
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
