---
heroImage: "/images/Hero/regis-hero.webp"
---

## Context & Objectives

### Problem

In my family, a rental portfolio built over thirty years was managed the way most Luxembourg landlords still do it: every document in a physical binder, one place per invoice, and the accounting in one Excel per property, typed by hand. It eats time all year, and the worst of it lands in one week. The tax return comes, the binder is incomplete, and the scramble starts: sort the pile that grew since last year, re-read the bank statements, dig through emails for the invoices that never got printed. Digital tools would remove most of that, except that not one rental management platform handles Luxembourg tax.

### Target audience

- Luxembourg private landlords who manage their properties and prepare their own tax return
- Mostly at the real-cost regime, where the paperwork is

### Team

- Me, product designer, PM and developer
- Matt Pocock's skills, as my developer team
- My parents, domain experts and first users
- About twenty beta testers in Luxembourg

### Key results

- TBD, to be written from the beta data (step 4)

## How I solved this problem

### 1. Ran workshops and interviews with landlords to map the problems and find where the opportunity was

Rental management is five trades at once: tax, law, finance, maintenance, tenants. I did not know them well, so the first weeks went into questions. Interviews with landlords, workshops with my parents, who had run the family portfolio for thirty years. I also read up on the tax return, the rent cap and the capital gain rules.

The goal was to know enough to scope an MVP, not to master every detail: enough to find problems painful enough that people would pay to solve them. I organised the research into a user journey of a landlord's year, then clustered the opportunities into a backlog and prioritised the business and user problems. The backlog said where to look. Accounting and documents held by far the most tickets, and they were the one domain where a remote digital tool could do the whole job and where my skills counted most. Maintenance and tenants need someone on site, and they are not my field.

