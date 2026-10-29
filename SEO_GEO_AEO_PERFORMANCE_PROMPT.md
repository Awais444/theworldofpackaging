# SEO + GEO + AEO + Images + Performance (95+) — Build Prompt

> Save in the project root and tell Claude Code:
> **"Read SEO_GEO_AEO_PERFORMANCE_PROMPT.md and work through it phase by phase (section 9). Start with Phase 0 (audit) and stop after each phase with the report described there."**

---

## 0. Ground rules
- Do not change the visual design, copy meaning or URLs unless a section below says so. Every URL change needs a 301 redirect.
- Never invent facts (reviews, ratings, client names, awards, prices, delivery times). Use only `site.ts` values and confirmed content; anything unknown stays a TODO.
- No new paid services. New dev dependencies are OK only for: `@next/bundle-analyzer`, `@lhci/cli`, `sharp` (already used), `schema-dts` (types only). Ask before anything else.
- After every phase: `npm run lint`, `npm run build`, and the checks listed for that phase.

---

## 1. Phase 0 — Audit (report only, no changes)
Produce `AUDIT.md` with:
1. **Lighthouse (mobile + desktop)** for: `/`, `/packaging-design`, `/packaging-design/cosmetic-packaging-design`, `/rigid-boxes/magnetic-closure`, `/work`, `/countries/united-states`, `/blog/<one guide>`, `/get-a-quote`. Use `npx lighthouse` against `next build && next start` (production mode). Record Performance, Accessibility, Best Practices, SEO, and LCP, CLS, INP/TBT, FCP, Speed Index, plus the LCP element per page.
2. **Bundle**: run `@next/bundle-analyzer`; list the largest client chunks and which pages load GSAP, ScrollTrigger, Framer Motion, Lenis.
3. **Images**: total count in `public/images`, total size, largest 20 files, images without width/height, images missing alt or with weak alt (filename-like, "image", empty on non-decorative), images rendered larger than needed (`sizes` missing or wrong).
4. **SEO crawl**: script that builds the full URL list from all sitemaps + `generateStaticParams` and reports per URL: status, title (length), meta description (length), H1 count, canonical, robots, OG image, JSON-LD types, word count, internal links in/out, duplicate titles/descriptions, orphan pages (no internal links in), broken internal links, redirect chains.
5. **Content for AEO/GEO**: which pages lack an answer-first summary, FAQ, last-updated date, or author/organisation attribution.
Stop and send me the summary.

---

## 2. Technical SEO (Phase 1)
1. **Metadata** (`generateMetadata` everywhere):
   - Title ≤ 60 chars, pattern `{Primary keyword} | The World of Packaging`; unique on every page.
   - Description 140–155 chars, unique, includes the primary keyword + one concrete benefit (own factory, MOQ 500, 15+ years, ships worldwide) + soft CTA.
   - `alternates.canonical` absolute (`https://theworldofpackaging.com/...`), trailing-slash policy consistent with `next.config` (pick one, redirect the other).
   - `openGraph` (type, url, title, description, siteName, locale `en_US`, images 1200×630) and `twitter` (`summary_large_image`).
   - `robots`: index,follow by default; `noindex,follow` for `/design-system`, `/cart`, `/checkout`, thank-you/success pages, filtered `/work?…` views (canonical to `/work`), Tier 3 countries without data (existing rule).
