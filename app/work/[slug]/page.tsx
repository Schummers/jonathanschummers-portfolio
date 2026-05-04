import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { BlueprintShell } from "@/components/blueprint-shell";
import { BackBar } from "@/components/back-bar";
import { CaseStudyToc } from "@/components/case-study-toc";
import { Tag } from "@/components/tag";
import { Button } from "@/components/button";
import { Footer } from "@/components/footer";
import { ArrowUpRightIcon } from "@heroicons/react/16/solid";
import { getCaseStudy, getAllCaseStudySlugs } from "@/lib/case-studies";
import type { CaseStudyStep } from "@/lib/case-studies";
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
    steps: CaseStudyStep[];
  }[];
}

function processSections(
  sections: { heading: string; content: string; images: { alt: string; src: string }[]; steps: CaseStudyStep[] }[]
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
function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function renderContent(text: string) {
  const blocks = text.split("\n\n").filter(Boolean);

  return blocks.map((block, i) => {
    const trimmed = block.trim();

    // Bullet list
    if (trimmed.startsWith("- ")) {
      const items = trimmed.split("\n").filter((l) => l.startsWith("- "));
      return (
        <ul key={i} className="mt-sm space-y-xs">
          {items.map((item, j) => (
            <li
              key={j}
              className="font-body text-body leading-body text-text-primary pl-md relative before:absolute before:left-0 before:top-[0.65em] before:h-[5px] before:w-[5px] before:rounded-full before:bg-text-secondary"
            >
              {renderInline(item.replace(/^- /, ""))}
            </li>
          ))}
        </ul>
      );
    }

    // Numbered list
    if (/^\d+\.\s/.test(trimmed)) {
      const items = trimmed.split("\n").filter((l) => /^\d+\.\s/.test(l));
      return (
        <ol key={i} className="mt-sm space-y-xs list-decimal pl-md">
          {items.map((item, j) => (
            <li
              key={j}
              className="font-body text-body leading-body text-text-primary"
            >
              {renderInline(item.replace(/^\d+\.\s/, ""))}
            </li>
          ))}
        </ol>
      );
    }

    // H3 within content
    if (trimmed.startsWith("### ")) {
      return (
        <h3
          key={i}
          className="mt-lg font-display text-h3 font-bold leading-h3 tracking-h3 text-text-primary"
        >
          {renderInline(trimmed.replace("### ", ""))}
        </h3>
      );
    }

    // Regular paragraph
    return (
      <p
        key={i}
        className="mt-sm font-body text-body leading-body text-text-primary"
      >
        {renderInline(trimmed)}
      </p>
    );
  });
}

/* Render images for a step — layout depends on count */
function renderStepImages(images: { alt: string; src: string }[]) {
  if (images.length === 0) return null;

  // 4+ images → 4-column row
  if (images.length >= 4) {
    return (
      <div className="mt-md grid grid-cols-4 gap-sm max-md:grid-cols-2">
        {images.slice(0, 4).map((img, i) => (
          <figure key={i}>
            <Image
              src={img.src}
              alt={img.alt}
              width={200}
              height={150}
              className="w-full object-cover"
            />
            {img.alt && (
              <figcaption className="mt-xs font-body text-caption italic font-normal text-text-tertiary">
                {img.alt}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    );
  }

  // 2 images → side by side, natural height
  if (images.length === 2) {
    return (
      <div className="mt-md grid grid-cols-2 gap-md items-start max-md:grid-cols-1">
        {images.map((img, i) => (
          <figure key={i}>
            <Image
              src={img.src}
              alt={img.alt}
              width={420}
              height={280}
              className="w-full h-auto"
            />
            {img.alt && (
              <figcaption className="mt-xs font-body text-caption italic font-normal text-text-tertiary">
                {img.alt}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    );
  }

  // 1 image → full width
  return (
    <figure className="mt-md">
      <Image
        src={images[0].src}
        alt={images[0].alt}
        width={640}
        height={400}
        className="w-full h-auto"
      />
      {images[0].alt && (
        <figcaption className="mt-xs font-body text-caption italic font-normal text-text-tertiary">
          {images[0].alt}
        </figcaption>
      )}
    </figure>
  );
}

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
    title: `${study.frontmatter.title} - Jonathan Schummers`,
    description: headline,
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
  const { headline, subtitle, groups } = processSections(study.sections);

  const tocItems = [
    ...groups.map((g) => ({ id: g.id, label: g.label })),
    { id: "interested", label: "Book a call" },
  ];

  const heroImage = study.frontmatter.heroImage;

  return (
    <>
      <Nav />
      <BlueprintShell>
        <BackBar />

        {/* Hero */}
        {slug === "bforbank" ? (
          <section className="border-b border-border">
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
          <div className="hidden xl:block w-[calc((100%-864px)/2)] min-w-[140px] shrink-0 border-r border-border">
            <div className="sticky top-20 px-xl py-xl">
              <CaseStudyToc items={tocItems} />
            </div>
          </div>

          {/* Center column: 864px max */}
          <div className="flex-1 xl:max-w-[864px]">
            {/* Title + Tags + Key Results */}
            <section className="border-b border-border px-xl py-xl max-md:px-md md:max-xl:px-lg">
              <div className="mx-auto max-w-[640px]">
                <h1 className="font-display text-h2 font-bold leading-h2 tracking-h2 text-text-primary">
                  {project?.title || headline}
                </h1>

                <div className="mt-md flex flex-wrap gap-sm">
                  {project?.company && <Tag>{project.company}</Tag>}
                  <Tag>{study.frontmatter.duration}</Tag>
                  {study.frontmatter.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>

                {subtitle && (
                  <p className="mt-sm font-body text-body-lg leading-body text-text-secondary">
                    {subtitle}
                  </p>
                )}

                {project?.metric && (
                  <div className="mt-lg bg-surface px-md py-md">
                    <p className="font-body text-label font-bold uppercase tracking-label text-text-secondary">
                      Key results
                    </p>
                    <p className="mt-xs font-display text-h3 font-bold leading-h3 text-text-primary">
                      {project.metric}
                    </p>
                    {slug === "bforbank" && (
                      <div className="mt-md">
                        <Image
                          src="/images/Experiences/Bforbank/image%2055.webp"
                          alt="Google UX Benchmark 2023 — BforBank ranked #1"
                          width={640}
                          height={400}
                          className="w-full object-contain"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>

            {/* Mobile TOC */}
            <div className="py-md px-xl border-b border-border xl:hidden max-md:px-md">
              <CaseStudyToc items={tocItems} />
            </div>

            {/* Content sections */}
            {groups.map((group, groupIndex) => (
              <section key={group.id} id={group.id}>
                {groupIndex > 0 && <hr className="border-t border-border" />}

                <div className="px-xl py-xl max-md:px-md md:max-xl:px-lg">
                  <div className="mx-auto max-w-[640px]">
                    {/* Section label */}
                    <p className="font-body text-label font-bold uppercase tracking-label text-text-secondary">
                      {group.label}
                    </p>

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
                            {renderContent(sub.content)}
                          </div>

                          {/* Section-level images (before steps) */}
                          {renderStepImages(sub.images)}

                          {/* BforBank: iPhone grid in delivered section */}
                          {slug === "bforbank" && group.id === "delivered" && sub.steps.length === 0 && (
                            <div className="mt-xl grid grid-cols-2 gap-lg max-md:grid-cols-1 mx-auto max-w-[480px]">
                              {sub.images.map((img, i) => (
                                <IPhoneFrame key={i}>
                                  <Image
                                    src={img.src}
                                    alt={img.alt}
                                    width={300}
                                    height={650}
                                    className="w-full h-auto block"
                                  />
                                </IPhoneFrame>
                              ))}
                            </div>
                          )}

                          {/* Steps (### subsections) */}
                          {sub.steps.map((step, stepIdx) => (
                            <div
                              key={stepIdx}
                              className={
                                stepIdx === 0 && sub.content
                                  ? "mt-lg"
                                  : stepIdx === 0
                                  ? ""
                                  : "mt-2xl"
                              }
                            >
                              {stepIdx > 0 && <hr className="border-t border-border mb-lg" />}
                              <h3 className="font-display text-h3 font-bold leading-h3 tracking-h3 text-text-primary">
                                {step.heading}
                              </h3>
                              <div className="mt-xs">{renderContent(step.content)}</div>
                              {renderStepImages(step.images)}
                            </div>
                          ))}
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
                <div className="mx-auto max-w-[640px]">
                  <p className="font-body text-label font-bold uppercase tracking-label text-text-secondary">
                    Book a call
                  </p>
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
          <div className="hidden xl:block w-[calc((100%-864px)/2)] min-w-[140px] shrink-0 border-l border-border" />
        </div>
      </BlueprintShell>
      <Footer />
    </>
  );
}
