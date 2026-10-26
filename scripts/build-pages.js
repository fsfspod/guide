#!/usr/bin/env node
/* =====================================================================
   PAGE BUILDER
   ---------------------------------------------------------------------
   Makes a real, searchable web page for every case, topic and podcast
   episode, from content.js. You don't run this yourself: a GitHub Action
   runs it whenever content.js changes (and once a day, so scheduled
   episode releases update on their own).

   It writes:
     case/<id>/index.html                 one page per case (~100)
     cases/index.html                     every case, by era
     topics/<id>/index.html               one page per topic
     episodes/index.html                  all episodes, one list
     episodes/<number>-<title>/index.html one page per episode
     assets/pages.css                     the shared design, copied from index.html
     sitemap.xml                          every page, for search engines
     scripts/page-dates.json              when each page last changed
                                          (feeds the sitemap dates)

   The design comes straight from the <style> block in index.html, so
   these pages always match the rest of the guide.

   Run by hand (optional):  node scripts/build-pages.js
   ===================================================================== */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const crypto = require("crypto");

const ROOT = path.resolve(__dirname, "..");
const ORIGIN = "https://friendlyskeptic.com";
const BASE = "/guide/";
const SITE_URL = ORIGIN + BASE;
// The field guide's app is the site's home page (served at / and mirrored from this repo).
// Built pages live under BASE; every link back to "home" goes to the root.
const HOME = "/";
const HOME_URL = ORIGIN + HOME;
const TZ = "America/Denver";
const BRAND = "Friendly Skeptic";

/* ---------- Load content.js the same way the browser does ---------- */
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, "content.js"), "utf8"), sandbox);
const D = sandbox.window.FIELD_GUIDE;
if (!D || !Array.isArray(D.episodes)) throw new Error("content.js did not define FIELD_GUIDE.episodes");
if (!Array.isArray(D.cases)) throw new Error("content.js did not define FIELD_GUIDE.cases");

const indexHtml = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const css = (indexHtml.match(/<style>([\s\S]*?)<\/style>/) || [])[1];
if (!css) throw new Error("Couldn't find the <style> block in index.html");
const fontsHref = (indexHtml.match(/<link rel="stylesheet" href="(https:\/\/fonts\.googleapis\.com[^"]+)"/) || [])[1];

/* ---------- Helpers ---------- */
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const slugify = s => String(s).toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
// Keep in sync with episodeUrl() in index.html.
const epSlug = e => e.slug || `${e.number}-${slugify(e.title)}`;
const epPath = e => `${BASE}episodes/${epSlug(e)}/`;
// Keep in sync with caseUrl() in index.html.
const casePath = c => `${BASE}case/${c.id}/`;
const topicPath = g => `${BASE}topics/${g.id}/`;
const abs = u => !u ? "" : /^https?:\/\//.test(u) ? u : SITE_URL + u.replace(/^\.?\//, "");
const local = u => !u ? "" : /^https?:\/\//.test(u) ? u : BASE + u.replace(/^\.?\//, "");
const ymd = d => d.toLocaleDateString("en-CA", { timeZone: TZ });
const pretty = d => d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: TZ });
const short = d => d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: TZ });
const isoDuration = len => { const p = String(len || "").split(":").map(Number); if (!p.length || p.some(isNaN)) return null;
  const [h, m, s] = p.length === 3 ? p : [0, ...p]; return `PT${h ? h + "H" : ""}${m ? m + "M" : ""}${s ? s + "S" : ""}`; };
// Trim to a search-snippet length on a word boundary.
const clip = (s, n = 158) => { s = String(s).replace(/\s+/g, " ").trim(); if (s.length <= n) return s;
  return s.slice(0, n - 1).replace(/[\s,;:.–—-]+\S*$/, "") + "…"; };
