import type { ReactNode } from "react";
import { promises } from "@/config/site";
import { Container } from "./Layout";
import { WhatsAppButton } from "./WhatsAppButton";
import { withHighlight } from "./withHighlight";

/**
 * Vibrant Blue call-to-action panel (CLAUDE.md §4.4). The highlight word stays white
 * here (never orange text on blue); the swoosh carries the accent.
 * Every band shows the confirmed promises and a WhatsApp alternative naming the page topic.
 */
export function CTABand({
  title,
  highlight,
  text,
  actions,
  whatsapp,
}: {
  title: string;
  highlight?: string;
  text: string;
  /** Typically an accent button and a white button. */
  actions: ReactNode;
  /** Topic for the pre-filled WhatsApp message, e.g. "Magnetic Closure Boxes"; false hides it. */
  whatsapp?: string | false;
}) {
  return (
    <section className="section-y">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-blue-600 px-6 py-12 text-white md:px-14 md:py-16">
          <span aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-900/40" />
          <span aria-hidden="true" className="absolute -bottom-32 right-24 h-64 w-64 rounded-full bg-white/5" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-h2 on-dark">{withHighlight(title, highlight)}</h2>
              <p className="mt-4 text-lg text-white/85">{text}</p>
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-white">
                {promises().map((p) => (
                  <li key={p} className="inline-flex items-center gap-2">
                    <span aria-hidden="true" className="h-2 w-2 rounded-full bg-orange-500" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-3">
              {actions}
              {whatsapp !== false && <WhatsAppButton topic={whatsapp || undefined} variant="white" />}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
