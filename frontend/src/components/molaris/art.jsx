/* Molaris illustrations — bespoke animated SVGs.
   Animation classes: vt-* from ../vital/vital.css, mo-* from ./molaris.css. */
import { useId } from "react";

export const M = {
  navy: "#13307E",
  night: "#0A1A47",
  royal: "#2451C4",
  cyan: "#00B3C1",
  aqua: "#7FDDE4",
  ice: "#E6F7F9",
  mist: "#F4FAFC",
  ink: "#0D1733",
  slate: "#475569",
  muted: "#64748B",
  line: "#DCE8EE",
  coral: "#FF7A8A",
  blush: "#FFE9EC",
  gold: "#F5B83D",
  wa: "#25D366",
  waDark: "#128C7E",
  waBg: "#ECE5DD",
  skin: "#E7B98F",
  skin2: "#C68B5E",
  white: "#FFFFFF",
};

const FONT = "Manrope, Inter, sans-serif";
const useUid = () => useId().replace(/:/g, "");
const d = (s) => ({ animationDelay: `${s}s` });

function T({ x, y, size = 11, weight = 700, fill = M.ink, anchor = "start", children, ...rest }) {
  return (
    <text x={x} y={y} fontFamily={FONT} fontSize={size} fontWeight={weight} fill={fill} textAnchor={anchor} {...rest}>
      {children}
    </text>
  );
}

function Check({ cx, cy, r = 8, fill = M.cyan, className, style }) {
  return (
    <g className={className} style={style}>
      <circle cx={cx} cy={cy} r={r} fill={fill} />
      <path
        d={`M${cx - r * 0.45} ${cy}l${r * 0.3} ${r * 0.32}l${r * 0.55} -${r * 0.62}`}
        fill="none"
        stroke={M.white}
        strokeWidth={r * 0.28}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

function Star({ cx, cy, r = 8, fill = M.gold, className, style }) {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = (Math.PI / 5) * i - Math.PI / 2;
    const rr = i % 2 ? r * 0.45 : r;
    return `${(cx + rr * Math.cos(a)).toFixed(2)},${(cy + rr * Math.sin(a)).toFixed(2)}`;
  }).join(" ");
  return <polygon points={pts} fill={fill} className={className} style={style} />;
}

/* ---------------------------------------------------------------- brand */

const TOOTH =
  "M20 12 C30 6 42 10 50 16 C58 10 70 6 80 12 C92 18 92 34 88 50 C85 64 80 82 74 90 C70 96 64 94 62 88 C59 78 56 66 50 66 C44 66 41 78 38 88 C36 94 30 96 26 90 C20 82 15 64 12 50 C8 34 8 18 20 12 Z";

/** The smiling tooth from the Molaris logo: navy / cyan halves, eye, smile and pixel squares. viewBox 100×100. */
export function ToothMark({ x = 0, y = 0, size = 100, animated = false, tone = "color" }) {
  const id = useUid();
  const light = tone === "light";
  const px = [
    [55, 20],
    [62, 20],
    [51, 27],
    [58, 27],
    [65, 27],
    [58, 34],
  ];
  return (
    <svg x={x} y={y} width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <clipPath id={`tl${id}`}>
          <polygon points="0,0 46,0 60,36 60,100 0,100" />
        </clipPath>
      </defs>
      <path d={TOOTH} fill={light ? M.aqua : M.cyan} />
      <path d={TOOTH} fill={light ? M.white : M.navy} clipPath={`url(#tl${id})`} />
      <circle cx="27" cy="26" r="4.2" fill={light ? M.navy : M.white} />
      <path
        d="M20 44 Q42 64 70 44"
        fill="none"
        stroke={light ? M.navy : M.ice}
        strokeWidth="5.5"
        strokeLinecap="round"
        pathLength="100"
        className={animated ? "mo-smile" : undefined}
      />
      {px.map(([px0, py0], i) => (
        <rect
          key={i}
          x={px0}
          y={py0}
          width="4.8"
          height="4.8"
          rx="0.8"
          fill={M.white}
          opacity="0.9"
          className={animated ? "mo-pixel" : undefined}
          style={animated ? d(i * 0.3) : undefined}
        />
      ))}
    </svg>
  );
}

export function MolarisWordmark({ className = "h-9", tone = "color", animated = false }) {
  const ink = tone === "light" ? M.white : M.navy;
  return (
    <svg viewBox="0 0 250 56" className={`vt-anim ${className}`} role="img" aria-label="Molaris AI">
      <ToothMark x={0} y={2} size={52} tone={tone} animated={animated} />
      <T x={62} y={40} size={33} weight={800} fill={ink} letterSpacing="-0.5">
        Molaris
        <tspan fill={tone === "light" ? M.aqua : M.cyan}>.AI</tspan>
      </T>
    </svg>
  );
}

