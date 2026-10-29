import { ArrowRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Flag } from "@/components/countries/Flag";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { CookieSettingsLink } from "@/components/providers/ConsentAndAnalytics";
import { Logo } from "@/components/ui/Logo";
import { site, whatsappUrl } from "@/config/site";
import { footerCountries, footerIndustries, footerNav, legalNav, quoteHref } from "@/content/navigation";
import { FooterGroup } from "./FooterGroup";

const link = "rounded-sm text-[15px] leading-9 text-white/[.72] underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:text-white focus-visible:outline-none focus-visible:shadow-[var(--ring)]";
const chip = "inline-flex h-8 items-center gap-2 rounded-full bg-white/10 px-3 text-[15px] text-white/[.85] transition-colors hover:bg-white/20 hover:text-white focus-visible:outline-none focus-visible:shadow-[var(--ring)]";
const btn = "inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-6 text-[15px] font-semibold transition-colors focus-visible:outline-none focus-visible:shadow-[var(--ring)] sm:w-auto";

/** Simple marks: lucide has no brand icons. Shown only when the URL is set in site.ts. */
const socialMarks: Record<keyof typeof site.socials, { label: string; mark: ReactNode }> = {
  instagram: {
    label: "Instagram",
    mark: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  linkedin: { label: "LinkedIn", mark: <span aria-hidden="true" className="text-[14px] font-bold">in</span> },
  facebook: { label: "Facebook", mark: <span aria-hidden="true" className="text-[15px] font-bold">f</span> },
  behance: { label: "Behance", mark: <span aria-hidden="true" className="text-[13px] font-bold">Bē</span> },
  pinterest: { label: "Pinterest", mark: <span aria-hidden="true" className="text-[14px] font-bold">P</span> },
};
const socialOrder: Array<keyof typeof site.socials> = ["instagram", "linkedin", "facebook", "behance", "pinterest"];

function ContactItem({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-start gap-2 py-1.5 text-[15px] leading-6 text-white/[.72]">
      <span className="mt-1 shrink-0 text-orange-500">{icon}</span>
      <span className="min-w-0 break-words">{children}</span>
    </li>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const socials = socialOrder.filter((k) => site.socials[k]);
  const wa = whatsappUrl();
  const icon = "h-4 w-4";

  return (
    <footer className="mt-auto bg-blue-900 text-white">
      <div className="container-x">
        {/* CTA strip */}
        <div className="flex min-w-0 flex-col gap-6 border-b border-white/15 py-10 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <h2 className="font-heading text-[24px] font-bold tracking-[-0.02em] md:text-[28px]">Ready to start your packaging?</h2>
            <p className="mt-2 text-white/[.72]">Free design check and a physical sample before production.</p>
          </div>
          <div className="flex w-full min-w-0 flex-col gap-3 sm:w-auto sm:flex-row">
            <Link href={quoteHref} className={`${btn} bg-orange-700 text-white hover:bg-orange-800`}>
              Get a Free Quote <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <a
              href={wa ?? "/contact"}
              {...(wa ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`${btn} border border-white text-white hover:bg-white hover:text-blue-900`}
            >
              <MessageCircle aria-hidden="true" className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid min-w-0 gap-8 py-12 [&>*]:min-w-0 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-4 max-w-xs text-[15px] text-white/[.72]">{site.tagline}</p>
            <NewsletterForm />
            {socials.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {socials.map((k) => (
                  <li key={k}>
                    <a
                      href={site.socials[k]}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={socialMarks[k].label}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-orange-700 focus-visible:outline-none focus-visible:shadow-[var(--ring)]"
                    >
                      {socialMarks[k].mark}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label="Footer" className="grid min-w-0 content-start [&>*]:min-w-0 gap-x-8 md:grid-cols-3 md:gap-y-8 lg:col-span-8 lg:grid-cols-5">
            {footerNav.map((group) => (
              <FooterGroup key={group.title} title={group.title}>
                <ul>
                  {group.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className={link}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </FooterGroup>
            ))}
            <FooterGroup title="Contact">
              <ul>
                {site.whatsapp && wa && (
                  <ContactItem icon={<MessageCircle aria-hidden="true" className={icon} />}>
                    <a href={wa} target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">
                      WhatsApp {site.whatsapp}
                    </a>
                  </ContactItem>
                )}
                <ContactItem icon={<Mail aria-hidden="true" className={icon} />}>
                  <a href={`mailto:${site.email}`} className="break-all hover:text-white hover:underline">
                    {site.email}
                  </a>
                </ContactItem>
                {site.phone && (
                  <ContactItem icon={<Phone aria-hidden="true" className={icon} />}>
                    <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-white hover:underline">
                      {site.phone}
                    </a>
                  </ContactItem>
                )}
                {site.address && <ContactItem icon={<MapPin aria-hidden="true" className={icon} />}>{site.address}</ContactItem>}
                {site.hours && <ContactItem icon={<Clock aria-hidden="true" className={icon} />}>{site.hours}</ContactItem>}
              </ul>
            </FooterGroup>
          </nav>
        </div>

        {/* Chip rows */}
        <div className="min-w-0 space-y-4 border-t border-white/15 py-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-[14px] font-bold">Industries:</span>
            {footerIndustries.map((l) => (
              <Link key={l.href} href={l.href} className={chip}>
                {l.label}
              </Link>
            ))}
            <Link href="/industries" className={`${chip} font-semibold`}>
              All industries <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-[14px] font-bold">Countries:</span>
            {footerCountries.map((l) => (
              <Link key={l.href} href={l.href} className={chip}>
                {l.iso2 && <Flag iso2={l.iso2} tone="dark" />}
                {l.label}
              </Link>
            ))}
            <Link href="/countries" className={`${chip} font-semibold`}>
              All 190+ countries <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
            </Link>
          </div>
          <p className="pt-2 text-[13px] text-white/60">MOQ {site.facts.rigidMoq} · Own factory · Free design support · Ships to 190+ countries</p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 border-t border-white/15 pb-[max(24px,env(safe-area-inset-bottom))] pt-6 text-[14px] text-white/[.72] md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white hover:underline underline-offset-4">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <CookieSettingsLink className="hover:text-white hover:underline underline-offset-4" />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
