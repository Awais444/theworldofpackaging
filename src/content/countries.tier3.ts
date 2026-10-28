import type { Country, Region } from "./countries";
import { BOXES, GUIDES, TIPS } from "./countries.tier2";

/**
 * Tier 3 countries (COUNTRY_PAGES_PLAN.md §2–3): short pages built only from factual fields that
 * differ per country (region, currency, official languages, units). The labelling authority, an
 * editorial note and shipping times are left empty until verified, so these pages are
 * noindex, follow (see isIndexable) and listed on the /countries hub.
 *
 * Excluded pending an export and sanctions check: North Korea, Iran, Syria, Cuba, Russia, Belarus.
 */

type Row = [slug: string, name: string, iso2: string, region: Region, code: string, symbol: string, currency: string, languages: string, short?: string];

const LA = "Latin America";
const rows: Row[] = [
  // Asia
  ["afghanistan", "Afghanistan", "AF", "Asia", "AFN", "؋", "Afghan afghani", "Pashto, Dari"],
  ["armenia", "Armenia", "AM", "Asia", "AMD", "֏", "Armenian dram", "Armenian"],
  ["azerbaijan", "Azerbaijan", "AZ", "Asia", "AZN", "₼", "Azerbaijani manat", "Azerbaijani"],
  ["bhutan", "Bhutan", "BT", "Asia", "BTN", "Nu.", "Bhutanese ngultrum", "Dzongkha"],
  ["brunei", "Brunei", "BN", "Asia", "BND", "$", "Brunei dollar", "Malay"],
  ["cambodia", "Cambodia", "KH", "Asia", "KHR", "៛", "Cambodian riel", "Khmer"],
  ["georgia", "Georgia", "GE", "Asia", "GEL", "₾", "Georgian lari", "Georgian"],
  ["kazakhstan", "Kazakhstan", "KZ", "Asia", "KZT", "₸", "Kazakhstani tenge", "Kazakh, Russian"],
  ["kyrgyzstan", "Kyrgyzstan", "KG", "Asia", "KGS", "сом", "Kyrgyzstani som", "Kyrgyz, Russian"],
  ["laos", "Laos", "LA", "Asia", "LAK", "₭", "Lao kip", "Lao"],
  ["maldives", "Maldives", "MV", "Asia", "MVR", "Rf", "Maldivian rufiyaa", "Dhivehi"],
  ["mongolia", "Mongolia", "MN", "Asia", "MNT", "₮", "Mongolian tögrög", "Mongolian"],
  ["myanmar", "Myanmar", "MM", "Asia", "MMK", "K", "Myanmar kyat", "Burmese"],
  ["nepal", "Nepal", "NP", "Asia", "NPR", "₨", "Nepalese rupee", "Nepali"],
  ["tajikistan", "Tajikistan", "TJ", "Asia", "TJS", "SM", "Tajikistani somoni", "Tajik"],
  ["timor-leste", "Timor-Leste", "TL", "Asia", "USD", "$", "US dollar", "Tetum, Portuguese"],
  ["turkmenistan", "Turkmenistan", "TM", "Asia", "TMT", "m", "Turkmenistan manat", "Turkmen"],
  ["uzbekistan", "Uzbekistan", "UZ", "Asia", "UZS", "soʻm", "Uzbekistani soʻm", "Uzbek"],
  // Europe
  ["albania", "Albania", "AL", "Europe", "ALL", "L", "Albanian lek", "Albanian"],
  ["andorra", "Andorra", "AD", "Europe", "EUR", "€", "Euro", "Catalan"],
  ["bosnia-and-herzegovina", "Bosnia and Herzegovina", "BA", "Europe", "BAM", "KM", "Convertible mark", "Bosnian, Croatian, Serbian", "Bosnia & Herzegovina"],
  ["bulgaria", "Bulgaria", "BG", "Europe", "EUR", "€", "Euro", "Bulgarian"],
  ["croatia", "Croatia", "HR", "Europe", "EUR", "€", "Euro", "Croatian"],
  ["cyprus", "Cyprus", "CY", "Europe", "EUR", "€", "Euro", "Greek, Turkish"],
  ["estonia", "Estonia", "EE", "Europe", "EUR", "€", "Euro", "Estonian"],
  ["iceland", "Iceland", "IS", "Europe", "ISK", "kr", "Icelandic króna", "Icelandic"],
  ["latvia", "Latvia", "LV", "Europe", "EUR", "€", "Euro", "Latvian"],
  ["liechtenstein", "Liechtenstein", "LI", "Europe", "CHF", "Fr.", "Swiss franc", "German"],
  ["lithuania", "Lithuania", "LT", "Europe", "EUR", "€", "Euro", "Lithuanian"],
  ["luxembourg", "Luxembourg", "LU", "Europe", "EUR", "€", "Euro", "Luxembourgish, French, German"],
  ["malta", "Malta", "MT", "Europe", "EUR", "€", "Euro", "Maltese, English"],
  ["moldova", "Moldova", "MD", "Europe", "MDL", "L", "Moldovan leu", "Romanian"],
  ["monaco", "Monaco", "MC", "Europe", "EUR", "€", "Euro", "French"],
  ["montenegro", "Montenegro", "ME", "Europe", "EUR", "€", "Euro", "Montenegrin"],
  ["north-macedonia", "North Macedonia", "MK", "Europe", "MKD", "ден", "Macedonian denar", "Macedonian, Albanian"],
  ["san-marino", "San Marino", "SM", "Europe", "EUR", "€", "Euro", "Italian"],
  ["serbia", "Serbia", "RS", "Europe", "RSD", "дин", "Serbian dinar", "Serbian"],
  ["slovakia", "Slovakia", "SK", "Europe", "EUR", "€", "Euro", "Slovak"],
  ["slovenia", "Slovenia", "SI", "Europe", "EUR", "€", "Euro", "Slovene"],
  ["ukraine", "Ukraine", "UA", "Europe", "UAH", "₴", "Ukrainian hryvnia", "Ukrainian"],
  ["vatican-city", "Vatican City", "VA", "Europe", "EUR", "€", "Euro", "Italian"],
  // Middle East
  ["iraq", "Iraq", "IQ", "Middle East", "IQD", "ع.د", "Iraqi dinar", "Arabic, Kurdish"],
  ["lebanon", "Lebanon", "LB", "Middle East", "LBP", "ل.ل", "Lebanese pound", "Arabic"],
  ["palestine", "Palestine", "PS", "Middle East", "ILS", "₪", "Israeli new shekel", "Arabic"],
  ["yemen", "Yemen", "YE", "Middle East", "YER", "﷼", "Yemeni rial", "Arabic"],
  // Africa
  ["algeria", "Algeria", "DZ", "Africa", "DZD", "دج", "Algerian dinar", "Arabic, Tamazight"],
  ["angola", "Angola", "AO", "Africa", "AOA", "Kz", "Angolan kwanza", "Portuguese"],
  ["benin", "Benin", "BJ", "Africa", "XOF", "CFA", "West African CFA franc", "French"],
  ["botswana", "Botswana", "BW", "Africa", "BWP", "P", "Botswana pula", "English, Setswana"],
  ["burkina-faso", "Burkina Faso", "BF", "Africa", "XOF", "CFA", "West African CFA franc", "French"],
  ["burundi", "Burundi", "BI", "Africa", "BIF", "FBu", "Burundian franc", "Kirundi, French, English"],
  ["cabo-verde", "Cabo Verde", "CV", "Africa", "CVE", "$", "Cape Verdean escudo", "Portuguese"],
  ["cameroon", "Cameroon", "CM", "Africa", "XAF", "FCFA", "Central African CFA franc", "French, English"],
  ["central-african-republic", "Central African Republic", "CF", "Africa", "XAF", "FCFA", "Central African CFA franc", "French, Sango"],
  ["chad", "Chad", "TD", "Africa", "XAF", "FCFA", "Central African CFA franc", "French, Arabic"],
  ["comoros", "Comoros", "KM", "Africa", "KMF", "CF", "Comorian franc", "Comorian, Arabic, French"],
  ["republic-of-the-congo", "Republic of the Congo", "CG", "Africa", "XAF", "FCFA", "Central African CFA franc", "French", "Congo"],
  ["dr-congo", "Democratic Republic of the Congo", "CD", "Africa", "CDF", "FC", "Congolese franc", "French", "DR Congo"],
  ["cote-divoire", "Côte d'Ivoire", "CI", "Africa", "XOF", "CFA", "West African CFA franc", "French"],
  ["djibouti", "Djibouti", "DJ", "Africa", "DJF", "Fdj", "Djiboutian franc", "French, Arabic"],
  ["equatorial-guinea", "Equatorial Guinea", "GQ", "Africa", "XAF", "FCFA", "Central African CFA franc", "Spanish, French, Portuguese"],
  ["eritrea", "Eritrea", "ER", "Africa", "ERN", "Nfk", "Eritrean nakfa", "Tigrinya, Arabic, English"],
  ["eswatini", "Eswatini", "SZ", "Africa", "SZL", "L", "Swazi lilangeni", "English, Swati"],
  ["ethiopia", "Ethiopia", "ET", "Africa", "ETB", "Br", "Ethiopian birr", "Amharic"],
  ["gabon", "Gabon", "GA", "Africa", "XAF", "FCFA", "Central African CFA franc", "French"],
  ["gambia", "Gambia", "GM", "Africa", "GMD", "D", "Gambian dalasi", "English"],
  ["guinea", "Guinea", "GN", "Africa", "GNF", "FG", "Guinean franc", "French"],
  ["guinea-bissau", "Guinea-Bissau", "GW", "Africa", "XOF", "CFA", "West African CFA franc", "Portuguese"],
  ["lesotho", "Lesotho", "LS", "Africa", "LSL", "L", "Lesotho loti", "Sesotho, English"],
  ["liberia", "Liberia", "LR", "Africa", "LRD", "$", "Liberian dollar", "English"],
  ["libya", "Libya", "LY", "Africa", "LYD", "ل.د", "Libyan dinar", "Arabic"],
  ["madagascar", "Madagascar", "MG", "Africa", "MGA", "Ar", "Malagasy ariary", "Malagasy, French"],
  ["malawi", "Malawi", "MW", "Africa", "MWK", "MK", "Malawian kwacha", "English, Chichewa"],
  ["mali", "Mali", "ML", "Africa", "XOF", "CFA", "West African CFA franc", "Bambara, French"],
  ["mauritania", "Mauritania", "MR", "Africa", "MRU", "UM", "Mauritanian ouguiya", "Arabic"],
  ["mauritius", "Mauritius", "MU", "Africa", "MUR", "₨", "Mauritian rupee", "English, French"],
  ["mozambique", "Mozambique", "MZ", "Africa", "MZN", "MT", "Mozambican metical", "Portuguese"],
  ["namibia", "Namibia", "NA", "Africa", "NAD", "$", "Namibian dollar", "English"],
  ["niger", "Niger", "NE", "Africa", "XOF", "CFA", "West African CFA franc", "French, Hausa"],
  ["rwanda", "Rwanda", "RW", "Africa", "RWF", "FRw", "Rwandan franc", "Kinyarwanda, English, French, Swahili"],
  ["sao-tome-and-principe", "São Tomé and Príncipe", "ST", "Africa", "STN", "Db", "São Tomé and Príncipe dobra", "Portuguese", "São Tomé & Príncipe"],
  ["senegal", "Senegal", "SN", "Africa", "XOF", "CFA", "West African CFA franc", "French"],
  ["seychelles", "Seychelles", "SC", "Africa", "SCR", "₨", "Seychellois rupee", "English, French, Seychellois Creole"],
  ["sierra-leone", "Sierra Leone", "SL", "Africa", "SLE", "Le", "Sierra Leonean leone", "English"],
  ["somalia", "Somalia", "SO", "Africa", "SOS", "Sh", "Somali shilling", "Somali, Arabic"],
  ["south-sudan", "South Sudan", "SS", "Africa", "SSP", "£", "South Sudanese pound", "English"],
  ["sudan", "Sudan", "SD", "Africa", "SDG", "ج.س", "Sudanese pound", "Arabic, English"],
  ["tanzania", "Tanzania", "TZ", "Africa", "TZS", "TSh", "Tanzanian shilling", "Swahili, English"],
  ["togo", "Togo", "TG", "Africa", "XOF", "CFA", "West African CFA franc", "French"],
  ["tunisia", "Tunisia", "TN", "Africa", "TND", "د.ت", "Tunisian dinar", "Arabic"],
  ["uganda", "Uganda", "UG", "Africa", "UGX", "USh", "Ugandan shilling", "English, Swahili"],
  ["zambia", "Zambia", "ZM", "Africa", "ZMW", "ZK", "Zambian kwacha", "English"],
  ["zimbabwe", "Zimbabwe", "ZW", "Africa", "ZWG", "ZiG", "Zimbabwe Gold", "English, Shona, Ndebele"],
  // Latin America and the Caribbean
  ["antigua-and-barbuda", "Antigua and Barbuda", "AG", LA, "XCD", "$", "East Caribbean dollar", "English", "Antigua & Barbuda"],
  ["bahamas", "Bahamas", "BS", LA, "BSD", "$", "Bahamian dollar", "English"],
  ["barbados", "Barbados", "BB", LA, "BBD", "$", "Barbadian dollar", "English"],
  ["belize", "Belize", "BZ", LA, "BZD", "$", "Belize dollar", "English"],
  ["bolivia", "Bolivia", "BO", LA, "BOB", "Bs", "Bolivian boliviano", "Spanish"],
  ["costa-rica", "Costa Rica", "CR", LA, "CRC", "₡", "Costa Rican colón", "Spanish"],
  ["dominica", "Dominica", "DM", LA, "XCD", "$", "East Caribbean dollar", "English"],
  ["dominican-republic", "Dominican Republic", "DO", LA, "DOP", "RD$", "Dominican peso", "Spanish"],
  ["ecuador", "Ecuador", "EC", LA, "USD", "$", "US dollar", "Spanish"],
  ["el-salvador", "El Salvador", "SV", LA, "USD", "$", "US dollar", "Spanish"],
  ["grenada", "Grenada", "GD", LA, "XCD", "$", "East Caribbean dollar", "English"],
  ["guatemala", "Guatemala", "GT", LA, "GTQ", "Q", "Guatemalan quetzal", "Spanish"],
  ["guyana", "Guyana", "GY", LA, "GYD", "$", "Guyanese dollar", "English"],
  ["haiti", "Haiti", "HT", LA, "HTG", "G", "Haitian gourde", "Haitian Creole, French"],
  ["honduras", "Honduras", "HN", LA, "HNL", "L", "Honduran lempira", "Spanish"],
  ["jamaica", "Jamaica", "JM", LA, "JMD", "$", "Jamaican dollar", "English"],
  ["nicaragua", "Nicaragua", "NI", LA, "NIO", "C$", "Nicaraguan córdoba", "Spanish"],
  ["panama", "Panama", "PA", LA, "USD", "$", "US dollar", "Spanish"],
  ["paraguay", "Paraguay", "PY", LA, "PYG", "₲", "Paraguayan guaraní", "Spanish, Guarani"],
  ["saint-kitts-and-nevis", "Saint Kitts and Nevis", "KN", LA, "XCD", "$", "East Caribbean dollar", "English", "St Kitts & Nevis"],
  ["saint-lucia", "Saint Lucia", "LC", LA, "XCD", "$", "East Caribbean dollar", "English"],
  ["saint-vincent-and-the-grenadines", "Saint Vincent and the Grenadines", "VC", LA, "XCD", "$", "East Caribbean dollar", "English", "St Vincent & Grenadines"],
  ["suriname", "Suriname", "SR", LA, "SRD", "$", "Surinamese dollar", "Dutch"],
  ["trinidad-and-tobago", "Trinidad and Tobago", "TT", LA, "TTD", "$", "Trinidad and Tobago dollar", "English", "Trinidad & Tobago"],
  ["uruguay", "Uruguay", "UY", LA, "UYU", "$", "Uruguayan peso", "Spanish"],
  ["venezuela", "Venezuela", "VE", LA, "VES", "Bs.", "Venezuelan bolívar", "Spanish"],
  // Oceania
  ["fiji", "Fiji", "FJ", "Oceania", "FJD", "$", "Fijian dollar", "English, Fijian, Hindi"],
  ["kiribati", "Kiribati", "KI", "Oceania", "AUD", "$", "Australian dollar", "English, Gilbertese"],
  ["marshall-islands", "Marshall Islands", "MH", "Oceania", "USD", "$", "US dollar", "Marshallese, English"],
  ["micronesia", "Micronesia", "FM", "Oceania", "USD", "$", "US dollar", "English"],
  ["nauru", "Nauru", "NR", "Oceania", "AUD", "$", "Australian dollar", "Nauruan, English"],
  ["palau", "Palau", "PW", "Oceania", "USD", "$", "US dollar", "Palauan, English"],
  ["papua-new-guinea", "Papua New Guinea", "PG", "Oceania", "PGK", "K", "Papua New Guinean kina", "English, Tok Pisin, Hiri Motu"],
  ["samoa", "Samoa", "WS", "Oceania", "WST", "T", "Samoan tālā", "Samoan, English"],
  ["solomon-islands", "Solomon Islands", "SB", "Oceania", "SBD", "$", "Solomon Islands dollar", "English"],
  ["tonga", "Tonga", "TO", "Oceania", "TOP", "T$", "Tongan paʻanga", "Tongan, English"],
  ["tuvalu", "Tuvalu", "TV", "Oceania", "AUD", "$", "Australian dollar", "Tuvaluan, English"],
  ["vanuatu", "Vanuatu", "VU", "Oceania", "VUV", "Vt", "Vanuatu vatu", "Bislama, English, French"],
];

