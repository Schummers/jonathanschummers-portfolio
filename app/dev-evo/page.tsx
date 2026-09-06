import { CaseStudyEvolution, type EvolutionFrame } from "@/components/case-study-evolution";

/* Page de comparaison jetable : trois mises en scene du meme avant/apres.
   A supprimer une fois la variante choisie et branchee dans le case study. */
const BASE = "/images/Experiences/You Alive/you-alive-design-evo-";

const FRAMES: EvolutionFrame[] = [
  {
    src: `${BASE}1.webp`,
    label: "AI generated",
    caption: "Everything centred, one rounded card after another, no section structure",
  },
  {
    src: `${BASE}2.webp`,
    label: "Commit 1: manual pass on the generated parts",
    caption: "Real copy in place, still centred, still the same card stack",
  },
  {
    src: `${BASE}3.webp`,
    label: "Commit 2: rework heroes, CTAs and hierarchy",
    caption: "Section eyebrows, text set to the left, wider measure, one heading style",
  },
  {
    src: `${BASE}4.webp`,
    label: "Commit 3: rhythm and hierarchy polish",
    caption: "Alternating bands, one vertical rhythm, headings rewritten, body text darker",
  },
];

export default function DevEvoPage() {
  return (
    <main className="mx-auto max-w-content px-md py-3xl flex flex-col gap-4xl">
      <section>
        <h2 className="font-display text-h3 font-bold leading-h3 tracking-h3 text-text-primary">A. Commit strip</h2>
        <CaseStudyEvolution frames={FRAMES} mode="strip" />
      </section>
      <section>
        <h2 className="font-display text-h3 font-bold leading-h3 tracking-h3 text-text-primary">B. Timeline in one iPhone</h2>
        <CaseStudyEvolution frames={FRAMES} mode="timeline" />
      </section>
      <section>
        <h2 className="font-display text-h3 font-bold leading-h3 tracking-h3 text-text-primary">C. Scrollytelling</h2>
        <CaseStudyEvolution frames={FRAMES} mode="scrolly" />
      </section>
    </main>
  );
}
