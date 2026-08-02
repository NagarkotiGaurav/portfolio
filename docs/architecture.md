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

## Performance notes

- Route pages are `React.lazy` + `Suspense` in `App.jsx`; vendor chunk is `react` / `react-dom` / `react-router-dom`.
- Icons use inline SVGs in `components/Icon.jsx` (no Material Symbols webfont).
- Brand typography: Geist + Geist Mono via Google Fonts; latin Geist is preloaded in `index.html`.
- Images live in `public/images/` with explicit width/height; LCP candidates use `fetchPriority="high"`.

## Notes

Update this file when structure, routing, or major patterns change.