/* ---------------------------------------------------------------- journey icons (24×24, stroke = currentColor) */

export const JOURNEY_ICONS = {
  discovery: (
    <g>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </g>
  ),
  booking: (
    <g>
      <rect x="4" y="5" width="16" height="15" rx="2.5" />
      <path d="M4 10h16M8.5 3v4M15.5 3v4M9 14.5l2 2 4-4" />
    </g>
  ),
  consult: (
    <g>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </g>
  ),
  report: (
    <g>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4M9.5 12l2 2 3.5-3.5M9.5 17h6" />
    </g>
  ),
  care: (
    <g>
      <path d="M4 5h16v11H9l-4 4v-4H4z" />
      <path d="M12 13.5s-3-1.8-3-3.8a1.6 1.6 0 0 1 3-.8 1.6 1.6 0 0 1 3 .8c0 2-3 3.8-3 3.8z" />
    </g>
  ),
  reputation: (
    <g>
      <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" />
    </g>
  ),
};

export function JourneyIcon({ name, size = 24, className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {JOURNEY_ICONS[name]}
    </svg>
  );
}

export const JOURNEY_COLORS = {
  discovery: M.navy,
  booking: M.waDark,
  consult: M.cyan,
  report: M.royal,
  care: M.coral,
  reputation: M.gold,
};

const JOURNEY_ORDER = ["discovery", "booking", "consult", "report", "care", "reputation"];

/* ---------------------------------------------------------------- hero */

/** The smiling tooth at the centre of the patient loop; the six stages light up in turn. */
export function HeroLoop() {
  const id = useUid();
  const cx = 260;
  const cy = 250;
  const r = 180;
  const at = (deg, rr = r) => [cx + rr * Math.cos((deg * Math.PI) / 180), cy + rr * Math.sin((deg * Math.PI) / 180)];
  return (
    <svg viewBox="0 0 520 500" className="vt-anim h-full w-full" role="img" aria-label="The Molaris patient loop: discovery, booking, consultation, report, after-care and reviews, around a smiling tooth">
      <defs>
        <linearGradient id={`ring${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={M.navy} />
          <stop offset="0.5" stopColor={M.royal} />
          <stop offset="1" stopColor={M.cyan} />
        </linearGradient>
        <radialGradient id={`halo${id}`}>
          <stop offset="0" stopColor={M.ice} />
          <stop offset="1" stopColor={M.ice} stopOpacity="0" />
        </radialGradient>
        <filter id={`sh${id}`} x="-20%" y="-30%" width="140%" height="170%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor={M.navy} floodOpacity="0.15" />
        </filter>
      </defs>

      <circle cx={cx} cy={cy} r="150" fill={`url(#halo${id})`} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={`url(#ring${id})`} strokeWidth="3" strokeOpacity="0.55" />
      <circle cx={cx} cy={cy} r={r + 22} fill="none" stroke={M.line} strokeWidth="1.5" strokeDasharray="2 10" className="vt-orbit" style={{ "--o": `${cx}px ${cy}px` }} />

      {/* direction chevrons between the stages */}
      {[-60, 0, 60, 120, 180, 240].map((deg) => {
        const [x, y] = at(deg);
        return (
          <path key={deg} d="M-4 -6 L4 0 L-4 6" transform={`translate(${x} ${y}) rotate(${deg + 90})`} fill="none" stroke={M.royal} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
        );
      })}

      {/* travelling dot, in step with the lit stage */}
      <g className="vt-orbit" style={{ "--o": `${cx}px ${cy}px`, animationDuration: "12s" }}>
        <circle cx={cx} cy={cy - r} r="7" fill={M.cyan} />
        <circle cx={cx} cy={cy - r} r="13" fill={M.cyan} opacity="0.2" />
      </g>

      <g className="vt-float">
        <ToothMark x={cx - 88} y={cy - 92} size={176} animated />
      </g>

      {JOURNEY_ORDER.map((k, i) => {
        const [x, y] = at(-90 + i * 60);
        return (
          <g key={k} transform={`translate(${x} ${y})`}>
            <circle r="40" fill={JOURNEY_COLORS[k]} opacity="0.18" className="mo-node-glow" style={d(i * 2)} />
            <g className="mo-node" style={d(i * 2)}>
              <circle r="29" fill={M.white} stroke={JOURNEY_COLORS[k]} strokeWidth="3" filter={`url(#sh${id})`} />
              <circle r="22" fill={JOURNEY_COLORS[k]} />
              <g transform="translate(-12 -12)" fill="none" stroke={M.white} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                {JOURNEY_ICONS[k]}
              </g>
            </g>
          </g>
        );
      })}

      {/* floating proof chips */}
      <g className="vt-float" style={d(0.8)}>
        <rect x="360" y="14" width="152" height="46" rx="23" fill={M.white} filter={`url(#sh${id})`} />
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} cx={384 + i * 15} cy={37} r={6.5} />
        ))}
        <T x={462} y={42} size={14} weight={800} fill={M.ink}>4.9</T>
      </g>
      <g className="vt-float" style={d(1.8)}>
        <rect x="8" y="438" width="196" height="46" rx="23" fill={M.white} filter={`url(#sh${id})`} />
        <circle cx="32" cy="461" r="12" fill={M.wa} />
        <path d="M27 461l3.5 3.5 6.5-7" fill="none" stroke={M.white} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <T x={52} y={466} size={12.5} weight={800} fill={M.ink}>Booked · 2:00 PM</T>
      </g>
    </svg>
  );
}

