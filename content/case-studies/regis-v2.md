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

### 3. Built the flow from the bank line to the tax line: the product sorts, the landlord validates, and every figure stays linked to what proves it

One bank line, followed from the statement to the tax form. Each sub-step shows what the landlord sees and what the data becomes underneath.

flow:
- **Statement**: the bank feeds the account, or a PDF is uploaded. Balances checked, duplicates skipped.
- **Transaction**: immutable cash line, sorted by the engine: transfer, existing entry, rent or rule.
- **Entry**: created from the line in one gesture, validated by the landlord, the only thing that gets declared.
- **Document**: analysed on request, matched to the entry, fills what the bank could not know.
- **Tax report**: every validated entry, linked to a property and to a category mapped to a form line, read and frozen per year.

#### 3.1 Start from the bank account: an automatic trigger, and data that is reliable by construction

Regis starts from the bank account, connected to the bank or fed with a PDF statement, any bank. Either way the trigger is automatic: every movement lands in the app as an event, and the landlord never types an amount. The data is reliable by construction, because the bank already knows it: date, signed amount, raw label, counterparty and its IBAN when the bank gives it. Before anything is created, the product shows the lines it read. Two checks run first. Opening balance plus movements must equal the closing balance, and the screen says so in plain words: passed, failed with the gap in euros, or impossible when the file is a movements export rather than a real statement. And every line gets a fingerprint, account, date, amount and normalised label, so re-importing last month by mistake creates nothing. Tested on LCL, Boursorama, Trade Republic and Raiffeisen statements, 91 operations out of 91 restored.

![phone: The statement read, five lines, balance check passed](/images/Experiences/Regis/regis-app-import-apercu.webp)
![phone: Import done, the engine has already sorted the lines](/images/Experiences/Regis/regis-app-import-result.webp)

**In the data**: one transaction row per line, with a fingerprint, immutable once written. Never edited, never deleted. It is the truth of the cash, and nothing else in the product is allowed to be.

#### 3.2 The engine sorts every line before anyone looks at it

Reading a statement line is the boring part, so the product does it first, in a fixed order and with no AI at all. First, internal transfers: a counterparty IBAN that belongs to one of the family's own accounts is classified out of the books. Then a deduplication pass: does an entry already exist for this, an invoice typed in April for the boiler debited in May? Same direction, same amount within 3 %, a date in the window, and it proposes to link rather than create. Only then the prediction pass: is this a rent, matched to an instalment from the lease, or does a rule apply? Linking before creating is what kills the duplicate every landlord knows. I borrowed the order from QuickBooks and the rule engine from Actual Budget: first match wins by priority, and each rule carries its own auto switch.

A rule reads like a sentence. The one below is real, from the family portfolio, and it suggests rather than applies: the same insurer covers several properties, so the property is read from the label and the landlord confirms.

flow:
- **If**: the counterparty IBAN is Foyer Assurances.
- **Then**: category "Owner insurance", tax line D of form 190, property from the label.
- **Mode**: suggest. The landlord confirms in one click. Bank fees and rent matched to an exact instalment run in automatic mode from day one.

![phone: The same rule in the product, condition on the counterparty IBAN, automatic mode off](/images/Experiences/Regis/regis-app-rule-foyer.webp)

The signals are ranked by how much I trust them, and the ranking is the opposite of the intuitive one: the transfer reference set on the lease, then the counterparty IBAN, then a fuzzy name, and last the amount plus a date window. Amount alone is the weakest signal, because two tenants can pay the same rent on the same day. Automatic exists only where confidence is total. Everything else starts as a suggestion and earns its switch after a few correct validations; a rule learned from two identical corrections is proposed, never created on its own.

**In the data**: nothing is created yet. The transaction carries a status, and a proposal sits next to it in a separate table: property, category, type, the label rewritten. That table doubles as a log of everything the product ever suggested.

#### 3.3 The bank view: three states, one question

So the landlord opens the bank view and finds the lines already sorted. I rewrote the whole status system around one question: does an action wait for me, yes or no. Only two labels are orange, "to reconcile" and "to validate", and the label always starts with "to" plus a verb, so the action is in the name. Everything done is a past participle in grey. Shape carries the meaning as much as colour: a full disc for an action, a ring for nothing expected, a triangle for an anomaly, a padlock for a locked entry. And a status is computed from the data, never from the clock: nothing turns orange because it is old. The inbox on the home page is the union of every orange or red item, anomalies first.

table:
| Status | Meaning | Who acts |
|---|---|---|
| To reconcile | Nothing found, nothing linked | The landlord builds the match |
| To validate | A proposal is posed and waits for a click | One click, or edit then confirm |
| Reconciled, Reconciled (auto) | An entry exists and covers the amount | Nobody |
| Classified | Internal transfer or ignored, out of the books | Nobody, reversible |

![phone: The bank view after the engine ran: reconciled, classified, to validate, to reconcile](/images/Experiences/Regis/regis-app-bank-list.webp)

