import { C, CText, CtaPill } from "../kit.jsx";

/**
 * New arrivals — the plan's "hanger" motif, drawn as a short rail of three.
 *
 * Informational in tone rather than discounted: this creative declares no price
 * field, because a drop announces that stock has landed and the swing tag in the
 * aisle says what it costs.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */

/** One garment on a hanger. Decorative; no visitor text passes through here. */
function Hanger({ x, y, s = 1, body, hook = C.muted }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* Hook and shoulders. */}
      <path
        d="M0 -22a5 5 0 0 1 5-5 5 5 0 0 1 5 5"
        fill="none"
        stroke={hook}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M0 -22v4" stroke={hook} strokeWidth="2" strokeLinecap="round" />
      <path d="M0 -18l-20 12h40z" fill="none" stroke={hook} strokeWidth="2" strokeLinejoin="round" />
      {/* The garment itself: a simple tee silhouette hanging off the bar. */}
      <path
        d="M-18 -6h36l6 12-10 4v34a3 3 0 0 1-3 3h-22a3 3 0 0 1-3-3V10l-10-4z"
        fill={body}
      />
    </g>
  );
}

export default function NewArrivals({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.violet;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.lavender} />

      {/* The rail the hangers sit on, and a soft panel behind them so three
          pale garments do not dissolve into a pale ground. */}
      <rect x="196" y="18" width="124" height="162" fill={C.white} opacity="0.55" />
      <rect x="206" y="40" width="104" height="3" rx="1.5" fill={C.taupe} />

      <Hanger x="228" y="56" s="0.72" body={accent} />
      <Hanger x="258" y="56" s="0.72" body={C.gold} />
      <Hanger x="288" y="56" s="0.72" body={C.ink} />

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

      {/* A short accent rule under the kicker — the retail set's quiet
          counterpart to the sale creatives' bursts and ribbons. */}
      <rect x="22" y="48" width="34" height="4" rx="2" fill={accent} />

      <CText
        x="22"
        y="82"
        size={23}
        weight={800}
        fill={p.fg || C.ink}
        limit={limits.headline}
        lines={2}
      >
        {f.headline}
      </CText>

      <CText
        x="22"
        y="124"
        size={12}
        weight={700}
        fill={C.slate}
        limit={limits.offer}
      >
        {f.offer}
      </CText>

      <CtaPill x="22" y="138" h="20" bg={accent} fg={C.white} limit={limits.cta}>
        {f.cta}
      </CtaPill>
    </g>
  );
}
