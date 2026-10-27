# Social posts

Instagram drafts for @friendlyskepticpodcast, made by Claude and queued in Metricool as
**drafts** (nothing posts until Brendan approves it in Metricool).

- `make_card.py` makes the 1080x1350 post images in the site's style:
  `python3 social/make_card.py episode 3`, `... case roswell`, `... news spec.json`.
- `posts/` holds the images. Metricool pulls them from
  `https://raw.githubusercontent.com/fsfspod/guide/main/social/posts/<file>`.
- `log.json` lists every draft made, so episodes, cases and news stories aren't repeated.
- `fonts/` are the site fonts (SIL Open Font License) so cards render the same anywhere.

Reels (all posts not yet published are Reels, silent, posted to Instagram AND Facebook):
- `make_reel.py` makes 1080x1920 animated videos laid over the tinted background clip `bg/beam.mp4`:
  `python3 social/make_reel.py case roswell`, `... episode 3`, `... news spec.json`
  (same spec.json as cards). Output: `posts/reel-<type>-<id>.mp4`. It prints a WARNING if text
  runs into the bottom safe zone; shorten the text and rerun. Needs Playwright (Chromium) and ffmpeg.
- Metricool pulls videos from the same raw.githubusercontent.com `social/posts/` URL.

Schedule: episode drops Mondays 9:00 AM MT, Case of the Week Thursdays 6:00 PM MT,
and a news post when a significant UFO/UAP story breaks.
