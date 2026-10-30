import type { Metadata } from "next";
import { metaDescription, ogFor } from "@/lib/seo";
import { finishesPage as page } from "@/content/optionPages";
import { OptionPage } from "@/components/boxes/OptionPage";

export const metadata: Metadata = {
  title: page.metaTitle,
  description: metaDescription(page.metaDescription),
  alternates: { canonical: page.path }, openGraph: ogFor(page.path),
};

export default function Page() {
  return <OptionPage page={page} />;
}
