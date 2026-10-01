import { useId } from "react";
import { useReducedMotion } from "framer-motion";

/*
 * Contact Us illustrations. Same visual language as the landing page:
 * ink outlines, violet/indigo gradient, gold accents, looping CSS animations from sb.css.
 */

const INK = "#191919";

/* Hero scene: a phone sends a message along a dashed path to a shop screen, which replies. */
export function MessageToScreen({ className = "" }) {
  const id = useId().replace(/:/g, "");
  const reduce = useReducedMotion();
  const route = "M150 250 C 200 250, 190 150, 250 150";

  return (
    <svg viewBox="0 0 480 420" className={`sb-anim ${className}`} role="img" aria-label="A message sent from a phone arriving on a business screen">
      <defs>
        <linearGradient id={`${id}-g`} x1="1" y1="1" x2="0" y2="0">
          <stop offset="0.19" stopColor="#1F30A0" />
          <stop offset="0.81" stopColor="#914BFA" />
        </linearGradient>
        <pattern id={`${id}-dots`} width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="#fff" opacity="0.25" />
        </pattern>
        <clipPath id={`${id}-screen`}>
          <rect x="262" y="62" width="196" height="136" rx="8" />
        </clipPath>
      </defs>

      {/* ground shadow */}
      <ellipse cx="250" cy="398" rx="200" ry="10" fill="#1F30A0" opacity="0.1" />

      {/* ---------- the business screen ---------- */}
      <g className="sb-float" style={{ animationDuration: "5s" }}>
        <rect x="256" y="62" width="208" height="150" rx="16" fill="#F5C542" stroke={INK} strokeWidth="3" transform="translate(6 6)" />
        <rect x="250" y="56" width="208" height="148" rx="16" fill={INK} />
        <rect x="262" y="62" width="196" height="136" rx="8" fill={`url(#${id}-g)`} />
        <rect x="262" y="62" width="196" height="136" rx="8" fill={`url(#${id}-dots)`} />
        <rect x="340" y="204" width="28" height="22" fill={INK} />
        <rect x="316" y="224" width="76" height="10" rx="5" fill={INK} />

        <g clipPath={`url(#${id}-screen)`}>
          {/* layer 1: incoming */}
          <g className="sb-c3" data-first="">
            <circle cx="360" cy="112" r="22" fill="#fff" className="sb-pulse" opacity="0.5" />
            <rect x="342" y="98" width="36" height="26" rx="4" fill="#fff" stroke={INK} strokeWidth="2.5" />
            <path d="M342 101 l18 13 18-13" fill="none" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
            <text x="360" y="160" textAnchor="middle" fontFamily="Manrope, sans-serif" fontWeight="800" fontSize="15" fill="#fff">New message!</text>
          </g>
          {/* layer 2: the ask */}
          <g className="sb-c3" style={{ animationDelay: "2.5s" }}>
            <rect x="278" y="84" width="164" height="58" rx="12" fill="#fff" />
            <path d="M292 142 l-6 12 16-12z" fill="#fff" />
            <text fontFamily="Manrope, sans-serif" fontWeight="700" fontSize="12.5" fill={INK}>
              <tspan x="290" y="107">“3 screens for our café,</tspan>
              <tspan x="290" y="126">menu + offers please!”</tspan>
            </text>
            <text x="440" y="180" textAnchor="end" fontFamily="Manrope, sans-serif" fontWeight="700" fontSize="11" fill="#EEE5FF">via Contact Us</text>
          </g>
          {/* layer 3: the reply */}
          <g className="sb-c3" style={{ animationDelay: "5s" }}>
            <circle cx="360" cy="108" r="22" fill="#4CAF6E" stroke="#fff" strokeWidth="3" />
            <path d="M349 108 l8 8 15-16" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <text x="360" y="156" textAnchor="middle" fontFamily="Manrope, sans-serif" fontWeight="800" fontSize="15" fill="#fff">We&apos;ll call you back</text>
            <text x="360" y="176" textAnchor="middle" fontFamily="Manrope, sans-serif" fontWeight="700" fontSize="11.5" fill="#F5C542">within 24 hours</text>
          </g>
        </g>
      </g>

      {/* ---------- the route ---------- */}
      <path d={route} fill="none" stroke="#914BFA" strokeWidth="3" strokeLinecap="round" className="sb-dash" />
      {!reduce && (
        <g>
          <path d="M-9 -7 L11 0 L-9 7 L-5 0 Z" fill="#F5C542" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
          <animateMotion dur="2.5s" repeatCount="indefinite" rotate="auto" path={route} keyPoints="0;1;1" keyTimes="0;0.7;1" calcMode="linear" />
        </g>
      )}

      {/* ---------- the phone ---------- */}
      <g className="sb-float">
        <rect x="42" y="176" width="124" height="214" rx="20" fill="#914BFA" stroke={INK} strokeWidth="3" transform="translate(6 6)" />
        <rect x="36" y="170" width="124" height="214" rx="20" fill="#fff" stroke={INK} strokeWidth="3" />
        <rect x="76" y="178" width="44" height="7" rx="3.5" fill={INK} />
        {/* chat header */}
        <circle cx="58" cy="204" r="8" fill={`url(#${id}-g)`} />
        <rect x="72" y="199" width="54" height="5" rx="2.5" fill={INK} opacity="0.8" />
        <rect x="72" y="207" width="32" height="4" rx="2" fill="#4CAF6E" />
        <line x1="44" y1="220" x2="152" y2="220" stroke="#E5E7EB" strokeWidth="2" />
        {/* bubbles */}
        <g className="sb-reveal" data-first="">
          <rect x="48" y="230" width="84" height="22" rx="8" fill="#EEE5FF" />
          <rect x="56" y="238" width="60" height="5" rx="2.5" fill="#4B3FD0" opacity="0.7" />
        </g>
        <g className="sb-reveal" style={{ animationDelay: "0.6s" }}>
          <rect x="64" y="260" width="84" height="30" rx="8" fill={`url(#${id}-g)`} />
          <rect x="72" y="267" width="64" height="5" rx="2.5" fill="#fff" />
          <rect x="72" y="277" width="44" height="5" rx="2.5" fill="#fff" opacity="0.8" />
        </g>
        <g className="sb-reveal" style={{ animationDelay: "1.2s" }}>
          <rect x="48" y="298" width="46" height="20" rx="8" fill="#EEE5FF" />
          <circle cx="60" cy="308" r="3" fill="#4B3FD0" className="sb-blink" />
          <circle cx="71" cy="308" r="3" fill="#4B3FD0" className="sb-blink" style={{ animationDelay: "0.3s" }} />
          <circle cx="82" cy="308" r="3" fill="#4B3FD0" className="sb-blink" style={{ animationDelay: "0.6s" }} />
        </g>
        {/* composer */}
        <rect x="46" y="344" width="80" height="24" rx="12" fill="#F2EEE7" />
        <circle cx="140" cy="356" r="13" fill="#F5C542" stroke={INK} strokeWidth="2" className="sb-press" />
        <path d="M135 356 h9 m-4 -4 l4 4 -4 4" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* accents */}
      <path d="M200 30c1 6.5 5.5 11 12 12-6.5 1-11 5.5-12 12-1-6.5-5.5-11-12-12 6.5-1 11-5.5 12-12z" fill="#F5C542" className="sb-twinkle" />
      <path d="M440 250c.7 4.5 3.8 7.6 8.3 8.3-4.5.7-7.6 3.8-8.3 8.3-.7-4.5-3.8-7.6-8.3-8.3 4.5-.7 7.6-3.8 8.3-8.3z" fill="#914BFA" className="sb-twinkle" style={{ animationDelay: "0.8s" }} />
      <path d="M26 120c.6 4 3.4 6.8 7.4 7.4-4 .6-6.8 3.4-7.4 7.4-.6-4-3.4-6.8-7.4-7.4 4-.6 6.8-3.4 7.4-7.4z" fill="#1F30A0" className="sb-twinkle" style={{ animationDelay: "1.4s" }} />
    </svg>
  );
}

