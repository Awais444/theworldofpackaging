import fs from "node:fs";
import path from "node:path";
import { site } from "@/config/site";

/**
 * Answer-first lead paragraphs (AEO): 40–60 words directly under the H1 that answer the page's main
 * question, built from each page's own content plus confirmed facts in site.ts. Server-only.
 */

const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;
const sentences = (s: string) => s.match(/[^.!?]+[.!?]+/g)?.map((x) => x.trim()) ?? [s.trim()];
const lowerFirst = (s: string) => (/^[A-Z][a-z ]/.test(s) ? s[0]!.toLowerCase() + s.slice(1) : s);
const andList = (xs: string[]) => (xs.length > 1 ? `${xs.slice(0, -1).join(", ")} and ${xs.at(-1)}` : xs[0] ?? "");
const dropArticle = (s: string) => s.replace(/^(A|An|The)\s+/, "");

/** Add sentences in order until the paragraph is 40–60 words; skip any that would overshoot. */
export function fitAnswer(parts: string[], min = 40, max = 60): string {
  const out: string[] = [];
  for (const p of parts.flatMap(sentences)) {
    if (!p) continue;
    const next = [...out, p].join(" ");
    if (words(next) > max) continue;
    out.push(p);
    if (words(next) >= min) break;
  }
  return out.join(" ");
}

const f = site.facts;
const factory = `in our own factory in ${site.country}`;

/** Box style: "What is a {name}?" */
export function boxAnswer(b: { name: string; summary: string; kind: "rigid" | "printed"; moq: number | null }) {
  const [first, ...rest] = sentences(b.summary);
  const body = dropArticle(first!);
  const def = `A ${b.name.toLowerCase()} is ${/^[aeiou]/i.test(body) ? "an" : "a"} ${lowerFirst(body)}`;
  const make =
    b.kind === "rigid"
      ? `We make ${b.name.toLowerCase()}es ${factory}${b.moq ? ` from ${b.moq} units` : ""}, with a digital proof and 3D mockup before print.`
      : `We print and cut them ${factory}, with a digital proof before print.`;
  return fitAnswer([def, ...rest, make, "Every order ships worldwide by air or sea.", `We have ${f.yearsExperience}+ years in packaging.`]);
}

/** Design service: "What is {service}?" */
export function designAnswer(d: { name: string; short: string; intro: string }) {
  if (words(d.intro) >= 40 && words(d.intro) <= 60) return d.intro;
  const def = `${d.name} is the design of ${lowerFirst(d.short.replace(/\.$/, ""))}.`;
  return fitAnswer([def, d.intro, `We design and make the packaging ${factory}, from ${f.rigidMoq} units.`, "First concepts usually arrive within 48 hours of an agreed brief."]);
}

/** Industry: "What packaging does {industry} need?" */
export function industryAnswer(i: { name: string; intro: string; styles: string[]; challenges: { title: string }[] }) {
  const list = andList(i.challenges.map((c) => lowerFirst(c.title))) || "clear branding";
  return fitAnswer([
    `${i.name} packaging has to handle ${list}.`,
    i.intro,
    `Popular formats include ${andList(i.styles.map((x) => lowerFirst(x)))}.`,
    `We design them and make them ${factory} from MOQ ${f.rigidMoq}, shipping worldwide.`,
  ]);
}

/** Country: "Can you design and ship packaging to {country}?" */
export function countryAnswer(c: { name: string; lead: string }) {
  // Names that take "the" in running text.
  const name = /^(United|Netherlands|Philippines|Czech|Dominican|Bahamas|Maldives|Gambia)/.test(c.name) ? `the ${c.name}` : c.name;
  return fitAnswer([
    `Yes: we design packaging for brands in ${name} and make it ${factory}, from MOQ ${f.rigidMoq}.`,
    c.lead,
    "Boxes ship by air or sea, assembled or flat-packed, with export documents prepared.",
    `We have ${f.yearsExperience}+ years in packaging.`,
  ]);
}

/** Guide: description + what the guide covers (its first H2s). */
export function guideAnswer(g: { slug: string; description: string }) {
  let heads: string[] = [];
  try {
    const mdx = fs.readFileSync(path.join(process.cwd(), "src/content/blog", `${g.slug}.mdx`), "utf8");
    heads = [...mdx.matchAll(/^## (.+)$/gm)].map((m) => m[1]!.replace(/[*_`]/g, "").trim()).filter((h) => !/^how we help/i.test(h)).slice(0, 3);
  } catch {
    /* guide without an .mdx body */
  }
  const covers = heads.length ? `This guide covers ${heads.map((h) => lowerFirst(h)).join(", ").replace(/, ([^,]+)$/, " and $1")}.` : "";
  return fitAnswer([g.description, covers, `It is written by our packaging team, drawing on ${f.yearsExperience}+ years of designing and printing boxes.`]);
}