/* ---------------------------------------------------------------- journey scenes (480×360) */

function Scene({ children, label }) {
  return (
    <svg viewBox="0 0 480 360" className="vt-anim h-full w-full" role="img" aria-label={label}>
      {children}
    </svg>
  );
}

function ResultCard({ y, name, rating, reviews, ours = false }) {
  return (
    <g>
      <rect x="40" y={y} width="400" height="58" rx="14" fill={M.white} stroke={ours ? M.cyan : M.line} strokeWidth={ours ? 2.5 : 1.5} />
      <rect x="54" y={y + 12} width="34" height="34" rx="10" fill={ours ? M.ice : M.mist} />
      {ours ? <ToothMark x={57} y={y + 15} size={28} /> : <circle cx="71" cy={y + 29} r="8" fill={M.line} />}
      <T x={100} y={y + 26} size={13} weight={800} fill={ours ? M.navy : M.slate}>{name}</T>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} cx={106 + i * 12} cy={y + 41} r={5} fill={i < Math.round(rating) ? M.gold : M.line} />
      ))}
      <T x={170} y={y + 45} size={10.5} weight={700} fill={M.muted}>{`${rating} · ${reviews} reviews`}</T>
    </g>
  );
}

/** Discovery — "dentist near me": your clinic climbs to the top of the results. */
export function SceneDiscovery() {
  return (
    <Scene label="A search for 'dentist near me' where your clinic rises to the top result with a 4.9 rating">
      <rect x="20" y="16" width="440" height="328" rx="22" fill={M.mist} stroke={M.line} />
      <rect x="40" y="36" width="400" height="46" rx="23" fill={M.white} stroke={M.line} strokeWidth="1.5" />
      <circle cx="66" cy="59" r="8" fill="none" stroke={M.royal} strokeWidth="2.2" />
      <path d="M72 65l6 6" stroke={M.royal} strokeWidth="2.2" strokeLinecap="round" />
      <T x={88} y={64} size={14} weight={700} fill={M.ink}>dentist near me</T>
      <rect x="194" y="50" width="2" height="18" fill={M.royal} className="mo-caret" />
      <g className="mo-sink">
        <ResultCard y={120} name="City Dental Studio" rating={4.1} reviews={34} />
      </g>
      <g className="mo-sink">
        <ResultCard y={190} name="Bright Teeth Care" rating={4.3} reviews={58} />
      </g>
      <g className="mo-rise">
        <ResultCard y={120} name="Smile Dental Clinic" rating={4.9} reviews={212} ours />
        <g className="mo-top">
          <rect x="344" y="104" width="86" height="24" rx="12" fill={M.cyan} />
          <T x={387} y={120} size={10.5} weight={800} fill={M.white} anchor="middle">Top result</T>
        </g>
      </g>
    </Scene>
  );
}

function Bubble({ x, y, w, lines, me = false, className, style }) {
  const h = 16 + lines.length * 15;
  return (
    <g className={className} style={style}>
      <rect x={x} y={y} width={w} height={h} rx="10" fill={me ? "#DCF8C6" : M.white} />
      {lines.map((l, i) => (
        <T key={i} x={x + 10} y={y + 20 + i * 15} size={10.5} weight={650} fill={M.ink}>{l}</T>
      ))}
    </g>
  );
}

