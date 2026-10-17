# Field Guide for the Friendly Skeptic

A field guide to UFOs, UAP and the declassified record. Live at **friendlyskeptic.com/guide**, published by GitHub Pages. Companion to the podcast at friendlyskeptic.com/podcast.

## What's in this repository

| File | What it does |
|---|---|
| `index.html` | The design and page layout. You rarely need to touch it. |
| `content.js` | **All the words on the site**: cases, timeline, archives, glossary, episodes. Edit this one. |
| `favicon.svg` | The little saucer icon in the browser tab. |

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
- `galleries`: one or more of `sightings`, `military`, `crashes`, `encounters`, `government`, `hoaxes`, `world`, `science`, `uap`
- `status`: one of `explained`, `likely`, `unresolved`, `disputed`, `hoax`, `record`
- `teaser`, `story`, `documented`, `claimed`, `explanation`
- `sources`: `{ title: "...", url: "https://..." }`
- `related`: ids of other cases

The case appears automatically in its galleries, on the timeline and in search, and gets a catalog number.

### Release a podcast episode

Find the episode in `episodes: [ ... ]` and add `released: true` (and `length: "mm:ss"` if you like). Its **Coming soon** label becomes a **Listen** button.

### Add a timeline milestone without a case page

Add an entry to `extraTimeline` with `year`, `date`, `title`, `text`, and `link` (a case id or `null`).

### Common mistakes

- Every item in a list needs a comma after it.
- Text goes inside double quotes. If your text contains a double quote, use a single quote or `\"` instead.
- `year` is a plain number: `year: 1952`, not `year: "1952"`.

### Add a Document Room file

Copy the Twining memo block inside `documents: [ ... ]`. Each guide note has a number `n` that matches a pin on the document. To use a scanned page, add the image to the repository (for example `docs/roswell-teletype.jpg`) and list it under `pages` with each pin's position as percentages across (`x`) and down (`y`) the page. Remove a title from `upcomingDocuments` once its file is live.
