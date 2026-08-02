# Deployment

## Local

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

Output: `dist/`

## Performance checklist (static hosting)

- Serve `dist/` behind a CDN with long-cache immutable hashes for `/assets/*`.
- Ensure HTML is not long-cached (or use stale-while-revalidate) so chunk hashes update.
- Prefer HTTP/2+; Google Fonts still require outbound access to `fonts.googleapis.com` / `fonts.gstatic.com` unless self-hosted later.

## Notes

Document hosting (e.g. Vercel/Netlify/S3+CDN), env vars, and CI when added.
