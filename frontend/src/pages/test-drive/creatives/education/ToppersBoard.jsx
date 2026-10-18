import { C, CText } from "../kit.jsx";

/**
 * Toppers board — the results recognition card.
 *
 * The GRAD CAP motif the plan names, drawn as a mortarboard with a tassel
 * at the top-right. Ink-black ground so the stat reads as a scoreboard
 * figure. `stat` is the hero; detail restates it in words.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function ToppersBoard({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.gold;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.ink} />

      {/* Grad cap, upper right. Mortarboard (diamond) + base (trapezoid) +
          button + tassel. */}
      <g>
        <path d="M268 42l32 10l-32 10l-32-10z" fill={accent} />
        <path d="M250 62v12q0 6 18 6t18-6v-12l-18 6z" fill={accent} opacity="0.9" />
        <circle cx="268" cy="52" r="2" fill={C.ink} />
        {/* Tassel: a short line + bob. */}
        <rect x="298" y="52" width="1.5" height="22" fill={accent} opacity="0.9" />
        <circle cx="298.75" cy="76" r="3" fill="#EF4444" />
      </g>

      <CText x="22" y="40" size={11} weight={800} fill={p.kicker || C.taupe} limit={limits.businessName}>
        {f.businessName}
      </CText>

      <CText x="22" y="74" size={22} weight={800} fill={p.fg || C.white} limit={limits.headline}>
        {f.headline}
      </CText>

      <CText x="22" y="132" size={40} weight={800} fill={accent} limit={limits.stat}>
        {f.stat}
      </CText>

      <CText x="22" y="158" size={11} weight={700} fill={p.kicker || C.taupe} limit={limits.detail}>
        {f.detail}
      </CText>
    </g>
  );
}
