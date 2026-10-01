import { Art, Display, Tx, Chip, Clock, Person, SKIN, HAIR, Traveller, Spark, Lock, Arrow } from "./shared";
import { Seg, useCycle } from "../kit";

/* Blog 2 — Multi-location retail campaigns. */

const INK = "#191919";
const VIOLET = "#914BFA";
const PINK = "#FF5FA2";
const INDIGO = "#1F30A0";
const GOLD = "#F5C542";
const LAV = "#F6F1FF";

/* 2 PM vs 2:05 PM: printed signage still in the van, the screen already changed. */
export function RaceFigure({ inView }) {
  const [t] = useCycle(2, 3400, inView);
  const late = t === 1;
  return (
    <Art viewBox="0 0 480 300" label="At 2:05 PM the printed poster is still on its way in a courier van, while the digital screen has already changed.">
      <rect width="480" height="300" fill={LAV} />
      <line x1="0" y1="150" x2="480" y2="150" stroke={INK} strokeWidth="2" strokeDasharray="6 6" />
      <Clock x={440} y={34} r={22} hour={2} minute={late ? 5 : 0} />
      <Tx x={404} y={40} size={14} anchor="end">{late ? "2:05 PM" : "2:00 PM"}</Tx>
      {/* printed lane */}
      <Tx x={16} y={28} size={13} fill="#6B7280">PRINTED</Tx>
      <rect x="20" y="52" width="70" height="56" rx="6" fill="#fff" stroke={INK} strokeWidth="2" />
      <rect x="30" y="40" width="50" height="16" rx="3" fill="#E5E7EB" stroke={INK} strokeWidth="2" />
      <rect x="32" y="92" width="46" height="26" fill="#fff" stroke={INK} strokeWidth="2" className="bl-float-sm" />
      <g className="bl-ease" style={{ transform: `translateX(${late ? 150 : 40}px)`, transition: late ? "transform 3s linear" : "none" }}>
        <rect x="80" y="74" width="66" height="40" rx="5" fill={GOLD} stroke={INK} strokeWidth="2" />
        <path d="M146 84h22l12 14v16h-34z" fill={GOLD} stroke={INK} strokeWidth="2" />
        <circle cx="98" cy="118" r="8" fill={INK} />
        <circle cx="164" cy="118" r="8" fill={INK} />
        <Tx x={113} y={98} size={10} anchor="middle">COURIER</Tx>
      </g>
      <g>
        <rect x="380" y="66" width="80" height="62" rx="4" fill="#fff" stroke={INK} strokeWidth="2" />
        <rect x="390" y="76" width="60" height="42" fill="#E8DCCB" />
        <Tx x={420} y={102} size={11} anchor="middle" fill="#9C8B76">OLD OFFER</Tx>
      </g>
      {/* digital lane */}
      <Tx x={16} y={178} size={13} fill={VIOLET}>DIGITAL</Tx>
      <g className="bl-float">
        <rect x="26" y="192" width="50" height="90" rx="10" fill={INK} />
        <rect x="31" y="202" width="40" height="70" rx="4" fill="#fff" />
        <rect x="36" y="250" width="30" height="12" rx="6" fill={VIOLET} />
      </g>
      <path d="M80 236H370" stroke={VIOLET} strokeWidth="2.5" className="bl-dash" />
      {late && <Traveller d="M80 236H370" r={6} fill={GOLD} dur={0.9} />}
      <Display x={370} y={190} w={96} h={80} glass={late ? PINK : "#E8DCCB"}>
        <g key={t} className="bl-swap">
          <Tx x={44} y={34} size={13} anchor="middle" fill={late ? "#fff" : "#9C8B76"}>
            {late ? "NEW OFFER" : "OLD OFFER"}
          </Tx>
          {late && <Tx x={44} y={54} size={11} anchor="middle" fill="#fff">live now</Tx>}
        </g>
      </Display>
    </Art>
  );
}

