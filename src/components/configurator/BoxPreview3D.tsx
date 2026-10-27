"use client";

import { motion, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect } from "react";
import type { BoxType } from "@/lib/pricing";
import { cn } from "@/lib/utils";

const MAX = 240; // px for the longest edge
const UNIT = 100; // faces are 100px squares scaled to size (transform-only animation)

type FaceProps = {
  transform: MotionValue<string>;
  shade: 1 | 2 | 3;
  children?: React.ReactNode;
};

function Face({ transform, shade, children }: FaceProps) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -ml-[50px] -mt-[50px] h-[100px] w-[100px] [backface-visibility:hidden]"
      style={{ transform, backgroundColor: `var(--face-${shade})` }}
    >
      {/* Edge stroke that stays 1px whatever the scale. */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
        <rect x="0" y="0" width="100" height="100" fill="none" stroke="currentColor" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
      </svg>
      {children}
    </motion.div>
  );
}

/**
 * CSS 3D box that springs to the configured proportions. Faces are fixed-size
 * squares scaled with transforms, so resizing never triggers layout.
 */
export function BoxPreview3D({ dims, type }: { dims: { l: number; w: number; h: number }; type: BoxType }) {
  const reduce = useReducedMotion();
  const longest = Math.max(dims.l, dims.w, dims.h, 1);
  const k = MAX / longest;
  const spring = reduce ? { stiffness: 1000, damping: 100 } : { stiffness: 140, damping: 18, mass: 0.8 };
  const L = useSpring(dims.l * k, spring);
  const W = useSpring(dims.w * k, spring);
  const H = useSpring(dims.h * k, spring);

  useEffect(() => {
    L.set(dims.l * k);
    W.set(dims.w * k);
    H.set(dims.h * k);
  }, [dims.l, dims.w, dims.h, k, L, W, H]);

  const s = (v: number) => v / UNIT;
  const front = useTransform([L, W, H], ([l, w, h]: number[]) => `translateZ(${w! / 2}px) scale(${s(l!)}, ${s(h!)})`);
  const back = useTransform([L, W, H], ([l, w, h]: number[]) => `rotateY(180deg) translateZ(${w! / 2}px) scale(${s(l!)}, ${s(h!)})`);
  const right = useTransform([L, W, H], ([l, w, h]: number[]) => `rotateY(90deg) translateZ(${l! / 2}px) scale(${s(w!)}, ${s(h!)})`);
  const left = useTransform([L, W, H], ([l, w, h]: number[]) => `rotateY(-90deg) translateZ(${l! / 2}px) scale(${s(w!)}, ${s(h!)})`);
  const top = useTransform([L, W, H], ([l, w, h]: number[]) => `rotateX(90deg) translateZ(${h! / 2}px) scale(${s(l!)}, ${s(w!)})`);
  const bottom = useTransform([L, W, H], ([l, w, h]: number[]) => `rotateX(-90deg) translateZ(${h! / 2}px) scale(${s(l!)}, ${s(w!)})`);

  const tone = type === "printed" ? "bg-silver-100" : "bg-silver-100";

  return (
    <div className={cn("illo relative aspect-[4/3] overflow-hidden [perspective:1200px]", tone)} aria-hidden="true">
      <motion.div
        className="absolute inset-0 [transform-style:preserve-3d]"
        initial={false}
        animate={reduce ? { rotateX: -24, rotateY: -38 } : { rotateX: -24, rotateY: [-38, -28, -38] }}
        transition={reduce ? { duration: 0 } : { duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <Face transform={back} shade={2} />
        <Face transform={left} shade={3} />
        <Face transform={bottom} shade={3} />
        <Face transform={right} shade={3} />
        <Face transform={front} shade={2} />
        <Face transform={top} shade={1}>
          <span className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--accent)]" />
        </Face>
      </motion.div>
      <p className="text-xs font-semibold uppercase tracking-wider absolute bottom-3 left-3 text-ink-500">
        {dims.l} × {dims.w} × {dims.h} mm
      </p>
    </div>
  );
}
