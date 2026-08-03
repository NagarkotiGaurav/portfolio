# Deployment — Render

## Recommended: Static Site

This app is a Vite SPA. Use a **Static Site** on Render (not a free Node Web Service that sleeps).

| Setting | Value |
|---------|--------|
| Build command | `npm ci && npm run build` |
| Publish directory | `dist` |
| Node version | 20+ (set in Render → Environment if needed) |

SPA client routes (`/solutions`, `/contact`, …) need a rewrite to `index.html`. That is defined in [`render.yaml`](../render.yaml). Files that exist in `dist/` (`/robots.txt`, `/sitemap.xml`, `/assets/*`, `/images/*`) are still served directly.

### Environment variables (Render → Environment)

| Variable | Example | Purpose |
|----------|---------|---------|
| `VITE_SITE_URL` | `https://gauravnagarkoti.tech` | Canonical URLs, Open Graph |
| `VITE_CONTACT_EMAIL` | your real inbox | FormSubmit fallback (email only) |
| `VITE_CONTACT_ENDPOINT` | `https://…/api/contact` | Contact API (Telegram + Sheets) |
| `VITE_CALENDLY_URL` | `https://calendly.com/...` | Schedule Call button |
| `VITE_LOG_LEVEL` | `info` | Client log verbosity |

`VITE_*` values are baked in at **build** time. Change them → trigger a new deploy.

### Leads: Telegram + Google Sheets (provider architecture)

The contact API accepts submissions with empty credentials. Providers activate when env vars are filled — no code change needed.

Secrets stay on `server/`, never in `VITE_*`. See [`server/README.md`](../server/README.md).

```env
TELEGRAM_ENABLED=true
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=

GOOGLE_SHEETS_ENABLED=true
GOOGLE_SHEETS_WEBHOOK_URL=
GOOGLE_SHEETS_WEBHOOK_SECRET=
```

1. Deploy `portfolio-contact-api` (credentials can be blank at first).
2. On the static site, set `VITE_CONTACT_ENDPOINT=https://<api-host>/api/contact` and redeploy.
3. Later: create the Telegram bot + Sheets Apps Script, paste values into Render env, restart the API.

Delivery uses `Promise.allSettled` across providers — one failure never blocks the other.

### After first deploy

2. Set `VITE_SITE_URL` to `https://gauravnagarkoti.tech` (already the project default). On build, `scripts/apply-site-url.mjs` rewrites `dist/robots.txt` and `dist/sitemap.xml` to that origin.
3. Redeploy.
4. In [Google Search Console](https://search.google.com/search-console), add `https://gauravnagarkoti.tech` and submit `https://gauravnagarkoti.tech/sitemap.xml`.

### Custom domain

In Render → Static Site → Settings → Custom Domains, attach **gauravnagarkoti.tech** (and `www` if you use it). Keep `VITE_SITE_URL=https://gauravnagarkoti.tech`.

---

## Why AI tools still may not “see” the site

Render Static Sites do **not** use Cloudflare challenges by default. If an AI says it is blocked, usual causes are:

1. **SPA shell** — crawler gets `#root` without running JS. Mitigations in-repo: `robots.txt` allow + `noscript` summary. Full fix later: prerender/SSR.
2. **Wrong product type** — a free **Web Service** that cold-starts can time out bots; prefer **Static Site**.
3. **Extra CDN in front** — if Cloudflare is proxied in front of Render, disable Bot Fight / “I’m Under Attack” for crawlers.
4. **Stale sitemap domain** — confirm `/sitemap.xml` shows `https://gauravnagarkoti.tech` after deploy.

---

## Local

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

Output: `dist/`
