/* Menu search: results renderer shared by the search dialog, the /search page and the homepage hero; plus the on-page menu filter. */
import { D, $, $$, h, money, rel, say } from "../../lib/dom.js";
import { openDlg, closeDlg } from "../../lib/dialogs.js";
import { gsap } from "../../animations/gsap.js";
import { M } from "../ordering/menu-index.js";

const norm = (s) => String(s).toLowerCase();
/** All dishes whose name, description or section contains every typed word. Name matches rank first. */
export function findItems(q) {
  const t = norm(q).split(/\s+/).filter(Boolean); if (!t.length) return [];
  const out = [];
  Object.keys(M).forEach((id) => { const it = M[id], hay = norm(it.n + " " + it.d + " " + it.cn); if (t.every((x) => hay.indexOf(x) > -1)) { const n = norm(it.n); out.push({ id, s: n.indexOf(t[0]) === 0 ? 0 : n.indexOf(t[0]) > -1 ? 1 : 2, it }); } });
  out.sort((a, b) => a.s - b.s || a.it.n.localeCompare(b.it.n));
  return out;
}
function resultRow(it, id) {
  const req = it.m.some((m) => m.r);
  return h("li", null, [h("div", null, [h("a", { href: rel(it.u), text: it.n }), h("small", { text: it.cn + " · " + money(it.p) })]),
    !it.a ? h("span", { class: "muted", text: "Not available" }) : req ? h("a", { class: "btn btn--ghost btn--sm", href: rel(it.u), text: "Customize" }) : h("div", { "data-quick": true, "data-id": id }, [h("button", { type: "button", class: "btn btn--sm", "data-add": true, "aria-label": "Add " + it.n + " to your order", text: "Add" })])]);
}
/** Render matches into box. Returns the number of matches. */
export function renderResults(q, box, max, emptyText = "Type a dish name to start.") {
  box.textContent = "";
  if (!q.trim()) { box.appendChild(h("p", { class: "muted", text: emptyText })); return 0; }
  const r = findItems(q);
  if (!r.length) { box.appendChild(h("p", null, ["No dishes match “" + q + "”. Try another word, or ", h("a", { href: rel("/menu/"), text: "browse the full menu" }), "."])); say("No results"); return 0; }
  const ul = h("ul", { class: "sres" }); r.slice(0, max).forEach((x) => ul.appendChild(resultRow(x.it, x.id))); box.appendChild(ul);
  box.appendChild(h("p", { class: "muted", text: r.length + (r.length === 1 ? " dish found." : " dishes found.") + (r.length > max ? " Showing the first " + max + "." : "") })); say(r.length + " results");
  return r.length;
}
export const featuredRows = (ids) => { const ul = h("ul", { class: "sres" }); ids.forEach((id) => ul.appendChild(resultRow(M[id], id))); return ul; };

const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };

export function initSearch() {
  const qi = $("#srch-q"), box = $("[data-srch-res]");
  if (qi && box) qi.addEventListener("input", debounce(() => renderResults(qi.value, box, 20), 120));
  // Header search button: on the homepage it focuses the hero search while that is on screen; elsewhere it opens the dialog.
  D.addEventListener("click", (e) => {
    const b = e.target.closest("[data-search-open]"); if (!b) return;
    e.preventDefault();
    const hi = $("[data-hs-input]");
    if (hi && hi.getBoundingClientRect().bottom > 80) hi.focus({ preventScroll: false }); else openDlg($("#search"), "#srch-q");
  });
  D.addEventListener("click", (e) => { if (e.target.closest("[data-search-close]")) closeDlg(); });

  const sp = $("[data-search-page]"), sb = $("[data-search-results]");
  if (sp && sb) {
    const p = new URLSearchParams(location.search).get("q");
    if (p) { sp.value = p; renderResults(p, sb, 60); }
    sp.addEventListener("input", debounce(() => renderResults(sp.value, sb, 60), 120));
  }
  const fi = $("[data-filter]");
  if (fi) {
    const rows = $$(".mr"), secs = $$("[data-cat]"), n = $("[data-filter-n]"), em = $("[data-filter-empty]");
    fi.addEventListener("input", () => {
      gsap.set(rows, { autoAlpha: 1, y: 0, overwrite: true }); // rows may still be waiting for their scroll reveal
      const q = norm(fi.value).split(/\s+/).filter(Boolean); let vis = 0;
      rows.forEach((r) => { const ok = q.every((x) => norm(r.textContent).indexOf(x) > -1); r.hidden = !ok; if (ok) vis++; });
      secs.forEach((s) => { s.hidden = !$$(".mr", s).some((r) => !r.hidden); });
      em.hidden = !!vis; n.textContent = q.length ? vis + " dishes shown" : ""; if (q.length) say(vis + " dishes shown");
    });
  }
}
