import { Art, Display, Tx, Chip, Person, SKIN, HAIR, Spark, Clock } from "./shared";
import { Seg, useCycle } from "../kit";

/* Blog 5 — Five mistakes when moving from printed standees to screens. */

const INK = "#191919";
const ORANGE = "#F97316";
const VIOLET = "#914BFA";
const GOLD = "#F5C542";
const CREAM = "#FFF4E8";
const RED = "#EF4444";
const GREEN = "#4CAF6E";
const SLATE = "#64748B";

/* Mistake 1 — a static PDF on the screen vs a short motion loop. */
export function StaticVsMotionFigure({ inView }) {
  const [m, pick] = useCycle(2, 4000, inView);
  const motion = m === 1;
  return (
    <div>
      <div className="border-b-2 border-sb-ink bg-white px-4 py-3">
        <Seg label="What is on the screen" options={["A static poster file", "A 5–10 second loop"]} value={m} onChange={pick} />
      </div>
      <Art viewBox="0 0 480 280" label={motion ? "A short motion loop on the screen catches the eye of people walking past." : "A static poster image on the screen blends into the background."}>
        <rect width="480" height="280" fill={CREAM} />
        <Display x={140} y={24} w={200} h={160} glass={motion ? ORANGE : "#E8DCCB"} mount>
          {motion ? (
            <g key="m">
              <g className="bl-swap">
                <Tx x={18} y={48} size={24} fill="#fff">WEEKEND</Tx>
                <Tx x={18} y={78} size={24} fill={GOLD}>SALE</Tx>
              </g>
              <g className="bl-beat">
                <circle cx="146" cy="104" r="34" fill={GOLD} />
                <Tx x={146} y={114} size={24} anchor="middle">40%</Tx>
              </g>
              <rect x="18" y="100" width="70" height="12" rx="6" fill="#fff" className="bl-fill" />
            </g>
          ) : (
            <g key="s">
              <Tx x={18} y={44} size={17} fill="#9C8B76">WEEKEND SALE</Tx>
              {[0, 1, 2, 3, 4, 5].map((k) => (
                <rect key={k} x="18" y={58 + k * 14} width={[150, 120, 140, 100, 130, 90][k]} height="7" rx="3" fill="#D6C7B2" />
              ))}
              <Tx x={18} y={152} size={10} fill="#C3B49F">poster.pdf</Tx>
            </g>
          )}
        </Display>
        {/* passers-by: heads turn when it moves */}
        <g className="bl-walk" style={{ animationDuration: "13s" }}>
          <Person x={0} y={272} s={0.95} top={VIOLET} skin={SKIN[1]} hair={HAIR[0]} walk pose={motion ? "point" : "stand"} />
        </g>
        <g className="bl-walk" style={{ animationDuration: "17s", animationDelay: "-6s" }}>
          <Person x={0} y={274} s={0.9} top={GREEN} skin={SKIN[3]} hair={HAIR[1]} hairStyle="long" walk pose={motion ? "point" : "stand"} />
        </g>
        {motion &&
          [0, 1, 2].map((k) => (
            <g key={k} className="bl-pulse" style={{ animationDelay: `${k * 0.6}s` }}>
              <circle cx="240" cy="104" r="50" fill="none" stroke={ORANGE} strokeWidth="2" />
            </g>
          ))}
        <Chip x={140} y={200} w={200} h={28} fill={motion ? ORANGE : "#D6C7B2"} color={motion ? "#fff" : INK} stroke={INK} size={12}>
          {motion ? "Movement earns a glance" : "Blends into the background"}
        </Chip>
      </Art>
    </div>
  );
}

