/* Beauty Manager illustrations — bespoke animated SVGs.
   Animation classes: vt-* from ../vital/vital.css, bp-* from ./beautypos.css.
   Client names, amounts and products inside the mock-ups are examples. */
import { useId } from "react";

export const B = {
  plum: "#4A1D3F",
  night: "#2A0F24",
  berry: "#8E2C6B",
  rose: "#E05780",
  blush: "#FCE7EF",
  nude: "#FBF4EF",
  sand: "#F3E6DC",
  gold: "#C9A227",
  goldSoft: "#F4E7B8",
  sage: "#6E9C7E",
  ink: "#2B1626",
  slate: "#5E4B57",
  muted: "#8A7682",
  line: "#EEDFE4",
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

function T({ x, y, size = 11, weight = 700, fill = B.ink, anchor = "start", children, ...rest }) {
  return (
    <text x={x} y={y} fontFamily={FONT} fontSize={size} fontWeight={weight} fill={fill} textAnchor={anchor} {...rest}>
      {children}
    </text>
  );
}

function Check({ cx, cy, r = 8, fill = B.sage, className, style }) {
  return (
    <g className={className} style={style}>
      <circle cx={cx} cy={cy} r={r} fill={fill} />
      <path
        d={`M${cx - r * 0.45} ${cy}l${r * 0.3} ${r * 0.32}l${r * 0.55} -${r * 0.62}`}
        fill="none"
        stroke={B.white}
        strokeWidth={r * 0.28}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

function Sparkle({ cx, cy, r = 8, fill = B.gold, className, style }) {
  return (
    <path
      d={`M${cx} ${cy - r} Q${cx + r * 0.18} ${cy - r * 0.18} ${cx + r} ${cy} Q${cx + r * 0.18} ${cy + r * 0.18} ${cx} ${cy + r} Q${cx - r * 0.18} ${cy + r * 0.18} ${cx - r} ${cy} Q${cx - r * 0.18} ${cy - r * 0.18} ${cx} ${cy - r}Z`}
      fill={fill}
      className={className}
      style={style}
    />
  );
}

/* ---------------------------------------------------------------- brand */

/** A hand mirror with a gold sparkle in the glass. viewBox 100×100. */
export function MirrorMark({ x = 0, y = 0, size = 100, tone = "color", animated = false }) {
  const id = useUid();
  const light = tone === "light";
  return (
    <svg x={x} y={y} width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <linearGradient id={`mf${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={light ? B.white : B.plum} />
          <stop offset="0.6" stopColor={light ? "#F8D3E0" : B.berry} />
          <stop offset="1" stopColor={light ? B.goldSoft : B.rose} />
        </linearGradient>
        <clipPath id={`mc${id}`}>
          <circle cx="50" cy="40" r="25" />
        </clipPath>
      </defs>
      <rect x="44" y="66" width="12" height="30" rx="6" fill={`url(#mf${id})`} />
      <circle cx="50" cy="40" r="34" fill={`url(#mf${id})`} />
      <circle cx="50" cy="40" r="25" fill={light ? B.plum : B.blush} />
      <g clipPath={`url(#mc${id})`}>
        <rect x="30" y="10" width="14" height="60" fill={B.white} opacity="0.55" className={animated ? "bp-glint" : undefined} />
      </g>
      <Sparkle cx={50} cy={40} r={12} fill={B.gold} className={animated ? "bp-twinkle" : undefined} />
      <Sparkle cx={63} cy={29} r={4.5} fill={light ? B.white : B.rose} className={animated ? "bp-twinkle" : undefined} style={animated ? d(0.6) : undefined} />
    </svg>
  );
}

export function BeautyWordmark({ className = "h-9", tone = "color", animated = false }) {
  const ink = tone === "light" ? B.white : B.plum;
  return (
    <svg viewBox="0 0 280 56" className={`vt-anim ${className}`} role="img" aria-label="Beauty Manager">
      <MirrorMark x={0} y={2} size={52} tone={tone} animated={animated} />
      <T x={60} y={39} size={30} weight={800} fill={ink} letterSpacing="-0.6">
        Beauty
        <tspan fill={B.gold} fontSize="15" dx="7" letterSpacing="2">MANAGER</tspan>
      </T>
    </svg>
  );
}

/* ---------------------------------------------------------------- hero (560×460) */

/** An appointment turns into a bill, gets paid by UPI and lands on WhatsApp — on a voice command. */
export function HeroBill() {
  const id = useUid();
  const lines = [
    ["Bridal makeup trial", "₹4,500"],
    ["Hair spa", "₹1,200"],
    ["Argan serum × 2", "₹1,800"],
  ];
  const bars = [10, 20, 14, 24, 16, 22, 12, 18];
  return (
    <svg viewBox="0 0 560 460" className="vt-anim h-full w-full" role="img" aria-label="A spoken command creates a bill from the appointment, it is paid by UPI and the invoice goes to the client on WhatsApp">
      <defs>
        <filter id={`sh${id}`} x="-15%" y="-15%" width="130%" height="140%">
          <feDropShadow dx="0" dy="14" stdDeviation="16" floodColor={B.plum} floodOpacity="0.16" />
        </filter>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={B.plum} />
          <stop offset="0.5" stopColor={B.berry} />
          <stop offset="1" stopColor={B.rose} />
        </linearGradient>
      </defs>

      {/* the voice command */}
      <g className="vt-float">
        <rect x="16" y="18" width="300" height="74" rx="22" fill={`url(#g${id})`} filter={`url(#sh${id})`} />
        {bars.map((h, i) => (
          <rect key={i} x={36 + i * 8} y={55 - h / 2} width="4" height={h} rx="2" fill={B.goldSoft} className="vt-bar" style={d(i * 0.1)} />
        ))}
        <T x={108} y={48} size={12} weight={800} fill={B.white}>“Bill Aanya for the bridal trial,</T>
        <T x={108} y={66} size={12} weight={800} fill={B.white}>hair spa and two serums.”</T>
        <T x={108} y={82} size={9} weight={700} fill="#F8D3E0">Front desk · voice</T>
      </g>

      {/* the bill */}
      <rect x="120" y="112" width="300" height="320" rx="22" fill={B.white} filter={`url(#sh${id})`} />
      <rect x="138" y="128" width="264" height="52" rx="14" fill={B.blush} />
      <T x={154} y={150} size={9.5} weight={800} fill={B.berry} letterSpacing="1">FROM APPOINTMENT · 2:00 PM</T>
      <T x={154} y={168} size={12.5} weight={800} fill={B.ink}>Aanya S. · with Neha</T>
      {lines.map(([k, v], i) => (
        <g key={k} className="vt-reveal" style={d(0.4 + i * 0.5)}>
          <T x={142} y={210 + i * 30} size={12} weight={700} fill={B.slate}>{k}</T>
          <T x={398} y={210 + i * 30} size={12} weight={800} fill={B.ink} anchor="end">{v}</T>
          <line x1="142" y1={220 + i * 30} x2="398" y2={220 + i * 30} stroke={B.line} strokeDasharray="3 4" />
        </g>
      ))}
      <g className="vt-reveal" style={d(1.9)}>
        <rect x="142" y="296" width="256" height="26" rx="13" fill={B.goldSoft} />
        <T x={156} y={313} size={10.5} weight={800} fill={B.plum}>Bridal package · 2 of 5 sessions used</T>
      </g>
      <g className="bp-total">
        <T x={142} y={356} size={13} weight={800} fill={B.ink}>Total</T>
        <T x={398} y={358} size={22} weight={800} fill={B.plum} anchor="end">₹7,500</T>
      </g>
      <g className="bp-paid">
        <rect x="150" y="370" width="132" height="34" rx="10" fill={B.white} stroke={B.sage} strokeWidth="2.5" />
        <T x={216} y={392} size={12} weight={800} fill={B.sage} anchor="middle">PAID · UPI</T>
      </g>

      {/* invoice on WhatsApp */}
      <g className="bp-send">
        <rect x="372" y="250" width="176" height="136" rx="20" fill={B.waBg} filter={`url(#sh${id})`} />
        <rect x="372" y="250" width="176" height="36" rx="20" fill={B.waDark} />
        <rect x="372" y="270" width="176" height="16" fill={B.waDark} />
        <T x={388} y={273} size={10.5} weight={800} fill={B.white}>WhatsApp · Aanya</T>
        <rect x="384" y="296" width="152" height="76" rx="12" fill={B.white} />
        <rect x="396" y="308" width="26" height="32" rx="4" fill={B.blush} />
        <T x={409} y={329} size={8} weight={800} fill={B.berry} anchor="middle">PDF</T>
        <T x={430} y={320} size={10} weight={800} fill={B.ink}>Invoice ₹7,500</T>
        <T x={430} y={334} size={9} weight={700} fill={B.muted}>Thank you! ✨</T>
        <Check cx={518} cy={358} r={8} fill={B.wa} />
      </g>

      <g transform="translate(452 20)" className="vt-float" style={d(1)}>
        <MirrorMark size={88} animated />
      </g>
      <Sparkle cx={70} cy={150} r={12} className="bp-twinkle" />
      <Sparkle cx={96} cy={196} r={6} fill={B.rose} className="bp-twinkle" style={d(0.8)} />
      <Sparkle cx={470} cy={430} r={9} className="bp-twinkle" style={d(1.4)} />
    </svg>
  );
}

/* ---------------------------------------------------------------- the five USPs (320×200) */

function Usp({ children, label }) {
  return (
    <svg viewBox="0 0 320 200" className="vt-anim h-full w-full" role="img" aria-label={label}>
      {children}
    </svg>
  );
}

/** WhatsApp automation — messages that send themselves. */
export function UspWhatsApp() {
  const msgs = ["Appointment tomorrow, 11:00", "₹1,200 payment pending", "Your invoice is attached", "2 package sessions left"];
  return (
    <Usp label="Automatic WhatsApp messages: appointment reminder, payment reminder, invoice and package update">
      <rect x="20" y="10" width="190" height="180" rx="18" fill={B.waBg} />
      <rect x="20" y="10" width="190" height="34" rx="18" fill={B.waDark} />
      <rect x="20" y="28" width="190" height="16" fill={B.waDark} />
      <T x={36} y={32} size={10.5} weight={800} fill={B.white}>Glow Studio</T>
      {msgs.map((m, i) => (
        <g key={m} className="vt-reveal" style={d(i * 0.7)}>
          <rect x="30" y={54 + i * 33} width="170" height="26" rx="8" fill={B.white} />
          <T x={40} y={71 + i * 33} size={8.8} weight={700} fill={B.ink}>{m}</T>
        </g>
      ))}
      <g transform="translate(250 100)">
        <circle r="40" fill={B.blush} />
        <circle r="28" fill={B.wa} className="vt-pulse" />
        <circle r="28" fill={B.wa} />
        <path d="M-4 -14 L-12 3 H0 L-4 16 L12 -4 H0 Z" fill={B.white} />
      </g>
      <T x={250} y={168} size={10.5} weight={800} fill={B.plum} anchor="middle">Automatic</T>
    </Usp>
  );
}

/** Client records — saved as you bill. */
export function UspClientRecord() {
  const rows = [
    ["Visits", "14"],
    ["Last visit", "Hair spa · 12 Sep"],
    ["Prefers", "Neha"],
    ["Total spend", "₹38,200"],
  ];
  return (
    <Usp label="A client profile filling itself in: visits, last service, preferred stylist and total spend">
      <rect x="40" y="12" width="240" height="176" rx="20" fill={B.white} stroke={B.line} />
      <circle cx="78" cy="52" r="22" fill={B.blush} />
      <circle cx="78" cy="46" r="8" fill={B.rose} />
      <path d="M64 66 a14 12 0 0 1 28 0" fill={B.rose} />
      <T x={110} y={48} size={14} weight={800} fill={B.ink}>Aanya S.</T>
      <T x={110} y={65} size={10} weight={700} fill={B.muted}>+91 98••• ••521</T>
      {rows.map(([k, v], i) => (
        <g key={k} className="vt-reveal" style={d(0.4 + i * 0.5)}>
          <T x={60} y={102 + i * 22} size={10.5} weight={700} fill={B.slate}>{k}</T>
          <T x={262} y={102 + i * 22} size={10.5} weight={800} fill={B.ink} anchor="end">{v}</T>
        </g>
      ))}
      <rect x="196" y="22" width="74" height="22" rx="11" fill={B.goldSoft} />
      <T x={233} y={37} size={9} weight={800} fill={B.plum} anchor="middle">auto-saved</T>
    </Usp>
  );
}

/** Invoices — generated and shared on WhatsApp. */
export function UspInvoice() {
  return (
    <Usp label="A bill becomes a PDF invoice and is sent to the client on WhatsApp">
      <rect x="22" y="24" width="96" height="140" rx="12" fill={B.white} stroke={B.line} />
      <T x={36} y={48} size={11} weight={800} fill={B.plum}>Invoice</T>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x="36" y={62 + i * 16} width={[66, 50, 60, 40][i]} height="7" rx="3.5" fill={B.blush} />
      ))}
      <rect x="36" y="134" width="68" height="16" rx="8" fill={B.plum} />
      <T x={70} y={146} size={9} weight={800} fill={B.white} anchor="middle">₹7,500</T>
      <path d="M126 94 H190" stroke={B.rose} strokeWidth="2.5" className="vt-dash" />
      <rect x="136" y="80" width="30" height="28" rx="5" fill={B.rose} className="vt-packet" style={{ "--dx": "40px", "--dy": "0px" }} />
      <rect x="198" y="40" width="102" height="120" rx="16" fill={B.waBg} />
      <rect x="208" y="56" width="82" height="64" rx="10" fill={B.white} />
      <rect x="216" y="64" width="22" height="28" rx="4" fill={B.blush} />
      <T x={227} y={82} size={7.5} weight={800} fill={B.berry} anchor="middle">PDF</T>
      <T x={244} y={76} size={8.5} weight={800} fill={B.ink}>Invoice</T>
      <T x={244} y={88} size={8} weight={700} fill={B.muted}>₹7,500</T>
      <Check cx={278} cy={110} r={7} fill={B.wa} className="vt-reveal" style={d(1.4)} />
      <T x={249} y={146} size={9.5} weight={800} fill={B.waDark} anchor="middle">Sent ✓✓</T>
    </Usp>
  );
}

/** One-time setup — set it up once and you're done. */
export function UspOneTime() {
  const steps = ["Services & prices", "Staff", "Retail products", "WhatsApp connected"];
  return (
    <Usp label="A one-time setup checklist: services, staff, products and WhatsApp, all ticked">
      <rect x="20" y="20" width="176" height="160" rx="18" fill={B.white} stroke={B.line} />
      <T x={38} y={46} size={11.5} weight={800} fill={B.ink}>Setup</T>
      {steps.map((s, i) => (
        <g key={s}>
          <rect x="38" y={60 + i * 28} width="16" height="16" rx="5" fill="none" stroke={B.line} strokeWidth="1.5" />
          <Check cx={46} cy={68 + i * 28} r={8} fill={B.sage} className="vt-pop" style={d(i * 0.3)} />
          <T x={62} y={72 + i * 28} size={10.5} weight={700} fill={B.slate}>{s}</T>
        </g>
      ))}
      <g transform="translate(252 100) rotate(-12)">
        <path d="M-46 -28 H30 L48 0 L30 28 H-46 Z" fill={B.gold} />
        <circle cx="30" cy="0" r="5" fill={B.white} />
        <T x={-8} y={-4} size={11} weight={800} fill={B.plum} anchor="middle">ONE-TIME</T>
        <T x={-8} y={12} size={11} weight={800} fill={B.plum} anchor="middle">SETUP</T>
      </g>
    </Usp>
  );
}

/** No maintenance — nothing to install or look after. */
export function UspNoMaintenance() {
  return (
    <Usp label="No maintenance: the system keeps itself running, with nothing for the salon to look after">
      <g transform="translate(100 100)">
        <circle r="62" fill={B.blush} />
        <g className="vt-spin-slow">
          <path d="M-34 -10 a36 36 0 0 1 60 -18 M34 10 a36 36 0 0 1 -60 18" fill="none" stroke={B.plum} strokeWidth="6" strokeLinecap="round" />
          <path d="M22 -40 v14 h-14 M-22 40 v-14 h14" fill="none" stroke={B.plum} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <Check cx={0} cy={0} r={16} fill={B.sage} />
      </g>
      <g transform="translate(236 70)">
        <circle r="30" fill={B.white} stroke={B.line} />
        <path d="M-12 12 L6 -6 a9 9 0 1 0 6 -6 Z" fill="none" stroke={B.muted} strokeWidth="4" strokeLinejoin="round" />
        <path d="M-24 -24 L24 24" stroke={B.rose} strokeWidth="4.5" strokeLinecap="round" />
      </g>
      <T x={236} y={130} size={11} weight={800} fill={B.ink} anchor="middle">No maintenance</T>
      <T x={236} y={148} size={10} weight={700} fill={B.muted} anchor="middle">Nothing to look</T>
      <T x={236} y={162} size={10} weight={700} fill={B.muted} anchor="middle">after or fix</T>
    </Usp>
  );
}

/* ---------------------------------------------------------------- a day at the salon (480×360) */

function Scene({ children, label }) {
  return (
    <svg viewBox="0 0 480 360" className="vt-anim h-full w-full" role="img" aria-label={label}>
      {children}
    </svg>
  );
}

/** 10:00 — the appointment becomes the bill. */
export function SceneCheckIn() {
  return (
    <Scene label="An appointment card turns straight into a bill with the services already filled in">
      <g className="vt-float">
        <rect x="24" y="60" width="180" height="210" rx="20" fill={B.white} stroke={B.line} />
        <rect x="24" y="60" width="180" height="46" rx="20" fill={B.plum} />
        <rect x="24" y="88" width="180" height="18" fill={B.plum} />
        <T x={44} y={90} size={12} weight={800} fill={B.white}>Appointment</T>
        <T x={44} y={132} size={10} weight={800} fill={B.muted} letterSpacing="1">10:00 · CHAIR 2</T>
        <T x={44} y={154} size={14} weight={800} fill={B.ink}>Ishita M.</T>
        {["Haircut & styling", "Global colour"].map((s, i) => (
          <g key={s}>
            <circle cx="50" cy={184 + i * 26} r="4" fill={B.rose} />
            <T x={62} y={188 + i * 26} size={11.5} weight={700} fill={B.slate}>{s}</T>
          </g>
        ))}
        <T x={44} y={250} size={10.5} weight={800} fill={B.berry}>Stylist: Kavya</T>
      </g>
      <path d="M214 165 H262" stroke={B.rose} strokeWidth="2.5" className="vt-dash" />
      <path d="M256 158 l8 7 -8 7" fill="none" stroke={B.rose} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="276" y="40" width="184" height="250" rx="20" fill={B.white} stroke={B.line} />
      <T x={296} y={72} size={13} weight={800} fill={B.ink}>Bill</T>
      <rect x="378" y="56" width="66" height="22" rx="11" fill={B.blush} />
      <T x={411} y={71} size={9.5} weight={800} fill={B.berry} anchor="middle">auto-filled</T>
      {[["Haircut & styling", "₹900"], ["Global colour", "₹3,200"], ["Stylist", "Kavya"]].map(([k, v], i) => (
        <g key={k} className="vt-reveal" style={d(0.5 + i * 0.5)}>
          <T x={296} y={112 + i * 32} size={11.5} weight={700} fill={B.slate}>{k}</T>
          <T x={442} y={112 + i * 32} size={11.5} weight={800} fill={B.ink} anchor="end">{v}</T>
        </g>
      ))}
      <g className="vt-reveal" style={d(2)}>
        <line x1="296" y1="204" x2="442" y2="204" stroke={B.line} />
        <T x={296} y={236} size={12.5} weight={800} fill={B.ink}>Total</T>
        <T x={442} y={238} size={18} weight={800} fill={B.plum} anchor="end">₹4,100</T>
        <rect x="296" y="252" width="146" height="26" rx="13" fill={B.plum} />
        <T x={369} y={269} size={11} weight={800} fill={B.white} anchor="middle">Collect payment</T>
      </g>
      <T x={240} y={330} size={12} weight={800} fill={B.muted} anchor="middle">Nothing typed twice — the appointment is the bill.</T>
    </Scene>
  );
}

/** 13:00 — a package session is redeemed. */
export function ScenePackage() {
  return (
    <Scene label="A five-session bridal package with the third session being ticked off, and a WhatsApp note to the client">
      <rect x="40" y="40" width="250" height="250" rx="24" fill={B.white} stroke={B.line} />
      <rect x="40" y="40" width="250" height="70" rx="24" fill={B.goldSoft} />
      <rect x="40" y="90" width="250" height="20" fill={B.goldSoft} />
      <T x={62} y={70} size={10} weight={800} fill={B.berry} letterSpacing="1.2">PACKAGE</T>
      <T x={62} y={92} size={16} weight={800} fill={B.plum}>Bridal glow · 5 sessions</T>
      <T x={62} y={140} size={11.5} weight={700} fill={B.slate}>Client: Aanya S.</T>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <circle cx={82 + i * 42} cy="190" r="16" fill={i < 2 ? B.rose : B.blush} stroke={B.rose} strokeWidth="2" />
          {i < 2 && <path d={`M${75 + i * 42} 190 l5 5 9-10`} fill="none" stroke={B.white} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />}
          {i === 2 && (
            <g className="bp-session">
              <circle cx={82 + i * 42} cy="190" r="16" fill={B.rose} />
              <path d={`M${75 + i * 42} 190 l5 5 9-10`} fill="none" stroke={B.white} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          )}
        </g>
      ))}
      <g className="bp-count-a">
        <T x={62} y={250} size={13} weight={800} fill={B.ink}>2 of 5 used · 3 left</T>
      </g>
      <g className="bp-count-b">
        <T x={62} y={250} size={13} weight={800} fill={B.ink}>3 of 5 used · 2 left</T>
      </g>
      <T x={62} y={272} size={10.5} weight={700} fill={B.muted}>Valid till 30 Dec</T>

      <g className="bp-alert">
        <rect x="310" y="120" width="150" height="110" rx="18" fill={B.waBg} />
        <rect x="320" y="132" width="130" height="86" rx="12" fill={B.white} />
        <T x={332} y={154} size={10.5} weight={800} fill={B.ink}>Hi Aanya ✨</T>
        <T x={332} y={172} size={10} weight={700} fill={B.slate}>Session 3 done.</T>
        <T x={332} y={188} size={10} weight={700} fill={B.slate}>2 sessions left —</T>
        <T x={332} y={204} size={10} weight={700} fill={B.slate}>book your next one?</T>
      </g>
      <Sparkle cx={440} cy={86} r={10} className="bp-twinkle" />
    </Scene>
  );
}

