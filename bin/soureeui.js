#!/usr/bin/env node
'use strict'

const fs = require('fs')
const os = require('os')
const path = require('path')
const readline = require('readline')

const PKG = require('../package.json')
const ROOT = path.resolve(__dirname, '..')
const PAYLOAD = ['AGENTS.md', 'SKILL.md', 'references', 'templates']
const BODY_DIR = '.soureeui'
const MARK_BEGIN = '<!-- soureeui:begin -->'
const MARK_END = '<!-- soureeui:end -->'

const POINTER = (bodyPath) => `${MARK_BEGIN}
## UI / UX work

Before any task that touches UI, UX, layout, visual design, styling, components,
responsive behavior, or a redesign, read \`${bodyPath}\` and follow it. It defines
the design process, the anti-generic-UI rules, and the reference files to load on demand.
${MARK_END}`

const CURSOR_RULE = (bodyPath) => `---
description: UI/UX design process for any interface, layout, styling, component, or redesign work
globs:
alwaysApply: false
---

Read \`${bodyPath}\` and follow it for any task touching UI, UX, layout,
visual design, styling, components, responsive behavior, or a redesign. It defines
the design process, the anti-generic-UI rules, and reference files to load on demand.
`

// agent registry -------------------------------------------------------------

// where the skill body lives, and how rule files should refer to it
const bodyDir = (ctx) => path.join(ctx.global ? os.homedir() : ctx.dir, BODY_DIR)
const bodyRef = (ctx) => (ctx.global
  ? path.join(os.homedir(), BODY_DIR, 'AGENTS.md').replace(os.homedir(), '~')
  : `${BODY_DIR}/AGENTS.md`)

const claudeSkillDir = (ctx) => ctx.global
  ? path.join(os.homedir(), '.claude', 'skills', 'soureeui')
  : path.join(ctx.dir, '.claude', 'skills', 'soureeui')

const AGENTS = {
  claude: {
    label: 'Claude Code',
    detect: ['.claude', 'CLAUDE.md'],
    install: (ctx) => {
      ctx.copyBody(claudeSkillDir(ctx), { skill: true })
      ctx.note('loads automatically on UI work, or run /soureeui')
    },
    paths: (ctx) => [claudeSkillDir(ctx)],
  },
  codex: {
    label: 'Codex',
    detect: ['AGENTS.md', '.codex'],
    install: (ctx) => {
      ctx.body()
      ctx.pointer(path.join(ctx.dir, 'AGENTS.md'))
    },
    paths: (ctx) => [bodyDir(ctx), path.join(ctx.dir, 'AGENTS.md')],
  },
  antigravity: {
    label: 'Antigravity',
    detect: ['.agents', '.agent'],
    install: (ctx) => {
      ctx.body()
      ctx.pointer(ctx.global
        ? path.join(os.homedir(), '.gemini', 'GEMINI.md')
        : path.join(ctx.dir, 'AGENTS.md'))
      ctx.write(path.join(ctx.dir, '.agents', 'rules', 'soureeui.md'),
        POINTER(bodyRef(ctx)) + '\n')
    },
    paths: (ctx) => [
      bodyDir(ctx),
      path.join(ctx.dir, '.agents', 'rules', 'soureeui.md'),
      path.join(ctx.dir, 'AGENTS.md'),
    ],
  },
  cursor: {
    label: 'Cursor',
    detect: ['.cursor'],
    install: (ctx) => {
      ctx.body()
      ctx.write(path.join(ctx.dir, '.cursor', 'rules', 'soureeui.mdc'), CURSOR_RULE(bodyRef(ctx)))
    },
    paths: (ctx) => [bodyDir(ctx), path.join(ctx.dir, '.cursor', 'rules', 'soureeui.mdc')],
  },
  windsurf: {
    label: 'Windsurf',
    detect: ['.windsurf'],
    install: (ctx) => {
      ctx.body()
      ctx.write(path.join(ctx.dir, '.windsurf', 'rules', 'soureeui.md'),
        POINTER(bodyRef(ctx)) + '\n')
    },
    paths: (ctx) => [bodyDir(ctx), path.join(ctx.dir, '.windsurf', 'rules', 'soureeui.md')],
  },
  gemini: {
    label: 'Gemini CLI',
    detect: ['GEMINI.md', '.gemini'],
    install: (ctx) => {
      ctx.body()
      ctx.pointer(ctx.global
        ? path.join(os.homedir(), '.gemini', 'GEMINI.md')
        : path.join(ctx.dir, 'GEMINI.md'))
    },
    paths: (ctx) => [bodyDir(ctx), path.join(ctx.dir, 'GEMINI.md')],
  },
  copilot: {
    label: 'GitHub Copilot',
    detect: [path.join('.github', 'copilot-instructions.md')],
    install: (ctx) => {
      ctx.body()
      ctx.pointer(path.join(ctx.dir, '.github', 'copilot-instructions.md'))
    },
    paths: (ctx) => [bodyDir(ctx), path.join(ctx.dir, '.github', 'copilot-instructions.md')],
  },
  generic: {
    label: 'Any other agent',
    detect: [],
    install: (ctx) => {
      ctx.body()
      ctx.note(`point your agent at ${bodyRef(ctx)}`)
    },
    paths: (ctx) => [bodyDir(ctx)],
  },
}

