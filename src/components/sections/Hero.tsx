import { site } from "@/config/site.config";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { RevealText } from "@/components/ui/RevealText";
import { SpecLabel } from "@/components/ui/SpecLabel";
import { HeroFold } from "./HeroFold";

export function Hero() {
  return (
    <section className="container-x pt-10 pb-20 md:pt-14 md:pb-28">
      <div className="grid-editorial items-center gap-y-14">
        <div className="col-span-4 md:col-span-12 lg:col-span-6">
          <SpecLabel items={["Branding", "Packaging design", "Rigid box factory"]} as="p" />
          <RevealText
            as="h1"
            text={"Brands designed.\nPackaging engineered.\nBoxes made in-house."}
            className="type-display mt-6 text-display-xl"
          />
          <p className="measure mt-8 text-lg text-muted">
            We design the identity, engineer the structure and manufacture the boxes in our own factory. What you
            approve on screen is what comes off our press.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <MagneticButton href="/start-a-project" size="lg" arrow>
              Start a Project
            </MagneticButton>
            <Button href="/work" variant="secondary" size="lg">
              See Our Work
            </Button>
          </div>
        </div>
        <div className="col-span-4 md:col-span-10 md:col-start-2 lg:col-span-6 lg:col-start-7">
          <HeroFold
            wordmark={site.shortName}
            spec={
              <SpecLabel
                items={["Reverse tuck end", "Cut / fold / glue", `Rigid MOQ ${site.facts.rigidMoq}`]}
                as="span"
              />
            }
          />
        </div>
      </div>
    </section>
  );
}
