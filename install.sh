#!/usr/bin/env bash
# Install the UI Architect skill into a project for one or more AI coding agents.
#
#   ./install.sh <target-dir> [agent ...]
#
# Agents: claude | claude-global | codex | antigravity | cursor | windsurf | gemini |
#         copilot | generic | all
# Default: claude codex
#
# The skill body is copied to <target>/.ui-architect/ (except for claude, which
# uses the native skills directory). Agent entrypoints are pointer files, so a
# single copy of the content serves every agent.

set -euo pipefail

SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MARK_BEGIN="<!-- ui-architect:begin -->"
MARK_END="<!-- ui-architect:end -->"

usage() { sed -n '2,15p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//'; exit "${1:-0}"; }

[ $# -ge 1 ] || usage 1
case "$1" in -h|--help) usage 0 ;; esac

TARGET="$(cd "$1" 2>/dev/null && pwd)" || { echo "error: no such directory: $1" >&2; exit 1; }
shift
AGENTS=("$@")
[ ${#AGENTS[@]} -gt 0 ] || AGENTS=(claude codex)
[ "${AGENTS[0]}" = all ] && AGENTS=(claude codex antigravity cursor windsurf gemini copilot)

copy_body() { # $1 = destination dir
  mkdir -p "$1"
  cp "$SRC/AGENTS.md" "$SRC/SKILL.md" "$1/"
  cp -r "$SRC/references" "$SRC/templates" "$1/"
}

pointer_text() { # $1 = path to the instruction file, relative to project root
  cat <<POINTER
$MARK_BEGIN
## UI / UX work

Before any task that touches UI, UX, layout, visual design, styling, components,
responsive behavior, or a redesign, read \`$1\` and follow it. It defines the
design process, the anti-generic-UI rules, and the reference files to load on demand.
$MARK_END
POINTER
}

append_pointer() { # $1 = file to append to, $2 = path to instruction file
  mkdir -p "$(dirname "$1")"
  if [ -f "$1" ] && grep -qF "$MARK_BEGIN" "$1"; then
    echo "  = pointer already present in ${1#"$TARGET"/}"
    return
  fi
  [ -s "$1" ] && printf '\n' >>"$1"
  pointer_text "$2" >>"$1"
  echo "  + pointer appended to ${1#"$TARGET"/}"
}

install_claude() {
  local dest="$TARGET/.claude/skills/ui-architect"
  copy_body "$dest"
  rm -f "$dest/AGENTS.md"
  echo "  + skill installed at .claude/skills/ui-architect (invoke: /ui-architect)"
}

install_claude_global() {
  local dest="$HOME/.claude/skills/ui-architect"
  copy_body "$dest"
  rm -f "$dest/AGENTS.md"
  echo "  + skill installed at ~/.claude/skills/ui-architect (available in every project)"
}

install_body() {
  local dest="$TARGET/.ui-architect"
  copy_body "$dest"
  rm -f "$dest/SKILL.md"
  echo "  + skill body copied to .ui-architect/"
}

install_cursor() {
  local rule="$TARGET/.cursor/rules/ui-architect.mdc"
  mkdir -p "$(dirname "$rule")"
  cat >"$rule" <<'RULE'
---
description: UI/UX design process for any interface, layout, styling, component, or redesign work
globs:
alwaysApply: false
---

Read `.ui-architect/AGENTS.md` and follow it for any task touching UI, UX, layout,
visual design, styling, components, responsive behavior, or a redesign. It defines
the design process, the anti-generic-UI rules, and reference files to load on demand.
RULE
  echo "  + rule written to .cursor/rules/ui-architect.mdc"
}

install_antigravity() {
  local rule="$TARGET/.agents/rules/ui-architect.md"
  mkdir -p "$(dirname "$rule")"
  pointer_text ".ui-architect/AGENTS.md" >"$rule"
  echo "  + rule written to .agents/rules/ui-architect.md"
}

install_windsurf() {
  local rule="$TARGET/.windsurf/rules/ui-architect.md"
  mkdir -p "$(dirname "$rule")"
  pointer_text ".ui-architect/AGENTS.md" >"$rule"
  echo "  + rule written to .windsurf/rules/ui-architect.md"
}

for agent in "${AGENTS[@]}"; do
  echo "$agent:"
  case "$agent" in
    claude)        install_claude ;;
    claude-global) install_claude_global ;;
    codex)         install_body; append_pointer "$TARGET/AGENTS.md" ".ui-architect/AGENTS.md" ;;
    antigravity)   install_body; append_pointer "$TARGET/AGENTS.md" ".ui-architect/AGENTS.md"; install_antigravity ;;
    cursor)        install_body; install_cursor ;;
    windsurf)      install_body; install_windsurf ;;
    gemini)        install_body; append_pointer "$TARGET/GEMINI.md" ".ui-architect/AGENTS.md" ;;
    copilot)       install_body; append_pointer "$TARGET/.github/copilot-instructions.md" ".ui-architect/AGENTS.md" ;;
    generic)       install_body ;;
    *)             echo "  ! unknown agent: $agent" >&2; exit 1 ;;
  esac
done

echo
echo "Done. Target: $TARGET"
