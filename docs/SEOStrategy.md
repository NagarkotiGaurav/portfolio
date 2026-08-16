# SEO Strategy

- Personal brand titles/descriptions per route (`src/data/pageMeta.js` → `seo.js`)
- **Build-time prerender** (`scripts/prerender-routes.mjs`) writes unique `dist/<route>/index.html` shells so crawlers see distinct title, description, canonical, H1, and noscript body without JS
- JSON-LD graph: Person + ProfessionalService + WebSite; BreadcrumbList on nested routes; FAQPage on `/contact`
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
5. Fill `BRAND.profiles`; set `VITE_GA_MEASUREMENT_ID` / Calendly when ready.
6. Long-term: real case-study and insight **body** content (word-count warnings).
