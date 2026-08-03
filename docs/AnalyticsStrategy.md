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

Implementation: `src/lib/analytics.js` (console/debug until vendor wired).
