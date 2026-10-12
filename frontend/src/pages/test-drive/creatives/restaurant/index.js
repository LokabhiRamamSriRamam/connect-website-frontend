/**
 * Restaurant creative manifests.
 *
 * Plain .js with NO JSX and no imports of components, following the
 * prerender-blogs.mjs precedent: scripts/check-test-drive.mjs must be able to
 * import this in node to validate that every componentKey resolves and every
 * `fields` entry has a matching `limits` entry. That constraint is why metadata
 * cannot live inside the component files — `componentKey` is a string here, and
 * creatives/registry.js is the only place strings meet JSX imports.
 *
 * This file is the non-developer-editable surface: labels, defaults, limits and
 * palette cover the 90% case of changing a creative without touching JSX.
 *
 * `nameKey` / `descKey` are i18n keys, not literals — the library has to read in
 * Hindi too, and a translated string must never be stored as data.
 *
 * On `limits`: these are CHARACTER caps tuned for the worse of the two languages.
 * Devanagari sets wider than Latin at the same size, and SVG <text> neither wraps
 * nor shrinks, so a headline that fits in English can overflow in Hindi on the
 * same template. When in doubt the limit is the Hindi-safe number.
 */

/** Every restaurant creative takes the same five fields the library UI exposes. */
const FIELDS = ["businessName", "headline", "offer", "price", "cta"];

export const restaurantCreatives = [
  {
    id: "r_thali_combo",
    industry: "restaurant",
    componentKey: "ThaliCombo",
    nameKey: "creatives.r_thali_combo.name",
    descKey: "creatives.r_thali_combo.desc",
    mediaType: "svg",
    aspect: "16:9",
    fields: FIELDS,
    defaults: {
      businessName: "",
      headline: "Full Thali Combo",
      offer: "Served all day with dessert",
      price: "₹249",
      cta: "Order now",
    },
    limits: { businessName: 24, headline: 28, offer: 34, price: 8, cta: 16 },
    palette: { bg: "#1F30A0", fg: "#FFFFFF", accent: "#F5C542", kicker: "#F5C542" },
    tags: ["offer", "meal", "value"],
  },
  {
    id: "r_lunch_special",
    industry: "restaurant",
    componentKey: "LunchSpecial",
    nameKey: "creatives.r_lunch_special.name",
    descKey: "creatives.r_lunch_special.desc",
    mediaType: "svg",
    aspect: "16:9",
    fields: FIELDS,
    defaults: {
      businessName: "",
      headline: "Lunch Special",
      offer: "12 to 3 only",
      price: "₹199",
      cta: "Dine in today",
    },
    limits: { businessName: 24, headline: 26, offer: 16, price: 8, cta: 16 },
    palette: { bg: "#FFF9F1", fg: "#191919", accent: "#914BFA", ribbon: "#EF4444" },
    tags: ["offer", "lunch", "timed"],
  },
];

export default restaurantCreatives;