// Opening sentences of a passage, at least ~70 characters' worth. A sentence
// ends at . ! or ? followed by a capital letter, so "10 p.m." doesn't count.
const opening = (s, min = 70) => { const parts = String(s).split(/(?<=[.!?]['"’”]?)\s+(?=[A-Z'"‘“])/); let out = "";
  for (const p of parts) { out = out ? out + " " + p : p; if (out.length >= min) break; } return out; };
const listenOn = (D.listenOn || []).map(x => typeof x === "string" ? { name: x } : x).filter(x => x.url);
const rss = (listenOn.find(x => /rss/i.test(x.name)) || {}).url;
const NOW = Date.now();
const COVER = abs(D.site.shareImage || "images/cover.jpg?v=2");

/* Case catalog numbers, same order as the guide (FG-001…) */
const STATUS = {
  explained:  { label: "Explained",          text: "A mundane cause is well established." },
  likely:     { label: "Probably explained", text: "A mundane cause is likely but not proven." },
  unresolved: { label: "Unresolved",         text: "No good explanation has been found yet." },
  disputed:   { label: "Disputed",           text: "The basic facts themselves are argued over." },
  hoax:       { label: "Hoax",               text: "Shown or admitted to be faked." },
  record:     { label: "On the record",      text: "A government program, report or hearing." }
};
// The second half of each case's search title, by stamp. A case can override
// its whole title with `seoTitle` in content.js.
const TITLE_HOOK = {
  explained: "What Really Happened",
  likely: "What Really Happened",
  unresolved: "The Evidence and Open Questions",
  disputed: "The Evidence and the Debate",
  hoax: "How the Hoax Was Exposed",
  record: "What It Said and Why It Matters"
};
const cases = D.cases.slice().sort((a, b) => a.year - b.year || D.cases.indexOf(a) - D.cases.indexOf(b));
cases.forEach((c, i) => { c.cat = "FG-" + String(i + 1).padStart(3, "0"); c.url = ORIGIN + casePath(c); });
const byId = Object.fromEntries(cases.map(c => [c.id, c]));
const gal = Object.fromEntries(D.galleries.map(g => [g.id, g]));
const eraOf = y => D.eras.find(e => y >= e.from && y <= e.to) || D.eras[D.eras.length - 1];
const stamp = (s, big) => `<span class="stamp s-${esc(s)}${big ? " big" : ""}">${esc(STATUS[s]?.label || s)}</span>`;

const bad = cases.filter(c => !/^[a-z0-9-]+$/.test(c.id));
if (bad.length) throw new Error("Case ids must be lowercase letters, numbers and dashes: " + bad.map(c => c.id).join(", "));

/* Release state for each episode */
const eps = D.episodes.slice().sort((a, b) => a.number - b.number).map(e => {
  const t = e.releaseAt ? Date.parse(e.releaseAt) : NaN;
  const pub = e.published ? new Date(e.published + "T12:00:00Z") : !isNaN(t) ? new Date(t) : null;
  const scheduled = !isNaN(t) && NOW < t;          // has audio, waiting for its release time
  const out = !!e.audio && !scheduled;
  return { ...e, slug: epSlug(e), url: ORIGIN + epPath(e), pub, scheduled, out, releaseTime: isNaN(t) ? null : t };
});
const epsFor = id => eps.filter(e => (e.cases || []).includes(id));

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
.topic-links { margin-top: 8px; }
`;

const CSS_TEXT = css + EXTRA_CSS;
const CSS_VER = crypto.createHash("sha1").update(CSS_TEXT).digest("hex").slice(0, 8);

const orgLd = {
  "@type": "Organization",
  name: D.site.name,
  url: ORIGIN + "/",
  logo: COVER,
  ...(listenOn.length ? { sameAs: listenOn.filter(x => !/rss/i.test(x.name)).map(x => x.url) } : {})
};

function page({ title, description, canonical, image = COVER, imageAlt = `${D.site.name} podcast cover`, jsonld, body, ogType = "website", nav = null }) {
  const cur = k => nav === k ? ` aria-current="page"` : "";
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<!-- Built by scripts/build-pages.js from content.js. Edit content.js, not this file. -->
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
<link rel="stylesheet" href="${BASE}assets/pages.css?v=${CSS_VER}">
</head>
<body>
<header class="site-head">
  <div class="wrap">
    <a class="logo" href="${HOME}"><span class="full">Flying Saucers <span class="accent">for the Friendly Skeptic</span></span><span class="short">Flying Saucers <span class="accent">FS</span></span></a>
    <nav class="nav" aria-label="Field guide menu">
      <a href="${HOME}#galleries"${cur("topics")}>Topics</a>
      <a href="${HOME}#corridor">Timeline</a>
      <a href="${HOME}#map">Map</a>
      <a href="${BASE}episodes/"${cur("podcast")}>Podcast</a>
      <a href="${HOME}#sources">Sources</a>
    </nav>
  </div>
</header>
<main id="app">
${body}
</main>
<footer class="site-foot">
  <div class="wrap">
    <a class="logo" href="${HOME}">Flying Saucers <span class="accent">for the Friendly Skeptic</span></a>
    <nav class="foot-links" aria-label="Footer"><a href="${BASE}cases/">All cases</a><a href="${BASE}episodes/">All episodes</a><a href="${HOME}#podcast">Podcast &amp; merch</a><a href="${HOME}#contact">Contact us</a></nav>
    <p class="disclaimer">Government audio and video used on this show are released by U.S. federal agencies. Their use here does not imply endorsement by the Department of War, Department of Defense, NASA, the National Archives or any other agency, of this podcast, its hosts or its merchandise.</p>
    <p class="copyright">&copy; ${new Date(NOW).getFullYear()} ${esc(D.site.name)}. All rights reserved.</p>
  </div>
</footer>
</body>
</html>
`;
}

const crumbsLd = items => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, item], i) => ({ "@type": "ListItem", position: i + 1, name, item }))
});

