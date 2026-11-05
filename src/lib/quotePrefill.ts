import type { QuoteDraft } from "@/store/quote";

/** Box styles the quote form can be opened with (?box=slug), passed in by the server page. */
export type QuoteBoxOption = { slug: string; name: string; rigid: boolean };

type Prefill = Partial<QuoteDraft>;

// Keyword → product type, matched against service, pricing and industry slugs.
const PRODUCT_RULES: Array<[RegExp, QuoteDraft["product"]]> = [
  [/skincare/, "Skincare"],
  [/cosmetic|makeup|perfume|fragrance|hair|soap|beauty/, "Cosmetic"],
  [/snack/, "Snacks"],
  [/coffee|tea/, "Coffee & Tea"],
  [/supplement/, "Supplement"],
  [/cbd/, "CBD"],
  [/candle/, "Candle"],
  [/pharma/, "Pharma"],
  [/apparel|shoe/, "Apparel"],
  [/food|bakery|confection|chocolate|pet-food|beverage/, "Food"],
];

// Keyword → packaging type. Order matters: "bottle-label" is a bottle label, not a plain label.
const PACKAGING_RULES: Array<[RegExp, QuoteDraft["packaging"][number]]> = [
  [/bottle|jar|wine|can-tin/, "Bottle/Jar label"],
  [/label/, "Label"],
  [/pouch/, "Pouch"],
  [/shopping-bag/, "Bag"],
  [/rigid|luxury|gift|jewel|watch/, "Rigid box"],
  [/box|subscription|unboxing|display|sleeve|tube/, "Box"],
];

const firstMatch = <T,>(rules: Array<[RegExp, T]>, s: string) => rules.find(([re]) => re.test(s))?.[1];
const titleCase = (slug: string) => slug.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());

/** Choices implied by a design service slug (/packaging-design/*, /services/*) or a pricing card id. */
function fromService(slug: string): Prefill {
  if (/^(logo-design|brand-identity)$/.test(slug)) return { needs: ["brand"] };
  if (slug === "brand-packaging") return { needs: ["brand", "design"] };
  const out: Prefill = { needs: ["design"] };
  const product = firstMatch(PRODUCT_RULES, slug);
  if (product) out.product = product;
  // Pricing card ids: label, box, range.
  // Product-category services (e.g. cosmetic-packaging-design) default to the usual pack for that product.
  const pkg =
    slug === "label" ? "Label" : slug === "box" ? "Box" : (firstMatch(PACKAGING_RULES, slug) ?? (product ? (product === "Snacks" || product === "Coffee & Tea" ? "Pouch" : "Box") : undefined));
  if (pkg) out.packaging = [pkg];
  if (slug === "range" || slug === "packaging-range-design") out.skus = "4+";
  return out;
}

/**
 * Reads ?service=, ?box= (or the older ?style=), ?package=, ?industry= and ?country= so CTAs on service, box, package,
 * industry and country pages open the form with the right choices made. Returns null when the URL has none.
 */
export function prefillFromParams(q: URLSearchParams, ctx: { boxes: QuoteBoxOption[]; countries: string[]; countrySlugs: Record<string, string> }): Prefill | null {
  let out: Prefill = {};
  const sources: string[] = [];

  const service = q.get("service");
  if (service) {
    out = { ...out, ...fromService(service) };
    sources.push(`${titleCase(service)}${q.get("tier") ? ` (${q.get("tier")} tier)` : ""}`);
  }

  const boxSlug = q.get("box") ?? q.get("style");
  const box = boxSlug ? ctx.boxes.find((b) => b.slug === boxSlug) : undefined;
  if (box) {
    // A box page visitor wants the box made: design + printing, the box type preselected.
    out = { ...out, needs: ["design-print"], packaging: [box.rigid ? "Rigid box" : "Box"] };
    sources.push(`${box.name} box page`);
  }

  // /packages cards: ?package=box-ready | launch | full-system (see content/packages.ts).
  const pkg = q.get("package");
  const PACKAGES: Record<string, Prefill> = {
    "box-ready": { needs: ["design-print"], packaging: ["Rigid box"] },
    launch: { needs: ["brand", "design-print"], packaging: ["Rigid box"] },
    "full-system": { needs: ["brand", "design-print"], packaging: ["Box"], skus: "2–3" },
  };
  if (pkg && PACKAGES[pkg]) {
    out = { ...out, ...PACKAGES[pkg] };
    sources.push(`${titleCase(pkg)} package`);
  }

  const industry = q.get("industry");
  if (industry) {
    const product = firstMatch(PRODUCT_RULES, industry);
    if (product && !out.product) out.product = product;
    if (!out.packaging && /jewel|watch|gift/.test(industry)) out.packaging = ["Rigid box"];
    sources.push(`${titleCase(industry)} industry page`);
  }

  const country = ctx.countrySlugs[q.get("country") ?? ""];
  if (country && ctx.countries.includes(country)) out.country = country;

  if (sources.length) out.source = sources.join(", ");
  return Object.keys(out).length ? out : null;
}
