import { ImageResponse } from "next/og";
import { site } from "@/config/site.config";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const C = { paper: "#F3EFE6", ink: "#141414", board: "#2A2724", foil: "#C9A95C", kraft: "#B98A5A", muted: "#6b655c" };
const CMYK = ["#00A3E0", "#E4007C", "#FFD400", "#141414"];

function Crop({ x, y, sx, sy, color }: { x: number; y: number; sx: 1 | -1; sy: 1 | -1; color: string }) {
  // Two short strokes per corner, offset from the trim like printer's marks.
  return (
    <>
      <div style={{ position: "absolute", left: sx > 0 ? x - 34 : x + 10, top: y, width: 24, height: 2, background: color }} />
      <div style={{ position: "absolute", left: x, top: sy > 0 ? y - 34 : y + 10, width: 2, height: 24, background: color }} />
    </>
  );
}

/**
 * Branded OG card: paper (default) or board tone, eyebrow spec line, big title,
 * wordmark from site.config, crop marks and a CMYK control strip.
 * TODO: add a display font file (TTF/OTF) to /assets and pass it to `fonts` for the brand face.
 */
export function renderOg({ eyebrow, title, tone = "paper" }: { eyebrow: string; title: string; tone?: "paper" | "board" }) {
  const bg = tone === "board" ? C.board : C.paper;
  const fg = tone === "board" ? C.paper : C.ink;
  const mark = tone === "board" ? C.foil : C.muted;
  const L = 70;
  const T = 60;
  const R = ogSize.width - 70;
  const B = ogSize.height - 60;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: bg, color: fg, fontFamily: "sans-serif" }}>
        <Crop x={L} y={T} sx={1} sy={1} color={mark} />
        <Crop x={R} y={T} sx={-1} sy={1} color={mark} />
        <Crop x={L} y={B} sx={1} sy={-1} color={mark} />
        <Crop x={R} y={B} sx={-1} sy={-1} color={mark} />
        <div style={{ position: "absolute", left: L + 30, top: T + 30, right: ogSize.width - R + 30, bottom: ogSize.height - B + 30, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: mark }}>{eyebrow}</div>
          <div style={{ display: "flex", fontSize: title.length > 40 ? 64 : 84, fontWeight: 800, lineHeight: 1, textTransform: "uppercase", letterSpacing: -1, maxWidth: 960 }}>
            {title}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", fontSize: 30, fontWeight: 800, textTransform: "uppercase" }}>{site.name}</div>
            <div style={{ display: "flex" }}>
              {CMYK.map((c) => (
                <div key={c} style={{ width: 28, height: 14, background: c }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