/* Mistake 2 — glare on a shopfront, and screen height. */
export function GlareFigure({ inView }) {
  const [m, pick] = useCycle(2, 4000, inView);
  const bright = m === 1;
  return (
    <div>
      <div className="border-b-2 border-sb-ink bg-white px-4 py-3">
        <Seg label="Screen choice" options={["Household TV at the window", "High-brightness commercial display"]} value={m} onChange={pick} />
      </div>
      <Art viewBox="0 0 480 300" label={bright ? "A high-brightness commercial display stays readable at a sunlit shopfront, mounted at eye level." : "A household TV at a sunlit shopfront washes out into a mirror and is mounted too high."}>
        <rect width="480" height="300" fill="#FFE7C2" />
        <g className="bl-spin" style={{ animationDuration: "26s" }}>
          <g transform="translate(60 48)">
            {Array.from({ length: 12 }, (_, k) => (
              <rect key={k} x="-3" y="-48" width="6" height="18" rx="3" fill={GOLD} transform={`rotate(${k * 30})`} />
            ))}
          </g>
        </g>
        <circle cx="60" cy="48" r="24" fill={GOLD} />
        {[0, 1, 2].map((k) => (
          <path key={k} d={`M${84 + k * 8} ${62 + k * 12}L${260 + k * 10} ${150 + k * 14}`} stroke={GOLD} strokeWidth="5" strokeLinecap="round" opacity="0.55" />
        ))}
        {/* shopfront glass */}
        <rect x="160" y="20" width="300" height="250" fill="#CFE8FF" opacity="0.4" stroke={INK} strokeWidth="3" />
        <Display x={bright ? 230 : 250} y={bright ? 110 : 44} w={170} h={110} glass={bright ? VIOLET : "#5B6B8C"} mount>
          <Tx x={16} y={44} size={19} fill={bright ? "#fff" : "#8FA0BE"}>JUST DROPPED</Tx>
          <rect x="16" y="56" width="70" height="10" rx="5" fill={bright ? GOLD : "#8FA0BE"} />
          <circle cx="128" cy="62" r="24" fill={bright ? GOLD : "#8FA0BE"} />
          {!bright && (
            <>
              <rect width="170" height="110" fill="#fff" opacity="0.6" />
              <path d="M-10 110L80 -10h46L30 110z" fill="#fff" opacity="0.7" />
            </>
          )}
        </Display>
        {/* eye level line */}
        <line x1="170" y1="170" x2="450" y2="170" stroke={bright ? GREEN : RED} strokeWidth="2" strokeDasharray="7 6" />
        <Tx x={448} y={164} size={11} anchor="end" fill={bright ? GREEN : RED}>
          eye level
        </Tx>
        <Person x={200} y={268} s={1} top="#E4572E" skin={SKIN[2]} hair={HAIR[0]} hairStyle="bun" pose={bright ? "point" : "stand"} />
        <g key={m} className="bl-swap">
          <Chip x={160} y={276} w={300} h={26} fill={bright ? GREEN : RED} size={11.5}>
            {bright ? "Readable, and where people actually look" : "A mirror at eye-ache height"}
          </Chip>
        </g>
      </Art>
    </div>
  );
}

