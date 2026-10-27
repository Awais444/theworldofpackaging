// Per-country shipping pages. Notes are general guidance, not legal or customs advice.
// TODO: have a customs broker / freight partner review each page before launch.

export type ShipTo = {
  slug: string;
  country: string;
  intro: string;
  air: string;
  sea: string;
  notes: { title: string; body: string }[];
};

const DOCS = "We supply a commercial invoice and packing list with every export shipment, and a certificate of origin on request.";

export const shipTo: ShipTo[] = [
  {
    slug: "usa",
    country: "USA",
    intro: "Rigid and printed boxes shipped from our factory in Pakistan to brands and warehouses across the United States.",
    air: "Air freight suits samples and urgent first runs. Delivered to your address or your 3PL.",
    sea: "Sea freight to a US port, then onward by road. The economical choice for larger orders.",
    notes: [
      { title: "Importer of record", body: "Someone in the US must act as importer of record for customs entry. Usually that is you or your customs broker." },
      { title: "Duties", body: "Duty depends on the product classification (HS code) of the packaging. We provide the classification we use on our invoice; your broker confirms it." },
      { title: "Documents", body: DOCS },
    ],
  },
  {
    slug: "uk",
    country: "UK",
    intro: "Packaging for UK brands, shipped by air or sea and delivered to your address or fulfilment centre.",
    air: "Air freight for samples and fast launches.",
    sea: "Sea freight for production volumes, with onward delivery by road.",
    notes: [
      { title: "Import VAT and duty", body: "Import VAT and any duty are due on entry. Your courier or broker will tell you how they collect it." },
      { title: "Packaging EPR", body: "UK extended producer responsibility rules for packaging may apply to your business depending on size. Check your obligations; we can provide material weights per box." },
      { title: "Documents", body: DOCS },
    ],
  },
  {
    slug: "canada",
    country: "Canada",
    intro: "Rigid, collapsible and printed boxes shipped to Canadian brands by air or sea.",
    air: "Air freight for samples and first orders.",
    sea: "Sea freight to a Canadian port for larger runs.",
    notes: [
      { title: "Bilingual labelling", body: "Consumer product labels in Canada generally need English and French. Plan space for both on the box from the first concept." },
      { title: "Duties and taxes", body: "Duty and GST/HST are assessed at import. Your broker confirms the amounts for your shipment." },
      { title: "Documents", body: DOCS },
    ],
  },
  {
    slug: "australia",
    country: "Australia",
    intro: "Packaging for Australian brands, shipped by air for speed or by sea for volume.",
    air: "Air freight for samples and urgent stock.",
    sea: "Sea freight to an Australian port for production orders.",
    notes: [
      { title: "Biosecurity", body: "Timber and some packaging materials can attract biosecurity checks. Paper and board packaging is routine, but declare materials accurately." },
      { title: "GST and duty", body: "GST and any duty apply on import above the relevant thresholds. Your broker confirms amounts." },
      { title: "Documents", body: DOCS },
    ],
  },
  {
    slug: "uae",
    country: "UAE",
    intro: "Rigid gift boxes and printed packaging shipped to brands and gifting companies in the UAE.",
    air: "Air freight is quick from Pakistan and commonly used for full orders as well as samples.",
    sea: "Sea freight for larger volumes and repeat stock.",
    notes: [
      { title: "Arabic text", body: "Some product categories need Arabic on the label. Confirm requirements for your product before artwork is final." },
      { title: "Duties and VAT", body: "Customs duty and VAT are assessed on import. Your clearing agent confirms the amounts." },
      { title: "Documents", body: DOCS },
    ],
  },
  {
    slug: "germany",
    country: "Germany",
    intro: "Packaging for German and EU brands, shipped by air or sea into the EU.",
    air: "Air freight for samples and launches.",
    sea: "Sea freight to a European port for production volumes.",
    notes: [
      { title: "Packaging registration", body: "Businesses placing packaged goods on the German market generally need to register packaging under the Packaging Act (VerpackG). Check your obligations; we can provide material weights per box." },
      { title: "EU import VAT", body: "Import VAT and duty are due on entry into the EU. Your broker confirms amounts and handles the declaration." },
      { title: "Documents", body: DOCS },
    ],
  },
];

export const getShipTo = (slug: string) => shipTo.find((s) => s.slug === slug);
