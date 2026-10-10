# Test drive narration audio

Narration for the Screen Bazaar test drive at `/test-drive`, in English and Hindi.

## Where these live and why

Files sit in `frontend/public/`, which Vite serves at the site root unprocessed. A file at
`frontend/public/assets/audio/en/00_welcome.mp3` is fetched by the browser as
`/assets/audio/en/00_welcome.mp3`.

**Filenames are load-bearing.** `src/pages/test-drive/audio/manifest.js` is the only place
these paths are written; a rename here without a matching edit there is a silent 404.
Both language folders use the **same 11 filenames** — only the parent folder differs, so
switching language swaps the directory, not the name.

## The 11 cues

| File | Used for |
|---|---|
| `00_welcome.mp3` | Welcome / intro |
| `01_explore_screens.mp3` | Mission 1 — explore your screens |
| `02_control_panel_health.mp3` | Mission 2 — Control Panel and health |
| `03_content_library.mp3` | Mission 3 — content library |
| `04_schedule_timeline.mp3` | Mission 3 — schedule and timeline |
| `05_primary_secondary.mp3` | Mission 4 — primary and secondary screens |
| `06_monitor_setup.mp3` | Mission 5 — monitor your setup |
| `07_save_see_changes.mp3` | Mission 6 — save and see changes |
| `08_tutorial_complete.mp3` | Completion screen |
| `09_mirror_explainer.mp3` | Contextual help — mirroring |
| `10_replay_tutorial.mp3` | Contextual help — replay |

## Replacing a recording

1. Keep the exact filename and folder.
2. Export as MP3. Avoid zero-byte or truncated files — a 0-byte MP3 raises a confusing
   `error` event rather than a clean 404.
3. Run `npm run check:td` from `frontend/`, which verifies all 22 paths exist, are
   non-empty, and that no two cues in one language are byte-identical (which would mean
   the same recording was exported twice under different names).

The narration scripts are the approved ones recorded in `SCREEN_BAZAAR_PLAN.md`. If you
change a mission's on-screen wording, keep it consistent with what the audio says.

## If a file is missing

The app is built to tolerate it: nothing crashes, nothing hangs, the written tutorial
stays fully usable, and a quiet "narration unavailable" indicator appears. A missing
recording is never treated as a missing tutorial step.
