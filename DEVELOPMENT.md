# Zaviya Grill website

Multi-page restaurant website for Zaviya Grill, 1212 W Parmer Ln Unit A, Austin TX 78727. Static pages (one HTML file per route), plain JavaScript for the interactive parts, GSAP for motion.

## 1. What this is
A static multi-page site: 238 pages (home, menu, 23 category pages, 190 dish pages, info pages, ordering pages, account pages, legal pages, 404). Ordering builds a cart in the browser. It does **not** take payment or send orders until you connect a back end (see section 17).

## 2. Stack and dependencies
Node 20+. Build: esbuild. Runtime libraries: gsap (+ScrollTrigger), lenis. Fonts: Fraunces, Manrope (self-hosted). Icons: Phosphor, simple-icons (inlined at build). Tests: playwright-core, axe-core.

## 3. Install
```
npm install
```

## 4. Develop
```
npm run build:preview     # relative links, opens by double-click on file://
npm run dev               # builds dist/ and serves it at http://localhost:8080
```

## 5. Build
```
npm run build             # dist/  (absolute links; deploy to a server root)
npm run build:preview     # preview/  (relative links; open preview/index.html)
```
Set `ZG_API_BASE=https://api.example.com npm run build` to turn on the order API (section 17).

## 6. Tests
```
npm test
```
Builds both targets, then runs `tests/static.mjs` (links, titles, descriptions, canonicals, one h1, sitemap) and `tests/e2e.mjs` (routes, 404, hero motion path, hero search, cart, dialogs, forms, keyboard, reduced motion, 6 widths for overflow, image fallback, axe WCAG 2.2 AA). Chromium is found at `/opt/pw-browsers/chromium`, or set `CHROMIUM=/path/to/chrome`. `axe-core` is not in package.json; run `npm i -D axe-core` to include the accessibility step (otherwise it is skipped).

## 7. Folder structure
```
src/data/          restaurant.mjs (business facts), menu.mjs, images.mjs, content.mjs (copy), navigation.mjs, featured.mjs
src/lib/           site.mjs (routes, helpers), seo.mjs (JSON-LD)
src/components/    ui/ forms/ menu/ layout/ hero/   (HTML string components)
src/pages/         home, menu, item, info, ordering, account, system
src/client/        main.js entry
  lib/             dom helpers, dialog manager
  features/        ordering/ search/ forms/ navigation
  animations/      gsap setup, hero, preloader, transitions, reveals, scroll (Lenis)
src/styles/        tokens, base, components/, layout/, pages/, motion
scripts/           build.mjs, serve.mjs
tests/             static.mjs, e2e.mjs
public/            fonts, favicon
```

## 8. Routing
Each route is a folder with `index.html`, so every URL loads directly and browser history works. Routes: `/`, `/menu/`, `/menu/<category>/`, `/item/<slug>/`, `/search/`, `/deals/`, `/about/`, `/catering/`, `/parties/`, `/reservations/`, `/cart/`, `/checkout/`, `/order-confirmation/`, `/contact/`, `/login/`, `/signup/`, `/forgot-password/`, `/account/`, `/account/orders/`, `/privacy-policy/`, `/terms/`, `/accessibility/`, plus `/gallery/`, `/reservations/status/`, `/cookies/`, and `404.html`. The route table is `U` in `src/lib/site.mjs`. Your host must serve `404.html` for unknown paths.

## 9. Where content lives
- Business facts (name, phone, email, address, hours, links): `src/data/restaurant.mjs`
- Menu (190 items, 23 categories, modifiers, notes): `src/data/menu.mjs`
- Page copy: `src/data/content.mjs`; navigation: `src/data/navigation.mjs`
- Images: `src/data/images.mjs`
- Featured hero dishes: `FEATURED` in `menu.mjs`

## 10. Ordering and cart
`src/client/features/ordering/`. The cart is saved in `localStorage` key `zg_cart_v1` and holds only dish id, chosen options, quantity and note. Prices are always recomputed from `menu.mjs`, so edited storage cannot change a price. Quantity is clamped to 1–20; unknown ids are dropped. Required option groups block "Add" until chosen. The cart survives navigation because it is read on every page.

## 11. Animations
All in `src/client/animations/`, separate from ordering code. Timelines: `hero.js` (entrance and dish step), `hero-search.js` (search panel open/close), `preloader.js`, `reveal.js`, `transitions.js` (page curtain).

## 12. Hero dish motion
`hero.js`. One featured dish at a time. Incoming dish starts bottom-right, travels diagonally to the featured spot. Outgoing dish leaves toward top-left. Same path for Next and Previous. No dish enters from the left or leaves to the right. Distances are measured from the viewport, so the path also works on phones.

## 13. ScrollTrigger
`reveal.js` creates the triggers once per page load, all with `once: true`, so none stay active after they fire. Pages are separate documents (real navigation), so each page starts with a clean ScrollTrigger state and no manual cleanup between routes is needed. `ScrollTrigger.refresh()` runs after the preloader and on window load. Lenis feeds `ScrollTrigger.update` (`scroll.js`) and is stopped while dialogs or the preloader are open.

## 14. Reduced motion
When `prefers-reduced-motion: reduce` is set, JS skips preloader, curtain, reveals, hero timelines and smooth scroll, and `motion.css` turns off CSS transitions. Content shows at once.

## 15. Update business details
Edit `src/data/restaurant.mjs`, run `npm run build`. Phone, email, address, hours, JSON-LD and footer all read from it.

## 16. Replace logo and images
Logo: the header shows a **text placeholder**, not a real logo. Put your file in `public/` and set `logoUrl` in `restaurant.mjs`. Photos: today they are hotlinked from the old site's host; download them into `public/img/` and change the URLs in `images.mjs` (and `menu.mjs` if items carry their own). Missing photos show a styled fallback.

## 17. Environment variables and integrations
| Item | State |
|---|---|
| `ZG_API_BASE` | If set at build time, checkout POSTs the order to `{ZG_API_BASE}/orders` and the confirmation page shows the reply. If unset, checkout says plainly that online ordering is not connected. |
| Payments | Not built. Needs a payment provider and server. |
| Online ordering | Official Toast link (`links.toast`) is the real ordering path today. |
| Reservations | Hand off to the provider in `links.reserve`. No booking is made here. |
| Contact, catering, party forms | Open an email draft (mailto). No server. |
| Login, sign up, reset, account, order history | Show "not available". Needs an auth service. Passwords are never stored in the browser. |
| Reviews | Four real Yelp reviews as quoted; no ratings are invented. |

## 18. Known incomplete items
- Legal pages are **drafts**; have a lawyer review them.
- Menu descriptions are short summaries; the owner must verify items, prices, allergens and spice levels.
- Deals page shows no offers because none were verified.
- Photos were not visually verified in the build environment (hotlinks blocked); check them after deploy.
- No newsletter, no invented awards, ratings or "best" claims.
