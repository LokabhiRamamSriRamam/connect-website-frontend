import { C, CText } from "../kit.jsx";

/**
 * Doctor on duty — the waiting room's most-asked question, answered on the wall.
 * 320x180 (16:9); CreativeFrame owns the <svg> and the viewBox.
 *
 * Informational: four fields, no price and no call to action. There is nothing
 * to click in a waiting room, and a sign that says "find out more" has failed at
 * being a sign.
 *
 * The stethoscope is the plan's motif for this industry, drawn once here rather
 * than repeated across the set.
 *
 * `f` arrives already allowlisted and String()-coerced by CreativeFrame. Every
 * visible string goes through CText, so overflow is clamped and markup is
 * impossible.
 */
export default function DoctorOnDuty({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.green;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.mint} />
      <rect x="0" y="0" width="6" height="180" fill={accent} />

      {/* Stethoscope: binaural tubing looping down to a chest piece. */}
      <g>
        <path
          d="M228 36v16a22 22 0 0 0 44 0V36"
          fill="none"
          stroke={accent}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="228" cy="34" r="4.5" fill={accent} />
        <circle cx="272" cy="34" r="4.5" fill={accent} />
        <path
          d="M250 74v26a24 24 0 0 0 24 24"
          fill="none"
          stroke={accent}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="276" cy="124" r="13" fill={accent} />
        <circle cx="276" cy="124" r="6.5" fill={p.bg || C.mint} />
      </g>

      <CText
        x="24"
        y="38"
        size={11}
        weight={800}
        fill={p.kicker || C.muted}
        limit={limits.businessName}
      >
        {f.businessName}
      </CText>

      <CText
        x="24"
        y="70"
        size={21}
        weight={800}
        fill={p.fg || C.ink}
        limit={limits.headline}
      >
        {f.headline}
      </CText>

      {/* The doctor's name and speciality — the payload, so it is set larger
          than a supporting line and in the ink colour rather than grey. */}
      <CText
        x="24"
        y="106"
        size={14}
        weight={700}
        fill={p.fg || C.ink}
        limit={limits.detail}
        lines={2}
      >
        {f.detail}
      </CText>

      {/* The sitting, on a tinted plate so it reads as the operational fact it
          is rather than as more prose. */}
      <rect x="18" y="138" width="176" height="26" rx="13" fill={accent} opacity="0.16" />
      <CText x="30" y="155" size={12} weight={800} fill={accent} limit={limits.hours}>
        {f.hours}
      </CText>
    </g>
  );
}