/* Who controls what: three tiers, one store screen split into the zones each tier owns. */
const TIERS = [
  { name: "Corporate Team", zone: "Brand campaign", color: INDIGO },
  { name: "Regional Managers", zone: "Regional offer", color: VIOLET },
  { name: "Store Managers", zone: "Outlet announcement", color: PINK },
];
export function PermissionFigure({ inView }) {
  const [i, pick] = useCycle(3, 2800, inView);
  const zones = [
    { x: 0, y: 0, w: 300, h: 120 },
    { x: 0, y: 124, w: 148, h: 70 },
    { x: 152, y: 124, w: 148, h: 70 },
  ];
  return (
    <div>
      <div className="border-b-2 border-sb-ink bg-white px-4 py-3">
        <Seg label="Who is signed in?" options={TIERS.map((t) => t.name)} value={i} onChange={pick} />
      </div>
      <Art viewBox="0 0 480 300" label={`${TIERS[i].name} can edit the ${TIERS[i].zone.toLowerCase()} area of the store screen; the other areas stay locked.`}>
        <rect width="480" height="300" fill={LAV} />
        {/* tier stack */}
        {TIERS.map((t, k) => (
          <g key={t.name} className="bl-ease" style={{ opacity: k === i ? 1 : 0.45 }}>
            <rect x={20 + k * 10} y={40 + k * 66} width={110 - k * 20} height="52" rx="10" fill={t.color} stroke={INK} strokeWidth="2" />
            <Tx x={75} y={63 + k * 66} size={11} anchor="middle" fill="#fff">
              {t.name.split(" ")[0].toUpperCase()}
            </Tx>
            <Tx x={75} y={79 + k * 66} size={10} anchor="middle" fill="#fff" opacity="0.85">
              {t.name.split(" ")[1]}
            </Tx>
          </g>
        ))}
        <Arrow x1={140} y1={66 + i * 66} x2={156} y2={66 + i * 66} />
        <Display x={160} y={40} w={310} h={210} glass="#fff" mount>
          {zones.map((z, k) => {
            const mine = k === i;
            return (
              <g key={k}>
                <rect x={z.x} y={z.y} width={z.w} height={z.h} rx="4" fill={TIERS[k].color} opacity={mine ? 1 : 0.25} className="bl-ease" />
                <Tx x={z.x + 12} y={z.y + 26} size={k ? 11.5 : 15} fill={mine ? "#fff" : INK}>
                  {TIERS[k].zone}
                </Tx>
                {mine ? (
                  <g className="bl-wiggle">
                    <path d={`M${z.x + z.w - 34} ${z.y + z.h - 14}l18-18 6 6-18 18h-6z`} fill={GOLD} stroke={INK} strokeWidth="2" />
                  </g>
                ) : (
                  <Lock x={z.x + z.w - 22} y={z.y + z.h - 24} s={0.9} fill="#fff" />
                )}
              </g>
            );
          })}
        </Display>
        <Tx x={315} y={286} size={12.5} anchor="middle" weight={700} fill="#4B5563">
          Controlled flexibility
        </Tx>
      </Art>
    </div>
  );
}

