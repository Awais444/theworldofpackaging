// Image delivery check on a running build: for every loaded <img>, compares the served width with the
// rendered width × DPR and the bytes transferred with the budget (LCP/hero 180 KB, cards 60 KB, thumbs 40 KB).
// Usage: node scripts/check-images.mjs [baseUrl]
import { chromium } from "playwright-core";

const base = (process.argv[2] ?? "http://localhost:3100").replace(/\/$/, "");
const pages = ["/", "/packaging-design", "/packaging-design/cosmetic-packaging-design", "/rigid-boxes/magnetic-closure", "/work", "/countries/united-states", "/blog/what-is-a-dieline", "/get-a-quote"];
const devices = [
  { name: "mobile", viewport: { width: 412, height: 823 }, dpr: 1.75, isMobile: true },
  { name: "desktop", viewport: { width: 1440, height: 900 }, dpr: 1, isMobile: false },
];
const browser = await chromium.launch({ channel: "chrome" });
let over2x = 0, overBudget = 0, total = 0, bytes = 0;
const issues = [];
for (const d of devices) {
  const ctx = await browser.newContext({ viewport: d.viewport, deviceScaleFactor: d.dpr, isMobile: d.isMobile, hasTouch: d.isMobile });
  const page = await ctx.newPage();
  for (const p of pages) {
    await page.goto(base + p, { waitUntil: "load" });
    // Scroll through so lazy images load, then measure.
    const h = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < h; y += 700) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(120); }
    await page.waitForTimeout(1200);
    const rows = await page.evaluate((dpr) => {
      const res = Object.fromEntries(performance.getEntriesByType("resource").map((e) => [e.name, e.encodedBodySize || e.transferSize]));
      return [...document.images].filter((i) => i.currentSrc && i.complete && i.naturalWidth > 0 && /_next\/image|\/images\//.test(i.currentSrc)).map((i) => {
        const r = i.getBoundingClientRect();
        const fill = i.getAttribute("data-nimg") === "fill";
        return {
          src: decodeURIComponent(i.currentSrc.replace(location.origin, "")).replace(/^\/_next\/image\?url=/, "").split("&q=")[0],
          served: i.naturalWidth,
          rendered: Math.round(r.width * dpr),
          bytes: res[i.currentSrc] ?? 0,
          lcp: i.fetchPriority === "high",
          kind: i.fetchPriority === "high" ? "hero" : r.width < 200 ? "thumb" : "card",
          fill,
        };
      });
    }, d.dpr);
    for (const r of rows) {
      total++;
      bytes += r.bytes;
      const budget = r.kind === "hero" ? 180 : r.kind === "thumb" ? 40 : 60;
      if (r.rendered > 0 && r.served > 2 * r.rendered) { over2x++; issues.push(`${d.name} ${p}: served ${r.served}px for ${r.rendered}px — ${r.src}`); }
      if (r.bytes / 1024 > budget) { overBudget++; issues.push(`${d.name} ${p}: ${(r.bytes / 1024).toFixed(0)} KB > ${budget} KB (${r.kind}) — ${r.src}`); }
    }
  }
  await ctx.close();
}
await browser.close();
console.log(`Images measured: ${total}, total ${(bytes / 1024).toFixed(0)} KB`);
console.log(`Served > 2× rendered: ${over2x}; over budget: ${overBudget}`);
for (const i of issues.slice(0, 40)) console.log(" -", i);
