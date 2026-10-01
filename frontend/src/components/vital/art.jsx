/* Vital illustrations — bespoke animated SVGs. Animation classes live in vital.css. */
import { useId } from "react";

export const V = {
  navy: "#0B2B5C",
  deep: "#071B3A",
  blue: "#1D5FA8",
  teal: "#0FB2A4",
  aqua: "#5FD4C8",
  green: "#3AA655",
  mint: "#E7F7F4",
  sky: "#EAF1FA",
  mist: "#F4F8F9",
  ink: "#0E1B2E",
  slate: "#475569",
  muted: "#64748B",
  line: "#DCE6EC",
  amber: "#F2A93B",
  coral: "#E5484D",
  white: "#FFFFFF",
};

const FONT = "Manrope, Inter, sans-serif";

/* gradient/filter ids must be unique per SVG instance */
const useUid = () => useId().replace(/:/g, "");

function T({ x, y, size = 11, weight = 700, fill = V.ink, anchor = "start", children, ...rest }) {
  return (
    <text x={x} y={y} fontFamily={FONT} fontSize={size} fontWeight={weight} fill={fill} textAnchor={anchor} {...rest}>
      {children}
    </text>
  );
}

function Check({ cx, cy, r = 8, fill = V.green, className, style }) {
  return (
    <g className={className} style={style}>
      <circle cx={cx} cy={cy} r={r} fill={fill} />
      <path
        d={`M${cx - r * 0.45} ${cy}l${r * 0.3} ${r * 0.32}l${r * 0.55} -${r * 0.62}`}
        fill="none"
        stroke={V.white}
        strokeWidth={r * 0.28}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

const d = (s) => ({ animationDelay: `${s}s` });

/* ---------------------------------------------------------------- brand */

/** The V with the rod of Asclepius, as in the Vital logo. viewBox 100×120. */
export function VMark({ x = 0, y = 0, width = 100, tone = "color" }) {
  const id = useUid();
  const light = tone === "light";
  return (
    <svg x={x} y={y} width={width} height={width * 1.2} viewBox="0 0 100 120" aria-hidden="true">
      <defs>
        <linearGradient id={`vm${id}`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor={light ? "#FFFFFF" : V.navy} />
          <stop offset="0.5" stopColor={light ? "#CFEFF0" : V.blue} />
          <stop offset="1" stopColor={light ? V.aqua : V.teal} />
        </linearGradient>
      </defs>
      <path d="M4 26 Q18 20 30 28 L50 90 L76 14 Q82 4 97 2 L59 108 Q55 118 50 118 Q44 118 41 108 Z" fill={`url(#vm${id})`} />
      <g transform="rotate(-20 32 72)" stroke={light ? V.navy : V.white} fill="none" strokeLinecap="round">
        <line x1="32" y1="46" x2="32" y2="104" strokeWidth="3.2" />
        <circle cx="32" cy="42" r="3.4" fill={light ? V.navy : V.white} stroke="none" />
        <path d="M39 52 C 24 55, 24 62, 32 64 C 40 66, 40 73, 32 75 C 24 77, 24 84, 32 86 C 38 88, 38 93, 33 95" strokeWidth="3.2" />
        <circle cx="40" cy="51" r="2.6" fill={light ? V.navy : V.white} stroke="none" />
      </g>
    </svg>
  );
}

/** Mark + "VITAL" letters with the heartbeat running through the A. */
export function VitalWordmark({ className = "h-9", tone = "color", animated = false }) {
  const ink = tone === "light" ? V.white : V.navy;
  return (
    <svg viewBox="0 0 236 48" className={`vt-anim ${className}`} role="img" aria-label="Vital">
      <VMark x={0} y={0} width={40} tone={tone} />
      <g transform="translate(52 5)" fill={ink}>
        <polygon points="0,0 9,0 19,30 29,0 38,0 23.5,40 14.5,40" />
        <rect x="48" y="0" width="8" height="40" />
        <rect x="64" y="0" width="34" height="8" />
        <rect x="77" y="0" width="8" height="40" />
        <polygon points="106,40 120.5,0 129.5,0 144,40 135,40 125,11 115,40" />
        <rect x="152" y="0" width="8" height="40" />
        <rect x="152" y="32" width="28" height="8" />
        <polyline
          points="104,28 117,28 120,20 124,35 127,23 130,28 146,28"
          fill="none"
          stroke={tone === "light" ? V.aqua : V.teal}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength="420"
          className={animated ? "vt-ecg" : undefined}
        />
      </g>
    </svg>
  );
}

/** Horizontal heartbeat line. */
export function EcgLine({ className = "", color = V.teal, width = 2.5, animated = true }) {
  return (
    <svg viewBox="0 0 400 40" preserveAspectRatio="none" className={`vt-anim ${className}`} aria-hidden="true">
      <path
        d="M0 20 H150 L162 20 L170 6 L182 34 L192 12 L200 20 H250 L258 20 L263 14 L268 24 L272 20 H400"
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        pathLength="420"
        className={animated ? "vt-ecg" : undefined}
      />
    </svg>
  );
}

/* ---------------------------------------------------------------- step icons (24×24, stroke = currentColor) */

export const STEP_ICONS = {
  V: (
    <g>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M12 16v4M8 20h8" />
      <g fill="currentColor" stroke="none">
        <rect x="6" y="7" width="3" height="2.5" rx=".5" />
        <rect x="10.5" y="7" width="3" height="2.5" rx=".5" />
        <rect x="15" y="7" width="3" height="2.5" rx=".5" />
        <rect x="6" y="11" width="3" height="2.5" rx=".5" />
        <rect x="10.5" y="11" width="3" height="2.5" rx=".5" />
        <rect x="15" y="11" width="3" height="2.5" rx=".5" />
      </g>
    </g>
  ),
  I: (
    <g>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </g>
  ),
  T: (
    <g>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4M9.5 11h6M9.5 14h6M9.5 17h4" />
    </g>
  ),
  A: (
    <g>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5 20 20M7.5 10.5l2 2 3.5-3.5" />
    </g>
  ),
  L: (
    <g>
      <path d="M7 18a4 4 0 0 1-.5-8 5.5 5.5 0 0 1 10.6-1.5A4 4 0 0 1 17 18" />
      <path d="M12 12v7M9.5 14.5 12 12l2.5 2.5" />
    </g>
  ),
};

export function StepIcon({ letter, size = 24, className = "" }) {
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
      {STEP_ICONS[letter]}
    </svg>
  );
}

export const STEP_COLORS = { V: V.navy, I: V.blue, T: V.teal, A: V.green, L: V.deep };

/* ---------------------------------------------------------------- hero */

const ORBIT_NODES = [
  { k: "V", x: 142, y: 117, ox: -0.62, oy: -0.79 },
  { k: "I", x: 87, y: 192, ox: -0.93, oy: -0.36 },
  { k: "T", x: 78, y: 285, ox: -0.98, oy: 0.17 },
  { k: "A", x: 118, y: 370, ox: -0.75, oy: 0.66 },
  { k: "L", x: 196, y: 421, ox: -0.31, oy: 0.95 },
];

/** The Vital orbit: V mark inside a ring of the five workflow steps, each lighting up in turn. */
export function HeroOrbit() {
  const id = useUid();
  const bars = [14, 26, 18, 34, 22, 30, 16, 24, 12];
  return (
    <svg viewBox="0 0 520 500" className="vt-anim h-full w-full" role="img" aria-label="Vital: view a template, dictate, transcribe, review and share — a consultation becoming a finished note">
      <defs>
        <linearGradient id={`ring${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={V.navy} stopOpacity="0.95" />
          <stop offset="0.55" stopColor={V.teal} stopOpacity="0.7" />
          <stop offset="1" stopColor={V.teal} stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`halo${id}`}>
          <stop offset="0" stopColor={V.mint} />
          <stop offset="1" stopColor={V.mint} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`bub${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={V.blue} />
          <stop offset="1" stopColor={V.teal} />
        </linearGradient>
        <filter id={`sh${id}`} x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor={V.navy} floodOpacity="0.14" />
        </filter>
      </defs>

      <circle cx="250" cy="255" r="150" fill={`url(#halo${id})`} />
      <circle cx="250" cy="255" r="195" fill="none" stroke={V.line} strokeWidth="1.5" strokeDasharray="2 10" className="vt-orbit" style={{ "--o": "250px 255px" }} />
      <circle cx="250" cy="255" r="175" fill="none" stroke={`url(#ring${id})`} strokeWidth="4" />
      <g className="vt-orbit" style={{ "--o": "250px 255px", animationDuration: "10s" }}>
        <circle cx="75" cy="255" r="5" fill={V.teal} />
        <circle cx="75" cy="255" r="10" fill={V.teal} opacity="0.2" />
      </g>

      <g className="vt-float">
        <VMark x={175} y={165} width={150} />
      </g>

      {/* speech bubble with live waveform */}
      <g className="vt-float" style={d(1.2)}>
        <path d="M262 50 h96 a14 14 0 0 1 14 14 v34 a14 14 0 0 1 -14 14 h-58 l-16 16 v-16 h-22 a14 14 0 0 1 -14 -14 v-34 a14 14 0 0 1 14 -14z" fill={`url(#bub${id})`} filter={`url(#sh${id})`} />
        {bars.map((h, i) => (
          <rect key={i} x={275 + i * 9.5} y={81 - h / 2} width="4.5" height={h} rx="2.25" fill={V.white} className="vt-bar" style={d(i * 0.11)} />
        ))}
      </g>

      {/* the five steps */}
      {ORBIT_NODES.map((n, i) => (
        <g key={n.k} transform={`translate(${n.x} ${n.y})`}>
          <circle r="38" fill={STEP_COLORS[n.k]} opacity="0.16" className="vt-node-glow" style={d(i * 2)} />
          <g className="vt-node" style={d(i * 2)}>
            <circle r="27" fill={STEP_COLORS[n.k]} stroke={V.white} strokeWidth="3" />
            <g transform="translate(-12 -12)" fill="none" stroke={V.white} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" color={V.white}>
              {STEP_ICONS[n.k]}
            </g>
          </g>
          <g transform={`translate(${n.ox * 40} ${n.oy * 40})`}>
            <circle r="11" fill={V.white} stroke={STEP_COLORS[n.k]} strokeWidth="2" />
            <T x={0} y={4} size={11} weight={800} fill={STEP_COLORS[n.k]} anchor="middle">
              {n.k}
            </T>
          </g>
        </g>
      ))}

      {/* the note being written */}
      <g className="vt-float" style={d(0.6)}>
        <rect x="334" y="146" width="176" height="124" rx="16" fill={V.white} filter={`url(#sh${id})`} />
        <T x={350} y={170} size={11} weight={800} fill={V.navy}>SOAP note</T>
        <circle cx="490" cy="166" r="4" fill={V.coral} className="vt-blink" />
        {["S", "O", "A", "P"].map((k, i) => (
          <g key={k}>
            <rect x="350" y={182 + i * 21} width="16" height="16" rx="5" fill={[V.navy, V.blue, V.teal, V.green][i]} />
            <T x={358} y={194 + i * 21} size={9} weight={800} fill={V.white} anchor="middle">{k}</T>
            <rect x="373" y={186 + i * 21} width="120" height="7" rx="3.5" fill={V.mist} />
            <rect x="373" y={186 + i * 21} width={[112, 96, 104, 80][i]} height="7" rx="3.5" fill={[V.navy, V.blue, V.teal, V.green][i]} opacity="0.55" className="vt-line" style={d(i * 0.9)} />
          </g>
        ))}
      </g>

      {/* status chips take turns */}
      {[
        ["Note ready in 42 s", V.teal],
        ["Codes suggested", V.blue],
        ["Synced to the record", V.green],
      ].map(([label, c], i) => (
        <g key={label} className="vt-chip" style={d(i * 3)} data-first={i === 0 ? "" : undefined}>
          <rect x="334" y="290" width="176" height="42" rx="21" fill={V.white} filter={`url(#sh${id})`} />
          <Check cx={356} cy={311} r={10} fill={c} />
          <T x={374} y={315} size={12} weight={800} fill={V.ink}>{label}</T>
        </g>
      ))}

      <path
        d="M10 478 H200 L212 478 L220 462 L232 494 L242 468 L250 478 H300 L308 478 L313 471 L318 485 L322 478 H510"
        fill="none"
        stroke={V.teal}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="420"
        className="vt-ecg"
      />
    </svg>
  );
}

/* ---------------------------------------------------------------- workflow scenes (480×360) */

function Scene({ children, label }) {
  return (
    <svg viewBox="0 0 480 360" className="vt-anim h-full w-full" role="img" aria-label={label}>
      {children}
    </svg>
  );
}

const TEMPLATES = [
  { code: "SOAP", name: "SOAP note", c: V.teal },
  { code: "DAP", name: "Progress note", c: V.blue },
  { code: "BIRP", name: "Therapy note", c: V.navy },
  { code: "DC", name: "Discharge summary", c: V.green },
  { code: "REF", name: "Referral letter", c: V.amber },
  { code: "ECHO", name: "Cardiology report", c: V.coral },
];

/** V — View and select template: a cursor tours the gallery and picks SOAP. */
export function SceneView() {
  const pos = (i) => ({ x: [178, 40, 316, 40, 178, 316][i], y: [76, 76, 76, 204, 204, 204][i] });
  return (
    <Scene label="A template gallery; the cursor picks the SOAP note template">
      <rect x="20" y="20" width="440" height="320" rx="20" fill={V.white} stroke={V.line} />
      <T x={44} y={50} size={15} weight={800} fill={V.navy}>Choose a template</T>
      <rect x="296" y="34" width="140" height="24" rx="12" fill={V.mist} />
      <circle cx="312" cy="46" r="5" fill="none" stroke={V.muted} strokeWidth="1.6" />
      <T x={324} y={50} size={10} weight={600} fill={V.muted}>Search templates</T>
      {TEMPLATES.map((t, i) => {
        const { x, y } = pos(i);
        const card = (
          <g>
            <rect x={x} y={y} width="124" height="116" rx="14" fill={V.white} stroke={V.line} strokeWidth="1.5" />
            <rect x={x + 12} y={y + 12} width={t.code.length * 8 + 16} height="18" rx="9" fill={t.c} opacity="0.14" />
            <T x={x + 20} y={y + 25} size={9.5} weight={800} fill={t.c}>{t.code}</T>
            <T x={x + 12} y={y + 50} size={11} weight={800} fill={V.ink}>{t.name}</T>
            <rect x={x + 12} y={y + 62} width="96" height="7" rx="3.5" fill={V.mist} />
            <rect x={x + 12} y={y + 75} width="74" height="7" rx="3.5" fill={V.mist} />
            <rect x={x + 12} y={y + 88} width="86" height="7" rx="3.5" fill={V.mist} />
          </g>
        );
        if (i !== 0) return <g key={t.code}>{card}</g>;
        return (
          <g key={t.code} className="vt-click">
            {card}
            <rect x={x} y={y} width="124" height="116" rx="14" fill={V.mint} fillOpacity="0.5" stroke={V.teal} strokeWidth="3" className="vt-pick" />
            <Check cx={x + 108} cy={y + 18} r={10} fill={V.teal} className="vt-pick" />
          </g>
        );
      })}
      <g className="vt-cursor">
        <path d="M0 0 L0 20 L5.5 15 L9.5 23.5 L13 22 L9 13.6 L16 13.6 Z" fill={V.ink} stroke={V.white} strokeWidth="1.6" strokeLinejoin="round" />
      </g>
    </Scene>
  );
}

/** I — Interact and dictate: doctor and patient talk; Vital listens. */
export function SceneInteract() {
  const id = useUid();
  const left = [10, 22, 14, 30, 18, 26, 12, 20, 16, 8];
  const right = [16, 8, 24, 14, 28, 18, 30, 12, 22, 10];
  return (
    <Scene label="A doctor and patient talking while Vital listens and records">
      <defs>
        <linearGradient id={`mic${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={V.navy} />
          <stop offset="0.5" stopColor={V.blue} />
          <stop offset="1" stopColor={V.teal} />
        </linearGradient>
      </defs>

      {/* doctor */}
      <g className="vt-float">
        <path d="M58 262 Q58 200 110 196 Q162 200 162 262 Z" fill={V.white} stroke={V.line} strokeWidth="2" />
        <path d="M94 200 L110 228 L126 200" fill={V.sky} stroke={V.navy} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M90 204 Q84 236 102 240 Q120 242 126 212" fill="none" stroke={V.teal} strokeWidth="3" strokeLinecap="round" />
        <circle cx="102" cy="244" r="5" fill={V.teal} />
        <circle cx="110" cy="160" r="26" fill="#E7B98F" />
        <path d="M84 156 Q86 130 112 132 Q136 134 136 156 Q124 144 106 146 Q92 148 84 156Z" fill={V.deep} />
      </g>
      {/* patient */}
      <g className="vt-float" style={d(1)}>
        <path d="M318 262 Q318 202 370 198 Q422 202 422 262 Z" fill="#8DB4E2" />
        <path d="M356 200 Q370 214 384 200" fill="none" stroke={V.white} strokeWidth="2.5" />
        <circle cx="370" cy="162" r="25" fill="#C68B5E" />
        <path d="M345 158 Q346 134 372 136 Q396 138 395 160 Q390 146 370 147 Q352 148 345 158Z" fill={V.ink} />
      </g>
      <rect x="30" y="262" width="420" height="12" rx="6" fill={V.line} />

      {/* conversation */}
      <g className="vt-c2" data-first="">
        <rect x="28" y="36" width="210" height="58" rx="18" fill={V.white} stroke={V.line} strokeWidth="1.5" />
        <path d="M92 93 l6 16 l12 -16z" fill={V.white} />
        <T x={46} y={60} size={12} weight={700} fill={V.ink}>How long has the cough</T>
        <T x={46} y={78} size={12} weight={700} fill={V.ink}>been there?</T>
      </g>
      <g className="vt-c2" style={d(3)}>
        <rect x="244" y="36" width="210" height="58" rx="18" fill={V.sky} />
        <path d="M380 93 l-6 16 l-12 -16z" fill={V.sky} />
        <T x={262} y={60} size={12} weight={700} fill={V.navy}>About three weeks.</T>
        <T x={262} y={78} size={12} weight={700} fill={V.navy}>Mostly at night.</T>
      </g>

      {/* Vital listening */}
      {left.map((h, i) => (
        <rect key={`l${i}`} x={118 + i * 9} y={296 - h / 2} width="4.5" height={h} rx="2.25" fill={V.blue} opacity="0.7" className="vt-bar" style={d(i * 0.09)} />
      ))}
      {right.map((h, i) => (
        <rect key={`r${i}`} x={276 + i * 9} y={296 - h / 2} width="4.5" height={h} rx="2.25" fill={V.teal} opacity="0.8" className="vt-bar" style={d(i * 0.07)} />
      ))}
      <circle cx="240" cy="296" r="22" fill="none" stroke={V.teal} strokeWidth="2" className="vt-pulse" />
      <circle cx="240" cy="296" r="22" fill="none" stroke={V.teal} strokeWidth="2" className="vt-pulse" style={d(0.9)} />
      <circle cx="240" cy="296" r="22" fill={`url(#mic${id})`} />
      <g transform="translate(228 284)" fill="none" stroke={V.white} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {STEP_ICONS.I}
      </g>
      <rect x="160" y="328" width="160" height="24" rx="12" fill={V.white} stroke={V.line} />
      <circle cx="176" cy="340" r="4" fill={V.coral} className="vt-blink" />
      <T x={248} y={344} size={10.5} weight={800} fill={V.navy} anchor="middle">Listening · English + हिंदी</T>
    </Scene>
  );
}

/** T — Transcribe: phrases from the conversation are picked out and placed in the note. */
export function SceneTranscribe() {
  const widths = [150, 118, 140, 104, 150, 128, 92, 138];
  const picks = [
    { row: 1, sec: 0, delay: 0 },
    { row: 3, sec: 1, delay: 1.4 },
    { row: 5, sec: 2, delay: 2.8 },
    { row: 6, sec: 3, delay: 4.2 },
  ];
  const sections = [
    ["S", V.navy],
    ["O", V.blue],
    ["A", V.teal],
    ["P", V.green],
  ];
  return (
    <Scene label="The conversation transcript, with key phrases placed into the Subjective, Objective, Assessment and Plan sections">
      <rect x="20" y="30" width="206" height="300" rx="18" fill={V.white} stroke={V.line} />
      <T x={40} y={60} size={13} weight={800} fill={V.navy}>Transcript</T>
      <circle cx="206" cy="56" r="4" fill={V.coral} className="vt-blink" />
      {widths.map((w, i) => {
        const y = 80 + i * 30;
        const doc = i % 2 === 0;
        const pick = picks.find((p) => p.row === i);
        return (
          <g key={i}>
            <circle cx="44" cy={y + 6} r="9" fill={doc ? V.navy : V.sky} />
            <T x={44} y={y + 9.5} size={9} weight={800} fill={doc ? V.white : V.navy} anchor="middle">{doc ? "D" : "P"}</T>
            <rect x="60" y={y} width={w} height="12" rx="6" fill={V.mist} />
            {pick && <rect x="60" y={y} width={w} height="12" rx="6" fill={V.aqua} opacity="0.6" className="vt-hl" style={d(pick.delay)} />}
          </g>
        );
      })}

      <circle cx="240" cy="180" r="15" fill={V.navy} />
      <path d="M233 180h14M242 174l6 6-6 6" fill="none" stroke={V.white} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />

      <rect x="254" y="30" width="206" height="300" rx="18" fill={V.white} stroke={V.line} />
      <T x={274} y={60} size={13} weight={800} fill={V.navy}>Note · SOAP</T>
      <rect x="398" y="46" width="44" height="20" rx="10" fill={V.mint} />
      <T x={420} y={60} size={10} weight={800} fill={V.teal} anchor="middle">0:42</T>
      {sections.map(([k, c], i) => {
        const y = 82 + i * 62;
        const delay = picks[i].delay + 0.5;
        return (
          <g key={k}>
            <rect x="274" y={y} width="24" height="24" rx="7" fill={c} />
            <T x={286} y={y + 16.5} size={11} weight={800} fill={V.white} anchor="middle">{k}</T>
            <rect x="308" y={y + 2} width="134" height="8" rx="4" fill={V.mist} />
            <rect x="308" y={y + 16} width="100" height="8" rx="4" fill={V.mist} />
            <rect x="308" y={y + 2} width="134" height="8" rx="4" fill={c} opacity="0.6" className="vt-line" style={d(delay)} />
            <rect x="308" y={y + 16} width="100" height="8" rx="4" fill={c} opacity="0.35" className="vt-line" style={d(delay + 0.3)} />
          </g>
        );
      })}
    </Scene>
  );
}

/** A — Assess and review: a line is flagged and corrected, sections checked, the note signed. */
export function SceneAssess() {
  const id = useUid();
  const rows = [
    ["S", "Subjective", V.navy],
    ["O", "Objective", V.blue],
    ["A", "Assessment", V.teal],
    ["P", "Plan", V.green],
  ];
  return (
    <Scene label="The doctor reviews the draft note, corrects a flagged line and signs it">
      <defs>
        <filter id={`sh${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor={V.navy} floodOpacity="0.12" />
        </filter>
      </defs>
      <rect x="100" y="22" width="280" height="316" rx="18" fill={V.white} stroke={V.line} filter={`url(#sh${id})`} />
      <T x={122} y={52} size={14} weight={800} fill={V.navy}>Consultation note</T>
      <T x={122} y={68} size={10} weight={600} fill={V.muted}>Draft · awaiting your review</T>
      {rows.map(([k, label, c], i) => {
        const y = 86 + i * 60;
        const isPlan = k === "P";
        return (
          <g key={k}>
            <T x={122} y={y + 8} size={10} weight={800} fill={c}>{`${k}  ${label}`}</T>
            <rect x="122" y={y + 16} width="200" height="9" rx="4.5" fill={V.mist} />
            {isPlan ? (
              <>
                <rect x="122" y={y + 31} width="170" height="9" rx="4.5" fill={V.amber} opacity="0.45" className="vt-old" />
                <rect x="122" y={y + 34.5} width="170" height="2.5" rx="1.25" fill="#B7791F" className="vt-strike" />
                <rect x="122" y={y + 31} width="160" height="9" rx="4.5" fill={V.green} opacity="0.4" className="vt-fixed" />
              </>
            ) : (
              <rect x="122" y={y + 31} width={[164, 140, 176][i]} height="9" rx="4.5" fill={V.mist} />
            )}
            <Check cx={352} cy={y + 24} r={10} fill={V.green} className="vt-pop" style={d(i * 0.25)} />
          </g>
        );
      })}

      <g className="vt-flag">
        <rect x="300" y="256" width="96" height="24" rx="12" fill={V.amber} />
        <T x={348} y={272} size={10.5} weight={800} fill={V.white} anchor="middle">Check dosage</T>
      </g>

      <g className="vt-scan">
        <circle cx="236" cy="90" r="24" fill={V.white} fillOpacity="0.35" stroke={V.navy} strokeWidth="4" />
        <path d="M253 107 L270 124" stroke={V.navy} strokeWidth="7" strokeLinecap="round" />
      </g>

      <g className="vt-stamp">
        <rect x="236" y="296" width="132" height="32" rx="10" fill={V.white} stroke={V.green} strokeWidth="2.5" />
        <T x={302} y={317} size={11.5} weight={800} fill={V.green} anchor="middle">SIGNED · Dr. Menon</T>
      </g>
    </Scene>
  );
}

const DESTS = [
  { label: "Patient record", x: 92, y: 84, icon: "db" },
  { label: "Patient copy", x: 388, y: 84, icon: "phone" },
  { label: "Referral", x: 92, y: 272, icon: "mail" },
  { label: "Archive", x: 388, y: 272, icon: "box" },
];

function DestIcon({ kind }) {
  const s = { fill: "none", stroke: V.navy, strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round" };
  if (kind === "db")
    return (
      <g {...s}>
        <ellipse cx="0" cy="-10" rx="13" ry="5" />
        <path d="M-13 -10v20c0 2.8 5.8 5 13 5s13-2.2 13-5v-20M-13 0c0 2.8 5.8 5 13 5s13-2.2 13-5" />
      </g>
    );
  if (kind === "phone")
    return (
      <g {...s}>
        <rect x="-10" y="-16" width="20" height="32" rx="4" />
        <path d="M-4 11h8M-5 -6h10M-5 -1h10M-5 4h6" />
      </g>
    );
  if (kind === "mail")
    return (
      <g {...s}>
        <rect x="-15" y="-10" width="30" height="20" rx="3" />
        <path d="M-15 -8l15 10 15-10" />
      </g>
    );
  return (
    <g {...s}>
      <rect x="-15" y="-12" width="30" height="8" rx="2" />
      <path d="M-13 -4v14h26v-14M-5 2h10" />
    </g>
  );
}

/** L — Link, share and archive: the signed note goes everywhere it needs to be. */
export function SceneLink() {
  return (
    <Scene label="The signed note is sent to the patient record, the patient, a referral doctor and the archive">
      {DESTS.map((t) => (
        <line key={t.label} x1="240" y1="180" x2={t.x} y2={t.y} stroke={V.teal} strokeWidth="2" strokeOpacity="0.55" className="vt-dash" />
      ))}
      <circle cx="240" cy="180" r="40" fill={V.mint} className="vt-pulse" />
      <g className="vt-float">
        <rect x="208" y="140" width="64" height="80" rx="10" fill={V.white} stroke={V.navy} strokeWidth="2.5" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x="220" y={156 + i * 13} width={[40, 32, 36, 24][i]} height="6" rx="3" fill={[V.navy, V.blue, V.teal, V.green][i]} opacity="0.6" />
        ))}
        <Check cx={268} cy={144} r={11} fill={V.green} />
      </g>
      {DESTS.map((t, i) => (
        <g key={t.label}>
          <circle cx={t.x} cy={t.y} r="36" fill={V.white} stroke={V.line} strokeWidth="2" />
          <g transform={`translate(${t.x} ${t.y})`}>
            <DestIcon kind={t.icon} />
          </g>
          <T x={t.x} y={t.y + 58} size={12} weight={800} fill={V.navy} anchor="middle">{t.label}</T>
          <Check cx={t.x + 26} cy={t.y - 26} r={10} fill={V.teal} className="vt-arrive" style={d(i * 0.5)} />
          <circle cx="240" cy="180" r="6" fill={V.teal} className="vt-packet" style={{ ...d(i * 0.5), "--dx": `${t.x - 240}px`, "--dy": `${t.y - 180}px` }} />
        </g>
      ))}
    </Scene>
  );
}

/* ---------------------------------------------------------------- feature art (320×180) */

function Art({ children, label }) {
  return (
    <svg viewBox="0 0 320 180" className="vt-anim h-full w-full" role="img" aria-label={label}>
      {children}
    </svg>
  );
}

export function ArtScribe() {
  const bars = [12, 26, 18, 34, 22, 30, 14, 24];
  return (
    <Art label="A voice waveform becoming a written note">
      <rect x="24" y="52" width="112" height="76" rx="22" fill={V.navy} />
      {bars.map((h, i) => (
        <rect key={i} x={40 + i * 11} y={90 - h / 2} width="5" height={h} rx="2.5" fill={V.aqua} className="vt-bar" style={d(i * 0.1)} />
      ))}
      <path d="M146 90 H178" stroke={V.teal} strokeWidth="2.5" strokeLinecap="round" className="vt-dash" />
      <path d="M174 84 l7 6 -7 6" fill="none" stroke={V.teal} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="190" y="26" width="106" height="128" rx="14" fill={V.white} stroke={V.line} strokeWidth="1.5" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <rect x="204" y={44 + i * 17} width={[72, 60, 78, 50, 70, 40][i]} height="7" rx="3.5" fill={V.mist} />
          <rect x="204" y={44 + i * 17} width={[72, 60, 78, 50, 70, 40][i]} height="7" rx="3.5" fill={i % 2 ? V.teal : V.navy} opacity="0.55" className="vt-line" style={d(i * 0.6)} />
        </g>
      ))}
    </Art>
  );
}

export function ArtIntake() {
  const lanes = [
    ["General", V.navy, 40],
    ["Cardiology", V.teal, 90],
    ["Lab first", V.green, 140],
  ];
  return (
    <Art label="A pre-visit form being filled in and the patient routed to the right clinic">
      <rect x="34" y="14" width="86" height="152" rx="16" fill={V.ink} />
      <rect x="40" y="26" width="74" height="130" rx="9" fill={V.white} />
      <T x={48} y={42} size={8.5} weight={800} fill={V.navy}>Pre-visit form</T>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x="48" y={54 + i * 20} width="11" height="11" rx="3" fill="none" stroke={V.line} strokeWidth="1.5" />
          <Check cx={53.5} cy={59.5 + i * 20} r={6} fill={V.teal} className="vt-pop" style={d(i * 0.3)} />
          <rect x="64" y={57 + i * 20} width={[40, 32, 38, 28, 36][i]} height="5" rx="2.5" fill={V.mist} />
        </g>
      ))}
      {lanes.map(([label, c, y], i) => (
        <g key={label}>
          <path d={`M122 90 C 160 90, 160 ${y}, 196 ${y}`} fill="none" stroke={c} strokeWidth="2" strokeOpacity="0.6" className="vt-dash" />
          <rect x="196" y={y - 15} width="100" height="30" rx="15" fill={V.white} stroke={c} strokeWidth="1.5" />
          <circle cx="212" cy={y} r="5" fill={c} className={i === 1 ? "vt-blink" : undefined} />
          <T x={224} y={y + 4} size={10.5} weight={800} fill={V.ink}>{label}</T>
        </g>
      ))}
    </Art>
  );
}

