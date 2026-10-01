import { C, Svg, T, Screen, Phone, Promo, Check, Pin } from "./kit";

const d = (s) => ({ animationDelay: `${s}s` });

/* 01 — phone → control centre → several screens change together */
export function RemoteUpdate() {
  const screens = [
    { y: 34, path: "M226 150 C 252 150, 250 70, 282 70" },
    { y: 122, path: "M226 150 L 282 150" },
    { y: 210, path: "M226 150 C 252 150, 250 238, 282 238" },
  ];
  return (
    <Svg label="A phone publishes an update through Screen Bazaar and three screens change at once">
      {/* phone */}
      <g className="sb-float">
        <Phone x={34} y={92} w={64} h={116}>
          <T x={8} y={18} size={8} weight={800}>All branches</T>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={8} y={26 + i * 14} width={8} height={8} rx={2} fill={C.violet} />
              <rect x={20} y={28 + i * 14} width={24} height={4} rx={2} fill={C.line} />
            </g>
          ))}
          <g className="sb-press">
            <rect x={6} y={72} width={42} height={16} rx={8} fill={C.indigo} />
            <T x={27} y={83} size={7.5} weight={800} fill={C.white} anchor="middle">Publish</T>
          </g>
        </Phone>
      </g>
      {/* phone → hub */}
      <path d="M100 150 H 174" stroke={C.violet} strokeWidth="2.5" fill="none" className="sb-dash" />
      {/* hub */}
      <circle cx="200" cy="150" r="27" fill={C.white} stroke={C.lilac} strokeWidth="6" />
      <path d="M188 160h24a8 8 0 0 0 0-16 11 11 0 0 0-21-3 8 8 0 0 0-3 19z" fill={C.violet} />
      {/* hub → screens */}
      {screens.map((s, i) => (
        <g key={i}>
          <path d={s.path} stroke={C.violet} strokeWidth="2.5" fill="none" className="sb-dash" />
          <circle r="4.5" fill={C.indigo}>
            <animateMotion dur="3s" repeatCount="indefinite" path={s.path} begin={`${i * 0.15}s`} />
          </circle>
          <Screen x={284} y={s.y} w={92} h={60} r={6}>
            <g className="sb-c2" style={d(i * 0.2)} data-first="">
              <Promo w={84} h={52} bg={C.lilac} fg={C.indigo} accent={C.gold} title="Breakfast" sub="till 11:30" />
            </g>
            <g className="sb-c2" style={d(3 + i * 0.2)}>
              <Promo w={84} h={52} bg={C.violet} fg={C.white} accent={C.gold} title="Lunch" sub="now serving" />
            </g>
          </Screen>
        </g>
      ))}
    </Svg>
  );
}

/* 02 — one control point, many screens, same update */
export function OneUpdate() {
  const cols = [180, 234, 288, 342];
  const rows = [58, 112, 166, 220];
  return (
    <Svg label="One control point updates a whole grid of screens at the same moment">
      {/* bus lines */}
      <path d="M118 150 H 160" stroke={C.violet} strokeWidth="3" className="sb-dash" />
      <path d="M160 74 V 236" stroke={C.violet} strokeWidth="3" className="sb-dash" />
      {rows.map((y) => (
        <path key={y} d={`M160 ${y + 16} H 176`} stroke={C.violet} strokeWidth="3" />
      ))}
      {/* control */}
      <g className="sb-float">
        <rect x="40" y="110" width="80" height="80" rx="20" fill={C.indigo} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x="56" y={128 + i * 16} width="48" height="4" rx="2" fill={C.lilac} opacity="0.6" />
            <circle cx={66 + i * 14} cy={130 + i * 16} r="6" fill={C.gold} />
          </g>
        ))}
        <T x="80" y="210" size={10} weight={800} anchor="middle" fill={C.indigo}>Select all</T>
      </g>
      {/* grid of screens */}
      {rows.map((y) =>
        cols.map((x) => (
          <g key={`${x}-${y}`}>
            <Screen x={x} y={y} w={46} h={32} r={4}>
              <rect width="42" height="28" fill={C.lilac} />
              <rect x="4" y="5" width="18" height="4" rx="2" fill={C.muted} opacity="0.5" />
              <g className="sb-c2" style={d(3)}>
                <rect width="42" height="28" fill={C.violet} />
                <rect x="4" y="5" width="22" height="5" rx="2.5" fill={C.white} />
                <circle cx="32" cy="18" r="6" fill={C.gold} />
              </g>
            </Screen>
            <g className="sb-c2" style={d(3)}>
              <Check cx={x + 44} cy={y + 2} r={6} />
            </g>
          </g>
        ))
      )}
    </Svg>
  );
}

