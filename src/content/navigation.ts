import { designHref, designServices } from "./designServices";
import { industries } from "./industries";
import { featuredCountries } from "./linking";
import { printedStyles } from "./printedStyles";
import { rigidStyles } from "./rigidStyles";

export type NavLink = { label: string; href: string; description?: string; /** ISO code: shows a flag (footer countries). */ iso2?: string };
export type NavGroup = { title: string; href?: string; links: NavLink[] };

/** Every quote CTA points here, so the route moves in one place . */
export const quoteHref = "/get-a-quote";

const rigidHref = (slug: string) => (slug === "collapsible" ? "/collapsible-rigid-boxes" : `/rigid-boxes/${slug}`);

const rigidLinks: NavLink[] = rigidStyles.map((s) => ({ label: s.name, href: rigidHref(s.slug) }));
const printedLinks: NavLink[] = printedStyles.filter((s) => s.slug !== "window").map((s) => ({ label: s.name, href: `/printed-boxes/${s.slug}` }));

export const boxesMenu: NavGroup[] = [
  { title: "Rigid boxes", href: "/rigid-boxes", links: rigidLinks },
  { title: "Printed boxes", href: "/printed-boxes", links: printedLinks },
  {
    title: "Materials & Finishes",
    links: [
      { label: "Materials", href: "/materials" },
      { label: "Finishes", href: "/finishes" },
      { label: "Inserts", href: "/inserts" },
      { label: "All Boxes", href: "/boxes" },
    ],
  },
];

export const boxesPromo = {
  title: "Collapsible rigid boxes ship flat",
  text: "Rigid when it arrives, flat when it travels.",
  href: "/collapsible-rigid-boxes",
};

/** Packaging Design mega menu: By Product, By Format, Branding, By Industry. */
const designLink = (slug: string): NavLink => {
  const d = designServices.find((x) => x.slug === slug)!;
  return { label: d.name.replace(/ Design$/, "").replace(/ Packaging$/, ""), href: designHref(slug) };
};

const menuIndustries = ["pharmaceutical", "cosmetics", "perfume", "jewelry", "supplements", "food-bakery", "chocolates", "candles", "apparel"];

export const designMenu: NavGroup[] = [
  {
    title: "By Product",
    href: "/packaging-design",
    links: [
      "cosmetic-packaging-design",
      "skincare-packaging-design",
      "perfume-fragrance-packaging-design",
      "food-packaging-design",
      "coffee-tea-packaging-design",
      "supplement-label-design",
      "pharmaceutical-packaging-design",
      "candle-packaging-design",
      "jewelry-packaging-design",
    ].map(designLink),
  },
  {
    title: "By Format",
    links: ["box-packaging-design", "label-design", "rigid-luxury-box-design", "pouch-packaging-design", "bottle-label-design", "shopping-bag-design"].map(designLink),
  },
  {
    title: "Branding",
    href: "/services",
    links: [
      { label: "Logo Design", href: "/services/logo-design" },
      { label: "Brand Identity", href: "/services/brand-identity" },
      // Guidelines are delivered as part of brand identity; there is no separate page.
      { label: "Brand Guidelines", href: "/services/brand-identity" },
      { label: "Packaging Redesign", href: designHref("packaging-redesign") },
    ],
  },
  {
    title: "By Industry",
    href: "/industries",
    links: [
      ...menuIndustries.map((slug) => ({ label: industries.find((i) => i.slug === slug)!.name, href: `/industries/${slug}` })),
      { label: "All industries", href: "/industries" },
    ],
  },
];

export const designMenuFooter: NavLink[] = [
  { label: "View all services", href: "/packaging-design" },
  { label: "See pricing", href: "/pricing" },
  { label: "Countries we serve", href: "/countries" },
  { label: "Get a free quote", href: quoteHref },
];

