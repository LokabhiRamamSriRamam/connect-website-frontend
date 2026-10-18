/**
 * Hospitality creative manifests.
 *
 * Plain .js with NO JSX and no imports of components, following the
 * creatives/cafe/index.js precedent: scripts/check-test-drive.mjs must be able to
 * import this in node to validate that every componentKey resolves and every
 * `fields` entry has a matching `limits` entry.
 *
 * The brief comes from SCREEN_BAZAAR_PLAN.md §4b: evening indigo and gold, the
 * key card motif, the motifs bell / key / suitcase / star rating, and — the part
 * that actually shapes this set — the guest's-day route, Lobby → Pool → Terrace
 * → Restaurant → Corridor.
 *
 * WHY THIS SET IS ORGANISED BY PLACE RATHER THAN BY OFFER. Every other industry
 * so far runs one screen saying different things at different times. A hotel
 * runs different screens in different PLACES, each with a fixed job: the lobby
 * screen welcomes, the corridor screen points, the restaurant screen shows
 * tonight's service, the pool screen gives timings. That is the plan's route,
 * and it is also why the test drive's five virtual screens map so naturally onto
 * a hotel — it is the one industry where "which screen is this for?" has an
 * obvious answer. So the eight are built as stations on that route rather than
 * as eight variations on a promotion.
 *
 * Consequently only two carry a `price`: a room-offer card and a spa package.
 * A welcome board with a rate on it reads as a motel sign, and the rate a guest
 * cares about is the one they already booked.
 *
 * `guestName` is this set's own field, for the lobby welcome. It is NOT
 * `headline` renamed: the editor labels inputs from i18n, so the box above which
 * a receptionist types "Mr & Mrs Sharma" must say "Guest name" and not
 * "Headline". Same reasoning as healthcare's `detail` and `token`.
 *
 * `nameKey` / `descKey` are i18n keys, not literals — the library has to read in
 * Hindi too, and a translated string must never be stored as data.
 *
 * On `limits`: CHARACTER caps tuned for the worse of the two languages. Devanagari
 * sets wider than Latin at the same size, and SVG <text> neither wraps nor shrinks,
 * so a headline that fits in English can overflow in Hindi on the same template.
 * Several caps here are set by GEOMETRY instead — a centred field grows in both
 * directions, and a field beside artwork must stop before it. Those say so.
 */

/** The informational shape most of this set takes: a line of detail, no price. */
const FIELDS_DETAIL = ["businessName", "headline", "detail", "cta"];

/** The two creatives that carry a figure: a room offer and a spa package. */
const FIELDS_PRICED = ["businessName", "headline", "detail", "price", "cta"];

