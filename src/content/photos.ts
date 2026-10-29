/**
 * Project photos from the first batch (public/images/...). Ownership is not yet confirmed: see CONTENT_TODO.md. Each exists at 2400px (`.webp`)
 * and 1200px (`-1200.webp`, used for cards). Never used on /blog: posts keep their illustrations.
 */
export type Photo = {
  file: string;
  alt: string;
  /** CSS object-position, chosen so the product is not cropped. */
  position?: string;
  /** "contain" for portrait shots (e.g. flat dielines) that must not be cropped. */
  fit?: "cover" | "contain";
  /** Secondary stock: only a 1200px file exists (`file` already ends in -1200). */
  secondary?: boolean;
};

export const PHOTOS = {
  magnetic: { file: "/images/rigid/magnetic-closure-green-gold-gift-box", alt: "Dark green magnetic closure gift box with a gold foil eagle logo, shown open and closed", position: "50% 55%" },
  tube: { file: "/images/rigid/kraft-tube-packaging", alt: "Kraft paper tube for an aroma candle with a printed label in sage and blush tones", position: "65% 50%" },
  sleeve: { file: "/images/printed/kraft-box-printed-sleeve", alt: "Kraft mailer box wrapped in a printed paper sleeve reading Sealed with love", position: "50% 40%" },
  soapCartons: { file: "/images/printed/soap-window-folding-cartons", alt: "Pink and green soap folding cartons with leaf-shaped die-cut windows showing the bars inside", position: "50% 50%" },
  floral: { file: "/images/printed/floral-printed-gift-box", alt: "Square gift box printed all over with a watercolour wild flowers design", position: "50% 50%" },
  dielineDaylight: { file: "/images/design/dieline-flat-carton-daylight", alt: "Flat printed film box carton laid out on its dieline, with turquoise and orange artwork", fit: "contain" },
  dielineIllustrated: { file: "/images/design/dieline-flat-carton-illustrated", alt: "Flat illustrated carton laid out on its dieline, with bold hand-drawn artwork in orange and blue", fit: "contain" },
  pouch: { file: "/images/design/stand-up-pouch-coffee", alt: "Three printed stand-up coffee pouches in navy and orange on a pink background", position: "50% 50%" },
  soapSet: { file: "/images/industries/handmade-soap-packaging-set", alt: "Handmade soap packaging set: printed soap cartons, a drawer box, a carrier box and a tall gift carton", position: "50% 60%" },
  tea: { file: "/images/industries/tea-kraft-box-and-pouches", alt: "Long kraft tea box with a printed label and kraft tea pouches with white labels", position: "50% 50%" },
  mailer: { file: "/images/industries/ecommerce-mailer-unboxing", alt: "E-commerce unboxing: printed kraft wrap, striped mailer and insert cards laid out flat", position: "50% 50%" },
  coffeeRange: { file: "/images/industries/coffee-brand-packaging-range", alt: "Coffee brand packaging range: printed pouches, takeaway cups and a coffee guide booklet", position: "50% 45%" },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof PHOTOS;

/**
 * STOCK category visuals: generic examples, never our work. Do not use in /work case studies,
 * testimonials, anything that says "our project" or "client", or on /blog. Licence: see CONTENT_TODO.md.
 */
export const STOCK = {
  matchaTubes: { file: "/images/rigid/paper-tube-matcha", alt: "Two green paper tubes for matcha latte powder with a printed gradient wrap" },
  coffeePouchKraft: { file: "/images/design/coffee-pouch-kraft-label", alt: "Black stand-up coffee pouch with a printed front label on a wooden table" },
  chipsBag: { file: "/images/design/snack-bag-chips", alt: "Printed foil snack bag for potato sticks on a grey-green background" },
  cookiePouches: { file: "/images/design/cookie-pouches-chocolate", alt: "Two brown printed stand-up pouches for chocolate cookies" },
  proteinBars: { file: "/images/design/protein-bar-wrappers", alt: "Colourful illustrated protein bar wrappers fanned out", position: "50% 40%" },
  chocDisplay: { file: "/images/printed/chocolate-bar-display-box", alt: "Yellow printed counter display box filled with wrapped chocolate bars", position: "50% 60%" },
  waveCartons: { file: "/images/printed/wave-print-folding-cartons", alt: "Two stacked folding cartons printed with a wave illustration" },
  kraftMailer: { file: "/images/printed/kraft-mailer-label", alt: "Kraft mailer box with an illustrated front label on dark stone", position: "50% 60%" },
  shoppingBags: { file: "/images/design/kraft-shopping-bags", alt: "Kraft paper shopping bags with a green print hanging on a rail" },
  bowTieBoxes: { file: "/images/rigid/bow-tie-gift-boxes", alt: "Black gift boxes and sleeves for bow ties and ties with gold foil logos" },
  tuckBoxes: { file: "/images/printed/white-tuck-end-boxes", alt: "Stack of white printed tuck end boxes with black graphics" },
  faceMist: { file: "/images/design/face-mist-bottle-label", alt: "Clear spray bottle of face mist with a white printed label beside flowers" },
  hempBottles: { file: "/images/design/hemp-dropper-bottles-jar", alt: "Navy dropper bottles and a jar with white labels for hemp skincare" },
  serumBottle: { file: "/images/design/serum-bottle-label", alt: "Glass serum bottle with a gold and white label lying on wood" },
  cosmeticTubes: { file: "/images/design/cosmetic-tubes", alt: "Four printed cosmetic squeeze tubes on a cork background" },
  pumpBottle: { file: "/images/design/pump-bottle-body-care", alt: "Amber pump bottle with a cream label held up at sunset" },
  maskSachet: { file: "/images/design/face-mask-sachet", alt: "Yellow face mask sachet with a printed front panel" },
  maskBox: { file: "/images/design/face-mask-box", alt: "Printed carton for a set of face mask sheets in soft shadow light" },
  shampooBottles: { file: "/images/design/shampoo-conditioner-bottles", alt: "Matching shampoo and conditioner pump bottles with cream labels on stone" },
  coffeeCup: { file: "/images/design/coffee-pouches-cup", alt: "Orange and navy printed coffee pouches with a matching takeaway cup" },
  coffeeYellow: { file: "/images/design/coffee-pouch-yellow", alt: "Red printed coffee pouch and a striped paper cup on yellow" },
  brochure: { file: "/images/design/brochure-stickers", alt: "Illustrated folded brochure and brand stickers on a pink background" },
  serumPump: { file: "/images/design/serum-pump-bottle-dark", alt: "Black airless serum pump bottle with white print on an orange gradient" },
  dropperCarton: { file: "/images/design/dropper-bottle-carton-mockup", alt: "Amber dropper bottle with a white label beside its tall carton" },
  gelTube: { file: "/images/design/gel-cleanser-tube", alt: "Cream squeeze tube for a facial cleanser held in a lab stand" },
  // Batch 2 (Images 2.rar)
  navyMagnetic: { file: "/images/rigid/magnetic-closure-navy-gold", alt: "Navy magnetic closure rigid box with a gold foil logo, shown open and closed" },
  candleLidBox: { file: "/images/rigid/candle-rigid-lid-box", alt: "White candle in a glass beside its white rigid lid and base box with gold foil script" },
  homeFragrance: { file: "/images/design/home-fragrance-range", alt: "Home fragrance range with floral print: reed diffusers, candles, hand wash and paper tubes" },
  amberCartons: { file: "/images/design/amber-bottles-illustrated-cartons", alt: "Amber glass bottles with illustrated labels beside matching watercolour-print cartons" },
  pinkCartons: { file: "/images/design/pink-cosmetic-cartons", alt: "Rows of pink cosmetic cartons with gold foil script lettering" },
  pinkSet: { file: "/images/design/pink-skincare-set", alt: "Pink and amber skincare bottles, tube and jar mock-up set on weathered wood" },
  serumJar: { file: "/images/design/serum-bottles-jar", alt: "Two amber dropper bottles and a jar with orange labels in front of a red curtain" },
  whiteCarton: { file: "/images/printed/white-minimal-carton", alt: "Minimal white tuck end carton with fine grey print beside coconuts" },
  gummyPouches: { file: "/images/design/gummy-stand-up-pouches", alt: "Orange, green and pink printed stand-up pouches for a gummy kit" },
  flatBottomPouches: { file: "/images/design/flat-bottom-pouches", alt: "Three flat-bottom pouches for a nutrition shake with bold product illustrations" },
  coffeeWhite: { file: "/images/design/coffee-pouch-white", alt: "White flat-bottom coffee pouch with a printed blend label" },
  coffeeOutdoor: { file: "/images/design/coffee-bag-outdoor", alt: "White coffee bag with a black logo held up on a country road" },
  mailerBag: { file: "/images/design/mailer-bag-custom-tape", alt: "Printed poly mailer bag with custom printed packing tapes and a sleeved box" },
  tealMailer: { file: "/images/printed/teal-printed-mailer", alt: "Teal printed mailer box with a wave pattern and a white address label" },
  retailShelf: { file: "/images/printed/retail-shelf-coffee", alt: "Café shelf with printed coffee bags, bottles and cups", position: "50% 70%" },
} satisfies Record<string, Photo>;

/**
 * Secondary stock: third-party brands visible (review before launch, see CONTENT_TODO.md). 1200px file only;
 * use only late in galleries, never as a hero, main card image, on /work or near "our client/project" wording.
 */
const secondaryPhoto = (name: string, alt: string): Photo => ({ file: `/images/${name}-1200`, alt, secondary: true });
export const SECONDARY = {
  retailWall: secondaryPhoto("printed/retail-wall-display", "Red-lit retail wall display stacked with printed coffee bags and cups"),
  foodJars: secondaryPhoto("design/food-jars-shelf", "Glass food jars with printed wrap labels on a store shelf"),
  coffeeCafe: secondaryPhoto("design/coffee-bags-cafe", "Black and white photo of printed coffee bags beside a café grinder"),
  gameBoxes: secondaryPhoto("rigid/game-box-set", "Illustrated board game boxes with a rulebook and cards"),
  techBox: secondaryPhoto("printed/tech-product-box", "White electronics box with a black printed sleeve and product inside"),
  hairLifestyle: secondaryPhoto("design/hair-products-lifestyle", "Two people holding colourful printed hair care cans and tubes"),
} satisfies Record<string, Photo>;
