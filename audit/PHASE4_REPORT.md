# Phase 4 report: performance

Production build (`next build && next start`), Lighthouse 12.2.1, default mobile throttling (simulated slow 4G, 4× CPU) and the desktop preset.
Raw data: `audit/lighthouse-before.md`, `audit/lighthouse-after.md`, `audit/bundle-after.txt`.

## Lighthouse: before → after

| URL | Mobile perf | Desktop perf | Mobile LCP | Mobile TBT | A11y (m) | BP (m) | SEO |
|---|---|---|---|---|---|---|---|
| / | 69 → **78** | 98 → **99** | 3.7 → 4.0 s | 787 → **402 ms** | 91 → 94 | 100 → 100 | 100 |
| /packaging-design | 84 → **91** | 100 → 100 | 4.1 → **3.5 s** | 174 → **80 ms** | 97 → **100** | 100 | 100 |
| /packaging-design/cosmetic-packaging-design | 58 → **79** | 97 → **100** | 4.4 → 5.1 s* | 1,400 → **82 ms** | 96 → **100** | 100 | 100 |
| /rigid-boxes/magnetic-closure | 63 → **90** | 99 → **100** | 4.1 → **3.6 s** | 1,100 → **51 ms** | 97 → **100** | 100 | 100 |
| /work | 63 → **87** | 99 → 99 | 4.0 → 4.1 s | 1,200 → **42 ms** | 100 | 100 | 100 |
| /countries/united-states | 83 → **94** | 99 → **100** | 4.0 → **3.1 s** | 228 → **28 ms** | 97 → **100** | 100 | 100 |
| /blog/what-is-a-dieline | 88 → **95** | 100 | 3.4 → **3.0 s** | 194 → **33 ms** | 100 | 100 | 100 |
| /get-a-quote | 83 → 79 | 100 | 3.8 → 4.2 s | 291 → 243 ms | 100 | 100 → 96 | 100 |

CLS is 0.000 on every page, before and after.

\*Lab results on this machine vary from run to run, because other apps (Photoshop, then Illustrator) were using RAM and CPU during the runs. Examples:
- The cosmetic page scored 91 in one complete pass and 76–79 in others.
- Re-runs of the homepage gave 57–61.

The table uses one complete 16-run pass, taken after the server was verified to serve the current build. **Confirm on the live site** with PageSpeed Insights, or `npm run lhci` in CI. Vercel adds a CDN, Brotli and HTTP/2, which this local server doesn't have.

## Bundle: first-load JS per page (gzip, legacy `noModule` polyfills excluded)

| Page | Before | After |
|---|---|---|
| / | ~396 KB | **207 KB** |
| /packaging-design | ~384 KB | **180 KB** |
| /packaging-design/cosmetic-packaging-design | ~356 KB | **180 KB** |
| /rigid-boxes/magnetic-closure | ~357 KB | **180 KB** |
| /work | ~359 KB | **216 KB** |
| /countries/united-states | ~355 KB | **179 KB** |
| /blog/what-is-a-dieline | ~350 KB | **174 KB** |
| /get-a-quote | ~389 KB | **220 KB** |

About 125 KB of every page is React and the Next.js runtime, which can't be removed.

**Before:** GSAP + ScrollTrigger (43 KB), Lenis (13 KB), full Framer Motion (46 KB), Zustand and the stores, all country data (38 KB) and all design-service copy (51–79 KB) shipped on every page.

**After:** GSAP only on `/collapsible-rigid-boxes` (the pinned signature animation); Zustand/Zod only on `/get-a-quote` and `/configure`; no content data in any client bundle.

## What changed

1. **Animation libraries**
   - `SmoothScroll` (root layout) no longer imports GSAP. Lenis loads with a dynamic `import()` on `requestIdleCallback`, and only for fine pointers without reduced motion (never on touch devices).
   - `Highlight` (the heading swoosh) and `FadeIn` now use a 20-line IntersectionObserver hook (`src/lib/useInViewOnce.ts`) with CSS transitions instead of Framer Motion. They look the same, start from a readable state, and stay still under reduced motion.
   - The homepage hero entrance is now CSS keyframes (`.hero-in`): no JS, so the H1 (the LCP) paints at once.
   - *How it works* ruler and the `/how-it-works` timeline: GSAP loads only when the section is near the viewport (`src/lib/useLazyGsap.ts`).
   - Framer Motion uses `LazyMotion`, with `m.*` components in 12 files. The `domAnimation` features load after hydration (`MotionProvider`); `/work` uses `domMax` locally for its layout animations.
