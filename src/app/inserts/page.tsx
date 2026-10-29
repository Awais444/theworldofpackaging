import type { Metadata } from "next";
import { metaDescription } from "@/lib/seo";
import { insertsPage as page } from "@/content/optionPages";
import { OptionPage } from "@/components/boxes/OptionPage";

export const metadata: Metadata = {
  title: page.metaTitle,
  description: metaDescription(page.metaDescription),
  alternates: { canonical: page.path },
};

export default function Page() {
  return <OptionPage page={page} />;
}
