"use client";

export const THEME_STORAGE_KEY = "theme";

/**
 * Runs before first paint: resolves the stored choice or the OS preference into
 * data-theme on <html>, so there is no flash of the wrong theme.
 * Per the Next 16 "preventing flash before hydration" guide: the script is
 * executable on the server render and inert (text/plain) on the client, which
 * avoids React's dev warning about rendering <script> tags.
 */
export function ThemeScript() {
  const code = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})();`;
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: code }}
    />
  );
}
