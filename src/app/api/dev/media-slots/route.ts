import { media, type MediaSlot } from "@/content/media";

// Development helper: renders the shot list from media.ts as Markdown.
// Regenerate MEDIA_SLOTS.md with the dev server running:
//   curl http://localhost:3000/api/dev/media-slots > MEDIA_SLOTS.md
export const dynamic = "force-dynamic";

const GROUPS: Array<[string, (id: string) => boolean]> = [
  ["Homepage", (id) => id.startsWith("home-")],
  ["Rigid box pages", (id) => id.startsWith("rigid-") || id.startsWith("collapsible")],
  ["Printed box pages", (id) => id.startsWith("printed-")],
  ["Service pages", (id) => id.startsWith("service-")],
  ["Industry pages", (id) => id.startsWith("industry-")],
  ["Case studies", (id) => id.startsWith("case-")],
  ["Factory and about", (id) => id.startsWith("factory-")],
  ["Other", () => true],
];

export function GET() {
  if (process.env.NODE_ENV === "production") return new Response("Not found", { status: 404 });

  const slots = Object.values(media);
  const esc = (s: string) => s.replace(/\|/g, "\\|");
  const grouped = new Map<string, MediaSlot[]>();
  for (const s of slots) {
    const name = GROUPS.find(([, test]) => test(s.id))![0];
    grouped.set(name, [...(grouped.get(name) ?? []), s]);
  }

  const lines = [
    "# Media slots (shot list)",
    "",
    `Generated from \`src/content/media.ts\`. Every image on the site is one of these ${slots.length} slots. Until a photo exists, each slot shows a brand illustration in the same aspect ratio.`,
    "",
    "## How to add a real photo",
    "",
    "1. Shoot to the size below (heroes at least 2000 px wide) and export as WebP.",
    "2. Save it as `/public/images/<section>/<slot-id>.webp`.",
    "3. Set `src` on the slot in `src/content/media.ts` (fixed slots) or add it to the `photos` map in the same file (generated style, case, industry, service and factory slots).",
    "",
    'Nothing else changes: `<Media slot="…" />` switches from the illustration to the photo, and the alt text below is used.',
    "",
    "General direction: Pale Silver (#E7EAEC) or white backgrounds, soft daylight, real products in the boxes, no props that hide the box.",
    "",
  ];
  for (const [name] of GROUPS) {
    const list = grouped.get(name);
    if (!list) continue;
    lines.push(`## ${name}`, "", "| Slot id | Page | Aspect | Size (px) | Now | Shot description | Alt text |", "| --- | --- | --- | --- | --- | --- | --- |");
    for (const s of list.sort((a, b) => a.id.localeCompare(b.id))) {
      lines.push(`| \`${s.id}\` | ${esc(s.page)} | ${s.aspect} | ${esc(s.size)} | ${s.src ? "Photo" : "Illustration"} | ${esc(s.shot)} | ${esc(s.alt)} |`);
    }
    lines.push("");
  }

  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
