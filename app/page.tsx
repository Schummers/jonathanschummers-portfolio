import { BlueprintShell } from "@/components/blueprint-shell";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { ProjectsFeatured } from "@/components/projects-featured";
import { ProjectsCompact } from "@/components/projects-compact";
import { ProjectsGrid } from "@/components/projects-grid";
import { Testimonials } from "@/components/testimonials";
import { About } from "@/components/about";
import { CtaFinal } from "@/components/cta-final";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <BlueprintShell>
        <Hero />
        <ProjectsFeatured />
        <ProjectsCompact />
        <ProjectsGrid />
        <Testimonials />
        <About />
        <CtaFinal />
      </BlueprintShell>
      <Footer />
    </>
  );
}
