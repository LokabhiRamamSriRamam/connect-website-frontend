/**
 * Narration manifest — the ONLY place audio paths exist.
 *
 * Plain .js with no React: scripts/check-test-drive.mjs imports this in node to
 * verify every path resolves to a non-empty file on disk. If paths were spread
 * across components, that check could only ever test the ones it knew about.
 *
 * All 22 recordings are already in place and verified (plan §8). The engine and
 * the provider land in phase 10; this file exists now because the dev gate needs
 * something to validate against, and because the cue list is the contract between
 * the recordings and the tutorial's missions.
 *
 * `missionId` ties a cue to the mission whose card shows the same text. Two cues
 * are not mission narration: `welcome` plays at intake, and `replayTutorial` is
 * the prompt offered after the last mission.
 */

export const AUDIO_BASE = "/assets/audio";

export const LANGS = ["en", "hi"];

/**
 * cueId -> { file, missionId }. The file name is shared by both languages, which
 * is why it is stored once and the per-language path is derived: a cue whose en
 * and hi files could drift apart in name is a cue that will eventually 404 in one
 * language only, and that is the hardest kind of gap to notice.
 */
export const CUES = {
  welcome: { file: "00_welcome.mp3", missionId: null },
  exploreScreens: { file: "01_explore_screens.mp3", missionId: "m1" },
  controlPanelHealth: { file: "02_control_panel_health.mp3", missionId: "m2" },
  contentLibrary: { file: "03_content_library.mp3", missionId: "m3" },
  scheduleTimeline: { file: "04_schedule_timeline.mp3", missionId: "m3" },
  primarySecondary: { file: "05_primary_secondary.mp3", missionId: "m4" },
  monitorSetup: { file: "06_monitor_setup.mp3", missionId: "m5" },
  saveSeeChanges: { file: "07_save_see_changes.mp3", missionId: "m6" },
  tutorialComplete: { file: "08_tutorial_complete.mp3", missionId: null },
  mirrorExplainer: { file: "09_mirror_explainer.mp3", missionId: "m4" },
  replayTutorial: { file: "10_replay_tutorial.mp3", missionId: null },
};

/** The public URL for one cue in one language. */
export function cuePath(cueId, lang) {
  const cue = CUES[cueId];
  if (!cue || !LANGS.includes(lang)) return null;
  return `${AUDIO_BASE}/${lang}/${cue.file}`;
}

/** Every (cueId, lang, path) triple — what the dev gate walks. */
export function allCuePaths() {
  const out = [];
  for (const cueId of Object.keys(CUES)) {
    for (const lang of LANGS) {
      out.push({ cueId, lang, path: cuePath(cueId, lang) });
    }
  }
  return out;
}

export const CUE_IDS = Object.keys(CUES);
