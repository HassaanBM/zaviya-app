/* Smooth scroll (Lenis) wired to ScrollTrigger, plus in-page anchor links. Disabled by reduced motion. */
import { gsap, ScrollTrigger } from "./gsap.js";
import Lenis from "lenis";
import { D, $, root, reduce, ss } from "../lib/dom.js";

let lenis = null;
export const lenisStop = () => { if (lenis) lenis.stop(); };
export const lenisStart = () => { if (lenis) lenis.start(); };

export function initScroll() {
  if (!reduce) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  D.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]'); if (!a) return;
    const id = a.getAttribute("href"); if (id.length < 2) return;
    const t = $(id); if (!t) return;
    e.preventDefault();
    const off = -(parseInt(getComputedStyle(root).getPropertyValue("--hd"), 10) + 60);
    if (lenis) lenis.scrollTo(t, { offset: off, duration: 1 }); else t.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    history.replaceState(null, "", id);
    t.setAttribute("tabindex", "-1"); t.focus({ preventScroll: true });
  });
}
