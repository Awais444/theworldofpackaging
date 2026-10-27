"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useRef, type ComponentProps, type PointerEvent } from "react";
import { Button } from "./Button";

const STRENGTH = 0.25; // fraction of the pointer offset the button follows
const MAX = 10; // px

/** A primary CTA that leans toward the pointer. Inert on touch and with reduced motion. */
export function MagneticButton(props: ComponentProps<typeof Button>) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.4 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const clamp = (v: number) => Math.max(-MAX, Math.min(MAX, v));
    x.set(clamp((e.clientX - (r.left + r.width / 2)) * STRENGTH));
    y.set(clamp((e.clientY - (r.top + r.height / 2)) * STRENGTH));
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="inline-flex"
    >
      <Button {...props} />
    </motion.div>
  );
}
