/* Shared drawing helpers for the industry-page artwork: a scene frame and flat, friendly people.
   People are drawn with their feet at (x, y), about 105 units tall at s = 1. */

export const SKIN = ["#F2C6A0", "#D9A27A", "#B07A55", "#8A5A3C", "#F5D3B8"];
export const HAIR = ["#191919", "#3B2A20", "#6B4226", "#B7791F", "#9CA3AF"];

export function Scene({ label, children, viewBox = "0 0 480 360", className = "" }) {
  return (
    <svg viewBox={viewBox} className={`sb-anim sg-art block h-auto w-full ${className}`} role="img" aria-label={label}>
      {children}
    </svg>
  );
}

/* Standalone sticker: its own small SVG so it can float anywhere on the page. */
export function Sticker({ label, size = 72, className = "", children, viewBox = "0 0 80 80" }) {
  return (
    <svg
      viewBox={viewBox}
      width={size}
      height={size}
      className={`sb-anim sg-sticker ${className}`}
      aria-hidden={label ? undefined : "true"}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      {children}
    </svg>
  );
}

function Arm({ pose, top, skin, armClass }) {
  // Arms hang from the shoulder at (11.5, -76); rotate the whole arm to pose it.
  const angle = { stand: 0, point: -130, wave: -165, hold: -70, lift: -180 }[pose] ?? 0;
  const cls = armClass ?? (pose === "point" ? "sg-point" : pose === "wave" ? "sg-wave" : "");
  return (
    <g className={cls}>
      <g transform={`rotate(${angle} 11.5 -76)`}>
        <rect x="8" y="-78" width="7" height="34" rx="3.5" fill={top} />
        <circle cx="11.5" cy="-42" r="4.5" fill={skin} />
      </g>
    </g>
  );
}

function Hair({ style, color }) {
  switch (style) {
    case "long":
      return (
        <g fill={color}>
          <rect x="-12" y="-100" width="24" height="30" rx="10" />
          <path d="M-12 -94a12 12 0 0 1 24 0v-2a12 12 0 0 0-24 0z" />
        </g>
      );
    case "bun":
      return (
        <g fill={color}>
          <circle cx="0" cy="-108" r="6" />
          <path d="M-11.5 -93a11.5 11.5 0 0 1 23 0c-4-5-19-5-23 0z" />
        </g>
      );
    case "curly":
      return (
        <g fill={color}>
          {[-9, -3, 3, 9].map((cx) => (
            <circle key={cx} cx={cx} cy="-103" r="5.5" />
          ))}
          <circle cx="-11" cy="-96" r="4" />
          <circle cx="11" cy="-96" r="4" />
        </g>
      );
    case "cap":
      return (
        <g fill={color}>
          <path d="M-12 -95a12 12 0 0 1 24 0z" />
          <rect x="4" y="-97" width="14" height="4" rx="2" />
        </g>
      );
    default: // short
      return <path d="M-11.5 -94a11.5 11.5 0 0 1 23 0c-3-4-8-3-11.5-5-3.5 2-8.5 1-11.5 5z" fill={color} />;
  }
}

export function Person({
  x,
  y,
  s = 1,
  flip = false,
  skin = SKIN[0],
  hair = HAIR[0],
  hairStyle = "short",
  top = "#914BFA",
  bottom = "#191919",
  pose = "stand",
  sit = false,
  walk = false,
  armClass,
  children,
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      {hairStyle === "long" && <Hair style="long" color={hair} />}
      {sit ? (
        <g fill={bottom}>
          <rect x="-11" y="-44" width="32" height="10" rx="5" />
          <rect x="13" y="-42" width="8" height="42" rx="4" />
          <rect x="11" y="-4" width="14" height="5" rx="2.5" fill="#191919" />
        </g>
      ) : (
        <g fill={bottom}>
          <g className={walk ? "sg-leg-a" : ""}>
            <rect x="-9" y="-42" width="8" height="42" rx="4" />
            <rect x="-11" y="-4" width="12" height="5" rx="2.5" fill="#191919" />
          </g>
          <g className={walk ? "sg-leg-b" : ""}>
            <rect x="1" y="-42" width="8" height="42" rx="4" />
            <rect x="1" y="-4" width="12" height="5" rx="2.5" fill="#191919" />
          </g>
        </g>
      )}
      <g transform={sit ? "translate(0 4)" : undefined}>
        {/* back arm */}
        <rect x="-18" y="-78" width="7" height="32" rx="3.5" fill={top} opacity="0.8" />
        {/* torso */}
        <rect x="-13" y="-84" width="26" height="46" rx="12" fill={top} />
        <path d="M-5 -84l5 7 5-7" fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />
        {/* head */}
        <rect x="-3.5" y="-88" width="7" height="6" fill={skin} />
        <circle cx="0" cy="-95" r="11.5" fill={skin} />
        {hairStyle !== "long" && <Hair style={hairStyle} color={hair} />}
        {hairStyle === "long" && <path d="M-11.5 -95a11.5 11.5 0 0 1 23 0c-5-6-18-6-23 0z" fill={hair} />}
        <circle cx="4" cy="-94" r="1.4" fill="#191919" />
        <circle cx="-3" cy="-94" r="1.4" fill="#191919" />
        <path d="M-2 -89.5q2.5 2.2 5 0" fill="none" stroke="#191919" strokeWidth="1.3" strokeLinecap="round" />
        {/* front arm */}
        <Arm pose={pose} top={top} skin={skin} armClass={armClass} />
        {children}
      </g>
    </g>
  );
}

/* Four-point sparkle for scenes. */
export function Spark({ x, y, r = 8, fill = "#F5C542", delay = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${r / 12})`}>
      <g className="sg-twinkle" style={{ animationDelay: `${delay}s` }}>
        <path d="M0-12c1 6.5 5.5 11 12 12-6.5 1-11 5.5-12 12-1-6.5-5.5-11-12-12C-5.5-1-1-5.5 0-12z" fill={fill} />
      </g>
    </g>
  );
}
