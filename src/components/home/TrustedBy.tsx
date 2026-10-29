import Image from "next/image";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * "Trusted by" row of real clients (site.clients). A logo shows only once logoApproved is true and a
 * logo file is set; otherwise the client name is shown as text. Hidden with fewer than 2 clients.
 */
export function TrustedBy({ className }: { className?: string }) {
  const clients = site.clients;
  if (clients.length < 2) return null;
  return (
    <section aria-label="Clients" className={cn("border-y border-silver-300/60 bg-white py-8", className)}>
      <div className="container-x flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-10">
        <p className="text-eyebrow text-blue-600">Trusted by</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {clients.map((c) => (
            <li key={c.name}>
              {c.logoApproved && c.logo ? (
                <Image src={c.logo} alt={c.name} width={160} height={40} className="h-8 w-auto opacity-80" />
              ) : (
                <span className="font-heading text-[18px] font-semibold text-ink-500">{c.name}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
