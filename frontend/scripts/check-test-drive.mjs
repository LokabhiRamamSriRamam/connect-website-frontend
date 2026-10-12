/**
 * The test drive's dev gate (plan §3, §7, §13).
 *
 * Validates the data layer against the files on disk:
 *   - en.js and hi.js have identical key trees, and no Hindi value is missing,
 *     empty, or an untranslated copy of the English
 *   - placeholders match between the two languages, per key
 *   - all 22 narration paths exist, are non-empty, and are MD5-distinct within a
 *     language
 *   - every creative manifest entry has a limit for each declared field, a
 *     default inside that limit, and i18n keys that resolve in both languages
 *
 * NOT part of `build`, deliberately (plan §3, §14.8): a re-recorded or renamed
 * audio file should never block a deploy. Run it when touching the data layer.
 *
 * Named .mjs following the scripts/prerender-blogs.mjs precedent — eslint.config.js
 * lints only .js/.jsx and with BROWSER globals, so a node script with those
 * extensions errors on `process`.
 *
 * Imports only plain .js, so it needs no bundler: that is the whole reason the
 * data layer is JSX-free.
 */
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { en, hi, flattenKeys } from "../src/pages/test-drive/i18n/index.js";
import { allCuePaths, CUES, CUE_IDS, LANGS } from "../src/pages/test-drive/audio/manifest.js";
import { allCreatives, CREATIVES_BY_INDUSTRY } from "../src/pages/test-drive/creatives/registry.js";
import { HELP_CUES, MISSIONS } from "../src/pages/test-drive/tutorial/missions.js";

const here = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(here, "..", "public");

let passed = 0;
const failures = [];

function check(name, fn) {
  try {
    fn();
    passed += 1;
  } catch (err) {
    failures.push({ name, err });
  }
}

/** Walk a dotted path through a dictionary. */
const get = (dict, key) => key.split(".").reduce((node, part) => node?.[part], dict);

// ------------------------------------------------------------------ i18n ----

check("en and hi have identical key trees", () => {
  const a = flattenKeys(en);
  const b = flattenKeys(hi);
  const inEn = a.filter((k) => !b.includes(k));
  const inHi = b.filter((k) => !a.includes(k));
  assert.deepEqual(inEn, [], "keys present in en but missing from hi");
  assert.deepEqual(inHi, [], "keys present in hi but missing from en");
  assert.equal(a.length, b.length);
});

check("every value is a non-empty string in both languages", () => {
  for (const key of flattenKeys(en)) {
    for (const [lang, dict] of [
      ["en", en],
      ["hi", hi],
    ]) {
      const value = get(dict, key);
      assert.equal(typeof value, "string", `${lang}.${key} is not a string`);
      assert.ok(value.trim().length > 0, `${lang}.${key} is empty`);
    }
  }
});

check("placeholders match between languages", () => {
  // A {business} that survives in en but is dropped in hi means a Hindi visitor
  // reads a sentence with a hole in it, and nothing else would catch that.
  const mismatched = [];
  for (const key of flattenKeys(en)) {
    const names = (s) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();
    const a = names(get(en, key));
    const b = names(get(hi, key));
    if (a.join(",") !== b.join(",")) {
      mismatched.push(`${key}: en{${a}} vs hi{${b}}`);
    }
  }
  assert.deepEqual(mismatched, [], "placeholder sets differ");
});

/**
 * Strings that are deliberately identical in both dictionaries: "Screen Bazaar"
 * is never translated (plan §7), and the parent-brand line is the owner's exact
 * wording. Anything else matching its English is an untranslated string that
 * would read as a bug to a Hindi visitor.
 *
 * The stale-entry check below keeps this honest: an allowlisted key that now
 * DIFFERS has been translated, so the entry has to go, or the allowlist slowly
 * stops meaning anything. (`common.of` was in here until that check pointed out
 * it is "of" in en and "/" in hi, and so never needed the exemption.)
 */
const UNTRANSLATED_BY_DESIGN = new Set(["brand.name", "brand.parent", "welcome.kicker"]);

