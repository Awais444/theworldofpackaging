import type { ReactNode } from "react";

/** Remounts on every navigation, replaying the CSS page-enter (works without JS). */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-in">{children}</div>;
}
