import { C, CText } from "../kit.jsx";

/**
 * Office hours — the corporate set's INFORMATIONAL creative.
 *
 * Carries the plan's MON-FRI PLANNER motif, drawn as a horizontal strip of
 * five day columns at the lower edge of the card. The strip IS the drawing;
 * no other icon is needed, and the five-column shape is distinct from the
 * six hours cards already shipped (clock, shopfront, day bar, suitcase, cup,
 * house key).
 *
 * The weekend is not drawn (there are five columns, Mon-Fri), because the
 * default hours in the manifest end at Friday. If an office works Saturdays,
 * the manifest hours string will say so and the drawing stays correct — it
 * is a planner, not a seven-day calendar.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function OfficeHours({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.indigo;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.mist} />
      <rect x="0" y="0" width="320" height="6" fill={accent} />

      {/* The planner strip, five columns across the bottom third. Each column
          is a small rounded tile with a drawn day letter as a path. The
          letters are PATHS, not CText, so the drawing's own alphabet never
          switches scripts under Hindi. */}
      <g>
        {["M", "T", "W", "T", "F"].map((letter, i) => {
          const x = 170 + i * 28;
          return (
            <g key={i}>
              <rect x={x} y="40" width="22" height="90" rx="3" fill={C.white} opacity="0.85" />
              <rect x={x} y="40" width="22" height="18" rx="3" fill={accent} />
              {/* The letter: drawn as a path at the top of the tile. Each
                  letter is defined under translate(x+6, 48). */}
              <g fill={C.white} transform={`translate(${x + 7} 48)`}>
                {letter === "M" && (
                  <path d="M0 10v-10h2l2 5 2-5h2v10h-1.5v-7l-2 5h-1l-2-5v7z" />
                )}
                {letter === "T" && (
                  <path d="M0 0h8v1.5h-3v8.5h-2v-8.5h-3z" />
                )}
                {letter === "W" && (
                  <path d="M0 0h1.5l1 7 1.5-7h1l1.5 7 1-7h1.5l-2 10h-1.5l-1-6-1 6h-1.5z" />
                )}
                {letter === "F" && (
                  <path d="M0 0h6v1.5h-4v3h3v1.5h-3v4h-2z" />
                )}
              </g>
              {/* Three faint planner lines inside the tile. */}
              <rect x={x + 4} y="68" width="14" height="1" fill={accent} opacity="0.3" />
              <rect x={x + 4} y="76" width="14" height="1" fill={accent} opacity="0.3" />
              <rect x={x + 4} y="84" width="14" height="1" fill={accent} opacity="0.3" />
              {/* A single lit slot on each day, in the accent colour, to show
                  "the office is active during this band". */}
              <rect x={x + 3} y="92" width="16" height="22" rx="2" fill={accent} opacity="0.8" />
            </g>
          );
        })}
      </g>

      <CText
        x="24"
        y="46"
        size={11}
        weight={800}
        fill={C.muted}
        limit={limits.businessName}
      >
        {f.businessName}
      </CText>

      <CText
        x="24"
        y="84"
        size={23}
        weight={800}
        fill={p.fg || C.ink}
        limit={limits.headline}
        lines={2}
      >
        {f.headline}
      </CText>

      <CText
        x="24"
        y="152"
        size={13}
        weight={700}
        fill={accent}
        limit={limits.hours}
      >
        {f.hours}
      </CText>
    </g>
  );
}
