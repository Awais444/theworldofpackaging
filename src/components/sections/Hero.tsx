import Image from "next/image";
import { site } from "@/config/site.config";
import { getMedia } from "@/content/media";
import { Button } from "@/components/ui/Button";
import { CropMarks } from "@/components/ui/CropMarks";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { HeroRigidBox } from "./HeroRigidBox";

const CAPTION = "Magnetic closure / 2.0 mm board / gold foil / EVA insert";

/** "home-hero" media slot: video, then photo, then the animated 3D box. */
function HeroMedia() {
  const slot = getMedia("home-hero");
  if (slot.video) {
    return (
      <figure className="relative">
        <video
          className="block aspect-[4/3] w-full object-cover"
          src={slot.video}
          poster={slot.src}
          autoPlay
          muted
          loop
          playsInline
          aria-label={slot.alt}
        />
        <CropMarks />
      </figure>
    );
  }
  if (slot.src) {
    return (
      <figure className="relative aspect-[4/3]">
        <Image src={slot.src} alt={slot.alt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        <CropMarks />
      </figure>
    );
  }
  return (
    <div role="img" aria-label={slot.alt} className="relative">
      <HeroRigidBox label={CAPTION} />
    </div>
  );
}

const proof = [`MOQ ${site.facts.rigidMoq}`, "Own factory", "Ships worldwide", "Collapsible rigid boxes"];

export function Hero() {
  return (
    <section className="tone-board">
      <div className="container-x pt-12 pb-16 md:pt-16 md:pb-24">
        <div className="grid-editorial items-center gap-y-12">
          <div className="col-span-4 md:col-span-12 lg:col-span-7">
            {/* Static on purpose: the headline is never hidden, faded or delayed.
                Sized from the column width so each sentence stays on one line
                ("Made in our own factory." measures ~9.7em in the display face). */}
            <h1 className="type-display text-[calc((100vw-2rem)/10.4)] leading-[0.92] whitespace-nowrap md:text-[min(calc((100vw-4rem)/10.4),6rem)] lg:text-[min(4.9vw,5.25rem)]">
              Packaging that sells.
              <span className="block text-accent">Made in our own factory.</span>
            </h1>
            <p className="mt-6 max-w-[46ch] text-lg text-muted md:text-xl">
              Brand and packaging design, with rigid boxes made in our own factory.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <MagneticButton href="/start-a-project" size="lg" arrow>
                Start a Project
              </MagneticButton>
              <Button href="/quote" variant="secondary" size="lg">
                Get a Box Quote
              </Button>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-3 gap-y-2 border-t border-line pt-5 font-mono text-xs uppercase tracking-[0.14em] text-fg">
              {proof.map((p, i) => (
                <li key={p} className="flex items-center gap-3">
                  {i > 0 && (
                    <span aria-hidden="true" className="text-accent">
                      ·
                    </span>
                  )}
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-4 md:col-span-10 md:col-start-2 lg:col-span-5 lg:col-start-8">
            <HeroMedia />
          </div>
        </div>
      </div>
    </section>
  );
}
