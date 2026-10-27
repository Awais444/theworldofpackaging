export type ServiceSummary = {
  id: "branding" | "packaging" | "manufacturing";
  title: string;
  href: string;
  intro: string;
  items: string[];
  spec: string[];
};

export const serviceSummaries: ServiceSummary[] = [
  {
    id: "branding",
    title: "Branding",
    href: "/branding",
    intro: "Names, marks and identity systems that hold up on a 40 mm lid as well as on a website.",
    items: ["Strategy & naming", "Logo design", "Brand identity", "Brand guidelines", "Rebranding"],
    spec: ["Studio"],
  },
  {
    id: "packaging",
    title: "Packaging Design",
    href: "/packaging-design",
    intro: "Graphics and structure designed together, with dielines checked against the press they will run on.",
    items: ["Packaging design", "Rigid box design", "Label design", "Structural & dieline", "3D mockups"],
    spec: ["Studio", "Pre-press"],
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    href: "/rigid-boxes",
    intro: "Rigid and collapsible rigid boxes made in our own factory, plus printed boxes in every common style.",
    items: ["Rigid boxes", "Collapsible rigid boxes", "Printed boxes", "Inserts", "Foil, emboss, spot UV"],
    spec: ["Factory", "Ships worldwide"],
  },
];
