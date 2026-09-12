# Packages and Component Decisions

The most common failure after bad visual design: reimplementing something the project already has, or installing something the project did not need.

---

## Decision ladder

```
Existing project component?        → reuse or extend it
        ↓ no
Existing installed dependency?     → adapt it
        ↓ no
Simple enough for the platform?    → native / CSS / framework capability
        ↓ no
Mature package fits?               → recommend, install only when justified
        ↓ no
                                    build a reusable custom component
```

Walk it top to bottom every time. Stop at the first yes.

---

## Before recommending any package

- inspect the dependency manifest — is there already an equivalent?
- framework and version compatibility
- typing support when the project is typed
- accessibility support — a component library that fails keyboard support is a liability, not a shortcut
- maintenance signals: recent releases, open critical issues, active maintainers
- runtime and bundle cost relative to the value
- license compatibility
- how much customization the design direction requires — a heavily-themed library often costs more than building
- whether the feature is simple enough to not need it at all

Never install because a package is popular. Never add a second library in a category the project already covers.

## Proportionality

| Need | Right answer |
|---|---|
| Hover transition, simple reveal | Native CSS |
| Modal, dropdown, tooltip, tabs | Existing primitives library if present; otherwise a headless primitives package — these are accessibility-hard |
| Sortable, filterable, paginated, virtualized table | Mature table library. Hand-rolling this is a multi-week trap |
| Form with validation | Project's existing form approach; a form library only past real complexity |
| One chart | Consider hand-built SVG or a light library |
| A charting surface across the product | A real charting library |
| Date picker | Library. Time zones, locales, and keyboard support are worse than they look |
| Complex gesture, scroll, or layout animation | Established animation library |
| Icon | The icon library (`imagery-and-icons.md`) |
| Toast, command palette, drag and drop, rich text | Library — each is deceptively deep |

## Recommendation format

```
Package:            <name>
Use it for:         <specific capability>
Why:                <technical or design reason>
Why not custom:     <maintenance / accessibility / edge-case cost>
Project fit:        <how it sits with the existing stack>
Cost:               <bundle / runtime / API surface>
```

Present this before installing. If the project already covers the category, do not present it at all.

---

## Category reference

Examples, not prescriptions. Choose by detected stack and existing conventions.

| Category | Examples |
|---|---|
| UI primitives / headless | Radix UI, Headless UI, Ark, Base UI |
| Component libraries | shadcn/ui, MUI, Mantine, Chakra, Ant Design |
| Icons | Lucide, Heroicons, Phosphor, Tabler, Radix Icons |
| Animation | Motion, GSAP, AutoAnimate |
| Tables | TanStack Table |
| Forms / validation | React Hook Form, Zod, Valibot |
| Charts | Recharts, Nivo, ECharts, Chart.js, Visx |
| Carousel | Embla, Swiper |
| Drag and drop | dnd-kit |
| Command palette | cmdk |
| Notifications | Sonner, React Hot Toast |
| Rich text | Tiptap, Lexical, ProseMirror |
| Dates | date-fns, Day.js, Temporal polyfill, React Day Picker |

Non-React stacks have their own equivalents; find the project's ecosystem standard rather than porting a React answer.

---

## Component architecture

Create a component when it earns **reusability, maintainability, consistency, or readability**. Markup existing is not a reason.

Prefer one component with variants over a family of adjectives:

```
Card variant="product" | "featured" | "compact"

not:  ModernCard  BeautifulCard  PremiumCard  FancyCard
```

Organize by role, following whatever the project already does:

```
ui/          primitives: button, input, dialog
layout/      shells, grids, containers
navigation/  nav, breadcrumbs, tabs
forms/       composed fields and form patterns
feedback/    toast, empty state, error state, skeleton
<domain>/    product-specific components
sections/    page composition blocks
```

Avoid: a wrapper component that only adds a class, a component used once with ten props, an abstraction invented before the second use case exists.

---

## Reference-based design

When the user supplies a reference site, screenshot, or design: extract principles, do not clone.

Analyze composition, hierarchy, type system, spacing rhythm, color relationships, surface treatment, interaction patterns, information density. Then translate those principles into this product's content and constraints.

Never copy another brand's identity, assets, or copy.
