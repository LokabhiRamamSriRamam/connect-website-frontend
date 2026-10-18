import { C, CText, CtaPill, PriceBadge } from "../kit.jsx";

/**
 * EMI offer — the affordability card.
 *
 * Drawn around a stack of coins and a drawn ₹ symbol: a loan-partners card has
 * to look like money, and a schematic coin stack is less tacky than a drawn
 * banknote. The ₹ is a PATH, like the SOLD stamp's letters, so it survives
 * both the element allowlist and the Hindi rendering of its field values.
 *
 * The headline sits as the pitch ("Own it, not rent it") with the EMI figure
 * as the badge below. That inverts the usual card order — pitch, then price —
 * because the pitch here is what the price IS.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function EmiOffer({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.iris;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.lilac} />

      {/* The coin stack, right side. Four discs offset in height for depth,
          each as an ellipse-on-ellipse so the rim catches the light. */}
      <g>
        {[0, 1, 2, 3].map((i) => {
          const cy = 128 - i * 12;
          return (
            <g key={i}>
              <ellipse cx="256" cy={cy} rx="34" ry="8" fill={accent} />
              <ellipse cx="256" cy={cy - 2} rx="34" ry="8" fill={accent} />
              <ellipse cx="256" cy={cy - 3} rx="30" ry="5" fill={C.white} opacity="0.35" />
            </g>
          );
        })}
        {/* A ₹ glyph on the top coin, as a path. Centred around (256, 76). */}
        <g fill={C.white} transform="translate(252 68)">
          <path d="M0 0h14v3h-5a4 4 0 0 1 5 4h-3a1 1 0 0 0-1-1h-5l9 10h-4l-9-10 0-3h5a1 1 0 0 0 1-1h-7z" />
        </g>
      </g>

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
        y="74"
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
        y="112"
        size={12}
        weight={700}
        fill={C.slate}
        limit={limits.detail}
      >
        {f.detail}
      </CText>

      <PriceBadge cx="43" cy="150" r="19" bg={accent} fg={C.white} limit={limits.price}>
        {f.price}
      </PriceBadge>

      <CtaPill x="70" y="142" h="17" bg={C.ink} fg={C.white} limit={limits.cta}>
        {f.cta}
      </CtaPill>
    </g>
  );
}
