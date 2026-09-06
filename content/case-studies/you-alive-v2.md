---
heroImage: "/images/Hero/you-alive-hero.webp"
---

## Context & Objectives

### Problem

A solo founder tests product ideas with Meta ads, for herself and for clients. On You Alive, a service that notifies your loved ones if you stop replying, the ads worked, 5.9% to 7.1% CTR and 800 visitors, and the basic page behind them converted nobody: 96% bounce, 0 emails. Her diagnosis was the design. She had strong opinions on it and no way to build it. The real challenge was to test that diagnosis, and to leave her a system to build the next landing pages herself.

### Target audience

People who want their loved ones notified, and their digital life handled, if something happens to them one day.

### Team

- The client, a solo founder: ads, budget, final calls
- Me: design, build, tracking, reading the data

### Key results

- **5 emails in one day**, after 0 in the previous 4, from a single line of micro-copy above the email field on a $2/day campaign, the only change we made
- **Closed as no traction** in agreement with the client, once the data showed very cheap traffic that never converts, instead of iterating on a page that was not the problem
- **New variants without a designer**: the client can now clone the public template and launch a new design with the tracking already wired

## How I solved this problem

### 1. Analysed round 1 ads data (800 visitors, 7% CTR, 96% bounce, 0 waitlist emails) and defined hypotheses before any design

The ads were doing their job. CTR sat between 5.9% and 7.1% depending on the creative, and around 800 people came through. Then every creative sent them to the same very basic AI-built landing page, with none of the ads' branding, and 96% left within seconds. Nobody left an email on the waitlist. So the question was not "just make a nicer site" but "why does the site itself not convert". I listed five hypotheses, each with its own test:

- **H1, wrong ad algorithm**: the campaign was optimised for traffic, not conversions. Install the Meta Pixel and compare the two.
- **H2, unclear copy**: rewrite the whole page along sections that convert, and state the problem plainly.
- **H3, value proposition not compelling enough**: test two or three value propositions tied to the same problem.
- **H4, ad-to-page mismatch**: a landing page that looks nothing like the ad that sent you breeds distrust.
- **H5, weak visual design**: improve the branding once the target is known.

We went with H1, H2, H4 and H5. I would have tested H3 first, one page and several value propositions, before several designs. The client wanted to validate her testing process, so H3 went to a second round.

![phone: Creative ad A, 7.10% CTR](/images/Experiences/You%20Alive/you-alive-research-ad-a.webp)
![phone: Creative ad B, 6.73% CTR](/images/Experiences/You%20Alive/you-alive-research-ad-b.webp)
![phone: Creative ad C, 5.91% CTR](/images/Experiences/You%20Alive/you-alive-research-ad-c.webp)
![scroll: alive.blackdotads.com | Round 1 landing page, AI-built by the client, with a branding unrelated to the creative ads](/images/Experiences/You%20Alive/you-alive-research-round1-landing-scroll.webp)

stats:
- **836** Visitors
- **96%** Bounce rate
- **9 - 1.1%** Pricing page clicks
- **0** Emails on the waitlist

### 2. Clarified the founder's value proposition into six sections with a clear specific wording to optimize conversion

A fake door only works if a stranger gets the promise in five seconds, and that is a founder problem before it is a design problem. So before any layout I worked the message with her, section by section: promise, problem, how it works, price, proof, last push. Three options per line, drafted ahead of the call; on the call I explained the why of each section and challenged her choices; after it she reworked the final words alone. The hard question was the level of detail: enough that people want to sign up and pay, not so much that we promise a vault we will not build. That copy was frozen on all three variants. Change the design, never the words.

picks: The four headlines drafted for the hero, and the one the founder kept.
- [ ] If something happens to you, they'll still hear from you.
- [ ] Don't leave your loved ones guessing.
- [x] Leave nothing unsaid. Leave nothing unfound.
- [ ] What your family will need to know, if you're not there to tell them.

### 3. Generated 40+ landing pages with AI tools, then hand-refined 9 of them, three per creative ad, to present to the client