const seriesLd = {
  "@type": "PodcastSeries",
  name: D.site.podcastName || D.site.name,
  url: SITE_URL + "episodes/",
  image: COVER,
  ...(rss ? { webFeed: rss } : {}),
  ...(listenOn.length ? { sameAs: listenOn.filter(x => !/rss/i.test(x.name)).map(x => x.url) } : {})
};

const caseCard = c => `<a class="card" href="${casePath(c)}">
    <div class="meta"><span>${esc(c.cat)} · ${esc(c.date)}</span>${stamp(c.status)}</div>
    <h3>${esc(c.title)}</h3>
    <p>${esc(c.teaser)}</p>
    <div class="place">${esc(c.place)}</div>
  </a>`;

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

const list = items => (items || []).length ? `<ul>${items.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : `<p>Nothing on this side of the ledger.</p>`;

/* ---------- One page per case ---------- */
function casePage(c, i, dates) {
  const prev = cases[i - 1], next = cases[i + 1];
  const rel = (c.related || []).map(r => byId[r]).filter(Boolean);
  const files = (D.readingRoom || []).filter(s => (s.cases || []).includes(c.id) && !c.sources.some(x => x.url === s.url));
  const era = eraOf(c.year);
  const g0 = gal[c.galleries[0]];
  const heard = epsFor(c.id);
  const hasYear = new RegExp(`\\b${c.year}\\b`).test(c.title);
  // Long titles drop the site name so search results show the useful part.
  const core = c.seoTitle || `${c.title}${hasYear ? "" : ` (${c.year})`}: ${TITLE_HOOK[c.status] || "The Evidence"}`;
  const title = core.length > 62 ? core : `${core} | ${BRAND}`;
  const description = c.seoDescription || clip(`${c.teaser} ${opening(c.explanation)}`);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${c.title}${hasYear ? "" : ` (${c.year})`}`,
    description,
    url: c.url,
    mainEntityOfPage: c.url,
    image: COVER,
    ...(dates ? { datePublished: dates.first, dateModified: dates.date } : {}),
    author: orgLd,
    publisher: orgLd,
    isPartOf: { "@type": "WebSite", name: D.site.name, url: HOME_URL },
    articleSection: c.galleries.map(g => gal[g]?.title).filter(Boolean),
    about: { "@type": "Thing", name: c.title, description: c.teaser },
    ...(c.coords ? { contentLocation: { "@type": "Place", name: c.place, geo: { "@type": "GeoCoordinates", latitude: c.coords[0], longitude: c.coords[1] } } }
      : { contentLocation: { "@type": "Place", name: c.place } })
  };

  const body = `
<section class="exhibit-head"><div class="wrap">
  <nav class="crumbs" aria-label="Breadcrumb"><a href="${HOME}">Home</a> / <a href="${topicPath(g0)}">${esc(g0.title)}</a> / <a href="${BASE}cases/">${esc(c.cat)}</a></nav>
  <div>${stamp(c.status, true)}</div>
  <h1>${esc(c.title)}</h1>
  <div class="placard-meta"><span><b>Catalog</b> ${esc(c.cat)}</span><span><b>When</b> ${esc(c.date)}</span><span><b>Where</b> ${esc(c.place)}</span></div>
</div></section>

<div class="wrap exhibit-grid">
  <div>
    <p class="teaser">${esc(c.teaser)}</p>
    <p class="story">${esc(c.story)}</p>
  </div>
  <aside class="facts">
    <div class="fact-box"><h3>Find it in the field guide</h3>
      <div class="chips">${c.galleries.filter(g => gal[g]).map(g => `<a class="chip" href="${topicPath(gal[g])}">${esc(gal[g].title)}</a>`).join("")}</div>
      <div class="chips"><a class="chip" href="${HOME}#era-${esc(era.id)}">Timeline: ${esc(era.title)}</a>${c.coords || c.orbit ? `<a class="chip" href="${HOME}#map">See it on the map</a>` : ""}</div>
    </div>
    <div class="fact-box"><h3>What the stamp means</h3><p>${stamp(c.status)}&nbsp; ${esc(STATUS[c.status]?.text || "")}</p></div>
    ${heard.length ? `<div class="fact-box"><h3>Hear it on the podcast</h3><div class="chips">${heard.map(e => `<a class="chip" href="${epPath(e)}">Episode ${e.number}: ${esc(e.title)}</a>`).join("")}</div></div>` : ""}
  </aside>
</div>

<section class="section" style="padding-top:0"><div class="wrap">
  <div class="sec-head"><div class="left"><span class="tag-badge">Weigh the evidence</span><h2>The ledger</h2></div><p class="lede">What the record shows, what people say, and the best explanation available so far.</p></div>
  <div class="weigh">
    <div class="doc"><h3>What's documented</h3>${list(c.documented)}</div>
    <div class="claim"><h3>What's claimed</h3>${list(c.claimed)}</div>
    <div class="expl"><h3>Best explanation so far</h3><p>${esc(c.explanation)}</p></div>
  </div>
</div></section>

<section class="section"><div class="wrap">
  <div class="sec-head"><div class="left"><span class="tag-badge">Where to look</span><h2>Check the sources</h2></div><p class="lede">Go to the originals. Every link opens the archive or record in a new tab.</p></div>
  <ul class="src-list">
    ${c.sources.map(s => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener"><span>${esc(s.title)}</span><span class="arrow">Open &#8599;</span></a></li>`).join("\n    ")}
    ${files.map(f => `<li><a href="${esc(f.url)}" target="_blank" rel="noopener"><span>${esc(f.title)} <span class="mono" style="color:var(--muted)">(${esc(f.agency)})</span></span><span class="arrow">Open &#8599;</span></a></li>`).join("\n    ")}
  </ul>
