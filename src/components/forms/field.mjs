/* Form builders. Validation lives in client/features/forms/forms.js and reads the ids and aria wiring created here. */
import { esc } from "../../lib/site.mjs";

export const fld = ({ id, label, type = "text", req = false, auto = "", hint = "", ph = "", max, rows, min, opts, half = false, pattern, inputmode }) => {
  const d = `${id}-h`, e = `${id}-e`;
  const common = `id="${id}" name="${id}" ${req ? "required" : ""} ${auto ? `autocomplete="${auto}"` : ""} ${max ? `maxlength="${max}"` : ""} ${ph ? `placeholder="${esc(ph)}"` : ""} aria-describedby="${hint ? d + " " : ""}${e}"`;
  let ctl;
  if (type === "textarea") ctl = `<textarea ${common} rows="${rows || 4}"></textarea>`;
  else if (type === "select") ctl = `<select ${common}><option value="">Choose</option>${opts.map((o) => `<option>${o}</option>`).join("")}</select>`;
  else ctl = `<input type="${type}" ${common} ${min ? `min="${min}"` : ""} ${pattern ? `pattern="${pattern}"` : ""} ${inputmode ? `inputmode="${inputmode}"` : ""}>`;
  return `<div class="fld${half ? " fld--half" : ""}"><label for="${id}">${label}${req ? ' <span class="req">Required</span>' : ""}</label>${hint ? `<p class="hint" id="${d}">${hint}</p>` : ""}${ctl}<p class="err" id="${e}" hidden></p></div>`;
};
/** name selects the submit behavior in the client: contact, catering, parties, login, signup, forgot, checkout. */
export const form = (name, fields, submit, extra = "") => `<form class="form" data-form="${name}" novalidate>${fields}<div class="form__act"><button class="btn btn--lg" type="submit">${submit}</button></div><div class="form__msg" data-msg role="status" aria-live="polite" tabindex="-1" hidden></div>${extra}</form>`;
export const inquiryForm = (name, extra, label) => form(name, fld({ id: "name", label: "Your name", req: true, auto: "name", max: 80, half: true }) + fld({ id: "phone", label: "Phone", type: "tel", req: true, auto: "tel", half: true, inputmode: "tel" }) + fld({ id: "email", label: "Email", type: "email", req: true, auto: "email", max: 120 }) + extra + fld({ id: "message", label: "Details", type: "textarea", max: 600, hint: "Menu ideas, timing, questions. Do not include allergy or payment details here." }), label);
