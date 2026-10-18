import { C, CText } from "../kit.jsx";

/**
 * Exam schedule — the end-of-semester notice.
 *
 * Drawn as a RULED NOTEBOOK PAGE with a red margin on the left, which is
 * the plan's primary motif for the education set. The headline sits on
 * the first ruled line; the detail and hours sit two lines below it, so
 * the whole card reads as a page torn out of a student's notebook.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function ExamSchedule({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.indigo;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.ivory} />

      {/* Red margin line, running the height of the page. */}
      <rect x="52" y="0" width="1" height="180" fill="#EF4444" opacity="0.7" />

      {/* Ruled lines, every 18 units from y=38 downward. The headline sits
          on the first line, the detail on the fourth, the hours on the sixth. */}
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x="22" y={38 + i * 18} width="276" height="0.75" fill={accent} opacity="0.35" />
      ))}

      {/* Three punch holes on the left edge. */}
      {[32, 90, 148].map((cy) => (
        <circle key={cy} cx="18" cy={cy} r="4" fill={C.white} stroke={accent} strokeWidth="0.75" opacity="0.9" />
      ))}

      {/* A pencil, upper right. Hex body + wood tip + graphite. */}
      <g transform="translate(230 24) rotate(28)">
        <rect x="0" y="0" width="48" height="7" rx="1" fill={accent} />
        <rect x="0" y="0" width="48" height="2" fill={accent} opacity="0.4" />
        <path d="M48 0l8 3.5l-8 3.5z" fill={C.white} opacity="0.9" />
        <path d="M55 2l1.5 1.5l-1.5 1.5z" fill={C.ink} />
        <rect x="-6" y="0" width="6" height="7" rx="1" fill="#EF4444" />
      </g>

      <CText x="60" y="34" size={11} weight={800} fill={C.muted} limit={limits.businessName}>
        {f.businessName}
      </CText>

      <CText x="60" y="56" size={19} weight={800} fill={p.fg || C.ink} limit={limits.headline}>
        {f.headline}
      </CText>

      <CText x="60" y="106" size={12} weight={700} fill={C.slate} limit={limits.detail}>
        {f.detail}
      </CText>

      <CText x="60" y="142" size={13} weight={800} fill={accent} limit={limits.hours}>
        {f.hours}
      </CText>
    </g>
  );
}
