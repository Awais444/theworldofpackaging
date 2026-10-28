import { SITEMAP_IDS, sitemapSection } from "@/content/sitemapSections";

// Section sitemaps at /sitemap/<id>.xml (listed in the /sitemap.xml index).
export const dynamicParams = false;

export function generateStaticParams() {
  return SITEMAP_IDS.map((id) => ({ id: `${id}.xml` }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const entries = sitemapSection((await params).id.replace(/\.xml$/, ""));
  if (!entries) return new Response("Not found", { status: 404 });
  const urls = entries
    .map((e) => `  <url><loc>${e.url}</loc>${e.lastModified ? `<lastmod>${new Date(e.lastModified).toISOString()}</lastmod>` : ""}<changefreq>${e.changeFrequency}</changefreq><priority>${e.priority}</priority></url>`)
    .join("\n");
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
