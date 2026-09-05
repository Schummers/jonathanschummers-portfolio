import React from "react";

/* Inline Markdown : `**gras**` et `[texte](url)`. Les liens sortent en
   `link` (bleu, token dedie dans globals.css), externes par defaut. */
export function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a
          key={i}
          href={link[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link hover-supported:text-text-primary transition-colors"
        >
          {link[1]}
        </a>
      );
    }
    return part;
  });
}

/* `leadingClass` overrides the top margin of the FIRST block only — lets a
   caller tighten the label→text gap (e.g. the Context block). Other blocks keep
   their default rhythm. When omitted, behaviour is unchanged. */
export function CaseStudyContent({
  text,
  leadingClass,
}: {
  text: string;
  leadingClass?: string;
}) {
  const blocks = text.split("\n\n").filter(Boolean);

  const top = (i: number, fallback: string) =>
    i === 0 && leadingClass ? leadingClass : fallback;

  return (
    <>
      {blocks.map((block, i) => {
        const trimmed = block.trim();

        if (trimmed.startsWith("- ")) {
          const items = trimmed.split("\n").filter((l) => l.startsWith("- "));
          return (
            <ul key={i} className={`${top(i, "mt-sm")} space-y-xs`}>
              {items.map((item, j) => (
                <li
                  key={j}
                  className="font-body text-body leading-body text-text-primary pl-md relative before:absolute before:left-0 before:top-[0.65em] before:size-1 before:rounded-full before:bg-text-secondary"
                >
                  {renderInline(item.replace(/^- /, ""))}
                </li>
              ))}
            </ul>
          );
        }

        if (/^\d+\.\s/.test(trimmed)) {
          const items = trimmed.split("\n").filter((l) => /^\d+\.\s/.test(l));
          return (
            <ol key={i} className={`${top(i, "mt-sm")} space-y-xs list-decimal pl-md`}>
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

        if (trimmed.startsWith("### ")) {
          return (
            <h3
              key={i}
              className={`${top(i, "mt-lg")} font-display text-h3 font-bold leading-h3 tracking-h3 text-text-primary`}
            >
              {renderInline(trimmed.replace("### ", ""))}
            </h3>
          );
        }

        return (
          <p
            key={i}
            className={`${top(i, "mt-sm")} font-body text-body leading-body text-text-primary`}
          >
            {renderInline(trimmed)}
          </p>
        );
      })}
    </>
  );
}
