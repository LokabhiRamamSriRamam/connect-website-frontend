import { Display, Tx, Chip, Clock, Cloud, Spark, Person, SKIN, HAIR, Traveller, Dots } from "./shared";

/* One animated cover per blog (640×360). Used on the landing section, /blogs and each article header.
   Decorative: the card or header around them always carries the blog's real title. */

function Svg({ children, id }) {
  return (
    <svg viewBox="0 0 640 360" className="bl-art h-full w-full" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice" data-cover={id}>
      {children}
    </svg>
  );
}

/* 1 — Digital menu boards: QSR counter, menu screens flipping breakfast → lunch. */
export function CoverMenuBoards() {
  const menu = (title, items, color) => (
    <g>
      <Tx x="14" y="26" size="15" fill={color}>
        {title}
      </Tx>
      {items.map((it, i) => (
        <g key={it[0]}>
          <Tx x="14" y={50 + i * 18} size="10.5" weight="700" fill="#F8F6F2">
            {it[0]}
          </Tx>
          <Tx x="166" y={50 + i * 18} size="10.5" fill="#F5C542" anchor="end">
            {it[1]}
          </Tx>
        </g>
      ))}
    </g>
  );
  return (
    <Svg id="menu">
      <rect width="640" height="360" fill="#FFF1EA" />
      <Dots id="cv1d" color="#E4572E" opacity={0.18} />
      <circle cx="560" cy="70" r="90" fill="#F5C542" opacity="0.35" />
      {/* menu screens */}
      <Display x="34" y="40" w="180" h="118" glass="#1E2A23" mount id="cv1a">
        <g className="bl-ph-a">{menu("BREAKFAST", [["Masala Omelette", ""], ["Aloo Paratha", ""], ["Breakfast Combo", ""]], "#F5C542")}</g>
        <g className="bl-ph-b">{menu("LUNCH", [["Paneer Wrap Combo", ""], ["Chicken Burger Meal", ""], ["Loaded Fries", ""]], "#FF8A65")}</g>
      </Display>
      <Display x="230" y="40" w="180" h="118" glass="#E4572E" mount id="cv1b">
        <g className="bl-ph-a">
          <circle cx="118" cy="62" r="40" fill="#F5C542" />
          <path d="M92 60h52a26 20 0 0 1-52 0z" fill="#fff" stroke="#191919" strokeWidth="2" />
          <g className="bl-steam"><path d="M108 40c-4-6 4-10 0-16" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" /></g>
          <Tx x="12" y="30" size="16" fill="#fff">COFFEE &amp;</Tx>
          <Tx x="12" y="50" size="16" fill="#fff">BREAKFAST</Tx>
          <Tx x="12" y="70" size="16" fill="#fff">DEAL</Tx>
        </g>
        <g className="bl-ph-b">
          <rect x="70" y="40" width="80" height="12" rx="6" fill="#F5C542" />
          <rect x="66" y="54" width="88" height="8" rx="3" fill="#4CAF6E" />
          <rect x="68" y="64" width="84" height="12" rx="4" fill="#8A4B2A" />
          <rect x="70" y="78" width="80" height="12" rx="6" fill="#F5C542" />
          <Tx x="12" y="30" size="16" fill="#fff">MAKE IT A</Tx>
          <Tx x="12" y="50" size="16" fill="#fff">COMBO</Tx>
          <Tx x="12" y="74" size="13" fill="#191919">ADD ₹79</Tx>
        </g>
      </Display>
      <Display x="426" y="40" w="180" h="118" glass="#1E2A23" mount id="cv1c">
        <g className="bl-ph-a">{menu("BEVERAGES", [["Cold Coffee", "₹149"], ["Masala Chai", ""], ["Fresh Lime", ""]], "#7FDDE4")}</g>
        <g className="bl-ph-b">{menu("ADD ON", [["Cold Coffee", "₹149"], ["Loaded Fries", ""], ["Dessert", ""]], "#7FDDE4")}</g>
      </Display>
      {/* clock */}
      <Clock x={320} y={196} r={20} hour={11} minute={30} spin />
      {/* counter */}
      <rect x="0" y="262" width="640" height="98" fill="#191919" />
      <rect x="0" y="252" width="640" height="16" fill="#8A4B2A" />
      <rect x="470" y="222" width="70" height="32" rx="6" fill="#4B5563" />
      <rect x="480" y="228" width="50" height="14" rx="3" fill="#7FDDE4" />
      {/* cup with steam */}
      <rect x="120" y="226" width="26" height="28" rx="5" fill="#fff" stroke="#191919" strokeWidth="2" />
      <g className="bl-steam"><path d="M128 220c-4-6 4-10 0-16" fill="none" stroke="#E4572E" strokeWidth="2.5" strokeLinecap="round" /></g>
      <g className="bl-steam" style={{ animationDelay: "1.2s" }}><path d="M138 220c-4-6 4-10 0-16" fill="none" stroke="#E4572E" strokeWidth="2.5" strokeLinecap="round" /></g>
      {/* customers in the queue */}
      <Person x={250} y={350} s={0.95} top="#914BFA" skin={SKIN[1]} hair={HAIR[0]} pose="point" />
      <Person x={330} y={352} s={0.9} top="#F5C542" skin={SKIN[2]} hair={HAIR[1]} hairStyle="long" bottom="#1F30A0" />
      <Person x={400} y={354} s={0.85} top="#4CAF6E" skin={SKIN[0]} hair={HAIR[2]} hairStyle="curly" />
      <Spark x={600} y={210} r={10} />
      <Spark x={40} y={200} r={8} fill="#E4572E" delay={0.8} />
    </Svg>
  );
}

