import { getPost, posts, type Post } from "./blog/posts";
import { countries, type Country } from "./countries";
import { designServices, industryDesignService, type BoxRef, type DesignService } from "./designServices";

/**
 * Internal linking rules (SEO_CONTENT_PLAN.md "On-page rules", COUNTRY_PAGES_PLAN.md §6):
 * service ↔ related guides ↔ matching box styles ↔ industry page, and service → popular regions.
 * Links are derived from the content data, so adding a link on one side shows up on the other.
 */

const uniq = <T,>(list: T[]) => [...new Set(list)];
const toPosts = (slugs: string[]) => slugs.map(getPost).filter((p): p is Post => Boolean(p));

/** Fallback guides when a page has fewer than three specific ones. */
const GENERAL_GUIDES = ["packaging-design-process", "packaging-design-cost", "print-ready-packaging-files", "how-to-brief-a-packaging-designer"];

/** Three guides for a service: guides that link to it first, then its own picks, then general guides. */
export function guidesForService(slug: string, preferred: string[] = [], n = 3): Post[] {
  const linking = posts.filter((p) => p.services?.includes(slug)).map((p) => p.slug);
  return toPosts(uniq([...linking, ...preferred, ...GENERAL_GUIDES])).slice(0, n);
}

const RIGID_GUIDES = ["luxury-packaging-what-makes-premium-work", "choosing-board-thickness", "rigid-vs-folding-carton-boxes", "eva-vs-card-inserts"];
const PRINTED_GUIDES = ["what-is-a-dieline", "print-ready-packaging-files", "choosing-board-thickness", "pantone-vs-cmyk-packaging"];
const BOX_GUIDES: Record<string, string[]> = {
  collapsible: ["collapsible-rigid-boxes-explained", "shipping-rigid-boxes-internationally"],
  mailer: ["unboxing-experience-design", "amazon-fba-packaging-guide"],
  shipping: ["shipping-rigid-boxes-internationally", "amazon-fba-packaging-guide"],
  display: ["packaging-design-for-retail-shelf-impact"],
  "tuck-end": ["packaging-design-for-retail-shelf-impact"],
  "magnetic-closure": ["unboxing-experience-design"],
};

/** Three guides for a box style page. */
export function guidesForBox(kind: "rigid" | "printed", slug: string, n = 3): Post[] {
  return toPosts(uniq([...(BOX_GUIDES[slug] ?? []), ...(kind === "rigid" ? RIGID_GUIDES : PRINTED_GUIDES)])).slice(0, n);
}

/** Design services that recommend this box style. */
export function servicesForBox(ref: BoxRef, n = 4): DesignService[] {
  return designServices.filter((s) => s.recommendedBoxes.includes(ref)).slice(0, n);
}

const INDUSTRY_GUIDES: Record<string, string[]> = {
  cosmetics: ["cosmetic-labelling-requirements", "inci-ingredient-list-cosmetics", "sunscreen-spf-packaging-requirements"],
  perfume: ["luxury-packaging-what-makes-premium-work", "cosmetic-labelling-requirements", "eva-vs-card-inserts"],
  jewelry: ["luxury-packaging-what-makes-premium-work", "unboxing-experience-design", "eva-vs-card-inserts"],
  watches: ["luxury-packaging-what-makes-premium-work", "eva-vs-card-inserts", "unboxing-experience-design"],
  supplements: ["supplement-facts-label-requirements", "barcodes-on-packaging-upc-ean", "amazon-fba-packaging-guide"],
  "food-bakery": ["us-food-label-requirements", "eu-food-labelling-rules", "uk-packaging-labelling-requirements"],
  chocolates: ["eu-food-labelling-rules", "us-food-label-requirements", "luxury-packaging-what-makes-premium-work"],
  cbd: ["cbd-packaging-requirements", "child-resistant-packaging-requirements", "supplement-facts-label-requirements"],
  candles: ["unboxing-experience-design", "eva-vs-card-inserts", "packaging-design-for-startups"],
  apparel: ["unboxing-experience-design", "custom-vs-stock-packaging", "packaging-design-for-startups"],
  electronics: ["amazon-fba-packaging-guide", "barcodes-on-packaging-upc-ean", "unboxing-experience-design"],
  "gifts-pr-kits": ["unboxing-experience-design", "luxury-packaging-what-makes-premium-work", "custom-vs-stock-packaging"],
};

export const guidesForIndustry = (slug: string, n = 3): Post[] => toPosts(uniq([...(INDUSTRY_GUIDES[slug] ?? []), ...GENERAL_GUIDES])).slice(0, n);

/** Industry page whose matching design service is this one, if any. */
export const industryForService = (slug: string): string | undefined => Object.entries(industryDesignService).find(([, s]) => s === slug)?.[0];

/** Default market order when a service has no country that recommends it directly. */
const DEFAULT_REGIONS = ["united-states", "united-kingdom", "uae", "canada", "australia", "saudi-arabia", "germany", "france", "netherlands", "singapore"];

/**
 * Eight "Popular regions" for a service page: countries that recommend this service or one of its
 * industries first, then the default market order (never alphabetical).
 */
const order = (c: Country) => (DEFAULT_REGIONS.includes(c.slug) ? DEFAULT_REGIONS.indexOf(c.slug) : 99);

export function countriesForService(slug: string, n = 8): Country[] {
  const industry = industryForService(slug);
  const score = (c: Country) => (c.recommendedServices.includes(slug) ? 2 : 0) + (industry && c.topIndustries.includes(industry) ? 1 : 0);
  const ranked = countries
    .filter((c) => score(c) > 0)
    .sort((a, b) => score(b) - score(a) || order(a) - order(b) || a.tier - b.tier);
  const fill = DEFAULT_REGIONS.map((s) => countries.find((c) => c.slug === s)).filter((c): c is Country => Boolean(c));
  return uniq([...ranked, ...fill]).slice(0, n);
}

/** Top Tier 1 countries for the footer and menus, in market order. */
export const featuredCountries = (n = 10): Country[] =>
  DEFAULT_REGIONS.map((s) => countries.find((c) => c.slug === s)).filter((c): c is Country => Boolean(c)).slice(0, n);
