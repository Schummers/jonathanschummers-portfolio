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
> - `regis-app-tax-report.webp` (780 × 1688), the tax page on mobile, in the app's own layout. Same
>   filename step 3.8 already points to, so it fills that placeholder as is.
> - `regis-app-tax-report-to-form.webp` (2496 × 1832), the phone, an arrow,
>   page 1 of the 190/210 F at the same height. For this step.
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

Jonathan's brief: alpha with the family, the fiscal figures come out for
properties at the real-cost regime, the tax screen is in design and the
property onboarding in development, the last blockers before the open beta.
Or the impact alone: the books already run on it, every 2025 and 2026 figure
is in, the 2025 return is prepared from it.

1. `4. Ran it on the family portfolio first: every 2025 and 2026 figure is in, and the 2025 return is being prepared from it`
2. `4. Alpha with my family: two years of books in Regis, and the tax figures come out for every property at the real-cost regime`
3. `4. It already keeps the family books: 2025 and 2026 in full, the 2025 return prepared from the data, the tax screen in design`
4. `4. Used it for real before anyone else: the family books for 2025 and 2026 are in, and the 2025 return comes out of the data`
5. `4. The family books run on it, 2025 and 2026 in full; the tax screen and the property onboarding are the last blockers before the open beta`

Recommendation: 1 (in the dev page now). It is the impact, and it keeps the
beta out of the title. 5 if the blockers belong in the title.

---

## Body, two paragraphs (Jonathan's numbers, 2026-09-07)

Facts given by Jonathan: more than 256 bank transactions (2025 and 2026), 721
invoices (1985 to 2026), 678 entries, the 2025 return to be prepared from it.
Closed beta in the network, twenty to thirty landlords, blocked by two front
screens (tax page, onboarding property and lease). Open beta: content on the
190/210 F (form changed this year), ads in October and November.

Fact checked on the official PDFs: the 2021 to 2023 form was "190 F, page 1/2";
the 2025 form is "190/210 F, page 1/4". So "four pages instead of two and a new
merged form" is right.

Text in the dev page:

Regis is in alpha on the family portfolio. I migrated the archive with scripts, straight into the database: more than **256 bank lines** for 2025 and 2026, **721 invoices** going back to 1985, **678 entries**, each one linked to its property and its tax line. The 2025 return will be prepared from them: for every property at the real-cost regime, the amounts come out per line of the 190/210 F, ready to copy. No tax figure and no filled form, by design.

Two screens stand between the family and a closed beta of twenty to thirty Luxembourg landlords from my network: the tax page above, and the onboarding to create a property and a lease, which I skipped with the migration scripts. Then the open beta follows the calendar. The 190/210 F changed this year, four pages instead of two and a new merged form, so content on how to fill it in, and ads in October and November, when landlords sit down with the pile before the 31 December deadline.

---

## Key results, candidates (outcomes only, figure in bold)

- **721 invoices** and **256 bank lines** of the family portfolio migrated and linked, thirty years of archive in one base
- **678 entries** for 2025 and 2026, each tied to a property and a line of the 190/210 F
- Tax amounts for **every property** at the real-cost regime read from the data, no re-entry
- **91 of 91** bank lines restored from a PDF statement on import, balance checked (repo fact)

---

## Left out on purpose

- The sixteen accounts and six weekly users: withdrawn by Jonathan.
- The parents' individual usage: not given, not written.
- Mobile against desktop, the data bet, the agencies hypothesis, the Go/No-Go: step 5.
