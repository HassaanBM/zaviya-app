/* Tiny DOM helpers shared by all client modules. No framework. */
export const D = document;
export const root = document.documentElement;
export const CFG = window.ZG_CONFIG || {};
export const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
export const $ = (s, c) => (c || D).querySelector(s);
export const $$ = (s, c) => Array.prototype.slice.call((c || D).querySelectorAll(s));
export const money = (n) => "$" + (Math.round(n * 100) / 100).toFixed(2);

/** Create an element. attrs: text, html (trusted markup only), or any attribute. */
export function h(tag, attrs, kids) {
  const e = D.createElement(tag);
  if (attrs) Object.keys(attrs).forEach((k) => { const v = attrs[k]; if (v === false || v == null) return; if (k === "text") e.textContent = v; else if (k === "html") e.innerHTML = v; else e.setAttribute(k, v === true ? "" : v); });
  (kids || []).forEach((c) => { if (c) e.appendChild(typeof c === "string" ? D.createTextNode(c) : c); });
  return e;
}
export const ss = {
  get: (k) => { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
  set: (k, v) => { try { sessionStorage.setItem(k, v); } catch (e) {} },
  del: (k) => { try { sessionStorage.removeItem(k); } catch (e) {} },
};

/** Internal link that also works in the relative "preview" build (meta zg-base holds the prefix). */
export function rel(u) {
  const m = $('meta[name="zg-base"]'), b = m ? m.content : "/";
  if (b === "/") return u;
  if (u === "/") return b + "index.html";
  return b + u.slice(1) + (u.slice(-1) === "/" ? "index.html" : "");
}

/* Screen reader announcements and the small toast. */
const live = $("[data-live]"), toastEl = $("[data-toast]");
let toastT;
export function say(t) { if (!live) return; live.textContent = ""; setTimeout(() => { live.textContent = t; }, 30); }
export function toast(t) {
  say(t); if (!toastEl) return;
  toastEl.textContent = t; toastEl.hidden = false;
  requestAnimationFrame(() => toastEl.classList.add("on"));
  clearTimeout(toastT);
  toastT = setTimeout(() => { toastEl.classList.remove("on"); setTimeout(() => { toastEl.hidden = true; }, 300); }, 2600);
}

export const ICON = {
  minus: '<svg class="ico" aria-hidden="true" viewBox="0 0 256 256" fill="currentColor"><path d="M224 128a8 8 0 0 1-8 8H40a8 8 0 0 1 0-16h176a8 8 0 0 1 8 8Z"/></svg>',
  plus: '<svg class="ico" aria-hidden="true" viewBox="0 0 256 256" fill="currentColor"><path d="M224 128a8 8 0 0 1-8 8h-80v80a8 8 0 0 1-16 0v-80H40a8 8 0 0 1 0-16h80V40a8 8 0 0 1 16 0v80h80a8 8 0 0 1 8 8Z"/></svg>',
  bowl: '<svg class="ico ph__i" aria-hidden="true" viewBox="0 0 256 256" fill="currentColor"><path d="M232 120h-8.2a96.1 96.1 0 0 0-191.6 0H24a8 8 0 0 0 0 16h8.3a96 96 0 0 0 191.4 0H232a8 8 0 0 0 0-16ZM128 40a80.1 80.1 0 0 1 79.7 80H48.3A80.1 80.1 0 0 1 128 40Zm0 176a80.1 80.1 0 0 1-79.7-64h159.4A80.1 80.1 0 0 1 128 216Z"/></svg>',
};
