// Generated from photos.ts and the slots each photo fills in media.ts, then edited by hand where needed.
// Category visuals and project photos for the /work Portfolio gallery. No client names or results.
// Excluded: SECONDARY photos and any photo listed under "Third-party brands visible" in CONTENT_TODO.md.
import { PHOTOS, STOCK, type Photo } from "./photos";
import type { WorkServiceId } from "./workServices";

export type PortfolioFormat = "rigid" | "printed" | "pouch" | "label" | "bag" | "other";

type Entry = {
  id: string;
  photo: Photo;
  /** Short title that describes the format. */
  title: string;
  format: PortfolioFormat;
  /** /work filter ids (packaging design service slugs, plus brand-identity). */
  services: WorkServiceId[];
  /** Industry slug, or null when the photo is not tied to one. */
  industry: string | null;
  /** Design service page slug for "see the service", or null. */
  servicePage: string | null;
  /** Size of the 1200px file, so the masonry grid keeps each aspect ratio. */
  width: number;
  height: number;
};

export type PortfolioItem = Omit<Entry, "photo"> & {
  /** 1200px version for the grid. */
  image: string;
  /** 2400px version for the lightbox. */
  full: string;
  alt: string;
};

const entries: Entry[] = [
  { id: "magnetic", photo: PHOTOS.magnetic, title: "Green and gold magnetic gift box", format: "rigid", services: ["box-packaging-design","rigid-luxury-box-design"], industry: null, servicePage: "luxury-packaging-design", width: 1200, height: 1200 },
  { id: "tube", photo: PHOTOS.tube, title: "Kraft candle tube with label", format: "rigid", services: ["box-packaging-design","rigid-luxury-box-design"], industry: null, servicePage: "sustainable-packaging-design", width: 1200, height: 674 },
  { id: "sleeve", photo: PHOTOS.sleeve, title: "Kraft box with printed sleeve", format: "printed", services: ["box-packaging-design","unboxing-packaging-design"], industry: null, servicePage: "unboxing-packaging-design", width: 1200, height: 674 },
  { id: "soapCartons", photo: PHOTOS.soapCartons, title: "Soap cartons with die-cut windows", format: "printed", services: ["box-packaging-design","product-packaging-design"], industry: "cosmetics", servicePage: "soap-bath-packaging-design", width: 1200, height: 900 },
  { id: "floral", photo: PHOTOS.floral, title: "Floral printed gift box", format: "printed", services: ["box-packaging-design","product-packaging-design"], industry: "gifts-pr-kits", servicePage: "gift-box-pr-kit-design", width: 1200, height: 800 },
  { id: "dielineDaylight", photo: PHOTOS.dielineDaylight, title: "Flat carton on its dieline", format: "printed", services: ["box-packaging-design"], industry: null, servicePage: "structural-dieline-design", width: 900, height: 1200 },
  { id: "dielineIllustrated", photo: PHOTOS.dielineIllustrated, title: "Illustrated carton dieline", format: "printed", services: ["box-packaging-design"], industry: null, servicePage: null, width: 900, height: 1200 },
  { id: "pouch", photo: PHOTOS.pouch, title: "Stand-up coffee pouches", format: "pouch", services: ["pouch-packaging-design"], industry: null, servicePage: "pouch-packaging-design", width: 856, height: 1200 },
  { id: "soapSet", photo: PHOTOS.soapSet, title: "Handmade soap packaging set", format: "printed", services: ["box-packaging-design","product-packaging-design"], industry: "cosmetics", servicePage: "soap-bath-packaging-design", width: 1200, height: 1200 },
  { id: "tea", photo: PHOTOS.tea, title: "Kraft tea box and pouches", format: "printed", services: ["box-packaging-design","product-packaging-design"], industry: "food-bakery", servicePage: "coffee-tea-packaging-design", width: 1200, height: 900 },
  { id: "mailer", photo: PHOTOS.mailer, title: "E-commerce mailer and inserts", format: "printed", services: ["box-packaging-design","unboxing-packaging-design"], industry: null, servicePage: "subscription-box-design", width: 1200, height: 675 },
  { id: "coffeeRange", photo: PHOTOS.coffeeRange, title: "Coffee pouches, cups and booklet", format: "pouch", services: ["pouch-packaging-design","product-packaging-design"], industry: "food-bakery", servicePage: "coffee-tea-packaging-design", width: 1200, height: 675 },
  { id: "matchaTubes", photo: STOCK.matchaTubes, title: "Matcha paper tubes", format: "rigid", services: ["box-packaging-design","rigid-luxury-box-design"], industry: null, servicePage: null, width: 1200, height: 857 },
  { id: "coffeePouchKraft", photo: STOCK.coffeePouchKraft, title: "Coffee pouch with front label", format: "pouch", services: ["pouch-packaging-design","product-packaging-design"], industry: "food-bakery", servicePage: "coffee-tea-packaging-design", width: 800, height: 1200 },
  { id: "chipsBag", photo: STOCK.chipsBag, title: "Printed snack bag", format: "pouch", services: ["pouch-packaging-design","product-packaging-design"], industry: "food-bakery", servicePage: "snack-packaging-design", width: 1200, height: 800 },
  { id: "cookiePouches", photo: STOCK.cookiePouches, title: "Chocolate cookie pouches", format: "pouch", services: ["pouch-packaging-design","product-packaging-design"], industry: "food-bakery", servicePage: "bakery-confectionery-packaging-design", width: 1200, height: 900 },
  { id: "proteinBars", photo: STOCK.proteinBars, title: "Illustrated protein bar wrappers", format: "pouch", services: ["pouch-packaging-design","product-packaging-design"], industry: "food-bakery", servicePage: "snack-packaging-design", width: 960, height: 1200 },
  { id: "chocDisplay", photo: STOCK.chocDisplay, title: "Chocolate bar counter display", format: "printed", services: ["box-packaging-design","retail-display-design"], industry: null, servicePage: "retail-display-design", width: 800, height: 1200 },
  { id: "waveCartons", photo: STOCK.waveCartons, title: "Wave-print folding cartons", format: "printed", services: ["box-packaging-design"], industry: null, servicePage: "box-packaging-design", width: 801, height: 1200 },
  { id: "kraftMailer", photo: STOCK.kraftMailer, title: "Kraft mailer with label", format: "printed", services: ["box-packaging-design","unboxing-packaging-design"], industry: null, servicePage: null, width: 800, height: 1200 },
  { id: "shoppingBags", photo: STOCK.shoppingBags, title: "Kraft shopping bags", format: "bag", services: ["shopping-bag-design"], industry: null, servicePage: "shopping-bag-design", width: 800, height: 1200 },
  { id: "bowTieBoxes", photo: STOCK.bowTieBoxes, title: "Bow tie gift boxes", format: "rigid", services: ["box-packaging-design","rigid-luxury-box-design","product-packaging-design"], industry: "apparel", servicePage: "apparel-packaging-design", width: 1200, height: 800 },
  { id: "tuckBoxes", photo: STOCK.tuckBoxes, title: "White tuck end boxes", format: "printed", services: ["box-packaging-design"], industry: null, servicePage: null, width: 1200, height: 800 },
  { id: "faceMist", photo: STOCK.faceMist, title: "Face mist bottle label", format: "label", services: ["label-design","bottle-label-design","product-packaging-design"], industry: "cosmetics", servicePage: "skincare-packaging-design", width: 795, height: 1200 },
  { id: "hempBottles", photo: STOCK.hempBottles, title: "Dropper bottle and jar labels", format: "label", services: ["label-design","bottle-label-design","product-packaging-design"], industry: "cbd", servicePage: "cbd-packaging-design", width: 675, height: 1200 },
  { id: "serumBottle", photo: STOCK.serumBottle, title: "Gold serum bottle label", format: "label", services: ["label-design","bottle-label-design"], industry: null, servicePage: "bottle-label-design", width: 1200, height: 674 },
  { id: "cosmeticTubes", photo: STOCK.cosmeticTubes, title: "Printed cosmetic tubes", format: "other", services: ["product-packaging-design"], industry: "cosmetics", servicePage: "makeup-packaging-design", width: 800, height: 1200 },
  { id: "pumpBottle", photo: STOCK.pumpBottle, title: "Pump bottle label", format: "label", services: ["label-design","product-packaging-design"], industry: "cosmetics", servicePage: "hair-care-packaging-design", width: 1200, height: 668 },
  { id: "maskSachet", photo: STOCK.maskSachet, title: "Face mask sachet", format: "pouch", services: ["pouch-packaging-design"], industry: null, servicePage: "pouch-packaging-design", width: 1000, height: 1200 },
  { id: "maskBox", photo: STOCK.maskBox, title: "Face mask carton", format: "printed", services: ["box-packaging-design","product-packaging-design"], industry: "cosmetics", servicePage: "skincare-packaging-design", width: 1200, height: 1200 },
  { id: "shampooBottles", photo: STOCK.shampooBottles, title: "Shampoo and conditioner labels", format: "label", services: ["label-design","product-packaging-design"], industry: "cosmetics", servicePage: "hair-care-packaging-design", width: 1200, height: 1200 },
  { id: "coffeeCup", photo: STOCK.coffeeCup, title: "Coffee pouches and cup", format: "pouch", services: ["pouch-packaging-design","product-packaging-design"], industry: "food-bakery", servicePage: "coffee-tea-packaging-design", width: 1200, height: 675 },
  { id: "coffeeYellow", photo: STOCK.coffeeYellow, title: "Red coffee pouch and cup", format: "pouch", services: ["pouch-packaging-design"], industry: null, servicePage: "pouch-packaging-design", width: 856, height: 1200 },
  { id: "brochure", photo: STOCK.brochure, title: "Brand brochure and stickers", format: "other", services: ["brand-identity"], industry: null, servicePage: null, width: 1200, height: 675 },
  { id: "serumPump", photo: STOCK.serumPump, title: "Airless serum bottle", format: "label", services: ["label-design","product-packaging-design"], industry: "cosmetics", servicePage: "skincare-packaging-design", width: 1200, height: 1200 },
  { id: "dropperCarton", photo: STOCK.dropperCarton, title: "Dropper bottle and carton", format: "printed", services: ["box-packaging-design","product-packaging-design"], industry: "cosmetics", servicePage: "skincare-packaging-design", width: 1200, height: 1200 },
  { id: "gelTube", photo: STOCK.gelTube, title: "Gel cleanser tube", format: "other", services: ["product-packaging-design"], industry: "cosmetics", servicePage: "tube-packaging-design", width: 1029, height: 1200 },
  { id: "navyMagnetic", photo: STOCK.navyMagnetic, title: "Navy magnetic box with gold foil", format: "rigid", services: ["box-packaging-design","rigid-luxury-box-design"], industry: null, servicePage: "luxury-packaging-design", width: 1200, height: 800 },
  { id: "candleLidBox", photo: STOCK.candleLidBox, title: "Candle lid and base box", format: "rigid", services: ["box-packaging-design","rigid-luxury-box-design","product-packaging-design"], industry: "candles", servicePage: "candle-packaging-design", width: 1200, height: 801 },
  { id: "homeFragrance", photo: STOCK.homeFragrance, title: "Floral home fragrance range", format: "other", services: ["product-packaging-design"], industry: "candles", servicePage: "candle-packaging-design", width: 1200, height: 800 },
  { id: "amberCartons", photo: STOCK.amberCartons, title: "Amber bottles and illustrated cartons", format: "printed", services: ["box-packaging-design","bottle-label-design"], industry: null, servicePage: "bottle-label-design", width: 1200, height: 800 },
  { id: "pinkCartons", photo: STOCK.pinkCartons, title: "Pink cosmetic cartons", format: "printed", services: ["box-packaging-design","product-packaging-design"], industry: "cosmetics", servicePage: "makeup-packaging-design", width: 675, height: 1200 },
  { id: "pinkSet", photo: STOCK.pinkSet, title: "Pink skincare set", format: "label", services: ["label-design","product-packaging-design"], industry: "cosmetics", servicePage: "makeup-packaging-design", width: 1200, height: 800 },
  { id: "serumJar", photo: STOCK.serumJar, title: "Serum bottles and jar", format: "label", services: ["label-design","bottle-label-design","product-packaging-design"], industry: "cosmetics", servicePage: "skincare-packaging-design", width: 1200, height: 1200 },
  { id: "whiteCarton", photo: STOCK.whiteCarton, title: "Minimal white carton", format: "printed", services: ["box-packaging-design"], industry: null, servicePage: null, width: 900, height: 1200 },
  { id: "gummyPouches", photo: STOCK.gummyPouches, title: "Gummy kit stand-up pouches", format: "pouch", services: ["pouch-packaging-design","product-packaging-design"], industry: "food-bakery", servicePage: "food-packaging-design", width: 960, height: 1200 },
  { id: "flatBottomPouches", photo: STOCK.flatBottomPouches, title: "Flat-bottom nutrition pouches", format: "pouch", services: ["label-design","pouch-packaging-design","product-packaging-design"], industry: "supplements", servicePage: "supplement-label-design", width: 1200, height: 800 },
  { id: "coffeeWhite", photo: STOCK.coffeeWhite, title: "White flat-bottom coffee pouch", format: "pouch", services: ["pouch-packaging-design","product-packaging-design"], industry: "food-bakery", servicePage: "coffee-tea-packaging-design", width: 1200, height: 800 },
  { id: "coffeeOutdoor", photo: STOCK.coffeeOutdoor, title: "White coffee bag", format: "pouch", services: ["pouch-packaging-design"], industry: null, servicePage: "pouch-packaging-design", width: 800, height: 1200 },
  { id: "mailerBag", photo: STOCK.mailerBag, title: "Mailer bag and custom tape", format: "bag", services: ["unboxing-packaging-design"], industry: null, servicePage: "unboxing-packaging-design", width: 1200, height: 800 },
  { id: "tealMailer", photo: STOCK.tealMailer, title: "Teal printed mailer box", format: "printed", services: ["box-packaging-design","unboxing-packaging-design"], industry: "electronics", servicePage: null, width: 1200, height: 800 },
  { id: "retailShelf", photo: STOCK.retailShelf, title: "Coffee bags on a café shelf", format: "pouch", services: ["pouch-packaging-design","retail-display-design"], industry: null, servicePage: "retail-packaging-design", width: 900, height: 1200 },
  { id: "capsuleSachets", photo: STOCK.capsuleSachets, title: "Colour-coded capsule sachets", format: "pouch", services: ["label-design","pouch-packaging-design","product-packaging-design"], industry: "supplements", servicePage: "supplement-label-design", width: 1200, height: 800 },
  { id: "espressoBag", photo: STOCK.espressoBag, title: "Illustrated espresso bag", format: "pouch", services: ["pouch-packaging-design","product-packaging-design"], industry: "food-bakery", servicePage: "coffee-tea-packaging-design", width: 858, height: 1200 },
  { id: "whiteCartonBotanical", photo: STOCK.whiteCartonBotanical, title: "Small white botanical carton", format: "printed", services: ["box-packaging-design","product-packaging-design"], industry: "cbd", servicePage: "cbd-packaging-design", width: 800, height: 1200 },
  { id: "salveJars", photo: STOCK.salveJars, title: "Salve jars and cartons", format: "label", services: ["label-design","bottle-label-design","product-packaging-design"], industry: "cbd", servicePage: "cbd-packaging-design", width: 800, height: 1200 },
  { id: "ginBottle", photo: STOCK.ginBottle, title: "Gin bottle label", format: "label", services: ["label-design","bottle-label-design"], industry: null, servicePage: "bottle-label-design", width: 855, height: 1200 },
  { id: "lipstickCartons", photo: STOCK.lipstickCartons, title: "Small cosmetic cartons", format: "printed", services: ["box-packaging-design","product-packaging-design"], industry: "cosmetics", servicePage: "makeup-packaging-design", width: 800, height: 1200 },
  { id: "greenCartonsStack", photo: STOCK.greenCartonsStack, title: "Green skincare carton set", format: "printed", services: ["box-packaging-design","product-packaging-design"], industry: "cosmetics", servicePage: "cosmetic-packaging-design", width: 884, height: 1200 },
  { id: "coffeeTinHand", photo: STOCK.coffeeTinHand, title: "Printed coffee tin", format: "other", services: ["product-packaging-design"], industry: "food-bakery", servicePage: "can-tin-design", width: 800, height: 1200 },
  { id: "tealCartons", photo: STOCK.tealCartons, title: "Teal skincare cartons", format: "printed", services: ["box-packaging-design","product-packaging-design"], industry: "cosmetics", servicePage: "skincare-packaging-design", width: 1200, height: 800 },
  { id: "cartonAtShelf", photo: STOCK.cartonAtShelf, title: "Printed carton at the shelf", format: "printed", services: ["box-packaging-design","retail-display-design"], industry: null, servicePage: "retail-packaging-design", width: 900, height: 1200 },
  { id: "serumIllustrated", photo: STOCK.serumIllustrated, title: "Serum bottles with illustrated cartons", format: "printed", services: ["box-packaging-design","bottle-label-design"], industry: "perfume", servicePage: "bottle-label-design", width: 1200, height: 800 },
  { id: "arganCartons", photo: STOCK.arganCartons, title: "Argan oil cartons", format: "printed", services: ["box-packaging-design","product-packaging-design"], industry: "cosmetics", servicePage: "hair-care-packaging-design", width: 800, height: 1200 },
  { id: "coffeeBagsShelf", photo: STOCK.coffeeBagsShelf, title: "Coffee bags on a wooden shelf", format: "pouch", services: ["pouch-packaging-design","retail-display-design"], industry: null, servicePage: "retail-packaging-design", width: 1200, height: 900 },
  { id: "coffeeTinDesk", photo: STOCK.coffeeTinDesk, title: "Coffee tin on a desk", format: "other", services: ["product-packaging-design"], industry: "food-bakery", servicePage: "can-tin-design", width: 800, height: 1200 },
  { id: "coffeePouchesYellow", photo: STOCK.coffeePouchesYellow, title: "Coffee pouches on yellow", format: "pouch", services: ["pouch-packaging-design"], industry: null, servicePage: "pouch-packaging-design", width: 960, height: 1200 },
  { id: "chocolateIllustrated", photo: STOCK.chocolateIllustrated, title: "Illustrated chocolate wrap", format: "label", services: ["label-design","product-packaging-design"], industry: "chocolates", servicePage: "chocolate-packaging-design", width: 800, height: 1200 },
  { id: "minimalSkincare", photo: STOCK.minimalSkincare, title: "Minimal skincare cartons", format: "printed", services: ["box-packaging-design","product-packaging-design"], industry: "pharmaceutical", servicePage: "cosmetic-packaging-design", width: 829, height: 1200 },
  { id: "coffeeShopShelf", photo: STOCK.coffeeShopShelf, title: "Coffee shop bag wall", format: "pouch", services: ["pouch-packaging-design","retail-display-design"], industry: null, servicePage: "retail-packaging-design", width: 900, height: 1200 },
  { id: "chocolateBarsWood", photo: STOCK.chocolateBarsWood, title: "Chocolate bar wrappers", format: "label", services: ["label-design","product-packaging-design"], industry: "chocolates", servicePage: "chocolate-packaging-design", width: 960, height: 1200 },
  { id: "chocolateBird", photo: STOCK.chocolateBird, title: "Chocolate wrap with bird illustration", format: "label", services: ["label-design","product-packaging-design"], industry: "chocolates", servicePage: "chocolate-packaging-design", width: 800, height: 1200 },
  { id: "soapBottleGift", photo: STOCK.soapBottleGift, title: "Soap and body wash gift", format: "label", services: ["label-design","product-packaging-design"], industry: "cosmetics", servicePage: "soap-bath-packaging-design", width: 901, height: 1200 },
  { id: "floralMailer", photo: STOCK.floralMailer, title: "Floral printed mailer box", format: "printed", services: ["box-packaging-design","unboxing-packaging-design"], industry: "apparel", servicePage: "unboxing-packaging-design", width: 800, height: 1200 },
  { id: "snackPouchesRed", photo: STOCK.snackPouchesRed, title: "Red snack pouches", format: "pouch", services: ["pouch-packaging-design","product-packaging-design"], industry: "food-bakery", servicePage: "snack-packaging-design", width: 1200, height: 800 },
  { id: "whiteCartonsBasket", photo: STOCK.whiteCartonsBasket, title: "White skincare cartons", format: "printed", services: ["box-packaging-design","product-packaging-design"], industry: "cosmetics", servicePage: "cosmetic-packaging-design", width: 801, height: 1200 },
  { id: "coffeePouchDesk", photo: STOCK.coffeePouchDesk, title: "Coffee pouch on a desk", format: "pouch", services: ["pouch-packaging-design"], industry: null, servicePage: "private-label-packaging-design", width: 960, height: 1200 },
  { id: "minimalCandleCarton", photo: STOCK.minimalCandleCarton, title: "Minimal candle carton", format: "printed", services: ["box-packaging-design","product-packaging-design"], industry: "candles", servicePage: "candle-packaging-design", width: 800, height: 1200 },
  { id: "cbdCartonsGrid", photo: STOCK.cbdCartonsGrid, title: "Green carton range", format: "printed", services: ["box-packaging-design","product-packaging-design"], industry: "cbd", servicePage: "cbd-packaging-design", width: 1200, height: 800 },
  { id: "sweetsBox", photo: STOCK.sweetsBox, title: "Printed sweets box", format: "printed", services: ["box-packaging-design","product-packaging-design"], industry: "food-bakery", servicePage: "bakery-confectionery-packaging-design", width: 800, height: 1200 },
  { id: "coffeeBagSealing", photo: STOCK.coffeeBagSealing, title: "Coffee bag being sealed", format: "pouch", services: ["pouch-packaging-design"], industry: null, servicePage: "pouch-packaging-design", width: 1200, height: 800 },
  { id: "kraftSachets", photo: STOCK.kraftSachets, title: "Kraft coffee sachets", format: "pouch", services: ["pouch-packaging-design"], industry: null, servicePage: "sustainable-packaging-design", width: 960, height: 1200 },
  { id: "coffeeBagsBrick", photo: STOCK.coffeeBagsBrick, title: "Leaf-print coffee bags", format: "pouch", services: ["pouch-packaging-design"], industry: null, servicePage: "packaging-range-design", width: 1200, height: 800 },
  { id: "serumBlackYellow", photo: STOCK.serumBlackYellow, title: "Black and yellow serum cartons", format: "printed", services: ["box-packaging-design","product-packaging-design"], industry: "cbd", servicePage: "cbd-packaging-design", width: 1200, height: 800 },
];

export const portfolio: PortfolioItem[] = entries.map(({ photo, ...e }) => ({
  ...e,
  image: `${photo.file}-1200.webp`,
  full: `${photo.file}.webp`,
  alt: photo.alt,
}));
