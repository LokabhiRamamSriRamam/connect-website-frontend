/**
 * Geometry audit for test-drive creatives.
 *
 * The four standing gates — check:td, test:td, check:creatives, check:td-render
 * — catch field/manifest mismatches, XSS probes, element-allowlist breaches and
 * frame-edge overflow in a crude character-width estimate. What they DO NOT
 * catch is one <text> element colliding with another <text> element inside the
 * frame, or a <text> running under or over the artwork beside it. That class of
 * bug has appeared in every creative library built so far (Retail twice,
 * Healthcare's token panel once, Hospitality's directions plate once), and §9
 * of SCREEN_BAZAAR_PLAN.md asks for this to be committed as a committed script
 * rather than written ad hoc each round.
 *
 * This is what this script is for. It renders each creative at three input
 * sizes — defaults, max-length English, max-length Hindi — and reports:
 *   1. frame bounds: any <text> whose estimated box lands outside 320×180
 *   2. text-vs-text overlaps between any two <text> elements in the same card
 *
 * It is a HEURISTIC. There is no font metric available in node, so widths are
 * estimated with the same per-glyph factor the safety check uses, and a report
 * means "look at this one in a browser", not "this is definitely broken".
 *
 * TRANSFORMS. An element inside a <g transform="translate(dx dy)"> reports
 * local coordinates in the HTML, so a y=-19 (common in a motif g wrapping its
 * own origin) is NOT an overflow — the parent group's translate puts it inside
 * the frame. The script walks the HTML char by char, pushes and pops transform
 * stacks on <g ...> and </g>, and composes translates when it meets a <text> or
 * <rect>. Rotations are detected and the bbox is expanded to the enclosing
 * axis-aligned box, which is loose but, again, this is a heuristic.
 *
 * Named .mjs following the test-drive precedent. Bundled with esbuild before
 * running, same as check:creatives, because it imports .jsx components bare
 * node cannot parse.
 *
 * CLI:  node check-td-geometry.mjs               # every industry
 *       node check-td-geometry.mjs realestate    # one industry
 */
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import CreativeFrame from "../src/pages/test-drive/creatives/CreativeFrame.jsx";
import {
  CREATIVES_BY_INDUSTRY,
  allCreatives,
} from "../src/pages/test-drive/creatives/registry.js";

const FRAME_W = 320;
const FRAME_H = 180;
/** Pad how far outside the frame counts as overflow — same as check-creative-safety. */
const EDGE_PAD = 12;

/** Rough glyph widths, aligned with the safety check's own factor. */
const CHAR_FACTOR = { en: 0.56, hi: 0.62 };

/** Max-length samples, same approach as check-creative-safety.mjs. */
const SAMPLES = {
  defaults: null, // sentinel: use each template's own defaults
  en: "Wonderful Weekend Special Offer Today Only Hurry Dont Miss It",
  hi: "शानदार सप्ताहांत विशेष छूट आज ही सीमित समय के लिए अभी देखिए",
};

/**
 * Walk the rendered HTML and return every drawn <text>/<rect> with its
 * resolved page-space bbox.
 *
 * The HTML comes from renderToStaticMarkup, so it is clean well-formed XML
 * with no comments, no CDATA, no entities inside attribute values that would
 * matter here. That is why a regex-level walker is enough — a full XML parser
 * would be more honest but is not required against this specific output.
 */
