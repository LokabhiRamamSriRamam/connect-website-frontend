import { C, Svg, T, Screen, Check } from "./kit";

const d = (s) => ({ animationDelay: `${s}s` });
const first = (i) => (i === 0 ? { "data-first": "" } : {});

/* Cycling screen content helper */
function Cycle({ items, w, h, cls = "sb-c3", step = 2.5, render }) {
  return items.map((it, i) => (
    <g key={i} className={cls} style={d(i * step)} {...first(i)}>
      {render(it, w, h)}
    </g>
  ));
}

/* 01 · Retail — storefront with a portrait screen in the window */
export function RetailScene() {
  const promos = [
    { t: "NEW IN", s: "Spring edit", bg: C.violet, fg: C.white },
    { t: "40% OFF", s: "This weekend", bg: C.gold, fg: C.ink },
    { t: "JUST", s: "DROPPED", bg: C.indigo, fg: C.white },
  ];
  return (
    <Svg label="A shop window where a portrait screen cycles through new arrivals and weekend offers">
      {/* building */}
      <rect x="40" y="64" width="320" height="200" rx="10" fill={C.sand} />
      {/* awning */}
      <g>
        <rect x="30" y="40" width="340" height="16" rx="6" fill={C.indigo} />
        {Array.from({ length: 10 }, (_, i) => (
          <path key={i} d={`M${30 + i * 34} 56h34v12a17 17 0 0 1-34 0z`} fill={i % 2 ? C.lavender : C.violet} />
        ))}
      </g>
      {/* rack */}
      <rect x="70" y="110" width="120" height="5" rx="2.5" fill={C.slate} />
      <rect x="76" y="110" width="4" height="140" fill={C.slate} />
      <rect x="180" y="110" width="4" height="140" fill={C.slate} />
      {[88, 118, 148].map((x, i) => (
        <g key={x} className="sb-float" style={d(i * 0.4)}>
          <path d={`M${x + 12} 115 v6`} stroke={C.slate} strokeWidth="2" />
          <path d={`M${x} 124 l12-4 12 4 6 12-6 2v40h-24v-40l-6-2z`} fill={[C.violet, C.gold, C.blush][i]} stroke={C.ink} strokeWidth="1.5" strokeLinejoin="round" />
        </g>
      ))}
      {/* portrait screen */}
      <Screen x={236} y={86} w={96} h={160} r={8}>
        <Cycle
          items={promos}
          w={88}
          h={152}
          render={(p, w, h) => (
            <g>
              <rect width={w} height={h} fill={p.bg} />
              <circle cx={w / 2} cy={h * 0.62} r="26" fill={p.fg} opacity="0.15" />
              <T x="10" y="40" size={17} weight={800} fill={p.fg}>{p.t}</T>
              <T x="10" y="58" size={10} weight={700} fill={p.fg}>{p.s}</T>
              <rect x="10" y={h - 24} width="40" height="10" rx="5" fill={p.fg} />
            </g>
          )}
        />
      </Screen>
      {/* bag */}
      <g className="sb-bounce" style={{ transformBox: "fill-box" }}>
        <path d="M120 206 q0-16 14-16 q14 0 14 16" fill="none" stroke={C.ink} strokeWidth="3" />
        <rect x="112" y="204" width="44" height="46" rx="6" fill={C.gold} stroke={C.ink} strokeWidth="2" />
      </g>
    </Svg>
  );
}

