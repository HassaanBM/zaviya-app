import { R, icon, U } from "../../lib/site.mjs";
import { PRIMARY_NAV, DRAWER_NAV } from "../../data/navigation.mjs";
import { wordmark } from "../ui/photo.mjs";

const link = ([t, h], cur, skipCur = false) => `<a href="${h}"${cur === h && !skipCur ? ' aria-current="page"' : ""}>${t}</a>`;

export function header(cur) {
  return `<a class="skip" href="#main">Skip to content</a>
<header class="hd" data-hd><div class="wrap hd__in">
<a class="hd__logo" href="${U.home}" aria-label="${R.name}, home">${wordmark()}</a>
<nav class="hd__nav" aria-label="Primary">${PRIMARY_NAV.map((l) => link(l, cur)).join("")}</nav>
<div class="hd__tools">
<button class="ib" type="button" data-search-open aria-haspopup="dialog" aria-label="Search the menu">${icon("magnifying-glass")}</button>
<a class="ib hd__acct" href="${U.login}" aria-label="Log in">${icon("user")}</a>
<button class="ib" type="button" data-cart-open aria-haspopup="dialog" aria-label="Open your order, 0 items">${icon("shopping-bag")}<span class="badge" data-cart-badge hidden>0</span></button>
<a class="btn btn--sm hd__order" href="${U.menu}">Order Online</a>
<button class="ib hd__burger" type="button" data-nav-open aria-expanded="false" aria-controls="drawer" aria-label="Open menu">${icon("list", "ico i-open")}${icon("x", "ico i-close")}</button>
</div></div>
<div class="drawer" id="drawer" hidden><div class="drawer__in">
<nav aria-label="Mobile">${DRAWER_NAV.map((l) => link(l, cur, l[0] === "Order Online")).join("")}</nav>
<p class="drawer__meta"><a href="tel:${R.tel}">${R.phone}</a><br>${R.hours.label}</p></div></div>
</header>`;
}