/* 03 — one screen in the network goes red, a phone gets the alert */
export function ScreenAlert() {
  const pos = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) pos.push({ x: 30 + c * 70, y: 50 + r * 70, bad: r === 1 && c === 2 });
  return (
    <Svg label="A network of screens where one goes offline and the owner is notified on their phone">
      {pos.map((p, i) => (
        <g key={i}>
          <Screen x={p.x} y={p.y} w={58} h={40} r={5} bezel={p.bad ? C.alert : C.ink}>
            {p.bad ? (
              <g>
                <rect width="52" height="34" fill={C.blush} />
                <T x="26" y="24" size={18} weight={800} fill={C.alert} anchor="middle" className="sb-blink">!</T>
              </g>
            ) : (
              <Promo w={52} h={34} bg={i % 2 ? C.lilac : C.violet} fg={i % 2 ? C.indigo : C.white} />
            )}
          </Screen>
          <circle cx={p.x + 54} cy={p.y + 46} r="3.5" fill={p.bad ? C.alert : C.green} />
          {p.bad && <circle cx={p.x + 54} cy={p.y + 46} r="3.5" fill={C.alert} className="sb-pulse" />}
        </g>
      ))}
      <path d="M232 136 C 252 136, 258 110, 282 110" stroke={C.alert} strokeWidth="2.5" fill="none" className="sb-dash" />
      <Phone x={284} y={54} w={90} h={176}>
        <T x="40" y="20" size={9} weight={700} fill={C.muted} anchor="middle">9:41</T>
        <g className="sb-notify">
          <rect x="5" y="32" width="70" height="44" rx="9" fill={C.cream} stroke={C.line} />
          <circle cx="16" cy="45" r="5" fill={C.alert} />
          <T x="25" y="48" size={7} weight={800}>Andheri Store</T>
          <T x="10" y="64" size={7.5} weight={800} fill={C.alert}>Screen Offline</T>
        </g>
        {[0, 1, 2].map((i) => (
          <rect key={i} x="8" y={90 + i * 14} width={i === 2 ? 40 : 64} height="6" rx="3" fill={C.line} />
        ))}
      </Phone>
    </Svg>
  );
}

/* 04 — one screen, day split into slots */
export function TimeSlots() {
  const slots = [
    { t: "10 AM", title: "Your brand", bg: C.lilac, fg: C.indigo },
    { t: "12 PM", title: "Lunch deal", bg: C.gold, fg: C.ink },
    { t: "2 PM", title: "Partner ad", bg: C.indigo, fg: C.white },
    { t: "5 PM", title: "Evening offer", bg: C.violet, fg: C.white },
    { t: "8 PM", title: "Campaign", bg: C.ink, fg: C.gold },
  ];
  return (
    <Svg label="A single screen whose content changes across five time slots in the day">
      <Screen x={100} y={24} w={200} h={128} r={8} stand>
        {slots.map((s, i) => (
          <g key={s.t} className="sb-c5" style={d(i * 2)} {...(i === 0 ? { "data-first": "" } : {})}>
            <Promo w={192} h={120} bg={s.bg} fg={s.fg} accent={i === 1 ? C.violet : C.gold} title={s.title} sub={s.t} />
          </g>
        ))}
      </Screen>
      {/* timeline */}
      <rect x="50" y="222" width="300" height="8" rx="4" fill={C.lilac} />
      {slots.map((s, i) => (
        <g key={s.t}>
          <rect x={50 + i * 75 - 1} y="222" width={i < 4 ? 75 : 2} height="8" fill={s.bg} opacity="0.9" rx="2" />
          <circle cx={50 + i * 75} cy="226" r="5" fill={C.white} stroke={C.indigo} strokeWidth="2" />
          <T x={50 + i * 75} y="254" size={11} weight={700} fill={C.slate} anchor="middle">{s.t}</T>
        </g>
      ))}
      <g className="sb-playhead">
        <path d="M50 214 l-7 -10 h14z" fill={C.violet} />
        <circle cx="50" cy="226" r="8" fill={C.violet} />
      </g>
    </Svg>
  );
}

