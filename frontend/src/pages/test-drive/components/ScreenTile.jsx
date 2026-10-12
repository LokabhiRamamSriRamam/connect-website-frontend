import { useI18n } from "../i18n/I18nContext.jsx";
import { screenLabel } from "../i18n/index.js";
import { minutesToHHMM } from "../domain/time.js";
import ScreenPreview from "./ScreenPreview.jsx";

/**
 * One screen on the wall: bezel, role and mirror badges, connectivity dot, and a
 * one-line statement of what it is showing and why.
 *
 * A <button>, not a div with onClick: selecting a screen is the first thing the
 * tutorial asks for, so it must be reachable by keyboard and announce its state.
 * aria-pressed rather than aria-selected — these are toggles in a group, not
 * tabs, and nothing here implements tab semantics.
 */
export default function ScreenTile({
  screen,
  resolution,
  health,
  selected,
  onSelect,
  mirrorLabel = "",
  compact = false,
  dirty = false,
}) {
  const { t } = useI18n();

  const mirrored = screen.role === "secondary" && Boolean(screen.mirrors);
  const online = screen.online !== false;

  /**
   * Why this screen is showing what it is showing, as one sentence.
   *
   * resolution.reason is an i18n KEY from the domain layer, so the whole mapping
   * is a single t() call. A playing screen has reason === null and gets the
   * "Now showing" label instead — there is nothing to explain when it works.
   */
  const status = resolution?.reason
    ? t(resolution.reason)
    : t("screens.nowPlaying");

  return (
    <button
      type="button"
      onClick={() => onSelect(screen.id)}
      aria-pressed={selected}
      data-td-target={`screen-tile-${screen.id}`}
      className={`td-tap group block w-full rounded-2xl border-2 bg-white p-2.5 text-left transition-all ${
        selected
          ? "border-sb-violet shadow-[4px_4px_0_#914BFA]"
          : "border-sb-ink shadow-[3px_3px_0_#191919] hover:-translate-y-0.5"
      }`}
    >
      {/* In the grid the tile is narrow and the preview fills it, with the details
          stacked below. In the list a tile spans the full column: an uncapped
          aspect-video preview made each row ~517px tall and five of them turned
          the "list" into a 3000px scroll — taller than the thumbnail view it is
          meant to compress. So the list lays the row out horizontally, with a
          capped preview beside the details rather than above them. */}
      <div className={compact ? "" : "flex flex-wrap items-start gap-3"}>
        <ScreenPreview
          resolution={resolution}
          scan={false}
          /* w-32 at phone width, not w-40: the row also carries the health line
             ("Uptime 98.7%"), which overflowed a 360px tile at the wider size.
             flex-wrap on the row is the backstop if it still cannot fit. */
          className={compact ? "aspect-video w-full" : "aspect-video w-32 shrink-0 sm:w-56"}
        />

        {/* The details: beside the preview in the list, below it in the grid. */}
        <div className={compact ? "" : "min-w-0 flex-1"}>
      {/* Compact tiles stack the label above the role badge. Side by side in a
          5-up grid the badge is ~100px of a ~145px tile and, being shrink-0, it
          squeezed the truncating label down to "N..". The screen's name is what
          the visitor is picking from, so it gets the full width. */}
      {/* The name and the role badge stack until there is room for both. Side by
          side the badge is shrink-0 and ~100px wide, which in a 5-up grid tile
          (~145px) and in a phone-width list row left the truncating name as
          "Scre…". The screen's name is what the visitor is choosing between. */}
      <div
        className={`gap-2 ${
          compact
            ? "mt-2 flex flex-col items-start"
            : "flex flex-col items-start sm:flex-row sm:items-start"
        }`}
      >
        <div className="w-full min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            {/* Connectivity, as colour AND text: colour alone would fail anyone
                who cannot distinguish it. */}
            <span
              aria-hidden="true"
              className={`inline-block h-2 w-2 shrink-0 rounded-full ${
                online ? "bg-sb-green" : "bg-sb-muted"
              }`}
            />
            <span className="truncate text-[13px] font-extrabold">
              {screenLabel(t, screen)}
            </span>
            {/* This screen has edits the preview above does not yet show — which
                is exactly the thing a visitor could otherwise misread as the save
                having done nothing. save.dirtyScreens makes it per-screen for
                free, since it is maintained per action rather than by comparing. */}
            {dirty && (
              <span
                title={t("save.unsaved")}
                className="td-dot-dirty inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-sb-violet"
              >
                <span className="sr-only">{t("save.unsaved")}</span>
              </span>
            )}
          </div>

          <p className="mt-0.5 truncate text-[11px] font-bold text-sb-muted">{status}</p>
        </div>

        {/* Role badge. "P" / "S" would need a legend in two languages; the words
            are short enough in both. */}
        <span
          className={`shrink-0 rounded-full border-2 border-sb-ink px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide ${
            mirrored ? "bg-sb-lilac text-sb-ink" : "bg-sb-gradient text-white"
          }`}
        >
          {mirrored ? t("screens.secondary") : t("screens.primary")}
        </span>
      </div>

      {/* The mirror link is configuration, so it earns its own row rather than
          being crammed into the badge. */}
      {mirrored && (
        <p className="mt-1 truncate text-[10px] font-bold text-sb-iris">
          {t("screens.mirroring", { screen: mirrorLabel })}
        </p>
      )}

      {!compact && health && (
        <dl className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-0.5 border-t-2 border-sb-mist pt-1.5 text-[10px] font-bold text-sb-muted">
          <div className="flex items-center gap-1">
            <dt>{t("health.connectivity")}</dt>
            <dd className="font-extrabold text-sb-ink">
              {online ? t("screens.online") : t("screens.offline")}
            </dd>
          </div>
          <div className="flex items-center gap-1">
            <dt>{t("health.uptime")}</dt>
            {/* toFixed(1) with an ASCII decimal point: a simulated figure must not
                pick up a locale separator, matching the integer-time rule. */}
            <dd className="font-extrabold text-sb-ink">{health.uptimePct.toFixed(1)}%</dd>
          </div>
          {!online && (
            <div className="hidden items-center gap-1 sm:flex">
              <dt>{t("health.lastSeen")}</dt>
              <dd className="font-extrabold text-sb-ink">
                {minutesToHHMM(health.lastSeenMin)}
              </dd>
            </div>
          )}
        </dl>
      )}
        </div>
      </div>
    </button>
  );
}
