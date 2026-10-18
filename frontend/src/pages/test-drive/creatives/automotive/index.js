/**
 * Automotive creative manifests.
 *
 * Plain .js with NO JSX and no imports of components, following the hospitality
 * precedent: scripts/check-test-drive.mjs must be able to import this in bare
 * node to validate that every componentKey resolves and every `fields` entry
 * has a matching `limits` entry.
 *
 * The brief comes from SCREEN_BAZAAR_PLAN.md §4b: a dark showroom with
 * spotlights, gauges and a number plate; motifs steering wheel / tyre /
 * key fob / spanner. The named scene is a car on a turntable in the
 * showroom with a model carousel in the service lounge.
 *
 * WHY THIS SET IS HEAVIER ON PRICE THAN HOSPITALITY. A showroom screen is
 * read by someone considering a high-value purchase — a car costs lakhs,
 * not hundreds, so the figure is a SPECIFICATION, not a promotion. People
 * walk in to see "the on-road price of the new EV", "the certified pre-owned
 * price with a warranty", "the service package rate for a 20,000 km
 * check". For those four, the price IS the content. Four more creatives
 * carry information rather than money — a test-drive invite, a spec
 * showcase, a warranty / trust card, and the hours card — because a
 * showroom screen also has to keep the lounge watchable while a buyer
 * waits. So four priced and four not, not six and two.
 *
 * REUSED FIELDS, NO NEW ONES. `stat` carries non-money figures ("22.3 km/l",
 * "7 years warranty"), same reasoning as healthcare's `token` and
 * real-estate's own `stat`. Everything else is covered by the base
 * vocabulary.
 *
 * `nameKey` / `descKey` are i18n keys, not literals — the library has to read
 * in Hindi too, and a translated string must never be stored as data.
 *
 * On `limits`: CHARACTER caps tuned for the worse of the two languages.
 * Devanagari sets wider than Latin at the same size, and SVG <text> neither
 * wraps nor shrinks. Several caps are set by GEOMETRY instead — a centred
 * field grows in both directions, and a field beside artwork must stop before
 * it. Those say so.
 */

const FIELDS_PRICED = ["businessName", "headline", "detail", "price", "cta"];

