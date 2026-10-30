import { site } from "@/config/site";
import { differences, productionSteps, qcChecklist, story } from "@/content/company";
import { designServices, designHref } from "@/content/designServices";
import { faqGroups } from "@/content/faqs";
import { industries } from "@/content/industries";
import { posts } from "@/content/blog/posts";
import { printedStyles } from "@/content/printedStyles";
import { processSteps } from "@/content/process";
import { rigidStyles } from "@/content/rigidStyles";
import { servicePages } from "@/content/servicePages";
import { companyFacts } from "@/lib/companyFacts";
import { abs } from "@/lib/schema";
import { printedHref, rigidHref } from "@/lib/boxView";

/** llms.txt and llms-full.txt (GEO), built from content files at build time. */

const TOP_DESIGN = [
  "cosmetic-packaging-design", "skincare-packaging-design", "food-packaging-design", "coffee-tea-packaging-design", "supplement-label-design",
  "pharmaceutical-packaging-design", "cbd-packaging-design", "candle-packaging-design", "chocolate-packaging-design", "box-packaging-design",
  "rigid-luxury-box-design", "label-design", "pouch-packaging-design", "luxury-packaging-design", "unboxing-packaging-design",
];
const TOP_BOXES = ["magnetic-closure", "lid-and-base", "drawer", "collapsible", "book-style", "shoulder-neck", "tube"];
const TOP_PRINTED = ["mailer", "tuck-end", "folding-carton"];
const KEY_GUIDES = ["what-is-a-dieline", "how-to-measure-box-size", "rigid-vs-folding-carton-boxes", "collapsible-rigid-boxes-explained", "packaging-design-cost", "pantone-vs-cmyk-packaging", "print-ready-packaging-files", "packaging-design-process"];

const summary = () =>
  `${site.name} (formerly ${site.history.originalName}) is a packaging design and branding studio with its own box factory in ${site.country}, with ${site.facts.yearsExperience}+ years in packaging. ` +
  `We design brands and packaging, make rigid and collapsible rigid boxes in-house from MOQ ${site.facts.rigidMoq}, print folding cartons, mailers, labels and pouches, and ship worldwide by air or sea to 190+ countries. ` +
  `Designs are approved as a digital proof and 3D mockup before print. Contact: ${site.email}${site.whatsapp ? `, WhatsApp ${site.whatsapp}` : ""}.`;

const line = (name: string, path: string, desc: string) => `- [${name}](${abs(path)}): ${desc}`;

export function llmsTxt(): string {
  const design = TOP_DESIGN.map((s) => designServices.find((d) => d.slug === s)).filter(Boolean);
  return [
    `# ${site.name}`,
    "",
    `> ${summary()}`,
    "",
    "## Company facts",
    ...companyFacts().map((f) => `- ${f.label}: ${f.value}`),
    "",
    "## Packaging design services",
    line("All packaging design services", "/packaging-design", "Hub of every packaging design service"),
    ...design.map((d) => line(d!.name, designHref(d!.slug), d!.short)),
    ...servicePages.map((s) => line(s.name, `/services/${s.path}`, s.summary)),
    "",
    "## Box styles we manufacture",
    line("All boxes", "/boxes", "Every rigid and printed box style"),
    ...rigidStyles.map((s) => line(s.name, rigidHref(s.slug), s.summary)),
    ...printedStyles.map((s) => line(s.name, printedHref(s.slug), s.summary)),
    line("Materials", "/materials", "Boards, papers and wraps"),
    line("Finishes", "/finishes", "Foil, embossing, spot UV, soft-touch and more"),
    line("Inserts", "/inserts", "EVA, card, pulp and fabric inserts"),
    "",
    "## Industries",
    ...industries.map((i) => line(`${i.name} packaging`, `/industries/${i.slug}`, i.intro)),
    "",
    "## Key guides",
    ...KEY_GUIDES.map((s) => posts.find((p) => p.slug === s)).filter(Boolean).map((p) => line(p!.title, `/blog/${p!.slug}`, p!.description)),
    line("Packaging glossary", "/glossary", "Definitions of packaging terms"),
    "",
    "## Company",
    line("About", "/about", "History from Anmol Printers to The World of Packaging, and company facts"),
    line("Factory", "/factory", "Production steps and quality control"),
    line("How it works", "/how-it-works", "Six steps from brief to delivery"),
    line("Shipping", "/shipping", "Air and sea freight, assembled or flat"),
    line("Countries", "/countries", "Packaging and shipping notes by country"),
    line("FAQ", "/faq", "Answers on ordering, design, production, shipping and payment"),
    line("Get a quote", "/get-a-quote", `Quote request; we reply ${site.facts.quoteReply}`),
    line("Contact", "/contact", "Email and WhatsApp"),
    "",
    "## Optional",
    line("Full text of core pages", "/llms-full.txt", "Plain-text version of the main pages"),
    "",
  ].join("\n");
}

export function llmsFullTxt(): string {
  const out: string[] = [`# ${site.name}: full text of core pages`, "", summary(), ""];
  const section = (title: string, path: string, body: string[]) => out.push(`## ${title}`, `URL: ${abs(path)}`, "", ...body, "");

  section("Company facts", "/about", companyFacts().map((f) => `- ${f.label}: ${f.value}`));
  section("About", "/about", [story.intro, story.body, `Mission: ${story.mission}`, "", "What makes us different:", ...differences.map((d) => `- ${d.title}: ${d.text}`)]);
  section("Factory", "/factory", ["Production steps:", ...productionSteps.map((s, i) => `${i + 1}. ${typeof s === "string" ? s : `${s.title}: ${s.body ?? ""}`}`), "", "Quality control:", ...qcChecklist.map((q) => `- ${q}`)]);
  section("How it works", "/how-it-works", processSteps.map((s, i) => `${i + 1}. ${s.title}: ${s.body} You: ${s.you} We: ${s.us}`));

  for (const slug of TOP_DESIGN) {
    const d = designServices.find((x) => x.slug === slug);
    if (!d) continue;
    section(d.name, designHref(d.slug), [d.h1, "", d.intro, "", `Formats: ${d.formats.join(", ")}.`, `Deliverables: ${d.deliverables.join(", ")}.`, "", ...d.faqs.slice(0, 5).map((f) => `Q: ${f.q}\nA: ${f.a}`)]);
  }
  for (const slug of TOP_BOXES) {
    const s = rigidStyles.find((x) => x.slug === slug);
    if (s) section(s.name, rigidHref(s.slug), [s.summary, s.description, `Minimum order: ${s.moq ?? "on quote"}.`]);
  }
  for (const slug of TOP_PRINTED) {
    const s = printedStyles.find((x) => x.slug === slug);
    if (s) section(s.name, printedHref(s.slug), [s.summary, s.description]);
  }
  section("FAQ", "/faq", faqGroups.flatMap((g) => [`### ${g.title}`, ...g.faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`), ""]));
  return out.join("\n");
}
