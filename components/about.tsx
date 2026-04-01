import Image from "next/image";
import { Section } from "@/components/blueprint-shell";
import { IPhoneFrame } from "@/components/iphone-frame";

export function About() {
  return (
    <Section id="about" className="!p-0">
      <div className="grid md:grid-cols-2">
        {/* Left — My journey */}
        <div className="px-xl py-xl2 max-md:px-md max-md:py-xl flex flex-col justify-between">
          <div className="flex flex-col gap-md">
            <p className="font-body text-label font-bold uppercase tracking-label text-text-secondary">
              My journey
            </p>
            <div className="max-w-[500px] space-y-sm">
              <p className="font-body text-body leading-body text-text-primary">
                I started in user research, with two master&apos;s degrees in
                experimental methodology, ergonomics, and cognitive psychology,
                plus several client research projects during my consulting years.
              </p>
              <p className="font-body text-body leading-body text-text-primary">
                Then I joined TotalEnergies Digital Factory for 3 years, where I
                worked as Lead Designer in product squads building tools from
                scratch: product vision, first designs, user testing, iteration.
                Always embedded in a product team.
              </p>
              <p className="font-body text-body leading-body text-text-primary">
                Going freelance changed everything. I went all-in on AI, not
                just for design, but for research, product thinking, and
                development. I broadened into product management and started
                coding what I design.
              </p>
              <p className="font-body text-body leading-body text-text-primary">
                At the same time, I got certified as a property manager and real
                estate developer in Luxembourg. I began investing in real estate
                and built Valoris, my own SaaS product to simplify property
                management.
              </p>
            </div>
          </div>
        </div>

        {/* Right — Side project (dark full-bleed) */}
        <div className="bg-surface px-xl py-xl2 max-md:px-md max-md:py-xl">
          <div className="flex flex-col gap-md">
            <p className="font-body text-label font-bold uppercase tracking-label text-text-secondary">
              Side project
            </p>
            <div className="max-w-[500px]">
              <p className="font-body text-body leading-body text-text-primary">
                Outside of work, I&apos;m a cycling obsessive. After 8 years
                playing fantasy cycling with the same group of friends, I
                decided to build my own to improve the core game.
              </p>
            </div>
          </div>
          <div className="mt-lg flex gap-sm justify-center">
            <IPhoneFrame showHomeIndicator className="w-[45%] max-w-[200px]">
              <Image
                src="/images/Hero/WattHunter/IMG_6432.webp"
                alt="WattHunter app screenshot"
                width={400}
                height={800}
                className="w-full h-auto block"
              />
            </IPhoneFrame>
            <IPhoneFrame showHomeIndicator className="w-[45%] max-w-[200px]">
              <Image
                src="/images/Hero/WattHunter/IMG_6438.webp"
                alt="WattHunter app screenshot"
                width={400}
                height={800}
                className="w-full h-auto block"
              />
            </IPhoneFrame>
          </div>
        </div>
      </div>
    </Section>
  );
}
