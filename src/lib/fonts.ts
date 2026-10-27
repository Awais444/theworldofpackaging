import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";

// Headings: Space Grotesk 600/700. Body and UI: Plus Jakarta Sans 400–700.
export const headingFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--ff-heading",
  display: "swap",
});

export const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--ff-body",
  display: "swap",
});

export const fontVariables = [headingFont.variable, bodyFont.variable].join(" ");
