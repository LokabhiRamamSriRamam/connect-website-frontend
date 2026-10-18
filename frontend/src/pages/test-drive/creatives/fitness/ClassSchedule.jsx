import { C, CText } from "../kit.jsx";

/**
 * Class schedule — the gym floor's tonight-at-a-glance card.
 *
 * Ink-black ground with a HAZARD-STRIPE BAND running under the headline. The
 * stripes are the industry's own visual language (plan §4b), drawn here as
 * yellow parallelograms on a black bar, which is what construction tape and
 * weightlifting plate markings actually look like.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function ClassSchedule({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.gold;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.ink} />

      {/* Hazard-stripe band, upper third. A dark bar overlaid with slanted
          yellow slabs drawn as paths so the slant stays an outline rather
          than relying on skewX (which the geometry audit does not parse).
          Six slabs across the 320 width, 36 apart, each 20 wide at the top
          and nudged 10 right at the bottom — a 1:14 slant that reads as
          hazard tape. */}
      <g>
        <rect x="0" y="88" width="320" height="14" fill="#2A2A2A" />
        {Array.from({ length: 11 }, (_, i) => {
          const x = -24 + i * 30;
          return (
            <path
              key={i}
              d={`M${x} 88h18l-10 14h-18z`}
              fill={accent}
            />
          );
        })}
      </g>

      {/* A small dumbbell icon, right side above the stripe. Two weight discs
          and a bar — the plan's dumbbell motif, miniaturised. */}
      <g>
        <rect x="246" y="48" width="8" height="30" rx="2" fill={accent} />
        <rect x="282" y="48" width="8" height="30" rx="2" fill={accent} />
        <rect x="254" y="60" width="28" height="6" rx="1" fill={accent} opacity="0.8" />
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
        y="78"
        size={22}
        weight={800}
        fill={p.fg || C.white}
        limit={limits.headline}
      >
        {f.headline}
      </CText>

      <CText
        x="22"
        y="128"
        size={12}
        weight={700}
        fill={p.kicker || C.taupe}
        limit={limits.detail}
      >
        {f.detail}
      </CText>

      {/* Time list on a gold plate at the foot, same posture as the all-hands
          time-plate — the one line a passerby catches in a single glance. */}
      <rect x="18" y="146" width="200" height="22" rx="11" fill={accent} />
      <CText x="30" y="162" size={12.5} weight={800} fill={C.ink} limit={limits.hours}>
        {f.hours}
      </CText>
    </g>
  );
}
