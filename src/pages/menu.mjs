import { esc, icon, U, catUrl } from "../lib/site.mjs";
import { restaurantLd, breadcrumbLd } from "../lib/seo.mjs";
import { PAGES } from "../data/content.mjs";
import { CATS, ITEMS, NOTES } from "../data/menu.mjs";
import { page } from "../components/layout/document.mjs";
import { phead } from "../components/ui/html.mjs";
import { card, catNav, notesList, groupedRows } from "../components/menu/card.mjs";

export function buildMenu() {
  page({ url: U.menu, cur: U.menu, title: PAGES.menu.title, desc: `Browse ${ITEMS.length} dishes: grills, curries, biryani, breads, desserts and drinks. Order online from Zaviya Grill in North Austin.`, ld: restaurantLd(),
    body: `${phead({ crumbs: [["Menu", ""]], h1: "Menu", lead: PAGES.menu.lead(ITEMS.length, CATS.length) })}
<div class="wrap">${notesList(NOTES)}</div>
<div class="wrap menu-top"><div class="msearch"><label class="sr" for="menu-filter">Filter this page</label>${icon("magnifying-glass")}<input id="menu-filter" type="search" placeholder="Filter dishes on this page" data-filter autocomplete="off"></div><p class="muted" data-filter-n aria-live="polite"></p></div>
<div class="stickynav" data-stickynav><div class="wrap">${catNav(CATS, "")}</div></div>
<div class="wrap menu-body">${CATS.map((c) => `<section class="msec" id="${c.id}" aria-labelledby="h-${c.id}" data-cat><header class="msec__h"><h2 id="h-${c.id}">${esc(c.name)}</h2><a class="lnk" href="${catUrl(c)}">Open section ${icon("arrow-right")}</a></header>${c.note ? `<p class="muted">${esc(c.note)}</p>` : ""}<ul class="rows">${groupedRows(c)}</ul></section>`).join("")}
<p class="empty" data-filter-empty hidden>No dishes match. Clear the filter to see all dishes.</p></div>` });

  CATS.forEach((c, idx) => {
    const nx = CATS[(idx + 1) % CATS.length], pv = CATS[(idx + CATS.length - 1) % CATS.length];
    page({ url: catUrl(c), cur: U.menu, title: `${c.name} | Menu | Zaviya Grill, Austin TX`, desc: `${c.name} at Zaviya Grill: ${c.items.slice(0, 4).map((i) => i.name).join(", ")} and more.`,
      ld: breadcrumbLd([["Home", "/"], ["Menu", U.menu], [c.name, catUrl(c)]]),
      body: `${phead({ crumbs: [["Menu", U.menu], [c.name, ""]], h1: esc(c.name), lead: c.note || `${c.items.length} dishes.` })}
<div class="stickynav"><div class="wrap">${catNav(CATS, c.id)}</div></div>
<section class="sec sec--tight"><div class="wrap">${c.id === "grill-specials" || c.id === "grill-platters" ? notesList(NOTES) : ""}<ul class="grid grid--3">${c.items.map((i, n) => card(i, n < 3)).join("")}</ul>
<nav class="pn" aria-label="Section navigation"><a href="${catUrl(pv)}">${icon("arrow-left")}<span><small>Previous</small>${esc(pv.name)}</span></a><a href="${catUrl(nx)}"><span><small>Next</small>${esc(nx.name)}</span>${icon("arrow-right")}</a></nav></div></section>` });
  });
}
