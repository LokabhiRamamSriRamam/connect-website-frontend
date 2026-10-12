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
  {
    id: "r_happy_hour",
    industry: "restaurant",
    componentKey: "HappyHour",
    nameKey: "creatives.r_happy_hour.name",
    descKey: "creatives.r_happy_hour.desc",
    mediaType: "svg",
    aspect: "16:9",
    fields: FIELDS,
    defaults: {
      businessName: "",
      headline: "Happy Hours",
      offer: "Two for one, 6 to 8 pm",
      price: "₹399",
      cta: "Book a table",
    },
    limits: { businessName: 22, headline: 24, offer: 26, price: 8, cta: 16 },
    palette: { bg: "#2B1055", fg: "#FFFFFF", accent: "#914BFA" },
    tags: ["offer", "evening", "drinks"],
  },
  {
    id: "r_todays_special",
    industry: "restaurant",
    componentKey: "TodaysSpecial",
    nameKey: "creatives.r_todays_special.name",
    descKey: "creatives.r_todays_special.desc",
    mediaType: "svg",
    aspect: "16:9",
    fields: FIELDS,
    defaults: {
      businessName: "",
      headline: "Today's Special",
      offer: "Ask our staff today",
      price: "₹299",
      cta: "Try it",
    },
    /**
     * Tighter than the left-aligned templates: this one CENTRES its text, so a
     * line grows in both directions from x=160 and has only 160 units of room
     * either side rather than 298 from a left margin. The headline also sets at
     * 21, so 24 characters measured out past the frame edge in both languages.
     */
    limits: { businessName: 20, headline: 18, offer: 24, price: 8, cta: 12 },
    palette: { bg: "#F6F1FF", fg: "#191919", accent: "#1F30A0" },
    tags: ["daily", "menu"],
  },
  {
    id: "r_family_feast",
    industry: "restaurant",
    componentKey: "FamilyFeast",
    nameKey: "creatives.r_family_feast.name",
    descKey: "creatives.r_family_feast.desc",
    mediaType: "svg",
    aspect: "16:9",
    fields: FIELDS,
    defaults: {
      businessName: "",
      headline: "Family Feast for Four",
      offer: "Save 20%",
      price: "₹899",
      cta: "Order now",
    },
    limits: { businessName: 22, headline: 28, offer: 14, price: 8, cta: 16 },
    palette: { bg: "#7A2E12", fg: "#FFFFFF", accent: "#F5C542" },
    tags: ["offer", "group", "value"],
  },
  {
    id: "r_new_on_menu",
    industry: "restaurant",
    componentKey: "NewOnMenu",
    nameKey: "creatives.r_new_on_menu.name",
    descKey: "creatives.r_new_on_menu.desc",
    mediaType: "svg",
    aspect: "16:9",
    fields: FIELDS,
    defaults: {
      businessName: "",
      headline: "New on the Menu",
      offer: "Freshly added this week",
      price: "₹179",
      cta: "Taste it",
    },
    limits: { businessName: 22, headline: 24, offer: 26, price: 8, cta: 14 },
    palette: { bg: "#FFFFFF", fg: "#191919", accent: "#4CAF6E" },
    tags: ["new", "menu"],
  },
  {
    id: "r_weekend_brunch",
    industry: "restaurant",
    componentKey: "WeekendBrunch",
    nameKey: "creatives.r_weekend_brunch.name",
    descKey: "creatives.r_weekend_brunch.desc",
    mediaType: "svg",
    aspect: "16:9",
    fields: FIELDS,
    defaults: {
      businessName: "",
      headline: "Weekend Brunch",
      offer: "Saturday and Sunday, 9 to 12",
      price: "₹449",
      cta: "Reserve",
    },
    limits: { businessName: 22, headline: 22, offer: 28, price: 8, cta: 14 },
    palette: { bg: "#FDF0E2", fg: "#191919", accent: "#F28C28" },
    tags: ["weekend", "brunch", "timed"],
  },
  {
    /**
     * Informational rather than promotional, and the only entry that does NOT
     * take the standard five fields: it declares three. The editor renders
     * inputs from `fields`, and CreativeFrame allowlists against the same list,
     * so the whole feature follows the manifest with no special-casing. Having
     * one template of a different shape is what keeps that honest.
     */
    id: "r_opening_hours",
    industry: "restaurant",
    componentKey: "OpeningHours",
    nameKey: "creatives.r_opening_hours.name",
    descKey: "creatives.r_opening_hours.desc",
    mediaType: "svg",
    aspect: "16:9",
    fields: ["businessName", "headline", "hours"],
    defaults: {
      businessName: "",
      headline: "We're Open",
      hours: "Mon to Sun, 11 am to 11 pm",
    },
    limits: { businessName: 22, headline: 22, hours: 34 },
    palette: { bg: "#191919", fg: "#FFFFFF", accent: "#914BFA" },
    tags: ["info", "hours"],
  },
];

export default restaurantCreatives;
