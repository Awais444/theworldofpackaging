import { SITEMAP_IDS, imageSitemap, sitemapSection } from "@/content/sitemapSections";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Section sitemaps at /sitemap/<id>.xml (listed in the /sitemap.xml index).
export const dynamicParams = false;

export function generateStaticParams() {
  return [...SITEMAP_IDS, "images"].map((id) => ({ id: `${id}.xml` }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id.replace(/\.xml$/, "");
  if (id === "images") {
    const pages = imageSitemap()
      .map((p) => `  <url><loc>${p.page}</loc>${p.images.map((i) => `<image:image><image:loc>${esc(i.loc)}</image:loc><image:title>${esc(i.title)}</image:title></image:image>`).join("")}</url>`)
      .join("\n");
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${pages}\n</urlset>\n`;
    return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
  }
  const entries = sitemapSection(id);
  if (!entries) return new Response("Not found", { status: 404 });
  const urls = entries
    .map((e) => `  <url><loc>${e.url}</loc>${e.lastModified ? `<lastmod>${new Date(e.lastModified).toISOString()}</lastmod>` : ""}<changefreq>${e.changeFrequency}</changefreq><priority>${e.priority}</priority></url>`)
    .join("\n");
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
