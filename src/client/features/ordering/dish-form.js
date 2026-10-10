/* Dish page: modifier validation, live total, add to order. */
import { $, $$, h, money, rel, say, toast } from "../../lib/dom.js";
import { M } from "./menu-index.js";
import { addLine } from "./cart.js";

export function initDish() {
  const f = $("[data-dish-form]"); if (!f) return;
  const id = f.getAttribute("data-id"), it = M[id], qty = $("#qty", f), msg = $("[data-msg]", f);
  const sel = (fs) => $$("input:checked", fs);
  const q = () => Math.max(1, Math.min(20, parseInt(qty.value, 10) || 1));
  const total = () => { let p = it.p; $$("input:checked", f).forEach((i) => { p += parseFloat(i.getAttribute("data-add")) || 0; }); return { unit: p, all: p * q() }; };
  const upd = () => { const t = total(); $("[data-dish-total]").textContent = money(t.all); $("[data-dish-price]").textContent = money(t.unit); };
  const modErr = (fs, text) => { const p = $("[data-mod-err]", fs); fs.classList.toggle("is-bad", !!text); p.hidden = !text; p.textContent = text || ""; };

  f.addEventListener("change", (e) => {
    const fs = e.target.closest("fieldset.mod");
    if (fs && fs.getAttribute("data-type") === "multi") { const mx = parseInt(fs.getAttribute("data-max"), 10); if (sel(fs).length > mx) { e.target.checked = false; modErr(fs, "Choose up to " + mx + "."); return; } }
    if (fs) modErr(fs, ""); upd();
  });
  f.addEventListener("click", (e) => { const b = e.target.closest("[data-q]"); if (!b) return; qty.value = Math.max(1, Math.min(20, q() + parseInt(b.getAttribute("data-q"), 10))); upd(); });
  qty.addEventListener("input", upd);
  f.addEventListener("submit", (e) => {
    e.preventDefault(); let bad = null;
    $$("fieldset.mod", f).forEach((fs) => { const n = sel(fs).length, mn = parseInt(fs.getAttribute("data-min"), 10); if (n < mn) { modErr(fs, mn === 1 ? "Choose an option." : "Choose " + mn + " options."); if (!bad) bad = fs; } else modErr(fs, ""); });
    if (bad) { const i = $("input", bad); if (i) i.focus(); say("Fix the errors before you add this dish."); return; }
    const o = {}; $$("fieldset.mod", f).forEach((fs) => { const s = sel(fs).map((i) => parseInt(i.value, 10)); if (s.length) o[fs.getAttribute("data-mod")] = s; });
    if (addLine(id, o, q(), ($("#notes", f).value || "").trim())) {
      msg.hidden = false; msg.className = "form__msg"; msg.textContent = ""; msg.appendChild(document.createTextNode("Added to your order. ")); msg.appendChild(h("a", { href: rel("/cart/"), text: "View order" }));
      toast("Added " + it.n);
    }
  });
  upd();
}
