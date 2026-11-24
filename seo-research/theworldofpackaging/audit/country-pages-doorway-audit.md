# Country pages: doorway audit

Date: 24 Nov 2026. Method: the built HTML of every `/countries/*` page, main content only, with the country's own name masked out. For each page, the share of its 5-word phrases that also appear on its most similar sibling. This measures repeated text, not quality, so treat it as a screening signal.

## Summary

| Group | Pages | Status |
|---|---|---|
| Tier 3 | 131 | Already `noindex, follow` and out of the sitemap. **No risk.** |
| Indexable (tier 1 + 2) | 60 | In the sitemap. Overlap results below. |

| Overlap with closest sibling | Pages | Risk |
|---|---|---|
| 75% or more | 33 | **High.** Reads as the same page with the country swapped. |
| 60–74% | 11 | Medium. |
| Under 60% | 16 | Low: real local substance. |

Average: 69%. Pages run about 940–1,000 words, but most of those words are shared template sections (boxes, process, collapsible tip, FAQ).

## Pages

- **High (75%+):** Peru 84, Colombia 83, Argentina 82, Chile 82, Hungary 81, Romania 81, Austria 80, Greece 80, Portugal 80, Egypt 79, Ghana 79, Morocco 79, Poland 79, Bangladesh 78, Mexico 78, Nigeria 78, Taiwan 78, Vietnam 78, Brazil 77, Finland 77, Indonesia 77, Kenya 77, South Korea 77, Thailand 77, Turkey 77, Denmark 76, Israel 76, Jordan 76, Norway 76, Spain 76, Sri Lanka 76, Czech Republic 75, Italy 75.
- **Medium (60–74%):** India 74, China 73, Japan 73, Hong Kong 72, Philippines 71, Bahrain 70, Belgium 70, Qatar 69, Oman 67, Kuwait 65, Switzerland 62.
- **Low (under 60%):** Saudi Arabia, Sweden, New Zealand, Germany, UAE, Malaysia, Netherlands, Singapore, South Africa, Australia, Pakistan, France, Ireland, United Kingdom, United States, Canada (33%).

## Why it matters

Google's spam policy treats sets of near-identical location pages that funnel to one form as doorway pages. That can pull down the whole site, not only those pages. Tier-1 pages (US, UK, Canada, Australia, Germany, France…) are clearly differentiated. Most tier-2 pages are not yet.

## Options (your decision)

1. **Recommended: noindex the 33 high-overlap pages for now** (keep them live, linked and `follow`), and re-index each one once it has real local content: a verified labelling note, a market note written for that country, and shipping times. This is a one-line rule in `isIndexable`, for example tier 2 needs `marketNotes.length >= 2` and a verified `labelling.lastReviewed`.
2. Write unique content for the 33 pages now. That's about 33 × 300 words of verified, country-specific material, which needs official sources for each country.
3. Leave as is and watch Search Console for "Crawled, currently not indexed" on these URLs. This is the cheapest option and the riskiest.

The medium group can stay indexed while the Canada and USA work comes first.
