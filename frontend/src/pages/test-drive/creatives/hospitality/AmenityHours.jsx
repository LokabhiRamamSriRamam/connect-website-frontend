import { C, CText } from "../kit.jsx";

/**
 * Pool & spa — the pool stop on the plan's route.
 *
 * Informational: four fields, no price and no call to action. A guest standing
 * at the pool door wants the timings and whether towels are provided, and
 * nothing else.
 *
 * The one card in the set on iris rather than indigo, because water should not
 * be the same colour as the lobby.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function AmenityHours({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.mint;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.iris} />

      {/* Water: three stacked wave lines filling the lower third, each offset
          so they read as a surface rather than as a pattern. */}
      <path
        d="M0 134q20-9 40 0t40 0 40 0 40 0 40 0 40 0 40 0 40 0v46H0z"
        fill={C.white}
        opacity="0.1"
      />
      <path
        d="M0 148q20-9 40 0t40 0 40 0 40 0 40 0 40 0 40 0 40 0v32H0z"
        fill={C.white}
        opacity="0.12"
      />
      <path
        d="M0 162q20-9 40 0t40 0 40 0 40 0 40 0 40 0 40 0 40 0v18H0z"
        fill={C.white}
        opacity="0.14"
      />

      {/* A folded towel on a lounger rail, at the right. */}
      <g>
        <rect x="246" y="44" width="56" height="7" rx="3.5" fill={accent} opacity="0.85" />
        <rect x="252" y="51" width="44" height="34" rx="4" fill={accent} opacity="0.95" />
        <rect x="252" y="62" width="44" height="3" fill={C.iris} opacity="0.35" />
        <rect x="252" y="70" width="44" height="3" fill={C.iris} opacity="0.35" />
      </g>

      <CText
        x="24"
        y="42"
        size={11}
        weight={800}
        fill={p.kicker || C.mist}
        limit={limits.businessName}
      >
        {f.businessName}
      </CText>

      <CText
        x="24"
        y="76"
        size={22}
        weight={800}
        fill={p.fg || C.white}
        limit={limits.headline}
      >
        {f.headline}
      </CText>

      {/* The timings are the payload, on a tinted plate so they read as the
          operational fact they are — the same device as healthcare's duty card. */}
      <rect x="18" y="88" width="180" height="26" rx="13" fill={C.white} opacity="0.18" />
      <CText x="30" y="105" size={12.5} weight={800} fill={accent} limit={limits.hours}>
        {f.hours}
      </CText>

      <CText
        x="24"
        y="132"
        size={11.5}
        weight={700}
        fill={p.kicker || C.mist}
        limit={limits.detail}
      >
        {f.detail}
      </CText>
    </g>
  );
}
