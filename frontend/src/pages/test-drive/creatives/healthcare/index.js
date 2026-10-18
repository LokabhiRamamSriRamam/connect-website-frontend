/**
 * Healthcare creative manifests.
 *
 * Plain .js with NO JSX and no imports of components, following the
 * creatives/cafe/index.js precedent: scripts/check-test-drive.mjs must be able to
 * import this in node to validate that every componentKey resolves and every
 * `fields` entry has a matching `limits` entry.
 *
 * The brief comes from SCREEN_BAZAAR_PLAN.md §4b: calm mint, a photo-led hero,
 * the motifs heartbeat / pill / cross / stethoscope, and the setting of a waiting
 * room where the screen plays a playlist to seated patients.
 *
 * WHY THIS SET IS SHAPED DIFFERENTLY FROM RETAIL. A clinic screen is mostly not
 * selling. Its job is to inform people who are already inside the building and
 * usually waiting: when the doctor is in, which department is on which floor,
 * what to do before a blood test, that a flu shot is now available. Pricing a
 * consultation on a waiting-room wall reads as a hoarding, not a clinic, and in
 * several Indian states advertising treatment prices is regulated besides. So
 * only two creatives here carry a `price` at all — a health-package card and a
 * camp notice, both of which are things clinics genuinely do advertise — and the
 * rest trade the offer/price pair for a `detail` line.
 *
 * `detail` is a new field, not a renamed `offer`. The editor labels fields from
 * i18n (library.fields.<name>) and CreativeFrame allowlists against the
 * manifest, so adding one costs two translation entries and no code. It is worth
 * that because "Offer text" is the wrong prompt above a box where someone types
 * "Bring your previous prescription" — the label is the whole instruction the
 * non-technical visitor gets.
 *
 * `nameKey` / `descKey` are i18n keys, not literals — the library has to read in
 * Hindi too, and a translated string must never be stored as data.
 *
 * On `limits`: CHARACTER caps tuned for the worse of the two languages. Devanagari
 * sets wider than Latin at the same size, and SVG <text> neither wraps nor shrinks,
 * so a headline that fits in English can overflow in Hindi on the same template.
 * When in doubt the limit is the Hindi-safe number.
 */

/** The informational shape most of this set takes: a line of guidance, no price. */
const FIELDS_DETAIL = ["businessName", "headline", "detail", "cta"];

/** The two creatives that do carry a figure: a package and a camp. */
const FIELDS_PRICED = ["businessName", "headline", "detail", "price", "cta"];