/** 16:00 — the front desk speaks; the payment is recorded. */
export function SceneVoice() {
  const bars = [12, 24, 16, 30, 20, 26, 14, 22, 10];
  return (
    <Scene label="The receptionist says in Hinglish to record a ₹5,000 UPI payment, and Beauty Manager confirms it">
      <g className="vt-float">
        <circle cx="96" cy="128" r="34" fill={B.skin} />
        <path d="M60 124 Q60 86 98 88 Q134 90 132 128 Q126 106 102 104 Q78 104 60 124Z" fill={B.night} />
        <path d="M60 128 Q56 170 66 186 L80 150Z M132 128 Q138 170 128 186 L114 150Z" fill={B.night} />
        <path d="M40 300 Q40 196 96 188 Q152 196 152 300 Z" fill={B.rose} />
        <rect x="70" y="198" width="52" height="16" rx="8" fill={B.white} opacity="0.85" />
        <T x={96} y={210} size={8.5} weight={800} fill={B.berry} anchor="middle">FRONT DESK</T>
      </g>
      <rect x="178" y="40" width="284" height="96" rx="22" fill={B.plum} />
      <path d="M182 110 l-16 18 l28 -8z" fill={B.plum} />
      <T x={198} y={74} size={13} weight={800} fill={B.white}>“Neha ke client ka ₹5,000</T>
      <T x={198} y={94} size={13} weight={800} fill={B.white}>UPI payment record karo.”</T>
      {bars.map((h, i) => (
        <rect key={i} x={198 + i * 9} y={118 - h / 4} width="4" height={h / 2} rx="2" fill={B.goldSoft} className="vt-bar" style={d(i * 0.09)} />
      ))}
      <g className="vt-reveal" style={d(1.2)}>
        <rect x="178" y="170" width="284" height="126" rx="22" fill={B.white} stroke={B.line} />
        <Check cx={210} cy={204} r={14} fill={B.sage} />
        <T x={234} y={202} size={13} weight={800} fill={B.ink}>Payment recorded</T>
        <T x={234} y={218} size={10} weight={700} fill={B.muted}>just now</T>
        {[["Amount", "₹5,000"], ["Mode", "UPI"], ["Client of", "Neha"]].map(([k, v], i) => (
          <g key={k}>
            <T x={198} y={250 + i * 18} size={10.5} weight={700} fill={B.slate}>{k}</T>
            <T x={442} y={250 + i * 18} size={10.5} weight={800} fill={B.ink} anchor="end">{v}</T>
          </g>
        ))}
      </g>
      <T x={240} y={334} size={12} weight={800} fill={B.muted} anchor="middle">No menus to learn. New staff are ready on day one.</T>
    </Scene>
  );
}

