import type { MetadataRoute } from "next";
import { site } from "@/config/site";

/** Web app manifest (/manifest.webmanifest): name, colours and the brand icons in public/brand. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    start_url: "/",
    display: "standalone",
    theme_color: "#011EFD",
    background_color: "#FFFFFF",
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