</div></section>

${rel.length ? `<section class="section"><div class="wrap">
  <div class="sec-head"><div class="left"><span class="tag-badge">Related entries</span><h2>If you liked this one</h2></div></div>
  <div class="cards">${rel.map(caseCard).join("")}</div>
</div></section>` : ""}

<section class="section"><div class="wrap pager">
  ${prev ? `<a href="${casePath(prev)}"><span>&larr; Earlier · ${esc(prev.cat)}</span><b>${esc(prev.title)}</b></a>` : `<a href="${BASE}cases/"><span>&larr; Start</span><b>Every case</b></a>`}
  ${next ? `<a class="next" href="${casePath(next)}"><span>Later · ${esc(next.cat)} &rarr;</span><b>${esc(next.title)}</b></a>` : `<a class="next" href="${BASE}cases/"><span>End &rarr;</span><b>Every case</b></a>`}
</div></section>`;

  return page({
    title, description, canonical: c.url, ogType: "article", nav: "topics", body,
    jsonld: [articleLd, crumbsLd([["Field guide", HOME_URL], [g0.title, ORIGIN + topicPath(g0)], [c.title, c.url]])]
  });
}

/* ---------- One page per topic ---------- */
function topicPage(g, i) {
  const url = ORIGIN + topicPath(g);
  const items = cases.filter(c => c.galleries.includes(g.id));
  const prev = D.galleries[(i - 1 + D.galleries.length) % D.galleries.length];
  const next = D.galleries[(i + 1) % D.galleries.length];
  const title = `${g.title}: ${items.length} UFO & UAP Cases Explained | ${BRAND}`;
  const description = clip(`${g.blurb} ${items.length} cases, oldest first, each with the record, the claims and the best explanation so far.`);
  const body = `
