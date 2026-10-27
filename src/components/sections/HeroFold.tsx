"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { CropMarks } from "@/components/ui/CropMarks";

// Box in stage pixels (stage is scaled to fit its container).
const W = 200; // front width
const H = 150; // height
const D = 120; // depth
const T = 26; // tuck flap
const STAGE_W = 680;
const STAGE_H = 510;
const VIEW = { rotationX: -22, rotationY: -36, scale: 1.35 };

// Front face sits so the folded box is centred; the flat net is offset to the right of it.
const FRONT_X = (STAGE_W - W) / 2;
const FRONT_Y = (STAGE_H - H) / 2 + 20;
// Centres the flat net horizontally (net spans -D .. 2W + D from the front face).
const NET_SHIFT = (STAGE_W - (2 * W + 2 * D)) / 2 - FRONT_X + D;

// Cut outline of the whole net, in front-face coordinates.
const CUT = [
  `M0 0V${-D}H${W}V0`,
  `M${W} ${-D}H${W}`,
  `M0 0H${-D}V${H}H0V${H + D}H${W}V${H}H${W + D + W}V0H${W + D}`,
  `M${W} 0H${W + D}`,
  `M0 ${-D}V${-D - T + 6}Q0 ${-D - T} 8 ${-D - T}H${W - 8}Q${W} ${-D - T} ${W} ${-D - T + 6}V${-D}`,
].join("");
const FOLDS = [
  `M0 0V${H}`,
  `M${W} 0V${H}`,
  `M${W + D} 0V${H}`,
  `M0 0H${W}`,
  `M0 ${H}H${W}`,
  `M0 ${-D}H${W}`,
];

// Final (folded) transforms. Used as inline styles so the box is complete without JS.
const folded = {
  left: "rotateY(-90deg)",
  right: "rotateY(90deg)",
  back: "rotateY(90deg)",
  top: "rotateX(90deg)",
  tuck: "rotateX(90deg)",
  bottom: "rotateX(-90deg)",
};

