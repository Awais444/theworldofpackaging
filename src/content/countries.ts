import type { BoxRef } from "./designServices";
import type { Faq } from "./rigidStyles";
import { tier1Countries } from "./countries.tier1";
import { tier1Extra } from "./countries.tier1.extra";
import { tier2Countries } from "./countries.tier2";

/**
 * Country landing pages (COUNTRY_PAGES_PLAN.md). Every page must carry country-specific content.
 * Labelling summaries are general guidance written from official sources: TODO verify each with a
 * local adviser before launch (see CONTENT_TODO.md). Shipping times and incoterms stay null/empty
 * until confirmed by our logistics partner; the page then shows "Confirmed with your quote".
 */
export type Region = "North America" | "Europe" | "Middle East" | "Asia" | "Oceania" | "Africa" | "Latin America";

export type Country = {
  slug: string;
  name: string;
  /** Short name used in running text, e.g. "the UK". */
  inText?: string;
  iso2: string;
  tier: 1 | 2 | 3;
  region: Region;
  currency: { code: string; symbol: string; name: string };
  languages: string[];
  measurement: "metric" | "imperial" | "both";
  lead: string;
  labelling: {
    authority: string;
    summary: string;
    keyPoints: string[];
    sources: Array<{ label: string; url: string }>;
    lastReviewed: string;
  };
  shipping: {
    air: string | null;
    sea: string | null;
    collapsibleTip: string;
    incoterms: string[];
  };
  marketNotes: string[];
  topIndustries: string[];
  recommendedBoxes: BoxRef[];
  recommendedServices: string[];
  cities?: Array<{ slug: string; name: string; note: string }>;
  faqs: Faq[];
  caseStudySlugs?: string[];
  guideSlugs?: string[];
  /** Busy seasons to plan packaging around. */
  seasons?: string[];
};

export const countries: Country[] = [
  ...tier1Countries.map((c) => {
    const extra = tier1Extra[c.slug];
    return extra ? { ...c, marketNotes: [...c.marketNotes, extra.note], faqs: [...c.faqs, ...extra.faqs], seasons: extra.seasons } : c;
  }),
  ...tier2Countries,
];

export const countryHref = (slug: string) => `/countries/${slug}`;
export const getCountry = (slug: string) => countries.find((c) => c.slug === slug);
export const countryName = (c: Country) => c.inText ?? c.name;

/** Tier 3 pages are indexed only when every required field is filled (plan §3). */
export function isIndexable(c: Country): boolean {
  if (c.tier < 3) return true;
  return Boolean(c.name && c.region && c.currency.code && c.languages.length && c.measurement && c.labelling.authority && (c.shipping.air || c.shipping.sea) && c.marketNotes.length);
}

export const REGIONS: Region[] = ["North America", "Europe", "Middle East", "Asia", "Oceania", "Africa", "Latin America"];

/** Same-region countries for "Nearby countries", Tier 1 first. */
export function nearbyCountries(c: Country, n = 6): Country[] {
  return countries
    .filter((o) => o.slug !== c.slug && o.region === c.region)
    .sort((a, b) => a.tier - b.tier || a.name.localeCompare(b.name))
    .slice(0, n);
}

export const countryShippingFaqs: Faq[] = [
  { q: "Air or sea: which should I choose?", a: "Air for samples, launches and urgent stock; sea for production volumes where the timeline allows. We quote both so you can compare." },
  { q: "Can collapsible rigid boxes reduce my shipping cost?", a: "Yes. They ship flat, so many more fit in each carton, which cuts freight volume and storage. We compare assembled and flat options in your quote." },
];
