# Phase 2 report: AEO and GEO

Production build, crawled with `scripts/seo-crawl.mjs`, schema checked with `scripts/validate-schema.mjs`.
Data: `audit/crawl-after-phase2.csv`, `audit/crawl-summary-after-phase2.json`.

## Before → after (217 indexable URLs; `/glossary` is new)

| Check | After Phase 1 | After Phase 2 |
|---|---|---|
| Pages with a 40–80 word answer-first lead under the H1 | 29 | **190** |
| Pages with a visible "Last updated" date | 13 | **156** |
| Schema errors | 0 | **0** (+ DefinedTermSet with 48 DefinedTerms) |
| `og:url` set | 0 | **all pages** |
| `/llms.txt`, `/llms-full.txt` | none | **both** (5,600 words of core-page text in the full file) |
| Descriptions 140–155 chars / one H1 / no duplicates / no orphans | ✓ | ✓ |

## Pages updated

- **Answer-first lead** (40–60 words, directly answering the page's main question; it replaces the old lead, so there's no extra paragraph). Source: `src/content/answers.ts`.
  - **50 design service pages:**
    - Kept the existing intro where it was already 40–60 words.
    - Otherwise: "{Service} is the design of …" plus the intro and factory facts.
  - **16 box style pages** (8 rigid, 8 printed): "A {box} is a …" from the style summary, plus how we make it (MOQ, digital proof, shipping).
  - **13 industry pages:** what the packaging has to handle (from the page's challenges), the intro and recommended formats.
  - **60 country pages:** "Yes: we design packaging for brands in {country} and make it in our own factory…" plus the country lead.
  - **46 guides:** the guide description plus "This guide covers {first three H2s}" and the editorial line.
  - **2 service pages** (`/services/brand-identity`, `/services/logo-design`).
- **Key facts `<dl>`:**
  - **New on 50 design service pages:** minimum order, first concepts, files you receive, production, approval, shipping.
  - **Already present:** box pages (MOQ, lead time, material, print chips) and country pages ("at a glance").
- **Visible "Last updated"** (`<time>`, the same date as the sitemap `lastmod` / `dateModified`):
  - 50 design service pages
  - 60 country pages
  - 46 guides (reviewed date when set, else the publish date)
- **Editorial line on every guide:** "Written by the packaging team at The World of Packaging; regulatory sections reviewed on {date}" (the second part only when a review date exists).
- **New `/glossary`:**
  - 48 terms: dieline, bleed, greyboard, E-flute, B-flute, SBS, kraft, GSM, foil stamping, embossing, debossing, spot UV, soft-touch, EVA insert, CMYK, Pantone, MOQ, DDP, FOB, EXW, volumetric weight and more.
  - Each term has an anchor id, a 1–2 sentence definition and a link to the page or guide that covers it.
  - A–Z jump links; `DefinedTermSet` schema; in the sitemap.
  - Linked from `/blog` and `/faq`.
- **"Terms in this guide"** on every guide: glossary terms found in the guide's text, linked to `/glossary#term`.
- **`/about` company facts block** (`<dl>`), from `src/lib/companyFacts.ts`:
  - name, former name, founded, experience, location, what we do, factory, box types, MOQ
  - approval ("digital proof and 3D mockup; we do not make physical samples")
  - shipping, quote reply, contact
  - The same list feeds `llms.txt`.
- **`og:url` on every page:** `ogFor(path)` in `src/lib/seo.ts` keeps the site name, `en_US` locale and type, because a page's `openGraph` replaces the layout's.
- **Bing and Google verification meta tags:** read from `NEXT_PUBLIC_BING_SITE_VERIFICATION` / `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`; not rendered while empty.
- **IndexNow:**
  - `/indexnow-key.txt` serves `INDEXNOW_KEY`, and returns 404 while it's unset.
  - `scripts/indexnow.mjs` pings every sitemap URL after a deploy.
  - Documented in `README.md` and `.env.example`.
- **`GEO_CHECKLIST.md`:** your manual tasks (Google Business Profile, Bing Places, Search Console/Bing verification, social profiles, directories, reviews), with the exact facts to use everywhere.

## Sample `/llms.txt` (start)

```
# The World of Packaging

> The World of Packaging (formerly Anmol Printers) is a packaging design and branding studio with its own box factory in Pakistan, with 15+ years in packaging. We design brands and packaging, make rigid and collapsible rigid boxes in-house from MOQ 500, print folding cartons, mailers, labels and pouches, and ship worldwide by air or sea to 190+ countries. Designs are approved as a digital proof and 3D mockup before print. Contact: hello@theworldofpackaging.com, WhatsApp +92 327 4675886.

## Company facts
- Name: The World of Packaging
- Formerly: Anmol Printers
- Founded: 2011
- Experience: 15+ years in packaging
...
## Packaging design services
- [Cosmetic Packaging Design](https://theworldofpackaging.com/packaging-design/cosmetic-packaging-design): Cartons, labels and gift boxes for beauty brands.
...
## Box styles we manufacture
## Industries
## Key guides
## Company
## Optional
- [Full text of core pages](https://theworldofpackaging.com/llms-full.txt): Plain-text version of the main pages
```

`/llms-full.txt` holds company facts, about, factory steps and QC, how it works, 15 design services (with formats, deliverables and 5 FAQs each), 10 box styles and the full FAQ.

## Not done in this phase (and why)

- **Answer leads on hubs and company pages:** 27 pages still have no 40–80 word lead. These are the hubs (`/packaging-design`, `/boxes`, `/industries`…), the forms, `/about`, `/factory`, `/faq` and the legal pages. Their hero text is a short intro; I can add answers there too if you want.
- **Question-led H2s:**
  - Not changed in guides: rewriting 46 guides' headings is an editorial change to body copy, best done by hand, and the plan's own rule says don't change copy meaning.
  - Service page templates already have FAQ sections with question headings.
- **"No duplicate FAQ answers across pages":** box, industry and design pages share some FAQs from common lists (`rigidCommonFaqs`, `industrySharedFaqs`, shared design FAQs). Making every page's FAQs unique means writing about 600 new answers; I suggest doing it per page type in Phase 2b, or with the on-page work (section 8b).
- **Comparison tables:** the comparison guides (rigid vs folding carton, Pantone vs CMYK and others) already carry their content in text. Converting them to `<table>` with `<caption>` is a body-copy edit, not done yet.
- **Glossary links on first mention inside guide text:** guides link their terms in the "Terms in this guide" block instead of inline. Inline auto-linking inside MDX risks wrong matches inside headings, links and code.
- **Author:** guides have an organisation author (schema + visible line). There's no named expert, since none is confirmed; add one to `site.ts` and I'll show it.