/** Booking — the patient books on WhatsApp; reminders go out on their own. */
export function SceneBooking() {
  return (
    <Scene label="A patient books a check-up over WhatsApp and gets reminders 48, 24 and 2 hours before">
      <rect x="44" y="12" width="222" height="336" rx="28" fill={M.ink} />
      <svg x="52" y="22" width="206" height="316" overflow="hidden">
        <rect width="206" height="316" rx="20" fill={M.waBg} />
        <rect width="206" height="52" fill={M.waDark} />
        <circle cx="26" cy="27" r="14" fill={M.white} />
        <ToothMark x={15} y={16} size={22} />
        <T x={48} y={25} size={11.5} weight={800} fill={M.white}>Smile Dental Clinic</T>
        <T x={48} y={40} size={9} weight={600} fill={M.white} opacity="0.8">online</T>
        <Bubble x={60} y={64} w={136} lines={["Hi! Can I book a", "check-up tomorrow?"]} me className="vt-reveal" />
        <g className="vt-reveal" style={d(0.8)}>
          <Bubble x={10} y={120} w={150} lines={["Sure! Pick a time:"]} />
          {["10:00", "11:30", "2:00 PM"].map((t, i) => (
            <g key={t}>
              <rect x={10 + i * 52} y="156" width={i === 2 ? 58 : 46} height="24" rx="12" fill={i === 2 ? M.wa : M.white} stroke={M.wa} />
              <T x={10 + i * 52 + (i === 2 ? 29 : 23)} y={172} size={10} weight={800} fill={i === 2 ? M.white : M.waDark} anchor="middle">{t}</T>
            </g>
          ))}
        </g>
        <Bubble x={120} y={192} w={76} lines={["2:00 PM"]} me className="vt-reveal" style={d(1.6)} />
        <g className="vt-reveal" style={d(2.4)}>
          <Bubble x={10} y={232} w={168} lines={["Booked for tomorrow,", "2:00 PM. See you!"]} />
          <Check cx={166} cy={244} r={8} fill={M.wa} />
        </g>
      </svg>

      <g transform="translate(372 58)">
        <circle r="26" fill={M.ice} />
        <path d="M-9 6h18l-2.5-4v-6a6.5 6.5 0 0 0-13 0v6z M-3 9a3 3 0 0 0 6 0" fill="none" stroke={M.navy} strokeWidth="2.2" strokeLinejoin="round" />
      </g>
      <line x1="372" y1="92" x2="372" y2="300" stroke={M.line} strokeWidth="2" strokeDasharray="3 6" />
      {["48 hours before", "24 hours before", "2 hours before"].map((t, i) => (
        <g key={t} className="vt-reveal" style={d(3 + i * 0.6)}>
          <rect x="298" y={118 + i * 62} width="148" height="40" rx="20" fill={M.white} stroke={M.line} />
          <Check cx={320} cy={138 + i * 62} r={9} fill={M.wa} />
          <T x={336} y={143 + i * 62} size={11} weight={800} fill={M.ink}>{t}</T>
        </g>
      ))}
    </Scene>
  );
}

