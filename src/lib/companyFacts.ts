import { site } from "@/config/site";

/**
 * Company facts (GEO): one list, from site.ts only, used on /about, in llms.txt and llms-full.txt,
 * so assistants see the same wording everywhere.
 */
export function companyFacts(): Array<{ label: string; value: string }> {
  const f = site.facts;
  return [
    { label: "Name", value: site.name },
    { label: "Formerly", value: site.history.originalName },
    { label: "Founded", value: String(f.foundedYear) },
    { label: "Experience", value: `${f.yearsExperience}+ years in packaging` },
    { label: "Based in", value: site.country },
    { label: "What we do", value: "Packaging design, branding and box manufacturing under one roof" },
    { label: "Factory", value: "Our own factory: rigid boxes made and printed in-house, plus printed boxes" },
    { label: "Box types", value: "Rigid, collapsible rigid (ships flat) and printed boxes, labels and pouches" },
    { label: "Minimum order", value: `${f.rigidMoq} units for rigid and collapsible rigid boxes` },
    { label: "Approval", value: "Digital proof and 3D mockup before print; we do not make physical samples" },
    { label: "Shipping", value: "Worldwide by air or sea, to 190+ countries" },
    { label: "Quote reply", value: f.quoteReply },
    { label: "Contact", value: [site.email, site.whatsapp ? `WhatsApp ${site.whatsapp}` : null].filter(Boolean).join(" · ") },
  ];
}