const NAMES = Object.keys(AGENTS)

// output ---------------------------------------------------------------------

const ESC = String.fromCharCode(27)
const tty = process.stdout.isTTY && !process.env.NO_COLOR
const paint = (code, s) => (tty ? `${ESC}[${code}m${s}${ESC}[0m` : s)
const bold = (s) => paint(1, s)
const dim = (s) => paint(2, s)
const green = (s) => paint(32, s)
const yellow = (s) => paint(33, s)
const red = (s) => paint(31, s)

// piping into head/less closes stdout early; that is not an error
process.stdout.on('error', (err) => { if (err.code === 'EPIPE') process.exit(0) })

const log = (s = '') => process.stdout.write(s + '\n')
const fail = (msg) => { process.stderr.write(red('error: ') + msg + '\n'); process.exit(1) }

// args -----------------------------------------------------------------------

function parseArgs (argv) {
  const out = { _: [], ai: [], dir: process.cwd(), global: false, force: false, dryRun: false, yes: false }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    const next = () => {
      const v = argv[++i]
      if (v === undefined || v.startsWith('-')) fail(`${a} needs a value`)
      return v
    }
    const addAi = (v) => out.ai.push(...v.split(',').map((s) => s.trim()).filter(Boolean))
    if (a === '--ai' || a === '-a') addAi(next())
    else if (a.startsWith('--ai=')) addAi(a.slice(5))
    else if (a === '--dir' || a === '-d') out.dir = path.resolve(next())
    else if (a.startsWith('--dir=')) out.dir = path.resolve(a.slice(6))
    else if (a === '--global' || a === '-g') out.global = true
    else if (a === '--force' || a === '-f') out.force = true
    else if (a === '--dry-run' || a === '-n') out.dryRun = true
    else if (a === '--yes' || a === '-y') out.yes = true
    else if (a === '--help' || a === '-h') out.help = true
    else if (a === '--version' || a === '-v') out.version = true
    else if (a.startsWith('-')) fail(`unknown flag: ${a}`)
    else out._.push(a)
  }
  return out
}

// fs helpers -----------------------------------------------------------------

function copyDir (src, dest) {
  fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name)
    const to = path.join(dest, entry.name)
    if (entry.isDirectory()) copyDir(from, to)
    else fs.copyFileSync(from, to)
  }
}

function makeCtx (opts, actions) {
  const ctx = {
    dir: opts.dir,
    global: opts.global,
    rel: (p) => (p === opts.dir || p.startsWith(opts.dir + path.sep)
      ? path.relative(opts.dir, p) || '.'
      : p.replace(os.homedir(), '~')),
    note: (msg) => actions.push({ kind: 'note', msg }),
    write: (file, content) => actions.push({ kind: 'write', file, content }),
    pointer: (file) => actions.push({ kind: 'pointer', file }),
    copyBody: (dest, o = {}) => actions.push({ kind: 'body', dest, skill: !!o.skill }),
    body: () => ctx.copyBody(bodyDir(ctx)),
  }
  return ctx
}

