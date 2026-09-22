# Architecture

## Stack

- React 18 + Vite
- React Router DOM
- Tailwind CSS 3

## Layout

```
src/
  pages/        # route screens
  components/   # shared UI
  hooks/        # shared hooks
  data/         # site content/config
  App.jsx       # router
  main.jsx      # entry
```

## Data flow

Static site content → `src/data` → pages/components → browser

Hire-intent service copy lives in `src/data/solutionPages.js`. Decision articles live in `src/data/articles.js`. Case studies live in `src/data/projects.js`. The commercial hire landing lives in `src/data/hirePage.js` (`/hire-software-architect`). Hub cards in `src/data/solutions.js` link to `/solutions/[slug]`. Route screens: `SolutionDetail.jsx`, `InsightDetail.jsx`, `WorkDetail.jsx`, `HireSoftwareArchitect.jsx`.

## Performance notes

- Route pages are `React.lazy` + `Suspense` in `App.jsx`; vendor chunk is `react` / `react-dom` / `react-router-dom`.
- Icons use inline SVGs in `components/Icon.jsx` (no Material Symbols webfont).
- Brand typography: Geist + Geist Mono via Google Fonts; latin Geist is preloaded in `index.html`.
- Images live in `public/images/` with explicit width/height; LCP candidates use `fetchPriority="high"`.

## Analytics

Client events go `track()` → `dataLayer` → GTM **GTM-T45H6MZF** → GA4. SPA page views are explicit `virtual_page_view` from `usePageMeta` after `document.title` is set. Helpers and the PII allowlist live in `src/lib/analytics.js`. See `docs/AnalyticsStrategy.md`.
