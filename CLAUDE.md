# MASTER BUILD PROMPT: The World of Packaging website

> This is the single source of truth. It **replaces every earlier prompt, palette, layout and homepage instruction** (CLAUDE_CODE_PROMPT.md, earlier design notes). If the project already exists, refactor it to match this file; delete anything that conflicts (old green/gold or monochrome palettes, CMYK bars, crop marks, paper grain, condensed display fonts, cluttered mono spec labels).
>
> Save this file as `CLAUDE.md` in the project root, then tell Claude Code:
> **"Read CLAUDE.md fully. Follow it exactly. Work phase by phase (section 14). After each phase run the checks in section 13, deploy-ready, and give me the list of finished URLs. Then wait for my go-ahead."**

---

## 0. Working rules for Claude Code

1. Build in the phases of section 14. Stop after each phase, report finished URLs and anything that needs my input.
2. After every phase: `npm run lint`, `npm run build` (zero errors, zero type errors), then check pages at 375px, 768px, 1280px.
3. **No page may be a stub.** Every page listed in section 9 must have real copy, visuals, at least one CTA, and its listed sections.
4. **Never fabricate facts** (client names, reviews, ratings, awards, certifications, statistics, prices). Use clearly flagged placeholders (`placeholder: true`) and list them in `CONTENT_TODO.md`.
5. Ask me before adding paid services or heavy dependencies not listed here.
6. Clean, typed, componentized code. No lorem ipsum, no dead code, no inline magic colors (use tokens).

---

## 1. The business

- **Name:** The World of Packaging (short: TWOP). Domain: theworldofpackaging.com (confirm TLD in config).
- **What we are:** a **packaging design & branding agency with its own factory**. We design brands and packaging, **manufacture rigid boxes in-house (including collapsible rigid boxes)**, and **print all types of boxes**. Based in Pakistan, serving brands worldwide (USA, UK, Canada, Australia, UAE, EU).
- **Pitch:** "Packaging design and manufacturing under one roof: from first sketch to delivered box."
- **Why us (use in copy):**
  1. Own factory: rigid boxes made and printed in-house, not outsourced.
  2. MOQ 500 for rigid and collapsible rigid boxes.
  3. Collapsible rigid boxes ship flat: much lower international freight and storage.
  4. Free design support with every order, plus full branding/packaging design services.
  5. Physical sample before production.
  6. Worldwide shipping by air or sea.
- **Primary conversion:** Get a Quote. Secondary: Start a Project (design/branding), Request a Sample, WhatsApp.

---

## 2. Tech stack

- Next.js 14+ (App Router), TypeScript strict, Tailwind CSS
- `next/font/google`: Space Grotesk, Plus Jakarta Sans
- Framer Motion (UI motion), GSAP + ScrollTrigger via `@gsap/react` (hero + a few signature moments), Lenis (smooth scroll, disabled on reduced motion)
- React Hook Form + Zod (forms), Zustand (quote builder state)
- lucide-react (icons)
- Content in typed files under `src/content/`; dynamic routes use `generateStaticParams` (all marketing pages static)
- Deploy: Vercel

---

## 3. Site config (single place for name/contact)

`src/config/site.ts`
```ts
export const site = {
  name: "The World of Packaging",
  shortName: "TWOP",
  tagline: "Packaging design and manufacturing under one roof.",
  url: "https://theworldofpackaging.com",          // TODO confirm
  email: "hello@theworldofpackaging.com",          // TODO confirm
  whatsapp: "+1 (437) 564-0199",
  phone: "+1 (437) 564-0199",
  address: "Factory address, Pakistan",            // TODO
  hours: "Mon–Sat, 9:00–18:00 PKT",                // TODO
  socials: { instagram: "", linkedin: "", facebook: "", pinterest: "", behance: "" },
  facts: {
    rigidMoq: 500,
    collapsibleMoq: 500,
    printedMoq: null as number | null,             // TODO
    rigidLeadTime: "TODO",                          // e.g. "3–4 weeks"
    printedLeadTime: "TODO",
    quoteReply: "within 24 hours",                  // TODO confirm
  },
};
```
Logo: `<Logo />` component renders a temporary wordmark (orange circular "W" mark with a small red 4-point star + "The World of Packaging" in Space Grotesk 700, black or white). Swappable for a real SVG at `/public/brand/logo.svg` later.

