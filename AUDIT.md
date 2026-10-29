# Phase 0 audit: SEO, GEO, AEO, images and performance

Run on 2026-10-30 against a production build (`next build && next start`, port 3100). Report only: nothing on the site was changed.
Raw data: `audit/lighthouse-before.md`, `audit/crawl.csv` (one row per URL), `audit/crawl-summary.json`. Crawler: `scripts/seo-crawl.mjs`.

## Summary

| Area | State | Main gap |
|---|---|---|
| Lighthouse desktop | 97–100 performance on all 8 pages | — |
| Lighthouse mobile | **58–88 performance** (target 95) | ~390–435 KB gzip JS on every page; TBT up to 1.4 s; LCP 3.4–4.4 s |
| Accessibility | 91–100 | orange highlight word contrast 2.8:1; logo link label mismatch; `<dl>` structure on /get-a-quote |
| Best practices / SEO (Lighthouse) | 100 / 100 everywhere | — |
| Technical SEO crawl | clean basics on 216 indexable URLs | 162 descriptions outside 140–155 chars; no image sitemap; lastmod = build time; robots.txt lacks AI crawler rules |
| Structured data | present, valid JSON | no Product, HowTo, ItemList/CollectionPage, DefinedTermSet yet; no schema-dts types |
| AEO / GEO | partial | answer-first lead on 29 of 216 pages; last-updated date on 13; no `llms.txt`, glossary or company facts block |
| Images | 181 files, 24.9 MB | 4 sources over 600 KB; 360 of 525 slots still illustrations, each exposing a photo-style alt |

## 1. Lighthouse (Lighthouse 12.2.1, default throttling)

| URL | Device | Perf | A11y | BP | SEO | LCP | CLS | TBT | FCP | SI |
|---|---|---|---|---|---|---|---|---|---|---|
| / | mobile | 69 | 91 | 100 | 100 | 3.7 s | 0.000 | 787 ms | 1.6 s | 3.0 s |
| / | desktop | 98 | 91 | 100 | 100 | 0.9 s | 0.000 | 117 ms | 0.4 s | 0.8 s |
| /packaging-design | mobile | 84 | 97 | 100 | 100 | 4.1 s | 0.000 | 174 ms | 1.2 s | 1.5 s |
| /packaging-design | desktop | 100 | 97 | 100 | 100 | 0.8 s | 0.000 | 0 ms | 0.3 s | 0.5 s |
| /packaging-design/cosmetic-packaging-design | mobile | 58 | 96 | 100 | 100 | 4.4 s | 0.000 | 1.4 s | 1.8 s | 2.7 s |
| /packaging-design/cosmetic-packaging-design | desktop | 97 | 96 | 100 | 100 | 1.1 s | 0.000 | 97 ms | 0.5 s | 1.1 s |
| /rigid-boxes/magnetic-closure | mobile | 63 | 97 | 100 | 100 | 4.1 s | 0.000 | 1.1 s | 1.6 s | 2.5 s |
| /rigid-boxes/magnetic-closure | desktop | 99 | 97 | 100 | 100 | 0.9 s | 0.000 | 64 ms | 0.4 s | 0.8 s |
| /work | mobile | 63 | 100 | 100 | 100 | 4.0 s | 0.001 | 1.2 s | 1.6 s | 2.7 s |
| /work | desktop | 99 | 100 | 100 | 100 | 0.9 s | 0.000 | 3 ms | 0.4 s | 0.5 s |
| /countries/united-states | mobile | 83 | 97 | 100 | 100 | 4.0 s | 0.000 | 228 ms | 1.3 s | 1.3 s |
| /countries/united-states | desktop | 99 | 97 | 100 | 100 | 0.8 s | 0.000 | 0 ms | 0.4 s | 0.5 s |
| /blog/what-is-a-dieline | mobile | 88 | 100 | 100 | 100 | 3.4 s | 0.000 | 194 ms | 1.1 s | 1.3 s |
| /blog/what-is-a-dieline | desktop | 100 | 100 | 100 | 100 | 0.8 s | 0.000 | 0 ms | 0.3 s | 0.4 s |
| /get-a-quote | mobile | 83 | 100 | 100 | 100 | 3.8 s | 0.000 | 291 ms | 1.0 s | 1.3 s |
| /get-a-quote | desktop | 100 | 93 | 100 | 100 | 0.8 s | 0.000 | 0 ms | 0.3 s | 0.4 s |