/* 40 stores: the national sale everywhere, Monsoon Special in Maharashtra, one store's limited-stock offer. */
const LAYERS = [
  { tab: "All 40 stores", line: "END OF SEASON SALE — UP TO 50% OFF" },
  { tab: "Maharashtra stores", line: "MONSOON SPECIAL — SELECTED JACKETS & OUTERWEAR" },
  { tab: "One store", line: "LIMITED STOCK — SPECIAL OFFER" },
];
export function FortyStoresFigure({ inView }) {
  const [s, pick] = useCycle(3, 3000, inView);
  const mh = new Set([0, 1, 2, 8, 9, 10, 16, 17]);
  const one = 9;
  return (
    <div>
      <div className="border-b-2 border-sb-ink bg-white px-4 py-3">
        <Seg label="Campaign layer" options={LAYERS.map((l) => l.tab)} value={s} onChange={pick} />
      </div>
      <Art viewBox="0 0 480 300" label={`${LAYERS[s].tab}: ${LAYERS[s].line}.`}>
        <rect width="480" height="300" fill={LAV} />
        {/* Maharashtra outline */}
        <rect x="24" y="24" width="168" height="128" rx="16" fill="none" stroke={PINK} strokeWidth="2.5" strokeDasharray="6 6" opacity={s >= 1 ? 1 : 0.25} className="bl-ease" />
        <Tx x={30} y={18} size={11} fill={PINK} className="bl-ease" style={{ opacity: s >= 1 ? 1 : 0.3 }}>
          MAHARASHTRA
        </Tx>
        {Array.from({ length: 40 }, (_, k) => {
          const x = 36 + (k % 8) * 54;
          const y = 36 + Math.floor(k / 8) * 50;
          let fill = VIOLET;
          if (s >= 1 && mh.has(k)) fill = PINK;
          if (s >= 2 && k === one) fill = GOLD;
          return (
            <g key={k}>
              <rect x={x} y={y} width="40" height="30" rx="5" fill={INK} />
              <rect x={x + 3} y={y + 3} width="34" height="24" rx="3" fill={fill} className="bl-ease" style={{ transitionDelay: `${(k % 8) * 30}ms` }} />
              {s >= 2 && k === one && (
                <g className="bl-pulse">
                  <circle cx={x + 20} cy={y + 15} r="12" fill="none" stroke={GOLD} strokeWidth="2.5" />
                </g>
              )}
            </g>
          );
        })}
        <g key={s} className="bl-swap">
          <rect x="24" y="262" width="432" height="30" rx="15" fill={[VIOLET, PINK, GOLD][s]} stroke={INK} strokeWidth="2" />
          <Tx x={240} y={282} size={12} anchor="middle" fill={s === 2 ? INK : "#fff"}>
            {LAYERS[s].line}
          </Tx>
        </g>
      </Art>
    </div>
  );
}

/* Template: brand fields locked, approved fields editable. */
const OFFERS = ["MONSOON SPECIAL", "WEEKEND OFFER", "FESTIVE PREVIEW"];
export function TemplateFigure({ inView }) {
  const [o] = useCycle(3, 2400, inView);
  return (
    <Art viewBox="0 0 480 300" label="A brand template: logo, typography, colours and legal text are locked; the offer headline and price are editable by regional teams.">
      <rect width="480" height="300" fill={LAV} />
      <Display x={30} y={24} w={300} h={200} glass={INDIGO}>
        {/* locked logo */}
        <rect x="12" y="12" width="70" height="22" rx="5" fill="#fff" />
        <Tx x={47} y={28} size={11} anchor="middle" fill={INDIGO}>BRAND</Tx>
        {/* editable headline */}
        <rect x="10" y="48" width="230" height="40" rx="6" fill="none" stroke={GOLD} strokeWidth="2.5" strokeDasharray="6 5" className="bl-dash-slow" />
        <g key={o} className="bl-swap">
          <Tx x={20} y={76} size={19} fill="#fff">{OFFERS[o]}</Tx>
        </g>
        <rect x="10" y="98" width="110" height="34" rx="6" fill="none" stroke={GOLD} strokeWidth="2.5" strokeDasharray="6 5" className="bl-dash-slow" />
        <rect x="16" y="104" width="98" height="22" rx="11" fill={PINK} />
        <Tx x={65} y={120} size={12} anchor="middle" fill="#fff">UP TO 50% OFF</Tx>
        <rect x="170" y="100" width="100" height="60" rx="30" fill={VIOLET} />
        {/* locked legal */}
        <rect x="10" y="150" width="150" height="8" rx="4" fill="#fff" opacity="0.5" />
        <rect x="10" y="164" width="110" height="8" rx="4" fill="#fff" opacity="0.5" />
        {/* cursor */}
        <g className="bl-drift">
          <path d="M238 70l14 34 5-13 13-5z" fill="#fff" stroke={INK} strokeWidth="2" />
        </g>
      </Display>
      {/* legend */}
      {[
        ["Brand logo", true],
        ["Typography", true],
        ["Colors", true],
        ["Legal messaging", true],
        ["Offer headline", false],
        ["Price / offer", false],
      ].map(([t, locked], k) => (
        <g key={t}>
          {locked ? <Lock x={358} y={42 + k * 34} s={0.8} /> : <circle cx="358" cy={44 + k * 34} r="8" fill={GOLD} stroke={INK} strokeWidth="2" />}
          <Tx x={374} y={48 + k * 34} size={12} weight={locked ? 700 : 800} fill={locked ? "#4B5563" : INK}>
            {t}
          </Tx>
        </g>
      ))}
      <Chip x={30} y={250} w={300} h={30} fill={INK} size={12.5}>
        Centralized standards + localized execution
      </Chip>
    </Art>
  );
}

