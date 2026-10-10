/* Opening animation on the homepage's first visit per tab: "Zaviya Grill" letters rise, a line draws, then the curtain lifts to the hero. */
import { gsap } from "./gsap.js";
import { ScrollTrigger } from "./gsap.js";
import { D, $, $$, root, ss } from "../lib/dom.js";
import { lenisStop, lenisStart } from "./scroll.js";
import { prepHero, runHero } from "./hero.js";

function end() { root.classList.remove("is-intro"); ss.set("zg_intro", "1"); lenisStart(); ScrollTrigger.refresh(); }

/** Returns true if it took over the hero entrance. */
export function initPreloader() {
  if (!root.classList.contains("is-intro")) return false;
  const pre = $("#pre"); if (!pre) { end(); return false; }
  lenisStop(); scrollTo(0, 0); prepHero();
  const z = $("[data-pre-z]"), cs = $$(".pre__c i", pre), tag = $("[data-pre-tag]"), line = $("[data-pre-line]"), mark = $("[data-pre-mark]");
  gsap.set([z].concat(cs), { yPercent: 115 }); gsap.set(tag, { autoAlpha: 0, y: 10 });
  const HOLD = 2.4, tl = gsap.timeline({ paused: true, onComplete: end });
  tl.to(z, { yPercent: 0, duration: 0.8, ease: "power4.out" }, 0.1)
    .to(cs, { yPercent: 0, duration: 0.7, ease: "power4.out", stagger: 0.05 }, 0.3)
    .to(line, { scaleX: 1, duration: 1.5, ease: "power2.inOut" }, 0.2)
    .to(tag, { autoAlpha: 1, y: 0, duration: 0.6, ease: "sine.out" }, 0.9)
    .addPause(HOLD, () => { const go = () => tl.play(); if (D.readyState === "complete") go(); else { addEventListener("load", go, { once: true }); setTimeout(go, 4000); } })
    .add(runHero, HOLD + 0.35)
    .to(mark, { yPercent: -14, autoAlpha: 0, duration: 0.55, ease: "power2.in" }, HOLD)
    .to([tag, line], { autoAlpha: 0, duration: 0.4 }, HOLD)
    .to(pre, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.9, ease: "power4.inOut" }, HOLD + 0.08);
  let started = false; const begin = () => { if (!started) { started = true; tl.play(); } };
  Promise.race([D.fonts.load('1em "Fraunces"'), new Promise((r) => setTimeout(r, 1200))]).then(begin, begin);
  setTimeout(() => { if (root.classList.contains("is-intro")) tl.progress(1); }, 9000); // never trap the visitor
  return true;
}
