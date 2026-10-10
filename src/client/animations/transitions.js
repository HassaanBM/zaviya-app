/* Page-to-page curtain. Leaving: the forest curtain rises over the page, then the browser navigates.
   Arriving: the new page starts covered (class is-tr, set by an inline script in <head>) and the curtain lifts away.
   Without JS or GSAP the CSS animation .is-tr .tr removes the curtain. Reduced motion skips all of it. */
import { gsap } from "./gsap.js";
import { D, $, root, reduce, ss } from "../lib/dom.js";
import { lenisStart } from "./scroll.js";
import { closeDlg } from "../lib/dialogs.js";

export function initTransitions() {
  const tr = $("[data-tr]");
  if (!tr || reduce) { root.classList.remove("is-tr"); ss.del("zg_tr"); return; }
  if (root.classList.contains("is-tr")) {
    ss.del("zg_tr");
    gsap.set(tr, { visibility: "visible", yPercent: 0 });
    gsap.to(tr, { yPercent: -100, duration: 0.6, delay: 0.08, ease: "power3.inOut", onComplete: () => { root.classList.remove("is-tr"); gsap.set(tr, { yPercent: 100, visibility: "hidden" }); } });
  }
  addEventListener("pageshow", (e) => { if (e.persisted) { root.classList.remove("is-tr"); gsap.set(tr, { yPercent: 100, visibility: "hidden" }); lenisStart(); } }); // back button from the browser cache
  D.addEventListener("click", (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest("a[href]"); if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
    let u; try { u = new URL(a.href, location.href); } catch (x) { return; }
    if (!/^(https?|file):$/.test(u.protocol) || (u.origin !== location.origin && u.protocol !== "file:")) return;
    if (u.pathname === location.pathname && u.search === location.search) return; // same page or in-page anchor
    e.preventDefault(); closeDlg(true);
    let done = false; const go = () => { if (!done) { done = true; ss.set("zg_tr", "1"); location.href = u.href; } };
    gsap.set(tr, { visibility: "visible", yPercent: 100 });
    gsap.to(tr, { yPercent: 0, duration: 0.5, ease: "power3.inOut", onComplete: go }); setTimeout(go, 1000);
  });
}