/* 2 — Multi-location retail: one dashboard lighting stores in five cities. */
export function CoverMultiLocation() {
  const cities = [
    { n: "Delhi", x: 250, y: 70 },
    { n: "Mumbai", x: 150, y: 190 },
    { n: "Pune", x: 190, y: 240 },
    { n: "Hyderabad", x: 300, y: 215 },
    { n: "Bengaluru", x: 255, y: 305 },
  ];
  const hub = { x: 520, y: 175 };
  return (
    <Svg id="retail">
      <rect width="640" height="360" fill="#F6F1FF" />
      <Dots id="cv2d" color="#914BFA" opacity={0.2} />
      {/* soft map card */}
      <path d="M90 60c60-40 200-50 270-10s40 120 10 190-120 120-200 90S20 250 40 170 60 80 90 60z" fill="#EEE5FF" stroke="#191919" strokeWidth="2" strokeDasharray="5 6" />
      {cities.map((c, i) => {
        const d = `M${hub.x} ${hub.y}Q${(hub.x + c.x) / 2} ${Math.min(hub.y, c.y) - 60} ${c.x} ${c.y - 26}`;
        return (
          <g key={c.n}>
            <path d={d} fill="none" stroke="#914BFA" strokeWidth="2" className="bl-dash-slow" />
            <Traveller d={d} r={4.5} dur={2.6} delay={i * 0.5} />
          </g>
        );
      })}
      {cities.map((c, i) => (
        <g key={c.n}>
          <g className="bl-glow" style={{ animationDelay: `${i * 0.5}s` }}>
            <rect x={c.x - 24} y={c.y - 46} width="48" height="30" rx="5" fill="#191919" />
            <rect x={c.x - 20} y={c.y - 42} width="40" height="22" rx="3" fill="#914BFA" />
            <Tx x={c.x} y={c.y - 27} size="9" fill="#fff" anchor="middle">SALE</Tx>
          </g>
          <circle cx={c.x} cy={c.y - 8} r="7" fill="#F5C542" stroke="#191919" strokeWidth="2" />
          <g className="bl-pulse" style={{ animationDelay: `${i * 0.5}s` }}>
            <circle cx={c.x} cy={c.y - 8} r="7" fill="none" stroke="#914BFA" strokeWidth="2" />
          </g>
          <Tx x={c.x} y={c.y + 12} size="11" anchor="middle">{c.n}</Tx>
        </g>
      ))}
      {/* dashboard laptop */}
      <g className="bl-float">
        <rect x="430" y="110" width="180" height="116" rx="10" fill="#191919" />
        <rect x="438" y="118" width="164" height="100" rx="5" fill="#fff" />
        <rect x="446" y="126" width="148" height="16" rx="4" fill="#914BFA" />
        <Tx x="454" y="138" size="9.5" fill="#fff">Publish: All Stores</Tx>
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x="446" y={150 + i * 12} width="96" height="8" rx="3" fill="#EEE5FF" />
            <circle cx="586" cy={154 + i * 12} r="4" fill="#4CAF6E" />
          </g>
        ))}
        <path d="M410 226h220l-14 16H424z" fill="#4B5563" />
      </g>
      <Chip x={452} y={262} w={150} fill="#F5C542" color="#191919" stroke="#191919">
        5 cities · 1 click
      </Chip>
      <Spark x={600} y={60} r={12} fill="#914BFA" />
      <Spark x={400} y={320} r={8} delay={0.7} />
    </Svg>
  );
}

