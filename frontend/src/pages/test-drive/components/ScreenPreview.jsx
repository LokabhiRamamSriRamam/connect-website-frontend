import { useI18n } from "../i18n/I18nContext.jsx";
import { EMPTY_STATE_ART, CreativePlaceholderArt } from "./art/EmptyStates.jsx";

/**
 * The glass of one virtual screen: whatever resolveScreen() says is showing.
 *
 * Takes a resolution object and nothing else about state — it has no access to
 * the reducer and makes no decisions about what should play. That split is what
 * keeps playback logic in one tested pure function instead of leaking into the
 * view, where it could not be exercised in node.
 *
 * `scan` adds the shimmer to the large selected preview only; at tile size it
 * would be noise. td.css kills it under prefers-reduced-motion.
 */
export default function ScreenPreview({ resolution, scan = false, className = "" }) {
  const { t } = useI18n();
  const kind = resolution?.kind ?? "no-content";
  const lit = kind === "creative";

  // Short on-glass captions. The full sentence lives in the tile's status row and
  // in the Control Panel; inside a 160x90 viewBox only a few words fit, in either
  // language, so these are the terse labels rather than play.*Body.
  const caption = {
    creative: t("screens.nowPlaying"),
    idle: t("play.idle"),
    "no-content": t("play.noContent"),
    offline: t("play.offline"),
    "broken-link": t("play.brokenLink"),
  }[kind];

  const Art = EMPTY_STATE_ART[kind];

  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-sb-lavender ${
        lit ? "td-screen-on" : "td-screen-off"
      } ${className}`}
    >
      {/* aria-hidden: the art is decorative. The accessible description of what
          this screen is showing is the tile's own text, which is real copy a
          screen reader can read in order rather than an SVG label. */}
      <div aria-hidden="true" className="h-full w-full">
        {Art ? (
          <Art label={caption} />
        ) : (
          <CreativePlaceholderArt
            label={caption}
            instanceId={resolution?.instanceId ?? ""}
          />
        )}
      </div>

      {scan && (
        <span
          aria-hidden="true"
          className="td-scan pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/50 to-transparent"
        />
      )}
    </div>
  );
}
