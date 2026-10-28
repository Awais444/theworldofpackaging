import { site } from "@/config/site";
import type { IllustrationKey } from "@/components/illustrations";
import type { WorkCategory } from "./caseStudies";
import type { Option } from "./materials";
import type { Faq } from "./rigidStyles";

export type ServiceHub = "branding" | "packaging-design";

export type AgencyService = {
  slug: string;
  hub: ServiceHub;
  name: string;
  summary: string;
  intro: string;
  deliverables: Option[];
  process: { title: string; body: string }[];
  /** USD. TODO: real "from" prices. null renders as "Get a quote". */
  priceFrom: number | null;
  /** Typical duration, neutral wording until confirmed. */
  timeline: string;
  workCategory: WorkCategory;
  illustration: IllustrationKey;
  faqs: Faq[];
};

export const hubs: Record<ServiceHub, { name: string; href: string; tagline: string; intro: string; illustration: IllustrationKey }> = {
  branding: {
    name: "Branding",
    href: "/services",
    tagline: "Brands built to be printed.",
    intro:
      "Strategy, names and identity systems from a studio that also runs a press. Every mark is tested at box scale, in foil and on kraft, before you sign it off.",
    illustration: "brand-board",
  },
  "packaging-design": {
    name: "Packaging Design",
    href: "/services",
    tagline: "Graphics and structure, drawn together.",
    intro:
      "Packaging design from the people who will manufacture it. Dielines are drawn for real board, artwork is checked on our own press, and nothing is handed to a printer who has never seen the brief.",
    illustration: "dieline-flat",
  },
};

const brandingProcess = [
  { title: "Brief", body: "A working session on product, customer, competitors and where the brand will appear." },
  { title: "Directions", body: `Two or three distinct routes, first concepts within ${site.facts.firstConceptHours} hours of the brief being signed off.` },
  { title: "Refine", body: "One route developed, applied to packaging, web and social so you judge it in context." },
  { title: "Handover", body: "Final files in every format you need, organised and named so your team can find them." },
];

const packagingProcess = [
  { title: "Brief + product", body: "Dimensions, weight, retail or e-commerce, and what the customer should feel when it opens." },
  { title: "Structure", body: "Box style, board and insert chosen; a white sample checks the fit before artwork." },
  { title: "Artwork", body: "Graphics placed on the real dieline, with bleed, safe areas and finishes marked." },
  { title: "Pre-press + sample", body: "Files checked against our press, then a printed sample made on the production line." },
];

