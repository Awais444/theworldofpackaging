/** Renders one or more JSON-LD objects. Non-executable script, safe in server components. */
import type { Thing, WithContext } from "schema-dts";

type Data = WithContext<Thing> | Record<string, unknown>;

export function JsonLd({ data }: { data: Data | Data[] }) {
  // Escape "<" so content can never close the script tag.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
