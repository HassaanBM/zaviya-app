/* Scroll-triggered text, block and parallax reveals. Created once per page load (pages are separate documents, so there is nothing to clean up between routes). */
import { gsap, ScrollTrigger, MOTION } from "./gsap.js";
import { $, $$, reduce } from "../lib/dom.js";
import { split } from "./split.js";

export function initReveals() {
  if (reduce) return;
  $$("[data-split]").forEach((el) => {
    if (el.closest(".hero")) return;
    const ws = split(el); gsap.set(ws, { yPercent: 115 });
    ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: () => gsap.to(ws, { yPercent: 0, duration: 0.85, ease: MOTION.expo, stagger: 0.045 }) });
  });
  const rev = $$("[data-reveal]").filter((e) => !e.closest(".hero"));
  gsap.set(rev, { autoAlpha: 0, y: 26 });
  // onLeave covers a fast jump past an element: it must never stay hidden.
  ScrollTrigger.batch(rev, { start: "top 92%", once: true, onEnter: (b) => gsap.to(b, { autoAlpha: 1, y: 0, duration: 0.8, ease: MOTION.easeOut, stagger: 0.08, overwrite: true }), onLeave: (b) => gsap.to(b, { autoAlpha: 1, y: 0, duration: 0.25, overwrite: true }) });
  $$("[data-parallax]").forEach((w) => { const im = $("img", w); if (im) gsap.fromTo(im, { yPercent: -7, scale: 1.14 }, { yPercent: 7, ease: "none", scrollTrigger: { trigger: w, start: "top bottom", end: "bottom top", scrub: true } }); });
  if ($("[data-hero]")) {
    gsap.to("[data-word]", { yPercent: -18, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    gsap.to("[data-shape]", { yPercent: 8, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  }
  addEventListener("load", () => ScrollTrigger.refresh());
}