export const agencyServices: AgencyService[] = [
  {
    slug: "strategy-naming",
    hub: "branding",
    name: "Strategy & Naming",
    summary: "Positioning, voice and a name you can trademark, before anything is designed.",
    intro:
      "We work out who the brand is for, what it should be known for and how it should sound. If you need a name, we shortlist options and run basic availability checks on domains and marks.",
    deliverables: [
      { name: "Positioning statement", detail: "One page: audience, promise, proof." },
      { name: "Tone of voice", detail: "How the brand writes, with do and don't examples." },
      { name: "Name shortlist", detail: "Options with rationale and preliminary availability notes." },
      { name: "Messaging hierarchy", detail: "What goes on the front of pack, the side panel and the website." },
    ],
    process: brandingProcess,
    priceFrom: null, // TODO
    timeline: "Agreed per project",
    workCategory: "Branding",
    illustration: "brand-board",
    faqs: [
      { q: "Do you register trademarks?", a: "No. We do preliminary checks and recommend you clear the final name with a trademark attorney in your markets." },
    ],
  },
  {
    slug: "logo-design",
    hub: "branding",
    name: "Logo Design",
    summary: "A wordmark or symbol that works at 8 mm on a label and 2 m on a trade stand.",
    intro:
      "Logos drawn for real use: foil, deboss, one-colour print on kraft and small digital sizes. You get the primary mark plus the variants your packaging will actually need.",
    deliverables: [
      { name: "Primary logo", detail: "Wordmark, symbol or combination." },
      { name: "Variants", detail: "Stacked, horizontal and a compact mark for small spaces." },
      { name: "Colour versions", detail: "Full colour, one colour, reversed and foil-ready." },
      { name: "File pack", detail: "Vector (AI, SVG, PDF) and raster (PNG) exports." },
    ],
    process: brandingProcess,
    priceFrom: null, // TODO
    timeline: "Agreed per project",
    workCategory: "Branding",
    illustration: "brand-board",
    faqs: [{ q: "How many concepts do I see?", a: "Two or three distinct directions in the first round, then refinement on the one you choose." }],
  },
  {
    slug: "brand-identity",
    hub: "branding",
    name: "Brand Identity",
    summary: "The full system: logo, type, colour, pattern, photography direction and packaging application.",
    intro:
      "A complete identity designed with packaging in mind from day one. We set the rules for colour, type and layout, then show them working on boxes, labels, mailers and screens.",
    deliverables: [
      { name: "Logo suite", detail: "Primary mark and all variants." },
      { name: "Colour palette", detail: "Pantone, CMYK, RGB and hex, with foil and paper notes." },
      { name: "Typography", detail: "Display and text faces with sizes and spacing rules." },
      { name: "Graphic elements", detail: "Patterns, icons and shapes that extend the brand." },
      { name: "Application mockups", detail: "Packaging, stationery and digital examples." },
    ],
    process: brandingProcess,
    priceFrom: null, // TODO
    timeline: "Agreed per project",
    workCategory: "Branding",
    illustration: "brand-board",
    faqs: [{ q: "Is packaging design included?", a: "Identity includes packaging mockups. Production-ready packaging artwork is a separate packaging design scope, or bundled in our packages." }],
  },
  {
    slug: "brand-guidelines",
    hub: "branding",
    name: "Brand Guidelines",
    summary: "A clear rulebook so printers, agencies and your own team apply the brand consistently.",
    intro:
      "Guidelines written for the people who will use them: designers, printers and marketing teams. Practical, short, and full of correct and incorrect examples.",
    deliverables: [
      { name: "Guidelines document", detail: "PDF, usually 20 to 40 pages." },
      { name: "Print specification", detail: "Pantone references, stock notes and finish rules." },
      { name: "Templates", detail: "Labels, social posts or presentation templates as needed." },
    ],
    process: brandingProcess,
    priceFrom: null, // TODO
    timeline: "Agreed per project",
    workCategory: "Branding",
    illustration: "brand-board",
    faqs: [{ q: "Can you write guidelines for an existing brand?", a: "Yes. We audit what exists, fix inconsistencies and document the result." }],
  },
  {
    slug: "rebranding",
    hub: "branding",
    name: "Rebranding",
    summary: "Evolve or replace an existing brand without losing the customers who already know it.",
    intro:
      "We start with what is working and what is not, then decide how far to move. A rebrand plan includes the packaging transition, so old and new stock do not clash on the shelf.",
    deliverables: [
      { name: "Brand audit", detail: "What to keep, fix or drop." },
      { name: "New identity", detail: "Evolution or full redesign." },
      { name: "Rollout plan", detail: "Packaging changeover order and timing." },
    ],
    process: brandingProcess,
    priceFrom: null, // TODO
    timeline: "Agreed per project",
    workCategory: "Branding",
    illustration: "brand-board",
    faqs: [{ q: "What happens to my existing packaging stock?", a: "We plan the switch around your stock levels so nothing is wasted where it can be avoided." }],
  },
  {
    slug: "packaging-design",
    hub: "packaging-design",
    name: "Packaging Design",
    summary: "Graphics for boxes, cartons and mailers, laid out on the real dieline and ready to print.",
    intro:
      "Packaging artwork designed for a specific structure and stock. We place every element on the dieline, mark finishes on separate layers and check the file on our own press.",
    deliverables: [
      { name: "Concepts", detail: "Two or three directions on 3D mockups." },
      { name: "Print-ready artwork", detail: "On the dieline, with bleed, safe area and finish layers." },
      { name: "Colour proofing", detail: "Printed proof on production stock." },
    ],
    process: packagingProcess,
    priceFrom: null, // TODO
    timeline: "Agreed per project",
    workCategory: "Packaging",
    illustration: "magnetic-open",
    faqs: [{ q: "Can you design for another printer?", a: "Yes, we supply files to any printer's spec, though we can only guarantee results on our own press." }],
  },
  {
    slug: "rigid-box-design",
    hub: "packaging-design",
    name: "Rigid Box Design",
    summary: "Luxury box design: wrap artwork, foil and emboss plates, insert layout and opening sequence.",
    intro:
      "Rigid boxes need more than flat artwork. We design the wrap for each panel, the inside print, the foil and emboss plates and the insert, then make a sample on our line.",
    deliverables: [
      { name: "Wrap artwork", detail: "Outer and inner wraps on the rigid dieline." },
      { name: "Finish plates", detail: "Separate foil, emboss and spot UV artwork." },
      { name: "Insert design", detail: "Cavity layout from your products." },
      { name: "Production sample", detail: "Made on our own line." },
    ],
    process: packagingProcess,
    priceFrom: null, // TODO
    timeline: "Agreed per project",
    workCategory: "Rigid",
    illustration: "magnetic-open",
    faqs: [{ q: "Do I have to manufacture with you?", a: "No, but design and production together is where we save you the most time and reprints." }],
  },
  {
    slug: "label-design",
    hub: "packaging-design",
    name: "Label Design",
    summary: "Labels for bottles, jars and tins, designed to the container curve and the regulations on it.",
    intro:
      "Label artwork sized to the container, with space planned for ingredients, barcodes and regulatory text. We note the label stock and finish so your label printer gets a complete spec.",
    deliverables: [
      { name: "Label artwork", detail: "Front, back and neck labels as needed." },
      { name: "Container mockups", detail: "Labels shown wrapped on the real container shape." },
      { name: "Print spec", detail: "Stock, finish, die shape and roll direction notes." },
    ],
    process: packagingProcess,
    priceFrom: null, // TODO
    timeline: "Agreed per project",
    workCategory: "Packaging",
    illustration: "label-bottle",
    faqs: [{ q: "Do you check regulatory text?", a: "We lay it out clearly, but the content must come from you or your compliance adviser." }],
  },
  {
    slug: "structural-dieline",
    hub: "packaging-design",
    name: "Structural Design & Dielines",
    summary: "Custom box structures and dielines, drawn for the board, tested as white samples.",
    intro:
      "When a stock template will not do, we engineer the structure: fold sequence, locks, inserts and board calliper. You get a tested dieline any manufacturer can use.",
    deliverables: [
      { name: "Dieline", detail: "Vector file with cut, crease, bleed and glue areas." },
      { name: "White sample", detail: "Unprinted sample to check fit and assembly." },
      { name: "Assembly notes", detail: "Fold sequence for your packing team." },
    ],
    process: packagingProcess,
    priceFrom: null, // TODO
    timeline: "Agreed per project",
    workCategory: "Packaging",
    illustration: "dieline-flat",
    faqs: [{ q: "Can I use the dieline with another manufacturer?", a: "Yes. The dieline is yours once the project is paid." }],
  },
  {
    slug: "3d-mockups",
    hub: "packaging-design",
    name: "3D Mockups",
    summary: "Photoreal renders of your packaging for pre-launch, crowdfunding and online stores.",
    intro:
      "Renders built from the real dieline and artwork, so what people see before launch matches what arrives. Useful while production is still running.",
    deliverables: [
      { name: "Hero renders", detail: "High-resolution stills from agreed angles." },
      { name: "Open-box views", detail: "Lid off, insert and product visible." },
      { name: "Web exports", detail: "Sized for store listings and social." },
    ],
    process: packagingProcess,
    priceFrom: null, // TODO
    timeline: "Agreed per project",
    workCategory: "Packaging",
    illustration: "magnetic-closed",
    faqs: [{ q: "Can renders replace photography?", a: "For launch, often yes. Once stock exists we recommend real photography for product pages." }],
  },
];

export const serviceCommonFaqs: Faq[] = [
  {
    q: "How quickly do I see first concepts?",
    a: `Usually within ${site.facts.firstConceptHours} hours of the brief being agreed, for logo and packaging concept rounds.`,
  },
  { q: "How many revision rounds are included?", a: "We agree rounds in the proposal before work starts, so there are no surprises." },
];
