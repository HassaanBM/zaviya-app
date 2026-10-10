/* Customer-facing copy that is used in more than one place, or that an owner is likely to edit.
   Facts come from zaviyagrill.com (checked Oct 2026). Business details live in restaurant.mjs, not here. */
import { R } from "./restaurant.mjs";

export const BRAND = {
  tagline: R.tagline,
  cuisine: "Pakistani, Indian and Punjabi",
  heroEyebrow: "North Austin · Pakistani, Indian and Punjabi",
  heroTitle: ["Discover &amp; Order", "Killer Comfort Food"],
  searchPlaceholder: "Search dishes, like karahi or naan",
  intro: {
    h: "Fresh ingredients. Killer comfort food.",
    p: "Zaviya Grill serves Pakistani, Indian and Punjabi dishes in North Austin. Grills, curries, biryani, breads, desserts and drinks, made with house-ground spices, halal meat and fresh vegetables.",
    points: [["fire", "Grills and platters", "Chicken, beef and goat from the grill."], ["cooking-pot", "Curries and karahi", "Slow-cooked gravies, served with rice or bread."], ["leaf", "Fresh and halal", "Halal meat, house-ground spices, vegetables prepared daily."]],
  },
  story: {
    eyebrow: "A different angle",
    h: "Zaviya means a unique perspective",
    p: "Chef and restaurateur Kashif Taj opened Mirchi Restaurant on Parmer Lane in 2014. Zaviya Grill grew from it. In 2019 he partnered with physician Junaid Siddiqui, M.D., who wanted similar foods made with healthier ingredient swaps.",
    checks: ["House-ground spices", "Halal meat", "Fresh vegetables, prepared daily"],
  },
  deals: { none: "We have no active offers listed right now. Holiday hours are below. Check back for new deals." },
  catering: "Order catering through ezCater, or send us an inquiry.",
  parties: "Birthdays, team dinners and family gatherings. Tell us your date and guest count.",
  reservations: "Book with our reservation partner. You choose the party size and time, then add your details.",
};

export const PAGES = {
  menu: { title: "Menu and Online Ordering | Zaviya Grill, Austin TX", lead: (n, c) => `${n} dishes in ${c} sections. Add dishes to your order, then check out.` },
  search: { title: "Search the Menu | Zaviya Grill", desc: "Search all Zaviya Grill dishes by name.", lead: "Type a dish name or an ingredient." },
  deals: { title: "Special Deals and Holiday Hours | Zaviya Grill", desc: "Current offers and holiday hours at Zaviya Grill in North Austin.", lead: "Offers and holiday hours." },
  about: { title: "About Zaviya Grill | Pakistani Kitchen in North Austin", desc: "The story of Zaviya Grill: chef Kashif Taj, Dr. Junaid Siddiqui and a Pakistani, Indian and Punjabi menu made with fresh ingredients.", lead: "Zaviya means angle. We cook familiar food from a different one." },
  catering: { title: "Catering | Zaviya Grill, Austin TX", desc: "Order Pakistani and Indian catering from Zaviya Grill through ezCater, or send us an inquiry for your event.", lead: "Food for offices, family events and parties." },
  parties: { title: "Parties and Group Dining | Zaviya Grill, Austin TX", desc: "Plan a birthday, team dinner or family gathering at Zaviya Grill in North Austin.", lead: "Tell us your date and group size." },
  reservations: { title: "Reservations | Zaviya Grill, Austin TX", desc: "Reserve a table at Zaviya Grill in North Austin. Book through our reservation partner or call us.", lead: "Pick your party size and time with our reservation partner." },
  reservationStatus: { title: "Check or Change a Reservation | Zaviya Grill", desc: "How to check, change or cancel a Zaviya Grill reservation.", lead: "We do not keep reservations on this site." },
  contact: { title: "Contact Zaviya Grill | North Austin, TX", desc: "Address, phone, email and hours for Zaviya Grill on W Parmer Ln in Austin, Texas.", lead: "Call, email or visit." },
  gallery: { title: "Gallery | Zaviya Grill, Austin TX", desc: "Photos of dishes from Zaviya Grill.", lead: "Dishes from our kitchen." },
};

