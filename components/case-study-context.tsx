import Image from "next/image";
import type { CaseStudyStep as StepData } from "@/lib/case-studies";
import { CaseStudyContent } from "./case-study-content";
import { CaseStudyImageGrid } from "./case-study-image-grid";

interface CaseStudyContextProps {
  steps: StepData[];
  slug: string;
}

const LABEL_CLASS =
  "font-body text-label font-bold uppercase tracking-label text-text-secondary";

function find(steps: StepData[], heading: string) {
  return steps.find((s) => s.heading.toLowerCase() === heading.toLowerCase());
}

/* Renders the Context block as one continuous flow:
   Problem, then Target audience / Team side by side, then a Key results card.
   Replaces the old "Context" section label + header metric card. */
export function CaseStudyContext({ steps, slug }: CaseStudyContextProps) {
  const problem = find(steps, "Problem");
  const audience = find(steps, "Target audience");
  const team = find(steps, "Team");
  const keyResults = find(steps, "Key results");

  return (
    <div className="mx-auto max-w-content">
      {problem && (
        <div>
          <p className={LABEL_CLASS}>Problem</p>
          <CaseStudyContent text={problem.content} leadingClass="mt-xs" />
          <CaseStudyImageGrid images={problem.images} />
        </div>
      )}

      {(audience || team) && (
        <div className="mt-xl grid grid-cols-2 gap-xl max-md:grid-cols-1 max-md:gap-lg">
          {audience && (
            <div>
              <p className={LABEL_CLASS}>Target audience</p>
              <CaseStudyContent text={audience.content} leadingClass="mt-xs" />
              <CaseStudyImageGrid images={audience.images} />
            </div>
          )}
          {team && (
            <div>
              <p className={LABEL_CLASS}>Team</p>
              <CaseStudyContent text={team.content} leadingClass="mt-xs" />
              <CaseStudyImageGrid images={team.images} />
            </div>
          )}
        </div>
      )}

      {keyResults && (
        <div className="mt-xl bg-surface px-md py-md">
          <p className={LABEL_CLASS}>Key results</p>
          <CaseStudyContent text={keyResults.content} leadingClass="mt-xs" />

          {slug === "bforbank" && (
            <div className="mt-md">
              <Image
                src="/images/Experiences/Bforbank/image%2055.webp"
                alt="Google Finance UX Benchmark 2023, BforBank ranked #1"
                width={640}
                height={400}
                className="w-full object-contain"
              />
              <p className="mt-xs font-body text-caption italic font-normal text-text-tertiary">
                Source :{" "}
                <a
                  href="https://www.bforbank.com/blog/parlons-vous-et-nous/google-ux-benchmark-bforbank-elue-meilleur-parcours-client"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover-supported:text-text-secondary transition-colors"
                >
                  Google Finance UX Benchmark 2023, BforBank
                </a>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