function Face({
  name,
  style,
  shade,
  children,
}: {
  name: keyof typeof folded | "front";
  style: CSSProperties;
  shade: 1 | 2 | 3;
  children?: ReactNode;
}) {
  return (
    <div
      data-face={name}
      className="absolute border border-current [transform-style:preserve-3d]"
      style={{
        backgroundColor: `var(--face-${shade})`,
        transform: name === "front" ? undefined : folded[name],
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Hero visual: a flat dieline draws itself, then folds into a tuck box.
 * Without JS or with reduced motion, the folded box shows as-is.
 */
export function HeroFold({ wordmark, spec }: { wordmark: string; spec: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const scaler = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      const sc = scaler.current;
      if (!el || !sc) return;

      const fit = () => sc.style.setProperty("--k", String(el.clientWidth / STAGE_W));
      fit();
      const ro = new ResizeObserver(fit);
      ro.observe(el);

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(el);
        const face = (n: string) => q(`[data-face="${n}"]`);
        const cut = q("[data-net-cut]")[0] as SVGPathElement | undefined;
        const len = cut?.getTotalLength() ?? 2000;

        const tl = gsap.timeline({ defaults: { ease: "power3.inOut" }, delay: 0.25 });
        // Zero every channel: GSAP decomposes the static 3D transform and can read a stray z-rotation.
        tl.set(q("[data-box]"), { x: NET_SHIFT, rotationX: 0, rotationY: 0, rotation: 0, skewX: 0, skewY: 0, scale: 1 })
          .set(face("left"), { rotationY: 0, transformOrigin: "100% 50%" })
          .set([face("right"), face("back")], { rotationY: 0, transformOrigin: "0% 50%" })
          .set([face("top"), face("tuck")], { rotationX: 0, transformOrigin: "50% 100%" })
          .set(face("bottom"), { rotationX: 0, transformOrigin: "50% 0%" })
          .set(q("[data-face]"), { opacity: 0 })
          .set(q("[data-print]"), { opacity: 0 })
          .set(q("[data-net]"), { opacity: 1 })
          .fromTo(cut ?? [], { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" })
          .fromTo(q("[data-net-fold]"), { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.05 }, "-=0.5")
          .to(q("[data-face]"), { opacity: 1, duration: 0.35, ease: "none" })
          .to(q("[data-net]"), { opacity: 0, duration: 0.3, ease: "none" }, "<0.15")
          .to(face("left"), { rotationY: -90, duration: 0.8 }, "fold")
          .to(face("right"), { rotationY: 90, duration: 0.8 }, "fold")
          .to(face("back"), { rotationY: 90, duration: 0.7 }, "fold+=0.35")
          .to(face("bottom"), { rotationX: -90, duration: 0.7 }, "fold+=0.45")
          .to(q("[data-box]"), { x: 0, ...VIEW, duration: 1.6, ease: "power2.inOut" }, "fold+=0.1")
          .to(face("top"), { rotationX: 90, duration: 0.7 }, "fold+=0.9")
          .to(face("tuck"), { rotationX: 90, duration: 0.5 }, "fold+=1.35")
          .to(q("[data-print]"), { opacity: 1, duration: 0.5, stagger: 0.1 }, "-=0.2");
      });

      return () => {
        ro.disconnect();
        mm.revert();
      };
    },
    { scope: root },
  );

  return (
    <figure className="illo relative">
      <div ref={root} className="relative overflow-hidden bg-surface-2" style={{ aspectRatio: `${STAGE_W} / ${STAGE_H}` }}>
        <div
          ref={scaler}
          className="absolute left-0 top-0 origin-top-left [perspective:1800px]"
          style={{ width: STAGE_W, height: STAGE_H, transform: "scale(var(--k, 1))" }}
          aria-hidden="true"
        >
          <div
            data-box
            className="absolute [transform-style:preserve-3d]"
            style={{
              left: FRONT_X,
              top: FRONT_Y,
              width: W,
              height: H,
              transformOrigin: `${W / 2}px ${H / 2}px ${-D / 2}px`,
              transform: `rotateX(${VIEW.rotationX}deg) rotateY(${VIEW.rotationY}deg) scale(${VIEW.scale})`,
            }}
          >
            {/* Flat dieline drawn before folding (hidden in the static folded state). */}
            <svg
              data-net
              className="pointer-events-none absolute overflow-visible opacity-0"
              style={{ left: 0, top: 0, width: W, height: H }}
              viewBox={`0 0 ${W} ${H}`}
            >
              <path data-net-cut d={CUT} fill="none" stroke="currentColor" strokeWidth="1.5" />
              {FOLDS.map((d) => (
                <path key={d} data-net-fold d={d} fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5 4" />
              ))}
            </svg>

            <Face name="front" shade={2} style={{ left: 0, top: 0, width: W, height: H }}>
              <div data-print className="flex h-full flex-col justify-between p-4">
                <span className="type-display text-[30px] leading-none">{wordmark}</span>
                <span className="spec text-[9px] text-muted">Tuck end / 350 gsm</span>
              </div>
              <Face name="left" shade={3} style={{ left: -D, top: -1, width: D, height: H }} />
              <Face name="right" shade={3} style={{ left: W - 1, top: -1, width: D, height: H }}>
                <div data-print className="flex h-full items-end p-3">
                  <span className="spec text-[9px] text-muted">{`${W} × ${D} × ${H}`}</span>
                </div>
                <Face name="back" shade={2} style={{ left: D - 1, top: -1, width: W, height: H }} />
              </Face>
              <Face name="top" shade={1} style={{ left: -1, top: -D, width: W, height: D }}>
                <div data-print className="flex h-full items-center justify-center">
                  <span className="block h-14 w-14 rounded-full border border-[var(--accent)]" />
                </div>
                <Face name="tuck" shade={1} style={{ left: -1, top: -T, width: W, height: T }} />
              </Face>
              <Face name="bottom" shade={2} style={{ left: -1, top: H - 1, width: W, height: D }} />
            </Face>
          </div>
        </div>
      </div>
      <CropMarks />
      <figcaption className="mt-5">{spec}</figcaption>
    </figure>
  );
}
