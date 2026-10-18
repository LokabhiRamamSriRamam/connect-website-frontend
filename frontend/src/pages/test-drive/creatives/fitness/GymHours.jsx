import { C, CText } from "../kit.jsx";

/**
 * Gym hours — the fitness set's INFORMATIONAL creative.
 *
 * Carries the plan's STOPWATCH motif, drawn as a dial on the right half of
 * the card: a face with a 12-tick ring, a crown and lap button on top, and
 * a sweep hand frozen at a quarter past. The dial reads as a race timer
 * rather than as a wall clock, which is what distinguishes it from the
 * seven hours cards already shipped (clock, shopfront, day bar, suitcase,
 * cup, house key on a tag, Mon–Fri planner strip).
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function GymHours({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.indigo;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.cream} />
      <rect x="0" y="0" width="320" height="6" fill={accent} />

      {/* The stopwatch dial — a larger version of the small dial the PT
          card uses, flipped so the crown faces up and the lap button sits
          at the right where a thumb would reach it. */}
      <g>
        {/* Crown. */}
        <rect x="238" y="30" width="12" height="8" rx="2" fill={accent} />
        {/* Lap button. */}
        <rect x="282" y="46" width="7" height="12" rx="2" fill={accent} />
        {/* Face. */}
        <circle cx="244" cy="98" r="52" fill={C.white} stroke={accent} strokeWidth="3" />
        {/* 12-tick ring. */}
        {Array.from({ length: 12 }, (_, i) => {
          const theta = (i / 12) * Math.PI * 2 - Math.PI / 2;
          const r1 = 42;
          const r2 = 48;
          const x1 = +(244 + Math.cos(theta) * r1).toFixed(3);
          const y1 = +(98 + Math.sin(theta) * r1).toFixed(3);
          const x2 = 244 + Math.cos(theta) * r2;
          const y2 = 98 + Math.sin(theta) * r2;
          const w = +Math.hypot(x2 - x1, y2 - y1).toFixed(3);
          const rot = +((theta * 180) / Math.PI).toFixed(2);
          const major = i % 3 === 0;
          return (
            <rect
              key={i}
              x={x1}
              y={+(y1 - (major ? 1.3 : 0.8)).toFixed(3)}
              width={w}
              height={major ? 2.6 : 1.6}
              fill={accent}
              opacity={major ? 1 : 0.7}
              transform={`rotate(${rot} ${x1} ${y1})`}
            />
          );
        })}
        {/* Minute hand (long, pointing to 3). */}
        <rect
          x="244"
          y="98"
          width="34"
          height="2.6"
          rx="1"
          fill={accent}
          transform="rotate(0 244 98)"
        />
        {/* Second hand (red, pointing up). */}
        <rect
          x="244"
          y="98"
          width="36"
          height="1.4"
          rx="0.7"
          fill="#EF4444"
          transform="rotate(-90 244 98)"
        />
        <circle cx="244" cy="98" r="3.5" fill={accent} />
      </g>

      <CText
        x="24"
        y="46"
        size={11}
        weight={800}
        fill={C.muted}
        limit={limits.businessName}
      >
        {f.businessName}
      </CText>

      <CText
        x="24"
        y="84"
        size={21}
        weight={800}
        fill={p.fg || C.ink}
        limit={limits.headline}
      >
        {f.headline}
      </CText>

      <CText
        x="24"
        y="150"
        size={13}
        weight={700}
        fill={accent}
        limit={limits.hours}
      >
        {f.hours}
      </CText>
    </g>
  );
}
