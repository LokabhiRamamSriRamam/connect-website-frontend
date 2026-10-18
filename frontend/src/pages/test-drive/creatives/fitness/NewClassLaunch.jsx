import { C, CText } from "../kit.jsx";

/**
 * New class launch — a quiet announcement, mint ground.
 *
 * A spin-cycle motif drawn as a cycle wheel at the right, because a new
 * programme is often an energy class (spin, HIIT, zumba) and the wheel is
 * both legible as "activity" and distinct from the dumbbell on the membership
 * card and the stopwatch on the PT card.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function NewClassLaunch({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.green;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.mint} />

      {/* The wheel, right side. Outer tyre + inner hub + six spokes drawn as
          rotated thin rects. */}
      <g>
        {/* Tyre. */}
        <circle cx="258" cy="90" r="46" fill="none" stroke={accent} strokeWidth="4" />
        <circle cx="258" cy="90" r="40" fill="none" stroke={accent} strokeWidth="1" opacity="0.4" />
        {/* Spokes — six, drawn as rotated rects about the hub. */}
        {Array.from({ length: 6 }, (_, i) => {
          const theta = (i / 6) * Math.PI;
          const x = +(258 - Math.cos(theta) * 36).toFixed(3);
          const y = +(90 - Math.sin(theta) * 36).toFixed(3);
          const w = 72;
          const rot = +((theta * 180) / Math.PI).toFixed(2);
          return (
            <rect
              key={i}
              x={x}
              y={+(y - 0.7).toFixed(3)}
              width={w}
              height="1.4"
              fill={accent}
              opacity="0.7"
              transform={`rotate(${rot} ${x} ${y})`}
            />
          );
        })}
        {/* Hub. */}
        <circle cx="258" cy="90" r="7" fill={accent} />
        <circle cx="258" cy="90" r="3" fill={C.white} />
      </g>

      {/* NEW pill at the top-left — the one place the card does any shouting. */}
      <rect x="22" y="24" width="46" height="18" rx="9" fill={accent} />
      <CText x="45" y="37" size={11} weight={800} fill={C.white} anchor="middle" limit={6}>
        NEW
      </CText>

      <CText
        x="76"
        y="37"
        size={11}
        weight={800}
        fill={p.kicker || C.slate}
        limit={limits.businessName}
      >
        {f.businessName}
      </CText>

      <CText
        x="22"
        y="80"
        size={22}
        weight={800}
        fill={p.fg || C.ink}
        limit={limits.headline}
      >
        {f.headline}
      </CText>

      <CText
        x="22"
        y="112"
        size={12}
        weight={700}
        fill={p.kicker || C.slate}
        limit={limits.detail}
      >
        {f.detail}
      </CText>

      {/* Time plate at the foot, same posture as other time-bearing cards. */}
      <rect x="18" y="146" width="162" height="22" rx="11" fill={accent} />
      <CText x="30" y="162" size={12.5} weight={800} fill={C.white} limit={limits.hours}>
        {f.hours}
      </CText>
    </g>
  );
}
