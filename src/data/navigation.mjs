/* Navigation lists. Labels are the site's single naming for each destination. */
import { U } from "../lib/site.mjs";
import { R } from "./restaurant.mjs";

export const PRIMARY_NAV = [["Menu", U.menu], ["Special Deals", U.deals], ["Reservations", U.reservations], ["About", U.about], ["Contact", U.contact]];
export const DRAWER_NAV = [["Menu", U.menu], ["Order Online", U.menu], ["Special Deals", U.deals], ["Reservations", U.reservations], ["About", U.about], ["Catering", U.catering], ["Parties", U.parties], ["Gallery", U.gallery], ["Contact", U.contact], ["Log in", U.login]];
export const SOCIAL = [["X", "x", R.links.x], ["Facebook", "facebook", R.links.facebook], ["Instagram", "instagram", R.links.instagram], ["Yelp", "yelp", R.links.yelp]];
export const FOOTER_COLS = {
  orderBook: [["Menu", U.menu], ["Order Online", U.menu], ["Reservations", U.reservations], ["Catering", U.catering], ["Parties", U.parties]],
  explore: [["Special Deals", U.deals], ["About", U.about], ["Gallery", U.gallery], ["Account", U.account]],
};
export const LEGAL_NAV = [["Privacy Policy", U.privacy], ["Terms and Conditions", U.terms], ["Accessibility", U.access], ["Cookies and storage", U.cookies]];
