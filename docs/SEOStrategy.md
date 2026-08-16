# SEO Strategy

- Personal brand titles/descriptions per route (`src/data/seo.js`)
- JSON-LD graph: Person + ProfessionalService + WebSite; BreadcrumbList on nested routes; FAQPage on `/contact`
- Person `sameAs` from `getSameAs()` — site URL plus optional LinkedIn / GitHub / X in `BRAND.profiles` (`src/data/site.js`)
- Canonical via `VITE_SITE_URL` (https://gauravnagarkoti.tech)
- `robots.txt` + `sitemap.xml` + `llms.txt` + `ads.txt` in `public/`
- Security headers via `public/_headers` (HSTS, nosniff, referrer, frame options)
- Favicons: `/favicon.ico`, `/favicon.svg`, `/apple-touch-icon.png`
- Contact FAQ copy in `src/data/faq.js` (visible on page + schema)
- Prefer crawlable content; avoid motion-only information
- Trust signals stay qualitative until numeric claims are verifiable (`brandNarrative.js`)

## Automated SEO checkup — triage

| Scanner finding | Verdict | Action |
|-----------------|---------|--------|
| Media queries missing | Mostly false positive (Tailwind + explicit `@media` in `index.css`) | Redeploy; ignore if still flagged |
| www vs apex canonical | **Real** | Cloudflare: redirect `www` → apex (manual) |
| Render-blocking resources | Improved | Non-blocking Google Fonts CSS in `index.html` |
| Custom 404 HTTP status | Soft 404 by design (SPA) | UI exists (`NotFound.jsx`); true HTTP 404 conflicts with client routes |
| Google Analytics | Optional | Set `VITE_GA_MEASUREMENT_ID` |
| SPF | DNS / email | Add TXT if you send mail from this domain |
| HSTS | In repo `_headers` + enable in CF SSL | Redeploy + Cloudflare HSTS toggle |
| Favicon | Fixed | `/favicon.ico` + SVG + apple-touch |
| Meta title/description length | Tuned on home | Keep 20–60 / ~150–220 chars |
| ads.txt HTML | Fixed | Real `public/ads.txt` (no ad inventory) |

## Manual ops (not in code)

1. Cloudflare AI Crawl Control — allow GPTBot / ClaudeBot / Google-Extended / PerplexityBot if you want AI search visibility.
2. **www redirect:** DNS `www` CNAME → apex (or CF proxy) + Redirect Rule `https://www.gauravnagarkoti.tech/*` → `https://gauravnagarkoti.tech/$1` (301).
3. **HSTS (dashboard backup):** SSL/TLS → Edge Certificates → HTTP Strict Transport Security → enable (max-age ≥ 1 year). Prefer matching `public/_headers`.
4. Google Search Console + Bing Webmaster — verify property, submit `sitemap.xml`.
5. Fill `BRAND.profiles` with real profile URLs, then redeploy.
6. Set `VITE_CALENDLY_URL` and optionally `VITE_GA_MEASUREMENT_ID` in build env.
7. Publish real case studies / insights (highest leverage for AI Visibility score).
8. Add a real OG image under `public/images/` (currently referenced as `/images/work-case-study-01.jpg`).
9. **SPF (if sending email as @gauravnagarkoti.tech):** add DNS TXT e.g. `v=spf1 include:_spf.google.com ~all` (provider-specific).
