import { C, CText } from "../kit.jsx";

/**
 * Challenge board — the leaderboard-style card.
 *
 * Carries the plan's hazard-stripe band at the top, this time narrower,
 * so the set reads consistent with the schedule card without copying it.
 * `stat` is the hero — a count or a day streak — and the detail restates it
 * in words.
 *
 * On an ink-black ground, like corporate's metrics board: numbers on dark
 * surfaces read as display counters, which is what this card is.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function ChallengeBoard({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.gold;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.ink} />

      {/* Hazard-stripe band, upper edge. Thinner than the schedule card's,
          so the two never read as the same template. */}
      <g>
        <rect x="0" y="0" width="320" height="8" fill="#2A2A2A" />
        {Array.from({ length: 11 }, (_, i) => {
          const x = -12 + i * 30;
          return (
            <path
              key={i}
              d={`M${x} 0h10l-6 8h-10z`}
              fill={accent}
            />
          );
        })}
      </g>

      {/* A medal icon, upper right — ribbon triangle + disc. */}
      <g>
        <path d="M268 24l10 20 10-20z" fill={accent} opacity="0.6" />
        <circle cx="278" cy="60" r="18" fill={accent} />
        <circle cx="278" cy="60" r="12" fill={C.ink} />
        <circle cx="278" cy="60" r="12" fill="none" stroke={accent} strokeWidth="1.5" />
      </g>

      <CText
        x="22"
        y="40"
        size={11}
        weight={800}
        fill={p.kicker || C.taupe}
        limit={limits.businessName}
      >
        {f.businessName}
      </CText>

      <CText
        x="22"
        y="74"
        size={22}
        weight={800}
        fill={p.fg || C.white}
        limit={limits.headline}
      >
        {f.headline}
      </CText>

      {/* The stat — the hero figure, left half, very large. x=22, size 40,
          max 5 chars at Hindi 0.62 = 5*40*0.62 + 22 = 146, well clear of the
          medal at x=260. */}
      <CText
        x="22"
        y="132"
        size={40}
        weight={800}
        fill={accent}
        limit={limits.stat}
      >
        {f.stat}
      </CText>

      <CText
        x="22"
        y="158"
        size={11}
        weight={700}
        fill={p.kicker || C.taupe}
        limit={limits.detail}
      >
        {f.detail}
      </CText>
    </g>
  );
}
