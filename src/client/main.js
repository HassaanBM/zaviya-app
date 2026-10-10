/* Client entry. Pages are separate HTML documents, so this runs once per page load. Bundled to assets/app.js by scripts/build.mjs. */
import { initCartState } from "./features/ordering/cart.js";
import { initCartUI } from "./features/ordering/cart-ui.js";
import { initDish } from "./features/ordering/dish-form.js";
import { initSearch } from "./features/search/search.js";
import { initHeroSearch } from "./features/search/hero-search.js";
import { initForms } from "./features/forms/forms.js";
import { initConfirm } from "./features/forms/confirm.js";
import { initNavigation, initSectionChips } from "./features/navigation.js";
import { initDialogs } from "./lib/dialogs.js";
import { initScroll } from "./animations/scroll.js";
import { initTransitions } from "./animations/transitions.js";
import { initMotion } from "./animations/motion.js";

initCartState();     // load the saved order first
initScroll();
initDialogs();
initNavigation();
initCartUI();
initSearch();
initHeroSearch();
initSectionChips();
initDish();
initForms();
initConfirm();
initTransitions();
initMotion();
