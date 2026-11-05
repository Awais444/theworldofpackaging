import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// ImageResponse cannot read CSS variables, so these mirror the tokens in globals.css.
const C = { blue600: "#011EFD", blue900: "#1B08B7", orange500: "#FF7001", white: "#FFFFFF" };

// The brand mark from public/brand/logo-mark.svg, with its blue part switched to white for the blue card.
const markSvg = fs.readFileSync(path.join(process.cwd(), "public/brand/logo-mark.svg"), "utf8").replace(/fill="#011EFD"/gi, `fill="${C.white}"`);
const markSrc = `data:image/svg+xml;utf8,${encodeURIComponent(markSvg)}`;

/**
 * Brand OG card (CLAUDE.md §12): Vibrant Blue background, white title, orange accent.
 * `tone` is kept for older callers; "board" uses the darker Klein Blue.
 * TODO: load Space Grotesk TTF and pass it to `fonts` so OG text uses the brand face.
 */
export function renderOg({ eyebrow, title, tone = "paper", flagSvg }: { eyebrow: string; title: string; tone?: "paper" | "board"; /** SVG markup of a country flag. */ flagSvg?: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: tone === "board" ? C.blue900 : C.blue600,
          color: C.white,
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", right: -120, top: -120, width: 420, height: 420, borderRadius: 420, background: "rgba(255,255,255,0.08)", display: "flex" }} />
        <div style={{ position: "absolute", right: 120, bottom: -160, width: 320, height: 320, borderRadius: 320, background: "rgba(255,255,255,0.06)", display: "flex" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {flagSvg && (
            // eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain img tags.
            <img src={`data:image/svg+xml;utf8,${encodeURIComponent(flagSvg)}`} width={90} height={60} alt="" style={{ borderRadius: 6 }} />
          )}
          <div style={{ display: "flex", fontSize: 26, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: C.white, opacity: 0.85 }}>{eyebrow}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: title.length > 40 ? 62 : 80, fontWeight: 700, lineHeight: 1.06, letterSpacing: -1.5, maxWidth: 1000 }}>{title}</div>
          <div style={{ display: "flex", width: 160, height: 10, borderRadius: 5, background: C.orange500, marginTop: 28 }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain img tags. */}
          <img src={markSrc} width={104} height={56} alt="" />
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700 }}>{site.name}</div>
        </div>
      </div>
    ),
    ogSize,
  );
}
