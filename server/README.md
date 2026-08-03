# Contact API — Telegram + Google Sheets (provider architecture)

Receives `POST /api/contact`, validates, normalizes a canonical **Lead**, then fans out to configured providers via `Promise.allSettled`.

Credentials can be empty — providers no-op until you set them. One provider failing never blocks the other.

```text
server/
  index.mjs
  controllers/contactController.js
  routes/contact.js
  services/
    index.js              # provider registry
    leadProvider.js       # interface docs
    telegram.js           # sendTelegramLead(lead)
    googleSheets.js       # appendLead(lead)
  validation/contactSchema.js
  utils/logger.js
  google-sheets-apps-script.js
```

**Never** put secrets in `VITE_*` vars.

---

## Environment

```env
TELEGRAM_ENABLED=true
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=

GOOGLE_SHEETS_ENABLED=true
GOOGLE_SHEETS_WEBHOOK_URL=
GOOGLE_SHEETS_WEBHOOK_SECRET=

ALLOWED_ORIGINS=https://gauravnagarkoti.tech
```

When tokens/URLs are blank, that provider is skipped. Fill them later and restart — delivery starts working.

---

## 1. Telegram (optional until ready)

1. [@BotFather](https://t.me/BotFather) → `/newbot` → token  
2. Message bot `/start` → `getUpdates` → chat id  
3. Set `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID`

---

## 2. Google Sheets (optional until ready)

1. Create a spreadsheet  
2. Extensions → Apps Script → paste [`google-sheets-apps-script.js`](./google-sheets-apps-script.js)  
3. Deploy → Web app (Me / Anyone) → copy URL → `GOOGLE_SHEETS_WEBHOOK_URL`  
4. Optional script property `WEBHOOK_SECRET` = `GOOGLE_SHEETS_WEBHOOK_SECRET`

| Timestamp | Name | Email | Phone | Company | Industry | Project | Budget | Timeline | Message | Source | Status |

Status starts as **New** → Contacted → Qualified → Proposal Sent → Won / Lost (manual in the sheet).

---

## 3. Local

```bash
cd server && cp .env.example .env && npm install && npm run dev
```

Root `.env`:

```bash
VITE_CONTACT_ENDPOINT=http://localhost:8787/api/contact
```

---

## Health

`GET /health` → `{ ok: true, providers: { telegram, googleSheets } }`