/** 18:30 — premium retail runs low; the owner is told. */
export function SceneStock() {
  const shelf = [
    ["Argan serum", B.rose, true],
    ["Keratin mask", B.berry, false],
    ["Shampoo X", B.gold, false],
    ["Hair oil", B.sage, false],
  ];
  return (
    <Scene label="Retail stock on a shelf; the argan serum runs low and a reorder alert appears">
      <rect x="30" y="236" width="300" height="14" rx="7" fill={B.sand} />
      <rect x="30" y="250" width="300" height="70" rx="12" fill={B.white} stroke={B.line} />
      {shelf.map(([name, c, low], i) => {
        const x = 54 + i * 70;
        return (
          <g key={name}>
            <rect x={x + 12} y="96" width="22" height="16" rx="4" fill={B.ink} opacity="0.85" />
            <rect x={x} y="112" width="46" height="124" rx="12" fill={B.white} stroke={c} strokeWidth="2.5" />
            <rect x={x + 6} y="122" width="34" height="106" rx="8" fill={c} opacity="0.85" className={low ? "bp-drain" : undefined} />
            <T x={x + 23} y={274} size={9.5} weight={800} fill={B.ink} anchor="middle">{name.split(" ")[0]}</T>
            <T x={x + 23} y={290} size={9.5} weight={700} fill={B.muted} anchor="middle">{name.split(" ")[1]}</T>
            <T x={x + 23} y={308} size={10} weight={800} fill={low ? B.rose : B.sage} anchor="middle">{low ? "3 left" : "In stock"}</T>
          </g>
        );
      })}
      <g className="bp-alert">
        <rect x="300" y="60" width="164" height="132" rx="20" fill={B.plum} />
        <circle cx="326" cy="90" r="12" fill={B.rose} className="vt-blink" />
        <T x={326} y={95} size={13} weight={800} fill={B.white} anchor="middle">!</T>
        <T x={346} y={94} size={11.5} weight={800} fill={B.white}>Low stock</T>
        <T x={318} y={124} size={10.5} weight={700} fill="#F8D3E0">Argan serum · 3 left</T>
        <T x={318} y={142} size={10.5} weight={700} fill="#F8D3E0">Fastest-moving item</T>
        <rect x="318" y="156" width="128" height="24" rx="12" fill={B.gold} />
        <T x={382} y={172} size={10.5} weight={800} fill={B.plum} anchor="middle">Reorder</T>
      </g>
    </Scene>
  );
}

