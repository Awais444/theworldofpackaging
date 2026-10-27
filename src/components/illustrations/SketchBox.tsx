import { project, type Origin, type Vec3 } from "./iso";
import { Illo, SpecText, type IllustrationProps } from "./primitives";

const o: Origin = { x: 236, y: 132 };
const L = 200;
const W = 130;
const H = 80;

const EDGES: Array<[Vec3, Vec3]> = [
  [[0, 0, H], [L, 0, H]],
  [[L, 0, H], [L, W, H]],
  [[L, W, H], [0, W, H]],
  [[0, W, H], [0, 0, H]],
  [[0, W, 0], [L, W, 0]],
  [[L, 0, 0], [L, W, 0]],
  [[0, W, 0], [0, W, H]],
  [[L, W, 0], [L, W, H]],
  [[L, 0, 0], [L, 0, H]],
];

// Deterministic wobble so server and client render the same sketch.
const wobble = (i: number, k: number) => Math.sin(i * 12.9898 + k * 78.233) * 2.2;

/** Pencil sketch of a box: doubled, overshooting strokes and construction lines. */
export function SketchBox({ className }: IllustrationProps) {
  return (
    <Illo className={className}>
      {EDGES.map(([a, b], i) => {
        const [ax, ay] = project(a, o);
        const [bx, by] = project(b, o);
        const dx = bx - ax;
        const dy = by - ay;
        const len = Math.hypot(dx, dy);
        const ux = dx / len;
        const uy = dy / len;
        const over = 9;
        return (
          <g key={i}>
            <path
              d={`M${ax - ux * over} ${ay - uy * over}L${bx + ux * over} ${by + uy * over}`}
              className="ln-thin"
            />
            <path
              d={`M${ax + wobble(i, 1)} ${ay + wobble(i, 2)}Q${(ax + bx) / 2 + wobble(i, 3)} ${(ay + by) / 2 + wobble(i, 4)} ${bx + wobble(i, 5)} ${by + wobble(i, 6)}`}
              className="ln"
            />
          </g>
        );
      })}
      {/* Construction: vanishing axes and a lid line idea. */}
      <path d={`M${project([0, 0, H], o).join(" ")}V24`} className="fold" />
      <path d={`M${project([L, W, 0], o).join(" ")}L${project([L + 60, W + 60, 0], o).join(" ")}`} className="fold" />
      <path d={`M${project([0, W, H - 30], o).join(" ")}L${project([L, W, H - 30], o).join(" ")}`} className="ln-thin acc" />
      <text x={project([L, W, H - 30], o)[0] + 10} y={project([L, W, H - 30], o)[1] + 4} className="lbl lbl-strong">
        lid line?
      </text>
      <text x="40" y="60" className="lbl">Sketch 3 of 11</text>
      <SpecText items={["Concept", "Pencil", "Proportion study"]} />
    </Illo>
  );
}
