/* Client view of the menu. Imports the same data module the build uses, so there is one source of truth. */
import { ITEMS } from "../../../data/menu.mjs";

export const M = {};
ITEMS.forEach((i) => {
  M[i.id] = { id: i.id, n: i.name, p: i.price, d: i.desc, c: i.cat, cn: i.catName, a: i.available, u: `/item/${i.id}/`,
    m: i.mods.map((m) => ({ id: m.id, l: m.label, t: m.type, r: !!m.required, min: m.min ?? (m.required ? 1 : 0), max: m.max ?? (m.type === "multi" ? m.options.length : 1), o: m.options.map((o) => [o.l, o.a || 0]) })) };
});
