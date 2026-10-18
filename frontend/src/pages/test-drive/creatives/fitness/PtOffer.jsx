import { C, CText, CtaPill, PriceBadge } from "../kit.jsx";

/**
 * Personal training offer — the gym's one upsell to its existing members.
 *
 * The STOPWATCH motif, drawn as a dial with a crown and a lap button, because
 * PT is sold in sessions and a session has a clock on it. On a cream ground
 * — the quieter half of the set's palette, so the card reads as a service
 * card and not as a flash sale.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function PtOffer({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.indigo;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.cream} />

      {/* Stopwatch, right side. Face + crown + lap button + a tick ring. */}
      <g>
        {/* Crown on top. */}
        <rect x="256" y="30" width="12" height="8" rx="2" fill={accent} />
        {/* Lap button, upper-right of the dial. */}
        <rect x="289" y="46" width="6" height="10" rx="2" fill={accent} />
        {/* The face. */}
        <circle cx="262" cy="94" r="44" fill={C.white} stroke={accent} strokeWidth="3" />
        {/* 12-tick ring: twelve small marks around the dial, inset 8 from
            the face edge. A radius of 36 lands the ticks at 2 units inside
            the inner stroke. Marks are drawn as tiny rects. */}
        {Array.from({ length: 12 }, (_, i) => {
          const theta = (i / 12) * Math.PI * 2 - Math.PI / 2;
          const r1 = 36;
          const r2 = 40;
          const x1 = +(262 + Math.cos(theta) * r1).toFixed(3);
          const y1 = +(94 + Math.sin(theta) * r1).toFixed(3);
          const x2 = 262 + Math.cos(theta) * r2;
          const y2 = 94 + Math.sin(theta) * r2;
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
        {/* Hour hand (short, pointing to 2 o'clock). */}
        <rect
          x="262"
          y="94"
          width="18"
          height="3"
          rx="1"
          fill={accent}
          transform="rotate(-60 262 94)"
        />
        {/* Sweep hand (long, red, pointing up-right). */}
        <rect
          x="262"
          y="94"
          width="30"
          height="1.5"
          rx="0.75"
          fill="#EF4444"
          transform="rotate(-30 262 94)"
        />
        {/* Centre cap. */}
        <circle cx="262" cy="94" r="3" fill={accent} />
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
        y="76"
        size={22}
        weight={800}
        fill={p.fg || C.ink}
        limit={limits.headline}
      >
        {f.headline}
      </CText>

      <CText
        x="22"
        y="110"
        size={12}
        weight={700}
        fill={p.kicker || C.muted}
        limit={limits.detail}
      >
        {f.detail}
      </CText>

      <PriceBadge cx="43" cy="146" r="19" bg={accent} fg={C.white} limit={limits.price}>
        {f.price}
      </PriceBadge>

      <CtaPill x="70" y="138" h="17" bg={accent} fg={C.white} limit={limits.cta}>
        {f.cta}
      </CtaPill>
    </g>
  );
}
