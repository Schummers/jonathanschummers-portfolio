# Regis case study, step 4 (draft to splice into `content/case-studies/regis-v2.md`)

> Written 2026-09-06 from Jonathan's spoken brief of the same evening, the
> Regis repo and the scoping doc. Numbering follows the file in the
> `case-studies-portfolio-f49b0e` worktree: 1 research, 2 slicing, 3 flow
> (3.1 to 3.8), **4 this step**, 5 self-assessment. Not written into
> `regis-v2.md` on purpose: another session holds that file. Splice by
> replacing the block `### 4. Put it in my parents' hands...` up to `### 5.`.
>
> Images, both in `public/images/Experiences/Regis/` on branch
> `claude/regis-etape-4`:
> - `regis-app-tax-report.webp` (2240 × 2902), the tax page alone. Same
>   filename step 3.8 already points to, so it fills that placeholder as is.
> - `regis-app-tax-report-to-form.webp` (2560 × 1858), the page, an arrow,
>   the four pages of the 190/210 F. For this step.
>
> Both are **designs** rendered from HTML in the Regis tokens
> (`app-mvp/app/globals.css`), not captures. The data is a fictional
> property. The text below says so.
>
> **Consistency to fix in 3.8** (other session's text): it describes the tax
> screen as shipped ("The last screen reads what the year produced"). Jonathan's
> position for step 4 is that the figures are computed from the data today and
> the screen is being built. One sentence in 3.8 should say the same, or the
> two steps contradict each other on the same page.

---

## Title, five options (numbered, about 80 characters per line, 150 max)

1. `4. Ran it on the family portfolio first: a year of books is in, the tax report reads from them, and the beta opens once the last screen ships`
2. `4. Dogfooded it on ten properties before opening the beta: the data holds, the report is computed, the front is what is left to finish`
3. `4. Proved it on my own family before anyone else: a year of entries in, the 2025 figures read from the data, thirty landlords next`
4. `4. Made my family the first beta: every entry of the year is in, the tax figures come out of the data, the network beta opens after one screen`
5. `4. First user: my family. The data is in, the report comes out, and the beta waits on one screen and an onboarding`

Recommendation: 1. It names the result (the books, the report), the honest
state (one screen left) and the next move (the beta), in that order. 5 if you
want it short.

---

## Body

The first landlord on Regis was my family. I loaded the portfolio straight into the backend, about ten properties, the bank accounts, the leases, and we have run a full year of books in it since: statements imported, lines sorted by the engine, entries validated in the evening, invoices attached when they arrive. That is the test I trusted most, because it is the hardest case I know, thirty years of documents and two generations with different habits, and because any shortcut I took would land on my own return.

The last piece of the flow is the one above. Once the year's entries are validated and each carries its property and a category, the tax page reads them per property and per year and groups the amounts by line of the 190/210 F: rents received, then the six blocks of deductible costs, A to F, and the net rental income to carry over to the main return. Every amount names how many entries it comes from and opens on them, so a figure can always be walked back to a bank line and a document. What the page does not do is deliberate: no tax figure, no form filled in, an export of the amounts, not of the form. Scope is Luxembourg and the real-cost regime, nothing else yet. Today I read those figures for the family from the data. The screen is the design I am building now, on a fictional property.

- **Why the beta is not open yet:** my family never went through an onboarding, because I migrated the data by hand. A stranger has to create a property and a lease alone, and has to reach this page to get what the product promises. So three things stand between the family and the first outside user: the onboarding for properties and leases, the last parts of the front, which I still bypass through the backend, and the tax page itself.

- **Then, in this order:** a closed beta in my own network, twenty to thirty Luxembourg landlords, as soon as the tax page ships. Content on how to fill in the 190/210 F and what changed in it this year, written from the same categories the product uses. And targeted ads in October and November, the two months when landlords actually sit down with the pile, before the 31 December deadline.

![row: The tax page, designed in the Regis system, and the four pages of the 190/210 F it fills](/images/Experiences/Regis/regis-app-tax-report-to-form.webp)

---

## Key results, candidates for the context block (outcomes only, figure in bold)

Pick what you can stand behind. Nothing here is a beta number.

- **About ten properties** and a full year of books run in Regis by my family, the first and hardest user
- **91 of 91** bank lines restored from a PDF statement on import, balance checked (repo fact)
- **Every figure** of the 2025 return for the family portfolio traceable to a bank line and a document
- Tax report computed from the data for **one year** of entries, no manual re-entry

---

## Left out on purpose

- The sixteen accounts and six weekly users: Jonathan withdrew it, it opens questions he cannot answer yet.
- The parents' individual usage (who does what, on which device): not given. The body says "two generations with different habits" and no more. Add a scene here if you want one.
- Mobile against desktop, the data bet, the agencies hypothesis, the Go/No-Go: step 5.

## Audit

No em dash, no banned word (`writing-style`), no metric without a base. Bold
only on the two bullet leads, as in step 2.
