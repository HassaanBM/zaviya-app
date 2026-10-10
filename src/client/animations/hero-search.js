/* Hero search expand/collapse. The results panel grows open under the field while the dish stage and headline dim and shrink back,
   so the hero stays visible behind the search. Closing reverses it. */
import { gsap, MOTION } from "./gsap.js";
import { $, reduce } from "../lib/dom.js";

export function createSearchMotion(panel) {
  const stage = $("[data-stage]"), copy = $("[data-hsplit]");
  return {
    open() {
      if (reduce) { gsap.set(panel, { clearProps: "all" }); gsap.set(stage, { autoAlpha: 0.15 }); return; }
      gsap.killTweensOf([panel, stage, copy]);
      gsap.fromTo(panel, { height: 0, autoAlpha: 0, y: -8 }, { height: "auto", autoAlpha: 1, y: 0, duration: 0.5, ease: MOTION.easeOut });
      gsap.to(stage, { autoAlpha: 0.15, scale: 0.96, duration: 0.5, ease: MOTION.easeInOut });
      gsap.to(copy, { autoAlpha: 0.35, duration: 0.4 });
    },
    close(done) {
      if (reduce) { gsap.set(stage, { autoAlpha: 1, clearProps: "scale" }); done(); return; }
      gsap.killTweensOf([panel, stage, copy]);
      gsap.to(panel, { height: 0, autoAlpha: 0, y: -8, duration: 0.35, ease: MOTION.easeIn, onComplete: () => { gsap.set(panel, { clearProps: "height,y,opacity,visibility" }); done(); } });
      gsap.to(stage, { autoAlpha: 1, scale: 1, duration: 0.45, ease: MOTION.easeOut });
      gsap.to(copy, { autoAlpha: 1, duration: 0.4 });
    },
  };
}
