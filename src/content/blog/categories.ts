import { STOCK } from "../photos";

/*
 * Blog categories and the one primary category of every post, plus each post's card cover.
 * Covers use STOCK photos only (generic, never our clients' work and never third-party brands);
 * posts without a fitting stock photo get a generated cover (category colour + icon + short title).
 * Every post has a distinct cover.
 */

export type BlogCategoryId = "labelling-compliance" | "packaging-design" | "materials-finishes" | "cost-strategy" | "ecommerce-unboxing" | "printing-production" | "shipping-export";

export type BlogCategory = {
  id: BlogCategoryId;
  name: string;
  /** One line for the hub row. */
  short: string;
  /** 60–100 word intro for the category page. */
  intro: string;
  metaDescription: string;
  /** CSS colour token (see --cat-* in globals.css). */
  color: string;
};

export const blogCategories: BlogCategory[] = [
  {
    id: "labelling-compliance",
    name: "Labelling & Compliance",
    short: "What has to be on the pack, by product and market.",
    intro:
      "Labelling rules decide what your packaging must say before it can be sold. These guides cover the requirements we check most often for food, supplements, cosmetics, alcohol and CBD in the US, UK and EU: mandatory text, panel placement, minimum type sizes, barcodes and certification marks. Each guide lists its official sources and a review date. Use them to plan the artwork, then confirm the final wording with a regulatory adviser for your product.",
    metaDescription: "Packaging labelling guides for food, supplements, cosmetics, alcohol and CBD in the US, UK and EU: required text, placement, type sizes and sources.",
    color: "var(--cat-compliance)",
  },
  {
    id: "packaging-design",
    name: "Packaging Design",
    short: "Briefs, process, typography, colour and shelf impact.",
    intro:
      "Good packaging design starts with a clear brief and ends with a box that sells on the shelf and survives the post. These guides follow the process our studio uses: briefing a designer, planning a redesign, choosing type and colour, designing pouches and labels, and making premium packaging feel premium. They also cover the common mistakes we fix most often, so you can avoid them before artwork goes to print.",
    metaDescription: "Packaging design guides: how to brief a designer, the design process, typography, colour, labels, pouches, luxury packaging and shelf impact.",
    color: "var(--cat-design)",
  },
  {
    id: "materials-finishes",
    name: "Materials & Finishes",
    short: "Board, inserts, labels and the finishes people notice.",
    intro:
      "The material and finish decide how your packaging looks, feels and protects the product. These guides compare the options we specify every day: rigid greyboard against folding carton, board thickness, EVA against card inserts, glass, plastic and aluminium, flexible against rigid formats, and label types. They also explain foil stamping, embossing, spot UV and soft-touch lamination, with where each one works best and what it adds to cost.",
    metaDescription: "Packaging materials and finishes explained: board thickness, rigid vs folding carton, inserts, glass vs plastic, labels, foil, embossing and spot UV.",
    color: "var(--cat-materials)",
  },
  {
    id: "cost-strategy",
    name: "Cost & Strategy",
    short: "What packaging costs and how to plan it.",
    intro:
      "Packaging decisions are business decisions. These guides explain what drives the price of custom boxes and packaging design, when custom packaging is worth it over stock, and how to choose a designer or printer. They also cover planning packaging for a startup launch and for private label products. Read them before you ask for quotes, so you can compare offers on the same basis and know which choices move the price.",
    metaDescription: "Packaging cost and strategy guides: what custom boxes and design cost, custom vs stock packaging, startups, private label and choosing a supplier.",
    color: "var(--cat-cost)",
  },
  {
    id: "ecommerce-unboxing",
    name: "E-commerce & Unboxing",
    short: "Mailers, Amazon FBA and the opening moment.",
    intro:
      "Online, the packaging is the first thing a customer touches. These guides cover packaging for e-commerce: planning an unboxing experience people remember and share, and meeting Amazon FBA packaging rules while protecting the product in transit. They explain mailer boxes, inserts, tissue and printed inside panels, and how to balance presentation against shipping weight and cost, so the box arrives intact and still looks good when it is opened.",
    metaDescription: "E-commerce packaging guides: unboxing experience design, mailer boxes, inserts and Amazon FBA packaging rules for online brands.",
    color: "var(--cat-ecommerce)",
  },
  {
    id: "printing-production",
    name: "Printing & Production",
    short: "Dielines, print-ready files, colour and sizing.",
    intro:
      "Most print problems start in the artwork file. These guides explain what happens between approved design and finished packaging: what a dieline is, how to set up print-ready files, when to use Pantone or CMYK, and how to measure your product so the box fits. They are written for designers and brand owners who want the first print run to match the proof, without reprints or delays caused by file errors.",
    metaDescription: "Packaging printing and production guides: dielines, print-ready artwork files, Pantone vs CMYK and how to measure box sizes correctly.",
    color: "var(--cat-printing)",
  },
  {
    id: "shipping-export",
    name: "Shipping & Export",
    short: "Freight, flat-packed boxes and new markets.",
    intro:
      "Packaging made in one country and sold in another has to survive freight and meet the destination's rules. These guides cover shipping rigid boxes internationally by air or sea, how collapsible rigid boxes cut freight volume by shipping flat, and what changes when you take packaging into new markets: languages, labelling and formats. Use them to plan packing, transit times and costs before your production run is booked.",
    metaDescription: "Packaging shipping and export guides: shipping rigid boxes internationally, collapsible rigid boxes and packaging for international markets.",
    color: "var(--cat-shipping)",
  },
];

