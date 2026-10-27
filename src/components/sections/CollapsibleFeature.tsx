import { site } from "@/config/site.config";
import { Button } from "@/components/ui/Button";
import { RevealText } from "@/components/ui/RevealText";
import { SpecLabel } from "@/components/ui/SpecLabel";
import { CollapsibleSnap } from "./CollapsibleSnap";
import { FreightSlider } from "./FreightSlider";

export function CollapsibleFeature() {
  return (
    <section className="tone-board">
      <div className="container-x py-24 md:py-32">
        <div className="grid-editorial items-center gap-y-12">
          <div className="col-span-4 md:col-span-5">
            <SpecLabel items={["Collapsible rigid", `MOQ ${site.facts.collapsibleMoq}`]} as="p" className="mb-5" />
            <RevealText text="Rigid when it arrives. Flat when it ships." className="type-display text-display-lg" />
            <p className="measure mt-6 text-lg text-muted">
              The walls are hinged into the base, so the box packs flat and snaps upright in seconds. Same greyboard,
              same wrap and foil as a fixed rigid box, at a fraction of the carton space on an international shipment.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/collapsible-rigid-boxes" arrow>
                Collapsible boxes
              </Button>
              <Button href="/quote" variant="secondary">
                Get a {site.facts.quoteReplyHours}h quote
              </Button>
            </div>
          </div>
          <div className="col-span-4 md:col-span-6 md:col-start-7">
            <CollapsibleSnap />
          </div>
        </div>
        <div className="mt-20">
          <FreightSlider />
        </div>
      </div>
    </section>
  );
}
