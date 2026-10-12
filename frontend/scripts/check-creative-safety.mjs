/**
 * The required phase 5 acceptance check (plan §12, §13).
 *
 * Renders every creative through CreativeFrame with hostile input in every
 * editable field and asserts the output contains no executable or injected
 * markup — only escaped literal text.
 *
 * Run with `npm run check:creatives`, which bundles it with esbuild first — it
 * imports .jsx components, which bare node cannot parse.
 *
 * Named .mjs, following the scripts/prerender-blogs.mjs precedent for node
 * scripts: eslint.config.js lints only .js/.jsx and with BROWSER globals, so a
 * node script named .jsx is linted as browser code and errors on `process`.
 *
 * NOT part of `build`, for the same reason the audio check is not: a tooling
 * failure should never block a deploy. Run it when touching anything under
 * creatives/.
 */
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import CreativeFrame from "../src/pages/test-drive/creatives/CreativeFrame.jsx";
import { allCreatives } from "../src/pages/test-drive/creatives/registry.js";
import { COMPONENT_KEYS } from "../src/pages/test-drive/creatives/components.jsx";

/**
 * The probe from the plan, plus the variants that break a naive token-replacement
 * renderer in a different way each: attribute escape, entity double-decode,
 * CDATA escape, event handler, and a javascript: URL.
 */
const PROBES = [
  '</text><script>alert(1)</script>',
  '"><script>alert(1)</script>',
  "'><img src=x onerror=alert(1)>",
  "<![CDATA[</text><script>alert(1)</script>]]>",
  "&lt;script&gt;alert(1)&lt;/script&gt;",
  "javascript:alert(1)",
  '</text></svg><svg onload="alert(1)">',
  "{{headline}}",
  "${alert(1)}",
  "\u0000<script>alert(1)</script>",
];

let checks = 0;
const failures = [];

function check(name, fn) {
  try {
    fn();
    checks += 1;
  } catch (err) {
    failures.push({ name, err });
  }
}

