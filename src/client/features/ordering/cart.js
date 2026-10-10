/* Cart state. Pure logic: no DOM. Stored in localStorage as zg_cart_v1 (ids, options, quantity, note only).
   Prices are never stored: they are recomputed from the menu data on every read, so edited storage cannot change a price. */
import { D } from "../../lib/dom.js";
import { M } from "./menu-index.js";

const KEY = "zg_cart_v1";
let mem = [], lines = [];

/** Validate one stored line against the menu. Returns null if it cannot be ordered. */
export function clean(l) {
  const it = l && M[l.id]; if (!it || !it.a) return null;
  const o = {};
  it.m.forEach((m) => {
    let s = ((l.o || {})[m.id] || []).filter((i) => Number.isInteger(i) && i >= 0 && i < m.o.length);
    if (m.t === "single") s = s.slice(0, 1);
    if (m.t === "multi") s = s.slice(0, m.max);
    if (s.length) o[m.id] = s;
  });
  return { id: l.id, o, qty: Math.max(1, Math.min(20, parseInt(l.qty, 10) || 1)), note: String(l.note || "").slice(0, 140) };
}
function load() {
  try { const a = JSON.parse(localStorage.getItem(KEY) || "[]"); return (Array.isArray(a) ? a : []).map(clean).filter(Boolean); }
  catch (e) { return mem.map(clean).filter(Boolean); }
}
function save() { mem = lines; try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch (e) {} D.dispatchEvent(new CustomEvent("zg:cart")); }

export const getLines = () => lines;
export const lineKey = (l) => l.id + "|" + Object.keys(l.o).sort().map((m) => m + ":" + l.o[m].slice().sort().join(".")).join(";") + "|" + l.note;
export const unitPrice = (l) => { const it = M[l.id]; let p = it.p; it.m.forEach((m) => (l.o[m.id] || []).forEach((i) => { p += m.o[i][1]; })); return p; };
export const optionText = (l) => M[l.id].m.map((m) => { const s = l.o[m.id]; return s && s.length ? m.l + ": " + s.map((i) => m.o[i][0]).join(", ") : ""; }).filter(Boolean).join(" | ");
export const count = () => lines.reduce((a, l) => a + l.qty, 0);
export const subtotal = () => lines.reduce((a, l) => a + unitPrice(l) * l.qty, 0);
export function addLine(id, o, qty, note) {
  const n = clean({ id, o: o || {}, qty: qty || 1, note: note || "" }); if (!n) return false;
  const f = lines.filter((l) => lineKey(l) === lineKey(n))[0];
  if (f) f.qty = Math.min(20, f.qty + n.qty); else lines.push(n);
  save(); return true;
}
export function setQty(k, q) { const l = lines.filter((x) => lineKey(x) === k)[0]; if (!l) return; l.qty = Math.max(1, Math.min(20, q)); save(); }
export function removeLine(k) { lines = lines.filter((x) => lineKey(x) !== k); save(); }
export function clearCart() { lines = []; save(); }
export function initCartState() {
  lines = load();
  addEventListener("storage", (e) => { if (e.key === KEY) { lines = load(); D.dispatchEvent(new CustomEvent("zg:cart")); } }); // other tabs
}
