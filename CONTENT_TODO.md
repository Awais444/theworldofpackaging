# Content to replace before launch

Everything below is a placeholder, an example figure, or wording that needs checking. Nothing here is presented on the site as a confirmed fact: placeholders are labelled on the page ("Sample project", "Placeholder testimonial", "Example rates", "Template · review with a lawyer", "To be verified").

Find them in code with `grep -rn "TODO" src` and `grep -rn "placeholder: true" src`.

## 1. Company identity — `src/config/site.config.ts`

Changing these updates the header, footer, metadata, OG images and JSON-LD everywhere.

- [ ] `name`, `shortName` — final company name
- [ ] `domain` (or `NEXT_PUBLIC_SITE_URL` in `.env`) — canonical URLs, sitemaps, OG images
- [ ] `email`, `whatsapp`, `address`
- [ ] `socials` — Instagram, LinkedIn, Behance, Pinterest (empty links are hidden)
- [ ] `facts.printedMoq` — printed box minimum (pages say "On quote" until set; also update `MOQ.printed` in `src/lib/pricing.ts`)
- [ ] `facts.rigidLeadTimeDays` — e.g. `[21, 28]` (pages say "Confirmed with quote" until set)
- [ ] `facts.firstConceptHours`, `facts.quoteReplyHours` — confirm 48 h / 24 h
- [ ] `currency.rates` — display exchange rates for the configurator

## 2. Prices and rates

- [ ] `src/lib/pricing.ts` → `RATES`: every unit, area, finish, insert, tooling, freight and sample rate. Set `ratesConfirmed: true` to remove the "Example rates" badges.
- [ ] `src/content/rigidStyles.ts` / `printedStyles.ts` → `priceTiers[].unitUsd` (tables show "On quote" while `null`)
- [ ] `src/content/agencyServices.ts` → `priceFrom` for all 10 services
- [ ] `src/content/packages.ts` → `priceFrom` for the 3 packages
- [ ] `src/content/shipping.ts` → freight comparison example figures (carton size, boxes per carton)
- [ ] `src/lib/schemas.ts` → budget bands in the forms
- [ ] Payment terms (deposit / balance): FAQ on `/pricing` and `/faq`

## 3. Placeholder records (`placeholder: true`)

- [ ] `src/content/caseStudies.ts` — 4 fictional case studies (shown with "Sample project" badge, noindex, excluded from sitemap). Replace with real projects; "Results" must use real, approved figures only.
- [ ] `src/content/testimonials.ts` — 3 placeholder quotes. Use real quotes with written permission.
- [ ] `src/content/company.ts` — team (4 role placeholders), machine list (generic types; add make/model/format)

## 4. Copy to write or confirm

- [ ] Studio story on `/studio-and-factory`; factory capacity figure
- [ ] Sustainability claims in `src/content/company.ts` (FSC / recycled board) and the materials FAQ — verify before publishing
- [ ] Industry compliance notes in `src/content/industries.ts` (placeholder on every industry page)
- [ ] Ship-to pages `src/content/shipTo.ts` — have a customs broker review
- [ ] Shipping / Incoterms wording on `/collapsible-rigid-boxes` FAQ; sample shipping wording on `/samples`
- [ ] Typical project durations (FAQ on `/process`)
- [ ] Blog publish dates in `src/content/blog/posts.ts`
- [ ] Privacy policy and terms (`/privacy`, `/terms`) — templates, need legal review and a "last updated" date

## 5. Integrations

- [ ] Form delivery: `src/app/actions/contact.ts` and `forms.ts` only log submissions. Connect email (e.g. Resend) and/or CRM.
- [ ] Payment: `/checkout` records an order request for invoicing. Connect a provider (e.g. Stripe) when ready.
- [ ] Analytics: set `NEXT_PUBLIC_GA4_ID` in `.env` (loads only after cookie consent).
- [ ] Brand font for OG images: add a TTF/OTF to `/assets` and pass it in `src/lib/og.tsx`.

## 6. Imagery

- [ ] Logo: replace the text `<Wordmark />` with the real logo file when ready.
- [ ] Photos: see `MEDIA_SLOTS.md` (111 slots). Every slot shows an illustration until a photo is added.