---

## 4. Design system (implement exactly)

### 4.1 Colors
| Token | Name | HEX | Use |
|---|---|---|---|
| blue-600 | Vibrant Blue | #011EFD | Primary buttons, links, brand bands |
| blue-900 | Klein Blue | #1B08B7 | Dark sections, footer, utility bar |
| orange-500 | Hot Orange | #FF7001 | Accent: highlights, icons, badges, accent buttons |
| red-500 | Chilli Red | #FF3600 | Tiny accents only ("New" tag, star mark) |
| silver-100 | Pale Silver | #E7EAEC | Soft section backgrounds, image panels |
| ink-900 | Business Black | #141317 | Text, occasional dark section |
| white | White | #FFFFFF | Main background |

Derived: blue-50 #EEF1FF, blue-100 #D9DFFF, blue-700 #0118CC, orange-50 #FFF2E6, orange-600 #E66400, silver-50 #F4F6F7, silver-300 #C9CED2, ink-500 #5E5C66 (muted text), ink-400 #8C8A94 (captions), success #12A150, error #E5251C.

**Ratio:** 60% white/silver · 25% black/Klein Blue · 10% Vibrant Blue · 5% orange/red.
**Rules:** never orange text on blue; white text on blue/Klein; orange used for icons, underlines, badges, accent buttons; red never on large areas; all text AA contrast. Light theme only.

### 4.2 Typography
- Headings: **Space Grotesk** 600/700, letter-spacing -0.02em, sentence case.
- Body/UI: **Plus Jakarta Sans** 400/500/600/700, line-height 1.6.

| Style | Desktop / Mobile |
|---|---|
| display | 72 / 44, lh 1.02 |
| h1 | 56 / 38, lh 1.08 |
| h2 | 44 / 32, lh 1.12 |
| h3 | 28 / 24 |
| h4 | 20 / 18 |
| lead | 20 / 18, muted |
| body | 16 |
| small | 14 |
| eyebrow | 13, 700, uppercase, tracking 0.12em, blue (orange on dark) |

**Signature:** in each section heading, one key word is Hot Orange with a soft orange swoosh underline (SVG, drawn on scroll). Max once per heading.

### 4.3 Spacing & shape
- 4px base; section padding 96px desktop / 64px mobile; container max 1240px, side padding 24px (16px mobile); 12-col grid, 24px gutter.
- Radius: 8 (inputs/tags), 16 (cards), 24 (panels/images), full (buttons/pills).
- Shadows: sm `0 1px 2px rgba(20,19,23,.06)`, md `0 8px 24px rgba(20,19,23,.08)`, blue `0 12px 32px rgba(1,30,253,.25)` (primary hover only).
- Borders 1px silver-300.

### 4.4 Components (build in `src/components/ui`)
- **Button**: pill, sizes sm 40 / md 48 / lg 56. Variants: primary (blue), secondary (white + blue border), accent (orange), white (on blue bg), ghost/link (blue text, animated underline). Optional trailing arrow that slides 4px on hover. Visible focus ring `0 0 0 3px rgba(1,30,253,.3)`.
- **Tag/Badge**: pill 28px; blue-50/blue, orange-50/#B84F00, red solid/white.
- **SectionHeader**: eyebrow, h2 with highlight word, optional lead, optional right-side link.
- **ServiceCard**: icon in blue-50 circle, title, text, "Learn more →"; hover lift 4px + blue border + shadow-md.
- **ProductCard** (box style): image on silver-100 panel (radius 16), name, 1 line, tags (MOQ, type); hover image scale 1.04.
- **CaseCard**: large image radius 24, orange industry tag, title, 1 line.
- **IndustryCard**: icon + name + 3 recommended box tags.
- **StatCard**: number in Space Grotesk 48 blue + label.
- **StepList**: numbered steps with connecting line (horizontal desktop, vertical mobile).
- **FAQ Accordion**: rows with blue +/− circle, accessible (button + aria-expanded), FAQPage JSON-LD.
- **Tabs**: pill tabs on silver-100 track; active blue/white.
- **SpecTable**: two columns, zebra silver-50 rows.
- **Breadcrumbs** with JSON-LD.
- **CTABand**: Vibrant Blue panel radius 24, heading, text, accent + white buttons.
- **LogoMarquee**: infinite strip (placeholder logos flagged).
- **TestimonialCard** (placeholder flagged).
- **Form fields**: 48px, silver-50 fill, radius 8, blue focus ring, label 14/600, error text.
- **WhatsAppFloat**: bottom-right round button, safe-area aware.
- **Logo**, **Container**, **Section** (bg variants: white, silver, blue-50, klein, ink).

