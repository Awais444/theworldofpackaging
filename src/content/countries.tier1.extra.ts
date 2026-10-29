import type { Faq } from "./rigidStyles";

/** Extra country-specific copy for Tier 1 pages: a third market paragraph and two more questions. */
export const tier1Extra: Record<string, { note: string; faqs: Faq[]; seasons: string[] }> = {
  "united-states": {
    seasons: ["Black Friday and Cyber Monday","The holiday gifting season in November and December","Valentine's Day and Mother's Day for beauty, jewellery and chocolate"],
    note: "US retail buyers often ask for shelf-ready cases, specific barcode placement and carton labels that match their warehouse systems, and many marketplaces have their own prep rules. We plan these from the brief so the same boxes can move from your D2C launch into wholesale without a redesign. For brands selling in several states, we keep the back panel flexible for state-level warnings and claims.",
    faqs: [
      { q: "Can you design packaging for US retail and Amazon at the same time?", a: "Yes. We design one system with a strong front panel for shelf and thumbnail, robust structures for courier delivery, and barcode placement that works for both." },
      { q: "Which currency will my quote be in?", a: "Tell us your preferred currency when you ask for a quote. We confirm the currency and payment terms in the quote itself." },
    ],
  },
  "united-kingdom": {
    seasons: ["Christmas gifting from October onwards","Black Friday","Valentine's Day and Mother's Day, which falls in March in the UK"],
    note: "Many UK brands sell into the EU as well, and since Brexit a single label rarely covers both without planning. We design shared front panels with back panels that carry the right address, responsible person and language for each market. For gifting brands, Christmas is the biggest peak, so we plan approvals and production well ahead of the autumn rush.",
    faqs: [
      { q: "Can one label work for the UK and the EU?", a: "Sometimes, with careful planning for addresses and responsible persons. Often a shared front with market-specific back panels is simpler." },
      { q: "Which currency will my quote be in?", a: "Tell us your preferred currency when you ask for a quote. We confirm the currency and payment terms in the quote itself." },
    ],
  },
  canada: {
    seasons: ["The holiday season in November and December","Black Friday and Boxing Day sales","Valentine's Day and Mother's Day"],
    note: "Canadian brands often face long distances inside the country as well as from overseas, so durable mailers and compact packaging help with both freight and domestic courier costs. Retailers may also ask for French-first packaging in Quebec, so we keep layouts flexible enough to lead with either language.",
    faqs: [
      { q: "Can you design French-first packaging for Quebec?", a: "Yes. We can lead with French and keep English as the second language, following the text your adviser approves." },
      { q: "Which currency will my quote be in?", a: "Tell us your preferred currency when you ask for a quote. We confirm the currency and payment terms in the quote itself." },
    ],
  },
  australia: {
    seasons: ["Christmas, which falls in the Australian summer","Black Friday and end-of-financial-year sales in June","Valentine's Day and Mother's Day in May"],
    note: "Australian retailers and marketplaces increasingly ask about recyclability, and the Australasian Recycling Label is widely used on packaging. We can plan space for recycling information you confirm, and design mono-material packaging that is easier to label accurately. For gifting, Christmas falls in summer, which affects both seasonal design and shipping windows.",
    faqs: [
      { q: "Can you add recycling labels to Australian packaging?", a: "Yes. We lay out the recycling information you confirm, such as the Australasian Recycling Label, if you are a member of the scheme." },
      { q: "Which currency will my quote be in?", a: "Tell us your preferred currency when you ask for a quote. We confirm the currency and payment terms in the quote itself." },
    ],
  },
  uae: {
    seasons: ["Ramadan and Eid","UAE National Day in December","Corporate gifting around year end"],
    note: "Corporate gifting is a large part of UAE packaging demand, from company anniversaries to hospitality and events. These projects often need fast turnarounds, custom inserts for several items and branding for both the client and the gift. We plan timelines backwards from the event date and send a 3D mockup and digital proof for approval before production.",
    faqs: [
      { q: "Do you make corporate gift boxes for UAE companies?", a: "Yes. We make rigid gift boxes with custom inserts for several items, branded for your company or your client." },
      { q: "Which currency will my quote be in?", a: "Tell us your preferred currency when you ask for a quote. We confirm the currency and payment terms in the quote itself." },
    ],
  },
  "saudi-arabia": {
    seasons: ["Ramadan and Eid","Saudi National Day in September","Wedding and gifting seasons"],
    note: "Saudi Arabia's growing retail, hospitality and tourism sectors are creating demand for packaging that represents the Kingdom to visitors, from coffee and dates to fragrance and souvenirs. We design packaging that feels authentically Saudi while meeting international expectations for quality and finish.",
    faqs: [
      { q: "Can packaging represent Saudi heritage?", a: "Yes. We can use patterns, colours and typography inspired by Saudi heritage while keeping a modern, premium finish." },
      { q: "Which currency will my quote be in?", a: "Tell us your preferred currency when you ask for a quote. We confirm the currency and payment terms in the quote itself." },
    ],
  },
  germany: {
    seasons: ["Christmas and Advent, including Christmas markets","Black Friday","Easter and Mother's Day"],
    note: "German retail and marketplace buyers tend to be detailed about specifications: board grades, dimensions, carton counts and pallet configurations. We supply clear specification sheets for every box, and can provide material data for packaging registration. For gifting and seasonal ranges, Christmas markets and Advent are major peaks.",
    faqs: [
      { q: "Can you supply technical specifications for German buyers?", a: "Yes. We provide specification sheets with dimensions, board grades, materials and carton details for each box." },
      { q: "Which currency will my quote be in?", a: "Tell us your preferred currency when you ask for a quote. We confirm the currency and payment terms in the quote itself." },
    ],
  },
  france: {
    seasons: ["Christmas and New Year gifting","Valentine's Day","Mother's Day and Easter for chocolate and fragrance"],
    note: "French gifting peaks around Christmas, Valentine's Day and Mother's Day, and fragrance and chocolate brands often launch limited editions for each. We design seasonal sleeves and special editions that sit over a core rigid box, so you can refresh the look without retooling.",
    faqs: [
      { q: "Can you design limited editions for French seasonal launches?", a: "Yes. We design seasonal sleeves, foils and inserts that work with your core box." },
      { q: "Which currency will my quote be in?", a: "Tell us your preferred currency when you ask for a quote. We confirm the currency and payment terms in the quote itself." },
    ],
  },
  netherlands: {
    seasons: ["Sinterklaas in early December","Christmas","Black Friday"],
    note: "For brands using a Dutch warehouse to serve several EU countries, packaging needs to work for customers in many languages and recycling systems. We plan the information that changes by market as separate modules, so you can produce versions efficiently or use one multi-language pack.",
    faqs: [
      { q: "Can you design multi-language packaging for EU distribution from the Netherlands?", a: "Yes. We plan language groups and modular back panels so one pack or a few versions can cover your markets." },
      { q: "Which currency will my quote be in?", a: "Tell us your preferred currency when you ask for a quote. We confirm the currency and payment terms in the quote itself." },
    ],
  },
  ireland: {
    seasons: ["Christmas gifting","St Patrick's Day for food and drink brands","Mother's Day in March"],
    note: "Irish brands are often closely tied to place: a distillery, a farm, a coastline. Packaging that tells that story clearly, through illustration, typography and materials, helps them stand out in export markets. We design provenance-led packaging and labels that work at home and abroad.",
    faqs: [
      { q: "Can packaging tell the story of where my product is made?", a: "Yes. We use illustration, typography, materials and short copy to communicate provenance." },
      { q: "Which currency will my quote be in?", a: "Tell us your preferred currency when you ask for a quote. We confirm the currency and payment terms in the quote itself." },
    ],
  },
  singapore: {
    seasons: ["Lunar New Year","Mid-Autumn Festival for mooncake gift boxes","Corporate gifting at year end", "Deepavali and Hari Raya gifting"],
    note: "Singapore buyers often compare packaging suppliers across the region and expect clear specifications, reliable timelines and consistent quality across repeat orders. We supply specification sheets, keep approved proofs on record and plan repeat production well ahead of festive peaks.",
    faqs: [
      { q: "Can you keep packaging consistent across repeat orders?", a: "Yes. We keep approved proofs and specifications on record and check each run against them." },
      { q: "Which currency will my quote be in?", a: "Tell us your preferred currency when you ask for a quote. We confirm the currency and payment terms in the quote itself." },
    ],
  },
  malaysia: {
    seasons: ["Hari Raya Aidilfitri","Lunar New Year","Deepavali and year-end sales"],
    note: "Malaysian beauty and wellness brands often launch quickly and iterate, adding new products and variants as they learn from customers. A clear packaging system with templates for new SKUs keeps the range consistent and makes each launch faster and cheaper.",
    faqs: [
      { q: "Can you build a packaging system for a fast-growing range?", a: "Yes. We design templates with fixed layouts and colour codes so new products are quick to add." },
      { q: "Which currency will my quote be in?", a: "Tell us your preferred currency when you ask for a quote. We confirm the currency and payment terms in the quote itself." },
    ],
  },
  kuwait: {
    seasons: ["Ramadan and Eid","Kuwait National Day in February","Wedding season gifting"],
    note: "Kuwaiti customers often buy fragrance and sweets in sets for gifting, so multi-compartment boxes with fitted inserts are common. We design inserts for several bottles, jars or pieces and make sure each item sits securely and looks generous when the box opens.",
    faqs: [
      { q: "Can you make boxes for fragrance or sweet gift sets?", a: "Yes. We design multi-compartment rigid boxes with inserts sized to each item." },
      { q: "Which currency will my quote be in?", a: "Tell us your preferred currency when you ask for a quote. We confirm the currency and payment terms in the quote itself." },
    ],
  },
  qatar: {
    seasons: ["Ramadan and Eid","Qatar National Day in December","Corporate events and hospitality gifting", "Major sporting and cultural events"],
    note: "Hospitality and events in Qatar often need packaging produced in a single, well-timed run, with every box personalised for the client or occasion. We plan artwork approval, proofing and production around your event date and can include several designs in one order.",
    faqs: [
      { q: "Can one order include several gift box designs?", a: "Yes. Each design has its own minimum, and we can produce them together to share shipping." },
      { q: "Which currency will my quote be in?", a: "Tell us your preferred currency when you ask for a quote. We confirm the currency and payment terms in the quote itself." },
    ],
  },
  oman: {
    seasons: ["Ramadan and Eid","Oman National Day in November","Peak tourist months for souvenir packaging"],
    note: "Tourism is an important channel for Omani products, so packaging often needs to travel well in a suitcase and explain the product to visitors who may not know it. We design compact, sturdy gift boxes with short bilingual descriptions that tell the story of the product.",
    faqs: [
      { q: "Can you design packaging for tourists and visitors?", a: "Yes. We design compact, durable gift packaging with short bilingual descriptions of the product." },
      { q: "Which currency will my quote be in?", a: "Tell us your preferred currency when you ask for a quote. We confirm the currency and payment terms in the quote itself." },
    ],
  },
  bahrain: {
    seasons: ["Ramadan and Eid", "Bahrain National Day in December", "Wedding and gifting seasons", "Corporate gifting at year end", "Formula 1 race weekend and other major events"],
    note: "Bahrain's jewellery and pearl traders often need small, precise boxes in several sizes, with consistent finishes across the range. We design a family of rigid boxes with matching papers, foils and inserts so rings, necklaces and sets all look part of the same brand.",
    faqs: [
      { q: "Can you make a matching set of jewellery box sizes?", a: "Yes. We design a family of sizes with matching materials, finishes and inserts." },
      { q: "Which currency will my quote be in?", a: "Tell us your preferred currency when you ask for a quote. We confirm the currency and payment terms in the quote itself." },
    ],
  },
  "new-zealand": {
    seasons: ["Christmas, in the New Zealand summer","Black Friday","Mother's Day in May"],
    note: "Many New Zealand brands export to Australia, Asia and North America, often starting with small volumes. We design packaging systems that adapt to each export market's labelling requirements while keeping the New Zealand story at the front.",
    faqs: [
      { q: "Can you design New Zealand packaging for export markets?", a: "Yes. We keep a shared front design and adapt back panels for each export market's requirements." },
      { q: "Which currency will my quote be in?", a: "Tell us your preferred currency when you ask for a quote. We confirm the currency and payment terms in the quote itself." },
    ],
  },
  "south-africa": {
    seasons: ["Christmas and the summer holidays","Black Friday","Valentine's Day and Mother's Day"],
    note: "South African brands often balance cost and presentation carefully, especially when exporting. We help choose where to spend, such as a premium rigid box for a hero product and printed cartons for the rest of the range, so the brand looks consistent without overspending.",
    faqs: [
      { q: "Can you help balance packaging cost across a range?", a: "Yes. We recommend where premium packaging adds most value and where printed cartons are enough." },
      { q: "Which currency will my quote be in?", a: "Tell us your preferred currency when you ask for a quote. We confirm the currency and payment terms in the quote itself." },
    ],
  },
  sweden: {
    seasons: ["Christmas and Advent","Black Friday","Midsummer for food and drink brands", "Easter, when chocolate and gift sales rise across Sweden", "Lucia and Advent gifting in December", "Easter, when chocolate and gift sales rise across Sweden"],
    note: "Swedish brands often sell across the Nordics and into the wider EU, and customers there expect packaging to be honest about materials and recycling. We help you choose materials that are easy to sort and keep environmental statements specific, so the packaging supports your brand rather than raising questions.",
    faqs: [
      { q: "Can you design packaging for the whole Nordic region?", a: "Yes. We plan multi-language panels for Sweden, Denmark, Norway and Finland where needed." },
      { q: "Which currency will my quote be in?", a: "Tell us your preferred currency when you ask for a quote. We confirm the currency and payment terms in the quote itself." },
    ],
  },
  pakistan: {
    seasons: ["Ramadan, Eid ul-Fitr and Eid ul-Adha","Wedding season in winter","Independence Day in August"],
    note: "Pakistani fashion and lifestyle brands increasingly sell online across the country, so packaging needs to survive courier delivery and still feel special when opened. We design printed mailers, pillow boxes and rigid boxes that protect the product and make the unboxing memorable.",
    faqs: [
      { q: "Do you make packaging for Pakistani online fashion brands?", a: "Yes. We make printed mailers, pillow boxes and rigid boxes for clothing, accessories and jewellery." },
      { q: "Which currency will my quote be in?", a: "Tell us your preferred currency when you ask for a quote. We confirm the currency and payment terms in the quote itself." },
    ],
  },
};
