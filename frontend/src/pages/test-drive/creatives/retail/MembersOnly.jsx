import { C, CText, CtaPill } from "../kit.jsx";

/**
 * Members save more — the retail set's loyalty creative, drawn as a membership
 * card rather than the café's stamp card.
 *
 * Declares no price: membership is a mechanic, and the saving it unlocks belongs
 * in the offer line as a sentence rather than on a badge as a figure.
 *
 * Dark ground, as the café's Evening Unwind is: a members card should look like
 * the premium thing in a library of sale shouting.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function MembersOnly({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.gold;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.ink} />

      {/* A hairline border inset from the edge — the visual shorthand for
          "members", and the cheapest way to make a black card read as deliberate
          rather than unstyled. */}
      <rect
        x="10"
        y="10"
        width="300"
        height="160"
        fill="none"
        stroke={accent}
        strokeWidth="1"
        opacity="0.45"
      />

      {/* The card itself, tilted, with a chip and a magnetic stripe. */}
      <g transform="translate(232 94) rotate(-8)">
        <rect x="-54" y="-34" width="108" height="68" rx="7" fill={accent} />
        <rect x="-54" y="-20" width="108" height="11" fill={C.ink} opacity="0.75" />
        {/* Chip. */}
        <rect x="-44" y="2" width="18" height="14" rx="3" fill={C.ink} opacity="0.3" />
        {/* Embossed number blocks — decorative, never visitor text. */}
        <rect x="-20" y="8" width="16" height="4" rx="2" fill={C.ink} opacity="0.22" />
        <rect x="0" y="8" width="16" height="4" rx="2" fill={C.ink} opacity="0.22" />
        <rect x="20" y="8" width="16" height="4" rx="2" fill={C.ink} opacity="0.22" />
      </g>

      <CText
        x="26"
        y="44"
        size={11}
        weight={800}
        fill={p.kicker || C.taupe}
        limit={limits.businessName}
      >
        {f.businessName}
      </CText>

      <CText
        x="26"
        y="80"
        size={22}
        weight={800}
        fill={p.fg || C.white}
        limit={limits.headline}
        lines={2}
      >
        {f.headline}
      </CText>

      <CText
        x="26"
        y="122"
        size={11.5}
        weight={700}
        fill={accent}
        limit={limits.offer}
      >
        {f.offer}
      </CText>

      <CtaPill x="26" y="134" h="20" bg={accent} fg={C.ink} limit={limits.cta}>
        {f.cta}
      </CtaPill>
    </g>
  );
}
