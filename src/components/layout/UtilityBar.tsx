import { Mail, MessageCircle } from "lucide-react";
import { site, whatsappUrl } from "@/config/site";

/** Klein Blue strip above the header: key promises left, contact right (desktop). */
export function UtilityBar() {
  return (
    <div className="h-[var(--utility-h)] bg-blue-900 text-[13px] text-white">
      <div className="container-x flex h-full items-center justify-between gap-6">
        <p className="truncate">
          MOQ {site.facts.rigidMoq} · Free design support · Ships worldwide
        </p>
        <ul className="hidden items-center gap-6 md:flex">
          <li>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:underline">
              <MessageCircle aria-hidden="true" className="h-3.5 w-3.5" /> WhatsApp {site.whatsapp}
            </a>
          </li>
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
