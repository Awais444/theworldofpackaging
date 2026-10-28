"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { site, whatsappMessage, whatsappUrl } from "@/config/site";

/** Round WhatsApp button, bottom-right. Hidden until a real number is set in config/site.ts. */
export function WhatsAppFloat() {
  const pathname = usePathname();
  const href = whatsappUrl(whatsappMessage());
  if (!href) return null;
  return (
    <a
      key={pathname}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      // Name the current page in the pre-filled message.
      onClick={(e) => {
        const page = document.title.split(" | ")[0];
        const url = whatsappUrl(page && page !== site.name ? whatsappMessage(page) : whatsappMessage());
        if (url) e.currentTarget.href = url;
      }}
      className="whatsapp-float fixed right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-success text-white shadow-md transition-transform hover:-translate-y-0.5 md:right-6"
    >
      <MessageCircle aria-hidden="true" className="h-6 w-6" />
    </a>
  );
}
