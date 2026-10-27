/**
 * Isometric projection helpers. Model space: x runs right-down, y runs left-down,
 * z is up. Every box illustration is built on this grid so stroke weight,
 * angles and shading stay identical across the set.
 */

export type Vec3 = readonly [number, number, number];
export type Origin = { x: number; y: number };

const COS30 = Math.cos(Math.PI / 6);
const round = (n: number) => Math.round(n * 100) / 100;

export function project([x, y, z]: Vec3, o: Origin): [number, number] {
  return [round(o.x + (x - y) * COS30), round(o.y + (x + y) * 0.5 - z)];
}

/** SVG path data through 3D points. */
export function path3(points: readonly Vec3[], o: Origin, close = false) {
  const d = points.map((p, i) => `${i ? "L" : "M"}${project(p, o).join(" ")}`).join("");
  return close ? `${d}Z` : d;
}

/** Points on a circular arc in the plane spanned by unit vectors u and v. */
export function arc3(c: Vec3, u: Vec3, v: Vec3, r: number, t0: number, t1: number, steps = 24): Vec3[] {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = t0 + ((t1 - t0) * i) / steps;
    const a = Math.cos(t) * r;
    const b = Math.sin(t) * r;
    return [c[0] + u[0] * a + v[0] * b, c[1] + u[1] * a + v[1] * b, c[2] + u[2] * a + v[2] * b] as const;
  });
}

/** Rounded rectangle lying flat (constant z), centred on (cx, cy). */
export function roundedRect3(cx: number, cy: number, z: number, w: number, h: number, r: number): Vec3[] {
  const x0 = cx - w / 2;
  const x1 = cx + w / 2;
  const y0 = cy - h / 2;
  const y1 = cy + h / 2;
  const X: Vec3 = [1, 0, 0];
  const Y: Vec3 = [0, 1, 0];
  const q = Math.PI / 2;
  return [
    ...arc3([x1 - r, y0 + r, z], X, Y, r, -q, 0, 6),
    ...arc3([x1 - r, y1 - r, z], X, Y, r, 0, q, 6),
    ...arc3([x0 + r, y1 - r, z], X, Y, r, q, 2 * q, 6),
    ...arc3([x0 + r, y0 + r, z], X, Y, r, 2 * q, 3 * q, 6),
  ];
}

/** The three visible faces of an axis-aligned box. */
export function boxFaces([x0, y0, z0]: Vec3, [l, w, h]: Vec3) {
  const x1 = x0 + l;
  const y1 = y0 + w;
  const z1 = z0 + h;
  return {
    top: [[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]] as Vec3[],
    front: [[x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]] as Vec3[],
    side: [[x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1]] as Vec3[],
  };
}

/** Upright cylinder: visible body outline and full top ellipse, as path data. */
export function cylinder3([cx, cy, z0]: Vec3, r: number, h: number, o: Origin) {
  const X: Vec3 = [1, 0, 0];
  const Y: Vec3 = [0, 1, 0];
  // Silhouette edges sit at -45° and 135° in this projection.
  const front = (z: number) => arc3([cx, cy, z], X, Y, r, -Math.PI / 4, (3 * Math.PI) / 4, 24);
  return {
    body: path3([...front(z0 + h), ...front(z0).reverse()], o, true),
    top: path3(arc3([cx, cy, z0 + h], X, Y, r, 0, Math.PI * 2, 48), o, true),
  };
}
