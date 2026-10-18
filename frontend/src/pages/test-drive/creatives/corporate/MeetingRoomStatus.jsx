import { C, CText } from "../kit.jsx";

/**
 * Meeting-room status — the screen outside the door.
 *
 * Drawn as a door with a status indicator: a vertical door panel on the right,
 * a round indicator lamp beside its handle, and the room name at the top of
 * the plate. Green for available (default) or red when the editor types a
 * busy status — but the status is CARRIED BY THE TEXT, not by the colour. The
 * lamp is always the accent colour from the palette, so the message is in the
 * words a non-sighted reader also gets.
 *
 * `f` arrives allowlisted and String()-coerced by CreativeFrame.
 */
export default function MeetingRoomStatus({ f, limits, palette }) {
  const p = palette || {};
  const accent = p.accent || C.green;
  return (
    <g>
      <rect width="320" height="180" fill={p.bg || C.cream} />
      <rect x="0" y="0" width="320" height="4" fill={accent} />

      {/* The door, upright on the right side. A simple rectangle with a thin
          frame line and a round handle. */}
      <g>
        {/* Door panel. */}
        <rect x="238" y="36" width="56" height="124" rx="2" fill={C.white} stroke={accent} strokeWidth="1.5" />
        {/* Inset panel line, so it reads as a door and not a slab. */}
        <rect x="246" y="48" width="40" height="92" fill="none" stroke={accent} strokeWidth="1" opacity="0.5" />
        {/* Handle. */}
        <circle cx="246" cy="100" r="2.5" fill={accent} />
        {/* Hinges on the right edge. */}
        <rect x="291" y="48" width="3" height="6" fill={accent} opacity="0.6" />
        <rect x="291" y="142" width="3" height="6" fill={accent} opacity="0.6" />
      </g>

      {/* Status lamp beside the door, with a ring halo so it reads as lit.
          Position: left of the door at the handle's height. */}
      <g>
        <circle cx="218" cy="100" r="14" fill={accent} opacity="0.15" />
        <circle cx="218" cy="100" r="8" fill={accent} />
        <circle cx="215" cy="97" r="2.5" fill={C.white} opacity="0.65" />
      </g>

      <CText
        x="22"
        y="40"
        size={11}
        weight={800}
        fill={p.kicker || C.muted}
        limit={limits.businessName}
      >
        {f.businessName}
      </CText>

      <CText
        x="22"
        y="78"
        size={22}
        weight={800}
        fill={p.fg || C.ink}
        limit={limits.headline}
      >
        {f.headline}
      </CText>

      {/* The status line is the payload — set it on a plate, so it reads as
          operational and not editorial. */}
      <rect x="18" y="92" width="180" height="24" rx="12" fill={accent} />
      <CText x="30" y="108" size={12.5} weight={800} fill={C.white} limit={limits.detail}>
        {f.detail}
      </CText>

      <CText
        x="22"
        y="140"
        size={13}
        weight={700}
        fill={p.fg || C.ink}
        limit={limits.hours}
      >
        {f.hours}
      </CText>
    </g>
  );
}