### 4.5 Motion
- Framer Motion: section content fades + slides up 24px, stagger 0.08s, once, duration 0.5–0.7s.
- GSAP hero: headline lines rise in sequence, hero illustration scales/floats in, then gentle idle float; orange swoosh underlines draw on scroll.
- GSAP signature (only here): Collapsible page pinned sequence flat → assembled box; About page counters.
- Hover: buttons, cards, menu items (Framer Motion).
- Mega menu: Framer Motion fade + 8px slide, 0.2s.
- `prefers-reduced-motion`: no smooth scroll, no pinning, show final states. Content never hidden without JS.

### 4.6 Visuals until real photos
- Every image is a **media slot** (section 8). Until a photo exists, show a **clean, colorful, filled illustration** in brand colors: flat-3D boxes (blue/Klein bodies, orange lids or ribbons, white inserts), soft shadows, on silver-100 or blue-50 panels with subtle shapes. No line-art wireframes, no grey placeholders, no stock clichés.
- Build illustrations as reusable SVG React components with props for color variant, so each box style gets its own shape: magnetic, lid & base, drawer, book, shoulder-neck, tube, window, collapsible (flat + assembled), mailer, tuck end, folding carton, shipping carton, display, pillow, sleeve, gable, insert, label/bottle, brand board, factory machine, delivery/globe.

---

## 5. Navigation

**Utility bar** (Klein Blue, 36px, white 13px): "MOQ 500 · Free design support · Ships worldwide" left; WhatsApp and email right (hidden on mobile).

**Header** (white, sticky, 72px, shadow-sm after scroll):
```
[Logo]   Boxes ▾   Services ▾   Industries ▾   Work   About   [Get a Quote →]
```
- **Boxes mega-menu** (4 columns):
  - Rigid Boxes: Magnetic Closure, Lid & Base, Drawer, Book Style, Shoulder-Neck, Tube, Window, Collapsible Rigid
  - Printed Boxes: Mailer, Tuck End, Folding Carton, Shipping, Display, Pillow, Sleeve, Gable
  - More: Materials, Finishes, Inserts, Samples, All Boxes
  - Promo card (blue-50): "Collapsible rigid boxes ship flat" + small illustration + link
- **Services menu**: Brand Identity, Logo Design, Packaging Design, Label Design, Structural & Dieline Design, 3D Mockups & Renders, Packages
- **Industries menu**: 12 industries in 2 columns + "All industries"
- Mobile: hamburger → full-screen drawer with accordion groups, big tap targets, sticky "Get a Quote" at bottom.

**Footer** (Klein Blue, white text):
- Col 1: logo (white), one-line pitch, socials, newsletter email field + button.
- Col 2 Boxes, Col 3 Services, Col 4 Company (About, Factory, How It Works, Work, Shipping, FAQ, Blog, Contact), Col 5 Contact (WhatsApp, email, address, hours).
- Bottom bar: © year The World of Packaging · Privacy · Terms · Sitemap.

---

## 6. Homepage (`/`), in this exact order

1. **Hero** (white with soft blue-50/silver background shapes)
   - Eyebrow: "Packaging design + manufacturing"
   - H1: "Custom boxes that make your brand **unforgettable**." (highlight word orange)
   - Lead: "Brand identity, packaging design and rigid boxes made in our own factory. From first sketch to delivery, worldwide."
   - Buttons: Get a Quote (primary), Explore Boxes (secondary)
   - Trust row: Own factory · MOQ 500 · Collapsible rigid boxes · Ships worldwide (orange dots)
   - Right: large composition illustration (magnetic rigid box open with insert, a mailer, a small orange box), floating tag chips ("2 mm greyboard", "Gold foil", "Ships flat"). Media slot `home-hero`.
