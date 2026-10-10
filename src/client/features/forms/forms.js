/* Form validation and submit behavior. No form pretends to send anything:
   - contact, catering, parties: open a prefilled draft in the visitor's email app
   - login, signup, forgot: say that accounts are not available
   - checkout: says the order was not sent unless CFG.API_BASE (env ZG_API_BASE) is set, then posts to {API_BASE}/orders */
import { $, $$, h, CFG, rel, say, ss } from "../../lib/dom.js";
import { getLines, subtotal, clearCart } from "../ordering/cart.js";

const label = (f) => { const l = $("label[for='" + f.id + "']"); return l ? l.textContent.replace(/\s*Required\s*$/, "").trim() : "this field"; };
function check(f) {
  const v = f.value.trim(); let msg = "";
  if (f.required && !v) msg = "Enter " + (f.tagName === "SELECT" ? "a choice for " : "") + label(f).toLowerCase() + ".";
  else if (v && f.type === "email" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) msg = "Enter an email address like name@example.com.";
  else if (v && f.type === "tel" && v.replace(/\D/g, "").length < 10) msg = "Enter a phone number with 10 digits.";
  else if (v && f.type === "number" && (isNaN(+v) || +v < (+f.min || 0) || +v !== Math.floor(+v))) msg = "Enter a whole number of " + (f.min || 1) + " or more.";
  else if (v && f.type === "date") { const d = new Date(v + "T00:00:00"), t = new Date(); t.setHours(0, 0, 0, 0); if (isNaN(d) || d < t) msg = "Choose a date that is today or later."; }
  else if (f.type === "password" && f.autocomplete === "new-password" && v.length < 10) msg = "Use at least 10 characters.";
  const e = $("#" + f.id + "-e"); if (e) { e.hidden = !msg; e.textContent = msg; }
  if (msg) f.setAttribute("aria-invalid", "true"); else f.removeAttribute("aria-invalid");
  return !msg;
}
function show(f, text, cls, extra) {
  const m = $("[data-msg]", f); m.hidden = false; m.className = "form__msg " + cls; m.textContent = text;
  (extra || []).forEach((x) => { m.appendChild(document.createTextNode(" ")); m.appendChild(x); }); m.focus();
}
const SUBJECT = { contact: "Message from the website", catering: "Catering inquiry", parties: "Party inquiry" };

export function initForms() {
  $$("form[data-form]").forEach((f) => {
    $$("input,select,textarea", f).forEach((c) => { c.addEventListener("blur", () => { if (c.value || c.hasAttribute("aria-invalid")) check(c); }); c.addEventListener("input", () => { if (c.hasAttribute("aria-invalid")) check(c); }); });
    f.addEventListener("submit", (e) => {
      e.preventDefault(); let bad = null;
      $$("input,select,textarea", f).forEach((c) => { if (!check(c) && !bad) bad = c; });
      if (bad) { say("The form has errors. Fix them and try again."); show(f, "Check the fields marked with an error.", "is-err"); bad.focus(); return; }
      const name = f.getAttribute("data-form"), data = {};
      $$("input,select,textarea", f).forEach((c) => { if (c.type !== "password") data[c.id] = { l: label(c), v: c.value.trim() }; });
      if (SUBJECT[name]) {
        const body = Object.keys(data).map((k) => data[k].l + ": " + data[k].v).join("\n");
        const href = "mailto:" + CFG.EMAIL + "?subject=" + encodeURIComponent(SUBJECT[name]) + "&body=" + encodeURIComponent(body);
        show(f, "Your email app should open with a draft. Nothing is sent until you press Send there. If it did not open, email " + CFG.EMAIL + " or call " + CFG.PHONE + ".", "is-info", [h("a", { href, text: "Open the draft again" })]);
        location.href = href;
      } else if (name === "login" || name === "signup" || name === "forgot") {
        $$("input[type=password]", f).forEach((p) => { p.value = ""; });
        show(f, "Accounts are not available yet. Nothing was saved or sent. You can order without an account.", "is-info", [h("a", { href: rel("/menu/"), text: "Browse the menu" })]);
      } else if (name === "checkout") {
        if (!getLines().length) { show(f, "Your order is empty.", "is-err"); return; }
        if (!CFG.API_BASE) { show(f, "Your order was not sent. Online ordering is not connected to this site yet. Use our Toast page or call " + CFG.PHONE + ".", "is-err", [h("a", { href: CFG.TOAST_URL, rel: "noopener", target: "_blank", text: "Order on Toast" })]); return; }
        const btn = $("button[type=submit]", f); btn.disabled = true; show(f, "Sending your order.", "is-info");
        fetch(CFG.API_BASE + "/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ customer: { name: data.name.v, phone: data.phone.v, email: data.email.v, notes: (data.notes || {}).v || "" }, items: getLines().map((l) => ({ id: l.id, qty: l.qty, options: l.o, note: l.note })) }) })
          .then((r) => { if (!r.ok) throw new Error("bad status"); return r.json(); })
          .then((j) => { if (!j || !j.orderId) throw new Error("bad body"); ss.set("zg_last_order", JSON.stringify({ id: String(j.orderId), lines: getLines(), sub: subtotal() })); clearCart(); location.href = rel("/order-confirmation/"); })
          .catch(() => { btn.disabled = false; show(f, "We could not send your order. Nothing was charged. Try again, or call " + CFG.PHONE + ".", "is-err"); });
      }
    });
  });
}