/* 3 — Commercial display vs consumer TV: living room vs bright store. */
export function CoverDisplayVsTv() {
  return (
    <Svg id="hardware">
      {/* left: living room at night */}
      <rect width="320" height="360" fill="#1B2140" />
      <circle cx="60" cy="56" r="20" fill="#F5F0D8" />
      <circle cx="68" cy="50" r="18" fill="#1B2140" />
      {[[120, 40], [200, 70], [270, 30], [30, 110]].map(([x, y], i) => (
        <g key={i} className="bl-glow" style={{ animationDelay: `${i * 0.4}s` }}>
          <circle cx={x} cy={y} r="2" fill="#fff" />
        </g>
      ))}
      <Display x="80" y="118" w="160" h="96" glass="#2C3A7A" stand id="cv3a">
        <rect width="200" height="120" fill="#2C3A7A" />
        <circle cx="76" cy="44" r="18" fill="#F5C542" opacity="0.8" />
        <path d="M0 80l40-24 30 16 40-30 50 38v30H0z" fill="#3B4FA8" />
      </Display>
      <rect x="40" y="244" width="240" height="22" rx="6" fill="#5B4636" />
      <path d="M50 330v-50a20 20 0 0 1 20-20h180a20 20 0 0 1 20 20v50z" fill="#7A3E3E" />
      <rect x="40" y="300" width="240" height="40" rx="10" fill="#8F4A4A" />
      <Chip x={98} y={70} w={124} fill="#fff" color="#191919">Home TV</Chip>
      {/* right: bright store */}
      <rect x="320" width="320" height="360" fill="#FFF8E6" />
      <g className="bl-spin" style={{ animationDuration: "24s" }}>
        <g transform="translate(590 52)">
          {Array.from({ length: 12 }, (_, i) => (
            <rect key={i} x="-3" y="-44" width="6" height="16" rx="3" fill="#FFB020" transform={`rotate(${i * 30})`} />
          ))}
        </g>
      </g>
      <circle cx="590" cy="52" r="22" fill="#FFB020" />
      <rect x="320" y="290" width="320" height="70" fill="#F2EEE7" />
      {/* 24h ring */}
      <circle cx="480" cy="168" r="104" fill="none" stroke="#E5E7EB" strokeWidth="8" />
      <g transform="rotate(-90 480 168)">
        <circle cx="480" cy="168" r="104" fill="none" stroke="#1F30A0" strokeWidth="8" strokeLinecap="round" strokeDasharray="653" className="bl-ring24" />
      </g>
      <Display x="400" y="118" w="160" h="96" glass="#1F30A0" mount id="cv3b">
        <g className="bl-ph-a">
          <rect width="200" height="120" fill="#914BFA" />
          <Tx x="12" y="34" size="17" fill="#fff">NEW</Tx>
          <Tx x="12" y="56" size="17" fill="#fff">ARRIVALS</Tx>
          <rect x="12" y="66" width="60" height="10" rx="5" fill="#F5C542" />
        </g>
        <g className="bl-ph-b">
          <rect width="200" height="120" fill="#1F30A0" />
          <Tx x="12" y="34" size="17" fill="#fff">FLASH</Tx>
          <Tx x="12" y="56" size="17" fill="#F5C542">SALE</Tx>
          <rect x="12" y="66" width="60" height="10" rx="5" fill="#fff" />
        </g>
      </Display>
      <Chip x={438} y={232} w={84} fill="#191919">24/7</Chip>
      <Chip x={410} y={70} w={140} fill="#1F30A0">Commercial display</Chip>
      {/* vs badge */}
      <circle cx="320" cy="180" r="30" fill="#F5C542" stroke="#191919" strokeWidth="3" />
      <Tx x="320" y="188" size="20" anchor="middle">VS</Tx>
    </Svg>
  );
}

