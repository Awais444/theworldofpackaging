"use client";

import { motion, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

/** Number that rolls to its new value. Formatting is applied every frame. */
export function AnimatedNumber({ value, format, className }: { value: number; format: (n: number) => string; className?: string }) {
  const reduce = useReducedMotion();
  const spring = useSpring(value, reduce ? { stiffness: 1000, damping: 100 } : { stiffness: 120, damping: 20 });
  const text = useTransform(spring, (v) => format(v));

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return (
    <>
      <motion.span aria-hidden="true" className={className}>
        {text}
      </motion.span>
      <span className="sr-only">{format(value)}</span>
    </>
  );
}
