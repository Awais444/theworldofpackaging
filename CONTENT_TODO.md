# Content to replace before launch

Everything below is a placeholder, an example figure, or wording that needs checking. Nothing here is shown on the site as a confirmed fact: placeholders are labelled on the page ("Sample project", "Placeholder", "TBC", "Example prices", "Example only", "To verify", "Template · legal review needed").

Find them in code with `grep -rn "TODO" src` and `grep -rn "placeholder: true" src`.

## 1. Company details: `src/config/site.ts`

Changing these updates the header, utility bar, footer, contact page, metadata, OG images and JSON-LD everywhere.

- [ ] `url` (or `NEXT_PUBLIC_SITE_URL` in `.env`): confirm the domain and TLD
- [ ] `email`; and `whatsapp`, `phone`, `address`, `hours` (all null now, so they are **hidden** site-wide; every WhatsApp button appears once `whatsapp` is set)
- [ ] `facts.sampleDays`: working days to a physical sample (hidden while null; shows in the promises row)
- [ ] `socials`: Instagram, LinkedIn, Facebook, Pinterest, Behance (empty links stay hidden)
- [ ] `facts.printedMoq`: printed box minimum (pages say "On quote" until set; also update `MOQ.printed` in `src/lib/pricing.ts`)
- [ ] `facts.rigidLeadTime`, `facts.printedLeadTime`: e.g. "3–4 weeks" (pages say "Confirmed with your quote" until set)
- [ ] `QUOTE_REPLY_HOURS` (24) and `facts.firstConceptHours` (48): confirm
- [ ] `currency.rates`: display exchange rates for the configurator
- [ ] Logo: replace the temporary wordmark with `/public/brand/logo.svg` (see `src/components/ui/Logo.tsx`)

## 2. Prices and rates

- [ ] `src/content/pricing.ts`: `designTiers` (Basic/Standard/Premium) and `designPricing` (Label, Box, Range, Brand + packaging). All show "Get a quote" while null.
- [ ] `src/content/designServices.*.ts`: optional `priceFrom` and `turnaround` per design service
- [ ] Confirm the wording "Design fee credited when we manufacture your order" (`designFeeNote` in `src/content/pricing.ts`)

- [ ] `src/lib/pricing.ts` → `RATES`: every unit, finish, insert, tooling, freight and sample rate. Set `ratesConfirmed: true` to remove the "Example prices" labels (configurator, samples, pricing).
- [ ] `src/content/rigidStyles.ts` / `printedStyles.ts` → `priceTiers[].unitUsd`
- [ ] `src/content/agencyServices.ts` → `priceFrom` for the 6 service pages (shows "Quoted per project")
- [ ] `src/content/packages.ts` → `priceFrom` for Box Ready, Launch and Full System
- [ ] `src/content/shipping.ts` → freight slider example figures (box size, boxes per carton)
- [ ] `src/lib/schemas.ts` → budget bands in the project form
- [ ] Payment terms (deposit / balance / methods): FAQ "How do I pay?" in `src/content/faqs.ts` and `/packages`

## 3. Placeholder records (`placeholder: true`)

- [ ] `src/content/caseStudies.ts`: 6 fictional projects. They are **not published** while `placeholder: true`; `/work` shows "Packaging we design and make" until a real project exists. Replace with real work; results must be real, approved figures.
- [ ] `src/content/testimonials.ts`: 3 placeholder quotes, **hidden** until real ones are added (homepage then shows them beside the FAQ). Use real quotes with written permission.
- [ ] Client logos: the homepage strip now lists what we make (`WhatWeMake` in `src/components/home/HomeSections.tsx`). Swap in real client logos with permission.
- [ ] `src/content/company.ts`:
  - [ ] `team`: 4 role placeholders (names, photos, bios)
  - [ ] `machines`: generic machine types; add make, model and format
  - [ ] `companyNumbers`: 4 "TBC" figures on `/about`
  - [ ] `story`: founding story on `/about`
  - [ ] `capacityNote`: real capacity on `/factory`

## 4. Wording to verify

- [ ] Regulatory notes on the 47 packaging design pages (`categoryNotes` marked `TODO verify` in `src/content/designServices.*.ts`)
- [ ] Amazon image and packaging rules on `/services/amazon-packaging-and-listing-images` and `/packaging-design/amazon-ecommerce-packaging-design`

