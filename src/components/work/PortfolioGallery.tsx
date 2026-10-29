"use client";

import { ChevronLeft, ChevronRight, MessageCircle, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { whatsappUrl } from "@/config/site";
import { cn } from "@/lib/utils";

/** Portfolio item as the gallery needs it (labels resolved on the server). */
export type GalleryItem = {
  id: string;
  title: string;
  alt: string;
  image: string;
  full: string;
  width: number;
  height: number;
  services: string[];
  industry: string | null;
  /** First service label, shown on hover. */
  serviceLabels: string[];
  industryLabel: string | null;
  serviceHref: string;
  serviceLinkLabel: string;
};

const PAGE = 24;

/** Masonry portfolio grid with "Load more" and an accessible lightbox. Parent resets it (key) when filters change. */
export function PortfolioGallery({ items, quoteHref }: { items: GalleryItem[]; quoteHref: string }) {
  const [shown, setShown] = useState(PAGE);
  const [open, setOpen] = useState<number | null>(null);
  const visible = items.slice(0, shown);

  if (items.length === 0) return null;
  return (
    <>
      <ul className="columns-2 gap-4 md:gap-6 lg:columns-3">
        {visible.map((item, i) => (
          <li key={item.id} className="mb-4 break-inside-avoid md:mb-6">
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Open ${item.title}`}
              className="group relative block w-full overflow-hidden rounded-2xl bg-silver-100 text-left focus-visible:outline-none focus-visible:shadow-[var(--ring)]"
            >
              <Image
                src={item.image}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(min-width: 1024px) 33vw, 50vw"
                loading="lazy"
                className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-1.5 bg-gradient-to-t from-ink-900/80 to-transparent p-4 pt-10 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="font-heading text-[15px] font-bold leading-snug">{item.title}</span>
                {item.serviceLabels[0] && <span className="w-fit rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold">{item.serviceLabels[0]}</span>}
              </span>
            </button>
          </li>
        ))}
      </ul>
      {shown < items.length && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setShown((n) => n + PAGE)}
            className="inline-flex h-12 items-center rounded-full border border-blue-600 px-6 font-semibold text-blue-600 transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:shadow-[var(--ring)]"
          >
            Load more
          </button>
        </div>
      )}
      {open !== null && <Lightbox items={visible} index={open} onIndex={setOpen} onClose={() => setOpen(null)} quoteHref={quoteHref} />}
    </>
  );
}

function Lightbox({ items, index, onIndex, onClose, quoteHref }: { items: GalleryItem[]; index: number; onIndex: (i: number) => void; onClose: () => void; quoteHref: string }) {
  const item = items[index]!;
  const dialog = useRef<HTMLDivElement>(null);
  const opener = useRef<Element | null>(null);
  const touchX = useRef<number | null>(null);
  const go = useCallback((d: number) => onIndex((index + d + items.length) % items.length), [index, items.length, onIndex]);

  // Remember what opened the dialog, lock page scroll, restore both on close.
  useEffect(() => {
    opener.current = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    return () => {
      document.body.style.overflow = overflow;
      (opener.current as HTMLElement | null)?.focus?.();
    };
  }, []);

  // Keys work wherever focus is while the dialog is open; Tab stays inside (visible controls only).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab") {
        const f = [...(dialog.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [])].filter((el) => el.offsetParent !== null);
        if (f.length === 0) return;
        const first = f[0]!;
        const last = f[f.length - 1]!;
        const inside = dialog.current?.contains(document.activeElement);
        if (e.shiftKey && (document.activeElement === first || !inside)) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && (document.activeElement === last || !inside)) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  const wa = whatsappUrl(`Hi, I'd like a quote for something similar to: ${item.title}`) ?? quoteHref;
  const nav = "flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:shadow-[var(--ring)]";

  return (
    <div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-[120] flex flex-col bg-ink-900/95 text-white"
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-6">
        <p className="text-sm text-white/70">
          {index + 1} / {items.length}
        </p>
        <button type="button" onClick={onClose} aria-label="Close" data-autofocus className={nav}>
          <X aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>
      <div
        className="relative min-h-0 flex-1 px-4 md:px-20"
        onClick={(e) => e.target === e.currentTarget && onClose()}
        onTouchStart={(e) => (touchX.current = e.touches[0]?.clientX ?? null)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        <Image key={item.id} src={item.full} alt={item.alt} fill sizes="100vw" className="object-contain" />
        <button type="button" onClick={() => go(-1)} aria-label="Previous image" className={cn(nav, "absolute left-4 top-1/2 hidden -translate-y-1/2 md:flex")}>
          <ChevronLeft aria-hidden="true" className="h-5 w-5" />
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Next image" className={cn(nav, "absolute right-4 top-1/2 hidden -translate-y-1/2 md:flex")}>
          <ChevronRight aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>
      <div className="flex flex-col gap-4 px-4 py-5 md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <h2 className="font-heading text-xl font-bold">{item.title}</h2>
          <ul className="mt-2 flex flex-wrap gap-2 text-xs font-semibold">
            {item.serviceLabels.map((s) => (
              <li key={s} className="rounded-full bg-white/15 px-2.5 py-1">
                {s}
              </li>
            ))}
            {item.industryLabel && <li className="rounded-full bg-orange-50 px-2.5 py-1 text-orange-text">{item.industryLabel}</li>}
          </ul>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={wa}
            {...(wa.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-orange-700 px-5 font-semibold text-white transition-colors hover:bg-orange-800 focus-visible:outline-none focus-visible:shadow-[var(--ring)]"
          >
            <MessageCircle aria-hidden="true" className="h-4 w-4" /> Get a quote for something similar
          </a>
          <Link href={item.serviceHref} className="font-semibold text-white underline-offset-4 hover:underline">
            {item.serviceLinkLabel} →
          </Link>
          <span className="flex gap-2 md:hidden">
            <button type="button" onClick={() => go(-1)} aria-label="Previous image" className={nav}>
              <ChevronLeft aria-hidden="true" className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next image" className={nav}>
              <ChevronRight aria-hidden="true" className="h-5 w-5" />
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