export const automotiveCreatives = [
  {
    id: "au_new_model",
    industry: "automotive",
    componentKey: "NewModelLaunch",
    nameKey: "creatives.au_new_model.name",
    descKey: "creatives.au_new_model.desc",
    mediaType: "svg",
    aspect: "16:9",
    // The dark-showroom hero: the newly arrived model on a spot-lit floor,
    // with the on-road price as the figure a buyer walks in asking about.
    // Priced because the price IS the specification.
    fields: FIELDS_PRICED,
    defaults: {
      businessName: "",
      headline: "The New Aero S",
      detail: "4.6 m · 150 ps · 7-speed DCT",
      price: "₹18.5 L",
      cta: "Book a test drive",
    },
    limits: { businessName: 22, headline: 20, detail: 30, price: 12, cta: 20 },
    palette: { bg: "#191919", fg: "#FFFFFF", accent: "#F5C542", kicker: "#BFB1A6" },
    tags: ["launch", "new-car", "offer"],
  },
  {
    id: "au_used_certified",
    industry: "automotive",
    componentKey: "UsedCertified",
    nameKey: "creatives.au_used_certified.name",
    descKey: "creatives.au_used_certified.desc",
    mediaType: "svg",
    aspect: "16:9",
    // Pre-owned certified. Priced because the car on the lounge screen is
    // the one the buyer is comparing. Number-plate motif, the plan's own.
    fields: FIELDS_PRICED,
    defaults: {
      businessName: "",
      headline: "Certified Pre-owned",
      detail: "2023 · 24,000 km · 1 owner",
      price: "₹8.9 L",
      cta: "View in bay 3",
    },
    limits: { businessName: 22, headline: 22, detail: 30, price: 12, cta: 18 },
    palette: { bg: "#F8F6F2", fg: "#191919", accent: "#1F30A0", kicker: "#6B7280" },
    tags: ["pre-owned", "offer"],
  },
  {
    id: "au_service_package",
    industry: "automotive",
    componentKey: "ServicePackage",
    nameKey: "creatives.au_service_package.name",
    descKey: "creatives.au_service_package.desc",
    mediaType: "svg",
    aspect: "16:9",
    // The service lounge sell: a priced maintenance package. SPANNER motif,
    // the plan's own. Priced because the package IS a quoted figure.
    fields: FIELDS_PRICED,
    defaults: {
      businessName: "",
      headline: "20,000 km Service",
      detail: "Oil · filters · brake check · wash",
      price: "₹5,999",
      cta: "Book your slot",
    },
    limits: { businessName: 22, headline: 22, detail: 34, price: 12, cta: 18 },
    palette: { bg: "#1F30A0", fg: "#FFFFFF", accent: "#F5C542", kicker: "#E9E8F6" },
    tags: ["service", "offer"],
  },
  {
    id: "au_accessory",
    industry: "automotive",
    componentKey: "AccessoryBundle",
    nameKey: "creatives.au_accessory.name",
    descKey: "creatives.au_accessory.desc",
    mediaType: "svg",
    aspect: "16:9",
    // Accessory add-on bundle — alloys, mats, kit. Priced because the
    // bundle IS a quoted figure. TYRE motif, the plan's own.
    fields: FIELDS_PRICED,
    defaults: {
      businessName: "",
      headline: "Alloy Wheel Bundle",
      detail: "17-inch alloys · fitted · balanced",
      price: "₹32,000",
      cta: "Fit this weekend",
    },
    limits: { businessName: 22, headline: 22, detail: 34, price: 12, cta: 18 },
    palette: { bg: "#F8F6F2", fg: "#191919", accent: "#4B3FD0", kicker: "#6B7280" },
    tags: ["accessory", "offer"],
  },
  {
    id: "au_test_drive",
    industry: "automotive",
    componentKey: "TestDriveInvite",
    nameKey: "creatives.au_test_drive.name",
    descKey: "creatives.au_test_drive.desc",
    mediaType: "svg",
    aspect: "16:9",
    // Not priced: a test drive is free in principle, and the ask is the
    // slot, not the money. KEY FOB motif, the plan's own.
    fields: ["businessName", "headline", "detail", "cta"],
    defaults: {
      businessName: "",
      headline: "Drive It Before You Decide",
      detail: "15-minute slots · every half hour",
      cta: "Ask at the desk",
    },
    limits: { businessName: 22, headline: 28, detail: 36, cta: 20 },
    palette: { bg: "#191919", fg: "#FFFFFF", accent: "#F5C542", kicker: "#BFB1A6" },
    tags: ["test-drive", "invite"],
  },
  {
    id: "au_spec_showcase",
    industry: "automotive",
    componentKey: "SpecShowcase",
    nameKey: "creatives.au_spec_showcase.name",
    descKey: "creatives.au_spec_showcase.desc",
    mediaType: "svg",
    aspect: "16:9",
    // One standout spec made large — mileage, 0-60, boot volume. `stat`
    // because a mileage figure above a `price` label would read wrong.
    // Dial-cluster motif from the plan.
    fields: ["businessName", "headline", "stat", "detail"],
    defaults: {
      businessName: "",
      headline: "Mileage",
      stat: "22.3",
      detail: "km/l · ARAI-certified",
    },
    limits: { businessName: 22, headline: 22, stat: 6, detail: 28 },
    palette: { bg: "#191919", fg: "#FFFFFF", accent: "#F5C542", kicker: "#BFB1A6" },
    tags: ["spec", "stat"],
  },
  {
    id: "au_warranty",
    industry: "automotive",
    componentKey: "WarrantyCard",
    nameKey: "creatives.au_warranty.name",
    descKey: "creatives.au_warranty.desc",
    mediaType: "svg",
    aspect: "16:9",
    // The lounge-trust card: years of warranty, roadside assist. `stat`
    // again — a count of years, not money. Shield-and-check motif.
    fields: ["businessName", "headline", "stat", "detail"],
    defaults: {
      businessName: "",
      headline: "Years Warranty",
      stat: "7",
      detail: "Standard · 24-hr roadside assist",
    },
    limits: { businessName: 22, headline: 22, stat: 4, detail: 32 },
    palette: { bg: "#F3FFF8", fg: "#191919", accent: "#4CAF6E", kicker: "#4B5563" },
    tags: ["trust", "warranty"],
  },
  {
    id: "au_showroom_hours",
    industry: "automotive",
    componentKey: "ShowroomHours",
    nameKey: "creatives.au_showroom_hours.name",
    descKey: "creatives.au_showroom_hours.desc",
    mediaType: "svg",
    aspect: "16:9",
    // Informational — distinct from the eight hours cards already shipped
    // (clock, shopfront, day bar, suitcase, cup, key, planner, stopwatch,
    // notebook) by being drawn as a SPEEDOMETER / ODOMETER DIAL on a dark
    // dashboard surface. The dial reads as a car gauge, which is a
    // different kind of circle from the stopwatch and the clock.
    fields: ["businessName", "headline", "hours"],
    defaults: {
      businessName: "",
      headline: "Showroom Hours",
      hours: "Mon to Sun · 10 am to 8 pm",
    },
    limits: { businessName: 22, headline: 22, hours: 30 },
    palette: { bg: "#191919", fg: "#FFFFFF", accent: "#F5C542" },
    tags: ["info", "hours"],
  },
];

export default automotiveCreatives;
