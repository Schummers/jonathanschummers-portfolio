---
title: "Network Operation Dashboard"
slug: "nod"
duration: "16 months"
tags: ["UX", "Dashboard", "Dark Mode", "Energy", "Redesign"]
thumbnail: "/images/Experiences/NOD/Principal.webp"
heroImage: "/images/Hero/NOD.webp"
order: 3
---

## Headline

Redesign of a monitoring app in dark mode

## Subtitle

A case study that describes my UX process behind the redesign of a web application dashboard

## Scope

- Scope: Discovery & Delivery
- Framework: Scrum
- Duration: 16 months

## Context

Taking over a product developed over the past year at TDF

### What is the Total Digital Factory?

The TDF develops digital solutions for all the businesses of Total Energies, aiming to accelerate digitalization, improve operational efficiency, and increase the group's revenue.

### Renewal of the Squad

After a challenging project start, the majority of the team was renewed, including my designer colleague who left suddenly without a handover and with minimal documentation.

## Business Outcomes

Lean UX Canvas to understand the product vision

### Increase the electricity production of power plants

The goal is to reduce the duration of unexpected shutdowns by decreasing incident detection and resolution times, and by increasing remote incident resolutions, such as reconnecting power plants to the grid.

### Increase operational excellence

The historical tools and processes make it difficult for a small team of control center operators (9 users) to supervise a vast portfolio of multi-energy assets. This team, facing the remarkable growth of the renewable energy sector (quadrupled in 3 years), must manage an increasing number of assets.

## The Challenge

One of my tasks was to test the value proposition of the existing Alert page.

### The 3 main user benefits identified

- Having a feed of power plants down, prioritized based on potential production losses
- Facilitating diagnosis by gathering all relevant information on a single page
- Eliminating manual re-entry by creating tickets directly from the alarms

## Users Tests in Prod (5 users out of 9)

Does the Alert page manage to deliver the desired business and user outcomes?

Reduction of production losses, if the control centers address the alarms of plants with the greatest losses first, thanks to the prioritized feed feature.

The information on the Alert page is not sufficient to diagnose and create tickets. Therefore, the control centers (CC) must manually connect to the plants, which is very time-consuming and limits the number of assets they can manage.

The tests also highlight several usability issues and other problems.

- 5 out of 5 users handle alarms in the order of prioritization based on losses, also considering additional criteria such as intervention, fire, or tags from a colleague.
- 13 out of 15 diagnostics are correct, as the control centers (CC) correctly assign the different alarms based on the root causes and create the appropriate number of tickets.
- 2 out of 5 users use the app on a 14/16-inch screen instead of the 40-inch screen for which NOD was designed. Upon further investigation, we discovered that 4 out of 9 users use NOD on a smaller screen, even though the app's responsiveness is not well adapted for this.
- These observations are also confirmed with Hotjar, except for certain alarms identified as false by the users.
- BUT 11 out of 15 diagnostics require connecting to the plant's automation system to retrieve additional information, which is very time-consuming.
- 3 out of 5 users report that the interactions between the alarm blocks and action buttons were not always intuitive at first.
- In the interview section, 3 users (CC) stated that not having to systematically process all the plants every morning is a real time saver compared to their previous tool.
- 4 out of 5 users do not take weather information into account. They express difficulties in analyzing this data because they need to match irradiance with power in watts.
- 5 out of 5 users must consult the logbook page to obtain the description of ongoing events in order to compare them with the current alarms.

## How Might We

Making the correct diagnosis entirely from the Alert page in NOD on a 14-inch screen?

## Design Studio Workshop with the Squad

The goal of the workshop was to sketch solutions to address the problem. Each participant presented and refined their sketch based on feedback from others. This iterative process allowed us to align on a layout for the Alert page.

## First Iteration Design

Display the most relevant information for diagnosis above the fold

- The team successfully brought in some key information to diagnose decoupling alarms using only the data available in NOD, allowing for the processing of approximately 60% of the alarms.
- Create a shutter system to group the equipment alarm block with the PTR alarm block (parent-child relationship).
- Simplify interactions and navigation by separating actions into two distinct pages: one for diagnosis and the other for creating the event.
- Display the logbook preview in two columns to show more information about ongoing tickets and allow opening the ticket in a modal upon click.

## Second Iteration Pushed to Production

A responsive design that meets the needs of both 14-inch and 40-inch users

- The tests showed that users with 14-16 inch screens are pleased with the new layout, which makes it easier to access information by reducing the need to scroll. Users with 40-inch screens appreciate the two-column logbook and the font size increase starting from a width of 24 inches. Since the rework, two additional users now typically use a 14-inch screen to work on NOD, bringing the total to 6 out of 9 users.
- During the tests, users were able to correctly assign certain alarms to the weather, thanks to the new chart that displays the levels of irradiance/wind, making it easier to compare with production curves.
- During the tests, no user used the shutter system to show or hide the feed to facilitate analysis on a small screen. They mentioned in the interview that they hadn't noticed the arrow to activate the feature. With Hotjar, we can observe that this feature is not being used.
- Gather all alarms and CTAs in the same card to make interactions more intuitive. The tests showed that all 4 users had no usability issues when selecting alarms, using the chevron system to open/close, or with the new buttons.

## Impact

+23% kWh per user in 12 months, while maintaining alert resolution rate under 45 min, thanks to:
- The new diagnostic dashboard with integrated alerting system
- Automated reporting: 90 min saved per day per operator

## Images

![Principal](/images/Experiences/NOD/Principal.webp)
![NOD 1](/images/Experiences/NOD/NOD%201.webp)
![MacBook Air](/images/Experiences/NOD/MacBook%20Air%20-%201%202.webp)
![Frame](/images/Experiences/NOD/Frame%201597884570.webp)
![Smart Slopes UX](/images/Experiences/NOD/Smart%20Slopes%20UX%20-%20Frame%206%201.webp)
![Screenshot 1](/images/Experiences/NOD/Capture%20d'%C3%A9cran%202024-03-07%20%C3%A0%2009.41%201.webp)
![Screenshot 2](/images/Experiences/NOD/Capture%20d'%C3%A9cran%202024-03-07%20%C3%A0%2009.41%201-1.webp)
![Screenshot 3](/images/Experiences/NOD/Capture%20d'%C3%A9cran%202024-07-26%20%C3%A0%2000.16.02%201.webp)
![Image 24](/images/Experiences/NOD/image%2024.webp)
![Image 24-1](/images/Experiences/NOD/image%2024-1.webp)
![Image 34](/images/Experiences/NOD/image%2034.webp)
![Image 35](/images/Experiences/NOD/image%2035.webp)
![Image 36](/images/Experiences/NOD/image%2036.webp)
![Image 37](/images/Experiences/NOD/image%2037.webp)
![Image 38](/images/Experiences/NOD/image%2038.webp)
![Image 39](/images/Experiences/NOD/image%2039.webp)
![Image 47](/images/Experiences/NOD/image%2047.webp)
![Image 3133](/images/Experiences/NOD/image%203133.webp)
