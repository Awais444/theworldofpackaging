import { Illo, SpecText, type IllustrationProps } from "./primitives";

// Reverse tuck end carton, flat. Panels: glue 18 | front 90 | side 50 | back 90 | side 50.
// Body runs y 114–234; top lid + tuck on the back panel, bottom lid + tuck on the front.
export const DIELINE_CUT =
  "M108 114H198L199 86L207 79H242L248 104V64L250 56Q252 50 260 50H326Q334 50 336 56L338 64V104L344 79H379L387 86L388 114" +
  "V234L387 262L379 269H344L338 244V234H248V244L242 269H207L199 262L198 234" +
  "V284L196 292Q194 298 186 298H120Q112 298 110 292L108 284V234L90 226V122Z";

export const DIELINE_FOLDS = [
  "M108 114V234",
  "M198 114V234",
  "M248 114V234",
  "M338 114V234",
  "M248 114H338",
  "M198 114H248",
  "M338 114H388",
  "M248 64H338",
  "M108 234H198",
  "M198 234H248",
  "M338 234H388",
  "M108 284H198",
];

const PANELS: Array<[string, number, number]> = [
  ["Front", 153, 178],
  ["Side", 223, 178],
  ["Back", 293, 178],
  ["Side", 363, 178],
  ["Lid", 293, 93],
  ["Tuck", 293, 60],
  ["Lid", 153, 263],
  ["Dust", 223, 100],
  ["Dust", 363, 100],
];

function RegTarget({ x, y }: { x: number; y: number }) {
  return (
    <g className="ln-thin">
      <circle cx={x} cy={y} r={5} />
      <path d={`M${x - 9} ${y}H${x + 9}M${x} ${y - 9}V${y + 9}`} />
    </g>
  );
}

function SheetCrop({ x, y, sx, sy }: { x: number; y: number; sx: 1 | -1; sy: 1 | -1 }) {
  return <path d={`M${x - sx * 4} ${y}H${x - sx * 14}M${x} ${y - sy * 4}V${y - sy * 14}`} className="ln-thin" />;
}

/**
 * Flat dieline: solid = cut, dashed = fold. Paths carry `data-dieline` so the
 * hero animation can draw them stroke by stroke.
 */
export function DielineFlat({ className }: IllustrationProps) {
  return (
    <Illo className={className}>
      <SheetCrop x={78} y={40} sx={1} sy={1} />
      <SheetCrop x={402} y={40} sx={-1} sy={1} />
      <SheetCrop x={78} y={308} sx={1} sy={-1} />
      <SheetCrop x={402} y={308} sx={-1} sy={-1} />
      <RegTarget x={240} y={24} />
      <RegTarget x={430} y={174} />

      <path d={DIELINE_CUT} className="f1" />
      <g data-dieline="fold">
        {DIELINE_FOLDS.map((d) => (
          <path key={d} d={d} className="fold" />
        ))}
      </g>
      <path d={DIELINE_CUT} className="ln" data-dieline="cut" />

      {PANELS.map(([label, x, y], i) => (
        <text key={i} x={x} y={y} textAnchor="middle" className="lbl">
          {label}
        </text>
      ))}
      <text x={99} y={174} textAnchor="middle" className="lbl" transform="rotate(-90 99 174)">
        Glue
      </text>

      {/* Legend */}
      <g transform="translate(24 328)">
        <path d="M0 0H22" className="ln" />
        <text x={28} y={3} className="lbl">Cut</text>
        <path d="M64 0H86" className="fold" />
        <text x={92} y={3} className="lbl">Fold</text>
      </g>
      <SpecText items={["Reverse tuck end", "90 × 50 × 120 mm", "350 gsm SBS"]} y={348} />
    </Illo>
  );
}
