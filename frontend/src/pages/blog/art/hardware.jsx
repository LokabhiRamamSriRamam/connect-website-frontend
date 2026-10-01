import { Art, Display, Tx, Chip, Person, SKIN, HAIR, Traveller, Spark, Lock, Arrow } from "./shared";
import { Seg, useCycle } from "../kit";

/* Blog 3 — Commercial displays vs consumer TVs. */

const INK = "#191919";
const INDIGO = "#1F30A0";
const BLUE = "#3B6CF6";
const CYAN = "#22B8CF";
const SUN = "#FFB020";
const SKY = "#EAF2FF";
const RED = "#EF4444";
const GREEN = "#4CAF6E";

/* Arc path on a circle (angles in hours on a 24h dial, 0h at top). */
function arc(cx, cy, r, h1, h2) {
  const a = (h) => ((h / 24) * 360 - 90) * (Math.PI / 180);
  const p = (h) => [cx + r * Math.cos(a(h)), cy + r * Math.sin(a(h))];
  const [x1, y1] = p(h1);
  const [x2, y2] = p(h2);
  const large = h2 - h1 > 12 ? 1 : 0;
  return `M${x1} ${y1}A${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
}

/* Duty cycle: 16/7 vs 24/7 against a QSR day and a retail day. */
export function DutyCycleFigure({ inView }) {
  const [m, pick] = useCycle(2, 3600, inView);
  const full = m === 1;
  const cx = 150;
  const cy = 150;
  return (
    <div>
      <div className="border-b-2 border-sb-ink bg-white px-4 py-3">
        <Seg label="Display rating" options={["16/7 rating", "24/7 rating"]} value={m} onChange={pick} />
      </div>
      <Art viewBox="0 0 480 300" label={`A ${full ? "24/7" : "16/7"} rating compared with a QSR open 8:00 AM to 11:00 PM and a retail store open 10:00 AM to 10:00 PM.`}>
        <rect width="480" height="300" fill={SKY} />
        <circle cx={cx} cy={cy} r="118" fill="#fff" stroke={INK} strokeWidth="2.5" />
        {Array.from({ length: 24 }, (_, h) => {
          const a = ((h / 24) * 360 - 90) * (Math.PI / 180);
          return <line key={h} x1={cx + 108 * Math.cos(a)} y1={cy + 108 * Math.sin(a)} x2={cx + (h % 6 ? 112 : 102) * Math.cos(a)} y2={cy + (h % 6 ? 112 : 102) * Math.sin(a)} stroke={INK} strokeWidth={h % 6 ? 1.5 : 3} />;
        })}
        {[["12 AM", 0], ["6 AM", 6], ["12 PM", 12], ["6 PM", 18]].map(([t, h]) => {
          const a = ((h / 24) * 360 - 90) * (Math.PI / 180);
          return (
            <Tx key={t} x={cx + 84 * Math.cos(a)} y={cy + 84 * Math.sin(a) + 4} size={10.5} anchor="middle" fill="#6B7280">
              {t}
            </Tx>
          );
        })}
        {/* rating arc */}
        <path key={m} d={full ? arc(cx, cy, 96, 0, 23.99) : arc(cx, cy, 96, 7, 23)} fill="none" stroke={INDIGO} strokeWidth="12" strokeLinecap="round" className="bl-swap" />
        {/* QSR + retail */}
        <path d={arc(cx, cy, 70, 8, 23)} fill="none" stroke={SUN} strokeWidth="10" strokeLinecap="round" />
        <path d={arc(cx, cy, 52, 10, 22)} fill="none" stroke={CYAN} strokeWidth="10" strokeLinecap="round" />
        <g className="bl-hand" style={{ animationDuration: "8s" }}>
          <line x1={cx} y1={cy} x2={cx} y2={cy - 100} stroke={RED} strokeWidth="2.5" strokeLinecap="round" />
        </g>
        <circle cx={cx} cy={cy} r="6" fill={INK} />
        {/* legend */}
        {[
          [INDIGO, full ? "24/7 rating" : "16/7 rating", full ? "continuous operation" : "up to ~16 h a day"],
          [SUN, "QSR: 8:00 AM → 11:00 PM", "≈ 15 hours a day"],
          [CYAN, "Retail: 10:00 AM → 10:00 PM", "12 hours a day"],
        ].map(([c, t, d], k) => (
          <g key={k}>
            <rect x="296" y={70 + k * 62} width="16" height="16" rx="4" fill={c} />
            <Tx x={320} y={83 + k * 62} size={12.5}>{t}</Tx>
            <Tx x={320} y={101 + k * 62} size={11.5} weight={700} fill="#6B7280">{d}</Tx>
          </g>
        ))}
      </Art>
    </div>
  );
}

/* Brightness: the same screen as ambient light rises. */
const ENVS = [
  { t: "Dark meeting room", amb: 0, need: "Lower brightness may be sufficient" },
  { t: "Indoor office", amb: 0.2, need: "Moderate brightness" },
  { t: "Indoor retail store", amb: 0.4, need: "Moderate-to-high brightness" },
  { t: "Bright retail", amb: 0.6, need: "Higher brightness may be appropriate" },
  { t: "Window-facing", amb: 0.8, need: "Significantly higher brightness may be required" },
  { t: "Outdoor", amb: 1, need: "Specialized outdoor display required" },
];
export function BrightnessFigure({ inView }) {
  const [i, pick] = useCycle(ENVS.length, 2400, inView);
  const e = ENVS[i];
  const bg = `hsl(${40 + e.amb * 5} ${30 + e.amb * 70}% ${12 + e.amb * 80}%)`;
  return (
    <div>
      <div className="border-b-2 border-sb-ink bg-white px-4 py-3">
        <Seg label="Environment" options={ENVS.map((x) => x.t)} value={i} onChange={pick} />
      </div>
      <Art viewBox="0 0 480 300" label={`${e.t}: ${e.need}.`}>
        <rect width="480" height="300" fill={bg} style={{ transition: "fill 0.7s" }} />
        <g className="bl-ease" style={{ opacity: e.amb, transformOrigin: "center" }}>
          <g className="bl-spin" style={{ animationDuration: "30s" }}>
            <g transform="translate(420 50)">
              {Array.from({ length: 12 }, (_, k) => (
                <rect key={k} x="-3" y="-46" width="6" height="18" rx="3" fill={SUN} transform={`rotate(${k * 30})`} />
              ))}
            </g>
          </g>
          <circle cx="420" cy="50" r="22" fill={SUN} />
        </g>
        <Display x={110} y={50} w={260} h={160} glass={INDIGO} mount>
          <Tx x={20} y={50} size={22} fill="#fff">NEW ARRIVALS</Tx>
          <Tx x={20} y={78} size={14} weight={700} fill="#C7D2FE">This week only</Tx>
          <rect x="20" y="96" width="90" height="28" rx="14" fill={SUN} />
          <circle cx="200" cy="90" r="34" fill={CYAN} />
          {/* glare wash */}
          <rect width="260" height="160" fill="#fff" opacity={e.amb * 0.75} className="bl-ease" style={{ transition: "opacity 0.7s" }} />
          <path d="M-20 160L120 -10h50L30 160z" fill="#fff" opacity={e.amb * 0.5} className="bl-ease" style={{ transition: "opacity 0.7s" }} />
        </Display>
        <rect x="40" y="236" width="400" height="12" rx="6" fill="#fff" stroke={INK} strokeWidth="2" />
        <rect x="42" y="238" width={396 * (0.08 + e.amb * 0.92)} height="8" rx="4" fill={SUN} className="bl-ease" style={{ transition: "width 0.7s" }} />
        <Tx x={40} y={228} size={11} weight={800} fill={e.amb > 0.5 ? INK : "#fff"}>AMBIENT LIGHT</Tx>
        <g key={i} className="bl-swap">
          <Chip x={40} y={260} w={400} h={28} fill="#fff" color={INK} stroke={INK} size={12}>
            {e.need}
          </Chip>
        </g>
      </Art>
    </div>
  );
}

/* Viewing angle: shoppers passing to the side of the screen. */
export function ViewingAngleFigure({ inView }) {
  const [m, pick] = useCycle(2, 3800, inView);
  const good = m === 1;
  const views = [
    { x: 70, label: "From the left" },
    { x: 240, label: "Straight on" },
    { x: 410, label: "From the right" },
  ];
  return (
    <div>
      <div className="border-b-2 border-sb-ink bg-white px-4 py-3">
        <Seg label="Panel" options={["Limited viewing angle", "Good viewing angle"]} value={m} onChange={pick} />
      </div>
      <Art viewBox="0 0 480 300" label={good ? "With good viewing angles the image looks the same from the left, the front and the right." : "With limited viewing angles the image washes out when seen from the side."}>
        <rect width="480" height="300" fill={SKY} />
        {/* top-down screen */}
        <rect x="190" y="20" width="100" height="14" rx="4" fill={INK} />
        <path d="M240 34L40 250H440z" fill={good ? "#C7F0D8" : "#FFE0E0"} opacity="0.6" className="bl-ease" style={{ transition: "fill 0.5s" }} />
        <path d={good ? "M240 34L40 250H440z" : "M240 34L170 250H310z"} fill={good ? GREEN : CYAN} opacity="0.25" />
        {views.map((v, k) => {
          const off = k !== 1;
          const wash = off && !good;
          return (
            <g key={v.label}>
              <line x1={v.x} y1={196} x2={240} y2={36} stroke={INK} strokeWidth="1.5" strokeDasharray="4 5" className="bl-dash-slow" />
              <rect x={v.x - 46} y={118} width="92" height="58" rx="5" fill={INK} />
              <g className="bl-ease" style={{ opacity: wash ? 0.35 : 1, transition: "opacity 0.5s" }}>
                <rect x={v.x - 42} y={122} width="84" height="50" rx="3" fill={INDIGO} />
                <rect x={v.x - 34} y={132} width="44" height="8" rx="4" fill="#fff" />
                <circle cx={v.x + 22} cy={156} r="10" fill={SUN} />
              </g>
              {wash && <rect x={v.x - 42} y={122} width="84" height="50" rx="3" fill="#fff" opacity="0.55" />}
              <Person x={v.x} y={290} s={0.7} top={["#914BFA", "#F97316", GREEN][k]} skin={SKIN[k + 1]} hair={HAIR[k]} hairStyle={["long", "short", "curly"][k]} />
              <Tx x={v.x} y={110} size={11.5} anchor="middle">{v.label}</Tx>
            </g>
          );
        })}
      </Art>
    </div>
  );
}

/* Warranty: reading the fine print. */
export function WarrantyFigure() {
  return (
    <Art viewBox="0 0 480 260" label="A magnifying glass over a warranty card, checking whether commercial signage use is covered.">
      <rect width="480" height="260" fill={SKY} />
      <g transform="rotate(-3 200 130)">
        <rect x="70" y="24" width="260" height="212" rx="10" fill="#fff" stroke={INK} strokeWidth="2.5" />
        <Tx x={92} y={58} size={17}>WARRANTY</Tx>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => (
          <rect key={k} x="92" y={76 + k * 18} width={[200, 180, 210, 150, 190, 170, 120, 200][k]} height="6" rx="3" fill="#E5E7EB" />
        ))}
        <rect x="88" y="160" width="220" height="24" rx="5" fill="#FFF3C4" />
        <Tx x={96} y={177} size={12}>Valid for commercial signage use?</Tx>
      </g>
      <g className="bl-drift" style={{ animationDuration: "5s" }}>
        <circle cx="260" cy="170" r="44" fill="#fff" fillOpacity="0.35" stroke={INK} strokeWidth="5" />
        <line x1="292" y1="202" x2="340" y2="246" stroke={INK} strokeWidth="10" strokeLinecap="round" />
      </g>
      <g className="bl-beat">
        <circle cx="410" cy="80" r="34" fill={SUN} stroke={INK} strokeWidth="2.5" />
        <Tx x={410} y={92} size={32} anchor="middle">?</Tx>
      </g>
    </Art>
  );
}

/* 50 stores, one screen down, a service visit on the way. */
export function ServiceFigure({ inView }) {
  const [p] = useCycle(3, 2200, inView);
  const broken = 23;
  const sx = 40 + (broken % 10) * 44;
  const sy = 40 + Math.floor(broken / 10) * 40;
  return (
    <Art viewBox="0 0 480 280" label="Fifty stores; one screen stops working and a service visit fixes it.">
      <rect width="480" height="280" fill={SKY} />
      {Array.from({ length: 50 }, (_, k) => {
        const x = 40 + (k % 10) * 44;
        const y = 40 + Math.floor(k / 10) * 40;
        const isB = k === broken;
        const col = isB ? (p === 2 ? GREEN : RED) : INDIGO;
        return (
          <g key={k}>
            <rect x={x - 14} y={y - 10} width="28" height="20" rx="3" fill={INK} />
            <rect x={x - 12} y={y - 8} width="24" height="16" rx="2" fill={col} className="bl-ease" />
            {isB && p < 2 && (
              <g className="bl-pulse">
                <circle cx={x} cy={y} r="14" fill="none" stroke={RED} strokeWidth="2.5" />
              </g>
            )}
          </g>
        );
      })}
      {/* van */}
      <g className="bl-ease" style={{ transform: `translate(${p === 0 ? 20 : sx - 30}px, ${p === 0 ? 236 : sy + 16}px)`, transition: p === 0 ? "none" : "transform 1.8s cubic-bezier(0.22,1,0.36,1)" }}>
        <rect x="0" y="0" width="44" height="22" rx="4" fill={SUN} stroke={INK} strokeWidth="2" />
        <path d="M44 6h12l8 8v8H44z" fill={SUN} stroke={INK} strokeWidth="2" />
        <circle cx="12" cy="24" r="5" fill={INK} />
        <circle cx="52" cy="24" r="5" fill={INK} />
      </g>
      <g key={p} className="bl-swap">
        <Chip x={300} y={244} w={164} h={26} fill={p === 2 ? GREEN : RED} size={11.5}>
          {["Screen down", "Service on the way", "Back online"][p]}
        </Chip>
      </g>
    </Art>
  );
}

/* Ports: HDMI, USB, Ethernet and RS-232 commands to many screens. */
const CMDS = ["Power on", "Power off", "Input selection", "Status monitoring"];
export function PortsFigure({ inView }) {
  const [c] = useCycle(4, 1800, inView);
  return (
    <Art viewBox="0 0 480 300" label={`An RS-232 control system sends the command "${CMDS[c]}" to several displays.`}>
      <rect width="480" height="300" fill={SKY} />
      {/* back panel */}
      <rect x="20" y="30" width="200" height="140" rx="12" fill="#2B2F36" stroke={INK} strokeWidth="2.5" />
      <Tx x={36} y={54} size={11} fill="#9CA3AF">BACK PANEL</Tx>
      {[
        ["HDMI", 40, 74, 34, 14],
        ["USB", 92, 74, 22, 12],
        ["LAN", 132, 72, 26, 18],
      ].map(([n, x, y, w, h]) => (
        <g key={n}>
          <rect x={x} y={y} width={w} height={h} rx="3" fill="#111" stroke="#9CA3AF" strokeWidth="1.5" />
          <Tx x={x + w / 2} y={y + h + 16} size={10} anchor="middle" fill="#fff">{n}</Tx>
        </g>
      ))}
      <g>
        <path d="M40 124h60l-6 18H46z" fill="#111" stroke={SUN} strokeWidth="2" />
        {[50, 60, 70, 80, 90].map((x) => (
          <circle key={x} cx={x} cy={131} r="2" fill={SUN} />
        ))}
        <Tx x={70} y={160} size={11} anchor="middle" fill={SUN}>RS-232</Tx>
      </g>
      {/* control box */}
      <rect x="150" y="196" width="100" height="60" rx="10" fill={INK} />
      <Tx x={200} y={222} size={11} anchor="middle" fill="#fff">Control</Tx>
      <Tx x={200} y={238} size={11} anchor="middle" fill="#fff">system</Tx>
      <path d="M70 142C70 210 110 226 150 226" fill="none" stroke={SUN} strokeWidth="3" />
      {[0, 1, 2, 3].map((k) => {
        const y = 30 + k * 64;
        const d = `M250 226C320 226 300 ${y + 26} 360 ${y + 26}`;
        const on = c !== 1;
        return (
          <g key={k}>
            <path d={d} fill="none" stroke={INK} strokeWidth="1.5" className="bl-dash" opacity="0.5" />
            <Traveller d={d} r={4.5} fill={SUN} dur={1.4} delay={k * 0.15} />
            <rect x="360" y={y} width="100" height="52" rx="5" fill={INK} />
            <rect x="364" y={y + 4} width="92" height="44" rx="3" fill={on ? (c === 2 ? CYAN : BLUE) : "#2B2B2B"} className="bl-ease" />
            {c === 3 && <circle cx="446" cy={y + 12} r="5" fill={GREEN} />}
          </g>
        );
      })}
      <g key={c} className="bl-swap">
        <Chip x={20} y={262} w={120} h={28} fill={SUN} color={INK} stroke={INK} size={12}>
          {CMDS[c]}
        </Chip>
      </g>
    </Art>
  );
}

/* Lockable cable cover. */
export function CableLockFigure() {
  return (
    <Art viewBox="0 0 480 220" label="A cable cover slides shut and locks over the display's ports.">
      <rect width="480" height="220" fill={SKY} />
      <rect x="60" y="30" width="360" height="150" rx="12" fill="#2B2F36" stroke={INK} strokeWidth="2.5" />
      {[100, 150, 200, 250].map((x) => (
        <rect key={x} x={x} y="110" width="30" height="14" rx="3" fill="#111" stroke="#9CA3AF" strokeWidth="1.5" />
      ))}
      {[115, 165, 215, 265].map((x) => (
        <path key={x} d={`M${x} 124v60`} stroke={INK} strokeWidth="5" strokeLinecap="round" />
      ))}
      <g className="bl-cover">
        <rect x="84" y="94" width="230" height="58" rx="8" fill="#9CA3AF" stroke={INK} strokeWidth="2.5" />
        <Lock x={300} y={122} s={1.1} />
      </g>
      <Tx x={360} y={78} size={13} anchor="middle" fill="#fff">Protected ports</Tx>
    </Art>
  );
}

/* Living room vs retail store. */
export function RoomVsStoreFigure() {
  return (
    <Art viewBox="0 0 480 260" label="A calm living room with one viewer, next to a busy, bright retail store with many customers.">
      <rect width="240" height="260" fill="#2A3166" />
      <rect x="240" width="240" height="260" fill="#FFF8E6" />
      {/* living room */}
      <Tx x={20} y={28} size={13} fill="#fff">LIVING ROOM</Tx>
      <rect x="60" y="62" width="120" height="70" rx="6" fill={INK} />
      <rect x="64" y="66" width="112" height="62" rx="3" fill="#3B4FA8" />
      <rect x="40" y="150" width="160" height="14" rx="4" fill="#5B4636" />
      <path d="M40 240v-40a14 14 0 0 1 14-14h132a14 14 0 0 1 14 14v40z" fill="#7A3E3E" />
      <Person x={120} y={236} s={0.6} top="#F97316" skin={SKIN[0]} hair={HAIR[1]} sit />
      {/* store */}
      <Tx x={260} y={28} size={13}>RETAIL STORE</Tx>
      <g className="bl-spin" style={{ animationDuration: "20s" }}>
        <g transform="translate(452 30)">
          {Array.from({ length: 10 }, (_, k) => (
            <rect key={k} x="-2" y="-28" width="4" height="10" rx="2" fill={SUN} transform={`rotate(${k * 36})`} />
          ))}
        </g>
      </g>
      <circle cx="452" cy="30" r="14" fill={SUN} />
      <rect x="300" y="50" width="120" height="70" rx="6" fill={INK} />
      <rect x="304" y="54" width="112" height="62" rx="3" fill={BLUE} />
      <Tx x={316} y={86} size={14} fill="#fff">NEW SEASON</Tx>
      {[0, 1, 2, 3].map((k) => (
        <g key={k} className="bl-drift" style={{ animationDelay: `${k * 0.5}s` }}>
          <circle cx={290 + k * 40} cy={140 + (k % 2) * 10} r="2.5" fill="#B9A58C" />
        </g>
      ))}
      <g className="bl-walk" style={{ animationDuration: "22s" }}>
        <Person x={-60} y={250} s={0.6} top="#914BFA" skin={SKIN[1]} hair={HAIR[0]} walk />
      </g>
      <Person x={280} y={250} s={0.6} top={GREEN} skin={SKIN[2]} hair={HAIR[2]} hairStyle="long" />
      <Person x={340} y={250} s={0.6} top="#F97316" skin={SKIN[3]} hair={HAIR[0]} hairStyle="bun" pose="point" />
      <Person x={400} y={250} s={0.6} top={INDIGO} skin={SKIN[0]} hair={HAIR[1]} />
      <Person x={450} y={250} s={0.6} top="#EC4899" skin={SKIN[4]} hair={HAIR[3]} hairStyle="curly" />
    </Art>
  );
}

/* Heat: poor vs good installation. */
export function HeatFigure({ inView }) {
  const [m, pick] = useCycle(2, 3800, inView);
  const good = m === 1;
  return (
    <div>
      <div className="border-b-2 border-sb-ink bg-white px-4 py-3">
        <Seg label="Installation" options={["Poor installation", "Good installation"]} value={m} onChange={pick} />
      </div>
      <Art viewBox="0 0 480 280" label={good ? "A well-ventilated installation out of direct sunlight keeps the display cool." : "A display in a closed enclosure, in direct sunlight, next to hot equipment overheats."}>
        <rect width="480" height="280" fill={good ? SKY : "#FFE8DA"} style={{ transition: "fill 0.6s" }} />
        {!good && (
          <g key="sun" className="bl-swap">
            <circle cx="60" cy="50" r="24" fill={SUN} />
            {[0, 1, 2].map((k) => (
              <path key={k} d={`M${84 + k * 10} ${60 + k * 14}L170 ${90 + k * 20}`} stroke={SUN} strokeWidth="4" strokeLinecap="round" />
            ))}
            <rect x="380" y="170" width="70" height="80" rx="6" fill="#4B5563" />
            <Tx x={415} y={214} size={10} anchor="middle" fill="#fff">HOT</Tx>
            <Tx x={415} y={228} size={10} anchor="middle" fill="#fff">EQUIPMENT</Tx>
          </g>
        )}
        {/* enclosure */}
        <rect x="140" y="50" width="200" height="150" rx="10" fill="none" stroke={INK} strokeWidth="4" strokeDasharray={good ? "14 10" : "0"} />
        {good &&
          [0, 1, 2].map((k) => (
            <g key={k} className="bl-rise" style={{ animationDelay: `${k * 0.7}s` }}>
              <path d={`M${190 + k * 50} 48c-6-8 6-12 0-20`} fill="none" stroke={CYAN} strokeWidth="3" strokeLinecap="round" />
            </g>
          ))}
        <Display x={160} y={70} w={160} h={110} glass={INDIGO}>
          <Tx x={14} y={40} size={16} fill="#fff">MENU</Tx>
          <rect x="14" y="54" width="80" height="8" rx="4" fill="#fff" opacity="0.7" />
        </Display>
        {!good &&
          [0, 1, 2, 3].map((k) => (
            <g key={k} className="bl-rise" style={{ animationDelay: `${k * 0.5}s` }}>
              <path d={`M${180 + k * 36} 66c-6-8 6-12 0-20`} fill="none" stroke={RED} strokeWidth="3" strokeLinecap="round" />
            </g>
          ))}
        {/* thermometer */}
        <rect x="372" y="40" width="18" height="100" rx="9" fill="#fff" stroke={INK} strokeWidth="2" />
        <rect x="377" y={good ? 104 : 54} width="8" height={good ? 36 : 86} rx="4" fill={good ? GREEN : RED} className="bl-ease" style={{ transition: "all 0.8s" }} />
        <circle cx="381" cy="146" r="13" fill={good ? GREEN : RED} stroke={INK} strokeWidth="2" />
        <g key={m} className="bl-swap">
          <Chip x={120} y={232} w={240} h={30} fill={good ? GREEN : RED} size={12.5}>
            {good ? "Ventilated, shaded, mounted right" : "Good hardware can't fix this"}
          </Chip>
        </g>
      </Art>
    </div>
  );
}

/* Price tag vs total cost of ownership. */
const COSTS = ["Display", "Media player", "Mount", "Installation", "Cabling", "Software", "Maintenance", "Service visits", "Replacement", "Downtime"];
export function CostFigure({ inView }) {
  const [m, pick] = useCycle(2, 4200, inView);
  const tco = m === 1;
  return (
    <div>
      <div className="border-b-2 border-sb-ink bg-white px-4 py-3">
        <Seg label="View" options={["Purchase price", "Total cost of ownership"]} value={m} onChange={pick} />
      </div>
      <Art viewBox="0 0 480 320" label={tco ? `The real cost includes: ${COSTS.join(", ")}.` : "Example price tags: consumer TV ₹35,000, commercial display ₹55,000."}>
        <rect width="480" height="320" fill={SKY} />
        <Chip x={16} y={14} w={86} h={24} fill={SUN} color={INK} stroke={INK} size={11}>EXAMPLE</Chip>
        {!tco ? (
          <g key="tags" className="bl-swap">
            {[
              ["Consumer TV", "₹35,000", 70, "#E5E7EB"],
              ["Commercial Display", "₹55,000", 270, "#C7D2FE"],
            ].map(([n, pr, x, c]) => (
              <g key={n}>
                <g className="bl-sway" style={{ animationDelay: x === 70 ? "0s" : "0.6s" }}>
                  <path d={`M${x + 20} 70h120l20 30v120H${x}V100z`} fill={c} stroke={INK} strokeWidth="2.5" />
                  <circle cx={x + 80} cy="92" r="7" fill="#fff" stroke={INK} strokeWidth="2" />
                  <Tx x={x + 80} y={150} size={14} anchor="middle">{n}</Tx>
                  <Tx x={x + 80} y={186} size={26} anchor="middle">{pr}</Tx>
                </g>
                <line x1={x + 80} y1="40" x2={x + 80} y2="85" stroke={INK} strokeWidth="2" />
              </g>
            ))}
            <Tx x={240} y={290} size={13} anchor="middle" weight={700} fill="#4B5563">The consumer TV appears cheaper…</Tx>
          </g>
        ) : (
          <g key="tco" className="bl-swap">
            {COSTS.map((c, k) => {
              const col = k % 2 ? 250 : 40;
              const row = Math.floor(k / 2);
              return (
                <g key={c} className="bl-swap" style={{ animationDelay: `${k * 0.07}s` }}>
                  <rect x={col} y={52 + row * 44} width="190" height="34" rx="8" fill={k < 2 ? "#C7D2FE" : k > 6 ? "#FFE0E0" : "#fff"} stroke={INK} strokeWidth="2" />
                  <Tx x={col + 14} y={74 + row * 44} size={13}>{c}</Tx>
                </g>
              );
            })}
            <Tx x={240} y={290} size={13} anchor="middle" weight={700} fill="#4B5563">…but this is what you actually own and operate.</Tx>
          </g>
        )}
      </Art>
    </div>
  );
}

/* The signage stack. */
const LAYERS = [
  ["Digital Signage Software", "#914BFA"],
  ["Content Management", BLUE],
  ["Media Player / Built-in Player", CYAN],
  ["Commercial Display", INDIGO],
  ["Network", "#4B5563"],
];
export function StackFigure() {
  return (
    <Art viewBox="0 0 480 300" label="The signage stack from top to bottom: digital signage software, content management, media player, commercial display, network.">
      <rect width="480" height="300" fill={SKY} />
      {LAYERS.map(([t, c], k) => {
        const y = 30 + k * 50;
        return (
          <g key={t} className="bl-float-sm" style={{ animationDelay: `${k * 0.25}s` }}>
            <path d={`M90 ${y + 10}L240 ${y - 8}L390 ${y + 10}L240 ${y + 28}z`} fill={c} stroke={INK} strokeWidth="2" />
            <path d={`M90 ${y + 10}v10L240 ${y + 38}v-10z`} fill={c} opacity="0.7" stroke={INK} strokeWidth="2" />
            <path d={`M390 ${y + 10}v10L240 ${y + 38}v-10z`} fill={c} opacity="0.5" stroke={INK} strokeWidth="2" />
            <Tx x={240} y={y + 15} size={12} anchor="middle" fill="#fff">{t}</Tx>
          </g>
        );
      })}
      <g className="bl-fall" style={{ animationDuration: "2.6s" }}>
        <circle cx="420" cy="40" r="6" fill={SUN} stroke={INK} strokeWidth="1.5" />
      </g>
      <Arrow x1={420} y1={30} x2={420} y2={260} color="#6B7280" dashed />
      <Tx x={420} y={286} size={11} anchor="middle" fill="#6B7280">what plays, where</Tx>
    </Art>
  );
}

/* Small icon per business environment. */
export function EnvIcon({ type }) {
  const common = { width: 44, height: 44, viewBox: "0 0 44 44", "aria-hidden": true, className: "bl-art inline-block" };
  const icons = {
    qsr: (
      <>
        <rect x="6" y="8" width="32" height="20" rx="3" fill={INK} />
        <rect x="9" y="11" width="26" height="14" rx="1" fill="#E4572E" />
        <rect x="4" y="32" width="36" height="6" rx="2" fill="#8A4B2A" />
      </>
    ),
    retail: (
      <>
        <path d="M10 16h24l-2 22H12z" fill="#914BFA" stroke={INK} strokeWidth="2" />
        <path d="M16 16a6 6 0 0 1 12 0" fill="none" stroke={INK} strokeWidth="2.5" />
      </>
    ),
    office: (
      <>
        <rect x="10" y="6" width="24" height="34" rx="2" fill="#fff" stroke={INK} strokeWidth="2" />
        {[12, 20, 28].map((y) => (
          <rect key={y} x="15" y={y} width="14" height="4" rx="1" fill={BLUE} />
        ))}
      </>
    ),
    mall: (
      <>
        <rect x="4" y="16" width="36" height="22" rx="2" fill="#fff" stroke={INK} strokeWidth="2" />
        <path d="M4 16l18-10 18 10z" fill={SUN} stroke={INK} strokeWidth="2" />
        <rect x="18" y="26" width="8" height="12" fill={INK} />
      </>
    ),
    outdoor: (
      <>
        <circle cx="32" cy="12" r="6" fill={SUN} />
        <rect x="8" y="14" width="20" height="16" rx="2" fill={INK} />
        <rect x="16" y="30" width="4" height="10" fill="#4B5563" />
      </>
    ),
  };
  return <svg {...common}>{icons[type]}</svg>;
}
