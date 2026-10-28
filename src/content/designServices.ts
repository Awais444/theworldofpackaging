import type { IllustrationKey } from "@/components/illustrations";
import { site } from "@/config/site";
import type { PriceFrom } from "./pricing";
import type { Faq } from "./rigidStyles";
import { formatServices } from "./designServices.format";
import { productServices } from "./designServices.product";
import { longform, type LongForm } from "./designServices.longform";
import { serviceServices } from "./designServices.service";

export type DesignGroup = "product" | "format" | "service";

/** A box page to recommend, e.g. "rigid:magnetic-closure" or "printed:mailer". */
export type BoxRef = `rigid:${string}` | `printed:${string}`;

/** Packaging design service page (CLAUDE.md focus: design first, manufacturing as the advantage). */
export type DesignService = {
  slug: string;
  name: string;
  group: DesignGroup;
  h1: string;
  intro: string;
  /** "What we design" grid. */
  formats: string[];
  deliverables: string[];
  /** Category-specific considerations. Regulatory wording is marked TODO verify in the data files. */
  categoryNotes: string[];
  priceFrom?: PriceFrom;
  turnaround?: string;
  recommendedBoxes: BoxRef[];
  relatedServices: string[];
  portfolioSlots: string[];
  faqs: Faq[];
  /** Illustration used by the portfolio slots until real photos exist. */
  illustration: IllustrationKey;
  /** Short line for cards and menus. */
  short: string;
  /** SEO long-form copy (SEO_CONTENT_PLAN.md Priority 1). Pages without it use the base template only. */
  seo?: Omit<LongForm, "faqs" | "h1" | "intro">;
};

/** Raw entry in the data files; slots and shared FAQs are added here. */
export type DesignServiceInput = Omit<DesignService, "group" | "portfolioSlots" | "faqs"> & { faqs: Faq[] };

const portfolio = (slug: string) => Array.from({ length: 6 }, (_, i) => `design-${slug}-${i + 1}`);

/** Three shared questions, phrased for each service, after its own specific ones (6 in total). */
function sharedFaqs(name: string, group: DesignGroup): Faq[] {
  const subject = name.toLowerCase();
  return [
    {
      q: `How long does ${subject} take?`,
      a: `First concepts usually arrive within ${site.facts.firstConceptHours} hours of an agreed brief. The full timeline depends on revision rounds and is set in your quote.`,
    },
    {
      q: group === "service" ? `Can you also produce the packaging?` : `Can you also print and make it?`,
      a: `Yes. We design with our own factory's board, presses and finishes in mind, and can make rigid and printed boxes from ${site.facts.rigidMoq} units. The design fee is credited when we manufacture your order.`,
    },
    {
      q: `What do I need to send to start?`,
      a: "Your product details or dimensions, your logo and brand files if you have them, a few references you like, and where the packaging will be sold.",
    },
  ];
}

const build = (group: DesignGroup) => (s: DesignServiceInput): DesignService => {
  const lf = longform[s.slug];
  if (!lf) return { ...s, group, portfolioSlots: portfolio(s.slug), faqs: [...s.faqs.slice(0, 3), ...sharedFaqs(s.name, group)] };
  const { faqs, h1, intro, ...seo } = lf;
  return {
    ...s,
    h1: h1 ?? s.h1,
    intro: intro ?? s.intro,
    group,
    portfolioSlots: portfolio(s.slug),
    // Keyword-focused questions first, then the shared ones.
    faqs: [...faqs, ...sharedFaqs(s.name, group)],
    seo,
  };
};

export const designServices: DesignService[] = [
  ...productServices.map(build("product")),
  ...formatServices.map(build("format")),
  ...serviceServices.map(build("service")),
];

export const designGroups: Array<{ id: DesignGroup; label: string; title: string }> = [
  { id: "product", label: "By Product", title: "Packaging design by product" },
  { id: "format", label: "By Format", title: "Packaging design by format" },
  { id: "service", label: "By Service", title: "Packaging design services" },
];

export const designHref = (slug: string) => `/packaging-design/${slug}`;
export const getDesignService = (slug: string) => designServices.find((s) => s.slug === slug);
export const designByGroup = (g: DesignGroup) => designServices.filter((s) => s.group === g);

/** Homepage "Packaging design for every product" order. */
export const featuredDesignSlugs = [
  "cosmetic-packaging-design",
  "skincare-packaging-design",
  "perfume-fragrance-packaging-design",
  "food-packaging-design",
  "coffee-tea-packaging-design",
  "chocolate-packaging-design",
  "supplement-label-design",
  "cbd-packaging-design",
  "candle-packaging-design",
  "jewelry-packaging-design",
  "apparel-packaging-design",
  "label-design",
];

/** Industry slug → matching design service (industry page = overview + boxes; service page = design). */
export const industryDesignService: Record<string, string> = {
  cosmetics: "cosmetic-packaging-design",
  perfume: "perfume-fragrance-packaging-design",
  jewelry: "jewelry-packaging-design",
  watches: "watch-packaging-design",
  supplements: "supplement-label-design",
  "food-bakery": "bakery-confectionery-packaging-design",
  chocolates: "chocolate-packaging-design",
  cbd: "cbd-packaging-design",
  candles: "candle-packaging-design",
  apparel: "apparel-packaging-design",
  electronics: "electronics-packaging-design",
  "gifts-pr-kits": "gift-box-pr-kit-design",
};
