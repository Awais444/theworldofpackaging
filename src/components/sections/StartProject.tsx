import { site } from "@/config/site.config";
import { InlineContact } from "@/components/forms/InlineContact";
import { Button } from "@/components/ui/Button";
import { ColorBar } from "@/components/ui/ColorBar";
import { CopyButton } from "@/components/ui/CopyButton";
import { RevealText } from "@/components/ui/RevealText";
import { SpecLabel } from "@/components/ui/SpecLabel";

export function StartProject() {
  return (
    <section className="container-x py-24 md:py-32" id="start">
      <ColorBar className="mb-16" label="Start a project" />
      <div className="grid-editorial gap-y-14">
        <div className="col-span-4 md:col-span-5">
          <SpecLabel items={["New project", `Reply within ${site.facts.quoteReplyHours}h`]} as="p" className="mb-5" />
          <RevealText text="Tell us what you're making." className="type-display text-display-lg" />
          <p className="measure mt-6 text-lg text-muted">
            Four fields to start. For a full brief with quantities, timeline and files, use the longer form.
          </p>
          <Button href="/start-a-project" variant="link" arrow className="mt-6">
            Full project brief
          </Button>
          <dl className="mt-12 space-y-3 border-t border-line pt-6">
            <div className="flex flex-wrap items-center gap-3">
              <dt className="spec w-20 text-muted">Email</dt>
              <dd className="flex items-center gap-3">
                <a href={`mailto:${site.email}`} className="hover:text-accent">
                  {site.email}
                </a>
                <CopyButton value={site.email} label="email address" />
              </dd>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <dt className="spec w-20 text-muted">WhatsApp</dt>
              <dd className="flex items-center gap-3">
                <span>{site.whatsapp}</span>
                <CopyButton value={site.whatsapp} label="WhatsApp number" />
              </dd>
            </div>
          </dl>
        </div>
        <div className="relative col-span-4 md:col-span-6 md:col-start-7">
          <InlineContact />
        </div>
      </div>
    </section>
  );
}
