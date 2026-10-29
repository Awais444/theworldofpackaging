import { shippingByRegion } from "@/config/site";
import type { BoxRef } from "./designServices";
import type { Faq } from "./rigidStyles";
import { tier1Countries } from "./countries.tier1";
import { tier1Extra } from "./countries.tier1.extra";
import { tier2Countries } from "./countries.tier2";
import { tier3Countries } from "./countries.tier3";

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
  /** Short name for page titles, e.g. "Bosnia & Herzegovina". */
  short?: string;
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
  ...tier3Countries,
];

export const countryHref = (slug: string) => `/countries/${slug}`;

/**
 * Transit times for a country: its own values when set, otherwise its region's approximate range.
 * `approx` is true for each value taken from the region.
 */
export function shippingTimes(c: Country): { air: string | null; sea: string | null; airApprox: boolean; seaApprox: boolean } {
  const region = shippingByRegion[c.region];
  return {
    air: c.shipping.air ?? region?.air ?? null,
    sea: c.shipping.sea ?? region?.sea ?? null,
    airApprox: !c.shipping.air && Boolean(region?.air),
    seaApprox: !c.shipping.sea && Boolean(region?.sea),
  };
}

/** "Approx. 5–8 days" for region values, the plain value for confirmed ones, or the fallback. */
export const formatTime = (value: string | null, approx: boolean, fallback = "Confirmed with your quote") => (value ? (approx ? `Approx. ${value}` : value) : fallback);
export const getCountry = (slug: string) => countries.find((c) => c.slug === slug);
export const countryName = (c: Country) => c.inText ?? c.name;

/** Tier 3 pages are indexed only when every required field is filled (plan §3). */
export function isIndexable(c: Country): boolean {
  if (c.tier < 3) return true;
  const ship = shippingTimes(c);
  return Boolean(c.name && c.region && c.currency.code && c.languages.length && c.measurement && c.labelling.authority && (ship.air || ship.sea) && c.marketNotes.length);
}

export const REGIONS: Region[] = ["North America", "Europe", "Middle East", "Asia", "Oceania", "Africa", "Latin America"];

/** Same-region countries for "Nearby countries", Tier 1 first. */
/** Same-region indexable countries, starting after this one alphabetically (wrapping), so links spread evenly. */
export function nearbyCountries(c: Country, n = 6): Country[] {
  const region = countries.filter((o) => o.region === c.region && isIndexable(o)).sort((a, b) => a.name.localeCompare(b.name));
  const i = region.findIndex((o) => o.slug === c.slug);
  const ordered = i < 0 ? region : [...region.slice(i + 1), ...region.slice(0, i)];
  return ordered.filter((o) => o.slug !== c.slug).slice(0, n);
}

export const countryShippingFaqs: Faq[] = [
  { q: "Air or sea: which should I choose?", a: "Air for launches and urgent stock; sea for production volumes where the timeline allows. We quote both so you can compare." },
  { q: "Can collapsible rigid boxes reduce my shipping cost?", a: "Yes. They ship flat, so many more fit in each carton, which cuts freight volume and storage. We compare assembled and flat options in your quote." },
];
