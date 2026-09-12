# Motion

Motion is an interface material, not decoration. It costs attention, battery, and comprehension when misused.

**A motion is justified only if removing it would make something harder to understand.** If nothing is lost, remove it.

---

## The six legitimate jobs

| Job | What it does | Example |
|---|---|---|
| **Feedback** | Confirms input was received | Press state, toggle flip, button spinner |
| **Continuity** | Preserves object identity across a change | A list item expanding into a detail view |
| **Hierarchy / spatial** | Shows where something came from and where it lives | Menu scaling from its trigger, drawer from its edge |
| **Progress** | Communicates that time is passing and how much | Skeletons, determinate bars, step transitions |
| **Attention** | Directs the eye to a genuine change | A row that just updated, a validation error appearing |
| **Brand** | Carries personality in a moment that already needed motion | The character of an easing curve, one signature transition |

Brand is last and rides along with the others. It never justifies motion on its own.

---

## Tokens

Define once, in the design system, and use everywhere.

```
duration-instant   80–120ms    press feedback, color change
duration-fast      140–180ms   hover, small toggles, tooltips
duration-base      200–260ms   dropdowns, tabs, accordions, small dialogs
duration-slow      280–400ms   modals, drawers, large layout change, page transitions
```

```
ease-out           entering elements, most UI motion
ease-in            exiting elements, and faster than the enter
ease-in-out        elements that move within the view and stay
spring / emphasized  direct-manipulation gestures and large expressive movement
linear             only for continuous indeterminate motion: spinners, marquees
```

Rules of thumb:

- exit is faster than enter. Nobody wants to wait to dismiss something
- larger distance and larger surface get longer durations. A tooltip at 300ms feels broken; a full-screen sheet at 120ms feels like a glitch
- anything over ~400ms on a routine interaction reads as lag, not polish
- ease-out for almost everything. Linear on UI movement looks mechanical

---

## Choreography

- one thing leads. If three elements animate at once, either they are one group moving together, or the design has no focal point
- stagger sparingly: 20 to 40ms between items, capped at roughly five items. Longer chains turn into a wait
- animate **from the origin**: a menu grows from its trigger, a sheet slides from the edge it lives on, a detail view expands from the row that opened it
- keep the transform origin and the movement direction consistent across the product. Inconsistent direction destroys the spatial model
- continuity beats fade. When the same object exists before and after, move it; do not cross-fade one into the other
- when a shared-element transition is not feasible, a short cross-fade with a small positional shift is the honest fallback

---

## Per-component catalog

| Interaction | Treatment |
|---|---|
| Hover | Color, elevation, or 1 to 2px movement at fast duration. Not scale on large surfaces |
| Press | Instant, slightly inset or dimmed. Never delayed |
| Focus | Instant. A focus ring must never animate in — it must be there the moment focus lands |
| Toggle / switch | Knob travel plus track color, fast, with a distinct disabled treatment |
| Accordion / expand | Height and opacity together at base duration; content does not fade in after the box opens |
| Dropdown / popover | Scale from 0.96 plus fade, base duration, origin at the trigger |
| Tooltip | Fade only, fast, after a short open delay and with no delay on close |
| Modal | Backdrop fade plus content scale or rise at slow duration; exit at base |
| Drawer / sheet | Slide from its own edge, slow; drag-to-dismiss follows the finger 1:1 |
| Tabs | Indicator slides between tabs; panel content cross-fades quickly |
| Route change | Short directional transition matching navigation direction; back reverses it |
| List insert / remove | Neighbors move to their new positions so the user can track the change |
| Reorder / drag | Item follows the pointer exactly; others shift with a base-duration transition |
| Toast | Enter from a consistent edge, auto-dismiss with a visible timer or a pause on hover |
| Validation error | Appear without shifting the layout. No shake unless the product's voice earns it |
| Number / value change | Brief highlight of the changed value, not a counting animation, unless the count is the point |

---

## Loading and waiting

Match the treatment to the wait:

| Wait | Treatment |
|---|---|
| Under ~100ms | Nothing. A spinner that flashes is worse than no spinner |
| 100ms to 1s | Inline indicator on the control that was activated |
| 1s to 10s | Skeleton matching the final layout, or a determinate progress bar |
| Over 10s | Determinate progress, a step description, and a way to cancel or leave |

- skeletons mirror the real layout so nothing shifts when content lands. A skeleton that does not match is a second layout shift
- keep skeleton shimmer subtle, or use a static tint. Aggressive shimmer across a full page is visual noise
- optimistic updates respond immediately and reconcile on completion, with a clear, non-destructive rollback if the request fails
- never let a spinner replace content that is already on screen. Update in place

---

## Scroll

- scroll-driven progress indicators and sticky transitions are fine. Content that animates in on every scroll is not
- if content animates on entry, it must be visible without JavaScript and without the animation. Never gate content on an intersection observer firing
- parallax at most as a subtle depth cue on one element. Multi-layer parallax is a motion-sickness trigger and a performance cost
- no scroll hijacking. The user owns the scroll
- honor native smooth-scroll preferences instead of forcing a custom implementation

---

## Performance

- animate **transform and opacity**. Both run on the compositor. Animating width, height, top, left, or margin forces layout on every frame
- when a size change is required, prefer a transform-based technique or accept the cost knowingly on a small element
- budget: 60fps, roughly 16ms per frame. Verify on a mid-range device, not a development laptop
- `will-change` only immediately around the animation, on a small number of elements. Left on permanently, it wastes memory and can make things worse
- avoid animating many elements at once on long lists; virtualize or cap the animated set
- no infinite animations off-screen. Pause when not visible
- prefer the platform's own transition primitives before adding an animation library (`packages.md`)

---

## Accessibility

Reduced motion is a **replacement**, not a deletion. The information the motion carried must still arrive.

| Full motion | Reduced motion |
|---|---|
| Slide-in drawer | Instant appearance, or opacity only |
| Expanding detail view | Instant expand; keep the focus move |
| Parallax and scroll effects | Off entirely |
| Auto-advancing carousel | Stops; manual controls remain |
| Attention pulse | Static highlight or a border change |
| Page transition | Instant, with focus moved to the new heading |
| Spinner | Keep it, but reduce or stop rotation; keep the text label |

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

That blanket rule is a floor, not a strategy. Where motion carried meaning, provide the reduced alternative explicitly. Express the equivalent in whatever the project's platform offers.

Also:

- motion is never the only channel carrying meaning. Pair it with text, state, or position
- nothing flashes more than three times per second
- anything moving or auto-updating for more than five seconds needs pause, stop, or hide controls
- motion must not steal focus or move focus unexpectedly

---

## Anti-patterns

- entrance animation on every element as the page scrolls
- perpetual floating, bobbing, pulsing, or breathing elements
- bouncy overshoot in a professional or high-trust product
- animating a change the user did not cause
- decorative background loops, animated gradients, particle fields
- staggered chains longer than about five items
- transitions on elements that update frequently — the interface never settles
- carousels that auto-advance with no pause
- loading animations longer than the load
- motion that delays the user reaching content

---

## Checklist

1. Every animation maps to one of the six jobs.
2. Durations and easings come from tokens, not per-component guesses.
3. Exits are faster than enters.
4. Movement originates where the user acted.
5. Only transform and opacity animate in hot paths.
6. Reduced motion has an explicit alternative, not just removal.
7. Nothing animates that the user did not trigger, except state they need to notice.
8. Verified on a mid-range device, not only on a fast one.