/** Icons available for generated covers (mapped to lucide icons in components/blog/BlogCover.tsx). */
export type CoverIcon = "barcode" | "shield" | "accessibility" | "alert" | "layers" | "calculator" | "receipt" | "search" | "scissors" | "file-check" | "swatches" | "ruler" | "fold" | "ship" | "globe";

type Cover = { photo: keyof typeof STOCK } | { icon: CoverIcon; short: string };

/** Primary category and card cover for every post. Featured posts lead the /blog hub. */
export const postMeta: Record<string, { category: BlogCategoryId; cover: Cover; featured?: boolean }> = {
  // Labelling & Compliance
  "uk-packaging-labelling-requirements": { category: "labelling-compliance", cover: { photo: "cartonAtShelf" } },
  "supplement-facts-label-requirements": { category: "labelling-compliance", cover: { photo: "flatBottomPouches" } },
  "net-weight-on-packaging": { category: "labelling-compliance", cover: { photo: "coffeeWhite" } },
  "alcohol-label-requirements-ttb-cola": { category: "labelling-compliance", cover: { photo: "ginBottle" } },
  "us-food-label-requirements": { category: "labelling-compliance", cover: { photo: "chipsBag" } },
  "barcodes-on-packaging-upc-ean": { category: "labelling-compliance", cover: { icon: "barcode", short: "UPC vs EAN barcodes" } },
  "cosmetic-labelling-requirements": { category: "labelling-compliance", cover: { photo: "pinkSet" } },
  "inci-ingredient-list-cosmetics": { category: "labelling-compliance", cover: { photo: "gelTube" } },
  "sunscreen-spf-packaging-requirements": { category: "labelling-compliance", cover: { photo: "pumpBottle" } },
  "eu-food-labelling-rules": { category: "labelling-compliance", cover: { photo: "cookiePouches" } },
  "child-resistant-packaging-requirements": { category: "labelling-compliance", cover: { icon: "shield", short: "Child-resistant packaging" } },
  "cbd-packaging-requirements": { category: "labelling-compliance", cover: { photo: "cbdCartonsGrid" } },
  "fsc-sustainable-packaging-certifications": { category: "labelling-compliance", cover: { photo: "whiteCartonBotanical" } },
  // Packaging Design
  "how-to-brief-a-packaging-designer": { category: "packaging-design", cover: { photo: "brochure" } },
  "packaging-redesign-guide": { category: "packaging-design", cover: { photo: "amberCartons" } },
  "accessible-packaging-design": { category: "packaging-design", cover: { icon: "accessibility", short: "Accessible packaging" } },
  "stand-up-pouch-design-guide": { category: "packaging-design", cover: { photo: "gummyPouches" } },
  "bottle-jar-label-design-guide": { category: "packaging-design", cover: { photo: "salveJars" } },
  "packaging-design-process": { category: "packaging-design", cover: { photo: "serumIllustrated" }, featured: true },
  "packaging-design-mistakes": { category: "packaging-design", cover: { icon: "alert", short: "Design mistakes to avoid" } },
  "typography-in-packaging-design": { category: "packaging-design", cover: { photo: "tuckBoxes" } },
  "colour-psychology-in-packaging": { category: "packaging-design", cover: { photo: "capsuleSachets" } },
  "luxury-packaging-what-makes-premium-work": { category: "packaging-design", cover: { photo: "navyMagnetic" } },
  "packaging-design-for-retail-shelf-impact": { category: "packaging-design", cover: { photo: "retailShelf" } },
  // Materials & Finishes
  "box-finishes-explained": { category: "materials-finishes", cover: { photo: "pinkCartons" } },
  "eva-vs-card-inserts": { category: "materials-finishes", cover: { icon: "layers", short: "EVA vs card inserts" } },
  "choosing-board-thickness": { category: "materials-finishes", cover: { photo: "candleLidBox" } },
  "glass-vs-plastic-vs-aluminium-packaging": { category: "materials-finishes", cover: { photo: "hempBottles" } },
  "flexible-vs-rigid-packaging": { category: "materials-finishes", cover: { photo: "coffeePouchKraft" } },
  "shrink-sleeve-vs-pressure-sensitive-labels": { category: "materials-finishes", cover: { photo: "shampooBottles" } },
  "rigid-vs-folding-carton-boxes": { category: "materials-finishes", cover: { photo: "bowTieBoxes" } },
  // Cost & Strategy
  "packaging-cost-guide": { category: "cost-strategy", cover: { icon: "calculator", short: "What custom boxes cost" } },
  "packaging-design-cost": { category: "cost-strategy", cover: { icon: "receipt", short: "Packaging design cost" }, featured: true },
  "packaging-design-for-startups": { category: "cost-strategy", cover: { photo: "proteinBars" } },
  "private-label-packaging-guide": { category: "cost-strategy", cover: { photo: "dropperCarton" } },
  "how-to-choose-packaging-designer-printer": { category: "cost-strategy", cover: { icon: "search", short: "Choosing a designer or printer" } },
  "custom-vs-stock-packaging": { category: "cost-strategy", cover: { photo: "waveCartons" } },
  // E-commerce & Unboxing
  "unboxing-experience-design": { category: "ecommerce-unboxing", cover: { photo: "tealMailer" }, featured: true },
  "amazon-fba-packaging-guide": { category: "ecommerce-unboxing", cover: { photo: "mailerBag" } },
  // Printing & Production
  "what-is-a-dieline": { category: "printing-production", cover: { icon: "scissors", short: "What is a dieline?" } },
  "print-ready-packaging-files": { category: "printing-production", cover: { icon: "file-check", short: "Print-ready files" } },
  "pantone-vs-cmyk-packaging": { category: "printing-production", cover: { icon: "swatches", short: "Pantone vs CMYK" } },
  "how-to-measure-box-size": { category: "printing-production", cover: { icon: "ruler", short: "Measure your box size" } },
  // Shipping & Export
  "collapsible-rigid-boxes-explained": { category: "shipping-export", cover: { icon: "fold", short: "Collapsible rigid boxes" } },
  "shipping-rigid-boxes-internationally": { category: "shipping-export", cover: { photo: "floralMailer" } },
  "packaging-for-international-markets": { category: "shipping-export", cover: { icon: "globe", short: "International markets" } },
};

export const getBlogCategory = (id: string) => blogCategories.find((c) => c.id === id);
export const categoryHref = (id: BlogCategoryId, page = 1) => (page > 1 ? `/blog/category/${id}/page/${page}` : `/blog/category/${id}`);
export const BLOG_PAGE_SIZE = 12;
