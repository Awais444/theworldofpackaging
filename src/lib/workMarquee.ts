import path from "node:path";
import sharp from "sharp";
import { caseStudies } from "@/content/caseStudies";
import { PHOTOS, type PhotoKey } from "@/content/photos";
import { galleryItems } from "@/lib/workGallery";
import type { MarqueeItem } from "@/components/home/WorkMarquee";

/*
 * Homepage "Packaging we have made" marquee: 24 images in two rows that never repeat each other.
 * Case-study covers link to their case study; portfolio photos open the /work lightbox. Third-party-brand
 * photos are never used (portfolio.ts already excludes them). Order mixes formats along each row.
 */
type Pick = { case: string } | { photo: string };

const ROW_1: Pick[] = [
  { case: "united-gift-club-magnetic-gift-box" },
  { photo: "coffeePouchesYellow" },
  { case: "springwater-soaps-window-cartons" },
  { photo: "chocolateIllustrated" },
  { case: "fruits-and-berries-candle-tube" },
  { photo: "whiteCartonsBasket" },
  { case: "hip-hip-coffee-pouches" },
  { photo: "soapBottleGift" },
  { case: "wild-flowers-floral-gift-box" },
  { photo: "kraftSachets" },
  { photo: "minimalCandleCarton" },
  { case: "mr-negative-film-box-cartons" },
];
const ROW_2: Pick[] = [
  { case: "olivia-boutique-kraft-box-sleeve" },
  { photo: "snackPouchesRed" },
  { case: "barkers-secret-handmade-soap-packaging" },
  { photo: "chocolateBird" },
  { photo: "cbdCartonsGrid" },
  { case: "crampless-tea-kraft-packaging" },
  { photo: "serumBlackYellow" },
  { case: "submersible-mailer-unboxing" },
  { photo: "floralMailer" },
  { photo: "coffeeBagsBrick" },
  { photo: "sweetsBox" },
  { photo: "minimalSkincare" },
];

/** Pixel size of a /public image, read once at build time (all marketing pages are static). */
async function size(file: string) {
  const meta = await sharp(path.join(process.cwd(), "public", file)).metadata();
  return { width: meta.width ?? 4, height: meta.height ?? 3 };
}

async function toItem(p: Pick): Promise<MarqueeItem | null> {
  if ("case" in p) {
    const c = caseStudies.find((x) => x.slug === p.case);
    if (!c) return null;
    const photo = PHOTOS[c.photos.cover as PhotoKey];
    const image = `${photo.file}-1200.webp`;
    return { kind: "case", id: c.slug, href: `/work/${c.slug}`, image, alt: photo.alt, title: `${c.client}: ${c.project}`, tag: c.industry, ...(await size(image)) };
  }
  const g = galleryItems.find((x) => x.id === p.photo);
  if (!g) return null;
  return { kind: "photo", id: g.id, image: g.image, alt: g.alt, title: g.title, tag: g.serviceLabels[0] ?? g.industryLabel ?? "Packaging design", width: g.width, height: g.height };
}

export async function workMarqueeRows() {
  const [row1, row2] = await Promise.all([ROW_1, ROW_2].map(async (row) => (await Promise.all(row.map(toItem))).filter((x): x is MarqueeItem => x !== null)));
  // Lightbox items: the portfolio photos in marquee order, so arrows walk through what was on screen.
  const ids = [...row1!, ...row2!].filter((i) => i.kind === "photo").map((i) => i.id);
  const lightbox = ids.map((id) => galleryItems.find((g) => g.id === id)!);
  return { rows: [row1!, row2!] as const, lightbox };
}
