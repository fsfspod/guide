#!/usr/bin/env node
/* =====================================================================
   EPISODE PAGE BUILDER
   ---------------------------------------------------------------------
   Makes a real, searchable web page for every podcast episode, from the
   `episodes` list in content.js. You don't run this yourself: a GitHub
   Action runs it whenever content.js changes (and once a day, so
   scheduled releases update on their own).

   It writes:
     episodes/index.html                  all episodes, one list
     episodes/<number>-<title>/index.html one page per episode
     sitemap.xml                          every page, for search engines

   The design comes straight from the <style> block in index.html, so the
   episode pages always match the rest of the guide.

   Run by hand (optional):  node scripts/build-episodes.js
   ===================================================================== */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const ORIGIN = "https://friendlyskeptic.com";
const BASE = "/guide/";
const SITE_URL = ORIGIN + BASE;
const TZ = "America/Denver";

/* ---------- Load content.js the same way the browser does ---------- */
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, "content.js"), "utf8"), sandbox);
const D = sandbox.window.FIELD_GUIDE;
if (!D || !Array.isArray(D.episodes)) throw new Error("content.js did not define FIELD_GUIDE.episodes");

const indexHtml = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const css = (indexHtml.match(/<style>([\s\S]*?)<\/style>/) || [])[1];
if (!css) throw new Error("Couldn't find the <style> block in index.html");
const fontsHref = (indexHtml.match(/<link rel="stylesheet" href="(https:\/\/fonts\.googleapis\.com[^"]+)"/) || [])[1];

/* ---------- Helpers ---------- */
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const slugify = s => String(s).toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
// Keep in sync with episodeSlug() in index.html.
const epSlug = e => e.slug || `${e.number}-${slugify(e.title)}`;
const epPath = e => `${BASE}episodes/${epSlug(e)}/`;
const abs = u => !u ? "" : /^https?:\/\//.test(u) ? u : SITE_URL + u.replace(/^\.?\//, "");
const local = u => !u ? "" : /^https?:\/\//.test(u) ? u : BASE + u.replace(/^\.?\//, "");
const ymd = d => d.toLocaleDateString("en-CA", { timeZone: TZ });
const pretty = d => d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: TZ });
const short = d => d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: TZ });
const isoDuration = len => { const p = String(len || "").split(":").map(Number); if (!p.length || p.some(isNaN)) return null;
  const [h, m, s] = p.length === 3 ? p : [0, ...p]; return `PT${h ? h + "H" : ""}${m ? m + "M" : ""}${s ? s + "S" : ""}`; };
const listenOn = (D.listenOn || []).map(x => typeof x === "string" ? { name: x } : x).filter(x => x.url);
const rss = (listenOn.find(x => /rss/i.test(x.name)) || {}).url;
const NOW = Date.now();

/* Case catalog numbers, same order as the guide (FG-001…) */
const STATUS = { explained: "Explained", likely: "Probably explained", unresolved: "Unresolved", disputed: "Disputed", hoax: "Hoax", record: "On the record" };
const cases = D.cases.slice().sort((a, b) => a.year - b.year || D.cases.indexOf(a) - D.cases.indexOf(b));
cases.forEach((c, i) => { c.cat = "FG-" + String(i + 1).padStart(3, "0"); });
const byId = Object.fromEntries(cases.map(c => [c.id, c]));

/* Release state for each episode */
const eps = D.episodes.slice().sort((a, b) => a.number - b.number).map(e => {
  const t = e.releaseAt ? Date.parse(e.releaseAt) : NaN;
  const pub = e.published ? new Date(e.published + "T12:00:00Z") : !isNaN(t) ? new Date(t) : null;
  const scheduled = !isNaN(t) && NOW < t;          // has audio, waiting for its release time
  const out = !!e.audio && !scheduled;
  return { ...e, slug: epSlug(e), url: ORIGIN + epPath(e), pub, scheduled, out, releaseTime: isNaN(t) ? null : t };
});

