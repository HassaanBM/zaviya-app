/* Single place where GSAP and ScrollTrigger are imported and registered. Every other module imports from here. */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export { gsap, ScrollTrigger };

/* Shared motion tokens. Keep durations and easings here so pages feel like one product. */
export const MOTION = { fast: 0.25, base: 0.6, slow: 1, easeOut: "power3.out", easeIn: "power3.in", easeInOut: "power3.inOut", expo: "power4.out" };