#### 3.4 Validate a line in one gesture, without losing control

The landlord opens a line "to validate". The header repeats the bank line as is, signed amount, raw label, date, account, and it cannot be edited. Under it, the proposal: property, category, type, counterparty, all shown as the fields the entry will carry, all editable on the spot with a picker. One sticky button, "Create the entry", validates the fields and creates the entry in a single gesture, so nobody validates a proposal and then edits the result. The label is rewritten from the bank noise into something readable in a list, "Sud Gaz · Boiler maintenance" instead of "PRLV SUD GAZ SARL". For recurring lines, "Also validate similar entries" confirms every proposal from the same contract at once, matched on tenant, category and property, and deliberately not on amount, because an indexed rent moves a few euros from one month to the next. The page is mobile first, because that is where the validation happens, in the evening, one thumb.

![phone: A transaction to validate: the bank line read-only on top, the proposed entry under it, one button](/images/Experiences/Regis/regis-app-transaction-validate.webp)

**In the data**: the entry is created, an expense or an income, and a link row joins it to the transaction with the amount covered. The transaction turns "reconciled". The entry is "validated" because a human said so.

#### 3.5 The entry, the object the landlord lives with

Entries have their own view, in cards, one per expense or income, with the status, the property, the category and whether a transaction and a document are attached. Open one and the page answers four questions in one glance: linked to which transaction and for how much, document attached or not, which category and property, what status. Three statuses only: to validate, validated, and locked once the entry has fed a tax report, after which it is read-only. The link runs both ways and many-to-many. A tenant paying in two halves is two transactions on one entry. A building charge shared across two flats is one transaction split into two entries, a single verb in the interface, "Ventilate", and no special record behind it.

![phone: Entries in cards: status, category, property, linked transaction and document at a glance](/images/Experiences/Regis/regis-app-entries-cards.webp)

![phone-scroll: Entry | The entry page: linked transaction, document, VAT read from the invoice, the tax line, the activity](/images/Experiences/Regis/regis-app-entry-detail.webp)

**In the data**: two truths at two levels. The transaction is the cash, the entry is what will be declared. If the two ever disagree on an amount or a date, the entry wins and the gap is shown as information, never as an error. That is what lets the landlord correct a category or a date without ever touching the bank line.

#### 3.6 The invoice arrives later and completes the entry instead of duplicating it

A week or a month later, the invoice shows up. The landlord uploads it. Analysis is never automatic, it costs credits, so it is one explicit click with the price on the button. Extraction is a proposal with a confidence score, and the deduplication pass from 3.2 runs again, this time from the document side: it finds the entry the bank line already created and proposes to complete it. The enrichment follows one rule, applied to the three ways a document can meet an entry. Core fields, amount and date, are never overwritten from a document: a difference there questions the match, not the value. Peripheral fields the bank could not know, supplier, VAT rate and amount, invoice reference, payment date, trade, are filled only if empty, never replaced. The document never has authority. And when the net and VAT do not add up to the total, which happens on every scanned bundle of invoices, they are hidden rather than flagged: a doubtful number costs more than an absent one.

![phone: The uploaded statement of charges, analysis on request, price on the button](/images/Experiences/Regis/regis-app-document-upload.webp)
![phone: The entry found: amount and date match, the invoice fills the reference and the trade, nothing is overwritten](/images/Experiences/Regis/regis-app-document-match.webp)

**In the data**: the document is linked to the entry, many-to-many too, one invoice for two flats or two documents for one entry. The entry now carries what only the invoice knew.

#### 3.7 Everything linked, and a history for the fear of breaking something

The entry page now shows the transaction, the document, the property, the category, and the tax line the category maps to. The last section is the activity: who changed what, the value before and after, whether the actor was a person, the import or the assistant, and when. Written only by the application, never editable. My first users asked for it in almost the same words, "I am afraid of doing something stupid and not being able to tell", and it is what makes validation reversible without fear: an entry can go back to "to validate" until a tax report locks it, and the trace stays.

![phone-scroll: Entry | The same entry once the document is attached: transaction, document, tax line, and the activity with each actor](/images/Experiences/Regis/regis-app-entry-activity.webp)

#### 3.8 The tax report, per property, from data that was validated all year

The last screen reads what the year produced: for one property, every validated entry grouped by line of form 190, each amount clickable back to its entry, its transaction and its document, and what is still missing named next to the line it blocks. The calculation is deterministic and recomputed on every read; the version the landlord files is frozen with the inputs that produced it, and the entries behind it are locked. No tax figure, no filled form: the amounts per line, ready for the form or for the accountant.

![row: The tax report for one property, amounts per line of form 190, each linked to its proof](/images/Experiences/Regis/regis-app-tax-report.webp)


### 4. Put it in my parents' hands, then in twenty landlords' hands

TBD

### 5. What I know, what I do not, and what comes next

TBD

## What we delivered

- TBD
