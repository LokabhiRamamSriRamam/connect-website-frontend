import { C, CText } from "../kit.jsx";

/**
 * Metrics board — the KPI monitor's card.
 *
 * Carries the plan's CHART motif, drawn as a four-bar bar chart to the right
 * of the stat. The bars grow left to right so the chart reads as a trend
 * rising to the figure on the left, which the detail line underneath restates
 * in words ("Up from 68").
 *
 * Dark-grounded, like real-estate's sold card: the metrics screen in an
 * office kitchen is almost always a dark monitor on a wall, so a dark card
 * fits the native surface.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function MetricsBoard({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.gold;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.ink} />

      {/* Chart to the right: baseline + four bars + a trend line connecting
          their tops, so the whole figure reads as "going up". */}
      <g>
        {/* Baseline. */}
        <rect x="190" y="130" width="112" height="2" rx="1" fill={accent} opacity="0.4" />
        {/* Bars. */}
        {[
          [196, 112, 20, 18],
          [222, 94, 20, 36],
          [248, 78, 20, 52],
          [274, 60, 20, 70],
        ].map(([x, y, w, h], i) => (
          <rect
            key={i}
            x={x}
            y={y}
            width={w}
            height={h}
            rx="2"
            fill={accent}
            opacity={0.55 + i * 0.12}
          />
        ))}
        {/* Trend line through the bars' tops: four short segments so the
            whole stays inside the eight-element allowlist. */}
        {[
          [206, 112, 232, 94],
          [232, 94, 258, 78],
          [258, 78, 284, 60],
        ].map(([x1, y1, x2, y2], i) => (
          <rect
            key={`l${i}`}
            x={x1}
            y={y1 - 1.5}
            width={Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)}
            height="2"
            rx="1"
            fill={C.white}
            opacity="0.7"
            transform={`rotate(${(Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI} ${x1} ${y1})`}
          />
        ))}
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
        y="72"
        size={14}
        weight={800}
        fill={p.fg || C.white}
        limit={limits.headline}
        lines={2}
      >
        {f.headline}
      </CText>

      {/* The stat, left half, very large. */}
      <CText
        x="22"
        y="130"
        size={40}
        weight={800}
        fill={accent}
        limit={limits.stat}
      >
        {f.stat}
      </CText>

      <CText
        x="22"
        y="156"
        size={11}
        weight={700}
        fill={p.kicker || C.taupe}
        limit={limits.detail}
      >
        {f.detail}
      </CText>
    </g>
  );
}