export function ArtBilling() {
  return (
    <Art label="Codes lifted from the clinical note and the claim marked ready">
      <rect x="22" y="24" width="96" height="132" rx="14" fill={V.white} stroke={V.line} strokeWidth="1.5" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x="36" y={42 + i * 17} width={[64, 52, 68, 44, 60, 36][i]} height="7" rx="3.5" fill={i === 1 || i === 3 ? V.aqua : V.mist} />
      ))}
      <path d="M124 70 C 150 70, 150 52, 168 52 M124 104 C 150 104, 150 96, 168 96" fill="none" stroke={V.teal} strokeWidth="2" className="vt-dash" />
      <g className="vt-reveal">
        <rect x="170" y="36" width="128" height="32" rx="16" fill={V.sky} />
        <T x={186} y={56} size={11} weight={800} fill={V.navy}>ICD-10 · R05.9</T>
      </g>
      <g className="vt-reveal" style={d(0.8)}>
        <rect x="170" y="80" width="128" height="32" rx="16" fill={V.mint} />
        <T x={186} y={100} size={11} weight={800} fill={V.teal}>CPT · 99213</T>
      </g>
      <g className="vt-reveal" style={d(1.6)}>
        <rect x="170" y="124" width="128" height="32" rx="16" fill={V.green} />
        <Check cx={188} cy={140} r={8} fill={V.white} />
        <path d="M184 140l3 3 5-6" fill="none" stroke={V.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <T x={202} y={144} size={11} weight={800} fill={V.white}>Claim ready</T>
      </g>
    </Art>
  );
}

