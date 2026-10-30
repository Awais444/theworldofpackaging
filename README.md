# The World of Packaging: website

Next.js (App Router) marketing site. The build plan is in `CLAUDE.md`, and the SEO/GEO/AEO plan in `SEO_GEO_AEO_PERFORMANCE_PROMPT.md`.

```bash
npm install
npm run dev        # development
npm run build      # production build (prebuild: blur placeholders + content dates)
                   # low-memory machine: NEXT_BUILD_CPUS=1 npm run build
npm run lint
```

## SEO scripts

Run these against a production build (`npm run build && npx next start -p 3100`):

| Command | What it does |
|---|---|
| `node scripts/seo-crawl.mjs http://localhost:3100 audit` | Crawls every sitemap URL and internal link. Writes `crawl.csv` and `crawl-summary.json`: titles, descriptions, H1s, canonicals, JSON-LD types, links in/out, answer-first leads, FAQs, dates. |
| `node scripts/validate-schema.mjs http://localhost:3100` | Checks every JSON-LD block against the schema.org vocabulary (cached in `.cache/`). |
| `node scripts/check-overflow.mjs http://localhost:3100` | No horizontal scroll at 360–414 px. |
| `node scripts/check-images.mjs http://localhost:3100` | Served vs rendered image width and bytes vs budget on the 8 audited pages. |
| `INDEXNOW_KEY=… node scripts/indexnow.mjs` | After a deploy, pings IndexNow with every sitemap URL. The same `INDEXNOW_KEY` must be set on Vercel so `/indexnow-key.txt` serves it. |

## Generated at build time

- **`/sitemap.xml`:** index of the section sitemaps plus `/sitemap/images.xml`. `lastmod` comes from `src/content/contentDates.json`, the last git commit per content file, written by `scripts/gen-content-dates.mjs`.
- **`/llms.txt` and `/llms-full.txt`:** company summary, key URLs and the plain text of the core pages, built from content files (`src/lib/llms.ts`).
- **`/robots.txt`:** allows all crawlers, including named AI crawlers.
- **Blur placeholders:** `scripts/gen-blur.mjs` writes `src/content/blurData.json`.

## Environment

See `.env.example`. The verification tags (`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_BING_SITE_VERIFICATION`) and `INDEXNOW_KEY` are optional; nothing renders while they are empty.

## SEO/Performance maintenance

### Adding a page

1. **Metadata** (`export const metadata` or `generateMetadata`):
   - `title`: 60 characters or fewer, primary keyword first. The layout adds " | The World of Packaging".
   - `description: metaDescription("…")` from `src/lib/seo.ts`, which brings it to 140–155 characters with true site facts.
   - `alternates: { canonical: "/path" }` and `openGraph: ogFor("/path")`. A page's `openGraph` replaces the layout's, so always use `ogFor`.
   - Add an `opengraph-image.tsx` for a new route group (see the existing ones; under 300 KB).
2. **One `<h1>`** containing the primary keyword. Right below it, a 40–60 word answer to the page's main question (see `src/content/answers.ts`).
3. **Schema** from `src/lib/schema.ts`, rendered with `<JsonLd data={…} />`:
   - `breadcrumbList` on inner pages.
   - `faqPage` wherever an FAQ is visible (same text).
   - `service`, `product`, `howTo`, `collectionPage` or `article` as fits.
   - Never add offers, prices or ratings without real data.
4. **Sitemap:** add the URL to `src/content/sitemapSections.ts`, with the content files it's built from (they drive `lastmod`). Noindex pages stay out.
5. **Links:** at least 3 links to the new page from related pages' content (not just nav/footer), plus 3–8 contextual links out.
6. **Client components:** never import from `src/content/*` (except `links.ts`) or `components/media/Media` in a `"use client"` file, or the content data ships to every visitor. Pass data or rendered elements in from the server page.

### Adding photos

1. Convert with sharp: WebP, 2400 px + 1200 px (`-1200.webp`), quality 75–80, under 600 KB.
2. Add the photo to `src/content/photos.ts` with an alt of 8–16 words: what is visible + format + material/finish, no third-party brand names, unique.
3. Map it to slots in `src/content/media.ts`. Each slot's `page` feeds the image sitemap.
4. Run `npm run build`: `scripts/gen-blur.mjs` adds its blur placeholder.
5. Only the first visible image on a page gets `priority`; set `sizes` to the real layout width.

### Checks before a release

Build, start on port 3100, then:

```bash
node scripts/seo-crawl.mjs http://localhost:3100 audit
node scripts/validate-schema.mjs http://localhost:3100
node scripts/check-images.mjs http://localhost:3100
node scripts/check-overflow.mjs http://localhost:3100
npm run bundle-report
npm run lhci
```

Targets:
- **Crawl:** 0 titles over 60 characters; descriptions 140–155; one H1; no orphans.
- **Schema:** 0 errors.
- **Images:** 0 over budget.
- **First-load JS:** ~180 KB or less on content pages.
- **Lighthouse:** 95+ across the board on mobile.

After each deploy, run `INDEXNOW_KEY=… node scripts/indexnow.mjs`.
