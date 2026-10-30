import type { Metadata } from "next";
import { metaDescription, ogFor } from "@/lib/seo";
import { Clock, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { promises, site, whatsappUrl } from "@/config/site";
import { quoteHref } from "@/content/navigation";
import { InlineContact } from "@/components/forms/InlineContact";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Section } from "@/components/ui/Layout";

export const metadata: Metadata = {
  title: "Contact",
  description: metaDescription(`Email us or use the contact form. ${site.name} replies ${site.facts.quoteReply}.`),
  alternates: { canonical: "/contact" }, openGraph: ogFor("/contact"),
};

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
  const wa = whatsappUrl();
  return (
    <>
      <PageHero
        crumbs={[{ label: "Contact" }]}
        whatsapp="packaging design"
        eyebrow="Contact"
        title="Talk to the studio"
        highlight="studio"
        intro={<p>Send a message or email us. We reply {site.facts.quoteReply}.</p>}
        actions={
          <>
            <Button href={quoteHref} size="lg" arrow>
              Get a Free Quote
            </Button>
          </>
        }
      />
      <Section className="!pt-0">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-5">
            {/* Only real, configured details are shown (see config/site.ts). */}
            <dl className="space-y-4 rounded-3xl bg-silver-100 p-4 md:p-6">
              {site.whatsapp && wa && (
                <Row icon={MessageCircle} label="WhatsApp">
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="select-all hover:text-blue-600">
                    {site.whatsapp}
                  </a>
                  <CopyButton value={site.whatsapp} label="WhatsApp number" />
                </Row>
              )}
              <Row icon={Mail} label="Email">
                <a href={`mailto:${site.email}`} className="break-all hover:text-blue-600">
                  {site.email}
                </a>
                <CopyButton value={site.email} label="email address" />
              </Row>
              {site.phone && (
                <Row icon={Phone} label="Phone">
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-blue-600">
                    {site.phone}
                  </a>
                  <CopyButton value={site.phone} label="phone number" />
                </Row>
              )}
              {site.address && (
                <Row icon={MapPin} label="Studio + factory">
                  <span>{site.address}</span>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-blue-600 underline underline-offset-4"
                  >
                    Open in Google Maps
                  </a>
                </Row>
              )}
              {site.hours && (
                <Row icon={Clock} label="Hours">
                  {site.hours}
                </Row>
              )}
            </dl>
            <ul className="space-y-2 rounded-3xl bg-blue-50 p-6 text-sm font-medium">
              {promises().map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-orange-500" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
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
