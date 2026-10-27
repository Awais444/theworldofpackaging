import { site } from "@/config/site";
import type { IllustrationKey } from "@/components/illustrations";
import type { Faq, PriceTier } from "./rigidStyles";

export type PrintedStyle = {
  slug: string;
  name: string;
  short: string;
  summary: string;
  description: string;
  /** null until confirmed (site.facts.printedMoq). */
  moq: number | null;
  materials: string[];
  print: string[];
  finishes: string[];
  industries: string[];
  priceTiers: PriceTier[];
  illustration: IllustrationKey;
  mediaSlots: string[];
  faqs: Faq[];
};

const PRINT = ["CMYK", "Pantone spot", "Inside print", "Outside print"];
const FINISHES = ["Matt or gloss lamination", "Spot UV", "Hot foil blocking", "Embossing", "Soft-touch lamination"];
const TIERS: PriceTier[] = [500, 1000, 2500, 5000, 10000].map((qty) => ({ qty, unitUsd: null })); // TODO

const slots = (slug: string) => [`printed-${slug}-hero`, ...Array.from({ length: 6 }, (_, i) => `printed-${slug}-gallery-${i + 1}`)];

export const printedCommonFaqs: Faq[] = [
  {
    q: "What is the minimum order for printed boxes?",
    a: site.facts.printedMoq
      ? `${site.facts.printedMoq} boxes per design.`
      : "It depends on the style and print method. We confirm the minimum with your quote.",
  },
  {
    q: "Do you check my artwork?",
    a: "Every file goes through pre-press: bleed, safe area, fold positions, colour mode and resolution. We flag problems before anything is printed.",
  },
];