With the copy frozen, design was the only thing left to vary. One day generating 40+ pages with [Google Stitch](https://stitch.withgoogle.com), [frontend-design](https://github.com/anthropics/claude-plugins-public/tree/main/plugins/frontend-design) and [taste-skill](https://github.com/Leonxlnx/taste-skill): fast idea generation, each page briefed from the palette and mood of one creative ad, every iteration landing in a gallery, for an overview and a first cut by the client.

![row: AI generations for creative ad A](/images/Experiences/You%20Alive/you-alive-research-bakeoff-a.webp)
![row: AI generations for creative ad B](/images/Experiences/You%20Alive/you-alive-research-bakeoff-b.webp)
![row: AI generations for creative ad C](/images/Experiences/You%20Alive/you-alive-research-bakeoff-c.webp)

Then three days by hand on 9 of them: strip the AI slop look, fix hierarchy, spacing, rhythm and contrast, dose the animations, and assemble three candidates per creative. A round of feedback from her, one more pass. Since this was a fake-door test, none of it was engineered: no design system, no components, no code review. Vibe-coded on purpose, quick and dirty on a basic UI style guide, because the page only had to live long enough to answer one question.

evolution:
- Best AI generated iteration | /images/Experiences/You%20Alive/you-alive-design-evo-1.webp
  - Cards used for everything, so nothing stands out
  - No visual hierarchy, no vertical rhythm
  - Motion too heavy, animations on every element
- Commit 2: hierarchy | /images/Experiences/You%20Alive/you-alive-design-evo-2.webp
  - Body text set flush left
  - Section eyebrows to structure the page
  - One heading style, a single type scale
- Commit 3: rhythm and contrast | /images/Experiences/You%20Alive/you-alive-design-evo-3.webp
  - Alternating section backgrounds to separate content
  - Consistent spacing rules between sections and paragraphs
  - Cards kept for a few blocks only, the rest set on the background

### 4. Diagnosed 4 days at zero in PostHog and moved the count to 5 with one line of copy

The funnel had a clear shape: visitors reached the hero, some scrolled to pricing, some clicked the main call to action, then stopped on the email screen and left. Countries and replays said the rest: very cheap clicks from places that were never the target. Ads ran at $2 a day. We allowed ourselves one change, a line above the field giving a reason to leave an email. The next day, 5 emails, all on variant C. Too few to answer the ad-to-page question, enough to show where the friction was.

### 5. Closed the test and turned the kit into a template anyone can reuse

The conversion-versus-traffic question moved to the client's other product, where volume was easier to get, and it settled there: conversion ads bring leads, traffic ads bring clicks. You Alive went on hold by agreement. What survived is the machine: the tracking, the design contract, the gallery and the docs, extracted into the public GitHub template meta-ads-website with a 6-phase setup skill. The client, or anyone, can generate new variants from it without a designer.

![Contact sheet of the 26 generated candidates, the 3 finalists outlined](/images/Experiences/You%20Alive/you-alive-research-bakeoff.webp)

## What we delivered

- **3 live design variants** on shared copy, each matched to the ad sending its traffic, hand-built from the strongest parts of 40+ generated iterations.
- **A full measurement chain**: Meta Pixel plus Conversions API deduplicated by event id, PostHog EU behind a first-party proxy with session replay, Notion as the leads base with variant, UTM and country per lead.
- **A PostHog dashboard** split by variant: funnel, visitors, pricing reach, country, device, median visit duration, handed to the client with the raw data at close.
- **A roadmap** with the five hypotheses, what round 2 tested, what it deferred, and the reason behind each cut.
- **A public template**, meta-ads-website on GitHub, with a 6-phase setup skill and five CRO reference docs, so the next fake-door test starts from a working pipeline.

## What I cut

- **Value proposition variants**: same copy on all three pages, so the design was the only variable.
- **The branding hypothesis**, and the alternative subtitle on variant C: deferred, never tested.
- **Sensitive data storage**: the product notifies by email only. No passwords or assets, nothing a fake door should hold.
- **The notary and crypto-wallet directions**: interesting long term, out of the test.
- **Levels 1 to 3 of the vision**: automated connections, a cross-project dashboard, ad generation. Only level 0 shipped: template, skill, gallery, tracking and docs.
- **A kill/go threshold agreed before spend**: cost per email, minimum volume. It stayed an open item at every meeting, so the decision to stop was taken on judgement rather than on a number. The honest lesson of the mission, and the first thing I would fix next time.
