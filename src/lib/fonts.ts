import { Big_Shoulders, Instrument_Sans, JetBrains_Mono } from "next/font/google";

// "Big Shoulders" is the current Google family for Big Shoulders Display;
// the opsz axis switches to the display cut at large sizes.
export const displayFont = Big_Shoulders({
  subsets: ["latin"],
  axes: ["opsz"],
  // No metrics exist for an automatic fallback; use a condensed system face instead.
  adjustFontFallback: false,
  fallback: ["Arial Narrow", "Roboto Condensed", "sans-serif"],
  variable: "--ff-display",
  display: "swap",
});

export const bodyFont = Instrument_Sans({
  subsets: ["latin"],
  variable: "--ff-body",
  display: "swap",
});

export const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--ff-mono",
  display: "swap",
});

export const fontVariables = [displayFont.variable, bodyFont.variable, monoFont.variable].join(" ");