/* 02 · Restaurants & Cafés — menu board that follows the clock */
export function RestaurantScene() {
  const menus = [
    { k: "BREAKFAST", t: "Masala Omelette", time: "9:00", bg: C.ivory, fg: C.ink },
    { k: "LUNCH", t: "Thali ₹249", time: "11:30", bg: C.gold, fg: C.ink },
    { k: "DINNER", t: "Chef's Special", time: "7:30", bg: C.indigo, fg: C.white },
  ];
  return (
    <Svg label="A café menu board that switches from breakfast to lunch to dinner as the day goes on">
      <Screen x={70} y={30} w={260} h={140} r={10}>
        <Cycle
          items={menus}
          w={250}
          h={130}
          render={(m, w, h) => (
            <g>
              <rect width={w} height={h} fill={m.bg} />
              <rect x="14" y="14" width={m.k.length * 7.5 + 14} height="18" rx="9" fill={C.violet} />
              <T x="21" y="27" size={9} weight={800} fill={C.white}>{m.k}</T>
              <T x="14" y="64" size={19} weight={800} fill={m.fg}>{m.t}</T>
              {[0, 1].map((i) => (
                <rect key={i} x="14" y={80 + i * 14} width={i ? 70 : 110} height="7" rx="3.5" fill={m.fg} opacity="0.3" />
              ))}
              <circle cx={w - 50} cy={h - 44} r="30" fill={C.violet} opacity="0.9" />
              <circle cx={w - 50} cy={h - 44} r="20" fill={C.gold} stroke={C.white} strokeWidth="4" />
              <rect x={w - 70} y="12" width="56" height="20" rx="10" fill={m.fg} opacity="0.12" />
              <T x={w - 42} y="26" size={10} weight={800} fill={m.fg} anchor="middle">{m.time}</T>
            </g>
          )}
        />
      </Screen>
      {/* counter */}
      <rect x="30" y="222" width="340" height="12" rx="6" fill={C.taupe} />
      {/* cup */}
      <g>
        {[0, 1].map((i) => (
          <path key={i} d={`M${112 + i * 12} 184 q-6 -8 0 -16 q6 -8 0 -16`} stroke={C.taupe} strokeWidth="3" fill="none" strokeLinecap="round" className="sb-steam" style={d(i * 0.8)} />
        ))}
        <path d="M96 190h44v18a14 14 0 0 1-14 14h-16a14 14 0 0 1-14-14z" fill={C.white} stroke={C.ink} strokeWidth="2" />
        <path d="M140 196h6a7 7 0 0 1 0 14h-6" fill="none" stroke={C.ink} strokeWidth="2" />
      </g>
      {/* plate */}
      <ellipse cx="270" cy="214" rx="50" ry="10" fill={C.white} stroke={C.ink} strokeWidth="2" />
      <path d="M238 210 q32 -34 64 0z" fill={C.gold} stroke={C.ink} strokeWidth="2" />
      <circle cx="262" cy="200" r="4" fill={C.green} />
      <circle cx="280" cy="203" r="3.5" fill={C.alert} />
    </Svg>
  );
}

/* 03 · Healthcare — waiting room with an informative wall screen */
export function HealthcareScene() {
  const slides = [
    { k: "NOW SERVING", t: "Token A-12", bg: C.indigo, fg: C.white },
    { k: "OUR SERVICES", t: "Dental care", bg: C.lilac, fg: C.indigo },
    { k: "HEALTH TIP", t: "Drink water", bg: C.mint, fg: C.ink },
  ];
  return (
    <Svg label="A clinic waiting room where the wall screen shows tokens, services and health tips">
      <Screen x={176} y={36} w={190} h={120} r={9}>
        <Cycle
          items={slides}
          w={180}
          h={110}
          render={(s, w, h) => (
            <g>
              <rect width={w} height={h} fill={s.bg} />
              <rect x="14" y="14" width="26" height="26" rx="7" fill={C.white} />
              <path d="M24 19h6v6h6v6h-6v6h-6v-6h-6v-6h6z" fill={C.violet} transform="translate(-1 -1) scale(0.95)" />
              <T x="48" y="30" size={9} weight={800} fill={s.fg} opacity="0.75">{s.k}</T>
              <T x="14" y="72" size={20} weight={800} fill={s.fg}>{s.t}</T>
              <rect x="14" y="84" width="70" height="7" rx="3.5" fill={s.fg} opacity="0.3" />
            </g>
          )}
        />
      </Screen>
      {/* chairs */}
      {[40, 104, 168].map((x, i) => (
        <g key={x}>
          <rect x={x} y="186" width="52" height="44" rx="10" fill={i === 1 ? C.violet : C.lilac} />
          <rect x={x - 4} y="222" width="60" height="14" rx="7" fill={i === 1 ? C.purple : C.mist} />
          <rect x={x + 6} y="236" width="4" height="22" fill={C.slate} />
          <rect x={x + 42} y="236" width="4" height="22" fill={C.slate} />
        </g>
      ))}
      {/* plant */}
      <g className="sb-float">
        <path d="M322 214 c-18 -8 -20 -30 -6 -40 c4 16 10 24 6 40z" fill={C.green} />
        <path d="M326 214 c16 -10 20 -30 6 -42 c-4 16 -8 26 -6 42z" fill={C.green} opacity="0.8" />
        <rect x="306" y="212" width="36" height="42" rx="8" fill={C.taupe} />
      </g>
    </Svg>
  );
}

