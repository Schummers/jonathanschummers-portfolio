import Image from "next/image";
import { Section } from "@/components/blueprint-shell";
import { Button } from "@/components/button";
import { ArrowUpRightIcon } from "@heroicons/react/20/solid";

/**
 * Deux publics, deux heros.
 *
 * `default` : recherche de poste salarie (positionnement du 2026-08-14).
 * `freelance` : le hero de prospection client, conserve mot pour mot, servi
 * sur /freelance uniquement.
 *
 * Cadrage complet : ~/AI OS/agency/pipeline/_shared/guide-linkedin.md
 */
type HeroVariant = "default" | "freelance";

export function Hero({ variant = "default" }: { variant?: HeroVariant }) {
  const isFreelance = variant === "freelance";

  return (
    <Section className="!p-0">
      <div className="grid md:grid-cols-2">
        {/* Copy — vertically centered */}
        <div className="flex flex-col justify-center px-xl py-xl max-md:px-md md:max-lg:px-lg">
          {/* Section label */}
          <p className="font-display text-h3 font-bold leading-h3 tracking-h3 text-text-secondary">
            Hi, I&apos;m Jonathan.
          </p>

          {/* Tagline — H1 */}
          <h1 className="mt-sm font-display text-h1 font-bold leading-h1 tracking-h1 text-text-primary">
            Data-driven designer with PM skills{isFreelance ? "" : " (6y+)"}.
          </h1>

          {/* Subtitle — H2, freelance only: c'est une promesse de prestation */}
          {isFreelance && (
            <p className="mt-lg font-display text-h2 font-bold leading-h2 tracking-h2 text-text-primary">
              I help proptech &amp; fintech teams de-risk what they build, then design it end-to-end.
            </p>
          )}

          {/* Body text */}
          <div className="mt-md max-w-[var(--case-prose)]">
            <p className="font-body text-body-lg leading-body text-text-primary">
              {isFreelance ? "Six years in, I still believe " : "I believe "}
              the fastest way to learn is to ship, track &amp; iterate, and now
              I use AI to shorten that loop even more.
            </p>
            <p className="mt-sm font-body text-body leading-body text-text-secondary">
              {isFreelance
                ? "Based in Luxembourg, working remotely."
                : "Based in Luxembourg, open to relocate."}
            </p>
          </div>

          {/* CTA */}
          <div className="mt-lg">
            <Button
              href={
                isFreelance
                  ? "https://calendly.com/jonathan-schummers/discovery-call"
                  : "mailto:jonathan.schummers@gmail.com"
              }
              size="xl"
            >
              Get in touch
              <ArrowUpRightIcon className="ml-xs size-5" />
            </Button>
          </div>
        </div>

        {/* Photo — flush against grid lines */}
        <div className="overflow-hidden border-l border-border max-md:border-l-0 max-md:border-t max-md:border-border">
          <Image
            src="/images/Hero/Profil.webp"
            alt="Jonathan Schummers"
            width={700}
            height={840}
            className="h-full w-full object-cover object-bottom"
            priority
          />
        </div>
      </div>
    </Section>
  );
}
