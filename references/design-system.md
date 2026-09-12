# Design System

Define a small, coherent system before building many components. Small means enough to build the product and nothing more.

Token groups: **color · typography · spacing · radius · elevation · borders · motion · breakpoints · icon sizing · component states**

If the project already has tokens, extend them. Two competing systems is worse than an imperfect one.

---

## Color

Define by role, never by literal name. `--color-danger`, not `--color-red-500` at the point of use.

```
background          page ground
surface             card / panel ground
surface-elevated    popover, modal, dropdown
text                primary content
text-muted          secondary content, metadata
border              dividers, input outlines
primary             brand / primary action
primary-contrast    text on primary
secondary           supporting action or accent
success warning error info   state colors, each with a text-safe and a fill variant
```

Rules:

- one primary. An interface with three "primary" colors has none
- state colors are reserved for state. Never use `success` because green looked nice
- verify contrast at definition time, not review time (see `accessibility.md`)
- if the product is dark-mode-capable, define roles for both modes at once; do not invert at the end
- never scatter literal hex values through components

## Typography

```
family      display (optional) + body (+ mono if the product shows code or figures)
scale       display / h1 / h2 / h3 / body-lg / body / body-sm / caption
weight      2–3 weights maximum in use
line-height tight for display, comfortable for body (roughly 1.1–1.3 vs 1.5–1.7)
tracking    negative on large display sizes, neutral on body
measure     ~60–75 characters for body text
```

Rules:

- do not reuse the same font pairing in every project; pick for this brand
- pick a scale ratio and stay on it; arbitrary sizes between steps break rhythm
- tabular figures for anything numeric that aligns in columns
- a heading level is a semantic rank, not a size. Style and semantics are set independently

## Spacing

One scale, used everywhere. A 4px base with steps at 4, 8, 12, 16, 24, 32, 48, 64, 96 covers most products.

Rules:

- `margin: 13px` in a project with a scale is a bug
- space belongs to the container's rhythm, not to one-off overrides
- define section rhythm too: the vertical gap between major page sections is a token, not a guess
- related items sit closer than unrelated ones. Proximity is hierarchy

## Radius

Pick a character and hold it: sharp (0) · subtle (2–4px) · medium (6–10px) · rounded (12–16px) · pill (full, for chips and avatars only).

Rules:

- do not default everything to a large radius
- nested radii: inner radius = outer radius − padding, or the corners look wrong
- one exception can be deliberate (pill avatars in a sharp system). Five exceptions is noise

## Elevation

Shadows model distance from the page. Most flat content needs none.

```
0   flat content
1   raised surface that can be interacted with
2   dropdown, popover
3   modal, dialog
```

Rules:

- borders or surface contrast usually separate content better than shadows
- never stack multiple shadows for "depth" without a light-source rationale
- shadows in dark UI generally fail; use surface lightness instead

## Borders

Choose one strategy and apply it: border-led · shadow-led · surface-contrast-led · borderless. Mixing all four is what makes an interface look assembled.

## Motion

```
duration   fast 120–160ms (hover, toggle)
           base 200–260ms (dropdown, tab, expand)
           slow 300–400ms (modal, page transition, large layout shift)
easing     standard  ease-out for enter, ease-in for exit
           emphasized for large movement
```

See `motion.md` for when motion is justified at all, and for choreography, performance, and reduced-motion rules.

## Breakpoints

Follow the project's existing breakpoints. Otherwise pick three to four and name them by intent, not device. Design the *content's* breakpoints: break where the layout stops working, not where a phone model happens to end.

## Icon sizing

Two or three sizes, tied to the type scale (16 / 20 / 24 typical). Icons align optically with the text they accompany, and inherit color from context. See `imagery-and-icons.md`.

## Component states

Every interactive component defines: default · hover · focus-visible · active · disabled · loading · and where relevant selected, error, empty, success. A component without a focus state is unfinished.

---

## Implementation

Express tokens in whatever the project already uses: CSS custom properties, a theme file, a utility framework's config, platform resources. The mechanism matters less than the discipline — no literal values at the point of use, and no new value invented mid-build.
