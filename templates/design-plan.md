# Design Plan Template

Write this before implementation code on any non-trivial UI task. Keep it tight — a page, not a document. Delete rows that do not apply to the task.

---

## Product

- **Product:** what it is, in one line
- **Audience:** who uses it and in what context
- **Primary user goal:**
- **Primary action:** the one thing this screen must get people to do
- **Most important information:**
- **Devices:** where it is actually used
- **Brand constraints:** existing identity, assets, guidelines — or "none, choosing"

## Direction

- **Primary visual language:**
- **Supporting technique (at most one):**
- **Why this fits:** two concrete product reasons
- **Deliberately avoiding:** patterns that would weaken this specific design
- **Originality anchors:** at least two decisions no competitor would share

## Color

| Role | Value | Notes |
|---|---|---|
| background | | |
| surface | | |
| surface-elevated | | |
| text | | contrast vs background |
| text-muted | | contrast vs background |
| border | | |
| primary | | |
| primary-contrast | | |
| secondary / accent | | |
| success | | |
| warning | | |
| error | | |
| info | | |

Dark mode: yes / no. If yes, roles defined for both modes now.

## Typography

- **Display family:**
- **Body family:**
- **Mono family (if needed):**
- **Weights in use:**
- **Scale:** display / h1 / h2 / h3 / body-lg / body / body-sm / caption — with sizes, line heights, tracking
- **Measure:** target characters per line for body text

## Layout

- **Container width / max content width:**
- **Grid:** columns, gutters
- **Spacing scale:**
- **Section rhythm:** vertical space between major sections
- **Desktop composition:**
- **Tablet composition:**
- **Mobile composition:** what stacks, reorders, collapses, scrolls, grows

### Responsive per section

| Section | Stacks | Reorders | Collapses to | Scrolls sideways | Hidden | Target size change |
|---|---|---|---|---|---|---|
| | | | | | | |

- **Navigation on small screens:** drawer / bottom bar / priority+ — and where the primary action stays visible
- **Tables on small screens:** scroll with frozen column / cards / summary plus detail
- **Container queries needed for:** components that appear in more than one container width

## Components

| Component | Reused / extended / new | Variants | States needed |
|---|---|---|---|
| | | | |

New dependencies, with justification (see `../references/packages.md`): none / list

## Imagery

| Slot | Purpose | Aspect ratio | Negative space | Asset status |
|---|---|---|---|---|
| | | | | real / placeholder + prompt |

## Icons

- **Library:** existing project library, or chosen one
- **Sizes:**
- **Where icons appear, and what they mean:**

## Interaction

- **Hover:**
- **Focus-visible:** (never animated in)
- **Active / pressed:**
- **Loading:** inline / skeleton / determinate progress, per expected wait
- **Empty:**
- **Error:**
- **Success:**

### Motion

| Moment | Job (feedback / continuity / hierarchy / progress / attention) | Duration | Easing | Origin |
|---|---|---|---|---|
| | | | | |

- **Anything that animates without user action:**  (justify or cut)
- **Reduced-motion alternative for each row above:**

## Accessibility

- **Contrast verified on:** text, muted text, icons, focus rings
- **Keyboard path for the primary task:**
- **Heading structure:**
- **Labels and announcements:**
- **Touch targets:**
- **Reduced motion behavior:**

## Copy

Real, product-specific strings for headings, primary actions, empty states, and errors. Mark anything invented as invented.
