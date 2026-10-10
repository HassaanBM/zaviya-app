/* End-to-end checks (Playwright + axe). Serves dist/ itself. Run: npm run build && node tests/e2e.mjs
   Photos are hotlinked from the old site; the test blocks them so the fallback state is what gets checked. */
import { chromium } from "playwright-core";
import http from "node:http"; import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
let axeSrc = ""; try { axeSrc = fs.readFileSync(require.resolve("axe-core/axe.min.js"), "utf8"); } catch {}
const dir = path.resolve("dist"), PORT = 8199, B = `http://localhost:${PORT}`;
const T = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".xml": "application/xml", ".txt": "text/plain" };
const srv = http.createServer((q, s) => { let f = path.join(dir, decodeURIComponent(new URL(q.url, B).pathname)); if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html"); if (!fs.existsSync(f)) { s.writeHead(404, { "Content-Type": T[".html"] }).end(fs.readFileSync(path.join(dir, "404.html"))); return; } s.writeHead(200, { "Content-Type": T[path.extname(f)] || "application/octet-stream" }).end(fs.readFileSync(f)); }).listen(PORT);
const exe = process.env.CHROMIUM || ["/opt/pw-browsers/chromium", undefined].find((x) => !x || fs.existsSync(x));
const br = await chromium.launch({ executablePath: exe });
let pass = 0, fail = 0; const out = [];
const ok = (n, c, d = "") => { c ? pass++ : fail++; out.push(`${c ? "PASS" : "FAIL"} ${n}${d ? " | " + d : ""}`); };
const mk = async (w = 390, h = 844, extra = {}) => { const ctx = await br.newContext({ viewport: { width: w, height: h }, ...extra }); await ctx.route(/spotapps\.co/, (r) => r.abort()); const pg = await ctx.newPage(); pg.errs = []; pg.on("pageerror", (e) => pg.errs.push(String(e))); pg.on("console", (m) => { if (m.type() === "error" && !/Failed to load resource|ERR_/.test(m.text())) pg.errs.push(m.text()); }); await ctx.addInitScript(() => sessionStorage.setItem("zg_intro", "1")); return pg; };
const go = async (pg, u) => { await pg.goto(B + u); await pg.waitForTimeout(500); };

// 1 routes
const ROUTES = ["/", "/menu/", "/menu/breads/", "/item/naan-plain/", "/search/", "/deals/", "/about/", "/catering/", "/parties/", "/reservations/", "/cart/", "/checkout/", "/order-confirmation/", "/contact/", "/login/", "/signup/", "/forgot-password/", "/account/", "/account/orders/", "/privacy-policy/", "/terms/", "/accessibility/"];
{ const pg = await mk(); for (const r of ROUTES) { const resp = await pg.goto(B + r); ok(`route ${r} 200`, resp.status() === 200); ok(`route ${r} one h1`, (await pg.locator("h1").count()) === 1); }
  const r404 = await pg.goto(B + "/no-such-page/"); ok("unknown route returns 404 page", r404.status() === 404 && (await pg.locator("h1").innerText()).length > 0);
  ok("no console errors across routes", pg.errs.length === 0, pg.errs.slice(0, 2).join(";")); await pg.context().close(); }

// 2 hero
for (const [w, h] of [[390, 844], [1440, 900]]) {
  const pg = await mk(w, h); await go(pg, "/"); await pg.waitForTimeout(2500);
  const vis = () => pg.evaluate(() => [...document.querySelectorAll("[data-fd]")].filter((e) => getComputedStyle(e).visibility !== "hidden").length);
  ok(`hero ${w}: one dish at rest`, (await vis()) === 1);
  ok(`hero ${w}: shape, word, logo wordmark present`, (await pg.locator("[data-shape]").count()) === 1 && (await pg.locator("[data-word]").innerText()) === "ZAVIYA" && (await pg.locator("header .wm").count()) > 0);
  await pg.evaluate(() => { window.__s = []; const f = () => { const o = {}; document.querySelectorAll("[data-fd]").forEach((e) => { if (getComputedStyle(e).visibility === "hidden") return; const r = e.getBoundingClientRect(); o[e.dataset.fd] = [r.x + r.width / 2, r.y + r.height / 2]; }); window.__s.push(o); window.__r = requestAnimationFrame(f); }; f(); });
  await pg.evaluate(() => document.querySelector("[data-next]").click()); await pg.waitForTimeout(2200);
  const s = await pg.evaluate(() => { cancelAnimationFrame(window.__r); return window.__s; });
  const tr = (k) => s.map((o) => o[k]).filter(Boolean); const a = tr("0"), b = tr("1");
  ok(`hero ${w}: outgoing exits top-left`, a.at(-1)[0] < a[0][0] && a.at(-1)[1] < a[0][1] && a.at(-1)[0] < 0);
  ok(`hero ${w}: incoming starts bottom-right and moves up-left`, b[0][0] > b.at(-1)[0] && b[0][1] > b.at(-1)[1]);
  ok(`hero ${w}: never moves right or comes from left`, a.every((p, i) => !i || p[0] <= a[i - 1][0] + 0.5) && b.every((p, i) => !i || p[0] <= b[i - 1][0] + 0.5));
  ok(`hero ${w}: one dish after step`, (await vis()) === 1); ok(`hero ${w}: counter 02`, (await pg.locator("[data-cur]").innerText()) === "02");
  await pg.evaluate(() => document.querySelector("[data-prev]").click()); await pg.waitForTimeout(2200); ok(`hero ${w}: prev returns to 01`, (await pg.locator("[data-cur]").innerText()) === "01");
  // search
  await pg.fill("#hs-q", "karahi"); await pg.waitForTimeout(500);
  ok(`hero ${w}: live search panel opens with results`, (await pg.locator("[data-hs-panel]").isVisible()) && (await pg.locator("[data-hs-res] a").count()) > 0);
  await pg.keyboard.press("Escape"); await pg.waitForTimeout(500); ok(`hero ${w}: Esc closes search`, !(await pg.locator("[data-hs-panel]").isVisible()));
  await pg.fill("#hs-q", "zzzzqq"); await pg.waitForTimeout(500); ok(`hero ${w}: empty state`, /no|nothing/i.test(await pg.locator("[data-hs-res]").innerText()));
  await pg.click("[data-hloc]"); ok(`hero ${w}: location panel shows real address`, (await pg.locator("[data-hloc-p]").innerText()).includes("Parmer"));
  ok(`hero ${w}: no horizontal overflow`, await pg.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  ok(`hero ${w}: no errors`, pg.errs.length === 0, pg.errs[0] || ""); await pg.context().close();
}

// 3 cart + persistence
{ const pg = await mk(); await go(pg, "/item/naan-plain/");
  await pg.click("[data-dish-form] button[type=submit]"); await pg.waitForTimeout(300);
  let cart = JSON.parse(await pg.evaluate(() => localStorage.getItem("zg_cart_v1")) || "[]"); ok("add dish -> cart has 1 line", cart.length === 1);
  await go(pg, "/menu/"); await go(pg, "/about/"); ok("cart persists across routes", (await pg.locator("[data-cart-badge]").first().innerText()) === "1");
  await go(pg, "/item/chicken-wings-6-pcs/"); await pg.click("[data-dish-form] button[type=submit]"); await pg.waitForTimeout(200);
  ok("required option blocks add", (await pg.locator("[data-mod-err]:not([hidden])").count()) > 0);
  await pg.evaluate(() => localStorage.setItem("zg_cart_v1", JSON.stringify([{ id: "nope", qty: 1, o: {} }, { id: "naan-plain", qty: 999, o: {}, p: 0.01 }]))); await pg.reload(); await pg.waitForTimeout(300);
  ok("tampered cart sanitized (qty clamp, unknown id dropped)", (await pg.locator("[data-cart-badge]").first().innerText()) === "20");
  await pg.click("[data-cart-open]"); await pg.waitForTimeout(500);
  ok("cart dialog: focus inside + background inert", await pg.evaluate(() => document.querySelector("#cart-panel").contains(document.activeElement) && document.querySelector("#main").hasAttribute("inert")));
  await pg.keyboard.press("Escape"); await pg.waitForTimeout(600);
  ok("cart dialog: Esc closes, focus returns", await pg.evaluate(() => document.activeElement.hasAttribute("data-cart-open") && !document.querySelector("#main").hasAttribute("inert")));
  await go(pg, "/cart/"); ok("cart page lists line", (await pg.locator(".cl li").count()) === 1);
  await go(pg, "/checkout/"); ok("checkout shows honest not-connected notice", /not (yet )?(connected|available|taking)|cannot|unavailable/i.test(await pg.locator("main").innerText()));
  await pg.context().close(); }

// 4 forms
{ const pg = await mk(); await go(pg, "/contact/"); await pg.locator("form button[type=submit]").first().click(); await pg.waitForTimeout(300);
  ok("contact form shows field errors", (await pg.locator("[aria-invalid=true]").count()) > 0 && (await pg.locator(".field-err:visible, [data-err]:visible, .err:visible").count()) > 0);
  await go(pg, "/login/"); ok("login is honest (no fake auth)", /not available|unavailable|not yet/i.test(await pg.locator("main").innerText()));
  await pg.context().close(); }

// 5 search page + nav
{ const pg = await mk(1280, 800); await go(pg, "/search/?q=naan"); ok("search page returns results", (await pg.locator("main a[href^='/item/']").count()) > 0);
  await go(pg, "/"); await pg.click("header nav >> text=Menu"); await pg.waitForTimeout(1500); ok("nav link goes to /menu/", new URL(pg.url()).pathname === "/menu/");
  await pg.goBack(); await pg.waitForTimeout(800); ok("history back works", new URL(pg.url()).pathname === "/");
  await pg.keyboard.press("Tab"); ok("skip link is first focus", await pg.evaluate(() => /skip/i.test(document.activeElement.textContent || "")));
  await pg.context().close(); }

// 6 responsive overflow
for (const w of [320, 375, 430, 768, 1024, 1440]) { const pg = await mk(w, 800); const bad = [];
  for (const r of ["/", "/menu/", "/menu/breads/", "/item/chicken-karahi/", "/cart/", "/contact/", "/reservations/"]) { await go(pg, r); if (!(await pg.evaluate(() => document.documentElement.scrollWidth <= innerWidth))) bad.push(r); }
  ok(`no horizontal overflow at ${w}px`, !bad.length, bad.join(",")); await pg.context().close(); }

// 7 reduced motion
{ const pg = await mk(390, 844, { reducedMotion: "reduce" }); await pg.context().addInitScript(() => sessionStorage.removeItem("zg_intro")); await go(pg, "/");
  ok("reduced motion: no preloader, content visible at once", !(await pg.evaluate(() => document.documentElement.classList.contains("is-intro"))) && (await pg.locator(".hero h1").isVisible()));
  const t = await pg.evaluate(() => getComputedStyle(document.querySelector("[data-info]")).opacity); ok("reduced motion: hero info visible", t === "1");
  await pg.evaluate(() => document.querySelector("[data-next]").click()); await pg.waitForTimeout(150); ok("reduced motion: dish swaps without long animation", (await pg.locator("[data-cur]").innerText()) === "02");
  await pg.context().close(); }

// 8 image fallback
{ const pg = await mk(); await go(pg, "/menu/chicken-curries/"); await pg.waitForTimeout(1200); ok("blocked photos show fallback, not broken icon", (await pg.locator("img[data-img]:visible").count()) === 0 || (await pg.locator(".ph--fallback, .ph.is-fallback, .ph__i").count()) > 0); await pg.context().close(); }

// 9 axe
if (axeSrc) for (const r of ["/", "/menu/", "/item/chicken-karahi/", "/cart/", "/contact/", "/reservations/"]) for (const w of [390, 1280]) { const pg = await mk(w, 900); await go(pg, r); await pg.waitForTimeout(1800); await pg.evaluate(axeSrc);
  const v = await pg.evaluate(async () => (await axe.run({ runOnly: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"] })).violations.map((x) => `${x.id}:${x.nodes.length}`));
  ok(`axe ${r} @${w}`, !v.length, v.join(",")); await pg.context().close(); }

await br.close(); srv.close(); console.log(out.join("\n")); console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