export function ArtEhr() {
  return (
    <Art label="A finished note syncing into the patient's chart">
      <rect x="26" y="30" width="84" height="120" rx="14" fill={V.white} stroke={V.line} strokeWidth="1.5" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x="40" y={48 + i * 18} width={[56, 44, 52, 36, 48][i]} height="7" rx="3.5" fill={[V.navy, V.blue, V.teal, V.green, V.mist][i]} opacity="0.55" />
      ))}
      <g transform="translate(160 90)">
        <circle r="26" fill={V.navy} />
        <g className="vt-spin-slow">
          <path d="M-12 -4a12 12 0 0 1 21-6M12 4a12 12 0 0 1-21 6" fill="none" stroke={V.white} strokeWidth="2.6" strokeLinecap="round" />
          <path d="M9 -16v6h-6M-9 16v-6h6" fill="none" stroke={V.white} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
      <path d="M114 90 H132 M188 90 H206" stroke={V.teal} strokeWidth="2" className="vt-dash" />
      <path d="M210 38 h30 l8 10 h42 a8 8 0 0 1 8 8 v86 a8 8 0 0 1 -8 8 h-80 a8 8 0 0 1 -8 -8 v-96 a8 8 0 0 1 8 -8z" fill={V.sky} stroke={V.blue} strokeOpacity="0.4" strokeWidth="1.5" />
      <T x={218} y={72} size={10} weight={800} fill={V.navy}>Patient chart</T>
      <rect x="218" y="84" width="72" height="8" rx="4" fill={V.white} />
      <rect x="218" y="84" width="72" height="8" rx="4" fill={V.teal} className="vt-fill" />
      <rect x="218" y="100" width="56" height="7" rx="3.5" fill={V.white} />
      <rect x="218" y="114" width="64" height="7" rx="3.5" fill={V.white} />
      <Check cx={284} cy={134} r={10} fill={V.green} className="vt-reveal" style={d(1.5)} />
    </Art>
  );
}