<section class="page-head"><div class="wrap">
  <nav class="crumbs" aria-label="Breadcrumb"><a href="${HOME}">Home</a> / <a href="${BASE}cases/">All cases</a> / ${esc(g.title)}</nav>
  <h1>${esc(g.title)}</h1>
  <p class="lede">${esc(g.blurb)} <span class="mono">${items.length} entries, oldest first.</span></p>
</div></section>
<section class="section"><div class="wrap">
  <div class="cards">${items.map(caseCard).join("")}</div>
</div></section>
<section class="section"><div class="wrap">
  <div class="sec-head"><div class="left"><span class="tag-badge">More topics</span><h2>Keep exploring</h2></div></div>
  <div class="chips topic-links">${D.galleries.filter(x => x !== g).map(x => `<a class="chip" href="${topicPath(x)}">${esc(x.title)}</a>`).join("")}</div>
</div></section>
<section class="section"><div class="wrap pager">
  <a href="${topicPath(prev)}"><span>&larr; Previous topic</span><b>${esc(prev.title)}</b></a>
  <a class="next" href="${topicPath(next)}"><span>Next topic &rarr;</span><b>${esc(next.title)}</b></a>
</div></section>`;
  return page({
    title, description, canonical: url, nav: "topics", body,
    jsonld: [
      { "@context": "https://schema.org", "@type": "CollectionPage", name: g.title, description: g.blurb, url,
        isPartOf: { "@type": "WebSite", name: D.site.name, url: HOME_URL },
        mainEntity: { "@type": "ItemList", itemListElement: items.map((c, n) => ({ "@type": "ListItem", position: n + 1, url: c.url, name: c.title })) } },
      crumbsLd([["Field guide", HOME_URL], ["All cases", SITE_URL + "cases/"], [g.title, url]])
    ]
  });
}

/* ---------- Every case, by era ---------- */
function casesIndexPage() {
  const url = SITE_URL + "cases/";
  const body = `
<section class="page-head"><div class="wrap">
  <nav class="crumbs" aria-label="Breadcrumb"><a href="${HOME}">Home</a> / All cases</nav>
  <h1>Every case</h1>
  <p class="lede">All ${cases.length} entries in the field guide, from the 1896 airship wave to the 2026 file releases. Each one sets out what's documented, what's claimed and the best explanation so far, with links to the original records.</p>
  <div class="chips topic-links">${D.galleries.map(g => `<a class="chip" href="${topicPath(g)}">${esc(g.title)}</a>`).join("")}</div>
</div></section>
${D.eras.map(e => { const items = cases.filter(c => c.year >= e.from && c.year <= e.to); return items.length ? `
<section class="section" id="era-${esc(e.id)}"><div class="wrap">
  <div class="sec-head"><div class="left"><span class="tag-badge">${esc(e.span || "")}</span><h2>${esc(e.title)}</h2></div><p class="lede">${esc(e.blurb || "")}</p></div>
  <div class="cards">${items.map(caseCard).join("")}</div>
</div></section>` : ""; }).join("")}`;
  return page({
    title: `Every UFO & UAP Case, 1896 to Today: A Skeptic's Field Guide | ${BRAND}`,
    description: clip(`All ${cases.length} UFO and UAP cases in the Friendly Skeptic field guide, from Roswell and Blue Book to the Navy videos and AARO, with the evidence, the claims and the best explanation for each.`),
    canonical: url, nav: "topics", body,
    jsonld: [
      { "@context": "https://schema.org", "@type": "CollectionPage", name: "Every case", url,
        isPartOf: { "@type": "WebSite", name: D.site.name, url: HOME_URL },
        mainEntity: { "@type": "ItemList", itemListElement: cases.map((c, n) => ({ "@type": "ListItem", position: n + 1, url: c.url, name: c.title })) } },
      crumbsLd([["Field guide", HOME_URL], ["All cases", url]])
    ]
  });
}