check("no Hindi value is an accidental copy of the English", () => {
  const copies = [];
  for (const key of flattenKeys(en)) {
    if (UNTRANSLATED_BY_DESIGN.has(key)) continue;
    if (get(en, key) === get(hi, key)) copies.push(key);
  }
  assert.deepEqual(copies, [], "hi values identical to en (add to the allowlist if intended)");
});

check("every Hindi value actually contains Devanagari", () => {
  const latinOnly = [];
  for (const key of flattenKeys(en)) {
    if (UNTRANSLATED_BY_DESIGN.has(key)) continue;
    const value = get(hi, key);
    // Strip placeholders, digits and punctuation before judging: "{n} मिनट/सेकंड"
    // is legitimately part-ASCII, and so is a string that is only "24:00".
    const stripped = value.replace(/\{\w+\}/g, "").replace(/[\s\d\p{P}\p{S}]/gu, "");
    if (stripped.length === 0) continue; // nothing left to be a word
    if (!/[ऀ-ॿ]/.test(value)) latinOnly.push(`${key} = ${JSON.stringify(value)}`);
  }
  assert.deepEqual(latinOnly, [], "hi values with no Devanagari at all");
});

check("the allowlist has no stale entries", () => {
  // An allowlisted key that now DIFFERS has been translated, so the entry is
  // stale and should go — otherwise the allowlist slowly stops meaning anything.
  const stale = [...UNTRANSLATED_BY_DESIGN].filter(
    (key) => get(en, key) !== undefined && get(en, key) !== get(hi, key)
  );
  assert.deepEqual(stale, [], "allowlisted keys that are now translated");
});

// ----------------------------------------------------------------- audio ----

check("all 22 narration files exist and are non-empty", () => {
  const paths = allCuePaths();
  assert.equal(paths.length, 22, `expected 11 cues x 2 languages, got ${paths.length}`);

  for (const { cueId, lang, path } of paths) {
    const file = join(PUBLIC_DIR, path);
    let stat;
    try {
      stat = statSync(file);
    } catch {
      assert.fail(`${lang}/${cueId}: missing ${path}`);
    }
    // A zero-byte MP3 throws a confusing decode error rather than a clean 404,
    // so it is worse than an absent file and is called out separately.
    assert.ok(stat.size > 0, `${lang}/${cueId}: ${path} is zero bytes`);
    assert.ok(stat.isFile(), `${lang}/${cueId}: ${path} is not a file`);
  }
});

check("no doubled .mp3 extension", () => {
  for (const { path } of allCuePaths()) {
    assert.ok(!/\.mp3\.mp3$/.test(path), `${path} has a doubled extension`);
  }
});

check("no two cues share a recording within a language", () => {
  /**
   * A duplicate MD5 within a language means a recording was exported twice under
   * two names, so one mission narrates another's script. Across languages a
   * match would be stranger still.
   *
   * Note en/04_schedule_timeline.mp3 and en/06_monitor_setup.mp3 are both
   * 282,342 bytes but hash differently — a byte-count coincidence, verified as
   * genuinely separate recordings (plan §8). Hashing is what settles that;
   * comparing sizes would have raised a false alarm.
   */
  for (const lang of LANGS) {
    const byHash = new Map();
    for (const { cueId, path } of allCuePaths().filter((p) => p.lang === lang)) {
      const hash = createHash("md5").update(readFileSync(join(PUBLIC_DIR, path))).digest("hex");
      if (byHash.has(hash)) {
        assert.fail(`${lang}: ${cueId} and ${byHash.get(hash)} are the same recording`);
      }
      byHash.set(hash, cueId);
    }
    assert.equal(byHash.size, CUE_IDS.length, `${lang}: expected ${CUE_IDS.length} distinct`);
  }
});

check("every cue's mission id is one the tutorial will use", () => {
  // Missions land in phase 10; this pins the contract the recordings already
  // assume, so a renamed mission cannot silently orphan a cue.
  const VALID = new Set(["m1", "m2", "m3", "m4", "m5", "m6", null]);
  for (const cueId of CUE_IDS) {
    assert.ok(
      VALID.has(CUES[cueId].missionId),
      `${cueId}: unknown missionId ${CUES[cueId].missionId}`
    );
  }
});

