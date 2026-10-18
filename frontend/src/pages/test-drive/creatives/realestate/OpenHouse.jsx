import { C, CText } from "../kit.jsx";

/**
 * Open house — the model-flat opening.
 *
 * Carries the plan's PIN motif, drawn as a map pin dropped at the plate's left
 * edge, because the operative information here is an address, not a figure.
 *
 * Ivory ground with an indigo accent, lighter than the launch card's full
 * indigo: an open-house card invites the viewer in rather than announcing.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function OpenHouse({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.indigo;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.ivory} />

      {/* A thin accent rule across the top, so the card has an edge against a
          neighbouring tile on the wall. */}
      <rect x="0" y="0" width="320" height="4" fill={accent} />

      {/* A map pin at the right. Drop shape with a small hole, drawn as one
          path and one circle so the two shapes stay in registration. */}
      <g>
        <path
          d="M258 46c-12 0-22 10-22 22 0 16 22 42 22 42s22-26 22-42c0-12-10-22-22-22z"
          fill={accent}
        />
        <circle cx="258" cy="68" r="7" fill={p.bg || C.ivory} />
        {/* A faint shadow pooled under the pin — a flat ellipse, no gradients
            (gradients are outside the element allowlist). */}
        <ellipse cx="258" cy="118" rx="18" ry="4" fill={C.ink} opacity="0.1" />
      </g>

      {/* A dashed line snaking left from the pin to the headline, so the pin
          reads as marked rather than parked. Three short dashes, not a stroke
          dasharray — a plain path keeps the output simple. */}
      {[0, 1, 2].map((i) => (
        <rect key={i} x={226 - i * 14} y="68" width="8" height="2" rx="1" fill={accent} opacity="0.5" />
      ))}

      <CText
        x="22"
        y="40"
        size={11}
        weight={800}
        fill={p.kicker || C.slate}
        limit={limits.businessName}
      >
        {f.businessName}
      </CText>

      <CText
        x="22"
        y="80"
        size={22}
        weight={800}
        fill={p.fg || C.ink}
        limit={limits.headline}
      >
        {f.headline}
      </CText>

      <CText
        x="22"
        y="110"
        size={12}
        weight={700}
        fill={accent}
        limit={limits.detail}
      >
        {f.detail}
      </CText>

      {/* The timing on a plate: a card about an address is a card about when
          to go to it. */}
      <rect x="18" y="136" width="186" height="24" rx="12" fill={accent} />
      <CText x="30" y="152" size={12.5} weight={800} fill={C.white} limit={limits.hours}>
        {f.hours}
      </CText>
    </g>
  );
}