export const hospitalityCreatives = [
  {
    id: "ho_lobby_welcome",
    industry: "hospitality",
    componentKey: "LobbyWelcome",
    nameKey: "creatives.ho_lobby_welcome.name",
    descKey: "creatives.ho_lobby_welcome.desc",
    mediaType: "svg",
    aspect: "16:9",
    // The first stop on the route. `guestName` is the payload; there is no cta,
    // because a welcome board asking someone to act has misunderstood its job.
    fields: ["businessName", "headline", "guestName", "detail"],
    defaults: {
      businessName: "",
      headline: "Welcome",
      guestName: "Mr & Mrs Sharma",
      detail: "Your suite is ready on the 4th floor",
    },
    // `guestName` is centred and set large, so its cap is geometric: at 20
    // Devanagari characters it still sits inside the card's middle band.
    limits: { businessName: 24, headline: 16, guestName: 20, detail: 38 },
    palette: { bg: "#1F30A0", fg: "#FFFFFF", accent: "#F5C542", kicker: "#E9E8F6" },
    tags: ["welcome", "lobby", "guest"],
  },
  {
    id: "ho_room_offer",
    industry: "hospitality",
    componentKey: "RoomOffer",
    nameKey: "creatives.ho_room_offer.name",
    descKey: "creatives.ho_room_offer.desc",
    mediaType: "svg",
    aspect: "16:9",
    // One of two priced cards: a published room rate is a normal thing to
    // advertise, unlike a welcome board with a number on it.
    fields: FIELDS_PRICED,
    defaults: {
      businessName: "",
      headline: "Weekend Escape",
      detail: "Deluxe room, breakfast for two",
      price: "₹4,999",
      cta: "Ask at the desk",
    },
    limits: { businessName: 22, headline: 22, detail: 32, price: 9, cta: 18 },
    palette: { bg: "#191919", fg: "#FFFFFF", accent: "#F5C542", kicker: "#BFB1A6" },
    tags: ["offer", "rooms", "weekend"],
  },
  {
    id: "ho_amenity_hours",
    industry: "hospitality",
    componentKey: "AmenityHours",
    nameKey: "creatives.ho_amenity_hours.name",
    descKey: "creatives.ho_amenity_hours.desc",
    mediaType: "svg",
    aspect: "16:9",
    // The pool screen. Three timings on one card, because a guest standing at
    // the pool door wants the whole day at once, not one line at a time.
    fields: ["businessName", "headline", "detail", "hours"],
    defaults: {
      businessName: "",
      headline: "Pool & Spa",
      detail: "Towels at the counter",
      hours: "6 am to 10 pm, daily",
    },
    limits: { businessName: 24, headline: 20, detail: 28, hours: 26 },
    palette: { bg: "#4B3FD0", fg: "#FFFFFF", accent: "#F3FFF8", kicker: "#E9E8F6" },
    tags: ["info", "amenity", "pool", "hours"],
  },
  {
    id: "ho_dinner_tonight",
    industry: "hospitality",
    componentKey: "DinnerTonight",
    nameKey: "creatives.ho_dinner_tonight.name",
    descKey: "creatives.ho_dinner_tonight.desc",
    mediaType: "svg",
    aspect: "16:9",
    // The restaurant stop. Deliberately NOT the restaurant industry's
    // Today's Special: that card sells a dish to someone deciding where to eat,
    // this one tells a resident guest what is on downstairs tonight.
    fields: FIELDS_DETAIL,
    defaults: {
      businessName: "",
      headline: "Dinner Tonight",
      detail: "Live counter, 7 pm onwards",
      cta: "Table on request",
    },
    limits: { businessName: 24, headline: 20, detail: 30, cta: 18 },
    palette: { bg: "#F8F6F2", fg: "#191919", accent: "#1F30A0", kicker: "#6B7280" },
    tags: ["dining", "evening", "restaurant"],
  },
  {
    id: "ho_spa_package",
    industry: "hospitality",
    componentKey: "SpaPackage",
    nameKey: "creatives.ho_spa_package.name",
    descKey: "creatives.ho_spa_package.desc",
    mediaType: "svg",
    aspect: "16:9",
    fields: FIELDS_PRICED,
    defaults: {
      businessName: "",
      headline: "Spa Hour",
      detail: "60-minute massage, two guests",
      price: "₹2,499",
      cta: "Book at reception",
    },
    limits: { businessName: 22, headline: 18, detail: 30, price: 9, cta: 18 },
    palette: { bg: "#EEE5FF", fg: "#191919", accent: "#4B3FD0", kicker: "#6B7280" },
    tags: ["offer", "spa", "package"],
  },
  {
    id: "ho_event_today",
    industry: "hospitality",
    componentKey: "EventToday",
    nameKey: "creatives.ho_event_today.name",
    descKey: "creatives.ho_event_today.desc",
    mediaType: "svg",
    aspect: "16:9",
    // The terrace / banquet screen: a wedding, a conference, live music. The
    // one card a hotel re-points at a different thing every single day.
    fields: ["businessName", "headline", "detail", "hours"],
    defaults: {
      businessName: "",
      headline: "Sangeet · Terrace",
      detail: "The Kapoor family celebration",
      hours: "From 7 pm",
    },
    limits: { businessName: 24, headline: 22, detail: 30, hours: 18 },
    palette: { bg: "#793EF5", fg: "#FFFFFF", accent: "#F5C542", kicker: "#EEE5FF" },
    tags: ["event", "terrace", "today"],
  },
  {
    id: "ho_directions",
    industry: "hospitality",
    componentKey: "Directions",
    nameKey: "creatives.ho_directions.name",
    descKey: "creatives.ho_directions.desc",
    mediaType: "svg",
    aspect: "16:9",
    // The corridor screen — the last stop on the plan's route. No cta: an arrow
    // IS the call to action, as on healthcare's department guide.
    fields: ["businessName", "headline", "detail"],
    defaults: {
      businessName: "",
      headline: "Rooms 401 – 420",
      detail: "Left from the lift lobby",
    },
    // Headline 15, set by geometry: it starts at x=112, to the right of the
    // arrow, and the plate ends at x=300. That is 188 units, which 18 Devanagari
    // characters at 19px overran — they reached x=324, past the frame itself.
    limits: { businessName: 24, headline: 15, detail: 30 },
    palette: { bg: "#F2EEE7", fg: "#191919", accent: "#1F30A0", kicker: "#6B7280" },
    tags: ["info", "wayfinding", "corridor"],
  },
  {
    id: "ho_checkout_info",
    industry: "hospitality",
    componentKey: "CheckoutInfo",
    nameKey: "creatives.ho_checkout_info.name",
    descKey: "creatives.ho_checkout_info.desc",
    mediaType: "svg",
    aspect: "16:9",
    // The informational hours card every industry library carries. Here the
    // "hours" are check-in and check-out — the two times a hotel is asked about
    // more than any other.
    fields: ["businessName", "headline", "hours"],
    defaults: {
      businessName: "",
      headline: "Check-in & Check-out",
      hours: "In from 2 pm · Out by 11 am",
    },
    limits: { businessName: 22, headline: 24, hours: 32 },
    palette: { bg: "#F3FFF8", fg: "#191919", accent: "#4CAF6E" },
    tags: ["info", "hours", "checkout"],
  },
];

export default hospitalityCreatives;