/** Consultation — the dentist talks, Molaris listens from the tray. */
export function SceneConsult() {
  const id = useUid();
  const bars = [10, 20, 14, 26, 18, 24, 12, 20, 8];
  return (
    <Scene label="A dentist speaks while treating a patient in the chair; Molaris records and writes the clinical note">
      <defs>
        <linearGradient id={`beam${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={M.gold} stopOpacity="0.55" />
          <stop offset="1" stopColor={M.gold} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* lamp */}
      <path d="M150 18 V40 H230" fill="none" stroke={M.slate} strokeWidth="5" strokeLinecap="round" />
      <rect x="214" y="34" width="44" height="18" rx="9" fill={M.navy} />
      <path d="M220 52 L180 170 H300 L252 52 Z" fill={`url(#beam${id})`} />
      {/* chair + patient */}
      <path d="M96 262 L150 226 L330 226 L370 196 L384 206 L344 246 L160 256 Z" fill={M.royal} opacity="0.9" />
      <rect x="200" y="256" width="20" height="54" fill={M.slate} />
      <rect x="160" y="306" width="100" height="12" rx="6" fill={M.slate} />
      <path d="M150 226 Q200 196 262 206 L330 214 L330 228 L150 232Z" fill="#8DB4E2" />
      <circle cx="354" cy="190" r="20" fill={M.skin2} />
      <path d="M336 186 Q340 166 358 168 Q374 170 374 186 Q364 176 350 178 Q340 180 336 186Z" fill={M.ink} />
      {/* dentist */}
      <g className="vt-float" style={d(0.5)}>
        <path d="M388 330 Q386 256 418 246 Q452 256 450 330 Z" fill={M.white} stroke={M.line} strokeWidth="2" />
        <circle cx="418" cy="214" r="22" fill={M.skin} />
        <path d="M396 208 Q398 188 420 190 Q440 192 440 210 Q430 200 416 202 Q404 204 396 208Z" fill={M.night} />
        <rect x="402" y="218" width="30" height="14" rx="6" fill={M.aqua} />
        <path d="M398 262 L380 214" stroke={M.skin} strokeWidth="9" strokeLinecap="round" />
        <path d="M380 214 L372 202" stroke={M.slate} strokeWidth="3" strokeLinecap="round" />
      </g>
      {/* what the dentist says */}
      <g className="vt-c2" data-first="">
        <rect x="236" y="92" width="226" height="56" rx="16" fill={M.white} stroke={M.line} />
        <T x={252} y={115} size={11.5} weight={700} fill={M.ink}>“Tooth 26, early caries —</T>
        <T x={252} y={133} size={11.5} weight={700} fill={M.ink}>composite filling.”</T>
      </g>
      <g className="vt-c2" style={d(3)}>
        <rect x="236" y="92" width="226" height="56" rx="16" fill={M.white} stroke={M.line} />
        <T x={252} y={115} size={11.5} weight={700} fill={M.ink}>“Thoda sensitivity hai,</T>
        <T x={252} y={133} size={11.5} weight={700} fill={M.ink}>desensitising paste do.”</T>
      </g>
      {/* Molaris on the tray */}
      <rect x="20" y="170" width="120" height="84" rx="16" fill={M.white} stroke={M.line} />
      <circle cx="46" cy="196" r="14" fill={M.cyan} className="vt-pulse" />
      <circle cx="46" cy="196" r="14" fill={M.cyan} />
      <g transform="translate(34 184)" fill="none" stroke={M.white} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {JOURNEY_ICONS.consult}
      </g>
      <T x={68} y={193} size={10} weight={800} fill={M.navy}>Molaris</T>
      <T x={68} y={206} size={9} weight={700} fill={M.muted}>listening</T>
      {bars.map((h, i) => (
        <rect key={i} x={34 + i * 10} y={234 - h / 2} width="5" height={h} rx="2.5" fill={M.cyan} className="vt-bar" style={d(i * 0.1)} />
      ))}
      <g className="vt-reveal" style={d(2)}>
        <rect x="20" y="270" width="138" height="36" rx="18" fill={M.navy} />
        <Check cx={40} cy={288} r={9} fill={M.cyan} />
        <T x={56} y={293} size={11} weight={800} fill={M.white}>Note written</T>
      </g>
    </Scene>
  );
}

function MsgLine({ y, icon, text, className, style }) {
  return (
    <g className={className} style={style}>
      <circle cx="84" cy={y - 4} r="9" fill={M.ice} />
      {icon}
      <T x={100} y={y} size={11} weight={700} fill={M.ink}>{text}</T>
    </g>
  );
}

/** Report — the patient gets a WhatsApp summary minutes after leaving the chair. */
export function SceneReport() {
  const s = { fill: "none", stroke: M.royal, strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  return (
    <Scene label="A visit summary arrives on the patient's WhatsApp: treatment done, medicine, next visit and a feedback request">
      <rect x="40" y="20" width="250" height="320" rx="22" fill={M.waBg} />
      <rect x="40" y="20" width="250" height="44" rx="22" fill={M.waDark} />
      <rect x="40" y="44" width="250" height="20" fill={M.waDark} />
      <T x={60} y={48} size={12} weight={800} fill={M.white}>Visit summary</T>
      <rect x="58" y="80" width="214" height="218" rx="14" fill={M.white} />
      <T x={74} y={104} size={12} weight={800} fill={M.navy}>Smile Dental Clinic</T>
      <T x={74} y={120} size={9.5} weight={600} fill={M.muted}>Today, 2:45 PM</T>
      <MsgLine y={152} text="Scaling done" icon={<path {...s} d="M79 148l3 3 6-6" />} className="vt-reveal" />
      <MsgLine y={186} text="Sensitivity paste, twice daily" icon={<rect {...s} x="78" y="144" width="12" height="8" rx="4" transform="translate(0 34)" />} className="vt-reveal" style={d(0.6)} />
      <MsgLine y={220} text="Review visit in 2 weeks" icon={<g {...s}><rect x="78.5" y="210" width="11" height="10" rx="2" /><path d="M78.5 213.5h11" /></g>} className="vt-reveal" style={d(1.2)} />
      <g className="vt-reveal" style={d(1.8)}>
        <rect x="74" y="244" width="182" height="40" rx="12" fill={M.blush} />
        <T x={88} y={261} size={10.5} weight={800} fill={M.ink}>How was your visit?</T>
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} cx={92 + i * 14} cy={274} r={5} />
        ))}
      </g>

      <g className="vt-float">
        <circle cx="384" cy="140" r="48" fill={M.ice} />
        <circle cx="384" cy="128" r="18" fill={M.skin2} />
        <path d="M366 124 Q368 104 386 106 Q402 108 402 126 Q394 116 382 118 Q370 120 366 124Z" fill={M.ink} />
        <path d="M352 184 Q352 152 384 150 Q416 152 416 184 Z" fill="#8DB4E2" />
        <path d="M384 76 c-5-6-14-4-14 3 0 6 14 13 14 13 s14-7 14-13 c0-7-9-9-14-3z" fill={M.coral} className="vt-reveal" style={d(2.4)} />
      </g>
      <g className="vt-reveal" style={d(2.6)}>
        <rect x="318" y="220" width="132" height="40" rx="20" fill={M.white} stroke={M.line} />
        <Check cx={340} cy={240} r={9} fill={M.wa} />
        <T x={356} y={245} size={11} weight={800} fill={M.ink}>Sent in 2 min</T>
      </g>
    </Scene>
  );
}

