import { C, CText } from "../kit.jsx";

/**
 * Spec showcase — one standout number made large.
 *
 * The plan's GAUGE / instrument-cluster motif, drawn as a half-ring dial
 * with a sweep needle. `stat` is the hero figure; headline names what it
 * measures; detail restates the unit.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function SpecShowcase({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.gold;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.ink} />

      {/* Half-ring gauge, right side. Face arc + tick marks + needle. */}
      <g transform="translate(258 102)">
        {/* Outer arc — a semicircle open at the bottom. */}
        <path d="M-54 0 A54 54 0 0 1 54 0" fill="none" stroke={accent} strokeWidth="4" />
        {/* Inner, dimmer arc. */}
        <path d="M-44 0 A44 44 0 0 1 44 0" fill="none" stroke={accent} strokeWidth="1" opacity="0.4" />
        {/* 9 tick marks along the arc, drawn as rotated rects. */}
        {Array.from({ length: 9 }, (_, i) => {
          const theta = Math.PI + (i / 8) * Math.PI;
          const r1 = 46;
          const r2 = 54;
          const x1 = +(Math.cos(theta) * r1).toFixed(3);
          const y1 = +(Math.sin(theta) * r1).toFixed(3);
          const x2 = Math.cos(theta) * r2;
          const y2 = Math.sin(theta) * r2;
          const w = +Math.hypot(x2 - x1, y2 - y1).toFixed(3);
          const rot = +((theta * 180) / Math.PI).toFixed(2);
          return (
            <rect
              key={i}
              x={x1}
              y={+(y1 - 0.8).toFixed(3)}
              width={w}
              height="1.6"
              fill={accent}
              transform={`rotate(${rot} ${x1} ${y1})`}
            />
          );
        })}
        {/* Needle pointing to the right-of-centre, size 42 at rotation -30. */}
        <rect
          x="0"
          y="-1.5"
          width="42"
          height="3"
          rx="1.5"
          fill="#EF4444"
          transform="rotate(-30 0 0)"
        />
        <circle cx="0" cy="0" r="5" fill={accent} />
        <circle cx="0" cy="0" r="2" fill={C.ink} />
      </g>

      <CText x="22" y="40" size={11} weight={800} fill={p.kicker || C.taupe} limit={limits.businessName}>
        {f.businessName}
      </CText>

      <CText x="22" y="74" size={22} weight={800} fill={p.fg || C.white} limit={limits.headline}>
        {f.headline}
      </CText>

      {/* Big stat on the left half, large size — max 6 at Hindi: 6*42*0.62 + 22 = 178, well clear of the gauge at x>204. */}
      <CText x="22" y="134" size={42} weight={800} fill={accent} limit={limits.stat}>
        {f.stat}
      </CText>

      <CText x="22" y="158" size={11} weight={700} fill={p.kicker || C.taupe} limit={limits.detail}>
        {f.detail}
      </CText>
    </g>
  );
}
