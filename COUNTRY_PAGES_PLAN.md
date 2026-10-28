# Country Pages Plan: The World of Packaging

Goal: country landing pages for packaging design + box manufacturing buyers worldwide, similar in reach to awaiskhadim.com (/usa, /uk, /countries, 189 countries) but **every page must have genuinely country-specific content** so Google does not treat them as thin/doorway pages. Write 100% original copy; do not copy awaiskhadim.com.

---

## 1. URL structure

```
/countries                         Hub: all countries, grouped by region, search + filter
/countries/[slug]                  Country page, e.g. /countries/united-states, /countries/uae
/countries/[slug]/[city]           City pages (Tier 1 only, phase 2)
```
- 301 redirect existing `/ship-to/[country]` pages to `/countries/[slug]`.
- Slugs: full English name, kebab-case (`united-kingdom`, `saudi-arabia`, `south-africa`, `new-zealand`).
- Keep short aliases as redirects: `/usa` → `/countries/united-states`, `/uk` → `/countries/united-kingdom`, `/uae` → `/countries/uae`.

---

## 2. Tiers (content depth)

| Tier | Countries | Content | Index |
|---|---|---|---|
| **Tier 1: core markets** (~20) | United States, United Kingdom, Canada, Australia, UAE, Saudi Arabia, Germany, France, Netherlands, Ireland, Singapore, Malaysia, Kuwait, Qatar, Oman, Bahrain, New Zealand, South Africa, Sweden, Pakistan | Full page, 1,200–1,800 words, hand-checked facts, city sections, guides | index |
| **Tier 2: active markets** (~40) | Rest of EU (Italy, Spain, Belgium, Denmark, Norway, Finland, Switzerland, Austria, Poland, Portugal, Greece…), Japan, South Korea, Hong Kong, Philippines, Thailand, Indonesia, Vietnam, Turkey, Egypt, Jordan, Nigeria, Kenya, Morocco, Brazil, Mexico, Chile, Colombia, Sri Lanka, Bangladesh, Israel, etc. | Medium page, 700–1,000 words, data-driven sections + 1 unique editorial paragraph | index |
| **Tier 3: all other countries** (~130) | Every remaining country in the 195-country list | Shorter page, 400–600 words, built only from verified data fields that differ per country | **index only if all required data fields are filled; otherwise `noindex, follow`** and listed on the hub |

Start with Tier 1, then Tier 2, then Tier 3.

---

## 3. Data model (src/content/countries.ts)

```ts
type Country = {
  slug: string; name: string; iso2: string;            // flag from iso2 (local SVG, not a CDN)
  tier: 1 | 2 | 3;
  region: "North America" | "Europe" | "Middle East" | "Asia" | "Oceania" | "Africa" | "Latin America";
  currency: { code: string; symbol: string };           // e.g. USD, GBP, AED
  languages: string[];                                   // official/label languages
  measurement: "metric" | "imperial" | "both";
  labelling: {                                           // country-specific, Tier 1/2 hand-written
    authority: string;                                   // e.g. "FDA", "Food Standards Agency", "SFDA", "ESMA"
    summary: string;                                     // 2–4 sentences, original, TODO verify
    keyPoints: string[];                                 // 3–6 bullets
    sourceUrls: string[];                                // official links
    lastReviewed: string;
  };
  shipping: {
    air: string | null;                                  // "5–7 business days" (TODO from logistics)
    sea: string | null;                                  // "25–35 days"
    collapsibleTip: string;                              // why flat-packed rigid saves cost for this route
    incoterms: string[];                                 // e.g. ["EXW","FOB","DDP"] (TODO confirm)
  };
  marketNotes: string;                                   // original paragraph: what product brands there typically need
  topIndustries: string[];                               // link to industry + service pages
  recommendedBoxes: string[];                            // slugs of box styles
  recommendedServices: string[];                         // packaging-design service slugs
  cities?: { slug: string; name: string; note: string }[]; // Tier 1
  faqs: { q: string; a: string }[];                      // 4–6, at least 2 country-specific
  caseStudySlugs?: string[];
  guideSlugs?: string[];                                 // e.g. uk-packaging-labelling-requirements
};
```
Tier 3 required fields for indexing: name, region, currency, languages, measurement, labelling.authority, shipping.air or shipping.sea, marketNotes. If any is missing → noindex.

