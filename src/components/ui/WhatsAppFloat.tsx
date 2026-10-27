import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/config/site";

/** Round WhatsApp button, bottom-right, clear of the iPhone home indicator. */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl("Hi, I'd like to ask about custom boxes.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="whatsapp-float fixed right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-success text-white shadow-md transition-transform hover:-translate-y-0.5 md:right-6"
    >
      <MessageCircle aria-hidden="true" className="h-6 w-6" />
    </a>
  );
}
