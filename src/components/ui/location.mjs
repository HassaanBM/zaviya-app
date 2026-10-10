import { R, icon } from "../../lib/site.mjs";
import { EXT } from "./html.mjs";

export const factList = () => `<ul class="facts"><li>${icon("map-pin")}<a href="${R.directions}"${EXT}>${R.addr1}, ${R.addr2}</a></li><li>${icon("clock")}<span>${R.hours.label}</span></li><li>${icon("phone")}<a href="tel:${R.tel}">${R.phone}</a></li><li>${icon("envelope-simple")}<a href="mailto:${R.email}">${R.email}</a></li></ul>`;
/* The embed loads only after the visitor presses the button (client/features/map.js). */
export const mapBlock = () => `<div class="map" data-map data-src="${R.mapEmbed}"><div class="map__ph">${icon("map-pin")}<p>${R.addr1}<br>${R.addr2}</p><button class="btn btn--ghost" type="button" data-map-load>Show map</button><p class="muted">The map loads from Google when you press the button.</p></div></div>`;
