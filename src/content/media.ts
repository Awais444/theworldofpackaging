import type { IllustrationKey } from "@/components/illustrations";
import { designServices } from "./designServices";
import { servicePages } from "./servicePages";
import { caseStudies } from "./caseStudies";
import { PHOTOS, SECONDARY, STOCK, type Photo, type PhotoKey } from "./photos";
import { industries } from "./industries";
import { printedStyles } from "./printedStyles";
import { rigidStyles } from "./rigidStyles";

export type MediaAspect = "16/9" | "4/3" | "1/1" | "3/4";
export type MediaVariant = "blue" | "klein" | "orange" | "white";

export type MediaSlot = {
  /** Matches the record key, e.g. "rigid-magnetic-closure-hero". */
  id: string;
  /** Real, descriptive alt text. Used for the photo and for the illustration fallback. */
  alt: string;
  /** Path under /public, e.g. "/images/rigid/rigid-magnetic-hero.webp". Empty = illustration. */
  src?: string;
  /** 1200px version of the photo for cards. */
  srcCard?: string;
  /** CSS object-position, chosen so the product is not cropped. */
  position?: string;
  /** "contain" for portrait shots (e.g. flat dielines) that must not be cropped. */
  fit?: "cover" | "contain";
  /** Optional short looping video (MP4/WebM under /public). Used where a slot supports motion, e.g. the home hero. */
  video?: string;
  illustration: IllustrationKey;
  /** Colour variant for the illustration body (lids stay orange, inserts white). */
  variant?: MediaVariant;
  aspect: MediaAspect;
  /** Shot list fields (see MEDIA_SLOTS.md). */
  page: string;
  size: string;
  shot: string;
};

/**
 * Central image registry. To swap an illustration for a photo: put the file in
 * /public/images/<section>/<slot-id>.webp and fill `src`. Nothing else changes.
 */
const fixedSlots = {
  "packaging-design-hub": {
    id: "packaging-design-hub",
    alt: "Packaging design services: illustrated folding carton artwork laid out flat on its dieline",
    illustration: "dieline-flat",
    aspect: "4/3",
    page: "/packaging-design",
    size: "2400×1800",
    shot: "Printed carton artwork shown flat on its dieline",
  },
  "how-it-works-design": {
    id: "how-it-works-design",
    alt: "Design step: printed carton artwork shown flat on its dieline before folding",
    illustration: "dieline-flat",
    aspect: "4/3",
    page: "/how-it-works (Design step)",
    size: "1600×1200",
    shot: "Flat printed carton on its dieline",
  },
  "home-how-step-2": {
    id: "home-how-step-2",
    alt: "Design and sample: a flat printed film box carton laid out on its dieline",
    illustration: "dieline-flat",
    aspect: "4/3",
    page: "/ (How it works, step 2)",
    size: "1200×900",
    shot: "Flat printed carton on its dieline",
  },
  "home-hero": {
    id: "home-hero",
    alt: "A rigid gift box, a mailer box and a tube, made in our factory",
    illustration: "magnetic-open",
    aspect: "4/3",
    page: "/",
    size: "2400×1800 still, or 1920×1440 video loop (5–8 s, muted)",
    shot: "Three finished boxes (rigid gift box, mailer, tube) on a white or light grey backdrop, soft daylight",
  },
  "mega-menu-feature": {
    id: "mega-menu-feature",
    alt: "Open magnetic rigid box with an EVA foam insert holding a product jar",
    illustration: "magnetic-open",
    aspect: "4/3",
    page: "Header mega-menu",
    size: "1200×900",
    shot: "Magnetic rigid box open, product in insert, dark set, three-quarter view",
  },
  "collapsible-flat": {
    id: "collapsible-flat",
    alt: "Three collapsible rigid boxes packed flat and stacked",
    illustration: "collapsible-flat",
    aspect: "4/3",
    page: "/collapsible-rigid-boxes",
    size: "2400×1800",
    shot: "Stack of flat-packed collapsible boxes on a pallet or table, side light showing thickness",
  },
  "printed-mailer-hero": {
    id: "printed-mailer-hero",
    alt: "Printed corrugated mailer box with a logo on the lid",
    illustration: "mailer-box",
    aspect: "4/3",
    page: "/printed-boxes/mailer",
    size: "2400×1800",
    shot: "Printed mailer box closed on paper-coloured backdrop, logo visible on lid",
  },
  "factory-press": {
    id: "factory-press",
    alt: "Four-colour sheet-fed offset press in the factory",
    illustration: "press-machine",
    aspect: "16/9",
    page: "/about, /factory",
    size: "2400×1350",
    shot: "Offset press running, operator at delivery end, wide shot, motion in sheets",
  },
  "home-factory": {
    id: "home-factory",
    alt: "Rigid boxes being wrapped and finished on our factory floor",
    illustration: "lid-and-base",
    variant: "klein",
    aspect: "3/4",
    page: "/",
    size: "1600×2130",
    shot: "Operator wrapping rigid boxes at a workbench, finished boxes stacked beside, warm daylight",
  },
} satisfies Record<string, MediaSlot>;


