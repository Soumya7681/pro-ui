# UI Audit Template

Present before changing an existing interface. Short, specific, located. Every problem names where it is and what it costs the user.

---

```
UI AUDIT — <screen or product>

Current direction
  <what the interface is visually doing today>

Strengths — keep these
  - <specific thing that works, and why>

Problems — ranked by user impact
  1. <location> — <problem> — <consequence for the user>
  2.
  3.

AI-lookalike risk: Low / Medium / High
  <which generic patterns are present, if any>

Information architecture
  <what is here, how it is grouped, what does not belong>

Hierarchy
  <what wins attention vs what should>

Layout
  <structure, alignment, density, rhythm>

Typography
  <scale, contrast, measure, legibility>

Color and surfaces
  <roles, contrast, meaning, consistency>

Spacing
  <consistency, grouping, section rhythm>

Components
  <consistency, variant sprawl, missing states>

Imagery and icons
  <purpose, quality, library consistency>

Interaction and motion
  <feedback, transitions, loading, empty, error>
  <motion without a job; animation on scroll; missing reduced-motion path>

Responsive
  <mobile, tablet, overflow, touch targets, navigation>
  <tables and modals on small screens; hover-only affordances; 200% zoom>

Accessibility
  <keyboard, focus, contrast, semantics, labels, reduced motion>

RECOMMENDED CHANGES — in order
  1. <change> — <expected improvement>
  2.
  3.

Reuse
  Keep:   <components and packages already doing their job>
  Extend: <components worth growing instead of replacing>

Packages
  Existing to lean on: <...>
  New, only if justified: <name — why — why not custom>

Custom work
  <only components genuinely specific to this product>

Out of scope
  <what this pass deliberately leaves alone>
```
