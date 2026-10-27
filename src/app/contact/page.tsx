import type { Metadata } from "next";
import { site, whatsappUrl } from "@/config/site.config";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { InlineContact } from "@/components/forms/InlineContact";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { RevealText } from "@/components/ui/RevealText";
import { SpecLabel } from "@/components/ui/SpecLabel";

export const metadata: Metadata = {
  title: "Contact",
  description: `Email, WhatsApp or the contact form. ${site.name} replies within ${site.facts.quoteReplyHours} hours on working days.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="container-x pt-8 pb-24">
      <Breadcrumbs items={[{ label: "Contact" }]} />
      <div className="grid-editorial mt-12 gap-y-14">
        <div className="col-span-4 md:col-span-5">
          <SpecLabel items={["Contact", `Reply in ${site.facts.quoteReplyHours}h`]} as="p" />
          <RevealText as="h1" text="Talk to the studio." className="type-display mt-5 text-display-xl" />
          <dl className="mt-12 space-y-6 border-t border-line pt-8">
            <div>
              <dt className="spec text-muted">Email</dt>
              <dd className="mt-2 flex flex-wrap items-center gap-3 text-xl">
                <a href={`mailto:${site.email}`} className="hover:text-accent">
                  {site.email}
                </a>
                <CopyButton value={site.email} label="email address" />
              </dd>
            </div>
            <div>
              <dt className="spec text-muted">WhatsApp</dt>
              <dd className="mt-2 flex flex-wrap items-center gap-3 text-xl">
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                  {site.whatsapp}
                </a>
                <CopyButton value={site.whatsapp} label="WhatsApp number" />
              </dd>
            </div>
            <div>
              <dt className="spec text-muted">Studio + factory</dt>
              <dd className="mt-2 text-lg">{site.address}</dd>
            </div>
          </dl>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/start-a-project" variant="secondary">
              Full project brief
            </Button>
            <Button href="/quote" variant="link" arrow>
              Box quote
            </Button>
          </div>
        </div>
        <div className="col-span-4 md:col-span-6 md:col-start-7">
          <InlineContact />
        </div>
      </div>
    </section>
  );
}
