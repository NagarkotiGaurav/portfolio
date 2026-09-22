# Deployment — Cloudflare (Workers + Assets)

## How this project deploys

Your Cloudflare **deploy command** is:

```bash
npx wrangler deploy
```

That is a **Workers** deploy (not classic Pages-only). The repo is configured for it:

```text
dist/          → static React SPA
worker.js      → /api/contact (Telegram + Sheets)
functions/lib/ → shared lead logic (imported by worker.js)
```

| Setting | Value |
|---------|--------|
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Node version | `22` (`NODE_VERSION=22`) |

Do **not** put `/* /index.html 200` in `_redirects` with this setup — Cloudflare rejects it. SPA routing is handled by:

```toml
[assets]
html_handling = "drop-trailing-slash"
not_found_handling = "single-page-application"
```

`drop-trailing-slash` makes `/solutions/foo` return **200** (the sitemap/canonical URL). The default `auto-trailing-slash` 307s to `/solutions/foo/`, which Search Console reports as **Page with redirect** plus **Alternate page with proper canonical tag**.

### Environment variables / secrets

**Build-time:**

| Variable | Value |
|----------|--------|
| `VITE_SITE_URL` | `https://gauravnagarkoti.tech` |
| `VITE_CONTACT_ENDPOINT` | `/api/contact` |
| `NODE_VERSION` | `22` |

**Runtime (Worker secrets):**

```env
TELEGRAM_ENABLED=true
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
GOOGLE_SHEETS_ENABLED=true
GOOGLE_SHEETS_WEBHOOK_URL=
GOOGLE_SHEETS_WEBHOOK_SECRET=
ALLOWED_ORIGINS=https://gauravnagarkoti.tech,http://localhost:5173
```

### Local

```bash
npm run server:dev   # Express on :8787 using same functions/lib
npm run dev          # Vite proxies /api → :8787
```

Or:

```bash
npm run build && npx wrangler dev
```

### Test after deploy

```bash
curl -s https://gauravnagarkoti.tech/api/contact
curl -s -X POST https://gauravnagarkoti.tech/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"Gaurav","email":"gaurav@test.com","message":"Testing contact API"}'
```

`functions/api/contact.js` remains for optional Pages Functions; production path with your current CI is **`worker.js` + `wrangler deploy`**.

## SEO / AI crawl (manual Cloudflare steps)

After deploy, confirm:

```bash
curl -sI https://gauravnagarkoti.tech/sitemap.xml
curl -sI https://gauravnagarkoti.tech/llms.txt
curl -s https://gauravnagarkoti.tech/robots.txt | head -n 80
```

If live `robots.txt` shows **Cloudflare Managed** `Disallow` for GPTBot / ClaudeBot / Google-Extended while your repo Allows them:

1. Cloudflare Dashboard → domain → **AI Crawl Control** (or Bot / robots management)
2. Allow crawlers you want for answer/search visibility
3. Re-fetch live `robots.txt` and confirm it matches intent
4. Keep rate limits / WAF protection on `/api/*` only — do not challenge static HTML for known good bots

Also submit `https://gauravnagarkoti.tech/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

### www → apex (canonical host)

SEO scanners fail when `www` and apex do not resolve to one URL.

1. Cloudflare DNS: create `www` as CNAME to `gauravnagarkoti.tech` (proxied), **or** AAAA/A as needed
2. Rules → Redirect Rules: `Hostname equals www.gauravnagarkoti.tech` → `https://gauravnagarkoti.tech${uri}` (301)
3. SSL/TLS → Edge Certificates → enable **Always Use HTTPS** and **HSTS** (align with `public/_headers`)

### Analytics

Google Tag Manager **GTM-T45H6MZF** is in `index.html` (every page after deploy). Wire GA4 inside GTM. Use a Custom Event trigger on `virtual_page_view` for SPA routes (the app owns page views). Do **not** also use a History Change trigger, and do not set `VITE_GA_MEASUREMENT_ID` while GTM is installed. Mark only `lead_created` and `cta_strategy_call` as GA4 conversions. Details: `docs/AnalyticsStrategy.md`.

### Prerendered routes

`npm run build` writes unique HTML under `dist/<route>/index.html` (title, description, canonical, H1). After deploy, verify:

```bash
curl -s https://gauravnagarkoti.tech/solutions/custom-software-development | grep -o '<title>[^<]*</title>'
curl -s https://gauravnagarkoti.tech/hire-software-architect | grep -o '<title>[^<]*</title>'
curl -s https://gauravnagarkoti.tech/insights/when-to-build-custom-software | grep -o '<title>[^<]*</title>'
curl -s https://gauravnagarkoti.tech/ | grep 'application/ld+json'
```

Titles must differ. If both show the home title, the Worker is still serving only the root SPA shell—confirm assets include the prerendered folders.
