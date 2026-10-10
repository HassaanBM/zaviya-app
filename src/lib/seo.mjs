/* JSON-LD builders. Only facts from data/restaurant.mjs are used. */
import { R, U } from "./site.mjs";
import { IMG } from "../data/images.mjs";

const tag = (o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`;
export const restaurantLd = () => tag({
  "@context": "https://schema.org", "@type": "Restaurant", name: R.name, url: R.site + "/", image: IMG.og.src, telephone: R.phone, email: R.email,
  servesCuisine: ["Pakistani", "Indian", "Punjabi"],
  address: { "@type": "PostalAddress", streetAddress: R.address.street, addressLocality: R.address.city, addressRegion: R.address.region, postalCode: R.address.zip, addressCountry: "US" },
  openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: R.hours.opens, closes: R.hours.closes }],
  hasMenu: R.site + U.menu, sameAs: [R.links.yelp, R.links.facebook, R.links.instagram, R.links.x],
});
export const breadcrumbLd = (trail) => tag({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: trail.map(([n, u], k) => ({ "@type": "ListItem", position: k + 1, name: n, item: R.site + u })) });
