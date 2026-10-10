/* Menu item presentations. All read the shared item objects from data/menu.mjs. */
import { esc, money, icon, dishUrl, catUrl } from "../../lib/site.mjs";
import { A } from "../ui/html.mjs";
import { photo, phFallback } from "../ui/photo.mjs";

export const hasRequired = (i) => i.mods.some((m) => m.required);
export const dietTags = (i) => i.diet.length ? `<ul class="tags">${i.diet.map((d) => `<li>${d}</li>`).join("")}</ul>` : "";
/* Add or Customize control. Items with a required option go to the dish page. */
export const quickAdd = (i) => `<div data-quick data-id="${i.id}">${!i.available ? `<span class="muted">Not available</span>` : hasRequired(i) ? A(dishUrl(i), "Customize", "btn btn--ghost btn--sm") : `<button class="btn btn--sm" type="button" data-add aria-label="Add ${esc(i.name)} to your order">${icon("plus")}Add</button>`}</div>`;

export const card = (i, eager = false) => `<li class="dc" data-id="${i.id}" data-reveal>
<a class="dc__media" href="${dishUrl(i)}" tabindex="-1" aria-hidden="true">${i.img ? photo(i.img, { eager }) : phFallback("4/3")}</a>
<div class="dc__body"><div class="dc__row"><h3><a href="${dishUrl(i)}">${esc(i.name)}</a></h3><span class="price">${money(i.price)}</span></div>
${i.desc ? `<p class="dc__d">${esc(i.desc)}</p>` : ""}${dietTags(i)}${i.note ? `<p class="dc__n">${esc(i.note)}</p>` : ""}
<div class="dc__act">${quickAdd(i)}</div></div></li>`;

export const row = (i) => `<li class="mr" data-id="${i.id}" data-reveal>
<a class="mr__media" href="${dishUrl(i)}" tabindex="-1" aria-hidden="true">${i.img ? photo(i.img, { ratio: "1/1" }) : phFallback("1/1")}</a>
<div class="mr__body"><h3><a href="${dishUrl(i)}">${esc(i.name)}</a></h3>${i.desc ? `<p>${esc(i.desc)}</p>` : ""}${dietTags(i)}${i.note ? `<p class="dc__n">${esc(i.note)}</p>` : ""}</div>
<div class="mr__act"><span class="price">${money(i.price)}</span>${quickAdd(i)}</div></li>`;

export const catNav = (cats, cur) => `<nav class="chips" aria-label="Menu sections"><ul>${cats.map((c) => `<li><a href="${catUrl(c)}"${cur === c.id ? ' aria-current="page"' : ""}>${esc(c.name)}</a></li>`).join("")}</ul></nav>`;
export const notesList = (notes) => `<ul class="notes">${notes.map((n) => `<li>${icon("info")}${esc(n)}</li>`).join("")}</ul>`;

/* Rows grouped under the sub-headings the source menu uses. */
export const groupedRows = (c) => c.items.some((i) => i.group)
  ? c.items.reduce((acc, i, n) => { const prev = c.items[n - 1]; if (i.group && (!prev || prev.group !== i.group)) acc.push(`</ul><h3 class="grp">${esc(i.group)}</h3><ul class="rows">`); acc.push(row(i)); return acc; }, []).join("")
  : c.items.map(row).join("");
