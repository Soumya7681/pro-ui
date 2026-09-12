# UI Architect

> A portable UI/UX design skill for AI coding agents — Claude Code, Codex, Cursor, Windsurf, Gemini CLI, Copilot, and anything else that reads project instructions.

Coding agents left alone produce a recognizable interface: purple gradient hero, giant centered heading, three identical feature cards, glass everywhere, everything rounded, lorem-adjacent copy. Competent, symmetrical, and indistinguishable from ten thousand other products.

This skill replaces that default with a design process. When it is active, the agent works as a product designer, UX designer, UI designer, design-system designer, and frontend engineer — thinking about the product before writing code, and reviewing the result before calling it done.

---

## What it enforces

| | |
|---|---|
| **Design before code** | Direction and plan first for anything larger than a local tweak |
| **Product first** | Audience, primary goal, primary action, brand — inferred from the repo or asked in one short batch |
| **Direction with a reason** | One visual language plus at most one supporting technique, chosen from the product, not from what is trending |
| **No vibe-coded UI** | An explicit pattern ban list, a human-design test, and an originality floor |
| **Real copy** | No lorem ipsum, no "Transform your workflow", no fabricated customers or metrics |
| **Images as placeholders plus prompts** | Purpose, aspect ratio, negative space, alt text, and a paste-ready generation prompt |
| **Icons from a library** | Never a hand-written SVG the library already has; never emoji as UI icons |
| **Reuse before building** | Existing component → existing dependency → native capability → mature package → custom |
| **Tokens, not magic numbers** | Color roles, type scale, spacing, radius, elevation, motion, breakpoints |
| **Mobile designed, not shrunk** | Per-section decisions about what stacks, reorders, collapses, scrolls, grows; container queries over viewport guesses |
| **Motion that earns its place** | Six legitimate jobs, tokenized durations and easings, transform-and-opacity performance, reduced motion that replaces meaning instead of deleting it |
| **Accessibility during, not after** | Semantics, keyboard, focus, contrast, labels, touch targets, reduced motion |
| **Done means reviewed** | Builds and renders are not done; a visual and UX review gate is |

Framework-agnostic by design — it inspects the project before recommending anything, and extends an existing design system rather than replacing it.

---

## Install

```bash
git clone <this-repo> ui-architect
cd ui-architect
./install.sh /path/to/your/project            # Claude Code + Codex (default)
./install.sh /path/to/your/project all        # every supported agent
./install.sh /path/to/your/project cursor     # one specific agent
./install.sh . claude-global                  # Claude Code, every project on this machine
```

| Agent | Where it lands | How it activates |
|---|---|---|
| `claude` | `.claude/skills/ui-architect/` | Loads automatically on UI work; `/ui-architect` to invoke by name |
| `claude-global` | `~/.claude/skills/ui-architect/` | Same, available in every project |
| `codex` | `.ui-architect/` + pointer in `AGENTS.md` | Read on UI tasks |
| `cursor` | `.ui-architect/` + `.cursor/rules/ui-architect.mdc` | Rule attaches on UI work |
| `windsurf` | `.ui-architect/` + `.windsurf/rules/ui-architect.md` | Rule attaches on UI work |
| `gemini` | `.ui-architect/` + pointer in `GEMINI.md` | Read on UI tasks |
| `copilot` | `.ui-architect/` + pointer in `.github/copilot-instructions.md` | Read on UI tasks |
| `generic` | `.ui-architect/` only | Point your own agent at `.ui-architect/AGENTS.md` |

Pointer blocks are fenced with `<!-- ui-architect:begin -->` markers and appended once — re-running the installer updates the body without duplicating instructions.

For any agent not listed: copy `AGENTS.md`, `references/`, and `templates/` somewhere in the project and tell the agent to read `AGENTS.md` before UI work. That is the whole integration.

---

## How it is structured

```
SKILL.md        entry point for Claude Code (frontmatter + core rules)
AGENTS.md       entry point for every other agent (same core, no frontmatter)
references/     loaded on demand, only when the task calls for it
templates/      fill-in artifacts the agent produces
install.sh      per-agent installer
```

Both entry points are short on purpose. The depth sits in `references/`, read only when relevant, so a small styling fix does not drag a design-system essay into context.

| Reference | Covers |
|---|---|
| `workflow.md` | The full loop with a gate per step, and how to scale it to request size |
| `product-brief.md` | What to establish, what to infer, what is worth asking, sector conventions |
| `design-directions.md` | 21 directions with fit and failure modes; how to present options; the originality floor |
| `design-system.md` | Color roles, type scale, spacing, radius, elevation, borders, motion, breakpoints, states |
| `anti-ai-patterns.md` | The pattern ban list with reasons and replacements; the human-design test |
| `imagery-and-icons.md` | Icon library rules; placeholders, aspect ratios, generation prompts |
| `content-and-copy.md` | Banned phrases, interface copy rules, voice, designing against real content |
| `responsive.md` | Per-section breakpoint worksheet, container queries, layout patterns, tables and nav on small screens, touch input, verification widths |
| `motion.md` | The six jobs motion may do, duration and easing tokens, choreography, per-component catalog, loading thresholds, performance, reduced-motion mapping |
| `accessibility.md` | Structure, controls, keyboard, contrast, forms, content, quick verification |
| `packages.md` | The build-vs-install ladder, evaluation criteria, category reference, component architecture |
| `audit-and-refactor.md` | Diagnosing an existing interface; fixing in order of impact; scope discipline |
| `review-and-done.md` | The visual and UX review checklist and the definition of done |

| Template | Produced when |
|---|---|
| `design-plan.md` | Before implementing any non-trivial UI |
| `ui-audit.md` | Before changing an interface that already exists |
| `image-prompt.md` | Wherever an image slot needs an asset |

---

## The loop

```
Inspect → Understand → Direct → Plan → Systemize → Implement → Review → Refine
```

Each step has a gate. Inspect ends when the stack and reusable components are known. Understand ends when the primary user goal and primary action can be stated in one sentence each. Direct ends when the direction has a product-specific reason. And so on through a review that happens before completion is claimed.

Small changes skip the ceremony. New screens, redesigns, and "make this modern" do not.

---

## Golden rule

> Build interfaces that look designed by a thoughtful product designer and implemented by a skilled frontend engineer — not generated from a template.

Clarity over decoration. Originality over trend. Usability over effect. Product context over generic pattern.