function applyActions (actions, opts, ctx) {
  for (const a of actions) {
    if (a.kind === 'note') {
      log('  ' + dim(a.msg))
      continue
    }

    if (a.kind === 'body') {
      if (!opts.dryRun) {
        fs.mkdirSync(a.dest, { recursive: true })
        for (const item of PAYLOAD) {
          const src = path.join(ROOT, item)
          if (!fs.existsSync(src)) continue
          const dest = path.join(a.dest, item)
          if (fs.statSync(src).isDirectory()) {
            fs.rmSync(dest, { recursive: true, force: true })
            copyDir(src, dest)
          } else {
            fs.copyFileSync(src, dest)
          }
        }
        fs.rmSync(path.join(a.dest, a.skill ? 'AGENTS.md' : 'SKILL.md'), { force: true })
      }
      log('  ' + green('+') + ' skill body ' + dim('->') + ' ' + ctx.rel(a.dest) + '/')
      continue
    }

    if (a.kind === 'write') {
      const exists = fs.existsSync(a.file)
      if (exists && !opts.force && fs.readFileSync(a.file, 'utf8') === a.content) {
        log('  ' + dim('=') + ' ' + ctx.rel(a.file) + ' ' + dim('already current'))
        continue
      }
      if (!opts.dryRun) {
        fs.mkdirSync(path.dirname(a.file), { recursive: true })
        fs.writeFileSync(a.file, a.content)
      }
      log('  ' + green(exists ? '~' : '+') + ' ' + ctx.rel(a.file))
      continue
    }

    if (a.kind === 'pointer') {
      const block = POINTER(bodyRef(ctx))
      const exists = fs.existsSync(a.file)
      const current = exists ? fs.readFileSync(a.file, 'utf8') : ''

      if (current.includes(MARK_BEGIN)) {
        const start = current.indexOf(MARK_BEGIN)
        const end = current.indexOf(MARK_END, start)
        const next = current.slice(0, start) + block + current.slice(end + MARK_END.length)
        if (next !== current && !opts.dryRun) fs.writeFileSync(a.file, next)
        log('  ' + dim('=') + ' ' + ctx.rel(a.file) + ' ' +
          dim(next === current ? 'already current' : 'pointer refreshed'))
        continue
      }

      if (!opts.dryRun) {
        fs.mkdirSync(path.dirname(a.file), { recursive: true })
        const head = current ? current.replace(/\n*$/, '\n\n') : ''
        fs.writeFileSync(a.file, head + block + '\n')
      }
      log('  ' + green(exists ? '~' : '+') + ' ' + ctx.rel(a.file) + ' ' +
        dim(exists ? 'pointer appended' : 'created'))
    }
  }
}

// agent selection ------------------------------------------------------------

function detect (dir) {
  const found = []
  for (const name of NAMES) {
    for (const marker of AGENTS[name].detect) {
      if (fs.existsSync(path.join(dir, marker))) {
        found.push(name)
        break
      }
    }
  }
  return found
}

