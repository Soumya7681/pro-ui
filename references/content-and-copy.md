# Content and Copy

Copy is not filled in after the design. Copy *is* the design — length, specificity, and voice determine layout, hierarchy, and whether the interface communicates anything.

---

## Banned by default

```
Lorem ipsum dolor sit amet
Amazing solutions for your business
Transform your workflow
The future of innovation
Empower your team
Take your X to the next level
Seamlessly integrate everything
Built for the modern web
Unlock the power of...
```

Allowed only when the user explicitly asked for placeholder text.

---

## What to write instead

When real copy is unavailable, write realistic product-specific copy from the requirements. Specific and provisional beats vague and permanent — and it exposes layout problems early, because real strings are uneven.

| Generic | Specific |
|---|---|
| "Transform your workflow" | "Close the month in two days, not two weeks" |
| "Powerful analytics" | "See which shifts cost the most overtime" |
| "Get Started" | "Create your first invoice" |
| "Learn more" | "See how routing works" |
| "Something went wrong" | "We couldn't reach the payment provider. Your card was not charged." |
| "No data" | "No shipments yet. Import a manifest to get started." |

Mark invented facts as invented. Never fabricate customer names, logos, testimonials, metrics, certifications, or awards. If a section needs social proof that does not exist, cut the section or leave a clearly labeled slot.

---

## Interface copy rules

- **Buttons name the outcome.** "Send invoice", not "Submit". "Delete project", not "OK"
- **Labels over placeholders.** Placeholder text disappears on focus and fails accessibility as a label
- **Errors say what happened, why, and what to do next.** No error codes alone, no blame
- **Empty states teach.** What this is, why it is empty, one action to fill it
- **Loading states say what is loading** when it takes more than a moment
- **Confirmations state consequence and scope.** "Delete 14 records permanently?" not "Are you sure?"
- **Headings are scannable.** A reader skimming only the headings should understand the page
- **Sentence case** for interface text unless the brand demands otherwise. It reads faster
- **No exclamation marks** as a substitute for value. No congratulating the user for routine actions
- **Numbers are formatted** for locale, and units are always shown

---

## Voice

Match the sector and audience established in `product-brief.md`. Terse and technical for developer tools. Plain and reassuring for health and finance. Warm for consumer. Neutral and unambiguous for enterprise.

One voice throughout. A playful empty state inside a formal product reads as an accident.

---

## Content shapes the layout

Design against realistic extremes before declaring a layout done:

- the longest plausible name, title, and label
- a translated string 40% longer
- empty, one item, and hundreds of items
- a missing image, a missing avatar, a null value
- the largest number the field can hold

A layout that only works with the copy that was invented for the mockup is not finished.