2. **Content out of the browser:** client components no longer import content modules.
   - The header and mobile menu get their data from the server layout (`headerNav()`).
   - The hero photo, the design hub cards and the quote builder's country list are rendered or passed from server pages.
   - `quoteHref` and `designHref` live in `src/content/links.ts`, which has no imports.
3. **Stores:** `StoreHydration` moved from the root layout into the configurator and quote builder.
4. **Fonts:** Space Grotesk and Plus Jakarta Sans load as one variable `woff2` each (23 KB + 28 KB, preloaded, `display: swap`, latin subset, fallback metrics).
5. **Third party:** GA4 uses `lazyOnload` and still only after cookie consent.
6. **Headers** (`next.config.ts`):
   - HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy and X-Frame-Options.
   - A production CSP allowing only self, GA4 and the optional chat widget origin.
   - `/images` and `/brand` cached for 30 days with stale-while-revalidate. Not "immutable", because photos are replaced in place when real ones arrive.
   - `/_next/static` and optimised images are already immutable and cached for a year.
7. **Accessibility found in the audit:**
   - The heading highlight word is darker (#C25400, AA for large text; was 2.8:1).
   - The logo link's accessible name now matches its visible text.
8. **Lighthouse CI:**
   - `lighthouserc.json` covers the 8 URLs, mobile, with assertions perf ≥ 0.95, a11y ≥ 0.95, best-practices ≥ 0.95 and SEO = 1 (warnings for now).
   - Run it with `npm run lhci`.
   - `.github/workflows/lighthouse.yml` runs it on pull requests and never blocks a deploy.
9. **New scripts:**
   - `scripts/bundle-report.mjs` (`npm run bundle-report` against a running build): first-load JS per page.
   - `NEXT_BUILD_CPUS` caps build workers on low-memory machines.

## Pages still under 95 on mobile, and the next fix

| Page | Cause | Next fix |
|---|---|---|
| All pages (LCP floor ~3 s on simulated slow 4G) | LCP is the H1 or intro text, which paints at first paint. Under real throttling (Chrome, 4× CPU, 1.6 Mbps), LCP = FCP ≈ 2.1 s. What's left is the bytes before first paint: 26–76 KB of gzipped HTML, much of it the inline SVG illustrations repeated in the HTML and the RSC payload, plus 15 KB CSS and 51 KB fonts. | Serve the box illustrations as cached static `.svg` files via `<img>` instead of inline SVG in every card. This cuts HTML and RSC size, and DOM size (now up to 1,700 elements). It also stops mattering as real photos replace them. |
| / (78) | TBT 400 ms: the homepage is the heaviest page (14 client chunks, 1,700 DOM nodes). Turbopack also adds the dynamically imported GSAP chunk as an `async` script, so it still downloads at load (not render-blocking). | Make the How it works ruler a CSS scroll-driven animation (`animation-timeline: view()`, with a static fallback) so GSAP leaves the homepage entirely. Keep fewer homepage sections as client components. |
| /get-a-quote (79) | The multi-step quote builder (form library, Zod, Zustand, Framer) hydrates at load: 220 KB. | Load the builder with `next/dynamic` below the server-rendered heading. Move Zod validation to the server action only. |
| /work (87), /packaging-design/cosmetic (79 in this pass, 91 in another) | /work: the gallery and filter hydrate 84 items. Cosmetic: large page (1,000+ words, 6-image gallery, related blocks), plus run-to-run variance. | /work: render the gallery grid on the server and hydrate only the filter bar and lightbox. Both: verify on Vercel first. |

**Not done:** HTML `s-maxage` / stale-while-revalidate headers. Vercel already serves static pages from its edge cache, and a custom HTML `Cache-Control` could fight Next's own caching.
