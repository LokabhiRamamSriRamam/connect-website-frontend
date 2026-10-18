import { C, CText } from "../kit.jsx";

/**
 * Lobby welcome — the first stop on the plan's guest's-day route, and the card
 * that carries its key-card motif. 320x180 (16:9); CreativeFrame owns the <svg>
 * and the viewBox.
 *
 * The guest's name is the payload and is CENTRED, which is the one layout
 * decision here that matters: a welcome addressed to a specific person is the
 * whole point of the card, and centring it is what makes it read as an address
 * rather than as a heading. It also means the field grows in both directions,
 * which is why its cap in the manifest is geometric.
 *
 * No call to action. A welcome board that asks the guest to do something has
 * misunderstood its job.
 *
 * `f` arrives already allowlisted and String()-coerced by CreativeFrame. Every
 * visible string goes through CText, so overflow is clamped and markup is
 * impossible.
 */
export default function LobbyWelcome({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.gold;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.indigo} />

      {/* Evening light: a soft pool of warmth from the top left, as a lobby
          lamp would throw it. */}
      <circle cx="46" cy="16" r="92" fill={accent} opacity="0.1" />

      {/* A gold hairline frame, inset. The cheapest way to make a flat indigo
          card read as deliberate rather than unstyled — the same device the
          retail members card uses on black. */}
      <rect
        x="12"
        y="12"
        width="296"
        height="156"
        fill="none"
        stroke={accent}
        strokeWidth="1"
        opacity="0.5"
      />

      {/* Two key cards, fanned, at the lower right. Drawn small: this card's
          hero is the name, and the motif is here to set the scene. */}
      <g transform="translate(252 134) rotate(-10)">
        <rect x="-30" y="-19" width="60" height="38" rx="4" fill={C.white} opacity="0.22" />
      </g>
      <g transform="translate(258 132) rotate(6)">
        <rect x="-30" y="-19" width="60" height="38" rx="4" fill={accent} />
        {/* Magnetic stripe and a punch hole, so it reads as a key and not a
            blank rectangle. */}
        <rect x="-30" y="-13" width="60" height="7" fill={C.ink} opacity="0.65" />
        <circle cx="19" cy="9" r="3.5" fill={C.ink} opacity="0.3" />
      </g>

      <CText
        x="28"
        y="42"
        size={11}
        weight={800}
        fill={p.kicker || C.mist}
        limit={limits.businessName}
      >
        {f.businessName}
      </CText>

      {/* "Welcome" — the kicker's partner, centred over the name below it. */}
      <CText
        x="160"
        y="78"
        size={15}
        weight={700}
        fill={accent}
        anchor="middle"
        limit={limits.headline}
      >
        {f.headline}
      </CText>

      <CText
        x="160"
        y="108"
        size={24}
        weight={800}
        fill={p.fg || C.white}
        anchor="middle"
        limit={limits.guestName}
      >
        {f.guestName}
      </CText>

      {/* A short rule under the name, centred on the same axis. */}
      <rect x="130" y="120" width="60" height="2" rx="1" fill={accent} opacity="0.8" />

      <CText
        x="28"
        y="150"
        size={11.5}
        weight={700}
        fill={p.kicker || C.mist}
        limit={limits.detail}
      >
        {f.detail}
      </CText>
    </g>
  );
}
