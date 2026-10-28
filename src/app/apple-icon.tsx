import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Mirrors the logo mark: orange circle, white "W", red star (colours from globals.css tokens).
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#FFFFFF" }}>
        <div style={{ position: "relative", display: "flex", width: 140, height: 140, borderRadius: 140, background: "#FF7001", alignItems: "center", justifyContent: "center", color: "#FFFFFF", fontSize: 84, fontWeight: 700 }}>
          W
          <div style={{ position: "absolute", right: -6, top: -6, display: "flex", width: 34, height: 34, borderRadius: 6, background: "#FF3600", transform: "rotate(45deg)" }} />
        </div>
      </div>
    ),
    size,
  );
}
