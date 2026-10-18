/**
 * Fitness & wellness creative manifests.
 *
 * Plain .js with NO JSX and no imports of components, following the hospitality
 * precedent: scripts/check-test-drive.mjs must be able to import this in bare
 * node to validate that every componentKey resolves and every `fields` entry
 * has a matching `limits` entry.
 *
 * The brief comes from SCREEN_BAZAAR_PLAN.md §4b: ink black, hazard stripes,
 * caps; motifs dumbbell / bolt / bottle / stopwatch. The plan's named scene
 * is a gym floor with a treadmill, overhead press and class screen; the
 * named interaction is tick-off workout sets and a morning-vs-evening crowd
 * switch.
 *
 * WHY THIS SET IS LIGHT ON PRICE. A gym screen talks to MEMBERS who already
 * pay a subscription. What plays most is schedule, motivation, hygiene
 * reminders, programme announcements — not promotions. The two priced
 * creatives are the two things the gym genuinely upsells to the people
 * already walking its floor: the annual membership drive, and personal
 * training. A retail set that priced only two of eight would be a shop
 * window not selling; a gym set with only two priced reads correctly —
 * the rest of the time the screen is motivating people who already paid.
 *
 * REUSED FIELDS, NO NEW ONES. The leaderboard reuses real-estate's / corporate's
 * `stat` (a figure that is the point of the card and is not money — "30-day
 * streak", "128 members"). The rest are the usual businessName / headline /
 * detail / hours / price / cta vocabulary. No fitness-specific field is
 * needed because every piece of information on a gym screen either IS the
 * body copy, a time, a figure or a price.
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

export const fitnessCreatives = [
  {
    id: "f_class_schedule",
    industry: "fitness",
    componentKey: "ClassSchedule",
    nameKey: "creatives.f_class_schedule.name",
    descKey: "creatives.f_class_schedule.desc",
    mediaType: "svg",
    aspect: "16:9",
    // The class-floor screen: tonight's programme on an ink ground with a
    // hazard-stripe band under the headline. No price — a member already paid.
    fields: ["businessName", "headline", "detail", "hours"],
    defaults: {
      businessName: "",
      headline: "Tonight's Classes",
      detail: "Yoga · HIIT · Strength circuit",
      hours: "6 pm · 7 pm · 8 pm",
    },
    // headline size 22 at x=22, Hindi: 22*22*0.62 + 22 = 322 — inside 332.
    // detail 32 at size 12: 32*12*0.62 + 22 = 260.
    limits: { businessName: 22, headline: 22, detail: 32, hours: 24 },
    palette: { bg: "#191919", fg: "#FFFFFF", accent: "#F5C542", kicker: "#BFB1A6" },
    tags: ["schedule", "classes", "info"],
  },
  {
    id: "f_membership_drive",
    industry: "fitness",
    componentKey: "MembershipDrive",
    nameKey: "creatives.f_membership_drive.name",
    descKey: "creatives.f_membership_drive.desc",
    mediaType: "svg",
    aspect: "16:9",
    // The one card that shouts: the annual membership push. Dumbbell motif;
    // priced because joining IS the pitch.
    fields: ["businessName", "headline", "detail", "price", "cta"],
    defaults: {
      businessName: "",
      headline: "Join The Floor",
      detail: "Annual plan · All classes included",
      price: "₹1,999/mo",
      cta: "Start today",
    },
    // headline size 23 at x=22, Hindi: 18*23*0.62 + 22 = 279. detail 36 at
    // size 12: 36*12*0.62 + 22 = 290.
    limits: { businessName: 22, headline: 18, detail: 36, price: 12, cta: 18 },
    palette: { bg: "#1F30A0", fg: "#FFFFFF", accent: "#F5C542", kicker: "#E9E8F6" },
    tags: ["offer", "membership", "join"],
  },
  {
    id: "f_pt_offer",
    industry: "fitness",
    componentKey: "PtOffer",
    nameKey: "creatives.f_pt_offer.name",
    descKey: "creatives.f_pt_offer.desc",
    mediaType: "svg",
    aspect: "16:9",
    // Personal-training package. Priced: it IS the upsell to an existing
    // member. Stopwatch motif, because PT is sold in sessions.
    fields: ["businessName", "headline", "detail", "price", "cta"],
    defaults: {
      businessName: "",
      headline: "Personal Training",
      detail: "10 sessions · 1-on-1 with a coach",
      price: "₹7,500",
      cta: "Book a trial",
    },
    limits: { businessName: 22, headline: 20, detail: 34, price: 12, cta: 18 },
    palette: { bg: "#F8F6F2", fg: "#191919", accent: "#1F30A0", kicker: "#6B7280" },
    tags: ["offer", "training", "coach"],
  },
  {
    id: "f_motivation",
    industry: "fitness",
    componentKey: "MotivationCard",
    nameKey: "creatives.f_motivation.name",
    descKey: "creatives.f_motivation.desc",
    mediaType: "svg",
    aspect: "16:9",
    // The ink-black motivational slab, with a lightning-BOLT burst — the one
    // card that leans into the all-caps/hazard-stripe aesthetic the plan
    // names. No `cta`, no `price`: the whole card is the message.
    fields: ["businessName", "headline", "detail"],
    defaults: {
      businessName: "",
      headline: "No excuses. Just reps.",
      detail: "Show up when you don't feel like it.",
    },
    // headline cap 24 — the one card that reads as a quote, so the cap is a
    // little looser than the schedule's title.
    limits: { businessName: 22, headline: 24, detail: 36 },
    palette: { bg: "#191919", fg: "#FFFFFF", accent: "#F5C542", kicker: "#BFB1A6" },
    tags: ["motivation", "quote"],
  },
  {
    id: "f_hydration",
    industry: "fitness",
    componentKey: "HydrationTip",
    nameKey: "creatives.f_hydration.name",
    descKey: "creatives.f_hydration.desc",
    mediaType: "svg",
    aspect: "16:9",
    // The water-bottle motif the plan names, drawn beside a short reminder.
    // Lives in the between-sets playlist: a card someone glances at while
    // catching their breath.
    fields: ["businessName", "headline", "detail"],
    defaults: {
      businessName: "",
      headline: "Drink Water",
      detail: "Half your body weight in ml daily.",
    },
    limits: { businessName: 22, headline: 22, detail: 36 },
    palette: { bg: "#EEE5FF", fg: "#191919", accent: "#1F30A0", kicker: "#6B7280" },
    tags: ["wellness", "hydration", "tip"],
  },
  {
    id: "f_new_class",
    industry: "fitness",
    componentKey: "NewClassLaunch",
    nameKey: "creatives.f_new_class.name",
    descKey: "creatives.f_new_class.desc",
    mediaType: "svg",
    aspect: "16:9",
    // A new programme launching — a soft announcement rather than a sale. No
    // price: the class is included in the member's existing plan, which is
    // the point of mentioning it on this screen rather than a sales channel.
    fields: ["businessName", "headline", "detail", "hours"],
    defaults: {
      businessName: "",
      headline: "New · Spin Studio",
      detail: "Beats, bikes and a trained coach",
      hours: "Launches Mon · 7 am",
    },
    limits: { businessName: 22, headline: 22, detail: 36, hours: 22 },
    palette: { bg: "#F3FFF8", fg: "#191919", accent: "#4CAF6E", kicker: "#4B5563" },
    tags: ["announcement", "new", "class"],
  },
  {
    id: "f_leaderboard",
    industry: "fitness",
    componentKey: "ChallengeBoard",
    nameKey: "creatives.f_leaderboard.name",
    descKey: "creatives.f_leaderboard.desc",
    mediaType: "svg",
    aspect: "16:9",
    // The challenge or streak card — `stat` carries the figure (a count or a
    // day streak), because `price` above a number of days would read wrong.
    // Hazard-stripe band at the top, same visual language as the schedule.
    fields: ["businessName", "headline", "stat", "detail"],
    defaults: {
      businessName: "",
      headline: "30-Day Challenge",
      stat: "128",
      detail: "members on the board this week",
    },
    // stat 5 at size 42, Hindi devanagari numerals are same width — reserved
    // the right half of the card for the stripe pattern, so the stat sits
    // between x=22 and x=180.
    limits: { businessName: 22, headline: 22, stat: 5, detail: 32 },
    palette: { bg: "#191919", fg: "#FFFFFF", accent: "#F5C542", kicker: "#BFB1A6" },
    tags: ["challenge", "leaderboard", "stat"],
  },
  {
    id: "f_gym_hours",
    industry: "fitness",
    componentKey: "GymHours",
    nameKey: "creatives.f_gym_hours.name",
    descKey: "creatives.f_gym_hours.desc",
    mediaType: "svg",
    aspect: "16:9",
    // The informational hours card — distinct from the seven already in the
    // product (clock, shopfront, day bar, suitcase, cup, key, planner strip)
    // by being drawn as a STOPWATCH DIAL, which the plan explicitly lists
    // as a fitness motif. The dial reads as a sports timer, not a wall clock.
    fields: ["businessName", "headline", "hours"],
    defaults: {
      businessName: "",
      headline: "Gym Hours",
      hours: "5 am to 11 pm · all days",
    },
    limits: { businessName: 22, headline: 22, hours: 30 },
    palette: { bg: "#F8F6F2", fg: "#191919", accent: "#1F30A0" },
    tags: ["info", "hours"],
  },
];

export default fitnessCreatives;
