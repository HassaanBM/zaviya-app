import { R, brandIcon, U } from "../../lib/site.mjs";
import { SOCIAL, FOOTER_COLS, LEGAL_NAV } from "../../data/navigation.mjs";
import { EXT } from "../ui/html.mjs";
import { wordmark } from "../ui/photo.mjs";

const ul = (a) => `<ul>${a.map(([t, h]) => `<li><a href="${h}">${t}</a></li>`).join("")}</ul>`;
export function footer() {
  return `<footer class="ft"><div class="wrap">
<div class="ft__top"><div class="ft__brand"><a href="${U.home}" aria-label="${R.name}, home">${wordmark("wm--lt")}</a><p>${R.tagline}</p>
<ul class="soc">${SOCIAL.map(([l, n, h]) => `<li><a href="${h}" aria-label="${l}"${EXT}>${brandIcon(n)}</a></li>`).join("")}</ul></div>
<div class="ft__cols">
<div><h2>Visit</h2><address><a href="${R.directions}"${EXT}>${R.addr1}<br>${R.addr2}</a></address><p>${R.hours.label}</p><p><a href="${R.directions}"${EXT}>Get directions</a></p></div>
<div><h2>Contact</h2><ul><li><a href="tel:${R.tel}">${R.phone}</a></li><li><a href="mailto:${R.email}">${R.email}</a></li><li><a href="${U.contact}">Contact page</a></li></ul></div>
<div><h2>Order and book</h2>${ul(FOOTER_COLS.orderBook)}</div>
<div><h2>Explore</h2><ul>${FOOTER_COLS.explore.map(([t, h]) => `<li><a href="${h}">${t}</a></li>`).join("")}<li><a href="${R.links.yelp}"${EXT}>Reviews on Yelp</a></li></ul></div>
</div></div>
<div class="ft__bot"><p>&copy; 2026 ${R.name}. ${R.addr2}.</p><ul>${LEGAL_NAV.map(([t, h]) => `<li><a href="${h}">${t}</a></li>`).join("")}</ul></div>
</div></footer>`;
}