export const brandingMenu: NavLink[] = [
  { label: "Brand Identity", href: "/services/brand-identity", description: "Logo, colour and type as one system" },
  { label: "Logo Design", href: "/services/logo-design", description: "A mark that works from box to favicon" },
  { label: "Packaging Brand Strategy", href: designHref("packaging-brand-strategy"), description: "Positioning and on-pack messaging" },
  { label: "Packages", href: "/packages", description: "Brand and packaging bundles" },
];

export const industriesMenu: NavLink[] = industries.map((i) => ({ label: i.name, href: `/industries/${i.slug}` }));

export type MenuId = "design" | "boxes";
export type MainNavItem = { kind: "link"; label: string; href: string } | { kind: "menu"; label: string; id: MenuId; href: string };

export const mainNav: MainNavItem[] = [
  { kind: "menu", label: "Packaging Design", id: "design", href: "/packaging-design" },
  { kind: "menu", label: "Boxes", id: "boxes", href: "/boxes" },
  { kind: "link", label: "Work", href: "/work" },
  { kind: "link", label: "About", href: "/about" },
];

/** Mobile drawer: every hub gets its own group, including those not in the desktop top level. */
export type MobileItem = { label: string; href: string; groups?: Array<{ title?: string; links: NavLink[] }> };

export const mobileNav: MobileItem[] = [
  { label: "Packaging Design", href: "/packaging-design", groups: [...designMenu.filter((g) => g.title !== "Branding" && g.title !== "By Industry"), { links: [{ label: "View all services", href: "/packaging-design" }, { label: "See pricing", href: "/pricing" }] }] },
  { label: "Branding", href: "/services", groups: [{ links: [...brandingMenu.map(({ label, href }) => ({ label, href })), { label: "All branding services", href: "/services" }] }] },
  { label: "Industries", href: "/industries", groups: [{ links: [...industriesMenu, { label: "All industries", href: "/industries" }] }] },
  { label: "Boxes", href: "/boxes", groups: [...boxesMenu.map((g) => ({ title: g.title, links: g.links })), { links: [{ label: "All boxes", href: "/boxes" }] }] },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Countries", href: "/countries" },
];

export const primaryCta: NavLink = { label: "Get a Quote", href: quoteHref };

export const footerNav: NavGroup[] = [
  {
    title: "Packaging Design",
    links: [
      { label: "All design services", href: "/packaging-design" },
      ...["cosmetic-packaging-design", "food-packaging-design", "coffee-tea-packaging-design", "supplement-label-design", "label-design", "rigid-luxury-box-design"].map(designLink),
    ],
  },
  {
    title: "Branding",
    links: [
      ...brandingMenu.map(({ label, href }) => ({ label, href })),
      { label: "Packaging redesign", href: designHref("packaging-redesign") },
      { label: "All branding services", href: "/services" },
    ].slice(0, 6),
  },
  {
    title: "Boxes",
    links: [
      { label: "All boxes", href: "/boxes" },
      { label: "Rigid boxes", href: "/rigid-boxes" },
      { label: "Collapsible rigid boxes", href: "/collapsible-rigid-boxes" },
      { label: "Printed boxes", href: "/printed-boxes" },
      { label: "Mailer boxes", href: "/printed-boxes/mailer" },
      { label: "Magnetic boxes", href: "/rigid-boxes/magnetic-closure" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Work", href: "/work" },
      { label: "Factory", href: "/factory" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
      { label: "Shipping", href: "/shipping" },
      { label: "FAQ", href: "/faq" },
      { label: "Blog", href: "/blog" },
    ],
  },
];

/** Footer chip row: industries. */
export const footerIndustries: NavLink[] = [
  ...["cosmetics", "perfume", "jewelry", "supplements", "food-bakery", "chocolates", "candles"].map((slug) => ({ label: industries.find((i) => i.slug === slug)!.name, href: `/industries/${slug}` })),
];

/** Footer chip row: top countries with flags. */
export const footerCountries: NavLink[] = featuredCountries(10).map((c) => ({ label: c.name, href: `/countries/${c.slug}`, iso2: c.iso2 }));

export const legalNav: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Sitemap", href: "/sitemap.xml" },
];
