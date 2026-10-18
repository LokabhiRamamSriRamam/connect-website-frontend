import { C, CText } from "../kit.jsx";

/**
 * Facility notice — the lift-lobby card.
 *
 * The one card in the set that uses an ALERT motif, drawn as a triangular
 * caution icon in the upper right. Light red (blush) ground with an alert-red
 * accent — a lift-outage card can shout a little, because the point IS to
 * change behaviour.
 *
 * No `hours` field: a facility notice is open-ended until it is taken down,
 * and the `cta` carries the "back by Monday" line instead.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function FacilityNotice({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.alert;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.blush} />

      {/* Caution triangle, upper right. Drawn as a stroked outer path, filled
          inner, with an exclamation (rect + dot) inside. */}
      <g>
        {/* Soft halo. */}
        <circle cx="256" cy="76" r="56" fill={accent} opacity="0.09" />
        {/* Triangle body. */}
        <path d="M256 32l44 76h-88z" fill={accent} />
        <path d="M256 32l44 76h-88z" fill={C.white} opacity="0.1" />
        {/* Exclamation stem. */}
        <rect x="252" y="60" width="8" height="28" rx="2" fill={C.white} />
        {/* Exclamation dot. */}
        <circle cx="256" cy="96" r="4" fill={C.white} />
      </g>

      {/* A short red rule across the top, so the card has a sense of edge
          against neighbours on the wall. */}
      <rect x="0" y="0" width="320" height="4" fill={accent} />

      <CText
        x="22"
        y="40"
        size={11}
        weight={800}
        fill={p.kicker || C.muted}
        limit={limits.businessName}
      >
        {f.businessName}
      </CText>

      <CText
        x="22"
        y="78"
        size={21}
        weight={800}
        fill={p.fg || C.ink}
        limit={limits.headline}
        lines={2}
      >
        {f.headline}
      </CText>

      <CText
        x="22"
        y="128"
        size={12.5}
        weight={700}
        fill={accent}
        limit={limits.detail}
      >
        {f.detail}
      </CText>

      {/* The cta is NOT a button here — a notice is read, not acted on. It
          sits as a dated-by chip, so the "Back by Monday" reads as the
          expected end rather than an invitation. */}
      <rect x="18" y="146" width="132" height="20" rx="10" fill={C.white} opacity="0.95" />
      <CText x="30" y="160" size={11} weight={800} fill={accent} limit={limits.cta}>
        {f.cta}
      </CText>
    </g>
  );
}
