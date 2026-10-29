// SEO crawl of a running production build (next build && next start).
// Builds the URL list from every sitemap plus every internal link found, then reports per URL:
// status, title/description (+length), H1 count, canonical, robots, OG image, JSON-LD types, word count,
// internal links in/out (whole page and inside <main>), and AEO/GEO signals (answer-first lead, FAQ,
// last-updated date, author/organisation attribution). Also checks every legacy redirect for chains.
// Usage: node scripts/seo-crawl.mjs [baseUrl] [outDir]   → writes crawl.csv and crawl-summary.json
import fs from "node:fs";
import path from "node:path";

const base = (process.argv[2] ?? "http://localhost:3100").replace(/\/$/, "");
const outDir = process.argv[3] ?? ".";
const strip = (s) => s.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " ").replace(/\s+/g, " ").trim();
const decode = (s) => (s ?? "").replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');
const meta = (h, re) => decode((h.match(re) || [])[1]);

// 1. URL list: sitemaps.
const locs = (x) => [...x.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const idx = await (await fetch(`${base}/sitemap.xml`)).text();
const sitemapUrls = new Set();
for (const m of locs(idx)) for (const u of locs(await (await fetch(base + m)).text())) sitemapUrls.add(u);

// 2. Crawl (sitemap URLs + anything linked internally).
const pages = new Map();
const queue = [...sitemapUrls, "/"];
const seen = new Set(queue);
const inbound = new Map();
const inboundMain = new Map();
const add = (map, k, v) => map.set(k, (map.get(k) ?? new Set()).add(v));
const norm = (href) => {
  const u = href.split("#")[0].split("?")[0];
  return u.length > 1 ? u.replace(/\/$/, "") : u;
};
const skip = (u) => /^\/(_next|api|images|brand|icon|apple-icon|opengraph-image|sitemap)/.test(u) || /\.(xml|txt|png|jpe?g|webp|svg|ico|pdf)$/.test(u) || /opengraph-image/.test(u);

async function crawl(u) {
  const r = await fetch(base + u, { redirect: "manual" });
  const rec = { url: u, status: r.status, location: r.headers.get("location") ?? "" };
  if (r.status !== 200) return rec;
  const h = await r.text();
  const main = (h.match(/<main[\s\S]*?<\/main>/) || [""])[0];
  const jsonld = [...h.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap((m) => {
    try {
      const d = JSON.parse(m[1]);
      const types = [];
      const walk = (o) => { if (Array.isArray(o)) o.forEach(walk); else if (o && typeof o === "object") { if (o["@type"]) types.push(...[o["@type"]].flat()); Object.values(o).forEach(walk); } };
      walk(d);
      return types;
    } catch { return ["INVALID_JSON"]; }
  });
  const out = [...h.matchAll(/href="(\/[^"]*)"/g)].map((m) => norm(m[1])).filter((x) => !skip(x));
  const outMain = [...main.matchAll(/href="(\/[^"]*)"/g)].map((m) => norm(m[1])).filter((x) => !skip(x));
  for (const t of new Set(out)) if (t !== u) add(inbound, t, u);
  for (const t of new Set(outMain)) if (t !== u) add(inboundMain, t, u);
  for (const t of out) if (!seen.has(t)) { seen.add(t); queue.push(t); }
  // Lead paragraph right after the H1 (answer-first check).
  const afterH1 = (main.split(/<\/h1>/)[1] ?? "");
  const lead = strip((afterH1.match(/<p[\s\S]*?<\/p>/) || [""])[0]);
  const text = strip(main);
  Object.assign(rec, {
    title: meta(h, /<title>([^<]*)<\/title>/),
    description: meta(h, /<meta name="description" content="([^"]*)"/),
    h1: (main.match(/<h1[\s>]/g) || []).length + (h.replace(main, "").match(/<h1[\s>]/g) || []).length,
    canonical: meta(h, /<link rel="canonical" href="([^"]*)"/),
    robots: meta(h, /<meta name="robots" content="([^"]*)"/) || "index,follow (default)",
    ogImage: /<meta property="og:image"/.test(h),
    twitter: /<meta name="twitter:card"/.test(h),
    jsonld: [...new Set(jsonld)].join(" "),
    words: text ? text.split(" ").length : 0,
    linksOut: new Set(out).size,
    linksOutMain: new Set(outMain).size,
    leadWords: lead ? lead.split(" ").length : 0,
    faq: jsonld.includes("FAQPage"),
    updated: /dateModified|Last updated|Updated\s+\d|<time/.test(h),
    author: /"author"|Written by|Reviewed by/.test(h),
    breadcrumb: jsonld.includes("BreadcrumbList"),
  });
  return rec;
}

while (queue.length) {
  const batch = queue.splice(0, 8);
  const recs = await Promise.all(batch.map((u) => crawl(u).catch((e) => ({ url: u, status: "ERR " + e.message }))));
  for (const r of recs) pages.set(r.url, r);
}

