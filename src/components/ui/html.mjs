/* Small HTML builders reused by every page. */
import { esc, icon } from "../../lib/site.mjs";

export const EXT = ' rel="noopener" target="_blank"';
/** Link. cls is the class list, ext opens in a new tab. */
export const A = (href, text, cls = "", ext = false) => `<a${cls ? ` class="${cls}"` : ""} href="${href}"${ext ? EXT : ""}>${text}</a>`;
export const arrow = (t) => `${t} ${icon("arrow-right")}`;

export const panel = (h, body) => `<div class="panel panel--plain"><h2>${h}</h2>${body}</div>`;

/** Page heading block with breadcrumbs. crumbs: [[label, href]], last one has no href. */
export const phead = ({ crumbs = [], h1, lead = "", eyebrow = "", home = "/" }) => `<section class="ph-head"><div class="wrap">
${crumbs.length ? `<nav class="crumbs" aria-label="Breadcrumb"><ol>${[["Home", home], ...crumbs].map(([t, h], i, a) => `<li>${h && i < a.length - 1 ? `<a href="${h}">${t}</a>` : `<span aria-current="page">${t}</span>`}</li>`).join("")}</ol></nav>` : ""}
${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ""}<h1 data-split>${h1}</h1>${lead ? `<p class="lead" data-reveal>${lead}</p>` : ""}</div></section>`;

/** Section header: eyebrow, h2 and an optional right-hand link. */
export const sechead = (eyebrow, id, h, right = "") => `<header class="sec__head"><div><p class="eyebrow" data-reveal>${eyebrow}</p><h2 id="${id}" data-split>${h}</h2></div>${right}</header>`;
export const noteBox = (text, ic = "info") => `<p class="note">${icon(ic)}${esc(text)}</p>`;
