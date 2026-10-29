import type { IllustrationKey } from "@/components/illustrations";
import type { BoxRef } from "./designServices";
import type { PhotoKey } from "./photos";

export type WorkCategory = "Branding" | "Packaging" | "Rigid" | "Printed";

/** Services offered on case studies (confirm per project with the team). */
export type CaseService = "Packaging design" | "Label design" | "Rigid box manufacturing" | "Printing";

export type CaseStudy = {
  slug: string;
  /** Brand name as printed on the pack. */
  client: string;
  /** Short project title, e.g. "Magnetic rigid gift box". */
  project: string;
  industry: string;
  services: CaseService[];
  categories: WorkCategory[];
  /** TODO: confirm year with the team. Hidden while null. */
  year: string | null;
  summary: string;
  challenge: string;
  solution: string[];
  /** What we made: formats, materials and finishes visible in the photos. */
  made: string[];
  /** Approved results only. TODO: confirm with the client; the section shows a neutral note while empty. */
  results: Array<{ value: string; label: string }>;
  /** Fallback illustration if a photo is missing. */
  illustration: IllustrationKey;
  coverSlot: string;
  gallery: string[];
  photos: { cover: PhotoKey; gallery: PhotoKey[] };
  spec: string[];
  /** Pages that link to this project as "Related work". */
  related: { designServices: string[]; boxes: BoxRef[]; industries: string[] };
  placeholder: boolean;
};

type Input = Omit<CaseStudy, "coverSlot" | "gallery" | "results" | "placeholder" | "year">;

export const caseCover = (slug: string) => `case-${slug}-cover`;

const real = (c: Input): CaseStudy => ({
  ...c,
  year: null,
  results: [],
  coverSlot: caseCover(c.slug),
  gallery: c.photos.gallery.map((_, i) => `case-${c.slug}-gallery-${i + 1}`),
  // Ownership not yet confirmed in writing: shown with a "Sample project" badge, noindex, out of the sitemap.
  placeholder: true,
});

/**
 * Packaging projects (ownership to confirm), written from what is visible in the photos. Business claims stay
 * neutral. TODO per project (see CONTENT_TODO.md "Case studies – confirm with team"): year,
 * services, client quote and approved results.
 */
