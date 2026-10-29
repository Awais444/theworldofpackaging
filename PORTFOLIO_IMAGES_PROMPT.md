# Prompt: add portfolio_images.rar + put the best photos on the homepage

Attach `portfolio_images.rar` to Claude Code together with this prompt.

```
I've attached portfolio_images.rar (38 photos). Add them, then use the best photos from ALL batches on the homepage, which still shows mostly illustrations.

STEP 0 — CHECK THE HOMEPAGE FIRST
List every homepage section and whether each image slot shows a photo or an illustration. Current state (from a live check):
- Hero: photo ✓
- "Packaging design for every product" (12 service cards): illustrations only
- "Why packaging fails on shelf": illustrations
- "Design, branding and production" (3 service cards): illustrations
- "Boxes for every product": photos ✓
- "Rigid when it arrives. Flat when it ships." (collapsible): illustration — keep (no collapsible photo yet)
- "One team from sketch to delivered box" (why us): illustrations
- "Packaging we have made": photos ✓
- "Four steps to your boxes": 1 photo
- "Packaging for your industry" (12 cards): illustrations only
- "Details people notice" (finishes): illustrations — keep (no finish photos yet)
- Guides teaser: illustrations — keep
Confirm or correct this list before changing anything.

STEP 1 — EXTRACT & CONVERT THIS BATCH
Extract into ./_incoming4/ (gitignored, delete after). Open each file and confirm it matches the description; if not, tell me instead of guessing. Convert with sharp: WebP, 2400px + 1200px card version, quality 80, strip metadata.

Main visuals:
01241454 capsule sachets in 5 colours on white boxes → design/capsule-sachets-colour-range.webp → supplement packaging design, pouch & sachet design
0dd086fd espresso coffee bag with illustrated print → design/espresso-bag-illustrated.webp → coffee-tea packaging design
1665086c small white carton among leaves → printed/white-carton-botanical.webp → skincare / CBD packaging design gallery
1978669b CBD salve jars + cartons on orange → design/salve-jars-cartons-orange.webp → CBD packaging design, jar label design
1d714199 gin bottle with label, water splash → design/gin-bottle-label-splash.webp → bottle label design, wine-spirits label design
22188f0a lipstick/cosmetic cartons on white → printed/lipstick-cartons.webp → makeup packaging design
246c3adf stacked green skincare cartons → printed/green-skincare-cartons-stack.webp → cosmetic packaging design, skincare packaging design
255d1ba3 coffee tin held in hand → design/coffee-tin-in-hand.webp → can & tin packaging design, coffee-tea gallery
25c36eaa stacked burgundy cosmetic cartons on pink → printed/burgundy-cosmetic-cartons.webp → cosmetic packaging design, /printed-boxes/folding-carton
26211ae3 teal/white skincare cartons with stones → printed/skincare-cartons-teal.webp → skincare packaging design
337e1551 tea/coffee carton held at shelf → printed/carton-at-retail-shelf.webp → retail packaging design
353b8830 serum bottles + illustrated cartons → design/serum-bottles-illustrated-cartons.webp → skincare packaging design, bottle label design
4354f949 tall white argan oil cartons → printed/argan-oil-cartons.webp → hair care packaging design
679f3370 coffee bags on wooden shelf → design/coffee-bags-shelf.webp → coffee-tea gallery
6a4f6b6c coffee tin on desk → design/coffee-tin-desk.webp → can & tin packaging design
83c2e962 Turkish coffee pouches on yellow → design/coffee-pouches-yellow.webp → pouch packaging design
88a9c03c illustrated chocolate bar wrap on cocoa → design/chocolate-wrap-illustrated.webp → chocolate packaging design
8b794c0b minimal skincare cartons on white → printed/minimal-skincare-cartons.webp → skincare packaging design gallery
a36bc379 coffee shop shelf wall → printed/coffee-shop-shelf.webp → retail packaging design gallery
a7b85a04 chocolate bar wrappers on wood → design/chocolate-bars-on-wood.webp → chocolate packaging design gallery
b088adef chocolate bar with bird illustration → design/chocolate-wrap-bird.webp → chocolate packaging design (hero candidate)
b4a1567a soap + body wash bottle with ribbon → design/soap-bottle-gift.webp → soap & bath packaging design
b7a85e02 floral printed mailer box in grass → printed/floral-mailer-outdoor.webp → /printed-boxes/mailer, unboxing packaging design
bc22220a red snack pouches at a stall → design/snack-pouches-red.webp → snack packaging design
c09d8133 white skincare cartons in copper basket → printed/white-skincare-cartons-basket.webp → skincare packaging design gallery
c24c0195 coffee pouch on desk → design/coffee-pouch-desk.webp → coffee-tea gallery
d84cca32 minimal white candle carton → printed/minimal-candle-carton.webp → candle packaging design
d87e2967 green CBD cartons grid → printed/cbd-cartons-green-grid.webp → CBD packaging design (hero candidate)
df2d0b72 CBD tincture bottles + cartons → design/cbd-tinctures-cartons.webp → CBD packaging design gallery
e8be7b03 open printed box of wrapped sweets → printed/sweets-box-open.webp → bakery-confectionery packaging design
ef9796b7 coffee bag being heat-sealed → design/coffee-bag-sealing.webp → pouch packaging design; /factory page (production)
efb05e64 kraft coffee sachets ×3 → design/kraft-coffee-sachets.webp → pouch & sachet design
f98ac9a8 two coffee bags on brick wall → design/coffee-bags-brick.webp → coffee-tea packaging design
fda3023a black/yellow serum cartons + bottle → printed/serum-cartons-black-yellow.webp → skincare / CBD packaging design

Secondary gallery only (1200px, not hero, not homepage, not /work), neutral alt without brand names:
5c978555 pink cookie box → printed/pink-cookie-box.webp → bakery packaging design gallery
f1b3bdff row of coconut water cartons → design/beverage-cartons-row.webp → beverage packaging design gallery
8fa2bed0 pile of candy wrappers → design/candy-wrappers-pile.webp → confectionery packaging design gallery

Skip: 6cf25526 (duplicate of 25c36eaa).

STEP 2 — HOMEPAGE: replace illustrations with the best photos from all batches
- "Packaging design for every product" (12 cards):
  Cosmetic → green-skincare-cartons-stack · Skincare → skincare-cartons-teal · Makeup → lipstick-cartons · Food/Snack → gummy-stand-up-pouches · Coffee & Tea → espresso-bag-illustrated · Chocolate → chocolate-wrap-bird · Supplement → capsule-sachets-colour-range · CBD → cbd-cartons-green-grid · Candle → candle-rigid-lid-box · Bottle labels → gin-bottle-label-splash · Pouches → coffee-pouches-yellow · Rigid & luxury → magnetic-closure-navy-gold
- "Design, branding and production" (3 cards): Brand identity → coffee-brand-packaging-range · Packaging design → burgundy-cosmetic-cartons · Box manufacturing → magnetic-closure-navy-gold (or lid-and-base photo)
- "One team from sketch to delivered box" (why us): side image → coffee-bag-sealing (shows production)
- "Packaging for your industry" (12 cards): Cosmetics → green-skincare-cartons-stack · Perfume → serum-bottles-illustrated-cartons · Jewellery/Gifts → floral-printed-gift-box · Supplements → flat-bottom-pouches · Food & Bakery → sweets-box-open · Chocolates → chocolate-wrap-illustrated · CBD → salve-jars-cartons-orange · Candles → home-fragrance-range · Apparel → bow-tie-gift-boxes · Electronics → teal-printed-mailer · Coffee & Tea → coffee-bags-brick · Pharmaceutical → capsule-sachets-colour-range
- "Packaging we have made" (featured work): keep current 3, but make sure each card uses a different photo (no repeat of the hero image).
- Keep illustrations for: collapsible section, finishes, guides, "Why packaging fails".
- Never use the same photo twice on the homepage. If two cards above share a photo, pick the next best from the batches and tell me.
- Cards: object-fit cover, consistent aspect (4:3 for service/industry cards), subtle hover zoom (scale 1.04), 1200px versions, lazy-load below the fold.

STEP 3 — INNER PAGES
Place this batch's photos on the pages listed in STEP 1 (fill illustration slots first; replace an existing photo only if clearly better; list replacements).

RULES
- These are category visuals; not in /work, testimonials, "our client/project" copy, or /blog.
- Add this batch to "confirm stock licence" in CONTENT_TODO.md; list the 3 secondary images under "third-party brands visible".
- Run lint + build, then send: a full homepage screenshot (1440) and mobile (375), plus a list of every homepage slot with the photo now used.
```
