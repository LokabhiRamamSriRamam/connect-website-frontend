import { C, CText } from "../kit.jsx";

/**
 * OPD timings — the healthcare set's INFORMATIONAL creative.
 *
 * Three fields, like the restaurant, café and retail hours cards. Every industry
 * library carries one: it is what a screen shows when there is nothing to
 * announce, and it is the entry that proves the field allowlist is per-template
 * rather than global.
 *
 * Drawn as a day bar rather than a clock face or a shopfront, so the four hours
 * cards in the product do not read as one card recoloured. A clinic's hours are
 * a window inside a day, and a bar shows that where two hands cannot.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function ClinicHours({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.iris;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.lilac} />
      <rect x="0" y="0" width="320" height="6" fill={accent} />

      <CText
        x="24"
        y="46"
        size={11}
        weight={800}
        fill={C.muted}
        limit={limits.businessName}
      >
        {f.businessName}
      </CText>

      <CText
        x="24"
        y="82"
        size={22}
        weight={800}
        fill={p.fg || C.ink}
        limit={limits.headline}
        lines={2}
      >
        {f.headline}
      </CText>

      {/* The hours line is the payload, so it is set larger than a supporting
          line would be on an offer creative. */}
      <CText
        x="24"
        y="124"
        size={14}
        weight={700}
        fill={accent}
        limit={limits.hours}
        lines={2}
      >
        {f.hours}
      </CText>

      {/* The day as a bar: the open window lit, the closed hours dim. Fixed
          proportions — this is a diagram of "a window inside a day", not a
          rendering of the hours the visitor typed, which no SVG could parse. */}
      <g>
        <rect x="24" y="152" width="272" height="10" rx="5" fill={C.white} opacity="0.75" />
        <rect x="92" y="152" width="150" height="10" rx="5" fill={accent} />
        {/* Tick marks at the quarters, for a sense of scale. */}
        {[24, 92, 160, 228, 296].map((x) => (
          <rect key={x} x={x - 1} y="166" width="2" height="5" rx="1" fill={C.muted} opacity="0.55" />
        ))}
      </g>
    </g>
  );
}
