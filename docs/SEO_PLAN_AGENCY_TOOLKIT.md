# SEO plan: The World of Packaging, using the Agency Toolkit

Compared on 24 Nov 2026: our site (`main`) against **AdeelAhmadPK/agency** (private, branch `claude/awesome-cerf-4v7i6w`).

## What the agency repo is

It is not a website. It is an **SEO agency toolkit** for Claude: a 13-step workflow (`seo/WORKFLOW.md`), one playbook per site type, a knowledge base with evidence labels (`[G]` Google-confirmed, `[T]` tested, `[RISK]` spam-policy risk and so on), fill-in templates, and Python scripts for SERP capture, competitor selection, crawling, keyword clustering and Search Console reports. Each client gets a `projects/<site>/` folder with a brief, research, strategy, briefs, audit and a monthly log.

So the comparison is: **which steps of their process our site has already done, and which are missing.**

## Where we stand against their workflow

| Step | Their workflow | Our site today | Status |
|---|---|---|---|
| 0 | Intake: `brief.md` with markets, goals, tools | Facts live in `CLAUDE.md` and `site.ts`. No brief with priority markets, goals or budget | Gap |
| 1 | Pick playbook(s) | Fits **international** (many countries, English) + **local-business** (Toronto) + **saas-b2b** (B2B service) | To do |
| 2 | Capture real search results for 15–40 seed queries per market | Never done. Our keywords come from planning docs, not real results | **Gap** |
| 3 | Pick 20+ competitors from those results | Not done | **Gap** |
| 4 | Analyse competitors: page types, headings, schema, depth | Not done | **Gap** |
| 5 | Keyword universe + clusters (one cluster = one page) | `SEO_CONTENT_PLAN.md` lists topics, with no volumes and no clustering | Partial |
| 6 | Topical map: core vs outer topics, publishing order | Blog categories + design-service hubs exist; no formal map | Partial |
| 7 | URL map: every intent has exactly one URL; keep/merge/redirect | 225 indexable pages, no URL map. Several pages may target the same intent (see risks) | **Gap** |
| 8 | Content briefs for the top 10–20 pages | Not used | Gap |
| 9 | Internal link plan | Done in practice: 0 orphans, 0 broken links | Done |
| 10 | Technical audit | Done, strong: crawl, schema validator (0 errors), images, Lighthouse, llms.txt | **Done** |
| 11 | Off-page + local plan | `OFF_PAGE_SEO_PLAN.md` exists. No local plan for Toronto (Google Business Profile, Canadian citations) | Partial |
| 12 | Roadmap + baseline measurement | No Search Console, so there is no baseline | **Gap** |
| 13 | Monthly report | Not set up | Gap |

**In short:** our technical SEO is ahead of most sites (steps 9–10). The research half (steps 2–7) and measurement (12–13) have never been done, and that is where rankings are decided.

## Risks their knowledge base flags for our site

1. **Doorway pages (`[RISK]`, Google spam policy).** We have about 190 country pages. Their rule: a set of pages that differ only by the country name, all funnelling to one quote form, are doorways. Test each page: would a visitor who arrived directly find something the sibling pages do not have? Tier 1 and 2 pages have real local labelling rules and market notes. Tier 3 pages are thinner. **Action:** audit every tier-3 page and noindex or merge the ones without real local substance.
2. **Pages competing for the same search.** Pairs to check in the URL map:
   - `/services/packaging-design` vs `/packaging-design`
   - `/services/label-design` vs `/packaging-design/label-design`
   - `/rigid-boxes/collapsible` vs `/collapsible-rigid-boxes`
   - `/boxes` vs `/rigid-boxes` + `/printed-boxes`
   - `/pricing` vs `/packages`

   Each search intent should have one URL. The others link to it, or are merged and redirected.
3. **Trust (E-E-A-T).** The team page, factory capacity and results are still placeholders. The 10 case studies are `noindex`. Their quality module weighs real proof heavily for B2B buyers.
4. **Location claims.** The site now says it's based in Toronto. Google Business Profile, citations and the website must show the same name, address and phone, or local rankings suffer.

## Plan

### Week 0: things only you can do (they unblock everything)

- [ ] Point theworldofpackaging.com at Vercel (the live domain still serves an old GoDaddy copy).
- [ ] Verify the domain in **Google Search Console** and **Bing Webmaster Tools**, then submit `/sitemap.xml`.
- [ ] Create a **Google Business Profile** for Toronto. Only if there is a real address customers can visit; otherwise set it up as a service-area business.
- [ ] Install **Python 3** on this computer, so the toolkit's scripts can run here.
- [ ] Optional: a **Serper** API key (it has a free tier) for search results in an exact country and city. Without it, results come from web search, which is less precise.

### Weeks 1–2: research (workflow steps 0–4)

- [ ] Create `projects/theworldofpackaging/` in the agency repo (client data stays private there) and fill in `brief.md`. Markets in priority order: Canada, USA, UK, Australia, UAE, EU.
- [ ] 40 seed queries per main market: each service (packaging design, rigid boxes, custom printed boxes, labels, pouches) × buyer intents (hire, price, compare, how-to) × market.
- [ ] Capture the search results, then pick 20+ competitors per market and tier them (A: closest 5–8).
- [ ] Analyse the Tier A competitors: their page types, headings, schema, content depth. Note what they all cover (table stakes) and what nobody covers (our openings).

### Weeks 3–4: strategy (workflow steps 5–7)

- [ ] Build the keyword universe and clusters per market. Use Search Console data once it starts arriving, about 2–4 weeks after verification.
- [ ] Topical map: core topics (packaging design, rigid boxes, printing) vs supporting topics (labelling rules, materials, shipping).
- [ ] **URL map:** one URL per intent. Fix the overlapping pairs above with merges, redirects or clearer focus.
- [ ] **Doorway audit** of the country pages: keep, improve, noindex or merge each one.

### Month 2: content and trust (steps 8, 11)

- [ ] Content briefs for the 10–20 highest-priority pages, starting with the hubs that have no 40–80-word direct answer.
- [ ] Publish the case studies once approved (`placeholder: false`), and add a real team page and factory proof.
- [ ] Local SEO for Toronto: Google Business Profile, Canadian citations (Canada411, Yellow Pages Canada, industry associations), and a review process.
- [ ] Fill the blog gaps the research shows. E-commerce, Printing and Shipping are thin today.

### Month 3 and after: off-page and measurement (steps 11–13)

- [ ] Off-page plan per market from `OFF_PAGE_SEO_PLAN.md`, checked against what competitors' links show.
- [ ] Record a baseline (impressions, clicks, leads per month), then a monthly report from the Search Console export using their `gsc_export.py`.

## How to run it

The toolkit is built to be opened in Claude Code. The simplest setup is to clone the agency repo next to this one and run the project there:

```bash
git clone https://github.com/AdeelAhmadPK/agency.git E:/websites/agency
```

Then open `E:\websites\agency` in Claude Code and say: *"New SEO project: theworldofpackaging.com, B2B packaging design + printing, based in Toronto, markets Canada, USA, UK, Australia, UAE, EU. Goal: quote requests."* Website changes that come out of the plan (merges, redirects, new content) are then made in this repo.
