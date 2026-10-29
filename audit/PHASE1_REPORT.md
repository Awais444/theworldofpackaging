# Phase 1 report: technical SEO and structured data

Production build, crawled with `scripts/seo-crawl.mjs`, schema checked with `scripts/validate-schema.mjs` (official schema.org vocabulary).
Data: `audit/crawl-after-phase1.csv`, `audit/crawl-summary-after-phase1.json` (before: `audit/crawl.csv`).

## Crawl: before → after

| Check (216 indexable URLs) | Before | After |
|---|---|---|
| Descriptions outside 140–155 chars | 162 | **0** |
| Titles over 60 chars / without brand | 0 / 0 | 0 / 0 |
| Pages with H1 count ≠ 1 | 0 | 0 |
| Canonical missing, relative or wrong | 0 | 0 |
| OG image / Twitter card missing | 0 / 0 | 0 / 0 (Twitter now `summary_large_image`, OG locale `en_US`) |
| Internal links that go through a redirect | 3 | **0** |
| Orphan pages | 1 (`/configure`) | **0** |
| Pages with < 3 contextual links in | 27 | **3** (`/privacy`, `/terms`: legal, footer only by design; `/team`: 2) |
| Duplicate titles / descriptions | 0 / 0 | 0 / 0 |
| Legacy redirects: chains / broken (50 checked) | 0 / 0 | 0 / 0 |
| Sitemap `lastmod` | build time | **last git commit of the page's content files** |
| Image sitemap | none | **`/sitemap/images.xml`: 52 pages, 237 images**, listed in the index |
| robots.txt AI crawlers | not named | GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, PerplexityBot, Google-Extended, Applebot-Extended, Bingbot allowed; `/cart`, `/checkout` disallowed |

## Schema validation

**0 errors** on 216 pages.

Types found: Question/Answer 1,162 · ListItem 830 · Organization, WebSite 216 · BreadcrumbList 215 · FAQPage 196 · PropertyValue 126 · Service 112 · ImageObject 91 · BlogPosting 46 · Product 17 · HowTo 3 (15 steps) · CollectionPage + ItemList 8 · ImageGallery 1.

New or changed:
- **Typing:** all builders in `src/lib/schema.ts` are typed with `schema-dts` (dev dependency, types only).
- **Organization:** adds `logo` and `alternateName` "Anmol Printers"; contactPoint and foundingDate as before. No `sameAs` until social URLs are filled in.
- **WebSite:** no SearchAction, because the site has no search page.
- **Service:** `areaServed` is now "Worldwide" by default, and the country on country pages. No offers.
- **Product (box style pages):**
  - `image` uses the main photo, with its caption.
  - `additionalProperty` comes from the visible spec table: board, wrap, print, MOQ and so on.
  - No offers or ratings.
- **BlogPosting:** `dateModified` (falls back to the published date), `mainEntityOfPage` and `image` (the post's OG image).
- **HowTo:**
  - `/how-it-works`: the six visible steps.
  - `/blog/what-is-a-dieline`: "How a dieline is made".
  - `/blog/how-to-measure-box-size`: the four measuring steps.
  - The step text lives in `src/content/blog/howToSteps.ts` and must be kept in step with the guides.
- **CollectionPage + ItemList on 8 hubs:** /packaging-design, /boxes, /rigid-boxes, /printed-boxes, /industries, /services, /countries and /blog.

## What changed (files)

- `src/lib/seo.ts`: `metaDescription()`.
  - Brings any description to 140–155 characters by adding true facts from `site.ts` it doesn't already mention: own factory and MOQ, 15+ years, ships worldwide, free quote, free design support.
  - Cuts long ones at a word boundary.
  - Applied to the metadata of all 37 page and layout files.
- `src/app/robots.ts`: AI crawler rules.
- `src/app/layout.tsx`: OG locale `en_US`, Twitter `summary_large_image`.
- **Sitemaps:**
  - `src/content/sitemapSections.ts`: content-based `lastmod`; `imageSitemap()`.
  - `src/app/sitemap/[id]/route.ts`: `/sitemap/images.xml`.
  - `src/app/sitemap.xml/route.ts`: index `lastmod` is the newest content date per section.
- **Content dates:** `scripts/gen-content-dates.mjs` writes `src/content/contentDates.json` and runs in `prebuild`. If a CI clone has no git history, it keeps the committed file.
- **Internal links:**
  - Design service pages link `/how-it-works`, `/factory`, `/pricing` and `/faq`.
  - Box pages link `/materials`, `/factory` and `/how-it-works`.
  - `/about` links `/team`, `/services/logo-design`, `/pricing` and `/configure`.
  - Box hubs and `/get-a-quote` link `/configure`.
  - `/how-it-works` links `/team`.
  - Six weakly linked design pages were added to related services on 15 other design pages.
  - Five guides were tagged to more services.
  - "Nearby countries" now rotate through the region, so every country page is linked.
- **Redirect fixes:** the homepage Packaging design card now links `/packaging-design`; the shipping guide links `/countries/united-states` and `/countries/united-kingdom`.
- **Schema:**
  - `src/lib/schema.ts`: typed; new `howTo()` and `collectionPage()`; richer `product()` and `article()`.
  - `src/components/seo/JsonLd.tsx`: accepts the typed objects.
- **New scripts:** `scripts/seo-crawl.mjs`, `scripts/validate-schema.mjs`. The schema.org vocabulary is cached in `.cache/`, which is gitignored.

## Not done, and why

- **`og:url`:** Next.js doesn't derive it from the canonical. It needs a per-page `openGraph.url`, which I'll add with the Phase 2 metadata pass. The canonical is correct on every page.
- **Trailing slash:**
  - `/about/` → `/about` uses Next's built-in **308**. Google treats it like a 301, and one URL form is enforced.
  - Making it a literal 301 needs custom middleware; say if you want that.
- **www ↔ apex:** set in Vercel's domain settings (choose the apex as primary, and Vercel redirects www in one hop). This can't be tested locally.
- **`/work?…` filter views:** the page is static, so query views share `/work`'s HTML and canonical (`https://theworldofpackaging.com/work`). A separate `noindex` per query isn't possible without making the page dynamic. The canonical is the standard fix, so I left it.
- **Thin pages** (`/contact`, `/start-a-project`, `/configure`, `/get-a-quote`, `/privacy`, `/terms`, `/team`, `/faq`, `/inserts`): the forms and legal pages are thin by nature. `/faq`, `/team` and `/inserts` get more content in Phase 2.
- **HowTo rich results:** Google stopped showing these in 2023. The markup still helps AI and answer engines understand the steps, so I kept it.
