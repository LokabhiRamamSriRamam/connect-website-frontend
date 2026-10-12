import { useState } from "react";
import { useI18n } from "../i18n/I18nContext.jsx";
import { screenLabel } from "../i18n/index.js";
import { useTd, useTdDispatch } from "../state/TestDriveContext.jsx";
import { clearMirror, setMirror } from "../state/actions.js";
import { allFollowersOf, mirrorCandidates } from "../domain/mirroring.js";
import { newSlotId } from "../state/ids.js";
import ConfirmDialog from "./ConfirmDialog.jsx";

/**
 * Primary or secondary, and which primary a secondary follows.
 *
 * A primary holds its own schedule. A secondary holds none — it shows whatever
 * its primary shows, including its primary's idle state — so switching role is a
 * change of what the screen IS, not a setting, and both directions go through a
 * confirm that names the consequence.
 *
 * Only legal targets are offered: mirrorCandidates filters out the screen itself
 * and anything that would close a loop, so the dropdown cannot propose a link the
 * reducer would then refuse. The reducer checks again anyway — canMirror is the
 * guard, this is only the shape of the menu.
 *
 * Role and mirror edits are DRAFT-only. The wall resolves against saved.screens,
 * so a link made here does nothing visible until Save, which is the point: the
 * visitor presses Save and watches two screens become one.
 */
export default function MirrorEditor({ screenId }) {
  const { t } = useI18n();
  const { screens, draft } = useTd();
  const dispatch = useTdDispatch();

  /** Which confirm is open: null, "promote", or a target id to demote onto. */
  const [pending, setPending] = useState(null);

  const screen = screens.find((s) => s.id === screenId);
  if (!screen) return null;

  const isSecondary = screen.role === "secondary";
  const candidates = mirrorCandidates(screens, screenId);
  const followers = allFollowersOf(screens, screenId);

  const labelFor = (id) => screenLabel(t, screens.find((s) => s.id === id));

  /**
   * Fresh slot ids for the schedule a promoted screen inherits. Generated here,
   * never in the reducer: two screens sharing a slot id would make SLOT_UPDATE on
   * one of them ambiguous, and a reducer that mints ids is not replayable.
   */
  const promote = () => {
    const sourceId = screen.mirrors;
    const count = sourceId ? (draft.byScreen[sourceId]?.slots.length ?? 0) : 0;
    dispatch(clearMirror(screenId, Array.from({ length: count }, () => newSlotId())));
    setPending(null);
  };

  const demote = (targetId) => {
    dispatch(setMirror(screenId, targetId));
    setPending(null);
  };

  return (
    <section data-td-target="mirror-editor" aria-label={t("panel.mirror")}>
      <h3 className="text-sm font-extrabold">{t("screens.role")}</h3>

      {/* What this screen is now, stated before the controls that change it. */}
      <p className="mt-1 text-[11px] font-bold text-sb-muted">
        {isSecondary && screen.mirrors
          ? t("screens.mirroring", { screen: labelFor(screen.mirrors) })
          : isSecondary
            ? t("play.reason.unknownScreen")
            : t("screens.primary")}
      </p>

      {isSecondary ? (
        <>
          {/* A secondary's content is not editable here, and saying so beats
              leaving the visitor to discover an inert schedule tab. */}
          {screen.mirrors && (
            <p className="mt-2 rounded-xl border-2 border-sb-taupe bg-white px-2.5 py-1.5 text-[11px] font-bold text-sb-muted">
              {t("screens.secondaryNotice", { screen: labelFor(screen.mirrors) })}
            </p>
          )}

          <label className="mt-2 block">
            <span className="text-[11px] font-extrabold">{t("screens.changePrimary")}</span>
            <select
              value={screen.mirrors ?? ""}
              onChange={(e) => e.target.value && demote(e.target.value)}
              className="td-tap mt-1 w-full rounded-xl border-2 border-sb-ink bg-white px-2.5 py-1.5 text-[13px] font-bold"
            >
              <option value="">{t("screens.select")}</option>
              {candidates.map((s) => (
                <option key={s.id} value={s.id}>
                  {screenLabel(t, s)}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            data-td-target="promote-screen"
            onClick={() => setPending("promote")}
            className="td-tap mt-2 rounded-full border-2 border-sb-ink bg-sb-gradient px-3 py-1 text-[11px] font-extrabold text-white shadow-[2px_2px_0_#191919]"
          >
            {t("screens.promoteConfirm")}
          </button>
        </>
      ) : (
        <>
          {/* Demoting the last primary would leave nothing driving the wall. */}
          {candidates.length === 0 ? (
            <p className="mt-2 text-[11px] font-bold text-sb-muted">
              {t("screens.noPrimaries")}
            </p>
          ) : (
            <label className="mt-2 block">
              <span className="text-[11px] font-extrabold">{t("screens.demoteConfirm")}</span>
              <select
                value=""
                onChange={(e) => e.target.value && setPending(e.target.value)}
                className="td-tap mt-1 w-full rounded-xl border-2 border-sb-ink bg-white px-2.5 py-1.5 text-[13px] font-bold"
              >
                <option value="">{t("screens.select")}</option>
                {candidates.map((s) => (
                  <option key={s.id} value={s.id}>
                    {screenLabel(t, s)}
                  </option>
                ))}
              </select>
            </label>
          )}

          {/* Demoting a screen others follow drags them along, two hops deep.
              They are counted here rather than discovered after the fact. */}
          {followers.length > 0 && (
            <p className="mt-2 rounded-xl border-2 border-sb-ink bg-sb-blush px-2.5 py-1.5 text-[11px] font-bold">
              {t("screens.followersWarning", { count: followers.length })}
            </p>
          )}
        </>
      )}

      <ConfirmDialog
        open={pending === "promote"}
        title={t("screens.promoteTitle")}
        body={t("screens.promoteBody", { screen: labelFor(screen.mirrors) })}
        confirmLabel={t("screens.promoteConfirm")}
        cancelLabel={t("common.cancel")}
        onConfirm={promote}
        onCancel={() => setPending(null)}
      />

      <ConfirmDialog
        open={Boolean(pending) && pending !== "promote"}
        title={t("screens.demoteTitle")}
        body={`${t("screens.demoteBody")}${
          followers.length > 0
            ? ` ${t("screens.followersWarning", { count: followers.length })}`
            : ""
        }`}
        confirmLabel={t("screens.demoteConfirm")}
        cancelLabel={t("common.cancel")}
        destructive
        onConfirm={() => demote(pending)}
        onCancel={() => setPending(null)}
      />
    </section>
  );
}
