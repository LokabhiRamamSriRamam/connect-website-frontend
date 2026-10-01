import { useSvgId } from "./kit";

/* Saarthi illustrations. Loops are CSS (saarthi.css); every SVG carries .sa-anim */

export const C = {
  maroon: "#8E1B12",
  red: "#C0321F",
  saffron: "#EE7B1E",
  marigold: "#FFB21E",
  paper: "#FFF7E8",
  parchment: "#F6E9CF",
  line: "#EADBC0",
  ink: "#1C1410",
  brown: "#5E4634",
  muted: "#8C7058",
  teal: "#0E7C66",
  mint: "#E4F4EC",
  white: "#FFFFFF",
  steel: "#2B2F36",
  concrete: "#F1ECE3",
};
export const FONT = "Manrope, Inter, sans-serif";
export const SERIF = "'Playfair Display', Georgia, serif";

/* A chariot wheel centred on 0,0 */
export function Wheel({ r = 100, color = C.maroon, hub = C.saffron, width = 6, spokes = 8 }) {
  return (
    <g>
      <circle r={r} fill="none" stroke={color} strokeWidth={width} />
      <circle r={r * 0.8} fill="none" stroke={color} strokeWidth={width * 0.35} strokeDasharray="2 10" />
      {Array.from({ length: spokes }, (_, i) => (
        <line key={i} x1="0" y1="0" x2="0" y2={-r} stroke={color} strokeWidth={width * 0.55} transform={`rotate(${(i * 360) / spokes})`} />
      ))}
      <circle r={r * 0.2} fill={hub} />
      <circle r={r * 0.07} fill={C.paper} />
    </g>
  );
}

function Grad({ id }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor={C.maroon} />
      <stop offset="0.5" stopColor={C.red} />
      <stop offset="1" stopColor={C.saffron} />
    </linearGradient>
  );
}

