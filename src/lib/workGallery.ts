import type { GalleryItem } from "@/components/work/PortfolioGallery";
import { designHref, getDesignService } from "@/content/designServices";
import { industries } from "@/content/industries";
import { portfolio } from "@/content/portfolio";
import { getWorkService } from "@/content/workServices";

// Case studies call this industry "Food & drink"; use the same label so one filter covers both sections.
const INDUSTRY_LABEL: Record<string, string> = { "food-bakery": "Food & drink" };

/** Portfolio items with labels and links resolved here, so the client gets plain data. */
export const galleryItems: GalleryItem[] = portfolio.map((p) => {
  const design = p.servicePage ? getDesignService(p.servicePage) : undefined;
  const first = getWorkService(p.services[0] ?? "");
  return {
    id: p.id,
    title: p.title,
    alt: p.alt,
    image: p.image,
    full: p.full,
    width: p.width,
    height: p.height,
    services: p.services,
    industry: p.industry,
    serviceLabels: p.services.flatMap((id) => { const w = getWorkService(id); return w ? [w.label as string] : []; }),
    industryLabel: p.industry ? (INDUSTRY_LABEL[p.industry] ?? industries.find((i) => i.slug === p.industry)?.name ?? null) : null,
    serviceHref: design ? designHref(design.slug) : (first?.href ?? "/packaging-design"),
    serviceLinkLabel: design ? `See ${design.name}` : first ? `See ${first.label}` : "See our design services",
  };
});
