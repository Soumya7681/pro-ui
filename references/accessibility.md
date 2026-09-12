# Accessibility

Part of the design, not a pass afterwards. Retrofitting is more expensive than building it correctly.

Target: WCAG 2.2 AA unless the project states otherwise.

---

## Structure

- semantic elements over styled generic containers: `button`, `a`, `nav`, `main`, `header`, `footer`, `section`, `ul`, `table`, `dialog`
- one `h1` per page; heading levels descend without gaps. Rank is semantic — size is styling
- landmarks so a screen reader can jump: main content, navigation, search, footer
- a skip link to main content when navigation precedes it
- lists are lists, tables are tables with real headers and scopes

## Controls

- **a button does something, a link goes somewhere.** Never a clickable `div`
- icon-only controls carry an accessible name
- toggles, tabs, menus, comboboxes, and dialogs expose their state (pressed, selected, expanded, current)
- custom controls follow the established keyboard pattern for that role — if that is expensive, use a primitives library (`packages.md`)

## Keyboard

- every interactive element is reachable and operable by keyboard
- tab order follows visual order
- **visible focus on every focusable element.** Never remove the focus ring without replacing it with something at least as visible
- focus-visible for keyboard users; do not show rings on mouse click if the project prefers that, but never suppress both
- modals trap focus, close on Escape, and return focus to the trigger
- no keyboard traps anywhere else

## Contrast

| Content | Minimum |
|---|---|
| Body text | 4.5:1 |
| Large text (≥24px, or ≥19px bold) | 3:1 |
| Icons and meaningful graphics | 3:1 |
| Control boundaries, focus indicators | 3:1 against adjacent colors |

Check at token-definition time. Placeholder text, muted text on tinted surfaces, and text over images are the usual failures — text over an image needs a scrim or a guaranteed-safe zone.

**Color is never the only signal.** Pair it with text, icon, shape, or position — for status, validation, chart series, and required fields.

## Forms

- every field has a persistent visible label. Placeholder is not a label
- errors are associated with the field, announced, and stated in text next to it
- required fields marked in text, not by color or an unexplained asterisk alone
- related controls grouped with a group label
- appropriate input types and autocomplete hints
- do not disable submit silently; explain what is missing

## Content

- alt text describes purpose, not appearance. Decorative images get empty alt
- link text makes sense alone — "read the routing guide", not "click here"
- captions and transcripts for media
- dynamic updates announced through a polite live region; never hijack focus for a background update

## Interaction

- touch targets ~44px minimum with spacing between adjacent targets
- do not rely on hover to reveal essential content or actions
- respect reduced motion, and provide a reduced alternative rather than removing meaning (`motion.md`)
- page stays usable at 200% zoom and at 320px effective width with no loss of content or function
- do not suppress zoom

## Quick verification

1. Unplug the mouse. Complete the primary task.
2. Tab through. Is focus always visible and in a sensible order?
3. Zoom to 200%. Does anything break or get clipped?
4. Check contrast on text, icons, and focus rings.
5. Read only the headings. Does the page make sense?
6. Turn on reduced motion. Is everything still understandable?
