import { C, CText } from "../kit.jsx";

/**
 * Visitor welcome — the reception screen.
 *
 * The guest's name is centred and set large, same posture as hospitality's
 * lobby welcome, because a card addressing a specific person has to read as
 * an address and not as a heading. This is the second card in the product
 * built around `guestName`; the field exists already (hospitality) so the
 * editor and i18n cost zero.
 *
 * Carries the ID BADGE motif the plan names, drawn as a lanyard with a badge
 * tag at the top-right corner.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function VisitorWelcome({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.gold;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.iris} />

      {/* An ID badge hanging from a lanyard, top-right. The lanyard is two
          thin chevron paths meeting at the badge's top edge. */}
      <g>
        {/* Lanyard. */}
        <path d="M274 0l-10 20M292 0l10 20" fill="none" stroke={accent} strokeWidth="2" opacity="0.9" />
        {/* Clip. */}
        <rect x="275" y="18" width="18" height="4" rx="1" fill={accent} />
        {/* Badge. */}
        <rect x="266" y="22" width="36" height="48" rx="3" fill={C.white} opacity="0.95" />
        {/* Photo. */}
        <rect x="272" y="28" width="24" height="18" rx="2" fill={accent} opacity="0.35" />
        {/* Lines on the badge, so it reads as a card and not a plate. */}
        <rect x="272" y="50" width="24" height="2" rx="1" fill={accent} opacity="0.6" />
        <rect x="272" y="55" width="18" height="2" rx="1" fill={accent} opacity="0.4" />
        <rect x="272" y="60" width="14" height="2" rx="1" fill={accent} opacity="0.4" />
      </g>

      <CText
        x="28"
        y="42"
        size={11}
        weight={800}
        fill={p.kicker || C.lilac}
        limit={limits.businessName}
      >
        {f.businessName}
      </CText>

      {/* The headline — "Welcome" — in gold, centred over the name below. */}
      <CText
        x="140"
        y="80"
        size={15}
        weight={700}
        fill={accent}
        anchor="middle"
        limit={limits.headline}
      >
        {f.headline}
      </CText>

      {/* The visitor's name, large and centred. x=140, inside the main area
          but to the left of the badge at x=266. */}
      <CText
        x="140"
        y="112"
        size={22}
        weight={800}
        fill={p.fg || C.white}
        anchor="middle"
        limit={limits.guestName}
      >
        {f.guestName}
      </CText>

      {/* A short rule under the name, centred on the same axis. */}
      <rect x="112" y="122" width="56" height="2" rx="1" fill={accent} opacity="0.8" />

      <CText
        x="28"
        y="152"
        size={11.5}
        weight={700}
        fill={p.kicker || C.lilac}
        limit={limits.detail}
      >
        {f.detail}
      </CText>
    </g>
  );
}