export const printedStyles: PrintedStyle[] = [
  {
    slug: "mailer",
    name: "Mailer Box",
    short: "Mailer",
    summary: "Roll-end tuck-front mailer in corrugated board. Ships on its own and opens like a gift.",
    description:
      "The standard e-commerce and subscription box. Double-walled sides and a tuck-in lid make it strong without tape, and printing inside turns the unboxing into part of the brand.",
    moq: site.facts.printedMoq,
    materials: ["E-flute corrugated", "B-flute corrugated", "Kraft board"],
    print: PRINT,
    finishes: FINISHES,
    industries: ["apparel", "cosmetics", "supplements", "cbd", "candles"],
    priceTiers: TIERS,
    illustration: "mailer-box",
    mediaSlots: slots("mailer"),
    faqs: [{ q: "Can mailers go through the post without an outer box?", a: "Yes, in E- or B-flute they are built to ship as they are." }],
  },
  {
    slug: "tuck-end",
    name: "Tuck End Box",
    short: "Tuck end",
    summary: "Folding carton with tuck flaps at each end. The workhorse of retail shelves.",
    description:
      "Reverse tuck or straight tuck, glued on one side and shipped flat. Ideal for cosmetics, supplements and anything sold on a shelf or a peg.",
    moq: site.facts.printedMoq,
    materials: ["SBS board", "Kraft board"],
    print: PRINT,
    finishes: FINISHES,
    industries: ["cosmetics", "supplements", "cbd", "perfume"],
    priceTiers: TIERS,
    illustration: "tuck-end",
    mediaSlots: slots("tuck-end"),
    faqs: [{ q: "Reverse tuck or straight tuck?", a: "Reverse tuck is cheaper to cut; straight tuck puts both flaps at the back for a cleaner front." }],
  },
  {
    slug: "folding-carton",
    name: "Folding Carton",
    short: "Folding carton",
    summary: "Custom-structure paperboard cartons: crash-lock bottoms, sleeves with inserts, multi-packs.",
    description:
      "Any carton that is die-cut from paperboard and folded. We engineer the dieline to your product, then print and cut it in-house.",
    moq: site.facts.printedMoq,
    materials: ["SBS board", "Kraft board"],
    print: PRINT,
    finishes: FINISHES,
    industries: ["food-bakery", "supplements", "chocolates", "cosmetics"],
    priceTiers: TIERS,
    illustration: "tuck-end",
    mediaSlots: slots("folding-carton"),
    faqs: [{ q: "Can you design a new structure?", a: "Yes. Structural design and dieline engineering is one of our studio services." }],
  },
  {
    slug: "shipping",
    name: "Shipping Carton",
    short: "Shipping",
    summary: "Regular slotted corrugated cartons for shipping and storage, printed or plain.",
    description:
      "Outer cartons that protect your retail packaging in transit. Branding them is optional but cheap, and it makes your shipments recognisable at the warehouse.",
    moq: site.facts.printedMoq,
    materials: ["B-flute corrugated", "E-flute corrugated", "Kraft board"],
    print: ["One or two Pantone colours", "CMYK", "Outside print"],
    finishes: ["Uncoated", "Matt lamination"],
    industries: ["electronics", "food-bakery", "apparel", "supplements"],
    priceTiers: TIERS,
    illustration: "shipping-carton",
    mediaSlots: slots("shipping"),
    faqs: [{ q: "Do you supply double-wall cartons?", a: "For heavy loads, yes. Tell us the packed weight and we will suggest the flute." }],
  },
  {
    slug: "display",
    name: "Display Box",
    short: "Display",
    summary: "Counter display trays with a printed header card, shipped flat and assembled at the till.",
    description:
      "A tray that holds a row of products with a tall header for your brand. Often packed as the outer of a retail case so it goes straight onto the counter.",
    moq: site.facts.printedMoq,
    materials: ["E-flute corrugated", "SBS board"],
    print: PRINT,
    finishes: FINISHES,
    industries: ["cbd", "supplements", "chocolates", "cosmetics"],
    priceTiers: TIERS,
    illustration: "display-box",
    mediaSlots: slots("display"),
    faqs: [{ q: "Can the display hold product while shipping?", a: "Yes, with a tear-away lid or a separate outer carton." }],
  },
  {
    slug: "pillow",
    name: "Pillow Box",
    short: "Pillow",
    summary: "Curved-end carton that folds from one flat piece. Light, quick to pack, good for small items.",
    description: "Popular for jewellery, accessories and gift cards. The curved ends close by pressing in, no glue needed.",
    moq: site.facts.printedMoq,
    materials: ["SBS board", "Kraft board"],
    print: PRINT,
    finishes: FINISHES,
    industries: ["jewelry", "apparel", "gifts-pr-kits"],
    priceTiers: TIERS,
    illustration: "pillow-box",
    mediaSlots: slots("pillow"),
    faqs: [{ q: "How large can a pillow box be?", a: "They work best for light items up to about the size of a hand." }],
  },
  {
    slug: "sleeve",
    name: "Sleeve Box",
    short: "Sleeve",
    summary: "A printed sleeve over a tray or a plain box. A cheap way to brand stock packaging.",
    description: "The sleeve carries all the print, so the tray can stay plain and stocked in bulk. Swap sleeves for seasonal editions.",
    moq: site.facts.printedMoq,
    materials: ["SBS board", "Kraft board"],
    print: PRINT,
    finishes: FINISHES,
    industries: ["chocolates", "apparel", "food-bakery", "candles"],
    priceTiers: TIERS,
    illustration: "sleeve-box",
    mediaSlots: slots("sleeve"),
    faqs: [{ q: "Can a sleeve go over a rigid box?", a: "Yes. A printed sleeve over a plain rigid box is a common way to keep rigid costs down across a range." }],
  },
  {
    slug: "gable",
    name: "Gable Box",
    short: "Gable",
    summary: "Carry box with a built-in handle, for bakery, takeaway and gift sets.",
    description: "Folds from one piece with interlocking handle panels. Food-safe board is available for direct contact.",
    moq: site.facts.printedMoq,
    materials: ["SBS board", "Kraft board"],
    print: PRINT,
    finishes: ["Uncoated", "Matt lamination", "Spot UV"],
    industries: ["food-bakery", "chocolates", "gifts-pr-kits"],
    priceTiers: TIERS,
    illustration: "gable-box",
    mediaSlots: slots("gable"),
    faqs: [{ q: "Is the board food safe?", a: "We can supply food-contact grade board and inks. Tell us if the food touches the board directly." }],
  },
  {
    slug: "window",
    name: "Window Box",
    short: "Window",
    summary: "Folding carton with a die-cut window and clear film to show the product.",
    description: "The film is applied inline on the carton before folding. Window shapes can follow the product or the logo.",
    moq: site.facts.printedMoq,
    materials: ["SBS board", "Kraft board"],
    print: PRINT,
    finishes: FINISHES,
    industries: ["food-bakery", "chocolates", "cosmetics", "candles"],
    priceTiers: TIERS,
    illustration: "window-box",
    mediaSlots: slots("window"),
    faqs: [{ q: "Can I skip the film?", a: "Yes, an open window is fine for products that do not need protection from dust." }],
  },
];

export function getPrintedStyle(slug: string) {
  return printedStyles.find((s) => s.slug === slug);
}