/** After-care — messages that arrive on day 1, 3 and 14. */
export function SceneCare() {
  const days = [
    { x: 90, day: "Day 1", lines: ["Take your medicine", "after meals."] },
    { x: 240, day: "Day 3", lines: ["Any sensitivity?", "We're here to help."] },
    { x: 390, day: "Day 14", lines: ["Time for your", "follow-up visit."], cta: true },
  ];
  return (
    <Scene label="After-care messages on day 1, day 3 and day 14, ending with a follow-up booking prompt">
      <rect x="60" y="268" width="360" height="6" rx="3" fill={M.line} />
      <rect x="60" y="268" width="360" height="6" rx="3" fill={M.coral} className="mo-progress" />
      {days.map((dd, i) => (
        <g key={dd.day}>
          <g className="vt-reveal" style={d(i * 1.5)}>
            <rect x={dd.x - 68} y={dd.cta ? 104 : 124} width="136" height={dd.cta ? 110 : 90} rx="16" fill={dd.cta ? M.coral : M.white} stroke={dd.cta ? "none" : M.line} />
            {dd.lines.map((l, j) => (
              <T key={j} x={dd.x - 54} y={(dd.cta ? 132 : 152) + j * 17} size={11.5} weight={750} fill={dd.cta ? M.white : M.ink}>{l}</T>
            ))}
            {dd.cta && (
              <g>
                <rect x={dd.x - 54} y={172} width="82" height="26" rx="13" fill={M.white} />
                <T x={dd.x - 13} y={189} size={10.5} weight={800} fill={M.coral} anchor="middle">Book now</T>
              </g>
            )}
            <path d={`M${dd.x - 8} ${dd.cta ? 214 : 214} l8 12 8-12z`} fill={dd.cta ? M.coral : M.white} />
            <circle cx={dd.x} cy="271" r="12" fill={M.white} stroke={M.coral} strokeWidth="3" />
            <circle cx={dd.x} cy="271" r="5" fill={M.coral} />
          </g>
          <T x={dd.x} y={306} size={12} weight={800} fill={M.navy} anchor="middle">{dd.day}</T>
        </g>
      ))}
      <g transform="translate(30 30)">
        <ToothMark size={54} animated />
      </g>
      <T x={94} y={54} size={13} weight={800} fill={M.navy}>After-care, on its own</T>
      <T x={94} y={72} size={10.5} weight={600} fill={M.muted}>Sent on WhatsApp at the right moment</T>
    </Scene>
  );
}

