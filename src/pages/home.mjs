import { R, esc, icon, U, catUrl, dishUrl } from "../lib/site.mjs";
import { restaurantLd } from "../lib/seo.mjs";
import { BRAND } from "../data/content.mjs";
import { IMG } from "../data/images.mjs";
import { CATS, ITEMS, FEATURED } from "../data/menu.mjs";
import { REVIEWS, EVENTS } from "../data/restaurant.mjs";
import { page } from "../components/layout/document.mjs";
import { hero } from "../components/hero/hero.mjs";
import { card } from "../components/menu/card.mjs";
import { photo, phFallback } from "../components/ui/photo.mjs";
import { A, EXT, arrow, sechead } from "../components/ui/html.mjs";
import { factList, mapBlock } from "../components/ui/location.mjs";

const tileImg = { "grill-specials": "leg", "grill-platters": "mix", "chicken-curries": "tikka", "goat-curries": "goatkarahi", "beef-curries": "brain", "biryani-rice": "friedrice", breads: "legnaan", desserts: "gulab" };
const tiles = Object.keys(tileImg).map((id) => CATS.find((c) => c.id === id));
const featured = FEATURED.map((id) => ITEMS.find((i) => i.id === id));

export function buildHome() {
  page({
    url: U.home, cur: U.home, ld: restaurantLd(),
    title: "Zaviya Grill | Pakistani Restaurant and Grill in North Austin, TX",
    desc: "Pakistani, Indian and Punjabi food in North Austin. Search the menu, order online, reserve a table, book a party or plan catering. Open daily 11 AM to 12 AM.",
    preload: `<link rel="preload" as="image" href="${IMG[ITEMS.find((i) => i.id === FEATURED[0]).img].src}/full" fetchpriority="high">\n`,
    body: `${hero()}

<section class="sec sec--intro" aria-labelledby="intro-h"><div class="wrap split">
<div><p class="eyebrow" data-reveal>About the food</p><h2 id="intro-h" data-split>${BRAND.intro.h}</h2><p class="lead" data-reveal>${BRAND.intro.p}</p><p class="row-btns" data-reveal>${A(U.menu, arrow("Order Online"), "btn")}${A(U.about, "Our story", "btn btn--ghost")}</p></div>
<ul class="pts">${BRAND.intro.points.map(([ic, h, p]) => `<li data-reveal><span class="pts__i">${icon(ic)}</span><div><h3>${h}</h3><p>${p}</p></div></li>`).join("")}</ul></div></section>

<section class="sec sec--paper" aria-labelledby="disc-h"><div class="wrap">
${sechead("Find your dish", "disc-h", "Browse the menu", `<button class="btn btn--ghost" type="button" data-search-open>${icon("magnifying-glass")}Search dishes</button>`)}
<ul class="tiles">${tiles.map((c) => `<li data-reveal><a class="tile" href="${catUrl(c)}"><span class="tile__media">${photo(tileImg[c.id], { ratio: "5/4" })}</span><span class="tile__t">${esc(c.name)}<small>${c.items.length} dishes</small></span>${icon("arrow-up-right", "ico tile__ar")}</a></li>`).join("")}</ul>
<p class="more" data-reveal>${A(U.menu, `See all ${CATS.length} sections`, "btn btn--ghost")}</p></div></section>

<section class="sec" aria-labelledby="fav-h"><div class="wrap">
${sechead("Signature dishes", "fav-h", "Start with the favorites", A(U.menu, arrow("Full menu"), "lnk"))}
<ul class="grid grid--3">${featured.map((i) => card(i)).join("")}</ul></div></section>

<section class="sec sec--tight" aria-labelledby="gal-h"><div class="wrap">
${sechead("From our kitchen", "gal-h", "A look at the food", A(U.gallery, arrow("Gallery"), "lnk"))}
<ul class="strip">${["table2", "chseekh", "haleem", "halwa", "malai", "c65"].map((k) => `<li data-reveal>${photo(k, { ratio: "1/1" })}</li>`).join("")}</ul></div></section>

<section class="sec sec--paper" aria-labelledby="deal-h"><div class="wrap split">
<div class="split__t"><p class="eyebrow" data-reveal>Special deals</p><h2 id="deal-h" data-split>Offers and holiday hours</h2>
<p class="lead" data-reveal>${BRAND.deals.none}</p><p data-reveal>${A(U.deals, arrow("See deals and events"), "btn")}</p></div>
<ul class="evs" data-reveal>${EVENTS.slice(0, 3).map((e) => `<li><span class="evs__d">${e.name}</span><span>${e.when}</span></li>`).join("")}</ul></div></section>

<section class="story" aria-labelledby="story-h"><div class="wrap story__in">
<div class="story__media"><div class="story__img" data-parallax>${photo("about1", { ratio: "4/5" })}</div></div>
<div class="story__copy"><p class="eyebrow eyebrow--lt" data-reveal>${BRAND.story.eyebrow}</p><h2 id="story-h" data-split>${BRAND.story.h}</h2>
<p data-reveal>${BRAND.story.p}</p>
<ul class="check" data-reveal>${BRAND.story.checks.map((t) => `<li>${icon("check-circle")}${t}</li>`).join("")}</ul>
<p data-reveal>${A(U.about, arrow("Read our story"), "btn btn--line")}</p></div></div></section>

<section class="sec" aria-labelledby="ev-h"><div class="wrap">
${sechead("Groups and events", "ev-h", "Catering and parties")}
<ul class="duo"><li class="panel" data-reveal><span class="panel__i">${icon("storefront")}</span><h3>Catering</h3><p>${BRAND.catering}</p>${A(U.catering, arrow("Plan catering"), "btn btn--ghost")}</li>
<li class="panel" data-reveal><span class="panel__i">${icon("confetti")}</span><h3>Parties and group dining</h3><p>${BRAND.parties}</p>${A(U.parties, arrow("Book a party"), "btn btn--ghost")}</li></ul></div></section>

<section class="resv" aria-labelledby="rs-h"><div class="wrap resv__in"><div><p class="eyebrow eyebrow--lt" data-reveal>Reservations</p><h2 id="rs-h" data-split>Save your table</h2>
<p data-reveal>${BRAND.reservations}</p></div>
<div class="resv__cta" data-reveal>${A(U.reservations, arrow("Reserve a Table"), "btn btn--lg btn--gold")}<a class="lnk lnk--lt" href="tel:${R.tel}">Or call ${R.phone}</a></div></div></section>

<section class="sec" aria-labelledby="rv-h"><div class="wrap">
${sechead("Reviews", "rv-h", "What guests say", A(R.links.yelp, `More on Yelp ${icon("arrow-up-right")}`, "lnk", true))}
<ul class="grid grid--2">${REVIEWS.map((r) => `<li class="q" data-reveal><figure>${icon("quotes", "ico q__i")}<blockquote>${esc(r.q)}</blockquote><figcaption>${esc(r.by)}, <cite>Yelp review</cite></figcaption></figure></li>`).join("")}</ul></div></section>

<section class="sec sec--paper" aria-labelledby="loc-h"><div class="wrap split split--map">
<div class="split__t"><p class="eyebrow" data-reveal>Find us</p><h2 id="loc-h" data-split>Visit Zaviya Grill</h2>${factList()}
<p class="row-btns" data-reveal>${A(R.directions, "Get Directions", "btn", true)}${A(U.contact, "Contact us", "btn btn--ghost")}</p></div>
<div data-reveal>${mapBlock()}</div></div></section>

<aside class="halal-badge" aria-label="100% Zabiha Halal" aria-describedby="halal-badge-tip" tabindex="0">
<span class="halal-badge__shape-wrap" aria-hidden="true">
<svg class="halal-badge__shape" data-halal-shape aria-hidden="true" viewBox="0 0 100 100" focusable="false">
<path class="halal-badge__outer" d="M50 3 L58.116 11.116 Q63.766 16.766 71.756 16.766 L83.234 16.766 L83.234 28.244 Q83.234 36.234 88.884 41.884 L97 50 L88.884 58.116 Q83.234 63.766 83.234 71.756 L83.234 83.234 L71.756 83.234 Q63.766 83.234 58.116 88.884 L50 97 L41.884 88.884 Q36.234 83.234 28.244 83.234 L16.766 83.234 L16.766 71.756 Q16.766 63.766 11.116 58.116 L3 50 L11.116 41.884 Q16.766 36.234 16.766 28.244 L16.766 16.766 L28.244 16.766 Q36.234 16.766 41.884 11.116 Z"/>
<path class="halal-badge__inner" transform="translate(50 50) scale(.9) translate(-50 -50)" d="M50 3 L58.116 11.116 Q63.766 16.766 71.756 16.766 L83.234 16.766 L83.234 28.244 Q83.234 36.234 88.884 41.884 L97 50 L88.884 58.116 Q83.234 63.766 83.234 71.756 L83.234 83.234 L71.756 83.234 Q63.766 83.234 58.116 88.884 L50 97 L41.884 88.884 Q36.234 83.234 28.244 83.234 L16.766 83.234 L16.766 71.756 Q16.766 63.766 11.116 58.116 L3 50 L11.116 41.884 Q16.766 36.234 16.766 28.244 L16.766 16.766 L28.244 16.766 Q36.234 16.766 41.884 11.116 Z"/>
</svg>
</span>
<span class="halal-badge__copy"><span class="halal-badge__percent">- 100% -</span><span>Zabiha</span><span>Halal</span></span>
<span class="halal-badge__tip" id="halal-badge-tip" role="tooltip">Zaviya Grill serves 100% halal food.</span>
</aside>`,
  });
}
