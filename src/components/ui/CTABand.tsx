import { site } from "@/config/site";
import { Button } from "./Button";
import { Container } from "./Layout";
import { WhatsAppButton } from "./WhatsAppButton";
import { withHighlight } from "./withHighlight";

const bandPromises = [`Quote reply ${site.facts.quoteReply}`, `First concepts in ${site.facts.firstConceptHours} hours`, "Digital proof before print"];

/**
 * Vibrant Blue call-to-action panel (CLAUDE.md §4.4), the same on every page: heading, lead and promise row
 * on the left; one orange primary button and a white WhatsApp button as a pair on the right. The highlight
 * word stays white (never orange text on blue); the swoosh carries the accent.
 */
export function CTABand({
  title,
  highlight,
  text,
  primary,
  whatsapp,
}: {
  title: string;
  highlight?: string;
  text: string;
  /** The page's main next step, e.g. { href: quoteHref, label: "Get a Quote" }. */
  primary: { href: string; label: string };
  /** Topic for the pre-filled WhatsApp message, e.g. "Magnetic Closure Boxes". */
  whatsapp?: string;
}) {
  return (
    <section className="section-y">
      <Container>
        {/* One soft Klein Blue glow, top right, kept well inside the rounded corners. */}
        <div className="rounded-3xl bg-blue-600 bg-[radial-gradient(60%_90%_at_88%_0%,color-mix(in_srgb,var(--blue-900)_55%,var(--blue-600))_0%,var(--blue-600)_70%)] px-6 py-10 text-white md:px-[72px] md:py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="min-w-0">
              <h2 className="text-h2 on-dark">{withHighlight(title, highlight)}</h2>
              <p className="mt-4 max-w-[46ch] text-lg text-white/85">{text}</p>
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-white">
                {bandPromises.map((p) => (
                  <li key={p} className="inline-flex items-center gap-2">
                    <span aria-hidden="true" className="h-2 w-2 rounded-full bg-orange-500" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Button href={primary.href} variant="orange" size="band" arrow className="w-full sm:w-auto">
                {primary.label}
              </Button>
              <WhatsAppButton topic={whatsapp} variant="white" size="band" label="WhatsApp us" className="w-full sm:w-auto" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
