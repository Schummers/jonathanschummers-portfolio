import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { BlueprintShell } from "@/components/blueprint-shell";
import { BackBar } from "@/components/back-bar";
import { CaseStudyToc } from "@/components/case-study-toc";
import { CaseStudyHeader } from "@/components/case-study-header";
import { CaseStudyContext } from "@/components/case-study-context";
import { CaseStudyStep } from "@/components/case-study-step";
import { CaseStudyContent } from "@/components/case-study-content";
import { CaseStudyImageGrid } from "@/components/case-study-image-grid";
import { Button } from "@/components/button";
import { Footer } from "@/components/footer";
import { ArrowUpRightIcon } from "@heroicons/react/16/solid";
import { getCaseStudy, getAllCaseStudySlugs } from "@/lib/case-studies";
import type { CaseStudyStep as StepData } from "@/lib/case-studies";
import { projects } from "@/lib/data";
import { IPhoneFrame } from "@/components/iphone-frame";

/* Map markdown section headings to display labels and IDs */
const SECTION_MAP: Record<string, { id: string; label: string }> = {
  // Context group
  "Context & Objectives": { id: "context", label: "Context" },
  Context: { id: "context", label: "Context" },
  Challenges: { id: "context", label: "Context" },
  "Business Value": { id: "context", label: "Context" },
  "Business Outcomes": { id: "context", label: "Context" },
  // How group
  "How I solved this problem": { id: "how", label: "How I solved this problem" },
  "The Challenge": { id: "how", label: "How I solved this problem" },
  "Users Tests in Prod (5 users out of 9)": { id: "how", label: "How I solved this problem" },
  "How Might We": { id: "how", label: "How I solved this problem" },
  "Design Studio Workshop with the Squad": { id: "how", label: "How I solved this problem" },
  "First Iteration Design": { id: "how", label: "How I solved this problem" },
  "Second Iteration Pushed to Production": { id: "how", label: "How I solved this problem" },
  "Target & Method": { id: "how", label: "How I solved this problem" },
  // Delivered group
  "What we delivered": { id: "delivered", label: "What we delivered" },
  "Product Team": { id: "delivered", label: "What we delivered" },
  "Personal Development": { id: "delivered", label: "What we delivered" },
  Reflections: { id: "delivered", label: "What we delivered" },
  // Skip
  Images: { id: "images", label: "" },
};

/* Sections to skip entirely */
const SKIP_SECTIONS = ["Headline", "Subtitle", "Scope", "Images", "Impact"];

interface ProcessedSection {
  id: string;
  label: string;
  subsections: {
    heading: string;
    content: string;
    images: { alt: string; src: string }[];
    steps: StepData[];
  }[];
}

function processSections(
  sections: { heading: string; content: string; images: { alt: string; src: string }[]; steps: StepData[] }[]
) {
  const headline =
    sections.find((s) => s.heading === "Headline")?.content || "";
  const subtitle =
    sections.find((s) => s.heading === "Subtitle")?.content || "";

  // Group sections into the 3 main blocks
  const grouped: ProcessedSection[] = [
    { id: "context", label: "Context", subsections: [] },
    { id: "how", label: "How I solved this problem", subsections: [] },
    { id: "delivered", label: "What we delivered", subsections: [] },
  ];

  for (const section of sections) {
    if (SKIP_SECTIONS.includes(section.heading)) continue;

    const mapping = SECTION_MAP[section.heading];
    if (!mapping) continue;

    const group = grouped.find((g) => g.id === mapping.id);
    if (group) {
      group.subsections.push({
        heading: section.heading,
        content: section.content,
        images: section.images,
        steps: section.steps,
      });
    }
  }

  // Remove empty groups
  const filteredGroups = grouped.filter((g) => g.subsections.length > 0);

  return { headline, subtitle, groups: filteredGroups };
}

/* Parse **bold** inline markdown */

