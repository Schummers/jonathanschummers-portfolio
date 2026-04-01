import Image from "next/image";
import { Section } from "@/components/blueprint-shell";
import { Button } from "@/components/button";
import { IconLinkedIn, IconMalt, IconGitHub } from "@/components/icons";
import { ArrowUpRightIcon } from "@heroicons/react/16/solid";

export function CtaFinal() {
  return (
    <Section id="contact" className="!p-0">
      <div className="grid md:grid-cols-2">
        {/* Photo — landscape crop of hero image, hidden on mobile */}
        <div className="hidden max-h-[500px] overflow-hidden border-r border-border md:block">
          <Image
            src="/images/Hero/Profil.webp"
            alt="Jonathan Schummers"
            width={700}
            height={500}
            className="h-full w-full object-cover object-[center_25%]"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between p-xl max-md:px-md max-md:py-xl">
          <div className="flex flex-1 flex-col justify-center gap-lg">
            <div className="flex flex-col gap-md">
              <h2 className="font-display text-h2 font-bold leading-h2 tracking-h2 text-text-primary">
                Have a project? Let&apos;s talk.
              </h2>
              <div className="flex flex-col gap-xs">
                <p className="font-body text-body text-text-secondary">
                  1. Clarify your needs on a free discovery call
                </p>
                <p className="font-body text-body text-text-secondary">
                  2. Get a quote with hours and rates
                </p>
                <p className="font-body text-body text-text-secondary">
                  3. Start working together
                </p>
              </div>
            </div>
            <Button
              href="https://calendly.com/jonathan-schummers/discovery-call"
              size="xl"
              className="w-fit"
            >
              Book a call
              <ArrowUpRightIcon className="ml-xs size-5" />
            </Button>
          </div>

          {/* Social links */}
          <div className="mt-xl flex flex-wrap items-center gap-md">
            <a
              href="https://linkedin.com/in/jonathanschummers"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary transition-colors duration-[var(--dur-fast)] ease-out [@media(hover:hover){&:hover}]:text-text-primary"
              aria-label="LinkedIn"
            >
              <IconLinkedIn size={18} />
            </a>
            <a
              href="https://www.malt.fr/profile/jonathanschummers"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary transition-colors duration-[var(--dur-fast)] ease-out [@media(hover:hover){&:hover}]:text-text-primary"
              aria-label="Malt"
            >
              <IconMalt size={18} />
            </a>
            <a
              href="https://github.com/jonathanschummers"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary transition-colors duration-[var(--dur-fast)] ease-out [@media(hover:hover){&:hover}]:text-text-primary"
              aria-label="GitHub"
            >
              <IconGitHub size={18} />
            </a>
            <a
              href="mailto:jonathan.schummers@gmail.com"
              className="font-body text-body-sm text-text-secondary transition-colors duration-[var(--dur-fast)] ease-out [@media(hover:hover){&:hover}]:text-text-primary"
            >
              jonathan.schummers@gmail.com
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
