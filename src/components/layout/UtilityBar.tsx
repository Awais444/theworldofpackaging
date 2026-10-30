import { Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import { site, whatsappUrl } from "@/config/site";
import { CopyButton } from "@/components/ui/CopyButton";

/** Klein Blue strip above the header: key promises left, contact right (desktop). */
export function UtilityBar() {
  return (
    <div className="h-[var(--utility-h)] bg-blue-900 text-[13px] text-white">
      <div className="container-x flex h-full items-center justify-between gap-6">
        <p className="truncate">
          {site.facts.yearsExperience}+ years in packaging · MOQ {site.facts.rigidMoq} ·{" "}
          <Link href="/countries" className="underline-offset-2 hover:underline">
            Ships to 190+ countries
          </Link>
        </p>
        <ul className="hidden items-center gap-6 md:flex">
          {site.whatsapp && (
            <li className="inline-flex items-center">
              <a href={whatsappUrl() ?? undefined} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:underline">
                <MessageCircle aria-hidden="true" className="h-3.5 w-3.5" /> WhatsApp <span className="select-all">{site.whatsapp}</span>
              </a>
              <CopyButton value={site.whatsapp} label="WhatsApp number" className="ml-2 h-6 border-white/30 text-white/80 hover:border-white hover:text-white" />
            </li>
          )}
          <li>
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-1.5 hover:underline">
              <Mail aria-hidden="true" className="h-3.5 w-3.5" /> {site.email}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
