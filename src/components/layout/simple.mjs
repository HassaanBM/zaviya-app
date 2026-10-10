import { page } from "./document.mjs";
import { phead } from "../ui/html.mjs";

/** Standard inner page: heading block, then one content section. */
export const simple = (url, { title, desc, h1, lead, crumbs, body, cur = "", noindex = false, eyebrow = "", ld = "" }) =>
  page({ url, cur, noindex, title, desc, ld, bar: !noindex || url === "/cart/", body: `${phead({ crumbs: crumbs || [[h1, ""]], h1, lead, eyebrow })}<section class="sec sec--tight"><div class="wrap">${body}</div></section>` });
