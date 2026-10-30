// Pings IndexNow (Bing, Yandex, Seznam, Naver; Bing shares with others) with every URL in the sitemaps.
// Run after a deploy: INDEXNOW_KEY=... node scripts/indexnow.mjs [https://theworldofpackaging.com]
// The same INDEXNOW_KEY must be set on the deployed site so /indexnow-key.txt serves it.
const site = (process.argv[2] ?? process.env.NEXT_PUBLIC_SITE_URL ?? "https://theworldofpackaging.com").replace(/\/$/, "");
const key = process.env.INDEXNOW_KEY;
if (!key) {
  console.error("Set INDEXNOW_KEY first.");
  process.exit(1);
}
const locs = (x) => [...x.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const index = await (await fetch(`${site}/sitemap.xml`)).text();
const urls = [];
for (const m of locs(index).filter((u) => !u.endsWith("/images.xml"))) urls.push(...locs(await (await fetch(m)).text()));
const host = new URL(site).host;
for (let i = 0; i < urls.length; i += 10000) {
  const r = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host, key, keyLocation: `${site}/indexnow-key.txt`, urlList: urls.slice(i, i + 10000) }),
  });
  console.log(`IndexNow: ${r.status} for ${urls.slice(i, i + 10000).length} URLs`);
}
