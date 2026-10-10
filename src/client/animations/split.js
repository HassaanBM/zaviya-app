/* Split text into masked words (keeps <em> and <br>). The original text is kept in aria-label. */
import { $$, D } from "../lib/dom.js";

export function split(el) {
  const frag = D.createDocumentFragment();
  (function walk(node, parent) {
    Array.prototype.forEach.call(node.childNodes, (n) => {
      if (n.nodeType === 3) {
        n.textContent.split(/(\s+)/).forEach((t) => {
          if (!t) return;
          if (/^\s+$/.test(t)) { parent.appendChild(D.createTextNode(" ")); return; }
          const w = D.createElement("span"); w.className = "w";
          const i = D.createElement("span"); i.textContent = t; w.appendChild(i); parent.appendChild(w);
        });
      } else if (n.nodeType === 1) { const c = n.cloneNode(false); parent.appendChild(c); if (n.tagName !== "BR") walk(n, c); }
    });
  })(el, frag);
  el.setAttribute("aria-label", el.textContent.replace(/\s+/g, " ").trim());
  el.textContent = ""; el.appendChild(frag);
  $$(".w", el).forEach((w) => w.setAttribute("aria-hidden", "true"));
  return $$(".w>span", el);
}
