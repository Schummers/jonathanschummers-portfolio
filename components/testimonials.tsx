import Image from "next/image";
import { StarIcon } from "@heroicons/react/16/solid";
import { Section } from "@/components/blueprint-shell";
import { cn } from "@/lib/cn";

interface Testimonial {
  name: string;
  role?: string;
  company: string;
  companyHref?: string;
  photo: string;
  quote: string;
  /* Langue de la citation quand elle n'est pas en anglais (attribut lang). */
  lang?: string;
}

/* Deux lignes, deux colonnes : manager en haut a gauche, puis les trois
   clients freelance. Cinq etoiles chacun, la note qu'ils ont donnee. Les
   entreprises ne sont pas des liens : un soulignement ici lisait comme un
   CTA de plus (2026-09-07). */
const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sandie Blanchaud",
    role: "Head of design",
    company: "TotalEnergies Digital Factory",
    photo: "/images/Hero/Testimonials/sandie.webp",
    quote:
      "Strongly autonomous during the discovery phase on highly complex technical and strategic topics. During the build phase, seamlessly integrated into squads and adapted to diverse operational environments. A dedicated team player, highly receptive to feedback, and a positive driving force within a 20-person Design Studio. Also acted as a committed mentor to junior consultants, possessing all the core qualities for a highly successful career.",
  },
  {
    name: "Jane Pernille",
    company: "You Alive",
    photo: "/images/Hero/Testimonials/jane.webp",
    quote:
      "Jonathan was a pleasure to work with. He delivered three custom landing pages really quickly, while keeping the technical side simple for me, Meta Pixel and PostHog tracking included. I also liked that he went further than the brief and proposed a system I now use on my own, plus a few design tricks to increase conversion.",
  },
  {
    name: "Aminata Dia",
    company: "Malaama",
    photo: "/images/Hero/Testimonials/aminata.webp",
    lang: "fr",
    quote:
      "J'ai eu le plaisir de travailler avec Jonathan sur la conception de mon site, et je le recommande sans hésitation. Au-delà de l'aspect technique, il a vraiment su s'imprégner de ma vision et la traduire avec justesse, tout en étant force de proposition et en challengeant mes idées quand c'était pertinent. Grâce à sa créativité et son regard stratégique, le résultat final dépasse largement ce que j'avais imaginé au départ.",
  },
  {
    name: "Danaé Piron",
    company: "Ombrage",
    photo: "/images/Hero/Testimonials/danae.webp",
    lang: "fr",
    quote:
      "Jonathan m'a aidé à clarifier et matérialiser ma vision produit alors que j'étais bloqué sur ces aspects. Accompagnement de qualité, livrables détaillés et professionnels, délais respectés. Une collaboration fluide et agréable. Je recommande sans hésitation.",
  },
];

function Stars() {
  return (
    <div
      role="img"
      aria-label="5 out of 5"
      className="flex gap-2xs text-text-primary"
    >
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} aria-hidden="true" className="size-4" />
      ))}
    </div>
  );
}

function Company({ t }: { t: Testimonial }) {
  const label = `@${t.company}`;
  if (!t.companyHref) return <span>{label}</span>;
  const external = /^https?:\/\//.test(t.companyHref);
  return (
    <a
      href={t.companyHref}
      className="underline underline-offset-4 transition-colors duration-[var(--dur-fast)] ease-out hover-supported:text-text-primary"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {label}
    </a>
  );
}

/**
 * Grille 2x2 bornee par les lignes de section, une verticale au milieu, une
 * horizontale entre les deux lignes, aucune sous le titre. Citation en haut, auteur en bas avec sa
 * photo en rond (48 px), la seule forme ronde du site : decision du
 * 2026-09-07, un portrait carre se lisait comme un ecran de plus.
 */
export function Testimonials() {
  return (
    <Section id="testimonials" padded={false} className="bg-surface">
      <h2 className="px-container pt-section pb-md font-display text-h2 font-bold leading-h2 tracking-h2 text-text-primary">
        What my managers and clients say about me
      </h2>
      <div className="grid md:grid-cols-2">
        {TESTIMONIALS.map((t, i) => (
          <figure
            key={t.name}
            className={cn(
              "flex flex-col justify-between gap-lg px-container py-xl border-border",
              i > 0 && "max-md:border-t",
              i % 2 === 1 && "md:border-l",
              i >= 2 && "md:border-t"
            )}
          >
            <div className="flex flex-col gap-sm">
              <Stars />
              <blockquote lang={t.lang} className="max-w-[var(--case-prose)]">
                <p className="font-body text-body leading-body italic text-text-primary">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>
            </div>
            <figcaption className="flex items-center gap-sm">
              <Image
                src={t.photo}
                alt=""
                width={96}
                height={96}
                className="size-12 shrink-0 rounded-full object-cover object-top"
              />
              <div className="flex flex-col">
                <span className="font-body text-body font-bold text-text-primary">
                  {t.name}
                </span>
                <span className="font-body text-body-sm text-text-secondary">
                  {t.role ? `${t.role} ` : ""}
                  <Company t={t} />
                </span>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
