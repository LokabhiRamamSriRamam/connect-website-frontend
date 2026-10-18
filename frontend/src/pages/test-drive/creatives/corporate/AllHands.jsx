import { C, CText } from "../kit.jsx";

/**
 * All-hands — the auditorium invite.
 *
 * Deep indigo, gold accents: the one card in the set that reads formal, so
 * it stands apart from the lighter notice and birthday cards. The motif is a
 * STAGE WITH A STANDING MICROPHONE, because an all-hands is the one event an
 * office actually gets everyone into one room for.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function AllHands({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.gold;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.indigo} />

      {/* A warm spotlight pool from the top, so the stage below reads as lit. */}
      <circle cx="248" cy="18" r="76" fill={accent} opacity="0.1" />

      {/* The stage, lower right. A rounded platform with its own two step
          lines, so it reads as a plinth rather than as a loaf. */}
      <g>
        <rect x="192" y="128" width="116" height="20" rx="4" fill={accent} opacity="0.75" />
        <rect x="192" y="146" width="116" height="4" rx="2" fill={C.white} opacity="0.25" />
      </g>

      {/* Microphone on a stand, standing centre-stage. */}
      <g>
        {/* Mic head: a rounded capsule. */}
        <rect x="244" y="68" width="12" height="22" rx="6" fill={accent} />
        <rect x="244" y="72" width="12" height="1" fill={C.ink} opacity="0.5" />
        <rect x="244" y="76" width="12" height="1" fill={C.ink} opacity="0.5" />
        <rect x="244" y="80" width="12" height="1" fill={C.ink} opacity="0.5" />
        {/* Yoke. */}
        <path
          d="M242 76h-4a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h4M258 76h4a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-4"
          fill="none"
          stroke={accent}
          strokeWidth="2"
        />
        {/* Stand pole. */}
        <rect x="249" y="90" width="2" height="38" fill={accent} />
        {/* Base. */}
        <rect x="238" y="126" width="24" height="3" rx="1" fill={accent} />
      </g>

      <CText
        x="22"
        y="40"
        size={11}
        weight={800}
        fill={p.kicker || C.mist}
        limit={limits.businessName}
      >
        {f.businessName}
      </CText>

      <CText
        x="22"
        y="80"
        size={22}
        weight={800}
        fill={p.fg || C.white}
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
        fill={p.kicker || C.mist}
        limit={limits.detail}
      >
        {f.detail}
      </CText>

      {/* The time on a gold plate at the foot — the one piece a hallway reader
          needs to catch at a glance. */}
      <rect x="18" y="146" width="140" height="22" rx="11" fill={accent} />
      <CText x="30" y="162" size={12.5} weight={800} fill={C.ink} limit={limits.hours}>
        {f.hours}
      </CText>
    </g>
  );
}
