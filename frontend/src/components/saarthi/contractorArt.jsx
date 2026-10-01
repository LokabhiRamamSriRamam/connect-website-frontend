import { useSvgId } from "./kit";
import { C, FONT, SERIF } from "./art";

/* Saarthi for Contractors illustrations. Loops are CSS (saarthi.css). */

const SKIN = "#C68B59";
const WALL = "#E3DCCF";
const HIVIS = "#FF9F1C";

function Grad({ id }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor={C.maroon} />
      <stop offset="0.5" stopColor={C.red} />
      <stop offset="1" stopColor={C.saffron} />
    </linearGradient>
  );
}

/* A worker in a hard hat and hi-vis vest, feet at (x, y) */
export function Worker({ x, y, s = 1, vest = HIVIS, className = "", style }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className={className} style={style}>
        <line x1="-4" y1="0" x2="-3" y2="-16" stroke={C.steel} strokeWidth="4" strokeLinecap="round" />
        <line x1="4" y1="0" x2="3" y2="-16" stroke={C.steel} strokeWidth="4" strokeLinecap="round" />
        <rect x="-8" y="-38" width="16" height="24" rx="5" fill={vest} stroke={C.ink} strokeWidth="1.5" />
        <line x1="-8" y1="-27" x2="8" y2="-27" stroke={C.white} strokeWidth="2.5" />
        <circle cx="0" cy="-45" r="6.5" fill={SKIN} />
        <path d="M-9 -47a9 8 0 0118 0z" fill={C.marigold} stroke={C.ink} strokeWidth="1.3" />
        <rect x="-10.5" y="-48" width="21" height="3" rx="1.5" fill={C.marigold} stroke={C.ink} strokeWidth="1" />
      </g>
    </g>
  );
}

