/**
 * Café creative manifests.
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
 *
 * Three field shapes here rather than one, all declared per-entry: the five-field
 * offer set, a four-field pair with nothing to price (LoyaltyCard, WifiWorkspace)
 * and a three-field informational card (CafeHours). The editor renders what the
 * manifest declares and CreativeFrame allowlists against the same list, so a
 * template of a different shape needs no code anywhere.
 */

/** The standard offer fields, shared by most of the set. */
const FIELDS = ["businessName", "headline", "offer", "price", "cta"];

/** For creatives with nothing to price: a loyalty card, a Wi-Fi notice. */
const FIELDS_NO_PRICE = ["businessName", "headline", "offer", "cta"];

export const cafeCreatives = [
  {
    id: "c_coffee_of_day",
    industry: "cafe",
    componentKey: "CoffeeOfDay",
    nameKey: "creatives.c_coffee_of_day.name",
    descKey: "creatives.c_coffee_of_day.desc",
    mediaType: "svg",
    aspect: "16:9",
    fields: FIELDS,
    defaults: {
      businessName: "",
      headline: "Coffee of the Day",
      offer: "Single origin, ground to order",
      price: "₹149",
      cta: "Ask at the counter",
    },
    limits: { businessName: 24, headline: 26, offer: 32, price: 8, cta: 18 },
    palette: { bg: "#FFF9F1", fg: "#191919", accent: "#F5C542", kicker: "#6B7280" },
    tags: ["offer", "coffee", "daily"],
  },
  {
    id: "c_morning_combo",
    industry: "cafe",
    componentKey: "MorningCombo",
    nameKey: "creatives.c_morning_combo.name",
    descKey: "creatives.c_morning_combo.desc",
    mediaType: "svg",
    aspect: "16:9",
    fields: FIELDS,
    defaults: {
      businessName: "",
      headline: "Coffee + Croissant",
      // The ribbon is short and fixed-width, so this limit is the tightest in
      // the set — a timed window is all it has room for.
      offer: "Till 11 am",
      price: "₹199",
      cta: "Grab and go",
    },
    limits: { businessName: 22, headline: 24, offer: 14, price: 8, cta: 16 },
    palette: { bg: "#F6F1FF", fg: "#191919", accent: "#F5C542", ribbon: "#914BFA", kicker: "#6B7280" },
    tags: ["offer", "morning", "timed", "combo"],
  },
  {
    id: "c_loyalty_card",
    industry: "cafe",
    componentKey: "LoyaltyCard",
    nameKey: "creatives.c_loyalty_card.name",
    descKey: "creatives.c_loyalty_card.desc",
    mediaType: "svg",
    aspect: "16:9",
    // No price: a loyalty card is a mechanic, not a thing with a number on it.
    fields: FIELDS_NO_PRICE,
    defaults: {
      businessName: "",
      headline: "Your 6th Cup, Free",
      offer: "Collect a stamp with every coffee",
      cta: "Join free",
    },
    // The headline sits on one line beside the card, so it is capped shorter
    // than the two-line headlines elsewhere.
    limits: { businessName: 22, headline: 22, offer: 36, cta: 14 },
    palette: { bg: "#F3FFF8", fg: "#191919", accent: "#4CAF6E", kicker: "#6B7280" },
    tags: ["loyalty", "repeat", "info"],
  },
  {
    id: "c_fresh_bakes",
    industry: "cafe",
    componentKey: "FreshBakes",
    nameKey: "creatives.c_fresh_bakes.name",
    descKey: "creatives.c_fresh_bakes.desc",
    mediaType: "svg",
    aspect: "16:9",
    fields: FIELDS,
    defaults: {
      businessName: "",
      headline: "Fresh From the Oven",
      offer: "Baked twice daily",
      price: "₹89",
      cta: "Still warm",
    },
    limits: { businessName: 24, headline: 26, offer: 28, price: 8, cta: 16 },
    palette: { bg: "#FFF9F1", fg: "#191919", accent: "#F28C28", kicker: "#6B7280" },
    tags: ["offer", "bakery", "fresh"],
  },
  {
    id: "c_iced_summer",
    industry: "cafe",
    componentKey: "IcedSummer",
    nameKey: "creatives.c_iced_summer.name",
    descKey: "creatives.c_iced_summer.desc",
    mediaType: "svg",
    aspect: "16:9",
    fields: FIELDS,
    defaults: {
      businessName: "",
      headline: "Cold Brew Is Here",
      offer: "Steeped 18 hours, over ice",
      price: "₹179",
      cta: "Cool down",
    },
    limits: { businessName: 24, headline: 24, offer: 32, price: 8, cta: 16 },
    // The one cool palette in the set, for when the weather turns.
    palette: { bg: "#4B3FD0", fg: "#FFFFFF", accent: "#BFB1A6", kicker: "#F3FFF8" },
    tags: ["offer", "cold", "summer"],
  },
  {
    id: "c_wifi_workspace",
    industry: "cafe",
    componentKey: "WifiWorkspace",
    nameKey: "creatives.c_wifi_workspace.name",
    descKey: "creatives.c_wifi_workspace.desc",
    mediaType: "svg",
    aspect: "16:9",
    // No price: this sells the room, not an item.
    fields: FIELDS_NO_PRICE,
    defaults: {
      businessName: "",
      headline: "Fast Wi-Fi, All Day",
      offer: "Plug points at every table. Ask us for the password.",
      cta: "Settle in",
    },
    // The offer runs to two lines here, so it takes the set's longest cap.
    limits: { businessName: 24, headline: 24, offer: 52, cta: 14 },
    palette: { bg: "#E9E8F6", fg: "#191919", accent: "#914BFA", kicker: "#6B7280" },
    tags: ["info", "workspace", "wifi"],
  },
  {
    id: "c_evening_unwind",
    industry: "cafe",
    componentKey: "EveningUnwind",
    nameKey: "creatives.c_evening_unwind.name",
    descKey: "creatives.c_evening_unwind.desc",
    mediaType: "svg",
    aspect: "16:9",
    fields: FIELDS,
    defaults: {
      businessName: "",
      headline: "Evenings, Slower",
      offer: "Decaf, chai and quiet corners",
      price: "₹129",
      cta: "Stay a while",
    },
    limits: { businessName: 24, headline: 24, offer: 34, price: 8, cta: 16 },
    palette: { bg: "#191919", fg: "#FFFFFF", accent: "#F5C542", kicker: "#F5C542" },
    tags: ["offer", "evening", "calm"],
  },
  {
    id: "c_opening_hours",
    industry: "cafe",
    componentKey: "CafeHours",
    nameKey: "creatives.c_opening_hours.name",
    descKey: "creatives.c_opening_hours.desc",
    mediaType: "svg",
    aspect: "16:9",
    // Informational, like the restaurant set's opening-hours card.
    fields: ["businessName", "headline", "hours"],
    defaults: {
      businessName: "",
      headline: "Open Today",
      hours: "Mon to Sun, 7 am to 10 pm",
    },
    limits: { businessName: 22, headline: 22, hours: 34 },
    palette: { bg: "#F2EEE7", fg: "#191919", accent: "#914BFA" },
    tags: ["info", "hours"],
  },
];

export default cafeCreatives;