/** Reputation — the review request lands at the right moment; the rating climbs. */
export function SceneReputation() {
  return (
    <Scene label="The clinic's Google rating climbs from 4.1 to 4.9 as happy patients leave reviews">
      <rect x="30" y="30" width="200" height="200" rx="26" fill={M.white} stroke={M.line} />
      <T x={130} y={64} size={11} weight={800} fill={M.muted} anchor="middle" letterSpacing="1.2">GOOGLE RATING</T>
      {["4.1", "4.5", "4.9"].map((v, i) => (
        <g key={v} className="mo-c3" style={d(i * 2)} data-first={i === 0 ? "" : undefined}>
          <T x={130} y={136} size={58} weight={800} fill={M.navy} anchor="middle">{v}</T>
        </g>
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <Star cx={74 + i * 28} cy={172} r={11} fill={M.line} />
          <Star cx={74 + i * 28} cy={172} r={11} className="mo-star" style={d(i * 0.35)} />
        </g>
      ))}
      <rect x="66" y="196" width="128" height="22" rx="11" fill={M.ice} />
      <T x={130} y={211} size={10} weight={800} fill={M.cyan} anchor="middle">+14 reviews this month</T>

      {[
        { y: 40, name: "Ananya R.", text: ["Painless root canal.", "Thank you, doctor!"] },
        { y: 136, name: "Farhan S.", text: ["Loved the WhatsApp", "reminders."] },
        { y: 232, name: "Meera K.", text: ["Explained everything", "clearly. 10/10."] },
      ].map((r, i) => (
        <g key={r.name} className="vt-reveal" style={d(0.8 + i * 0.8)}>
          <rect x="252" y={r.y} width="200" height="84" rx="16" fill={M.white} stroke={M.line} />
          <circle cx="276" cy={r.y + 24} r="11" fill={[M.royal, M.cyan, M.coral][i]} />
          <T x={276} y={r.y + 28} size={10} weight={800} fill={M.white} anchor="middle">{r.name[0]}</T>
          <T x={294} y={r.y + 23} size={11} weight={800} fill={M.ink}>{r.name}</T>
          {[0, 1, 2, 3, 4].map((s) => (
            <Star key={s} cx={298 + s * 11} cy={r.y + 33} r={4.2} />
          ))}
          <T x={268} y={r.y + 56} size={10.5} weight={650} fill={M.slate}>{r.text[0]}</T>
          <T x={268} y={r.y + 71} size={10.5} weight={650} fill={M.slate}>{r.text[1]}</T>
        </g>
      ))}
      <path d="M130 250 C130 300, 200 320, 244 300" fill="none" stroke={M.cyan} strokeWidth="2" className="vt-dash" />
      <T x={40} y={292} size={11} weight={800} fill={M.navy}>…and the loop</T>
      <T x={40} y={308} size={11} weight={800} fill={M.navy}>begins again.</T>
    </Scene>
  );
}

/* ---------------------------------------------------------------- clinic dashboard (480×360) */

export function ClinicDashboard() {
  const id = useUid();
  const bars = [38, 52, 44, 66, 58, 80, 92];
  const rows = [
    ["Appointments booked", "14", 0.87, M.royal],
    ["Pending follow-ups", "3", 0.2, M.coral],
    ["Reviews requested", "8", 0.6, M.cyan],
  ];
  return (
    <svg viewBox="0 0 480 360" className="vt-anim h-full w-full" role="img" aria-label="Clinic dashboard: today's collections, weekly trend, bookings, follow-ups and reviews">
      <defs>
        <filter id={`sh${id}`} x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="14" stdDeviation="16" floodColor={M.navy} floodOpacity="0.14" />
        </filter>
      </defs>
      <rect x="24" y="20" width="432" height="300" rx="24" fill={M.white} filter={`url(#sh${id})`} />
      <T x={48} y={56} size={11} weight={700} fill={M.muted}>Today's overview</T>
      <T x={48} y={90} size={30} weight={800} fill={M.ink}>₹48,200</T>
      <rect x="48" y="102" width="118" height="22" rx="11" fill={M.ice} />
      <T x={107} y={117} size={10.5} weight={800} fill={M.cyan} anchor="middle">▲ 18% vs last Tue</T>
      <line x1="262" y1="126" x2="432" y2="126" stroke={M.line} />
      {bars.map((h, i) => (
        <rect key={i} x={268 + i * 24} y={126 - h} width="14" height={h} rx="5" fill={i === bars.length - 1 ? M.cyan : M.ice} className="vt-grow" style={d(i * 0.1)} />
      ))}
      {rows.map(([label, val, pct, c], i) => {
        const y = 164 + i * 46;
        return (
          <g key={label}>
            <T x={48} y={y} size={12} weight={700} fill={M.slate}>{label}</T>
            <T x={432} y={y} size={13} weight={800} fill={M.ink} anchor="end">{val}</T>
            <rect x="48" y={y + 10} width="384" height="8" rx="4" fill={M.mist} />
            <rect x="48" y={y + 10} width={384 * pct} height="8" rx="4" fill={c} className="vt-fill" style={d(i * 0.3)} />
          </g>
        );
      })}
      <g className="mo-toast">
        <rect x="150" y="296" width="316" height="50" rx="16" fill={M.navy} />
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} cx={174 + i * 13} cy={321} r={5.5} />
        ))}
        <T x={242} y={325} size={11.5} weight={800} fill={M.white}>2 patients just left 5-star reviews</T>
      </g>
    </svg>
  );
}

