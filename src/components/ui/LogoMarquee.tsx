import { cn } from "@/lib/utils";

export type MarqueeLogo = { name: string; placeholder: boolean };

/**
 * Infinite logo strip (CSS animation, pauses on hover and under reduced motion).
 * Placeholder logos render as neutral wordmarks with a visible "Placeholder" label.
 */
export function LogoMarquee({ logos, title }: { logos: MarqueeLogo[]; title: string }) {
  const anyPlaceholder = logos.some((l) => l.placeholder);
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-12 pr-12" aria-hidden={hidden || undefined}>
      {logos.map((l) => (
        <li key={l.name} className="font-heading text-xl font-bold tracking-tight whitespace-nowrap text-ink-400">
          {l.name}
        </li>
      ))}
    </ul>
  );
  return (
    <div>
      <p className="text-center text-sm font-semibold text-ink-500">
        {title}
        {anyPlaceholder && <span className="ml-2 rounded-full bg-orange-50 px-2 py-0.5 text-xs text-orange-text">Placeholder logos</span>}
      </p>
      <div className="mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className={cn("marquee-track flex w-max hover:[animation-play-state:paused]")}>
          {row(false)}
          {row(true)}
        </div>
      </div>
    </div>
  );
}
