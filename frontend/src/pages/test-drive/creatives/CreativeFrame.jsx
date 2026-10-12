import { getTemplate } from "./registry.js";
import { getComponent } from "./components.jsx";
import { C, FONT } from "./kit.jsx";

/**
 * The ONLY renderer for signage creatives.
 *
 * All three preview sizes — wall tile, editor, timeline chip — come through here,
 * so there is exactly one place to audit for field safety and exactly one place
 * that owns the <svg> wrapper and viewBox. Individual creatives must never render
 * their own <svg>, or a second, unaudited path would exist.
 *
 * THE FIELD CONTRACT, and why it is safe by construction:
 *
 *   1. ALLOWLIST. Only keys named in the template's `fields` are copied. A field
 *      the manifest does not declare cannot reach a creative at all, however it
 *      got into the instance (hydrated localStorage from an older build, a future
 *      reducer bug, a hand-edited state dump).
 *   2. COERCE. Every value becomes a String. A creative never receives an object,
 *      array, function or element, so it cannot be tricked into rendering one as
 *      a child.
 *   3. TEXT CHILD ONLY. Values are drawn via CText as JSX text children of
 *      <text>. React escapes those, and a text child CANNOT become markup.
 *
 * This is why §4 chose components-with-props over token-replaced .svg files. With
 * svg.replace("{{headline}}", userText), a headline of
 * "</text><script>alert(1)</script>" closes the text element and executes — and
 * you would be hand-rolling SVG/XML-context escaping forever, where one missed
 * context is a hole. Here there is no string substitution and no parsing, so
 * there is no spot to miss. The probe is asserted in scripts/test-td.mjs.
 */
export default function CreativeFrame({
  templateId,
  fields,
  label = "",
  className = "",
}) {
  const tpl = getTemplate(templateId);
  const Cmp = tpl ? getComponent(tpl.componentKey) : null;

  // A missing template or unresolvable componentKey degrades to a visible, honest
  // placeholder. It must never throw: one bad instance would otherwise blank the
  // whole screen wall.
  if (!tpl || !Cmp) {
    return (
      <svg
        viewBox="0 0 320 180"
        className={`sb-anim h-full w-full ${className}`}
        role="img"
        aria-label={label}
      >
        <rect width="320" height="180" fill={C.sand} />
        <text
          x="160"
          y="94"
          fontFamily={FONT}
          fontSize="13"
          fontWeight="800"
          fill={C.muted}
          textAnchor="middle"
        >
          {label}
        </text>
      </svg>
    );
  }

  // 1 + 2: allowlist and coerce. Built fresh each render from the manifest's
  // field list, never from Object.keys(fields).
  const safe = {};
  for (const key of tpl.fields) safe[key] = String(fields?.[key] ?? "");

  return (
    <svg
      viewBox="0 0 320 180"
      className={`sb-anim h-full w-full ${className}`}
      role="img"
      /**
       * aria-label is a plain string attribute, so React escapes it like any
       * other prop — it cannot introduce markup. It deliberately carries the
       * creative's NAME and not the visitor's field text: an SVG read out as one
       * long label is worse for a screen reader than the real copy, which the
       * editor and the schedule row render as actual text.
       */
      aria-label={label}
    >
      <Cmp f={safe} limits={tpl.limits} palette={tpl.palette} />
    </svg>
  );
}