---

## 4. Country page template (`/countries/[slug]`)

1. Breadcrumbs: Home / Countries / {Country}
2. **Hero**: flag + eyebrow "{Region}", H1 "Packaging Design & Custom Boxes for {Country} Brands", lead (country-specific), buttons Get a Free Quote + WhatsApp (pre-filled "Hi, I'm in {Country} and need packaging…"), trust chips: MOQ 500 · Own factory · Ships to {Country} by air & sea.
3. **At a glance** card (grid of 6): Currency · Label language(s) · Units · Labelling authority · Air shipping time · Sea shipping time. Missing values show "Confirmed with your quote".
4. **Packaging design for {Country}**: why brands there choose us (3 cards, using marketNotes + topIndustries).
5. **Labelling & compliance in {Country}**: summary + key points + official source links + "Last reviewed" + disclaimer ("We lay out the text you supply; final regulatory review stays with you"). Tier 3: short version.
6. **Shipping to {Country}**: air vs sea table, collapsible rigid saving note, incoterms, packing (assembled vs flat). Link to /shipping.
7. **Popular packaging for {Country} brands**: 4–6 ProductCards (recommendedBoxes) + service chips (recommendedServices).
8. **Industries we serve in {Country}**: chips → industry + service pages.
9. **Cities** (Tier 1): short cards; phase 2 links to city pages.
10. **Recent work** (if caseStudySlugs) else hide.
11. **Guides for {Country}** (if guideSlugs) else hide.
12. **FAQ** (4–6, FAQPage schema).
13. **Nearby countries**: 6 links in same region (internal linking).
14. CTA band.

No "Top 10 packaging designers in {Country}" lists; no invented clients, prices or delivery times.

---

## 5. Countries hub (`/countries`)
- H1 "We design and ship packaging to brands worldwide".
- Search box + region tabs (All, North America, Europe, Middle East, Asia, Oceania, Africa, Latin America).
- Featured: Tier 1 as large cards with flag + air/sea time.
- All countries as an alphabetical, region-grouped list of links (flag + name).
- Shipping explainer strip (air vs sea, collapsible saving) + CTA.

---

## 6. Navigation & linking
- Header utility bar: small "Ships to 190+ countries" link → /countries (only once all pages exist; until then "Ships worldwide").
- Footer: "Countries we serve" column with top 10 Tier 1 + "View all countries".
- Mega-menu (Packaging Design, bottom strip): "Countries we serve".
- Every service page: "Popular regions" block with 8 relevant Tier 1 countries (not alphabetical!). Note: awaiskhadim.com shows Andorra/Angola here by mistake; ours must use the service's relevant markets.
- Country page ↔ matching guides, services, boxes, nearby countries.

---

## 7. SEO
- Title: "Packaging Design & Custom Boxes in {Country} | The World of Packaging" (trim to ≤60 chars when needed; Tier 1 can use "Packaging Design {Country}").
- Meta description: country-specific (currency/labelling/shipping mention), ≤155 chars.
- Schema: BreadcrumbList, FAQPage, Service with `areaServed` = Country, Organization.
- `hreflang` not needed (single English site).
- Sitemap: separate `sitemap/countries.xml`; include only indexable pages.
- Unique OG image per country (flag + country name in brand style) via opengraph-image.tsx.

---

## 8. Build order for Claude Code
1. Data model + `/countries` hub + template + redirects from `/ship-to/*`.
2. Tier 1 (20 countries): hand-written marketNotes, labelling (with official sources, TODO verify), cities, FAQs.
3. Tier 2 (~40 countries).
4. Tier 3 (remaining countries) with the indexing rule.
5. Linking updates (service "Popular regions", footer, mega-menu), sitemap, OG images.
After each step: lint, build, list new URLs, add all unverified facts to CONTENT_TODO.md under "verify".
