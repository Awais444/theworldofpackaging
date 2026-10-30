import Image from "next/image";
import { illustrations } from "@/components/illustrations";
import blurData from "@/content/blurData.json";
import { getMedia, type MediaSlotId } from "@/content/media";
import { cn } from "@/lib/utils";

export type MediaPanel = "silver" | "blue" | "white" | "none";

const panels: Record<MediaPanel, string> = {
  silver: "bg-silver-100",
  blue: "bg-blue-50",
  white: "bg-white",
  none: "",
};

type MediaProps = {
  slot: MediaSlotId;
  className?: string;
  /** next/image sizes hint. */
  sizes?: string;
  /** First visible image on the page: eager load with high fetch priority. */
  priority?: boolean;
  /** Panel colour behind an illustration (ignored once a photo is set). */
  panel?: MediaPanel;
  /** Use the 1200px card version of the photo. */
  card?: boolean;
};

/**
 * Media slot (CLAUDE.md §8): renders the photo when `src` is set in media.ts,
 * otherwise the slot's illustration in the same aspect box. Swapping a photo in
 * needs no code change.
 */
export function Media({ slot: slotId, className, sizes = "(min-width: 1024px) 50vw, 100vw", priority = false, panel = "silver", card = false }: MediaProps) {
  const slot = getMedia(slotId);
  const Illustration = illustrations[slot.illustration];
  const file = slot.src ? (card && slot.srcCard ? slot.srcCard : slot.src) : undefined;
  // Blurred preview generated at build time (scripts/gen-blur.mjs); silver-100 shows if one is missing.
  const blur = file ? (blurData as Record<string, string>)[file] : undefined;

  return (
    <figure className={cn("relative overflow-hidden rounded-3xl", slot.src ? (slot.fit === "contain" ? "bg-silver-50" : "bg-silver-100") : panels[panel], className)} style={{ aspectRatio: slot.aspect }}>
      {slot.src ? (
        <Image
          src={file!}
          alt={slot.alt}
          fill
          sizes={sizes}
          priority={priority}
          fetchPriority={priority ? "high" : undefined}
          placeholder={blur ? "blur" : "empty"}
          blurDataURL={blur}
          className={slot.fit === "contain" ? "object-contain p-[4%]" : "object-cover"}
          style={slot.position ? { objectPosition: slot.position } : undefined}
        />
      ) : (
        // Illustrations stand in for photos not taken yet: decorative, so screen readers skip them.
        <div aria-hidden="true" className="absolute inset-0 p-[6%]">
          {/* Soft background shapes keep illustration panels from looking empty. */}
          <span aria-hidden="true" className="absolute -right-[10%] -top-[15%] h-[55%] aspect-square rounded-full bg-white/50" />
          <span aria-hidden="true" className="absolute -bottom-[20%] -left-[8%] h-[45%] aspect-square rounded-full bg-white/40" />
          <Illustration className={cn("relative", slot.variant && `illo--${slot.variant}`)} />
        </div>
      )}
    </figure>
  );
}
