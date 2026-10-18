/**
 * Creative METADATA registry. Plain .js, no JSX, nothing importing a component.
 *
 * This file must stay loadable in bare node: the reducer imports getTemplate to
 * validate CREATIVE_ADD, and scripts/test-td.mjs exercises the reducer in node.
 * Importing a .jsx component here would make node throw ERR_UNKNOWN_FILE_EXTENSION
 * and take the whole reducer with it.
 *
 * The componentKey -> component map therefore lives in components.jsx, which only
 * CreativeFrame imports. That is the single string-to-JSX mapping in the feature.
 *
 * Separation of trees is enforced here: this registry knows only about
 * creatives/, and website art has its own map in components/art/. They never
 * import each other, so "does this code path render customer text?" is answered
 * by which registry you came through.
 */
import { restaurantCreatives } from "./restaurant/index.js";
import { cafeCreatives } from "./cafe/index.js";
import { retailCreatives } from "./retail/index.js";
import { healthcareCreatives } from "./healthcare/index.js";
import { hospitalityCreatives } from "./hospitality/index.js";
import { realEstateCreatives } from "./realestate/index.js";
import { corporateCreatives } from "./corporate/index.js";
import { fitnessCreatives } from "./fitness/index.js";
import { educationCreatives } from "./education/index.js";
import { automotiveCreatives } from "./automotive/index.js";

/** Industry slug -> manifest array. */
export const CREATIVES_BY_INDUSTRY = {
  restaurant: restaurantCreatives,
  cafe: cafeCreatives,
  retail: retailCreatives,
  healthcare: healthcareCreatives,
  hospitality: hospitalityCreatives,
  realestate: realEstateCreatives,
  corporate: corporateCreatives,
  fitness: fitnessCreatives,
  education: educationCreatives,
  automotive: automotiveCreatives,
};

/** Every manifest entry, across industries. */
export const allCreatives = Object.values(CREATIVES_BY_INDUSTRY).flat();

/**
 * The library for one industry. Unknown or empty slug falls back to restaurant.
 *
 * Every industry the intake form offers has a full set, so the fallback is only
 * reached by an industry it does not — kept because a visitor arriving with stale
 * persisted state must still see a library rather than an empty panel. As more
 * industries land, that is exactly the path a visitor who picked one in an older
 * build takes, so it must stay.
 */
export function creativesFor(industry) {
  const list = CREATIVES_BY_INDUSTRY[industry];
  return list && list.length ? list : CREATIVES_BY_INDUSTRY.restaurant;
}

/** One manifest entry by template id, or null. */
export function getTemplate(templateId) {
  return allCreatives.find((c) => c.id === templateId) || null;
}

/** Media types actually present in an industry's library, for the filter chips. */
export function mediaTypesFor(industry) {
  return [...new Set(creativesFor(industry).map((c) => c.mediaType))];
}
