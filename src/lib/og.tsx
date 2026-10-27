import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// ImageResponse cannot read CSS variables, so these mirror the tokens in globals.css.
const C = { blue600: "#011EFD", blue900: "#1B08B7", orange500: "#FF7001", red500: "#FF3600", white: "#FFFFFF" };

/**
 * Brand OG card (CLAUDE.md §12): Vibrant Blue background, white title, orange accent.
 * `tone` is kept for older callers; "board" uses the darker Klein Blue.
 * TODO: load Space Grotesk TTF and pass it to `fonts` so OG text uses the brand face.
 */
export function renderOg({ eyebrow, title, tone = "paper" }: { eyebrow: string; title: string; tone?: "paper" | "board" }) {
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
        <div style={{ display: "flex", fontSize: 26, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: C.white, opacity: 0.85 }}>{eyebrow}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: title.length > 40 ? 62 : 80, fontWeight: 700, lineHeight: 1.06, letterSpacing: -1.5, maxWidth: 1000 }}>{title}</div>
          <div style={{ display: "flex", width: 160, height: 10, borderRadius: 5, background: C.orange500, marginTop: 28 }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ display: "flex", position: "relative", width: 56, height: 56, borderRadius: 56, background: C.orange500, alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 700 }}>
            W
            <div style={{ display: "flex", position: "absolute", right: -4, top: -4, width: 16, height: 16, borderRadius: 4, background: C.red500, transform: "rotate(45deg)" }} />
          </div>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700 }}>{site.name}</div>
        </div>
      </div>
    ),
    ogSize,
  );
}
