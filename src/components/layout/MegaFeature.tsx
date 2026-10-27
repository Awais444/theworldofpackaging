import Link from "next/link";
import { leadTimeLabel, site } from "@/config/site.config";
import { SiteImage } from "@/components/media/SiteImage";
import { SpecLabel } from "@/components/ui/SpecLabel";

/** Feature block in the Manufacturing mega-menu. Server-rendered and passed into the Header. */
export function MegaFeature() {
  return (
    <div className="tone-board p-6">
      <SiteImage slotId="mega-menu-feature" sizes="400px" cropMarks={false} className="bg-transparent" />
      <SpecLabel
        items={[`MOQ ${site.facts.rigidMoq}`, `Lead time ${leadTimeLabel()}`, "Made in-house"]}
        as="p"
        className="mt-5"
      />
      <p className="mt-2 text-sm text-muted">
        Rigid boxes cut, wrapped and finished in our own factory, then shipped assembled or flat.
      </p>
      <Link href="/configure" className="spec mt-4 inline-block text-accent hover:underline">
        Configure a box →
      </Link>
    </div>
  );
}
