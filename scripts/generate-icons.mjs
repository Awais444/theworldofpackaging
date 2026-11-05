// Regenerates the favicon and app icons from public/brand/favicon-source.png (the blue rounded-square icon).
// Run: node scripts/generate-icons.mjs. The header/footer logo (public/brand/logo-mark.svg) is separate.
import fs from "node:fs";
import sharp from "sharp";

const SRC = "public/brand/favicon-source.png";
const BLUE = "#011EFD";
const kernel = sharp.kernel.lanczos3;
const png = (size, opts = {}) => {
  let img = sharp(SRC).resize(size, size, { kernel, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } });
  if (opts.flatten) img = img.flatten({ background: opts.flatten });
  return img.png({ compressionLevel: 9 });
};

const { width } = await sharp(SRC).metadata();
if (width < 512) console.warn(`generate-icons: source is ${width}px; icon-512.png is upscaled. A 1024px+ PNG or an SVG source would be sharper.`);

// Browser icons: transparent corners outside the rounded square.
await png(32).toFile("src/app/icon.png");
await png(192).toFile("public/brand/icon-192.png");
await png(512).toFile("public/brand/icon-512.png");
// Apple touch icon: iOS paints transparent pixels black and rounds the corners itself, so the corners are
// filled with the icon's own blue (the visible shape stays the same).
await png(180, { flatten: BLUE }).toFile("src/app/apple-icon.png");

// favicon.ico with 16, 32 and 48 px PNG images inside (the ICO format allows PNG payloads).
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map((s) => png(s).toBuffer()));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const entries = sizes.map((s, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(s, 0);
  e.writeUInt8(s, 1);
  e.writeUInt16LE(1, 4); // colour planes
  e.writeUInt16LE(32, 6); // bits per pixel
  e.writeUInt32LE(images[i].length, 8);
  e.writeUInt32LE(offset, 12);
  offset += images[i].length;
  return e;
});
fs.writeFileSync("src/app/favicon.ico", Buffer.concat([header, ...entries, ...images]));
// Keep public/brand/favicon.ico in step for anything that links it directly.
fs.copyFileSync("src/app/favicon.ico", "public/brand/favicon.ico");

console.log("generate-icons: favicon.ico (16/32/48), icon.png 32, apple-icon.png 180, icon-192.png, icon-512.png");
