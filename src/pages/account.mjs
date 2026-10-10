/* Login, signup, password recovery, account overview and order history.
   There is no account backend yet, so every page says so. See README "Not connected". */
import { R, icon, U } from "../lib/site.mjs";
import { simple } from "../components/layout/simple.mjs";
import { A, arrow, panel } from "../components/ui/html.mjs";
import { fld, form } from "../components/forms/field.mjs";

const note = `<div class="note" data-demo-note>${icon("info")}<div>Accounts are not available yet. Nothing you type here is saved or sent. You can order without an account.</div></div>`;

export function buildAccount() {
  simple(U.login, { title: "Log In | Zaviya Grill", desc: "Log in to Zaviya Grill.", noindex: true, h1: "Log in", crumbs: [["Log in", ""]],
    body: `<div class="narrow">${note}${form("login", fld({ id: "email", label: "Email", type: "email", req: true, auto: "email" }) + fld({ id: "password", label: "Password", type: "password", req: true, auto: "current-password" }), "Log in", `<p class="alt"><a href="${U.forgot}">Forgot your password?</a></p><p class="alt">New here? <a href="${U.signup}">Create an account</a>. Or <a href="${U.menu}">order as a guest</a>.</p>`)}</div>` });
  simple(U.signup, { title: "Create an Account | Zaviya Grill", desc: "Create a Zaviya Grill account.", noindex: true, h1: "Create an account", crumbs: [["Create an account", ""]],
    body: `<div class="narrow">${note}${form("signup", fld({ id: "name", label: "Name", req: true, auto: "name", max: 80 }) + fld({ id: "email", label: "Email", type: "email", req: true, auto: "email" }) + fld({ id: "password", label: "Password", type: "password", req: true, auto: "new-password", hint: "Use at least 10 characters." }), "Create account", `<p class="alt">Have an account? <a href="${U.login}">Log in</a>.</p>`)}</div>` });
  simple(U.forgot, { title: "Reset Your Password | Zaviya Grill", desc: "Reset your Zaviya Grill password.", noindex: true, h1: "Reset your password", lead: "Enter your email. We would send a reset link.", crumbs: [["Log in", U.login], ["Reset password", ""]],
    body: `<div class="narrow">${note}${form("forgot", fld({ id: "email", label: "Email", type: "email", req: true, auto: "email" }), "Send reset link", `<p class="alt"><a href="${U.login}">Back to log in</a></p>`)}</div>` });
  simple(U.account, { title: "Your Account | Zaviya Grill", desc: "Your Zaviya Grill account.", noindex: true, h1: "Your account", crumbs: [["Account", ""]],
    body: `<div class="narrow">${panel("You are not signed in", `<p>Accounts are not available yet, so there is no profile to show. You can order and book without one.</p><p class="row-btns">${A(U.login, "Log in", "btn")}${A(U.menu, arrow("Order Online"), "btn btn--ghost")}</p><p>${A(U.orders, "Order history")}</p>`)}</div>` });
  simple(U.orders, { title: "Order History | Zaviya Grill", desc: "Your Zaviya Grill order history.", noindex: true, h1: "Order history", crumbs: [["Account", U.account], ["Order history", ""]],
    body: `<div class="narrow"><div class="empty-state">${icon("receipt", "ico empty-state__i")}<h2>No order history</h2><p>Order history needs an account, and accounts are not available yet. For a past order, check the message from the ordering service, or call <a href="tel:${R.tel}">${R.phone}</a>.</p><p>${A(U.menu, "Browse the menu", "btn")}</p></div></div>` });
}
