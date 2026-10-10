/* Cart, checkout, confirmation. The cart itself is client-side (client/features/ordering). */
import { R, icon, U } from "../lib/site.mjs";
import { simple } from "../components/layout/simple.mjs";
import { A, EXT, arrow } from "../components/ui/html.mjs";
import { fld, form } from "../components/forms/field.mjs";

export function buildOrdering() {
  simple(U.cart, { title: "Your Order | Zaviya Grill", desc: "Review your Zaviya Grill order.", noindex: true, cur: U.cart, h1: "Your order", crumbs: [["Your order", ""]],
    body: `<div data-cart-page><p class="muted">Loading your order.</p></div>
<noscript><p>The order page needs JavaScript. Call <a href="tel:${R.tel}">${R.phone}</a> to order.</p></noscript>
<template data-empty-tpl><div class="empty-state">${icon("shopping-bag", "ico empty-state__i")}<h2>Your order is empty</h2><p>Add dishes from the menu. Your order stays on this device.</p><p>${A(U.menu, arrow("Browse the menu"), "btn")}</p></div></template>` });

  simple(U.checkout, { title: "Checkout | Zaviya Grill", desc: "Check out your Zaviya Grill order.", noindex: true, cur: U.checkout, h1: "Checkout", crumbs: [["Your order", U.cart], ["Checkout", ""]],
    body: `<div class="checkout" data-checkout><div class="checkout__main">
<div class="note" data-demo-note>${icon("warning")}<div><strong>Online ordering is not connected to this site yet.</strong> Pressing the button below does not place an order and does not charge a card. To order now, use <a href="${R.links.toast}"${EXT}>our Toast ordering page</a> or call <a href="tel:${R.tel}">${R.phone}</a>.</div></div>
${form("checkout", `<fieldset class="grp-f"><legend>Contact</legend>${fld({ id: "name", label: "Name", req: true, auto: "name", max: 80, half: true })}${fld({ id: "phone", label: "Phone", type: "tel", req: true, auto: "tel", half: true, inputmode: "tel" })}${fld({ id: "email", label: "Email", type: "email", req: true, auto: "email", max: 120 })}</fieldset>
<fieldset class="grp-f"><legend>Pickup</legend><p>Pickup at ${R.addr1}, ${R.addr2}. The restaurant confirms the ready time.</p>${fld({ id: "notes", label: "Order notes", type: "textarea", rows: 3, max: 200, hint: "Do not add allergy or payment details here." })}</fieldset>
<fieldset class="grp-f"><legend>Payment</legend><p>This site does not take card details. Payment is handled by the restaurant's ordering partner.</p></fieldset>`, "Send order")}
</div><aside class="checkout__side" aria-labelledby="sum-h"><h2 id="sum-h">Summary</h2><div data-checkout-sum></div></aside></div>` });

  simple(U.confirm, { title: "Order Confirmation | Zaviya Grill", desc: "Your Zaviya Grill order status.", noindex: true, cur: U.confirm, h1: "Order confirmation", crumbs: [["Order confirmation", ""]],
    body: `<div data-confirm><div class="empty-state">${icon("receipt", "ico empty-state__i")}<h2>No order to show</h2><p>We have no confirmed order on this device. If you ordered elsewhere, use the message from that service. Questions? Call <a href="tel:${R.tel}">${R.phone}</a>.</p><p>${A(U.menu, "Browse the menu", "btn")}</p></div></div>` });
}
