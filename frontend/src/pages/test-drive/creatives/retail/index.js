/**
 * Retail creative manifests.
 *
 * Plain .js with NO JSX and no imports of components, following the
 * creatives/cafe/index.js precedent: scripts/check-test-drive.mjs must be able to
 * import this in node to validate that every componentKey resolves and every
 * `fields` entry has a matching `limits` entry.
 *
 * The brief comes from SCREEN_BAZAAR_PLAN.md §4b, which gives retail its motifs —
 * price tag, bag, hanger, % burst — and its story: a shop window whose screens
 * cycle offers at passing shoppers. Those four motifs are spread across the set
 * rather than repeated, so a visitor cycling the library sees eight different
 * drawings and not one drawing in eight colours.
 *
 * `nameKey` / `descKey` are i18n keys, not literals — the library has to read in
 * Hindi too, and a translated string must never be stored as data.
 *
 * On `limits`: CHARACTER caps tuned for the worse of the two languages. Devanagari
 * sets wider than Latin at the same size, and SVG <text> neither wraps nor shrinks,
 * so a headline that fits in English can overflow in Hindi on the same template.
 * When in doubt the limit is the Hindi-safe number.
 *
 * Four field shapes here, all declared per-entry: the five-field offer set, a
 * four-field pair with nothing to price (NewArrivals, StoreHours is three), a
 * discount-led card whose `price` slot carries a percentage rather than a rupee
 * figure (FlashSale, ClearanceRack), and the three-field informational card. The
 * editor renders what the manifest declares and CreativeFrame allowlists against
 * the same list, so a template of a different shape needs no code anywhere.
 */

/** The standard offer fields, shared by most of the set. */
const FIELDS = ["businessName", "headline", "offer", "price", "cta"];

/** For creatives with nothing to price: an arrivals announcement, a members notice. */
const FIELDS_NO_PRICE = ["businessName", "headline", "offer", "cta"];