/* ---------- Shared page frame ---------- */
const EXTRA_CSS = `
.ep-hero .copy { gap: 18px; }
.ep-hero h1 em { font-size: .55em; margin-bottom: 6px; }
.ep-meta { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; font-family: var(--f-mono); font-size: 13px; color: var(--cream); letter-spacing: .06em; text-transform: uppercase; }
.ep-player { width: 100%; }
.ep-player audio { width: 100%; display: block; color-scheme: dark; }
.ep-crumbs { font-family: var(--f-mono); font-size: 13px; letter-spacing: .06em; text-transform: uppercase; }
.ep-crumbs a { color: var(--cream); text-decoration: none; border-bottom: 1px solid var(--mustard); }
.ep-list .pd-ep h3 a { color: var(--cream); text-decoration: none; }
.ep-list .pd-ep h3 a:hover { color: var(--mustard); }
.ep-more { font-family: var(--f-mono); font-size: 13px; letter-spacing: .08em; text-transform: uppercase; }
`;

function page({ title, description, canonical, image, imageAlt, jsonld, body, ogType = "website" }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<!-- Built by scripts/build-episodes.js from content.js. Edit content.js, not this file. -->
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(canonical)}">
<link rel="icon" href="${BASE}favicon.svg" type="image/svg+xml">
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="${esc(D.site.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:image" content="${esc(image)}">
<meta property="og:image:alt" content="${esc(imageAlt)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#1b4a42">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
${fontsHref ? `<link rel="stylesheet" href="${esc(fontsHref)}">` : ""}
${jsonld.map(j => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, "\\u003c")}</script>`).join("\n")}
<style>${css}${EXTRA_CSS}</style>
</head>
<body>
<header class="site-head">
  <div class="wrap">
    <a class="logo" href="${BASE}"><span class="full">Flying Saucers <span class="accent">for the Friendly Skeptic</span></span><span class="short">Flying Saucers <span class="accent">FS</span></span></a>
    <nav class="nav" aria-label="Field guide menu">
      <a href="${BASE}#galleries">Topics</a>
      <a href="${BASE}#corridor">Timeline</a>
      <a href="${BASE}#map">Map</a>
      <a href="${BASE}episodes/" aria-current="page">Podcast</a>
      <a href="${BASE}#sources">Sources</a>
    </nav>
  </div>
</header>
<main id="app">
${body}
</main>
<footer class="site-foot">
  <div class="wrap">
    <a class="logo" href="${BASE}">Flying Saucers <span class="accent">for the Friendly Skeptic</span></a>
    <nav class="foot-links" aria-label="Footer"><a href="${BASE}episodes/">All episodes</a><a href="${BASE}#podcast">Podcast &amp; merch</a><a href="${BASE}#contact">Contact us</a></nav>
    <p class="disclaimer">Government audio and video used on this show are released by U.S. federal agencies. Their use here does not imply endorsement by the Department of War, Department of Defense, NASA, the National Archives or any other agency, of this podcast, its hosts or its merchandise.</p>
    <p class="copyright">&copy; ${new Date(NOW).getFullYear()} ${esc(D.site.name)}. All rights reserved.</p>
  </div>
</footer>
</body>
</html>
`;
}

const seriesLd = {
  "@type": "PodcastSeries",
  name: D.site.podcastName || D.site.name,
  url: SITE_URL + "episodes/",
  image: abs(D.site.shareImage || "images/cover.jpg?v=2"),
  ...(rss ? { webFeed: rss } : {}),
  ...(listenOn.length ? { sameAs: listenOn.filter(x => !/rss/i.test(x.name)).map(x => x.url) } : {})
};

const statusChip = e => e.out
  ? `<span class="pd-status live">Out now${e.length ? " · " + esc(e.length) : ""}</span>`
  : e.scheduled ? `<span class="pd-status" data-release="${e.releaseTime}" data-live="Out now${e.length ? " · " + esc(e.length) : ""}">Out ${esc(short(new Date(e.releaseTime)))}</span>`
  : `<span class="pd-status">In production</span>`;

const listenChips = () => listenOn.length
  ? `<div class="pd-listen"><span>Listen on</span>${listenOn.map(x => `<a class="chip live" href="${esc(x.url)}" target="_blank" rel="noopener">${esc(x.name)} &#8599;</a>`).join("")}</div>` : "";

// Scheduled episodes: reveal the player at release time, like the main site does.
const RELEASE_SCRIPT = `<script>
(function () {
  var now = Date.now();
  document.querySelectorAll("[data-release]").forEach(function (el) {
    if (now < Number(el.dataset.release)) return;
    if (el.hasAttribute("hidden")) el.removeAttribute("hidden");
    if (el.dataset.live) { el.textContent = el.dataset.live; el.classList.add("live"); }
  });
})();
</script>`;

