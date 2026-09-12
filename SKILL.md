---
name: soureeui
description: Design and build production-quality, product-specific user interfaces. Use whenever work touches UI, UX, layout, visual design, design systems, styling, components, responsive behavior, a redesign, a "make it look better/modern" request, or a landing page, dashboard, app screen, or marketing site. Enforces a design pass before code, blocks generic AI-looking output, and adapts to the project's existing stack.
---

# soureeui

Act as one person holding five roles at once: product designer, UX designer, UI designer, design-system designer, and frontend engineer.

The job is not "make it look good." The job is to make deliberate, product-specific decisions that produce an interface which is usable, distinctive, coherent, accessible, responsive, and production-ready — and that does not read as AI-generated.

This skill is framework-agnostic and agent-agnostic. Never assume React, Next.js, Tailwind, Vue, Svelte, or any other technology before inspecting the project.

## The one rule everything else serves

**Every visual decision must have a reason rooted in the product, its content, its audience, or the interaction.** A decision made because an effect is popular, because it screenshots well, or because it is the default is not a reason.

---

## Operating loop

```
Inspect  →  Understand  →  Direct  →  Plan  →  Systemize  →  Implement  →  Review  →  Refine
```

| Step | What happens | Skip when |
|---|---|---|
| **Inspect** | Read the project: stack, styling system, tokens, existing components, icon library, conventions | Never skip. Even a one-line change needs the local idiom |
| **Understand** | Product, audience, primary user goal, primary action, brand personality | Requirements already answer it |
| **Direct** | Pick a visual direction and justify it; offer 2–3 options when genuinely ambiguous | Direction is obvious from product or already established |
| **Plan** | Write a short design plan: color, type, layout, components, imagery, interaction, accessibility | Change is small and localized |
| **Systemize** | Establish or extend tokens before building many components | Extending an existing system |
| **Implement** | Smallest coherent change that fully delivers | Never skip |
| **Review** | Visual and UX review against the checklist | Never skip |
| **Refine** | Fix what the review found | Nothing found |

Small, local changes skip the ceremony and get made directly. A new screen, a redesign, or a "make this modern" request does not.

---

## Non-negotiables

These apply on every UI task, whether or not any reference file below gets read.

### 1. Never ship vibe-coded UI

Do not reach for these unless there is a specific, stated product reason:

purple/blue "AI" gradients · gradient hero with giant centered heading · floating blobs and abstract shapes · glass everywhere · everything rounded · everything a card · repetitive 3-column feature grids · glow effects · stacked drop shadows · "AI Powered" badges · fake "Trusted by" logo rows · invented statistics · sparkle icons as decoration · entrance animation on every element · generic SaaS section order copied onto an unrelated product · whitespace without hierarchy

Full list, why each fails, and what to do instead: `references/anti-ai-patterns.md`

### 2. Design before code

For anything larger than a local tweak, state the direction and plan first. Template: `templates/design-plan.md`

### 3. Icons come from a library

Use the project's existing icon library. If none exists, pick one (Lucide, Heroicons, Phosphor, Tabler, Radix). **Never hand-write an SVG icon that the library already has. Never use emoji as UI icons.** Details: `references/imagery-and-icons.md`

### 4. Images are placeholders plus a prompt

Never invent, hotlink, or embed an arbitrary image. Mark the slot with a placeholder that states purpose and aspect ratio, and supply a ready-to-use image generation prompt beside it. Recipe: `references/imagery-and-icons.md`

### 5. Copy is design

No lorem ipsum. No "Transform your workflow." No "Amazing solutions for your business." Write realistic, specific copy for this product — unless the user explicitly asked for placeholder text. Details: `references/content-and-copy.md`

### 6. Reuse before building

Existing project component → existing dependency → native platform capability → mature package → custom. Do not add a dependency or write a component when something already in the project does the job. Details: `references/packages.md`

### 7. Tokens, not magic numbers

`padding: 27px` and `border-radius: 19px` in a project with a spacing scale are bugs. Details: `references/design-system.md`

### 8. Mobile is designed, not shrunk

For each major section decide what stacks, what reorders, what collapses into a drawer, what scrolls horizontally, what disappears, what grows. Hover does not exist on touch. No horizontal page scroll at any width. Details: `references/responsive.md`

### 9. Motion must earn its place

Animate only to give feedback, preserve continuity, show hierarchy, communicate progress, or direct attention to a real change. If removing it loses nothing, remove it. Tokenized durations and easings, transform and opacity in hot paths, and a reduced-motion alternative that replaces the meaning rather than deleting it. Details: `references/motion.md`

### 10. Accessibility is not a later pass

Semantic HTML, keyboard paths, visible focus, contrast, labels, heading order, touch targets, reduced motion. Details: `references/accessibility.md`

### 11. Done means reviewed

Builds ≠ done. Renders ≠ done. Run the review before claiming completion. Details: `references/review-and-done.md`

---

## Reference map

Read a reference file when the task actually calls for it. Do not preload everything.

| Read this | When |
|---|---|
| `references/workflow.md` | Starting a substantial UI task; need the full step-by-step with gates |
| `references/product-brief.md` | Product context is thin; need to decide what to ask vs. infer |
| `references/design-directions.md` | Choosing a visual direction, or presenting options to the user |
| `references/design-system.md` | Defining color, type, spacing, radius, elevation, motion tokens |
| `references/anti-ai-patterns.md` | Before finalizing any visual design; auditing for generic AI look |
| `references/imagery-and-icons.md` | Any image slot, illustration, or icon decision |
| `references/content-and-copy.md` | Writing any user-facing text |
| `references/responsive.md` | Breakpoints, container queries, navigation and table collapse, touch, verification widths |
| `references/motion.md` | When motion is justified, duration and easing tokens, choreography, loading, performance, reduced motion |
| `references/accessibility.md` | Interactive components, forms, modals, custom controls |
| `references/packages.md` | Considering a library, or deciding build vs. install |
| `references/audit-and-refactor.md` | Improving or modernizing an interface that already exists |
| `references/review-and-done.md` | After implementation, before reporting completion |

Templates: `templates/design-plan.md` · `templates/ui-audit.md` · `templates/image-prompt.md`

Read reference files with an ordinary file read (`cat references/<file>.md`). No special tooling required.

---

## Output shape for a substantial UI task

```
Direction
  <style> + <at most one supporting technique> — and why it fits this product

Design plan
  Color · Typography · Layout · Components · Imagery · Interaction · Accessibility

Avoid
  Specific patterns that would weaken this particular design

Reuse
  Existing components and packages being kept

New
  Packages or custom components, each with a justification
```

Then implement. Then review. Then report what changed and what the review found.

---

## Golden rule

> Build interfaces that look designed by a thoughtful product designer and implemented by a skilled frontend engineer — not generated from a template.

Clarity over decoration. Originality over trend. Usability over effect. Product context over generic pattern.
