import { C, CText, CtaPill, PriceBadge } from "../kit.jsx";

/**
 * Accessory bundle — the alloy / mats / kit upsell.
 *
 * The plan's TYRE motif, drawn head-on as a tyre with alloy spokes, right
 * side. Cream ground + violet accent so it sits apart from the dark
 * showroom hero and the indigo service card.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function AccessoryBundle({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.iris;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.cream} />

      {/* Tyre + alloy, right side. Outer tyre is a thick ring, alloy inside
          is a hub with five slots. */}
      <g transform="translate(258 92)">
        {/* Tyre. */}
        <circle cx="0" cy="0" r="50" fill={C.ink} />
        <circle cx="0" cy="0" r="42" fill="none" stroke={accent} strokeWidth="1" opacity="0.4" />
        {/* Alloy centre. */}
        <circle cx="0" cy="0" r="36" fill={accent} />
        {/* Hub centre. */}
        <circle cx="0" cy="0" r="8" fill={C.ink} />
        {/* Five lug nuts around the hub. */}
        {Array.from({ length: 5 }, (_, i) => {
          const theta = (i / 5) * Math.PI * 2 - Math.PI / 2;
          const cx = +(Math.cos(theta) * 5).toFixed(3);
          const cy = +(Math.sin(theta) * 5).toFixed(3);
          return <circle key={i} cx={cx} cy={cy} r="1.4" fill={accent} />;
        })}
        {/* Five alloy spokes — thin wedges from hub to rim, drawn as rotated rects. */}
        {Array.from({ length: 5 }, (_, i) => {
          const rot = (i * 72) - 90;
          return (
            <rect
              key={`s${i}`}
              x="8"
              y="-3"
              width="26"
              height="6"
              rx="1"
              fill={C.ink}
              opacity="0.9"
              transform={`rotate(${rot})`}
            />
          );
        })}
      </g>

      <CText x="22" y="40" size={11} weight={800} fill={p.kicker || C.muted} limit={limits.businessName}>
        {f.businessName}
      </CText>

      <CText x="22" y="78" size={22} weight={800} fill={p.fg || C.ink} limit={limits.headline}>
        {f.headline}
      </CText>

      <CText x="22" y="110" size={12} weight={700} fill={p.kicker || C.muted} limit={limits.detail}>
        {f.detail}
      </CText>

      <PriceBadge cx="43" cy="146" r="19" bg={accent} fg={C.white} limit={limits.price}>
        {f.price}
      </PriceBadge>

      <CtaPill x="70" y="138" h="17" bg={accent} fg={C.white} limit={limits.cta}>
        {f.cta}
      </CtaPill>
    </g>
  );
}