/* Mistake 3 — clutter vs one focused slide, with a 3–5 second attention timer. */
export function ClutterFigure({ inView }) {
  const [m, pick] = useCycle(2, 4200, inView);
  const [slide] = useCycle(3, 2200, inView);
  const clean = m === 1;
  const SLIDES = [
    { h: "WEEKEND SALE", s: "Up to 40% off", cta: "Today only" },
    { h: "NEW ARRIVALS", s: "Linen collection", cta: "In store now" },
    { h: "MEMBER OFFER", s: "Extra 10% off", cta: "Join free" },
  ];
  const sl = SLIDES[slide];
  return (
    <div>
      <div className="border-b-2 border-sb-ink bg-white px-4 py-3">
        <Seg label="Layout" options={["Everything on one slide", "One visual, one headline, one CTA"]} value={m} onChange={pick} />
      </div>
      <Art viewBox="0 0 480 290" label={clean ? `A focused slide: ${sl.h}, ${sl.s}, ${sl.cta}, rotating in a scheduled playlist.` : "A cluttered slide with every product, discount, QR code and terms crammed together."}>
        <rect width="480" height="290" fill={CREAM} />
        <Display x={40} y={20} w={300} h={200} glass={clean ? VIOLET : "#fff"}>
          {clean ? (
            <g key={slide} className="bl-swap">
              <circle cx="222" cy="100" r="60" fill={GOLD} />
              <Tx x={24} y={70} size={26} fill="#fff">{sl.h}</Tx>
              <Tx x={24} y={100} size={15} weight={700} fill="#fff" opacity="0.85">{sl.s}</Tx>
              <rect x="24" y="118" width="110" height="34" rx="17" fill="#fff" />
              <Tx x={79} y={140} size={13} anchor="middle" fill={VIOLET}>{sl.cta}</Tx>
            </g>
          ) : (
            <g key="clutter">
              {Array.from({ length: 18 }, (_, k) => (
                <g key={k}>
                  <rect x={10 + (k % 6) * 48} y={10 + Math.floor(k / 6) * 44} width="44" height="26" rx="3" fill={["#FDE68A", "#FBCFE8", "#BFDBFE", "#BBF7D0"][k % 4]} stroke={INK} strokeWidth="1" />
                  <Tx x={32 + (k % 6) * 48} y={27 + Math.floor(k / 6) * 44} size={8} anchor="middle">₹{199 + k * 20}</Tx>
                </g>
              ))}
              <rect x="10" y="146" width="280" height="44" fill="#fff" />
              {[0, 1, 2, 3].map((k) => (
                <rect key={k} x="14" y={150 + k * 10} width={270 - k * 20} height="4" rx="2" fill="#D1D5DB" />
              ))}
              <rect x="236" y="100" width="46" height="46" fill={INK} />
              <rect x="242" y="106" width="34" height="34" fill="#fff" />
            </g>
          )}
        </Display>
        {/* attention timer */}
        <g>
          <Clock x={400} y={92} r={38} hour={0} minute={0} spin />
          <Tx x={400} y={150} size={13} anchor="middle">3–5 seconds</Tx>
          <Tx x={400} y={168} size={11} anchor="middle" weight={700} fill={SLATE}>of attention</Tx>
        </g>
        {/* playlist strip */}
        {clean && (
          <g className="bl-swap">
            {[0, 1, 2].map((k) => (
              <rect key={k} x={40 + k * 104} y="236" width="96" height="32" rx="6" fill={k === slide ? VIOLET : "#fff"} stroke={INK} strokeWidth="2" className="bl-ease" />
            ))}
            {[0, 1, 2].map((k) => (
              <Tx key={k} x={88 + k * 104} y={256} size={10.5} anchor="middle" fill={k === slide ? "#fff" : INK}>
                {SLIDES[k].h}
              </Tx>
            ))}
            <Tx x={404} y={256} size={11} anchor="middle" weight={700} fill={SLATE}>playlist</Tx>
          </g>
        )}
        {!clean && (
          <Chip x={40} y={238} w={300} h={28} fill={RED} size={12}>
            Cognitive overload — people look away
          </Chip>
        )}
      </Art>
    </div>
  );
}

