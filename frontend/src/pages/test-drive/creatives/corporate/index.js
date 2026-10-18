/**
 * Corporate & offices creative manifests.
 *
 * Plain .js with NO JSX and no imports of components, following the hospitality
 * precedent: scripts/check-test-drive.mjs must be able to import this in bare
 * node to validate that every componentKey resolves and every `fields` entry
 * has a matching `limits` entry.
 *
 * The brief comes from SCREEN_BAZAAR_PLAN.md §4b: a clean product UI, a
 * Mon–Fri planner, an ID badge; motifs mug / chart / sticky note / chat.
 *
 * WHY THIS SET HAS NO PRICE FIELD AT ALL. A corporate office screen is
 * internal comms — all-staff notices, meeting-room status, visitor welcomes, a
 * metrics board. There is no money on it; employees do not buy anything from
 * it. Every other industry library carries at least two priced cards; this one
 * carries none, and the manifest is where that is said out loud. The eight are
 * organised around the office's own touchpoints: reception, the auditorium,
 * the meeting room, the sticky-note cork board, the KPI monitor and the lift
 * lobby.
 *
 * REUSED FIELDS, NO NEW ONES BEYOND `stat`. The receptionist's visitor
 * welcome reuses hospitality's `guestName` — a visitor IS a guest — because a
 * second field named `visitorName` would say the same thing and double the
 * i18n labels for no payoff. The metrics card reuses real-estate's `stat`, a
 * figure that is the point of the card and is not money ("NPS 72", "99.8%
 * uptime"). Those are the only two shared fields; the rest are the usual
 * businessName / headline / detail / hours / cta vocabulary.
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

export const corporateCreatives = [
  {
    id: "co_all_hands",
    industry: "corporate",
    componentKey: "AllHands",
    nameKey: "creatives.co_all_hands.name",
    descKey: "creatives.co_all_hands.desc",
    mediaType: "svg",
    aspect: "16:9",
    // The lobby-ticker's biggest card: a company-wide invite. detail carries
    // the location, hours carries the time. No cta — attendance is implied by
    // the word "all-hands".
    fields: ["businessName", "headline", "detail", "hours"],
    defaults: {
      businessName: "",
      headline: "All-Hands This Friday",
      detail: "The Auditorium · All teams",
      hours: "Friday · 4 pm",
    },
    limits: { businessName: 22, headline: 22, detail: 30, hours: 20 },
    palette: { bg: "#1F30A0", fg: "#FFFFFF", accent: "#F5C542", kicker: "#E9E8F6" },
    tags: ["announcement", "all-hands", "event"],
  },
  {
    id: "co_meeting_room",
    industry: "corporate",
    componentKey: "MeetingRoomStatus",
    nameKey: "creatives.co_meeting_room.name",
    descKey: "creatives.co_meeting_room.desc",
    mediaType: "svg",
    aspect: "16:9",
    // The screen outside a meeting room door. headline is the room name,
    // detail is the status line ("Available" or "Booked by X"), hours is the
    // next transition time. The field vocabulary stays plain English rather
    // than inventing `room` / `status` / `until`, because the editor labels
    // each box with its field name and three new labels are more friction than
    // a non-technical visitor needs for one creative.
    fields: ["businessName", "headline", "detail", "hours"],
    defaults: {
      businessName: "",
      headline: "Conference · A",
      detail: "Booked · Platform team",
      hours: "Available at 11:30",
    },
    limits: { businessName: 22, headline: 22, detail: 28, hours: 22 },
    palette: { bg: "#F8F6F2", fg: "#191919", accent: "#4CAF6E", kicker: "#6B7280" },
    tags: ["info", "meeting-room", "status"],
  },
  {
    id: "co_visitor_welcome",
    industry: "corporate",
    componentKey: "VisitorWelcome",
    nameKey: "creatives.co_visitor_welcome.name",
    descKey: "creatives.co_visitor_welcome.desc",
    mediaType: "svg",
    aspect: "16:9",
    // The reception screen. Reuses hospitality's `guestName`: a visitor IS a
    // guest, and the field already exists with a Hindi label. detail carries
    // the host and team.
    fields: ["businessName", "headline", "guestName", "detail"],
    defaults: {
      businessName: "",
      headline: "Welcome",
      guestName: "Mr & Mrs Patel",
      detail: "Here to see Rohan from Product",
    },
    // guestName is centred and set large; cap 20 so the two-name "Mr & Mrs
    // Patel" at Devanagari width stays inside the middle band.
    limits: { businessName: 22, headline: 16, guestName: 20, detail: 32 },
    palette: { bg: "#4B3FD0", fg: "#FFFFFF", accent: "#F5C542", kicker: "#EEE5FF" },
    tags: ["welcome", "visitor", "reception"],
  },
  {
    id: "co_birthdays",
    industry: "corporate",
    componentKey: "BirthdaysToday",
    nameKey: "creatives.co_birthdays.name",
    descKey: "creatives.co_birthdays.desc",
    mediaType: "svg",
    aspect: "16:9",
    // The sticky-note motif, which the plan names. detail carries the list of
    // names (comma-separated); the drawing is a yellow note pinned to the
    // wall. Short headline, long detail — the exact inverse of the metrics
    // card below.
    fields: ["businessName", "headline", "detail"],
    defaults: {
      businessName: "",
      headline: "Happy Birthday!",
      detail: "Anita · Rohit · Priya · Vikram",
    },
    limits: { businessName: 22, headline: 20, detail: 36 },
    palette: { bg: "#FFF9F1", fg: "#191919", accent: "#F5C542", kicker: "#6B7280" },
    tags: ["announcement", "people", "birthday"],
  },
  {
    id: "co_metrics",
    industry: "corporate",
    componentKey: "MetricsBoard",
    nameKey: "creatives.co_metrics.name",
    descKey: "creatives.co_metrics.desc",
    mediaType: "svg",
    aspect: "16:9",
    // The KPI monitor's card. Reuses real-estate's `stat`: a figure that is
    // the point of the card and is not money. detail is the trend line
    // ("Up from 68"). The drawing is a short bar chart, carrying the plan's
    // chart motif.
    fields: ["businessName", "headline", "stat", "detail"],
    defaults: {
      businessName: "",
      headline: "Net Promoter Score",
      stat: "72",
      detail: "This month · up from 68",
    },
    limits: { businessName: 22, headline: 22, stat: 6, detail: 28 },
    palette: { bg: "#191919", fg: "#FFFFFF", accent: "#F5C542", kicker: "#BFB1A6" },
    tags: ["metrics", "kpi", "dashboard"],
  },
  {
    id: "co_townhall",
    industry: "corporate",
    componentKey: "TownhallChat",
    nameKey: "creatives.co_townhall.name",
    descKey: "creatives.co_townhall.desc",
    mediaType: "svg",
    aspect: "16:9",
    // The chat-bubble motif, for a Q&A-style event: a townhall or an AMA. A
    // soft invitation to show up with questions rather than an all-hands
    // announcement.
    fields: ["businessName", "headline", "detail", "hours"],
    defaults: {
      businessName: "",
      headline: "Ask the CEO",
      detail: "Bring your questions · Audio in Slack",
      hours: "Thursday · 3 pm",
    },
    limits: { businessName: 22, headline: 22, detail: 40, hours: 20 },
    palette: { bg: "#EEE5FF", fg: "#191919", accent: "#4B3FD0", kicker: "#4B5563" },
    tags: ["announcement", "townhall", "qa"],
  },
  {
    id: "co_notice",
    industry: "corporate",
    componentKey: "FacilityNotice",
    nameKey: "creatives.co_notice.name",
    descKey: "creatives.co_notice.desc",
    mediaType: "svg",
    aspect: "16:9",
    // The lift-lobby notice: a short announcement with a workaround. A caution
    // chevron sits in place of a motif, because the whole card IS the motif.
    // No `hours` on this one — a notice is open-ended until it is taken down.
    fields: ["businessName", "headline", "detail", "cta"],
    defaults: {
      businessName: "",
      headline: "Lift 2 · Under Maintenance",
      detail: "Please use Lift 3 or the stairs",
      cta: "Back by Monday",
    },
    limits: { businessName: 22, headline: 28, detail: 32, cta: 18 },
    palette: { bg: "#FEE8EC", fg: "#191919", accent: "#EF4444", kicker: "#6B7280" },
    tags: ["info", "facility", "notice"],
  },
  {
    id: "co_office_hours",
    industry: "corporate",
    componentKey: "OfficeHours",
    nameKey: "creatives.co_office_hours.name",
    descKey: "creatives.co_office_hours.desc",
    mediaType: "svg",
    aspect: "16:9",
    // The informational hours card — distinct from the six already shipped
    // (clock, shopfront, day bar, suitcase, cup, key) by being drawn as a
    // Mon–Fri PLANNER STRIP, the one hours drawing the plan explicitly names
    // for the corporate industry.
    fields: ["businessName", "headline", "hours"],
    defaults: {
      businessName: "",
      headline: "Office Hours",
      hours: "Mon to Fri · 9 am to 6 pm",
    },
    limits: { businessName: 22, headline: 24, hours: 30 },
    palette: { bg: "#E9E8F6", fg: "#191919", accent: "#1F30A0" },
    tags: ["info", "hours"],
  },
];

export default corporateCreatives;
