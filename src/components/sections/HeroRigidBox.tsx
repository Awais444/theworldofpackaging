"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { site } from "@/config/site.config";
import { CropMarks } from "@/components/ui/CropMarks";
import { gsap, useGSAP } from "@/lib/gsap";

// Stage and box in design pixels; the stage is scaled to its container.
const STAGE_W = 640;
const STAGE_H = 480;
const L = 300; // length (x)
const D = 210; // depth (z)
const H = 128; // height (y)
const LID = 6; // lid board thickness
const FLAP = 52; // magnetic front flap drop
const OPEN = 102; // lid opening angle, degrees
const VIEW = "rotateX(-22deg) rotateY(-34deg)";

const C = {
  wrap: "#1f3a2e",
  wrapLight: "#2a4c3c",
  wrapSide: "#183026",
  wrapDark: "#122219",
  foil: "#c9a35c",
  cream: "#f4ede0",
  insert: "#efe4cf",
  cavity: "#16291f",
};
const edge = "1px solid rgb(201 163 92 / 0.55)";

/** One face, centred on the box origin, placed by a 3D transform. */
function Face({ w, h, transform, bg, children, style }: { w: number; h: number; transform: string; bg: string; children?: ReactNode; style?: CSSProperties }) {
  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{ width: w, height: h, marginLeft: -w / 2, marginTop: -h / 2, transform, background: bg, outline: edge, ...style }}
    >
      {children}
    </div>
  );
}

/**
 * Hero visual: a deep green magnetic rigid box with a gold foil logo. On load
 * the lid swings open to show the insert. Without JS or with reduced motion the
 * box is shown open and still. Replaced by a real photo or video via the
 * "home-hero" media slot.
 */
