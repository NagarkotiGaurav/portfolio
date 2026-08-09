# Cloudflare Pages Functions — Contact API
#
# Deployed automatically with the Pages project (no separate Worker).
#
#   functions/api/contact.js  →  POST/GET https://gauravnagarkoti.tech/api/contact
#
# Structure:
#   functions/
#     api/contact.js          # Pages Function entry
#     lib/                    # reusable lead logic (Telegram, Sheets, validation)
#
# Secrets (Pages → Settings → Environment variables / Secrets):
#   TELEGRAM_ENABLED=true
#   TELEGRAM_BOT_TOKEN=
#   TELEGRAM_CHAT_ID=
#   GOOGLE_SHEETS_ENABLED=true
#   GOOGLE_SHEETS_WEBHOOK_URL=
#   GOOGLE_SHEETS_WEBHOOK_SECRET=
#   ALLOWED_ORIGINS=https://gauravnagarkoti.tech,http://localhost:5173
#
# Local (after npm run build):
#   npx wrangler pages dev dist --port 8788
#
# Frontend should call same-origin /api/contact (default).
