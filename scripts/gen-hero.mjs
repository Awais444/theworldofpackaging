// Pre-generates the homepage hero image (transparent padding trimmed) at fixed widths in AVIF and WebP (transparency kept), so the
// LCP-area image is served as a static file instead of being optimised on demand by /_next/image.
// File names carry a short content hash of the source, so /images/hero/* can be cached as immutable.
// Writes src/content/heroImage.json, which HomeHero and the homepage preload read. Runs in prebuild.
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const NAME = "hero-fuelo-pouch";
const DIR = "public/images/hero";
const SRC = path.join(DIR, `${NAME}.webp`);
const MANIFEST = "src/content/heroImage.json";
const WIDTHS = [480, 768, 1024, 1440];
const FORMATS = { avif: { quality: 55, effort: 6, chromaSubsampling: "4:2:0" }, webp: { quality: 78, alphaQuality: 80, effort: 6 } };

// Transparent padding is trimmed so the pouch fills its box.
const src = await sharp(readFileSync(SRC)).trim({ threshold: 1 }).toBuffer();
const hash = createHash("sha1").update(src).update(JSON.stringify({ WIDTHS, FORMATS })).digest("hex").slice(0, 8);
const { width, height } = await sharp(src).metadata();

const fileFor = (w, ext) => `${NAME}-${w}-${hash}.${ext}`;
const all = WIDTHS.flatMap((w) => Object.keys(FORMATS).map((ext) => fileFor(w, ext)));

if (all.every((f) => existsSync(path.join(DIR, f)))) {
  console.log(`gen-hero: up to date (${hash})`);
} else {
  for (const w of WIDTHS) {
    for (const [ext, opts] of Object.entries(FORMATS)) {
      await sharp(src).resize({ width: w, withoutEnlargement: true })[ext](opts).toFile(path.join(DIR, fileFor(w, ext)));
    }
  }
  // Remove variants from an older source.
  for (const f of readdirSync(DIR)) {
    if (new RegExp(`^${NAME}-\\d+-[0-9a-f]{8}\\.(avif|webp)$`).test(f) && !all.includes(f)) unlinkSync(path.join(DIR, f));
  }
  console.log(`gen-hero: wrote ${all.length} files (${hash})`);
}

const srcset = (ext) => WIDTHS.map((w) => `/images/hero/${fileFor(w, ext)} ${w}w`).join(", ");
writeFileSync(
  MANIFEST,
  JSON.stringify({ width, height, avif: srcset("avif"), webp: srcset("webp"), fallback: `/images/hero/${fileFor(1024, "webp")}` }, null, 2) + "\n",
);
