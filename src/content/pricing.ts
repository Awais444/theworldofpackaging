/**
 * Public "from" prices (USD). Every value is null until confirmed: null renders as "Get a quote".
 * TODO: fill in real starting prices. Nothing here is shown as a number while it is null.
 */

export type PriceFrom = number | null;

export type DesignTier = {
  id: "basic" | "standard" | "premium";
  name: string;
  summary: string;
  includes: string[];
  priceFrom: PriceFrom;
};

/** Packaging design tiers shown on every /packaging-design/[slug] page. */
export const designTiers: DesignTier[] = [
  {
    id: "basic",
    name: "Basic",
    summary: "One design on an existing structure.",
    includes: ["1 concept", "2 revision rounds", "Print-ready files on our dieline", "Free artwork check"],
    priceFrom: null, // TODO
  },
  {
    id: "standard",
    name: "Standard",
    summary: "Concepts, refinement and 3D mockups.",
    includes: ["2 concepts", "3 revision rounds", "3D mockups", "Print-ready files", "Colour proof"],
    priceFrom: null, // TODO
  },
  {
    id: "premium",
    name: "Premium",
    summary: "Structure and graphics designed together, with a digital proof.",
    includes: ["3 concepts", "Custom structure and dieline", "Unlimited small revisions", "3D mockups", "Digital proof"],
    priceFrom: null, // TODO
  },
];

/** Packaging Design tab on /pricing. */
export const designPricing: Array<{ id: string; name: string; summary: string; priceFrom: PriceFrom }> = [
  { id: "label", name: "Label design", summary: "One label or a front/back pair, print-ready.", priceFrom: null }, // TODO
  { id: "box", name: "Box / packaging design", summary: "One box or pack, artwork on the dieline.", priceFrom: null }, // TODO
  { id: "range", name: "Packaging range", summary: "A system for several SKUs or flavours.", priceFrom: null }, // TODO
  { id: "brand-packaging", name: "Brand + packaging", summary: "Logo, identity and the first packaging, together.", priceFrom: null }, // TODO
];

/** Note shown with design prices. */
export const designFeeNote = "Design fee credited when we manufacture your order.";

/** "From $X" or "Get a quote" when no price is set. */
export function priceLabel(price: PriceFrom): string {
  return price ? `From $${price.toLocaleString("en-US")}` : "Get a quote";
}
