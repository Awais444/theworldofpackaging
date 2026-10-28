import type { IllustrationKey } from "@/components/illustrations";

export type WorkCategory = "Branding" | "Packaging" | "Rigid" | "Printed";

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  services: string[];
  categories: WorkCategory[];
  year: number;
  summary: string;
  challenge: string;
  solution: string[];
  /** Box illustration used for the cover and gallery until photos exist. */
  illustration: IllustrationKey;
  coverSlot: string;
  /** Gallery slot ids (see media.ts). */
  gallery: string[];
  /** Spec line, e.g. box style and board. */
  spec: string[];
  /** Placeholder results. TODO: real, approved figures only. */
  results: Array<{ value: string; label: string }>;
  /** True until replaced with a real client project. Shows a "Sample project" badge. */
  placeholder: boolean;
};

const GALLERY_SIZE = 6;
export const caseCover = (slug: string) => `case-${slug}-cover`;
export const caseGallery = (slug: string) => Array.from({ length: GALLERY_SIZE }, (_, i) => `case-${slug}-gallery-${i + 1}`);

const PLACEHOLDER_RESULTS = [
  { value: "TBC", label: "Result 1: add a real, approved figure" },
  { value: "TBC", label: "Result 2: add a real, approved figure" },
  { value: "TBC", label: "Result 3: add a real, approved figure" },
];

type Input = Omit<CaseStudy, "coverSlot" | "gallery" | "results" | "placeholder">;

const sample = (c: Input): CaseStudy => ({ ...c, coverSlot: caseCover(c.slug), gallery: caseGallery(c.slug), results: PLACEHOLDER_RESULTS, placeholder: true });

// TODO: replace all six with real projects. Brand names are fictional on purpose.
export const caseStudies: CaseStudy[] = [
  sample({
    slug: "halden-apothecary",
    client: "Halden Apothecary",
    industry: "Cosmetics",
    services: ["Brand identity", "Packaging design", "Rigid boxes"],
    categories: ["Branding", "Packaging", "Rigid"],
    year: 2026,
    summary: "A skincare launch: identity, a three-SKU carton system and a magnetic gift box with a foiled lid.",
    challenge: "A new skincare line needed a brand, retail cartons for three products and a gift box for launch, all ready for one production window.",
    solution: [
      "We positioned the range as quiet and clinical, so the gift box could carry the only flourish: a gold foil mark on the lid.",
      "Tuck end cartons for each SKU share one layout. A magnetic rigid box with an EVA insert holds all three for gifting.",
      "Cartons and rigid boxes were printed and made in our factory, with one foil die shared across both.",
    ],
    illustration: "magnetic-closed",
    spec: ["Magnetic closure", "2.0 mm board", "Gold foil"],
  }),
  sample({
    slug: "ostra-tea",
    client: "Ostra Tea Co.",
    industry: "Food & beverage",
    services: ["Packaging design", "Printed boxes"],
    categories: ["Packaging", "Printed"],
    year: 2026,
    summary: "Subscription mailers printed inside and out, with a dieline built around a tin and two sachets.",
    challenge: "A tea subscription needed a mailer that posts without an outer box and turns the unboxing into part of the brand.",
    solution: [
      "We built an E-flute mailer around the tin and two sachets, with a card insert that keeps everything in place.",
      "The outside carries a bold pattern; the inside has a welcome message and brewing guide.",
      "Mailers ship flat to the fulfilment centre and fold up in seconds.",
    ],
    illustration: "mailer-box",
    spec: ["Mailer", "E-flute", "CMYK inside + out"],
  }),
  sample({
    slug: "kiri-atelier",
    client: "Kiri Atelier",
    industry: "Jewellery",
    services: ["Logo design", "Brand identity", "Rigid boxes"],
    categories: ["Branding", "Rigid"],
    year: 2025,
    summary: "A wordmark, palette and pattern system for a small-batch jeweller, built to work at ring-box scale.",
    challenge: "A jeweller selling online and at markets needed a brand that holds up on a 40 mm ring box as well as on a website.",
    solution: [
      "A compact wordmark that stays legible when debossed small, with a pattern for tissue and inside lids.",
      "Drawer boxes in linen wrap with a velvet insert, in three sizes from one system.",
      "Foil and deboss tests on our press settled the minimum logo size before production.",
    ],
    illustration: "drawer",
    spec: ["Drawer box", "Linen wrap", "Blind deboss"],
  }),
  sample({
    slug: "marrow-and-vale",
    client: "Marrow & Vale",
    industry: "Candles",
    services: ["Packaging design", "Rigid boxes"],
    categories: ["Packaging", "Rigid"],
    year: 2025,
    summary: "Collapsible rigid boxes for a candle brand shipping to the UK and US, packed flat to cut freight.",
    challenge: "A candle brand selling abroad was paying to ship air: assembled rigid boxes filled cartons long before the weight limit.",
    solution: [
      "We moved the range to collapsible rigid boxes with a magnetic lid, so boxes ship and store flat.",
      "A kraft wrap with a debossed logo keeps the natural look of the brand.",
      "Card inserts hold each candle upright; assembly takes seconds at the packing table.",
    ],
    illustration: "collapsible-assembled",
    spec: ["Collapsible rigid", "Kraft wrap", "Ships flat"],
  }),
  sample({
    slug: "northline-audio",
    client: "Northline Audio",
    industry: "Electronics",
    services: ["Structural & dieline design", "3D mockups", "Rigid boxes"],
    categories: ["Packaging", "Rigid"],
    year: 2026,
    summary: "A lid-and-base box with a two-layer EVA insert for wireless earbuds, cables and a manual.",
    challenge: "A headphone brand needed premium retail packaging that protects the product in transit and presents several parts neatly.",
    solution: [
      "A two-layer insert: earbuds on top, a lift-out tray below for cables and the manual.",
      "3D renders were approved before sampling, so the store listing went live before production finished.",
      "Soft-touch wrap with spot UV on the logo, made in our factory.",
    ],
    illustration: "lid-and-base",
    spec: ["Lid & base", "Two-layer EVA", "Soft-touch + spot UV"],
  }),
  sample({
    slug: "sola-botanics",
    client: "Sola Botanics",
    industry: "Supplements",
    services: ["Label design", "Packaging design", "Printed boxes"],
    categories: ["Packaging", "Printed"],
    year: 2025,
    summary: "Labels and tuck end cartons for a six-product supplement range, one system with a colour per product.",
    challenge: "A supplement range had grown product by product, with no shared look between jars, labels and cartons.",
    solution: [
      "One label and carton template, with a colour band per product so the range reads together on a shelf.",
      "Text panels laid out with room for the regulatory copy supplied by the client.",
      "Cartons printed on SBS board with matte lamination and a spot UV logo.",
    ],
    illustration: "tuck-end",
    spec: ["Tuck end", "SBS board", "Matte + spot UV"],
  }),
];

/** Real projects only. Sample (placeholder) projects stay in this file until replaced. */
export const publicCaseStudies = caseStudies.filter((c) => !c.placeholder);

export const getCaseStudy = (slug: string) => publicCaseStudies.find((c) => c.slug === slug);