export function ArtCds() {
  return (
    <Art label="Two medicines flagged for an interaction, with the guideline alongside">
      <g transform="translate(96 104)">
        <g className="vt-nudge-l">
          <rect x="-44" y="-12" width="48" height="24" rx="12" fill={V.teal} />
          <rect x="-20" y="-12" width="24" height="24" rx="0" fill={V.white} opacity="0.35" />
        </g>
        <g className="vt-nudge-r">
          <rect x="-4" y="-12" width="48" height="24" rx="12" fill={V.navy} />
          <rect x="20" y="-12" width="24" height="24" fill={V.amber} opacity="0.8" />
        </g>
      </g>
      <g className="vt-blink">
        <path d="M96 22 L120 62 H72 Z" fill={V.amber} />
        <rect x="94.5" y="36" width="3" height="13" rx="1.5" fill={V.white} />
        <circle cx="96" cy="54" r="2" fill={V.white} />
      </g>
      <rect x="176" y="28" width="122" height="124" rx="14" fill={V.white} stroke={V.line} strokeWidth="1.5" />
      <rect x="176" y="28" width="122" height="30" rx="14" fill={V.amber} opacity="0.18" />
      <T x={190} y={48} size={10.5} weight={800} fill="#9A5B00">Interaction</T>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x="190" y={70 + i * 18} width={[92, 76, 86, 60][i]} height="7" rx="3.5" fill={V.mist} />
      ))}
      <rect x="190" y="70" width="92" height="7" rx="3.5" fill={V.teal} opacity="0.5" className="vt-line" />
    </Art>
  );
}

