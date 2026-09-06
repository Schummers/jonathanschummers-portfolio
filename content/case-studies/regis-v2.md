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

### 3. Designed and developed the data pipeline and the user flow that turn bank lines and invoices into a tax return

The bank already knows the date, the amount and who was paid. So the product starts there: it proposes, the landlord validates, and the invoice fills what the bank could not know. Every figure in the return stays linked to what proves it.

#### 3.1 Bank transactions arrive automatically, already sorted, and the landlord validates and categorises each one in one gesture

Every movement arrives sorted: transfers set aside, rents matched to the lease, the rest proposed with a category. Nothing is written without a click.

![pair: Lines already sorted, two orange states only: to reconcile, to validate](/images/Experiences/Regis/regis-app-bank-list.webp)
![pair: Bank line read-only on top, proposal editable under it, one button](/images/Experiences/Regis/regis-app-transaction-validate.webp)

#### 3.2 The ledger entry, what actually gets declared, shows the transaction and the document behind every figure

In a spreadsheet, a figure is just a figure. Here every one of them shows what it covers, what proved it and who changed it. Trust comes from provenance, not from a locked screen.

![pair: Status, property, category, and what is attached: a transaction, a document](/images/Experiences/Regis/regis-app-entries-cards.webp)
![pair-scroll: The linked transaction, the document, the tax line, and who changed what](/images/Experiences/Regis/regis-app-entry-detail.webp)

#### 3.3 The invoice arrives later and enriches the entry, without overwriting a single figure

An invoice knows what a bank line never will: the supplier, the VAT, the reference, what the work was. It renames the entry and fills those fields, and never overwrites an amount or a date.

![pair: Analysis on request, price on the button, nothing written before you confirm](/images/Experiences/Regis/regis-app-document-upload.webp)
![pair-scroll: Renamed, supplier and VAT filled in, amount and date untouched](/images/Experiences/Regis/regis-app-entry-activity.webp)


### 4. Put it in my parents' hands, then in twenty landlords' hands

TBD

### 5. What I know, what I do not, and what comes next

TBD

## What we delivered

- TBD