/* Flash sale that ends itself at 8 PM. */
export function FlashSaleFigure({ inView }) {
  const [p] = useCycle(3, 2600, inView);
  const times = [[6, 0, "6:00 PM"], [7, 59, "7:59 PM"], [8, 0, "8:00 PM"]];
  const ended = p === 2;
  return (
    <Art viewBox="0 0 480 280" label={ended ? "At 8 PM the flash sale disappears from the screen automatically." : "Flash sale on screen: Extra 20% Off, Selected Products, Today Only."}>
      <rect width="480" height="280" fill={ended ? "#EEE5FF" : "#FFE3F0"} style={{ transition: "fill 0.6s" }} />
      <Clock x={70} y={100} r={44} hour={times[p][0]} minute={times[p][1]} />
      <Tx x={70} y={172} size={16} anchor="middle">{times[p][2]}</Tx>
      <Chip x={20} y={186} w={100} h={26} fill={ended ? INK : PINK} size={11.5}>
        {ended ? "Ended on time" : "Ends 8 PM"}
      </Chip>
      <Display x={150} y={24} w={310} h={200} glass={ended ? INDIGO : PINK} mount>
        <g key={ended ? "e" : "s"} className="bl-swap">
          {ended ? (
            <g>
              <Tx x={20} y={50} size={20} fill="#fff">NEW SEASON</Tx>
              <Tx x={20} y={76} size={20} fill={GOLD}>COLLECTION</Tx>
              <rect x="190" y="30" width="80" height="110" rx="40" fill={VIOLET} />
            </g>
          ) : (
            <g>
              <g className="bl-blink">
                <Tx x={20} y={44} size={22} fill={GOLD}>⚡ FLASH SALE</Tx>
              </g>
              <Tx x={20} y={80} size={20} fill="#fff">Extra 20% Off</Tx>
              <Tx x={20} y={106} size={15} weight={700} fill="#fff">Selected Products</Tx>
              <rect x="20" y="122" width="110" height="30" rx="15" fill="#fff" />
              <Tx x={75} y={142} size={13} anchor="middle" fill={PINK}>Today Only</Tx>
            </g>
          )}
        </g>
      </Display>
      <Tx x={305} y={264} size={12.5} anchor="middle" weight={700} fill="#4B5563">
        No expired offer left on display
      </Tx>
    </Art>
  );
}