/* 04 · Hospitality — lobby screen welcoming guests */
export function HospitalityScene() {
  const slides = [
    { k: "WELCOME", t: "Hello, Ms. Rao", bg: C.indigo, fg: C.white },
    { k: "POOL", t: "Open 7 AM – 9 PM", bg: C.lilac, fg: C.indigo },
    { k: "TONIGHT", t: "Live jazz · 8 PM", bg: C.violet, fg: C.white },
  ];
  return (
    <Svg label="A hotel lobby screen that welcomes guests and shows pool timings and tonight's event">
      <Screen x={96} y={26} w={208} h={124} r={9}>
        <Cycle
          items={slides}
          w={198}
          h={114}
          render={(s, w, h) => (
            <g>
              <rect width={w} height={h} fill={s.bg} />
              <T x="16" y="32" size={10} weight={800} fill={s.fg} opacity="0.7">{s.k}</T>
              <T x="16" y="66" size={18} weight={800} fill={s.fg}>{s.t}</T>
              {[0, 1, 2].map((i) => (
                <circle key={i} cx={20 + i * 14} cy="92" r="4" fill={s.fg} opacity={i === 0 ? 0.9 : 0.3} />
              ))}
            </g>
          )}
        />
      </Screen>
      {/* desk */}
      <rect x="60" y="196" width="280" height="62" rx="12" fill={C.indigo} />
      <rect x="50" y="188" width="300" height="14" rx="7" fill={C.taupe} />
      <path d="M90 226h220" stroke={C.iris} strokeWidth="3" strokeDasharray="2 10" strokeLinecap="round" />
      {/* bell */}
      <g className="sb-wiggle" style={{ transformBox: "fill-box", transformOrigin: "bottom" }}>
        <path d="M146 188a22 22 0 0 1 44 0z" fill={C.gold} stroke={C.ink} strokeWidth="2" />
        <circle cx="168" cy="164" r="4" fill={C.ink} />
      </g>
      {/* key card */}
      <g className="sb-float" style={d(0.6)}>
        <rect x="258" y="150" width="56" height="36" rx="7" fill={C.violet} stroke={C.ink} strokeWidth="2" transform="rotate(-10 286 168)" />
        <rect x="266" y="158" width="18" height="6" rx="3" fill={C.gold} transform="rotate(-10 286 168)" />
      </g>
    </Svg>
  );
}

/* 05 · Fitness & Wellness — class schedule with tonight's class highlighted */
export function FitnessScene() {
  const rows = [
    { t: "6 PM", n: "Yoga Flow" },
    { t: "7 PM", n: "HIIT Blast" },
    { t: "8 PM", n: "Spin Class" },
  ];
  return (
    <Svg label="A gym screen showing tonight's class schedule, one class highlighted at a time">
      <Screen x={150} y={30} w={220} h={160} r={10}>
        <rect width="210" height="150" fill={C.ink} />
        <T x="16" y="28" size={11} weight={800} fill={C.gold}>TONIGHT&apos;S CLASSES</T>
        {rows.map((r, i) => (
          <g key={r.t}>
            <rect x="12" y={42 + i * 34} width="186" height="28" rx="8" fill={C.white} opacity="0.08" />
            <g className="sb-c3" style={d(i * 2.5)} {...first(i)}>
              <rect x="12" y={42 + i * 34} width="186" height="28" rx="8" fill={C.violet} />
            </g>
            <T x="24" y={61 + i * 34} size={11} weight={800} fill={C.white}>{r.t}</T>
            <T x="70" y={61 + i * 34} size={11} weight={700} fill={C.white}>{r.n}</T>
          </g>
        ))}
      </Screen>
      {/* dumbbell */}
      <g className="sb-lift">
        <rect x="42" y="170" width="84" height="10" rx="5" fill={C.slate} />
        <rect x="34" y="152" width="16" height="46" rx="5" fill={C.indigo} />
        <rect x="118" y="152" width="16" height="46" rx="5" fill={C.indigo} />
        <rect x="24" y="160" width="12" height="30" rx="4" fill={C.violet} />
        <rect x="132" y="160" width="12" height="30" rx="4" fill={C.violet} />
      </g>
      {/* kettlebell */}
      <g>
        <path d="M70 232 a16 16 0 0 1 32 0" fill="none" stroke={C.ink} strokeWidth="6" />
        <circle cx="86" cy="250" r="24" fill={C.gold} stroke={C.ink} strokeWidth="2" />
      </g>
      <rect x="20" y="276" width="360" height="6" rx="3" fill={C.taupe} />
    </Svg>
  );
}

