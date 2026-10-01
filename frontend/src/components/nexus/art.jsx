/* Nexus CRM illustrations — bespoke animated SVGs.
   Animation classes: vt-* from ../vital/vital.css, nx-* from ./nexus.css.
   Names, companies and amounts inside the mock-ups are placeholders. */
import { useId } from "react";

export const N = {
  night: "#0F1024",
  ink: "#14152E",
  deep: "#1E1B4B",
  indigo: "#4338CA",
  electric: "#6366F1",
  violet: "#7C3AED",
  lime: "#B5F23D",
  limeDark: "#5E8F0A",
  amber: "#F5A524",
  rose: "#F0567A",
  paper: "#F7F8FC",
  haze: "#EEF0FF",
  slate: "#4B5068",
  muted: "#6B7088",
  line: "#E2E4F0",
  wa: "#25D366",
  white: "#FFFFFF",
};

const FONT = "Manrope, Inter, sans-serif";
const useUid = () => useId().replace(/:/g, "");
const d = (s) => ({ animationDelay: `${s}s` });

function T({ x, y, size = 11, weight = 700, fill = N.ink, anchor = "start", children, ...rest }) {
  return (
    <text x={x} y={y} fontFamily={FONT} fontSize={size} fontWeight={weight} fill={fill} textAnchor={anchor} {...rest}>
      {children}
    </text>
  );
}

