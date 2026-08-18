# Information Architecture

Acquisition blueprint (clusters, keywords, phases): `docs/GrowthContentMap.md`.

## Primary routes
| Path | Purpose | Emotion |
| --- | --- | --- |
| `/` | Hook + proof + path | Curiosity |
| `/solutions` | Commercial hub (six service URLs) | Confidence |
| `/solutions/[slug]` | Hire-intent service pages | Confidence |
| `/work` | Evidence hub | Credibility |
| `/work/[slug]` | Case-study documents | Credibility |
| `/process` | How delivery works | Clarity |
| `/resources` | Why partner with me | Trust |
| `/industries` | Domain fit (supporting) | Confidence |
| `/insights` | Problem / architecture writing | Expertise |
| `/insights/[slug]` | Search-acquisition pages | Expertise |
| `/contact` | Action | Trust |

Visible breadcrumbs (except home): Home / Section [/ Page]. Schema matches the UI (`getBreadcrumbTrail`).

Do not add a parallel `/services/` tree; nest commercial pages under `/solutions`.

## Visitor journey
Interest → Trust → Confidence → Decision → Action

## Nav
Solutions · Work · Industries · Insights · Process · Why Me · Book a Strategy Call