function ask (question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

async function pickAgents (opts) {
  if (opts.ai.length) {
    if (opts.ai.includes('all')) return NAMES.filter((n) => n !== 'generic')
    const unknown = opts.ai.filter((n) => !NAMES.includes(n))
    if (unknown.length) fail(`unknown agent: ${unknown.join(', ')}\n       known: ${NAMES.join(', ')}, all`)
    return [...new Set(opts.ai)]
  }

  const found = detect(opts.dir)
  const fallback = found.length ? found : ['claude', 'codex']

  if (opts.yes || !process.stdin.isTTY) {
    if (found.length) log(dim(`detected: ${found.join(', ')}`))
    return fallback
  }

  log('')
  log(bold('Which agents?') + dim('  numbers, names, or a for all'))
  NAMES.forEach((n, i) => {
    const hit = found.includes(n) ? green('  detected') : ''
    log(`  ${dim(String(i + 1) + ')')} ${n.padEnd(12)} ${dim(AGENTS[n].label)}${hit}`)
  })
  const answer = await ask(`\n${dim('default: ' + fallback.join(', '))}\n> `)
  if (!answer) return fallback
  if (/^(a|all)$/i.test(answer)) return NAMES.filter((n) => n !== 'generic')

  const picked = answer.split(/[\s,]+/).filter(Boolean).map((token) => {
    const i = Number(token)
    if (Number.isInteger(i) && i >= 1 && i <= NAMES.length) return NAMES[i - 1]
    if (NAMES.includes(token)) return token
    return fail(`not an option: ${token}`)
  })
  return [...new Set(picked)]
}

// commands -------------------------------------------------------------------

async function cmdInit (opts) {
  if (!fs.existsSync(opts.dir)) fail(`no such directory: ${opts.dir}`)
  const agents = await pickAgents(opts)

  log('')
  log(`${bold('soureeui')} ${dim('v' + PKG.version)}  ${opts.dir}${opts.dryRun ? yellow('  dry run') : ''}`)
  log('')

  for (const name of agents) {
    log(bold(AGENTS[name].label))
    const actions = []
    const ctx = makeCtx(opts, actions)
    AGENTS[name].install(ctx)
    applyActions(actions, opts, ctx)
    log('')
  }

  log(green('Done.') + dim(' Ask your agent to build or redesign a screen and it will run the design process.'))
  log('')
}

function cmdList () {
  log('')
  log(bold('Supported agents'))
  NAMES.forEach((n) => log(`  ${n.padEnd(12)} ${dim(AGENTS[n].label)}`))
  log('')
  log(dim('  soureeui init --ai cursor'))
  log(dim('  soureeui init --ai claude,codex'))
  log(dim('  soureeui init --ai all'))
  log('')
}

function installedPaths (name, ctx) {
  return AGENTS[name].paths(ctx).filter((p) => {
    if (!fs.existsSync(p)) return false
    if (/\.(md|mdc)$/.test(p) && !p.includes('soureeui')) {
      return fs.readFileSync(p, 'utf8').includes(MARK_BEGIN)
    }
    return true
  })
}

function cmdDoctor (opts) {
  log('')
  log(`${bold('soureeui doctor')}  ${dim(opts.dir)}`)
  log('')
  const ctx = makeCtx(opts, [])
  let any = false
  for (const name of NAMES) {
    const present = installedPaths(name, ctx)
    if (!present.length) continue
    any = true
    log(`${green('installed')}  ${bold(AGENTS[name].label)}`)
    present.forEach((p) => log(`           ${dim(ctx.rel(p))}`))
  }
  if (!any) log(dim('nothing installed here. run: soureeui init'))
  log('')
}

async function cmdRemove (opts) {
  const agents = opts.ai.length ? (opts.ai.includes('all') ? NAMES : opts.ai) : NAMES
  const ctx = makeCtx(opts, [])
  const targets = [...new Set(agents.flatMap((n) => installedPaths(n, ctx)))]

  if (!targets.length) {
    log(dim('nothing to remove.'))
    return
  }

  log('')
  log(bold('Will remove or clean:'))
  targets.forEach((p) => log('  ' + ctx.rel(p)))
  log('')

  if (!opts.yes && !opts.dryRun && process.stdin.isTTY) {
    const answer = await ask('Proceed? (y/N) ')
    if (!/^y(es)?$/i.test(answer)) {
      log(dim('cancelled.'))
      return
    }
  }

  for (const p of targets) {
    const isInstructionFile = /\.(md|mdc)$/.test(p) && !p.includes('soureeui')
    if (isInstructionFile) {
      const content = fs.readFileSync(p, 'utf8')
      const start = content.indexOf(MARK_BEGIN)
      const end = content.indexOf(MARK_END, start)
      const cleaned = (content.slice(0, start) + content.slice(end + MARK_END.length)).trim()
      if (!opts.dryRun) {
        if (cleaned) fs.writeFileSync(p, cleaned + '\n')
        else fs.rmSync(p)
      }
      log('  ' + green('-') + ' pointer removed from ' + ctx.rel(p))
    } else {
      if (!opts.dryRun) fs.rmSync(p, { recursive: true, force: true })
      log('  ' + green('-') + ' ' + ctx.rel(p))
    }
  }
  log('')
}

function help () {
  log(`
${bold('soureeui')} ${dim('- install the UI Architect design skill into your AI coding agent')}

${bold('Usage')}
  soureeui init [--ai <agents>] [options]
  soureeui list
  soureeui doctor
  soureeui remove [--ai <agents>]

${bold('Examples')}
  ${dim('$')} soureeui init --ai cursor
  ${dim('$')} soureeui init --ai claude,codex
  ${dim('$')} soureeui init --ai all
  ${dim('$')} soureeui init --ai claude --global
  ${dim('$')} soureeui init                    ${dim('detects what the project uses, or asks')}

${bold('Agents')}
  ${NAMES.join(', ')}, all

${bold('Options')}
  -a, --ai <list>    agents to install for, comma separated
  -d, --dir <path>   target project (default: current directory)
  -g, --global       install machine-wide, where the agent supports it
  -f, --force        overwrite existing rule files
  -n, --dry-run      show what would change, write nothing
  -y, --yes          no prompts
  -h, --help         this text
  -v, --version      version
`)
}

// main -----------------------------------------------------------------------

async function main () {
  const opts = parseArgs(process.argv.slice(2))
  if (opts.version) return log(PKG.version)
  const cmd = opts._[0] || (opts.ai.length ? 'init' : null)
  if (opts.help || !cmd) return help()

  switch (cmd) {
    case 'init':
    case 'install':
    case 'add': return cmdInit(opts)
    case 'update': return cmdInit({ ...opts, force: true })
    case 'list':
    case 'agents': return cmdList()
    case 'doctor':
    case 'status': return cmdDoctor(opts)
    case 'remove':
    case 'uninstall': return cmdRemove(opts)
    default: return fail(`unknown command: ${cmd}\n       try: soureeui --help`)
  }
}

main().catch((err) => fail(err && err.stack ? err.stack : String(err)))
