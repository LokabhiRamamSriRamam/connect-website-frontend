/**
 * componentKey -> creative component. The ONE place strings meet JSX imports.
 *
 * Split out of registry.js so that registry.js stays plain .js and loadable in
 * bare node — the reducer imports getTemplate from it, and the reducer is
 * exercised in node by scripts/test-td.mjs. Only CreativeFrame imports this file.
 *
 * Every component here renders visitor text and is reached only through
 * CreativeFrame, which allowlists and coerces the fields first. Adding a creative
 * means: a .jsx component, a manifest entry with its componentKey, and one line
 * here. check-test-drive.mjs (phase 9) asserts every manifest componentKey has a
 * line in this map.
 */
import ThaliCombo from "./restaurant/ThaliCombo.jsx";
import LunchSpecial from "./restaurant/LunchSpecial.jsx";

const COMPONENTS = {
  ThaliCombo,
  LunchSpecial,
};

/**
 * The component for a componentKey, or null. Returns null rather than throwing:
 * a creative that cannot render must degrade to CreativeFrame's placeholder, not
 * take the whole screen wall down with it.
 */
export function getComponent(componentKey) {
  return COMPONENTS[componentKey] || null;
}

/** Keys this build can render — for the phase 9 manifest check. */
export const COMPONENT_KEYS = Object.keys(COMPONENTS);
