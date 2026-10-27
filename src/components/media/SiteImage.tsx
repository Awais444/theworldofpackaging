import Image from "next/image";
import { illustrations } from "@/components/illustrations";
import { CropMarks } from "@/components/ui/CropMarks";
import { getMedia, type MediaSlotId } from "@/content/media";
import { cn } from "@/lib/utils";

type SiteImageProps = {
  slotId: MediaSlotId;
  className?: string;
  /** next/image sizes hint. */
  sizes?: string;
  priority?: boolean;
  cropMarks?: boolean;
  /** Extra padding around an illustration so it breathes inside the frame. */
  inset?: boolean;
};

/**
 * Renders the photo for a media slot when `src` is set, otherwise its SVG
 * illustration, inside the same aspect-ratio frame. Swap photos in media.ts only.
 */
export function SiteImage({
  slotId,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  cropMarks = true,
  inset = true,
}: SiteImageProps) {
  const slot = getMedia(slotId);
  const Illustration = illustrations[slot.illustration];

  return (
    <figure
      className={cn("relative", !slot.src && "bg-surface-2", className)}
      style={{ aspectRatio: slot.aspect }}
    >
      {slot.src ? (
        <Image src={slot.src} alt={slot.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div role="img" aria-label={slot.alt} className={cn("absolute inset-0", inset && "p-[4%]")}>
          <Illustration />
        </div>
      )}
      {cropMarks && <CropMarks />}
    </figure>
  );
}