// 3. Legacy redirects (one hop to a 200).
const red = fs.readFileSync(path.resolve("src/content/redirects.ts"), "utf8");
const legacy = [...red.matchAll(/^\s*"(\/[^"]+)":\s*"(\/[^"]*)"/gm)].map((m) => m[1]);
const redirects = [];
for (const src of legacy) {
  let u = src, hops = 0, status = 0;
  const chain = [src];
  while (hops < 5) {
    const r = await fetch(base + u, { redirect: "manual" });
    status = r.status;
    if (status >= 300 && status < 400) { u = new URL(r.headers.get("location"), base).pathname; chain.push(`${status}→${u}`); hops++; } else break;
  }
  redirects.push({ src, hops, final: status, chain: chain.join(" ") });
}

// 4. Rows + summary.
const rows = [...pages.values()].map((p) => ({
  ...p,
  inSitemap: sitemapUrls.has(p.url),
  linksIn: inbound.get(p.url)?.size ?? 0,
  linksInMain: inboundMain.get(p.url)?.size ?? 0,
}));
const ok = rows.filter((r) => r.status === 200);
const indexable = ok.filter((r) => !/noindex/.test(r.robots));
const dupe = (key) => Object.entries(ok.reduce((m, r) => ((m[r[key]] ??= []).push(r.url), m), {})).filter(([k, v]) => k && v.length > 1);
const summary = {
  crawled: rows.length,
  status200: ok.length,
  indexable: indexable.length,
  sitemapUrls: sitemapUrls.size,
  nonOk: rows.filter((r) => r.status !== 200).map((r) => `${r.url} ${r.status} ${r.location}`),
  titleOver60: indexable.filter((r) => r.title.length > 60).map((r) => `${r.url} (${r.title.length})`),
  titleMissingBrand: indexable.filter((r) => !r.title.includes("The World of Packaging")).length,
  descMissing: indexable.filter((r) => !r.description).map((r) => r.url),
  descOutside140to155: indexable.filter((r) => r.description && (r.description.length < 140 || r.description.length > 155)).length,
  descOver155: indexable.filter((r) => r.description.length > 155).map((r) => `${r.url} (${r.description.length})`),
  h1Not1: ok.filter((r) => r.h1 !== 1).map((r) => `${r.url} (${r.h1})`),
  canonicalMissing: ok.filter((r) => !r.canonical).map((r) => r.url),
  canonicalRelative: ok.filter((r) => r.canonical && !r.canonical.startsWith("http")).length,
  canonicalMismatch: indexable.filter((r) => r.canonical && new URL(r.canonical, base).pathname.replace(/\/$/, "") !== (r.url === "/" ? "" : r.url)).map((r) => `${r.url} → ${r.canonical}`),
  ogImageMissing: ok.filter((r) => !r.ogImage).map((r) => r.url),
  twitterMissing: ok.filter((r) => !r.twitter).length,
  breadcrumbMissing: indexable.filter((r) => r.url !== "/" && !r.breadcrumb).map((r) => r.url),
  invalidJsonLd: ok.filter((r) => r.jsonld.includes("INVALID_JSON")).map((r) => r.url),
  duplicateTitles: dupe("title"),
  duplicateDescriptions: dupe("description"),
  indexableNotInSitemap: indexable.filter((r) => !r.inSitemap).map((r) => r.url),
  sitemapButNoindex: ok.filter((r) => r.inSitemap && /noindex/.test(r.robots)).map((r) => r.url),
  orphansAnyLink: indexable.filter((r) => r.url !== "/" && r.linksIn === 0).map((r) => r.url),
  fewerThan3ContextualLinksIn: indexable.filter((r) => r.url !== "/" && r.linksInMain < 3).length,
  thinUnder300Words: indexable.filter((r) => r.words < 300).map((r) => `${r.url} (${r.words})`),
  noFaq: indexable.filter((r) => !r.faq).length,
  noLeadAnswer40to80: indexable.filter((r) => r.leadWords < 40 || r.leadWords > 80).length,
  noUpdatedDate: indexable.filter((r) => !r.updated).length,
  noAuthor: indexable.filter((r) => !r.author).length,
  redirectsChecked: redirects.length,
  redirectChains: redirects.filter((r) => r.hops > 1).map((r) => r.chain),
  redirectBroken: redirects.filter((r) => r.final !== 200).map((r) => r.chain),
};
const cols = ["url", "status", "inSitemap", "robots", "title", "titleLen", "description", "descLen", "h1", "canonical", "ogImage", "jsonld", "words", "linksIn", "linksInMain", "linksOut", "linksOutMain", "leadWords", "faq", "updated", "author"];
const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
const csv = [cols.join(","), ...rows.sort((a, b) => a.url.localeCompare(b.url)).map((r) => cols.map((c) => esc(c === "titleLen" ? r.title?.length : c === "descLen" ? r.description?.length : r[c])).join(","))].join("\n");
fs.writeFileSync(path.join(outDir, "crawl.csv"), csv);
fs.writeFileSync(path.join(outDir, "crawl-summary.json"), JSON.stringify({ summary, redirects }, null, 2));
const short = Object.fromEntries(Object.entries(summary).map(([k, v]) => [k, Array.isArray(v) ? (v.length > 6 ? [`${v.length} items`, ...v.slice(0, 6)] : v) : v]));
console.log(JSON.stringify(short, null, 1));