INP is not measured in a lab run; TBT is the lab stand-in.

**LCP element per page** (Lighthouse 12.2.1 could not read the element from this Chrome version, so it was taken with a PerformanceObserver at 412×823 in Chrome):

| Page | LCP element |
|---|---|
| / | H1 "Packaging design that sells. Made in our own factory." |
| /packaging-design | hero image (illustrated carton on its dieline) |
| /packaging-design/cosmetic-packaging-design | intro paragraph |
| /rigid-boxes/magnetic-closure | main gallery image (green magnetic box) |
| /work | first Featured project card image |
| /countries/united-states | H1 |
| /blog/what-is-a-dieline | H1 |
| /get-a-quote | intro paragraph |

So the LCP is mostly text that paints early. The mobile LCP of 3.4–4.4 s and the low scores come from the main thread being busy with JavaScript, not from images or layout shift (CLS is 0 everywhere).

**Failing mobile audits, by number of the 8 pages:**
- LCP, Max potential FID, Time to Interactive, main-thread work (6.2 s): 8/8
- Unused JavaScript (~80 KB per page): 8/8
- Total Blocking Time: 6/8; JS execution time (up to 2.8 s): 5/8
- `label-content-name-mismatch`: 8/8. The logo link's `aria-label="The World of Packaging, home"` doesn't start with its visible text.
- `color-contrast`: 5/8. The orange highlight word in headings (#E66400) is 2.8:1 on its background; AA needs 4.5:1 (3:1 for large text).
- DOM size (up to ~1,700 elements): 5/8
- `definition-list` and `dlitem` on /get-a-quote: the summary `<dl>` contains other elements.
- Back/forward cache blocked: 1/8.

## 2. Bundle

The build uses Turbopack, where `@next/bundle-analyzer` does not work, so chunks were measured from `.next/static/chunks` (gzip) and from the scripts each page's HTML loads.

**Largest client chunks**

| gzip | raw | Contents |
|---|---|---|
| 70.0 KB | 223 KB | React DOM and the Next runtime (most likely; `useForm` matched by name only) |
| 51.3 KB | 188 KB | app/vendor code |
| 46.0 KB | 136 KB | Framer Motion |
| 45.3 KB | 164 KB | app code (forms) |
| 43.4 KB | 112 KB | **GSAP + ScrollTrigger** |
| 38.7 KB | 110 KB | app code |
| 37.9 KB | 156 KB | app code |
| 31.7 KB | 110 KB | Zod |
| 15.3 KB | 40 KB | Zustand stores |
| 13.1 KB | 43 KB | **Lenis** |

37 chunks, 606 KB gzip in total.

**First-load JS per page (gzip):**
- `/`: 435 KB
- `/packaging-design`: 423 KB
- `/get-a-quote`: 428 KB
- other audited pages: 388–398 KB

The target is under 170 KB.

**What loads where:** GSAP + ScrollTrigger, Framer Motion, Lenis and Zustand load on **every** page, including pages with no GSAP animation (blog, countries, work). Zod loads on /get-a-quote. All of this comes from the root layout and shared providers (smooth scroll, motion, store hydration), not from the components that need it.

## 3. Images

**Files**
- 181 files in `public/images`, **24.9 MB** in total: 85 at 2400px and 96 at 1200px.
- **Over 600 KB (re-encode at quality 75):**
  - `design/chocolate-bars-on-wood.webp` (1,701 KB)
  - `design/cosmetic-tubes.webp` (802 KB)
  - `design/protein-bar-wrappers.webp` (701 KB)
  - `printed/minimal-candle-carton.webp` (675 KB)

**Largest 20 files (KB)**

| KB | File |
|---|---|
| 1701 | `design/chocolate-bars-on-wood.webp` |
| 802 | `design/cosmetic-tubes.webp` |
| 701 | `design/protein-bar-wrappers.webp` |
| 675 | `printed/minimal-candle-carton.webp` |
| 568 | `design/stand-up-pouch-coffee.webp` |
| 550 | `design/coffee-pouch-yellow.webp` |
| 481 | `design/chocolate-wrap-illustrated.webp` |
| 438 | `design/chocolate-bars-on-wood-1200.webp` |
| 411 | `design/coffee-bags-brick.webp` |
| 402 | `printed/soap-window-folding-cartons.webp` |
| 401 | `design/coffee-pouch-desk.webp` |
| 365 | `design/coffee-pouches-yellow.webp` |
| 364 | `industries/coffee-brand-packaging-range.webp` |
| 360 | `design/chocolate-wrap-bird.webp` |
| 360 | `design/serum-bottles-illustrated-cartons.webp` |
| 344 | `printed/coffee-shop-shelf.webp` |
| 340 | `industries/handmade-soap-packaging-set.webp` |
| 332 | `design/mailer-bag-custom-tape.webp` |
| 324 | `design/brochure-stickers.webp` |
| 315 | `design/shampoo-conditioner-bottles.webp` |

**Dimensions:** every rendered photo goes through `next/image`, either with `fill` inside an aspect-ratio box (`Media`) or with intrinsic width and height (portfolio). No image is missing dimensions, and CLS is 0 on all audited pages.

**`sizes`:** set on every `Media` and gallery image. Lighthouse flagged "properly size images" on 1 of 8 pages (16 KB saving). The "served width > 2× rendered" check per image is not done yet: it needs a browser pass (Phase 3).

**Priority:** the first or hero image gets `priority` on:
- the homepage
- page heroes
- design service pages
- box galleries (first image only)
- case study covers

There are no `priority` flags below the fold.

**Alt text**
- **Photos:** 249 photo slots and portfolio items. None are empty, filename-like or "image of". Lengths are 5–18 words, with 7 over 16 words. The same alt repeats where one photo is reused in several slots (51 groups); those need unique alts in Phase 3.
- **Illustration slots:** **360 of 525 slots** still show an illustration but expose an alt written for a future photo (e.g. "Magnetic Closure Box: stack of finished boxes", "…hero pack on a Pale Silver background"). Screen readers announce a photo that isn't there. These should become `alt=""` + `aria-hidden`, or a short description of the illustration.
- **Image sitemap:** none (`/sitemap/images.xml` returns 404).

## 4. SEO crawl (`scripts/seo-crawl.mjs`)

**URLs crawled:** 360, from all sitemaps plus every internal link found.
- 357 return 200: 216 indexable and 141 noindex (131 Tier 3 countries and 10 sample case studies, as designed).
- All 216 indexable URLs are in the sitemap, and no noindex URL is in it.

**Clean (no issues found):**
- no title over 60 characters; every title has the brand
- no missing description
- exactly one H1 on every page
- canonical present on every page, absolute, and matching the page
- OG image and Twitter card on every page
- BreadcrumbList on every indexable inner page
- JSON-LD parses everywhere
- no duplicate titles or descriptions
- no broken internal links
- 50 legacy redirects checked: all 301 in one hop to a 200, no chains
- unknown slugs return a real 404 (/packaging-design, /rigid-boxes, /countries, /blog, /work)
- `<html lang="en">`

**Issues:**
- **Descriptions:** 162 of 216 are outside the 140–155 character target (none over 155; most are shorter).
- **Links that go through a redirect:**
  - Homepage Services card → `/services/packaging-design` (should be `/packaging-design`)
  - `shipping-rigid-boxes-internationally.mdx` → `/ship-to/usa` and `/ship-to/uk`
- **Orphan:** `/configure` has no internal links in.
- **Internal links:** 27 indexable pages have fewer than 3 contextual links in (links inside `<main>`, not nav or footer). Examples: `/factory`, `/faq`, `/how-it-works`, `/team`, `/materials`, `/inserts`, `/about` (1–3 each).
- **Thin pages (under 300 words):** `/contact` (92), `/start-a-project` (90), `/configure` (127), `/terms` (123), `/privacy` (137), `/team` (187), `/get-a-quote` (187), `/faq` (222, its answers sit in tabs), `/inserts` (264).
- **Sitemap `lastmod`:** this is the build time, not content dates.
- **robots.txt:** allows all and lists the sitemap. It still needs:
  - `Disallow: /cart` and `/checkout`. Those now redirect, so this is optional.
  - explicit rules for GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, PerplexityBot, Google-Extended, Applebot-Extended and Bingbot.
- **Trailing slash:** `/about/` → `/about` is a **308**, not a 301. Fine for Google, but it isn't the 301 the plan specifies. The www ↔ apex redirect is set in Vercel and was not testable locally.
- **Not present yet:** `llms.txt`, `llms-full.txt`, an `msvalidate` meta tag, an IndexNow key, `/glossary`, `schema-dts` types, and Product / HowTo / ItemList / CollectionPage / DefinedTermSet schema.

**JSON-LD found today (typical page):** Organization, WebSite, BreadcrumbList, FAQPage. Also:
- Service on design and service pages
- Article/BlogPosting on guides
- ImageGallery on /work

## 5. AEO / GEO content

Indexable pages by type:
- **Lead 40–80:** has a 40–80 word answer-first paragraph right after the H1.
- **Avg links in:** average contextual links in per page.

| Type | Pages | Lead 40–80 | FAQ | Last updated | Author / org line | Avg words | Avg links in |
|---|---|---|---|---|---|---|---|
| /countries/* | 60 | 0 | 60 | 0 | 0 | 1,076 | 26 |
| /packaging-design/* | 50 | 28 | 50 | 0 | 0 | 909 | 41 |
| /blog/* | 46 | 0 | 38 | 13 | 46 | 1,560 | 14 |
| /industries/* | 13 | 0 | 13 | 0 | 0 | 459 | 9 |
| /printed-boxes/* | 9 | 0 | 9 | 0 | 0 | 753 | 92 |
| /rigid-boxes/* | 8 | 0 | 8 | 0 | 0 | 832 | 77 |
| /services/* | 2 | 0 | 2 | 0 | 0 | 459 | 3 |
| hubs and company pages | 28 | 1 | 18 | 0 | 0 | 90–1,934 | 0–356 |

**Gaps to close in Phase 2:**
- **Answer-first block:** missing on all box, industry, country and guide pages, and on 22 of 50 design pages.
- **Last-updated date:** shown on only 13 guides; no service, box or country page has one.
- **Author or editorial line:** guides have an author in their schema, but no visible "Written by our packaging team / reviewed on…" line. No other page type has attribution.
- **FAQ:** missing on 8 guides, plus `/about`, `/factory`, `/contact`, `/team`, `/work`, `/blog` and the forms. `/faq` itself has FAQPage schema.
- **Company facts:** no `<dl>` facts block on `/about` for AI assistants to quote.
- **Industry pages:** short (average 459 words, target 700–1,000) and weakly linked (9 links in on average).

## Suggested order for Phase 1

1. Fix the 3 redirecting internal links and the `/configure` orphan.
2. robots.txt AI crawler rules; image sitemap; content-based `lastmod`.
3. Bring descriptions to 140–155 characters.
4. Product, HowTo, CollectionPage/ItemList schema with `schema-dts` types, plus a validation script.
5. noindex for `/work?…` filter views, keeping the canonical on `/work`.