/* ---------- One page per episode ---------- */
function episodePage(e, i) {
  const prev = eps[i - 1], next = eps[i + 1];
  const epCases = (e.cases || []).map(id => byId[id]).filter(Boolean);
  const art = e.art ? local(e.art) : local("images/cover.jpg?v=2");
  const artAbs = e.art ? abs(e.art) : COVER;
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
    ...(epCases.length ? { about: epCases.map(c => ({ "@type": "Thing", name: c.title, url: c.url })) } : {})
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
  <div class="cards">${epCases.map(caseCard).join("")}</div>
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
    ${prev ? `<a class="prev" href="${epPath(prev)}"><span>&larr; Episode ${prev.number}</span><b>${esc(prev.title)}</b></a>` : `<a class="prev" href="${BASE}cases/"><span>&larr; The field guide</span><b>Explore every case</b></a>`}
    ${next ? `<a class="next" href="${epPath(next)}"><span>Episode ${next.number} &rarr;</span><b>${esc(next.title)}</b></a>` : `<a class="next" href="${BASE}episodes/"><span>All episodes &rarr;</span><b>Season 1</b></a>`}
  </nav>
</div></section>
${e.scheduled ? RELEASE_SCRIPT : ""}`;

  return page({
    title, description, canonical: e.url, image: artAbs, imageAlt: `Episode ${e.number} artwork: ${e.title}`, ogType: "article", nav: "podcast", body,
    jsonld: [episodeLd, crumbsLd([["Field guide", HOME_URL], ["Podcast episodes", SITE_URL + "episodes/"], [`Episode ${e.number}: ${e.title}`, e.url]])]
  });
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
    canonical: url, nav: "podcast", body,
    jsonld: [seriesFull, listLd]
  });
}

/* ---------- Write files ---------- */
// Sitemap dates: a page's date only moves when its content actually changes.
const DATES_FILE = path.join(ROOT, "scripts", "page-dates.json");
let dates = {};
try { dates = JSON.parse(fs.readFileSync(DATES_FILE, "utf8")); } catch (_) {}
const today = ymd(new Date(NOW));
const newDates = {};
const stampDate = (url, html) => {
  // Ignore the footer year so New Year's Day doesn't "change" every page.
  const hash = crypto.createHash("sha1").update(html.replace(/&copy; \d{4}/, "")).digest("hex").slice(0, 16);
  const old = dates[url];
  newDates[url] = old && old.hash === hash ? old : { hash, date: today, first: (old && old.first) || today };
  return newDates[url];
};

const pages = [];   // [url, file, render(datesForUrl)]
pages.push([SITE_URL + "cases/", "cases/index.html", () => casesIndexPage()]);
cases.forEach((c, i) => pages.push([c.url, `case/${c.id}/index.html`, d => casePage(c, i, d)]));
D.galleries.forEach((g, i) => pages.push([ORIGIN + topicPath(g), `topics/${g.id}/index.html`, () => topicPage(g, i)]));
pages.push([SITE_URL + "episodes/", "episodes/index.html", () => listPage()]);
eps.forEach((e, i) => pages.push([e.url, `episodes/${e.slug}/index.html`, () => episodePage(e, i)]));

// Drop pages for renamed or removed entries, then write everything fresh.
for (const dir of ["case", "cases", "topics", "episodes"]) {
  fs.rmSync(path.join(ROOT, dir), { recursive: true, force: true });
}
// One shared stylesheet for every built page, so browsers download it once.
fs.mkdirSync(path.join(ROOT, "assets"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "assets", "pages.css"), "/* Built by scripts/build-pages.js from the <style> block in index.html. Don't edit by hand. */\n" + CSS_TEXT);
for (const [url, file, render] of pages) {
  // Render once without dates to see whether the content changed, then with them.
  const d = stampDate(url, render(null));
  const out = path.join(ROOT, file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, render(d));
}
// The guide's home page changes whenever content.js does.
const homeHash = crypto.createHash("sha1").update(fs.readFileSync(path.join(ROOT, "content.js")) + indexHtml).digest("hex").slice(0, 16);
const oldHome = dates[HOME_URL];
newDates[HOME_URL] = oldHome && oldHome.hash === homeHash ? oldHome : { hash: homeHash, date: today, first: (oldHome && oldHome.first) || today };
fs.writeFileSync(DATES_FILE, JSON.stringify(newDates, null, 1) + "\n");

const urls = [HOME_URL, ...pages.map(p => p[0])];
fs.writeFileSync(path.join(ROOT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<!-- Built by scripts/build-pages.js. Don't edit by hand. -->\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map(u => `  <url><loc>${esc(u)}</loc><lastmod>${newDates[u].date}</lastmod></url>`).join("\n") + `\n</urlset>\n`);

console.log(`Built ${cases.length} case pages, ${D.galleries.length} topic pages, the case index, ${eps.length} episode pages, the episode list and sitemap.xml (${urls.length} URLs).`);
