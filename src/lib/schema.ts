import type { Article, BreadcrumbList, CollectionPage, FAQPage, HowTo, Organization, Product, Service, WebSite, WithContext } from "schema-dts";
import { site, siteUrl } from "@/config/site";

/** Structured data builders (schema.org JSON-LD), typed with schema-dts. All identity comes from config/site.ts. */

export const abs = (path: string) => (/^https?:/.test(path) ? path : `${siteUrl()}${path.startsWith("/") ? path : `/${path}`}`);

const ORG_ID = () => abs("/#organization");
const org = () => ({ "@id": ORG_ID() }) as const;

export function organization(): WithContext<Organization> {
  const sameAs = Object.values(site.socials).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID(),
    name: site.name,
    alternateName: site.history.originalName,
    url: siteUrl(),
    logo: abs("/icon.svg"),
    email: site.email,
    description: site.description,
    foundingDate: String(site.facts.foundedYear),
    address: { "@type": "PostalAddress", ...(site.address ? { streetAddress: site.address } : {}), addressCountry: site.country },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: `+${site.whatsappLink}`,
        email: site.email,
        areaServed: "Worldwide",
        availableLanguage: ["English", "Urdu"],
      },
    ],
    ...(sameAs.length ? { sameAs } : {}),
  };
}

/** No SearchAction: the site has no search page. */
export function website(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": abs("/#website"),
    name: site.name,
    url: siteUrl(),
    inLanguage: "en",
    publisher: org(),
  };
}

export function breadcrumbList(items: { label: string; href?: string }[]): WithContext<BreadcrumbList> {
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

export function faqPage(faqs: { q: string; a: string }[]): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

/** Service. areaServed defaults to Worldwide; country pages pass their country. No offers until real prices exist. */
export function service(s: { name: string; description: string; path: string; category: string; areaServed?: string | string[] | Record<string, string> }): WithContext<Service> {
  const area = s.areaServed ?? "Worldwide";
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.description,
    serviceType: s.category,
    url: abs(s.path),
    provider: org(),
    areaServed: typeof area === "string" ? { "@type": "Place", name: area } : Array.isArray(area) ? area.map((name) => ({ "@type": "Place" as const, name })) : (area as never),
  };
}

/** Box style. additionalProperty from the visible spec table; no offers or ratings until real data exists. */
export function product(p: { name: string; description: string; path: string; category: string; image?: string; caption?: string; properties?: Array<{ label: string; value: string }> }): WithContext<Product> {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    category: p.category,
    url: abs(p.path),
    brand: { "@type": "Brand", name: site.name },
    manufacturer: org(),
    ...(p.image ? { image: { "@type": "ImageObject", contentUrl: abs(p.image), caption: p.caption ?? p.name } } : {}),
    ...(p.properties?.length ? { additionalProperty: p.properties.map((x) => ({ "@type": "PropertyValue" as const, name: x.label, value: x.value })) } : {}),
  };
}

export function article(a: { title: string; description: string; path: string; date: string; modified?: string; image?: string }): WithContext<Article> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    dateModified: a.modified ?? a.date,
    url: abs(a.path),
    mainEntityOfPage: abs(a.path),
    author: org(),
    publisher: org(),
    ...(a.image ? { image: abs(a.image) } : {}),
  };
}

/** HowTo. Steps must be the same text as the visible steps on the page. */
export function howTo(h: { name: string; description: string; path: string; steps: Array<{ name: string; text: string }> }): WithContext<HowTo> {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: h.name,
    description: h.description,
    url: abs(h.path),
    step: h.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.name, text: s.text })),
  };
}

/** Hub page: CollectionPage with an ItemList of its child pages. */
export function collectionPage(c: { name: string; description: string; path: string; items: Array<{ name: string; path: string }> }): WithContext<CollectionPage> {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: c.name,
    description: c.description,
    url: abs(c.path),
    isPartOf: { "@id": abs("/#website") },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: c.items.length,
      itemListElement: c.items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: abs(it.path) })),
    },
  };
}

/** Glossary: DefinedTermSet with one DefinedTerm per entry (anchor URLs). */
export function definedTermSet(d: { name: string; path: string; terms: Array<{ term: string; id: string; definition: string }> }): WithContext<import("schema-dts").DefinedTermSet> {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: d.name,
    url: abs(d.path),
    hasDefinedTerm: d.terms.map((t) => ({ "@type": "DefinedTerm", name: t.term, description: t.definition, url: abs(`${d.path}#${t.id}`), inDefinedTermSet: abs(d.path) })),
  };
}
