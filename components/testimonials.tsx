import Image from "next/image";

export function Testimonials() {
  return (
    <section className="border-b border-border-strong bg-invert-bg px-xl py-xl max-md:px-md max-md:py-xl md:max-lg:px-lg">
      <p className="font-body text-label font-bold uppercase tracking-label text-text-secondary">
        Testimonials
      </p>

      <div className="mt-md flex items-center bg-surface max-md:flex-col max-md:items-stretch">
        <Image
          src="/images/Hero/Testimonials/sandie.jpeg"
          alt="Sandie Blanchaud"
          width={157}
          height={191}
          className="w-[157px] self-stretch object-cover max-md:h-[200px] max-md:w-full max-md:self-auto"
        />

        <div className="flex flex-col gap-xs px-lg py-md max-md:px-md">
          <div className="flex flex-wrap items-baseline gap-x-sm gap-y-xs">
            <span className="font-body text-body-lg font-bold text-text-primary">
              Sandie Blanchaud
            </span>
            <span className="font-body text-body-lg font-semibold text-text-secondary">
              Head of design &nbsp;@Total Digital Factory
            </span>
          </div>

          <blockquote className="max-w-[745px]">
            <p className="font-body text-body italic text-text-primary">
              &ldquo;Strongly autonomous during the discovery phase on highly
              complex technical and strategic topics. During the build phase,
              seamlessly integrated into squads and adapted to diverse
              operational environments. A dedicated team player, highly
              receptive to feedback, and a positive driving force within a
              20-person Design Studio. Also acted as a committed mentor to
              junior consultants, possessing all the core qualities for a highly
              successful career.&rdquo;
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
