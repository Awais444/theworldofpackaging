import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { site, whatsappUrl } from "@/config/site";
import { quoteHref } from "@/content/navigation";
import { InlineContact } from "@/components/forms/InlineContact";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Section } from "@/components/ui/Layout";

export const metadata: Metadata = {
  title: "Contact",
  description: `Email, WhatsApp, phone or the contact form. ${site.name} replies ${site.facts.quoteReply}.`,
  alternates: { canonical: "/contact" },
};

const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`;

function Row({ icon: Icon, label, children }: { icon: LucideIcon; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-4 rounded-2xl bg-white p-5">
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
        <Icon aria-hidden="true" className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <dt className="text-sm font-semibold text-ink-500">{label}</dt>
        <dd className="mt-1 flex flex-wrap items-center gap-3 text-lg font-medium">{children}</dd>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Contact" }]}
        eyebrow="Contact"
        title="Talk to the studio"
        highlight="studio"
        intro={<p>Send a message, WhatsApp us or email. We reply {site.facts.quoteReply}.</p>}
        actions={
          <>
            <Button href={whatsappUrl("Hi, I'd like to talk about packaging.")} size="lg" arrow>
              WhatsApp us
            </Button>
            <Button href={quoteHref} size="lg" variant="secondary">
              Get a Quote
            </Button>
          </>
        }
      />
      <Section className="!pt-0">
        <div className="grid gap-10 lg:grid-cols-12">
          <dl className="space-y-4 rounded-3xl bg-silver-100 p-4 md:p-6 lg:col-span-5">
            <Row icon={MessageCircle} label="WhatsApp">
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                {site.whatsapp}
              </a>
              <CopyButton value={site.whatsapp} label="WhatsApp number" />
            </Row>
            <Row icon={Mail} label="Email">
              <a href={`mailto:${site.email}`} className="break-all hover:text-blue-600">
                {site.email}
              </a>
              <CopyButton value={site.email} label="email address" />
            </Row>
            <Row icon={Phone} label="Phone">
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-blue-600">
                {site.phone}
              </a>
              <CopyButton value={site.phone} label="phone number" />
            </Row>
            <Row icon={MapPin} label="Studio + factory">
              <span>{site.address}</span>
              <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-blue-600 underline underline-offset-4">
                Open in Google Maps
              </a>
            </Row>
            <Row icon={Clock} label="Hours">
              {site.hours}
            </Row>
          </dl>
          <div className="rounded-3xl border border-silver-300 p-6 md:p-10 lg:col-span-7">
            <h2 className="text-h3">Send a message</h2>
            <p className="mt-2 text-ink-500">For a full design brief, use the project form instead.</p>
            <div className="mt-8">
              <InlineContact />
            </div>
            <div className="mt-8 flex flex-wrap gap-3 border-t border-silver-300 pt-6">
              <Button href="/start-a-project" variant="secondary">
                Full project brief
              </Button>
              <Button href={quoteHref} variant="ghost" arrow>
                Box quote
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
