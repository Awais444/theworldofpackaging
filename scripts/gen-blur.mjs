// Tiny blurred placeholders for every photo in public/images (runs before `next build`).
// Output: src/content/blurData.json, keyed by public path ("/images/rigid/x.webp").
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve("public");
const out = path.resolve("src/content/blurData.json");
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)]));

const data = {};
for (const file of walk(path.join(root, "images")).filter((f) => f.endsWith(".webp")).sort()) {
  const buf = await sharp(file).resize(16, 16, { fit: "inside" }).webp({ quality: 40 }).toBuffer();
  data["/" + path.relative(root, file).split(path.sep).join("/")] = `data:image/webp;base64,${buf.toString("base64")}`;
}
fs.writeFileSync(out, JSON.stringify(data, null, 0) + "\n");
console.log(`blurData.json: ${Object.keys(data).length} images`);