export function ArtAnalytics() {
  const bars = [44, 62, 54, 80, 72, 96];
  return (
    <Art label="Practice dashboard with visits rising over six months">
      <rect x="20" y="16" width="280" height="148" rx="16" fill={V.white} stroke={V.line} strokeWidth="1.5" />
      <T x={36} y={40} size={11} weight={800} fill={V.navy}>Patient visits</T>
      <rect x="226" y="27" width="58" height="20" rx="10" fill={V.mint} />
      <T x={255} y={41} size={10} weight={800} fill={V.green} anchor="middle">▲ 18%</T>
      <line x1="36" y1="148" x2="284" y2="148" stroke={V.line} strokeWidth="1.5" />
      {bars.map((h, i) => (
        <rect key={i} x={48 + i * 40} y={148 - h} width="22" height={h} rx="6" fill={i === bars.length - 1 ? V.teal : V.sky} className="vt-grow" style={d(i * 0.12)} />
      ))}
      <path
        d={`M59 ${148 - bars[0] - 12} ${bars.map((h, i) => `L${59 + i * 40} ${148 - h - 12}`).join(" ")}`}
        fill="none"
        stroke={V.navy}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="420"
        className="vt-ecg"
      />
    </Art>
  );
}

/* ---------------------------------------------------------------- the evening, back (640×230) */