export function HeroRigidBox({ label }: { label: string }) {
  const stage = useRef<HTMLDivElement>(null);
  const scaler = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = stage.current;
      const sc = scaler.current;
      if (!el || !sc) return;
      const fit = () => sc.style.setProperty("--k", String(el.clientWidth / STAGE_W));
      fit();
      const ro = new ResizeObserver(fit);
      ro.observe(el);

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(el);
        const lid = q("[data-lid]");
        const view = q("[data-view]");
        // Reset every channel so GSAP never inherits a decomposed 3D matrix.
        gsap.set(lid, { rotationX: 0, rotationY: 0, rotation: 0, skewX: 0, skewY: 0, transformOrigin: `0px ${-H / 2}px ${-D / 2}px` });
        gsap.set(view, { rotationX: -22, rotationY: -40, rotation: 0, skewX: 0, skewY: 0 });
        gsap
          .timeline({ delay: 0.45 })
          .to(view, { rotationY: -34, duration: 1.2, ease: "power2.out" }, 0)
          .to(lid, { rotationX: OPEN, duration: 1.3, ease: "power3.inOut" }, 0.15)
          .fromTo(q("[data-insert-glow]"), { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.9)
          // Slow idle sway once open.
          .to(view, { rotationY: -28, duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1 }, 1.4);
      });

      return () => {
        ro.disconnect();
        mm.revert();
      };
    },
    { scope: stage },
  );

  const short = site.name.toUpperCase();

  return (
    <figure>
      <div className="relative">
      <CropMarks />
      <div
        ref={stage}
        className="relative overflow-hidden"
        style={{
          aspectRatio: `${STAGE_W} / ${STAGE_H}`,
          background: `radial-gradient(120% 90% at 50% 35%, ${C.cream} 0%, #e7dac2 60%, #d9c7a6 100%)`,
        }}
        aria-hidden="true"
      >
        {/* Floor shadow */}
        <div
          className="absolute left-1/2 top-[80%] h-[13%] w-[60%] -translate-x-1/2 rounded-[50%]"
          style={{ background: "radial-gradient(closest-side, rgb(21 21 21 / 0.35), transparent)" }}
        />
        <div
          ref={scaler}
          className="absolute left-0 top-0 origin-top-left [perspective:1600px]"
          style={{ width: STAGE_W, height: STAGE_H, transform: "scale(var(--k, 1))" }}
        >
          <div
            data-view
            className="absolute left-1/2 top-[66%] h-0 w-0 [transform-style:preserve-3d]"
            style={{ transform: VIEW }}
          >
            {/* Base walls */}
            <Face w={L} h={H} bg={C.wrapDark} transform={`rotateY(180deg) translateZ(${D / 2}px)`} />
            <Face w={L} h={D} bg={C.wrapDark} transform={`rotateX(-90deg) translateZ(${H / 2}px)`} />
            <Face w={D} h={H} bg={C.wrapSide} transform={`rotateY(-90deg) translateZ(${L / 2}px)`} />

            {/* Insert, set below the rim */}
            <Face
              w={L - 12}
              h={D - 12}
              bg={C.insert}
              transform={`rotateX(90deg) translateZ(${H / 2 - 24}px)`}
              style={{ outline: "none", display: "grid", placeItems: "center" }}
            >
              <div className="relative grid place-items-center" style={{ width: 150, height: 104, borderRadius: 18, background: C.cavity }}>
                <div style={{ width: 70, height: 70, borderRadius: "50%", background: `radial-gradient(circle at 35% 30%, #e6c983, ${C.foil} 55%, #9c7a3c)` }} />
                <div data-insert-glow className="absolute inset-0" style={{ borderRadius: 18, boxShadow: `inset 0 0 0 2px ${C.foil}` }} />
              </div>
            </Face>

            <Face w={D} h={H} bg={C.wrapSide} transform={`rotateY(90deg) translateZ(${L / 2}px)`} />
            <Face w={L} h={H} bg={C.wrap} transform={`translateZ(${D / 2}px)`}>
              <div className="absolute inset-x-0 bottom-3 flex justify-center">
                <span style={{ color: C.foil, fontFamily: "var(--ff-mono), monospace", fontSize: 9, letterSpacing: "0.3em" }}>MAGNETIC CLOSURE</span>
              </div>
            </Face>

            {/* Lid, hinged on the back top edge. Static state is open. */}
            <div
              data-lid
              className="absolute left-0 top-0 h-0 w-0 [transform-style:preserve-3d]"
              style={{ transformOrigin: `0px ${-H / 2}px ${-D / 2}px`, transform: `rotateX(${OPEN}deg)` }}
            >
              {/* Lid underside (lining), seen when open */}
              <Face w={L + 8} h={D + 8} bg={C.wrapLight} transform={`translateY(${-H / 2 - 1}px) rotateX(-90deg)`} style={{ outline: "none" }}>
                <div className="absolute inset-6" style={{ border: `1px solid rgb(201 163 92 / 0.4)` }} />
              </Face>
              {/* Lid top with foil logo */}
              <Face w={L + 8} h={D + 8} bg={C.wrap} transform={`translateY(${-H / 2 - LID}px) rotateX(90deg)`}>
                <div className="absolute inset-0 grid place-items-center">
                  <div className="grid place-items-center gap-3 text-center">
                    <div style={{ width: 54, height: 54, borderRadius: "50%", border: `2px solid ${C.foil}`, display: "grid", placeItems: "center" }}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", background: C.foil }} />
                    </div>
                    <span style={{ color: C.foil, fontFamily: "var(--ff-display), sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: "0.08em" }}>
                      {short}
                    </span>
                  </div>
                </div>
              </Face>
              {/* Side edges of the lid board */}
              <Face w={D + 8} h={LID} bg={C.wrapSide} transform={`translate3d(${-(L / 2 + 4)}px, ${-H / 2 - LID / 2}px, 0) rotateY(-90deg)`} />
              <Face w={D + 8} h={LID} bg={C.wrapSide} transform={`translate3d(${L / 2 + 4}px, ${-H / 2 - LID / 2}px, 0) rotateY(90deg)`} />
              {/* Magnetic front flap */}
              <Face w={L + 8} h={FLAP + LID} bg={C.wrapLight} transform={`translate3d(0, ${-H / 2 - LID + (FLAP + LID) / 2}px, ${D / 2 + 4}px)`}>
                <div className="absolute inset-x-0 bottom-0 h-[2px]" style={{ background: C.foil }} />
              </Face>
            </div>
          </div>
        </div>
      </div>
      </div>
      <figcaption className="spec mt-4 text-muted">{label}</figcaption>
    </figure>
  );
}
