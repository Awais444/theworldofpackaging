import { site, siteUrl } from "@/config/site";

/** Structured data builders (schema.org JSON-LD). All identity comes from config/site.ts. */

type Thing = Record<string, unknown>;

export const abs = (path: string) => `${siteUrl()}${path.startsWith("/") ? path : `/${path}`}`;

const ORG_ID = () => abs("/#organization");

export function organization(): Thing {
  const sameAs = Object.values(site.socials).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID(),
    name: site.name,
    url: siteUrl(),
    email: site.email,
    description: site.description,
    foundingDate: String(site.facts.foundedYear),
    alternateName: site.history.originalName,
    address: { "@type": "PostalAddress", ...(site.address ? { streetAddress: site.address } : {}), addressCountry: site.country },
    contactPoint: [{ "@type": "ContactPoint", contactType: "sales", email: site.email, ...(site.phone ? { telephone: site.phone } : {}) }],
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function website(): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": abs("/#website"),
    name: site.name,
    url: siteUrl(),
    publisher: { "@id": ORG_ID() },
  };
}

export function breadcrumbList(items: { label: string; href?: string }[]): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: abs(c.href) } : {}),
    })),
  };
}

export function faqPage(faqs: { q: string; a: string }[]): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function service(s: { name: string; description: string; path: string; category: string; areaServed?: string | string[] | Record<string, string> }): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.description,
    serviceType: s.category,
    url: abs(s.path),
    provider: { "@id": ORG_ID() },
    areaServed: s.areaServed ?? site.markets,
  };
}

export function product(p: { name: string; description: string; path: string; category: string }): Thing {
  // No offers until real prices exist (see RATES in lib/pricing.ts).
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    category: p.category,
    url: abs(p.path),
    brand: { "@type": "Brand", name: site.name },
    manufacturer: { "@id": ORG_ID() },
  };
}

export function article(a: { title: string; description: string; path: string; date: string; modified?: string }): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    ...(a.modified ? { dateModified: a.modified } : {}),
    url: abs(a.path),
    author: { "@id": ORG_ID() },
    publisher: { "@id": ORG_ID() },
  };
}
