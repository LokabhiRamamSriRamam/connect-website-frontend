import { C, FONT, Screen, T } from "../../../../components/screenbazaar/illustrations/kit.jsx";

/**
 * WEBSITE/UI art — a venue with five displays, previewing what the test drive is.
 *
 * This is interface illustration, NOT a signage creative. Signage creatives live in
 * ../../creatives/ with their own registry and renderer; the two never mix.
 *
 * Drawn on the repo's shared 400x300 viewBox via illustrations/kit.jsx.
 */
export default function WelcomeArt() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="sb-anim h-auto w-full"
      role="img"
      aria-label="Five displays in a venue, each showing different content"
    >
      {/* room */}
      <rect width="400" height="300" fill={C.lavender} />
      <rect y="214" width="400" height="86" fill={C.sand} />
      <path d="M0 214h400v6H0z" fill={C.taupe} opacity="0.5" />

      {/* back wall panelling */}
      {[40, 120, 200, 280, 360].map((x) => (
        <rect key={x} x={x} y="24" width="1" height="190" fill={C.mist} />
      ))}

      {/* Screen 01 — the hero display, centre back wall */}
      <Screen x={132} y={46} w={136} h={82} r={7}>
        <rect width="136" height="82" fill={C.indigo} />
        <circle cx="104" cy="52" r="30" fill={C.gold} opacity="0.85" />
        <T x={12} y={30} size={15} weight={800} fill={C.white}>
          TODAY
        </T>
        <T x={12} y={48} size={9} weight={600} fill={C.white} opacity="0.9">
          Fresh all day
        </T>
        <rect x={12} y={58} width={44} height={9} rx={4.5} fill={C.white} opacity="0.95" />
      </Screen>
      <T x={200} y={140} size={8} weight={800} fill={C.muted} anchor="middle">
        SCREEN 01
      </T>

      {/* Screen 02 — left, angled wall, cycles two creatives */}
      <Screen x={24} y={70} w={86} h={56} r={6}>
        <g className="sb-c2" data-first>
          <rect width="86" height="56" fill={C.violet} />
          <T x={9} y={24} size={11} weight={800} fill={C.white}>
            2 for 1
          </T>
          <T x={9} y={38} size={7} weight={600} fill={C.white} opacity="0.9">
            Till 6 pm
          </T>
        </g>
        <g className="sb-c2" style={{ animationDelay: "3s" }}>
          <rect width="86" height="56" fill={C.iris} />
          <T x={9} y={24} size={11} weight={800} fill={C.white}>
            NEW
          </T>
          <T x={9} y={38} size={7} weight={600} fill={C.white} opacity="0.9">
            Cold brew
          </T>
        </g>
      </Screen>
      <T x={67} y={138} size={7} weight={800} fill={C.muted} anchor="middle">
        SCREEN 02
      </T>

      {/* Screen 03 — right, portrait orientation */}
      <Screen x={296} y={58} w={60} h={80} r={6}>
        <rect width="60" height="80" fill={C.white} />
        <rect width="60" height="20" fill={C.purple} />
        <T x={8} y={14} size={8} weight={800} fill={C.white}>
          MENU
        </T>
        {[30, 44, 58].map((y, i) => (
          <g key={y}>
            <rect x={8} y={y - 7} width={28} height={4} rx={2} fill={C.mist} />
            <rect x={42} y={y - 7} width={10} height={4} rx={2} fill={C.violet} opacity={0.8 - i * 0.2} />
          </g>
        ))}
      </Screen>
      <T x={326} y={148} size={7} weight={800} fill={C.muted} anchor="middle">
        03
      </T>

      {/* Screens 04 + 05 — a mirrored pair on stands, showing the SAME creative */}
      <Screen x={96} y={162} w={74} h={46} r={5} stand>
        <rect width="74" height="46" fill={C.green} />
        <T x={8} y={20} size={10} weight={800} fill={C.white}>
          COMBO
        </T>
        <T x={8} y={33} size={7} weight={600} fill={C.white} opacity="0.9">
          ₹249
        </T>
      </Screen>
      <Screen x={226} y={162} w={74} h={46} r={5} stand>
        <rect width="74" height="46" fill={C.green} />
        <T x={8} y={20} size={10} weight={800} fill={C.white}>
          COMBO
        </T>
        <T x={8} y={33} size={7} weight={600} fill={C.white} opacity="0.9">
          ₹249
        </T>
      </Screen>

      {/* the mirror relationship, drawn as a flowing link */}
      <path
        d="M176 185h44"
        fill="none"
        stroke={C.violet}
        strokeWidth="2"
        strokeLinecap="round"
        className="sb-dash"
      />
      <g>
        <rect x={180} y={170} width={36} height={13} rx={6.5} fill={C.violet} />
        <text
          x={198}
          y={179.5}
          fontFamily={FONT}
          fontSize={7}
          fontWeight={800}
          fill={C.white}
          textAnchor="middle"
        >
          MIRROR
        </text>
      </g>
      <T x={133} y={228} size={7} weight={800} fill={C.muted} anchor="middle">
        SCREEN 04
      </T>
      <T x={263} y={228} size={7} weight={800} fill={C.muted} anchor="middle">
        SCREEN 05
      </T>

      {/* a phone doing the controlling */}
      <g className="sb-float">
        <rect x={330} y={196} width={46} height={80} rx={9} fill={C.ink} />
        <rect x={334} y={204} width={38} height={64} rx={4} fill={C.white} />
        <rect x={338} y={209} width={22} height={4} rx={2} fill={C.violet} />
        {[220, 232, 244].map((y, i) => (
          <g key={y}>
            <rect x={338} y={y} width={30} height={8} rx={2} fill={C.lilac} />
            <rect x={340} y={y + 2} width={i === 0 ? 20 : i === 1 ? 13 : 24} height={4} rx={2} fill={C.violet} />
          </g>
        ))}
        <rect x={338} y={256} width={30} height={8} rx={4} fill={C.green} />
        <circle cx={353} cy={272} r={2.5} fill={C.slate} />
      </g>
    </svg>
  );
}