export const healthcareCreatives = [
  {
    id: "h_doctor_on_duty",
    industry: "healthcare",
    componentKey: "DoctorOnDuty",
    nameKey: "creatives.h_doctor_on_duty.name",
    descKey: "creatives.h_doctor_on_duty.desc",
    mediaType: "svg",
    aspect: "16:9",
    // The waiting room's most-asked question, answered on the wall. `detail`
    // carries the name and speciality; `hours` carries the sitting.
    fields: ["businessName", "headline", "detail", "hours"],
    defaults: {
      businessName: "",
      headline: "Doctor on Duty",
      detail: "Dr. A. Mehta, General Medicine",
      hours: "Today, 10 am to 4 pm",
    },
    limits: { businessName: 24, headline: 20, detail: 32, hours: 26 },
    palette: { bg: "#F3FFF8", fg: "#191919", accent: "#4CAF6E", kicker: "#6B7280" },
    tags: ["info", "staff", "today"],
  },
  {
    id: "h_token_queue",
    industry: "healthcare",
    componentKey: "TokenQueue",
    nameKey: "creatives.h_token_queue.name",
    descKey: "creatives.h_token_queue.desc",
    mediaType: "svg",
    aspect: "16:9",
    // The one creative whose payload is a number that is not money. `price` would
    // be an absurd name for a token, so this declares its own `token` field —
    // same reasoning as `detail`: the editor's label is the instruction.
    fields: ["businessName", "headline", "token", "detail"],
    defaults: {
      businessName: "",
      headline: "Now Serving",
      token: "A-24",
      detail: "Keep your card ready",
    },
    // `token` is short by nature and set very large, so it takes the tightest
    // cap in the product.
    //
    // The token panel starts at x=204, so everything on the left is capped to
    // stop short of it: headline 14 at 22px and businessName 18 both end around
    // x=190. At 18 the headline ran under the panel and collided with the token
    // itself — caught by the geometry audit, not by the overflow check, which
    // only measures the frame edge.
    limits: { businessName: 18, headline: 14, token: 5, detail: 26 },
    palette: { bg: "#1F30A0", fg: "#FFFFFF", accent: "#F5C542", kicker: "#E9E8F6" },
    tags: ["info", "queue", "waiting"],
  },
  {
    id: "h_health_tip",
    industry: "healthcare",
    componentKey: "HealthTip",
    nameKey: "creatives.h_health_tip.name",
    descKey: "creatives.h_health_tip.desc",
    mediaType: "svg",
    aspect: "16:9",
    fields: FIELDS_DETAIL,
    defaults: {
      businessName: "",
      headline: "Tip of the Day",
      detail: "Drink water through the day, not all at once.",
      cta: "Ask us more",
    },
    // The longest `detail` in the set: a tip is a full sentence and the layout
    // gives it two lines.
    limits: { businessName: 24, headline: 22, detail: 54, cta: 16 },
    palette: { bg: "#FFFFFF", fg: "#191919", accent: "#4CAF6E", kicker: "#6B7280" },
    tags: ["info", "advice", "playlist"],
  },
  {
    id: "h_vaccination_drive",
    industry: "healthcare",
    componentKey: "VaccinationDrive",
    nameKey: "creatives.h_vaccination_drive.name",
    descKey: "creatives.h_vaccination_drive.desc",
    mediaType: "svg",
    aspect: "16:9",
    fields: FIELDS_DETAIL,
    defaults: {
      businessName: "",
      headline: "Flu Shots Available",
      detail: "Walk in, no appointment needed",
      cta: "Ask at reception",
    },
    limits: { businessName: 24, headline: 24, detail: 34, cta: 18 },
    palette: { bg: "#E9E8F6", fg: "#191919", accent: "#1F30A0", kicker: "#6B7280" },
    tags: ["announcement", "vaccination", "walk-in"],
  },
  {
    id: "h_department_guide",
    industry: "healthcare",
    componentKey: "DepartmentGuide",
    nameKey: "creatives.h_department_guide.name",
    descKey: "creatives.h_department_guide.desc",
    mediaType: "svg",
    aspect: "16:9",
    // Wayfinding, which the plan names as the healthcare hero's own subject.
    // No cta: a sign that says "find out more" has failed at being a sign.
    fields: ["businessName", "headline", "detail"],
    defaults: {
      businessName: "",
      headline: "Pathology · Floor 2",
      detail: "Lift on your right, then left",
    },
    // Headline 20, not 26: it is reversed out of the sign bar on ONE line at
    // 19px, and the arrow occupies the bar from x=214. Hindi at 26 ran to x=330,
    // past the frame as well as under the arrow.
    limits: { businessName: 24, headline: 20, detail: 32 },
    palette: { bg: "#F8F6F2", fg: "#191919", accent: "#4B3FD0", kicker: "#6B7280" },
    tags: ["info", "wayfinding", "directions"],
  },
  {
    id: "h_health_package",
    industry: "healthcare",
    componentKey: "HealthPackage",
    nameKey: "creatives.h_health_package.name",
    descKey: "creatives.h_health_package.desc",
    mediaType: "svg",
    aspect: "16:9",
    // One of the two priced cards: a check-up package is a defined product with
    // a published figure, which is what makes pricing it unremarkable here.
    fields: FIELDS_PRICED,
    defaults: {
      businessName: "",
      headline: "Full Body Check-up",
      detail: "62 tests, reports in 24 hours",
      price: "₹1,999",
      cta: "Book at the desk",
    },
    limits: { businessName: 22, headline: 24, detail: 32, price: 9, cta: 18 },
    palette: { bg: "#F3FFF8", fg: "#191919", accent: "#1F30A0", kicker: "#6B7280" },
    tags: ["offer", "package", "diagnostics"],
  },
  {
    id: "h_camp_notice",
    industry: "healthcare",
    componentKey: "CampNotice",
    nameKey: "creatives.h_camp_notice.name",
    descKey: "creatives.h_camp_notice.desc",
    mediaType: "svg",
    aspect: "16:9",
    fields: FIELDS_PRICED,
    defaults: {
      businessName: "",
      headline: "Free Eye Camp",
      detail: "Sunday, 9 am to 1 pm",
      // A camp is very often free, so this field frequently reads as a word
      // rather than a figure. The cap allows for both.
      price: "FREE",
      cta: "All welcome",
    },
    limits: { businessName: 22, headline: 22, detail: 28, price: 9, cta: 16 },
    palette: { bg: "#191919", fg: "#FFFFFF", accent: "#F5C542", kicker: "#BFB1A6" },
    tags: ["announcement", "camp", "community"],
  },
  {
    id: "h_clinic_hours",
    industry: "healthcare",
    componentKey: "ClinicHours",
    nameKey: "creatives.h_clinic_hours.name",
    descKey: "creatives.h_clinic_hours.desc",
    mediaType: "svg",
    aspect: "16:9",
    // The informational hours card every industry library carries.
    fields: ["businessName", "headline", "hours"],
    defaults: {
      businessName: "",
      headline: "OPD Timings",
      hours: "Mon to Sat, 9 am to 7 pm",
    },
    limits: { businessName: 22, headline: 22, hours: 34 },
    palette: { bg: "#EEE5FF", fg: "#191919", accent: "#4B3FD0" },
    tags: ["info", "hours"],
  },
];

export default healthcareCreatives;
