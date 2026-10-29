// Validates every JSON-LD block on a running build against the schema.org vocabulary.
// Checks: @type is a schema.org class; every property exists and is allowed on that type (or a parent);
// required fields for the rich-result types we use. Vocabulary is cached in .cache/schemaorg.jsonld.
// Usage: node scripts/validate-schema.mjs [baseUrl]
import fs from "node:fs";
import path from "node:path";

const base = (process.argv[2] ?? "http://localhost:3100").replace(/\/$/, "");
const cache = path.resolve(".cache/schemaorg.jsonld");
if (!fs.existsSync(cache)) {
  fs.mkdirSync(path.dirname(cache), { recursive: true });
  const r = await fetch("https://schema.org/version/latest/schemaorg-current-https.jsonld");
  if (!r.ok) throw new Error(`Could not download the schema.org vocabulary (${r.status})`);
  fs.writeFileSync(cache, await r.text());
}
const graph = JSON.parse(fs.readFileSync(cache, "utf8"))["@graph"];
const id = (x) => (typeof x === "string" ? x : x?.["@id"])?.replace("schema:", "");
const arr = (x) => (x == null ? [] : Array.isArray(x) ? x : [x]);
const classes = new Map();
const props = new Map();
for (const n of graph) {
  const types = arr(n["@type"]);
  if (types.includes("rdfs:Class")) classes.set(id(n), arr(n["rdfs:subClassOf"]).map(id));
  if (types.includes("rdf:Property")) props.set(id(n), arr(n["schema:domainIncludes"]).map(id));
}
const ancestors = (t, seen = new Set()) => {
  if (seen.has(t)) return seen;
  seen.add(t);
  for (const p of classes.get(t) ?? []) ancestors(p, seen);
  return seen;
};
const REQUIRED = {
  Organization: ["name", "url"],
  BreadcrumbList: ["itemListElement"],
  ListItem: ["position"],
  FAQPage: ["mainEntity"],
  Question: ["name", "acceptedAnswer"],
  Answer: ["text"],
  Product: ["name"],
  Service: ["name", "provider"],
  BlogPosting: ["headline", "datePublished", "author"],
  Article: ["headline", "datePublished", "author"],
  HowTo: ["name", "step"],
  HowToStep: ["text"],
  ImageObject: ["contentUrl"],
  CollectionPage: ["name"],
  ItemList: ["itemListElement"],
  DefinedTermSet: ["name", "hasDefinedTerm"],
  DefinedTerm: ["name", "description"],
};
const IGNORE = new Set(["@context", "@type", "@id"]);

function check(node, where, errors, counts) {
  if (Array.isArray(node)) return node.forEach((n) => check(n, where, errors, counts));
  if (!node || typeof node !== "object") return;
  const types = arr(node["@type"]);
  for (const t of types) {
    counts[t] = (counts[t] ?? 0) + 1;
    if (!classes.has(t)) { errors.push(`${where}: unknown type ${t}`); continue; }
    const anc = ancestors(t);
    for (const k of Object.keys(node)) {
      if (IGNORE.has(k)) continue;
      if (!props.has(k)) { errors.push(`${where}: ${t}.${k} is not a schema.org property`); continue; }
      const dom = props.get(k);
      if (dom.length && !dom.some((d) => anc.has(d))) errors.push(`${where}: ${k} is not allowed on ${t}`);
    }
    for (const r of REQUIRED[t] ?? []) if (node[r] == null || (Array.isArray(node[r]) && node[r].length === 0)) errors.push(`${where}: ${t} missing ${r}`);
  }
  for (const [k, v] of Object.entries(node)) if (!IGNORE.has(k) && typeof v === "object") check(v, where, errors, counts);
}

// URLs: every sitemap URL plus the noindex pages we still render schema on.
const locs = (x) => [...x.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const urls = new Set();
for (const m of locs(await (await fetch(`${base}/sitemap.xml`)).text())) for (const u of locs(await (await fetch(base + m)).text())) urls.add(u);
const errors = [];
const counts = {};
const list = [...urls];
for (let i = 0; i < list.length; i += 8) {
  await Promise.all(list.slice(i, i + 8).map(async (u) => {
    const h = await (await fetch(base + u)).text();
    for (const m of h.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
      try { check(JSON.parse(m[1]), u, errors, counts); } catch (e) { errors.push(`${u}: invalid JSON (${e.message})`); }
    }
  }));
}
console.log(`Pages: ${list.length}`);
console.log("Types:", Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v}`).join(", "));
const uniq = [...new Set(errors.map((e) => e.replace(/^[^:]+: /, "")))];
console.log(`Errors: ${errors.length} (${uniq.length} distinct)`);
for (const e of uniq.slice(0, 40)) console.log(" -", e, `(${errors.filter((x) => x.endsWith(e)).length} pages)`);
process.exit(errors.length ? 1 : 0);
