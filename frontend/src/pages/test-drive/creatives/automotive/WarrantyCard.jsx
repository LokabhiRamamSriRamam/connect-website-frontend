import { C, CText } from "../kit.jsx";

/**
 * Warranty card — the service lounge trust card.
 *
 * A SHIELD with a check mark drawn inside, on a mint-green ground: not
 * the showroom hero's spotlight, but the lounge's calm reassurance. `stat`
 * carries a count of years, which is the point of the card.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function WarrantyCard({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.green;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.mint} />

      {/* Shield, right side. Drawn as a path — pointed base, flared top. */}
      <g transform="translate(258 92)">
        <path
          d="M-32 -38 Q0 -44 32 -38 L32 10 Q32 32 0 46 Q-32 32 -32 10 Z"
          fill={accent}
        />
        {/* Inner shield outline for depth. */}
        <path
          d="M-24 -32 Q0 -36 24 -32 L24 8 Q24 26 0 36 Q-24 26 -24 8 Z"
          fill="none"
          stroke={C.white}
          strokeWidth="1"
          opacity="0.6"
        />
        {/* Check mark drawn as a path. */}
        <path
          d="M-14 -2 L-4 10 L18 -14"
          fill="none"
          stroke={C.white}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <CText x="22" y="40" size={11} weight={800} fill={p.kicker || C.slate} limit={limits.businessName}>
        {f.businessName}
      </CText>

      <CText x="22" y="74" size={22} weight={800} fill={p.fg || C.ink} limit={limits.headline}>
        {f.headline}
      </CText>

      {/* The stat sits large and left — max 4 at Hindi 0.62 is 4*44*0.62+22=131, well clear of the shield. */}
      <CText x="22" y="134" size={44} weight={800} fill={accent} limit={limits.stat}>
        {f.stat}
      </CText>

      <CText x="22" y="158" size={11} weight={700} fill={p.kicker || C.slate} limit={limits.detail}>
        {f.detail}
      </CText>
    </g>
  );
}