/* 05 — the screen runs an ad and ₹ flows into a wallet */
export function EarnMoney() {
  const coinPath = "M214 96 C 270 60, 320 110, 322 186";
  return (
    <Svg label="A screen shows an advertisement while coins flow from it into the business wallet">
      <Screen x={34} y={44} w={180} h={124} r={8} stand>
        <rect width="172" height="116" fill={C.indigo} />
        <rect x="12" y="12" width="30" height="14" rx="7" fill={C.gold} />
        <T x="27" y="23" size={8} weight={800} anchor="middle">AD</T>
        <T x="12" y="54" size={17} weight={800} fill={C.white}>Partner</T>
        <T x="12" y="74" size={17} weight={800} fill={C.white}>brand</T>
        <circle cx="130" cy="72" r="30" fill={C.violet} />
        <rect x="116" y="58" width="28" height="28" rx="6" fill={C.white} opacity="0.9" />
      </Screen>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle r="12" fill={C.gold} stroke={C.ink} strokeWidth="1.5" opacity="0">
            <animateMotion dur="2.4s" repeatCount="indefinite" path={coinPath} begin={`${i * 0.8}s`} />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="2.4s" repeatCount="indefinite" begin={`${i * 0.8}s`} />
          </circle>
          <text fontFamily="Manrope, sans-serif" fontSize="13" fontWeight="800" fill={C.ink} textAnchor="middle" dy="4.5" opacity="0">
            ₹
            <animateMotion dur="2.4s" repeatCount="indefinite" path={coinPath} begin={`${i * 0.8}s`} />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="2.4s" repeatCount="indefinite" begin={`${i * 0.8}s`} />
          </text>
        </g>
      ))}
      {/* wallet */}
      <g>
        <rect x="270" y="186" width="104" height="72" rx="14" fill={C.violet} />
        <rect x="270" y="186" width="104" height="22" rx="11" fill={C.purple} />
        <rect x="330" y="212" width="44" height="26" rx="8" fill={C.indigo} />
        <circle cx="344" cy="225" r="5" fill={C.gold} />
        <T x="282" y="246" size={11} weight={800} fill={C.white}>+ ₹ earned</T>
      </g>
    </Svg>
  );
}

