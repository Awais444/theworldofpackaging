# The World of Packaging: website

Next.js (App Router) marketing site. The build plan is in `CLAUDE.md`, and the SEO/GEO/AEO plan in `SEO_GEO_AEO_PERFORMANCE_PROMPT.md`.

```bash
npm install
npm run dev        # development
npm run build      # production build (prebuild: blur placeholders + content dates)
npm run lint
```

## SEO scripts

Run these against a production build (`npm run build && npx next start -p 3100`):

| Command | What it does |
|---|---|
| `node scripts/seo-crawl.mjs http://localhost:3100 audit` | Crawls every sitemap URL and internal link. Writes `crawl.csv` and `crawl-summary.json`: titles, descriptions, H1s, canonicals, JSON-LD types, links in/out, answer-first leads, FAQs, dates. |
| `node scripts/validate-schema.mjs http://localhost:3100` | Checks every JSON-LD block against the schema.org vocabulary (cached in `.cache/`). |
| `node scripts/check-overflow.mjs http://localhost:3100` | No horizontal scroll at 360–414 px. |
| `INDEXNOW_KEY=… node scripts/indexnow.mjs` | After a deploy, pings IndexNow with every sitemap URL. The same `INDEXNOW_KEY` must be set on Vercel so `/indexnow-key.txt` serves it. |

## Generated at build time

- **`/sitemap.xml`:** index of the section sitemaps plus `/sitemap/images.xml`. `lastmod` comes from `src/content/contentDates.json`, the last git commit per content file, written by `scripts/gen-content-dates.mjs`.
- **`/llms.txt` and `/llms-full.txt`:** company summary, key URLs and the plain text of the core pages, built from content files (`src/lib/llms.ts`).
- **`/robots.txt`:** allows all crawlers, including named AI crawlers.
- **Blur placeholders:** `scripts/gen-blur.mjs` writes `src/content/blurData.json`.

## Environment

See `.env.example`. The verification tags (`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_BING_SITE_VERIFICATION`) and `INDEXNOW_KEY` are optional; nothing renders while they are empty.
