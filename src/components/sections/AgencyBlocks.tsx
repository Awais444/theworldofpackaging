import { CtaPanel } from "./CtaPanel";

export function priceFromLabel(price: number | null) {
  return price === null ? "Quoted per project" : `From $${price.toLocaleString("en-US")}`;
}

/** Closing call to action for agency pages: the shared one-button panel. */
export function ProjectCta({ title, body }: { title: string; body: string }) {
  return <CtaPanel title={title} body={body} />;
}
