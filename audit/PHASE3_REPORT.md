# Phase 3 report: images

## Weight: before → after

| | Before | After |
|---|---|---|
| Files in `public/images` | 181 | 181 |
| Total source weight | 24.91 MB | **23.41 MB** |
| Sources over 600 KB | 4 | **0** |
| Images actually downloaded on the 8 audited pages (mobile 412 px @1.75x + desktop 1440 px) | — | 172 images, **1,515 KB in total** |
| Served wider than 2× rendered width | — | **0** |
| Over budget (hero 180 KB, card 60 KB, thumb 40 KB) | — | **0** |
| Format served | WebP/AVIF | **AVIF** (WebP fallback), `Cache-Control: max-age=31536000` |
| OG images (8 checked) | — | 44–55 KB each (limit 300 KB) |

**Re-encoded sources** (quality 75; the two noisiest also capped in size):

| File | Before | After |
|---|---|---|
| `design/chocolate-bars-on-wood.webp` (now 1800 px, q65) | 1,701 KB | 536 KB |
| `design/cosmetic-tubes.webp` | 802 KB | 328 KB |
| `design/protein-bar-wrappers.webp` | 701 KB | 584 KB |
| `printed/minimal-candle-carton.webp` | 675 KB | 586 KB |

## What changed

- **`next.config.ts` images:**
  - `formats: avif, webp` (already set)
  - `deviceSizes [360, 480, 640, 768, 1024, 1280, 1600, 1920]`
  - `imageSizes [64, 96, 128, 256, 384]`
  - `minimumCacheTTL` one year
- **Already in place from earlier work (checked, unchanged):**
  - `sizes`: set on every `next/image`, and the measurement above shows none is oversized.
  - Priority: only the first, above-the-fold image per page has `priority`/`fetchPriority="high"`; the rest load lazily.
  - Blur placeholders: every photo, built from `scripts/gen-blur.mjs`.
  - Dimensions: every image is `fill` inside an aspect-ratio box or has intrinsic width/height (CLS 0).
  - File names: kebab-case.
  - Product schema: `ImageObject` with `contentUrl` and `caption`.
  - Image sitemap: `/sitemap/images.xml`.
- **Alt text:** all 96 photos reviewed in **`audit/alt-text-review.csv`** (file, slots/pages, old alt, new alt, word count).
  - 13 rewritten:
    - 11 were outside 8–16 words.
    - One named a printed slogan ("Sealed with love").
    - One said "mock-up".
  - All 96 are now 8–16 words, unique, describe what's visible plus format and material, and contain no third-party brand names.
  - The portfolio uses the same alts (they come from `photos.ts`).
- **Illustrations are decorative now:** the 360 slots still showing an illustration are `aria-hidden`. Before, they announced a photo description ("stack of finished boxes") for a picture that isn't there.
- **New `scripts/check-images.mjs`:** for each of the 8 audited pages, on mobile and desktop, it reports the served width vs rendered width × DPR and the bytes vs budget. Re-run it after adding photos.
- **Build on low-memory machines:** `NEXT_BUILD_CPUS=1 npm run build` caps Next's build workers. This machine had ~1.7 GB free, and 7 workers ran out of memory while rendering OG images; Vercel's default is unchanged.

## Not done, and why

- **SVG illustrations as static files (6.10):** the 25+ box illustrations are React SVG components with colour-variant props, reused across hundreds of slots. They contain no base64 rasters. Exporting each variant as a separate SVGO-optimised file would multiply files without a measurable gain, because they ship inside JS chunks that every page already loads. They become irrelevant as real photos replace them. The bigger performance cost is the JS itself (Phase 4).
- **Captions:** the `<figure>` slots have no visible `<figcaption>`, to keep the design unchanged. Captions are in the image sitemap and Product schema.