/* 4 — Corporate: office tower, every floor's screen lights from one dashboard. */
export function CoverCorporate() {
  const floors = [0, 1, 2, 3];
  return (
    <Svg id="corporate">
      <rect width="640" height="360" fill="#EAF1FF" />
      {/* skyline */}
      {[[20, 150, 60], [90, 110, 50], [520, 130, 54], [584, 170, 46]].map(([x, y, w], i) => (
        <rect key={i} x={x} y={y} width={w} height={360 - y} fill="#C9D8F5" />
      ))}
      {/* tower */}
      <rect x="200" y="30" width="300" height="330" rx="6" fill="#fff" stroke="#191919" strokeWidth="3" />
      {floors.map((f) => {
        const y = 40 + f * 80;
        return (
          <g key={f}>
            <rect x="210" y={y} width="280" height="72" rx="4" fill={f % 2 ? "#F6F9FF" : "#fff"} />
            <line x1="200" y1={y + 76} x2="500" y2={y + 76} stroke="#191919" strokeWidth="2" />
            <Tx x="220" y={y + 16} size="9" fill="#6B7280">FLOOR {4 - f}</Tx>
            <g className="bl-glow" style={{ animationDelay: `${(3 - f) * 0.45}s` }}>
              <rect x="372" y={y + 12} width="96" height="52" rx="5" fill="#191919" />
              <rect x="376" y={y + 16} width="58" height="44" rx="2" fill="#2563EB" />
              <rect x="436" y={y + 16} width="28" height="30" rx="2" fill="#14B8A6" />
              <rect x="436" y={y + 48} width="28" height="12" rx="2" fill="#F5C542" />
              <rect x="382" y={y + 24} width="40" height="5" rx="2.5" fill="#fff" />
              <rect x="382" y={y + 33} width="28" height="4" rx="2" fill="#fff" opacity="0.7" />
            </g>
            <Person x={260 + (f % 2) * 40} y={y + 72} s={0.55} top={["#914BFA", "#2563EB", "#F97316", "#14B8A6"][f]} skin={SKIN[f % 5]} hair={HAIR[f % 3]} hairStyle={["short", "long", "bun", "curly"][f]} pose={f === 1 ? "wave" : "stand"} />
            <Person x={320} y={y + 72} s={0.55} flip top="#191919" skin={SKIN[(f + 2) % 5]} hair={HAIR[(f + 1) % 3]} />
          </g>
        );
      })}
      {/* dashboard */}
      <g className="bl-float">
        <rect x="40" y="196" width="130" height="90" rx="10" fill="#191919" />
        <rect x="47" y="203" width="116" height="76" rx="5" fill="#fff" />
        <rect x="54" y="210" width="102" height="12" rx="3" fill="#2563EB" />
        <Tx x="60" y="219.5" size="8" fill="#fff">Publish to 4 floors</Tx>
        {[0, 1, 2].map((i) => (
          <rect key={i} x="54" y={228 + i * 14} width={90 - i * 16} height="8" rx="3" fill="#EAF1FF" />
        ))}
      </g>
      {floors.map((f) => {
        const d = `M170 226C200 ${226 - f * 20} 240 ${76 + f * 80} 372 ${78 + f * 80}`;
        return (
          <g key={f}>
            <path d={d} fill="none" stroke="#2563EB" strokeWidth="1.8" className="bl-dash-slow" opacity="0.6" />
            <Traveller d={d} r={4} fill="#F5C542" dur={2.2} delay={f * 0.45} />
          </g>
        );
      })}
      <Spark x={560} y={60} r={12} fill="#2563EB" />
      <Spark x={150} y={70} r={9} delay={0.6} />
    </Svg>
  );
}

