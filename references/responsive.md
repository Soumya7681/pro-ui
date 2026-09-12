# Responsive

Shrinking a desktop layout is not responsive design. Each breakpoint is a deliberate composition of the same content.

---

## Per-section worksheet

Run this for every major section before building it. Write the answers down; they are design decisions, not implementation details.

```
What stacks?              multi-column → single column, and in what source order
What reorders?            the visually-secondary column is often first on mobile
What collapses?           nav → drawer, filters → sheet, table → cards, sidebar → tabs
What scrolls sideways?    tables, chip rows, carousels — with a visible affordance
What disappears?          genuinely secondary content only; never a core action
What changes interaction? hover reveals need a tap or persistent equivalent
What grows?               touch targets to ~44px, spacing between adjacent targets
What shrinks?             display type scales down faster than body type
What re-crops?            images whose subject would be cut out of the frame
```

A section that answers "nothing changes" at every breakpoint is either very simple or unexamined.

---

## Breakpoint strategy

Design the **content's** breakpoints. Break where the layout stops working — where the measure gets too long, where columns get too narrow, where a table stops fitting. Not at device widths, which change every year.

- follow the project's existing breakpoints. Consistency beats a better set
- three to four named by intent, not by device, when starting fresh
- **container queries over viewport queries** for components. A card in a sidebar and the same card in a main column need different layouts at the same viewport width. Query the container it sits in
- fewer breakpoints held rigorously beats many applied loosely
- mobile-first source order in most stacks: base styles are the small layout, each query adds

## Fluid vs stepped

| Property | Approach |
|---|---|
| Type scale | Fluid between a min and max, clamped at both ends. Never unbounded |
| Spacing / section rhythm | Fluid or stepped, but tied to the scale; never arbitrary per breakpoint |
| Layout structure | Stepped. Columns change at a decision point, not continuously |
| Container width | Fluid with a max, plus a side gutter that never collapses to zero |

Fluid type without a maximum produces absurd headlines on wide monitors. Fluid type without a minimum makes body text unreadable on small screens. Clamp both.

---

## Layout patterns

| Pattern | What it does | Use when |
|---|---|---|
| **Stack** | Columns become rows in source order | Equal-weight content |
| **Reflow** | Grid changes column count at each step | Card and tile collections |
| **Reorder** | Source order differs from visual order at one size | A sidebar that must lead on mobile |
| **Priority+** | Show what fits, move the rest into a "more" affordance | Toolbars, tab bars, nav |
| **Off-canvas** | Secondary region slides in on demand | Navigation, filters, detail panels |
| **Reveal** | Content hidden behind disclosure on small, visible on large | Dense metadata |
| **Summary + detail** | List on small, list-plus-detail on large | Inbox, records, settings |
| **Swap** | A genuinely different component per size | Table vs card list, menu vs drawer |

Reordering visual position away from DOM order breaks the keyboard path. Reorder in the source where possible, and verify tab order afterward either way.

---

## Component-by-component

### Navigation
Horizontal bar → priority+ → drawer or bottom bar. Decide which, do not default to a hamburger. Keep the primary action visible outside the drawer. On mobile, a bottom bar reaches the thumb better than a top bar for frequent actions. Sticky headers cost vertical space and must earn it.

### Tables
Never a squashed table. Pick one:
- horizontal scroll with the key column frozen and a visible scroll affordance
- card-per-row on small screens, with the two or three fields that matter
- summary column plus a detail view or sheet
- column priority: hide low-value columns below a threshold, with a way to reveal

Pair with: sticky header row, right-aligned numeric columns, tabular figures.

### Forms
One column on every size. Labels above fields. Group related fields. Correct input type and autocomplete per field so the right keyboard appears. Keep the submit action reachable when the on-screen keyboard is open. Inline validation that does not shift layout when a message appears.

### Modals and overlays
Dialog on desktop, full-screen or bottom sheet on small screens. Sheets need a drag or close affordance and must not trap scroll behind them.

### Cards and grids
Define the minimum readable card width and let the grid choose the column count from it, rather than hardcoding counts per breakpoint.

### Images and media
Art-direct the crop when the subject would be lost. Serve appropriate sizes. Always reserve the aspect ratio so nothing shifts on load. Video needs a poster and must not autoplay with sound.

### Long-form text
Constrain the measure to roughly 60 to 75 characters at every width. A full-width paragraph on a wide monitor is a responsive failure even though nothing overflows.

---

## Touch, pointer, and input

- hover does not exist on touch. Anything revealed only on hover must have a tap equivalent or be persistent
- query input capability rather than assuming from width: coarse pointer means bigger targets and no hover reliance
- a device can have both. A laptop with a touchscreen must satisfy both paths
- drag interactions need a keyboard and a non-drag alternative
- avoid gestures as the only way to reach anything
- respect safe areas on notched devices; keep interactive content out of the home-indicator strip
- account for the on-screen keyboard: inputs must not end up hidden behind it

---

## Density

Responsive is not only about width. The same product may need a comfortable density for occasional users and a compact density for people in it all day. If the product has a density switch, it is a token-level decision made at the same time as spacing, not a late retrofit.

---

## Verification

| Width | Check |
|---|---|
| 320–360px | No overflow, no clipped text, targets reachable |
| ~480px | Stack decisions read correctly |
| ~768px | The awkward middle — most layouts break here |
| ~1024px | Tablet landscape, sidebar decisions |
| ~1440px+ | Measure is constrained, content is not stranded |

Also verify: 200% browser zoom, 400% zoom for reflow compliance, landscape on a short viewport, a long-string worst case, and the largest realistic dataset.

**No horizontal page scroll at any width, ever.** An overflowing element inside its own scroll container is fine; the page body scrolling sideways is a bug.

---

## Common failures

| Symptom | Cause |
|---|---|
| Sideways page scroll on mobile | A fixed width, a negative margin, or an unconstrained image or table |
| Text touching the screen edge | Gutter applied to an inner element instead of the container |
| Tiny tap targets crowded together | Desktop spacing carried down unchanged |
| Content hidden on mobile that users need | "Simplification" that removed a core action |
| Mobile nav that hides the primary CTA | Everything swept into the drawer |
| Layout shift as images load | Aspect ratio not reserved |
| Unreadable line lengths on wide screens | No max width on text containers |
| Keyboard covering the field being typed in | No scroll-into-view handling |

Mobile should feel designed for mobile, not tolerated.
