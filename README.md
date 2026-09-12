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
npx soureeui init --ai cursor
```

That is the whole installation. No clone, no dependency, nothing to build.

```bash
npx soureeui init --ai claude,codex     # several at once
npx soureeui init --ai all              # every supported agent
npx soureeui init --ai claude --global  # every project on this machine
npx soureeui init                       # detects what the project uses, or asks
```

Install it permanently if you set up projects often:

```bash
npm install -g soureeui
soureeui init --ai antigravity
```

### Commands

| Command | Does |
|---|---|
| `soureeui init --ai <agents>` | Install the skill for one or more agents |
| `soureeui init` | Detect the agents the project already uses, or ask |
| `soureeui update` | Refresh an existing install to the current version |
| `soureeui doctor` | Show what is installed and where |
| `soureeui remove [--ai <agents>]` | Uninstall, cleaning pointer blocks out of instruction files |
| `soureeui list` | List supported agents |

### Options

| Flag | Does |
|---|---|
| `-a, --ai <list>` | Agents, comma separated, or `all` |
| `-d, --dir <path>` | Target project, default the current directory |
| `-g, --global` | Machine-wide, where the agent supports it |
| `-n, --dry-run` | Print what would change, write nothing |
| `-f, --force` | Overwrite existing rule files |
| `-y, --yes` | No prompts |

### Where it lands

The skill body is copied once to `.soureeui/`. Each agent gets a small pointer file
telling it to read `.soureeui/AGENTS.md` on UI work, so there is one copy of the content
no matter how many agents you install. Claude Code is the exception: it uses its own skills
directory, where `SKILL.md` loads natively.

| `--ai` | Installs to | Activation |
|---|---|---|
| `claude` | `.claude/skills/soureeui/` | Loads automatically on UI work; `/soureeui` invokes it by name |
| `codex` | `.soureeui/` + pointer in `AGENTS.md` | Read at the start of UI tasks |
| `antigravity` | `.soureeui/` + pointer in `AGENTS.md` + `.agents/rules/soureeui.md` | Workspace rule, applied on UI work |
| `cursor` | `.soureeui/` + `.cursor/rules/soureeui.mdc` | Rule attaches on UI work |
| `windsurf` | `.soureeui/` + `.windsurf/rules/soureeui.md` | Rule attaches on UI work |
| `gemini` | `.soureeui/` + pointer in `GEMINI.md` | Read at the start of UI tasks |
| `copilot` | `.soureeui/` + pointer in `.github/copilot-instructions.md` | Read at the start of UI tasks |
| `generic` | `.soureeui/` only | Point your own agent at `.soureeui/AGENTS.md` |

Pointer blocks are fenced with `<!-- soureeui:begin -->` markers and written once.
Re-running is safe: `soureeui update` refreshes the body and the pointer in place, and
`soureeui remove` takes the block back out without touching the rest of your instruction file.

With `--global`, Claude Code installs to `~/.claude/skills/soureeui/`, and Antigravity
and Gemini CLI write their pointer to `~/.gemini/GEMINI.md`.

---

### Agent notes

**Claude Code** — `soureeui init --ai claude`. Reads the frontmatter description and loads the
skill by itself when a task touches UI. `/soureeui` invokes it by name.

**Codex** — `soureeui init --ai codex`. Appends the pointer to the project's root `AGENTS.md`,
creating it if absent.

**Antigravity** — `soureeui init --ai antigravity`. Writes both entry points Antigravity reads:
the cross-tool `AGENTS.md` and a workspace rule at `.agents/rules/soureeui.md`. Older
builds read `.agent/rules/` instead; copy the same file there if yours does. Precedence runs
`GEMINI.md`, then `AGENTS.md`, then `.agents/rules/`, so a global install with `--global`
lands in `~/.gemini/GEMINI.md` and wins over the project file.

**Cursor** — `soureeui init --ai cursor`. Writes `.cursor/rules/soureeui.mdc` with
`alwaysApply: false` and a UI-scoped description, so the rule attaches when it is relevant
instead of sitting in every context.

**Windsurf** — `soureeui init --ai windsurf`. Writes `.windsurf/rules/soureeui.md`.

**Gemini CLI** — `soureeui init --ai gemini`, or add `--global` for `~/.gemini/GEMINI.md`.

**GitHub Copilot** — `soureeui init --ai copilot`. Appends to `.github/copilot-instructions.md`.

**Anything else** — `soureeui init --ai generic` copies the body and stops. Point your agent at
`.soureeui/AGENTS.md` however it takes standing instructions: an instructions file, a
rules directory, a system prompt, or a memory entry. Any agent that reads a root `AGENTS.md`
works with `--ai codex` as-is.

### Without the CLI

Clone the repository and copy the files by hand. For Claude Code:

```bash
git clone https://github.com/shree2698/pro-ui.git
mkdir -p .claude/skills/soureeui
cp pro-ui/SKILL.md .claude/skills/soureeui/
cp -r pro-ui/references pro-ui/templates .claude/skills/soureeui/
```

For any other agent, copy `AGENTS.md`, `references/`, and `templates/` into `.soureeui/`
and add this to whatever instruction file your agent reads:

```markdown
## UI / UX work

Before any task that touches UI, UX, layout, visual design, styling, components,
responsive behavior, or a redesign, read `.soureeui/AGENTS.md` and follow it.
```

---

## How it is structured

```
SKILL.md        entry point for Claude Code (frontmatter + core rules)
AGENTS.md       entry point for every other agent (same core, no frontmatter)
references/     loaded on demand, only when the task calls for it
templates/      fill-in artifacts the agent produces
bin/soureeui.js    the CLI, zero dependencies, Node 18+
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
