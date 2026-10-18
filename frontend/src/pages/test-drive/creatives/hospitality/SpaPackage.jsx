import { C, CText, CtaPill, PriceBadge } from "../kit.jsx";

/**
 * Spa hour — the second of the two priced creatives.
 *
 * A treatment with a fixed duration and a published rate is a defined product,
 * which is what makes pricing it unremarkable where pricing the welcome board
 * would not be.
 *
 * The calmest card in the set by design: lilac rather than indigo, a single
 * still motif, and more white space than anything else here. A spa card that
 * shouts has sold the wrong thing.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function SpaPackage({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.iris;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.lilac} />

      {/* Still water in a bowl, with a floating candle and two stones: the
          whole motif is "nothing is moving". */}
      <g>
        {/* Bowl. */}
        <path d="M198 108h104a52 52 0 0 1-104 0z" fill={accent} opacity="0.25" />
        <ellipse cx="250" cy="108" rx="52" ry="9" fill={accent} opacity="0.45" />
        {/* Candle, floating centre. */}
        <ellipse cx="250" cy="104" rx="13" ry="5" fill={C.white} />
        <path
          d="M250 92c-4-5 2-7 0-11 4 4 7 6 7 11a7 7 0 0 1-14 0c0-2 1-3 2-4 1 2 3 3 5 4z"
          fill={C.gold}
        />
        {/* Two stones, resting at the rim. */}
        <ellipse cx="212" cy="126" rx="13" ry="7" fill={C.slate} opacity="0.5" />
        <ellipse cx="212" cy="121" rx="10" ry="5.5" fill={C.slate} opacity="0.7" />
        <ellipse cx="290" cy="124" rx="10" ry="5.5" fill={C.slate} opacity="0.45" />
        {/* A single leaf on the surface. */}
        <path
          d="M272 100c6-6 14-6 18-4-2 6-8 10-14 9z"
          fill={C.green}
          opacity="0.75"
        />
      </g>

      <CText
        x="22"
        y="42"
        size={11}
        weight={800}
        fill={p.kicker || C.muted}
        limit={limits.businessName}
      >
        {f.businessName}
      </CText>

      <CText
        x="22"
        y="76"
        size={22}
        weight={800}
        fill={p.fg || C.ink}
        limit={limits.headline}
      >
        {f.headline}
      </CText>

      <CText
        x="22"
        y="104"
        size={12}
        weight={700}
        fill={C.slate}
        limit={limits.detail}
      >
        {f.detail}
      </CText>

      <PriceBadge cx="43" cy="146" r="19" bg={accent} fg={C.white} limit={limits.price}>
        {f.price}
      </PriceBadge>

      <CtaPill x="70" y="138" h="17" bg={p.fg || C.ink} fg={C.white} limit={limits.cta}>
        {f.cta}
      </CtaPill>
    </g>
  );
}