function Check({ x, y, r = 9, fill = C.teal }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={fill} />
      <path d={`M${x - r * 0.45} ${y}l${r * 0.3} ${r * 0.32} ${r * 0.6}-${r * 0.62}`} stroke={C.white} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Hero: a Hinglish question becomes an exact answer, then a command becomes a finished invoice */

export function HeroChat() {
  const g = useSvgId("sa-hero");
  const bars = [34, 48, 42, 60, 54, 80];
  const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep"];
  return (
    <svg
      viewBox="0 0 480 520"
      className="sa-anim h-auto w-full"
      role="img"
      aria-label="A shop owner asks Saarthi in Hinglish what last month's revenue was and gets the exact figure with a chart, then asks it to send a bill and the invoice is sent on WhatsApp."
    >
      <defs>
        <Grad id={g} />
      </defs>

      <g transform="translate(378 112)" opacity="0.14">
        <g className="sa-spin-rev">
          <Wheel r={104} width={8} />
        </g>
      </g>

      {/* panel */}
      <rect x="52" y="52" width="400" height="440" rx="28" fill={C.maroon} />
      <rect x="40" y="40" width="400" height="440" rx="28" fill={C.white} stroke={C.ink} strokeWidth="2.5" />

      {/* header */}
      <circle cx="78" cy="70" r="18" fill={`url(#${g})`} />
      <g transform="translate(78 70)">
        <g className="sa-spin">
          <Wheel r={10} color={C.white} hub={C.marigold} width={2} />
        </g>
      </g>
      <text x="106" y="67" fontFamily={SERIF} fontWeight="700" fontSize="18" fill={C.ink}>Saarthi</text>
      <circle cx="110" cy="81" r="3.5" fill={C.teal} />
      <text x="119" y="85" fontFamily={FONT} fontWeight="600" fontSize="10.5" fill={C.muted}>online · English + Hinglish</text>
      <circle cx="410" cy="70" r="16" fill={C.paper} stroke={C.line} />
      <rect x="406" y="61" width="8" height="12" rx="4" fill={C.red} />
      <path d="M402 69a8 8 0 0016 0M410 77v4" stroke={C.red} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <line x1="40" y1="100" x2="440" y2="100" stroke={C.line} strokeWidth="1.5" />

      {/* 1 — question */}
      <g className="sa-s1">
        <rect x="150" y="116" width="266" height="44" rx="18" fill={C.maroon} />
        <text x="166" y="143" fontFamily={FONT} fontWeight="700" fontSize="13" fill={C.white}>pichhle mahine ka revenue kya tha?</text>
      </g>

      {/* 2 — thinking */}
      <g className="sa-s2">
        <rect x="64" y="180" width="70" height="32" rx="16" fill={C.parchment} />
        {[84, 99, 114].map((x, i) => (
          <circle key={x} cx={x} cy="196" r="4" fill={C.muted} className="sa-blink" style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
      </g>

      {/* 3 — the answer */}
      <g className="sa-s3">
        <rect x="64" y="180" width="312" height="180" rx="18" fill={C.paper} stroke={C.line} strokeWidth="1.5" />
        <text x="84" y="207" fontFamily={FONT} fontWeight="700" fontSize="11" fill={C.muted}>REVENUE · SEPTEMBER</text>
        <text x="84" y="246" fontFamily={SERIF} fontWeight="700" fontSize="32" fill={C.ink}>₹18,42,560</text>
        {months.map((m, i) => (
          <text key={m} x={102 + i * 46} y="354" textAnchor="middle" fontFamily={FONT} fontWeight="600" fontSize="9" fill={C.muted}>{m}</text>
        ))}
      </g>
      {bars.map((h, i) => (
        <rect
          key={i}
          x={88 + i * 46}
          y={338 - h}
          width="28"
          height={h}
          rx="6"
          fill={i === bars.length - 1 ? `url(#${g})` : C.line}
          className="sa-bar3"
          style={{ animationDelay: `${i * 0.07}s` }}
        />
      ))}
      <g className="sa-s4">
        <rect x="252" y="191" width="108" height="26" rx="13" fill={C.mint} />
        <text x="306" y="208" textAnchor="middle" fontFamily={FONT} fontWeight="800" fontSize="11" fill={C.teal}>▲ 12% vs Aug</text>
      </g>

      {/* 5 — a command */}
      <g className="sa-s5">
        <rect x="190" y="376" width="226" height="40" rx="18" fill={C.maroon} />
        <text x="206" y="401" fontFamily={FONT} fontWeight="700" fontSize="13" fill={C.white}>Sharma Traders ko bill bhejo</text>
      </g>

      {/* 6 — done */}
      <g className="sa-s6">
        <rect x="64" y="430" width="274" height="38" rx="14" fill={C.mint} stroke={C.teal} strokeWidth="1.5" />
        <Check x={84} y={449} />
        <text x="102" y="453" fontFamily={FONT} fontWeight="800" fontSize="12" fill={C.teal}>Invoice #2041 sent on WhatsApp</text>
      </g>

      {/* stickers */}
      <g className="sa-float">
        <g transform="rotate(-8 50 306)">
          <rect x="6" y="290" width="88" height="34" rx="10" fill={C.marigold} stroke={C.ink} strokeWidth="2" />
          <text x="50" y="312" textAnchor="middle" fontFamily={FONT} fontWeight="800" fontSize="13" fill={C.ink}>GST ✓</text>
        </g>
      </g>
      <g className="sa-float" style={{ animationDelay: "-2s" }}>
        <circle cx="452" cy="256" r="24" fill={C.marigold} stroke={C.ink} strokeWidth="2" />
        <circle cx="452" cy="256" r="17" fill="none" stroke={C.ink} strokeWidth="1.2" strokeDasharray="2 3" />
        <text x="452" y="264" textAnchor="middle" fontFamily={SERIF} fontWeight="700" fontSize="22" fill={C.ink}>₹</text>
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Problem: registers, sheets, calculators and chat pings everywhere */

export function PaperChaos() {
  return (
    <svg viewBox="0 0 420 360" className="sa-anim h-auto w-full" role="img" aria-label="A desk buried in a red ledger book, a spreadsheet, a calculator, sticky notes and unanswered chat messages.">
      {/* spreadsheet */}
      <g className="sa-float" style={{ animationDelay: "-1s" }}>
        <g transform="rotate(7 230 150)">
          <rect x="150" y="84" width="170" height="130" rx="8" fill={C.white} stroke={C.ink} strokeWidth="2" />
          <rect x="150" y="84" width="170" height="20" rx="8" fill={C.teal} />
          {[124, 144, 164, 184].map((y) => (
            <line key={y} x1="150" y1={y} x2="320" y2={y} stroke={C.line} strokeWidth="1.2" />
          ))}
          {[192, 234, 276].map((x) => (
            <line key={x} x1={x} y1="104" x2={x} y2="214" stroke={C.line} strokeWidth="1.2" />
          ))}
          <text x="243" y="139" fontFamily={FONT} fontWeight="800" fontSize="11" fill={C.red}>#REF!</text>
          <text x="160" y="178" fontFamily={FONT} fontWeight="700" fontSize="10" fill={C.muted}>final_v3</text>
        </g>
      </g>

      {/* bahi-khata */}
      <g transform="rotate(-6 115 262)">
        <rect x="36" y="206" width="160" height="112" rx="8" fill={C.red} stroke={C.ink} strokeWidth="2" />
        <rect x="36" y="206" width="16" height="112" fill={C.maroon} />
        <line x1="52" y1="262" x2="196" y2="262" stroke={C.marigold} strokeWidth="3" />
        <text x="124" y="246" textAnchor="middle" fontFamily={SERIF} fontWeight="700" fontSize="15" fill={C.marigold}>Bahi Khata</text>
        <text x="124" y="292" textAnchor="middle" fontFamily={FONT} fontWeight="700" fontSize="9" fill={C.parchment}>2024 · 2025 · 2026</text>
      </g>

      {/* calculator */}
      <g transform="rotate(5 322 262)">
        <rect x="276" y="198" width="94" height="128" rx="14" fill={C.ink} />
        <rect x="286" y="210" width="74" height="28" rx="5" fill={C.mint} />
        <text x="354" y="230" textAnchor="end" fontFamily={FONT} fontWeight="800" fontSize="14" fill={C.ink} className="sa-blink">??,???</text>
        {[0, 1, 2].map((r) =>
          [0, 1, 2, 3].map((c) => (
            <rect key={`${r}${c}`} x={287 + c * 18} y={248 + r * 24} width="14" height="16" rx="3" fill={c === 3 ? C.saffron : "#3A2F29"} />
          )),
        )}
      </g>

      {/* sticky note */}
      <g className="sa-sway" style={{ animationDelay: "-0.6s" }}>
        <rect x="60" y="112" width="74" height="70" fill={C.marigold} transform="rotate(-8 97 147)" />
        <text x="97" y="144" textAnchor="middle" fontFamily={FONT} fontWeight="800" fontSize="12" fill={C.ink} transform="rotate(-8 97 147)">udhaar</text>
        <text x="97" y="161" textAnchor="middle" fontFamily={FONT} fontWeight="800" fontSize="12" fill={C.ink} transform="rotate(-8 97 147)">kiska?</text>
      </g>

      {/* chat pings */}
      <g className="sa-s1">
        <rect x="24" y="26" width="150" height="32" rx="14" fill={C.white} stroke={C.ink} strokeWidth="1.5" />
        <text x="38" y="47" fontFamily={FONT} fontWeight="700" fontSize="11" fill={C.ink}>bhai stock kitna hai?</text>
      </g>
      <g className="sa-s3">
        <rect x="200" y="20" width="118" height="32" rx="14" fill={C.white} stroke={C.ink} strokeWidth="1.5" />
        <text x="214" y="41" fontFamily={FONT} fontWeight="700" fontSize="11" fill={C.ink}>report kab tak?</text>
      </g>
      <g className="sa-s5">
        <circle cx="318" cy="22" r="11" fill={C.red} />
        <text x="318" y="26" textAnchor="middle" fontFamily={FONT} fontWeight="800" fontSize="10" fill={C.white}>9</text>
      </g>

      {/* clock running out */}
      <g transform="translate(372 96)">
        <circle r="30" fill={C.paper} stroke={C.ink} strokeWidth="2" />
        <line x1="0" y1="0" x2="0" y2="-14" stroke={C.ink} strokeWidth="3" strokeLinecap="round" />
        <g className="sa-spin-fast">
          <line x1="0" y1="0" x2="0" y2="-22" stroke={C.red} strokeWidth="2" strokeLinecap="round" />
          <circle r="22" fill="none" stroke="none" />
        </g>
        <circle r="3" fill={C.ink} />
        <text y="50" textAnchor="middle" fontFamily={FONT} fontWeight="800" fontSize="10" fill={C.red}>Month-end: day 6</text>
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Engine steps (Hybrid: AI reads words, the database does the maths) */

export function IconQuestion() {
  return (
    <svg viewBox="0 0 72 72" className="sa-anim h-16 w-16" aria-hidden="true">
      <rect x="6" y="12" width="60" height="38" rx="14" fill={C.maroon} />
      <path d="M20 50l-4 12 14-12z" fill={C.maroon} />
      {[24, 36, 48].map((x, i) => (
        <circle key={x} cx={x} cy="31" r="4" fill={C.marigold} className="sa-blink" style={{ animationDelay: `${i * 0.2}s` }} />
      ))}
    </svg>
  );
}

export function IconUnderstand() {
  return (
    <svg viewBox="0 0 72 72" className="sa-anim h-16 w-16" aria-hidden="true">
      <rect x="8" y="8" width="56" height="56" rx="16" fill="none" stroke={C.marigold} strokeWidth="2.5" strokeDasharray="5 5" className="sa-dash" />
      <rect x="16" y="20" width="40" height="9" rx="4.5" fill={C.marigold} className="sa-s1" style={{ animationDuration: "6s" }} />
      <rect x="16" y="32" width="28" height="9" rx="4.5" fill={C.saffron} className="sa-s2" style={{ animationDuration: "6s" }} />
      <rect x="16" y="44" width="34" height="9" rx="4.5" fill={C.red} className="sa-s3" style={{ animationDuration: "6s" }} />
    </svg>
  );
}

export function IconQuery() {
  return (
    <svg viewBox="0 0 72 72" className="sa-anim h-16 w-16" aria-hidden="true">
      <ellipse cx="30" cy="16" rx="20" ry="7" fill={C.parchment} />
      <path d="M10 16v38c0 4 9 7 20 7s20-3 20-7V16" fill={C.parchment} />
      <path d="M10 29c0 4 9 7 20 7s20-3 20-7M10 42c0 4 9 7 20 7s20-3 20-7" stroke={C.muted} strokeWidth="1.5" fill="none" />
      <ellipse cx="30" cy="16" rx="20" ry="7" fill="none" stroke={C.muted} strokeWidth="1.5" />
      <g transform="translate(53 50)">
        <g className="sa-spin-fast">
          <circle r="11" fill={C.saffron} />
          {Array.from({ length: 8 }, (_, i) => (
            <rect key={i} x="-2.5" y="-15" width="5" height="6" rx="1.5" fill={C.saffron} transform={`rotate(${i * 45})`} />
          ))}
          <circle r="4" fill={C.ink} />
        </g>
      </g>
    </svg>
  );
}

export function IconAnswer() {
  return (
    <svg viewBox="0 0 72 72" className="sa-anim h-16 w-16" aria-hidden="true">
      <rect x="8" y="8" width="56" height="56" rx="12" fill={C.paper} />
      {[22, 36, 50].map((y, i) => (
        <g key={y}>
          <rect x="16" y={y - 4} width="22" height="7" rx="3.5" fill={C.line} />
          <rect x="42" y={y - 4} width="14" height="7" rx="3.5" fill={C.teal} className="sa-fill" style={{ animationDelay: `${i * 0.25}s` }} />
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Voice: speak the way your shop speaks */

export function VoiceOrb() {
  const g = useSvgId("sa-voice");
  const bars = [10, 22, 34, 18, 42, 28, 52, 36, 24, 46, 30, 16, 38, 26, 12];
  return (
    <svg viewBox="0 0 360 360" className="sa-anim h-auto w-full" role="img" aria-label="A microphone listening, with a live voice waveform.">
      <defs>
        <Grad id={g} />
      </defs>
      <g transform="translate(180 150)">
        {[0, 0.6, 1.2].map((d) => (
          <circle key={d} r="58" fill="none" stroke={C.marigold} strokeWidth="2" className="sa-pulse" style={{ animationDelay: `${d}s` }} />
        ))}
        <g className="sa-spin-rev" opacity="0.35">
          <Wheel r={96} color={C.marigold} hub="none" width={2} spokes={12} />
        </g>
        <circle r="58" fill={`url(#${g})`} stroke={C.ink} strokeWidth="2.5" />
        <rect x="-12" y="-30" width="24" height="38" rx="12" fill={C.white} />
        <path d="M-22 -2a22 22 0 0044 0M0 20v12M-12 32h24" stroke={C.white} strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
      {bars.map((h, i) => (
        <rect
          key={i}
          x={75 + i * 15}
          y={300 - h / 2}
          width="8"
          height={h}
          rx="4"
          fill={i % 3 === 0 ? C.saffron : C.marigold}
          className="sa-wave"
          style={{ animationDelay: `${(i % 5) * 0.12}s` }}
        />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Security: every business in its own locked compartment */

export function Vault() {
  const g = useSvgId("sa-vault");
  const cells = [0, 1, 2, 3, 4, 5];
  return (
    <svg viewBox="0 0 400 330" className="sa-anim h-auto w-full overflow-visible" role="img" aria-label="Six locked compartments, one per business. Yours is highlighted and only your key opens it.">
      <defs>
        <Grad id={g} />
      </defs>
      <rect x="14" y="20" width="372" height="282" rx="22" fill={C.parchment} stroke={C.ink} strokeWidth="2.5" />
      {cells.map((i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = 32 + col * 118;
        const y = 38 + row * 130;
        const mine = i === 1;
        return (
          <g key={i}>
            <rect x={x} y={y} width="100" height="114" rx="12" fill={mine ? `url(#${g})` : C.white} stroke={C.ink} strokeWidth="2" />
            {mine && <rect x={x} y={y} width="100" height="114" rx="12" fill="none" stroke={C.marigold} strokeWidth="3" className="sa-blink" style={{ animationDuration: "1.6s" }} />}
            <circle cx={x + 50} cy={y + 44} r="15" fill="none" stroke={mine ? C.white : C.muted} strokeWidth="2" />
            <circle cx={x + 50} cy={y + 41} r="4" fill={mine ? C.white : C.muted} />
            <path d={`M${x + 48} ${y + 44}h4l1 9h-6z`} fill={mine ? C.white : C.muted} />
            <text x={x + 50} y={y + 88} textAnchor="middle" fontFamily={FONT} fontWeight="800" fontSize="10.5" fill={mine ? C.white : C.muted}>
              {mine ? "Your books" : `Business ${String.fromCharCode(65 + i)}`}
            </text>
          </g>
        );
      })}
      {/* your key */}
      <g className="sa-float">
        <g transform="translate(160 6) rotate(20)">
          <circle cx="0" cy="0" r="11" fill={C.marigold} stroke={C.ink} strokeWidth="2" />
          <circle cx="0" cy="0" r="4" fill={C.parchment} />
          <path d="M11 0h26v6M30 0v6" stroke={C.ink} strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      </g>
      {/* shield */}
      <g transform="translate(374 296) scale(0.72)">
        <path d="M0 -34l30 11v22c0 20-14 32-30 38-16-6-30-18-30-38v-22z" fill={C.teal} stroke={C.ink} strokeWidth="2.5" />
        <path d="M-11 2l8 8 15-17" stroke={C.white} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Module icons (animate while their card is hovered) */

const Frame = ({ children, label }) => (
  <svg viewBox="0 0 64 64" className="sa-anim sa-hover-anim h-14 w-14" aria-hidden="true" data-label={label}>
    <rect x="1" y="1" width="62" height="62" rx="18" fill={C.parchment} />
    {children}
  </svg>
);

export const ModuleIcons = {
  billing: () => (
    <Frame>
      <rect x="14" y="14" width="36" height="10" rx="4" fill={C.ink} />
      <g className="sa-slide-out" style={{ animationDuration: "2.6s" }}>
        <path d="M19 22h26v26l-4-3-4 3-5-3-4 3-5-3-4 3z" fill={C.white} stroke={C.ink} strokeWidth="1.8" strokeLinejoin="round" />
        <text x="32" y="38" textAnchor="middle" fontFamily={SERIF} fontWeight="700" fontSize="13" fill={C.red}>₹</text>
      </g>
    </Frame>
  ),
  stock: () => (
    <Frame>
      <rect x="12" y="36" width="18" height="16" rx="3" fill={C.saffron} stroke={C.ink} strokeWidth="1.8" />
      <rect x="32" y="36" width="18" height="16" rx="3" fill={C.marigold} stroke={C.ink} strokeWidth="1.8" />
      <g className="sa-float" style={{ animationDuration: "1.6s" }}>
        <rect x="22" y="14" width="18" height="16" rx="3" fill={C.red} stroke={C.ink} strokeWidth="1.8" />
      </g>
      <circle cx="52" cy="14" r="4" fill={C.red} />
      <circle cx="52" cy="14" r="4" fill={C.red} className="sa-pulse" />
    </Frame>
  ),
  journal: () => (
    <Frame>
      <line x1="32" y1="14" x2="32" y2="50" stroke={C.ink} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="22" y1="50" x2="42" y2="50" stroke={C.ink} strokeWidth="2.5" strokeLinecap="round" />
      <g className="sa-sway" style={{ transformOrigin: "50% 0%" }}>
        <line x1="14" y1="18" x2="50" y2="18" stroke={C.ink} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M14 18l-5 14h10z" fill={C.saffron} stroke={C.ink} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M50 18l-5 14h10z" fill={C.red} stroke={C.ink} strokeWidth="1.5" strokeLinejoin="round" />
        <text x="14" y="42" textAnchor="middle" fontFamily={FONT} fontWeight="800" fontSize="7" fill={C.ink}>Dr</text>
        <text x="50" y="42" textAnchor="middle" fontFamily={FONT} fontWeight="800" fontSize="7" fill={C.ink}>Cr</text>
      </g>
    </Frame>
  ),
  party: () => (
    <Frame>
      <circle cx="16" cy="24" r="6" fill={C.maroon} />
      <path d="M8 44a8 8 0 0116 0z" fill={C.maroon} />
      <circle cx="48" cy="24" r="6" fill={C.teal} />
      <path d="M40 44a8 8 0 0116 0z" fill={C.teal} />
      <g className="sa-travel" style={{ "--tx": "22px", "--ty": "0px", animationDuration: "1.8s" }}>
        <circle cx="21" cy="34" r="5.5" fill={C.marigold} stroke={C.ink} strokeWidth="1.3" />
      </g>
      <text x="32" y="56" textAnchor="middle" fontFamily={FONT} fontWeight="800" fontSize="7" fill={C.brown}>₹ due</text>
    </Frame>
  ),
  margin: () => (
    <Frame>
      <path d="M14 26l12-12h22v22L36 48z" fill={C.white} stroke={C.ink} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="41" cy="21" r="3" fill={C.ink} />
      <text x="31" y="37" textAnchor="middle" fontFamily={FONT} fontWeight="800" fontSize="11" fill={C.red}>%</text>
      <path d="M12 54l10-6 8 3 14-10" stroke={C.teal} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="sa-dash" />
    </Frame>
  ),
  returns: () => (
    <Frame>
      <rect x="22" y="24" width="20" height="18" rx="3" fill={C.marigold} stroke={C.ink} strokeWidth="1.8" />
      <g className="sa-spin-fast" style={{ animationDuration: "3s", animationDirection: "reverse" }}>
        <path d="M32 12a20 20 0 11-19 14" stroke={C.red} strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M9 22l4 5 5-4" stroke={C.red} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </Frame>
  ),
  reports: () => (
    <Frame>
      {[14, 26, 38].map((x, i) => (
        <rect key={x} x={x} y="18" width="9" height="32" rx="3" fill={[C.line, C.saffron, C.red][i]} className="sa-wave" style={{ transformOrigin: "bottom", animationDelay: `${i * 0.18}s`, animationDuration: "1.8s" }} />
      ))}
      <line x1="10" y1="51" x2="54" y2="51" stroke={C.ink} strokeWidth="2" strokeLinecap="round" />
    </Frame>
  ),
  controls: () => (
    <Frame>
      <rect x="14" y="16" width="36" height="32" rx="5" fill={C.white} stroke={C.ink} strokeWidth="1.8" />
      <rect x="14" y="16" width="36" height="9" rx="4" fill={C.red} />
      {[20, 30, 40].map((x) => [32, 40].map((y) => <rect key={`${x}${y}`} x={x - 3} y={y - 3} width="6" height="5" rx="1" fill={C.line} />))}
      <g transform="translate(46 44)">
        <g className="sa-float" style={{ animationDuration: "1.8s" }}>
          <path d="M-5 -2v-4a5 5 0 0110 0v4" stroke={C.ink} strokeWidth="2" fill="none" />
          <rect x="-8" y="-2" width="16" height="12" rx="3" fill={C.marigold} stroke={C.ink} strokeWidth="1.8" />
        </g>
      </g>
    </Frame>
  ),
};
