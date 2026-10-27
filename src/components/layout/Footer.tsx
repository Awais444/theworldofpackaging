import { Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import Link from "next/link";
import { site, whatsappUrl } from "@/config/site";
import { footerNav, legalNav } from "@/content/navigation";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { CookieSettingsLink } from "@/components/providers/ConsentAndAnalytics";
import { Logo } from "@/components/ui/Logo";

const socialLabels: Record<keyof typeof site.socials, string> = {
  instagram: "Instagram",
  linkedin: "LinkedIn",
  facebook: "Facebook",
  pinterest: "Pinterest",
  behance: "Behance",
};

export function Footer() {
  const year = new Date().getFullYear();
  const socials = (Object.keys(site.socials) as Array<keyof typeof site.socials>).filter((k) => site.socials[k]);
  return (
    <footer className="mt-auto bg-blue-900 text-white">
      <div className="container-x py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-4 max-w-xs text-white/80">{site.tagline}</p>
            {socials.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-4 text-sm">
                {socials.map((k) => (
                  <li key={k}>
                    <a href={site.socials[k]} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {socialLabels[k]}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            <NewsletterForm />
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h2 className="font-heading text-base font-bold">{group.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="text-sm text-white/80 hover:text-white hover:underline">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="lg:col-span-3">
            <h2 className="font-heading text-base font-bold">Contact</h2>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex gap-2 hover:text-white">
                  <MessageCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" /> WhatsApp {site.whatsapp}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex gap-2 break-all hover:text-white">
                  <Mail aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" /> {site.email}
                </a>
              </li>
              <li className="flex gap-2">
                <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" /> {site.address}
              </li>
              <li className="flex gap-2">
                <Clock aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" /> {site.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/15 pt-6 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}
          </p>
          <ul className="flex flex-wrap gap-6">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <CookieSettingsLink className="hover:text-white" />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
