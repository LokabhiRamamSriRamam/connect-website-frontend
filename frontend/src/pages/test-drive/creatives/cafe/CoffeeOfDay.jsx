import { C, CText, CtaPill, PriceBadge, SteamCup } from "../kit.jsx";

/**
 * Coffee of the day. 320x180 (16:9), drawn edge to edge — CreativeFrame owns the
 * <svg> and the viewBox.
 *
 * `f` arrives already allowlisted and String()-coerced by CreativeFrame. Every
 * visible string goes through CText, so overflow is clamped and markup is
 * impossible.
 */
export default function CoffeeOfDay({ f, limits, palette }) {
  const p = palette || {};
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.ivory} />

      {/* A warm halo so the cup reads against the cream ground. */}
      <circle cx="252" cy="104" r="62" fill={p.accent || C.gold} opacity="0.22" />

      {/* Saucer under the cup, so it sits on something. */}
      <ellipse cx="252" cy="146" rx="46" ry="9" fill={C.taupe} opacity="0.35" />
      <SteamCup x="228" y="86" s="1.4" fill={C.white} accent={p.accent || C.gold} />

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
        y="72"
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
        y="122"
        size={12}
        weight={700}
        fill={C.slate}
        limit={limits.offer}
      >
        {f.offer}
      </CText>

      <PriceBadge cx="46" cy="148" r="21" bg={p.accent || C.gold} limit={limits.price}>
        {f.price}
      </PriceBadge>

      <CtaPill x="76" y="139" h="19" bg={p.fg || C.ink} fg={C.white} limit={limits.cta}>
        {f.cta}
      </CtaPill>
    </g>
  );
}