function collect(html) {
  const stack = [{ dx: 0, dy: 0, rot: 0 }];
  const nodes = [];

  // Pattern: a tag open/close. We split the input by '<' and process pieces.
  const tokens = [...html.matchAll(/<\/?([a-zA-Z][\w:-]*)([^>]*)>/g)];
  for (const m of tokens) {
    const name = m[1].toLowerCase();
    const body = m[2];
    const isClose = m[0].startsWith("</");
    const isSelfClose = body.endsWith("/");

    if (name === "g") {
      if (isClose) {
        stack.pop();
      } else {
        const parent = stack[stack.length - 1];
        const t = parseTransform(attr(body, "transform")) || { dx: 0, dy: 0, rot: 0 };
        stack.push({
          dx: parent.dx + t.dx,
          dy: parent.dy + t.dy,
          rot: parent.rot + t.rot,
        });
      }
      continue;
    }

    if (isClose) continue;

    const parent = stack[stack.length - 1];
    if (name === "text") {
      // The matched tag has no body yet; its text child is between it and the
      // next </text>. Find that in the raw html; renderToStaticMarkup does not
      // nest text elements, so this is a safe single-step search.
      const start = m.index + m[0].length;
      const end = html.indexOf("</text>", start);
      const content = end === -1 ? "" : html.slice(start, end);
      const chars = content.replace(/&[a-z#0-9]+;/gi, "x").length;
      const x = toNum(attr(body, "x"));
      const y = toNum(attr(body, "y"));
      const size = toNum(attr(body, "font-size"), 12);
      const anchor = attr(body, "text-anchor") || "start";
      // Width estimate: pick the larger of en and hi, so this one call speaks
      // for both languages — if an en-only render fits by 2 units, the Hindi
      // version very often will not.
      const factor = Math.max(CHAR_FACTOR.en, CHAR_FACTOR.hi);
      const w = chars * size * factor;
      const h = size * 1.1;
      const left = anchor === "middle" ? x - w / 2 : anchor === "end" ? x - w : x;
      const top = y - h * 0.85; // most of a glyph sits above the baseline
      nodes.push(
        bbox("text", content.slice(0, 30), parent, left, top, w, h),
      );
      // Skip past the content so we do not reconsider nested anything inside
      // (there is none, but the regex iterator does not know that).
      continue;
    }

    if (name === "rect") {
      const rx = toNum(attr(body, "rx"));
      // Only rounded rects count as "frames" worth reporting. Decorative plain
      // rects (background fills, grid lines) would otherwise swamp the output.
      if (rx <= 0) continue;
      const x = toNum(attr(body, "x"));
      const y = toNum(attr(body, "y"));
      const w = toNum(attr(body, "width"));
      const h = toNum(attr(body, "height"));
      nodes.push(bbox("rect", `rx${rx}`, parent, x, y, w, h));
      continue;
    }

    void isSelfClose; // unused today, kept to document the shape
  }
  return nodes;
}

/** Compose a child's local box with its parent's transform into a page-space box. */
function bbox(kind, label, parent, x, y, w, h) {
  // Rotation handled loosely: compute the four corners rotated about the
  // parent's translate origin, then take their enclosing axis-aligned box.
  // That is wider than the true bbox but never narrower, so an "inside"
  // verdict stays reliable.
  const corners = [
    [x, y],
    [x + w, y],
    [x, y + h],
    [x + w, y + h],
  ];
  const theta = (parent.rot * Math.PI) / 180;
  const cos = Math.cos(theta);
  const sin = Math.sin(theta);
  const pts = corners.map(([cx, cy]) => [
    parent.dx + cx * cos - cy * sin,
    parent.dy + cx * sin + cy * cos,
  ]);
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  return {
    kind,
    label,
    left: Math.min(...xs),
    right: Math.max(...xs),
    top: Math.min(...ys),
    bottom: Math.max(...ys),
  };
}

function parseTransform(value) {
  if (!value) return null;
  let dx = 0;
  let dy = 0;
  let rot = 0;
  for (const m of value.matchAll(/(translate|rotate)\(([^)]+)\)/g)) {
    const op = m[1];
    const args = m[2].trim().split(/[\s,]+/).map(Number);
    if (op === "translate") {
      dx += args[0] || 0;
      dy += args[1] || 0;
    } else if (op === "rotate") {
      rot += args[0] || 0;
    }
  }
  return { dx, dy, rot };
}

function attr(body, name) {
  const m = new RegExp(`\\b${name}="([^"]*)"`).exec(body);
  return m ? m[1] : null;
}

function toNum(value, fallback = 0) {
  if (value === null || value === undefined) return fallback;
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

/** Two boxes overlap when they overlap on BOTH axes, strictly. */
function overlaps(a, b) {
  return a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
}

function outsideFrame(box) {
  return (
    box.left < -EDGE_PAD ||
    box.right > FRAME_W + EDGE_PAD ||
    box.top < -EDGE_PAD ||
    box.bottom > FRAME_H + EDGE_PAD
  );
}

/** Render one creative with one input set and return its text and rect boxes. */
function renderBoxes(tpl, sample) {
  const fields = {};
  if (sample === null) {
    // defaults — read straight from the manifest
    for (const field of tpl.fields) fields[field] = tpl.defaults?.[field] ?? "";
  } else {
    // Max-length: fill each field with as many characters of the sample as its
    // own limit allows. clipped Devanagari runs come out as valid substrings.
    for (const field of tpl.fields) fields[field] = sample.slice(0, tpl.limits[field]);
  }
  const html = renderToStaticMarkup(
    React.createElement(CreativeFrame, { templateId: tpl.id, fields, label: tpl.id }),
  );
  return collect(html);
}

const argv = process.argv.slice(2);
const industryArg = argv.find((a) => !a.startsWith("-"));

/**
 * Which creatives to check.
 *
 * `--industry` and bare industry argument both resolve to the one list. No arg
 * means every creative in the registry. An unknown industry is an error, not a
 * silent empty pass.
 */
let targets;
if (!industryArg) {
  targets = allCreatives;
} else if (CREATIVES_BY_INDUSTRY[industryArg]) {
  targets = CREATIVES_BY_INDUSTRY[industryArg];
} else {
  console.error(
    `Unknown industry "${industryArg}". Known: ${Object.keys(CREATIVES_BY_INDUSTRY).join(", ")}.`,
  );
  process.exit(2);
}

/**
 * Edge-case tolerance.
 *
 * The informational hours cards each put the hours line and the headline in
 * their own vertical bands. On a max-length Hindi string, the heuristic can
 * flag a 1-2px vertical touch between the headline's descender band and the
 * hours row — the two never meet in the browser because of line-height, but
 * this script knows nothing about leading. A text-vs-text report of less than
 * 4 units on either axis is downgraded to a WARN instead of a FAIL, so a true
 * collision stays a hard failure.
 */
const SOFT_TOUCH = 4;

let issues = 0;
let warns = 0;

for (const tpl of targets) {
  for (const [kind, sample] of Object.entries(SAMPLES)) {
    const boxes = renderBoxes(tpl, sample);
    const texts = boxes.filter((b) => b.kind === "text");

    // Frame bounds — reported per-text.
    for (const box of texts) {
      if (outsideFrame(box)) {
        issues += 1;
        console.error(
          `FAIL  ${tpl.id} [${kind}] text "${box.label}" lands outside the frame: ` +
            `left=${box.left.toFixed(1)} right=${box.right.toFixed(1)} ` +
            `top=${box.top.toFixed(1)} bottom=${box.bottom.toFixed(1)}`,
        );
      }
    }

    // Text-vs-text overlap. Pairs only; the labels name both sides.
    for (let i = 0; i < texts.length; i += 1) {
      for (let j = i + 1; j < texts.length; j += 1) {
        const a = texts[i];
        const b = texts[j];
        if (!overlaps(a, b)) continue;
        const dxOverlap = Math.min(a.right, b.right) - Math.max(a.left, b.left);
        const dyOverlap = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
        const label = `${tpl.id} [${kind}] text "${a.label}" overlaps "${b.label}" by ${dxOverlap.toFixed(1)}x${dyOverlap.toFixed(1)}`;
        if (dxOverlap < SOFT_TOUCH || dyOverlap < SOFT_TOUCH) {
          warns += 1;
          console.warn(`WARN  ${label}`);
        } else {
          issues += 1;
          console.error(`FAIL  ${label}`);
        }
      }
    }
  }
}

const summary = `${issues ? "FAILED" : "PASSED"}  ${targets.length} creatives x 3 input sizes` +
  (issues ? ` — ${issues} overlap/overflow issue(s)` : "") +
  (warns ? ` (${warns} soft-touch warning${warns === 1 ? "" : "s"})` : "");
console.log("\n" + summary);
process.exit(issues ? 1 : 0);

// Keep assert import live even on a clean run, to prevent an unused-import
// error if this ever moves into check-test-drive's own harness.
void assert;
