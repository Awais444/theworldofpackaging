"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { GalleryItem } from "@/components/work/PortfolioGallery";
import { cn } from "@/lib/utils";

// The lightbox code loads only when a photo is clicked.
const Lightbox = dynamic(() => import("@/components/work/PortfolioGallery").then((m) => m.Lightbox), { ssr: false });

/** One marquee image: a case study (links to it) or a portfolio photo (opens the lightbox). */
export type MarqueeItem = {
  kind: "case" | "photo";
  id: string;
  href?: string;
  image: string;
  alt: string;
  title: string;
  tag: string;
  width: number;
  height: number;
};

/** Row height in px: 200 mobile, 280 from md. `sizes` asks for the width each image is actually drawn at. */
const sizesFor = (i: MarqueeItem) => {
  const ar = i.width / i.height;
  return `(min-width: 768px) ${Math.round(280 * ar)}px, ${Math.round(200 * ar)}px`;
};

function Tile({ item, copy, onOpen }: { item: MarqueeItem; copy: boolean; onOpen: (id: string) => void }) {
  const body = (
    <>
      <Image src={item.image} alt={copy ? "" : item.alt} width={item.width} height={item.height} sizes={sizesFor(item)} className="marquee-img h-full w-full object-cover" />
      <span className="marquee-cap pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900/75 to-transparent p-4 pt-12 text-left text-white">
        <span className="line-clamp-2 font-heading text-base font-semibold leading-snug">{item.title}</span>
        <span className="mt-1.5 inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold">{item.tag}</span>
      </span>
    </>
  );
  const cls = "marquee-tile group relative block h-[200px] shrink-0 overflow-hidden rounded-[20px] bg-silver-100 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-blue-600/40 md:h-[280px]";
  const style = { aspectRatio: `${item.width} / ${item.height}` };
  // The duplicate copy (for the seamless loop) is hidden from screen readers and the tab order.
  const a11y = copy ? { "aria-hidden": true as const, tabIndex: -1 } : {};
  return item.kind === "case" && item.href ? (
    <Link href={item.href} className={cls} style={style} {...a11y}>
      {body}
    </Link>
  ) : (
    <button type="button" onClick={() => onOpen(item.id)} className={cls} style={style} aria-label={copy ? undefined : `${item.title}: view larger`} {...a11y}>
      {body}
    </button>
  );
}

function Row({ items, direction, onOpen }: { items: MarqueeItem[]; direction: "left" | "right"; onOpen: (id: string) => void }) {
  return (
    <div className="marquee-row overflow-hidden" data-dir={direction}>
      <div className="marquee-track flex w-max gap-4">
        {[false, true].map((copy) => (
          <div key={String(copy)} className={cn("flex gap-4", copy && "marquee-copy")} aria-hidden={copy || undefined}>
            {items.map((i) => (
              <Tile key={i.id} item={i} copy={copy} onOpen={onOpen} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Two-row infinite marquee (CSS keyframes on transform only, see .marquee in globals.css). Row 1 runs left,
 * row 2 right. Rows pause on hover and focus; both pause off-screen and while the tab is hidden.
 * Reduced motion: no animation, rows scroll by hand with snap points.
 */
export function WorkMarquee({ rows, lightbox, quoteHref }: { rows: readonly [MarqueeItem[], MarqueeItem[]]; lightbox: GalleryItem[]; quoteHref: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let onScreen = false;
    const apply = () => (onScreen && document.visibilityState === "visible" ? el.removeAttribute("data-off") : el.setAttribute("data-off", ""));
    const io = new IntersectionObserver(([e]) => {
      onScreen = !!e?.isIntersecting;
      apply();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", apply);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", apply);
    };
  }, []);

  const onOpen = (id: string) => {
    const i = lightbox.findIndex((g) => g.id === id);
    if (i >= 0) setOpen(i);
  };

  return (
    // Starts paused (data-off) until the observer sees it, so nothing animates off-screen.
    <div ref={root} data-off="" className="marquee flex flex-col gap-4">
      <Row items={rows[0]} direction="left" onOpen={onOpen} />
      <Row items={rows[1]} direction="right" onOpen={onOpen} />
      {open !== null && <Lightbox items={lightbox} index={open} onIndex={setOpen} onClose={() => setOpen(null)} quoteHref={quoteHref} />}
    </div>
  );
}
