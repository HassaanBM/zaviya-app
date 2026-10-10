/* Homepage hero search. Behavior only; the expand/collapse motion is in animations/hero-search.js. */
import { D, $, $$, say, reduce } from "../../lib/dom.js";
import { FEATURED_IDS } from "../../../data/featured.mjs";
import { renderResults, featuredRows } from "./search.js";
import { createSearchMotion } from "../../animations/hero-search.js";

export function initHeroSearch() {
  const wrap = $("[data-hs]"); if (!wrap) return;
  const input = $("#hs-q"), panel = $("[data-hs-panel]"), res = $("[data-hs-res]"), title = $("[data-hs-t]"), form = $("[data-hs-form]");
  input.setAttribute("data-hs-input", "");
  const motion = createSearchMotion(panel);
  let isOpen = false;
  const showFeatured = () => { res.textContent = ""; res.appendChild(featuredRows(FEATURED_IDS)); title.textContent = "Featured dishes"; };
  const update = () => {
    if (!input.value.trim()) { showFeatured(); return; }
    const n = renderResults(input.value, res, 8, "");
    title.textContent = n ? n + (n === 1 ? " dish" : " dishes") : "No results";
  };
  function open() { if (isOpen) return; isOpen = true; update(); wrap.classList.add("is-search"); panel.hidden = false; motion.open(); }
  function close(returnFocus) {
    if (!isOpen) return; isOpen = false; wrap.classList.remove("is-search");
    motion.close(() => { panel.hidden = true; }); if (returnFocus) input.focus();
  }
  input.addEventListener("focus", open);
  input.addEventListener("click", open);
  input.addEventListener("input", () => { open(); update(); });
  $("[data-hs-close]").addEventListener("click", () => close(true));
  D.addEventListener("pointerdown", (e) => { if (isOpen && !e.target.closest("[data-hs]")) close(false); });
  wrap.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) { e.preventDefault(); e.stopPropagation(); close(true); return; }
    if (!isOpen || (e.key !== "ArrowDown" && e.key !== "ArrowUp")) return;
    const items = $$("a,button", res).filter((x) => x.offsetParent !== null), i = items.indexOf(D.activeElement);
    if (e.key === "ArrowDown") { e.preventDefault(); (items[i + 1] || items[0] || input).focus(); }
    else { e.preventDefault(); (i <= 0 ? input : items[i - 1]).focus(); }
  });
  form.addEventListener("submit", (e) => { if (!input.value.trim()) { e.preventDefault(); input.focus(); say("Type a dish name to search."); } });
  // Tab leaving the search area closes it.
  wrap.addEventListener("focusout", (e) => { if (isOpen && e.relatedTarget && !wrap.contains(e.relatedTarget)) close(false); });
  const q = new URLSearchParams(location.search).get("q"); if (q) { input.value = q; }

  // Location control: a disclosure with the verified address. One restaurant, no fake locations.
  const lb = $("[data-hloc]"), lp = $("[data-hloc-p]");
  lb.addEventListener("click", () => { const o = lb.getAttribute("aria-expanded") === "true"; lb.setAttribute("aria-expanded", String(!o)); lp.hidden = o; });
  D.addEventListener("keydown", (e) => { if (e.key === "Escape" && lb.getAttribute("aria-expanded") === "true") { lb.setAttribute("aria-expanded", "false"); lp.hidden = true; lb.focus(); } });
}