/* ---------- small animated icons for the contact-method cards ---------- */

export function RingingPhoneIcon({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className="sb-anim" aria-hidden="true">
      <path d="M44 10c5 3 8 8 9 13" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" className="sb-blink" />
      <path d="M42 18c2.5 1.5 4 4 4.5 6.5" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" className="sb-blink" style={{ animationDelay: "0.3s" }} />
      <g className="sb-tt-ring">
        <path
          d="M14 12h9l4 11-6 4c3 6 7 10 13 13l4-6 11 4v9c0 3-2 5-5 5C25 52 12 39 10 17c0-3 2-5 4-5z"
          fill="#F5C542"
          stroke={INK}
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export function ChatBubbleIcon({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className="sb-anim" aria-hidden="true">
      <g className="sb-bounce" style={{ animationDuration: "3s" }}>
        <path d="M32 8C18 8 8 17 8 29c0 5 2 9 5 13l-3 12 12-5c3 1 6 2 10 2 14 0 24-9 24-22S46 8 32 8z" fill="#4CAF6E" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <circle cx="22" cy="29" r="3.5" fill="#fff" className="sb-blink" />
        <circle cx="32" cy="29" r="3.5" fill="#fff" className="sb-blink" style={{ animationDelay: "0.3s" }} />
        <circle cx="42" cy="29" r="3.5" fill="#fff" className="sb-blink" style={{ animationDelay: "0.6s" }} />
      </g>
    </svg>
  );
}

export function EnvelopeIcon({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className="sb-anim" aria-hidden="true">
      <g className="sb-float">
        <rect x="8" y="18" width="48" height="34" rx="5" fill="#fff" stroke={INK} strokeWidth="3" />
        <g className="sb-c-letter">
          <rect x="16" y="10" width="32" height="26" rx="3" fill="#EEE5FF" stroke={INK} strokeWidth="2.5" />
          <rect x="21" y="16" width="18" height="3" rx="1.5" fill="#914BFA" />
          <rect x="21" y="23" width="22" height="3" rx="1.5" fill="#914BFA" opacity="0.6" />
        </g>
        <path d="M8 22l24 17 24-17v25a5 5 0 0 1-5 5H13a5 5 0 0 1-5-5z" fill="#914BFA" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

export function MapPinIcon({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className="sb-anim" aria-hidden="true">
      <ellipse cx="32" cy="55" rx="14" ry="4" fill="#1F30A0" opacity="0.18" />
      <circle cx="32" cy="55" r="6" fill="none" stroke="#914BFA" strokeWidth="2" className="sb-pulse" />
      <g className="sb-drop">
        <path d="M32 6c-10 0-18 8-18 18 0 13 18 30 18 30s18-17 18-30c0-10-8-18-18-18z" fill="#1F30A0" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <circle cx="32" cy="24" r="7" fill="#F5C542" stroke={INK} strokeWidth="2.5" />
      </g>
    </svg>
  );
}

/* Success state: the screen switches on and shows a tick, with a burst of confetti. */
export function ScreenOnSuccess({ className = "" }) {
  const id = useId().replace(/:/g, "");
  const confetti = [
    { x: 40, y: 40, c: "#F5C542", r: -20 },
    { x: 200, y: 30, c: "#914BFA", r: 30 },
    { x: 20, y: 120, c: "#4CAF6E", r: 60 },
    { x: 222, y: 118, c: "#F5C542", r: -45 },
    { x: 120, y: 12, c: "#1F30A0", r: 10 },
    { x: 70, y: 18, c: "#4CAF6E", r: 80 },
    { x: 176, y: 70, c: "#1F30A0", r: -70 },
  ];
  return (
    <svg viewBox="0 0 240 190" className={`sb-anim ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-g`} x1="1" y1="1" x2="0" y2="0">
          <stop offset="0.19" stopColor="#1F30A0" />
          <stop offset="0.81" stopColor="#914BFA" />
        </linearGradient>
      </defs>
      {confetti.map((p, i) => (
        <rect
          key={i}
          x={p.x}
          y={p.y}
          width="9"
          height="14"
          rx="2"
          fill={p.c}
          className="sb-confetti"
          style={{ animationDelay: `${0.25 + i * 0.06}s`, "--r": `${p.r}deg` }}
        />
      ))}
      <rect x="56" y="46" width="134" height="92" rx="12" fill="#F5C542" stroke={INK} strokeWidth="2.5" />
      <rect x="50" y="40" width="134" height="92" rx="12" fill={INK} />
      <rect x="58" y="47" width="118" height="78" rx="6" fill={`url(#${id}-g)`} className="sb-power-on" />
      <rect x="106" y="132" width="22" height="14" fill={INK} />
      <rect x="90" y="144" width="54" height="8" rx="4" fill={INK} />
      <circle cx="117" cy="86" r="22" fill="#4CAF6E" stroke="#fff" strokeWidth="3" className="sb-pop" />
      <path d="M106 86l8 8 15-16" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="sb-tick" />
    </svg>
  );
}

/* Hand-drawn connector that draws itself between the "what happens next" steps. */
export function StepConnector({ className = "" }) {
  return (
    <svg viewBox="0 0 1000 60" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path
        d="M20 40 C 180 -5, 320 70, 500 30 S 820 -5, 980 36"
        fill="none"
        stroke="#191919"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="2 12"
        vectorEffect="non-scaling-stroke"
        className="sb-dots-flow"
      />
    </svg>
  );
}
