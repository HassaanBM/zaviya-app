/* Cart presentation: header badge, mobile order bar, cart drawer, cart page, checkout summary. Re-renders on the zg:cart event. */
import { D, $, $$, h, money, rel, say, toast, ICON } from "../../lib/dom.js";
import { openDlg, closeDlg, currentDialog } from "../../lib/dialogs.js";
import { M } from "./menu-index.js";
import { getLines, lineKey, unitPrice, optionText, count, subtotal, addLine, setQty, removeLine, clearCart } from "./cart.js";

export function lineItem(l, opts = {}) {
  const it = M[l.id], k = lineKey(l), li = h("li", { "data-k": k });
  const body = h("div", null, [h("a", { class: "cl__t", href: rel(it.u), text: it.n })]);
  const ot = optionText(l); if (ot) body.appendChild(h("p", { class: "cl__o", text: ot }));
  if (l.note) body.appendChild(h("p", { class: "cl__o", text: "Note: " + l.note }));
  if (!opts.ro) {
    const q = h("div", { class: "qty", role: "group", "aria-label": "Quantity for " + it.n }, [
      h("button", { type: "button", class: "ib", "data-lq": "-1", "data-k": k, "aria-label": "Decrease quantity of " + it.n, html: ICON.minus }),
      h("input", { type: "number", min: "1", max: "20", value: String(l.qty), "data-lqty": k, "aria-label": "Quantity of " + it.n, inputmode: "numeric" }),
      h("button", { type: "button", class: "ib", "data-lq": "1", "data-k": k, "aria-label": "Increase quantity of " + it.n, html: ICON.plus })]);
    body.appendChild(h("div", { class: "cl__ctl" }, [q, h("button", { type: "button", class: "cl__rm", "data-lrm": k, "aria-label": "Remove " + it.n, text: "Remove" })]));
    li.appendChild(h("span", { class: "ph", style: "aspect-ratio:1/1;display:block", html: ICON.bowl }));
  } else { body.appendChild(h("p", { class: "cl__o", text: "Qty " + l.qty })); li.style.gridTemplateColumns = "minmax(0,1fr) auto"; }
  li.appendChild(body); li.appendChild(h("strong", { text: money(unitPrice(l) * l.qty) }));
  return li;
}
const list = (ro) => { const ul = h("ul", { class: "cl" }); getLines().forEach((l) => ul.appendChild(lineItem(l, { ro }))); return ul; };

function renderPanel() {
  const body = $("[data-cp-body]"), foot = $("[data-cp-foot]"); if (!body) return;
  body.textContent = "";
  if (!getLines().length) { foot.hidden = true; body.appendChild(h("div", { class: "empty-state" }, [h("h3", { text: "Your order is empty" }), h("p", { text: "Add dishes from the menu." }), h("a", { class: "btn", href: rel("/menu/"), text: "Browse the menu" })])); return; }
  body.appendChild(list(false)); foot.hidden = false; $("[data-cp-sum]").textContent = money(subtotal());
}
function renderCartPage() {
  const box = $("[data-cart-page]"); if (!box) return;
  const a = D.activeElement, fid = a && a.getAttribute && a.getAttribute("data-lq") ? [a.getAttribute("data-k"), a.getAttribute("data-lq")] : null;
  box.textContent = "";
  if (!getLines().length) { box.appendChild($("[data-empty-tpl]").content.cloneNode(true)); return; }
  const side = h("aside", { "aria-labelledby": "cart-sum-h" }, [h("h2", { id: "cart-sum-h", text: "Summary" }),
    h("div", { class: "totals" }, [h("p", null, [h("span", { text: "Subtotal" }), h("strong", { text: money(subtotal()) })]), h("p", { class: "muted", text: "Tax and fees are not included. The restaurant confirms them with your order." })]),
    h("p", null, [h("a", { class: "btn btn--block", href: rel("/checkout/") }, [h("span", { text: "Checkout" }), h("span", { text: money(subtotal()) })])]),
    h("p", null, [h("button", { class: "cl__rm", type: "button", "data-clear": "1", text: "Clear order" })])]);
  box.appendChild(h("div", { class: "cartpg" }, [list(false), side]));
  if (fid) { const t = $$("[data-lq]").filter((b) => b.getAttribute("data-k") === fid[0] && b.getAttribute("data-lq") === fid[1])[0]; if (t) t.focus(); }
}
function renderCheckout() {
  const box = $("[data-checkout-sum]"); if (!box) return;
  const main = $(".checkout__main"); box.textContent = "";
  if (!getLines().length) { box.appendChild(h("p", { text: "Your order is empty." })); box.appendChild(h("a", { class: "btn", href: rel("/menu/"), text: "Browse the menu" })); if (main) main.hidden = true; return; }
  if (main) main.hidden = false;
  box.appendChild(list(true));
  box.appendChild(h("div", { class: "totals" }, [h("p", null, [h("span", { text: "Subtotal" }), h("strong", { text: money(subtotal()) })]), h("p", { class: "muted", text: "Tax and fees are not included." })]));
  box.appendChild(h("p", null, [h("a", { class: "lnk", href: rel("/cart/"), text: "Edit order" })]));
}
export function refreshChrome() {
  const n = count();
  $$("[data-cart-badge]").forEach((b) => { b.textContent = n; b.hidden = !n; });
  $$("[data-cart-open]").forEach((b) => b.setAttribute("aria-label", "Open your order, " + n + (n === 1 ? " item" : " items")));
  const mb = $("[data-mbar]");
  if (mb) { mb.hidden = !n || !!$("[data-cart-page],[data-checkout]") || !!currentDialog(); $("[data-mbar-n]").textContent = "(" + n + ")"; $("[data-mbar-sum]").textContent = money(subtotal()); }
  const d = currentDialog(); if (d && d.id === "cart-panel") renderPanel();
  renderCartPage(); renderCheckout();
}

export function initCartUI() {
  D.addEventListener("zg:cart", refreshChrome);
  D.addEventListener("click", (e) => {
    const t = e.target.closest("[data-lq],[data-lrm],[data-clear],[data-add],[data-cart-open],[data-cart-close],#cart-panel a[href]"); if (!t) return;
    if (t.hasAttribute("data-lq")) { const k = t.getAttribute("data-k"), l = getLines().filter((x) => lineKey(x) === k)[0]; if (l) setQty(k, l.qty + parseInt(t.getAttribute("data-lq"), 10)); }
    else if (t.hasAttribute("data-lrm")) { const k = t.getAttribute("data-lrm"), l = getLines().filter((x) => lineKey(x) === k)[0]; if (l) { removeLine(k); say("Removed " + M[l.id].n); } }
    else if (t.hasAttribute("data-clear")) { clearCart(); say("Order cleared"); }
    else if (t.hasAttribute("data-add")) { const q = t.closest("[data-quick]"), id = q && q.getAttribute("data-id"); if (id && addLine(id, {}, 1, "")) toast("Added " + M[id].n); }
    else if (t.hasAttribute("data-cart-open")) { e.preventDefault(); renderPanel(); openDlg($("#cart-panel"), "[data-cart-close]"); }
    else if (t.hasAttribute("data-cart-close")) closeDlg();
    else closeDlg(true); // a link inside the drawer
  });
  D.addEventListener("change", (e) => { const i = e.target.closest("[data-lqty]"); if (i) { const v = parseInt(i.value, 10); setQty(i.getAttribute("data-lqty"), isNaN(v) ? 1 : v); } });
  refreshChrome();
}
