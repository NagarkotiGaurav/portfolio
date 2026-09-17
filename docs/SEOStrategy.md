# SEO Strategy

- Personal brand titles/descriptions per route (`src/data/pageMeta.js` → `seo.js`)
- **Dedicated service URLs** under `/solutions/[slug]` plus decision articles under `/insights/[slug]`
- JSON-LD is injected at **prerender** (visible without JS) and updated client-side on navigation
- Open Graph image: `/images/og-share.svg`
- **Build-time prerender** (`scripts/prerender-routes.mjs`) writes unique `dist/<route>/index.html` shells so crawlers see distinct title, description, canonical, H1, and noscript body without JS
- JSON-LD graph: Person + ProfessionalService + WebSite; BreadcrumbList matching visible crumbs; FAQPage on `/contact` and each service page; `Service` node on `/solutions/[slug]`
- Visible breadcrumbs (`src/components/Breadcrumbs.jsx`) on every page except home and 404: Home / Section / Page. Nested URLs (future `/solutions/[slug]`, `/work/[slug]`) include the hub.
- Person `sameAs` from `getSameAs()` — site URL plus optional LinkedIn / GitHub / X in `BRAND.profiles`
- Canonical via `VITE_SITE_URL` (https://gauravnagarkoti.tech)
- `robots.txt` (standard Allow + Sitemap only) + `sitemap.xml` + `llms.txt` + `ads.txt`
- Security headers via `public/_headers` (HSTS, nosniff, referrer, frame options)
- Favicons: `/favicon.ico`, `/favicon.svg`, `/apple-touch-icon.png`

## Why SEO tools reported duplicate titles / meta / content

React sets meta client-side. Non-JS crawlers fetched the same `index.html` for every URL → duplicate title, description, thin content, missing H1. Prerender fixes the HTML response per route after `npm run build`.

## Manual ops

1. **Redeploy** after prerender (`npm run deploy`) so `/solutions`, `/work`, etc. serve unique HTML.
2. Cloudflare **AI Crawl Control / managed robots**: live `robots.txt` still prepends `Content-Signal:` and conflicting Disallow/Allow for AI bots. That triggers “robots.txt format errors” in some scanners. Prefer dashboard settings that don’t inject non-standard directives, or accept CF managed block + keep origin file simple.
3. **www → apex** 301 + HSTS on www (subdomain HSTS notice).
4. GSC/Bing: resubmit sitemap after deploy; request indexing on key URLs.
5. Fill `BRAND.profiles`; set Calendly when ready. GA4 is loaded via GTM (`GTM-T45H6MZF`), not a separate gtag snippet. SPA hits use `virtual_page_view` — see `docs/AnalyticsStrategy.md`.
6. Long-term: keep case-study and insight **body** content honest. `/work/[slug]` documents are anonymized under NDA (no client names or live domains).
