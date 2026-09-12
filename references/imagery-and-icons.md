# Imagery and Icons

---

## Icons

**Use the project's existing icon library.** Check the dependency manifest before anything else.

If none exists, pick one and use only it: Lucide · Heroicons · Phosphor · Tabler · Radix Icons.

### Rules

- **Never hand-write an SVG for an icon the library already has.** Import it
- **Never use emoji as UI icons.** They render differently per platform, ignore theme, carry unwanted tone, and announce badly to screen readers
- one library per project. Mixed icon sets are visible instantly — different stroke weights, different grids
- consistent semantics: one concept, one icon, everywhere. Trash means delete everywhere or nowhere
- consistent size tokens, aligned optically to adjacent text (`design-system.md`)
- icons inherit color from context; do not hardcode a color per icon
- an icon-only control needs an accessible name and, on desktop, a tooltip
- purely decorative icons are marked hidden from assistive technology
- no icon soup: an icon beside every list item, heading, and label is noise. Icons mark *actions* and *status*

Custom SVG is justified only for: the product's own logo or mark, a domain-specific glyph no library carries, or an illustration that is genuinely part of the design.

---

## Images

Never invent an image, hotlink one, or embed an arbitrary asset. Mark the slot, state its purpose, and supply a generation prompt.

### Placeholder

Component form, when the project has or warrants one:

```tsx
<ImagePlaceholder
  aspectRatio="16/9"
  purpose="Hero — technician operating line equipment"
/>
```

Markup-free form, for any stack:

```
[IMAGE PLACEHOLDER]
Purpose:       Hero background, modern industrial workforce
Aspect ratio:  16:9
Negative space: left third, for headline and CTA
```

The placeholder must reserve the real aspect ratio so layout does not shift when the asset lands.

### Every placeholder ships with a prompt

Template: `../templates/image-prompt.md`. A usable prompt specifies:

subject · composition · environment · lighting · camera or visual style · mood · color direction · aspect ratio · required negative space · elements that must not appear

```
Image Generation Prompt

Wide cinematic photograph of a modern industrial workforce on a clean
assembly floor: two technicians in safety gear reviewing a tablet beside
automated equipment. Natural side light from high windows, soft falloff.
Shot at 35mm, shallow depth of field, subject sharp, background softly
blurred. Realistic commercial photography, not stock-posed. Muted steel
and concrete palette with a single warm safety-orange accent. Composed
with the subjects on the right third and clear negative space across the
left third for headline and CTA text. 16:9.

Must not appear: logos, readable text, faces looking at camera, lens
flare, HDR over-processing, generic smiling stock poses.
```

### Rules

- images serve UX or storytelling. Never fill space with an image
- one hero image with a job beats four decorative ones
- specify the aspect ratio and hold it responsively; art-direct the crop per breakpoint when the subject demands it
- every content image gets real alt text; decorative images are marked as decorative (`accessibility.md`)
- define loading behavior: dimensions reserved, lazy below the fold, priority for the hero
- state the format expectation (modern format with fallback) so the slot is production-ready
- when real assets already exist in the project, use them instead of a placeholder

### Illustration and graphics

Prefer real artifacts — product screenshots, charts from real data, maps, documents — over abstract illustration. Abstract illustration is the default when there is nothing to show, and it usually means the section has nothing to say.
