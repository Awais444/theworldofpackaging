// Horizontal overflow check: scrollWidth must equal innerWidth at phone widths.
// The html/body `overflow-x: clip` safety net is switched off first, so the real layout is measured.
// Usage: node scripts/check-overflow.mjs [baseUrl]   (default http://localhost:3000; uses installed Chrome)
import { chromium } from "playwright-core";

const base = process.argv[2] ?? "http://localhost:3000";
const pages = ["/", "/packaging-design", "/countries", "/countries/united-states"];
// Pass extra widths as args, e.g. 288 320 (approximates 125% Android text size on 360/400px phones).
const extra = process.argv.slice(3).map(Number);
const widths = [360, 375, 390, 414, ...extra];

const browser = await chromium.launch({ channel: "chrome" });
let failed = 0;
for (const width of widths) {
  const ctx = await browser.newContext({ viewport: { width, height: 800 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  for (const path of pages) {
    await page.goto(base + path, { waitUntil: "networkidle" });
    await page.addStyleTag({ content: "html,body{overflow-x:visible!important}" });
    const r = await page.evaluate((w) => {
      const iw = window.innerWidth;
      const offenders = [...document.querySelectorAll("body *")]
        .filter((e) => e.getBoundingClientRect().right > w + 0.5 && !e.closest("[class*=overflow-hidden],[class*=truncate]") && getComputedStyle(e).position !== "fixed")
        .slice(0, 3)
        .map((e) => `${e.tagName.toLowerCase()}.${String(e.className?.baseVal ?? e.className).split(" ").slice(0, 3).join(".")}`);
      return { sw: document.documentElement.scrollWidth, iw, offenders };
    }, width);
    // On mobile emulation innerWidth grows with overflowing content, so compare with the set width too.
    r.iw = Math.min(r.iw, width);
    const ok = r.sw === r.iw;
    if (!ok) failed++;
    console.log(`${ok ? "PASS" : "FAIL"} ${width}px ${path} scrollWidth=${r.sw} innerWidth=${r.iw}${ok ? "" : " " + r.offenders.join(", ")}`);
  }
  await ctx.close();
}
await browser.close();
process.exit(failed ? 1 : 0);
