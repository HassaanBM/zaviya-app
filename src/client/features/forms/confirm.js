/* Order confirmation page. Shows an order only if the API call in forms.js stored one for this tab. Otherwise the honest empty state stays. */
import { $, h, ss } from "../../lib/dom.js";
import { clean } from "../ordering/cart.js";
import { lineItem } from "../ordering/cart-ui.js";

export function initConfirm() {
  const box = $("[data-confirm]"); if (!box) return;
  const raw = ss.get("zg_last_order"); if (!raw) return;
  try {
    const o = JSON.parse(raw); if (!o || !o.id) return;
    box.textContent = "";
    box.appendChild(h("div", { class: "panel panel--plain" }, [h("h2", { text: "Order received" }), h("p", { text: "Order number: " + o.id }), h("p", { class: "muted", text: "The restaurant confirms the ready time by phone or email." })]));
    const ul = h("ul", { class: "cl" }); (o.lines || []).map(clean).filter(Boolean).forEach((l) => ul.appendChild(lineItem(l, { ro: true }))); box.appendChild(ul);
  } catch (e) { /* keep the empty state */ }
}