// Factory process steps, shown on every rigid style page and the factory page.
export const factorySteps = [
  { id: "factory-cut", label: "Cut", illustration: "factory-cut", shot: "Die cutter or V-groover cutting greyboard, close on the blade" },
  { id: "factory-wrap", label: "Wrap", illustration: "factory-wrap", shot: "Operator wrapping a tray in printed paper on the gluing machine" },
  { id: "factory-corner", label: "Corners", illustration: "factory-corner", shot: "Corner pasting machine taping a box corner, macro" },
  { id: "factory-insert", label: "Insert", illustration: "factory-insert", shot: "Hands placing an EVA insert into a finished box" },
  { id: "factory-qc", label: "QC", illustration: "factory-qc", shot: "Inspector measuring a box with a caliper, checklist in frame" },
] as const satisfies ReadonlyArray<{ id: string; label: string; illustration: IllustrationKey; shot: string }>;

function generatedSlots(): MediaSlot[] {
  const out: MediaSlot[] = [];
  const rigidAngles = ["three-quarter view, lid closed", "open, product in insert", "detail: corner, wrap and finish close-up", "top view showing the foil logo", "stack of finished boxes", "in a customer's hands"];
  const printedAngles = ["printed detail close-up", "packed with product", "open, inside print visible", "flat sheet before folding", "stack of finished boxes", "in use"];
  const galleryVariants: MediaVariant[] = ["blue", "klein", "orange", "white"];
  for (const s of rigidStyles) {
    const page = `/rigid-boxes/${s.slug}`;
    s.mediaSlots.forEach((id, i) => {
      const angle = rigidAngles[(i - 1) % rigidAngles.length]!;
      out.push({
        id,
        alt: i === 0 ? `${s.name}, made in our factory` : `${s.name}: ${angle}`,
        illustration: s.illustration,
        variant: galleryVariants[i % galleryVariants.length],
        aspect: "4/3",
        page,
        size: "2400×1800",
        shot: i === 0 ? `${s.name} on a Pale Silver background, soft light` : `${s.name}, ${angle}`,
      });
    });
  }
  for (const s of printedStyles) {
    const page = `/printed-boxes/${s.slug}`;
    s.mediaSlots.forEach((id, i) => {
      const angle = printedAngles[(i - 1) % printedAngles.length]!;
      out.push({
        id,
        alt: i === 0 ? `Printed ${s.name.toLowerCase()}` : `${s.name}: ${angle}`,
        illustration: s.illustration,
        variant: galleryVariants[i % galleryVariants.length],
        aspect: "4/3",
        page,
        size: "2400×1800",
        shot: i === 0 ? `${s.name} on a Pale Silver background, soft light` : `${s.name}, ${angle}`,
      });
    });
  }
  for (const f of factorySteps) {
    out.push({
      id: f.id,
      alt: `Factory step: ${f.label.toLowerCase()}`,
      illustration: f.illustration,
      aspect: "4/3",
      page: "/factory",
      size: "1600×1200",
      shot: f.shot,
    });
  }
  for (const ind of industries) {
    out.push({
      id: `industry-${ind.slug}-hero`,
      alt: `${ind.name} packaging made in our factory`,
      illustration: ind.illustration,
      variant: industries.indexOf(ind) % 2 ? "klein" : "blue",
      aspect: "4/3",
      page: `/industries/${ind.slug}`,
      size: "2400×1800",
      shot: `${ind.name} product in its box, styled for the category`,
    });
  }
  for (const s of servicePages) {
    out.push({
      id: `service-${s.slug}-hero`,
      alt: `${s.name}: example deliverable`,
      illustration: s.illustration,
      aspect: "4/3",
      page: `/services/${s.path}`,
      size: "2400×1800",
      shot: `Representative ${s.name.toLowerCase()} work from a real project`,
    });
  }
  const designShots = ["hero pack on a Pale Silver background", "range lined up together", "detail: finish and print close-up", "open, product in pack", "in use or on shelf", "flat dieline and artwork"];
  for (const d of designServices) {
    d.portfolioSlots.forEach((id, i) =>
      out.push({
        id,
        alt: `${d.name}: ${designShots[i]}`,
        illustration: i === 5 ? "dieline-flat" : d.illustration,
        variant: galleryVariants[i % galleryVariants.length],
        aspect: "4/3",
        page: `/packaging-design/${d.slug}`,
        size: "2400×1800",
        shot: `${d.name.replace(/ Design$/, "")}, ${designShots[i]}`,
      }),
    );
  }
  // Case studies: real project photos (see content/photos.ts).
  for (const c of caseStudies) {
    const toSlot = (id: string, key: PhotoKey): MediaSlot => {
      const p = PHOTOS[key] as Photo;
      return {
        id,
        alt: p.alt,
        src: `${p.file}.webp`,
        srcCard: `${p.file}-1200.webp`,
        position: p.position,
        fit: p.fit,
        illustration: c.illustration,
        aspect: "4/3",
        page: `/work/${c.slug}`,
        size: "2400 px long side",
        shot: `${c.client}: ${c.project}`,
      };
    };
    out.push(toSlot(c.coverSlot, c.photos.cover));
    c.photos.gallery.forEach((key, i) => out.push(toSlot(c.gallery[i]!, key)));
  }
  return out;
}

