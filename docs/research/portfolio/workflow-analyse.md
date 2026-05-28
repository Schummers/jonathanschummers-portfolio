# We Stopped Using Figma. Here's What Replaced It.

Created by: Jonathan
Created time: 13 mai 2026 09:01
Last edited by: Jonathan
Last updated: 24 mai 2026 13:56
5 min: Yes
ID: 344
Résumé: The article argues that the real bottleneck in AI‑assisted development is not code generation but the surrounding processes, and proposes a structured “Plan → Ship → Analyze” framework where detailed, living specifications drive AI agents to produce, test, and validate code and UI, turning design specs into executable contracts and reducing waste, while humans focus on decision‑making and oversight.
État: Ongoing

We spent 1 month building AI agents to generate code. We got it wrong. Not the code — the process.

The problem was never the LLM quality. It was the lack of structure around it. An AI agent without a working framework is a senior dev dropped into a project with no spec, no tests, no review. It produces code. Sometimes good. Often off target.

We built a framework, Plan → Ship → Analyze, that transforms how AI agents produce software. And we pushed the logic to its conclusion: if an agent can write code from a spec, it can also brainstorm the UI. Figma becomes optional.

Here's how, and why.

## The Real Bottleneck Is Not the Code

Most teams using AI agents to code make the same mistake: they optimize the writing phase. "Claude writes code faster." Sure. But writing code was never the bottleneck.

The bottleneck is everything else:

- **Understanding the need**: 40% of a tech lead's time goes to chasing context between Slack, Figma, Linear and people's heads.
- **Specifying correctly**: A vague spec produces vague code. AI literally executes what it's given — it doesn't infer intent like a human.
- **Validating the result**: Without binary criteria, "looks good" is an opinion, not a validation.
- **Capitalizing**: Every shipped feature should improve the next process. In practice, every feature starts from scratch.

The fundamental insight: **the quality of AI output is directly proportional to the quality of the input**. A vague prompt produces vague code. A structured, testable, exhaustive spec produces production-ready code.

So we stopped optimizing the code. We optimized the entire process.

## The Framework: Plan → Ship → Analyze

The architecture is simple. A single orchestrator (`workflow/skill.md`) loads three modular actions. The generated specs are **living documents** that flow between phases and update in real time.

.claude/

├── workflow/

│ └── skill.md # Orchestrator (single entry point)

├── actions/

│ ├── plan.md # Specification

│ ├── ship.md # Test-First Development

│ └── analyze.md # Post-ship Analysis

└── specs/

├── active/ # In-progress specs (living documents)

├── dropped/ # Abandoned specs

└── shipped/ # Shipped specs

Each phase has a specific role, validation gates, and a responsibility to update the spec. The spec is never static. It reflects the actual state of development at every moment.

### Plan: The Agent That Challenges Before Coding

The Plan phase is not a template to fill out. It's a structured conversation where the agent **must** challenge the requirement.

The agent is required to:

- **Question** blind spots before specifying
- **Propose** alternatives if the feature seems poorly thought out
- **Validate** each section with binary criteria
- **Refuse** to move to Ship as long as the spec is incomplete

This is the fundamental difference from a classic prompt. We don't say "write a spec for X." We say "analyze requirement X, challenge it, identify what's missing, and produce a spec that any agent can execute without ambiguity."

The gate between Plan and Ship is strict:

SPEC COMPLETE?

[ ] Context & need validated

[ ] Scope defined (in/out)

[ ] User stories written with Gherkin

[ ] Technical specs complete

[ ] Edge cases exhaustive

[ ] Verification protocol defined

All ✓ → SHIP

Otherwise → Stay in PLAN

No moving to Ship with "etc." or "to be defined." What is not specified does not exist.

### The Spec as a Machine-Readable Contract

A traditional spec says "fast" or "secure." An AI agent doesn't know what to do with that. Our template forces precision:

|
Vague

|

Precise (executable by an agent)

|
| --- | --- |
|

"fast"

|

"< 200ms for 99% of requests"

|
|

"user-friendly"

|

"Maximum 3 clicks to complete the action"

|
|

"secure"

|

"Auth required, rate limit 100 req/min"

|
|

"well tested"

|

"Coverage > 80%, 0 tests skipped"

|
|

"etc."

|

Exhaustive list of cases

|

Each spec contains 8 sections: Overview, User Stories (with Gherkin scenarios), Functional Requirements, Non-Functional Requirements, Edge Cases, Acceptance Criteria, Technical Context, and Metadata. Nothing is optional.

