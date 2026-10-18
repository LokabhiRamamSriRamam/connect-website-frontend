import { C, CText } from "../kit.jsx";

/**
 * Seminar notice — the campus auditorium invite.
 *
 * The plan's named "seminar moved → update 4 campus screens" interaction
 * runs through this creative. Indigo + gold like the all-hands card, so the
 * two seminar-style cards across the product read as the same posture, but
 * with an OPEN BOOK motif rather than a stage — different industry, same
 * weight of event.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function SeminarNotice({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.gold;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.indigo} />

      {/* An open book, right side. Two angled pages meeting at a spine. */}
      <g>
        <path d="M240 72l34-8v62l-34 4z" fill={C.white} opacity="0.95" />
        <path d="M308 64l-34 0v62l34 4z" fill={C.white} opacity="0.95" />
        {/* Spine shadow between the pages. */}
        <rect x="273" y="64" width="2" height="66" fill={C.ink} opacity="0.25" />
        {/* Ruled lines on each page. */}
        {[0, 1, 2, 3].map((i) => (
          <rect key={`l${i}`} x="246" y={82 + i * 8} width="24" height="1" fill={accent} opacity="0.5" />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <rect key={`r${i}`} x="278" y={82 + i * 8} width="24" height="1" fill={accent} opacity="0.5" />
        ))}
      </g>

      <CText x="22" y="40" size={11} weight={800} fill={p.kicker || C.mist} limit={limits.businessName}>
        {f.businessName}
      </CText>

      <CText x="22" y="78" size={21} weight={800} fill={p.fg || C.white} limit={limits.headline} lines={2}>
        {f.headline}
      </CText>

      <CText x="22" y="124" size={12} weight={700} fill={p.kicker || C.mist} limit={limits.detail}>
        {f.detail}
      </CText>

      <rect x="18" y="146" width="156" height="22" rx="11" fill={accent} />
      <CText x="30" y="162" size={12.5} weight={800} fill={C.ink} limit={limits.hours}>
        {f.hours}
      </CText>
    </g>
  );
}