// -------------------------------------------------------------- missions ----

check("every mission's copy resolves in both languages", () => {
  assert.equal(MISSIONS.length, 6, "the brief's six missions");
  for (const m of MISSIONS) {
    for (const key of [m.titleKey, m.bodyKey, m.hintKey]) {
      for (const [lang, dict] of [
        ["en", en],
        ["hi", hi],
      ]) {
        const value = get(dict, key);
        assert.equal(typeof value, "string", `${m.id}: ${lang} has no ${key}`);
        assert.ok(value.trim().length > 0, `${m.id}: ${lang}.${key} is empty`);
      }
    }
  }
});

check("every mission's cue is in the audio manifest", () => {
  // A mission pointing at a cue that does not exist narrates nothing, silently.
  for (const m of MISSIONS) {
    assert.ok(CUES[m.cueId], `${m.id}: cue "${m.cueId}" is not in the manifest`);
  }
});

check("every mission cue has a recording in both languages", () => {
  const paths = allCuePaths();
  for (const m of MISSIONS) {
    for (const lang of LANGS) {
      const entry = paths.find((p) => p.cueId === m.cueId && p.lang === lang);
      assert.ok(entry, `${m.id}: no ${lang} path for ${m.cueId}`);
      assert.ok(
        statSync(join(PUBLIC_DIR, entry.path)).size > 0,
        `${m.id}: ${entry.path} is empty`
      );
    }
  }
});

check("every recording is reachable from somewhere", () => {
  /**
   * Three cues are deliberately not mission narration: the welcome plays at
   * intake, and the completion and replay prompts after the last mission. Two
   * more are contextual help on a mission the visitor is already in.
   *
   * Anything ELSE unreferenced is a recording nobody will ever hear, which is
   * worth knowing before someone re-records it. This check is what surfaced
   * scheduleTimeline and mirrorExplainer, which had no caller at all until they
   * were wired up as HELP_CUES.
   */
  const NON_MISSION = new Set(["welcome", "tutorialComplete", "replayTutorial"]);
  const used = new Set([...MISSIONS.map((m) => m.cueId), ...Object.values(HELP_CUES)]);
  const orphans = CUE_IDS.filter((id) => !used.has(id) && !NON_MISSION.has(id));
  assert.deepEqual(orphans, [], "cues nothing plays and no exception covers");

  // And a help cue must point at a mission that exists.
  for (const [missionId, cueId] of Object.entries(HELP_CUES)) {
    assert.ok(MISSIONS.some((m) => m.id === missionId), `help cue for unknown ${missionId}`);
    assert.ok(CUES[cueId], `help cue "${cueId}" is not in the manifest`);
  }
});

check("mission ids, orders and spotlight targets are sane", () => {
  const ids = new Set();
  const orders = [];
  for (const m of MISSIONS) {
    assert.equal(ids.has(m.id), false, `duplicate mission id ${m.id}`);
    ids.add(m.id);
    orders.push(m.order);
    assert.equal(typeof m.isComplete, "function", `${m.id}: no predicate`);
    assert.ok(m.target && typeof m.target === "string", `${m.id}: no spotlight target`);
  }
  assert.deepEqual(
    orders.slice().sort((a, b) => a - b),
    [1, 2, 3, 4, 5, 6],
    "orders are 1..6 with no gaps or repeats"
  );
  // Declaration order must match `order`, since missionIndex indexes the array.
  assert.deepEqual(orders, [1, 2, 3, 4, 5, 6], "declared in order");
});

// ------------------------------------------------------------- creatives ----

