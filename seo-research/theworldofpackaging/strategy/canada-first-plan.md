# Canada-first keyword and page plan

Date: 24 Nov 2026. Built from `research/competitors/canada-vs-usa.md` (19 queries, US-only web search; no search volumes yet). Priority is a judgement from what ranks and how weak it is, not from volume data. Re-rank once Search Console data arrives.

Rule: **one intent = one URL.** Every keyword group below maps to a single page.

## 1. Keyword groups → pages (Canada)

| # | Keyword group (examples) | Intent | Target URL | Status | Priority |
|---|---|---|---|---|---|
| C1 | custom rigid boxes Canada, rigid gift boxes Ontario, luxury boxes Toronto | commercial | `/rigid-boxes` | exists, add Canada block | **P1** |
| C2 | collapsible rigid boxes Canada, foldable rigid boxes | commercial | `/collapsible-rigid-boxes` | exists; `/rigid-boxes/collapsible` must point here (canonical) | **P1** |
| C3 | magnetic closure boxes Canada, magnetic gift boxes | commercial | `/rigid-boxes/magnetic-closure` | exists | **P1** |
| C4 | custom packaging Toronto, packaging company Toronto | local | `/countries/canada` (+ Google Business Profile) | exists, strengthen Toronto/GTA content | **P1** |
| C5 | packaging design company Canada / Toronto | hire | `/packaging-design` | exists; decide vs `/services/packaging-design` | **P1** |
| C6 | custom printed boxes Canada, product boxes small business | commercial | `/printed-boxes` | exists | P2 |
| C7 | custom cosmetic boxes Canada | commercial | `/industries/cosmetics` | exists, add Canada notes | P2 |
| C8 | Canadian packaging labelling requirements, bilingual labels Canada | informational | **new blog: Canada labelling guide** (CPLA, bilingual English/French, net quantity, Cosmetic Regulations; wording to verify) | **missing** | **P1** |
| C9 | best custom packaging companies Canada, how to choose a box supplier Canada | commercial investigation | **new blog: Canada buying guide** (honest checklist, no ranking of ourselves) | missing | P2 |
| C10 | custom packaging low minimum Canada, MOQ | commercial | `/pricing` or FAQ section | check overlap with `/packages` | P2 |
| C11 | candle boxes, supplement boxes, chocolate boxes Canada | commercial | `/industries/*` | exist | P3 |

Not targeted head-on: custom mailer boxes, labels, pouches at low quantity (Vistaprint/UPrinting win). Keep pages, position as "designed + printed".

## 2. USA (second)

| # | Keyword group | Target URL | Priority |
|---|---|---|---|
| U1 | collapsible rigid boxes custom | `/collapsible-rigid-boxes` | P1 (same page as C2) |
| U2 | custom magnetic closure gift boxes | `/rigid-boxes/magnetic-closure` | P1 |
| U3 | custom rigid boxes manufacturer | `/rigid-boxes` | P2 |
| U4 | custom cosmetic / candle / supplement boxes | `/industries/*` | P2 |
| U5 | US food / supplement label rules | existing blog posts | maintain |

## 3. Page fixes (on-site work, this repo)

1. **Collapsible cannibalisation:** make `/rigid-boxes/collapsible` canonical to, or clearly secondary to, `/collapsible-rigid-boxes`.
2. **Packaging design pair:** pick `/packaging-design` as the hire page; `/services/packaging-design` links to it (or redirect).
3. **Beat QinPrinting on P1 box pages:** keep FAQ + Product schema; add a 40–80-word direct answer at the top, a short "Ordering from Canada" block (CAD pricing, delivery confirmed with quote, no duties inside Canada), and an honest freight comparison on the collapsible page (labelled "example").
4. **`/countries/canada`:** add GTA service area, CAD, how Canadian orders work, links to P1 box pages. No fake address; street address still TODO.
5. **Two new posts:** C8 Canada labelling guide (needs fact check against Government of Canada sources), C9 Canada buying guide.

## 4. Off-page (Canada)

- Google Business Profile (service-area business until a real address is public).
- Profiles: Clutch (Canada/Ontario/Toronto), DesignRush, YP.ca, Canada411, ensun.io, GoodFirms.
- Reviews: ask real clients after delivery. Never fake.
- Avoid paid press-release / guest-post links (competitors use them; `[RISK]`).

## 5. Order of work

| Week | Work | Owner |
|---|---|---|
| 0 | DNS to Vercel, Search Console + Bing, GBP | you |
| 1 | Fixes 1–2 (cannibalisation), fix 4 (Canada page) | Claude |
| 2 | Fix 3 on collapsible, magnetic, rigid hub | Claude |
| 3 | C8 Canada labelling guide (after fact check) | Claude + your review |
| 4 | Directory profiles, C9 buying guide | you + Claude |
| 6+ | Re-rank with Search Console data; extend to USA P2 | both |

## Open questions

- Confirm market order (Canada, then USA).
- Street address for GBP and citations?
- Can CAD prices or a "from" price be shown?
