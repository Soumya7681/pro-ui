# Anti-AI Patterns

The failure mode this skill exists to prevent: an interface that is competent, symmetrical, glossy, and indistinguishable from ten thousand others.

Read this before finalizing any visual design.

---

## The pattern list

Each is banned as a *default*. Each is allowed when there is a stated product reason.

| Pattern | Why it fails | Instead |
|---|---|---|
| Purple-to-blue gradient as brand | Belongs to no product; signals "generated" instantly | Derive color from the actual brand, product, or domain |
| Gradient hero with giant centered heading | Zero information, maximum height, no hierarchy | Lead with the actual value proposition and a real interface or artifact |
| Floating blobs / abstract shapes | Decoration standing in for content | Real imagery, real data, real product UI, or nothing |
| Glow and neon halos | Attention without meaning | Contrast and position carry emphasis |
| Glass everywhere | Layering with nothing to layer over; kills contrast | Glass only over actual imagery or depth |
| Everything rounded to the same large radius | Erases hierarchy; every element reads the same weight | A radius system with intent (`design-system.md`) |
| Every section is a card | Cards become the page instead of grouping content | Cards for genuinely discrete, repeated objects only |
| Repetitive 3-column feature grid | Three features, equal weight, no priority — a lie about the product | Rank features; give the important one more space |
| Stacked drop shadows | Fake depth with no light source | One elevation scale, used sparingly |
| "AI Powered" / "Next-Gen" badges | Says nothing; dates instantly | Say what it does |
| Fake "Trusted by" logo rows | Fabricated social proof | Real customers, or cut the section |
| Invented statistics ("10x faster", "99.9%") | Fabricated claims | Real numbers, or qualitative specifics |
| Sparkle icons as decoration | Meaningless glyph noise | Icons that label real actions |
| Entrance animation on every element | Delays content; motion sickness; nothing is emphasized | Motion where it explains a change |
| Constant floating / pulsing loops | Permanent distraction | Static, unless movement carries meaning |
| Generic SaaS section order transplanted onto an unrelated product | Structure unrelated to this product's story | Section order from the actual user journey |
| Whitespace without hierarchy | Airy but unreadable; nothing dominates | Space that groups and ranks |
| Identical icon-title-text triplets down the page | Templated rhythm | Vary composition where content differs |
| Emoji as UI icons | Inconsistent rendering, unprofessional, not accessible | Icon library (`imagery-and-icons.md`) |
| Lorem ipsum or "Transform your workflow" | Design built on nothing | Real product copy (`content-and-copy.md`) |
| Centered everything | No reading axis, no tension | Deliberate alignment; asymmetry where it helps |
| Dark hero, light body, dark footer for no reason | Banded structure copied from templates | Structure from content |

---

## The human-design test

Run every question. Any "yes" in the wrong direction is a fix, not a note.

1. **Does it look like a template?** → Change composition, hierarchy, or type — not just color.
2. **Could this belong to hundreds of unrelated products?** → Add product-specific decisions.
3. **Are decorative effects louder than the content?** → Remove effects until content wins.
4. **Are all the cards identical?** → Rank them, or stop using cards.
5. **Is everything rounded?** → Rebuild the radius system.
6. **Is it purple/blue with a gradient?** → Rebuild the palette from the product.
7. **Does every element animate?** → Cut motion to what explains change.
8. **Does every section have the same structure?** → Vary deliberately.
9. **Would removing this element hurt?** → If no, remove it.
10. **Can a stranger tell what the product does in five seconds?** → If no, the design is failing its first job.

---

## The originality floor

Every interface needs at least **two decisions no competitor's site would share**. Usually one structural and one expressive:

- a layout shaped by the actual workflow or data, not by a grid preset
- a color taken from the physical product, material, domain, or existing brand
- a type pairing with a reason from the sector's own visual history
- a signature component that only this product needs
- a density chosen for how these users actually work
- a real artifact — screenshot, chart, map, document, photograph — instead of decoration

Without those, the direction is a costume.

---

## Self-check before shipping

Ask: *if this screenshot appeared in a feed with no caption, would anyone guess which product it belongs to?* If not, go back to the originality floor.
