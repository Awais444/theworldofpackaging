import type { Faq } from "./rigidStyles";

export type OptionCard = { name: string; text: string; bestFor: string; tag?: string };

export type OptionPageContent = {
  path: string;
  crumb: string;
  title: string;
  highlight: string;
  eyebrow: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  slot: string;
  groups: Array<{ title: string; highlight: string; lead: string; cards: OptionCard[] }>;
  compare: { caption: string; rows: Array<{ label: string; value: string }> };
  faqs: Faq[];
};

export const materialsPage: OptionPageContent = {
  path: "/materials",
  crumb: "Materials",
  eyebrow: "Materials",
  title: "Board and paper for every box",
  highlight: "every",
  intro: "The material sets how a box feels, how it protects and what it costs to ship. Here is what we work with and when to use it.",
  metaTitle: "Packaging Materials for Boxes",
  metaDescription: "Rigid greyboard 1.5–3 mm, SBS paperboard, kraft, E- and B-flute corrugated, specialty papers, linen and leatherette wraps.",
  slot: "collapsible-flat",
  groups: [
    {
      title: "Structural boards",
      highlight: "boards",
      lead: "The board is the skeleton of the box.",
      cards: [
        { name: "Rigid greyboard (1.5–3 mm)", text: "Dense recycled board that does not flex. Wrapped in paper or cloth to make rigid boxes.", bestFor: "Gift boxes, luxury retail, PR kits", tag: "Rigid" },
        { name: "SBS paperboard", text: "Solid bleached board, 300–400 gsm. Bright white surface for sharp, vivid print.", bestFor: "Tuck end boxes, folding cartons, sleeves", tag: "Printed" },
        { name: "Kraft board", text: "Unbleached brown board with a natural look. Bold artwork prints best on it.", bestFor: "Eco-minded brands, food, candles", tag: "Printed" },
        { name: "E-flute corrugated", text: "About 1.5 mm thick. Light, with crush strength for posting.", bestFor: "Mailer boxes, subscription boxes", tag: "Printed" },
        { name: "B-flute corrugated", text: "About 3 mm thick. Stronger for heavier products and stacking.", bestFor: "Shipping cartons, heavy mailers", tag: "Printed" },
      ],
    },
    {
      title: "Wraps and surfaces",
      highlight: "surfaces",
      lead: "The wrap is what customers see and touch on a rigid box.",
      cards: [
        { name: "Printed art paper", text: "157 gsm coated paper, printed CMYK or Pantone, then laminated.", bestFor: "Full-colour artwork and photography" },
        { name: "Specialty papers", text: "Textured, uncoated or coloured-through stocks with a crafted feel.", bestFor: "Minimal brands, debossed logos" },
        { name: "Linen cloth", text: "Woven book-cloth that takes foil and debossing beautifully.", bestFor: "Jewellery, books, keepsake boxes" },
        { name: "Leatherette", text: "PU material with a grain finish and a soft hand-feel.", bestFor: "Watches, jewellery, premium sets" },
        { name: "Recycled and FSC options", text: "Recycled boards and certified papers are available for many specs. We confirm availability with your quote.", bestFor: "Brands with sustainability goals" }, // TODO verify certification wording
      ],
    },
  ],
  compare: {
    caption: "Which material should I choose?",
    rows: [
      { label: "Premium gift or retail box", value: "Rigid greyboard with art paper, linen or leatherette wrap" },
      { label: "Shelf box for small products", value: "SBS paperboard tuck end or folding carton" },
      { label: "E-commerce and subscriptions", value: "E-flute corrugated mailer" },
      { label: "Heavy or fragile shipping", value: "B-flute corrugated shipping carton" },
      { label: "Natural, earthy look", value: "Kraft board or kraft wrap" },
    ],
  },
  faqs: [
    { q: "What is greyboard?", a: "Dense board made from recycled paper fibre. It does not flex like folding carton, which is what makes a box rigid." },
    { q: "Which greyboard thickness do I need?", a: "2.0 mm suits most gift boxes. Use 1.5 mm for slim, light boxes and 2.5–3.0 mm for heavy products or large formats." },
    { q: "Can I get material swatches?", a: "Yes. We can send board and wrap swatches with your sample so you choose with the materials in hand." },
    { q: "Do you offer recycled or FSC-certified materials?", a: "We can source recycled boards and certified papers for many specs. Ask with your quote and we confirm what is available." }, // TODO confirm certifications
    { q: "Is corrugated strong enough to post without an outer box?", a: "E- and B-flute mailers are designed to ship on their own. We size the flute to your product weight." },
  ],
};

