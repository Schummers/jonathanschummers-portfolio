---
heroImage: "/images/Hero/you-alive-hero.webp"
---

## Context & Objectives

### Problem

A solo founder tests product ideas with Meta ads before building anything. Her first round on You Alive, a digital legacy product that notifies your loved ones if you stop replying, had brought around 800 visitors, a 96% bounce rate and 0 emails. The ads got clicks, the page got nothing, and she could not tell whether the page was wrong or the traffic was worthless. The real challenge was to build a test that could separate the two.

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

### 1. Turned a failed first round into one question the test had to settle

Her first page came from a no-code builder and sat under ads with strong click rates. Around 800 people clicked, 96% left within seconds, nobody left an email. Two readings fit those numbers: the traffic was right and the page was wrong, or the traffic had no value and no page would fix it. We wrote down five hypotheses (bad traffic, unclear copy, wrong value proposition, ad-to-page mismatch, weak branding) and agreed that round 2 would test the first, the second and the fourth.

### 2. Designed three variants that test the ad-to-page match and nothing else

Same headline, same copy, same price on every page. Only the design changes, and each one inherits the look of the ad that sends it traffic: an editorial nature photo for A, a soft pastel gradient for B, a retro forest palette for C. If visitors land on a page that looks like the ad they clicked, do they stay longer and leave an email? Value proposition variants and a branding test were deferred on purpose. One hypothesis at a time, or the numbers mean nothing.

![Variant A, editorial nature](/images/Experiences/You%20Alive/you-alive-app-variant-a.webp)
![Variant B, soft wellness](/images/Experiences/You%20Alive/you-alive-app-variant-b.webp)
![Variant C, retro forest](/images/Experiences/You%20Alive/you-alive-app-variant-c.webp)

### 3. Wired one measurement chain so every event lands in Meta, PostHog and Notion

A single track call on the client fans out each event to PostHog and, for the ones Meta needs, to the Pixel. The server mirrors the events that matter through the Conversions API with the same event id, so Meta merges browser and server into one conversion instead of counting twice, and ad blockers stop eating part of the signal. Meta optimises on the click event, which has volume, and we report on the email event, which has value.

- **PostHog EU** behind a first-party proxy, with session replay, capture scoped to the three routes so the gallery and previews stop polluting the data.
- **Notion as the leads base**: each email arrives with its variant, UTM parameters and country, so a lead can be traced back to the ad that produced it.
- **QA proven in production**: a Playwright run showing PageView, InitiateCheckout and Lead on the network, the proxy answering 200, the Notion row complete, before the ads went live.

### 4. Diagnosed 4 days at zero in PostHog and moved the count to 5 with one line of copy

The funnel had a clear shape: visitors reached the hero, some scrolled to pricing, some clicked the main call to action, then stopped on the email screen and left. Countries and replays said the rest: very cheap clicks from places that were never the target. Ads ran at $2 a day. We allowed ourselves one change, a line above the field giving a reason to leave an email. The next day, 5 emails, all on variant C. Too few to answer the ad-to-page question, enough to show where the friction was.

### 5. Closed the test and turned the kit into a template anyone can reuse

The conversion-versus-traffic question moved to the client's other product, where volume was easier to get, and it settled there: conversion ads bring leads, traffic ads bring clicks. You Alive went on hold by agreement. What survived is the machine: the tracking, the design contract, the gallery and the docs, extracted into the public GitHub template meta-ads-website with a 6-phase setup skill. The client, or anyone, can generate new variants from it without a designer.

![Contact sheet of the 26 generated candidates, the 3 finalists outlined](/images/Experiences/You%20Alive/you-alive-research-bakeoff-grid.webp)

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
