import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";

// Variable fonts: one file per family covers every weight used (headings 600/700, body 400–700).
export const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--ff-heading",
  display: "swap",
});

export const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--ff-body",
  display: "swap",
});

export const fontVariables = [headingFont.variable, bodyFont.variable].join(" ");