/* Audience picker: All Stores → Selected Regions → Specific Stores → Specific Screens. */
const AUD = ["All Stores", "Selected Regions", "Specific Stores", "Specific Screens"];
export function AudienceFigure({ inView }) {
  const [a, pick] = useCycle(4, 2600, inView);
  const regions = [100, 240, 380];
  const lit = (r, st, sc) => {
    if (a === 0) return true;
    if (a === 1) return r === 1;
    if (a === 2) return r === 1 && st === 0;
    return r === 1 && st === 0 && sc === 0;
  };
  return (
    <div>
      <div className="border-b-2 border-sb-ink bg-white px-4 py-3">
        <Seg label="Publish to" options={AUD} value={a} onChange={pick} />
      </div>
      <Art viewBox="0 0 480 280" label={`Campaign assigned to ${AUD[a].toLowerCase()}.`}>
        <rect width="480" height="280" fill={LAV} />
        <rect x="180" y="16" width="120" height="34" rx="10" fill={INK} />
        <Tx x={240} y={38} size={12} anchor="middle" fill="#fff">Campaign</Tx>
        {regions.map((rx, r) => (
          <g key={rx}>
            <path d={`M240 50C240 70 ${rx} 64 ${rx} 84`} fill="none" stroke={INK} strokeWidth="2" opacity={lit(r, 0, 0) || a === 0 ? 1 : 0.25} />
            <rect x={rx - 46} y="84" width="92" height="28" rx="9" fill={a === 1 && r === 1 ? VIOLET : "#fff"} stroke={INK} strokeWidth="2" className="bl-ease" />
            <Tx x={rx} y={103} size={11.5} anchor="middle" fill={a === 1 && r === 1 ? "#fff" : INK}>
              {["North", "West", "South"][r]}
            </Tx>
            {[0, 1].map((st) => {
              const sx = rx - 26 + st * 52;
              return (
                <g key={st}>
                  <path d={`M${rx} 112C${rx} 124 ${sx} 122 ${sx} 136`} fill="none" stroke={INK} strokeWidth="2" opacity="0.6" />
                  <rect x={sx - 22} y="136" width="44" height="24" rx="6" fill={a === 2 && r === 1 && st === 0 ? PINK : "#fff"} stroke={INK} strokeWidth="2" className="bl-ease" />
                  <Tx x={sx} y={152} size={9.5} anchor="middle" fill={a === 2 && r === 1 && st === 0 ? "#fff" : INK}>
                    Store
                  </Tx>
                  {[0, 1].map((sc) => {
                    const cx = sx - 12 + sc * 24;
                    const on = lit(r, st, sc);
                    return (
                      <g key={sc}>
                        <line x1={sx} y1={160} x2={cx} y2={176} stroke={INK} strokeWidth="1.5" opacity="0.5" />
                        <rect x={cx - 10} y="176" width="20" height="16" rx="2" fill={INK} />
                        <rect x={cx - 8} y="178" width="16" height="12" rx="1" fill={on ? GOLD : "#3A3A3A"} className="bl-ease" />
                      </g>
                    );
                  })}
                </g>
              );
            })}
          </g>
        ))}
        <g key={a} className="bl-swap">
          <Chip x={140} y={220} w={200} h={32} fill={VIOLET} stroke={INK} size={13}>
            {AUD[a]}
          </Chip>
        </g>
      </Art>
    </div>
  );
}

/* Diwali: the whole campaign sequence scheduled in advance. */
const DIWALI = [
  { d: "October 20", t: "Diwali Preview" },
  { d: "October 25", t: "Diwali Sale" },
  { d: "November 1", t: "Final Days" },
  { d: "November 5", t: "Campaign Ends" },
];
function Diya({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-22 0h44a22 14 0 0 1-44 0z" fill="#E4572E" stroke={INK} strokeWidth="2" />
      <g className="bl-wiggle">
        <path d="M0-26c8 10 8 18 0 22-8-4-8-12 0-22z" fill={GOLD} stroke={INK} strokeWidth="1.5" />
      </g>
    </g>
  );
}
export function DiwaliFigure({ inView }) {
  const [i, pick] = useCycle(4, 2600, inView);
  return (
    <div>
      <div className="border-b-2 border-sb-ink bg-white px-4 py-3">
        <Seg label="Date" options={DIWALI.map((x) => x.d)} value={i} onChange={pick} />
      </div>
      <Art viewBox="0 0 480 280" label={`${DIWALI[i].d}: ${DIWALI[i].t}.`}>
        <rect width="480" height="280" fill="#2A1450" />
        {[[30, 30], [440, 50], [400, 20], [80, 70], [250, 16]].map(([x, y], k) => (
          <Spark key={k} x={x} y={y} r={5} fill={GOLD} delay={k * 0.4} />
        ))}
        <Display x={100} y={36} w={280} h={150} glass={i === 3 ? "#3A3A55" : "#E4572E"} mount>
          <g key={i} className="bl-swap">
            {i === 3 ? (
              <g>
                <Tx x={136} y={70} size={18} anchor="middle" fill="#fff">Back to regular</Tx>
                <Tx x={136} y={94} size={18} anchor="middle" fill="#fff">content</Tx>
              </g>
            ) : (
              <g>
                <Tx x={18} y={40} size={13} fill={GOLD}>{DIWALI[i].d.toUpperCase()}</Tx>
                <Tx x={18} y={74} size={24} fill="#fff">{DIWALI[i].t}</Tx>
                <Diya x={210} y={104} s={1.1} />
                {i >= 1 && <Diya x={160} y={112} s={0.8} />}
                {i >= 2 && <Diya x={110} y={116} s={0.7} />}
              </g>
            )}
          </g>
        </Display>
        {/* timeline */}
        <line x1="60" y1="232" x2="420" y2="232" stroke="#fff" strokeWidth="3" />
        {DIWALI.map((x, k) => (
          <g key={x.d}>
            <circle cx={60 + k * 120} cy={232} r={k === i ? 12 : 8} fill={k <= i ? GOLD : "#2A1450"} stroke="#fff" strokeWidth="3" className="bl-ease" />
            <Tx x={60 + k * 120} y={264} size={11} anchor="middle" fill="#fff">
              {x.d.replace("October", "Oct").replace("November", "Nov")}
            </Tx>
          </g>
        ))}
      </Art>
    </div>
  );
}