2. **Headings**: exactly one H1 per page containing the primary keyword; logical H2/H3 order; no headings used just for styling.
3. **Sitemaps**: `/sitemap.xml` index + section sitemaps (already present). Include only indexable 200 URLs, with real `lastModified` from content files (not build time). Add `/sitemap/images.xml` (image sitemap entries for portfolio + product images with title/caption).
4. **robots.txt**: allow all; disallow `/api/`, `/cart`, `/checkout`, `/design-system`; list sitemap index. Explicitly allow AI crawlers we want for GEO: `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `Claude-User`, `PerplexityBot`, `Google-Extended`, `Applebot-Extended`, `Bingbot`.
5. **Redirects**: all old URLs (`/services/*`, `/ship-to/*`, `/samples`, short country aliases) 301 → final URL in one hop; no chains. `www` → apex (or the reverse) in one hop (note for Vercel domain settings).
6. **Internal linking**: every page ≥ 3 contextual internal links in; no orphans. Service ↔ related services ↔ guides ↔ box styles ↔ industries ↔ countries, per SEO_CONTENT_PLAN.md. Breadcrumbs on all inner pages.
7. **Status codes**: real 404 for unknown slugs (`notFound()`), custom 404 page with search links.
8. **Hreflang**: not needed (single English site); set `<html lang="en">`.
9. **Pagination / filters**: `/work` and `/blog` filter states are client-side; canonical to the base page.

---

## 3. Structured data (Phase 1)
Typed with `schema-dts`, rendered as JSON-LD in server components, values from `site.ts`/content only:
- **Organization** (site-wide): name, alternateName "Anmol Printers", url, logo, foundingDate, contactPoint (WhatsApp/phone, sales, Worldwide, English/Urdu), sameAs (only filled social URLs), address (when confirmed).
- **WebSite** with `SearchAction` only if site search exists (otherwise omit).
- **BreadcrumbList** on every inner page.
- **Service** on each `/packaging-design/*`, `/services/*`: serviceType, provider (Organization @id), areaServed (Worldwide; country pages: that country), offers only if a real price exists.
- **Product** on box style pages: name, description, image, brand (Organization), additionalProperty (MOQ, board thickness, materials). No `offers`/`aggregateRating` unless real data exists.
- **FAQPage** wherever an FAQ is visible (same text as on page).
- **HowTo** on `/how-it-works` and dieline/measuring guides (steps match visible content).
- **Article/BlogPosting** on guides: headline, datePublished, dateModified, author (Organization or named expert when provided), image.
- **ImageGallery / ImageObject** on `/work` portfolio.
- **CollectionPage / ItemList** on hubs (packaging-design, boxes, industries, countries, blog).
Validate every type with a script against schema.org vocab and report errors; fix all.

---

## 4. AEO — Answer Engine Optimization (Phase 2)
Goal: pages are easy to quote in Google featured snippets, People Also Ask, voice and AI answers.
1. **Answer-first block** at the top of every service, box, industry, country and guide page (below H1): 40–60 words that directly answer the page's main question ("What is cosmetic packaging design?" / "What is a magnetic closure box?"), using the primary keyword once. Render as a visually subtle lead paragraph, not a callout.
2. **Key facts box** on service/box/country pages: a short definition list (MOQ, lead time if known, materials, finishes, file formats, regions shipped). Use `<dl>` so it's machine-readable.
3. **Question-led H2s**: on guides and service pages, convert 3–5 H2s to real questions people search ("How much does packaging design cost?", "What files do I get?"), each followed by a 1–2 sentence direct answer, then detail.
4. **FAQs**: 5–8 per page, real questions, answers 40–80 words, first sentence answers directly. Pull candidate questions from the GSC query list in SEO_CONTENT_PLAN.md. No duplicate FAQ answers across pages (each page's FAQs specific to that page).
5. **Comparison tables** where useful (rigid vs folding carton, air vs sea, assembled vs collapsible, Pantone vs CMYK) as real HTML `<table>` with `<caption>`.
6. **Glossary**: create `/glossary` with 40+ packaging terms (dieline, bleed, greyboard, E-flute, SBS, foil stamping, debossing, spot UV, soft-touch, EVA insert, CMYK, Pantone, MOQ, DDP, FOB, EXW…), each with a 1–2 sentence definition, an anchor id, and links to relevant pages. `DefinedTermSet` schema. Link terms from guides on first mention.
7. **Last updated** date visible on guides, service pages and country pages (from content `updatedAt`), mirrored in `dateModified`.

---

## 5. GEO — Generative Engine Optimization (Phase 2)
Goal: AI assistants (ChatGPT, Claude, Perplexity, Gemini, Google AI Overviews) understand and cite us correctly.
1. **`/llms.txt`** (plain text at site root): one-paragraph summary of the company (who we are, Anmol Printers heritage, 15+ years, own factory, rigid + collapsible rigid boxes, MOQ 500, packaging design + branding, ships to 190+ countries, contact), then sectioned lists of our most important URLs with one-line descriptions (services, box styles, industries, key guides, countries hub, about, contact). Also generate **`/llms-full.txt`** with the plain-text content of core pages (home, about, factory, how-it-works, top 15 services, top 10 box pages, FAQ). Build both from content files at build time.
2. **Consistent entity facts**: one source (`site.ts`) for name, founding year, experience, MOQ, location, contact, services. Same wording on home, about, footer, schema, llms.txt. Add a short "Company facts" block on `/about` (definition list) that AIs can quote.
3. **About & trust pages**: `/about` with history (Anmol Printers → The World of Packaging), what we make, where, who for; `/factory` with capabilities; team page with roles. Add an editorial policy line on guides ("Written by our packaging team; regulatory sections reviewed on {date}").
4. **Citable content**: guides include specific, verifiable details (materials, specs, steps) and link to official sources (FDA, GOV.UK, EUR-Lex, TTB, GS1). Short quotable summary sentences at the start of sections.
5. **Clean HTML for crawlers**: all main content server-rendered (no text that only appears after JS/animation); no content hidden behind tabs without being in the HTML; meaningful link text (no "click here").
6. **Bing**: add `msvalidate` meta placeholder (Bing feeds several AI assistants) and IndexNow key file + a small script to ping IndexNow on deploy (document in README; don't add secrets).
7. **Mentions checklist** (document only, in `GEO_CHECKLIST.md`): Google Business Profile, LinkedIn company page, Behance/Dribbble profiles, packaging directories, consistent NAP. I will do these manually.

---

## 6. Images (Phase 3)
1. **Formats & sizes**: keep sources in `public/images` at max 2400px. Let `next/image` serve AVIF + WebP: `images.formats = ['image/avif','image/webp']`, `deviceSizes` [360, 480, 640, 768, 1024, 1280, 1600, 1920], `imageSizes` [64, 96, 128, 256, 384], `minimumCacheTTL` 31536000.
2. **`sizes` on every `<Image>`** matching the real layout (e.g. cards `(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw`; hero `(min-width:1024px) 50vw, 100vw`). No image should download wider than ~2× its rendered width. Report any image whose served width > 2× rendered.
3. **Priority**: only the LCP image per page gets `priority` / `fetchPriority="high"`; everything else lazy. Remove `priority` from below-the-fold images.
4. **Placeholders**: generate tiny blur placeholders (`plaiceholder`-style via sharp at build into `media.ts` as `blurDataURL`) for all photos; `placeholder="blur"`.
5. **Dimensions**: every image has intrinsic width/height (or `fill` inside an aspect-ratio box) so CLS = 0.
6. **File budget**: hero ≤ 180 KB served (AVIF), cards ≤ 60 KB, gallery thumbs ≤ 40 KB at their rendered size. Re-encode any source over 600 KB at quality 75.
7. **Alt text** (rewrite all in `media.ts` / `portfolio.ts`):
   - Describe what is visible + the packaging format + material/finish when visible, 8–16 words, no "image of", no keyword stuffing, no brand names of third parties.
   - Include the page's topic naturally where true (e.g. "Green skincare cartons stacked, matte print with debossed logo").
   - Decorative images/illustrations: `alt=""` and `aria-hidden` where appropriate.
   - Unique alt per image; flag duplicates.
8. **File names**: keep descriptive kebab-case (already done); no spaces/uppercase.
9. **Image SEO extras**: `ImageObject` in Product/Article schema with `contentUrl`, `caption`; image sitemap (section 2.3).
10. **SVG illustrations**: inline only when animated; otherwise as optimized static SVG files (SVGO), no inline base64 rasters.
11. **OG images**: `opengraph-image.tsx` per route group, 1200×630, < 300 KB.

---

## 7. Performance — target Lighthouse ≥ 95 mobile on all audited pages (Phase 4)
Targets (mobile, Lighthouse/CrUX): **LCP < 2.0 s, CLS < 0.05, INP < 200 ms, TBT < 150 ms**, total JS on first load < 170 KB gzip for marketing pages.
1. **Rendering**: all marketing pages static (SSG/ISR). Mark only interactive pieces as `'use client'`; keep sections as server components. Remove `'use client'` from layout/page files where not needed.
2. **Animation libraries**:
   - Load GSAP + ScrollTrigger only in components that use them, via `next/dynamic` / dynamic `import()` inside `useEffect`, after first paint and only when the section is near the viewport (IntersectionObserver).
   - Framer Motion: use `LazyMotion` + `domAnimation` features and `m.` components instead of `motion.`; no Framer in server components.
   - Lenis: load after `requestIdleCallback`; disable on touch devices and reduced motion.
   - No animation may delay or hide the LCP element (hero text/image visible at first paint, animate from visible state).
3. **Fonts**: `next/font/google` with `display: 'swap'`, `preload` only for the two families/weights used above the fold (Space Grotesk 700, Plus Jakarta 400/600); subset `latin`; `adjustFontFallback`. Remove unused weights.
4. **CSS**: Tailwind content paths correct (purge), no unused global CSS, no large CSS-in-JS at runtime.
5. **JavaScript**: run bundle analyzer; remove dead code and unused deps; split mega-menu, quote builder, lightbox, configurator, country search into dynamic chunks loaded on interaction; avoid importing whole icon sets (named lucide imports only); `country-flag-icons` imported per flag, not the whole set.
6. **Third-party**: GA4 and chat widgets only after cookie consent, loaded with `next/script strategy="lazyOnload"`; no third-party on first paint.
7. **Above the fold**: hero has no client-side data fetching; the proof bar renders on the server.
8. **Caching/headers** (`next.config` headers): long cache for `/_next/static`, `/images`, fonts (`public, max-age=31536000, immutable`); HTML `s-maxage` with stale-while-revalidate. Add security headers (HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, a CSP that allows only what we load) — Best Practices ≥ 95.
9. **INP**: debounce filter/search handlers, avoid layout thrash in scroll handlers (use transform/opacity only), passive listeners, no heavy work in `onScroll`.
10. **CLS**: reserve space for images, mega-menu (overlay, not pushing content), cookie banner (fixed, doesn't shift layout), fonts (fallback metrics).
11. **Lighthouse CI**: add `lighthouserc.json` and an npm script `lhci` that runs on the 8 audited URLs with assertions: performance ≥ 0.95 (mobile), accessibility ≥ 0.95, best-practices ≥ 0.95, seo = 1.0. Add a GitHub Action to run it on pull requests (document; don't block deploys yet).

---

## 8. Accessibility (supports SEO + Best Practices)
- Colour contrast AA everywhere (check orange highlight text, muted text, footer links).
- Visible focus states, skip link, landmarks, aria on menus/accordions/tabs/lightbox, form labels and errors.
- `prefers-reduced-motion` respected for every animation.

---

## 8b. On-page SEO checklist (apply to every indexable page in Phase 1–2)
For each page, read its primary + supporting keywords from SEO_CONTENT_PLAN.md (or assign one and add it to the plan) and make sure:
1. **Keyword placement**: primary keyword in title (near start), H1, first 100 words, one H2, URL slug, meta description, and the main image alt. Supporting keywords in H2/H3s and FAQs naturally. No keyword stuffing (primary keyword density roughly 0.5–1.5%).
2. **One page per keyword**: no two pages target the same primary keyword (keyword cannibalisation). Produce `keyword-map.csv` (url, primary keyword, supporting keywords, title, H1) and flag conflicts; fix by re-targeting or merging with a 301.
3. **Content depth**: service pages 900–1,500 words, box pages 700–1,200, industry 700–1,000, guides 1,500–2,500, country Tier 1 1,200+. Thin pages (< 300 words of unique text) listed in the report with a plan.
4. **Unique content**: no paragraph repeated across pages except shared CTA/footer blocks. Run a near-duplicate check (shingle similarity) across templated pages (services, boxes, industries, countries) and rewrite anything > 60% similar.
5. **Readability**: short paragraphs (2–4 sentences), descriptive subheadings every 200–300 words, bullet lists for specs, plain English.
6. **E-E-A-T signals**: 15+ years / Anmol Printers heritage, own factory, real process details, team page link, contact details, last-updated dates, sources on guides.
7. **Internal links**: 3–8 contextual links per page with descriptive anchor text (the target's keyword, varied), plus related-content blocks. Every new page gets links from at least 3 existing pages.
8. **External links**: guides link to 2–5 authoritative sources (open in same tab, no nofollow for official sources).
9. **CTAs**: one primary CTA per section, WhatsApp pre-filled message per page.
10. **URL hygiene**: lowercase, hyphens, no stop-word clutter, ≤ 5 words where possible; existing URLs unchanged unless redirected.
11. **Media**: every page has at least one relevant photo with descriptive alt and caption where useful.
Report: `onpage-report.csv` (url, keyword, title len, desc len, H1 ok, word count, internal links in/out, similarity score, issues).

## 9. Phases & reports
- **Phase 0**: Audit → `AUDIT.md` summary. Stop.
- **Phase 1**: Technical SEO + structured data → crawl report (before/after), schema validation results. Stop.
- **Phase 2**: AEO + GEO (answer blocks, FAQs, glossary, llms.txt, llms-full.txt, about facts) → list of pages updated, sample llms.txt. Stop.
- **Phase 3**: Images → before/after total image weight, list of rewritten alts (CSV `alt-text-review.csv`: file, page, old alt, new alt), any images over budget. Stop.
- **Phase 4**: Performance → Lighthouse table (before/after, mobile + desktop) for the 8 URLs, bundle size before/after, what was changed. If any page is still < 95 mobile, explain the cause and the next fix. Stop.
- **Final**: update `CONTENT_TODO.md` (facts I must confirm), `GEO_CHECKLIST.md` (my manual off-site tasks), README section "SEO/Performance maintenance" (how to add a page with correct metadata, schema, images and alt text).