export async function generateStaticParams() {
  const slugs = getAllCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Case Study" };

  const headline =
    study.sections.find((s) => s.heading === "Headline")?.content || "";

  return {
    title: study.frontmatter.title,
    description: headline,
    openGraph: {
      type: "article",
      title: study.frontmatter.title,
      description: headline,
      images: [
        {
          url: study.frontmatter.heroImage,
          width: 1400,
          height: 700,
          alt: study.frontmatter.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: study.frontmatter.title,
      description: headline,
      images: [study.frontmatter.heroImage],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const project = projects.find((p) => p.slug === slug);
  const { headline, groups } = processSections(study.sections);

  const tocItems = [
    ...groups.map((g) => ({ id: g.id, label: g.label })),
    { id: "interested", label: "Book a call" },
  ];

  /* Context is rendered inline with the header as one continuous flow.
     The remaining groups (how, delivered) keep the separated-section layout. */
  const contextGroup = groups.find((g) => g.id === "context");
  const contextSteps = contextGroup
    ? contextGroup.subsections.flatMap((s) => s.steps)
    : [];
  const contentGroups = groups.filter((g) => g.id !== "context");

  const heroImage = study.frontmatter.heroImage;

  return (
    <>
      <Nav />
      <BlueprintShell>
        <BackBar />

        {/* Hero */}
        {slug === "bforbank" ? (
          <section className="border-b border-border">
            {/* bforbank-only fluid grid: clamp(8px,1.5vw,24px) keeps the 7-column
                IPhoneFrame strip visually balanced across viewports without
                triggering layout reflows at breakpoints. Intentional exception
                to the token scale. */}
            <div className="grid grid-cols-7 gap-[clamp(8px,1.5vw,24px)] px-xl py-xl max-md:px-md max-md:py-md">
              {[
                "/images/Experiences/Bforbank/IMG_2625.webp",
                "/images/Experiences/Bforbank/IMG_2628.webp",
                "/images/Experiences/Bforbank/IMG_2622.webp",
                "/images/Experiences/Bforbank/IMG_2623.webp",
                "/images/Experiences/Bforbank/IMG_2632.webp",
                "/images/Experiences/Bforbank/IMG_2635.webp",
                "/images/Experiences/Bforbank/IMG_2636.webp",
              ].map((src, i) => (
                <IPhoneFrame key={i}>
                  <Image
                    src={src}
                    alt={`BforBank onboarding screen ${i + 1}`}
                    width={200}
                    height={433}
                    className="w-full h-auto block"
                    priority={i < 4}
                  />
                </IPhoneFrame>
              ))}
            </div>
          </section>
        ) : (
          <section className="border-b border-border px-xl py-xl max-md:px-md max-md:py-md">
            <Image
              src={heroImage}
              alt={study.frontmatter.title}
              width={1400}
              height={700}
              className="w-full h-auto"
              priority
            />
          </section>
        )}

        {/* 3-column layout */}
        <div className="flex max-xl:block">
          {/* Left column: TOC */}
          <div className="hidden xl:block w-[calc((100%-var(--case-center))/2)] min-w-36 shrink-0 border-r border-border">
            <div className="sticky top-20 px-xl py-xl">
              <CaseStudyToc items={tocItems} />
            </div>
          </div>

          {/* Center column: 864px max */}
          <div className="flex-1 xl:max-w-center">
            {/* Mobile TOC — sits above the title so the header → Context flow
                stays continuous on mobile (hidden on desktop, left rail instead) */}
            <div className="py-md px-xl border-b border-border xl:hidden max-md:px-md md:max-xl:px-lg">
              <div className="mx-auto max-w-content">
                <CaseStudyToc items={tocItems} />
              </div>
            </div>

            {/* Header + Context, one continuous flow (no label, no separator) */}
            <section id="context" className="px-xl py-xl max-md:px-md md:max-xl:px-lg">
              <CaseStudyHeader
                company={project?.company}
                title={project?.title || headline}
                duration={study.frontmatter.duration}
                tags={study.frontmatter.tags}
              />
              {contextSteps.length > 0 && (
                <div className="mt-lg">
                  <CaseStudyContext steps={contextSteps} slug={slug} />
                </div>
              )}
            </section>

            {/* Content sections */}
            {contentGroups.map((group) => (
              <section key={group.id} id={group.id}>
                <hr className="border-t border-border" />

                <div className="px-xl py-xl max-md:px-md md:max-xl:px-lg">
                  <div className="mx-auto max-w-content">
                    {/* Section label */}
                    <h2 className="font-body text-label font-bold uppercase tracking-label text-text-secondary">
                      {group.label}
                    </h2>

                    {/* Subsections */}
                    {group.subsections.map((sub, subIndex) => {
                      const showHeading =
                        sub.heading.toLowerCase() !== group.label.toLowerCase() &&
                        !sub.heading.toLowerCase().startsWith(group.label.toLowerCase());

                      return (
                        <div key={subIndex} className={subIndex === 0 ? "mt-md" : "mt-xl"}>
                          {showHeading && (
                            <h3 className="font-display text-body-lg font-bold leading-body text-text-primary">
                              {sub.heading}
                            </h3>
                          )}

                          {/* Section-level content (before any ### steps) */}
                          <div className={showHeading ? "mt-xs" : ""}>
                            <CaseStudyContent text={sub.content} />
                          </div>

                          {/* Section-level images — skip for bforbank delivered (shown in iPhone grid below) */}
                          {!(slug === "bforbank" && group.id === "delivered") && (
                            <CaseStudyImageGrid images={sub.images} />
                          )}

                          {/* BforBank: iPhone grid in delivered section */}
                          {slug === "bforbank" && group.id === "delivered" && sub.images.length > 0 && (
                            <div className="mt-xl grid grid-cols-3 gap-xl max-md:grid-cols-1">
                              {sub.images.map((img, i) => (
                                <IPhoneFrame key={i}>
                                  <Image
                                    src={img.src}
                                    alt={img.alt}
                                    width={390}
                                    height={844}
                                    className="w-full h-auto block"
                                  />
                                </IPhoneFrame>
                              ))}
                            </div>
                          )}

                          {/* Steps (### subsections) */}
                          {sub.steps.map((step, stepIdx) => {
                            const isBforBankStep6 =
                              slug === "bforbank" &&
                              group.id === "how" &&
                              stepIdx === 5 &&
                              step.images.length === 2;

                            if (isBforBankStep6) {
                              return (
                                <div key={stepIdx} className="mt-xl">
                                  <hr className="border-t border-border/50 mb-xl" />
                                  <h3 className="font-display text-h3 font-bold leading-h3 tracking-h3 text-text-primary">
                                    {step.heading}
                                  </h3>
                                  <div className="mt-xs">
                                    <CaseStudyContent text={step.content} />
                                  </div>
                                  <div className="mt-lg flex gap-xl justify-center">
                                    <figure className="flex flex-col">
                                      {/* bforbank step 6: fixed 600px height preserves the
                                          1:1 side-by-side comparison ratio between the
                                          original screenshot and the redesigned screen.
                                          Inline style intentional — one-off layout. */}
                                      <Image
                                        src={step.images[0].src}
                                        alt={step.images[0].alt}
                                        width={390}
                                        height={844}
                                        style={{ height: 600, width: "auto" }}
                                        className="block"
                                      />
                                      <figcaption className="mt-xs font-body text-caption italic font-normal text-text-tertiary">
                                        {step.images[0].alt}
                                      </figcaption>
                                    </figure>
                                    <figure className="flex flex-col">
                                      <IPhoneFrame>
                                        {/* bforbank step 6: same fixed height as above
                                            for the iPhone-framed redesign. */}
                                        <Image
                                          src={step.images[1].src}
                                          alt={step.images[1].alt}
                                          width={390}
                                          height={844}
                                          style={{ height: 600, width: "auto" }}
                                          className="block"
                                        />
                                      </IPhoneFrame>
                                      <figcaption className="mt-xs font-body text-caption italic font-normal text-text-tertiary">
                                        {step.images[1].alt}
                                      </figcaption>
                                    </figure>
                                  </div>
                                </div>
                              );
                            }

                            return (
                              <CaseStudyStep
                                key={stepIdx}
                                step={step}
                                stepIndex={stepIdx}
                                groupId={group.id}
                                isFirstWithContent={stepIdx === 0 && !!sub.content}
                              />
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            ))}

            {/* Book a call CTA */}
            <section id="interested">
              <hr className="border-t border-border" />
              <div className="px-xl py-xl max-md:px-md md:max-xl:px-lg">
                <div className="mx-auto max-w-content">
                  <h2 className="font-body text-label font-bold uppercase tracking-label text-text-secondary">
                    Book a call
                  </h2>
                  <p className="mt-md font-display text-h3 font-bold leading-h3 tracking-h3 text-text-primary">
                    Let&apos;s talk about this project or anything else.
                  </p>
                  <div className="mt-lg">
                    <Button href="https://calendly.com/jonathan-schummers/discovery-call">
                      Book a call
                      <ArrowUpRightIcon className="ml-xs size-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right column: symmetry */}
          <div className="hidden xl:block w-[calc((100%-var(--case-center))/2)] min-w-36 shrink-0 border-l border-border" />
        </div>
      </BlueprintShell>
      <Footer />
    </>
  );
}
