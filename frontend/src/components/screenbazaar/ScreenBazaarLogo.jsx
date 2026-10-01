import { useId } from "react";

/**
 * Screen Bazaar mark: a screen wearing a market-stall awning.
 * `tone="light"` renders the wordmark for dark backgrounds.
 */
export function ScreenBazaarMark({ size = 36, className = "" }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0.19" stopColor="#1F30A0" />
          <stop offset="0.81" stopColor="#914BFA" />
        </linearGradient>
        <clipPath id={`${id}-awning`}>
          <path d="M4 5h40v6a5 5 0 0 1-10 0 5 5 0 0 1-10 0 5 5 0 0 1-10 0 5 5 0 0 1-10 0z" />
        </clipPath>
      </defs>
      {/* stand */}
      <rect x="21" y="36" width="6" height="5" fill="#191919" />
      <rect x="14" y="40.5" width="20" height="3" rx="1.5" fill="#191919" />
      {/* screen */}
      <rect x="6" y="10" width="36" height="27" rx="4.5" fill={`url(#${id}-g)`} />
      <path d="M21 20.5v9l7.5-4.5z" fill="#fff" />
      {/* awning stripes */}
      <g clipPath={`url(#${id}-awning)`}>
        <rect x="4" y="3" width="40" height="15" fill="#914BFA" />
        <rect x="9" y="3" width="5" height="15" fill="#F6F1FF" />
        <rect x="19" y="3" width="5" height="15" fill="#F6F1FF" />
        <rect x="29" y="3" width="5" height="15" fill="#F6F1FF" />
        <rect x="39" y="3" width="5" height="15" fill="#F6F1FF" />
      </g>
      <rect x="3" y="3" width="42" height="3.5" rx="1.75" fill="#1F30A0" />
    </svg>
  );
}

export default function ScreenBazaarLogo({ size = 36, tone = "dark", showSlogan = false, className = "" }) {
  const text = tone === "light" ? "text-white" : "text-sb-ink";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <ScreenBazaarMark size={size} />
      <span className="leading-none">
        <span className={`block font-manrope font-extrabold tracking-tight ${text}`} style={{ fontSize: size * 0.56 }}>
          Screen <span className={tone === "light" ? "text-sb-lilac" : "sb-gradient-text"}>Bazaar</span>
        </span>
        {showSlogan && (
          <span className={`block mt-1 font-manrope font-medium ${tone === "light" ? "text-white/70" : "text-sb-muted"}`} style={{ fontSize: size * 0.28 }}>
            Connect your screens to opportunity.
          </span>
        )}
      </span>
    </span>
  );
}
