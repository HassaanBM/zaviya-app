/* Homepage hero: restaurant-discovery layout.
   Faint background word, one large abstract shape, headline, large search field, location control,
   and ONE featured dish at a time. Dish motion (bottom-right -> center -> top-left -> out) lives in client/animations/hero.js. */
import { R, esc, money, icon, U, dishUrl } from "../../lib/site.mjs";
import { BRAND } from "../../data/content.mjs";
import { ITEMS, FEATURED } from "../../data/menu.mjs";
import { photo } from "../ui/photo.mjs";
import { A, EXT } from "../ui/html.mjs";
import { hasRequired } from "../menu/card.mjs";

const BLOB = "M230 0H520C565 0 600 35 600 80V330C600 460 500 560 370 560H80C35 560 0 525 0 480V230C0 100 100 0 230 0Z";

const dishes = FEATURED.map((id) => ITEMS.find((i) => i.id === id));

export function hero() {
  const dish = (i, n) => `<div class="fd${n === 0 ? " is-on" : ""}" data-fd="${n}" ${n === 0 ? "" : 'aria-hidden="true"'}>${photo(i.img, { eager: n === 0, ratio: "1/1", cls: "ph--round" })}</div>`;
  const info = (i, n) => `<div class="fi${n === 0 ? " is-on" : ""}" data-fi="${n}" ${n === 0 ? "" : 'aria-hidden="true" inert'}>
<p class="fi__cat">${esc(i.catName)}</p><h2 class="fi__name">${esc(i.name)}</h2><p class="fi__d">${esc(i.desc)}</p>
<div class="fi__row"><span class="fi__price">${money(i.price)}</span><div class="fi__act" data-quick data-id="${i.id}">${hasRequired(i) ? A(dishUrl(i), `Customize ${icon("arrow-right")}`, "btn btn--gold btn--sm") : `<button class="btn btn--gold btn--sm" type="button" data-add aria-label="Add ${esc(i.name)} to your order">${icon("plus")}Add to order</button>`}${A(dishUrl(i), "View dish", "fi__view")}</div></div></div>`;
  return `<section class="hero" data-hero aria-labelledby="hero-h">
<div class="hero__field" aria-hidden="true"><span class="hero__word" data-word>ZAVIYA</span></div>
<div class="wrap hero__grid">
<div class="hero__copy" data-hcopy>
<p class="eyebrow" data-h>${BRAND.heroEyebrow}</p>
<h1 id="hero-h" data-hsplit>${BRAND.heroTitle[0]}<br><em>${BRAND.heroTitle[1]}</em></h1>
<div class="hs" data-hs data-h>
<form class="hs__bar" role="search" action="${U.search}" method="get" data-hs-form>
<label class="sr" for="hs-q">Search the menu</label>${icon("magnifying-glass", "ico hs__i")}
<input id="hs-q" name="q" type="search" placeholder="${BRAND.searchPlaceholder}" autocomplete="off" enterkeyhint="search" aria-controls="hs-panel">
<button class="btn hs__go" type="submit">Search</button></form>
<div class="hs__loc"><button class="hloc" type="button" aria-expanded="false" aria-controls="hloc-p" data-hloc>${icon("map-pin")}<span>Austin, TX <small>${R.address.street.replace(", Unit A", "")}</small></span>${icon("caret-down", "ico hloc__c")}</button>
<div class="hloc__p" id="hloc-p" data-hloc-p hidden><p><strong>${R.name}</strong><br>${R.addr1}<br>${R.addr2}</p><p>${R.hours.label}</p><p class="row-btns">${A(R.directions, "Get directions", "btn btn--ghost btn--sm", true)}<a class="btn btn--ghost btn--sm" href="tel:${R.tel}">${R.phone}</a></p></div></div>
<div class="hs__panel" id="hs-panel" data-hs-panel hidden><div class="hs__head"><p class="hs__t" data-hs-t>Start typing to search ${ITEMS.length} dishes.</p><button class="ib" type="button" data-hs-close aria-label="Close search">${icon("x")}</button></div><div class="hs__res" id="hs-res" data-hs-res></div></div>
</div>
<p class="hero__links" data-h>${A(U.menu, `Order Online ${icon("arrow-right")}`, "lnk")}${A(U.reservations, "Reservations", "lnk")}</p>
</div>
<div class="hero__stage" data-stage role="group" aria-roledescription="carousel" aria-label="Featured dishes">
<svg class="hero__shape" data-shape viewBox="0 0 600 560" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="${BLOB}"/></svg>
<div class="hero__dishes" data-dishes>${dishes.map(dish).join("")}</div>
<div class="hero__info" data-info aria-live="polite">${dishes.map(info).join("")}</div>
<div class="hero__ctl"><button class="ib ib--ring" type="button" data-prev aria-label="Previous dish">${icon("arrow-left")}</button><p class="hero__count" aria-hidden="true"><b data-cur>01</b> / ${String(dishes.length).padStart(2, "0")}</p><button class="ib ib--ring" type="button" data-next aria-label="Next dish">${icon("arrow-right")}</button></div>
</div></div></section>`;
}
