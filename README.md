# Flying Saucers for the Friendly Skeptic

The podcast and field guide to UFOs, UAP and the declassified record. Live at **friendlyskeptic.com** (the Podcast page is friendlyskeptic.com/#podcast), published by GitHub Pages. The home page is this repo's `index.html`, mirrored to the `fsfspod/fsfspod.github.io` repo (see `.github/workflows/sync-home.yml`); every other file, including `content.js`, the images and audio, and all the case, topic and episode pages, is served from this repo under friendlyskeptic.com/guide/. The old friendlyskeptic.com/guide/ address forwards to the home page.

## What's in this repository

| File | What it does |
|---|---|
| `index.html` | The design and page layout, and the site's home page. You rarely need to touch it. If you change it, the sync workflow copies it to the root repo (needs the `ROOT_REPO_TOKEN` secret). |
| `content.js` | **All the words on the site**: cases, timeline, archives, episodes, the show's recordings and merch. Edit this one. |
| `images/cover.jpg` | The podcast album art. |
| `merch/` | Merch product photos for the Podcast page. |
| `favicon.svg` | The little saucer icon in the browser tab. |
| `map.js` | The Map page (Earth view and Orbit view). |
| `map-data.js` | Coastlines and globe shapes for the Map. Generated; don't edit by hand. |
| `case/`, `cases/`, `topics/`, `episodes/`, `assets/pages.css`, `sitemap.xml` | One page per case, topic and podcast episode, a list of every case, and the list of pages for search engines. Built automatically from `content.js`; don't edit by hand. |
| `scripts/build-pages.js` | The script that builds them. `scripts/page-dates.json` records when each page last changed. |

There is no build step for you to run. GitHub Pages serves these files as they are, usually within a minute or two of a change.

## How to update the site

1. Open `content.js` and click the pencil icon (Edit).
2. Make your change (see recipes below).
3. Click **Commit changes**. The live site updates in a minute or two. If you don't see it, do a hard refresh (Ctrl+Shift+R or Cmd+Shift+R).

If something breaks, open the commit history and revert the last commit.

### Add a case

Copy any block inside `cases: [ ... ]` (from `{` to the matching `},`), paste it below, and change:

- `id`: unique, lowercase, dashes only (e.g. `"lake-michigan-1994"`)
- `title`, `date`, `year` (a number, no quotes), `place`
- `galleries` (the topics it appears under): one or more of `sightings`, `military`, `crashes`, `encounters`, `government`, `hoaxes`, `world`, `science`, `uap`
- `status`: one of `explained`, `likely`, `unresolved`, `disputed`, `hoax`, `record`
- `teaser`, `story`, `documented`, `claimed`, `explanation`
- `sources`: `{ title: "...", url: "https://..." }`
- `related`: ids of other cases
- `coords: [latitude, longitude]` to pin it on the Map (for example `coords: [33.39, -104.52]`). For space cases use `orbit: "leo"` (Earth orbit), `"translunar"` (on the way to the Moon) or `"moon"` instead.

The case appears automatically under its topics, on the timeline and in search, and gets a catalog number.

### Release a podcast episode

Find the episode in `episodes: [ ... ]` and add `audio: "https://..."` (the episode's audio file from your podcast host) and `length: "mm:ss"`. The "In production" label becomes "Out now" with a player. Its `tags` link to recording topics. (`cases` and `links` are kept in the file but no longer shown on the page.)

### Case, topic and episode pages (automatic)

Every case, topic and episode has its own real web page, which is what Google and AI search tools find and show:

- Cases: friendlyskeptic.com/guide/case/roswell/ (the address is the case's `id`)
- Every case on one page: friendlyskeptic.com/guide/cases/
- Topics: friendlyskeptic.com/guide/topics/hoaxes/
- Episodes: friendlyskeptic.com/guide/episodes/2-what-fell-in-roswell/, plus friendlyskeptic.com/guide/episodes/

You never edit them directly. When you commit a change to `content.js`, a GitHub Action (`.github/workflows/build-pages.yml`) runs `scripts/build-pages.js`, which rebuilds them and `sitemap.xml` and commits them for you about a minute later. It also runs once a day so scheduled releases flip to "Out now" on their own. You can watch it under the repository's **Actions** tab.

- Clicking a case anywhere in the guide opens its page. Old links like friendlyskeptic.com/guide/#case-roswell and friendlyskeptic.com/#case-roswell forward there automatically.
- **Don't change a case's `id`** once it's live: the id is its web address, and search engines will lose the old one.
- Each case's search title is written for you, e.g. "Roswell (1947): What the Evidence Shows". To write your own, add `seoTitle: "What Was the Roswell Incident? The 1947 Crash, Examined"`. To replace the search snippet, add `seoDescription: "..."` (aim for under 160 characters).
- If an episode lists a case in its `cases`, the case page links to that episode under "Hear it on the podcast".
- Changing an episode's `title` changes its page address. To keep the old address, add `slug: "2-what-fell-in-roswell"` to that episode.
- `published: "2026-10-18"` sets the release date search engines show, for an episode that went out without a `releaseAt`.

### Add a recording to the show's Sources

Copy a line in `recordings: [ ... ]` and fill in `name`, `topic` (one of `recordingTopics`), `where`, `credit`, `url`, `link`, and optionally `extra`.

### Update merch

Edit `merch` in `content.js`: `shopUrl`, and each item's `name`, `desc` and `img` (put photos in the `merch` folder).

### Add a timeline milestone without a case page

Add an entry to `extraTimeline` with `year`, `date`, `title`, `text`, and `link` (a case id or `null`).

### Common mistakes

- Every item in a list needs a comma after it.
- Text goes inside double quotes. If your text contains a double quote, use a single quote or `\"` instead.
- `year` is a plain number: `year: 1952`, not `year: "1952"`.

### Add a Document Room file

Copy the Twining memo block inside `documents: [ ... ]`. Each guide note has a number `n` that matches a pin on the document. To use a scanned page, add the image to the repository (for example `docs/roswell-teletype.jpg`) and list it under `pages` with each pin's position as percentages across (`x`) and down (`y`) the page. Remove a title from `upcomingDocuments` once its file is live.

### Contact form

The Contact page (`#contact`, linked from the footer only) sends messages through [FormSubmit](https://formsubmit.co) to contact@friendlyskeptic.com. The address is set in `CONTACT_ENDPOINT` in `index.html`. The very first submission sends an activation email to that inbox; click its link once and every message after that is delivered.