/** 21:00 — the day's summary lands on the owner's phone. */
export function SceneSummary() {
  const staff = [
    ["Neha", 92],
    ["Kavya", 74],
    ["Riya", 58],
  ];
  return (
    <Scene label="The owner's WhatsApp summary at closing: today's revenue, the top service and staff performance">
      <rect x="130" y="10" width="220" height="340" rx="30" fill={B.ink} />
      <svg x="140" y="22" width="200" height="316" overflow="hidden">
        <rect width="200" height="316" rx="22" fill={B.waBg} />
        <rect width="200" height="46" fill={B.waDark} />
        <T x={16} y={29} size={11.5} weight={800} fill={B.white}>Beauty Manager · Daily</T>
        <g className="vt-reveal">
          <rect x="10" y="58" width="180" height="104" rx="12" fill={B.white} />
          <T x={22} y={78} size={9.5} weight={800} fill={B.muted} letterSpacing="1">TODAY · 9:00 PM</T>
          <T x={22} y={106} size={24} weight={800} fill={B.plum}>₹48,600</T>
          <T x={22} y={126} size={10} weight={700} fill={B.sage}>▲ 12% vs last Tuesday</T>
          <T x={22} y={148} size={10} weight={700} fill={B.slate}>Top service: Hair spa</T>
        </g>
        <g className="vt-reveal" style={d(0.8)}>
          <rect x="10" y="172" width="180" height="128" rx="12" fill={B.white} />
          <T x={22} y={192} size={9.5} weight={800} fill={B.muted} letterSpacing="1">STAFF TODAY</T>
          {staff.map(([n, p], i) => (
            <g key={n}>
              <T x={22} y={218 + i * 28} size={10.5} weight={800} fill={B.ink}>{n}</T>
              <rect x="70" y={209 + i * 28} width="108" height="10" rx="5" fill={B.blush} />
              <rect x="70" y={209 + i * 28} width={108 * (p / 100)} height="10" rx="5" fill={i === 0 ? B.rose : B.berry} opacity={i === 0 ? 1 : 0.6} className="vt-fill" style={d(i * 0.2)} />
            </g>
          ))}
        </g>
      </svg>
      <Sparkle cx={84} cy={90} r={14} className="bp-twinkle" />
      <Sparkle cx={396} cy={260} r={10} fill={B.rose} className="bp-twinkle" style={d(0.7)} />
      <g className="vt-float">
        <circle cx="408" cy="120" r="28" fill={B.night} />
        <path d="M398 112 a14 14 0 1 0 18 18 a11 11 0 0 1 -18 -18z" fill={B.goldSoft} />
      </g>
    </Scene>
  );
}