for (const tpl of allCreatives) {
  for (const probe of PROBES) {
    check(`${tpl.id} <- ${probe.slice(0, 28)}`, () => {
      // Hostile input in EVERY editable field at once.
      const fields = {};
      for (const field of tpl.fields) fields[field] = probe;

      const html = renderToStaticMarkup(
        React.createElement(CreativeFrame, {
          templateId: tpl.id,
          fields,
          label: probe, // the aria-label is an attribute path, so probe it too
        })
      );

      // 1. No executable or injected ELEMENT or ATTRIBUTE survived.
      //
      //    Substring matching is not sufficient here and the first version of
      //    this check produced false positives because of it: React escapes the
      //    probe to literal text, so "onerror=alert(1)" legitimately appears
      //    both inside a <text> node and inside the quoted aria-label value.
      //    Neither is an attribute. So instead of guessing with a regex, the
      //    output is tokenised into real tags and real attribute names, and the
      //    assertions are made against those.
      // Blank every quoted attribute value before tokenising, so a ">" or a "<"
      // that the visitor typed (and React escaped into a value) cannot be read
      // as the start or end of a tag.
      const skeleton = html.replace(/="[^"]*"/g, '=""');
      const tags = [...skeleton.matchAll(/<\/?([a-zA-Z][\w:-]*)/g)].map((m) =>
        m[1].toLowerCase()
      );
      const ALLOWED_TAGS = ["svg", "g", "rect", "circle", "ellipse", "path", "text", "tspan"];
      for (const tag of tags) {
        assert.ok(ALLOWED_TAGS.includes(tag), `unexpected element <${tag}> in the output`);
      }

      // Attribute NAMES, taken from inside a tag and only from attribute
      // position. Quoted values are blanked out first: an escaped probe sitting
      // inside aria-label="...onerror=alert(1)..." is literal text in a value,
      // not an attribute, and scanning the raw tag would report it as one. This
      // produced false failures until the values were stripped.
      const attrs = [];
      for (const tag of html.matchAll(/<[a-zA-Z][^>]*>/g)) {
        const withoutValues = tag[0].replace(/="[^"]*"/g, "=");
        for (const a of withoutValues.matchAll(/[\s]([a-zA-Z-]+)=/g)) {
          attrs.push(a[1].toLowerCase());
        }
      }
      for (const attr of attrs) {
        assert.equal(
          attr.startsWith("on"),
          false,
          `an event-handler attribute "${attr}" reached the output`
        );
      }
      assert.equal(/<!\[CDATA\[/.test(html), false, "a raw CDATA section reached the output");

      // A javascript: URL only matters in an attribute that dereferences a URL.
      // aria-label carrying the literal text is harmless.
      for (const tag of html.matchAll(/<[a-zA-Z][^>]*>/g)) {
        for (const a of tag[0].matchAll(/\s(href|xlink:href|src)="([^"]*)"/gi)) {
          assert.equal(
            /javascript:/i.test(a[2]),
            false,
            `a javascript: URL reached ${a[1]}`
          );
        }
      }

      // 2. Exactly one <svg> root: nothing closed the frame and opened its own.
      assert.equal(
        (html.match(/<svg/g) || []).length,
        1,
        "the probe broke out of the frame and opened a second <svg>"
      );

      // 3. Nothing closed a <text> early. React escapes "<" to "&lt;", so a
      //    literal "</text>" in the output could only come from injection.
      assert.equal(
        html.includes("</text><script"),
        false,
        "a </text> escape sequence survived unescaped"
      );

      // 4. Tags are balanced — a broken-out probe leaves them uneven.
      assert.equal(
        (html.match(/<text/g) || []).length,
        (html.match(/<\/text>/g) || []).length,
        "unbalanced <text> elements"
      );

      // 5. The angle brackets ARE present, escaped. The text must be rendered as
      //    literal characters, not stripped — stripping would also pass tests 1-4
      //    while silently eating the visitor's copy.
      if (probe.includes("<")) {
        assert.ok(
          html.includes("&lt;"),
          "the probe should render as escaped literal text, not vanish"
        );
      }
    });
  }
}

/**
 * Geometry sanity: every coordinate must land inside (or near) the 320x180 frame.
 *
 * This exists because the first run of the probe above revealed y="7425.3" — JSX
 * makes y="74" a string, and the kit's arithmetic concatenated rather than added,
 * pushing text thousands of units off-canvas. That is valid SVG which renders
 * blank, so no safety assertion would ever have caught it. kit.jsx now coerces
 * with n(); this check is what keeps it coerced.
 */
check("all rendered coordinates stay inside the frame", () => {
  for (const tpl of allCreatives) {
    const fields = {};
    for (const field of tpl.fields) fields[field] = "Sample text for layout";
    const html = renderToStaticMarkup(
      React.createElement(CreativeFrame, { templateId: tpl.id, fields, label: "x" })
    );
    for (const m of html.matchAll(/\b(x|y|cx|cy)="(-?[\d.]+)"/g)) {
      const value = Number(m[2]);
      assert.ok(
        Number.isFinite(value) && value >= -80 && value <= 420,
        `${tpl.id}: ${m[1]}="${m[2]}" is outside the 320x180 frame`
      );
    }
    // A concatenation bug also shows up as absurd precision ("7425.299999...").
    for (const m of html.matchAll(/\b(?:x|y|cx|cy)="(-?\d+\.\d{6,})"/g)) {
      assert.fail(`${tpl.id}: suspicious coordinate precision ${m[1]}`);
    }
  }
});

/**
 * Limit-length text in BOTH languages must stay inside the frame.
 *
 * §13 calls this the most likely visual regression in the whole feature, because
 * SVG <text> neither wraps nor shrinks and Devanagari sets wider than Latin at
 * the same size. The width estimate is crude — there is no font metric available
 * in node — so it is tuned to flag plausible overflow rather than to be exact.
 * It earned its place immediately: it caught Today's Special, whose CENTRED
 * headline has only 160 units either side of x=160 and ran past the frame edge
 * at a limit that is fine for the left-aligned templates.
 *
 * A flag here means "look at this one in a browser", not necessarily a bug.
 */
check("limit-length text fits the frame in English and Hindi", () => {
  const SAMPLES = {
    en: "Wonderful Weekend Special Offer Today Only Hurry",
    hi: "शानदार सप्ताहांत विशेष छूट आज ही सीमित समय के लिए",
  };
  const overflows = [];

  for (const tpl of allCreatives) {
    for (const [lang, sample] of Object.entries(SAMPLES)) {
      const fields = {};
      for (const field of tpl.fields) fields[field] = sample.slice(0, tpl.limits[field]);
      const html = renderToStaticMarkup(
        React.createElement(CreativeFrame, { templateId: tpl.id, fields, label: tpl.id })
      );

      for (const m of html.matchAll(
        /<text x="([\d.]+)"[^>]*font-size="([\d.]+)"[^>]*text-anchor="(\w+)"[^>]*>([^<]*)<\/text>/g
      )) {
        const x = Number(m[1]);
        const size = Number(m[2]);
        const anchor = m[3];
        // Entities count as one glyph, not as "&#x27;".
        const chars = m[4].replace(/&[a-z#0-9]+;/gi, "x").length;
        const width = chars * size * (lang === "hi" ? 0.62 : 0.56);
        const right = anchor === "middle" ? x + width / 2 : x + width;
        const left = anchor === "middle" ? x - width / 2 : x;
        if (right > 332 || left < -12) {
          overflows.push(
            `${tpl.id} [${lang}] "${m[4].slice(0, 20)}" spans ${Math.round(left)}..${Math.round(right)}`
          );
        }
      }
    }
  }

  assert.deepEqual(overflows, [], `text estimated to overflow the 320-wide frame`);
});

// Every manifest componentKey must resolve, or a creative renders as a fallback
// placeholder in production and nobody notices until a visitor sees it.
check("every manifest componentKey resolves to a component", () => {
  for (const tpl of allCreatives) {
    assert.ok(
      COMPONENT_KEYS.includes(tpl.componentKey),
      `${tpl.id}: componentKey "${tpl.componentKey}" has no entry in components.jsx`
    );
  }
});

// A creative must also render cleanly with NO fields at all: an instance whose
// values are all empty must not draw "undefined" anywhere.
check("empty fields draw nothing rather than 'undefined'", () => {
  for (const tpl of allCreatives) {
    const html = renderToStaticMarkup(
      React.createElement(CreativeFrame, { templateId: tpl.id, fields: {}, label: "" })
    );
    assert.equal(/undefined|null|NaN/.test(html), false, `${tpl.id} drew a junk value`);
  }
});

// And an unknown template degrades to the placeholder instead of throwing.
check("an unknown template degrades without throwing", () => {
  const html = renderToStaticMarkup(
    React.createElement(CreativeFrame, { templateId: "nope", fields: {}, label: "x" })
  );
  assert.ok(html.includes("<svg"), "still renders a frame");
});

for (const { name, err } of failures) {
  console.error(`\nFAIL  ${name}\n      ${err.message.split("\n")[0]}`);
}
console.log(
  `\n${failures.length ? "FAILED" : "PASSED"}  ${checks}/${checks + failures.length} ` +
    `creative safety checks (${allCreatives.length} creatives x ${PROBES.length} probes)`
);
process.exit(failures.length ? 1 : 0);
