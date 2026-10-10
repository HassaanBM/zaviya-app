/* Photos hotlink the restaurant's own image host. Every slot has a styled fallback, so a blocked or failed load never leaves a hole. */
import { R, esc, icon } from "../../lib/site.mjs";
import { IMG } from "../../data/images.mjs";

export const photo = (k, { eager = false, cls = "", ratio = "4/3", alt } = {}) => {
  const i = IMG[k]; if (!i) throw new Error("no image " + k);
  const [w, h] = ratio.split("/").map(Number);
  const src = /\.(jpe?g|png|webp)$/i.test(i.src) ? i.src : i.src + "/full";
  return `<span class="ph${cls ? " " + cls : ""}" style="aspect-ratio:${w}/${h}">${icon("bowl-food", "ico ph__i")}<img src="${src}" alt="${esc(alt ?? i.alt)}" width="${w * 200}" height="${h * 200}" ${eager ? 'fetchpriority="high" loading="eager"' : 'loading="lazy"'} decoding="async" referrerpolicy="no-referrer" data-img></span>`;
};
export const phFallback = (ratio = "4/3", cls = "") => { const [w, h] = ratio.split("/").map(Number); return `<span class="ph${cls ? " " + cls : ""}" style="aspect-ratio:${w}/${h}">${icon("bowl-food", "ico ph__i")}</span>`; };

/* Replaceable logo: set R.logoUrl in data/restaurant.mjs to use an image. */
export const wordmark = (cls = "") => R.logoUrl
  ? `<img class="wm-img ${cls}" src="${R.logoUrl}" alt="${R.name}" width="160" height="48">`
  : `<span class="wm ${cls}" aria-hidden="true"><span class="wm__z">Z</span><span class="wm__t">aviya <b>Grill</b></span></span>`;