/* Different stores, different campaigns. */
export function SegmentsFigure() {
  const stores = [
    { n: "Mumbai Premium Stores", t: ["New Premium", "Collection"], c: INDIGO, awning: "#C9B6FF" },
    { n: "Tier-2 Stores", t: ["Value Deals", "& Combos"], c: VIOLET, awning: GOLD },
    { n: "Outlet Stores", t: ["Clearance —", "Limited Stock"], c: PINK, awning: "#FFC2DC" },
  ];
  return (
    <Art viewBox="0 0 480 260" label="Three store types showing different content: Mumbai premium stores show New Premium Collection, tier-2 stores show Value Deals & Combos, outlet stores show Clearance — Limited Stock.">
      <rect width="480" height="260" fill={LAV} />
      {stores.map((s, k) => {
        const x = 16 + k * 154;
        return (
          <g key={s.n}>
            <rect x={x} y="60" width="140" height="160" fill="#fff" stroke={INK} strokeWidth="2" />
            <path d={`M${x - 6} 60h152l-10-26H${x + 4}z`} fill={s.awning} stroke={INK} strokeWidth="2" />
            {[0, 1, 2, 3, 4].map((j) => (
              <path key={j} d={`M${x + 4 + j * 28} 34l-6 26h14l4-26z`} fill="#fff" opacity="0.5" />
            ))}
            <g className="bl-glow" style={{ animationDelay: `${k * 0.6}s` }}>
              <rect x={x + 14} y="74" width="112" height="70" rx="6" fill={INK} />
              <rect x={x + 18} y="78" width="104" height="62" rx="3" fill={s.c} />
            </g>
            <Tx x={x + 70} y={104} size={12.5} anchor="middle" fill="#fff">{s.t[0]}</Tx>
            <Tx x={x + 70} y={122} size={12.5} anchor="middle" fill="#fff">{s.t[1]}</Tx>
            <rect x={x + 50} y="160" width="40" height="60" fill={s.awning} stroke={INK} strokeWidth="2" />
            <Tx x={x + 70} y={244} size={11} anchor="middle">{s.n}</Tx>
          </g>
        );
      })}
    </Art>
  );
}

