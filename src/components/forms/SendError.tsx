import { site } from "@/config/site";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

/** Shown when a form could not be delivered: the visitor can still reach us on WhatsApp or by email. */
export function SendError({ message, topic = "my request" }: { message?: string; topic?: string }) {
  return (
    <div role="alert" className="mt-4 rounded-2xl border border-error/30 bg-white p-4">
      <p className="text-sm font-medium text-error">{message || "That did not go through."}</p>
      <p className="mt-1 text-sm text-ink-500">Please send it on WhatsApp instead, or email {site.email}.</p>
      <WhatsAppButton message={`Hi, I tried to send ${topic} on your website but it didn't go through.`} label="Send on WhatsApp" variant="primary" size="md" className="mt-3" />
    </div>
  );
}
