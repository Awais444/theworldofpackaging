import { site } from "@/config/site";
import type { Faq } from "./rigidStyles";

export type BoxFeature = { title: string; text: string };

/** Four style-specific features per box page (CLAUDE.md §7.1, section 4). */
export const rigidFeatures: Record<string, BoxFeature[]> = {
  "magnetic-closure": [
    { title: "Hidden magnets", text: "Magnets sit under the wrap, so the flap closes cleanly with no visible hardware." },
    { title: "Keepsake quality", text: "Customers keep it for storage, so your logo stays in their home." },
    { title: "Wide lid for foil", text: "The lid is one large panel, ideal for a foil or embossed logo." },
    { title: "Flat-pack option", text: "Available as a collapsible version that ships flat." },
  ],
  "lid-and-base": [
    { title: "Classic two-piece", text: "A separate lid lifts off the base: the simplest premium unboxing." },
    { title: "Any lid depth", text: "Full-depth lids for a solid look, or shallow lids that show the base wrap." },
    { title: "Easy to scale", text: "One construction works from ring boxes to large hampers." },
    { title: "Thumb notch option", text: "A cut-out on the base makes the lid easy to lift." },
  ],
  drawer: [
    { title: "Slide-out reveal", text: "A tray slides out of an outer sleeve for a slow, deliberate reveal." },
    { title: "Ribbon pull", text: "Ribbon or tab pulls make the tray easy to open." },
    { title: "Two surfaces to print", text: "Sleeve and tray can carry different colours or messages." },
    { title: "Stackable", text: "Flat top and base stack neatly on shelves and in shipping." },
  ],
  "book-style": [
    { title: "Opens like a book", text: "A hinged cover swings open from the side, like a hardback." },
    { title: "Spine for branding", text: "The spine carries your name when boxes are stored upright." },
    { title: "Magnet or ribbon close", text: "Hidden magnets or a ribbon tie keep the cover shut." },
    { title: "Great for sets", text: "Ideal for PR kits, collections and presentation boxes." },
  ],
  collapsible: [
    { title: "Ships flat", text: "Hinged walls fold into the base, cutting carton volume for freight." },
    { title: "Rigid when built", text: "Assembled, it feels the same as a fixed rigid box." },
    { title: "No tools", text: "Lift the walls and the magnetic lid holds everything in place." },
    { title: "Lower storage cost", text: "Flat boxes take far less warehouse space until you need them." },
  ],
  "shoulder-neck": [
    { title: "Three-piece build", text: "Base, raised neck and lid create a stepped, premium profile." },
    { title: "Contrast neck", text: "The neck can be wrapped in a contrast colour or foil." },
    { title: "Snug fit", text: "The lid rests on the shoulder, so it feels secure and weighty." },
    { title: "Made for bottles", text: "Popular for perfume, spirits and luxury candles." },
  ],
  tube: [
    { title: "Round profile", text: "A cylinder stands out on a shelf full of square boxes." },
    { title: "Telescopic lid", text: "The lid slides over a neck for a smooth, slow opening." },
    { title: "Many diameters", text: "Sized to fit bottles, tea, candles or rolled prints." },
    { title: "Full-wrap print", text: "Artwork runs all the way around the tube." },
  ],
  window: [
    { title: "Product on show", text: "A clear PET window shows the product without opening the box." },
    { title: "Any window shape", text: "Rectangles, circles or custom die-cut shapes." },
    { title: "Rigid protection", text: "Greyboard walls protect the product while it is on display." },
    { title: "Retail ready", text: "Shoppers see colour and finish at a glance." },
  ],
};

