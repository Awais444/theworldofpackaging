# GEO checklist: manual, off-site tasks

AI assistants (ChatGPT, Claude, Perplexity, Gemini, Google AI Overviews) trust a business more when the same facts appear on many independent sites. These tasks are done by you, not in the code. The full plan with directories and targets is in `OFF_PAGE_SEO_PLAN.md`.

## Use exactly these facts everywhere

Copy them from the "Company facts" block on /about. They come from `src/config/site.ts`:

| Field | Value |
|---|---|
| Name | The World of Packaging |
| Former name | Anmol Printers (mention "formerly Anmol Printers" in descriptions) |
| Website | https://theworldofpackaging.com |
| Email | hello@theworldofpackaging.com |
| WhatsApp / phone | +92 327 4675886 |
| Address | TODO: add the factory address to `site.ts` first, then use it everywhere |
| Founded / experience | 2011 (TODO confirm), 15+ years in packaging |
| What we do | Packaging design, branding and box manufacturing under one roof; own factory; rigid and collapsible rigid boxes from MOQ 500; ships worldwide |

## Profiles to create or complete

- [ ] **Google Business Profile** at the factory address.
  - Categories: Packaging company, Printing service, Graphic designer.
  - Services list, 20+ real photos, weekly posts.
- [ ] **Bing Places:** import from Google.
- [ ] **Bing Webmaster Tools:**
  - Verify with `NEXT_PUBLIC_BING_SITE_VERIFICATION` and submit `/sitemap.xml`.
  - Set `INDEXNOW_KEY` and run `node scripts/indexnow.mjs` after each deploy.
- [ ] **Google Search Console:** verify (`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`) and submit `/sitemap.xml`.
- [ ] **Company and social profiles:**
  - LinkedIn company page, Instagram, Facebook, Pinterest, YouTube, X.
  - Behance and Dribbble, with real projects only.
  - Complete bio, link, logo and cover on each.
- [ ] **Add the social URLs** to `site.socials` in `site.ts`. They then appear in the footer and in the Organization `sameAs` schema.
- [ ] **B2B and manufacturer directories:** Europages, Kompass, TradeIndia/TradeKey, Pakistan chamber and business directories.
- [ ] **Agency directories:** Clutch, DesignRush, Sortlist, GoodFirms, The Manifest. Service focus "Packaging design".
- [ ] **Packaging directories:** PackagingConnections, Packaging Gateway and Packaging Europe supplier listings (where free).

## Ongoing

- [ ] Ask every finished client for a Google review, and reply to all reviews. Never buy or write reviews.
- [ ] Google Alerts for "The World of Packaging" and "Anmol Printers"; ask sites that mention us to add a link.
- [ ] Pin portfolio images on Pinterest with descriptive titles, linking to the matching service page.
- [ ] Check every quarter that the facts above still match on all profiles.
