# AGENTS.md — Portfolio React

Treat Cursor like a senior engineer on the team: encode standards once. Rules define **how** the AI works; commands define **what** to do for a task; skills/subagents add reusable expertise.

## Layers

| Layer | Location | Purpose |
|-------|----------|---------|
| Global rules | `~/.cursor/rules/` | How to work (every repo) |
| Project rules | `.cursor/rules/` | How to work (this codebase) |
| Slash commands | `.cursor/commands/` + `~/.cursor/commands/` | What to do for a task (you invoke `/…`) |
| Skills | `~/.cursor/skills/` | Reusable workflows (agent or you) |
| Subagents | `.cursor/agents/` + `~/.cursor/agents/` | Narrow specialists |

**Rules ≠ commands:** project rules stay always-on guardrails. Commands are explicit task prompts you run when you want a consistent review/implementation pass.

## Stack

- React 18 + Vite
- React Router DOM
- Tailwind CSS 3
- ESLint

## npm scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Slash commands

Type `/` in Agent chat:

| Command | Task |
|---------|------|
| `/security-audit` | OWASP-style security review |
| `/code-review` | Staff-level review with severity + verdict |
| `/bug-investigation` | Root-cause debug workflow |
| `/feature-implementation` | End-to-end feature (code + test + docs) |
| `/refactoring` | Behavior-preserving cleanup |
| `/api-design-review` | REST/API contract review |
| `/database-review` | Schema, indexes, migrations |
| `/system-design` | Production design with tradeoffs |
| `/performance-optimization` | Evidence-based performance work |
| `/documentation-generation` | Update `docs/*` from real code |
| `/growth-marketing` | SEO / GEO / AEO / CRO growth strategy |

Same commands are installed user-wide under `~/.cursor/commands/` for MERN / DevOps / Odoo / freelance repos.

## Project rules

- `project.mdc` — architecture & conventions
- `documentation.mdc` — keep `docs/` in sync

## Docs

Update when affected: `docs/architecture.md`, `api.md`, `database.md`, `deployment.md`

## Skills (agent workflows)

| Skill | Use when |
|-------|----------|
| `feature-development` | Build a feature |
| `bug-fix` | Debug / fix |
| `refactoring` | Behavior-preserving cleanup |
| `code-review` | Review diffs/PRs |
| `security-audit` | OWASP / auth / secrets |
| `performance` | Speed / bundle / caching |
| `devops` | Docker / CI / infra |
| `system-design` | Architecture planning |
| `database` | Schema / indexes / queries |
| `api-design` | REST APIs |
| `testing` | Tests / coverage |
| `production-code` | No placeholders / TODOs |
| `frontend-ui` | UI / UX / layout |
| `growth-marketing` | SEO / GEO / AEO / CRO / content growth |

## Subagents

| Agent | Responsibility |
|-------|----------------|
| `architect` | Design & tradeoffs |
| `backend-engineer` | APIs / services / DB |
| `frontend-engineer` | React / UI / state |
| `devops-engineer` | Docker / CI / infra |
| `security-engineer` | OWASP / auth / secrets |
| `performance-engineer` | Profiling / optimization |
| `database-engineer` | Schema / indexes / queries |
| `qa-engineer` | Test strategy |
| `reviewer` | Quality gate |
| `documentation-writer` | Docs sync |
| `growth-marketing-strategist` | SEO / AI search / CRO growth |

## Default workflow (non-trivial tasks)

```
Architect → Backend/Frontend → Database → Security → Performance → QA → Documentation → Reviewer
```

Skip steps that do not apply.

## Cursor settings checklist

Enable in Cursor Settings UI: Codebase Indexing, Semantic Search, Auto-index new files, Project Rules.

Policy via rules: Auto-commit Off; no history rewrite / force push; prefer `@Codebase`.

## MERN repos

Copy `~/.cursor/rules/mern-project-template.mdc` → that repo’s `.cursor/rules/project.mdc` and adapt. Do not use the MERN template in this portfolio frontend.
