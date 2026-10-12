import { C, FONT } from "../../../../components/screenbazaar/illustrations/kit.jsx";

/**
 * The four non-playing screen states, drawn as SVG that fills its viewBox.
 *
 * These are WEBSITE/UI art, not signage creatives: they describe the simulator's
 * own state. They live under components/art/ and never in creatives/, which has
 * its own registry and its single audited render path (CreativeFrame). Nothing
 * here ever receives visitor text, so there is no field-safety concern — the one
 * reason the two trees must not share a module.
 *
 * resolveScreen's five kinds must be visually TELLABLE APART, not just differently
 * labelled, so each one gets its own mark and palette:
 *
 *   idle        violet moon on lavender   — resting, but healthy
 *   no-content  dashed empty frame        — awake and willing, nothing to show
 *   offline     grey severed plug, flat   — no power/connection, visibly dead
 *   broken-link amber broken chain        — a configuration fault, not a dark screen
 *
 * "creative" is not here: a playing screen renders through CreativeFrame.
 */

/** Shared glass background so every state fills the bezel identically. */
function Glass({ bg, children }) {
  return (
    <svg viewBox="0 0 160 90" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="160" height="90" fill={bg} />
      {children}
    </svg>
  );
}

function Caption({ children, fill = C.muted }) {
  return (
    <text
      x="80"
      y="74"
      fontFamily={FONT}
      fontSize="9"
      fontWeight="800"
      fill={fill}
      textAnchor="middle"
    >
      {children}
    </text>
  );
}

/** Outside active hours: the screen is fine, it is simply resting. */
export function IdleArt({ label }) {
  return (
    <Glass bg={C.lilac}>
      {/* A crescent, cut by overlaying a second circle in the background colour. */}
      <circle cx="80" cy="38" r="15" fill={C.violet} />
      <circle cx="87" cy="33" r="13" fill={C.lilac} />
      <circle cx="56" cy="24" r="1.6" fill={C.violet} opacity="0.7" />
      <circle cx="104" cy="28" r="1.2" fill={C.violet} opacity="0.5" />
      <circle cx="98" cy="50" r="1" fill={C.violet} opacity="0.45" />
      <Caption fill={C.iris}>{label}</Caption>
    </Glass>
  );
}

/** Nothing scheduled right now: an empty slot, drawn as an empty frame. */
export function NoContentArt({ label }) {
  return (
    <Glass bg={C.ivory}>
      <rect
        x="58"
        y="22"
        width="44"
        height="32"
        rx="4"
        fill="none"
        stroke={C.taupe}
        strokeWidth="2"
        strokeDasharray="5 4"
      />
      {/* A horizon and sun, greyed — the shape of a picture with no picture in it. */}
      <path d="M62 48h36" stroke={C.taupe} strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="72" cy="36" r="4" fill="none" stroke={C.taupe} strokeWidth="1.6" />
      <Caption>{label}</Caption>
    </Glass>
  );
}

/** Offline: flat, colourless, unmistakably dead. The only dark state. */
export function OfflineArt({ label }) {
  return (
    <Glass bg="#2A2A2E">
      {/* A plug pulled out of its socket — the gap is the whole message. */}
      <path
        d="M66 38h-9M66 32v12a4 4 0 0 0 4 4h2"
        fill="none"
        stroke="#6B6B74"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <rect x="86" y="30" width="12" height="16" rx="3" fill="none" stroke="#6B6B74" strokeWidth="2.4" />
      <path d="M98 34h6M98 42h6" stroke="#6B6B74" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M74 38h6" stroke="#4A4A52" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="2 3" />
      <Caption fill="#8A8A94">{label}</Caption>
    </Glass>
  );
}

/**
 * Broken link: a mirror pointing at nothing, or a loop. Amber rather than grey,
 * because unlike offline this is something the visitor can actually fix.
 */
export function BrokenLinkArt({ label }) {
  return (
    <Glass bg={C.blush}>
      {/* Two chain links, parted in the middle. */}
      <path
        d="M72 30a9 9 0 0 0 0 18h4"
        fill="none"
        stroke={C.alert}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M88 48a9 9 0 0 0 0-18h-4"
        fill="none"
        stroke={C.alert}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M78 33l4 12" stroke={C.alert} strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      <Caption fill={C.alert}>{label}</Caption>
    </Glass>
  );
}

/**
 * Placeholder for a scheduled creative until phase 5 brings the real library.
 *
 * Deliberately generic and obviously a placeholder: it must not look like a
 * finished creative, or this phase would appear to deliver phase 5. It shows the
 * instance id so that "which creative is playing" is still verifiable while
 * scrubbing time.
 */
export function CreativePlaceholderArt({ label, instanceId }) {
  return (
    <Glass bg={C.violet}>
      <circle cx="124" cy="52" r="26" fill={C.gold} opacity="0.9" />
      <text
        x="14"
        y="34"
        fontFamily={FONT}
        fontSize="13"
        fontWeight="800"
        fill={C.white}
      >
        {label}
      </text>
      <rect x="14" y="44" width="40" height="5" rx="2.5" fill={C.white} opacity="0.9" />
      <text
        x="14"
        y="70"
        fontFamily={FONT}
        fontSize="7"
        fontWeight="700"
        fill={C.white}
        opacity="0.75"
      >
        {instanceId}
      </text>
    </Glass>
  );
}

/** kind -> component, so ScreenPreview has no switch of its own. */
export const EMPTY_STATE_ART = {
  idle: IdleArt,
  "no-content": NoContentArt,
  offline: OfflineArt,
  "broken-link": BrokenLinkArt,
};
