# UI Architect

> A portable UI/UX design skill for AI coding agents — Claude Code, Codex, Antigravity, Cursor, Windsurf, Gemini CLI, Copilot, and anything else that reads project instructions.

**Repository:** https://github.com/shree2698/pro-ui

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
git clone https://github.com/shree2698/pro-ui.git ui-architect
cd ui-architect
./install.sh /path/to/your/project            # Claude Code + Codex (default)
./install.sh /path/to/your/project all        # every supported agent
./install.sh /path/to/your/project antigravity cursor
./install.sh . claude-global                  # Claude Code, every project on this machine
```

The skill body is copied once to `.ui-architect/` in the target project. Every agent
gets a small pointer file that tells it to read `.ui-architect/AGENTS.md` on UI work,
so there is one copy of the content no matter how many agents are installed. Claude Code
is the exception: it uses its own skills directory, where `SKILL.md` loads natively.

Pointer blocks are fenced with `<!-- ui-architect:begin -->` markers and written once.
Re-running the installer refreshes the body without duplicating instructions.

| Agent | Installs to | Activation |
|---|---|---|
| `claude` | `.claude/skills/ui-architect/` | Loads automatically on UI work; `/ui-architect` invokes it by name |
| `claude-global` | `~/.claude/skills/ui-architect/` | Same, available in every project on the machine |
| `codex` | `.ui-architect/` + pointer in `AGENTS.md` | Read at the start of UI tasks |
| `antigravity` | `.ui-architect/` + pointer in `AGENTS.md` and `.agents/rules/ui-architect.md` | Workspace rule, applied on UI work |
| `cursor` | `.ui-architect/` + `.cursor/rules/ui-architect.mdc` | Rule attaches on UI work |
| `windsurf` | `.ui-architect/` + `.windsurf/rules/ui-architect.md` | Rule attaches on UI work |
| `gemini` | `.ui-architect/` + pointer in `GEMINI.md` | Read at the start of UI tasks |
| `copilot` | `.ui-architect/` + pointer in `.github/copilot-instructions.md` | Read at the start of UI tasks |
| `generic` | `.ui-architect/` only | Point your own agent at `.ui-architect/AGENTS.md` |

---

### Claude Code

```bash
./install.sh /path/to/your/project claude     # this project only
./install.sh . claude-global                  # every project on this machine
```

Lands in `.claude/skills/ui-architect/` (or `~/.claude/skills/ui-architect/`) with `SKILL.md`,
`references/`, and `templates/`. Claude Code reads the frontmatter description and loads the
skill on its own when a task touches UI. Invoke it explicitly with `/ui-architect`.

Manual equivalent:

```bash
mkdir -p .claude/skills/ui-architect
cp SKILL.md .claude/skills/ui-architect/
cp -r references templates .claude/skills/ui-architect/
```

### Codex

```bash
./install.sh /path/to/your/project codex
```

Copies the body to `.ui-architect/` and appends a pointer block to the project's root
`AGENTS.md`, creating it if absent. Codex reads `AGENTS.md` at the start of a session, sees
the pointer, and loads `.ui-architect/AGENTS.md` when the work is UI work.

Manual equivalent: copy `AGENTS.md`, `references/`, and `templates/` into `.ui-architect/`,
then add to your root `AGENTS.md`:

```markdown
## UI / UX work

Before any task that touches UI, UX, layout, visual design, styling, components,
responsive behavior, or a redesign, read `.ui-architect/AGENTS.md` and follow it.
```

### Antigravity

```bash
./install.sh /path/to/your/project antigravity
```

Writes both entry points Antigravity reads: a pointer in the root `AGENTS.md`, which is the
cross-tool foundation, and a workspace rule at `.agents/rules/ui-architect.md`. Older
Antigravity builds read `.agent/rules/` instead; copy the same file there if yours does.

For a machine-wide install, add the pointer block to `~/.gemini/GEMINI.md`. Note the
precedence: `GEMINI.md` overrides `AGENTS.md`, and `.agents/rules/` files apply last.

### Cursor

```bash
./install.sh /path/to/your/project cursor
```

Writes `.cursor/rules/ui-architect.mdc` with `alwaysApply: false` and a description scoped to
UI work, so the rule attaches when the task is relevant instead of sitting in every context.

### Windsurf

```bash
./install.sh /path/to/your/project windsurf
```

Writes `.windsurf/rules/ui-architect.md`.

### Gemini CLI

```bash
./install.sh /path/to/your/project gemini
```

Appends the pointer to the project's `GEMINI.md`. For every project on the machine, add the
same block to `~/.gemini/GEMINI.md`.

### GitHub Copilot

```bash
./install.sh /path/to/your/project copilot
```

Appends the pointer to `.github/copilot-instructions.md`.

### Any other agent

```bash
./install.sh /path/to/your/project generic
```

Copies `AGENTS.md`, `references/`, and `templates/` to `.ui-architect/` and stops. Point your
agent at `.ui-architect/AGENTS.md` however it takes standing instructions: an instructions
file, a rules directory, a system prompt, or a memory entry. Any agent that reads `AGENTS.md`
at the repository root works with the `codex` target as-is.

That is the whole integration. There is no runtime, no dependency, and nothing to build.

### Uninstall

```bash
rm -rf .ui-architect .claude/skills/ui-architect .cursor/rules/ui-architect.mdc \
       .windsurf/rules/ui-architect.md .agents/rules/ui-architect.md
```

Then delete the block between the `<!-- ui-architect:begin -->` and `<!-- ui-architect:end -->`
markers from any instruction file it was appended to.

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
