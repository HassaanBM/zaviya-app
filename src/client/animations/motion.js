/* Orchestrates page motion: preloader (home, first visit) or direct hero entrance, then scroll reveals. */
import { prepHero, runHero, initFeatured } from "./hero.js";
import { initPreloader } from "./preloader.js";
import { initReveals } from "./reveal.js";

export function initMotion() {
  initFeatured();
  if (!initPreloader()) { prepHero(); runHero(); }
  initReveals();
}
