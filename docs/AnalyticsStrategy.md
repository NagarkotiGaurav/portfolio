# Analytics Strategy

Events align with experience language (intent + scene + action).

```js
track({ intent: 'trust', scene: 'work', action: 'case_study_open' })
```

## Categories
Business · UX · SEO · Conversion · Performance

## Examples
| Event | When |
| --- | --- |
| `cta_strategy_call` | Primary CTA click |
| `nav_route` | Internal navigation |
| `case_study_open` | Work detail interest |
| `contact_submit` | Form success |
| `hero_complete` | Hero timeline finished |

Implementation: `src/lib/analytics.js`.

## Google Analytics 4 (optional)

1. Create a GA4 property and copy the Measurement ID (`G-XXXXXXXX`).
2. Set build env `VITE_GA_MEASUREMENT_ID=G-XXXXXXXX` (Cloudflare / local `.env`).
3. Redeploy. `initAnalytics()` in `main.jsx` loads gtag; `track()` forwards events when `gtag` exists.

Until the env var is set, analytics stays console/logger-only.
