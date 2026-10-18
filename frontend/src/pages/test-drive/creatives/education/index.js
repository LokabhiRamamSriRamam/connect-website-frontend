/**
 * Education creative manifests.
 *
 * Plain .js with NO JSX and no imports of components, following the hospitality
 * precedent: scripts/check-test-drive.mjs must be able to import this in bare
 * node to validate that every componentKey resolves and every `fields` entry
 * has a matching `limits` entry.
 *
 * The brief comes from SCREEN_BAZAAR_PLAN.md §4b: a ruled notebook, a cork
 * board, pinned notices; motifs pencil / book / grad cap / atom. The plan's
 * named scene is a corridor with lockers and fluttering cork-board notes;
 * the named interaction is "a seminar moves → update 4 campus screens".
 *
 * WHY THIS SET HAS NO PRICE FIELD AT ALL. A campus corridor screen is a
 * notice board. A school or college does not advertise to students in the
 * corridor between classes; the audience is captive and already enrolled.
 * This is the SECOND no-price library in the product, and the reasoning is
 * NOT the same as corporate's: corporate is internal workforce comms,
 * education is a captive audience of students and parents. Different
 * posture, same decision — no money on the screen.
 *
 * REUSED FIELDS, NO NEW ONES. The toppers card uses real-estate / corporate's
 * `stat` (a figure that is the point of the card and is not money — "99.4%
 * pass", "28 toppers"). Everything else is covered by the base vocabulary:
 * businessName, headline, detail, hours, cta. No education-specific field is
 * needed because a notice board carries announcements, times and routes, all
 * of which the existing vocabulary handles.
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

export const educationCreatives = [
  {
    id: "e_seminar_notice",
    industry: "education",
    componentKey: "SeminarNotice",
    nameKey: "creatives.e_seminar_notice.name",
    descKey: "creatives.e_seminar_notice.desc",
    mediaType: "svg",
    aspect: "16:9",
    // The campus seminar card — the plan's named interaction ("seminar moves
    // → update 4 campus screens") happens on THIS creative. detail carries
    // the venue line, hours carries the time plate.
    fields: ["businessName", "headline", "detail", "hours"],
    defaults: {
      businessName: "",
      headline: "Guest Lecture",
      detail: "Prof. Mehta · Auditorium B",
      hours: "Thursday · 11 am",
    },
    // headline size 21 at x=22, Hindi: 24*21*0.62 + 22 = 334 — just at edge;
    // cap at 22 keeps it inside. detail 30 at size 12: 30*12*0.62 + 22 = 245.
    limits: { businessName: 22, headline: 22, detail: 30, hours: 22 },
    palette: { bg: "#1F30A0", fg: "#FFFFFF", accent: "#F5C542", kicker: "#E9E8F6" },
    tags: ["announcement", "seminar", "lecture"],
  },
  {
    id: "e_exam_schedule",
    industry: "education",
    componentKey: "ExamSchedule",
    nameKey: "creatives.e_exam_schedule.name",
    descKey: "creatives.e_exam_schedule.desc",
    mediaType: "svg",
    aspect: "16:9",
    // The exam-dates card — drawn as a RULED NOTEBOOK PAGE, which carries
    // the plan's primary motif. hours carries the exam window.
    fields: ["businessName", "headline", "detail", "hours"],
    defaults: {
      businessName: "",
      headline: "End-Sem Exams",
      detail: "Hall tickets at the admin office",
      hours: "15 to 28 December",
    },
    limits: { businessName: 22, headline: 22, detail: 34, hours: 22 },
    palette: { bg: "#FBFAF7", fg: "#191919", accent: "#1F30A0", kicker: "#6B7280" },
    tags: ["schedule", "exams", "info"],
  },
  {
    id: "e_event_announcement",
    industry: "education",
    componentKey: "FestAnnouncement",
    nameKey: "creatives.e_event_announcement.name",
    descKey: "creatives.e_event_announcement.desc",
    mediaType: "svg",
    aspect: "16:9",
    // Fest or sports-day announcement. ATOM motif, the plan's own, drawn
    // behind the headline so the card has an identity beyond just type.
    fields: ["businessName", "headline", "detail", "cta"],
    defaults: {
      businessName: "",
      headline: "Spark Fest 2026",
      detail: "Music · Dance · Robotics showcase",
      cta: "Open to all",
    },
    limits: { businessName: 22, headline: 20, detail: 34, cta: 18 },
    palette: { bg: "#4B3FD0", fg: "#FFFFFF", accent: "#F5C542", kicker: "#EEE5FF" },
    tags: ["event", "fest", "announcement"],
  },
  {
    id: "e_timetable_change",
    industry: "education",
    componentKey: "TimetableChange",
    nameKey: "creatives.e_timetable_change.name",
    descKey: "creatives.e_timetable_change.desc",
    mediaType: "svg",
    aspect: "16:9",
    // The seminar-moved interaction's natural card. PAPER PLANE motif, the
    // plan's own, flying from an old slot to a new one. detail carries the
    // "from -> to" line.
    fields: ["businessName", "headline", "detail", "hours"],
    defaults: {
      businessName: "",
      headline: "Class Moved",
      detail: "Physics III · now in Room 204",
      hours: "Today · 2 pm",
    },
    limits: { businessName: 22, headline: 22, detail: 32, hours: 22 },
    palette: { bg: "#F8F6F2", fg: "#191919", accent: "#EF4444", kicker: "#4B5563" },
    tags: ["info", "change", "today"],
  },
  {
    id: "e_notice",
    industry: "education",
    componentKey: "PinnedNotice",
    nameKey: "creatives.e_notice.name",
    descKey: "creatives.e_notice.desc",
    mediaType: "svg",
    aspect: "16:9",
    // A general notice pinned to the cork board. CORK + PIN motif, the plan's
    // own. No hours — a notice is open-ended until it comes down.
    fields: ["businessName", "headline", "detail", "cta"],
    defaults: {
      businessName: "",
      headline: "Library Closed",
      detail: "Audit week · Reopens Thursday",
      cta: "Return books by Fri",
    },
    limits: { businessName: 22, headline: 22, detail: 32, cta: 20 },
    palette: { bg: "#FFF9F1", fg: "#191919", accent: "#1F30A0", kicker: "#6B7280" },
    tags: ["notice", "info"],
  },
  {
    id: "e_toppers",
    industry: "education",
    componentKey: "ToppersBoard",
    nameKey: "creatives.e_toppers.name",
    descKey: "creatives.e_toppers.desc",
    mediaType: "svg",
    aspect: "16:9",
    // Results / toppers recognition. `stat` carries the figure (a count, a
    // percentage) because a number is the point of the card and `price`
    // would read wrong above a result. GRAD CAP motif, the plan's own.
    fields: ["businessName", "headline", "stat", "detail"],
    defaults: {
      businessName: "",
      headline: "Class of 2026",
      stat: "98%",
      detail: "pass rate · 42 above distinction",
    },
    limits: { businessName: 22, headline: 22, stat: 5, detail: 32 },
    palette: { bg: "#191919", fg: "#FFFFFF", accent: "#F5C542", kicker: "#BFB1A6" },
    tags: ["results", "stat", "recognition"],
  },
  {
    id: "e_club_signup",
    industry: "education",
    componentKey: "ClubSignup",
    nameKey: "creatives.e_club_signup.name",
    descKey: "creatives.e_club_signup.desc",
    mediaType: "svg",
    aspect: "16:9",
    // Call-to-join a club — the one card with a cta but no price, because
    // signing up for the robotics club is not a transaction. BOOK motif,
    // the plan's own, drawn as an open book beside the headline.
    fields: ["businessName", "headline", "detail", "cta"],
    defaults: {
      businessName: "",
      headline: "Robotics Club",
      detail: "Builders, coders, curious kids",
      cta: "Sign up at reception",
    },
    limits: { businessName: 22, headline: 22, detail: 32, cta: 22 },
    palette: { bg: "#F3FFF8", fg: "#191919", accent: "#4CAF6E", kicker: "#4B5563" },
    tags: ["club", "join", "activity"],
  },
  {
    id: "e_office_hours",
    industry: "education",
    componentKey: "AdminHours",
    nameKey: "creatives.e_office_hours.name",
    descKey: "creatives.e_office_hours.desc",
    mediaType: "svg",
    aspect: "16:9",
    // The informational hours card — distinct from the seven already in the
    // product (clock, shopfront, day bar, suitcase, cup, key, planner strip,
    // stopwatch) by being drawn as a RULED NOTEBOOK PAGE with a date band
    // at the top: the primary education motif the plan names.
    fields: ["businessName", "headline", "hours"],
    defaults: {
      businessName: "",
      headline: "Admin Office",
      hours: "Mon to Sat · 9 am to 4 pm",
    },
    limits: { businessName: 22, headline: 22, hours: 30 },
    palette: { bg: "#FBFAF7", fg: "#191919", accent: "#1F30A0" },
    tags: ["info", "hours"],
  },
];

export default educationCreatives;
