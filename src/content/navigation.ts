import { industries } from "./industries";
import { printedStyles } from "./printedStyles";
import { rigidStyles } from "./rigidStyles";

export type NavLink = { label: string; href: string; description?: string };
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
    title: "More",
    links: [
      { label: "Materials", href: "/materials" },
      { label: "Finishes", href: "/finishes" },
      { label: "Inserts", href: "/inserts" },
      { label: "Samples", href: "/samples" },
      { label: "All Boxes", href: "/boxes" },
    ],
  },
];

export const boxesPromo = {
  title: "Collapsible rigid boxes ship flat",
  text: "Rigid when it arrives, flat when it travels.",
  href: "/collapsible-rigid-boxes",
};

export const servicesMenu: NavLink[] = [
  { label: "Brand Identity", href: "/services/brand-identity", description: "Logo, colour and type as one system" },
  { label: "Logo Design", href: "/services/logo-design", description: "A mark that works from box to favicon" },
  { label: "Packaging Design", href: "/services/packaging-design", description: "Structure and artwork, print-ready" },
  { label: "Label Design", href: "/services/label-design", description: "Labels for jars, bottles and tubes" },
  { label: "Structural & Dieline Design", href: "/services/structural-dieline-design", description: "Custom shapes and inserts" },
  { label: "3D Mockups & Renders", href: "/services/3d-mockups", description: "See the box before it is made" },
  { label: "Packages", href: "/packages", description: "Design bundles at a fixed scope" },
];

export const industriesMenu: NavLink[] = industries.map((i) => ({ label: i.name, href: `/industries/${i.slug}` }));

export type MainNavItem = { kind: "link"; label: string; href: string } | { kind: "menu"; label: string; id: "boxes" | "services" | "industries" };

export const mainNav: MainNavItem[] = [
  { kind: "menu", label: "Boxes", id: "boxes" },
  { kind: "menu", label: "Services", id: "services" },
  { kind: "menu", label: "Industries", id: "industries" },
  { kind: "link", label: "Work", href: "/work" },
  { kind: "link", label: "About", href: "/about" },
];

export const primaryCta: NavLink = { label: "Get a Quote", href: quoteHref };

export const footerNav: NavGroup[] = [
  {
    title: "Boxes",
    links: [
      { label: "All boxes", href: "/boxes" },
      { label: "Rigid boxes", href: "/rigid-boxes" },
      { label: "Collapsible rigid boxes", href: "/collapsible-rigid-boxes" },
      { label: "Printed boxes", href: "/printed-boxes" },
      { label: "Mailer boxes", href: "/printed-boxes/mailer" },
      { label: "Magnetic boxes", href: "/rigid-boxes/magnetic-closure" },
      { label: "Samples", href: "/samples" },
    ],
  },
  { title: "Services", links: servicesMenu.map(({ label, href }) => ({ label, href })) },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Factory", href: "/factory" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Work", href: "/work" },
      { label: "Shipping", href: "/shipping" },
      { label: "FAQ", href: "/faq" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Sitemap", href: "/sitemap/core.xml" },
];
