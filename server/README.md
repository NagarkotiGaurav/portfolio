# Contact API (Express local / optional Render)

Production path is **Cloudflare Pages Functions** — see [`../functions/`](../functions/).

This Express app is a thin wrapper around the same `functions/lib` logic for local Node testing.

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

Root Vite proxies `/api` → `http://127.0.0.1:8787` by default.