export const printedFeatures: Record<string, BoxFeature[]> = {
  mailer: [
    { title: "Ships on its own", text: "Corrugated walls are strong enough to post without an outer box." },
    { title: "Tape-free closing", text: "Tuck-front lid and double side walls lock shut." },
    { title: "Print inside", text: "Add a message or pattern inside for the unboxing moment." },
    { title: "Flat delivery", text: "Arrives flat and folds up in seconds." },
  ],
  "tuck-end": [
    { title: "Retail standard", text: "The shelf box for cosmetics, supplements and small goods." },
    { title: "Fast to pack", text: "Tuck flaps at both ends close without glue." },
    { title: "Sharp print", text: "SBS board gives bright white for crisp colour." },
    { title: "Hang tab option", text: "Add a hanger tab for peg display." },
  ],
  "folding-carton": [
    { title: "Any structure", text: "Crash-lock bases, sleeves and custom folds from one sheet." },
    { title: "Light and cheap", text: "Paperboard keeps weight and unit cost low at volume." },
    { title: "Fully printable", text: "Every panel can carry artwork and finishes." },
    { title: "Recyclable", text: "Paperboard goes in standard paper recycling." },
  ],
  shipping: [
    { title: "Built to travel", text: "B-flute or double-wall board protects heavy or fragile goods." },
    { title: "Branded outer", text: "A one- or two-colour logo turns a plain carton into brand space." },
    { title: "Custom sizes", text: "Sized to your product, so you ship less air and void fill." },
    { title: "Stacks on pallets", text: "Strong corners stack safely in freight." },
  ],
  display: [
    { title: "Counter ready", text: "Opens into a tray that sits by the till." },
    { title: "Tear-away lid", text: "Perforated lid turns a shipper into a display." },
    { title: "Header card", text: "A raised header carries your brand at eye level." },
    { title: "Holds units upright", text: "Inner dividers keep each unit in place." },
  ],
  pillow: [
    { title: "Curved shape", text: "A soft pillow shape that closes with two curved flaps." },
    { title: "Gift friendly", text: "Popular for jewellery, accessories and favours." },
    { title: "Flat until used", text: "Ships and stores completely flat." },
    { title: "Low unit cost", text: "One small sheet, quick to pack." },
  ],
  sleeve: [
    { title: "Branding layer", text: "A printed sleeve slides over a tray or box." },
    { title: "Change per SKU", text: "Swap the sleeve for each flavour or shade, keep one tray." },
    { title: "Window cut-outs", text: "Die-cut windows show the product underneath." },
    { title: "Pairs with rigid", text: "Works over our rigid boxes for a two-tone look." },
  ],
  gable: [
    { title: "Built-in handle", text: "The handle is part of the box, no extra parts." },
    { title: "Carry-out ready", text: "Good for bakery, gift and takeaway." },
    { title: "Self-locking base", text: "Crash-lock base sets up in one move." },
    { title: "Big print area", text: "Four side panels for artwork." },
  ],
  window: [
    { title: "See the product", text: "A clear window shows the product inside." },
    { title: "Custom window shape", text: "Any shape that suits your product." },
    { title: "Light weight", text: "Paperboard keeps shipping weight down." },
    { title: "Retail friendly", text: "Works on shelves and in display units." },
  ],
};

/** Extra shared questions so every style page has five FAQs. */
export const rigidExtraFaqs: Faq[] = [
  { q: "How long does production take?", a: "Lead time depends on size, finishes and quantity. We confirm it in your quote." }, // TODO real lead time
  { q: "Can you make a custom size?", a: "Yes. Every rigid box is made to your length, width and height in millimetres or inches." },
];

export const printedExtraFaqs: Faq[] = [
  { q: "How long does production take?", a: "Lead time depends on print method, finishes and quantity. We confirm it in your quote." }, // TODO real lead time
  { q: "Can you make a custom size?", a: "Yes. Every printed box is cut to your size with a custom dieline." },
  { q: "How do I approve the design before printing?", a: "You get a digital proof (PDF with dieline, colours and copy) and a 3D mockup. Nothing is printed until you approve, and we share production photos before dispatch." },
];

export const orderSteps = [
  { title: "Send your brief", body: "Size, quantity and how you want it to look." },
  { title: "Get a quote", body: `A clear price ${site.facts.quoteReply}.` },
  { title: "Approve the proof", body: "A digital proof and 3D mockup; nothing is printed until you approve." },
  { title: "Production & delivery", body: "Made in our factory, shipped by air or sea." },
];
