import type { Metadata } from "next";
import { BlueprintShell } from "@/components/blueprint-shell";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { ProjectsFeatured } from "@/components/projects-featured";
import { ProjectsCompact } from "@/components/projects-compact";
import { Testimonials } from "@/components/testimonials";
import { About } from "@/components/about";
import { CtaFinal } from "@/components/cta-final";
import { Footer } from "@/components/footer";

/**
 * Le portfolio d'avant le 2026-08-14, conserve mot pour mot pour les clients
 * freelance. La home, elle, s'adresse desormais a un recruteur.
 * Non indexee : une recherche sur le nom doit tomber sur la home.
 */
export const metadata: Metadata = {
  title: "Freelance product design",
  description:
    "Jonathan Schummers — freelance product designer for proptech & fintech SaaS.",
  robots: { index: false, follow: true },
};

export default function FreelancePage() {
  return (
    <>
      <Nav />
      <BlueprintShell>
        <Hero variant="freelance" />
        <ProjectsFeatured />
        <ProjectsCompact />
        <Testimonials />
        <About />
        <CtaFinal variant="freelance" />
      </BlueprintShell>
      <Footer />
    </>
  );
}