export const GRATUITY = "Auto-gratuity of 15% applies to parties of 4 or more, and 20% to parties of 10 or more.";

const li = (a) => `<ul>${a.map((x) => `<li>${x}</li>`).join("")}</ul>`;
/* Legal pages are DRAFTS. The owner and counsel must review them before launch. */
export const LEGAL = {
  privacy: { h1: "Privacy Policy", desc: "How the Zaviya Grill website handles your information.", body: `<h2>What this site stores</h2><p>This site keeps your order on your own device, in your browser storage, so it is there when you come back. It does not send that data to us. It does not set tracking cookies.</p><h2>What you send us</h2><p>When you call, email or use a partner service, that provider gets what you give it. The contact and inquiry forms open a draft in your email app. You choose whether to send it.</p><h2>Partner services</h2>${li(["Online ordering: Toast.", "Reservations: our booking partner at tmt.spotapps.co.", "Catering: ezCater.", "Photos load from static.spotapps.co. Their servers see your IP address when a photo loads.", "The map loads from Google only after you press Show map."])}<p>Each partner has its own privacy policy. Read it before you give personal data.</p><h2>Your choices</h2><p>You can clear your order any time from the order page, or clear site data in your browser.</p><h2>Contact</h2><p>${R.email} or <a href="tel:${R.tel}">${R.phone}</a>.</p>` },
  terms: { h1: "Terms and Conditions", desc: "Terms for using the Zaviya Grill website.", body: `<h2>Using this site</h2><p>Use the site to read the menu, plan a visit and start an order. Prices and dishes can change. The restaurant's price at the time of your order applies.</p><h2>Orders</h2><p>This site does not take payment. Orders are placed and paid through the ordering partner. Tax and fees are added there. Add-on items may take 25 to 30 minutes.</p><h2>Gratuity</h2><p>${GRATUITY}</p><h2>Allergies</h2><p>Tell your server about food allergies before you order. This site cannot confirm that a dish is free of an allergen.</p><h2>Third-party services</h2><p>Partner services have their own terms. We are not responsible for them.</p><h2>Contact</h2><p>${R.email}.</p>` },
  access: { h1: "Accessibility Statement", desc: "Accessibility at Zaviya Grill online.", body: `<h2>Our aim</h2><p>We aim to meet WCAG 2.2 level AA. We design for keyboard use, screen readers, zoom, small screens and reduced motion.</p><h2>What we do</h2>${li(["All actions work with a keyboard.", "Focus is visible and moves into dialogs and back.", "The reduced-motion setting turns off page animation and smooth scroll.", "Photos have text descriptions."])}<h2>Known limits</h2>${li(["Booking, ezCater and Toast pages are not ours. Their accessibility can differ.", "The map is a Google embed."])}<h2>Report a problem</h2><p>Email ${R.email} or call <a href="tel:${R.tel}">${R.phone}</a>. Tell us the page and what happened. If you want to order by phone, call us.</p>` },
  cookies: { h1: "Cookies and Storage", desc: "What the Zaviya Grill website stores in your browser.", body: `<h2>Cookies</h2><p>This site sets no cookies.</p><h2>Browser storage</h2><table class="tbl"><thead><tr><th scope="col">Name</th><th scope="col">Purpose</th><th scope="col">Lasts</th></tr></thead><tbody><tr><th scope="row">zg_cart_v1</th><td>Keeps your order on this device.</td><td>Until you clear it</td></tr><tr><th scope="row">zg_intro</th><td>Skips the opening animation after the first visit.</td><td>This tab session</td></tr><tr><th scope="row">zg_tr</th><td>Marks a page change so the page transition can finish.</td><td>Seconds</td></tr></tbody></table><h2>Partners</h2><p>Partner sites you open (Toast, ezCater, booking, Google Maps, Yelp, social networks) can set their own cookies.</p>` },
};
