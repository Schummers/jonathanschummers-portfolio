---
heroImage: "/images/Experiences/NOD/Principal.webp"
---

## Context & Objectives

### Problem

Operators couldn't complete a diagnosis without leaving the app. For almost every incident, they had to manually connect to each plant's automation system to retrieve the data they needed. With a renewable energy portfolio that had quadrupled in 3 years, the small team couldn't keep up.

![Tool before the redesign](/images/Experiences/NOD/image%2024.webp)

### Target audience

9 control center operators supervising hundreds of multi-energy assets (solar, wind, hydro) at TotalEnergies. They work in shifts, monitoring plant performance and handling incidents in real time.

### Team

- Sole Product Designer in a Scrum squad
- 1 PO, 3 full-stack developers, 2 data engineers
- Joined after the previous designer left, with no documentation

### Key results

- Increased energy tracked per operator by **+23% kWh in 12 months** by bringing diagnostic data inline so operators stopped leaving the app mid-incident
- Made the dashboard fully responsive from 14" to 40", after which **6 of 9 operators** adopted laptops as their default monitor

## How I solved this problem

### 1. Mapped how the product impacts users and business with a Lean UX Canvas

I started by running a Lean UX Canvas workshop with the PO and PM to understand the product's value proposition: how each feature was supposed to drive user outcomes (faster diagnosis, fewer manual connections) and business outcomes (reduce production losses, increase remote incident resolution). This gave me a clear picture of what the product should deliver before going to the field.

![Lean UX Canvas](/images/Experiences/NOD/Smart%20Slopes%20UX%20-%20Frame%206%201.webp)

### 2. Tested the value proposition with real users and found it wasn't delivering

I observed operators in their control center and ran usability tests in production with 5 of the 9 users. The goal: does the app actually deliver on the business outcomes we mapped in step 1?

**Operators had to leave the app for almost every diagnosis.**

11 out of 15 diagnostics required connecting to the plant's automation system to get additional information. The alert page had the right concept but didn't surface enough data for a complete diagnosis.

**The app wasn't designed for how users actually work.**

4 out of 9 operators used 14-inch laptop screens, not the 40-inch monitors the app was designed for. Scrolling was constant, and key information was hidden below the fold.

Other findings from the 5 user tests:

- **5/5 users** handled alarms in order of prioritized losses
- **13/15 diagnostics** had correct root cause identification
- **4/5 users** ignored weather data because they couldn't correlate irradiance with power output
- **5/5 users** needed to check the logbook page separately to compare ongoing events with current alarms
- **3/5 users** said not processing all plants every morning was a real time saver vs. their previous tool

### 3. Ran a Design Studio workshop to align the team on solutions

I facilitated a collaborative sketching workshop with the full squad. Each member proposed a layout addressing the two core problems: incomplete diagnosis data and poor responsiveness.

We converged on three design directions:

- **Bring all diagnostic data into the alert cards** so operators never need to leave the app
- **Add weather/production correlation charts** so operators can match irradiance and wind levels with power output directly
- **Redesign the layout to be fully responsive** from 14" laptops to 40" monitors

![Sketch 1](/images/Experiences/NOD/image%2034.webp)
![Sketch 2](/images/Experiences/NOD/image%2035.webp)
![Sketch 3](/images/Experiences/NOD/image%2036.webp)
![Sketch 4](/images/Experiences/NOD/image%2037.webp)

### 4. Built and tested a first prototype to validate the new design

I designed a first iteration focused on displaying the most relevant diagnostic information above the fold. Key changes:

- Grouped equipment alarms with their parent PTR alarms (shutter system)
- Separated diagnosis and event creation into two distinct pages
- Added a two-column logbook preview to show ongoing tickets

Tested with users: **60% of diagnostics could now be completed without leaving the app.** But **the shutter system went unnoticed (0 users found it)**, and **the logbook needed more space**.

![Logbook & events page](/images/Experiences/NOD/MacBook%20Air%20-%201%202.webp)
![Alert page](/images/Experiences/NOD/NOD%201.webp)

### 5. Shipped the second iteration to production and measured results

Based on test feedback, I iterated on the design:

- Made the layout fully responsive with optimized views for both 14" and 40" screens
- Replaced the shutter with a simpler alarm card that groups all CTAs together
- Added a weather chart comparing irradiance/wind with production curves
- Increased font size automatically above 24" screen width

After shipping, **2 more operators switched to laptop screens by choice (6/9 total)**. **Users correctly attributed weather-related alarms for the first time.** **Zero usability issues** in follow-up testing with 4 users.

## What we delivered

### A connected, responsive dashboard for in-app diagnosis, delivering +23% kWh per operator in 12 months.

- Fully responsive from 14" to 40": 6 of 9 operators switched to laptop as default monitor
- Connected to the industrial network for real-time plant data
- Majority of diagnostic data inline, reducing manual connections to plant systems
- Weather/production correlation charts for root cause identification

![Alert page, 14-inch. Screenshot from prod](/images/Experiences/NOD/Principal.webp)
![Alert page, 40-inch. Screenshot from prod](/images/Experiences/NOD/Frame%201597884570.webp)