/* 06 · Education — last-minute schedule change without printing */
export function EducationScene() {
  return (
    <Svg label="A campus screen updates a seminar time instantly while a printed notice is crossed out">
      {/* building */}
      <g>
        <path d="M24 120 L100 78 L176 120z" fill={C.indigo} />
        <rect x="32" y="120" width="136" height="12" fill={C.iris} />
        {[42, 76, 110, 144].map((x) => (
          <rect key={x} x={x} y="132" width="14" height="92" fill={C.lilac} />
        ))}
        <rect x="24" y="224" width="152" height="16" rx="3" fill={C.taupe} />
        <rect x="98" y="40" width="3" height="42" fill={C.slate} />
        <path d="M101 42h28l-6 8 6 8h-28z" fill={C.gold} className="sb-wave" />
      </g>
      {/* screen */}
      <Screen x={204} y={54} w={176} h={128} r={9} stand>
        <rect width="168" height="120" fill={C.white} />
        <rect width="168" height="28" fill={C.violet} />
        <T x="12" y="19" size={10} weight={800} fill={C.white}>CAMPUS NOTICE</T>
        <T x="12" y="52" size={11} weight={700} fill={C.slate}>Seminar · Hall B</T>
        <g>
          <T x="12" y="80" size={17} weight={800} fill={C.muted}>11:00 AM</T>
          <rect x="10" y="73" width="90" height="3" rx="1.5" fill={C.alert} className="sb-strike" />
        </g>
        <g className="sb-after">
          <rect x="10" y="88" width="94" height="24" rx="8" fill={C.gold} />
          <T x="18" y="105" size={15} weight={800}>3:00 PM</T>
          <Check cx={124} cy={100} r={9} />
        </g>
      </Screen>
      {/* crossed-out paper notice */}
      <g className="sb-float" style={d(0.5)}>
        <rect x="210" y="226" width="56" height="44" rx="4" fill={C.ivory} stroke={C.taupe} strokeWidth="2" transform="rotate(-8 238 248)" />
        <path d="M218 234l40 28M258 234l-40 28" stroke={C.alert} strokeWidth="3" strokeLinecap="round" />
      </g>
      <T x="276" y="258" size={10} weight={700} fill={C.slate}>No printing</T>
    </Svg>
  );
}

/* 07 · Automotive — showroom screen spotlighting a model */
export function AutomotiveScene() {
  return (
    <Svg label="A showroom screen highlights a new car model and its features while a customer waits">
      <Screen x={60} y={22} w={280} h={140} r={10}>
        <rect width="270" height="130" fill={C.indigo} />
        <T x="16" y="30" size={10} weight={800} fill={C.gold}>NEW MODEL</T>
        <T x="16" y="54" size={18} weight={800} fill={C.white}>Meet the X5</T>
        {[
          { l: "Mileage", w: 70 },
          { l: "Safety", w: 86 },
          { l: "Comfort", w: 60 },
        ].map((f, i) => (
          <g key={f.l}>
            <T x="16" y={78 + i * 16} size={8} weight={700} fill={C.lilac}>{f.l}</T>
            <rect x="62" y={72 + i * 16} width="90" height="6" rx="3" fill={C.white} opacity="0.15" />
            <rect x="62" y={72 + i * 16} width={f.w} height="6" rx="3" fill={C.violet} className="sb-fill" style={d(i * 0.3)} />
          </g>
        ))}
        <path d="M170 98 q10 -24 40 -26 h26 q18 2 26 16 v14 h-92z" fill={C.violet} />
        <circle cx="190" cy="104" r="9" fill={C.ink} stroke={C.white} strokeWidth="3" />
        <circle cx="244" cy="104" r="9" fill={C.ink} stroke={C.white} strokeWidth="3" />
      </Screen>
      {/* floor car */}
      <g className="sb-drive">
        <path d="M86 244 q12 -34 56 -38 h72 q34 2 54 20 l30 6 q12 3 12 14 v10 h-230z" fill={C.gold} stroke={C.ink} strokeWidth="2" strokeLinejoin="round" />
        <path d="M150 212 h54 l22 18 h-90z" fill={C.lilac} stroke={C.ink} strokeWidth="2" strokeLinejoin="round" />
        <circle cx="128" cy="258" r="18" fill={C.ink} />
        <circle cx="128" cy="258" r="7" fill={C.taupe} />
        <circle cx="270" cy="258" r="18" fill={C.ink} />
        <circle cx="270" cy="258" r="7" fill={C.taupe} />
      </g>
      <rect x="20" y="276" width="360" height="6" rx="3" fill={C.taupe} />
    </Svg>
  );
}

