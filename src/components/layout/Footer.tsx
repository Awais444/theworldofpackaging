import Link from "next/link";
import { site } from "@/config/site.config";
import { footerNav, legalNav, primaryCta } from "@/content/navigation";
import { CookieSettingsLink } from "@/components/providers/ConsentAndAnalytics";
import { Button } from "@/components/ui/Button";
import { ColorBar } from "@/components/ui/ColorBar";
import { CopyButton } from "@/components/ui/CopyButton";
import { SpecLabel } from "@/components/ui/SpecLabel";

const socialLabels: Record<keyof typeof site.socials, string> = {
  instagram: "Instagram",
  linkedin: "LinkedIn",
  behance: "Behance",
  pinterest: "Pinterest",
};

export function Footer() {
  const socials = (Object.keys(site.socials) as Array<keyof typeof site.socials>).filter((k) => site.socials[k]);
  const year = new Date().getFullYear();

  return (
    <footer className="tone-ink relative mt-auto">
      <div className="container-x pt-20 pb-10 md:pt-28">
        <div className="grid-editorial gap-y-12">
          <div className="col-span-4 md:col-span-7">
            <SpecLabel items={["Studio", "Factory", "Worldwide shipping"]} as="p" className="mb-5" />
            <p className="type-display text-display-lg">
              Designed here.
              <br />
              Made here.
            </p>
            <p className="measure mt-6 text-muted">
              Brand identity, packaging design and rigid box manufacturing under one roof. We ship to{" "}
              {site.markets.slice(0, -1).join(", ")} and the {site.markets.at(-1)} by air and sea.
            </p>
            <Button href={primaryCta.href} size="lg" arrow className="mt-8">
              {primaryCta.label}
            </Button>
          </div>

          <div className="col-span-4 md:col-span-4 md:col-start-9">
            <h2 className="spec mb-4 text-muted">Contact</h2>
            <dl className="space-y-4 text-base">
              <div>
                <dt className="sr-only">Email</dt>
                <dd className="flex flex-wrap items-center gap-3">
                  <a href={`mailto:${site.email}`} className="hover:text-accent">
                    {site.email}
                  </a>
                  <CopyButton value={site.email} label="email address" />
                </dd>
              </div>
              <div>
                <dt className="sr-only">WhatsApp</dt>
                <dd className="flex flex-wrap items-center gap-3">
                  <span>WhatsApp {site.whatsapp}</span>
                  <CopyButton value={site.whatsapp} label="WhatsApp number" />
                </dd>
              </div>
              <div>
                <dt className="sr-only">Address</dt>
                <dd className="text-muted">{site.address}</dd>
              </div>
            </dl>
          </div>
        </div>

        <nav aria-label="Footer" className="mt-20 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-line pt-10 md:grid-cols-4">
          {footerNav.map((group) => (
            <div key={group.title}>
              <h2 className="spec mb-4 text-muted">{group.title}</h2>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-accent">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {socials.length > 0 && (
            <div>
              <h2 className="spec mb-4 text-muted">Follow</h2>
              <ul className="space-y-2">
                {socials.map((key) => (
                  <li key={key}>
                    <a href={site.socials[key]} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                      {socialLabels[key]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>

        <p
          aria-hidden="true"
          className="type-display mt-20 overflow-hidden text-[clamp(2.5rem,9vw,10rem)] leading-[0.8] tracking-[-0.02em] whitespace-nowrap"
        >
          {site.name}
        </p>

        <ColorBar className="mt-8" label={`Rigid MOQ ${site.facts.rigidMoq}`} />

        <div className="mt-6 flex flex-col gap-3 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            {legalNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-fg">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <CookieSettingsLink className="hover:text-fg" />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
