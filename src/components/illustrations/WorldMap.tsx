import { Illo, SpecText, type IllustrationProps } from "./primitives";

type LonLat = [number, number];

// Deliberately simplified continent outlines (lon, lat). Accuracy is "recognisable", not cartographic.
const LAND: LonLat[][] = [
  [[-168, 65], [-140, 70], [-95, 72], [-60, 60], [-52, 47], [-80, 25], [-97, 18], [-105, 20], [-125, 40], [-130, 55]],
  [[-105, 20], [-80, 8], [-77, 8], [-35, -6], [-40, -22], [-58, -38], [-70, -55], [-75, -45], [-80, -5], [-92, 15]],
  [[-10, 36], [-10, 44], [-5, 58], [10, 63], [25, 71], [40, 67], [40, 45], [28, 40], [15, 37]],
  [[-6, 50], [2, 51], [-2, 58], [-6, 56]],
  [[-17, 15], [-10, 30], [10, 37], [32, 31], [43, 12], [51, 11], [40, -15], [32, -30], [20, -35], [12, -17], [8, 4], [-8, 5]],
  [[28, 40], [40, 45], [40, 67], [60, 70], [100, 77], [140, 72], [180, 66], [160, 60], [142, 45], [122, 38], [120, 22], [108, 15], [100, 2], [95, 15], [80, 8], [73, 20], [60, 25], [56, 22], [52, 15], [43, 12], [35, 30]],
  [[113, -22], [115, -34], [135, -35], [150, -38], [153, -25], [143, -11], [130, -12], [122, -17]],
];

const W = 480;
const TOP = 78; // latitude at the top of the frame
const BOTTOM = -56;
const H = 300;
const px = ([lon, lat]: LonLat): [number, number] => [((lon + 180) / 360) * W, ((TOP - lat) / (TOP - BOTTOM)) * H + 20];

function inside([x, y]: LonLat, poly: LonLat[]) {
  let hit = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i]!;
    const [xj, yj] = poly[j]!;
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

// Dot grid computed once at module load.
const DOTS: Array<[number, number]> = [];
for (let lat = TOP; lat >= BOTTOM; lat -= 4) {
  for (let lon = -176; lon <= 180; lon += 4) {
    if (LAND.some((p) => inside([lon, lat], p))) DOTS.push(px([lon, lat]));
  }
}

export const ORIGIN: LonLat = [70, 30]; // Pakistan
export const DESTINATIONS: Array<{ label: string; at: LonLat }> = [
  { label: "USA", at: [-95, 38] },
  { label: "Canada", at: [-79, 46] },
  { label: "UK", at: [-1, 53] },
  { label: "Germany", at: [10, 50] },
  { label: "UAE", at: [55, 24] },
  { label: "Australia", at: [145, -33] },
];

function route(to: LonLat) {
  const [x1, y1] = px(ORIGIN);
  const [x2, y2] = px(to);
  const lift = Math.min(90, Math.abs(x2 - x1) * 0.35 + 20);
  return `M${x1} ${y1}Q${(x1 + x2) / 2} ${Math.min(y1, y2) - lift} ${x2} ${y2}`;
}

/** Dot-matrix world map with shipping routes from our factory. */
export function WorldMap({ className }: IllustrationProps) {
  const [ox, oy] = px(ORIGIN);
  return (
    <Illo className={className} viewBox="0 0 480 360">
      <g opacity="0.45">
        {DOTS.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={1.3} fill="currentColor" />
        ))}
      </g>
      {DESTINATIONS.map((d) => {
        const [x, y] = px(d.at);
        return (
          <g key={d.label}>
            <path d={route(d.at)} className="fold acc" />
            <circle cx={x} cy={y} r={3} className="acc-fill" />
            <text x={x + 5} y={y - 5} className="lbl lbl-strong">{d.label}</text>
          </g>
        );
      })}
      <g className="ln">
        <circle cx={ox} cy={oy} r={6} />
        <path d={`M${ox - 10} ${oy}H${ox + 10}M${ox} ${oy - 10}V${oy + 10}`} />
      </g>
      <text x={ox + 9} y={oy + 14} className="lbl lbl-strong">Factory, Pakistan</text>
      <SpecText items={["Air + sea", "Worldwide"]} y={350} />
    </Illo>
  );
}
