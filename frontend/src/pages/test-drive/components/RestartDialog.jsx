import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { useI18n } from "../i18n/I18nContext.jsx";
import { useTdDispatch } from "../state/TestDriveContext.jsx";
import { useAudio } from "../audio/AudioContext.jsx";
import { restart } from "../state/actions.js";
import { clear } from "../state/persistence.js";
import ConfirmDialog from "./ConfirmDialog.jsx";

/**
 * Start the test drive over.
 *
 * Destructive, so it is behind a confirm whose body NAMES what is lost — the
 * copy lists business details, screen setup, schedules and tutorial progress
 * rather than saying "are you sure?". Someone who has spent ten minutes building
 * a schedule deserves to know which ten minutes they are throwing away.
 *
 * Three things happen, and only one of them is the reducer's: clearing the two
 * storage keys and stopping the narration are side effects, so they are done
 * here. Doing the storage clear BEFORE the dispatch matters — RESTART returns
 * initialState, the persist effect then writes that empty state back, and if the
 * clear ran afterwards it would delete what we had just correctly written. Either
 * order ends up with empty storage, but only this one does so without a window
 * where the old PII is still on disk.
 */
export default function RestartDialog() {
  const { t } = useI18n();
  const dispatch = useTdDispatch();
  const audio = useAudio();
  const [open, setOpen] = useState(false);

  const confirm = () => {
    clear();
    audio.stop();
    dispatch(restart());
    setOpen(false);
    // Back to the top: the visitor is about to see the welcome stage, and
    // arriving at it scrolled halfway down reads as a broken page.
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <>
      <button
        type="button"
        data-td-target="restart"
        onClick={() => setOpen(true)}
        className="td-tap inline-flex items-center gap-1.5 rounded-full border-2 border-sb-ink bg-white px-3 py-1 text-[11px] font-extrabold"
      >
        <RotateCcw size={12} aria-hidden="true" />
        {t("tutorial.restart")}
      </button>

      <ConfirmDialog
        open={open}
        title={t("restart.title")}
        body={t("restart.body")}
        confirmLabel={t("restart.confirm")}
        cancelLabel={t("restart.cancel")}
        destructive
        onConfirm={confirm}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}
