/* Legal pages (drafts), 404 and error pages. */
import { R, U } from "../lib/site.mjs";
import { LEGAL } from "../data/content.mjs";
import { page } from "../components/layout/document.mjs";
import { simple } from "../components/layout/simple.mjs";
import { A } from "../components/ui/html.mjs";

const legal = (url, d) => simple(url, { title: `${d.h1} | Zaviya Grill`, desc: d.desc, h1: d.h1, crumbs: [[d.h1, ""]], lead: "Last updated: October 2026. Draft text. The owner must review it before launch.", body: `<div class="prose prose--legal">${d.body}</div>` });
const err = (h, p) => `<section class="sec err-pg"><div class="wrap narrow"><p class="eyebrow">${h[0]}</p><h1>${h[1]}</h1><p class="lead">${p}</p><p class="row-btns">${A(U.home, "Go home", "btn")}${A(U.menu, "Browse the menu", "btn btn--ghost")}</p><p class="muted">Need help? Call <a href="tel:${R.tel}">${R.phone}</a>.</p></div></section>`;

export function buildSystem() {
  legal(U.privacy, LEGAL.privacy); legal(U.terms, LEGAL.terms); legal(U.access, LEGAL.access); legal(U.cookies, LEGAL.cookies);
  page({ url: "/404", noindex: true, bar: false, title: "Page not found | Zaviya Grill", desc: "This page does not exist.", body: err(["Error 404", "We cannot find that page"], "The link may be old or mistyped.") });
  page({ url: U.error, noindex: true, bar: false, title: "Something went wrong | Zaviya Grill", desc: "Something went wrong on our side. Your order is still saved on this device. Please try again.", body: err(["Error", "Something went wrong"], "Please try again. Your order is still saved on this device.") });
}
