import { useId } from "react";

/* Default to `relative` unless the caller already positions the element. */
const pos = (cls) => (/\b(absolute|fixed)\b/.test(cls) ? "" : "relative");

/* Hand-drawn squiggle that draws itself under a word. */
export function Squiggle({ className = "", color = "#914BFA", loop = false }) {
  return (
    <svg viewBox="0 0 220 24" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path
        d="M4 16c18-10 30-10 42 0s26 10 40 0 28-10 42 0 26 10 40 0 28-9 48-2"
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        className={loop ? "sb-draw-loop" : "sb-draw"}
      />
    </svg>
  );
}

/* Four-point sparkle that twinkles. */
export function Sparkle({ size = 22, color = "#914BFA", delay = 0, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 0c1 6.5 5.5 11 12 12-6.5 1-11 5.5-12 12-1-6.5-5.5-11-12-12C6.5 11 11 6.5 12 0z"
        fill={color}
        className="sb-twinkle"
        style={{ animationDelay: `${delay}s` }}
      />
    </svg>
  );
}

/* Rotating circular sticker with text around the rim. */
export function StickerBadge({
  text = "GET ONE • CONNECT IT • PUT IT TO WORK • ",
  size = 120,
  className = "",
  center,
}) {
  const id = useId().replace(/:/g, "");
  return (
    <div className={`${pos(className)} ${className}`} style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 120 120" className="absolute inset-0 w-full h-full sb-spin">
        <defs>
          <path id={`${id}-c`} d="M60 60m-44 0a44 44 0 1 1 88 0a44 44 0 1 1-88 0" />
        </defs>
        <circle cx="60" cy="60" r="58" fill="#F5C542" />
        <circle cx="60" cy="60" r="58" fill="none" stroke="#191919" strokeWidth="2" />
        <text fontFamily="Manrope, sans-serif" fontWeight="800" fontSize="11.5" letterSpacing="1.6" fill="#191919">
          <textPath href={`#${id}-c`}>{text}</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{center}</div>
    </div>
  );
}

/* Loopy hand-drawn arrow. */
export function DoodleArrow({ className = "", color = "#191919", flip = false }) {
  return (
    <svg
      viewBox="0 0 120 80"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
    >
      <path
        d="M6 12c30-8 58 2 60 22 2 16-18 20-20 8-2-14 26-22 50 4l8 12"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        className="sb-draw"
      />
      <path d="M92 44l12 14-18 0" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Blobby gradient shape used behind content. */
export function Blob({ className = "", style }) {
  return <div className={`sb-blob ${className}`} style={style} aria-hidden="true" />;
}

/* A little smiling screen sticker. */
export function ScreenSticker({ size = 64, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={`sb-wiggle ${className}`} aria-hidden="true">
      <rect x="6" y="10" width="52" height="38" rx="9" fill="#914BFA" stroke="#191919" strokeWidth="2.5" />
      <rect x="27" y="48" width="10" height="6" fill="#191919" />
      <rect x="18" y="53" width="28" height="4" rx="2" fill="#191919" />
      <circle cx="24" cy="26" r="3" fill="#fff" />
      <circle cx="40" cy="26" r="3" fill="#fff" />
      <path d="M23 34c4 5 14 5 18 0" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/* Burst sticker with short text, e.g. "₹0 printing". */
export function Burst({ label, size = 96, color = "#F5C542", className = "" }) {
  const pts = Array.from({ length: 24 }, (_, i) => {
    const r = i % 2 ? 40 : 48;
    const a = (Math.PI * 2 * i) / 24;
    return `${50 + r * Math.cos(a)},${50 + r * Math.sin(a)}`;
  }).join(" ");
  return (
    <div className={`${pos(className)} sb-wiggle ${className}`} style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        <polygon points={pts} fill={color} stroke="#191919" strokeWidth="2" strokeLinejoin="round" />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-center font-manrope font-extrabold text-sb-ink leading-tight px-3" style={{ fontSize: size * 0.14 }}>
        {label}
      </span>
    </div>
  );
}

/* Scrolling ticker strip. */
export function Ticker({ items, className = "" }) {
  const row = [...items, ...items];
  return (
    <div className={`sb-marquee-wrap overflow-hidden ${className}`} aria-hidden="true">
      <div className="sb-marquee">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-6 pr-6 whitespace-nowrap">
            <span>{t}</span>
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M12 0c1 6.5 5.5 11 12 12-6.5 1-11 5.5-12 12-1-6.5-5.5-11-12-12C6.5 11 11 6.5 12 0z" fill="currentColor" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