export const caseStudies: CaseStudy[] = [
  real({
    slug: "united-gift-club-magnetic-gift-box",
    client: "United Gift Club",
    project: "Magnetic closure rigid gift box",
    industry: "Gifts & PR kits",
    services: ["Packaging design", "Rigid box manufacturing"],
    categories: ["Packaging", "Rigid"],
    summary: "A dark green magnetic closure gift box with a gold foil crest on the lid and inside the flap.",
    challenge: "A gifting brand needed a box that feels premium the moment it is handed over, carries its crest clearly and opens to a thank-you message.",
    solution: [
      "We kept the outside quiet: a deep green wrap with one gold foil crest and fine foil leaf illustrations at the corners.",
      "The crest repeats inside the magnetic flap with a short thank-you line, so the brand is the first thing seen on opening.",
      "A small social handle on the front edge gives customers a next step without crowding the lid.",
    ],
    made: ["Magnetic closure rigid box", "Dark green wrap paper", "Gold foil crest and leaf details", "Printed inside flap"],
    illustration: "magnetic-open",
    photos: { cover: "magnetic", gallery: [] },
    spec: ["Magnetic closure", "Gold foil", "Inside print"],
    related: { designServices: ["luxury-packaging-design", "gift-box-pr-kit-design", "rigid-luxury-box-design"], boxes: ["rigid:magnetic-closure"], industries: ["gifts-pr-kits"] },
  }),
  real({
    slug: "springwater-soaps-window-cartons",
    client: "Springwater Soaps",
    project: "Window folding cartons for a soap range",
    industry: "Cosmetics",
    services: ["Packaging design", "Printing"],
    categories: ["Packaging", "Printed"],
    summary: "Pink and green soap cartons with leaf-shaped die-cut windows that show the bar inside.",
    challenge: "A handmade soap range needed retail cartons that let shoppers see the soap, separate the scents at a glance and still carry the product details.",
    solution: [
      "A leaf-shaped die-cut window on each lid shows the bar and echoes the botanical ingredients.",
      "Two colourways, pink and green, separate the ranges, with the scent name and weight in a white panel on every carton.",
      "Icons along the side panel keep usage and ingredient notes short and consistent across the range.",
    ],
    made: ["Folding cartons", "Die-cut windows", "Two-colour range system", "Metallic gold logo"],
    illustration: "tuck-end",
    photos: { cover: "soapCartons", gallery: [] },
    spec: ["Folding carton", "Die-cut window", "Range of SKUs"],
    related: { designServices: ["soap-bath-packaging-design", "retail-packaging-design", "box-packaging-design"], boxes: ["printed:folding-carton", "printed:tuck-end"], industries: ["cosmetics"] },
  }),
  real({
    slug: "hip-hip-coffee-pouches",
    client: "Hip Hip! Coffee",
    project: "Coffee pouches and brand packaging range",
    industry: "Food & drink",
    services: ["Packaging design", "Label design", "Printing"],
    categories: ["Branding", "Packaging"],
    summary: "Stand-up pouches for the Radical Toast and Café Fugaz coffees, with matching cups and a coffee guide.",
    challenge: "A coffee brand wanted each roast to have its own character while the whole range, from pouches to takeaway cups, still looked like one brand.",
    solution: [
      "Each coffee gets its own colour and illustration: navy and a planet for Radical Toast, orange and a molecule for Café Fugaz.",
      "A wavy white band and the same type system run across every pouch, so the range lines up on a shelf.",
      "The wave pattern carries onto takeaway cups and a small coffee guide, extending the brand beyond the pouch.",
    ],
    made: ["Stand-up coffee pouches", "Takeaway cup designs", "Coffee guide booklet", "Badge and brand illustrations"],
    illustration: "brand-board",
    photos: { cover: "coffeeRange", gallery: ["pouch"] },
    spec: ["Stand-up pouch", "Range system", "Brand illustrations"],
    related: { designServices: ["coffee-tea-packaging-design", "pouch-packaging-design", "packaging-brand-strategy"], boxes: [], industries: ["food-bakery"] },
  }),
  real({
    slug: "barkers-secret-handmade-soap-packaging",
    client: "Barker's Secret",
    project: "Handmade soap packaging set",
    industry: "Cosmetics",
    services: ["Packaging design", "Printing"],
    categories: ["Packaging", "Printed"],
    summary: "A family of soap cartons, a drawer box, a carrier box and a tall gift carton for a handmade soap brand.",
    challenge: "A handmade soap brand needed packaging for single bars, gift sets and a carry-out box, all clearly part of one vintage-inspired brand.",
    solution: [
      "Every pack uses the same cream stock, script lettering and fine line illustrations, with one illustration per scent.",
      "Single bars sit in compact cartons; a two-drawer box and a tall carton turn several bars into a gift.",
      "A carrier box with handles makes the set easy to take away, with the brand mark centred on the front.",
    ],
    made: ["Soap cartons", "Drawer box", "Carrier box with handles", "Tall gift carton"],
    illustration: "tuck-end",
    photos: { cover: "soapSet", gallery: [] },
    spec: ["Folding cartons", "Drawer box", "Gift set"],
    related: { designServices: ["soap-bath-packaging-design", "box-packaging-design"], boxes: ["printed:folding-carton", "printed:tuck-end", "rigid:drawer"], industries: ["cosmetics", "gifts-pr-kits"] },
  }),
  real({
    slug: "olivia-boutique-kraft-box-sleeve",
    client: "Olivia Boutique",
    project: "Kraft box with printed sleeve",
    industry: "Retail & gifting",
    services: ["Packaging design", "Printing"],
    categories: ["Packaging", "Printed"],
    summary: "A kraft box wrapped in a printed paper sleeve reading Sealed with love, for a boutique's orders.",
    challenge: "A boutique wanted orders to feel personal without the cost of fully printed boxes.",
    solution: [
      "A plain kraft box keeps the base cost low, while a printed sleeve carries all of the branding.",
      "The sleeve pairs the boutique's olive logo with a short Sealed with love message and a hand-drawn stamp.",
      "Website and social handle on the sleeve give customers an easy way back to the shop.",
    ],
    made: ["Kraft box", "Printed paper sleeve", "Logo and stamp artwork"],
    illustration: "sleeve-box",
    photos: { cover: "sleeve", gallery: [] },
    spec: ["Kraft box", "Printed sleeve"],
    related: { designServices: ["unboxing-packaging-design", "box-packaging-design"], boxes: ["printed:sleeve", "printed:mailer"], industries: ["apparel", "gifts-pr-kits"] },
  }),
  real({
    slug: "fruits-and-berries-candle-tube",
    client: "Fruits & Berries",
    project: "Kraft tube for an aroma candle",
    industry: "Candles",
    services: ["Packaging design", "Label design", "Rigid box manufacturing"],
    categories: ["Packaging", "Rigid"],
    summary: "A kraft paper tube with a printed label for an aroma candle, in soft sage and blush tones.",
    challenge: "An aroma candle needed protective packaging that looks natural and gift-worthy, with a label that carries the brand's heritage feel.",
    solution: [
      "A kraft paper tube protects the candle and gives a natural, tactile finish.",
      "The wraparound label combines an engraved-style fruit illustration with soft landscape shapes in sage and blush.",
      "The same label artwork works on flat cards and inserts, so the brand looks consistent across the order.",
    ],
    made: ["Kraft paper tube", "Wraparound printed label", "Matching printed cards"],
    illustration: "label-bottle",
    photos: { cover: "tube", gallery: [] },
    spec: ["Kraft tube", "Printed label"],
    related: { designServices: ["candle-packaging-design", "sustainable-packaging-design", "label-design"], boxes: ["rigid:tube"], industries: ["candles"] },
  }),
  real({
    slug: "crampless-tea-kraft-packaging",
    client: "Crampless Tea",
    project: "Kraft tea box and pouches",
    industry: "Food & drink",
    services: ["Packaging design", "Label design", "Printing"],
    categories: ["Packaging", "Printed"],
    summary: "A long kraft box with a printed label sleeve and kraft tea pouches with white labels.",
    challenge: "A wellness tea needed packaging that explains how and when to drink it, while looking natural and calm.",
    solution: [
      "A long kraft box holds individually wrapped tea pouches, with a printed sleeve wrapped around the box.",
      "The sleeve explains the tea in two simple panels, The How and The When, with numbered icons.",
      "Each kraft pouch carries a small white label, so single servings stay on brand outside the box.",
    ],
    made: ["Kraft folding box", "Printed label sleeve", "Kraft tea pouches", "Pouch labels"],
    illustration: "tuck-end",
    photos: { cover: "tea", gallery: [] },
    spec: ["Kraft box", "Printed sleeve", "Pouch labels"],
    related: { designServices: ["coffee-tea-packaging-design", "label-design", "pouch-packaging-design"], boxes: ["printed:folding-carton", "printed:sleeve"], industries: ["food-bakery", "supplements"] },
  }),
  real({
    slug: "mr-negative-film-box-cartons",
    client: "Mr. Negative",
    project: "35mm film box cartons",
    industry: "Retail",
    services: ["Packaging design", "Printing"],
    categories: ["Packaging", "Printed"],
    summary: "Two printed tuck cartons for 35mm films, DayLIGHT Robbery and Same Same, shown flat on their dielines.",
    challenge: "A film brand needed small cartons with strong personality for each film stock, plus the technical details photographers look for.",
    solution: [
      "Each film gets its own character: a sunset palette for DayLIGHT Robbery, a magic trick illustration for Same Same.",
      "ISO, exposure count and storage notes sit in consistent places on every carton, with a barcode on the back panel.",
      "A recurring camera mascot and an Instagram call to action tie the range together.",
    ],
    made: ["Printed tuck end cartons", "Two film designs", "Mascot illustrations"],
    illustration: "dieline-flat",
    photos: { cover: "dielineDaylight", gallery: ["dielineIllustrated"] },
    spec: ["Tuck end carton", "Range of SKUs"],
    related: { designServices: ["box-packaging-design", "structural-dieline-design", "retail-packaging-design"], boxes: ["printed:tuck-end", "printed:folding-carton"], industries: [] },
  }),
  real({
    slug: "submersible-mailer-unboxing",
    client: "Submersible",
    project: "E-commerce mailer and unboxing kit",
    industry: "E-commerce",
    services: ["Packaging design", "Printing"],
    categories: ["Packaging", "Printed"],
    summary: "A striped mailer, illustrated kraft wrap and insert cards that turn an online order into an unboxing.",
    challenge: "An online brand wanted its orders to feel playful and memorable, and to bring customers back.",
    solution: [
      "A bold striped mailer in orange and blue makes the parcel recognisable before it is opened.",
      "Inside, kraft wrap printed with hand-drawn activity illustrations sets a playful tone.",
      "Insert cards add a joke and a follow-us discount code, giving customers a reason to order again.",
    ],
    made: ["Printed mailer", "Printed kraft wrap", "Insert cards"],
    illustration: "mailer-box",
    photos: { cover: "mailer", gallery: [] },
    spec: ["Mailer box", "Printed wrap", "Insert cards"],
    related: { designServices: ["unboxing-packaging-design", "subscription-box-design", "amazon-packaging-design"], boxes: ["printed:mailer", "printed:shipping"], industries: ["apparel", "gifts-pr-kits"] },
  }),
  real({
    slug: "wild-flowers-floral-gift-box",
    client: "Wild Flowers",
    project: "Floral printed gift box",
    industry: "Gifts & PR kits",
    services: ["Packaging design", "Printing"],
    categories: ["Packaging", "Printed"],
    summary: "A square gift box printed all over with a watercolour wild flowers design.",
    challenge: "A gift product needed a box that looks good from every side, on a shelf or in a customer's hands.",
    solution: [
      "Watercolour flowers wrap around every panel, so the box looks finished from any angle.",
      "A sage band and white panels give the name room to read clearly on the front and lid.",
      "The design is laid out on the dieline so the flowers continue across the folds.",
    ],
    made: ["Printed square gift box", "All-over watercolour artwork"],
    illustration: "lid-and-base",
    photos: { cover: "floral", gallery: [] },
    spec: ["Printed box", "All-over print"],
    related: { designServices: ["gift-box-pr-kit-design", "box-packaging-design"], boxes: ["printed:folding-carton", "printed:mailer"], industries: ["gifts-pr-kits"] },
  }),
];

/** Shown on the site (placeholders carry a "Sample project" badge and are noindex). */
export const publicCaseStudies = caseStudies;

export const getCaseStudy = (slug: string) => publicCaseStudies.find((c) => c.slug === slug);

/** Homepage "Featured work": the three strongest projects. */
export const featuredCaseSlugs = ["united-gift-club-magnetic-gift-box", "springwater-soaps-window-cartons", "hip-hip-coffee-pouches"];

/** Case studies linked from a page (service, box style or industry). */
export const relatedWork = (by: { designService?: string; box?: BoxRef; industry?: string }, n = 3) =>
  publicCaseStudies
    .filter(
      (c) =>
        (by.designService && c.related.designServices.includes(by.designService)) ||
        (by.box && c.related.boxes.includes(by.box)) ||
        (by.industry && c.related.industries.includes(by.industry)),
    )
    .slice(0, n);