2. **Client logo marquee**: "Trusted by growing brands" (placeholder logos, flagged).
3. **Shop by box type**: SectionHeader "Boxes for every **product**"; Tabs Rigid / Printed; 8 ProductCards per tab; "View all boxes" link.
4. **Services** (silver bg): "Design, branding and **production**"; 3 big ServiceCards: Brand Identity, Packaging Design, Box Manufacturing; each with 3 bullet sub-services.
5. **Collapsible feature** (Klein Blue): eyebrow "Ships flat", H2 "Rigid when it arrives. **Flat** when it ships."; 3 benefits (less freight volume, cheaper storage, assembles in seconds); illustration flat + assembled; CTA "See collapsible boxes" (accent) + "Get a quote" (white).
6. **Why choose us**: 6 feature cards in 3×2 grid: Own factory, MOQ 500, Free design support, Sample before production, Premium finishes, Worldwide shipping. Side image `home-factory`.
7. **Featured work**: 3 CaseCards + "View all work".
8. **How it works**: StepList 4 steps: Share your brief → Design & sample → Production → Delivery. CTA "See full process".
9. **Industries**: "Packaging for your **industry**"; 12 IndustryCards grid (4×3 desktop, 2 cols mobile).
10. **Finishes strip**: 6 small cards (Foil stamping, Embossing, Spot UV, Soft-touch, Window patch, Custom inserts) with illustration + one line.
11. **Testimonials** (3 placeholder cards, flagged) and **FAQ** (6 questions) side by side on desktop.
12. **CTABand**: "Ready to create your **packaging**?" + "Free design check · Sample before production" + Get a Quote (accent) + WhatsApp (white).

---

## 7. Page templates

### 7.1 Box style page (`/rigid-boxes/[slug]`, `/printed-boxes/[slug]`)
1. Breadcrumbs
2. **Product hero** (2 cols): left gallery (main image + 4 thumbnails, all media slots); right: tag (Rigid/Printed), H1 name, 2-line description, key specs chips (MOQ, Lead time, Material, Print), bullet list of 4 highlights, buttons Get a Quote + Request Sample, small line "Free design support included".
3. **Customize your box**: 6 option cards: Sizes (custom L×W×H), Materials/board, Printing, Finishes, Inserts, Closure/Add-ons (each lists options).
4. **Features**: 4 icon features specific to style.
5. **Gallery**: 6 images grid.
6. **Specifications**: SpecTable (style-specific: board thickness, wrap/stock, print method, finishes, MOQ, lead time, shipping assembled/flat).
7. **Perfect for**: industry chips linking to industry pages.
8. **How to order**: 4 steps.
9. **FAQ**: 5 questions specific to the style.
10. **Related boxes**: 4 ProductCards.
11. CTABand.

### 7.2 Hub page (`/boxes`, `/rigid-boxes`, `/printed-boxes`, `/services`, `/industries`)
Hero (H1, lead, CTA, illustration) → intro benefits (3–4 points) → filterable grid of children (Tabs) → supporting section (materials/finishes or process) → FAQ (5) → CTABand.

### 7.3 Service page (`/services/[slug]`)
Hero (H1, lead, Start a Project + See work, illustration) → What you get (deliverables checklist in 2 cols) → Our process for this service (StepList) → Related work (3 CaseCards) → "Pair it with production" (links to box pages) → Starting price card (TODO value, "Get exact quote") → FAQ (5) → CTABand.

### 7.4 Industry page (`/industries/[slug]`)
Hero → Packaging needs for this industry (3–4 cards: protection, shelf appeal, compliance notes [placeholder wording to verify], unboxing) → Recommended boxes (4–6 ProductCards) → Finishes that work (chips) → Case study (1 card) → FAQ (5) → CTABand.

### 7.5 Case study (`/work/[slug]`)
Hero image (radius 24) → meta row (Client, Industry, Services, Year) → Challenge → Solution → image grid (4–6) → Results (3 StatCards, placeholders) → Next project → CTABand.

---

## 8. Media system (real photos later, no code changes)