/* Tower crane: mast at mx, jib at y=jy, with a load that bobs on the hook */
function Crane({ mx = 270, ground = 440, jy = 60, left = 120, right = 470, hookX = 170, drop = 80 }) {
  const lattice = [];
  for (let y = jy + 12; y < ground; y += 20) lattice.push(y);
  return (
    <g>
      {/* mast */}
      <line x1={mx - 8} y1={jy} x2={mx - 8} y2={ground} stroke={C.marigold} strokeWidth="3" />
      <line x1={mx + 8} y1={jy} x2={mx + 8} y2={ground} stroke={C.marigold} strokeWidth="3" />
      {lattice.map((y, i) => (
        <line
          key={y}
          x1={i % 2 ? mx + 8 : mx - 8}
          y1={y}
          x2={i % 2 ? mx - 8 : mx + 8}
          y2={Math.min(y + 20, ground)}
          stroke={C.marigold}
          strokeWidth="1.5"
        />
      ))}
      {/* apex + ties */}
      <path d={`M${mx - 8} ${jy} L${mx} ${jy - 32} L${mx + 8} ${jy}`} fill="none" stroke={C.marigold} strokeWidth="3" />
      <line x1={mx} y1={jy - 32} x2={left} y2={jy} stroke={C.ink} strokeWidth="1.2" />
      <line x1={mx} y1={jy - 32} x2={right} y2={jy} stroke={C.ink} strokeWidth="1.2" />
      {/* jib */}
      <rect x={left} y={jy} width={right - left} height="10" fill="none" stroke={C.marigold} strokeWidth="2.5" />
      {Array.from({ length: Math.floor((right - left) / 14) }, (_, i) => (
        <line key={i} x1={left + i * 14} y1={jy + 10} x2={left + i * 14 + 14} y2={jy} stroke={C.marigold} strokeWidth="1.3" />
      ))}
      <rect x={right - 34} y={jy + 10} width="30" height="18" rx="2" fill={C.steel} />
      <rect x={mx - 13} y={jy + 10} width="26" height="18" rx="3" fill={C.ink} />
      <rect x={mx - 9} y={jy + 14} width="10" height="8" rx="1.5" fill={C.parchment} />
      {/* trolley + hook */}
      <rect x={hookX - 8} y={jy + 9} width="16" height="7" rx="2" fill={C.ink} />
      <g className="sa-bob">
        <line x1={hookX} y1={jy + 16} x2={hookX} y2={jy + drop} stroke={C.ink} strokeWidth="1.5" />
        <path d={`M${hookX - 16} ${jy + drop + 8} L${hookX} ${jy + drop} L${hookX + 16} ${jy + drop + 8}`} fill="none" stroke={C.ink} strokeWidth="1.3" />
        <rect x={hookX - 20} y={jy + drop + 8} width="40" height="18" rx="2" fill={C.red} stroke={C.ink} strokeWidth="1.5" />
        <line x1={hookX - 20} y1={jy + drop + 17} x2={hookX + 20} y2={jy + drop + 17} stroke={C.maroon} strokeWidth="1" />
        <line x1={hookX} y1={jy + drop + 8} x2={hookX} y2={jy + drop + 17} stroke={C.maroon} strokeWidth="1" />
      </g>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Hero: the building goes up floor by floor while the site's attendance fills in and payroll is ready */

export function SiteHero() {
  const g = useSvgId("sa-site");
  const ring = useSvgId("sa-ring");
  const floors = [0, 1, 2, 3, 4];
  const rows = [
    { n: "Ramesh", t: "Mason", s: "P", bg: C.mint, fg: C.teal },
    { n: "Suresh", t: "Helper", s: "½", bg: "#FFF1D6", fg: "#9A5B00" },
    { n: "Anil", t: "Carpenter", s: "P", bg: C.mint, fg: C.teal },
    { n: "Imran", t: "Electrician", s: "OT", bg: "#FCE3DE", fg: C.maroon },
  ];
  return (
    <svg
      viewBox="0 0 520 500"
      className="sa-anim h-auto w-full"
      role="img"
      aria-label="A building rises floor by floor on a construction site while a site manager's phone marks each worker's attendance and shows the week's payroll is ready."
    >
      <defs>
        <Grad id={g} />
        <path id={ring} d="M0,-37 a37,37 0 1,1 0,74 a37,37 0 1,1 0,-74" />
      </defs>

      {/* spinning stamp */}
      <g transform="translate(70 92)">
        <circle r="48" fill={C.marigold} stroke={C.ink} strokeWidth="2.5" />
        <g className="sa-spin">
          <circle r="46" fill="none" />
          <text fontFamily={FONT} fontWeight="800" fontSize="9.5" letterSpacing="1.2" fill={C.ink}>
            <textPath href={`#${ring}`}>HAAZRI • ADVANCE • PAYROLL •</textPath>
          </text>
        </g>
        <path d="M-15 6a15 13 0 0130 0z" fill={C.red} stroke={C.ink} strokeWidth="1.8" />
        <rect x="-18" y="5" width="36" height="5" rx="2.5" fill={C.red} stroke={C.ink} strokeWidth="1.5" />
        <line x1="0" y1="-7" x2="0" y2="5" stroke={C.ink} strokeWidth="1.5" />
      </g>

      <Crane />

      {/* scaffolding */}
      {[30, 230].map((x) => (
        <line key={x} x1={x} y1="196" x2={x} y2="440" stroke={C.muted} strokeWidth="2" />
      ))}
      {[250, 320, 390].map((y) => (
        <g key={y}>
          <line x1="22" y1={y} x2="38" y2={y} stroke={C.muted} strokeWidth="2" />
          <line x1="222" y1={y} x2="238" y2={y} stroke={C.muted} strokeWidth="2" />
        </g>
      ))}

      {/* building */}
      {floors.map((i) => {
        const y = 440 - 48 * (i + 1);
        return (
          <g key={i} className={`sa-floor sa-s${i + 1}`}>
            <rect x="40" y={y} width="180" height="48" fill={WALL} stroke={C.ink} strokeWidth="2" />
            {[0, 1, 2].map((j) => (
              <rect key={j} x={62 + j * 54} y={y + 12} width="30" height="24" rx="2" fill={i === 4 ? "none" : C.steel} stroke={C.ink} strokeWidth={i === 4 ? 1.2 : 0} strokeDasharray={i === 4 ? "3 3" : undefined} />
            ))}
            {i === 4 &&
              [52, 94, 136, 178, 208].map((x) => <line key={x} x1={x} y1={y} x2={x} y2={y - 16} stroke={C.red} strokeWidth="2.2" strokeLinecap="round" />)}
          </g>
        );
      })}

      {/* ground */}
      <rect x="0" y="440" width="520" height="30" fill={C.parchment} />
      <line x1="0" y1="440" x2="520" y2="440" stroke={C.ink} strokeWidth="2.5" />
      {Array.from({ length: 26 }, (_, i) => (
        <line key={i} x1={i * 20} y1="470" x2={i * 20 + 14} y2="444" stroke={C.line} strokeWidth="2" />
      ))}

      <Worker x={78} y={440} />
      <Worker x={142} y={440} className="sa-float" style={{ animationDuration: "1.4s" }} vest={C.saffron} />
      <Worker x={200} y={440} />

      {/* notification */}
      <g className="sa-s6">
        <rect x="318" y="106" width="184" height="32" rx="16" fill={C.teal} stroke={C.ink} strokeWidth="1.5" />
        <text x="410" y="126" textAnchor="middle" fontFamily={FONT} fontWeight="800" fontSize="10.5" fill={C.white}>✓ 42 payslips sent on WhatsApp</text>
      </g>

      {/* phone */}
      <rect x="326" y="158" width="184" height="320" rx="28" fill={C.maroon} />
      <rect x="318" y="150" width="184" height="320" rx="28" fill={C.ink} />
      <rect x="328" y="162" width="164" height="296" rx="20" fill={C.white} />
      <path d="M328 182a20 20 0 0120-20h124a20 20 0 0120 20v26H328z" fill={`url(#${g})`} />
      <text x="342" y="186" fontFamily={FONT} fontWeight="800" fontSize="11.5" fill={C.white}>Site A · Andheri</text>
      <text x="342" y="200" fontFamily={FONT} fontWeight="600" fontSize="9" fill={C.white} opacity="0.8">Wed, 1 Oct · Manager</text>

      <text x="342" y="236" fontFamily={SERIF} fontWeight="700" fontSize="22" fill={C.ink}>38/42</text>
      <text x="404" y="236" fontFamily={FONT} fontWeight="700" fontSize="10" fill={C.muted}>present</text>

      {rows.map((r, i) => {
        const y = 250 + i * 34;
        return (
          <g key={r.n}>
            <circle cx="350" cy={y + 14} r="10" fill={C.parchment} />
            <text x="350" y={y + 18} textAnchor="middle" fontFamily={FONT} fontWeight="800" fontSize="9.5" fill={C.maroon}>{r.n[0]}</text>
            <text x="366" y={y + 12} fontFamily={FONT} fontWeight="800" fontSize="10.5" fill={C.ink}>{r.n}</text>
            <text x="366" y={y + 24} fontFamily={FONT} fontWeight="600" fontSize="8.5" fill={C.muted}>{r.t}</text>
            <g className={`sa-s${i + 1}`}>
              <rect x="446" y={y + 4} width="36" height="20" rx="10" fill={r.bg} />
              <text x="464" y={y + 18} textAnchor="middle" fontFamily={FONT} fontWeight="800" fontSize="10" fill={r.fg}>{r.s}</text>
            </g>
            <line x1="340" y1={y + 31} x2="482" y2={y + 31} stroke={C.line} />
          </g>
        );
      })}

      <g className="sa-s5">
        <rect x="336" y="392" width="148" height="58" rx="12" fill={`url(#${g})`} />
        <text x="348" y="409" fontFamily={FONT} fontWeight="700" fontSize="9" fill={C.white} opacity="0.85">PAYROLL READY · WEEK 40</text>
        <text x="348" y="432" fontFamily={SERIF} fontWeight="700" fontSize="18" fill={C.white}>₹2,84,600</text>
        <text x="348" y="444" fontFamily={FONT} fontWeight="600" fontSize="8.5" fill={C.white} opacity="0.85">42 workers · paid Saturday</text>
      </g>
    </svg>
  );
}

/* Small site scene for the teaser card on the Saarthi page */
export function SiteMini() {
  return (
    <svg viewBox="0 0 360 240" className="sa-anim h-full w-full" role="img" aria-label="A building going up on a construction site, with the week's payroll ready.">
      {[0, 1, 2].map((i) => {
        const y = 210 - 44 * (i + 1);
        return (
          <g key={i} className={`sa-floor sa-s${i + 1}`}>
            <rect x="40" y={y} width="140" height="44" fill={WALL} stroke={C.ink} strokeWidth="2" />
            {[0, 1, 2].map((j) => (
              <rect key={j} x={56 + j * 42} y={y + 11} width="24" height="22" rx="2" fill={C.steel} />
            ))}
          </g>
        );
      })}
      <Crane mx={250} ground={210} jy={40} left={110} right={330} hookX={150} drop={22} />
      <line x1="0" y1="210" x2="360" y2="210" stroke={C.ink} strokeWidth="2.5" />
      <rect x="0" y="211" width="360" height="29" fill={C.parchment} />
      <Worker x={200} y={210} s={0.9} />
      <g className="sa-s4">
        <rect x="206" y="96" width="136" height="46" rx="12" fill={C.white} stroke={C.ink} strokeWidth="2" />
        <text x="218" y="113" fontFamily={FONT} fontWeight="700" fontSize="9" fill={C.muted}>PAYROLL READY</text>
        <text x="218" y="133" fontFamily={SERIF} fontWeight="700" fontSize="17" fill={C.maroon}>₹2,84,600</text>
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Problem: the kachha register */

export function KachhaRegister() {
  const tallies = [
    ["Ramesh", "|||| |||| ||"],
    ["Suresh", "|||| ||| ½"],
    ["Anil", "|||| |||| |"],
    ["Imran", "|||| |||?"],
    ["Lakshmi", "|||| ||||"],
  ];
  return (
    <svg viewBox="0 0 420 320" className="sa-anim h-auto w-full" role="img" aria-label="A handwritten labour register with tally marks, crossed-out advances and question marks.">
      <g transform="rotate(-3 210 160)">
        <rect x="18" y="30" width="384" height="260" rx="10" fill={C.maroon} />
        <rect x="26" y="24" width="182" height="258" rx="4" fill={C.paper} stroke={C.ink} strokeWidth="1.5" />
        <rect x="212" y="24" width="182" height="258" rx="4" fill={C.paper} stroke={C.ink} strokeWidth="1.5" />
        {Array.from({ length: 10 }, (_, i) => (
          <g key={i}>
            <line x1="30" y1={62 + i * 22} x2="204" y2={62 + i * 22} stroke={C.line} />
            <line x1="216" y1={62 + i * 22} x2="390" y2={62 + i * 22} stroke={C.line} />
          </g>
        ))}
        <line x1="48" y1="28" x2="48" y2="278" stroke={C.red} strokeOpacity="0.4" />
        <line x1="234" y1="28" x2="234" y2="278" stroke={C.red} strokeOpacity="0.4" />

        <text x="54" y="52" fontFamily={SERIF} fontWeight="700" fontSize="14" fill={C.ink}>Haazri — Sept</text>
        {tallies.map(([n, t], i) => (
          <g key={n}>
            <text x="54" y={78 + i * 22} fontFamily={FONT} fontWeight="700" fontSize="11" fill={C.brown}>{n}</text>
            <text x="112" y={78 + i * 22} fontFamily={FONT} fontWeight="600" fontSize="11" fill={C.ink} letterSpacing="-0.5">{t}</text>
          </g>
        ))}
        <text x="54" y="210" fontFamily={FONT} fontWeight="700" fontSize="11" fill={C.brown}>Total days =</text>
        <text x="130" y="210" fontFamily={FONT} fontWeight="800" fontSize="12" fill={C.ink}>112</text>
        <line x1="126" y1="206" x2="154" y2="200" stroke={C.red} strokeWidth="2" />
        <text x="158" y="212" fontFamily={FONT} fontWeight="800" fontSize="12" fill={C.red}>109?</text>

        <text x="240" y="52" fontFamily={SERIF} fontWeight="700" fontSize="14" fill={C.ink}>Advance</text>
        {[
          ["Ramesh", "500", false],
          ["Suresh", "1000", true],
          ["Imran", "2000", false],
          ["Ramesh", "???", false],
        ].map(([n, a, cut], i) => (
          <g key={i}>
            <text x="240" y={78 + i * 22} fontFamily={FONT} fontWeight="700" fontSize="11" fill={C.brown}>{n}</text>
            <text x="310" y={78 + i * 22} fontFamily={FONT} fontWeight="800" fontSize="11" fill={a === "???" ? C.red : C.ink}>₹{a}</text>
            {cut && (
              <>
                <line x1="306" y1={74 + i * 22} x2="346" y2={74 + i * 22} stroke={C.red} strokeWidth="2" />
                <text x="352" y={78 + i * 22} fontFamily={FONT} fontWeight="800" fontSize="11" fill={C.red}>1500?</text>
              </>
            )}
          </g>
        ))}
        <circle cx="330" cy="222" r="26" fill="none" stroke="#B08A5A" strokeOpacity="0.45" strokeWidth="5" />
        <text x="250" y="258" fontFamily={FONT} fontWeight="800" fontSize="11" fill={C.red}>page 14 missing</text>
      </g>

      {/* pencil, scribbling */}
      <g className="sa-sway" style={{ transformOrigin: "100% 100%", animationDuration: "0.9s" }}>
        <g transform="rotate(35 360 120)">
          <rect x="300" y="112" width="100" height="14" rx="2" fill={C.marigold} stroke={C.ink} strokeWidth="1.5" />
          <rect x="386" y="112" width="14" height="14" fill={C.red} stroke={C.ink} strokeWidth="1.5" />
          <path d="M300 112l-16 7 16 7z" fill={WALL} stroke={C.ink} strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M288 117.3l-4 1.7 4 1.7z" fill={C.ink} />
        </g>
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* How-it-works step icons */

function StepFrame({ children }) {
  return (
    <svg viewBox="0 0 72 72" className="sa-anim h-16 w-16" aria-hidden="true">
      <rect x="1" y="1" width="70" height="70" rx="20" fill={C.white} stroke={C.ink} strokeWidth="2" />
      {children}
    </svg>
  );
}

export const StepIcons = {
  add: () => (
    <StepFrame>
      <Worker x={32} y={60} s={0.85} />
      <g transform="translate(52 22)">
        <circle r="10" fill={C.teal} className="sa-pulse" />
        <circle r="10" fill={C.teal} />
        <path d="M-5 0h10M0 -5v10" stroke={C.white} strokeWidth="2.6" strokeLinecap="round" />
      </g>
    </StepFrame>
  ),
  attend: () => (
    <StepFrame>
      <rect x="14" y="16" width="44" height="42" rx="6" fill={C.paper} stroke={C.ink} strokeWidth="1.6" />
      <rect x="14" y="16" width="44" height="10" rx="5" fill={C.red} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} className={`sa-s${i + 1}`} style={{ animationDuration: "6s" }}>
          <circle cx={24 + (i % 2) * 24} cy={36 + Math.floor(i / 2) * 12} r="4.5" fill={i === 3 ? C.marigold : C.teal} />
        </g>
      ))}
    </StepFrame>
  ),
  advance: () => (
    <StepFrame>
      <rect x="10" y="30" width="24" height="18" rx="4" fill={C.maroon} />
      <rect x="26" y="35" width="10" height="8" rx="2" fill={C.marigold} />
      <Worker x={56} y={62} s={0.7} />
      <g className="sa-travel" style={{ "--tx": "18px", "--ty": "-4px", animationDuration: "2s" }}>
        <circle cx="34" cy="26" r="6" fill={C.marigold} stroke={C.ink} strokeWidth="1.4" />
      </g>
    </StepFrame>
  ),
  payroll: () => (
    <StepFrame>
      <rect x="12" y="14" width="48" height="12" rx="4" fill={C.ink} />
      <g className="sa-slide-out" style={{ animationDuration: "2.6s" }}>
        <rect x="18" y="24" width="36" height="32" rx="3" fill={C.white} stroke={C.ink} strokeWidth="1.6" />
        <line x1="24" y1="33" x2="46" y2="33" stroke={C.line} strokeWidth="2.5" />
        <line x1="24" y1="40" x2="40" y2="40" stroke={C.line} strokeWidth="2.5" />
        <text x="47" y="51" textAnchor="end" fontFamily={SERIF} fontWeight="700" fontSize="11" fill={C.teal}>₹</text>
      </g>
    </StepFrame>
  ),
};

/* ------------------------------------------------------------------ */
/* Advances: given on the phone, recovered week by week */

export function AdvanceFlow() {
  const g = useSvgId("sa-adv");
  const weeks = ["W41", "W42", "W43", "W44", "W45"];
  return (
    <svg viewBox="0 0 460 320" className="sa-anim h-auto w-full" role="img" aria-label="An owner gives a worker a ₹5,000 advance from the phone. It is recovered at ₹1,000 a week from the next five payrolls.">
      <defs>
        <Grad id={g} />
      </defs>
      {/* phone */}
      <rect x="24" y="30" width="132" height="200" rx="20" fill={C.ink} />
      <rect x="32" y="40" width="116" height="180" rx="14" fill={C.white} />
      <text x="44" y="64" fontFamily={FONT} fontWeight="800" fontSize="10" fill={C.muted}>GIVE ADVANCE</text>
      <text x="44" y="92" fontFamily={SERIF} fontWeight="700" fontSize="22" fill={C.ink}>₹5,000</text>
      <text x="44" y="112" fontFamily={FONT} fontWeight="700" fontSize="10" fill={C.brown}>to Ramesh · Mason</text>
      <text x="44" y="136" fontFamily={FONT} fontWeight="700" fontSize="9" fill={C.muted}>Recover</text>
      <rect x="44" y="142" width="92" height="22" rx="6" fill={C.parchment} />
      <text x="90" y="157" textAnchor="middle" fontFamily={FONT} fontWeight="800" fontSize="9.5" fill={C.ink}>₹1,000 / week</text>
      <g className="sa-press">
        <rect x="44" y="176" width="92" height="30" rx="15" fill={`url(#${g})`} />
        <text x="90" y="195" textAnchor="middle" fontFamily={FONT} fontWeight="800" fontSize="10.5" fill={C.white}>Give</text>
      </g>

      {/* coins travelling */}
      <line x1="160" y1="130" x2="322" y2="130" stroke={C.muted} strokeWidth="2" strokeDasharray="4 6" className="sa-dash" />
      {[0, 0.6, 1.2].map((d) => (
        <g key={d} className="sa-travel" style={{ "--tx": "150px", "--ty": "0px", animationDelay: `${d}s`, animationDuration: "1.8s" }}>
          <circle cx="168" cy="130" r="10" fill={C.marigold} stroke={C.ink} strokeWidth="1.5" />
          <text x="168" y="134" textAnchor="middle" fontFamily={SERIF} fontWeight="700" fontSize="11" fill={C.ink}>₹</text>
        </g>
      ))}

      <Worker x={370} y={196} s={1.8} />
      <rect x="330" y="206" width="84" height="22" rx="11" fill={C.mint} />
      <text x="372" y="221" textAnchor="middle" fontFamily={FONT} fontWeight="800" fontSize="10" fill={C.teal}>Received ✓</text>

      {/* recovery */}
      <text x="24" y="262" fontFamily={FONT} fontWeight="800" fontSize="10" fill={C.muted}>RECOVERED FROM PAYROLL</text>
      {weeks.map((w, i) => (
        <g key={w}>
          <rect x={24 + i * 84} y="272" width="76" height="24" rx="8" fill={C.parchment} />
          <rect x={24 + i * 84} y="272" width="76" height="24" rx="8" fill={C.teal} className={`sa-s${i + 2}`} />
          <text x={62 + i * 84} y="288" textAnchor="middle" fontFamily={FONT} fontWeight="800" fontSize="10" fill={C.ink} opacity="0.55">{w}</text>
          <text x={62 + i * 84} y="288" textAnchor="middle" fontFamily={FONT} fontWeight="800" fontSize="10" fill={C.white} className={`sa-s${i + 2}`}>−₹1,000</text>
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Payroll machine: attendance goes in, payslips come out */

export function PayrollMachine() {
  const g = useSvgId("sa-pm");
  return (
    <svg viewBox="0 0 440 330" className="sa-anim h-auto w-full" role="img" aria-label="Attendance sheets go into a payroll machine and payslips come out.">
      <defs>
        <Grad id={g} />
      </defs>
      {/* attendance sheet in */}
      <g className="sa-travel" style={{ "--tx": "80px", "--ty": "0px", animationDuration: "3.6s" }}>
        <rect x="12" y="92" width="74" height="92" rx="6" fill={C.white} stroke={C.ink} strokeWidth="1.8" />
        {[0, 1, 2, 3, 4].map((r) =>
          [0, 1, 2, 3, 4].map((c) => (
            <rect key={`${r}${c}`} x={20 + c * 12} y={104 + r * 14} width="8" height="8" rx="2" fill={(r + c) % 4 === 0 ? C.marigold : C.teal} />
          )),
        )}
      </g>

      {/* machine */}
      <rect x="118" y="60" width="200" height="170" rx="22" fill={`url(#${g})`} stroke={C.ink} strokeWidth="2.5" />
      <rect x="112" y="118" width="12" height="60" rx="4" fill={C.ink} />
      <text x="218" y="92" textAnchor="middle" fontFamily={FONT} fontWeight="800" fontSize="13" letterSpacing="3" fill={C.white}>PAYROLL</text>
      <g transform="translate(180 150)">
        <g className="sa-spin-fast">
          <circle r="24" fill={C.marigold} stroke={C.ink} strokeWidth="2" />
          {Array.from({ length: 10 }, (_, i) => (
            <rect key={i} x="-4" y="-32" width="8" height="10" rx="2" fill={C.marigold} stroke={C.ink} strokeWidth="1.5" transform={`rotate(${i * 36})`} />
          ))}
          <circle r="8" fill={C.ink} />
        </g>
      </g>
      <g transform="translate(252 150)">
        <g className="sa-spin-fast" style={{ animationDirection: "reverse" }}>
          <circle r="16" fill={C.paper} stroke={C.ink} strokeWidth="2" />
          {Array.from({ length: 8 }, (_, i) => (
            <rect key={i} x="-3" y="-22" width="6" height="8" rx="2" fill={C.paper} stroke={C.ink} strokeWidth="1.5" transform={`rotate(${i * 45})`} />
          ))}
          <circle r="5" fill={C.ink} />
        </g>
      </g>
      {[146, 162, 178].map((x, i) => (
        <circle key={x} cx={x + 124} cy="94" r="4" fill={i === 1 ? C.marigold : C.mint} className="sa-blink" style={{ animationDelay: `${i * 0.3}s` }} />
      ))}
      <rect x="160" y="222" width="116" height="10" rx="4" fill={C.ink} />

      {/* payslips out */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${170 + i * 10} ${236 + i * 6})`}>
          <g className="sa-slide-out" style={{ animationDelay: `${i * 0.5}s`, animationDuration: "3.6s" }}>
            <rect width="96" height="62" rx="6" fill={C.white} stroke={C.ink} strokeWidth="1.6" />
            <text x="10" y="17" fontFamily={FONT} fontWeight="800" fontSize="8.5" fill={C.muted}>PAYSLIP · W40</text>
            <line x1="10" y1="27" x2="70" y2="27" stroke={C.line} strokeWidth="3" strokeLinecap="round" />
            <line x1="10" y1="36" x2="54" y2="36" stroke={C.line} strokeWidth="3" strokeLinecap="round" />
            <text x="86" y="54" textAnchor="end" fontFamily={SERIF} fontWeight="700" fontSize="13" fill={C.teal}>₹{["5,640", "3,300", "4,675"][i]}</text>
          </g>
        </g>
      ))}

      {/* outputs */}
      {[
        ["WhatsApp payslips", 40],
        ["Bank / UPI sheet", 96],
        ["Cash sheet", 152],
        ["Wage register", 208],
      ].map(([t, y], i) => (
        <g key={t} className={`sa-s${i + 2}`}>
          <rect x="334" y={y} width="102" height="28" rx="14" fill={C.white} stroke={C.ink} strokeWidth="1.5" />
          <text x="385" y={y + 18} textAnchor="middle" fontFamily={FONT} fontWeight="800" fontSize="9.5" fill={C.ink}>{t}</text>
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Many sites: geofenced pins and workers moving between them */

export function SitesMap() {
  const sites = [
    { x: 110, y: 120, name: "Site A · Andheri", info: "42 workers · ₹2.8L/wk", lx: 36, ly: 166 },
    { x: 340, y: 86, name: "Site B · Thane", info: "27 workers · ₹1.7L/wk", lx: 164, ly: 26 },
    { x: 330, y: 250, name: "Site C · Vashi", info: "18 workers · ₹1.1L/wk", lx: 154, ly: 246 },
  ];
  return (
    <svg viewBox="0 0 480 330" className="sa-anim h-auto w-full" role="img" aria-label="A map with three construction sites. Each has a geofence, a headcount and a weekly labour cost, and workers move from one site to another.">
      <rect x="4" y="4" width="472" height="322" rx="24" fill={C.paper} stroke={C.ink} strokeWidth="2" />
      {/* roads */}
      <path d="M4 170C120 150 200 200 300 170S420 120 476 140" stroke={C.line} strokeWidth="14" fill="none" />
      <path d="M200 4C210 110 180 220 230 326" stroke={C.line} strokeWidth="10" fill="none" />
      <path d="M60 326C120 260 260 280 476 250" stroke={C.line} strokeWidth="8" fill="none" />
      {/* water */}
      <path d="M476 180c-40 10-60 40-50 80s30 50 50 60z" fill="#DDEBF0" />

      {/* routes */}
      <path d="M110 120L330 250" stroke={C.red} strokeWidth="2.5" strokeDasharray="5 7" className="sa-dash" fill="none" />
      <path d="M110 120L340 86" stroke={C.red} strokeWidth="2.5" strokeDasharray="5 7" className="sa-dash" fill="none" />
      <g className="sa-travel" style={{ "--tx": "220px", "--ty": "130px", animationDuration: "4s" }}>
        <circle cx="110" cy="120" r="7" fill={HIVIS} stroke={C.ink} strokeWidth="1.5" />
      </g>
      <g className="sa-travel" style={{ "--tx": "230px", "--ty": "-34px", animationDuration: "4s", animationDelay: "1.6s" }}>
        <circle cx="110" cy="120" r="7" fill={HIVIS} stroke={C.ink} strokeWidth="1.5" />
      </g>

      {sites.map((s, i) => (
        <g key={s.name}>
          <circle cx={s.x} cy={s.y} r="34" fill={C.red} fillOpacity="0.07" stroke={C.red} strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx={s.x} cy={s.y} r="10" fill={C.red} className="sa-pulse" style={{ animationDelay: `${i * 0.5}s` }} />
          <g className="sa-float" style={{ animationDelay: `${-i}s` }}>
            <path d={`M${s.x} ${s.y}c-12-16-14-22-14-28a14 14 0 0128 0c0 6-2 12-14 28z`} fill={C.maroon} stroke={C.ink} strokeWidth="1.5" />
            <circle cx={s.x} cy={s.y - 28} r="5" fill={C.marigold} />
          </g>
        </g>
      ))}
      {sites.map((s) => {
        const bx = s.lx;
        const by = s.ly;
        return (
          <g key={`l${s.name}`}>
            <rect x={bx} y={by} width="150" height="40" rx="10" fill={C.white} stroke={C.ink} strokeWidth="1.5" />
            <text x={bx + 10} y={by + 16} fontFamily={FONT} fontWeight="800" fontSize="10.5" fill={C.ink}>{s.name}</text>
            <text x={bx + 10} y={by + 31} fontFamily={FONT} fontWeight="700" fontSize="9.5" fill={C.teal}>{s.info}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Feature icons (animate while their card is hovered) */

const Frame = ({ children }) => (
  <svg viewBox="0 0 64 64" className="sa-anim sa-hover-anim h-14 w-14" aria-hidden="true">
    <rect x="1" y="1" width="62" height="62" rx="18" fill={C.concrete} stroke={C.ink} strokeWidth="1.5" />
    {children}
  </svg>
);

export const SiteIcons = {
  checkin: () => (
    <Frame>
      <rect x="16" y="10" width="26" height="44" rx="6" fill={C.ink} />
      <rect x="19" y="15" width="20" height="32" rx="3" fill={C.white} />
      <circle cx="29" cy="27" r="6" fill={SKIN} />
      <path d="M21 42a8 7 0 0116 0z" fill={HIVIS} />
      <g transform="translate(46 40)">
        <circle r="6" fill={C.red} className="sa-pulse" />
        <path d="M0 8c-6-8-7-11-7-14a7 7 0 0114 0c0 3-1 6-7 14z" fill={C.red} stroke={C.ink} strokeWidth="1.3" />
        <circle cy="-6" r="2.5" fill={C.white} />
      </g>
    </Frame>
  ),
  thekedar: () => (
    <Frame>
      <Worker x={32} y={30} s={0.5} vest={C.red} />
      <path d="M32 32v5M16 37h32M16 37v4M32 37v4M48 37v4" stroke={C.ink} strokeWidth="1.5" fill="none" />
      <g className="sa-float" style={{ animationDuration: "1.8s" }}>
        <Worker x={16} y={58} s={0.38} />
        <Worker x={32} y={58} s={0.38} />
        <Worker x={48} y={58} s={0.38} />
      </g>
    </Frame>
  ),
  piecerate: () => (
    <Frame>
      <rect x="8" y="34" width="48" height="12" rx="2" fill={C.marigold} stroke={C.ink} strokeWidth="1.5" />
      {Array.from({ length: 9 }, (_, i) => (
        <line key={i} x1={12 + i * 5} y1="34" x2={12 + i * 5} y2={i % 2 ? 38 : 41} stroke={C.ink} strokeWidth="1.2" />
      ))}
      <g className="sa-float" style={{ animationDuration: "1.6s" }}>
        <rect x="14" y="12" width="36" height="16" rx="8" fill={C.teal} />
        <text x="32" y="23.5" textAnchor="middle" fontFamily={FONT} fontWeight="800" fontSize="8.5" fill={C.white}>₹/sq ft</text>
      </g>
    </Frame>
  ),
  diary: () => (
    <Frame>
      <rect x="10" y="20" width="44" height="30" rx="6" fill={C.steel} />
      <rect x="22" y="15" width="14" height="7" rx="2" fill={C.steel} />
      <circle cx="32" cy="35" r="10" fill={C.white} stroke={C.ink} strokeWidth="1.5" />
      <circle cx="32" cy="35" r="5" fill={C.steel} />
      <circle cx="47" cy="26" r="2.5" fill={C.marigold} className="sa-blink" />
    </Frame>
  ),
  material: () => (
    <Frame>
      <path d="M14 20q18-6 36 0v28q-18 6-36 0z" fill={C.paper} stroke={C.ink} strokeWidth="1.8" />
      <text x="32" y="38" textAnchor="middle" fontFamily={FONT} fontWeight="800" fontSize="8" fill={C.maroon}>CEMENT</text>
      <g className="sa-travel" style={{ "--tx": "0px", "--ty": "-14px", animationDuration: "1.8s" }}>
        <text x="50" y="58" textAnchor="middle" fontFamily={FONT} fontWeight="800" fontSize="9" fill={C.teal}>−2</text>
      </g>
    </Frame>
  ),
  registers: () => (
    <Frame>
      <rect x="14" y="10" width="36" height="44" rx="4" fill={C.white} stroke={C.ink} strokeWidth="1.6" />
      {[20, 27, 34, 41].map((y) => (
        <line key={y} x1="20" y1={y} x2="44" y2={y} stroke={C.line} strokeWidth="2.5" strokeLinecap="round" />
      ))}
      <g className="sa-float" style={{ animationDuration: "1.8s" }}>
        <circle cx="44" cy="46" r="9" fill="none" stroke={C.red} strokeWidth="2" />
        <text x="44" y="49.5" textAnchor="middle" fontFamily={FONT} fontWeight="800" fontSize="8" fill={C.red}>OK</text>
      </g>
    </Frame>
  ),
  holidays: () => (
    <Frame>
      <rect x="12" y="14" width="40" height="38" rx="5" fill={C.white} stroke={C.ink} strokeWidth="1.6" />
      <rect x="12" y="14" width="40" height="9" rx="4" fill={C.red} />
      <path d="M32 34c-5 0-8 5-8 9h16c0-4-3-9-8-9z" fill={C.saffron} />
      <path d="M32 26c-2 3-2 5 0 7 2-2 2-4 0-7z" fill={C.marigold} className="sa-wave" style={{ transformOrigin: "bottom", animationDuration: "0.8s" }} />
    </Frame>
  ),
  voice: () => (
    <Frame>
      <rect x="26" y="12" width="12" height="22" rx="6" fill={C.red} />
      <path d="M20 28a12 12 0 0024 0M32 40v8" stroke={C.ink} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {[10, 16, 48, 54].map((x, i) => (
        <rect key={x} x={x - 1.5} y="18" width="3" height="16" rx="1.5" fill={C.saffron} className="sa-wave" style={{ animationDelay: `${i * 0.15}s` }} />
      ))}
    </Frame>
  ),
};
