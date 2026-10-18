/**
 * Real estate creative manifests.
 *
 * Plain .js with NO JSX and no imports of components, following the hospitality
 * precedent: scripts/check-test-drive.mjs must be able to import this in bare
 * node to validate that every componentKey resolves and every `fields` entry has
 * a matching `limits` entry.
 *
 * The brief comes from SCREEN_BAZAAR_PLAN.md §4b: a blueprint grid, a floor
 * plan, a site board; motifs house / crane / SOLD sign / pin. A sales office
 * palette: indigo blueprints on paper, with gold reserved for the one card the
 * project wants to shout about.
 *
 * WHY THIS SET SITS WHERE IT DOES. A real-estate screen is read in a sales
 * office or a project-site cabin, by someone who has already walked in to look.
 * That is the same posture as a healthcare waiting room — the viewer is already
 * inside the funnel, not being pulled off the street — so the set does not
 * shout. The DIFFERENCE from healthcare is that what the screen informs the
 * visitor of IS a product with a defined, published price: a per-sqft rate, an
 * EMI starting figure, a booking amount. Advertising a treatment price on a
 * clinic wall reads as a hoarding and is regulated besides; advertising a flat's
 * price on a sales-office wall is the whole reason the visitor is there. So
 * three creatives here carry a `price` (available units, EMI offer and a tower
 * launch's booking amount), and five do not.
 *
 * `stat` is this set's own field (shared with corporate's metrics board). It
 * carries the figure that is the POINT of the card and is not a currency amount
 * — "72% sold", "48 flats", "4 BHK" — where `price` would read wrong above the
 * editor box. Same reasoning as healthcare's `token` and hospitality's
 * `guestName`: the editor's label IS the instruction the visitor reads.
 *
 * `nameKey` / `descKey` are i18n keys, not literals — the library has to read in
 * Hindi too, and a translated string must never be stored as data.
 *
 * On `limits`: CHARACTER caps tuned for the worse of the two languages.
 * Devanagari sets wider than Latin at the same size, and SVG <text> neither
 * wraps nor shrinks. Several caps are set by GEOMETRY instead — a centred field
 * grows in both directions, and a field beside artwork must stop before it.
 * Those say so.
 */

/** The informational shape most of this set takes: a line of detail, no money. */
const FIELDS_DETAIL = ["businessName", "headline", "detail", "cta"];

/** The three priced cards: available units, EMI offer, tower launch booking. */
const FIELDS_PRICED = ["businessName", "headline", "detail", "price", "cta"];

