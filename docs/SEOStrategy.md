# SEO Strategy

- Personal brand titles/descriptions per route (`src/data/seo.js`)
- JSON-LD graph: Person + ProfessionalService + WebSite; BreadcrumbList on nested routes; FAQPage on `/contact`
- Person `sameAs` from `getSameAs()` — site URL plus optional LinkedIn / GitHub / X in `BRAND.profiles` (`src/data/site.js`)
- Canonical via `VITE_SITE_URL` (https://gauravnagarkoti.tech)
- `robots.txt` + `sitemap.xml` + `llms.txt` in `public/`
- Contact FAQ copy in `src/data/faq.js` (visible on page + schema)
- Prefer crawlable content; avoid motion-only information
- Trust signals stay qualitative until numeric claims are verifiable (`brandNarrative.js`)

## Manual ops (not in code)

1. Cloudflare AI Crawl Control — allow GPTBot / ClaudeBot / Google-Extended / PerplexityBot if you want AI search visibility (live managed robots currently Disallow many AI bots).
2. Google Search Console + Bing Webmaster — verify property, submit `sitemap.xml`, URL Inspection.
3. Fill `BRAND.profiles` with real profile URLs, then redeploy.
4. Set `VITE_CALENDLY_URL` in build env if using Schedule Call.
5. Publish real `/work/[slug]` case studies and `/insights/[slug]` articles (content + routes) — highest leverage for rankings.
6. Add a real OG image under `public/images/` (currently referenced as `/images/work-case-study-01.jpg`).
7. Wire GA4/GTM when ready (`src/lib/analytics.js` already calls `gtag` if present).
