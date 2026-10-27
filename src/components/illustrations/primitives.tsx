import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { boxFaces, path3, project, type Origin, type Vec3 } from "./iso";

export type IllustrationProps = { className?: string };

/** SVG root shared by every illustration. Decorative: the frame supplies alt text. */
export function Illo({
  children,
  className,
  viewBox = "0 0 480 360",
}: {
  children: ReactNode;
  className?: string;
  viewBox?: string;
}) {
  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
      className={cn("illo block h-full w-full", className)}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

/** Shaded box: top lightest, front mid, side darkest (light from the left). */
export function IsoBox({
  o,
  at = [0, 0, 0],
  size,
  hideTop = false,
}: {
  o: Origin;
  at?: Vec3;
  size: Vec3;
  hideTop?: boolean;
}) {
  const f = boxFaces(at, size);
  return (
    <g>
      <path d={path3(f.front, o, true)} className="f2 ln" />
      <path d={path3(f.side, o, true)} className="f3 ln" />
      {!hideTop && <path d={path3(f.top, o, true)} className="f1 ln" />}
    </g>
  );
}

export function Line3({ a, b, o, className = "ln" }: { a: Vec3; b: Vec3; o: Origin; className?: string }) {
  return <path d={path3([a, b], o)} className={className} />;
}

/** Dimension line between two model points, pushed out by `offset`, with end ticks and a label. */
export function Dim3({
  a,
  b,
  offset,
  label,
  o,
  labelDx = 0,
  labelDy = 12,
  anchor = "middle",
}: {
  a: Vec3;
  b: Vec3;
  offset: Vec3;
  label: string;
  o: Origin;
  labelDx?: number;
  labelDy?: number;
  anchor?: "start" | "middle" | "end";
}) {
  const add = (p: Vec3, k = 1): Vec3 => [p[0] + offset[0] * k, p[1] + offset[1] * k, p[2] + offset[2] * k];
  const a1 = add(a);
  const b1 = add(b);
  const [ax, ay] = project(a1, o);
  const [bx, by] = project(b1, o);
  return (
    <g>
      <path d={path3([add(a, 0.25), add(a, 1.2)], o)} className="ln-thin" />
      <path d={path3([add(b, 0.25), add(b, 1.2)], o)} className="ln-thin" />
      <path d={path3([a1, b1], o)} className="ln-thin" />
      <circle cx={ax} cy={ay} r={1.5} fill="currentColor" />
      <circle cx={bx} cy={by} r={1.5} fill="currentColor" />
      <text x={(ax + bx) / 2 + labelDx} y={(ay + by) / 2 + labelDy} textAnchor={anchor} className="lbl">
        {label}
      </text>
    </g>
  );
}

/** Technical callout: leader from an anchor point to `to`, label on a shelf above it. */
export function Callout({
  from,
  to,
  label,
  align = "start",
}: {
  from: [number, number];
  to: [number, number];
  label: string;
  /** "end" runs the label shelf leftward from `to`, "start" rightward. */
  align?: "start" | "end";
}) {
  const shelf = label.length * 5.8 + 4; // 8px mono with 0.12em tracking
  const x2 = align === "start" ? to[0] + shelf : to[0] - shelf;
  return (
    <g>
      <circle cx={from[0]} cy={from[1]} r={2} fill="currentColor" />
      <path d={`M${from[0]} ${from[1]}L${to[0]} ${to[1]}L${x2} ${to[1]}`} className="ln-thin" />
      <text x={to[0]} y={to[1] - 4} textAnchor={align} className="lbl lbl-strong">
        {label}
      </text>
    </g>
  );
}

/** Mono spec line inside an illustration, e.g. "MAILER / E-FLUTE". */
export function SpecText({ x = 24, y = 344, items }: { x?: number; y?: number; items: string[] }) {
  return (
    <text x={x} y={y} className="lbl">
      {items.join("  /  ")}
    </text>
  );
}