- [ ] Sustainability: `sustainability` in `src/content/company.ts` (`/factory`), recycled/FSC card and FAQ in `src/content/optionPages.ts` (`/materials`), FAQ in `src/content/faqs.ts`
- [ ] Industry compliance notes: `COMPLIANCE_NOTE` in `src/content/industries.ts` (dashed "To verify" card on every industry page)
- [ ] CBD: "Child-resistant options on request" in `src/content/industryDetails.ts`. Remove if not offered.
- [ ] Shipping and customs: delivered-duty-paid availability (`/shipping` FAQs). Have a customs broker review.
- [ ] Sample lead time and shipping cost: FAQs on `/samples`
- [ ] Production lead time FAQs in `src/content/boxDetails.ts`
- [ ] Privacy policy and terms (`/privacy`, `/terms`): template text, needs legal review; set the "Last updated" date
- [ ] Blog publish dates for all 9 articles in `src/content/blog/posts.ts`

## 4b. Compliance guides (verify before launch)

- [ ] Have a qualified regulatory adviser review all 13 compliance guides in `src/content/blog/` (listed in `src/content/blog/compliancePosts.ts`). Each shows "Last reviewed: 28 October 2026"; update `REVIEWED` after the check.
- [ ] Re-check fast-moving topics every 6 months: CBD (US/UK/EU), MoCRA fragrance allergens, EU fragrance allergen list, sunscreen rules, EU green claims and packaging regulation, UK EPR.
- [ ] Confirm source links still work.

## 4c. Country pages (verify before launch)

- [ ] `src/content/countries.tier1.ts`: have a local adviser check the labelling summary, key points and authority for each of the 20 Tier 1 countries (all marked "Last reviewed: 28 October 2026"). Gulf pages (Kuwait, Qatar, Oman, Bahrain) cite only the GSO site; add each country's own authority link once confirmed.
- [ ] Confirm every official source link opens.
- [ ] Confirm region shipping ranges with shipping agent (`shippingByRegion` in `src/config/site.ts`). Per-country `shipping.air` / `shipping.sea` override them when added.
- [ ] `shipping.incoterms` per country (e.g. EXW, FOB, DDP): confirm which terms we offer.
- [ ] City notes: confirm the port and hub notes.
- [ ] City pages (`/countries/[slug]/[city]`, plan phase 2) are not built. Tier 1 city cards have no links for now; add pages only with genuinely local content.
- [ ] `src/content/countries.tier2.ts`: 40 Tier 2 countries. Have a local adviser check each labelling summary and key points, especially fast-changing rules: front-of-pack warnings (Mexico, Chile, Colombia, Argentina, Peru, Brazil, Israel, Sri Lanka), halal phase-in (Indonesia), China import labelling, India Legal Metrology.
- [ ] Tier 2 source links point to each authority's home page; confirm they open and add deeper guidance links where useful.
- [ ] `src/content/countries.tier3.ts`: 131 Tier 3 countries are live but **noindex, follow** and out of the sitemap, by design. A page becomes indexable once its labelling authority, an editorial market note and an air or sea shipping time are filled in (see `isIndexable` in `src/content/countries.ts`). Fill those per country, with a local adviser for the authority.
- [ ] Tier 3 currencies and official languages: spot-check before launch (e.g. Bulgaria now uses the euro; Zimbabwe uses ZiG).
- [ ] Excluded countries: North Korea, Iran, Syria, Cuba, Russia and Belarus have no page, pending an export and sanctions check. Add them only if you can legally ship there.

## 5. Media

- [ ] Real photos for the 189 image slots listed in `MEDIA_SLOTS.md`. Until then every slot shows a brand illustration.
- [ ] Optional: a 5–8 s muted video loop for the homepage hero (`home-hero` supports `video`)

## 6. Integrations (not connected yet)

- [ ] Form delivery: `deliver()` in `src/lib/submission.ts` only logs. Connect Resend (email notifications) and your CRM. All forms (quote, project, contact, newsletter, order request) go through it.
- [ ] Artwork uploads in the quote builder record file names only. Real uploads need storage (e.g. Vercel Blob or S3).
- [ ] Rate limiting in `src/lib/rateLimit.ts` is in-memory per server instance. Move to a shared store (e.g. Upstash Redis) if spam appears.
- [ ] Newsletter: connect an email list provider.
- [ ] Checkout (`/checkout`) records an order request only; no payment provider is connected.
- [ ] GA4: set `NEXT_PUBLIC_GA4_ID` in `.env` (loads only after the visitor clicks Accept).
- [ ] Optional chat widget: set `NEXT_PUBLIC_CHAT_WIDGET_SRC` (also loads only after Accept).
- [ ] OG images use a system sans-serif. Optionally load the Space Grotesk TTF in `src/lib/og.tsx`.
