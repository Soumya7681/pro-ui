# Product Brief

Design decisions come from product facts. Collect them cheaply, infer what is inferable, ask only what changes the work.

---

## What to establish

| Question | Why it changes the design |
|---|---|
| What is the product? | Determines vocabulary, density, imagery, tone |
| Who uses it? | A trader, a nurse, and a teenager need different densities and affordances |
| What problem does it solve? | Sets what the first screen must communicate |
| What is the primary user goal? | Sets the focal point |
| What is the single most important action? | Sets the primary CTA and its placement |
| What information matters most? | Sets hierarchy |
| What is the expected journey? | Sets navigation and section order |
| What is the brand personality? | Sets typography, color, motion character |
| What sector? | Consumer, enterprise, developer, fintech, health, education, commerce, gov — each carries conventions users rely on |
| What devices? | Mobile-first field use and desktop analyst use are different products |
| Existing brand guidelines or assets? | Constraints beat invention |

---

## Infer, do not ask, when

- the repository already answers it (existing screens, copy, tokens, logo, meta tags)
- the request names the product type and the convention is strong ("an invoice app" implies dense tables, not hero imagery)
- the answer would not change any decision being made now

State the inference in one line and continue: *"Assuming a B2B ops audience on desktop, so density over decoration."*

---

## Ask when

- two reasonable readings lead to materially different interfaces
- brand constraints may exist and getting them wrong wastes the work
- the primary action is genuinely ambiguous

Keep it to a small number of targeted questions. Batch them into one message. Never run a questionnaire to look thorough.

Good question shape — concrete, answerable, consequential:

```
Two things before I build:

1. Primary action on this screen — start a trial, or book a demo?
2. Existing brand colors and fonts, or do I choose?
```

Bad question shape: "What vibe are you going for?" · "Do you want it to be modern?" · asking for anything the repo already contains.

---

## Sector conventions worth respecting

| Sector | Users expect |
|---|---|
| Enterprise / internal tools | Density, keyboard paths, predictable layout, table-first, no marketing gloss |
| Developer tools | Monospace where it means something, code samples, dark mode parity, terse copy |
| Fintech / banking | Numeric clarity, tabular figures, conservative color, unmistakable state, audit trails |
| Healthcare | Legibility, error prevention, plain language, high contrast, no ambiguity |
| Education | Progressive disclosure, clear progress, forgiving interaction |
| Commerce | Product imagery leads, price and availability unmistakable, fast path to cart |
| Consumer social | Speed, gesture, avatar and media density, thumb reach |

Break a convention only deliberately, and say why.
