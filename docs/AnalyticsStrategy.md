# Analytics Strategy

Events align with experience language (intent + scene + action).

```js
track({ intent: 'trust', scene: 'work', action: 'case_study_open' })
```

## Google Tag Manager

Container **GTM-T45H6MZF** is installed in `index.html` (head script + body noscript) and therefore on every prerendered route.

In GTM, add:

1. **GA4 Configuration** tag (your `G-` measurement ID) — fire on All Pages.
2. **History Change** trigger *or* Custom Event `virtual_page_view` — this is an SPA; the first page load alone will miss later routes.
3. Optional: Custom Event tags for `lead_created`, `cta_strategy_call` (already pushed to `dataLayer` from `track()`).

Do **not** also load gtag.js via `VITE_GA_MEASUREMENT_ID` while GTM is present — that double-counts.

## Categories
Business · UX · SEO · Conversion · Performance

## Examples
| Event | When |
| --- | --- |
| `virtual_page_view` | Client-side route change |
| `cta_strategy_call` | Primary CTA click |
| `nav_route` | Internal navigation |
| `case_study_open` | Work detail interest |
| `contact_submit` / `lead_created` | Form success |
| `hero_complete` | Hero timeline finished |

Implementation: `src/lib/analytics.js` (`dataLayer.push`).
