# Review and Definition of Done

Building is not finishing. Run this before reporting completion.

---

## Visual and UX review

Look at the rendered result, at real widths, with real content.

### Hierarchy
- Is the most important content visible immediately, without scrolling?
- Is the primary action obvious within seconds?
- Does the screen have one clear focal point, not four competing ones?
- Does the visual weight of each element match its actual importance?

### Layout
- Is everything aligned to the grid or to a deliberate exception?
- Is spacing consistent and from the scale?
- Is the composition balanced, and does it have a reading axis?
- Do related items group and unrelated items separate?

### Typography
- Are headings legible and clearly ranked?
- Is body text comfortable — size, line height, measure?
- Is the hierarchy readable from a squint, with no text in focus?
- Do long strings, long words, and translated text survive?

### Color and surfaces
- Are color roles used for their meaning?
- Does contrast pass on text, icons, and focus rings?
- Does dark mode hold, if the product has one?

### Components
- Is each component consistent with its siblings?
- Are all states implemented: hover, focus-visible, active, disabled, loading, empty, error, success?
- Does the empty state teach, and does the error state say what to do?

### Responsive
- Does mobile look designed, not compressed?
- Any horizontal overflow at any width?
- Are touch targets large enough and well separated?
- Do tables, modals, and navigation have real mobile treatments?
- Does it hold at 200% zoom?

### Interaction
- Does every action give immediate feedback?
- Are destructive actions confirmed with consequence stated?
- Is motion purposeful, and does reduced motion work?
- Is there a loading treatment for anything that waits?

### UX
- Can a first-time user tell what to do?
- Is navigation predictable and is there always a way back?
- Are errors preventable, and recoverable when they happen?
- Is cognitive load reasonable — is anything asking for more than it needs?

### Visual identity
- Does this feel specific to this product?
- Does it pass the human-design test in `anti-ai-patterns.md`?
- Are there at least two decisions no competitor would share?
- Would a stranger recognize the product from a screenshot?

### Engineering
- Tokens used, no magic values?
- Existing components reused, no duplicate abstraction added?
- No unrelated refactoring, existing behavior preserved?
- Dead code, unused styles, and unused dependencies removed?

---

## Definition of done

Not done because it builds. Not done because it renders. Not done because the components work.

Done when **all** hold:

```
[ ] UX is clear — primary action and next step are obvious
[ ] Visual hierarchy is strong
[ ] Design direction is applied consistently across every screen touched
[ ] Components are coherent and states are implemented
[ ] Responsive behavior is designed at every breakpoint
[ ] Accessibility is verified, not assumed
[ ] Interaction states exist: hover, focus, active, disabled, loading, empty, error, success
[ ] Imagery is intentional, with placeholders and prompts where assets are missing
[ ] Icons come from one library, used semantically
[ ] Copy is real and product-specific
[ ] Tokens are used throughout
[ ] The interface does not look AI-generated
[ ] The review above was run and its findings addressed
```

---

## Reporting

State what was built, what the review found, and what was left undone and why. If something was skipped — a state not implemented, a breakpoint not verified, an asset still a placeholder — say so plainly. Silence on a gap reads as completion.