/* ---------------------------------------------------------------- transcriber: tooth chart → note (560×400) */

const FDI = Array.from({ length: 16 }, (_, i) => (i < 8 ? 18 - i : 21 + (i - 8)));
const TOOTH_SIZE = (n) => {
  const t = n % 10;
  if (t <= 2) return [13, 18];
  if (t === 3) return [14, 21];
  if (t <= 5) return [16, 18];
  return [20, 20];
};

export function ToothChartNote() {
  const cx = 190;
  const cy = 262;
  const fields = [
    ["Tooth", "26 · Upper left first molar"],
    ["Diagnosis", "Early occlusal caries"],
    ["Procedure", "Composite resin filling"],
    ["ICD code", "K02.51"],
    ["Est. time", "45 min"],
    ["Consent", "Verbal · documented"],
  ];
  return (
    <svg viewBox="0 0 560 400" className="vt-anim h-full w-full" role="img" aria-label="Molaris hears 'tooth 26', marks it on the upper-jaw chart and fills the clinical note">
      <rect x="10" y="10" width="340" height="380" rx="26" fill="#12296B" />
      <T x={34} y={44} size={11} weight={800} fill={M.aqua} letterSpacing="1.4">UPPER JAW · FDI</T>
      {FDI.map((n, i) => {
        const th = Math.PI + ((i + 0.5) * Math.PI) / 16;
        const x = cx + 136 * Math.cos(th);
        const y = cy + 170 * Math.sin(th);
        const lx = cx + 156 * Math.cos(th);
        const ly = cy + 192 * Math.sin(th);
        const [w, h] = TOOTH_SIZE(n);
        const rot = (th * 180) / Math.PI + 90;
        const hot = n === 26;
        return (
          <g key={n}>
            <g transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot.toFixed(1)})`}>
              <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={w * 0.4} fill={hot ? M.white : "#E8EEF9"} />
              {hot && <rect x={-w / 2 - 3} y={-h / 2 - 3} width={w + 6} height={h + 6} rx={w * 0.5} fill="none" stroke={M.coral} strokeWidth="3" className="mo-glow" />}
            </g>
            <T x={lx} y={ly + 4} size={9} weight={800} fill={hot ? M.coral : "#8FA3CF"} anchor="middle">{n}</T>
          </g>
        );
      })}
      {/* callout from tooth 26 */}
      <g className="vt-reveal">
        <path d="M296 194 C 290 204, 282 210, 268 214" fill="none" stroke={M.coral} strokeWidth="2" strokeDasharray="3 4" />
        <rect x="108" y="200" width="160" height="30" rx="15" fill={M.coral} />
        <T x={188} y={220} size={11} weight={800} fill={M.white} anchor="middle">26 · early caries</T>
      </g>
      {/* live speech */}
      <rect x="30" y="296" width="300" height="76" rx="18" fill="#1B3A8C" />
      <circle cx="42" cy="312" r="4" fill={M.coral} className="vt-blink" />
      <T x={54} y={316} size={9.5} weight={800} fill={M.aqua} letterSpacing="1.2">LIVE · DR. MEHTA</T>
      <T x={42} y={340} size={11.5} weight={650} fill={M.white}>“Tooth 26 shows early caries. We'll do a</T>
      <T x={42} y={358} size={11.5} weight={650} fill={M.white}>composite filling, about 45 minutes.”</T>

      {/* the note */}
      <rect x="366" y="10" width="184" height="380" rx="24" fill={M.white} stroke={M.line} />
      <T x={384} y={42} size={13} weight={800} fill={M.navy}>Clinical note</T>
      <T x={384} y={58} size={9.5} weight={700} fill={M.muted}>Auto-generated · Hinglish OK</T>
      {fields.map(([k, v], i) => (
        <g key={k} className="vt-reveal" style={d(0.4 + i * 0.45)}>
          <T x={384} y={92 + i * 48} size={9} weight={800} fill={M.cyan} letterSpacing="1">{k.toUpperCase()}</T>
          <T x={384} y={110 + i * 48} size={11} weight={750} fill={M.ink}>{v}</T>
          <line x1="384" y1={120 + i * 48} x2="532" y2={120 + i * 48} stroke={M.line} />
        </g>
      ))}
      <g className="vt-reveal" style={d(3.2)}>
        <rect x="384" y="364" width="148" height="1" fill="none" />
        <Check cx={520} cy={40} r={11} fill={M.cyan} />
      </g>
    </svg>
  );
}
