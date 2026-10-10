/**
 * The canonical "Interested in" service strings.
 *
 * These exact strings are load-bearing in three places, so they live here rather
 * than in any one page:
 *   - the /get-in-touch service dropdown
 *   - ?service= deep links from product pages (Vital, Molaris, Nexus, Saarthi, Beauty)
 *   - backend/src/utils/email.js, which brands the confirmation email by
 *     checking service.startsWith("Screen Bazaar")
 * Changing a string here changes which emails brand as Screen Bazaar. Don't.
 *
 * Plain .js (no JSX) so Node scripts can import it.
 */
export const SERVICES = [
  "Screen Bazaar (digital signage)",
  "Vital.AI",
  "Molaris.AI",
  "Nexus CRM",
  "Saarthi AI",
  "Saarthi for Contractors",
  "Beauty Manager",
  "Not sure yet",
];

export const [
  SB_SERVICE,
  VITAL_SERVICE,
  MOLARIS_SERVICE,
  NEXUS_SERVICE,
  SAARTHI_SERVICE,
  CONTRACTORS_SERVICE,
  BEAUTY_SERVICE,
] = SERVICES;

/** Lead.source values. Must stay in sync with backend/src/models/Lead.model.js. */
export const LEAD_SOURCE_CONTACT = "website_contact_form";
export const LEAD_SOURCE_TEST_DRIVE = "screen_bazaar_test_drive";