check("every creative declares a limit for each of its fields", () => {
  for (const tpl of allCreatives) {
    assert.ok(Array.isArray(tpl.fields) && tpl.fields.length > 0, `${tpl.id}: no fields`);
    for (const field of tpl.fields) {
      const limit = tpl.limits?.[field];
      assert.equal(typeof limit, "number", `${tpl.id}: no limit for "${field}"`);
      assert.ok(limit > 0, `${tpl.id}: limit for "${field}" is not positive`);
    }
    // A limit for a field the template does not declare is dead config that
    // will mislead whoever tunes it next.
    for (const field of Object.keys(tpl.limits ?? {})) {
      assert.ok(tpl.fields.includes(field), `${tpl.id}: limit for undeclared "${field}"`);
    }
  }
});

check("every default fits inside its own limit", () => {
  for (const tpl of allCreatives) {
    for (const field of tpl.fields) {
      const value = tpl.defaults?.[field] ?? "";
      assert.ok(
        value.length <= tpl.limits[field],
        `${tpl.id}.${field}: default is ${value.length} chars, limit is ${tpl.limits[field]}`
      );
    }
  }
});

check("every creative's name and description resolve in both languages", () => {
  for (const tpl of allCreatives) {
    for (const key of [tpl.nameKey, tpl.descKey]) {
      assert.ok(key, `${tpl.id}: missing an i18n key`);
      for (const [lang, dict] of [
        ["en", en],
        ["hi", hi],
      ]) {
        const value = get(dict, key);
        assert.equal(typeof value, "string", `${tpl.id}: ${lang} has no ${key}`);
        assert.ok(value.trim().length > 0, `${tpl.id}: ${lang}.${key} is empty`);
      }
    }
  }
});

check("every declared field has an editor label in both languages", () => {
  // CreativeEditor renders t(`library.fields.${field}`) for each declared field,
  // so a field with no label shows the raw key to the visitor.
  for (const tpl of allCreatives) {
    for (const field of tpl.fields) {
      for (const [lang, dict] of [
        ["en", en],
        ["hi", hi],
      ]) {
        const value = get(dict, `library.fields.${field}`);
        assert.equal(
          typeof value,
          "string",
          `${tpl.id}: ${lang} has no library.fields.${field}`
        );
      }
    }
  }
});

check("template ids are unique and prefixed by industry", () => {
  const seen = new Set();
  for (const tpl of allCreatives) {
    assert.equal(seen.has(tpl.id), false, `duplicate template id ${tpl.id}`);
    seen.add(tpl.id);
    // r_ for restaurant, c_ for cafe: the prefix is what makes a stray id
    // obvious in a state dump a human is reading.
    const expected = tpl.industry === "restaurant" ? "r_" : "c_";
    assert.ok(
      tpl.id.startsWith(expected),
      `${tpl.id}: industry "${tpl.industry}" expects the "${expected}" prefix`
    );
  }
});

check("both industries have a full library", () => {
  for (const [industry, list] of Object.entries(CREATIVES_BY_INDUSTRY)) {
    // The brief asks for at least 8 creatives per industry.
    assert.ok(list.length >= 8, `${industry}: only ${list.length} creatives, expected 8+`);
    for (const tpl of list) {
      assert.equal(tpl.industry, industry, `${tpl.id} is filed under ${industry}`);
    }
  }
});

check("each library offers more than one kind of layout", () => {
  // A set of eight that all take the same five fields and the same palette is
  // eight copies of one creative. This is a weak proxy for variety, but it would
  // catch a library built by copy-paste.
  for (const [industry, list] of Object.entries(CREATIVES_BY_INDUSTRY)) {
    const shapes = new Set(list.map((t) => t.fields.join(",")));
    const grounds = new Set(list.map((t) => t.palette?.bg));
    assert.ok(shapes.size >= 2, `${industry}: every creative takes the same fields`);
    assert.ok(grounds.size >= 4, `${industry}: only ${grounds.size} distinct backgrounds`);
  }
});

// ---------------------------------------------------------------- report ----

for (const { name, err } of failures) {
  console.error(`\nFAIL  ${name}\n      ${err.message.split("\n").join("\n      ")}`);
}
const total = passed + failures.length;
console.log(
  `\n${failures.length ? "FAILED" : "PASSED"}  ${passed}/${total} test-drive data checks` +
    (failures.length ? ` (${failures.length} failing)` : "")
);
process.exit(failures.length ? 1 : 0);