/* 5 — Standees → screens: a fading, curling vinyl standee beside a bright screen. */
export function CoverStandees() {
  return (
    <Svg id="standees">
      <rect width="640" height="360" fill="#FFF4E8" />
      <Dots id="cv5d" color="#F97316" opacity={0.18} />
      {/* sunbeam */}
      <path d="M0 0L250 0L180 360H0z" fill="#FFE2B8" opacity="0.6" />
      <circle cx="40" cy="40" r="26" fill="#FFB020" />
      {/* standee */}
      <rect x="148" y="320" width="76" height="10" rx="4" fill="#4B5563" />
      <rect x="182" y="290" width="8" height="34" fill="#4B5563" />
      <g className="bl-curl">
        <rect x="120" y="52" width="132" height="240" rx="4" fill="#FBD7B8" stroke="#191919" strokeWidth="2.5" />
        <rect x="132" y="66" width="108" height="70" rx="3" fill="#F3B48A" opacity="0.7" />
        <Tx x="186" y="168" size="26" anchor="middle" fill="#C98A64" opacity="0.7">SALE</Tx>
        <Tx x="186" y="194" size="12" anchor="middle" fill="#C98A64" opacity="0.6">ENDED LAST WEEK</Tx>
        <rect x="140" y="214" width="92" height="10" rx="5" fill="#E7B896" />
        <rect x="150" y="232" width="72" height="8" rx="4" fill="#E7B896" />
        {/* peeling corner */}
        <path d="M252 52v34l-26-34z" fill="#fff" stroke="#191919" strokeWidth="2" />
      </g>
      {/* falling scraps */}
      {[0, 1, 2].map((i) => (
        <g key={i} className="bl-fall" style={{ animationDelay: `${i * 1}s` }}>
          <rect x={150 + i * 30} y="296" width="8" height="5" rx="1" fill="#F3B48A" />
        </g>
      ))}
      <Chip x={128} y={20} w={116} fill="#fff" color="#6B7280" stroke="#191919">Printed standee</Chip>
      {/* arrow */}
      <path d="M282 180c30-30 60-30 90 0" fill="none" stroke="#191919" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 7" className="bl-dash" />
      <path d="M372 180l-12-2 6-10z" fill="#191919" />
      {/* screen */}
      <Display x="392" y="44" w="150" h="250" glass="#F97316" stand id="cv5s">
        <g className="bl-ph3-a">
          <rect width="150" height="250" fill="#F97316" />
          <Tx x="14" y="48" size="22" fill="#fff">MONSOON</Tx>
          <Tx x="14" y="74" size="22" fill="#fff">SALE</Tx>
          <circle cx="94" cy="150" r="40" fill="#F5C542" />
          <Tx x="94" y="158" size="22" anchor="middle">40%</Tx>
        </g>
        <g className="bl-ph3-b">
          <rect width="150" height="250" fill="#914BFA" />
          <Tx x="14" y="48" size="22" fill="#fff">NEW</Tx>
          <Tx x="14" y="74" size="22" fill="#fff">ARRIVALS</Tx>
          <rect x="30" y="110" width="80" height="80" rx="40" fill="#fff" opacity="0.9" />
        </g>
        <g className="bl-ph3-c">
          <rect width="150" height="250" fill="#1F30A0" />
          <Tx x="14" y="48" size="22" fill="#fff">FESTIVE</Tx>
          <Tx x="14" y="74" size="22" fill="#F5C542">OFFER</Tx>
          <Spark x={70} y={150} r={26} />
        </g>
      </Display>
      <Chip x={406} y={20} w={124} fill="#F97316" stroke="#191919">Digital screen</Chip>
      <Spark x={590} y={90} r={12} fill="#F97316" />
      <Spark x={596} y={280} r={8} delay={0.8} />
    </Svg>
  );
}

