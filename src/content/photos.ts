/**
 * Real photos of our own packaging projects (public/images/...). Each exists at 2400px (`.webp`)
 * and 1200px (`-1200.webp`, used for cards). Never used on /blog: posts keep their illustrations.
 */
export type Photo = {
  file: string;
  alt: string;
  /** CSS object-position, chosen so the product is not cropped. */
  position?: string;
  /** "contain" for portrait shots (e.g. flat dielines) that must not be cropped. */
  fit?: "cover" | "contain";
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
