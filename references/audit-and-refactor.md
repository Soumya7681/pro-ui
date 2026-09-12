# Audit and Refactor

For "make this modern", "improve this UI", "this looks bad", and every redesign of something that already exists.

---

## Superficial changes are not a redesign

If the response to "make this modern" is: new accent color, bigger radius, a gradient, new shadows, a new font — the work has not been done. Those change the skin and leave every real problem intact.

Diagnose first. Then fix what is actually wrong, in this order of impact:

```
1. Information architecture   what is here, how it is grouped, what does not belong
2. Layout and composition     structure, rhythm, alignment, density
3. Visual hierarchy           what wins attention, and does it deserve to
4. Navigation                 can users find and return
5. Typography                 scale, contrast, measure, weight
6. Spacing                    consistency and grouping
7. Components                 consistency, states, variant sprawl
8. Color and surfaces         roles, contrast, meaning
9. Imagery                    purpose, quality, placement
10. Interaction and motion    feedback, transitions, error and empty states
11. Responsive                mobile as a designed experience
12. Accessibility             throughout
```

Most interfaces that "look bad" have a hierarchy and spacing problem, not a color problem.

---

## Audit first

Run the audit and present it before changing code. Template: `../templates/ui-audit.md`.

Keep it short and specific. Every problem names a location and a consequence:

> *Dashboard header — four equally-weighted actions, none primary. Users cannot tell which one starts the main task.*

not

> *Header could be improved.*

---

## Scope discipline

- do not rewrite an entire interface when focused changes reach the goal
- preserve working functionality and existing behavior exactly
- keep the project's conventions, even ones you would not choose
- no unrelated refactoring bundled into a design change
- when the redesign is large, stage it: tokens first, then shared components, then screens — so the product stays shippable throughout

## Removal is part of the work

Redesign deletes. Look for: duplicate components doing the same job, dead styles, one-off overrides, unused dependencies, decorative elements with no purpose, sections nobody uses, states that never occur.

A redesign that only adds is usually just a reskin.

## Result standard

After the work, the improvement must be **structural and visible**, not cosmetic: a clearer primary action, a real hierarchy, consistent components, a mobile layout that was designed, states that exist, and an identity that belongs to this product.

If a stakeholder cannot name three concrete things that got better, the redesign failed.
