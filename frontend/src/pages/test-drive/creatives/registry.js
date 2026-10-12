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

/** Industry slug -> manifest array. Café lands in phase 9. */
export const CREATIVES_BY_INDUSTRY = {
  restaurant: restaurantCreatives,
  cafe: [],
};

/** Every manifest entry, across industries. */
export const allCreatives = Object.values(CREATIVES_BY_INDUSTRY).flat();

/** The library for one industry. Unknown or empty slug falls back to restaurant. */
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
