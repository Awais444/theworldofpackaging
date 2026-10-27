import { media } from "@/content/media";

// Development helper: renders the shot list from media.ts as Markdown.
// Regenerate MEDIA_SLOTS.md with the dev server running:
//   curl http://localhost:3000/api/dev/media-slots > MEDIA_SLOTS.md
export const dynamic = "force-dynamic";

export function GET() {
  if (process.env.NODE_ENV === "production") return new Response("Not found", { status: 404 });

  const slots = Object.values(media).sort((a, b) => a.page.localeCompare(b.page) || a.id.localeCompare(b.id));
  const esc = (s: string) => s.replace(/\|/g, "\\|");
  const rows = slots.map(
    (s) => `| \`${s.id}\` | ${esc(s.page)} | ${s.size} | ${s.aspect} | ${s.src ? "Photo" : "Illustration"} | ${esc(s.shot)} |`,
  );

  const md = [
    "# Media slots (shot list)",
    "",
    "Generated from `src/content/media.ts`. Every image on the site is one of these slots.",
    "",
    "**To add a real photo:** export it as WebP at the size below, save it to `/public/images/<section>/<slot-id>.webp`,",
    "then set `src` on the slot in `media.ts` (fixed slots) or add it to the `photos` map there (generated style/factory/industry slots).",
    "The illustration is replaced automatically; alt text stays in `media.ts`.",
    "",
    `${slots.length} slots.`,
    "",
    "| Slot id | Page | Size (px) | Aspect | Now | What to shoot |",
    "| --- | --- | --- | --- | --- | --- |",
    ...rows,
    "",
  ].join("\n");

  return new Response(md, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
