import type { IllustrationKey } from "@/components/illustrations";
import type { Faq } from "./rigidStyles";

export type Industry = {
  slug: string;
  name: string;
  /** Short labels for the homepage strip. */
  styles: string[];
  intro: string;
  challenges: { title: string; body: string }[];
  rigid: string[]; // rigidStyles slugs
  printed: string[]; // printedStyles slugs
  services: string[]; // agencyServices slugs
  /** Placeholder compliance guidance. TODO: review with the client / a compliance adviser. */
  compliance: string;
  illustration: IllustrationKey;
  faqs: Faq[];
};

// TODO verify: add market-specific labelling notes per industry once reviewed by a compliance adviser.
const COMPLIANCE_NOTE =
  "Labelling rules depend on your product and the markets you sell in. We lay out the required text and symbols on the box; the wording itself comes from you or your compliance adviser.";

export const industries: Industry[] = [
  {
    slug: "cosmetics",
    name: "Cosmetics",
    styles: ["Magnetic", "Drawer", "Folding carton"],
    intro: "Skincare and make-up packaging that looks right on a shelf, in a gift set and in an unboxing video.",
    challenges: [
      { title: "Lots of SKUs", body: "Ranges need one system that flexes across sizes and shades without new tooling every time." },
      { title: "Ingredient text", body: "Small panels have to carry INCI lists and regulatory text without crowding the brand." },
      { title: "Gift seasons", body: "Launch and holiday sets need a premium box on a fixed deadline." },
    ],
    rigid: ["magnetic-closure", "drawer", "shoulder-neck"],
    printed: ["tuck-end", "mailer", "window"],
    services: ["packaging-design", "label-design", "brand-identity"],
    compliance: COMPLIANCE_NOTE,
    illustration: "magnetic-open",
    faqs: [{ q: "Can one box design work for several products?", a: "Yes. We design a template system: shared structure and layout, with colour or label changes per SKU." }],
  },
  {
    slug: "perfume",
    name: "Perfume",
    styles: ["Shoulder-neck", "Lid & base", "EVA insert"],
    intro: "Fragrance boxes that hold glass securely and feel as considered as the bottle.",
    challenges: [
      { title: "Glass protection", body: "Bottles need a cavity that stops movement without crushing caps or atomisers." },
      { title: "Premium expectation", body: "Customers judge the fragrance by the box first: board weight, foil and the opening matter." },
    ],
    rigid: ["shoulder-neck", "lid-and-base", "magnetic-closure"],
    printed: ["tuck-end"],
    services: ["rigid-box-design", "brand-identity", "3d-mockups"],
    compliance: COMPLIANCE_NOTE,
    illustration: "shoulder-neck",
    faqs: [{ q: "Can you match an insert to my bottle?", a: "Yes, from your bottle or a technical drawing of it." }],
  },
  {
    slug: "jewelry",
    name: "Jewellery",
    styles: ["Drawer", "Lid & base", "Velvet insert"],
    intro: "Small boxes with a big job: protect the piece, present it and become part of the gift.",
    challenges: [
      { title: "Small-scale branding", body: "Logos must survive foil and deboss at 10 mm without filling in." },
      { title: "Presentation", body: "Velvet, satin and slots for rings, earrings and chains need precise inserts." },
    ],
    rigid: ["drawer", "lid-and-base", "magnetic-closure"],
    printed: ["pillow", "sleeve"],
    services: ["logo-design", "rigid-box-design", "brand-guidelines"],
    compliance: COMPLIANCE_NOTE,
    illustration: "drawer",
    faqs: [{ q: "What is the smallest box you make?", a: "Ring boxes are routine. Very small sizes are confirmed with the quote." }],
  },
  {
    slug: "watches",
    name: "Watches",
    styles: ["Book style", "Magnetic", "Cushion insert"],
    intro: "Watch boxes that carry the weight of the product, the manual and the warranty card.",
    challenges: [
      { title: "Weight and stiffness", body: "Heavier pieces need thicker board and a cushion that holds the strap shape." },
      { title: "Paperwork", body: "Manuals and cards need a place in the box that does not fight the watch." },
    ],
    rigid: ["book-style", "magnetic-closure", "lid-and-base"],
    printed: ["sleeve"],
    services: ["rigid-box-design", "brand-identity"],
    compliance: COMPLIANCE_NOTE,
    illustration: "book-style",
    faqs: [{ q: "Can the box hold a manual?", a: "Yes, in a lid pocket or a lift-out tray under the insert." }],
  },
  {
    slug: "supplements",
    name: "Supplements",
    styles: ["Folding carton", "Mailer", "Labels"],
    intro: "Cartons and labels with room for the facts panel, built for retail and subscription.",
    challenges: [
      { title: "Required text", body: "Supplement facts, warnings and batch areas need space planned from the start." },
      { title: "Shelf and post", body: "The same product often ships in a mailer and sits on a shelf in a carton." },
    ],
    rigid: [],
    printed: ["tuck-end", "folding-carton", "mailer"],
    services: ["label-design", "packaging-design"],
    compliance: COMPLIANCE_NOTE,
    illustration: "label-bottle",
    faqs: [{ q: "Do you print bottle labels?", a: "We design labels and supply a full print spec for your label printer." }],
  },
  {
    slug: "food-bakery",
    name: "Food & Bakery",
    styles: ["Window box", "Gable", "Food-safe board"],
    intro: "Carry boxes, window cartons and gift tins for bakeries, cafés and specialty food.",
    challenges: [
      { title: "Food contact", body: "Board and inks must be suitable where food touches the packaging." },
      { title: "Grease and moisture", body: "Coatings and liners keep the box clean and rigid." },
    ],
    rigid: ["window", "tube"],
    printed: ["gable", "window", "folding-carton"],
    services: ["packaging-design", "label-design"],
    compliance: COMPLIANCE_NOTE,
    illustration: "gable-box",
    faqs: [{ q: "Is food-safe board available?", a: "Yes. Tell us whether food touches the board directly." }],
  },
  {
    slug: "chocolates",
    name: "Chocolates",
    styles: ["Lid & base", "Sleeve", "Card insert"],
    intro: "Boxes for pralines, bars and gift sets that keep each piece in place.",
    challenges: [
      { title: "Piece layout", body: "Inserts are cut to the exact count and shape of the chocolates." },
      { title: "Seasonal editions", body: "Sleeves and lids change for seasons while trays stay standard." },
    ],
    rigid: ["lid-and-base", "window", "drawer"],
    printed: ["sleeve", "window", "display"],
    services: ["packaging-design", "rigid-box-design"],
    compliance: COMPLIANCE_NOTE,
    illustration: "lid-and-base",
    faqs: [{ q: "Can you make seasonal sleeves only?", a: "Yes. Printed sleeves over a standard tray are the usual way to do seasonal editions." }],
  },
  {
    slug: "cbd",
    name: "CBD",
    styles: ["Tuck end", "Mailer", "Labels"],
    intro: "Clean, compliant cartons and mailers for CBD oils, gummies and topicals.",
    challenges: [
      { title: "Varying rules", body: "Labelling rules differ by market and change often; layouts need room to adapt." },
      { title: "Trust", body: "Clear, clinical design builds confidence in a crowded category." },
    ],
    rigid: [],
    printed: ["tuck-end", "mailer", "display"],
    services: ["label-design", "packaging-design", "brand-identity"],
    compliance: COMPLIANCE_NOTE,
    illustration: "tuck-end",
    faqs: [{ q: "Do you check CBD regulations?", a: "No. We lay out the text you provide; check content with a compliance adviser for each market." }],
  },
  {
    slug: "candles",
    name: "Candles",
    styles: ["Tube", "Collapsible", "Mailer"],
    intro: "Boxes for glass vessels and tins that survive shipping and look good on a mantelpiece.",
    challenges: [
      { title: "Fragile vessels", body: "Glass needs a snug insert and a box that survives drops." },
      { title: "Freight", body: "Many candle brands ship overseas; collapsible boxes cut carton volume." },
    ],
    rigid: ["tube", "collapsible", "lid-and-base"],
    printed: ["mailer", "sleeve"],
    services: ["packaging-design", "rigid-box-design"],
    compliance: COMPLIANCE_NOTE,
    illustration: "tube",
    faqs: [{ q: "Are tubes suitable for heavy jars?", a: "With the right board and an insert, yes. We check the fit on a 3D mockup." }],
  },
  {
    slug: "apparel",
    name: "Apparel",
    styles: ["Mailer", "Collapsible", "Sleeve"],
    intro: "Mailers and rigid boxes for clothing and accessories, designed for e-commerce unboxing.",
    challenges: [
      { title: "Postal cost", body: "Box size and weight drive shipping cost; we keep both tight." },
      { title: "Brand moment", body: "Inside print and tissue make a plain delivery feel like a store visit." },
    ],
    rigid: ["collapsible", "lid-and-base", "magnetic-closure"],
    printed: ["mailer", "sleeve", "shipping"],
    services: ["packaging-design", "brand-identity"],
    compliance: COMPLIANCE_NOTE,
    illustration: "mailer-box",
    faqs: [{ q: "Can mailers be printed inside?", a: "Yes, inside and outside, which is the usual choice for apparel brands." }],
  },
  {
    slug: "electronics",
    name: "Electronics",
    styles: ["Lid & base", "EVA insert", "Shipping carton"],
    intro: "Rigid boxes and inserts for devices, accessories and their cables, chargers and manuals.",
    challenges: [
      { title: "Multiple parts", body: "Inserts hold the device, cables and paperwork in a set order." },
      { title: "Protection", body: "Outer cartons and inserts protect against drops and pressure in transit." },
    ],
    rigid: ["lid-and-base", "magnetic-closure", "book-style"],
    printed: ["shipping", "sleeve"],
    services: ["structural-dieline", "rigid-box-design", "3d-mockups"],
    compliance: COMPLIANCE_NOTE,
    illustration: "drawer",
    faqs: [{ q: "Can you design a multi-layer insert?", a: "Yes, stacked trays and lift-out layers are common for electronics." }],
  },
  {
    slug: "gifts-pr-kits",
    name: "PR Kits & Gifts",
    styles: ["Magnetic", "Book style", "Custom insert"],
    intro: "One-off and short-run boxes for launches, influencer kits and corporate gifting.",
    challenges: [
      { title: "Mixed contents", body: "Kits combine products of different sizes; each needs its cavity." },
      { title: "Hard deadlines", body: "Launches and events do not move; production is planned backwards from the date." },
    ],
    rigid: ["magnetic-closure", "book-style", "collapsible"],
    printed: ["mailer", "shipping"],
    services: ["rigid-box-design", "packaging-design", "3d-mockups"],
    compliance: COMPLIANCE_NOTE,
    illustration: "magnetic-closed",
    faqs: [{ q: "Can kits go out under the MOQ?", a: `Rigid boxes start at 500 per design. For smaller kits ask us; options depend on the box.` }],
  },
];

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);