/** Countries where imperial units are still in common everyday use alongside metric. */
const BOTH_UNITS = new Set(["liberia", "myanmar"]);

const build = ([slug, name, iso2, region, code, symbol, currency, languages, short]: Row): Country => {
  const langs = languages.split(", ");
  return {
    slug,
    name,
    short,
    iso2,
    tier: 3,
    region,
    currency: { code, symbol, name: currency },
    languages: langs,
    measurement: BOTH_UNITS.has(slug) ? "both" : "metric",
    lead: `Packaging design and custom boxes for brands in ${name}, made in our own factory and shipped by air or sea.`,
    // Unverified for Tier 3: left empty, so the page stays noindex until a local adviser fills it in.
    labelling: { authority: "", summary: "", keyPoints: [], sources: [], lastReviewed: "" },
    shipping: { air: null, sea: null, collapsibleTip: TIPS[region], incoterms: [] },
    marketNotes: [],
    topIndustries: ["cosmetics", "food-bakery", "apparel", "gifts-pr-kits", "supplements", "candles"],
    recommendedBoxes: BOXES[region],
    recommendedServices: ["box-packaging-design", "label-design", "cosmetic-packaging-design", "food-packaging-design"],
    faqs: [
      {
        q: `Which language should packaging use in ${name}?`,
        a: `The official ${langs.length > 1 ? "languages are" : "language is"} ${langs.join(", ")}. Labelling rules depend on your product, so confirm the required language and text with your importer or adviser. We lay out the text you supply.`,
      },
      {
        q: `Do you ship packaging to ${name}?`,
        a: "We ship worldwide by air or sea. Tell us your delivery address and we confirm the route, transit time and delivery terms in your quote.",
      },
    ],
    guideSlugs: GUIDES[region],
  };
};

export const tier3Countries: Country[] = rows.map(build);
