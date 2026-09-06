import { CaseStudyEvolution, type EvolutionFrame } from "@/components/case-study-evolution";

/* Page de comparaison jetable : la timeline dans un iPhone, pilotee au
   scroll et aux fleches. A supprimer une fois branchee dans le case study. */
const BASE = "/images/Experiences/You Alive/you-alive-design-evo-";

const FRAMES: EvolutionFrame[] = [
  {
    src: `${BASE}1.webp`,
    label: "AI generated, final copy dropped in",
    caption:
      "What the generator gave me once the real words were in: everything centred, one rounded card after another, no way to tell one section from the next.",
  },
  {
    src: `${BASE}2.webp`,
    label: "Commit 2: heroes, CTAs and hierarchy",
    caption:
      "I set the text to the left, gave every section an eyebrow and one heading style, and widened the measure so paragraphs read as paragraphs.",
  },
  {
    src: `${BASE}3.webp`,
    label: "Commit 3: rhythm and contrast",
    caption:
      "I alternated the section backgrounds, unified the vertical rhythm, darkened the body text and rewrote the section titles to say something.",
  },
];

export default function DevEvoPage() {
  return (
    <main className="mx-auto max-w-content px-md py-3xl">
      <p className="font-body text-body leading-body text-text-primary">
        Then three days by hand on 9 of them: strip the AI slop look, fix hierarchy, spacing, rhythm and contrast, dose the animations, and assemble three candidates per creative. A round of feedback from her, one more pass.
      </p>
      <CaseStudyEvolution frames={FRAMES} />
      <p className="mt-lg font-body text-body leading-body text-text-primary">
        Since this was a fake-door test, none of it was engineered: no design system, no components, no code review. Vibe-coded on purpose, quick and dirty on a basic UI style guide, because the page only had to live long enough to answer one question.
      </p>
      <div className="h-screen" />
    </main>
  );
}
