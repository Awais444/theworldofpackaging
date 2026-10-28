import { MessageCircle } from "lucide-react";
import { whatsappMessage, whatsappUrl } from "@/config/site";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "./Button";

type WhatsAppButtonProps = {
  /** What the visitor is asking about, e.g. "Magnetic Closure Boxes". Goes into the pre-filled message. */
  topic?: string;
  /** Full custom message; overrides `topic`. */
  message?: string;
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

/**
 * WhatsApp alternative to a primary CTA, with a pre-filled message naming the page.
 * Renders nothing until a real WhatsApp number is set in config/site.ts.
 */
export function WhatsAppButton({ topic, message, label = "WhatsApp us", variant = "secondary", size = "lg", className }: WhatsAppButtonProps) {
  const href = whatsappUrl(message ?? whatsappMessage(topic));
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={buttonClasses(variant, size, className)}>
      <MessageCircle aria-hidden="true" className="h-5 w-5" />
      {label}
    </a>
  );
}
