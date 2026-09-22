# Content Strategy

## Collections
Content lives under `src/content/` so scenes stay content-agnostic:

- `brandNarrative.js` — vision, voice, CTA, trust
- `services/` — solution domains
- `projects/` — re-exports case studies from `src/data/projects.js`
- `industries/`
- `articles/` — insights
- `testimonials/`
- `resources/`

## Rules
- Prefer business outcomes over service catalogs.
- Every page exposes ≥ 1 trust signal.
- Pacing: beat → whitespace → beat → CTA. No equal-weight walls of text.
- Do not chase head terms (`software development`, `freelancer`). Build topical clusters around problems you can implement. See `docs/GrowthContentMap.md`.
- Connector line under the consultant title: custom software, web applications, business automation, ERP integrations, scalable systems.
- Hire-intent pages: `src/data/solutionPages.js` → `/solutions/[slug]`. Do not stuff “IT services” onto a vanity URL.
- Hire landing: `src/data/hirePage.js` → `/hire-software-architect`. Commercial conversion (fit, engagement shapes, NDA-safe proof, CTA) — not another essay. No invented volumes, rankings, logos, or prices.
- Decision insights: `src/data/articles.js` → `/insights/[slug]`. Frameworks only — no invented clients.
- Case studies: `src/data/projects.js` → `/work/[slug]`. Shipped work, client names withheld under NDA, no invented metrics. Positioned for US/UK/EU operators (English, USD, remote).

## Narrative beats
Hook → Problem → Insight → Proof → Trust → CTA
