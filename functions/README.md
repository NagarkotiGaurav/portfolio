# Contact API

Production (Cloudflare CI with `npx wrangler deploy`):

- Entry: [`../worker.js`](../worker.js)
- Shared logic: [`lib/`](./lib/)

Optional Pages Functions entry (if you switch to `wrangler pages deploy`):

- [`api/contact.js`](./api/contact.js)

Secrets: `TELEGRAM_*`, `GOOGLE_SHEETS_*`, `ALLOWED_ORIGINS` (Worker / Pages env).
