# UI Architect Skill

> **Role:** Senior UI/UX Designer · Design-System Architect · Frontend Engineer

A framework-agnostic Antigravity skill that governs how UI design and implementation decisions are made — producing interfaces that feel **human-designed, coherent, distinctive, accessible, and production-ready**.

---

## What This Skill Does

This skill activates a disciplined, product-specific design process whenever you work on UI. It prevents generic AI-generated aesthetics, enforces smart dependency decisions, and ensures every visual choice has a purpose.

It does **not** assume any technology stack. It inspects the project first, then reasons about what to use.

---

## Core Workflow

```
Inspect → Understand → Ask → Recommend → Reuse → Implement → Audit → Refine
```

Never jump directly from a vague UI request to code.

---

## Principles at a Glance

| # | Principle | Summary |
|---|-----------|---------|
| 1 | **Inspect First** | Detect framework, language, styling system, component library, icons, routing, and config before touching anything |
| 2 | **Understand the Product** | Know the audience, primary goal, content type, and brand constraints before redesigning |
| 3 | **Visual Direction** | Offer a curated set of meaningful directions (Minimal, Editorial, Swiss, Bento, Brutalist, Luxury…) with product-fit reasoning |
| 4 | **Targeted Questions** | Ask only questions that can materially change the design — no questionnaire theater |
| 5 | **Anti-Generic AI** | Actively detect and reject purple gradients, glass cards everywhere, pill-heavy UIs, meaningless stats, and decorative noise |
| 6 | **Human-Design Test** | Before finalizing, check: Does it look like a template? Could it belong to any SaaS? Are effects louder than content? |
| 7 | **Package-First Decisions** | Reuse existing → adapt installed → use native → mature package → custom (in that order) |
| 8 | **Dependency Discipline** | Check for duplicates, TS support, a11y, maintenance health, and bundle cost before recommending anything |
| 9 | **Package Recommendation Format** | Always explain: what it's for, why it's justified, why not custom-built, how it fits the existing architecture |
| 10 | **Common Package Categories** | Reference list of UI primitives, icons, animation, tables, forms, charts, drag-and-drop, notifications, rich text, dates |
| 11 | **Design System First** | Establish typography scale, semantic color roles, spacing rhythm, radius system, shadow elevation, and border strategy before large-scale work |
| 12 | **Layout Strategy** | Choose layout from Grid, Flexbox, Bento, Editorial, Sidebar, Dashboard, Masonry, etc. based on information hierarchy |
| 13 | **Responsive Design** | Deliberately design for mobile, tablet, and desktop — don't just shrink the desktop layout |
| 14 | **Accessibility** | Semantic HTML, keyboard nav, focus states, contrast, screen-reader labels, reduced motion — baked in, not bolted on |
| 15 | **Motion** | Use motion to communicate state and hierarchy; avoid constant background movement or animation for its own sake |
| 16 | **Component Architecture** | Create reusable components only where reuse is meaningful; prefer variants over proliferating named components |
| 17 | **UI Audit Mode** | When improving existing UI, audit first (direction, strengths, problems, AI-lookalike risk, hierarchy, typography, color, a11y, responsiveness) |
| 18 | **Reference-Based Design** | Analyze composition and principles from references — never blindly clone another brand's identity |
| 19 | **Implementation Behavior** | Inspect → identify reuse → check deps → establish tokens → implement smallest coherent change → audit after |
| 20 | **Component Library Usage** | Use libraries for accessibility primitives and complex interaction; don't add a second library when one already exists |
| 21 | **Trend Awareness** | Trends are optional tools (editorial, asymmetric, expressive type, restrained glass, neo-brutalism…) — use only when they improve the product |
| 22 | **Output Before Coding** | For significant requests, present direction + reasoning + visual language plan before writing any code |
| 23 | **Final Quality Gate** | Verify design coherence, anti-AI aesthetics, component reuse, UX clarity, accessibility, responsiveness, and engineering conventions |

---

## Design Directions Available

| Category | Options |
|----------|---------|
| **Style** | Minimal, Editorial, Swiss/International, Bento, Flat, Glassmorphism, Neumorphism, Neo-Brutalism, Luxury, Industrial, Retro-futuristic, Organic, Playful, Experimental |
| **Layout** | CSS Grid, Flexbox, Bento, Asymmetric Editorial, Split, Full-width, Sidebar, Dashboard Grid, Masonry, Horizontal Scroll, Product Gallery, Dense Data |
| **Motion** | None, Subtle, Moderate, Rich |
| **Surface** | Sharp, Slightly Rounded, Rounded, Pill-heavy |
| **Priority** | Conversion, Content, Product, Data, Branding, Workflow Efficiency |

---

## Package Decision Order

```
Existing project component?  →  Reuse / extend it
         ↓ no
Existing installed package?  →  Adapt it
         ↓ no
Simple feature?              →  Use native framework/CSS
         ↓ no
Mature package available?    →  Recommend if justified
         ↓ no
                                Build a reusable custom component
```

---

## Common Package Reference

| Category | Options |
|----------|---------|
| UI Primitives | Radix UI, Headless UI, shadcn/ui, MUI, Mantine, Chakra UI, Ant Design |
| Icons | Lucide, Heroicons, Phosphor, Tabler Icons |
| Animation | Motion, GSAP, Auto Animate |
| Tables | TanStack Table |
| Forms / Validation | React Hook Form, Zod |
| Charts | Recharts, Nivo, ECharts, Chart.js |
| Carousel | Embla, Swiper |
| Drag & Drop | dnd-kit |
| Command | cmdk |
| Notifications | Sonner, React Hot Toast |
| Rich Text | Tiptap, Lexical |
| Dates | date-fns, Day.js, React Day Picker |

> These are examples — not mandatory dependencies. Always check the project's existing stack first.

---

## UI Audit Report Format

When improving an existing interface, the audit follows this structure:

```
UI AUDIT

Current visual direction: [description]

Strengths:
- ...

Problems:
- ...

AI-lookalike risk: Low / Medium / High

Hierarchy:     [assessment]
Typography:    [assessment]
Color:         [assessment]
Spacing:       [assessment]
Components:    [assessment]
Accessibility: [assessment]
Responsive:    [assessment]

Recommended changes:
1. ...
2. ...

Reuse:
- Existing components to keep / extend

Packages:
- Existing packages to reuse / new package only if justified

Custom:
- Only product-specific components genuinely needed
```

---

## Final Principle

> ❌ Don't optimize for: *"Make it look modern."*
>
> ✅ Optimize for: *"Make it feel intentionally designed for this product, while making the smartest implementation decision available in the existing project."*

**Reuse before rebuilding.**
**Inspect before installing.**
**Reason before choosing trends.**
**Design before coding.**
**Simplify before adding effects.**

---

## File Structure

```
ui-architect/
├── SKILL.md      # Full skill instructions (read by Antigravity automatically)
└── README.md     # This file — human-readable overview
```
