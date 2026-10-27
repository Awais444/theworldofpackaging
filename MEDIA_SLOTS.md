# Media slots (shot list)

Generated from `src/content/media.ts`. Every image on the site is one of these 189 slots. Until a photo exists, each slot shows a brand illustration in the same aspect ratio.

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
| `service-3d-mockups-hero` | /services/3d-mockups | 4/3 | 2400×1800 | Illustration | Representative 3d mockups work from a real project | 3D Mockups: example deliverable |
| `service-brand-identity-hero` | /services/brand-identity | 4/3 | 2400×1800 | Illustration | Representative brand identity work from a real project | Brand Identity: example deliverable |
| `service-label-design-hero` | /services/label-design | 4/3 | 2400×1800 | Illustration | Representative label design work from a real project | Label Design: example deliverable |
| `service-logo-design-hero` | /services/logo-design | 4/3 | 2400×1800 | Illustration | Representative logo design work from a real project | Logo Design: example deliverable |
| `service-packaging-design-hero` | /services/packaging-design | 4/3 | 2400×1800 | Illustration | Representative packaging design work from a real project | Packaging Design: example deliverable |
| `service-structural-dieline-hero` | /services/structural-dieline-design | 4/3 | 2400×1800 | Illustration | Representative structural design & dielines work from a real project | Structural Design & Dielines: example deliverable |

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
| `mega-menu-feature` | Header mega-menu | 4/3 | 1200×900 | Illustration | Magnetic rigid box open, product in insert, dark set, three-quarter view | Open magnetic rigid box with an EVA foam insert holding a product jar |
