/* Build-time helpers shared by every page and component: routes, escaping, icons, file output. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { R } from "../data/restaurant.mjs";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const OUT = path.resolve(ROOT, process.argv[2] || "dist");
/* "prod": absolute links, for a web server at the domain root.
   "preview": relative links, so the folder opens by double-click (file://). */
export const MODE = process.argv[3] || "prod";

export const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
export const money = (n) => "$" + n.toFixed(2);

const ICONS = path.join(ROOT, "node_modules/@phosphor-icons/core/assets/regular");
export const icon = (n, cls = "ico") => fs.readFileSync(path.join(ICONS, n + ".svg"), "utf8").replace("<svg ", `<svg class="${cls}" aria-hidden="true" focusable="false" `).trim();
export const brandIcon = (n) => fs.readFileSync(path.join(ROOT, "node_modules/simple-icons/icons", n + ".svg"), "utf8").replace(' role="img"', "").replace(/<title>.*?<\/title>/, "").replace("<svg ", '<svg class="ico" aria-hidden="true" focusable="false" fill="currentColor" ').trim();

/* Route table. Every internal link in the site goes through U. */
export const U = {
  home: "/", menu: "/menu/", search: "/search/", deals: "/deals/", about: "/about/", catering: "/catering/", parties: "/parties/",
  reservations: "/reservations/", reservationStatus: "/reservations/status/", cart: "/cart/", checkout: "/checkout/", confirm: "/order-confirmation/",
  login: "/login/", signup: "/signup/", forgot: "/forgot-password/", account: "/account/", orders: "/account/orders/",
  contact: "/contact/", gallery: "/gallery/", privacy: "/privacy-policy/", terms: "/terms/", access: "/accessibility/", cookies: "/cookies/", error: "/error/",
};
export const catUrl = (c) => `/menu/${c.slug}/`;
export const dishUrl = (i) => `/item/${i.id}/`;

export const PAGE_COUNT = { n: 0 };
export function write(url, html) {
  let out = html;
  const file = url === "/404" ? path.join(OUT, "404.html") : path.join(OUT, url, "index.html");
  if (MODE === "preview") {
    const depth = url === "/404" ? 0 : url.split("/").filter(Boolean).length;
    const rel = "../".repeat(depth);
    out = out.replace(/(href|src)="(\/[^"]*)"/g, (m, a, u) => {
      if (u.startsWith("//")) return m;
      const [p, rest = ""] = u.split(/(?=[?#])/);
      if (p === "/") return `${a}="${rel}index.html${rest}"`;
      if (p.startsWith("/assets/")) return `${a}="${rel}${p.slice(1)}${rest}"`;
      return `${a}="${rel}${p.slice(1)}${p.endsWith("/") ? "index.html" : ""}${rest}"`;
    });
    out = out.replace('name="zg-base" content="/"', `name="zg-base" content="${rel}"`);
  }
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, out);
  PAGE_COUNT.n++;
}
export { R };
