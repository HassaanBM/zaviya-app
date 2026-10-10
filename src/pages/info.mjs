/* Content pages: search, deals, about, catering, parties, reservations, contact, gallery. */
import { R, icon, U } from "../lib/site.mjs";
import { restaurantLd } from "../lib/seo.mjs";
import { PAGES, GRATUITY, BRAND } from "../data/content.mjs";
import { ITEMS } from "../data/menu.mjs";
import { EVENTS } from "../data/restaurant.mjs";
import { GALLERY } from "../data/images.mjs";
import { simple } from "../components/layout/simple.mjs";
import { A, EXT, arrow, panel, noteBox } from "../components/ui/html.mjs";
import { photo } from "../components/ui/photo.mjs";
import { factList, mapBlock } from "../components/ui/location.mjs";
import { fld, form, inquiryForm } from "../components/forms/field.mjs";

export function buildInfoPages() {
  simple(U.search, { ...PAGES.search, noindex: true, h1: "Search the menu", cur: U.search, crumbs: [["Search", ""]],
    body: `<div class="msearch msearch--lg"><label class="sr" for="sp-q">Search dishes</label>${icon("magnifying-glass")}<input id="sp-q" type="search" data-search-page placeholder="${BRAND.searchPlaceholder}" autocomplete="off"></div><div data-search-results aria-live="polite" class="srp"><p class="muted">Type to search ${ITEMS.length} dishes.</p></div>
<noscript><p>Search needs JavaScript. <a href="${U.menu}">Browse the full menu</a> instead.</p></noscript>` });

  simple(U.deals, { ...PAGES.deals, cur: U.deals, h1: "Special deals", crumbs: [["Special deals", ""]],
    body: `${panel("Current offers", `<p>${BRAND.deals.none.split(" Holiday")[0]} Call <a href="tel:${R.tel}">${R.phone}</a> to ask about today.</p><p>${A(U.menu, arrow("Order Online"), "btn")}</p>`)}
<h2 class="h2">Events and holiday hours</h2><ul class="evlist">${EVENTS.map((e) => `<li><h3>${e.name}</h3><p><strong>${e.when}</strong></p><p>${e.text}</p></li>`).join("")}</ul><p class="muted">Hours come from zaviyagrill.com. Call to confirm before you travel.</p>` });

  simple(U.about, { ...PAGES.about, cur: U.about, h1: "About Zaviya Grill", crumbs: [["About", ""]],
    body: `<div class="split"><div class="prose"><p>Chef and restaurateur Kashif Taj opened Mirchi Restaurant on Parmer Lane in 2014. Zaviya Grill grew from that kitchen.</p><p>In 2019 he partnered with physician Junaid Siddiqui, M.D. Dr. Siddiqui wanted the same foods made with healthier ingredient swaps. Together they built a menu of Pakistani, Indian and Punjabi dishes.</p><h2>How we cook</h2><ul class="check">${["Fresh ingredients", "House-ground spices", "Halal meat", "Vegetables prepared daily"].map((t) => `<li>${icon("check-circle")}${t}</li>`).join("")}</ul><p class="row-btns">${A(U.menu, arrow("See the menu"), "btn")}${A(U.reservations, "Reserve a Table", "btn btn--ghost")}</p></div>
<div class="stack">${["about1", "about2", "about3"].map((k) => photo(k)).join("")}</div></div>` });

  simple(U.catering, { ...PAGES.catering, cur: U.catering, h1: "Catering", crumbs: [["Catering", ""]],
    body: `<ul class="duo"><li class="panel"><span class="panel__i">${icon("storefront")}</span><h2>Order through ezCater</h2><p>Place a catering order on ezCater. Their site handles menu, delivery and payment.</p>${A(R.links.ezcater, `Open ezCater ${icon("arrow-up-right")}`, "btn", true)}</li>
<li class="panel"><span class="panel__i">${icon("phone")}</span><h2>Talk to us</h2><p>Call for large orders or custom menus.</p><a class="btn btn--ghost" href="tel:${R.tel}">${R.phone}</a></li></ul>
<h2 class="h2">Send an inquiry</h2>${inquiryForm("catering", fld({ id: "date", label: "Event date", type: "date", req: true, half: true }) + fld({ id: "guests", label: "Guests", type: "number", req: true, min: "1", half: true, inputmode: "numeric" }), "Prepare email")}` });

  simple(U.parties, { ...PAGES.parties, cur: U.parties, h1: "Parties and group dining", crumbs: [["Parties", ""]],
    body: `${noteBox(GRATUITY)}${inquiryForm("parties", fld({ id: "date", label: "Date", type: "date", req: true, half: true }) + fld({ id: "guests", label: "Guests", type: "number", req: true, min: "1", half: true, inputmode: "numeric" }) + fld({ id: "occasion", label: "Occasion", type: "select", opts: ["Birthday", "Team dinner", "Family gathering", "Other"] }), "Prepare email")}` });

  simple(U.reservations, { ...PAGES.reservations, cur: U.reservations, h1: "Reservations", crumbs: [["Reservations", ""]],
    body: `<div class="split"><div class="panel panel--plain"><h2>Book online</h2><p>The booking page belongs to our reservation partner. It opens in a new tab. You choose the day, time and party size there.</p><p>${A(R.links.reserve, `Reserve a Table ${icon("arrow-up-right")}`, "btn btn--lg", true)}</p><p class="muted">Already booked? ${A(U.reservationStatus, "Find out how to check or change it")}.</p></div>
<div class="panel panel--plain"><h2>Before you book</h2><ul class="check"><li>${icon("clock")}Open ${R.hours.label.toLowerCase()}</li><li>${icon("users")}${GRATUITY}</li><li>${icon("phone")}Large group? Call <a href="tel:${R.tel}">${R.phone}</a></li></ul>${A(U.parties, "Plan a party", "btn btn--ghost")}</div></div>` });
  simple(U.reservationStatus, { ...PAGES.reservationStatus, noindex: true, cur: U.reservations, h1: "Check or change a reservation", crumbs: [["Reservations", U.reservations], ["Check a reservation", ""]],
    body: panel("Use your confirmation", `<p>Reservations are held by our booking partner. Use the link in your confirmation message to view, change or cancel. If you cannot find it, call us.</p><p><a class="btn" href="tel:${R.tel}">${icon("phone")}${R.phone}</a> ${A(R.links.reserve, "Open booking page", "btn btn--ghost", true)}</p>`) });

  simple(U.contact, { ...PAGES.contact, cur: U.contact, h1: "Contact us", crumbs: [["Contact", ""]], ld: restaurantLd(),
    body: `<div class="split"><div>${factList()}<p class="row-btns">${A(R.directions, "Get Directions", "btn", true)}<a class="btn btn--ghost" href="tel:${R.tel}">Call now</a></p>${mapBlock()}</div>
<div><h2>Send a message</h2>${form("contact", fld({ id: "name", label: "Name", req: true, auto: "name", max: 80, half: true }) + fld({ id: "email", label: "Email", type: "email", req: true, auto: "email", max: 120, half: true }) + fld({ id: "message", label: "Message", type: "textarea", req: true, max: 800, hint: "Do not include allergy or payment details." }), "Prepare email", `<p class="muted">This form opens a draft in your email app. Nothing is sent until you press Send there.</p>`)}</div></div>` });

  simple(U.gallery, { ...PAGES.gallery, cur: U.gallery, h1: "Gallery", crumbs: [["Gallery", ""]],
    body: `<ul class="gal">${GALLERY.map((k) => `<li data-reveal>${photo(k, { ratio: "1/1" })}</li>`).join("")}</ul>` });
}
