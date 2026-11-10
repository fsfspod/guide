#!/usr/bin/env node
/* Fills in `audio` and `length` in content.js from the podcast's RSS feed.

   For each episode in content.js that has no `audio` yet, this looks for the
   feed item with the same episode number (itunes:episode, or "Ep N:" in the
   title) and adds the feed's audio URL and duration right after the
   episode's releaseAt/published line. Episodes that already have audio are
   never touched, so the local files for Episodes 1-3 stay as they are.

   It only fills in gaps; it never rewrites titles, summaries, cases or links.
   If the feed can't be reached or read, it prints a warning and exits
   cleanly so the rest of the build still runs.

   Run by .github/workflows/build-pages.yml before the pages are rebuilt.
   Override the feed with the FEED_URL environment variable. */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const CONTENT = path.join(ROOT, "content.js");
const FEED_URL = process.env.FEED_URL || "https://anchor.fm/s/118c07c40/podcast/rss";

const decode = s => s
  .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
  .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, "&");
const tag = (xml, name) => { const m = xml.match(new RegExp("<" + name + "(?:\\s[^>]*)?>([\\s\\S]*?)</" + name + ">")); return m ? decode(m[1]).trim() : ""; };

// "00:15:58" -> "15:58", "01:02:03" -> "1:02:03", or plain seconds -> "m:ss"
function length(d) {
  if (!d) return "";
  let h = 0, m = 0, s = 0;
  if (/^\d+$/.test(d)) { const t = +d; h = Math.floor(t / 3600); m = Math.floor(t % 3600 / 60); s = t % 60; }
  else { const p = d.split(":").map(Number); if (p.some(isNaN)) return ""; if (p.length === 3) [h, m, s] = p; else if (p.length === 2) [m, s] = p; else return ""; }
  const ss = String(s).padStart(2, "0");
  return h ? `${h}:${String(m).padStart(2, "0")}:${ss}` : `${m}:${ss}`;
}

function parseFeed(xml) {
  const out = {};
  for (const m of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
    const item = m[1];
    const title = tag(item, "title");
    const n = parseInt(tag(item, "itunes:episode"), 10) || parseInt((title.match(/^\s*(?:Ep(?:isode)?\.?\s*)(\d+)\b/i) || [])[1], 10);
    const enc = item.match(/<enclosure\b[^>]*>/);
    const url = enc && (enc[0].match(/\burl="([^"]+)"/) || [])[1];
    if (!n || !url) continue;
    out[n] = { audio: url.replace(/&amp;/g, "&"), length: length(tag(item, "itunes:duration")) };
  }
  return out;
}

(async () => {
  let xml;
  try {
    const res = await fetch(FEED_URL, { headers: { "User-Agent": "fsfs-site-sync/1.0" }, signal: AbortSignal.timeout(30000) });
    if (!res.ok) throw new Error("HTTP " + res.status);
    xml = await res.text();
  } catch (err) {
    console.warn("sync-feed: could not read the feed (" + err.message + "). Leaving content.js as it is.");
    return;
  }
  const feed = parseFeed(xml);
  if (!Object.keys(feed).length) { console.warn("sync-feed: no episodes found in the feed. Leaving content.js as it is."); return; }

  let src = fs.readFileSync(CONTENT, "utf8");
  const sandbox = { window: {} };
  vm.runInNewContext(src, sandbox);
  const D = sandbox.window.FIELD_GUIDE || sandbox.FIELD_GUIDE;
  if (!D || !Array.isArray(D.episodes)) throw new Error("content.js did not define FIELD_GUIDE.episodes");

  let changed = 0;
  for (const e of D.episodes) {
    if (e.audio) continue;
    const f = feed[e.number];
    if (!f) continue;
    // Find this episode's block by its number line, then insert after its releaseAt/published line (or the number line).
    const numRe = new RegExp("(\\n[ \\t]*number:\\s*" + e.number + "\\s*,[^\\n]*\\n)((?:[ \\t]*(?:releaseAt|published):[^\\n]*\\n)*)");
    const m = numRe.exec(src);
    if (!m) { console.warn("sync-feed: could not find Episode " + e.number + " in content.js; skipping."); continue; }
    const indent = (m[1].match(/\n([ \t]*)/) || [, "      "])[1];
    const line = `${indent}audio: ${JSON.stringify(f.audio)}${f.length ? `, length: ${JSON.stringify(f.length)}` : ""},\n`;
    src = src.slice(0, m.index + m[0].length) + line + src.slice(m.index + m[0].length);
    console.log(`sync-feed: Episode ${e.number} (${e.title}) -> ${f.length || "no duration"}`);
    changed++;
  }

  if (!changed) { console.log("sync-feed: nothing to update."); return; }
  // Make sure the result still loads before saving it.
  vm.runInNewContext(src, { window: {} });
  fs.writeFileSync(CONTENT, src);
  console.log(`sync-feed: updated ${changed} episode(s) in content.js.`);
})().catch(err => { console.error("sync-feed: " + err.stack); process.exit(1); });
