import { C, CText } from "../kit.jsx";

/**
 * Showroom hours — the automotive set's INFORMATIONAL creative.
 *
 * Carries a SPEEDOMETER / ODOMETER DIAL motif, drawn on a dark dashboard
 * surface: outer tick ring, a sweeping needle, a mileage odometer window
 * at the base. Distinct from the eight hours cards already shipped
 * (clock, shopfront, day bar, suitcase, cup, key, planner, stopwatch,
 * notebook) by being a car dial — a different kind of circle from the
 * clock and the stopwatch.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function ShowroomHours({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.gold;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.ink} />

      {/* Speedometer dial, right half. Outer ring + ticks + needle +
          odometer window below the hub. */}
      <g transform="translate(230 92)">
        {/* Outer ring. */}
        <circle cx="0" cy="0" r="60" fill="none" stroke={accent} strokeWidth="3" />
        <circle cx="0" cy="0" r="52" fill="none" stroke={accent} strokeWidth="0.75" opacity="0.4" />
        {/* 11 tick marks across the top three-quarters of the dial (0 to 220 degrees). */}
        {Array.from({ length: 11 }, (_, i) => {
          const theta = Math.PI * 0.75 + (i / 10) * Math.PI * 1.5;
          const r1 = 48;
          const r2 = 56;
          const x1 = +(Math.cos(theta) * r1).toFixed(3);
          const y1 = +(Math.sin(theta) * r1).toFixed(3);
          const x2 = Math.cos(theta) * r2;
          const y2 = Math.sin(theta) * r2;
          const w = +Math.hypot(x2 - x1, y2 - y1).toFixed(3);
          const rot = +((theta * 180) / Math.PI).toFixed(2);
          const major = i % 2 === 0;
          return (
            <rect
              key={i}
              x={x1}
              y={+(y1 - (major ? 1.3 : 0.7)).toFixed(3)}
              width={w}
              height={major ? 2.6 : 1.4}
              fill={accent}
              opacity={major ? 1 : 0.6}
              transform={`rotate(${rot} ${x1} ${y1})`}
            />
          );
        })}
        {/* Needle, pointing to top-right. */}
        <rect
          x="0"
          y="-2"
          width="46"
          height="4"
          rx="2"
          fill="#EF4444"
          transform="rotate(-20 0 0)"
        />
        {/* Hub. */}
        <circle cx="0" cy="0" r="7" fill={accent} />
        <circle cx="0" cy="0" r="3" fill={C.ink} />
        {/* Odometer window — a small rounded rect below the hub with four
            digit tiles inside. */}
        <rect x="-26" y="26" width="52" height="14" rx="2" fill="#2A2A2A" stroke={accent} strokeWidth="0.75" />
        {[-20, -8, 4, 16].map((x) => (
          <rect key={x} x={x} y="29" width="8" height="8" rx="1" fill={C.white} opacity="0.9" />
        ))}
      </g>

      <CText x="22" y="46" size={11} weight={800} fill={C.taupe} limit={limits.businessName}>
        {f.businessName}
      </CText>

      <CText x="22" y="84" size={21} weight={800} fill={p.fg || C.white} limit={limits.headline}>
        {f.headline}
      </CText>

      <CText x="22" y="150" size={13} weight={700} fill={accent} limit={limits.hours}>
        {f.hours}
      </CText>
    </g>
  );
}