export const finishesPage: OptionPageContent = {
  path: "/finishes",
  crumb: "Finishes",
  eyebrow: "Finishes",
  title: "Finishes people notice",
  highlight: "notice",
  intro: "Finishes turn a printed box into a premium one. Combine two or three for the best effect, like soft-touch with gold foil.",
  metaTitle: "Box Finishes and Print Effects",
  metaDescription: "Foil stamping, embossing and debossing, spot UV, matte and gloss lamination, soft-touch, window patches, ribbons and magnets.",
  slot: "rigid-magnetic-closure-gallery-4",
  groups: [
    {
      title: "Print finishes",
      highlight: "Print",
      lead: "Applied to the printed sheet before the box is made.",
      cards: [
        { name: "Foil stamping", text: "Metallic or pigment foil pressed with a heated die. Gold, silver, copper, rose gold or holographic.", bestFor: "Logos, borders and small type" },
        { name: "Embossing and debossing", text: "Artwork raised from behind or pressed into the surface. Works blind or with foil.", bestFor: "Logos you can feel" },
        { name: "Spot UV", text: "Gloss varnish on selected areas, usually over matte or soft-touch.", bestFor: "Patterns and logo highlights" },
        { name: "Matte or gloss lamination", text: "A protective film that sets the sheen and protects the print from scuffs.", bestFor: "Every printed box" },
        { name: "Soft-touch lamination", text: "A velvet-feel matte film with a premium hand-feel.", bestFor: "Cosmetics, tech, luxury retail" },
      ],
    },
    {
      title: "Structural add-ons",
      highlight: "add-ons",
      lead: "Added to the box itself.",
      cards: [
        { name: "Window patch", text: "Clear PET film behind a die-cut window shows the product.", bestFor: "Food, toys, cosmetics" },
        { name: "Ribbon", text: "Satin or grosgrain ribbon as a pull tab, tie or hinge.", bestFor: "Drawer boxes, book boxes" },
        { name: "Magnets", text: "Concealed magnets under the wrap close the lid cleanly.", bestFor: "Magnetic and book-style rigid boxes" },
      ],
    },
  ],
  compare: {
    caption: "Popular finish combinations",
    rows: [
      { label: "Classic luxury", value: "Soft-touch lamination + gold foil logo" },
      { label: "Tactile minimal", value: "Uncoated specialty paper + blind deboss" },
      { label: "Bold and glossy", value: "Matte lamination + spot UV pattern" },
      { label: "Jewellery and watches", value: "Linen wrap + foil + velvet insert" },
    ],
  },
  faqs: [
    { q: "How many finishes can I combine?", a: "Most boxes use two or three. More is possible, but each finish adds a step and some cost." },
    { q: "Which foil colours are available?", a: "Gold, silver, copper, rose gold, holographic and pigment foils in many colours." },
    { q: "Does foil work on kraft paper?", a: "Yes, though fine detail is softer on rough stocks. We advise on minimum line weights during artwork checks." },
    { q: "Will I see finishes on my sample?", a: "Yes. Samples are made on the production line with your real finishes." },
    { q: "Does spot UV need a separate file?", a: "Yes, a spot layer in your artwork. Our free design support sets it up if needed." },
  ],
};

export const insertsPage: OptionPageContent = {
  path: "/inserts",
  crumb: "Inserts",
  eyebrow: "Inserts",
  title: "Inserts that hold everything in place",
  highlight: "place",
  intro: "An insert stops products moving in transit and makes the unboxing look deliberate. Each one is cut to your exact product.",
  metaTitle: "Box Inserts: EVA, Card and More",
  metaDescription: "Custom-cut EVA foam, velvet and flocked inserts, cardboard dividers, satin cushions and moulded pulp trays.",
  slot: "mega-menu-feature",
  groups: [
    {
      title: "Insert types",
      highlight: "types",
      lead: "Cut to fit your product, in any colour that suits the brand.",
      cards: [
        { name: "EVA foam", text: "CNC-cut cavities that grip each item. Black, white or grey.", bestFor: "Bottles, jars, electronics" },
        { name: "Velvet or flocked", text: "EVA or card wrapped in velvet or flocked fabric.", bestFor: "Jewellery, watches, gifts" },
        { name: "Cardboard", text: "Folded paperboard dividers. Recyclable and easy to print on.", bestFor: "Multi-product sets, subscription boxes" },
        { name: "Satin", text: "A padded satin cushion or lining for single items.", bestFor: "Watches, rings, perfume" },
        { name: "Moulded pulp", text: "Pressed paper fibre trays shaped to your product. Plastic-free.", bestFor: "Eco brands, electronics, bottles" },
      ],
    },
  ],
  compare: {
    caption: "Which insert should I choose?",
    rows: [
      { label: "Heavy or fragile items", value: "EVA foam" },
      { label: "Jewellery and watches", value: "Velvet-lined EVA or satin" },
      { label: "Lowest cost, recyclable", value: "Cardboard insert" },
      { label: "Plastic-free protection", value: "Moulded pulp" },
    ],
  },
  faqs: [
    { q: "Do I need to send my product?", a: "Exact dimensions are usually enough. For complex shapes, sending a product gives the best fit." },
    { q: "Can inserts be printed?", a: "Cardboard inserts can be printed. Foam and pulp can carry a foil or printed sticker." },
    { q: "Is moulded pulp more expensive?", a: "It needs its own tooling, so it suits larger runs. We compare costs in your quote." },
    { q: "Can one insert hold several products?", a: "Yes. We design multi-cavity inserts for sets and PR kits." },
    { q: "Will my sample include the insert?", a: "Yes. Samples include the insert so you can check the fit." },
  ],
};
