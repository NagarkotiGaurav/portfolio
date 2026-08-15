# SEO Strategy

- Personal brand titles/descriptions per route (`src/data/seo.js`)
- Person + ProfessionalService JSON-LD
- Canonical via `VITE_SITE_URL` (https://gauravnagarkoti.tech)
- `robots.txt` + `sitemap.xml` postbuild
- `public/llms.txt` — llmstxt.org Markdown map for AI agents (H1 + absolute link lists); must be a real static file so SPA fallback does not serve `index.html` at `/llms.txt`
- Prefer crawlable content; avoid motion-only information