export function EveningTimeline() {
  const id = useUid();
  const X = (h) => 130 + (h - 9) * 36.9; // 9 AM → 10 PM
  const ticks = [9, 12, 15, 18, 21];
  const label = (h) => (h === 12 ? "12 PM" : h > 12 ? `${h - 12} PM` : `${h} AM`);
  const visits = [9.5, 10.3, 11.1, 12.2, 14, 14.8, 15.6, 16.5, 17.3, 18.2];
  return (
    <svg viewBox="0 0 640 230" className="vt-anim h-auto w-full" role="img" aria-label="Without Vital, notes are finished between 7 and 10 PM. With Vital, notes are done during each visit and the evening is free.">
      <defs>
        <pattern id={`hatch${id}`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="8" height="8" fill={V.amber} opacity="0.25" />
          <rect width="3" height="8" fill={V.amber} opacity="0.55" />
        </pattern>
      </defs>
      {ticks.map((h) => (
        <g key={h}>
          <line x1={X(h)} y1="30" x2={X(h)} y2="190" stroke={V.line} strokeDasharray="3 5" />
          <T x={X(h)} y={214} size={11} weight={700} fill={V.muted} anchor="middle">{label(h)}</T>
        </g>
      ))}

      <T x={0} y={70} size={12.5} weight={800} fill={V.slate}>Without Vital</T>
      <rect x={X(9)} y="46" width={X(19) - X(9)} height="40" rx="12" fill={V.sky} />
      {visits.map((v) => (
        <rect key={v} x={X(v)} y="56" width="14" height="20" rx="5" fill={V.blue} opacity="0.45" />
      ))}
      <rect x={X(19) + 4} y="46" width={X(22) - X(19) - 4} height="40" rx="12" fill={`url(#hatch${id})`} stroke={V.amber} strokeWidth="1.5" />
      <T x={(X(19) + X(22)) / 2 + 2} y={71} size={12} weight={800} fill="#9A5B00" anchor="middle">Finishing notes</T>

      <T x={0} y={150} size={12.5} weight={800} fill={V.navy}>With Vital</T>
      <rect x={X(9)} y="126" width={X(19) - X(9)} height="40" rx="12" fill={V.sky} />
      {visits.map((v, i) => (
        <g key={v}>
          <rect x={X(v)} y="136" width="14" height="20" rx="5" fill={V.blue} opacity="0.45" />
          <Check cx={X(v) + 7} cy={131} r={6} fill={V.teal} className="vt-pop" style={d(i * 0.12)} />
        </g>
      ))}
      <rect x={X(19) + 4} y="126" width={X(22) - X(19) - 4} height="40" rx="12" fill={V.mint} />
      <rect x={X(19) + 4} y="126" width={X(22) - X(19) - 4} height="40" rx="12" fill={V.green} opacity="0.85" className="vt-fill" />
      <T x={(X(19) + X(22)) / 2 + 2} y={151} size={12} weight={800} fill={V.white} anchor="middle">Your evening</T>
    </svg>
  );
}