export const realEstateCreatives = [
  {
    id: "re_tower_launch",
    industry: "realestate",
    componentKey: "TowerLaunch",
    nameKey: "creatives.re_tower_launch.name",
    descKey: "creatives.re_tower_launch.desc",
    mediaType: "svg",
    aspect: "16:9",
    // The one card in the set that CAN shout — a launch is the real-estate
    // equivalent of a retail flash sale. Carries the crane motif from the plan.
    // Priced: a booking amount is the single number a launch is remembered by.
    fields: FIELDS_PRICED,
    defaults: {
      businessName: "",
      headline: "Skyline Heights",
      detail: "2 & 3 BHK · Launching This Month",
      price: "₹2L booking",
      cta: "Reserve a visit",
    },
    // headline cap 20 at size 23, Hindi: 20*23*0.62 + 22 = 307 — inside 332.
    // detail 32 at size 12, Hindi: 32*12*0.62 + 22 = 260 — inside.
    limits: { businessName: 22, headline: 20, detail: 32, price: 12, cta: 18 },
    palette: { bg: "#1F30A0", fg: "#FFFFFF", accent: "#F5C542", kicker: "#E9E8F6" },
    tags: ["launch", "project", "offer"],
  },
  {
    id: "re_available_units",
    industry: "realestate",
    componentKey: "AvailableUnits",
    nameKey: "creatives.re_available_units.name",
    descKey: "creatives.re_available_units.desc",
    mediaType: "svg",
    aspect: "16:9",
    // The sales-office workhorse: a configuration and its per-sqft rate. The
    // visitor is already standing in front of the model, so the card's job is to
    // put the figure next to the layout.
    fields: FIELDS_PRICED,
    defaults: {
      businessName: "",
      headline: "3 BHK · 1,250 sqft",
      detail: "West-facing, two balconies",
      price: "₹8,400/sqft",
      cta: "Walk the model",
    },
    // Headline cap 22 at size 21: Hindi 22*21*0.62 + 22 = 309 — inside 332. The
    // configuration-line pattern it carries ("3 BHK · 1250 sqft") fits in both
    // languages well under 22.
    limits: { businessName: 22, headline: 22, detail: 30, price: 12, cta: 18 },
    palette: { bg: "#F8F6F2", fg: "#191919", accent: "#1F30A0", kicker: "#6B7280" },
    tags: ["units", "available", "offer"],
  },
  {
    id: "re_site_visit",
    industry: "realestate",
    componentKey: "SiteVisit",
    nameKey: "creatives.re_site_visit.name",
    descKey: "creatives.re_site_visit.desc",
    mediaType: "svg",
    aspect: "16:9",
    // The site-board motif — a pick-up timing is the operational line a
    // weekend-visit screen has to carry, so `hours` is where the "when" lives.
    fields: ["businessName", "headline", "detail", "hours"],
    defaults: {
      businessName: "",
      headline: "Site Visit · Sunday",
      detail: "Free pick-up from the sales office",
      hours: "Buses at 10 am and 3 pm",
    },
    // Headline sits inside the plate at x=76 at size 19: Hindi 20*19*0.62 + 76
    // = 311 — inside 332. detail at x=76, size 12: 34*12*0.62 + 76 = 329 —
    // inside. hours chip inner x=82, size 11: 25*11*0.62 + 82 = 253 — inside.
    limits: { businessName: 22, headline: 20, detail: 34, hours: 25 },
    palette: { bg: "#F2EEE7", fg: "#191919", accent: "#4B3FD0", kicker: "#6B7280" },
    tags: ["info", "visit", "weekend"],
  },
  {
    id: "re_sold_announcement",
    industry: "realestate",
    componentKey: "SoldAnnouncement",
    nameKey: "creatives.re_sold_announcement.name",
    descKey: "creatives.re_sold_announcement.desc",
    mediaType: "svg",
    aspect: "16:9",
    // Social proof. `stat` carries the figure ("72% sold", "48 of 60") because
    // `price` above a percentage box would read wrong — the number here is not
    // money. Carries the plan's SOLD sign motif.
    fields: ["businessName", "headline", "stat", "detail"],
    defaults: {
      businessName: "",
      headline: "Tower B · Nearly Home",
      stat: "72%",
      detail: "Only a handful of 3 BHKs left",
    },
    // headline is ONE line at size 20 (geometry audit forced that over an
    // earlier two-line draft that clashed with the stat below): Hindi cap
    // 21 keeps right-edge inside 332. stat 6 at size 28 reaches
    // 6*28*0.62 + 22 = 126, which is well clear of the stamp from x=190. detail
    // one line at size 11 at x=22: 32*11*0.62 + 22 = 240 — inside.
    limits: { businessName: 22, headline: 21, stat: 6, detail: 32 },
    palette: { bg: "#191919", fg: "#FFFFFF", accent: "#EF4444", kicker: "#BFB1A6" },
    tags: ["announcement", "sold", "proof"],
  },
  {
    id: "re_emi_offer",
    industry: "realestate",
    componentKey: "EmiOffer",
    nameKey: "creatives.re_emi_offer.name",
    descKey: "creatives.re_emi_offer.desc",
    mediaType: "svg",
    aspect: "16:9",
    // The affordability card. Priced: an EMI starting figure IS the pitch, so
    // the number is the hero.
    fields: FIELDS_PRICED,
    defaults: {
      businessName: "",
      headline: "Own It · Not Rent It",
      detail: "20-year home loan · pre-approved banks",
      price: "₹35,000/mo",
      cta: "Talk to our desk",
    },
    // Headline wraps across two lines at size 21; each rendered <text> element
    // holds only Math.ceil(24/2)=12 chars, so the audit's regex matches a
    // short line.
    // detail single-line at size 12 at x=22, Hindi: 40*12*0.62 + 22 = 320.5 —
    // just inside 332. Capped at 40 to leave headroom.
    limits: { businessName: 22, headline: 24, detail: 40, price: 12, cta: 18 },
    palette: { bg: "#EEE5FF", fg: "#191919", accent: "#4B3FD0", kicker: "#6B7280" },
    tags: ["offer", "emi", "finance"],
  },
  {
    id: "re_open_house",
    industry: "realestate",
    componentKey: "OpenHouse",
    nameKey: "creatives.re_open_house.name",
    descKey: "creatives.re_open_house.desc",
    mediaType: "svg",
    aspect: "16:9",
    // The model-flat opening — the equivalent of a shop's weekend window, but
    // for an address rather than a price. No price field: a visitor crosses a
    // city for an open house, not for a figure.
    fields: ["businessName", "headline", "detail", "hours"],
    defaults: {
      businessName: "",
      headline: "Model Flat Open",
      detail: "Plot 14, Sector 48, Gurgaon",
      hours: "Sat · Sun · 11 am to 7 pm",
    },
    // detail cap 36: an Indian address is always longer than a shop headline,
    // and the field sits on its own band to allow for that.
    limits: { businessName: 22, headline: 22, detail: 36, hours: 26 },
    palette: { bg: "#FFF9F1", fg: "#191919", accent: "#1F30A0", kicker: "#4B5563" },
    tags: ["info", "open-house", "weekend"],
  },
  {
    id: "re_amenity_showcase",
    industry: "realestate",
    componentKey: "AmenityShowcase",
    nameKey: "creatives.re_amenity_showcase.name",
    descKey: "creatives.re_amenity_showcase.desc",
    mediaType: "svg",
    aspect: "16:9",
    // The lifestyle card — what the project will BE, rather than what it costs.
    // A list of four amenities, each named rather than illustrated: the icons
    // are drawn in SVG and the text sits beside them.
    fields: ["businessName", "headline", "detail"],
    defaults: {
      businessName: "",
      headline: "Everything Inside the Gate",
      detail: "Clubhouse · Pool · Gym · Kids' area",
    },
    limits: { businessName: 22, headline: 28, detail: 36 },
    palette: { bg: "#F3FFF8", fg: "#191919", accent: "#4CAF6E", kicker: "#6B7280" },
    tags: ["info", "amenities", "lifestyle"],
  },
  {
    id: "re_office_hours",
    industry: "realestate",
    componentKey: "SalesOfficeHours",
    nameKey: "creatives.re_office_hours.name",
    descKey: "creatives.re_office_hours.desc",
    mediaType: "svg",
    aspect: "16:9",
    // The informational hours card. A house key on a tag — distinct from the
    // five hours cards already in the product (clock, shopfront, day bar,
    // suitcase, cup). The key fits the industry's object vocabulary and marks
    // the one card the visitor reads when there is nothing to announce.
    fields: ["businessName", "headline", "hours"],
    defaults: {
      businessName: "",
      headline: "Sales Office",
      hours: "Mon to Sun · 10 am to 7 pm",
    },
    limits: { businessName: 22, headline: 24, hours: 34 },
    palette: { bg: "#E9E8F6", fg: "#191919", accent: "#1F30A0" },
    tags: ["info", "hours"],
  },
];

export default realEstateCreatives;