/* ---------- One page per episode ---------- */
function episodePage(e, i) {
  const prev = eps[i - 1], next = eps[i + 1];
  const epCases = (e.cases || []).map(id => byId[id]).filter(Boolean);
  const art = e.art ? local(e.art) : local("images/cover.jpg?v=2");
  const artAbs = e.art ? abs(e.art) : abs(D.site.shareImage || "images/cover.jpg?v=2");
  const audioSrc = e.audio ? local(e.audio) : "";
  const title = `Episode ${e.number}: ${e.title} | ${D.site.podcastName || D.site.name}`;
  const description = e.summary || `Episode ${e.number} of ${D.site.name}.`;
  const dateLine = e.pub && !e.scheduled ? `Released ${pretty(e.pub)}` : e.scheduled ? `Coming ${pretty(new Date(e.releaseTime))}` : "Season 1";

  const player = e.audio
    ? `<div class="ep-player"${e.scheduled ? ` data-release="${e.releaseTime}" hidden` : ""}><audio controls preload="metadata" src="${esc(audioSrc)}" aria-label="Play episode ${e.number}: ${esc(e.title)}">Your browser can't play this audio. <a href="${esc(audioSrc)}">Open the audio file</a>.</audio></div>` : "";

  const episodeLd = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    url: e.url,
    name: e.title,
    episodeNumber: e.number,
    description,
    image: artAbs,
    ...(e.pub ? { datePublished: ymd(e.pub) } : {}),
    ...(e.out && isoDuration(e.length) ? { timeRequired: isoDuration(e.length) } : {}),
    ...(e.out ? { associatedMedia: { "@type": "MediaObject", contentUrl: abs(e.audio), encodingFormat: "audio/mpeg" } } : {}),
    partOfSeries: seriesLd,
    ...(epCases.length ? { about: epCases.map(c => ({ "@type": "Thing", name: c.title })) } : {})
  };
  const crumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Field guide", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Podcast episodes", item: SITE_URL + "episodes/" },
      { "@type": "ListItem", position: 3, name: `Episode ${e.number}: ${e.title}`, item: e.url }
    ]
  };

  const body = `
<section class="hero pd-hero ep-hero"><div class="wrap">
  <img src="${esc(art)}" alt="Episode ${e.number} artwork: ${esc(e.title)}" width="600" height="600">
  <div class="copy">
    <nav class="ep-crumbs" aria-label="Breadcrumb"><a href="${BASE}episodes/">All episodes</a></nav>
    <p class="eyebrow">A podcast for UFO &amp; UAP beginners · Season 1</p>
    <h1><em>Episode ${e.number}</em>${esc(e.title)}</h1>
    <p class="lede">${esc(description)}</p>
    <div class="ep-meta">${statusChip(e)}<span>${esc(dateLine)}</span></div>
    ${player}
    ${listenChips()}
  </div>
</div></section>
${epCases.length ? `
<section class="section pd-dark"><div class="wrap">
  <div class="sec-head"><div class="left"><span class="tag-badge">In this episode</span><h2>The cases</h2></div>
    <p class="lede">Every case we cover has a field guide entry: what the record shows, what people claim, and the best explanation so far.</p></div>
  <div class="cards">${epCases.map(c => `<a class="card" href="${BASE}#case-${esc(c.id)}">
    <div class="meta"><span>${esc(c.cat)} · ${esc(c.date)}</span><span class="stamp s-${esc(c.status)}">${esc(STATUS[c.status] || c.status)}</span></div>
    <h3>${esc(c.title)}</h3>
    <p>${esc(c.teaser)}</p>
    <div class="place">${esc(c.place)}</div>
  </a>`).join("")}</div>
</div></section>` : ""}
${(e.links || []).length ? `
<section class="section pd-dark"><div class="wrap">
  <div class="sec-head"><div class="left"><span class="tag-badge">Show notes</span><h2>Check the sources</h2></div>
    <p class="lede">Go to the originals. Each link opens the archive or record in a new tab.</p></div>
  <div class="pd-list">${e.links.map(l => { let host = ""; try { host = new URL(l.url).hostname.replace(/^www\./, ""); } catch (_) {}
    return `<a href="${esc(l.url)}" target="_blank" rel="noopener"><b>${esc(l.title)}</b><span>${esc(host)} &#8599;</span></a>`; }).join("")}</div>
