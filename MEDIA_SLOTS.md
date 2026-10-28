# Media slots (shot list)

Generated from `src/content/media.ts`. Every image on the site is one of these 469 slots. Until a photo exists, each slot shows a brand illustration in the same aspect ratio.

## How to add a real photo

1. Shoot to the size below (heroes at least 2000 px wide) and export as WebP.
2. Save it as `/public/images/<section>/<slot-id>.webp`.
3. Set `src` on the slot in `src/content/media.ts` (fixed slots) or add it to the `photos` map in the same file (generated style, case, industry, service and factory slots).

Nothing else changes: `<Media slot="…" />` switches from the illustration to the photo, and the alt text below is used.

General direction: Pale Silver (#E7EAEC) or white backgrounds, soft daylight, real products in the boxes, no props that hide the box.

## Homepage

| Slot id | Page | Aspect | Size (px) | Now | Shot description | Alt text |
| --- | --- | --- | --- | --- | --- | --- |
| `home-factory` | / | 3/4 | 1600×2130 | Illustration | Operator wrapping rigid boxes at a workbench, finished boxes stacked beside, warm daylight | Rigid boxes being wrapped and finished on our factory floor |
| `home-hero` | / | 4/3 | 2400×1800 still, or 1920×1440 video loop (5–8 s, muted) | Illustration | Three finished boxes (rigid gift box, mailer, tube) on a white or light grey backdrop, soft daylight | A rigid gift box, a mailer box and a tube, made in our factory |

## Rigid box pages

| Slot id | Page | Aspect | Size (px) | Now | Shot description | Alt text |
| --- | --- | --- | --- | --- | --- | --- |
| `collapsible-flat` | /collapsible-rigid-boxes | 4/3 | 2400×1800 | Illustration | Stack of flat-packed collapsible boxes on a pallet or table, side light showing thickness | Three collapsible rigid boxes packed flat and stacked |
| `rigid-book-style-gallery-1` | /rigid-boxes/book-style | 4/3 | 2400×1800 | Illustration | Book Style Box, three-quarter view, lid closed | Book Style Box: three-quarter view, lid closed |
| `rigid-book-style-gallery-2` | /rigid-boxes/book-style | 4/3 | 2400×1800 | Illustration | Book Style Box, open, product in insert | Book Style Box: open, product in insert |
| `rigid-book-style-gallery-3` | /rigid-boxes/book-style | 4/3 | 2400×1800 | Illustration | Book Style Box, detail: corner, wrap and finish close-up | Book Style Box: detail: corner, wrap and finish close-up |
| `rigid-book-style-gallery-4` | /rigid-boxes/book-style | 4/3 | 2400×1800 | Illustration | Book Style Box, top view showing the foil logo | Book Style Box: top view showing the foil logo |
| `rigid-book-style-gallery-5` | /rigid-boxes/book-style | 4/3 | 2400×1800 | Illustration | Book Style Box, stack of finished boxes | Book Style Box: stack of finished boxes |
| `rigid-book-style-gallery-6` | /rigid-boxes/book-style | 4/3 | 2400×1800 | Illustration | Book Style Box, in a customer's hands | Book Style Box: in a customer's hands |
| `rigid-book-style-hero` | /rigid-boxes/book-style | 4/3 | 2400×1800 | Illustration | Book Style Box on a Pale Silver background, soft light | Book Style Box, made in our factory |
| `rigid-collapsible-gallery-1` | /rigid-boxes/collapsible | 4/3 | 2400×1800 | Illustration | Collapsible Rigid Box, three-quarter view, lid closed | Collapsible Rigid Box: three-quarter view, lid closed |
| `rigid-collapsible-gallery-2` | /rigid-boxes/collapsible | 4/3 | 2400×1800 | Illustration | Collapsible Rigid Box, open, product in insert | Collapsible Rigid Box: open, product in insert |
| `rigid-collapsible-gallery-3` | /rigid-boxes/collapsible | 4/3 | 2400×1800 | Illustration | Collapsible Rigid Box, detail: corner, wrap and finish close-up | Collapsible Rigid Box: detail: corner, wrap and finish close-up |
| `rigid-collapsible-gallery-4` | /rigid-boxes/collapsible | 4/3 | 2400×1800 | Illustration | Collapsible Rigid Box, top view showing the foil logo | Collapsible Rigid Box: top view showing the foil logo |
| `rigid-collapsible-gallery-5` | /rigid-boxes/collapsible | 4/3 | 2400×1800 | Illustration | Collapsible Rigid Box, stack of finished boxes | Collapsible Rigid Box: stack of finished boxes |
| `rigid-collapsible-gallery-6` | /rigid-boxes/collapsible | 4/3 | 2400×1800 | Illustration | Collapsible Rigid Box, in a customer's hands | Collapsible Rigid Box: in a customer's hands |
| `rigid-collapsible-hero` | /rigid-boxes/collapsible | 4/3 | 2400×1800 | Illustration | Collapsible Rigid Box on a Pale Silver background, soft light | Collapsible Rigid Box, made in our factory |
| `rigid-drawer-gallery-1` | /rigid-boxes/drawer | 4/3 | 2400×1800 | Illustration | Drawer Box, three-quarter view, lid closed | Drawer Box: three-quarter view, lid closed |
| `rigid-drawer-gallery-2` | /rigid-boxes/drawer | 4/3 | 2400×1800 | Illustration | Drawer Box, open, product in insert | Drawer Box: open, product in insert |
| `rigid-drawer-gallery-3` | /rigid-boxes/drawer | 4/3 | 2400×1800 | Illustration | Drawer Box, detail: corner, wrap and finish close-up | Drawer Box: detail: corner, wrap and finish close-up |
| `rigid-drawer-gallery-4` | /rigid-boxes/drawer | 4/3 | 2400×1800 | Illustration | Drawer Box, top view showing the foil logo | Drawer Box: top view showing the foil logo |
| `rigid-drawer-gallery-5` | /rigid-boxes/drawer | 4/3 | 2400×1800 | Illustration | Drawer Box, stack of finished boxes | Drawer Box: stack of finished boxes |
| `rigid-drawer-gallery-6` | /rigid-boxes/drawer | 4/3 | 2400×1800 | Illustration | Drawer Box, in a customer's hands | Drawer Box: in a customer's hands |
| `rigid-drawer-hero` | /rigid-boxes/drawer | 4/3 | 2400×1800 | Illustration | Drawer Box on a Pale Silver background, soft light | Drawer Box, made in our factory |
| `rigid-lid-and-base-gallery-1` | /rigid-boxes/lid-and-base | 4/3 | 2400×1800 | Illustration | Lid & Base Box, three-quarter view, lid closed | Lid & Base Box: three-quarter view, lid closed |
| `rigid-lid-and-base-gallery-2` | /rigid-boxes/lid-and-base | 4/3 | 2400×1800 | Illustration | Lid & Base Box, open, product in insert | Lid & Base Box: open, product in insert |
| `rigid-lid-and-base-gallery-3` | /rigid-boxes/lid-and-base | 4/3 | 2400×1800 | Illustration | Lid & Base Box, detail: corner, wrap and finish close-up | Lid & Base Box: detail: corner, wrap and finish close-up |
| `rigid-lid-and-base-gallery-4` | /rigid-boxes/lid-and-base | 4/3 | 2400×1800 | Illustration | Lid & Base Box, top view showing the foil logo | Lid & Base Box: top view showing the foil logo |
| `rigid-lid-and-base-gallery-5` | /rigid-boxes/lid-and-base | 4/3 | 2400×1800 | Illustration | Lid & Base Box, stack of finished boxes | Lid & Base Box: stack of finished boxes |
| `rigid-lid-and-base-gallery-6` | /rigid-boxes/lid-and-base | 4/3 | 2400×1800 | Illustration | Lid & Base Box, in a customer's hands | Lid & Base Box: in a customer's hands |
| `rigid-lid-and-base-hero` | /rigid-boxes/lid-and-base | 4/3 | 2400×1800 | Illustration | Lid & Base Box on a Pale Silver background, soft light | Lid & Base Box, made in our factory |
| `rigid-magnetic-closure-gallery-1` | /rigid-boxes/magnetic-closure | 4/3 | 2400×1800 | Illustration | Magnetic Closure Box, three-quarter view, lid closed | Magnetic Closure Box: three-quarter view, lid closed |
| `rigid-magnetic-closure-gallery-2` | /rigid-boxes/magnetic-closure | 4/3 | 2400×1800 | Illustration | Magnetic Closure Box, open, product in insert | Magnetic Closure Box: open, product in insert |
| `rigid-magnetic-closure-gallery-3` | /rigid-boxes/magnetic-closure | 4/3 | 2400×1800 | Illustration | Magnetic Closure Box, detail: corner, wrap and finish close-up | Magnetic Closure Box: detail: corner, wrap and finish close-up |
| `rigid-magnetic-closure-gallery-4` | /rigid-boxes/magnetic-closure | 4/3 | 2400×1800 | Illustration | Magnetic Closure Box, top view showing the foil logo | Magnetic Closure Box: top view showing the foil logo |
| `rigid-magnetic-closure-gallery-5` | /rigid-boxes/magnetic-closure | 4/3 | 2400×1800 | Illustration | Magnetic Closure Box, stack of finished boxes | Magnetic Closure Box: stack of finished boxes |
| `rigid-magnetic-closure-gallery-6` | /rigid-boxes/magnetic-closure | 4/3 | 2400×1800 | Illustration | Magnetic Closure Box, in a customer's hands | Magnetic Closure Box: in a customer's hands |
| `rigid-magnetic-closure-hero` | /rigid-boxes/magnetic-closure | 4/3 | 2400×1800 | Illustration | Magnetic Closure Box on a Pale Silver background, soft light | Magnetic Closure Box, made in our factory |
| `rigid-shoulder-neck-gallery-1` | /rigid-boxes/shoulder-neck | 4/3 | 2400×1800 | Illustration | Shoulder Neck Box, three-quarter view, lid closed | Shoulder Neck Box: three-quarter view, lid closed |
| `rigid-shoulder-neck-gallery-2` | /rigid-boxes/shoulder-neck | 4/3 | 2400×1800 | Illustration | Shoulder Neck Box, open, product in insert | Shoulder Neck Box: open, product in insert |
| `rigid-shoulder-neck-gallery-3` | /rigid-boxes/shoulder-neck | 4/3 | 2400×1800 | Illustration | Shoulder Neck Box, detail: corner, wrap and finish close-up | Shoulder Neck Box: detail: corner, wrap and finish close-up |
| `rigid-shoulder-neck-gallery-4` | /rigid-boxes/shoulder-neck | 4/3 | 2400×1800 | Illustration | Shoulder Neck Box, top view showing the foil logo | Shoulder Neck Box: top view showing the foil logo |
| `rigid-shoulder-neck-gallery-5` | /rigid-boxes/shoulder-neck | 4/3 | 2400×1800 | Illustration | Shoulder Neck Box, stack of finished boxes | Shoulder Neck Box: stack of finished boxes |
| `rigid-shoulder-neck-gallery-6` | /rigid-boxes/shoulder-neck | 4/3 | 2400×1800 | Illustration | Shoulder Neck Box, in a customer's hands | Shoulder Neck Box: in a customer's hands |
| `rigid-shoulder-neck-hero` | /rigid-boxes/shoulder-neck | 4/3 | 2400×1800 | Illustration | Shoulder Neck Box on a Pale Silver background, soft light | Shoulder Neck Box, made in our factory |
| `rigid-tube-gallery-1` | /rigid-boxes/tube | 4/3 | 2400×1800 | Illustration | Rigid Tube, three-quarter view, lid closed | Rigid Tube: three-quarter view, lid closed |
| `rigid-tube-gallery-2` | /rigid-boxes/tube | 4/3 | 2400×1800 | Illustration | Rigid Tube, open, product in insert | Rigid Tube: open, product in insert |
| `rigid-tube-gallery-3` | /rigid-boxes/tube | 4/3 | 2400×1800 | Illustration | Rigid Tube, detail: corner, wrap and finish close-up | Rigid Tube: detail: corner, wrap and finish close-up |
| `rigid-tube-gallery-4` | /rigid-boxes/tube | 4/3 | 2400×1800 | Illustration | Rigid Tube, top view showing the foil logo | Rigid Tube: top view showing the foil logo |
| `rigid-tube-gallery-5` | /rigid-boxes/tube | 4/3 | 2400×1800 | Illustration | Rigid Tube, stack of finished boxes | Rigid Tube: stack of finished boxes |
| `rigid-tube-gallery-6` | /rigid-boxes/tube | 4/3 | 2400×1800 | Illustration | Rigid Tube, in a customer's hands | Rigid Tube: in a customer's hands |
| `rigid-tube-hero` | /rigid-boxes/tube | 4/3 | 2400×1800 | Illustration | Rigid Tube on a Pale Silver background, soft light | Rigid Tube, made in our factory |
| `rigid-window-gallery-1` | /rigid-boxes/window | 4/3 | 2400×1800 | Illustration | Window Rigid Box, three-quarter view, lid closed | Window Rigid Box: three-quarter view, lid closed |
| `rigid-window-gallery-2` | /rigid-boxes/window | 4/3 | 2400×1800 | Illustration | Window Rigid Box, open, product in insert | Window Rigid Box: open, product in insert |
| `rigid-window-gallery-3` | /rigid-boxes/window | 4/3 | 2400×1800 | Illustration | Window Rigid Box, detail: corner, wrap and finish close-up | Window Rigid Box: detail: corner, wrap and finish close-up |
| `rigid-window-gallery-4` | /rigid-boxes/window | 4/3 | 2400×1800 | Illustration | Window Rigid Box, top view showing the foil logo | Window Rigid Box: top view showing the foil logo |
| `rigid-window-gallery-5` | /rigid-boxes/window | 4/3 | 2400×1800 | Illustration | Window Rigid Box, stack of finished boxes | Window Rigid Box: stack of finished boxes |
| `rigid-window-gallery-6` | /rigid-boxes/window | 4/3 | 2400×1800 | Illustration | Window Rigid Box, in a customer's hands | Window Rigid Box: in a customer's hands |
| `rigid-window-hero` | /rigid-boxes/window | 4/3 | 2400×1800 | Illustration | Window Rigid Box on a Pale Silver background, soft light | Window Rigid Box, made in our factory |

## Printed box pages

| Slot id | Page | Aspect | Size (px) | Now | Shot description | Alt text |
| --- | --- | --- | --- | --- | --- | --- |
| `printed-display-gallery-1` | /printed-boxes/display | 4/3 | 2400×1800 | Illustration | Display Box, printed detail close-up | Display Box: printed detail close-up |
| `printed-display-gallery-2` | /printed-boxes/display | 4/3 | 2400×1800 | Illustration | Display Box, packed with product | Display Box: packed with product |
| `printed-display-gallery-3` | /printed-boxes/display | 4/3 | 2400×1800 | Illustration | Display Box, open, inside print visible | Display Box: open, inside print visible |
| `printed-display-gallery-4` | /printed-boxes/display | 4/3 | 2400×1800 | Illustration | Display Box, flat sheet before folding | Display Box: flat sheet before folding |
| `printed-display-gallery-5` | /printed-boxes/display | 4/3 | 2400×1800 | Illustration | Display Box, stack of finished boxes | Display Box: stack of finished boxes |
| `printed-display-gallery-6` | /printed-boxes/display | 4/3 | 2400×1800 | Illustration | Display Box, in use | Display Box: in use |
| `printed-display-hero` | /printed-boxes/display | 4/3 | 2400×1800 | Illustration | Display Box on a Pale Silver background, soft light | Printed display box |
| `printed-folding-carton-gallery-1` | /printed-boxes/folding-carton | 4/3 | 2400×1800 | Illustration | Folding Carton, printed detail close-up | Folding Carton: printed detail close-up |
| `printed-folding-carton-gallery-2` | /printed-boxes/folding-carton | 4/3 | 2400×1800 | Illustration | Folding Carton, packed with product | Folding Carton: packed with product |
| `printed-folding-carton-gallery-3` | /printed-boxes/folding-carton | 4/3 | 2400×1800 | Illustration | Folding Carton, open, inside print visible | Folding Carton: open, inside print visible |
| `printed-folding-carton-gallery-4` | /printed-boxes/folding-carton | 4/3 | 2400×1800 | Illustration | Folding Carton, flat sheet before folding | Folding Carton: flat sheet before folding |
| `printed-folding-carton-gallery-5` | /printed-boxes/folding-carton | 4/3 | 2400×1800 | Illustration | Folding Carton, stack of finished boxes | Folding Carton: stack of finished boxes |
| `printed-folding-carton-gallery-6` | /printed-boxes/folding-carton | 4/3 | 2400×1800 | Illustration | Folding Carton, in use | Folding Carton: in use |
| `printed-folding-carton-hero` | /printed-boxes/folding-carton | 4/3 | 2400×1800 | Illustration | Folding Carton on a Pale Silver background, soft light | Printed folding carton |
| `printed-gable-gallery-1` | /printed-boxes/gable | 4/3 | 2400×1800 | Illustration | Gable Box, printed detail close-up | Gable Box: printed detail close-up |
| `printed-gable-gallery-2` | /printed-boxes/gable | 4/3 | 2400×1800 | Illustration | Gable Box, packed with product | Gable Box: packed with product |
| `printed-gable-gallery-3` | /printed-boxes/gable | 4/3 | 2400×1800 | Illustration | Gable Box, open, inside print visible | Gable Box: open, inside print visible |
| `printed-gable-gallery-4` | /printed-boxes/gable | 4/3 | 2400×1800 | Illustration | Gable Box, flat sheet before folding | Gable Box: flat sheet before folding |
| `printed-gable-gallery-5` | /printed-boxes/gable | 4/3 | 2400×1800 | Illustration | Gable Box, stack of finished boxes | Gable Box: stack of finished boxes |
| `printed-gable-gallery-6` | /printed-boxes/gable | 4/3 | 2400×1800 | Illustration | Gable Box, in use | Gable Box: in use |
| `printed-gable-hero` | /printed-boxes/gable | 4/3 | 2400×1800 | Illustration | Gable Box on a Pale Silver background, soft light | Printed gable box |
| `printed-mailer-gallery-1` | /printed-boxes/mailer | 4/3 | 2400×1800 | Illustration | Mailer Box, printed detail close-up | Mailer Box: printed detail close-up |
| `printed-mailer-gallery-2` | /printed-boxes/mailer | 4/3 | 2400×1800 | Illustration | Mailer Box, packed with product | Mailer Box: packed with product |
| `printed-mailer-gallery-3` | /printed-boxes/mailer | 4/3 | 2400×1800 | Illustration | Mailer Box, open, inside print visible | Mailer Box: open, inside print visible |
| `printed-mailer-gallery-4` | /printed-boxes/mailer | 4/3 | 2400×1800 | Illustration | Mailer Box, flat sheet before folding | Mailer Box: flat sheet before folding |
| `printed-mailer-gallery-5` | /printed-boxes/mailer | 4/3 | 2400×1800 | Illustration | Mailer Box, stack of finished boxes | Mailer Box: stack of finished boxes |
| `printed-mailer-gallery-6` | /printed-boxes/mailer | 4/3 | 2400×1800 | Illustration | Mailer Box, in use | Mailer Box: in use |
| `printed-mailer-hero` | /printed-boxes/mailer | 4/3 | 2400×1800 | Illustration | Printed mailer box closed on paper-coloured backdrop, logo visible on lid | Printed corrugated mailer box with a logo on the lid |
| `printed-pillow-gallery-1` | /printed-boxes/pillow | 4/3 | 2400×1800 | Illustration | Pillow Box, printed detail close-up | Pillow Box: printed detail close-up |
| `printed-pillow-gallery-2` | /printed-boxes/pillow | 4/3 | 2400×1800 | Illustration | Pillow Box, packed with product | Pillow Box: packed with product |
| `printed-pillow-gallery-3` | /printed-boxes/pillow | 4/3 | 2400×1800 | Illustration | Pillow Box, open, inside print visible | Pillow Box: open, inside print visible |
| `printed-pillow-gallery-4` | /printed-boxes/pillow | 4/3 | 2400×1800 | Illustration | Pillow Box, flat sheet before folding | Pillow Box: flat sheet before folding |
| `printed-pillow-gallery-5` | /printed-boxes/pillow | 4/3 | 2400×1800 | Illustration | Pillow Box, stack of finished boxes | Pillow Box: stack of finished boxes |
| `printed-pillow-gallery-6` | /printed-boxes/pillow | 4/3 | 2400×1800 | Illustration | Pillow Box, in use | Pillow Box: in use |
| `printed-pillow-hero` | /printed-boxes/pillow | 4/3 | 2400×1800 | Illustration | Pillow Box on a Pale Silver background, soft light | Printed pillow box |
| `printed-shipping-gallery-1` | /printed-boxes/shipping | 4/3 | 2400×1800 | Illustration | Shipping Carton, printed detail close-up | Shipping Carton: printed detail close-up |
| `printed-shipping-gallery-2` | /printed-boxes/shipping | 4/3 | 2400×1800 | Illustration | Shipping Carton, packed with product | Shipping Carton: packed with product |
| `printed-shipping-gallery-3` | /printed-boxes/shipping | 4/3 | 2400×1800 | Illustration | Shipping Carton, open, inside print visible | Shipping Carton: open, inside print visible |
| `printed-shipping-gallery-4` | /printed-boxes/shipping | 4/3 | 2400×1800 | Illustration | Shipping Carton, flat sheet before folding | Shipping Carton: flat sheet before folding |
| `printed-shipping-gallery-5` | /printed-boxes/shipping | 4/3 | 2400×1800 | Illustration | Shipping Carton, stack of finished boxes | Shipping Carton: stack of finished boxes |
| `printed-shipping-gallery-6` | /printed-boxes/shipping | 4/3 | 2400×1800 | Illustration | Shipping Carton, in use | Shipping Carton: in use |
| `printed-shipping-hero` | /printed-boxes/shipping | 4/3 | 2400×1800 | Illustration | Shipping Carton on a Pale Silver background, soft light | Printed shipping carton |
| `printed-sleeve-gallery-1` | /printed-boxes/sleeve | 4/3 | 2400×1800 | Illustration | Sleeve Box, printed detail close-up | Sleeve Box: printed detail close-up |
| `printed-sleeve-gallery-2` | /printed-boxes/sleeve | 4/3 | 2400×1800 | Illustration | Sleeve Box, packed with product | Sleeve Box: packed with product |
| `printed-sleeve-gallery-3` | /printed-boxes/sleeve | 4/3 | 2400×1800 | Illustration | Sleeve Box, open, inside print visible | Sleeve Box: open, inside print visible |
| `printed-sleeve-gallery-4` | /printed-boxes/sleeve | 4/3 | 2400×1800 | Illustration | Sleeve Box, flat sheet before folding | Sleeve Box: flat sheet before folding |
| `printed-sleeve-gallery-5` | /printed-boxes/sleeve | 4/3 | 2400×1800 | Illustration | Sleeve Box, stack of finished boxes | Sleeve Box: stack of finished boxes |
| `printed-sleeve-gallery-6` | /printed-boxes/sleeve | 4/3 | 2400×1800 | Illustration | Sleeve Box, in use | Sleeve Box: in use |
| `printed-sleeve-hero` | /printed-boxes/sleeve | 4/3 | 2400×1800 | Illustration | Sleeve Box on a Pale Silver background, soft light | Printed sleeve box |
| `printed-tuck-end-gallery-1` | /printed-boxes/tuck-end | 4/3 | 2400×1800 | Illustration | Tuck End Box, printed detail close-up | Tuck End Box: printed detail close-up |
| `printed-tuck-end-gallery-2` | /printed-boxes/tuck-end | 4/3 | 2400×1800 | Illustration | Tuck End Box, packed with product | Tuck End Box: packed with product |
| `printed-tuck-end-gallery-3` | /printed-boxes/tuck-end | 4/3 | 2400×1800 | Illustration | Tuck End Box, open, inside print visible | Tuck End Box: open, inside print visible |
| `printed-tuck-end-gallery-4` | /printed-boxes/tuck-end | 4/3 | 2400×1800 | Illustration | Tuck End Box, flat sheet before folding | Tuck End Box: flat sheet before folding |
| `printed-tuck-end-gallery-5` | /printed-boxes/tuck-end | 4/3 | 2400×1800 | Illustration | Tuck End Box, stack of finished boxes | Tuck End Box: stack of finished boxes |
| `printed-tuck-end-gallery-6` | /printed-boxes/tuck-end | 4/3 | 2400×1800 | Illustration | Tuck End Box, in use | Tuck End Box: in use |
| `printed-tuck-end-hero` | /printed-boxes/tuck-end | 4/3 | 2400×1800 | Illustration | Tuck End Box on a Pale Silver background, soft light | Printed tuck end box |
| `printed-window-gallery-1` | /printed-boxes/window | 4/3 | 2400×1800 | Illustration | Window Box, printed detail close-up | Window Box: printed detail close-up |
| `printed-window-gallery-2` | /printed-boxes/window | 4/3 | 2400×1800 | Illustration | Window Box, packed with product | Window Box: packed with product |
| `printed-window-gallery-3` | /printed-boxes/window | 4/3 | 2400×1800 | Illustration | Window Box, open, inside print visible | Window Box: open, inside print visible |
| `printed-window-gallery-4` | /printed-boxes/window | 4/3 | 2400×1800 | Illustration | Window Box, flat sheet before folding | Window Box: flat sheet before folding |
| `printed-window-gallery-5` | /printed-boxes/window | 4/3 | 2400×1800 | Illustration | Window Box, stack of finished boxes | Window Box: stack of finished boxes |
| `printed-window-gallery-6` | /printed-boxes/window | 4/3 | 2400×1800 | Illustration | Window Box, in use | Window Box: in use |
| `printed-window-hero` | /printed-boxes/window | 4/3 | 2400×1800 | Illustration | Window Box on a Pale Silver background, soft light | Printed window box |

## Service pages

| Slot id | Page | Aspect | Size (px) | Now | Shot description | Alt text |
| --- | --- | --- | --- | --- | --- | --- |
| `service-amazon-packaging-and-listing-images-hero` | /services/amazon-packaging-and-listing-images | 4/3 | 2400×1800 | Illustration | Representative amazon packaging & listing images work from a real project | Amazon Packaging & Listing Images: example deliverable |
| `service-brand-identity-hero` | /services/brand-identity | 4/3 | 2400×1800 | Illustration | Representative brand identity work from a real project | Brand Identity: example deliverable |
| `service-logo-design-hero` | /services/logo-design | 4/3 | 2400×1800 | Illustration | Representative logo design work from a real project | Logo Design: example deliverable |
| `service-product-mockups-for-ecommerce-hero` | /services/product-mockups-for-ecommerce | 4/3 | 2400×1800 | Illustration | Representative product mockups for e-commerce work from a real project | Product Mockups for E-commerce: example deliverable |

## Industry pages

| Slot id | Page | Aspect | Size (px) | Now | Shot description | Alt text |
| --- | --- | --- | --- | --- | --- | --- |
| `industry-apparel-hero` | /industries/apparel | 4/3 | 2400×1800 | Illustration | Apparel product in its box, styled for the category | Apparel packaging made in our factory |
| `industry-candles-hero` | /industries/candles | 4/3 | 2400×1800 | Illustration | Candles product in its box, styled for the category | Candles packaging made in our factory |
| `industry-cbd-hero` | /industries/cbd | 4/3 | 2400×1800 | Illustration | CBD product in its box, styled for the category | CBD packaging made in our factory |
| `industry-chocolates-hero` | /industries/chocolates | 4/3 | 2400×1800 | Illustration | Chocolates product in its box, styled for the category | Chocolates packaging made in our factory |
| `industry-cosmetics-hero` | /industries/cosmetics | 4/3 | 2400×1800 | Illustration | Cosmetics product in its box, styled for the category | Cosmetics packaging made in our factory |
| `industry-electronics-hero` | /industries/electronics | 4/3 | 2400×1800 | Illustration | Electronics product in its box, styled for the category | Electronics packaging made in our factory |
| `industry-food-bakery-hero` | /industries/food-bakery | 4/3 | 2400×1800 | Illustration | Food & Bakery product in its box, styled for the category | Food & Bakery packaging made in our factory |
| `industry-gifts-pr-kits-hero` | /industries/gifts-pr-kits | 4/3 | 2400×1800 | Illustration | PR Kits & Gifts product in its box, styled for the category | PR Kits & Gifts packaging made in our factory |
| `industry-jewelry-hero` | /industries/jewelry | 4/3 | 2400×1800 | Illustration | Jewellery product in its box, styled for the category | Jewellery packaging made in our factory |
| `industry-perfume-hero` | /industries/perfume | 4/3 | 2400×1800 | Illustration | Perfume product in its box, styled for the category | Perfume packaging made in our factory |
| `industry-supplements-hero` | /industries/supplements | 4/3 | 2400×1800 | Illustration | Supplements product in its box, styled for the category | Supplements packaging made in our factory |
| `industry-watches-hero` | /industries/watches | 4/3 | 2400×1800 | Illustration | Watches product in its box, styled for the category | Watches packaging made in our factory |

## Case studies

| Slot id | Page | Aspect | Size (px) | Now | Shot description | Alt text |
| --- | --- | --- | --- | --- | --- | --- |
| `case-halden-apothecary-cover` | /work/halden-apothecary, /work, / | 4/3 | 2400×1800 | Illustration | Hero shot of the finished magnetic closure for Halden Apothecary | Halden Apothecary: a skincare launch |
| `case-halden-apothecary-gallery-1` | /work/halden-apothecary | 4/3 | 2400×1800 | Illustration | Halden Apothecary, identity applied: logo, palette, stationery or labels | Halden Apothecary: identity applied: logo, palette, stationery or labels |
| `case-halden-apothecary-gallery-2` | /work/halden-apothecary | 4/3 | 2400×1800 | Illustration | Halden Apothecary, finished packaging, open, with product | Halden Apothecary: finished packaging, open, with product |
| `case-halden-apothecary-gallery-3` | /work/halden-apothecary | 4/3 | 2400×1800 | Illustration | Halden Apothecary, detail: finish and print close-up | Halden Apothecary: detail: finish and print close-up |
| `case-halden-apothecary-gallery-4` | /work/halden-apothecary | 4/3 | 2400×1800 | Illustration | Halden Apothecary, the range together | Halden Apothecary: the range together |
| `case-halden-apothecary-gallery-5` | /work/halden-apothecary | 4/3 | 2400×1800 | Illustration | Halden Apothecary, on our factory floor | Halden Apothecary: on our factory floor |
| `case-halden-apothecary-gallery-6` | /work/halden-apothecary | 4/3 | 2400×1800 | Illustration | Halden Apothecary, in the customer's hands | Halden Apothecary: in the customer's hands |
| `case-kiri-atelier-cover` | /work/kiri-atelier, /work, / | 4/3 | 2400×1800 | Illustration | Hero shot of the finished drawer box for Kiri Atelier | Kiri Atelier: a wordmark, palette and pattern system for a small-batch jeweller, built to work at ring-box scale. |
| `case-kiri-atelier-gallery-1` | /work/kiri-atelier | 4/3 | 2400×1800 | Illustration | Kiri Atelier, identity applied: logo, palette, stationery or labels | Kiri Atelier: identity applied: logo, palette, stationery or labels |
| `case-kiri-atelier-gallery-2` | /work/kiri-atelier | 4/3 | 2400×1800 | Illustration | Kiri Atelier, finished packaging, open, with product | Kiri Atelier: finished packaging, open, with product |
| `case-kiri-atelier-gallery-3` | /work/kiri-atelier | 4/3 | 2400×1800 | Illustration | Kiri Atelier, detail: finish and print close-up | Kiri Atelier: detail: finish and print close-up |
| `case-kiri-atelier-gallery-4` | /work/kiri-atelier | 4/3 | 2400×1800 | Illustration | Kiri Atelier, the range together | Kiri Atelier: the range together |
| `case-kiri-atelier-gallery-5` | /work/kiri-atelier | 4/3 | 2400×1800 | Illustration | Kiri Atelier, on our factory floor | Kiri Atelier: on our factory floor |
| `case-kiri-atelier-gallery-6` | /work/kiri-atelier | 4/3 | 2400×1800 | Illustration | Kiri Atelier, in the customer's hands | Kiri Atelier: in the customer's hands |
| `case-marrow-and-vale-cover` | /work/marrow-and-vale, /work, / | 4/3 | 2400×1800 | Illustration | Hero shot of the finished collapsible rigid for Marrow & Vale | Marrow & Vale: collapsible rigid boxes for a candle brand shipping to the uk and us, packed flat to cut freight. |
| `case-marrow-and-vale-gallery-1` | /work/marrow-and-vale | 4/3 | 2400×1800 | Illustration | Marrow & Vale, identity applied: logo, palette, stationery or labels | Marrow & Vale: identity applied: logo, palette, stationery or labels |
| `case-marrow-and-vale-gallery-2` | /work/marrow-and-vale | 4/3 | 2400×1800 | Illustration | Marrow & Vale, finished packaging, open, with product | Marrow & Vale: finished packaging, open, with product |
| `case-marrow-and-vale-gallery-3` | /work/marrow-and-vale | 4/3 | 2400×1800 | Illustration | Marrow & Vale, detail: finish and print close-up | Marrow & Vale: detail: finish and print close-up |
| `case-marrow-and-vale-gallery-4` | /work/marrow-and-vale | 4/3 | 2400×1800 | Illustration | Marrow & Vale, the range together | Marrow & Vale: the range together |
| `case-marrow-and-vale-gallery-5` | /work/marrow-and-vale | 4/3 | 2400×1800 | Illustration | Marrow & Vale, on our factory floor | Marrow & Vale: on our factory floor |
| `case-marrow-and-vale-gallery-6` | /work/marrow-and-vale | 4/3 | 2400×1800 | Illustration | Marrow & Vale, in the customer's hands | Marrow & Vale: in the customer's hands |
| `case-northline-audio-cover` | /work/northline-audio, /work, / | 4/3 | 2400×1800 | Illustration | Hero shot of the finished lid & base for Northline Audio | Northline Audio: a lid-and-base box with a two-layer eva insert for wireless earbuds, cables and a manual. |
| `case-northline-audio-gallery-1` | /work/northline-audio | 4/3 | 2400×1800 | Illustration | Northline Audio, identity applied: logo, palette, stationery or labels | Northline Audio: identity applied: logo, palette, stationery or labels |
| `case-northline-audio-gallery-2` | /work/northline-audio | 4/3 | 2400×1800 | Illustration | Northline Audio, finished packaging, open, with product | Northline Audio: finished packaging, open, with product |
| `case-northline-audio-gallery-3` | /work/northline-audio | 4/3 | 2400×1800 | Illustration | Northline Audio, detail: finish and print close-up | Northline Audio: detail: finish and print close-up |
| `case-northline-audio-gallery-4` | /work/northline-audio | 4/3 | 2400×1800 | Illustration | Northline Audio, the range together | Northline Audio: the range together |
| `case-northline-audio-gallery-5` | /work/northline-audio | 4/3 | 2400×1800 | Illustration | Northline Audio, on our factory floor | Northline Audio: on our factory floor |
| `case-northline-audio-gallery-6` | /work/northline-audio | 4/3 | 2400×1800 | Illustration | Northline Audio, in the customer's hands | Northline Audio: in the customer's hands |
| `case-ostra-tea-cover` | /work/ostra-tea, /work, / | 4/3 | 2400×1800 | Illustration | Hero shot of the finished mailer for Ostra Tea Co. | Ostra Tea Co.: subscription mailers printed inside and out, with a dieline built around a tin and two sachets. |
| `case-ostra-tea-gallery-1` | /work/ostra-tea | 4/3 | 2400×1800 | Illustration | Ostra Tea Co., identity applied: logo, palette, stationery or labels | Ostra Tea Co.: identity applied: logo, palette, stationery or labels |
| `case-ostra-tea-gallery-2` | /work/ostra-tea | 4/3 | 2400×1800 | Illustration | Ostra Tea Co., finished packaging, open, with product | Ostra Tea Co.: finished packaging, open, with product |
| `case-ostra-tea-gallery-3` | /work/ostra-tea | 4/3 | 2400×1800 | Illustration | Ostra Tea Co., detail: finish and print close-up | Ostra Tea Co.: detail: finish and print close-up |
| `case-ostra-tea-gallery-4` | /work/ostra-tea | 4/3 | 2400×1800 | Illustration | Ostra Tea Co., the range together | Ostra Tea Co.: the range together |
| `case-ostra-tea-gallery-5` | /work/ostra-tea | 4/3 | 2400×1800 | Illustration | Ostra Tea Co., on our factory floor | Ostra Tea Co.: on our factory floor |
| `case-ostra-tea-gallery-6` | /work/ostra-tea | 4/3 | 2400×1800 | Illustration | Ostra Tea Co., in the customer's hands | Ostra Tea Co.: in the customer's hands |
| `case-sola-botanics-cover` | /work/sola-botanics, /work, / | 4/3 | 2400×1800 | Illustration | Hero shot of the finished tuck end for Sola Botanics | Sola Botanics: labels and tuck end cartons for a six-product supplement range, one system with a colour per product. |
| `case-sola-botanics-gallery-1` | /work/sola-botanics | 4/3 | 2400×1800 | Illustration | Sola Botanics, identity applied: logo, palette, stationery or labels | Sola Botanics: identity applied: logo, palette, stationery or labels |
| `case-sola-botanics-gallery-2` | /work/sola-botanics | 4/3 | 2400×1800 | Illustration | Sola Botanics, finished packaging, open, with product | Sola Botanics: finished packaging, open, with product |
| `case-sola-botanics-gallery-3` | /work/sola-botanics | 4/3 | 2400×1800 | Illustration | Sola Botanics, detail: finish and print close-up | Sola Botanics: detail: finish and print close-up |
| `case-sola-botanics-gallery-4` | /work/sola-botanics | 4/3 | 2400×1800 | Illustration | Sola Botanics, the range together | Sola Botanics: the range together |
| `case-sola-botanics-gallery-5` | /work/sola-botanics | 4/3 | 2400×1800 | Illustration | Sola Botanics, on our factory floor | Sola Botanics: on our factory floor |
| `case-sola-botanics-gallery-6` | /work/sola-botanics | 4/3 | 2400×1800 | Illustration | Sola Botanics, in the customer's hands | Sola Botanics: in the customer's hands |

## Factory and about

| Slot id | Page | Aspect | Size (px) | Now | Shot description | Alt text |
| --- | --- | --- | --- | --- | --- | --- |
| `factory-corner` | /factory | 4/3 | 1600×1200 | Illustration | Corner pasting machine taping a box corner, macro | Factory step: corners |
| `factory-cut` | /factory | 4/3 | 1600×1200 | Illustration | Die cutter or V-groover cutting greyboard, close on the blade | Factory step: cut |
| `factory-insert` | /factory | 4/3 | 1600×1200 | Illustration | Hands placing an EVA insert into a finished box | Factory step: insert |
| `factory-press` | /about, /factory | 16/9 | 2400×1350 | Illustration | Offset press running, operator at delivery end, wide shot, motion in sheets | Four-colour sheet-fed offset press in the factory |
| `factory-qc` | /factory | 4/3 | 1600×1200 | Illustration | Inspector measuring a box with a caliper, checklist in frame | Factory step: qc |
| `factory-wrap` | /factory | 4/3 | 1600×1200 | Illustration | Operator wrapping a tray in printed paper on the gluing machine | Factory step: wrap |

## Other

| Slot id | Page | Aspect | Size (px) | Now | Shot description | Alt text |
| --- | --- | --- | --- | --- | --- | --- |
| `design-3d-packaging-mockups-1` | /packaging-design/3d-packaging-mockups | 4/3 | 2400×1800 | Illustration | 3D Packaging Mockups, hero pack on a Pale Silver background | 3D Packaging Mockups: hero pack on a Pale Silver background |
| `design-3d-packaging-mockups-2` | /packaging-design/3d-packaging-mockups | 4/3 | 2400×1800 | Illustration | 3D Packaging Mockups, range lined up together | 3D Packaging Mockups: range lined up together |
| `design-3d-packaging-mockups-3` | /packaging-design/3d-packaging-mockups | 4/3 | 2400×1800 | Illustration | 3D Packaging Mockups, detail: finish and print close-up | 3D Packaging Mockups: detail: finish and print close-up |
| `design-3d-packaging-mockups-4` | /packaging-design/3d-packaging-mockups | 4/3 | 2400×1800 | Illustration | 3D Packaging Mockups, open, product in pack | 3D Packaging Mockups: open, product in pack |
| `design-3d-packaging-mockups-5` | /packaging-design/3d-packaging-mockups | 4/3 | 2400×1800 | Illustration | 3D Packaging Mockups, in use or on shelf | 3D Packaging Mockups: in use or on shelf |
| `design-3d-packaging-mockups-6` | /packaging-design/3d-packaging-mockups | 4/3 | 2400×1800 | Illustration | 3D Packaging Mockups, flat dieline and artwork | 3D Packaging Mockups: flat dieline and artwork |
| `design-amazon-ecommerce-packaging-design-1` | /packaging-design/amazon-ecommerce-packaging-design | 4/3 | 2400×1800 | Illustration | Amazon & E-commerce Packaging, hero pack on a Pale Silver background | Amazon & E-commerce Packaging Design: hero pack on a Pale Silver background |
| `design-amazon-ecommerce-packaging-design-2` | /packaging-design/amazon-ecommerce-packaging-design | 4/3 | 2400×1800 | Illustration | Amazon & E-commerce Packaging, range lined up together | Amazon & E-commerce Packaging Design: range lined up together |
| `design-amazon-ecommerce-packaging-design-3` | /packaging-design/amazon-ecommerce-packaging-design | 4/3 | 2400×1800 | Illustration | Amazon & E-commerce Packaging, detail: finish and print close-up | Amazon & E-commerce Packaging Design: detail: finish and print close-up |
| `design-amazon-ecommerce-packaging-design-4` | /packaging-design/amazon-ecommerce-packaging-design | 4/3 | 2400×1800 | Illustration | Amazon & E-commerce Packaging, open, product in pack | Amazon & E-commerce Packaging Design: open, product in pack |
| `design-amazon-ecommerce-packaging-design-5` | /packaging-design/amazon-ecommerce-packaging-design | 4/3 | 2400×1800 | Illustration | Amazon & E-commerce Packaging, in use or on shelf | Amazon & E-commerce Packaging Design: in use or on shelf |
| `design-amazon-ecommerce-packaging-design-6` | /packaging-design/amazon-ecommerce-packaging-design | 4/3 | 2400×1800 | Illustration | Amazon & E-commerce Packaging, flat dieline and artwork | Amazon & E-commerce Packaging Design: flat dieline and artwork |
| `design-apparel-packaging-design-1` | /packaging-design/apparel-packaging-design | 4/3 | 2400×1800 | Illustration | Apparel & Fashion Packaging, hero pack on a Pale Silver background | Apparel & Fashion Packaging Design: hero pack on a Pale Silver background |
| `design-apparel-packaging-design-2` | /packaging-design/apparel-packaging-design | 4/3 | 2400×1800 | Illustration | Apparel & Fashion Packaging, range lined up together | Apparel & Fashion Packaging Design: range lined up together |
| `design-apparel-packaging-design-3` | /packaging-design/apparel-packaging-design | 4/3 | 2400×1800 | Illustration | Apparel & Fashion Packaging, detail: finish and print close-up | Apparel & Fashion Packaging Design: detail: finish and print close-up |
| `design-apparel-packaging-design-4` | /packaging-design/apparel-packaging-design | 4/3 | 2400×1800 | Illustration | Apparel & Fashion Packaging, open, product in pack | Apparel & Fashion Packaging Design: open, product in pack |
| `design-apparel-packaging-design-5` | /packaging-design/apparel-packaging-design | 4/3 | 2400×1800 | Illustration | Apparel & Fashion Packaging, in use or on shelf | Apparel & Fashion Packaging Design: in use or on shelf |
| `design-apparel-packaging-design-6` | /packaging-design/apparel-packaging-design | 4/3 | 2400×1800 | Illustration | Apparel & Fashion Packaging, flat dieline and artwork | Apparel & Fashion Packaging Design: flat dieline and artwork |
| `design-baby-product-packaging-design-1` | /packaging-design/baby-product-packaging-design | 4/3 | 2400×1800 | Illustration | Baby Product Packaging, hero pack on a Pale Silver background | Baby Product Packaging Design: hero pack on a Pale Silver background |
| `design-baby-product-packaging-design-2` | /packaging-design/baby-product-packaging-design | 4/3 | 2400×1800 | Illustration | Baby Product Packaging, range lined up together | Baby Product Packaging Design: range lined up together |
| `design-baby-product-packaging-design-3` | /packaging-design/baby-product-packaging-design | 4/3 | 2400×1800 | Illustration | Baby Product Packaging, detail: finish and print close-up | Baby Product Packaging Design: detail: finish and print close-up |
| `design-baby-product-packaging-design-4` | /packaging-design/baby-product-packaging-design | 4/3 | 2400×1800 | Illustration | Baby Product Packaging, open, product in pack | Baby Product Packaging Design: open, product in pack |
| `design-baby-product-packaging-design-5` | /packaging-design/baby-product-packaging-design | 4/3 | 2400×1800 | Illustration | Baby Product Packaging, in use or on shelf | Baby Product Packaging Design: in use or on shelf |
| `design-baby-product-packaging-design-6` | /packaging-design/baby-product-packaging-design | 4/3 | 2400×1800 | Illustration | Baby Product Packaging, flat dieline and artwork | Baby Product Packaging Design: flat dieline and artwork |
| `design-bakery-confectionery-packaging-design-1` | /packaging-design/bakery-confectionery-packaging-design | 4/3 | 2400×1800 | Illustration | Bakery & Confectionery Packaging, hero pack on a Pale Silver background | Bakery & Confectionery Packaging Design: hero pack on a Pale Silver background |
| `design-bakery-confectionery-packaging-design-2` | /packaging-design/bakery-confectionery-packaging-design | 4/3 | 2400×1800 | Illustration | Bakery & Confectionery Packaging, range lined up together | Bakery & Confectionery Packaging Design: range lined up together |
| `design-bakery-confectionery-packaging-design-3` | /packaging-design/bakery-confectionery-packaging-design | 4/3 | 2400×1800 | Illustration | Bakery & Confectionery Packaging, detail: finish and print close-up | Bakery & Confectionery Packaging Design: detail: finish and print close-up |
| `design-bakery-confectionery-packaging-design-4` | /packaging-design/bakery-confectionery-packaging-design | 4/3 | 2400×1800 | Illustration | Bakery & Confectionery Packaging, open, product in pack | Bakery & Confectionery Packaging Design: open, product in pack |
| `design-bakery-confectionery-packaging-design-5` | /packaging-design/bakery-confectionery-packaging-design | 4/3 | 2400×1800 | Illustration | Bakery & Confectionery Packaging, in use or on shelf | Bakery & Confectionery Packaging Design: in use or on shelf |
| `design-bakery-confectionery-packaging-design-6` | /packaging-design/bakery-confectionery-packaging-design | 4/3 | 2400×1800 | Illustration | Bakery & Confectionery Packaging, flat dieline and artwork | Bakery & Confectionery Packaging Design: flat dieline and artwork |
| `design-beverage-juice-packaging-design-1` | /packaging-design/beverage-juice-packaging-design | 4/3 | 2400×1800 | Illustration | Beverage & Juice Packaging, hero pack on a Pale Silver background | Beverage & Juice Packaging Design: hero pack on a Pale Silver background |
| `design-beverage-juice-packaging-design-2` | /packaging-design/beverage-juice-packaging-design | 4/3 | 2400×1800 | Illustration | Beverage & Juice Packaging, range lined up together | Beverage & Juice Packaging Design: range lined up together |
| `design-beverage-juice-packaging-design-3` | /packaging-design/beverage-juice-packaging-design | 4/3 | 2400×1800 | Illustration | Beverage & Juice Packaging, detail: finish and print close-up | Beverage & Juice Packaging Design: detail: finish and print close-up |
| `design-beverage-juice-packaging-design-4` | /packaging-design/beverage-juice-packaging-design | 4/3 | 2400×1800 | Illustration | Beverage & Juice Packaging, open, product in pack | Beverage & Juice Packaging Design: open, product in pack |
| `design-beverage-juice-packaging-design-5` | /packaging-design/beverage-juice-packaging-design | 4/3 | 2400×1800 | Illustration | Beverage & Juice Packaging, in use or on shelf | Beverage & Juice Packaging Design: in use or on shelf |
| `design-beverage-juice-packaging-design-6` | /packaging-design/beverage-juice-packaging-design | 4/3 | 2400×1800 | Illustration | Beverage & Juice Packaging, flat dieline and artwork | Beverage & Juice Packaging Design: flat dieline and artwork |
| `design-bottle-label-design-1` | /packaging-design/bottle-label-design | 4/3 | 2400×1800 | Illustration | Bottle Label, hero pack on a Pale Silver background | Bottle Label Design: hero pack on a Pale Silver background |
| `design-bottle-label-design-2` | /packaging-design/bottle-label-design | 4/3 | 2400×1800 | Illustration | Bottle Label, range lined up together | Bottle Label Design: range lined up together |
| `design-bottle-label-design-3` | /packaging-design/bottle-label-design | 4/3 | 2400×1800 | Illustration | Bottle Label, detail: finish and print close-up | Bottle Label Design: detail: finish and print close-up |
| `design-bottle-label-design-4` | /packaging-design/bottle-label-design | 4/3 | 2400×1800 | Illustration | Bottle Label, open, product in pack | Bottle Label Design: open, product in pack |
| `design-bottle-label-design-5` | /packaging-design/bottle-label-design | 4/3 | 2400×1800 | Illustration | Bottle Label, in use or on shelf | Bottle Label Design: in use or on shelf |
| `design-bottle-label-design-6` | /packaging-design/bottle-label-design | 4/3 | 2400×1800 | Illustration | Bottle Label, flat dieline and artwork | Bottle Label Design: flat dieline and artwork |
| `design-box-packaging-design-1` | /packaging-design/box-packaging-design | 4/3 | 2400×1800 | Illustration | Box Packaging, hero pack on a Pale Silver background | Box Packaging Design: hero pack on a Pale Silver background |
| `design-box-packaging-design-2` | /packaging-design/box-packaging-design | 4/3 | 2400×1800 | Illustration | Box Packaging, range lined up together | Box Packaging Design: range lined up together |
| `design-box-packaging-design-3` | /packaging-design/box-packaging-design | 4/3 | 2400×1800 | Illustration | Box Packaging, detail: finish and print close-up | Box Packaging Design: detail: finish and print close-up |
| `design-box-packaging-design-4` | /packaging-design/box-packaging-design | 4/3 | 2400×1800 | Illustration | Box Packaging, open, product in pack | Box Packaging Design: open, product in pack |
| `design-box-packaging-design-5` | /packaging-design/box-packaging-design | 4/3 | 2400×1800 | Illustration | Box Packaging, in use or on shelf | Box Packaging Design: in use or on shelf |
| `design-box-packaging-design-6` | /packaging-design/box-packaging-design | 4/3 | 2400×1800 | Illustration | Box Packaging, flat dieline and artwork | Box Packaging Design: flat dieline and artwork |
| `design-can-tin-design-1` | /packaging-design/can-tin-design | 4/3 | 2400×1800 | Illustration | Can & Tin, hero pack on a Pale Silver background | Can & Tin Design: hero pack on a Pale Silver background |
| `design-can-tin-design-2` | /packaging-design/can-tin-design | 4/3 | 2400×1800 | Illustration | Can & Tin, range lined up together | Can & Tin Design: range lined up together |
| `design-can-tin-design-3` | /packaging-design/can-tin-design | 4/3 | 2400×1800 | Illustration | Can & Tin, detail: finish and print close-up | Can & Tin Design: detail: finish and print close-up |
| `design-can-tin-design-4` | /packaging-design/can-tin-design | 4/3 | 2400×1800 | Illustration | Can & Tin, open, product in pack | Can & Tin Design: open, product in pack |
| `design-can-tin-design-5` | /packaging-design/can-tin-design | 4/3 | 2400×1800 | Illustration | Can & Tin, in use or on shelf | Can & Tin Design: in use or on shelf |
| `design-can-tin-design-6` | /packaging-design/can-tin-design | 4/3 | 2400×1800 | Illustration | Can & Tin, flat dieline and artwork | Can & Tin Design: flat dieline and artwork |
| `design-candle-packaging-design-1` | /packaging-design/candle-packaging-design | 4/3 | 2400×1800 | Illustration | Candle Packaging, hero pack on a Pale Silver background | Candle Packaging Design: hero pack on a Pale Silver background |
| `design-candle-packaging-design-2` | /packaging-design/candle-packaging-design | 4/3 | 2400×1800 | Illustration | Candle Packaging, range lined up together | Candle Packaging Design: range lined up together |
| `design-candle-packaging-design-3` | /packaging-design/candle-packaging-design | 4/3 | 2400×1800 | Illustration | Candle Packaging, detail: finish and print close-up | Candle Packaging Design: detail: finish and print close-up |
| `design-candle-packaging-design-4` | /packaging-design/candle-packaging-design | 4/3 | 2400×1800 | Illustration | Candle Packaging, open, product in pack | Candle Packaging Design: open, product in pack |
| `design-candle-packaging-design-5` | /packaging-design/candle-packaging-design | 4/3 | 2400×1800 | Illustration | Candle Packaging, in use or on shelf | Candle Packaging Design: in use or on shelf |
| `design-candle-packaging-design-6` | /packaging-design/candle-packaging-design | 4/3 | 2400×1800 | Illustration | Candle Packaging, flat dieline and artwork | Candle Packaging Design: flat dieline and artwork |
| `design-cbd-packaging-design-1` | /packaging-design/cbd-packaging-design | 4/3 | 2400×1800 | Illustration | CBD & Hemp Packaging, hero pack on a Pale Silver background | CBD & Hemp Packaging Design: hero pack on a Pale Silver background |
| `design-cbd-packaging-design-2` | /packaging-design/cbd-packaging-design | 4/3 | 2400×1800 | Illustration | CBD & Hemp Packaging, range lined up together | CBD & Hemp Packaging Design: range lined up together |
| `design-cbd-packaging-design-3` | /packaging-design/cbd-packaging-design | 4/3 | 2400×1800 | Illustration | CBD & Hemp Packaging, detail: finish and print close-up | CBD & Hemp Packaging Design: detail: finish and print close-up |
| `design-cbd-packaging-design-4` | /packaging-design/cbd-packaging-design | 4/3 | 2400×1800 | Illustration | CBD & Hemp Packaging, open, product in pack | CBD & Hemp Packaging Design: open, product in pack |
| `design-cbd-packaging-design-5` | /packaging-design/cbd-packaging-design | 4/3 | 2400×1800 | Illustration | CBD & Hemp Packaging, in use or on shelf | CBD & Hemp Packaging Design: in use or on shelf |
| `design-cbd-packaging-design-6` | /packaging-design/cbd-packaging-design | 4/3 | 2400×1800 | Illustration | CBD & Hemp Packaging, flat dieline and artwork | CBD & Hemp Packaging Design: flat dieline and artwork |
| `design-chocolate-packaging-design-1` | /packaging-design/chocolate-packaging-design | 4/3 | 2400×1800 | Illustration | Chocolate Packaging, hero pack on a Pale Silver background | Chocolate Packaging Design: hero pack on a Pale Silver background |
| `design-chocolate-packaging-design-2` | /packaging-design/chocolate-packaging-design | 4/3 | 2400×1800 | Illustration | Chocolate Packaging, range lined up together | Chocolate Packaging Design: range lined up together |
| `design-chocolate-packaging-design-3` | /packaging-design/chocolate-packaging-design | 4/3 | 2400×1800 | Illustration | Chocolate Packaging, detail: finish and print close-up | Chocolate Packaging Design: detail: finish and print close-up |
| `design-chocolate-packaging-design-4` | /packaging-design/chocolate-packaging-design | 4/3 | 2400×1800 | Illustration | Chocolate Packaging, open, product in pack | Chocolate Packaging Design: open, product in pack |
| `design-chocolate-packaging-design-5` | /packaging-design/chocolate-packaging-design | 4/3 | 2400×1800 | Illustration | Chocolate Packaging, in use or on shelf | Chocolate Packaging Design: in use or on shelf |
| `design-chocolate-packaging-design-6` | /packaging-design/chocolate-packaging-design | 4/3 | 2400×1800 | Illustration | Chocolate Packaging, flat dieline and artwork | Chocolate Packaging Design: flat dieline and artwork |
| `design-coffee-tea-packaging-design-1` | /packaging-design/coffee-tea-packaging-design | 4/3 | 2400×1800 | Illustration | Coffee & Tea Packaging, hero pack on a Pale Silver background | Coffee & Tea Packaging Design: hero pack on a Pale Silver background |
| `design-coffee-tea-packaging-design-2` | /packaging-design/coffee-tea-packaging-design | 4/3 | 2400×1800 | Illustration | Coffee & Tea Packaging, range lined up together | Coffee & Tea Packaging Design: range lined up together |
| `design-coffee-tea-packaging-design-3` | /packaging-design/coffee-tea-packaging-design | 4/3 | 2400×1800 | Illustration | Coffee & Tea Packaging, detail: finish and print close-up | Coffee & Tea Packaging Design: detail: finish and print close-up |
| `design-coffee-tea-packaging-design-4` | /packaging-design/coffee-tea-packaging-design | 4/3 | 2400×1800 | Illustration | Coffee & Tea Packaging, open, product in pack | Coffee & Tea Packaging Design: open, product in pack |
| `design-coffee-tea-packaging-design-5` | /packaging-design/coffee-tea-packaging-design | 4/3 | 2400×1800 | Illustration | Coffee & Tea Packaging, in use or on shelf | Coffee & Tea Packaging Design: in use or on shelf |
| `design-coffee-tea-packaging-design-6` | /packaging-design/coffee-tea-packaging-design | 4/3 | 2400×1800 | Illustration | Coffee & Tea Packaging, flat dieline and artwork | Coffee & Tea Packaging Design: flat dieline and artwork |
| `design-cosmetic-packaging-design-1` | /packaging-design/cosmetic-packaging-design | 4/3 | 2400×1800 | Illustration | Cosmetic Packaging, hero pack on a Pale Silver background | Cosmetic Packaging Design: hero pack on a Pale Silver background |
| `design-cosmetic-packaging-design-2` | /packaging-design/cosmetic-packaging-design | 4/3 | 2400×1800 | Illustration | Cosmetic Packaging, range lined up together | Cosmetic Packaging Design: range lined up together |
| `design-cosmetic-packaging-design-3` | /packaging-design/cosmetic-packaging-design | 4/3 | 2400×1800 | Illustration | Cosmetic Packaging, detail: finish and print close-up | Cosmetic Packaging Design: detail: finish and print close-up |
| `design-cosmetic-packaging-design-4` | /packaging-design/cosmetic-packaging-design | 4/3 | 2400×1800 | Illustration | Cosmetic Packaging, open, product in pack | Cosmetic Packaging Design: open, product in pack |
| `design-cosmetic-packaging-design-5` | /packaging-design/cosmetic-packaging-design | 4/3 | 2400×1800 | Illustration | Cosmetic Packaging, in use or on shelf | Cosmetic Packaging Design: in use or on shelf |
| `design-cosmetic-packaging-design-6` | /packaging-design/cosmetic-packaging-design | 4/3 | 2400×1800 | Illustration | Cosmetic Packaging, flat dieline and artwork | Cosmetic Packaging Design: flat dieline and artwork |
| `design-electronics-packaging-design-1` | /packaging-design/electronics-packaging-design | 4/3 | 2400×1800 | Illustration | Electronics Packaging, hero pack on a Pale Silver background | Electronics Packaging Design: hero pack on a Pale Silver background |
| `design-electronics-packaging-design-2` | /packaging-design/electronics-packaging-design | 4/3 | 2400×1800 | Illustration | Electronics Packaging, range lined up together | Electronics Packaging Design: range lined up together |
| `design-electronics-packaging-design-3` | /packaging-design/electronics-packaging-design | 4/3 | 2400×1800 | Illustration | Electronics Packaging, detail: finish and print close-up | Electronics Packaging Design: detail: finish and print close-up |
| `design-electronics-packaging-design-4` | /packaging-design/electronics-packaging-design | 4/3 | 2400×1800 | Illustration | Electronics Packaging, open, product in pack | Electronics Packaging Design: open, product in pack |
| `design-electronics-packaging-design-5` | /packaging-design/electronics-packaging-design | 4/3 | 2400×1800 | Illustration | Electronics Packaging, in use or on shelf | Electronics Packaging Design: in use or on shelf |
| `design-electronics-packaging-design-6` | /packaging-design/electronics-packaging-design | 4/3 | 2400×1800 | Illustration | Electronics Packaging, flat dieline and artwork | Electronics Packaging Design: flat dieline and artwork |
| `design-food-packaging-design-1` | /packaging-design/food-packaging-design | 4/3 | 2400×1800 | Illustration | Food Packaging, hero pack on a Pale Silver background | Food Packaging Design: hero pack on a Pale Silver background |
| `design-food-packaging-design-2` | /packaging-design/food-packaging-design | 4/3 | 2400×1800 | Illustration | Food Packaging, range lined up together | Food Packaging Design: range lined up together |
| `design-food-packaging-design-3` | /packaging-design/food-packaging-design | 4/3 | 2400×1800 | Illustration | Food Packaging, detail: finish and print close-up | Food Packaging Design: detail: finish and print close-up |
| `design-food-packaging-design-4` | /packaging-design/food-packaging-design | 4/3 | 2400×1800 | Illustration | Food Packaging, open, product in pack | Food Packaging Design: open, product in pack |
| `design-food-packaging-design-5` | /packaging-design/food-packaging-design | 4/3 | 2400×1800 | Illustration | Food Packaging, in use or on shelf | Food Packaging Design: in use or on shelf |
| `design-food-packaging-design-6` | /packaging-design/food-packaging-design | 4/3 | 2400×1800 | Illustration | Food Packaging, flat dieline and artwork | Food Packaging Design: flat dieline and artwork |
| `design-gift-box-pr-kit-design-1` | /packaging-design/gift-box-pr-kit-design | 4/3 | 2400×1800 | Illustration | Gift Box & PR Kit, hero pack on a Pale Silver background | Gift Box & PR Kit Design: hero pack on a Pale Silver background |
| `design-gift-box-pr-kit-design-2` | /packaging-design/gift-box-pr-kit-design | 4/3 | 2400×1800 | Illustration | Gift Box & PR Kit, range lined up together | Gift Box & PR Kit Design: range lined up together |
| `design-gift-box-pr-kit-design-3` | /packaging-design/gift-box-pr-kit-design | 4/3 | 2400×1800 | Illustration | Gift Box & PR Kit, detail: finish and print close-up | Gift Box & PR Kit Design: detail: finish and print close-up |
| `design-gift-box-pr-kit-design-4` | /packaging-design/gift-box-pr-kit-design | 4/3 | 2400×1800 | Illustration | Gift Box & PR Kit, open, product in pack | Gift Box & PR Kit Design: open, product in pack |
| `design-gift-box-pr-kit-design-5` | /packaging-design/gift-box-pr-kit-design | 4/3 | 2400×1800 | Illustration | Gift Box & PR Kit, in use or on shelf | Gift Box & PR Kit Design: in use or on shelf |
| `design-gift-box-pr-kit-design-6` | /packaging-design/gift-box-pr-kit-design | 4/3 | 2400×1800 | Illustration | Gift Box & PR Kit, flat dieline and artwork | Gift Box & PR Kit Design: flat dieline and artwork |
| `design-hair-care-packaging-design-1` | /packaging-design/hair-care-packaging-design | 4/3 | 2400×1800 | Illustration | Hair Care Packaging, hero pack on a Pale Silver background | Hair Care Packaging Design: hero pack on a Pale Silver background |
| `design-hair-care-packaging-design-2` | /packaging-design/hair-care-packaging-design | 4/3 | 2400×1800 | Illustration | Hair Care Packaging, range lined up together | Hair Care Packaging Design: range lined up together |
| `design-hair-care-packaging-design-3` | /packaging-design/hair-care-packaging-design | 4/3 | 2400×1800 | Illustration | Hair Care Packaging, detail: finish and print close-up | Hair Care Packaging Design: detail: finish and print close-up |
| `design-hair-care-packaging-design-4` | /packaging-design/hair-care-packaging-design | 4/3 | 2400×1800 | Illustration | Hair Care Packaging, open, product in pack | Hair Care Packaging Design: open, product in pack |
| `design-hair-care-packaging-design-5` | /packaging-design/hair-care-packaging-design | 4/3 | 2400×1800 | Illustration | Hair Care Packaging, in use or on shelf | Hair Care Packaging Design: in use or on shelf |
| `design-hair-care-packaging-design-6` | /packaging-design/hair-care-packaging-design | 4/3 | 2400×1800 | Illustration | Hair Care Packaging, flat dieline and artwork | Hair Care Packaging Design: flat dieline and artwork |
| `design-household-cleaning-packaging-design-1` | /packaging-design/household-cleaning-packaging-design | 4/3 | 2400×1800 | Illustration | Household & Cleaning Product Packaging, hero pack on a Pale Silver background | Household & Cleaning Product Packaging Design: hero pack on a Pale Silver background |
| `design-household-cleaning-packaging-design-2` | /packaging-design/household-cleaning-packaging-design | 4/3 | 2400×1800 | Illustration | Household & Cleaning Product Packaging, range lined up together | Household & Cleaning Product Packaging Design: range lined up together |
| `design-household-cleaning-packaging-design-3` | /packaging-design/household-cleaning-packaging-design | 4/3 | 2400×1800 | Illustration | Household & Cleaning Product Packaging, detail: finish and print close-up | Household & Cleaning Product Packaging Design: detail: finish and print close-up |
| `design-household-cleaning-packaging-design-4` | /packaging-design/household-cleaning-packaging-design | 4/3 | 2400×1800 | Illustration | Household & Cleaning Product Packaging, open, product in pack | Household & Cleaning Product Packaging Design: open, product in pack |
| `design-household-cleaning-packaging-design-5` | /packaging-design/household-cleaning-packaging-design | 4/3 | 2400×1800 | Illustration | Household & Cleaning Product Packaging, in use or on shelf | Household & Cleaning Product Packaging Design: in use or on shelf |
| `design-household-cleaning-packaging-design-6` | /packaging-design/household-cleaning-packaging-design | 4/3 | 2400×1800 | Illustration | Household & Cleaning Product Packaging, flat dieline and artwork | Household & Cleaning Product Packaging Design: flat dieline and artwork |
| `design-jar-label-design-1` | /packaging-design/jar-label-design | 4/3 | 2400×1800 | Illustration | Jar Label, hero pack on a Pale Silver background | Jar Label Design: hero pack on a Pale Silver background |
| `design-jar-label-design-2` | /packaging-design/jar-label-design | 4/3 | 2400×1800 | Illustration | Jar Label, range lined up together | Jar Label Design: range lined up together |
| `design-jar-label-design-3` | /packaging-design/jar-label-design | 4/3 | 2400×1800 | Illustration | Jar Label, detail: finish and print close-up | Jar Label Design: detail: finish and print close-up |
| `design-jar-label-design-4` | /packaging-design/jar-label-design | 4/3 | 2400×1800 | Illustration | Jar Label, open, product in pack | Jar Label Design: open, product in pack |
| `design-jar-label-design-5` | /packaging-design/jar-label-design | 4/3 | 2400×1800 | Illustration | Jar Label, in use or on shelf | Jar Label Design: in use or on shelf |
| `design-jar-label-design-6` | /packaging-design/jar-label-design | 4/3 | 2400×1800 | Illustration | Jar Label, flat dieline and artwork | Jar Label Design: flat dieline and artwork |
| `design-jewelry-packaging-design-1` | /packaging-design/jewelry-packaging-design | 4/3 | 2400×1800 | Illustration | Jewelry Packaging, hero pack on a Pale Silver background | Jewelry Packaging Design: hero pack on a Pale Silver background |
| `design-jewelry-packaging-design-2` | /packaging-design/jewelry-packaging-design | 4/3 | 2400×1800 | Illustration | Jewelry Packaging, range lined up together | Jewelry Packaging Design: range lined up together |
| `design-jewelry-packaging-design-3` | /packaging-design/jewelry-packaging-design | 4/3 | 2400×1800 | Illustration | Jewelry Packaging, detail: finish and print close-up | Jewelry Packaging Design: detail: finish and print close-up |
| `design-jewelry-packaging-design-4` | /packaging-design/jewelry-packaging-design | 4/3 | 2400×1800 | Illustration | Jewelry Packaging, open, product in pack | Jewelry Packaging Design: open, product in pack |
| `design-jewelry-packaging-design-5` | /packaging-design/jewelry-packaging-design | 4/3 | 2400×1800 | Illustration | Jewelry Packaging, in use or on shelf | Jewelry Packaging Design: in use or on shelf |
| `design-jewelry-packaging-design-6` | /packaging-design/jewelry-packaging-design | 4/3 | 2400×1800 | Illustration | Jewelry Packaging, flat dieline and artwork | Jewelry Packaging Design: flat dieline and artwork |
| `design-label-design-1` | /packaging-design/label-design | 4/3 | 2400×1800 | Illustration | Label, hero pack on a Pale Silver background | Label Design: hero pack on a Pale Silver background |
| `design-label-design-2` | /packaging-design/label-design | 4/3 | 2400×1800 | Illustration | Label, range lined up together | Label Design: range lined up together |
| `design-label-design-3` | /packaging-design/label-design | 4/3 | 2400×1800 | Illustration | Label, detail: finish and print close-up | Label Design: detail: finish and print close-up |
| `design-label-design-4` | /packaging-design/label-design | 4/3 | 2400×1800 | Illustration | Label, open, product in pack | Label Design: open, product in pack |
| `design-label-design-5` | /packaging-design/label-design | 4/3 | 2400×1800 | Illustration | Label, in use or on shelf | Label Design: in use or on shelf |
| `design-label-design-6` | /packaging-design/label-design | 4/3 | 2400×1800 | Illustration | Label, flat dieline and artwork | Label Design: flat dieline and artwork |
| `design-luxury-packaging-design-1` | /packaging-design/luxury-packaging-design | 4/3 | 2400×1800 | Illustration | Luxury Packaging, hero pack on a Pale Silver background | Luxury Packaging Design: hero pack on a Pale Silver background |
| `design-luxury-packaging-design-2` | /packaging-design/luxury-packaging-design | 4/3 | 2400×1800 | Illustration | Luxury Packaging, range lined up together | Luxury Packaging Design: range lined up together |
| `design-luxury-packaging-design-3` | /packaging-design/luxury-packaging-design | 4/3 | 2400×1800 | Illustration | Luxury Packaging, detail: finish and print close-up | Luxury Packaging Design: detail: finish and print close-up |
| `design-luxury-packaging-design-4` | /packaging-design/luxury-packaging-design | 4/3 | 2400×1800 | Illustration | Luxury Packaging, open, product in pack | Luxury Packaging Design: open, product in pack |
| `design-luxury-packaging-design-5` | /packaging-design/luxury-packaging-design | 4/3 | 2400×1800 | Illustration | Luxury Packaging, in use or on shelf | Luxury Packaging Design: in use or on shelf |
| `design-luxury-packaging-design-6` | /packaging-design/luxury-packaging-design | 4/3 | 2400×1800 | Illustration | Luxury Packaging, flat dieline and artwork | Luxury Packaging Design: flat dieline and artwork |
| `design-makeup-packaging-design-1` | /packaging-design/makeup-packaging-design | 4/3 | 2400×1800 | Illustration | Makeup Packaging, hero pack on a Pale Silver background | Makeup Packaging Design: hero pack on a Pale Silver background |
| `design-makeup-packaging-design-2` | /packaging-design/makeup-packaging-design | 4/3 | 2400×1800 | Illustration | Makeup Packaging, range lined up together | Makeup Packaging Design: range lined up together |
| `design-makeup-packaging-design-3` | /packaging-design/makeup-packaging-design | 4/3 | 2400×1800 | Illustration | Makeup Packaging, detail: finish and print close-up | Makeup Packaging Design: detail: finish and print close-up |
| `design-makeup-packaging-design-4` | /packaging-design/makeup-packaging-design | 4/3 | 2400×1800 | Illustration | Makeup Packaging, open, product in pack | Makeup Packaging Design: open, product in pack |
| `design-makeup-packaging-design-5` | /packaging-design/makeup-packaging-design | 4/3 | 2400×1800 | Illustration | Makeup Packaging, in use or on shelf | Makeup Packaging Design: in use or on shelf |
| `design-makeup-packaging-design-6` | /packaging-design/makeup-packaging-design | 4/3 | 2400×1800 | Illustration | Makeup Packaging, flat dieline and artwork | Makeup Packaging Design: flat dieline and artwork |
| `design-packaging-brand-strategy-1` | /packaging-design/packaging-brand-strategy | 4/3 | 2400×1800 | Illustration | Packaging Brand Strategy, hero pack on a Pale Silver background | Packaging Brand Strategy: hero pack on a Pale Silver background |
| `design-packaging-brand-strategy-2` | /packaging-design/packaging-brand-strategy | 4/3 | 2400×1800 | Illustration | Packaging Brand Strategy, range lined up together | Packaging Brand Strategy: range lined up together |
| `design-packaging-brand-strategy-3` | /packaging-design/packaging-brand-strategy | 4/3 | 2400×1800 | Illustration | Packaging Brand Strategy, detail: finish and print close-up | Packaging Brand Strategy: detail: finish and print close-up |
| `design-packaging-brand-strategy-4` | /packaging-design/packaging-brand-strategy | 4/3 | 2400×1800 | Illustration | Packaging Brand Strategy, open, product in pack | Packaging Brand Strategy: open, product in pack |
| `design-packaging-brand-strategy-5` | /packaging-design/packaging-brand-strategy | 4/3 | 2400×1800 | Illustration | Packaging Brand Strategy, in use or on shelf | Packaging Brand Strategy: in use or on shelf |
| `design-packaging-brand-strategy-6` | /packaging-design/packaging-brand-strategy | 4/3 | 2400×1800 | Illustration | Packaging Brand Strategy, flat dieline and artwork | Packaging Brand Strategy: flat dieline and artwork |
| `design-packaging-range-design-1` | /packaging-design/packaging-range-design | 4/3 | 2400×1800 | Illustration | Packaging Range & SKU Extension, hero pack on a Pale Silver background | Packaging Range & SKU Extension Design: hero pack on a Pale Silver background |
| `design-packaging-range-design-2` | /packaging-design/packaging-range-design | 4/3 | 2400×1800 | Illustration | Packaging Range & SKU Extension, range lined up together | Packaging Range & SKU Extension Design: range lined up together |
| `design-packaging-range-design-3` | /packaging-design/packaging-range-design | 4/3 | 2400×1800 | Illustration | Packaging Range & SKU Extension, detail: finish and print close-up | Packaging Range & SKU Extension Design: detail: finish and print close-up |
| `design-packaging-range-design-4` | /packaging-design/packaging-range-design | 4/3 | 2400×1800 | Illustration | Packaging Range & SKU Extension, open, product in pack | Packaging Range & SKU Extension Design: open, product in pack |
| `design-packaging-range-design-5` | /packaging-design/packaging-range-design | 4/3 | 2400×1800 | Illustration | Packaging Range & SKU Extension, in use or on shelf | Packaging Range & SKU Extension Design: in use or on shelf |
| `design-packaging-range-design-6` | /packaging-design/packaging-range-design | 4/3 | 2400×1800 | Illustration | Packaging Range & SKU Extension, flat dieline and artwork | Packaging Range & SKU Extension Design: flat dieline and artwork |
| `design-packaging-redesign-1` | /packaging-design/packaging-redesign | 4/3 | 2400×1800 | Illustration | Packaging Redesign, hero pack on a Pale Silver background | Packaging Redesign: hero pack on a Pale Silver background |
| `design-packaging-redesign-2` | /packaging-design/packaging-redesign | 4/3 | 2400×1800 | Illustration | Packaging Redesign, range lined up together | Packaging Redesign: range lined up together |
| `design-packaging-redesign-3` | /packaging-design/packaging-redesign | 4/3 | 2400×1800 | Illustration | Packaging Redesign, detail: finish and print close-up | Packaging Redesign: detail: finish and print close-up |
| `design-packaging-redesign-4` | /packaging-design/packaging-redesign | 4/3 | 2400×1800 | Illustration | Packaging Redesign, open, product in pack | Packaging Redesign: open, product in pack |
| `design-packaging-redesign-5` | /packaging-design/packaging-redesign | 4/3 | 2400×1800 | Illustration | Packaging Redesign, in use or on shelf | Packaging Redesign: in use or on shelf |
| `design-packaging-redesign-6` | /packaging-design/packaging-redesign | 4/3 | 2400×1800 | Illustration | Packaging Redesign, flat dieline and artwork | Packaging Redesign: flat dieline and artwork |
| `design-perfume-packaging-design-1` | /packaging-design/perfume-packaging-design | 4/3 | 2400×1800 | Illustration | Perfume & Fragrance Packaging, hero pack on a Pale Silver background | Perfume & Fragrance Packaging Design: hero pack on a Pale Silver background |
| `design-perfume-packaging-design-2` | /packaging-design/perfume-packaging-design | 4/3 | 2400×1800 | Illustration | Perfume & Fragrance Packaging, range lined up together | Perfume & Fragrance Packaging Design: range lined up together |
| `design-perfume-packaging-design-3` | /packaging-design/perfume-packaging-design | 4/3 | 2400×1800 | Illustration | Perfume & Fragrance Packaging, detail: finish and print close-up | Perfume & Fragrance Packaging Design: detail: finish and print close-up |
| `design-perfume-packaging-design-4` | /packaging-design/perfume-packaging-design | 4/3 | 2400×1800 | Illustration | Perfume & Fragrance Packaging, open, product in pack | Perfume & Fragrance Packaging Design: open, product in pack |
| `design-perfume-packaging-design-5` | /packaging-design/perfume-packaging-design | 4/3 | 2400×1800 | Illustration | Perfume & Fragrance Packaging, in use or on shelf | Perfume & Fragrance Packaging Design: in use or on shelf |
| `design-perfume-packaging-design-6` | /packaging-design/perfume-packaging-design | 4/3 | 2400×1800 | Illustration | Perfume & Fragrance Packaging, flat dieline and artwork | Perfume & Fragrance Packaging Design: flat dieline and artwork |
| `design-pet-product-packaging-design-1` | /packaging-design/pet-product-packaging-design | 4/3 | 2400×1800 | Illustration | Pet Product Packaging, hero pack on a Pale Silver background | Pet Product Packaging Design: hero pack on a Pale Silver background |
| `design-pet-product-packaging-design-2` | /packaging-design/pet-product-packaging-design | 4/3 | 2400×1800 | Illustration | Pet Product Packaging, range lined up together | Pet Product Packaging Design: range lined up together |
| `design-pet-product-packaging-design-3` | /packaging-design/pet-product-packaging-design | 4/3 | 2400×1800 | Illustration | Pet Product Packaging, detail: finish and print close-up | Pet Product Packaging Design: detail: finish and print close-up |
| `design-pet-product-packaging-design-4` | /packaging-design/pet-product-packaging-design | 4/3 | 2400×1800 | Illustration | Pet Product Packaging, open, product in pack | Pet Product Packaging Design: open, product in pack |
| `design-pet-product-packaging-design-5` | /packaging-design/pet-product-packaging-design | 4/3 | 2400×1800 | Illustration | Pet Product Packaging, in use or on shelf | Pet Product Packaging Design: in use or on shelf |
| `design-pet-product-packaging-design-6` | /packaging-design/pet-product-packaging-design | 4/3 | 2400×1800 | Illustration | Pet Product Packaging, flat dieline and artwork | Pet Product Packaging Design: flat dieline and artwork |
| `design-pharmaceutical-packaging-design-1` | /packaging-design/pharmaceutical-packaging-design | 4/3 | 2400×1800 | Illustration | Pharmaceutical Packaging, hero pack on a Pale Silver background | Pharmaceutical Packaging Design: hero pack on a Pale Silver background |
| `design-pharmaceutical-packaging-design-2` | /packaging-design/pharmaceutical-packaging-design | 4/3 | 2400×1800 | Illustration | Pharmaceutical Packaging, range lined up together | Pharmaceutical Packaging Design: range lined up together |
| `design-pharmaceutical-packaging-design-3` | /packaging-design/pharmaceutical-packaging-design | 4/3 | 2400×1800 | Illustration | Pharmaceutical Packaging, detail: finish and print close-up | Pharmaceutical Packaging Design: detail: finish and print close-up |
| `design-pharmaceutical-packaging-design-4` | /packaging-design/pharmaceutical-packaging-design | 4/3 | 2400×1800 | Illustration | Pharmaceutical Packaging, open, product in pack | Pharmaceutical Packaging Design: open, product in pack |
| `design-pharmaceutical-packaging-design-5` | /packaging-design/pharmaceutical-packaging-design | 4/3 | 2400×1800 | Illustration | Pharmaceutical Packaging, in use or on shelf | Pharmaceutical Packaging Design: in use or on shelf |
| `design-pharmaceutical-packaging-design-6` | /packaging-design/pharmaceutical-packaging-design | 4/3 | 2400×1800 | Illustration | Pharmaceutical Packaging, flat dieline and artwork | Pharmaceutical Packaging Design: flat dieline and artwork |
| `design-pouch-sachet-design-1` | /packaging-design/pouch-sachet-design | 4/3 | 2400×1800 | Illustration | Pouch & Sachet, hero pack on a Pale Silver background | Pouch & Sachet Design: hero pack on a Pale Silver background |
| `design-pouch-sachet-design-2` | /packaging-design/pouch-sachet-design | 4/3 | 2400×1800 | Illustration | Pouch & Sachet, range lined up together | Pouch & Sachet Design: range lined up together |
| `design-pouch-sachet-design-3` | /packaging-design/pouch-sachet-design | 4/3 | 2400×1800 | Illustration | Pouch & Sachet, detail: finish and print close-up | Pouch & Sachet Design: detail: finish and print close-up |
| `design-pouch-sachet-design-4` | /packaging-design/pouch-sachet-design | 4/3 | 2400×1800 | Illustration | Pouch & Sachet, open, product in pack | Pouch & Sachet Design: open, product in pack |
| `design-pouch-sachet-design-5` | /packaging-design/pouch-sachet-design | 4/3 | 2400×1800 | Illustration | Pouch & Sachet, in use or on shelf | Pouch & Sachet Design: in use or on shelf |
| `design-pouch-sachet-design-6` | /packaging-design/pouch-sachet-design | 4/3 | 2400×1800 | Illustration | Pouch & Sachet, flat dieline and artwork | Pouch & Sachet Design: flat dieline and artwork |
| `design-retail-display-design-1` | /packaging-design/retail-display-design | 4/3 | 2400×1800 | Illustration | Retail Display, hero pack on a Pale Silver background | Retail Display Design: hero pack on a Pale Silver background |
| `design-retail-display-design-2` | /packaging-design/retail-display-design | 4/3 | 2400×1800 | Illustration | Retail Display, range lined up together | Retail Display Design: range lined up together |
| `design-retail-display-design-3` | /packaging-design/retail-display-design | 4/3 | 2400×1800 | Illustration | Retail Display, detail: finish and print close-up | Retail Display Design: detail: finish and print close-up |
| `design-retail-display-design-4` | /packaging-design/retail-display-design | 4/3 | 2400×1800 | Illustration | Retail Display, open, product in pack | Retail Display Design: open, product in pack |
| `design-retail-display-design-5` | /packaging-design/retail-display-design | 4/3 | 2400×1800 | Illustration | Retail Display, in use or on shelf | Retail Display Design: in use or on shelf |
| `design-retail-display-design-6` | /packaging-design/retail-display-design | 4/3 | 2400×1800 | Illustration | Retail Display, flat dieline and artwork | Retail Display Design: flat dieline and artwork |
| `design-rigid-luxury-box-design-1` | /packaging-design/rigid-luxury-box-design | 4/3 | 2400×1800 | Illustration | Rigid & Luxury Box, hero pack on a Pale Silver background | Rigid & Luxury Box Design: hero pack on a Pale Silver background |
| `design-rigid-luxury-box-design-2` | /packaging-design/rigid-luxury-box-design | 4/3 | 2400×1800 | Illustration | Rigid & Luxury Box, range lined up together | Rigid & Luxury Box Design: range lined up together |
| `design-rigid-luxury-box-design-3` | /packaging-design/rigid-luxury-box-design | 4/3 | 2400×1800 | Illustration | Rigid & Luxury Box, detail: finish and print close-up | Rigid & Luxury Box Design: detail: finish and print close-up |
| `design-rigid-luxury-box-design-4` | /packaging-design/rigid-luxury-box-design | 4/3 | 2400×1800 | Illustration | Rigid & Luxury Box, open, product in pack | Rigid & Luxury Box Design: open, product in pack |
| `design-rigid-luxury-box-design-5` | /packaging-design/rigid-luxury-box-design | 4/3 | 2400×1800 | Illustration | Rigid & Luxury Box, in use or on shelf | Rigid & Luxury Box Design: in use or on shelf |
| `design-rigid-luxury-box-design-6` | /packaging-design/rigid-luxury-box-design | 4/3 | 2400×1800 | Illustration | Rigid & Luxury Box, flat dieline and artwork | Rigid & Luxury Box Design: flat dieline and artwork |
| `design-shoe-box-design-1` | /packaging-design/shoe-box-design | 4/3 | 2400×1800 | Illustration | Shoe Box, hero pack on a Pale Silver background | Shoe Box Design: hero pack on a Pale Silver background |
| `design-shoe-box-design-2` | /packaging-design/shoe-box-design | 4/3 | 2400×1800 | Illustration | Shoe Box, range lined up together | Shoe Box Design: range lined up together |
| `design-shoe-box-design-3` | /packaging-design/shoe-box-design | 4/3 | 2400×1800 | Illustration | Shoe Box, detail: finish and print close-up | Shoe Box Design: detail: finish and print close-up |
| `design-shoe-box-design-4` | /packaging-design/shoe-box-design | 4/3 | 2400×1800 | Illustration | Shoe Box, open, product in pack | Shoe Box Design: open, product in pack |
| `design-shoe-box-design-5` | /packaging-design/shoe-box-design | 4/3 | 2400×1800 | Illustration | Shoe Box, in use or on shelf | Shoe Box Design: in use or on shelf |
| `design-shoe-box-design-6` | /packaging-design/shoe-box-design | 4/3 | 2400×1800 | Illustration | Shoe Box, flat dieline and artwork | Shoe Box Design: flat dieline and artwork |
| `design-shopping-bag-design-1` | /packaging-design/shopping-bag-design | 4/3 | 2400×1800 | Illustration | Bag & Shopping Bag, hero pack on a Pale Silver background | Bag & Shopping Bag Design: hero pack on a Pale Silver background |
| `design-shopping-bag-design-2` | /packaging-design/shopping-bag-design | 4/3 | 2400×1800 | Illustration | Bag & Shopping Bag, range lined up together | Bag & Shopping Bag Design: range lined up together |
| `design-shopping-bag-design-3` | /packaging-design/shopping-bag-design | 4/3 | 2400×1800 | Illustration | Bag & Shopping Bag, detail: finish and print close-up | Bag & Shopping Bag Design: detail: finish and print close-up |
| `design-shopping-bag-design-4` | /packaging-design/shopping-bag-design | 4/3 | 2400×1800 | Illustration | Bag & Shopping Bag, open, product in pack | Bag & Shopping Bag Design: open, product in pack |
| `design-shopping-bag-design-5` | /packaging-design/shopping-bag-design | 4/3 | 2400×1800 | Illustration | Bag & Shopping Bag, in use or on shelf | Bag & Shopping Bag Design: in use or on shelf |
| `design-shopping-bag-design-6` | /packaging-design/shopping-bag-design | 4/3 | 2400×1800 | Illustration | Bag & Shopping Bag, flat dieline and artwork | Bag & Shopping Bag Design: flat dieline and artwork |
| `design-skincare-packaging-design-1` | /packaging-design/skincare-packaging-design | 4/3 | 2400×1800 | Illustration | Skincare Packaging, hero pack on a Pale Silver background | Skincare Packaging Design: hero pack on a Pale Silver background |
| `design-skincare-packaging-design-2` | /packaging-design/skincare-packaging-design | 4/3 | 2400×1800 | Illustration | Skincare Packaging, range lined up together | Skincare Packaging Design: range lined up together |
| `design-skincare-packaging-design-3` | /packaging-design/skincare-packaging-design | 4/3 | 2400×1800 | Illustration | Skincare Packaging, detail: finish and print close-up | Skincare Packaging Design: detail: finish and print close-up |
| `design-skincare-packaging-design-4` | /packaging-design/skincare-packaging-design | 4/3 | 2400×1800 | Illustration | Skincare Packaging, open, product in pack | Skincare Packaging Design: open, product in pack |
| `design-skincare-packaging-design-5` | /packaging-design/skincare-packaging-design | 4/3 | 2400×1800 | Illustration | Skincare Packaging, in use or on shelf | Skincare Packaging Design: in use or on shelf |
| `design-skincare-packaging-design-6` | /packaging-design/skincare-packaging-design | 4/3 | 2400×1800 | Illustration | Skincare Packaging, flat dieline and artwork | Skincare Packaging Design: flat dieline and artwork |
| `design-sleeve-wrap-design-1` | /packaging-design/sleeve-wrap-design | 4/3 | 2400×1800 | Illustration | Sleeve & Wrap, hero pack on a Pale Silver background | Sleeve & Wrap Design: hero pack on a Pale Silver background |
| `design-sleeve-wrap-design-2` | /packaging-design/sleeve-wrap-design | 4/3 | 2400×1800 | Illustration | Sleeve & Wrap, range lined up together | Sleeve & Wrap Design: range lined up together |
| `design-sleeve-wrap-design-3` | /packaging-design/sleeve-wrap-design | 4/3 | 2400×1800 | Illustration | Sleeve & Wrap, detail: finish and print close-up | Sleeve & Wrap Design: detail: finish and print close-up |
| `design-sleeve-wrap-design-4` | /packaging-design/sleeve-wrap-design | 4/3 | 2400×1800 | Illustration | Sleeve & Wrap, open, product in pack | Sleeve & Wrap Design: open, product in pack |
| `design-sleeve-wrap-design-5` | /packaging-design/sleeve-wrap-design | 4/3 | 2400×1800 | Illustration | Sleeve & Wrap, in use or on shelf | Sleeve & Wrap Design: in use or on shelf |
| `design-sleeve-wrap-design-6` | /packaging-design/sleeve-wrap-design | 4/3 | 2400×1800 | Illustration | Sleeve & Wrap, flat dieline and artwork | Sleeve & Wrap Design: flat dieline and artwork |
| `design-snack-packaging-design-1` | /packaging-design/snack-packaging-design | 4/3 | 2400×1800 | Illustration | Snack Packaging, hero pack on a Pale Silver background | Snack Packaging Design: hero pack on a Pale Silver background |
| `design-snack-packaging-design-2` | /packaging-design/snack-packaging-design | 4/3 | 2400×1800 | Illustration | Snack Packaging, range lined up together | Snack Packaging Design: range lined up together |
| `design-snack-packaging-design-3` | /packaging-design/snack-packaging-design | 4/3 | 2400×1800 | Illustration | Snack Packaging, detail: finish and print close-up | Snack Packaging Design: detail: finish and print close-up |
| `design-snack-packaging-design-4` | /packaging-design/snack-packaging-design | 4/3 | 2400×1800 | Illustration | Snack Packaging, open, product in pack | Snack Packaging Design: open, product in pack |
| `design-snack-packaging-design-5` | /packaging-design/snack-packaging-design | 4/3 | 2400×1800 | Illustration | Snack Packaging, in use or on shelf | Snack Packaging Design: in use or on shelf |
| `design-snack-packaging-design-6` | /packaging-design/snack-packaging-design | 4/3 | 2400×1800 | Illustration | Snack Packaging, flat dieline and artwork | Snack Packaging Design: flat dieline and artwork |
| `design-soap-bath-packaging-design-1` | /packaging-design/soap-bath-packaging-design | 4/3 | 2400×1800 | Illustration | Soap & Bath Product Packaging, hero pack on a Pale Silver background | Soap & Bath Product Packaging Design: hero pack on a Pale Silver background |
| `design-soap-bath-packaging-design-2` | /packaging-design/soap-bath-packaging-design | 4/3 | 2400×1800 | Illustration | Soap & Bath Product Packaging, range lined up together | Soap & Bath Product Packaging Design: range lined up together |
| `design-soap-bath-packaging-design-3` | /packaging-design/soap-bath-packaging-design | 4/3 | 2400×1800 | Illustration | Soap & Bath Product Packaging, detail: finish and print close-up | Soap & Bath Product Packaging Design: detail: finish and print close-up |
| `design-soap-bath-packaging-design-4` | /packaging-design/soap-bath-packaging-design | 4/3 | 2400×1800 | Illustration | Soap & Bath Product Packaging, open, product in pack | Soap & Bath Product Packaging Design: open, product in pack |
| `design-soap-bath-packaging-design-5` | /packaging-design/soap-bath-packaging-design | 4/3 | 2400×1800 | Illustration | Soap & Bath Product Packaging, in use or on shelf | Soap & Bath Product Packaging Design: in use or on shelf |
| `design-soap-bath-packaging-design-6` | /packaging-design/soap-bath-packaging-design | 4/3 | 2400×1800 | Illustration | Soap & Bath Product Packaging, flat dieline and artwork | Soap & Bath Product Packaging Design: flat dieline and artwork |
| `design-structural-dieline-design-1` | /packaging-design/structural-dieline-design | 4/3 | 2400×1800 | Illustration | Structural & Dieline, hero pack on a Pale Silver background | Structural & Dieline Design: hero pack on a Pale Silver background |
| `design-structural-dieline-design-2` | /packaging-design/structural-dieline-design | 4/3 | 2400×1800 | Illustration | Structural & Dieline, range lined up together | Structural & Dieline Design: range lined up together |
| `design-structural-dieline-design-3` | /packaging-design/structural-dieline-design | 4/3 | 2400×1800 | Illustration | Structural & Dieline, detail: finish and print close-up | Structural & Dieline Design: detail: finish and print close-up |
| `design-structural-dieline-design-4` | /packaging-design/structural-dieline-design | 4/3 | 2400×1800 | Illustration | Structural & Dieline, open, product in pack | Structural & Dieline Design: open, product in pack |
| `design-structural-dieline-design-5` | /packaging-design/structural-dieline-design | 4/3 | 2400×1800 | Illustration | Structural & Dieline, in use or on shelf | Structural & Dieline Design: in use or on shelf |
| `design-structural-dieline-design-6` | /packaging-design/structural-dieline-design | 4/3 | 2400×1800 | Illustration | Structural & Dieline, flat dieline and artwork | Structural & Dieline Design: flat dieline and artwork |
| `design-subscription-box-design-1` | /packaging-design/subscription-box-design | 4/3 | 2400×1800 | Illustration | Subscription Box, hero pack on a Pale Silver background | Subscription Box Design: hero pack on a Pale Silver background |
| `design-subscription-box-design-2` | /packaging-design/subscription-box-design | 4/3 | 2400×1800 | Illustration | Subscription Box, range lined up together | Subscription Box Design: range lined up together |
| `design-subscription-box-design-3` | /packaging-design/subscription-box-design | 4/3 | 2400×1800 | Illustration | Subscription Box, detail: finish and print close-up | Subscription Box Design: detail: finish and print close-up |
| `design-subscription-box-design-4` | /packaging-design/subscription-box-design | 4/3 | 2400×1800 | Illustration | Subscription Box, open, product in pack | Subscription Box Design: open, product in pack |
| `design-subscription-box-design-5` | /packaging-design/subscription-box-design | 4/3 | 2400×1800 | Illustration | Subscription Box, in use or on shelf | Subscription Box Design: in use or on shelf |
| `design-subscription-box-design-6` | /packaging-design/subscription-box-design | 4/3 | 2400×1800 | Illustration | Subscription Box, flat dieline and artwork | Subscription Box Design: flat dieline and artwork |
| `design-supplement-packaging-design-1` | /packaging-design/supplement-packaging-design | 4/3 | 2400×1800 | Illustration | Supplement & Nutrition Packaging, hero pack on a Pale Silver background | Supplement & Nutrition Packaging Design: hero pack on a Pale Silver background |
| `design-supplement-packaging-design-2` | /packaging-design/supplement-packaging-design | 4/3 | 2400×1800 | Illustration | Supplement & Nutrition Packaging, range lined up together | Supplement & Nutrition Packaging Design: range lined up together |
| `design-supplement-packaging-design-3` | /packaging-design/supplement-packaging-design | 4/3 | 2400×1800 | Illustration | Supplement & Nutrition Packaging, detail: finish and print close-up | Supplement & Nutrition Packaging Design: detail: finish and print close-up |
| `design-supplement-packaging-design-4` | /packaging-design/supplement-packaging-design | 4/3 | 2400×1800 | Illustration | Supplement & Nutrition Packaging, open, product in pack | Supplement & Nutrition Packaging Design: open, product in pack |
| `design-supplement-packaging-design-5` | /packaging-design/supplement-packaging-design | 4/3 | 2400×1800 | Illustration | Supplement & Nutrition Packaging, in use or on shelf | Supplement & Nutrition Packaging Design: in use or on shelf |
| `design-supplement-packaging-design-6` | /packaging-design/supplement-packaging-design | 4/3 | 2400×1800 | Illustration | Supplement & Nutrition Packaging, flat dieline and artwork | Supplement & Nutrition Packaging Design: flat dieline and artwork |
| `design-sustainable-packaging-design-1` | /packaging-design/sustainable-packaging-design | 4/3 | 2400×1800 | Illustration | Sustainable Packaging, hero pack on a Pale Silver background | Sustainable Packaging Design: hero pack on a Pale Silver background |
| `design-sustainable-packaging-design-2` | /packaging-design/sustainable-packaging-design | 4/3 | 2400×1800 | Illustration | Sustainable Packaging, range lined up together | Sustainable Packaging Design: range lined up together |
| `design-sustainable-packaging-design-3` | /packaging-design/sustainable-packaging-design | 4/3 | 2400×1800 | Illustration | Sustainable Packaging, detail: finish and print close-up | Sustainable Packaging Design: detail: finish and print close-up |
| `design-sustainable-packaging-design-4` | /packaging-design/sustainable-packaging-design | 4/3 | 2400×1800 | Illustration | Sustainable Packaging, open, product in pack | Sustainable Packaging Design: open, product in pack |
| `design-sustainable-packaging-design-5` | /packaging-design/sustainable-packaging-design | 4/3 | 2400×1800 | Illustration | Sustainable Packaging, in use or on shelf | Sustainable Packaging Design: in use or on shelf |
| `design-sustainable-packaging-design-6` | /packaging-design/sustainable-packaging-design | 4/3 | 2400×1800 | Illustration | Sustainable Packaging, flat dieline and artwork | Sustainable Packaging Design: flat dieline and artwork |
| `design-toy-game-packaging-design-1` | /packaging-design/toy-game-packaging-design | 4/3 | 2400×1800 | Illustration | Toy & Game Packaging, hero pack on a Pale Silver background | Toy & Game Packaging Design: hero pack on a Pale Silver background |
| `design-toy-game-packaging-design-2` | /packaging-design/toy-game-packaging-design | 4/3 | 2400×1800 | Illustration | Toy & Game Packaging, range lined up together | Toy & Game Packaging Design: range lined up together |
| `design-toy-game-packaging-design-3` | /packaging-design/toy-game-packaging-design | 4/3 | 2400×1800 | Illustration | Toy & Game Packaging, detail: finish and print close-up | Toy & Game Packaging Design: detail: finish and print close-up |
| `design-toy-game-packaging-design-4` | /packaging-design/toy-game-packaging-design | 4/3 | 2400×1800 | Illustration | Toy & Game Packaging, open, product in pack | Toy & Game Packaging Design: open, product in pack |
| `design-toy-game-packaging-design-5` | /packaging-design/toy-game-packaging-design | 4/3 | 2400×1800 | Illustration | Toy & Game Packaging, in use or on shelf | Toy & Game Packaging Design: in use or on shelf |
| `design-toy-game-packaging-design-6` | /packaging-design/toy-game-packaging-design | 4/3 | 2400×1800 | Illustration | Toy & Game Packaging, flat dieline and artwork | Toy & Game Packaging Design: flat dieline and artwork |
| `design-tube-packaging-design-1` | /packaging-design/tube-packaging-design | 4/3 | 2400×1800 | Illustration | Tube Packaging, hero pack on a Pale Silver background | Tube Packaging Design: hero pack on a Pale Silver background |
| `design-tube-packaging-design-2` | /packaging-design/tube-packaging-design | 4/3 | 2400×1800 | Illustration | Tube Packaging, range lined up together | Tube Packaging Design: range lined up together |
| `design-tube-packaging-design-3` | /packaging-design/tube-packaging-design | 4/3 | 2400×1800 | Illustration | Tube Packaging, detail: finish and print close-up | Tube Packaging Design: detail: finish and print close-up |
| `design-tube-packaging-design-4` | /packaging-design/tube-packaging-design | 4/3 | 2400×1800 | Illustration | Tube Packaging, open, product in pack | Tube Packaging Design: open, product in pack |
| `design-tube-packaging-design-5` | /packaging-design/tube-packaging-design | 4/3 | 2400×1800 | Illustration | Tube Packaging, in use or on shelf | Tube Packaging Design: in use or on shelf |
| `design-tube-packaging-design-6` | /packaging-design/tube-packaging-design | 4/3 | 2400×1800 | Illustration | Tube Packaging, flat dieline and artwork | Tube Packaging Design: flat dieline and artwork |
| `design-watch-packaging-design-1` | /packaging-design/watch-packaging-design | 4/3 | 2400×1800 | Illustration | Watch Packaging, hero pack on a Pale Silver background | Watch Packaging Design: hero pack on a Pale Silver background |
| `design-watch-packaging-design-2` | /packaging-design/watch-packaging-design | 4/3 | 2400×1800 | Illustration | Watch Packaging, range lined up together | Watch Packaging Design: range lined up together |
| `design-watch-packaging-design-3` | /packaging-design/watch-packaging-design | 4/3 | 2400×1800 | Illustration | Watch Packaging, detail: finish and print close-up | Watch Packaging Design: detail: finish and print close-up |
| `design-watch-packaging-design-4` | /packaging-design/watch-packaging-design | 4/3 | 2400×1800 | Illustration | Watch Packaging, open, product in pack | Watch Packaging Design: open, product in pack |
| `design-watch-packaging-design-5` | /packaging-design/watch-packaging-design | 4/3 | 2400×1800 | Illustration | Watch Packaging, in use or on shelf | Watch Packaging Design: in use or on shelf |
| `design-watch-packaging-design-6` | /packaging-design/watch-packaging-design | 4/3 | 2400×1800 | Illustration | Watch Packaging, flat dieline and artwork | Watch Packaging Design: flat dieline and artwork |
| `design-wine-spirits-beer-label-design-1` | /packaging-design/wine-spirits-beer-label-design | 4/3 | 2400×1800 | Illustration | Wine, Spirits & Beer Label, hero pack on a Pale Silver background | Wine, Spirits & Beer Label Design: hero pack on a Pale Silver background |
| `design-wine-spirits-beer-label-design-2` | /packaging-design/wine-spirits-beer-label-design | 4/3 | 2400×1800 | Illustration | Wine, Spirits & Beer Label, range lined up together | Wine, Spirits & Beer Label Design: range lined up together |
| `design-wine-spirits-beer-label-design-3` | /packaging-design/wine-spirits-beer-label-design | 4/3 | 2400×1800 | Illustration | Wine, Spirits & Beer Label, detail: finish and print close-up | Wine, Spirits & Beer Label Design: detail: finish and print close-up |
| `design-wine-spirits-beer-label-design-4` | /packaging-design/wine-spirits-beer-label-design | 4/3 | 2400×1800 | Illustration | Wine, Spirits & Beer Label, open, product in pack | Wine, Spirits & Beer Label Design: open, product in pack |
| `design-wine-spirits-beer-label-design-5` | /packaging-design/wine-spirits-beer-label-design | 4/3 | 2400×1800 | Illustration | Wine, Spirits & Beer Label, in use or on shelf | Wine, Spirits & Beer Label Design: in use or on shelf |
| `design-wine-spirits-beer-label-design-6` | /packaging-design/wine-spirits-beer-label-design | 4/3 | 2400×1800 | Illustration | Wine, Spirits & Beer Label, flat dieline and artwork | Wine, Spirits & Beer Label Design: flat dieline and artwork |
| `mega-menu-feature` | Header mega-menu | 4/3 | 1200×900 | Illustration | Magnetic rigid box open, product in insert, dark set, three-quarter view | Open magnetic rigid box with an EVA foam insert holding a product jar |
