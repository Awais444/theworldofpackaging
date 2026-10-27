import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

/** Note box for guides: <Note title="Rule of thumb">…</Note> */
function Note({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="my-8 rounded-2xl border-l-4 border-orange-500 bg-orange-50 px-6 py-5">
      {title && <p className="text-eyebrow mb-2 text-orange-text">{title}</p>}
      <div className="[&>p]:my-0">{children}</div>
    </aside>
  );
}

const link = "font-medium text-blue-600 underline decoration-blue-100 underline-offset-4 hover:decoration-blue-600";

const components: MDXComponents = {
  h2: (p) => <h2 className="text-h3 mb-4 mt-14" {...p} />,
  h3: (p) => <h3 className="text-h4 mb-3 mt-10" {...p} />,
  p: (p) => <p className="my-5 text-lg leading-relaxed" {...p} />,
  ul: (p) => <ul className="my-5 list-disc space-y-2 pl-6 text-lg marker:text-orange-500" {...p} />,
  ol: (p) => <ol className="my-5 list-decimal space-y-2 pl-6 text-lg marker:font-bold marker:text-blue-600" {...p} />,
  strong: (p) => <strong className="font-bold" {...p} />,
  blockquote: (p) => <blockquote className="my-8 border-l-4 border-blue-600 pl-5 text-xl text-ink-500" {...p} />,
  code: (p) => <code className="rounded bg-silver-100 px-1.5 py-0.5 font-mono text-[0.9em]" {...p} />,
  table: (p) => (
    <div className="my-8 overflow-x-auto rounded-2xl border border-silver-300">
      <table className="w-full min-w-[30rem] border-collapse text-left" {...p} />
    </div>
  ),
  th: (p) => <th className="bg-silver-50 px-4 py-3 text-sm font-semibold text-ink-500" {...p} />,
  td: (p) => <td className="border-t border-silver-300 px-4 py-3 text-[15px]" {...p} />,
  a: ({ href = "", ...rest }: ComponentPropsWithoutRef<"a">) =>
    href.startsWith("/") ? <Link href={href} className={link} {...rest} /> : <a href={href} target="_blank" rel="noopener noreferrer" className={link} {...rest} />,
  Note,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