/* Mistake 4 — recurring print costs vs one screen. */
export function PrintCostFigure({ inView }) {
  const [q] = useCycle(4, 1600, inView);
  const quarters = ["Q1", "Q2", "Q3", "Q4"];
  return (
    <Art viewBox="0 0 480 290" label="Printed standees are reprinted every quarter with courier and installation costs, while one screen is updated remotely.">
      <rect width="480" height="290" fill={CREAM} />
      <Tx x={20} y={30} size={13} fill={SLATE}>PRINTED STANDEES &amp; FLEX</Tx>
      <Tx x={460} y={30} size={13} anchor="end" fill={ORANGE}>DIGITAL SCREEN</Tx>
      <line x1="240" y1="44" x2="240" y2="270" stroke={INK} strokeWidth="2" strokeDasharray="6 6" />
      {/* stack of reprints */}
      {quarters.map((qt, k) => (
        <g key={qt} className="bl-ease" style={{ opacity: k <= q ? 1 : 0.15, transition: "opacity 0.5s" }}>
          <g transform={`rotate(${-6 + k * 4} 110 ${200 - k * 34})`}>
            <rect x="60" y={168 - k * 34} width="104" height="64" rx="4" fill="#FBD7B8" stroke={INK} strokeWidth="2" />
            <Tx x={112} y={196 - k * 34} size={13} anchor="middle" fill="#9C7A5B">{qt} SALE</Tx>
            <Tx x={112} y={212 - k * 34} size={9} anchor="middle" fill="#B99B7C">reprint + courier</Tx>
          </g>
        </g>
      ))}
      <Tx x={112} y={262} size={12} anchor="middle" weight={700} fill={SLATE}>
        every campaign, again
      </Tx>
      {/* one screen */}
      <Display x={290} y={70} w={150} h={120} glass={ORANGE} stand>
        <g key={q} className="bl-swap">
          <Tx x={14} y={44} size={20} fill="#fff">{quarters[q]} SALE</Tx>
          <rect x="14" y="56" width="60" height="10" rx="5" fill={GOLD} />
          <circle cx="110" cy="76" r="22" fill={GOLD} />
        </g>
      </Display>
      <Chip x={296} y={226} w={140} h={26} fill={ORANGE} size={11.5}>
        updated from a phone
      </Chip>
      <Tx x={366} y={272} size={12} anchor="middle" weight={700} fill={SLATE}>
        same screen, no reprints
      </Tx>
      <Spark x={456} y={66} r={10} fill={ORANGE} />
    </Art>
  );
}

/* Mistake 5 — support, warranty and maintenance behind the screen. */
export function SupportFigure({ inView }) {
  const [p] = useCycle(3, 2400, inView);
  const fixed = p === 2;
  return (
    <Art viewBox="0 0 480 280" label="A screen fails during a festive sale; support, warranty and maintenance bring it back.">
      <rect width="480" height="280" fill={CREAM} />
      {/* shopfront */}
      <rect x="20" y="40" width="250" height="210" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <path d="M14 40h262l-12-24H26z" fill={GOLD} stroke={INK} strokeWidth="2.5" />
      <Display x={56} y={70} w={178} h={118} glass={fixed ? ORANGE : "#2B2B2B"} mount>
        {fixed ? (
          <g className="bl-swap">
            <Tx x={16} y={44} size={19} fill="#fff">FESTIVE SALE</Tx>
            <rect x="16" y="56" width="66" height="10" rx="5" fill={GOLD} />
            <circle cx="128" cy="70" r="24" fill={GOLD} />
          </g>
        ) : (
          <g className="bl-blink">
            <Tx x={85} y={64} size={13} anchor="middle" fill="#6B7280">no signal</Tx>
          </g>
        )}
      </Display>
      <Person x={150} y={246} s={0.85} top={VIOLET} skin={SKIN[1]} hair={HAIR[0]} hairStyle="long" pose={fixed ? "wave" : "stand"} />
      {/* one team to call */}
      <rect x="300" y="60" width="160" height="150" rx="14" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <Tx x={380} y={88} size={13} anchor="middle">ONE TEAM TO CALL</Tx>
      {["Support", "Warranty", "Maintenance"].map((t, k) => (
        <g key={t} className="bl-ease" style={{ opacity: p >= 1 ? 1 : 0.35 }}>
          <circle cx="326" cy={118 + k * 34} r="11" fill={[ORANGE, GOLD, GREEN][k]} stroke={INK} strokeWidth="2" />
          <path d={`M321 ${118 + k * 34}l4 4 7-8`} fill="none" stroke={k === 1 ? INK : "#fff"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="bl-tick" style={{ animationDelay: `${k * 0.3}s` }} />
          <Tx x={346} y={123 + k * 34} size={13}>{t}</Tx>
        </g>
      ))}
      <g key={p} className="bl-swap">
        <Chip x={300} y={226} w={160} h={28} fill={fixed ? GREEN : RED} size={11.5}>
          {["Screen down mid-sale", "Help on the way", "Back on"][p]}
        </Chip>
      </g>
    </Art>
  );
}