export const retailCreatives = [
  {
    id: "rt_flash_sale",
    industry: "retail",
    componentKey: "FlashSale",
    nameKey: "creatives.rt_flash_sale.name",
    descKey: "creatives.rt_flash_sale.desc",
    mediaType: "svg",
    aspect: "16:9",
    fields: FIELDS,
    defaults: {
      businessName: "",
      headline: "Flash Sale",
      offer: "Today only",
      // The price slot carries a percentage here. The field is still `price`
      // because the editor, the allowlist and the limits all key off that name —
      // renaming it per-template would fork the field vocabulary for no gain.
      price: "40% OFF",
      cta: "Shop now",
    },
    // `price` runs longer than the rupee figures elsewhere ("40% OFF" is 8), so
    // the burst is sized for it and the cap is loosened to match.
    //
    // The headline is capped at 16 rather than 20: it is set on ONE line at 24px
    // with the burst occupying the right third, so it has about 170 units to run
    // in. Hindi at that size overflowed the frame at 20 — caught by the
    // limit-length check in check-creative-safety.mjs, which is the regression
    // §13 calls the most likely one in the feature.
    // `offer` capped at 26, not 32: the burst occupies the right third from
    // Both caps below are set by the BURST, not by language.
    //
    // `price` 8: it is centred at x=232, so every character grows it in both
    // directions. At 8 Devanagari characters it spans ~85 units and its left
    // edge stops near x=190. A discount reads as "40% OFF" or "50% छूट" in 8.
    //
    // `offer` 18: that left edge is what the offer line must clear. From x=22 at
    // 11.5px, 18 Devanagari characters reach about x=150 — clear of both the
    // price and the star's painted edge near x=183.
    limits: { businessName: 24, headline: 16, offer: 18, price: 8, cta: 16 },
    palette: { bg: "#EF4444", fg: "#FFFFFF", accent: "#F5C542", kicker: "#FEE8EC" },
    tags: ["offer", "sale", "urgent", "discount"],
  },
  {
    id: "rt_new_arrivals",
    industry: "retail",
    componentKey: "NewArrivals",
    nameKey: "creatives.rt_new_arrivals.name",
    descKey: "creatives.rt_new_arrivals.desc",
    mediaType: "svg",
    aspect: "16:9",
    // No price: an arrivals drop announces that stock has landed, not what it
    // costs. The price lives on the swing tag in the aisle.
    fields: FIELDS_NO_PRICE,
    defaults: {
      businessName: "",
      headline: "Just Dropped",
      offer: "New season, now in store",
      cta: "See the rack",
    },
    limits: { businessName: 24, headline: 22, offer: 34, cta: 16 },
    palette: { bg: "#F6F1FF", fg: "#191919", accent: "#914BFA", kicker: "#6B7280" },
    tags: ["announcement", "arrivals", "new"],
  },
  {
    id: "rt_buy_one_get_one",
    industry: "retail",
    componentKey: "BuyOneGetOne",
    nameKey: "creatives.rt_buy_one_get_one.name",
    descKey: "creatives.rt_buy_one_get_one.desc",
    mediaType: "svg",
    aspect: "16:9",
    fields: FIELDS,
    defaults: {
      businessName: "",
      headline: "Buy 1 Get 1",
      offer: "On selected styles",
      price: "FREE",
      cta: "Pick yours",
    },
    // Headline 13 at 23px: the bags' halo begins around x=172, and the headline
    // runs from x=22 on one line, so it has roughly 150 units before it collides
    // with the picture.
    limits: { businessName: 22, headline: 13, offer: 28, price: 8, cta: 16 },
    palette: { bg: "#FFF9F1", fg: "#191919", accent: "#4CAF6E", kicker: "#6B7280" },
    tags: ["offer", "bogo", "value"],
  },
  {
    id: "rt_price_drop",
    industry: "retail",
    componentKey: "PriceDrop",
    nameKey: "creatives.rt_price_drop.name",
    descKey: "creatives.rt_price_drop.desc",
    mediaType: "svg",
    aspect: "16:9",
    fields: FIELDS,
    defaults: {
      businessName: "",
      headline: "Price Drop",
      offer: "Was ₹2,499",
      price: "₹1,499",
      cta: "Limited stock",
    },
    // The offer line carries the struck-through old price, so it is capped tight —
    // it is a short factual line, not a sentence.
    limits: { businessName: 24, headline: 20, offer: 20, price: 10, cta: 18 },
    palette: { bg: "#FFFFFF", fg: "#191919", accent: "#EF4444", kicker: "#6B7280" },
    tags: ["offer", "price", "discount"],
  },
  {
    id: "rt_weekend_offer",
    industry: "retail",
    componentKey: "WeekendOffer",
    nameKey: "creatives.rt_weekend_offer.name",
    descKey: "creatives.rt_weekend_offer.desc",
    mediaType: "svg",
    aspect: "16:9",
    fields: FIELDS,
    defaults: {
      businessName: "",
      headline: "Weekend Special",
      // The ribbon is short and fixed-width, so this is the tightest cap in the
      // set — a window is all it has room for.
      offer: "Sat & Sun",
      price: "₹999",
      cta: "In store only",
    },
    limits: { businessName: 22, headline: 22, offer: 14, price: 8, cta: 18 },
    palette: { bg: "#1F30A0", fg: "#FFFFFF", accent: "#F5C542", ribbon: "#EF4444", kicker: "#E9E8F6" },
    tags: ["offer", "weekend", "timed"],
  },
  {
    id: "rt_members_only",
    industry: "retail",
    componentKey: "MembersOnly",
    nameKey: "creatives.rt_members_only.name",
    descKey: "creatives.rt_members_only.desc",
    mediaType: "svg",
    aspect: "16:9",
    // No price: membership is a mechanic, like the café's loyalty card.
    fields: FIELDS_NO_PRICE,
    defaults: {
      businessName: "",
      headline: "Members Save More",
      offer: "Extra 10% off every purchase",
      cta: "Join at the till",
    },
    limits: { businessName: 22, headline: 22, offer: 36, cta: 16 },
    palette: { bg: "#191919", fg: "#FFFFFF", accent: "#F5C542", kicker: "#BFB1A6" },
    tags: ["loyalty", "members", "repeat"],
  },
  {
    id: "rt_clearance_rack",
    industry: "retail",
    componentKey: "ClearanceRack",
    nameKey: "creatives.rt_clearance_rack.name",
    descKey: "creatives.rt_clearance_rack.desc",
    mediaType: "svg",
    aspect: "16:9",
    fields: FIELDS,
    defaults: {
      businessName: "",
      headline: "Clearance",
      offer: "Last pieces left",
      price: "UP TO 70%",
      cta: "While stocks last",
    },
    // The widest `price` in the set — "UP TO 70%" is 10 characters and sits on a
    // tag rather than a disc, which is why the tag shape was chosen for it.
    // Headline capped at 14: one line at 25px with the tag rack on the right.
    // "Clearance" and its Hindi equivalent both fit comfortably; anything longer
    // belongs in the offer line below it.
    // Same pair of geometric caps as FlashSale, set by the tag rack.
    //
    // `price` 9: centred on the front tag at x=252, so it grows both ways; at 9
    // Devanagari characters its left edge stops near x=205. "UP TO 70%" is
    // exactly 9 and the Hindi "70% तक" is shorter still.
    //
    // `offer` 22: from x=22 at 12px, 22 Devanagari characters reach about x=186
    // — clear of that left edge and of the pale tags behind it.
    limits: { businessName: 24, headline: 14, offer: 22, price: 9, cta: 20 },
    palette: { bg: "#F2EEE7", fg: "#191919", accent: "#EF4444", kicker: "#6B7280" },
    tags: ["offer", "clearance", "discount"],
  },
  {
    id: "rt_store_hours",
    industry: "retail",
    componentKey: "StoreHours",
    nameKey: "creatives.rt_store_hours.name",
    descKey: "creatives.rt_store_hours.desc",
    mediaType: "svg",
    aspect: "16:9",
    // Informational, like the restaurant and café hours cards. Every industry
    // library carries one: it is the creative a screen falls back to when there
    // is nothing to sell.
    fields: ["businessName", "headline", "hours"],
    defaults: {
      businessName: "",
      headline: "Store Hours",
      hours: "Mon to Sun, 10 am to 9 pm",
    },
    limits: { businessName: 22, headline: 22, hours: 34 },
    palette: { bg: "#E9E8F6", fg: "#191919", accent: "#1F30A0" },
    tags: ["info", "hours"],
  },
];

export default retailCreatives;
