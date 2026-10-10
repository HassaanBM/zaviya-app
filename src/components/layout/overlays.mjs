/* Dialogs and live regions shared by every page: cart drawer, search dialog, toast, transition curtain, preloader. */
import { icon, U } from "../../lib/site.mjs";

export const overlays = () => `
<div class="scrim" data-scrim hidden></div>
<aside class="cp" id="cart-panel" role="dialog" aria-modal="true" aria-labelledby="cp-t" hidden>
<div class="cp__head"><h2 id="cp-t">Your order</h2><button class="ib" type="button" data-cart-close aria-label="Close your order">${icon("x")}</button></div>
<div class="cp__body" data-cp-body></div>
<div class="cp__foot" data-cp-foot hidden><p class="cp__sum"><span>Subtotal</span><strong data-cp-sum>$0.00</strong></p><p class="muted">Tax and fees are not included. The restaurant confirms them with your order.</p>
<div class="cp__btns"><a class="btn" href="${U.checkout}">Checkout</a><a class="btn btn--ghost" href="${U.cart}">View order</a></div></div></aside>
<div class="srch" id="search" role="dialog" aria-modal="true" aria-label="Search the menu" hidden><div class="srch__in">
<div class="srch__bar"><label class="sr" for="srch-q">Search dishes</label>${icon("magnifying-glass")}<input id="srch-q" type="search" placeholder="Search dishes, like karahi or naan" autocomplete="off" enterkeyhint="search"><button class="ib" type="button" data-search-close aria-label="Close search">${icon("x")}</button></div>
<div class="srch__res" data-srch-res aria-live="polite"><p class="muted">Type a dish name to start.</p></div></div></div>
<div class="live sr" aria-live="polite" aria-atomic="true" data-live></div>
<div class="toast" data-toast role="status" hidden></div>
<div class="tr" data-tr aria-hidden="true"></div>`;

export const preloader = () => `<div class="pre" id="pre" aria-hidden="true"><div class="pre__in">
<div class="pre__mark" data-pre-mark><span class="pre__z"><span data-pre-z>Z</span></span><span class="pre__rest">${"aviya".split("").map((c) => `<span class="pre__c"><i>${c}</i></span>`).join("")}<span class="pre__sp"></span>${"Grill".split("").map((c) => `<span class="pre__c pre__c--g"><i>${c}</i></span>`).join("")}</span></div>
<p class="pre__tag" data-pre-tag>Pakistani, Indian and Punjabi kitchen</p><span class="pre__line" data-pre-line></span></div></div>`;
