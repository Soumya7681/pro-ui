# Workflow

The full loop, with the gate that must pass before each step ends.

```
Inspect → Understand → Direct → Plan → Systemize → Implement → Review → Refine
```

---

## 1. Inspect

Read the project before recommending anything. Determine:

- framework / runtime / language / package manager
- styling system (CSS, CSS modules, utility framework, CSS-in-JS, preprocessor, native platform styles)
- existing design tokens or theme file
- existing component library and existing in-project components
- icon library
- animation library
- form, table, chart, editor libraries
- routing and layout structure
- naming, file, and folder conventions
- accessibility and responsive conventions already in use
- dependency manifest and relevant config files

Cheap ways to find these: the dependency manifest, the theme/token file, one representative screen, one representative component, the global stylesheet.

**Gate:** can name the stack, the styling system, and at least three components worth reusing — or has confirmed the project is empty.

Never force a recommendation from a framework the project does not use. If the project already has a design system, extend it; do not replace it.

---

## 2. Understand

See `product-brief.md`. Establish, by inference or by asking:

product · audience · problem solved · primary user goal · primary action · most important information · expected journey · brand personality · sector · primary devices · existing brand assets or guidelines

**Gate:** can state the primary user goal and the single most important action on the screen in one sentence each.

---

## 3. Direct

See `design-directions.md`. Select a visual direction from product, audience, brand, content, UX needs, sector, and existing identity — never at random and never by trend popularity.

Target: **one primary visual language plus at most one supporting technique.**

If the requirements do not specify a style and more than one direction would genuinely work, present 2–3 named directions in three lines each and ask which to use. If the correct direction is obvious, state it and move on — do not manufacture a choice.

**Gate:** the direction is named, and there is a product-specific reason for it.

---

## 4. Plan

Write the design plan before implementation code. Template: `../templates/design-plan.md`. Covers direction, color, typography, layout, components, imagery, interaction states, accessibility.

**Gate:** every color role, type level, and spacing step used later exists in the plan.

---

## 5. Systemize

See `design-system.md`. Define or extend tokens before building many components. A system defined after ten components is a refactor, not a system.

**Gate:** tokens exist for color, type scale, spacing, radius, elevation, motion, breakpoints, icon sizes.

---

## 6. Implement

- build the smallest coherent change that fully delivers the request
- follow the project's existing conventions over personal preference
- component abstraction only where it earns reuse, maintainability, consistency, or readability
- handle interaction states as they are built, not afterwards: hover, focus-visible, active, disabled, loading, empty, error, success
- no unrelated refactoring
- preserve existing behavior

---

## 7. Review

See `review-and-done.md`. Look at the result, not just the code. Hierarchy, layout, typography, component consistency, responsive behavior, UX clarity, visual identity.

**Gate:** the checklist has been run and findings are written down.

---

## 8. Refine

Fix what the review found. Remove anything that survived only because it was already there: dead styles, unused effects, leftover dependencies, decoration without purpose.

---

## Scaling the process

| Request | Process |
|---|---|
| Change a label, fix spacing on one element, swap an icon | Inspect, implement |
| Add a component to an existing system | Inspect, implement to existing tokens, review |
| New screen in an existing product | Full loop, plan can be short, direction inherited |
| New product, redesign, "make it modern" | Full loop, explicit direction and plan |

Ceremony on a small task is its own failure mode. So is skipping direction on a large one.