/* 06 — the sun moves; the screen's message follows the time of day */
export function RightMoment() {
  const moments = [
    { k: "MORNING", t: "Breakfast ₹199", bg: C.ivory, fg: C.ink },
    { k: "AFTERNOON", t: "Lunch Thali ₹249", bg: C.gold, fg: C.ink },
    { k: "EVENING", t: "Family Dinner", bg: C.violet, fg: C.white },
    { k: "WEEKEND", t: "Live Music Tonight", bg: C.indigo, fg: C.white },
  ];
  return (
    <Svg label="As the sun moves across the day, the screen switches from breakfast to lunch to dinner to live music">
      <path d="M70 160 A 130 130 0 0 1 330 160" fill="none" stroke={C.lilac} strokeWidth="3" strokeDasharray="4 8" />
      <g className="sb-sun" style={{ transformBox: "view-box", transformOrigin: "200px 160px" }}>
        <g>
          <circle cx="70" cy="160" r="16" fill={C.gold} />
          {Array.from({ length: 8 }, (_, i) => {
            const a = (Math.PI * 2 * i) / 8;
            return (
              <line key={i} x1={70 + Math.cos(a) * 21} y1={160 + Math.sin(a) * 21} x2={70 + Math.cos(a) * 27} y2={160 + Math.sin(a) * 27} stroke={C.gold} strokeWidth="3" strokeLinecap="round" />
            );
          })}
        </g>
      </g>
      <Screen x={110} y={118} w={180} h={116} r={8} stand>
        {moments.map((m, i) => (
          <g key={m.k} className="sb-c4" style={d(i * 2)} {...(i === 0 ? { "data-first": "" } : {})}>
            <rect width="172" height="108" fill={m.bg} />
            <rect x="10" y="10" width={m.k.length * 7 + 12} height="16" rx="8" fill={m.fg} opacity="0.12" />
            <T x="16" y="22" size={8} weight={800} fill={m.fg}>{m.k}</T>
            <T x="14" y="62" size={15} weight={800} fill={m.fg}>{m.t}</T>
            <rect x="14" y="76" width="54" height="8" rx="4" fill={m.fg} opacity="0.5" />
          </g>
        ))}
      </Screen>
    </Svg>
  );
}

/* 07 — advertiser → map pins → venues → screens */
export function PhysicalReach() {
  const venues = [
    { y: 34, label: "Café", pinX: 172, pinY: 118 },
    { y: 118, label: "Gym", pinX: 214, pinY: 176 },
    { y: 202, label: "Clinic", pinX: 238, pinY: 108 },
  ];
  return (
    <Svg label="An advertiser picks locations on a map and the ad appears on screens inside cafés, gyms and clinics">
      {/* advertiser */}
      <g className="sb-float">
        <rect x="18" y="112" width="76" height="76" rx="18" fill={C.indigo} />
        <path d="M38 142h10l20-12v40l-20-12h-10z" fill={C.gold} />
        <path d="M74 140c5 4 5 16 0 20" stroke={C.white} strokeWidth="3" fill="none" strokeLinecap="round" />
        <T x="56" y="206" size={10} weight={800} fill={C.indigo} anchor="middle">Advertiser</T>
      </g>
      <path d="M98 150 H 128" stroke={C.violet} strokeWidth="2.5" className="sb-dash" />
      {/* map */}
      <rect x="130" y="60" width="140" height="180" rx="18" fill={C.sand} />
      <path d="M130 130 C 180 120, 220 170, 270 150" stroke={C.white} strokeWidth="10" fill="none" />
      <path d="M190 60 C 200 120, 170 180, 196 240" stroke={C.white} strokeWidth="8" fill="none" />
      <rect x="146" y="190" width="30" height="24" rx="4" fill={C.mist} />
      <rect x="226" y="74" width="30" height="20" rx="4" fill={C.mist} />
      {venues.map((v, i) => (
        <g key={v.label}>
          <Pin x={v.pinX} y={v.pinY} fill={i === 1 ? C.indigo : C.violet} className="sb-drop" style={d(i * 0.5)} />
          <path d={`M${v.pinX + 10} ${v.pinY - 20} C 290 ${v.pinY - 20}, 280 ${v.y + 24}, 300 ${v.y + 24}`} stroke={C.violet} strokeWidth="2" fill="none" className="sb-dash" opacity="0.7" />
          <Screen x={302} y={v.y} w={84} h={52} r={5}>
            <rect width="76" height="44" fill={C.lilac} />
            <g className="sb-drop" style={d(i * 0.5 + 0.4)}>
              <Promo w={76} h={44} bg={C.violet} fg={C.white} title="Your ad" />
            </g>
          </Screen>
          <T x={344} y={v.y + 66} size={9} weight={700} fill={C.slate} anchor="middle">{v.label}</T>
        </g>
      ))}
    </Svg>
  );
}

