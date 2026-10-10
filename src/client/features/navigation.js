/* Header scroll state, mobile drawer, menu section chips, map embed button, image fallback. */
import { D, $, $$, h, root, reduce } from "../lib/dom.js";

export function initNavigation() {
  const hd = $("[data-hd]"), b = $("[data-nav-open]"), d = $("#drawer");
  const sc = () => { if (hd) hd.classList.toggle("is-s", scrollY > 8); };
  addEventListener("scroll", sc, { passive: true }); sc();
  if (b && d) {
    const set = (o) => { b.setAttribute("aria-expanded", o ? "true" : "false"); b.setAttribute("aria-label", o ? "Close menu" : "Open menu"); d.hidden = !o; root.classList.toggle("lock", o); };
    b.addEventListener("click", () => set(b.getAttribute("aria-expanded") !== "true"));
    D.addEventListener("keydown", (e) => { if (e.key === "Escape" && b.getAttribute("aria-expanded") === "true") { set(false); b.focus(); } });
    matchMedia("(min-width:1024px)").addEventListener("change", (m) => { if (m.matches) set(false); });
    d.addEventListener("click", (e) => { if (e.target.closest("a")) set(false); });
  }
  D.addEventListener("click", (e) => {
    const t = e.target.closest("[data-map-load]"); if (!t) return;
    const m = t.closest("[data-map]"); m.textContent = "";
    m.appendChild(h("iframe", { src: m.getAttribute("data-src"), title: "Map of Zaviya Grill", loading: "lazy", referrerpolicy: "no-referrer-when-downgrade" }));
  });
  // A failed photo hides itself so the styled placeholder behind it shows.
  const chk = () => $$("img[data-img]").forEach((im) => { if (im.complete && !im.naturalWidth) im.style.visibility = "hidden"; });
  $$("img[data-img]").forEach((im) => im.addEventListener("error", () => { im.style.visibility = "hidden"; }, { once: true }));
  chk(); addEventListener("load", chk);
}

/* Menu page: category chips jump to sections and follow the section in view. */
export function initSectionChips() {
  const sn = $("[data-stickynav]"); if (!sn || !("IntersectionObserver" in window)) return;
  const links = {};
  $$("a", sn).forEach((a) => { const id = a.getAttribute("href").replace(/\/index\.html$/, "").split("/").filter(Boolean).pop(); if ($("#" + id)) { a.setAttribute("href", "#" + id); links[id] = a; } });
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    Object.keys(links).forEach((k) => links[k].removeAttribute("aria-current"));
    const l = links[e.target.id]; if (!l) return;
    l.setAttribute("aria-current", "true");
    const ul = l.closest("ul"); if (ul && ul.scrollWidth > ul.clientWidth) ul.scrollTo({ left: l.offsetLeft - 20, behavior: reduce ? "auto" : "smooth" });
  }), { rootMargin: "-30% 0px -60% 0px" });
  Object.keys(links).forEach((k) => io.observe($("#" + k)));
}
