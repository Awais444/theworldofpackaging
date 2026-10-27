import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

/** Note box for guides: <Note title="Rule of thumb">…</Note> */
function Note({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="my-8 border-l-2 border-accent bg-surface-2 px-5 py-4">
      {title && <p className="spec mb-2 text-accent">{title}</p>}
      <div className="[&>p]:my-0">{children}</div>
    </aside>
  );
}

const components: MDXComponents = {
  h2: (p) => <h2 className="type-display mt-16 mb-5 text-display-sm" {...p} />,
  h3: (p) => <h3 className="mt-10 mb-3 text-xl font-semibold" {...p} />,
  p: (p) => <p className="my-5 text-lg leading-relaxed" {...p} />,
  ul: (p) => <ul className="my-5 space-y-2 text-lg [&>li]:flex [&>li]:gap-3 [&>li]:before:mt-[0.8em] [&>li]:before:h-px [&>li]:before:w-3 [&>li]:before:shrink-0 [&>li]:before:bg-line-strong" {...p} />,
  ol: (p) => <ol className="my-5 list-decimal space-y-2 pl-6 text-lg marker:font-mono marker:text-accent" {...p} />,
  strong: (p) => <strong className="font-semibold" {...p} />,
  blockquote: (p) => <blockquote className="my-8 border-l-2 border-line-strong pl-5 text-xl text-muted" {...p} />,
  code: (p) => <code className="bg-surface-2 px-1.5 py-0.5 font-mono text-[0.9em]" {...p} />,
  table: (p) => (
    <div className="my-8 overflow-x-auto">
      <table className="w-full min-w-[30rem] border-collapse text-left" {...p} />
    </div>
  ),
  th: (p) => <th className="spec border-b border-line-strong py-2 pr-4 font-medium text-muted" {...p} />,
  td: (p) => <td className="border-b border-dashed border-line py-3 pr-4 font-mono text-sm" {...p} />,
  a: ({ href = "", ...rest }: ComponentPropsWithoutRef<"a">) =>
    href.startsWith("/") ? (
      <Link href={href} className="underline decoration-line-strong underline-offset-4 hover:decoration-fg" {...rest} />
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" className="underline decoration-line-strong underline-offset-4 hover:decoration-fg" {...rest} />
    ),
  Note,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
