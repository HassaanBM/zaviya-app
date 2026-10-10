/* Homepage hero motion.
   FEATURED DISH PATH (required by the design guardrail): bottom-right -> center -> top-left -> out of frame.
   Every change of dish, forward or back, uses this same path, so the old dish never exits right and the new one never enters from the left. */
import { gsap, MOTION } from "./gsap.js";
import { $, $$, reduce } from "../lib/dom.js";
import { split } from "./split.js";

let S = null; // hero state, set by initFeatured

/** Distances (px) that carry a dish from its rest spot out past the hero's top-left, or in from beyond its bottom-right. */
function vectors() {
  const hero = $("[data-hero]").getBoundingClientRect(), box = $("[data-dishes]").getBoundingClientRect(), w = box.width;
  const small = innerWidth < 700, k = small ? 0.9 : 1.15;
  return {
    out: { x: -(box.left - hero.left + w * k), y: -(box.top - hero.top + w * k) },
    in: { x: hero.right - box.left + w * 0.1, y: hero.bottom - box.top + w * 0.1 },
    rot: small ? 18 : 38, scale: small ? 0.75 : 0.55,
  };
}

export function initFeatured() {
  const stage = $("[data-stage]"); if (!stage) return;
  const dishes = $$("[data-fd]"), infos = $$("[data-fi]"), shape = $("[data-shape]"), cur = $("[data-cur]");
  S = { i: 0, n: dishes.length, dishes, infos, shape, cur, tl: null };
  gsap.set(dishes.slice(1), { autoAlpha: 0 }); gsap.set(infos.slice(1), { autoAlpha: 0 });
  $("[data-next]").addEventListener("click", () => step(1));
  $("[data-prev]").addEventListener("click", () => step(-1));
}

function setA11y(a, b) { // a leaves, b becomes the visible dish
  S.dishes[a].classList.remove("is-on"); S.dishes[a].setAttribute("aria-hidden", "true");
  S.dishes[b].classList.add("is-on"); S.dishes[b].removeAttribute("aria-hidden");
  S.infos[a].classList.remove("is-on"); S.infos[a].setAttribute("aria-hidden", "true"); S.infos[a].setAttribute("inert", "");
  S.infos[b].classList.add("is-on"); S.infos[b].removeAttribute("aria-hidden"); S.infos[b].removeAttribute("inert");
  S.cur.textContent = String(b + 1).padStart(2, "0");
}

function step(dir) {
  if (!S) return;
  if (S.tl && S.tl.isActive()) S.tl.progress(1); // finish the running move, then start the next
  const a = S.i, b = (a + dir + S.n) % S.n, A = S.dishes[a], B = S.dishes[b], iA = S.infos[a], iB = S.infos[b];
  S.i = b; setA11y(a, b);
  if (reduce) { gsap.set(A, { autoAlpha: 0 }); gsap.set(B, { autoAlpha: 1, x: 0, y: 0 }); gsap.set(iA, { autoAlpha: 0 }); gsap.set(iB, { autoAlpha: 1 }); return; }
  const v = vectors();
  gsap.set(B, { x: v.in.x, y: v.in.y, scale: v.scale, rotation: v.rot, autoAlpha: 1, zIndex: 2 });
  gsap.set(A, { zIndex: 1 });
  S.tl = gsap.timeline({ onComplete() { gsap.set(A, { autoAlpha: 0, x: 0, y: 0, scale: 1, rotation: 0 }); gsap.set(iA, { x: 0, y: 0 }); } })
    .to(A, { x: v.out.x, y: v.out.y, scale: v.scale, rotation: -v.rot, duration: 0.95, ease: MOTION.easeIn }, 0)
    .to(B, { x: 0, y: 0, scale: 1, rotation: 0, duration: 1.05, ease: MOTION.easeOut }, 0.2)
    .to(iA, { x: -40, y: -24, autoAlpha: 0, duration: 0.4, ease: MOTION.easeIn }, 0)
    .fromTo(iB, { x: 40, y: 24, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, duration: 0.6, ease: MOTION.easeOut }, 0.45);
}

/** Set starting states before the preloader lifts, so nothing flashes. */
export function prepHero() {
  if (reduce || !$("[data-hero]")) return;
  const ws = split($("[data-hsplit]")); gsap.set(ws, { yPercent: 115 });
  gsap.set($$("[data-h]"), { autoAlpha: 0, y: 20 });
  gsap.set("[data-word]", { autoAlpha: 0, y: 60 });
  gsap.set("[data-shape]", { scale: 0.7, rotation: -25, autoAlpha: 0, transformOrigin: "50% 50%" });
  gsap.set("[data-info]", { autoAlpha: 0 }); gsap.set(".hero__ctl", { autoAlpha: 0 });
  if (S) { const v = vectors(); gsap.set(S.dishes[0], { x: v.in.x, y: v.in.y, scale: v.scale, rotation: v.rot, autoAlpha: 1 }); }
}
let ran = false;
export function runHero() {
  if (ran || reduce || !$("[data-hero]")) return; ran = true;
  const tl = gsap.timeline({ defaults: { ease: MOTION.expo } });
  tl.to("[data-word]", { autoAlpha: 1, y: 0, duration: 1.2 }, 0)
    .to("[data-shape]", { autoAlpha: 1, scale: 1, rotation: 0, duration: 1.3, ease: MOTION.easeOut }, 0)
    .to($$("[data-hsplit] .w>span"), { yPercent: 0, duration: 0.9, stagger: 0.07 }, 0.15)
    .to($$("[data-h]"), { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.09, ease: MOTION.easeOut }, 0.4);
  if (S) tl.to(S.dishes[0], { x: 0, y: 0, scale: 1, rotation: 0, duration: 1.3, ease: MOTION.easeOut }, 0.3);
  tl.to("[data-info]", { autoAlpha: 1, duration: 0.6, ease: MOTION.easeOut }, 1.0).to(".hero__ctl", { autoAlpha: 1, duration: 0.5 }, 1.1);
}