### Ship: Test-First, Not "Code First and We'll See"

Ship implements a strict TDD cycle. The agent doesn't touch code until the tests are written.

SPEC → Parse Stories → Write Tests → Minimum Code → Validate → Fix (loop)

│

▼

Update Spec ✓

The Red-Green-Refactor cycle is applied by the agent itself:

1. **Red**: Write a failing test (the expected behavior)
2. **Green**: Minimum code to make the test pass
3. **Refactor**: Clean up the code, tests stay green

The Refactor phase is mandatory. Green does not mean Done.

### The Ralph Loop

Inspired by the [Ralph Wiggum technique](https://block.github.io/goose/docs/tutorials/ralph-loop/), the agent iterates with a fresh context on each pass. No noise accumulation in the context. On each iteration:

1. Load the spec + current state (passing/failing tests)
2. Execute one iteration (test/code/validate)
3. Check the "done" criteria
4. If done → exit. Otherwise → new iteration, fresh context.

It's counterintuitive. You might think that losing context between iterations slows the agent down. In practice, it's the opposite. A fresh context eliminates accumulated assumptions and dead ends. The agent rediscovers the problem on each iteration, often from a different angle.

The Ralph Loop works exceptionally well for:

- Well-defined success criteria (automated tests)
- Mechanical tasks (migrations, refactoring)
- Iterative corrections (fix → test → fix → test)

It doesn't work for architecture decisions or security-sensitive code. Those cases require continuous human reasoning.

### Analyze: The External Perspective Post-Ship

The third phase is often ignored in AI workflows. You ship, you move on. Analyze forces a critical step back.

The agent acts as an external reviewer with a product perspective. By priority:

1. **Spec conformance**: Is every item in the spec implemented?
2. **Product**: Does the feature solve the original problem?
3. **Technical**: Is the code maintainable? Edge cases handled?
4. **Quality**: Tests sufficient? Performance OK?
5. **Product method**: Apply JTBD, HEART, Five Whys, Kano or Outcome-Driven depending on context

The agent selects the analysis method via an UltraThink system:

|
Feature context

|

Method

|
| --- | --- |
|

New workflow

|

Jobs-to-be-Done

|
|

Critical UX

|

HEART (predictive)

|
|

Technical risks

|

Five Whys

|
|

Product value

|

Kano Model

|
|

Business impact

|

Outcome-Driven

|

The output is a structured report with a conformance score:

Spec Conformance:

Stories → 5/5 (100%)

Acceptance → 8/9 (89%)

Edge Cases → 4/6 (67%)

TOTAL → 85%

Verdict: ⚠️ Gaps (fix required)

Missing items:

❌ EC-5: Rate limiting not implemented

⚠️ FR-3: Partial validation on empty inputs

If conformance is below 100%, the feedback loop sends back to Plan or Ship. No "we'll see in prod."

## Why Figma Becomes Unnecessary

This is the most counterintuitive thesis in our approach, and yet the most logical when you follow the reasoning to its conclusion.

### The Problem with Figma in an AI Workflow

We tested Figma as a "wedge" for Lyse. A Figma plugin that detects component changes and automatically generates development tasks. The idea was elegant on paper. In practice: too much technical friction (unstable plugin, restricted MCP), nobody used the detailed generated specs, and the workflow created more problems than it solved.

But the problem goes deeper than technical bugs.

Figma encodes a presupposition: **design is a deliverable that precedes code**. The designer creates a mockup. The developer translates it into code. AI can accelerate the translation, but the bottleneck remains the same: a human must first imagine every screen, every interaction, every state.

In an AI-native workflow, this presupposition collapses.

### The Spec Replaces the Mockup

If a spec is precise enough for an agent to write production-ready code, it's precise enough for an agent to brainstorm the UI.

Take a Gherkin user story:

Given a logged-in user with 3 active projects

When they access the dashboard

Then they see their projects sorted by recent activity

And each project displays: name, last activity, number of open tasks

And a "New project" button is permanently visible

Given a logged-in user with no projects

When they access the dashboard

Then they see an empty state with a CTA "Create your first project"

And a contextual illustration (not a blank screen)

An AI agent has everything it needs to:

1. Propose a layout structure (grid, list, cards)
2. Choose components from the existing design system
3. Handle visual edge cases (empty state, loading, error)
4. Iterate based on user feedback

The project's design system serves as a constraint, exactly like an API serves as a constraint for the backend. The agent doesn't start from a blank page. It composes from existing primitives (CSS tokens, atomic components, established patterns).

### Claude Brainstorming the UI, Concretely

We apply the same Plan → Ship → Analyze framework to the frontend:

**Plan**: The spec describes behaviors, states, interactions. Not pixels. The agent challenges: "This page has 12 visible actions. According to the Kano Model, 3 are must-haves and 9 are delighters. I propose prioritizing the 3 must-haves above the fold and grouping the rest."

**Ship**: The agent implements components respecting the design system. Tests verify behaviors (accessibility, responsive, interactions), not pixel-perfect appearance. The Ralph Loop iterates on the code until acceptance criteria pass.

**Analyze**: The agent evaluates with HEART (predictive): "Task Success is high (3 clicks max), but Adoption is uncertain. The main CTA uses a technical label ('Instantiate a workflow') instead of a benefit-oriented label ('Start a project'). Suggestion: A/B test on the wording."

This is a paradigm shift. The designer doesn't disappear. They shift from "mockup producer" to "creative director who validates and refines the agent's proposals." Exactly like a tech lead no longer codes everything themselves but reviews and directs the team's work.

### What This Changes for Components

Our codebase uses Atomic Design (atoms, molecules, organisms, templates). It's a perfect vocabulary for AI agents:

- **Atoms** (buttons, inputs, labels): Defined once, reused everywhere. The agent knows a `BaseButton` exists with primary, secondary, ghost variants.
- **Molecules** (form groups, cards): Compositions of atoms. The agent composes naturally.
- **Organisms** (headers, sidebars, modals): Recurring patterns with integrated logic.
- **Templates**: Page layouts. The agent proposes based on user stories.

The design system constraint works like the test constraint in TDD: it prevents the agent from drifting toward incoherent solutions.

## Living Specs: The Key to the Entire System

The most important concept in the framework is not Plan, Ship, or Analyze individually. It's that **specs are never frozen**.

PLAN → generates specs/active/feature-x.md

↓

SHIP → updates checklists in real time

↓

ANALYZE → adds gaps, suggestions, changelog

↓

specs/active/feature-x.md (always up to date)

↓

specs/shipped/ (when 100% conformant)

The spec reflects the actual state of development, not the initial intent. If an edge case is discovered during Ship, it's added to the spec. If Analyze detects a gap, it's documented with a corrective action.

This mechanism eliminates a classic problem in AI projects: the drift between intention and implementation. The spec is not a document you write at the beginning and forget. It's a **living progress dashboard**, the single source of truth for each feature.

## What This Changes for Tech Teams

After 6 months of iterating on this framework, here's what we observe:

**Specification time goes up, total time goes down.** Spending 30 minutes on a Plan spec instead of 5 minutes on a vague prompt reduces Ship time by 2-3x. Fewer back-and-forths, fewer corrections, fewer "that's not what I wanted."

**Agents become predictable.** With binary criteria and automated tests, an agent's output is verifiable. Not "looks good," but "8/9 acceptance criteria pass, rate limiting is missing."

**Design becomes a process, not an art.** When the UI is brainstormed from a structured spec with a design system as constraint, design decisions become traceable and justified. "I chose a list instead of a grid because the spec mentions 3 fields per item, and benchmarks show lists are faster to scan for < 5 fields."

**The feedback loop closes.** Plan → Ship → Analyze → Plan. Each cycle improves the next. Recurring patterns in Analyze feed the next Plans. The system learns, not just the agent.

## The Bottom Line

The industry treats AI agents as glorified autocompletions. "Copilot writes code faster." That's true, and it's a local optimization.

The global optimization is to rethink the entire process. The spec, the development, the validation, the design. Not "AI helps the developer." But "AI executes the complete cycle, the human validates and directs."

The Plan → Ship → Analyze framework is not a theoretical abstraction. It's what we use daily to build [getlyse.com](https://getlyse.com/), an autonomous PM agent for tech teams without a PM. We dogfood our own method: every feature of Lyse is specified, coded, and analyzed by AI agents following this framework.

We're not claiming Figma is dead. We're saying that in an AI-native workflow, the pixel-perfect mockup is no longer the starting point. The spec is. And when the spec is good enough, the agent can brainstorm the UI as well as the code.

> The future of software development is not "AI writes code." It's **"AI executes a structured process, from spec to shipping, and the human does what the human does best: decide, prioritize, and say no."**
> 

Special thanks to [Benoît Vaillant](https://bntvllnt.com/fr) — this flow wouldn’t exist without his work and insights on the subject.

### 

- 
- 
-