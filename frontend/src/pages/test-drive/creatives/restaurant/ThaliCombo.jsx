import { C, CText, CtaPill, Plate, PriceBadge } from "../kit.jsx";

/**
 * Thali combo offer. 320x180 (16:9), drawn edge to edge — CreativeFrame owns the
 * <svg> and the viewBox, so this renders straight into the parent's coordinates.
 *
 * `f` arrives already allowlisted and String()-coerced by CreativeFrame. Every
 * visible string goes through CText, so overflow is clamped and markup is
 * impossible.
 */
export default function ThaliCombo({ f, limits, palette }) {
  const p = palette || {};
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.indigo} />

      {/* A warm wash behind the plate so the food reads against the deep bg. */}
      <circle cx="248" cy="96" r="78" fill={p.accent || C.gold} opacity="0.18" />

      <Plate cx="248" cy="96" r="52" rim={C.ivory} food={p.accent || C.gold} />
      {/* Three katoris around the rim. */}
      <circle cx="212" cy="58" r="13" fill={C.alert} opacity="0.85" />
      <circle cx="286" cy="58" r="13" fill={C.green} opacity="0.85" />
      <circle cx="248" cy="150" r="13" fill={C.white} opacity="0.9" />

      <CText x="22" y="40" size={11} weight={800} fill={p.kicker || C.gold} limit={limits.businessName}>
        {f.businessName}
      </CText>

      <CText
        x="22"
        y="74"
        size={22}
        weight={800}
        fill={p.fg || C.white}
        limit={limits.headline}
        lines={2}
      >
        {f.headline}
      </CText>

      <CText x="22" y="126" size={12} weight={700} fill={p.fg || C.white} opacity="0.85" limit={limits.offer}>
        {f.offer}
      </CText>

      <PriceBadge cx="62" cy="146" r="22" bg={p.accent || C.gold} limit={limits.price}>
        {f.price}
      </PriceBadge>

      <CtaPill x="94" y="136" h="20" bg={p.fg || C.white} fg={p.bg || C.indigo} limit={limits.cta}>
        {f.cta}
      </CtaPill>
    </g>
  );
}