![User journey mapping, a landlord's year in five phases, actions, problems and solutions](/images/Experiences/Regis/regis-research-user-journey.webp)
![Opportunity backlog, problems and solutions clustered by domain: documentation, process, accounting, strategy, training](/images/Experiences/Regis/regis-research-backlog.webp)

### 2. For the MVP I sliced the vision where value and foundation overlap: capture every invoice and bank line as structured data for the tax return, the one job every landlord has to do every year, and build the data layer for the next features

Scoping started with the pain, not the feature list.

- **One problem, two faces:** the peak, once a year, the night before the tax return, strong, dated, mandatory. And the daily load, every new invoice, every letter, every small repair that has to be filed somewhere and not forgotten, heavier with each property. Nobody buys less mental load. Everybody buys a deadline that hurts. The peak is the way in, the load is the reason to stay.

- **Painkiller or vitamin, the segment decides:** for one property held three years, a rent that comes in and no wish to be bothered, this is a vitamin, and that person delegates rather than buys a tool. For someone with several properties held for decades, the pile grows every year, and the ones who already spend their evenings on a spreadsheet per property have proven the need exists. That is the customer I kept, and it makes the target narrower than "landlords at the real-cost regime": several properties, held for long, and the wish to do it properly by themselves.

- **Luxembourg, too small a market?** The country counts about 28 000 private landlords, a floor from cadastral data (Observatoire de l'Habitat, report 23, April 2026). That is why no rental tool is localised for Luxembourg tax, and it is also why the question is open: many of those 28 000 hand everything to an accountant and have no idea of their yield or of what their properties are worth. A pivot to France or another larger market is a real question, for later. Before chasing a crowded market where the product might never break through, I wanted an MVP that is already useful to my family and to me. That is the reason to start with Luxembourg, and the goal for this cycle is validation: twenty paying landlords, and interviews to find out how many of the 28 000 match the target.

stack:
- **MVP slice** Tax return | Amounts per line of form 190, every figure linked to its document. | Capture in ten seconds, enrich later, value from the first report. | The one job every landlord has to do every year.
- **Next** Finance path: Rent cap, 5 % of invested capital; Capital gain, resale gain report; Yield and valuation per property | Tenant path: Tenant and contractor messages; Reminders, unpaid rent, formal notice; Lease creation and templates
- **Vision** Specialised B2B agents that execute the work | Tax, legal and trade agents with the landlord's whole context. They answer a tenant, brief a plumber from the tenant's message, review a lease. | Property managers run their day through it.
= **Structured data layer, built by the MVP, read by everything after** Every invoice and bank line captured as it arrives, extracted, validated, linked to a property and a category. Accumulates year after year. The slice pays this year and lays the foundation at the same time.

- **The bet behind the base:** with language models, the value of software moved from the interface to the structured data it makes people produce. An interface can be generated for one problem and thrown away. What stays is the data schema and the business rules inside it. If data is the asset, the landlord has to produce some before getting value, so I treated that as design, not onboarding: capture in ten seconds, enrich later, value from the first report.

- **What it becomes once the data is there:** an assistant that knows a landlord's portfolio beats any generic model, because it holds the context nobody else has. Later, agents that execute rather than answer: reply to a tenant, brief a plumber from the tenant's message, review a lease against Luxembourg law, prepare the return. The first brick is the one that makes that context exist.

That left a scope one person could ship in a dense month, summer 2026.

### 3. Designed the data flow before the screens: the bank transaction is the entry point, the landlord only validates

The bank statement is the one source a landlord never forgets to produce. It is complete, it is dated, and it is the truth of what was actually paid. So instead of asking people to type expenses, I built the product around the transaction: the landlord imports a statement, and the product turns each line into a proposal to confirm. Two ways in, both leading to the same list. **Automatic**: upload a PDF statement, any bank, the product reads it, checks that opening balance plus movements equals the closing balance, and shows the lines before creating anything. Tested on LCL, Boursorama, Trade Republic and Raiffeisen statements, 91 operations out of 91 restored. **Manual**: one entry typed by hand, for the cash payment or the old invoice that never went through this account.

One rule shapes the whole data model, and it took a day of design to settle. There are **two truths, at two levels**. The bank transaction is the truth of the cash: immutable once imported, never edited, never deleted. The entry, an expense or an income, is the declared truth, the one that will go on the tax form. The transaction generates the entry and stays linked to it, but if the two ever disagree on an amount or a date, the declared entry wins and the gap is shown as information, never treated as an error. That is what lets a landlord correct a category or a date without ever touching the bank line.

![phone: Bank view after an import: 2 lines imported out of 3, one duplicate skipped, one internal transfer detected](/images/Experiences/Regis/regis-app-import-mobile.webp)
![phone: Entries view, one line per expense or income, the dot carries the status](/images/Experiences/Regis/regis-app-ledger-desktop.webp)

The list is where the automation shows. When a statement comes in, the reconciliation engine has already run on every line (how it decides is step 3), so transactions arrive in one of four states: **to reconcile** when nothing was found, **to validate** when the engine has posed a proposal and waits for a click, **reconciled** when the entry exists, by hand or automatically, and **classified** for the internal transfer or the personal line that will never become an entry. I rewrote the whole status system around one question: does an action wait for the user, yes or no. Only two labels are orange, "to reconcile" and "to validate", and the label always starts with "to" plus a verb, so the action is in the name. Everything done is a past participle in grey. Shape carries the meaning as much as colour: a ring for nothing expected, a full disc for an action, a triangle for an anomaly, a padlock for a locked entry. And a status is computed from the data, never from the clock: nothing turns orange because it is old. The inbox on the home page is simply the union of every orange or red item across transactions, entries and documents, sorted with anomalies first.

table:
| Status | Meaning | Who acts |
|---|---|---|
| To reconcile | Nothing found, nothing linked | The landlord builds the match |
| To validate | A proposal is posed, or a linked entry is still unconfirmed | One click, or edit then confirm |
| Reconciled, Reconciled (auto) | An entry exists and covers the amount | Nobody |
| Classified | Internal transfer or ignored, out of the books | Nobody, reversible |

The transaction detail is a mobile page, because that is where the validation happens, in the evening, one thumb. The header repeats the bank line as is: signed amount, raw label, date, source account, and it cannot be edited. Under it, the proposal: property, category, type, counterparty, all shown as the same fields the entry will carry, all editable on the spot with a picker. One sticky button at the bottom, "Create the entry", validates the fields and creates the entry in a single gesture, so the landlord never validates a proposal and then edits the result. The proposed label is rewritten from the bank noise into something a human can read in a list: "Sud Gaz · Boiler maintenance" instead of "PRLV SUD GAZ SARL". For recurring lines, a rent or a monthly charge, "Also validate similar entries" confirms every proposal from the same contract at once, matched on tenant, category and property, and deliberately not on amount, because an indexed rent moves a few euros from one month to the next.

Once created, the entry is the object the landlord will live with, and its page is built to answer four questions in one glance. Is it linked to a transaction, and to which amount? Is a document attached? Which category, which property? What is its status? Three statuses only: **to validate**, **validated**, and **locked** once the entry has fed a tax report, after which it is read-only and shows a padlock. The page opens on the amount, then the linked transactions with their lettered amounts next to the entry amount, then the documents, then the details, the tax line, and the activity. Every link is one tap away: open the transaction, add a document, compare the numbers. Under the hood the link is many-to-many both ways. One entry can be paid by two transactions, a tenant paying in two halves, and one transaction can be split into several entries, a building charge shared across two flats or a rent that is really rent plus recoverable charges. Splitting is a single verb in the interface, "Ventilate", and it creates ordinary entries, no parent record, no special case.

Then the invoice shows up, a week or a month later, in an email or a drawer. The landlord uploads it and the product finds the entry it belongs to. Analysis is never automatic: it costs credits, so it is one explicit click with the price on the button. Extraction is a proposal with a confidence score, and the landlord validates, corrects or rejects. If the engine finds a matching entry, by amount and date first, then by supplier tokens, the screen asks one question: is this invoice that transaction? Yes creates nothing new: the entry is enriched, and the document is linked to the entry and, through it, to the transaction. The enrichment follows one rule I wrote once and applied to all three ways a document can meet an entry. Core fields, amount and date, are **never** overwritten from a document: a difference there questions the match itself, not the value. Peripheral fields, supplier, VAT rate, invoice reference, payment date, trade, are filled **only if empty**, never replaced. The document never has authority, the declared entry keeps it.

![row: The assistant structures the invoice, every figure stays linked to its document, one click to validate](/images/Experiences/Regis/regis-app-structuration-facture.webp)

flow:
- **Statement**: PDF uploaded, balances checked, lines previewed, nothing created yet.
- **Transaction**: immutable bank line, already routed by the engine to a property and a category, or left to reconcile.
- **Entry**: created from the transaction in one gesture, validated by the landlord, the only thing that goes on the tax form.
- **Document**: uploaded later, analysed on request, matched to the entry, fills what the bank could not know, VAT and invoice reference.
- **Tax report**: every validated entry, linked to a property and a category mapped to a form 190 line, is what the report reads. Step 4.

What the landlord ends up with is one entry created by a transaction, enriched by an invoice, the three linked together, attached to a property and to a category that already knows its line on the tax form. That is the data the tax report is built from.

### 4. Kept a human in control of every figure that commits the landlord: an engine that matches before it creates, duplicates caught at import, anomalies shown rather than hidden

The first architecture decision of the project, written as an ADR on 24 June 2026, structures everything in this step. A number that commits the landlord, an amount, a total, a tax line, is always computed by deterministic code and persisted. The language model extracts, formats, proposes and explains with sources, and never has authority on a figure. The chain is always the same: non-deterministic extraction, human validation, clean data, deterministic calculation. It sounds like a constraint and it is what makes the automation trustworthy: the engine below contains no AI at all.

The reconciliation engine runs on every imported line, in a fixed order, and creates an entry only as a last resort. First it looks for **something that already exists**: an open rent instalment generated from a lease, an unlinked entry with the same amount within a date window, an orphan document. Then it evaluates the **rules**, first match wins by priority. Only if nothing matches does it propose a creation. Matching before creating is the real defence against the duplicate every landlord knows, the invoice typed in April and the bank debit imported in May for the same boiler. The signals are ranked by how much I trust them, and the ranking is the opposite of the intuitive one: the transfer reference configured on the lease first, then the counterparty IBAN, then a fuzzy name match, and last the amount plus a date window. Amount alone is the weakest signal, because two tenants can pay the same rent on the same day. A rent is recognised when the payer is the tenant of the property, the amount equals the expected rent, and the date falls between the 25th of the previous month and the 10th of the next. Anything else, a partial payment, an odd date, a tenant paying a deposit refund, is routed to the property but left as a suggestion, because the deviation is precisely the signal a human should look at.

Automatic exists only where confidence is total. Each rule carries an auto switch, off by default: on, the rule creates and validates the entry without anyone; off, it only suggests. Bank fees, personal tax advances and rent matched to an exact instalment run automatically from day one, everything else starts as a suggestion and earns its switch after a few correct validations. A rule the engine learns from two identical corrections is proposed, never created on its own, and every rule is visible and editable in a settings screen. No black box: the landlord can read why a line was routed where it was. Internal transfers follow the same logic. A counterparty IBAN that belongs to one of the family's own accounts classifies the line automatically. A name alone, or a bank category like "internal movements", only suggests, because a surname is ambiguous when a tenant shares it.

Duplicates are caught at import, before any of this runs. Every line gets a fingerprint, account, date, amount and normalised label, and a line already present is marked as a duplicate and skipped, so re-importing last month's statement by mistake creates nothing. When the source provides its own identifier, it is used instead. The PDF path adds a check the CSV path could not: opening balance plus the sum of the lines must equal the closing balance, and the screen says so in plain words. Passed, with the sum shown. Failed, with the gap in euros. Or impossible, when the file is a movements export rather than a real periodic statement, a case Raiffeisen produces, named on the screen rather than failing silently.

![phone: The balance check at import: passed, failed with the gap in euros, or impossible for this kind of file](/images/Experiences/Regis/regis-app-balance-check-mobile.webp)

The same philosophy applies to what the interface shows about consistency. An anomaly is derived from the data at display time, never stored, and it sits on top of a status rather than replacing it: an entry can be validated and still carry a red triangle for a missing date. A transaction is reconciled if and only if the lettered amounts add up to its amount, otherwise it reads "Lettered 900 € of 1,200 €" and stays orange. On an invoice, the net amount and VAT are shown only when they add up to the total; when they do not, which happens on every scanned bundle of several invoices, they are hidden rather than flagged, because a doubtful number costs more than an absent one and a warning on half the documents would become wallpaper. The one figure that commits the landlord, the total, is the one the landlord validated.

Access is scoped the same way the data is: every table is protected by row-level security on the family, the tenant that owns the properties, and the transaction table cannot be edited or deleted by anyone once written. What the assistant writes goes through a separate proposal table first, which doubles as a log of everything the model ever suggested.

The last piece was not in my plan. Beta users said the same thing in different words: I am afraid of doing something stupid and not being able to tell. So I added an **activity** timeline on every entry: who changed what, the value before and the value after, whether the actor was a person, the import or the assistant, and when. Written only by the application, never editable, it replaced the "created on, modified on" footer that answered none of those questions. It is also what makes validation reversible without fear: an entry can go back from validated to "to validate" until it is locked by a tax report, and the timeline keeps the trace.

### 5. Regis is in alpha on our family portfolio to prepare the 2025 tax return: 251 bank transactions, 679 invoices extracted, 482 entries booked or queued

![row: The tax page, in development, and the 190/210 F it fills in, the Luxembourg annex for rental income](/images/Experiences/Regis/regis-app-tax-page-to-form.webp)

Go to market strategy in two steps:

- **Closed beta.** Twenty to thirty Luxembourg landlords from my network. Two front screens stand in the way: the tax page, and the onboarding to create a property and a lease. My family never needed it, I load the data with scripts, not the UI.

- **Open beta.** The 190/210 F changed this year, four pages instead of two and a merged form, so content on how to fill it in. Then ads in October and November, when landlords sit down with the pile, before the 31 December deadline.

### 6. What comes next: learn from the first landlords during the closed beta, then test the hypotheses that decide the market before building anything else

Two loops run from the closed beta onwards. **Learn from use**: user tests with the first landlords, and the PostHog funnel with session replay, to see where they drop before their first tax report. **Test the hypotheses**: thirty interviews with Luxembourg landlords, then fake doors on paid traffic for the questions an interview cannot settle. Eight questions, one method each, in the order they get answered.

![row: The eight hypotheses that decide the market, and how each one gets tested](/images/Experiences/Regis/regis-next-hypotheses.webp)

What I called a first brick, a studio calls a wedge. The next one gets validated before it gets built.

## What we delivered

- TBD
