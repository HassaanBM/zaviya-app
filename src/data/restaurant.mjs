/* One place for business details. Every value comes from zaviyagrill.com (checked Oct 2026).
   Edit here. Nothing else in the site repeats these values. */
export const R = {
  name: "Zaviya Grill",
  tagline: "Fresh Ingredients. Killer Comfort Food.",
  site: "https://zaviyagrill.com",              // set to the final domain before launch
  phone: "(512) 284-8298", tel: "+15122848298",
  email: "zaviyagrill@gmail.com",
  address: { street: "1212 W Parmer Ln, Unit A", city: "Austin", region: "TX", zip: "78727", country: "US" },
  hours: { label: "Every day, 11:00 AM to 12:00 AM", opens: "11:00", closes: "00:00" },
  tz: "America/Chicago",
  logoUrl: "", // Official logo: https://static.spotapps.co/website_images/ab_websites/67749_website/logo.png . Left empty so the wordmark shows. Set it to use the image.
  links: {
    toast: "https://order.toasttab.com/online/zaviya-grill",
    reserve: "https://tmt.spotapps.co/reservations?spot_id=67749",
    ezcater: "https://www.ezcater.com/catering/pvt/zaviya-grill-3?aff",
    cateringWidget: "https://tmt.spotapps.co/catering?spot_id=67749",
    yelp: "https://www.yelp.com/biz/zaviya-grill-austin",
    x: "https://www.twitter.com/ZaviyaGrill",
    facebook: "https://www.facebook.com/909053135823065",
    instagram: "https://www.instagram.com/zaviyagrill",
    official: "https://www.zaviyagrill.com/",
  },
};
R.addr1 = R.address.street; R.addr2 = `${R.address.city}, ${R.address.region} ${R.address.zip}`;
R.directions = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(`${R.address.street}, ${R.addr2}`);
R.mapEmbed = "https://www.google.com/maps?q=" + encodeURIComponent(`${R.address.street}, ${R.addr2}`) + "&output=embed";

export const REVIEWS = [
  { q: "Best Pakistani/North Indian restaurant in ATX. Chicken boti and Beef Seekh Kabob are my favorites.", by: "Imran F" },
  { q: "Best in Town their food is absolutely the most delicious and I consider my favorite restaurant of all.", by: "Austin Tech A" },
  { q: "Their plain naan is must try with any curries.", by: "Mr. Unknown" },
  { q: "Really friendly hosts when you walk in!", by: "Alyssa G" },
]; // Yelp reviews shown on zaviyagrill.com. A fifth review has a garbled phrase in the source and is left out.

export const EVENTS = [
  { name: "Halloween", date: "2026-10-31", when: "Saturday, October 31, 11:00 AM to 12:00 AM", text: "Wear your best costume." },
  { name: "Thanksgiving", date: "2026-11-26", when: "Thursday, November 26, 11:00 AM to 11:00 PM", text: "Bring friends and family for a holiday meal." },
  { name: "Christmas", date: "2026-12-25", when: "Friday, December 25, 11:00 AM to 12:00 AM", text: "Join us with family and friends." },
  { name: "New Year's Eve", date: "2026-12-31", when: "Thursday, December 31, 11:00 AM to 11:00 PM", text: "Celebrate the new year with us." },
];
