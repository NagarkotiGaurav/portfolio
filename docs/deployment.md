# Deployment — Cloudflare Pages (+ Functions)

## One deployment

```text
GitHub
  │
  ▼
Cloudflare Pages
  ├── React (dist/)
  └── Functions (functions/) → /api/contact
```

No separate Worker. `functions/api/contact.js` becomes `https://gauravnagarkoti.tech/api/contact`.

| Setting | Value |
|---------|--------|
| Framework preset | Vite |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | **22** (or ≥20.19) — set `NODE_VERSION=22` |
| Root | `/` (repo root) |

SPA routing: `not_found_handling = "single-page-application"` in [`wrangler.toml`](../wrangler.toml)  
(Do **not** use `/* /index.html 200` in `_redirects` — Cloudflare rejects it as an infinite loop.)  
Functions scope: [`public/_routes.json`](../public/_routes.json) → only `/api/*`.

### Environment variables

**Build-time (Pages → Environment variables):**

| Variable | Value |
|----------|--------|
| `VITE_SITE_URL` | `https://gauravnagarkoti.tech` |
| `VITE_CONTACT_ENDPOINT` | `/api/contact` |
| `NODE_VERSION` | `22` |

**Runtime secrets (Functions — same Pages project):**

```env
TELEGRAM_ENABLED=true
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
GOOGLE_SHEETS_ENABLED=true
GOOGLE_SHEETS_WEBHOOK_URL=
GOOGLE_SHEETS_WEBHOOK_SECRET=
ALLOWED_ORIGINS=https://gauravnagarkoti.tech,http://localhost:5173
```

Leave tokens empty until ready — the API returns `202` and the site still works.

### Local

```bash
# Terminal A — API (Express, shares functions/lib)
cp server/.env.example server/.env   # fill when ready
npm run server:dev

# Terminal B — Vite (proxies /api → :8787)
npm run dev
```

Or Cloudflare-style:

```bash
cp .dev.vars.example .dev.vars
npm run pages:dev   # builds + wrangler pages dev on :8788
```

### Test

```bash
curl -s -X POST http://127.0.0.1:8787/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"Gaurav","email":"gaurav@test.com","message":"Testing contact API"}'
```

### Optional Express server

[`server/`](../server/) still works for Render/local Node. It imports the same logic from [`functions/lib/`](../functions/lib/). Prefer Cloudflare Pages Functions in production.

See also [`functions/README.md`](../functions/README.md).