/* Store journey: entrance → inside → near checkout → checkout. */
const STOPS = [
  { tab: "At the Entrance", t: "NEW SEASON COLLECTION", x: 70, y: 220, sx: 30, sy: 160 },
  { tab: "Inside the Store", t: "PREMIUM LINEN — NEW ARRIVAL", x: 170, y: 120, sx: 120, sy: 40 },
  { tab: "Near the Checkout", t: "ADD A BELT FOR ₹499", x: 330, y: 120, sx: 300, sy: 40 },
  { tab: "At Checkout", t: "JOIN OUR MEMBERSHIP PROGRAM", x: 380, y: 210, sx: 410, sy: 140 },
];
export function JourneyFigure({ inView }) {
  const [i, pick] = useCycle(4, 2800, inView);
  const st = STOPS[i];
  return (
    <div>
      <div className="border-b-2 border-sb-ink bg-white px-4 py-3">
        <Seg label="Where is the shopper?" options={STOPS.map((x) => x.tab)} value={i} onChange={pick} />
      </div>
      <Art viewBox="0 0 480 300" label={`${st.tab}, the screen shows: ${st.t}.`}>
        <rect width="480" height="300" fill="#FBFAF7" />
        {/* floor plan */}
        <rect x="16" y="20" width="448" height="240" rx="8" fill="#fff" stroke={INK} strokeWidth="3" />
        <rect x="40" y="252" width="70" height="16" fill="#FBFAF7" />
        <Tx x={75} y={286} size={11} anchor="middle" fill="#6B7280">ENTRANCE</Tx>
        {/* racks */}
        {[150, 210, 270].map((x) => (
          <rect key={x} x={x} y="150" width="40" height="70" rx="4" fill="#EEE5FF" stroke={INK} strokeWidth="1.5" />
        ))}
        <rect x="380" y="230" width="70" height="26" rx="4" fill="#C9B6FF" stroke={INK} strokeWidth="1.5" />
        <Tx x={415} y={248} size={10} anchor="middle">TILL</Tx>
        {/* path */}
        <path d="M75 250C80 180 140 130 170 125S300 110 330 125 380 180 380 215" fill="none" stroke={VIOLET} strokeWidth="2" className="bl-dash" opacity="0.5" />
        {/* screens */}
        {STOPS.map((s, k) => (
          <g key={s.tab}>
            <rect x={s.sx} y={s.sy} width="60" height="38" rx="4" fill={INK} />
            <rect x={s.sx + 3} y={s.sy + 3} width="54" height="32" rx="2" fill={k === i ? PINK : "#D1D5DB"} className="bl-ease" />
            {k === i && (
              <g className="bl-pulse">
                <circle cx={s.sx + 30} cy={s.sy + 19} r="18" fill="none" stroke={PINK} strokeWidth="2" />
              </g>
            )}
          </g>
        ))}
        {/* shopper */}
        <g className="bl-ease" style={{ transform: `translate(${st.x}px, ${st.y}px)`, transition: "transform 1.2s cubic-bezier(0.22,1,0.36,1)" }}>
          <circle r="14" fill={VIOLET} stroke={INK} strokeWidth="2.5" />
          <circle cx="0" cy="-3" r="5" fill="#F2C6A0" />
        </g>
        <g key={i} className="bl-swap">
          <Chip x={64} y={268} w={352} h={26} fill={PINK} stroke={INK} size={11.5}>
            {st.t}
          </Chip>
        </g>
      </Art>
    </div>
  );
}

/* Example before/after comparison (illustrative numbers from the article). */
export function FunnelFigure({ inView }) {
  const [p] = useCycle(2, 3600, inView);
  const after = p === 1;
  const conv = after ? 215 : 180;
  const rate = after ? "21.5%" : "18%";
  return (
    <Art viewBox="0 0 480 280" label={`Example: store traffic 1,000 visitors; conversions ${conv}; conversion rate ${rate}.`}>
      <rect width="480" height="280" fill={LAV} />
      <Chip x={16} y={14} w={86} h={24} fill={GOLD} color={INK} stroke={INK} size={11}>EXAMPLE</Chip>
      <Tx x={464} y={32} size={14} anchor="end">{after ? "After Campaign" : "Before Dynamic Campaign"}</Tx>
      {/* visitors bar */}
      <Tx x={24} y={82} size={12} fill="#4B5563">Store traffic</Tx>
      <rect x="150" y="66" width="300" height="24" rx="12" fill={INDIGO} />
      <Tx x={440} y={83} size={12.5} anchor="end" fill="#fff">1,000 visitors</Tx>
      {/* conversions bar */}
      <Tx x={24} y={132} size={12} fill="#4B5563">Conversions</Tx>
      <rect x="150" y="116" width="300" height="24" rx="12" fill="#fff" stroke={INK} strokeWidth="1.5" />
      <rect x="150" y="116" width={(conv / 1000) * 300 * 4} height="24" rx="12" fill={after ? PINK : VIOLET} className="bl-ease" style={{ transition: "width 1s cubic-bezier(0.22,1,0.36,1), fill 0.4s" }} />
      <Tx x={160 + (conv / 1000) * 1200} y={133} size={12.5} fill={INK}>
        {conv}
      </Tx>
      {/* rate */}
      <Tx x={24} y={196} size={12} fill="#4B5563">Conversion rate</Tx>
      <g key={p} className="bl-flip">
        <Tx x={150} y={206} size={40} fill={after ? PINK : VIOLET}>
          {rate}
        </Tx>
      </g>
      <Tx x={24} y={256} size={11.5} weight={700} fill="#6B7280">
        Bar lengths scaled ×4 for visibility. Signage alone may not cause every change.
      </Tx>
    </Art>
  );
}