- `src/content/media.ts`: `Record<string, { alt: string; src?: string; illustration: IllustrationKey; variant?: string; aspect: "16/9"|"4/3"|"1/1"|"3/4" }>`.
- `<Media slot="rigid-magnetic-hero" />`: renders `next/image` if `src` exists, else the illustration in the same aspect box.
- Real photos path: `/public/images/<section>/<slot>.webp`. To swap: add file, set `src`.
- Generate `MEDIA_SLOTS.md` listing every slot: id, page, aspect, recommended size (min 2000px wide for heroes), and a one-line shot description (e.g. "Magnetic rigid box open, product in EVA insert, on Pale Silver background, soft light").

---

## 9. Complete page list (all must be finished)

### Core
- `/` Home (section 6)
- `/get-a-quote` Quote builder (section 10)
- `/start-a-project` Design/branding project brief form (section 10)
- `/samples` Sample box: what's included, price TODO, credited to bulk order, form
- `/contact` Form + WhatsApp, email, phone (as visible copyable text), address, hours, map link (no iframe)

### Boxes
- `/boxes` hub (all 16 styles with Rigid/Printed tabs)
- `/rigid-boxes` hub + 8 pages: `magnetic-closure`, `lid-and-base`, `drawer`, `book-style`, `shoulder-neck`, `tube`, `window`, `collapsible`
- `/printed-boxes` hub + 8 pages: `mailer`, `tuck-end`, `folding-carton`, `shipping`, `display`, `pillow`, `sleeve`, `gable`
- `/collapsible-rigid-boxes` landing: hero, pinned flat→assembled GSAP animation, freight comparison (example figures labelled "example"), available styles, industries, FAQ, CTA. (`/rigid-boxes/collapsible` links here or shares content.)
- `/materials`: kraft, corrugated (E/B flute), SBS paperboard, rigid greyboard (1.5–3 mm), specialty papers, linen, leatherette, recycled/FSC options (wording TODO verify)
- `/finishes`: foil stamping, embossing/debossing, spot UV, matte/gloss lamination, soft-touch, window patch, ribbon, magnets
- `/inserts`: EVA foam, velvet/flocked, cardboard, satin, molded pulp

### Services
- `/services` hub
- `/services/brand-identity`, `/services/logo-design`, `/services/packaging-design`, `/services/label-design`, `/services/structural-dieline-design`, `/services/3d-mockups`
- `/packages`: 3 bundle cards (Box Ready, Launch [most popular, orange badge], Full System), what's included, comparison table, FAQ, CTA. Prices "Quoted per project" until I give numbers.

### Industries
- `/industries` hub + 12: `cosmetics`, `perfume`, `jewelry`, `watches`, `supplements`, `food-bakery`, `chocolates`, `cbd`, `candles`, `apparel`, `electronics`, `gifts-pr-kits`

### Work
- `/work` with filters (All, Branding, Packaging, Rigid, Printed); 6 placeholder projects with fictional names, `placeholder: true`, small "Sample project" badge
- `/work/[slug]` for all 6

### Company
- `/about`: story, mission, what makes us different, numbers (placeholders), team (placeholders), values, factory preview, CTA
- `/factory`: capabilities (machine list placeholders), production steps (cut → print → wrap → corner → insert → QC → pack), quality control checklist, capacity (TODO), sustainability (TODO wording), gallery
- `/how-it-works`: 6 detailed steps (Brief → Design → Sample → Approval → Production → Shipping), timeline example, what we need from you, FAQ
- `/shipping`: air vs sea comparison, assembled vs flat (collapsible), packing, duties/DDP note (TODO verify), countries
- `/ship-to/usa`, `/uk`, `/canada`, `/australia`, `/uae`, `/germany`: market-specific shipping times (TODO), currency, popular box styles there, FAQ
- `/faq`: grouped tabs (Ordering, Design, Production, Shipping, Payment), 25+ questions total
- `/blog` + 3 articles (MDX): "Rigid vs folding carton boxes", "How to measure your box size", "Collapsible rigid boxes explained"
- `/privacy`, `/terms` (template text flagged for legal review), custom `not-found`
- `/design-system` (noindex): all tokens and components for review

---

## 10. Forms

