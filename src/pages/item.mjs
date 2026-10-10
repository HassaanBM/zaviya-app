import { esc, money, icon, U, catUrl, dishUrl } from "../lib/site.mjs";
import { breadcrumbLd } from "../lib/seo.mjs";
import { IMG } from "../data/images.mjs";
import { CATS, ITEMS } from "../data/menu.mjs";
import { page } from "../components/layout/document.mjs";
import { card, dietTags } from "../components/menu/card.mjs";
import { modField } from "../components/menu/modifiers.mjs";
import { photo, phFallback } from "../components/ui/photo.mjs";

export function buildItems() {
  for (const i of ITEMS) {
    const c = CATS.find((x) => x.id === i.cat);
    const rel = c.items.filter((x) => x.id !== i.id).slice(0, 3);
    page({ url: dishUrl(i), cur: U.menu, title: `${i.name} | ${i.catName} | Zaviya Grill`, desc: (i.desc ? i.desc + " " : "") + `${money(i.price)} at Zaviya Grill, Austin TX.`, ogImg: i.img ? IMG[i.img].src + "/full" : IMG.og.src,
      ld: breadcrumbLd([["Home", "/"], ["Menu", U.menu], [i.catName, catUrl(c)], [i.name, dishUrl(i)]]),
      body: `<section class="dish"><div class="wrap">
<nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="${U.home}">Home</a></li><li><a href="${U.menu}">Menu</a></li><li><a href="${catUrl(c)}">${esc(i.catName)}</a></li><li><span aria-current="page">${esc(i.name)}</span></li></ol></nav>
<div class="dish__grid"><div class="dish__media">${i.img ? photo(i.img, { eager: true, ratio: "1/1" }) : phFallback("1/1")}${i.img ? "" : `<p class="muted">No photo for this dish yet.</p>`}</div>
<div class="dish__info"><p class="eyebrow">${esc(i.catName)}${i.group ? ` &middot; ${esc(i.group)}` : ""}</p><h1>${esc(i.name)}</h1><p class="dish__price"><span data-dish-price>${money(i.price)}</span></p>
${i.desc ? `<p class="lead">${esc(i.desc)}</p>` : ""}${dietTags(i)}${i.note ? `<p class="dc__n">${esc(i.note)}</p>` : ""}
${i.available ? `<form class="dform" data-dish-form data-id="${i.id}" novalidate>${i.mods.map(modField).join("")}
<div class="fld"><label for="notes">Special instructions <span class="opt-t">Optional</span></label><p class="hint" id="notes-h">Do not add allergy details here. Tell staff when you order. Up to 140 characters.</p><textarea id="notes" name="notes" rows="2" maxlength="140" aria-describedby="notes-h"></textarea></div>
<div class="dform__bar"><div class="qty" role="group" aria-label="Quantity"><button type="button" class="ib" data-q="-1" aria-label="Decrease quantity">${icon("minus")}</button><input id="qty" type="number" inputmode="numeric" min="1" max="20" value="1" aria-label="Quantity"><button type="button" class="ib" data-q="1" aria-label="Increase quantity">${icon("plus")}</button></div>
<button class="btn btn--lg" type="submit">${icon("shopping-bag")}<span>Add to order <span data-dish-total>${money(i.price)}</span></span></button></div><p class="form__msg" data-msg role="status" aria-live="polite" tabindex="-1" hidden></p></form>` : `<p class="panel panel--plain">This dish is not available to order right now.</p>`}
<p class="muted">Tax and fees are not included. Allergies: tell your server before you order.</p></div></div>
${rel.length ? `<div class="rel"><h2>More from ${esc(i.catName)}</h2><ul class="grid grid--3">${rel.map((x) => card(x)).join("")}</ul></div>` : ""}</div></section>` });
  }
}