/* A/B test across store groups. */
export function ABFigure() {
  return (
    <Art viewBox="0 0 480 250" label="Store group A shows 20% OFF while store group B shows BUY 2, GET 1 FREE, and the results are compared.">
      <rect width="480" height="250" fill={LAV} />
      {[
        ["Store Group A", "20% OFF", VIOLET, 20],
        ["Store Group B", "BUY 2, GET 1 FREE", PINK, 270],
      ].map(([n, t, c, x], k) => (
        <g key={n}>
          <Tx x={x + 95} y={26} size={13} anchor="middle">{n}</Tx>
          {[0, 1, 2].map((j) => (
            <rect key={j} x={x + j * 66} y="40" width="58" height="44" rx="5" fill="#fff" stroke={INK} strokeWidth="1.5" />
          ))}
          <Display x={x + 10} y={96} w={170} h={86} glass={c}>
            <Tx x={79} y={k ? 46 : 50} size={k ? 13 : 24} anchor="middle" fill="#fff">
              {t}
            </Tx>
          </Display>
        </g>
      ))}
      {/* balance */}
      <g className="bl-wiggle" style={{ animationDuration: "3.6s" }}>
        <line x1="190" y1="214" x2="290" y2="214" stroke={INK} strokeWidth="4" strokeLinecap="round" />
        <circle cx="190" cy="222" r="10" fill={VIOLET} stroke={INK} strokeWidth="2" />
        <circle cx="290" cy="222" r="10" fill={PINK} stroke={INK} strokeWidth="2" />
      </g>
      <path d="M240 214l-12 30h24z" fill={INK} />
      <Tx x={240} y={200} size={12} anchor="middle">Compare</Tx>
    </Art>
  );
}

/* Regional manager on the move, publishing from a phone. */
export function OnTheMoveFigure() {
  return (
    <Art viewBox="0 0 480 260" label="A regional manager walking between stores publishes an approved campaign from a phone to selected store screens.">
      <rect width="480" height="260" fill={LAV} />
      {/* road */}
      <rect x="0" y="206" width="480" height="54" fill="#E5E7EB" />
      <line x1="0" y1="233" x2="480" y2="233" stroke="#fff" strokeWidth="4" strokeDasharray="20 16" className="bl-dash" />
      <g className="bl-walk" style={{ animationDuration: "16s" }}>
        <Person x={0} y={214} s={0.95} top={INDIGO} skin={SKIN[2]} hair={HAIR[0]} walk pose="hold">
          <rect x="10" y="-62" width="10" height="16" rx="2" fill={INK} />
        </Person>
      </g>
      {[0, 1, 2].map((k) => {
        const x = 270 + k * 70;
        const d = `M140 80C200 30 ${x} 30 ${x + 26} 92`;
        return (
          <g key={k}>
            <path d={d} fill="none" stroke={VIOLET} strokeWidth="2" className="bl-dash-slow" opacity="0.5" />
            <Traveller d={d} r={5} fill={GOLD} dur={2.4} delay={k * 0.3} />
            <rect x={x} y="96" width="54" height="80" fill="#fff" stroke={INK} strokeWidth="2" />
            <rect x={x + 6} y="104" width="42" height="28" rx="3" fill={INK} />
            <g className="bl-glow" style={{ animationDelay: `${k * 0.3 + 1}s` }}>
              <rect x={x + 9} y="107" width="36" height="22" rx="2" fill={PINK} />
            </g>
            <rect x={x + 18} y="146" width="18" height="30" fill={VIOLET} />
          </g>
        );
      })}
      <g className="bl-float">
        <rect x="104" y="60" width="40" height="70" rx="8" fill={INK} />
        <rect x="108" y="68" width="32" height="54" rx="3" fill="#fff" />
        <rect x="112" y="104" width="24" height="10" rx="5" fill={VIOLET} />
      </g>
      <Tx x={124} y={150} size={11.5} anchor="middle">Approved campaign</Tx>
    </Art>
  );
}
