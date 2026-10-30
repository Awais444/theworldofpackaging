// First-load JS per page from a production build: gzip size of every chunk each page loads (noModule polyfills excluded).
// Usage: node scripts/bundle-report.mjs <projectRoot> <baseUrl>
// Client JS audit: chunk sizes (raw + gzip), which libraries each chunk contains, and JS loaded per page.
// Usage: node bundle.mjs <projectRoot> <baseUrl>
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const [root, base] = process.argv.slice(2);
const dir = path.join(root, ".next/static/chunks");
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const libs = {
  gsap: /GreenSock|gsap\.registerPlugin|_gsScope|gsap-core/,
  ScrollTrigger: /ScrollTrigger/,
  "framer-motion": /framer-motion|motionValue|useReducedMotion|AnimatePresence/,
  lenis: /lenis|Lenis/,
  "country-flag-icons": /country-flag-icons/,
  zod: /ZodError|ZodType/,
  "react-hook-form": /useForm|react-hook-form/,
  zustand: /zustand/,
};
const chunks = walk(dir).filter((f) => f.endsWith(".js")).map((f) => {
  const buf = fs.readFileSync(f);
  const txt = buf.toString("utf8");
  return { file: "/" + path.relative(path.join(root, ".next"), f).split(path.sep).join("/"), raw: buf.length, gz: zlib.gzipSync(buf).length, libs: Object.entries(libs).filter(([, re]) => re.test(txt)).map(([k]) => k) };
});
chunks.sort((a, b) => b.gz - a.gz);
const kb = (n) => (n / 1024).toFixed(1);
console.log("## Largest client chunks (gzip)");
for (const c of chunks.slice(0, 15)) console.log(`${kb(c.gz).padStart(7)} KB gz  ${kb(c.raw).padStart(7)} KB raw  ${c.file}  [${c.libs.join(", ")}]`);
console.log(`Total chunks: ${chunks.length}, total gzip ${kb(chunks.reduce((s, c) => s + c.gz, 0))} KB`);

const byFile = Object.fromEntries(chunks.map((c) => [c.file, c]));
const pages = ["/", "/packaging-design", "/packaging-design/cosmetic-packaging-design", "/rigid-boxes/magnetic-closure", "/work", "/countries/united-states", "/blog/what-is-a-dieline", "/get-a-quote", "/collapsible-rigid-boxes", "/about"];
console.log("\n## First-load JS per page (scripts in the HTML)");
for (const p of pages) {
  const html = await (await fetch(base + p)).text();
  // Scripts the page loads (modulepreload links + script tags), minus noModule legacy polyfills.
  const nomodule = new Set([...html.matchAll(/<script[^>]*src="(\/_next\/static\/chunks\/[^"]+\.js)"[^>]*noModule[^>]*>/gi)].map((m) => m[1]));
  const srcs = [...new Set([...html.matchAll(/(?:src|href)="(\/_next\/static\/chunks\/[^"]+\.js)"/g)].map((m) => m[1]).filter((s) => !nomodule.has(s)).map((s) => s.replace("/_next", "")))];
  const found = srcs.map((s) => byFile[s]).filter(Boolean);
  const gz = found.reduce((s, c) => s + c.gz, 0);
  const l = [...new Set(found.flatMap((c) => c.libs))];
  console.log(`${p.padEnd(46)} ${String(found.length).padStart(3)} chunks  ${kb(gz).padStart(7)} KB gz  libs: ${l.join(", ")}`);
}
