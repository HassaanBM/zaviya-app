/* One dialog at a time (cart drawer, search). Handles scrim, inert background, focus trap, Escape and focus return. */
import { $, $$, D, root, reduce } from "./dom.js";
import { lenisStop, lenisStart } from "../animations/scroll.js";

const scrim = $("[data-scrim]");
let open = null, lastFocus = null;
const setInert = (on) => $$("#main,.hd,.ft,.mbar,.skip").forEach((e) => (on ? e.setAttribute("inert", "") : e.removeAttribute("inert")));
const focusables = (el) => $$('a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])', el).filter((e) => !e.hidden && e.offsetParent !== null);

export const currentDialog = () => open;
export function openDlg(el, first) {
  if (!el) return;
  if (open) closeDlg(true);
  lastFocus = D.activeElement;
  el.hidden = false; scrim.hidden = false; void el.offsetWidth;
  el.classList.add("on"); scrim.classList.add("on");
  setInert(true); root.classList.add("lock"); lenisStop(); open = el;
  setTimeout(() => { const f = (first && $(first, el)) || focusables(el)[0]; if (f) f.focus(); }, reduce ? 0 : 60);
}
export function closeDlg(quick) {
  if (!open) return;
  const el = open; open = null;
  el.classList.remove("on"); scrim.classList.remove("on");
  setInert(false); root.classList.remove("lock"); lenisStart();
  const done = () => { el.hidden = true; if (!open) scrim.hidden = true; };
  if (reduce || quick) done(); else setTimeout(done, 340);
  if (!quick && lastFocus && lastFocus.focus) lastFocus.focus();
}
export function initDialogs() {
  D.addEventListener("keydown", (e) => {
    if (!open) return;
    if (e.key === "Escape") { e.preventDefault(); closeDlg(); }
    if (e.key === "Tab") {
      const f = focusables(open); if (!f.length) return;
      const a = f[0], z = f[f.length - 1];
      if (e.shiftKey && D.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && D.activeElement === z) { e.preventDefault(); a.focus(); }
    }
  });
  if (scrim) scrim.addEventListener("click", () => closeDlg());
}
