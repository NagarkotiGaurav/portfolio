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
not_found_handling = "single-page-application"
```

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