/* 08 — head office, three cities, three different messages */
export function LocalVoice() {
  const cities = [
    { x: 22, name: "Mumbai", bg: C.violet, fg: C.white, t: "Monsoon sale" },
    { x: 145, name: "Pune", bg: C.gold, fg: C.ink, t: "Pune special" },
    { x: 268, name: "Delhi", bg: C.indigo, fg: C.white, t: "Winter menu" },
  ];
  return (
    <Svg label="Head office runs one network while Mumbai, Pune and Delhi screens each show their own promotion">
      {cities.map((c) => (
        <path key={c.name} d={`M200 92 C 200 130, ${c.x + 55} 120, ${c.x + 55} 150`} stroke={C.violet} strokeWidth="2.5" fill="none" className="sb-dash" />
      ))}
      <g className="sb-float">
        <circle cx="200" cy="62" r="34" fill={C.indigo} />
        <rect x="183" y="48" width="34" height="24" rx="5" fill={C.violet} />
        <rect x="181" y="44" width="38" height="6" rx="3" fill={C.lilac} />
        <path d="M196 55v11l9-5.5z" fill={C.white} />
        <T x="200" y="112" size={9} weight={800} fill={C.indigo} anchor="middle">HEAD OFFICE</T>
      </g>
      {cities.map((c, i) => (
        <g key={c.name}>
          <Screen x={c.x} y={152} w={110} h={76} r={7} stand>
            <Promo w={102} h={68} bg={c.bg} fg={c.fg} accent={c.bg === C.gold ? C.violet : C.gold} title={c.t} />
          </Screen>
          <rect x={c.x + 25} y="258" width="60" height="20" rx="10" fill={C.white} stroke={C.lilac} strokeWidth="2" />
          <T x={c.x + 55} y="272" size={10} weight={800} anchor="middle">{c.name}</T>
        </g>
      ))}
    </Svg>
  );
}

/* 09 — campaign delivery funnel ending in a proof-of-play report */
export function ProofOfPlay() {
  const steps = [
    { label: "Campaign", val: "", w: 150 },
    { label: "Screens", val: "40", w: 150 },
    { label: "Locations", val: "12", w: 150 },
    { label: "Scheduled plays", val: "18,400", w: 150 },
    { label: "Completed plays", val: "18,120", w: 146 },
  ];
  return (
    <Svg label="A campaign runs on 40 screens in 12 locations, 18,400 plays scheduled, 18,120 completed, ending in a report">
      {steps.map((s, i) => (
        <g key={s.label} className="sb-reveal" style={d(i * 0.45)}>
          <rect x="30" y={22 + i * 50} width="210" height="36" rx="12" fill={i === 0 ? C.indigo : C.white} stroke={C.lilac} strokeWidth="2" />
          <T x="46" y={45 + i * 50} size={11} weight={700} fill={i === 0 ? C.white : C.slate}>{s.label}</T>
          {s.val && <T x="226" y={45 + i * 50} size={13} weight={800} fill={C.indigo} anchor="end">{s.val}</T>}
          {i === 0 && <circle cx="220" cy={40} r="7" fill={C.gold} />}
          {i < steps.length - 1 && <path d={`M135 ${60 + i * 50} v 8`} stroke={C.violet} strokeWidth="2.5" strokeLinecap="round" />}
        </g>
      ))}
      <path d="M244 240 C 268 240, 262 170, 282 170" stroke={C.violet} strokeWidth="2.5" fill="none" className="sb-dash" />
      {/* report */}
      <g className="sb-reveal" style={d(2.4)}>
        <rect x="282" y="96" width="96" height="130" rx="12" fill={C.white} stroke={C.lilac} strokeWidth="2" />
        <rect x="282" y="96" width="96" height="30" rx="12" fill={C.violet} />
        <T x="330" y="116" size={9} weight={800} fill={C.white} anchor="middle">PROOF OF PLAY</T>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x="294" y={140 + i * 14} width="44" height="5" rx="2.5" fill={C.line} />
            <rect x="294" y={140 + i * 14} width={[40, 34, 42, 38][i]} height="5" rx="2.5" fill={C.iris} className="sb-fill" style={d(2.6 + i * 0.2)} />
          </g>
        ))}
        <Check cx={356} cy={200} r={13} />
      </g>
    </Svg>
  );
}
