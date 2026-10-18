import { C, CText } from "../kit.jsx";

/**
 * Admin hours — the education set's INFORMATIONAL creative.
 *
 * Carries the plan's primary RULED NOTEBOOK PAGE motif, drawn here as a
 * larger version of the exam schedule's background — red margin on the
 * left, three punch holes, blue ruled lines running the full width. The
 * one difference from exam schedule: this card has a DATE BAND at the
 * top (a strip of five day letters), which gives the hours card its own
 * identity against the exam-schedule card AND against every other hours
 * card in the product (clock, shopfront, day bar, suitcase, cup, key,
 * planner strip, stopwatch).
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function AdminHours({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.indigo;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.ivory} />

      {/* Red margin line. */}
      <rect x="52" y="0" width="1" height="180" fill="#EF4444" opacity="0.7" />

      {/* Three punch holes. */}
      {[32, 90, 148].map((cy) => (
        <circle key={cy} cx="18" cy={cy} r="4" fill={C.white} stroke={accent} strokeWidth="0.75" opacity="0.9" />
      ))}

      {/* Date band — a strip of six day-letter tiles across the top-right,
          with the current working window (Mon-Sat) highlighted. The letters
          are drawn as paths so the drawing's own alphabet never switches
          scripts under Hindi. */}
      <g>
        {["M", "T", "W", "T", "F", "S"].map((letter, i) => {
          const x = 160 + i * 22;
          return (
            <g key={i}>
              <rect x={x} y="18" width="18" height="20" rx="2" fill={accent} opacity="0.85" />
              <g fill={C.white} transform={`translate(${x + 5} 24)`}>
                {letter === "M" && <path d="M0 10v-10h2l2 5 2-5h2v10h-1.5v-7l-2 5h-1l-2-5v7z" />}
                {letter === "T" && <path d="M0 0h8v1.5h-3v8.5h-2v-8.5h-3z" />}
                {letter === "W" && <path d="M0 0h1.5l1 7 1.5-7h1l1.5 7 1-7h1.5l-2 10h-1.5l-1-6-1 6h-1.5z" />}
                {letter === "F" && <path d="M0 0h6v1.5h-4v3h3v1.5h-3v4h-2z" />}
                {letter === "S" && <path d="M0 2c0-1 1-2 2-2h4v1.5h-4c-0.5 0-0.5 0.5-0.5 1s0 1 0.5 1h2c1.5 0 2.5 1 2.5 2.5s-1 2.5-2.5 2.5h-4v-1.5h4c0.5 0 0.5-0.5 0.5-1s0-1-0.5-1h-2c-1.5 0-2.5-1-2.5-2.5z" />}
              </g>
            </g>
          );
        })}
      </g>

      {/* Ruled lines below the date band — three visible, so the page reads
          as notebook but does not crowd the type. */}
      {[86, 110, 134].map((y) => (
        <rect key={y} x="22" y={y} width="276" height="0.75" fill={accent} opacity="0.3" />
      ))}

      <CText x="60" y="60" size={11} weight={800} fill={C.muted} limit={limits.businessName}>
        {f.businessName}
      </CText>

      <CText x="60" y="104" size={19} weight={800} fill={p.fg || C.ink} limit={limits.headline}>
        {f.headline}
      </CText>

      <CText x="60" y="152" size={13} weight={700} fill={accent} limit={limits.hours}>
        {f.hours}
      </CText>
    </g>
  );
}
