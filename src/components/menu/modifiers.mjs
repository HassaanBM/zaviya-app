import { esc, money } from "../../lib/site.mjs";

/* One modifier group. The client (features/ordering/dish-form.js) reads data-type, data-req, data-min and data-max. */
export const modField = (m) => {
  const multi = m.type === "multi";
  const min = m.min ?? (m.required ? 1 : 0), max = m.max ?? (multi ? m.options.length : 1);
  return `<fieldset class="mod" data-mod="${m.id}" data-type="${m.type}" data-req="${m.required ? 1 : 0}" data-min="${min}" data-max="${max}">
<legend>${esc(m.label)} <span class="${m.required ? "req" : "opt-t"}">${m.required ? "Required" : "Optional"}</span>${multi ? `<span class="hint"> Choose ${min && min === max ? min : min ? `${min} to ${max}` : `up to ${max}`}.</span>` : ""}</legend>
<div class="opts">${m.options.map((o, k) => `<label class="opt"><input type="${multi ? "checkbox" : "radio"}" name="${m.id}" value="${k}" data-add="${o.a || 0}"><span class="opt__l">${esc(o.l)}</span>${o.a ? `<span class="opt__p">+${money(o.a)}</span>` : ""}</label>`).join("")}</div>
<p class="err" data-mod-err hidden></p></fieldset>`;
};