/* 6 — CMS checklist: clipboard ticking itself in front of a monitored screen wall. */
export function CoverCmsChecklist() {
  const rows = ["Multi-zone layouts", "Dayparting", "Role-based access", "Remote monitoring", "Support & warranty"];
  return (
    <Svg id="cms">
      <rect width="640" height="360" fill="#EAF8EF" />
      <Dots id="cv6d" color="#2E9E5B" opacity={0.2} />
      {/* screen wall */}
      {Array.from({ length: 6 }, (_, i) => {
        const x = 330 + (i % 3) * 96;
        const y = 50 + Math.floor(i / 3) * 76;
        return (
          <g key={i}>
            <rect x={x} y={y} width="86" height="60" rx="6" fill="#191919" />
            <rect x={x + 4} y={y + 4} width="78" height="52" rx="3" fill={["#2E9E5B", "#914BFA", "#1F30A0", "#F5C542", "#E4572E", "#14B8A6"][i]} />
            <rect x={x + 10} y={y + 12} width="40" height="6" rx="3" fill="#fff" opacity="0.9" />
            <rect x={x + 10} y={y + 22} width="28" height="5" rx="2.5" fill="#fff" opacity="0.6" />
            <circle cx={x + 76} cy={y + 50} r="5" fill="#4CAF6E" stroke="#fff" strokeWidth="1.5" />
            <g className="bl-pulse" style={{ animationDelay: `${i * 0.3}s` }}>
              <circle cx={x + 76} cy={y + 50} r="5" fill="none" stroke="#4CAF6E" strokeWidth="1.5" />
            </g>
          </g>
        );
      })}
      {/* gear */}
      <g className="bl-spin">
        <g transform="translate(590 290)">
          {Array.from({ length: 8 }, (_, i) => (
            <rect key={i} x="-5" y="-30" width="10" height="14" rx="2" fill="#191919" transform={`rotate(${i * 45})`} />
          ))}
          <circle r="20" fill="#191919" />
          <circle r="8" fill="#EAF8EF" />
        </g>
      </g>
      {/* clipboard */}
      <g className="bl-float">
        <rect x="60" y="40" width="230" height="290" rx="14" fill="#8A5A3C" stroke="#191919" strokeWidth="3" />
        <rect x="76" y="62" width="198" height="254" rx="6" fill="#fff" />
        <rect x="132" y="28" width="86" height="28" rx="8" fill="#4B5563" stroke="#191919" strokeWidth="2.5" />
        <Tx x="92" y="92" size="14">CMS CHECKLIST</Tx>
        {rows.map((r, i) => (
          <g key={r}>
            <rect x="92" y={110 + i * 40} width="22" height="22" rx="5" fill="#fff" stroke="#191919" strokeWidth="2" />
            <path
              d={`M96 ${121 + i * 40}l5 5 9-11`}
              fill="none"
              stroke="#2E9E5B"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="bl-tick"
              style={{ animationDelay: `${i * 0.5}s`, animationDuration: "5s" }}
            />
            <Tx x="124" y={126 + i * 40} size="12" weight="700" fill="#374151">
              {r}
            </Tx>
          </g>
        ))}
      </g>
      <Spark x={312} y={40} r={10} fill="#2E9E5B" />
      <Cloud x={470} y={300} s={0.7} />
    </Svg>
  );
}

export const COVERS = {
  "digital-menu-boards-indian-restaurants-qsr": CoverMenuBoards,
  "multi-location-retail-digital-signage-campaigns": CoverMultiLocation,
  "commercial-display-vs-consumer-tv-digital-signage": CoverDisplayVsTv,
  "corporate-office-communication-screens-multiple-floors": CoverCorporate,
  "printed-standees-to-digital-displays-mistakes": CoverStandees,
  "digital-signage-cms-features-checklist": CoverCmsChecklist,
};
