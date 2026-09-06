import type { BlockDef } from "./types";

/* `table:` suivi de lignes `| a | b |` : un tableau, premiere ligne en
   en-tete, ligne `|---|` ignoree, scroll horizontal sur mobile, pas de
   bordure sous la derniere ligne. */
export const tableBlock: BlockDef = {
  match: (lines) => lines[0].startsWith("table:"),
  parse(lines) {
    const rows = lines
      .slice(1)
      .filter((l) => l.startsWith("|") && !/^\|\s*-/.test(l))
      .map((l) =>
        l
          .replace(/^\|/, "")
          .replace(/\|$/, "")
          .split("|")
          .map((c) => c.trim())
      );
    const [head, ...body] = rows;
    if (!head) return null;
    return {
      render: (key, gap) => (
        <div key={key} className={`${gap} overflow-x-auto`}>
          <table className="w-full min-w-xl border-collapse font-body text-body-sm leading-body text-text-primary">
            <thead>
              <tr className="border-b border-border">
                {head.map((c, j) => (
                  <th
                    key={j}
                    scope="col"
                    className={`py-xs pr-sm font-semibold whitespace-nowrap text-text-secondary ${
                      j === 0 ? "text-left" : "text-right"
                    }`}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, r) => (
                <tr key={r} className={r < body.length - 1 ? "border-b border-border/50" : ""}>
                  {row.map((c, j) => (
                    <td
                      key={j}
                      className={`py-xs pr-sm tabular-nums whitespace-nowrap ${
                        j === 0 ? "text-left text-text-secondary" : "text-right"
                      }`}
                    >
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
    };
  },
};
