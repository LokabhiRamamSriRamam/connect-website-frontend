import { C, CText, CtaPill, PriceBadge } from "../kit.jsx";

/**
 * Full body check-up — one of only two priced creatives in the healthcare set.
 *
 * A check-up package is a defined product with a published figure, which is what
 * makes pricing it unremarkable where pricing a consultation would not be. The
 * manifest explains that choice for the set as a whole.
 *
 * The plan's "cross" motif lives here, drawn as a clipboard of ticked tests —
 * the picture of a package being a list, not a single thing.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function HealthPackage({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.indigo;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.mint} />

      {/* Clipboard. */}
      <g>
        <rect x="208" y="30" width="92" height="118" rx="7" fill={C.white} />
        <rect
          x="208"
          y="30"
          width="92"
          height="118"
          rx="7"
          fill="none"
          stroke={accent}
          strokeWidth="2"
          opacity="0.35"
        />
        {/* Clip at the top. */}
        <rect x="238" y="22" width="32" height="14" rx="4" fill={accent} />
        {/* A medical cross on the sheet, then the ticked lines below it. */}
        <rect x="245" y="46" width="18" height="6" rx="2" fill={accent} opacity="0.85" />
        <rect x="251" y="40" width="6" height="18" rx="2" fill={accent} opacity="0.85" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <path
              d={`M220 ${76 + i * 17}l4 4 7-8`}
              fill="none"
              stroke={C.green}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x="238"
              y={73 + i * 17}
              width={i === 3 ? 30 : 48}
              height="4"
              rx="2"
              fill={C.line}
            />
          </g>
        ))}
      </g>

      <CText
        x="22"
        y="38"
        size={11}
        weight={800}
        fill={p.kicker || C.muted}
        limit={limits.businessName}
      >
        {f.businessName}
      </CText>

      <CText
        x="22"
        y="70"
        size={19}
        weight={800}
        fill={p.fg || C.ink}
        limit={limits.headline}
        lines={2}
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

      <PriceBadge cx="44" cy="146" r="21" bg={accent} fg={C.white} limit={limits.price}>
        {f.price}
      </PriceBadge>

      <CtaPill x="74" y="137" h="19" bg={p.fg || C.ink} fg={C.white} limit={limits.cta}>
        {f.cta}
      </CtaPill>
    </g>
  );
}