/* 08 · Real Estate — sales office screen with lit-up towers and availability */
export function RealEstateScene() {
  const towers = [
    { x: 22, w: 44, h: 110 },
    { x: 74, w: 54, h: 150 },
    { x: 136, w: 40, h: 90 },
  ];
  return (
    <Svg label="A sales office screen shows the latest project towers, amenities and units available">
      <Screen x={28} y={30} w={230} h={200} r={10} stand>
        <rect width="220" height="190" fill={C.lilac} />
        <circle cx="180" cy="34" r="16" fill={C.gold} />
        {towers.map((t, i) => (
          <g key={i}>
            <rect x={t.x} y={170 - t.h} width={t.w} height={t.h} rx="4" fill={i === 1 ? C.indigo : C.iris} />
            {Array.from({ length: Math.floor(t.h / 22) }, (_, r) =>
              [0, 1].map((c) => (
                <rect
                  key={`${r}-${c}`}
                  x={t.x + 8 + c * (t.w / 2 - 4)}
                  y={180 - t.h + r * 22}
                  width={t.w / 2 - 14}
                  height="10"
                  rx="2"
                  fill={C.gold}
                  className="sb-light"
                  style={d((r + c + i) * 0.35)}
                />
              ))
            )}
          </g>
        ))}
        <rect y="170" width="220" height="20" fill={C.green} opacity="0.6" />
      </Screen>
      {/* availability card */}
      <g className="sb-float">
        <rect x="270" y="70" width="112" height="84" rx="14" fill={C.white} stroke={C.lilac} strokeWidth="2" />
        <T x="284" y="94" size={9} weight={800} fill={C.muted}>UNITS AVAILABLE</T>
        <g className="sb-c3" data-first="">
          <T x="284" y="130" size={30} weight={800} fill={C.indigo}>24</T>
        </g>
        <g className="sb-c3" style={d(2.5)}>
          <T x="284" y="130" size={30} weight={800} fill={C.indigo}>23</T>
        </g>
        <g className="sb-c3" style={d(5)}>
          <T x="284" y="130" size={30} weight={800} fill={C.violet}>22</T>
        </g>
      </g>
      {/* key */}
      <g className="sb-wiggle" style={{ transformBox: "fill-box" }}>
        <circle cx="300" cy="206" r="18" fill="none" stroke={C.ink} strokeWidth="6" />
        <path d="M318 206h50v10M352 206v10" stroke={C.ink} strokeWidth="6" fill="none" strokeLinecap="round" />
        <circle cx="300" cy="206" r="12" fill={C.gold} />
      </g>
    </Svg>
  );
}

/* 09 · Corporate & Offices — Monday-morning updates on the reception screen */
export function CorporateScene() {
  return (
    <Svg label="An office reception screen shows this week's announcements, events and a dashboard">
      <Screen x={110} y={24} w={264} h={170} r={10} stand>
        <rect width="254" height="160" fill={C.white} />
        <rect width="254" height="30" fill={C.indigo} />
        <T x="14" y="20" size={10} weight={800} fill={C.white}>MONDAY · THIS WEEK</T>
        {/* announcements */}
        {["Town hall · Wed 4 PM", "New joiners: welcome!", "Offsite sign-ups open"].map((a, i) => (
          <g key={a} className="sb-reveal" style={d(i * 0.5)}>
            <circle cx="20" cy={50 + i * 24} r="4" fill={[C.violet, C.gold, C.green][i]} />
            <T x="30" y={54 + i * 24} size={9} weight={700} fill={C.slate}>{a}</T>
          </g>
        ))}
        {/* dashboard */}
        <rect x="160" y="40" width="84" height="110" rx="8" fill={C.lavender} />
        {[40, 62, 50, 78].map((h, i) => (
          <rect key={i} x={170 + i * 18} y={140 - h} width="12" height={h} rx="3" fill={i === 3 ? C.violet : C.iris} className="sb-grow" style={d(i * 0.25)} />
        ))}
      </Screen>
      {/* desk + visitor badge */}
      <rect x="20" y="238" width="360" height="12" rx="6" fill={C.taupe} />
      <g className="sb-float">
        <rect x="30" y="120" width="62" height="84" rx="10" fill={C.violet} stroke={C.ink} strokeWidth="2" />
        <rect x="52" y="112" width="18" height="14" rx="4" fill={C.ink} />
        <circle cx="61" cy="152" r="12" fill={C.lilac} />
        <rect x="42" y="172" width="38" height="6" rx="3" fill={C.white} />
        <rect x="46" y="184" width="30" height="5" rx="2.5" fill={C.white} opacity="0.6" />
        <T x="61" y="222" size={9} weight={800} fill={C.indigo} anchor="middle">VISITOR</T>
      </g>
      {/* mug */}
      <path d="M44 212h30v18a8 8 0 0 1-8 8h-14a8 8 0 0 1-8-8z" fill={C.gold} stroke={C.ink} strokeWidth="2" transform="translate(290 -12)" />
    </Svg>
  );
}

