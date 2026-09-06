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

## Body, three messages

**1. It is used.** Alpha with the family, data migrated by hand, the books for
2025 and 2026 are in, the 2025 return is prepared from them. Carries the
numbers.

**2. The figures come out.** Real-cost regime, amounts per line of the
190/210 F, traceable to bank line and document, no tax figure. The screen is
the design, in progress.

**3. What is left, then what comes next.** Two blockers (this screen, the
property and lease onboarding), then the closed beta in the network, content on
the form, ads in October and November.

Text as spliced in the dev page (`### 5.` in this worktree's file, which still
has the old numbering):

Alpha with my family since summer 2026. I migrated the portfolio straight into the database, no onboarding: [N] properties, [N] bank lines, [N] entries, [N] documents. The books for 2025 and 2026 are in, validated line by line, and the 2025 return is being prepared from them.

![row: The tax page on mobile, designed in the Regis system, and page 1 of the 190/210 F it fills](/images/Experiences/Regis/regis-app-tax-report-to-form.webp)

- **The figures come out.** For a property at the real-cost regime, the amounts per line of the 190/210 F are read from the validated entries, each one traceable to its bank line and its document. No tax figure, no form filled in: the amounts, ready to copy. Today I read them from the data; the screen above is its design, in progress.

- **Two things before the open beta.** This screen, and the onboarding to create a property and a lease, which my family never needed because I loaded the data by hand.

- **Then, in this order.** A closed beta in my network, twenty to thirty Luxembourg landlords. Content on how to fill in the 190/210 F and what changed in it this year. Ads in October and November, when landlords sit down with the pile, before the 31 December deadline.

---

## Numbers to fill the `[N]` (Jonathan's idea: show real usage)

Read-only counts on the Regis database, to run or approve. Suggested split:
properties, bank lines, entries by status (validated, to validate, locked),
documents.

```sql
select
  (select count(*) from bien) as properties,
  (select count(*) from transaction_bancaire) as bank_lines,
  (select count(*) from ecriture where statut = 'validee') as entries_validated,
  (select count(*) from ecriture where statut = 'a_valider') as entries_to_validate,
  (select count(*) from document) as documents;
```

Table and column names to check against the schema before running.

---

## Key results, candidates for the context block (outcomes only, figure in bold)

- **[N] bank lines** and **[N] entries** for 2025 and 2026 in Regis, the family books run on it
- **91 of 91** bank lines restored from a PDF statement on import, balance checked (repo fact)
- **Every amount** of the 2025 return traceable to a bank line and a document
- Tax figures for **[N] properties** at the real-cost regime read from the data, no re-entry

---

## Left out on purpose

- The sixteen accounts and six weekly users: withdrawn by Jonathan.
- The parents' individual usage: not given, not written.
- Mobile against desktop, the data bet, the agencies hypothesis, the Go/No-Go: step 5.
