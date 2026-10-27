import { arc3, path3, project, roundedRect3, type Origin, type Vec3 } from "./iso";
import { Callout, Illo, IsoBox, Line3, SpecText, type IllustrationProps } from "./primitives";

type ClosedProps = IllustrationProps & {
  /** Show hinged wall fold lines (collapsible construction). */
  collapsible?: boolean;
};

const oc: Origin = { x: 228, y: 120 };
const L = 210;
const W = 130;
const H = 90;
const FLAP = 36;

/** Magnetic closure rigid box, closed: lid wraps top and back, flap covers the front. */
export function MagneticBoxClosed({ className, collapsible = false }: ClosedProps) {
  const magnet = arc3([L / 2, W + 2.5, H - FLAP / 2], [1, 0, 0], [0, 0, 1], 6, 0, Math.PI * 2, 24);
  const foil = arc3([L / 2, W / 2, H + 3], [1, 0, 0], [0, 1, 0], 20, 0, Math.PI * 2, 40);
  const foilInner = arc3([L / 2, W / 2, H + 3], [1, 0, 0], [0, 1, 0], 14, 0, Math.PI * 2, 40);
  const [mx, my] = project([L / 2, W + 2.5, H - FLAP / 2], oc);
  const [gx, gy] = project([L, 0, H / 2], oc);
  return (
    <Illo className={className}>
      <IsoBox o={oc} size={[L, W, H]} />
      {collapsible && (
        <g>
          <Line3 o={oc} a={[0, W, 8]} b={[L, W, 8]} className="fold" />
          <Line3 o={oc} a={[L, 0, 8]} b={[L, W, 8]} className="fold" />
          <Line3 o={oc} a={[L - 0.5, W, 8]} b={[L - 0.5, W, H - FLAP]} className="fold" />
        </g>
      )}
      {/* Front flap, then the lid slab on top of it. */}
      <IsoBox o={oc} at={[-2, W, H - FLAP]} size={[L + 4, 2.5, FLAP]} hideTop />
      <IsoBox o={oc} at={[-2, -2, H]} size={[L + 4, W + 4.5, 3]} />
      <path d={path3(magnet, oc, true)} className="fold" />
      <path d={path3(foil, oc, true)} className="ln acc" />
      <path d={path3(foilInner, oc, true)} className="ln-thin acc" />
      <Callout from={[mx, my]} to={[100, my]} label="Magnet" align="end" />
      <Callout from={[gx, gy]} to={[466, 104]} label="Greyboard 2.0 mm" align="end" />
      {collapsible ? (
        <SpecText items={["Collapsible rigid", "Hinged walls", "Folds flat"]} />
      ) : (
        <SpecText items={["Magnetic closure", "2.0 mm board", "Foil blocked"]} />
      )}
    </Illo>
  );
}

const oo: Origin = { x: 230, y: 200 };
const l = 180;
const w = 100;
const h = 64;
const t = 5; // wall thickness
const depth = 22; // rim to insert surface
const PHI = (105 * Math.PI) / 180; // lid opening angle

/** Magnetic closure rigid box, open, with EVA insert and product. */
export function MagneticBoxOpen({ className }: IllustrationProps) {
  const c = Math.cos(PHI);
  const s = Math.sin(PHI);
  const lidEnd: (x: number) => Vec3 = (x) => [x, w * c, h + w * s];
  const flapEnd: (x: number) => Vec3 = (x) => [x, w * c + 26 * s, h + w * s - 26 * c];

  const floorZ = h - depth;
  const cutout = roundedRect3(l / 2, w / 2, floorZ, 84, 50, 10);
  const jarR = 17;
  const jarTop = floorZ + 18;
  const front = (z: number) => arc3([l / 2, w / 2, z], [1, 0, 0], [0, 1, 0], jarR, -Math.PI / 4, (3 * Math.PI) / 4, 20);
  const jarBody = [...front(jarTop), ...front(floorZ - 6).reverse()];
  const jarLid = arc3([l / 2, w / 2, jarTop], [1, 0, 0], [0, 1, 0], jarR, 0, Math.PI * 2, 40);

  const rimOuter = path3([[0, 0, h], [l, 0, h], [l, w, h], [0, w, h]], oo, true);
  const rimInner = path3([[t, t, h], [t, w - t, h], [l - t, w - t, h], [l - t, t, h]], oo, true);

  const [ix, iy] = project([140, 25, floorZ], oo);
  const [fx, fy] = project([l - 30, (w * c + flapEnd(0)[1]) / 2, (h + w * s + flapEnd(0)[2]) / 2], oo);

  return (
    <Illo className={className}>
      {/* Lid (inner lining faces us) and its front flap. */}
      <path d={path3([[0, 0, h], [l, 0, h], lidEnd(l), lidEnd(0)], oo, true)} className="f1 ln" />
      <path d={path3([lidEnd(0), lidEnd(l), flapEnd(l), flapEnd(0)], oo, true)} className="f2 ln" />
      <path d={path3(arc3([l / 2, w * c + 13 * s, h + w * s - 13 * c], [1, 0, 0], [0, s, -c], 5, 0, Math.PI * 2, 20), oo, true)} className="fold" />

      {/* Cavity: insert surface, cutout, inner walls. */}
      <path d={path3([[t, t, floorZ], [l - t, t, floorZ], [l - t, w - t, floorZ], [t, w - t, floorZ]], oo, true)} className="f1 ln" />
      <path d={path3(cutout, oo, true)} className="f3 ln" />
      <path d={path3(jarBody, oo, true)} className="f2 ln" />
      <path d={path3(jarLid, oo, true)} className="f1 ln" />
      <path d={path3([[t, t, h], [l - t, t, h], [l - t, t, floorZ], [t, t, floorZ]], oo, true)} className="f3 ln" />
      <path d={path3([[t, t, h], [t, w - t, h], [t, w - t, floorZ], [t, t, floorZ]], oo, true)} className="f2 ln" />

      {/* Outer walls and rim. */}
      <IsoBox o={oo} size={[l, w, h]} hideTop />
      <path d={`${rimOuter}${rimInner}`} fillRule="evenodd" className="f1 ln" />

      <Callout from={[ix, iy]} to={[472, 300]} label="EVA insert" align="end" />
      <Callout from={[fx, fy]} to={[472, 70]} label="Magnetic flap" align="end" />
      <SpecText items={["Magnetic closure", "Open", "EVA insert"]} />
    </Illo>
  );
}
