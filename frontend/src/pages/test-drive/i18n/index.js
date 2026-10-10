/**
 * Tiny i18n for the test drive. No library — the repo has none.
 *
 * Plain .js (no JSX) so scripts/check-test-drive.mjs can import the dictionaries
 * and diff their key sets in Node.
 */
import { en } from "./en.js";
import { hi } from "./hi.js";

export const LANGS = ["en", "hi"];
export const DEFAULT_LANG = "en";
export const LANG_LABELS = { en: "English", hi: "हिन्दी" };

const DICTS = { en, hi };

/** Walk a dotted path ("save.unsaved") through nested objects. */
function lookup(dict, key) {
  let node = dict;
  for (const part of key.split(".")) {
    if (node == null || typeof node !== "object") return undefined;
    node = node[part];
  }
  return typeof node === "string" ? node : undefined;
}

/** Replace {name} with vars.name. Missing vars are left as-is so they're visible in dev. */
export function interpolate(template, vars) {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (m, k) =>
    Object.prototype.hasOwnProperty.call(vars, k) ? String(vars[k]) : m
  );
}

/**
 * Build a translate function for one language.
 * Falls back: requested lang -> en -> the key itself (so a miss is obvious, never blank).
 */
export function createT(lang) {
  const dict = DICTS[lang] || DICTS[DEFAULT_LANG];
  return function t(key, vars) {
    let s = lookup(dict, key);
    if (s === undefined && lang !== DEFAULT_LANG) s = lookup(DICTS[DEFAULT_LANG], key);
    if (s === undefined) {
      if (import.meta.env?.DEV) console.warn(`[i18n] missing key: ${key} (${lang})`);
      return key;
    }
    return interpolate(s, vars);
  };
}

/** Every dotted leaf path in a dictionary — used by the parity check. */
export function flattenKeys(obj, prefix = "") {
  const out = [];
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object") out.push(...flattenKeys(v, path));
    else out.push(path);
  }
  return out.sort();
}

export { en, hi };