/**
 * Real photos for generated slots (style pages, factory steps). Key = slot id.
 * Example: "rigid-magnetic-closure-hero": "/images/rigid/rigid-magnetic-closure-hero.webp"
 * Fixed slots above take `src` directly.
 */
/**
 * Photos by slot id: first-batch project photos (ownership unconfirmed) and STOCK category visuals. Never used on /blog (posts keep their illustrations).
 * Each file exists at 2400px (`.webp`) and 1200px (`-1200.webp`, used for cards).
 */
const photos: Record<string, Photo> = {
  "home-hero": PHOTOS.magnetic,
  "rigid-magnetic-closure-hero": PHOTOS.magnetic,
  "design-luxury-packaging-design-1": PHOTOS.magnetic,
  "rigid-tube-hero": PHOTOS.tube,
  "design-sustainable-packaging-design-1": PHOTOS.tube,
  "printed-sleeve-hero": PHOTOS.sleeve,
  "design-unboxing-packaging-design-1": PHOTOS.sleeve,
  "printed-folding-carton-hero": PHOTOS.soapCartons,
  "design-soap-bath-packaging-design-1": PHOTOS.soapCartons,
  "industry-gifts-pr-kits-hero": PHOTOS.floral,
  "design-gift-box-pr-kit-design-1": PHOTOS.floral,
  "design-structural-dieline-design-1": PHOTOS.dielineDaylight,
  "home-how-step-2": PHOTOS.dielineDaylight,
  "packaging-design-hub": PHOTOS.dielineIllustrated,
  "how-it-works-design": PHOTOS.dielineIllustrated,
  "design-soap-bath-packaging-design-2": PHOTOS.soapSet,
  "design-coffee-tea-packaging-design-1": PHOTOS.tea,
  "printed-mailer-hero": PHOTOS.mailer,
  "design-subscription-box-design-1": PHOTOS.mailer,
  "design-pouch-packaging-design-1": PHOTOS.pouch,
  "design-coffee-tea-packaging-design-2": PHOTOS.coffeeRange,
  "service-brand-identity-hero": STOCK.brochure,
  // Stock category visuals (generic, never presented as our work).
  "rigid-tube-gallery-1": STOCK.matchaTubes,
  "design-coffee-tea-packaging-design-3": STOCK.matchaTubes,
  "design-coffee-tea-packaging-design-4": STOCK.coffeePouchKraft,
  "design-coffee-tea-packaging-design-5": STOCK.coffeeCup,
  "design-snack-packaging-design-1": STOCK.chipsBag,
  "design-snack-packaging-design-2": STOCK.proteinBars,
  "design-bakery-confectionery-packaging-design-1": STOCK.cookiePouches,
  "printed-display-hero": STOCK.chocDisplay,
  "design-chocolate-packaging-design-1": STOCK.chocDisplay,
  "design-retail-display-design-1": STOCK.chocDisplay,
  "printed-folding-carton-gallery-1": STOCK.waveCartons,
  "design-box-packaging-design-1": STOCK.waveCartons,
  "printed-mailer-gallery-1": STOCK.kraftMailer,
  "design-shopping-bag-design-1": STOCK.shoppingBags,
  "design-apparel-packaging-design-1": STOCK.bowTieBoxes,
  "design-gift-box-pr-kit-design-2": STOCK.bowTieBoxes,
  "printed-tuck-end-hero": STOCK.tuckBoxes,
  "design-bottle-label-design-1": STOCK.faceMist,
  "design-bottle-label-design-2": STOCK.serumBottle,
  "design-skincare-packaging-design-1": STOCK.faceMist,
  "design-skincare-packaging-design-2": STOCK.maskBox,
  "design-skincare-packaging-design-3": STOCK.serumPump,
  "design-skincare-packaging-design-4": STOCK.dropperCarton,
  "design-3d-packaging-mockups-1": STOCK.dropperCarton,
  "design-cbd-packaging-design-1": STOCK.hempBottles,
  "design-jar-label-design-1": STOCK.hempBottles,
  "design-makeup-packaging-design-1": STOCK.cosmeticTubes,
  "design-tube-packaging-design-1": STOCK.gelTube,
  "design-tube-packaging-design-2": STOCK.cosmeticTubes,
  "design-hair-care-packaging-design-1": STOCK.pumpBottle,
  "design-hair-care-packaging-design-2": STOCK.shampooBottles,
  "design-pouch-packaging-design-2": STOCK.maskSachet,
  "design-pouch-packaging-design-3": STOCK.coffeeYellow,
  // Stock batch 2.
  "rigid-magnetic-closure-gallery-1": STOCK.navyMagnetic,
  "design-luxury-packaging-design-2": STOCK.navyMagnetic,
  "design-candle-packaging-design-1": STOCK.candleLidBox,
  "rigid-lid-and-base-gallery-1": STOCK.candleLidBox,
  "design-candle-packaging-design-2": STOCK.homeFragrance,
  "rigid-tube-gallery-2": STOCK.homeFragrance,
  "design-bottle-label-design-3": STOCK.amberCartons,
  "printed-folding-carton-gallery-2": STOCK.amberCartons,
  "design-makeup-packaging-design-2": STOCK.pinkCartons,
  "design-cosmetic-packaging-design-1": STOCK.pinkCartons,
  "design-skincare-packaging-design-5": STOCK.serumJar,
  "design-skincare-packaging-design-6": STOCK.pinkSet,
  "design-jar-label-design-2": STOCK.serumJar,
  "printed-tuck-end-gallery-1": STOCK.whiteCarton,
  "design-pouch-packaging-design-4": STOCK.gummyPouches,
  "design-bakery-confectionery-packaging-design-2": STOCK.gummyPouches,
  "design-supplement-label-design-1": STOCK.flatBottomPouches,
  "design-coffee-tea-packaging-design-6": STOCK.coffeeWhite,
  "design-pouch-packaging-design-5": STOCK.coffeeOutdoor,
  "design-unboxing-packaging-design-2": STOCK.mailerBag,
  "design-amazon-packaging-design-1": STOCK.mailerBag,
  "printed-mailer-gallery-2": STOCK.tealMailer,
  "design-retail-packaging-design-2": STOCK.retailShelf,
  // Secondary (third-party brands visible): late gallery positions only.
  "design-retail-packaging-design-4": SECONDARY.coffeeCafe,
  "design-retail-packaging-design-6": SECONDARY.retailWall,
  "printed-display-gallery-6": SECONDARY.retailWall,
  "design-food-packaging-design-6": SECONDARY.foodJars,
  "design-jar-label-design-6": SECONDARY.foodJars,
  "rigid-lid-and-base-gallery-6": SECONDARY.gameBoxes,
  "design-toy-game-packaging-design-6": SECONDARY.gameBoxes,
  "design-electronics-packaging-design-6": SECONDARY.techBox,
  "design-hair-care-packaging-design-6": SECONDARY.hairLifestyle,
};

const withPhoto = (s: MediaSlot): MediaSlot => {
  const p = photos[s.id];
  return p ? { ...s, src: `${p.file}.webp`, srcCard: p.secondary ? `${p.file}.webp` : `${p.file}-1200.webp`, alt: p.alt, position: p.position, fit: p.fit } : s;
};

/** Central image registry: every slot on the site. See MEDIA_SLOTS.md for the shot list. */
export const media: Record<string, MediaSlot> = Object.fromEntries(
  [...generatedSlots(), ...Object.values(fixedSlots)].map((s: MediaSlot) => [s.id, withPhoto(s)]),
);

export type MediaSlotId = string;

export function getMedia(id: MediaSlotId): MediaSlot {
  const slot = media[id];
  if (!slot) throw new Error(`Unknown media slot "${id}". Add it to src/content/media.ts.`);
  return slot;
}