### 10.1 Quote builder (`/get-a-quote`)
Multi-step with progress bar and live summary sidebar (sticky desktop, collapsible bottom sheet mobile):
1. Box category: Rigid / Collapsible rigid / Printed / Not sure
2. Style (cards with illustrations, filtered by category)
3. Size: L × W × H with mm/inch toggle, or "Help me choose"
4. Quantity: 500 / 1,000 / 2,500 / 5,000 / custom (min = MOQ for rigid)
5. Material & finishes (multi-select chips)
6. Artwork: "I have artwork" (file upload UI) / "Free basic setup" / "I need full packaging design"
7. Shipping: country select, air or sea, assembled or flat (collapsible only)
8. Contact: name, email, company, WhatsApp (optional), notes
9. Review & submit → success screen ("We'll reply {site.facts.quoteReply}") with WhatsApp button.
Validation with Zod; state in Zustand; Framer Motion step transitions.

### 10.2 Start a project (`/start-a-project`)
Steps: About you → Your brand (new/existing, website/links) → Services needed (multi: Brand identity, Logo, Packaging design, Labels, Production) → Product & quantity → Timeline → Budget range → Files/links → Review.

### 10.3 Submission
Next.js server action: validate, then `// TODO send via Resend + store in CRM`; for now log and return success. Include honeypot field and basic rate limit. Inline contact forms (homepage CTA, contact page, samples) use the same action.

---

## 11. Copy guidelines
- English, clear, confident, short sentences. Speak to founders and brand managers.
- Use real packaging terms correctly (greyboard, wrap paper, E-flute, dieline, foil stamping, debossing, EVA insert, CMYK/Pantone).
- Avoid buzzwords: "elevate", "unleash", "seamless", "cutting-edge", "game-changer".
- Every page: one clear H1, clear next step.
- Unknown numbers/claims → `TODO` in content files and neutral wording on page.

---

## 12. SEO, accessibility, performance
- `generateMetadata` per page from content + `site`; title pattern "{Page} | The World of Packaging".
- `opengraph-image.tsx` per route group in brand style (blue bg, white title, orange accent).
- JSON-LD: Organization, WebSite, BreadcrumbList, Product (box styles), Service, FAQPage, Article.
- `app/sitemap.ts`, `app/robots.ts` (`/design-system` noindex), canonical URLs.
- Internal links: every box page ↔ related boxes, industries, services; every industry ↔ recommended boxes.
- Accessibility: semantic landmarks, keyboard-operable menus/tabs/accordions, focus states, alt text from media.ts, AA contrast, labelled form fields, skip link.
- Performance: Lighthouse mobile ≥ 90; lazy-load below-fold motion; `next/image` everywhere; no layout shift from fonts.
- Analytics: GA4 ID from env, loads only after cookie consent banner (Accept/Decline).
- `.env.example` documented.

---

## 13. Checks after every phase
- `npm run lint` and `npm run build` pass.
- No horizontal scroll at 375px; menus usable on mobile.
- All new pages reachable from navigation or hubs; no broken links (write a quick script that crawls `generateStaticParams` routes and internal hrefs).
- Reduced-motion mode shows all content.
- Report: finished URLs, placeholders added, questions for me.

---

## 14. Phases

1. **Design system & foundation**: tokens (Tailwind + CSS vars), fonts, `site.ts`, Logo, all UI components (4.4), Media system + first 8 illustrations, `/design-system` page. **Stop for review.**
2. **Layout & homepage**: utility bar, header + 3 mega menus, mobile drawer, footer, WhatsApp float, full homepage (section 6) with motion.
3. **Boxes**: `/boxes`, rigid hub + 8, printed hub + 8, collapsible landing, materials, finishes, inserts, samples; remaining illustrations.
4. **Services**: services hub + 6 services, packages.
5. **Industries**: hub + 12.
6. **Work & company**: work + 6 case studies, about, factory, how it works, shipping + 6 ship-to pages, FAQ, contact, blog + 3 articles, privacy, terms, 404.
7. **Conversion**: quote builder, start-a-project, form actions, success states.
8. **SEO & polish**: metadata, OG images, JSON-LD, sitemap/robots, accessibility and performance pass, link crawl, `MEDIA_SLOTS.md`, `CONTENT_TODO.md`, final report with every URL.

**Start with Phase 1 now.**