</div></section>` : ""}
<section class="section pd-dark"><div class="wrap">
  <nav class="pager" aria-label="More episodes">
    ${prev ? `<a class="prev" href="${epPath(prev)}"><span>&larr; Episode ${prev.number}</span><b>${esc(prev.title)}</b></a>` : `<a class="prev" href="${BASE}"><span>&larr; The field guide</span><b>Explore every case</b></a>`}
    ${next ? `<a class="next" href="${epPath(next)}"><span>Episode ${next.number} &rarr;</span><b>${esc(next.title)}</b></a>` : `<a class="next" href="${BASE}episodes/"><span>All episodes &rarr;</span><b>Season 1</b></a>`}
  </nav>
</div></section>
${e.scheduled ? RELEASE_SCRIPT : ""}`;

  return page({ title, description, canonical: e.url, image: artAbs, imageAlt: `Episode ${e.number} artwork: ${e.title}`, jsonld: [episodeLd, crumbsLd], body, ogType: "article" });
}

/* ---------- All-episodes page ---------- */
function listPage() {
  const released = eps.filter(e => e.out).length;
  const url = SITE_URL + "episodes/";
  const seriesFull = { "@context": "https://schema.org", ...seriesLd, description: "A podcast for UFO and UAP beginners: the history, the evidence and the declassified record, with sources for everything." };
  const listLd = { "@context": "https://schema.org", "@type": "ItemList",
    itemListElement: eps.map((e, i) => ({ "@type": "ListItem", position: i + 1, url: e.url, name: `Episode ${e.number}: ${e.title}` })) };
  const body = `
<section class="hero pd-hero"><div class="wrap">
  <img src="${BASE}images/cover.jpg?v=2" alt="Podcast cover: a retro flying saucer beams light down on a lone figure among pine trees under a full moon." width="760" height="760">
  <div class="copy">
    <p class="eyebrow">A podcast for UFO &amp; UAP beginners</p>
    <h1>Every episode. <em>Every source.</em></h1>
    <p class="lede">From the first reported flying saucer to declassified footage from Navy fighter pilots, this is your guide to UFOs, UAP and how we got here. No prior knowledge needed.</p>
    ${listenChips()}
  </div>
</div></section>
<section class="section pd-dark ep-list"><div class="wrap">
  <div class="sec-head"><div class="left"><span class="tag-badge">Season 1 · ${eps.length} episodes · ${released ? `${released} out now` : "in production"}</span><h2>Episodes</h2></div></div>
  <div class="pd-eps">${eps.map(e => `<article class="pd-ep${e.out ? " released" : ""}${e.art ? " has-art" : ""}">
    ${e.art ? `<a href="${epPath(e)}" tabindex="-1" aria-hidden="true"><img class="pd-art" src="${esc(local(e.art))}" alt="" width="600" height="600" loading="lazy"></a>` : `<div class="pd-no">${e.number}</div>`}
    <div><h3><a href="${epPath(e)}">Episode ${e.number}: ${esc(e.title)}</a></h3><p>${esc(e.summary)}</p>
      <p class="ep-more"><a href="${epPath(e)}">Show notes &amp; sources &rarr;</a></p></div>
    ${statusChip(e)}
  </article>`).join("")}</div>
</div></section>
${eps.some(e => e.scheduled) ? RELEASE_SCRIPT : ""}`;
  return page({
    title: `Podcast Episodes | ${D.site.podcastName || D.site.name}`,
    description: "Every episode of Flying Saucers for the Friendly Skeptic, a beginner's podcast about UFOs and UAP, with show notes, the cases covered and links to the original sources.",
    canonical: url, image: abs(D.site.shareImage || "images/cover.jpg?v=2"), imageAlt: "Flying Saucers for the Friendly Skeptic podcast cover",
    jsonld: [seriesFull, listLd], body
  });
}

/* ---------- Write files ---------- */
const outDir = path.join(ROOT, "episodes");
fs.rmSync(outDir, { recursive: true, force: true });   // drop pages for renamed or removed episodes
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "index.html"), listPage());
eps.forEach((e, i) => {
  const dir = path.join(outDir, e.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), episodePage(e, i));
});

const urls = [SITE_URL, SITE_URL + "episodes/", ...eps.map(e => e.url)];
fs.writeFileSync(path.join(ROOT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<!-- Built by scripts/build-episodes.js. Don't edit by hand. -->\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map(u => `  <url><loc>${esc(u)}</loc></url>`).join("\n") + `\n</urlset>\n`);

console.log(`Built ${eps.length} episode pages, the episode list and sitemap.xml (${urls.length} URLs).`);
