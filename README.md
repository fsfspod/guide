# Flying Saucers for the Friendly Skeptic

The podcast and field guide to UFOs, UAP and the declassified record. Live at **friendlyskeptic.com/guide** (the Podcast page is friendlyskeptic.com/guide/#podcast), published by GitHub Pages.

## What's in this repository

| File | What it does |
|---|---|
| `index.html` | The design and page layout. You rarely need to touch it. |
| `content.js` | **All the words on the site**: cases, timeline, archives, episodes, the show's recordings and merch. Edit this one. |
| `images/cover.jpg` | The podcast album art. |
| `merch/` | Merch product photos for the Podcast page. |
| `favicon.svg` | The little saucer icon in the browser tab. |
| `map.js` | The Map page (Earth view and Orbit view). |
| `map-data.js` | Coastlines and globe shapes for the Map. Generated; don't edit by hand. |

There is no build step. GitHub Pages serves these files as they are, usually within a minute or two of a change.

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
