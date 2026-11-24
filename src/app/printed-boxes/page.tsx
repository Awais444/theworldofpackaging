import type { Metadata } from "next";
import { printedHref } from "@/lib/boxView";
import { printedStyles } from "@/content/printedStyles";
import { JsonLd } from "@/components/seo/JsonLd";
import { collectionPage } from "@/lib/schema";
import { metaDescription, ogFor } from "@/lib/seo";
import { site } from "@/config/site";
import { hubFaqs, printedTabs } from "@/content/hubs";
import { BoxHub, MaterialsTeaser, materialsTeaserItems } from "@/components/boxes/BoxHub";

export const metadata: Metadata = {
  title: "Custom Printed Boxes",
  description: metaDescription(`Mailer, tuck end, folding carton, shipping, display, pillow, sleeve and gable boxes, printed and cut by ${site.name}.`),
  alternates: { canonical: "/printed-boxes" }, openGraph: ogFor("/printed-boxes"),
};

export default function PrintedHubPage() {
  return (
    <>
      <JsonLd data={collectionPage({ name: "Custom printed boxes", description: "Custom printed boxes made by The World of Packaging.", path: "/printed-boxes", items: printedStyles.map((s) => ({ name: s.name, path: printedHref(s.slug) })) })} />
      <BoxHub
      crumb="Printed Boxes"
      eyebrow="Printed boxes"
      title="Printed boxes in any size"
      highlight="size"
      intro="Printed boxes are made from paperboard or corrugated board, printed in CMYK or Pantone colours and die-cut to your exact size. Folding cartons and tuck end boxes suit retail shelves, mailer boxes suit e-commerce and subscriptions, and shipping boxes protect products in transit. They ship flat and fold up when you pack. We print eight styles, with finishes such as foil, spot UV and soft-touch, and a digital proof before print."
      slot="printed-mailer-hero"
      benefits={[
        { title: "Any size", text: "Custom dielines for every product." },
        { title: "Full colour", text: "CMYK and Pantone, inside and out." },
        { title: "Ships flat", text: "Arrives flat, folds up in seconds." },
        { title: "Free design check", text: "Every file goes through pre-press." },
      ]}
      gridTitle="Choose your printed box"
      gridHighlight="printed"
      tabs={printedTabs}
      supporting={<MaterialsTeaser items={materialsTeaserItems} />}
      faqs={hubFaqs}
      cta={{ title: "Get a price for printed boxes", highlight: "price", text: "Send your size and quantity. Free design support with every order." }}
    />
    </>
  );
}
