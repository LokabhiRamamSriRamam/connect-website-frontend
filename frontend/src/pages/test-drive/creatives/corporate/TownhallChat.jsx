import { C, CText } from "../kit.jsx";

/**
 * Townhall / AMA — the chat-bubble card.
 *
 * Carries the plan's CHAT motif, drawn as two overlapping speech bubbles with
 * a short three-dot ellipsis inside the upper one. The ellipsis is drawn as
 * three circles, not as the `…` glyph, so the whole illustration survives in
 * the eight-element allowlist and does not depend on a Devanagari-safe
 * ellipsis character.
 *
 * Lilac ground: softer than the all-hands card's indigo, which fits an
 * invitation rather than a summons.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function TownhallChat({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.iris;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.lilac} />

      {/* Two speech bubbles, upper-right. The incoming (iris) one with the
          three-dot ellipsis, and the outgoing (white) one below it. */}
      <g>
        {/* Incoming bubble. */}
        <path
          d="M212 42h74a6 6 0 0 1 6 6v30a6 6 0 0 1-6 6h-54l-10 10v-10h-10a6 6 0 0 1-6-6v-30a6 6 0 0 1 6-6z"
          fill={accent}
        />
        {/* The ellipsis — three dots, same y, in the bubble's centre. */}
        <circle cx="236" cy="62" r="3" fill={C.white} />
        <circle cx="248" cy="62" r="3" fill={C.white} />
        <circle cx="260" cy="62" r="3" fill={C.white} />
        {/* Outgoing bubble, smaller and offset. */}
        <path
          d="M224 100h54a6 6 0 0 1 6 6v20a6 6 0 0 1-6 6h-44l-6 8v-8h-4a6 6 0 0 1-6-6v-20a6 6 0 0 1 6-6z"
          fill={C.white}
          opacity="0.95"
        />
      </g>

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
        fill={C.slate}
        limit={limits.detail}
      >
        {f.detail}
      </CText>

      {/* The time on a plate at the foot. */}
      <rect x="18" y="138" width="136" height="24" rx="12" fill={accent} />
      <CText x="30" y="154" size={12.5} weight={800} fill={C.white} limit={limits.hours}>
        {f.hours}
      </CText>
    </g>
  );
}