function Check({ cx, cy, r = 8, fill = N.limeDark, className, style }) {
  return (
    <g className={className} style={style}>
      <circle cx={cx} cy={cy} r={r} fill={fill} />
      <path
        d={`M${cx - r * 0.45} ${cy}l${r * 0.3} ${r * 0.32}l${r * 0.55} -${r * 0.62}`}
        fill="none"
        stroke={N.white}
        strokeWidth={r * 0.28}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

/* four-point sparkle = "Nexus did this for you" */
function Spark({ cx, cy, r = 8, fill = N.lime, className, style }) {
  return (
    <path
      d={`M${cx} ${cy - r} C${cx + r * 0.15} ${cy - r * 0.15} ${cx + r * 0.15} ${cy - r * 0.15} ${cx + r} ${cy} C${cx + r * 0.15} ${cy + r * 0.15} ${cx + r * 0.15} ${cy + r * 0.15} ${cx} ${cy + r} C${cx - r * 0.15} ${cy + r * 0.15} ${cx - r * 0.15} ${cy + r * 0.15} ${cx - r} ${cy} C${cx - r * 0.15} ${cy - r * 0.15} ${cx - r * 0.15} ${cy - r * 0.15} ${cx} ${cy - r}Z`}
      fill={fill}
      className={className}
      style={style}
    />
  );
}

/* ---------------------------------------------------------------- channel icons (24×24, stroke = currentColor) */

export const CHANNEL_ICONS = {
  whatsapp: (
    <g>
      <path d="M4 20l1.3-3.9A8 8 0 1 1 8.2 19z" />
      <path d="M9 9.5c.3 1.8 2.2 4 4.5 4.7l1.2-1.1 1.8.9" />
    </g>
  ),
  call: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  meeting: (
    <g>
      <rect x="3" y="6" width="13" height="12" rx="2.5" />
      <path d="M16 10l5-3v10l-5-3" />
    </g>
  ),
  email: (
    <g>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3.5 6.5L12 13l8.5-6.5" />
    </g>
  ),
};

export function ChannelIcon({ name, size = 20, className = "" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {CHANNEL_ICONS[name]}
    </svg>
  );
}

/* ---------------------------------------------------------------- brand */

/** An "N" drawn as a small network: four nodes, the last one lime — the deal that closed. viewBox 100×100. */
export function NexusMark({ x = 0, y = 0, size = 100, tone = "color" }) {
  const id = useUid();
  const light = tone === "light";
  return (
    <svg x={x} y={y} width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <linearGradient id={`nm${id}`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor={light ? "#C7CAFF" : N.indigo} />
          <stop offset="1" stopColor={light ? N.white : N.violet} />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="96" height="96" rx="26" fill={light ? "rgba(255,255,255,0.08)" : N.night} />
      <path d="M28 74 V28 L72 72 V26" fill="none" stroke={`url(#nm${id})`} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="28" cy="74" r="8" fill={light ? N.white : N.electric} />
      <circle cx="28" cy="28" r="8" fill={light ? N.white : N.electric} />
      <circle cx="50" cy="50" r="5.5" fill={light ? N.white : "#A5A8FF"} />
      <circle cx="72" cy="72" r="8" fill={light ? N.white : N.violet} />
      <circle cx="72" cy="26" r="10" fill={N.lime} />
    </svg>
  );
}

export function NexusWordmark({ className = "h-9", tone = "color" }) {
  const ink = tone === "light" ? N.white : N.ink;
  return (
    <svg viewBox="0 0 230 56" className={className} role="img" aria-label="Nexus CRM">
      <NexusMark x={0} y={2} size={52} tone={tone} />
      <T x={64} y={39} size={31} weight={800} fill={ink} letterSpacing="-0.6">
        Nexus
        <tspan fill={tone === "light" ? N.lime : N.indigo} fontSize="17" dx="6" letterSpacing="1.5">CRM</tspan>
      </T>
    </svg>
  );
}

/* ---------------------------------------------------------------- hero (560×460) */

const HERO_STEPS = [
  { ch: "whatsapp", label: "WhatsApp", who: "Rhea · Kapoor Textiles", say: "Hi! Do you take bulk orders?", got: "New lead created" },
  { ch: "call", label: "Call · 6 min", who: "You → Rhea", say: "200 units by March, budget about ₹4L.", got: "Budget + timeline saved" },
  { ch: "meeting", label: "Meeting · 30 min", who: "Demo with Rhea + team", say: "Looks good — send a quote by Friday.", got: "Quote due Fri · reminder set" },
  { ch: "call", label: "Call · 3 min", who: "Rhea → You", say: "Approved. Please send the invoice.", got: "Deal marked Won" },
];
const STAGES = ["New", "Qualified", "Proposal", "Won"];

/** A conversation happens; Nexus logs it; the lead moves to the next stage on its own. */
export function HeroFlow() {
  const id = useUid();
  return (
    <svg viewBox="0 0 560 460" className="vt-anim h-full w-full" role="img" aria-label="Four conversations with a lead — WhatsApp, a call, a meeting and a call — each logged automatically, moving the lead from New to Won">
      <defs>
        <filter id={`sh${id}`} x="-10%" y="-20%" width="120%" height="150%">
          <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor={N.deep} floodOpacity="0.16" />
        </filter>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={N.deep} />
          <stop offset="0.55" stopColor={N.indigo} />
          <stop offset="1" stopColor={N.violet} />
        </linearGradient>
      </defs>

      {/* the conversation */}
      <rect x="40" y="16" width="480" height="132" rx="24" fill={N.white} filter={`url(#sh${id})`} />
      {HERO_STEPS.map((s, i) => (
        <g key={i} className="nx-c4" style={d(i * 2.5)} data-first={i === 0 ? "" : undefined}>
          <circle cx="82" cy="58" r="22" fill={s.ch === "whatsapp" ? N.wa : s.ch === "meeting" ? N.violet : N.indigo} />
          <g transform="translate(70 46)" fill="none" stroke={N.white} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            {CHANNEL_ICONS[s.ch]}
          </g>
          <T x={116} y={52} size={11} weight={800} fill={N.muted} letterSpacing="0.6">{s.label.toUpperCase()}</T>
          <T x={116} y={70} size={13} weight={800} fill={N.ink}>{s.who}</T>
          <rect x="62" y="92" width="436" height="40" rx="14" fill={N.haze} />
          <T x={80} y={117} size={14} weight={700} fill={N.deep}>“{s.say}”</T>
        </g>
      ))}

      {/* Nexus logs it */}
      <path d="M280 150 V196" stroke={N.electric} strokeWidth="2.5" strokeDasharray="4 6" className="vt-dash" />
      <g>
        <rect x="170" y="168" width="220" height="40" rx="20" fill={`url(#g${id})`} />
        <Spark cx={194} cy={188} r={9} className="nx-spark" />
        {HERO_STEPS.map((s, i) => (
          <g key={i} className="nx-c4" style={d(i * 2.5 + 0.4)} data-first={i === 0 ? "" : undefined}>
            <T x={212} y={193} size={12} weight={800} fill={N.white}>{s.got}</T>
          </g>
        ))}
      </g>
      <path d="M280 210 V236" stroke={N.electric} strokeWidth="2.5" strokeDasharray="4 6" className="vt-dash" />

      {/* the pipeline */}
      <rect x="14" y="236" width="532" height="210" rx="24" fill={N.haze} />
      {STAGES.map((st, i) => {
        const x = 24 + i * 130;
        return (
          <g key={st}>
            <rect x={x} y="248" width="122" height="186" rx="16" fill={N.white} opacity="0.7" />
            {st === "Won" && <rect x={x} y="248" width="122" height="186" rx="16" fill={N.lime} opacity="0.35" className="nx-won" />}
            <circle cx={x + 16} cy="268" r="5" fill={[N.electric, N.indigo, N.violet, N.limeDark][i]} />
            <T x={x + 28} y={272} size={11.5} weight={800} fill={N.ink}>{st}</T>
            {[0, 1].map((k) => (
              <rect key={k} x={x + 10} y={340 + k * 44} width="102" height="34" rx="10" fill={N.white} stroke={N.line} />
            ))}
          </g>
        );
      })}
      <g className="nx-slide">
        <rect x="30" y="284" width="110" height="48" rx="12" fill={N.white} stroke={N.indigo} strokeWidth="2.5" filter={`url(#sh${id})`} />
        <circle cx="48" cy="302" r="9" fill={N.rose} />
        <T x={48} y={306} size={9.5} weight={800} fill={N.white} anchor="middle">R</T>
        <T x={62} y={300} size={10.5} weight={800} fill={N.ink}>Rhea Kapoor</T>
        <T x={62} y={314} size={9} weight={700} fill={N.muted}>Kapoor Textiles</T>
        <T x={40} y={326} size={9.5} weight={800} fill={N.indigo}>₹4.0L</T>
        <Spark cx={128} cy={296} r={6} fill={N.lime} className="nx-spark" />
      </g>
    </svg>
  );
}

/* ---------------------------------------------------------------- the logging problem (560×360) */

export function LoggingArt() {
  const fields = ["Contact", "Date & duration", "Outcome", "Notes", "Next step", "Stage"];
  return (
    <svg viewBox="0 0 560 360" className="vt-anim h-full w-full" role="img" aria-label="An empty 'log a call' form, out of date for 23 days, replaced by an interaction Nexus logged on its own">
      <g className="vt-old">
        <rect x="20" y="20" width="300" height="320" rx="20" fill={N.white} stroke={N.line} />
        <T x={42} y={52} size={14} weight={800} fill={N.ink}>Log a call</T>
        <rect x="196" y="36" width="104" height="24" rx="12" fill="#FFF4DD" />
        <T x={248} y={52} size={9.5} weight={800} fill="#A86400" anchor="middle">Updated 23 days ago</T>
        {fields.map((f, i) => (
          <g key={f}>
            <T x={42} y={86 + i * 40} size={9.5} weight={800} fill={N.muted}>{f.toUpperCase()}</T>
            <rect x="42" y={92 + i * 40} width="256" height="20" rx="6" fill={N.paper} stroke={N.line} />
          </g>
        ))}
        <rect x="48" y="96" width="1.6" height="12" fill={N.indigo} className="vt-blink" />
      </g>
      <rect x="30" y="178" width="280" height="4" rx="2" fill={N.rose} className="vt-strike" />

      <g className="vt-fixed">
        <rect x="60" y="80" width="236" height="210" rx="20" fill={N.white} stroke={N.indigo} strokeWidth="2.5" />
        <circle cx="90" cy="112" r="16" fill={N.indigo} />
        <g transform="translate(80 102) scale(0.85)" fill="none" stroke={N.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {CHANNEL_ICONS.call}
        </g>
        <T x={114} y={108} size={11.5} weight={800} fill={N.ink}>Call with Rhea · 6 min</T>
        <T x={114} y={123} size={9.5} weight={700} fill={N.muted}>Logged by Nexus · just now</T>
        {["Needs 200 units by March", "Budget around ₹4L", "Next: send quote by Friday"].map((t, i) => (
          <g key={t}>
            <circle cx="84" cy={156 + i * 28} r="3.5" fill={N.electric} />
            <T x={96} y={160 + i * 28} size={11} weight={700} fill={N.slate}>{t}</T>
          </g>
        ))}
        <rect x="80" y="238" width="196" height="32" rx="16" fill={N.lime} />
        <T x={178} y={259} size={11} weight={800} fill={N.ink} anchor="middle">Stage → Qualified</T>
      </g>

      {/* the rep, doing what they're paid to do */}
      <g className="vt-float">
        <rect x="352" y="60" width="188" height="240" rx="28" fill={N.night} />
        <circle cx="446" cy="132" r="32" fill="#E7B98F" />
        <path d="M414 126 Q416 96 448 98 Q478 100 478 128 Q466 112 446 114 Q428 116 414 126Z" fill={N.ink} />
        <path d="M398 270 Q398 196 446 190 Q494 196 494 270 Z" fill={N.electric} />
        <rect x="470" y="150" width="20" height="34" rx="5" fill={N.white} />
        <T x={446} y={92} size={10} weight={800} fill={N.lime} anchor="middle" letterSpacing="1.4">ON A CALL</T>
      </g>
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${502 + i * 8} 150 q8 16 0 32`} fill="none" stroke={N.lime} strokeWidth="2.5" strokeLinecap="round" className="vt-blink" style={d(i * 0.25)} />
      ))}
    </svg>
  );
}

/* ---------------------------------------------------------------- anatomy of an interaction (560×380) */

export function InteractionAnatomy() {
  const lines = [
    { who: "C", w: 190, t: "We'd need about 200 units…" },
    { who: "Y", w: 150, t: "Sure, by when?" },
    { who: "C", w: 200, t: "Before March — it's for a launch." },
    { who: "Y", w: 170, t: "And a rough budget?" },
    { who: "C", w: 160, t: "Around four lakh." },
    { who: "Y", w: 210, t: "I'll send a quote by Friday." },
    { who: "C", w: 140, t: "Perfect, talk then." },
  ];
  const picks = [
    { row: 0, field: 0, delay: 0 },
    { row: 2, field: 1, delay: 1.2 },
    { row: 4, field: 2, delay: 2.4 },
    { row: 5, field: 3, delay: 3.6 },
  ];
  const fields = [
    ["Need", "200 units"],
    ["Timeline", "Before March"],
    ["Deal value", "₹4,00,000"],
    ["Next step", "Quote · Fri"],
  ];
  return (
    <svg viewBox="0 0 560 380" className="vt-anim h-full w-full" role="img" aria-label="A call transcript; Nexus picks out the need, timeline, deal value and next step, and moves the lead to Qualified">
      <rect x="10" y="10" width="270" height="360" rx="22" fill="#1A1B3A" />
      <circle cx="34" cy="38" r="5" fill={N.rose} className="vt-blink" />
      <T x={46} y={42} size={10} weight={800} fill="#A5A8FF" letterSpacing="1.4">CALL · RECORDED & TRANSCRIBED</T>
      {lines.map((l, i) => {
        const y = 66 + i * 42;
        const pick = picks.find((p) => p.row === i);
        return (
          <g key={i}>
            <circle cx="36" cy={y + 10} r="10" fill={l.who === "C" ? N.rose : N.electric} />
            <T x={36} y={y + 14} size={9.5} weight={800} fill={N.white} anchor="middle">{l.who}</T>
            {pick && <rect x="54" y={y - 2} width={l.w + 10} height="24" rx="8" fill={N.lime} opacity="0.32" className="vt-hl" style={d(pick.delay)} />}
            <T x={60} y={y + 14} size={11.5} weight={650} fill={N.white}>{l.t}</T>
          </g>
        );
      })}

      <rect x="296" y="10" width="254" height="360" rx="22" fill={N.white} stroke={N.line} />
      <Spark cx={322} cy={38} r={9} fill={N.indigo} className="nx-spark" />
      <T x={338} y={43} size={13} weight={800} fill={N.ink}>Interaction</T>
      <T x={316} y={64} size={9.5} weight={700} fill={N.muted}>Saved by Nexus · nobody typed this</T>
      {fields.map(([k, v], i) => {
        const y = 92 + i * 52;
        return (
          <g key={k} className="nx-in" style={d(picks[i].delay + 0.6)}>
            <rect x="316" y={y} width="214" height="42" rx="12" fill={N.haze} />
            <T x={330} y={y + 17} size={9} weight={800} fill={N.indigo} letterSpacing="1">{k.toUpperCase()}</T>
            <T x={330} y={y + 33} size={12} weight={800} fill={N.ink}>{v}</T>
          </g>
        );
      })}
      <g className="nx-in" style={d(4.8)}>
        <rect x="316" y="306" width="214" height="44" rx="22" fill={N.night} />
        <T x={336} y={333} size={11.5} weight={800} fill={N.white}>Stage</T>
        <T x={380} y={333} size={11.5} weight={800} fill={N.muted}>New →</T>
        <rect x="428" y="316" width="90" height="24" rx="12" fill={N.lime} />
        <T x={473} y={332} size={11} weight={800} fill={N.ink} anchor="middle">Qualified</T>
      </g>
    </svg>
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

export function ArtChannels() {
  const chans = [
    ["call", N.indigo, 40],
    ["whatsapp", N.wa, 80],
    ["email", N.amber, 120],
    ["meeting", N.violet, 160],
  ];
  return (
    <Art label="Calls, WhatsApp, email and meetings all flowing into Nexus">
      {chans.map(([k, c, y], i) => (
        <g key={k}>
          <path d={`M74 ${y - 10} C150 ${y - 10}, 160 90, 222 90`} fill="none" stroke={c} strokeWidth="2" strokeOpacity="0.55" className="vt-dash" />
          <circle cx="56" cy={y - 10} r="17" fill={c} />
          <g transform={`translate(${46} ${y - 20}) scale(0.85)`} fill="none" stroke={N.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {CHANNEL_ICONS[k]}
          </g>
          <circle cx="74" cy={y - 10} r="4" fill={c} className="vt-packet" style={{ ...d(i * 0.6), "--dx": "148px", "--dy": `${100 - y}px` }} />
        </g>
      ))}
      <g transform="translate(222 52)">
        <NexusMark size={76} />
      </g>
    </Art>
  );
}

export function ArtSummary() {
  const bars = [10, 22, 16, 28, 18, 24, 12, 20];
  return (
    <Art label="A conversation's audio turned into a three-line summary">
      <rect x="20" y="58" width="104" height="64" rx="20" fill={N.night} />
      {bars.map((h, i) => (
        <rect key={i} x={36 + i * 10} y={90 - h / 2} width="5" height={h} rx="2.5" fill={N.lime} className="vt-bar" style={d(i * 0.1)} />
      ))}
      <Spark cx={150} cy={90} r={11} fill={N.electric} className="nx-spark" />
      <rect x="176" y="28" width="124" height="124" rx="16" fill={N.white} stroke={N.line} strokeWidth="1.5" />
      <T x={190} y={52} size={10} weight={800} fill={N.indigo}>Summary</T>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle cx="194" cy={72 + i * 24} r="3" fill={N.electric} />
          <rect x="204" y={68 + i * 24} width={[80, 66, 74][i]} height="8" rx="4" fill={N.haze} />
          <rect x="204" y={68 + i * 24} width={[80, 66, 74][i]} height="8" rx="4" fill={N.indigo} opacity="0.5" className="vt-line" style={d(i * 0.7)} />
        </g>
      ))}
    </Art>
  );
}

export function ArtAutoStage() {
  return (
    <Art label="A lead moving through three stages by itself">
      {["Qualified", "Proposal", "Won"].map((s, i) => (
        <g key={s}>
          <rect x={24 + i * 92} y="30" width="84" height="120" rx="14" fill={i === 2 ? "#F1FBDF" : N.haze} />
          <T x={36 + i * 92} y={52} size={10.5} weight={800} fill={N.ink}>{s}</T>
        </g>
      ))}
      <g className="nx-mini">
        <rect x="30" y="70" width="72" height="46" rx="10" fill={N.white} stroke={N.indigo} strokeWidth="2" />
        <circle cx="44" cy="86" r="7" fill={N.rose} />
        <rect x="56" y="82" width="38" height="7" rx="3.5" fill={N.line} />
        <rect x="40" y="100" width="34" height="7" rx="3.5" fill={N.indigo} opacity="0.45" />
      </g>
      <Spark cx={292} cy={30} r={10} className="nx-spark" />
    </Art>
  );
}

export function ArtFollowUp() {
  return (
    <Art label="A follow-up reminder created from what was promised on the call">
      <rect x="28" y="26" width="140" height="128" rx="16" fill={N.white} stroke={N.line} strokeWidth="1.5" />
      <rect x="28" y="26" width="140" height="30" rx="16" fill={N.indigo} />
      <rect x="28" y="44" width="140" height="12" fill={N.indigo} />
      <T x={98} y={46} size={11} weight={800} fill={N.white} anchor="middle">This week</T>
      {["M", "T", "W", "T", "F"].map((day, i) => (
        <g key={i}>
          <T x={46 + i * 26} y={80} size={9.5} weight={800} fill={N.muted} anchor="middle">{day}</T>
          <rect x={36 + i * 26} y="88" width="20" height="20" rx="6" fill={i === 4 ? N.lime : N.paper} />
        </g>
      ))}
      <g className="vt-reveal" style={d(0.8)}>
        <rect x="186" y="58" width="116" height="62" rx="16" fill={N.night} />
        <g transform="translate(198 70)" fill="none" stroke={N.lime} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 13h14l-2-3V6.5a5 5 0 0 0-10 0V10z M8 16a2 2 0 0 0 4 0" />
        </g>
        <T x={222} y={82} size={10.5} weight={800} fill={N.white}>Fri · 11:00</T>
        <T x={198} y={106} size={10} weight={700} fill="#A5A8FF">Send Rhea the quote</T>
      </g>
      <path d="M156 98 C 170 98, 172 90, 186 90" fill="none" stroke={N.limeDark} strokeWidth="2" className="vt-dash" />
    </Art>
  );
}

export function ArtTimeline() {
  const items = [
    ["whatsapp", "First message", N.wa],
    ["call", "Discovery call", N.indigo],
    ["meeting", "Demo", N.violet],
    ["email", "Quote sent", N.amber],
  ];
  return (
    <Art label="One customer's timeline, built from their conversations">
      <line x1="58" y1="22" x2="58" y2="160" stroke={N.line} strokeWidth="2" />
      {items.map(([k, label, c], i) => (
        <g key={k + i} className="vt-reveal" style={d(i * 0.6)}>
          <circle cx="58" cy={34 + i * 38} r="13" fill={c} />
          <g transform={`translate(50 ${26 + i * 38}) scale(0.68)`} fill="none" stroke={N.white} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            {CHANNEL_ICONS[k]}
          </g>
          <rect x="82" y={22 + i * 38} width="210" height="26" rx="10" fill={N.white} stroke={N.line} />
          <T x={94} y={39 + i * 38} size={10.5} weight={800} fill={N.ink}>{label}</T>
          <T x={280} y={39 + i * 38} size={9} weight={700} fill={N.muted} anchor="end">auto-logged</T>
        </g>
      ))}
    </Art>
  );
}

export function ArtTrust() {
  const bars = [40, 56, 50, 72, 88];
  return (
    <Art label="A pipeline forecast that is current to the minute">
      <rect x="20" y="18" width="280" height="144" rx="16" fill={N.white} stroke={N.line} strokeWidth="1.5" />
      <T x={36} y={44} size={11} weight={800} fill={N.ink}>Pipeline this quarter</T>
      <circle cx="200" cy="40" r="4" fill={N.limeDark} className="vt-blink" />
      <T x={210} y={44} size={9.5} weight={800} fill={N.limeDark}>updated just now</T>
      <line x1="36" y1="146" x2="284" y2="146" stroke={N.line} />
      {bars.map((h, i) => (
        <rect key={i} x={50 + i * 48} y={146 - h} width="26" height={h} rx="7" fill={i === bars.length - 1 ? N.lime : N.haze} className="vt-grow" style={d(i * 0.12)} />
      ))}
      <path
        d={`M63 ${146 - bars[0] - 10} ${bars.map((h, i) => `L${63 + i * 48} ${146 - h - 10}`).join(" ")}`}
        fill="none"
        stroke={N.indigo}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="420"
        className="vt-ecg"
      />
    </Art>
  );
}
