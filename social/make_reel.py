#!/usr/bin/env python3
"""Make a 1080x1920 (9:16) animated, silent Reel in the site's style.

Usage (run from the repo root):
  python3 social/make_reel.py case roswell        -> social/posts/reel-case-roswell.mp4
  python3 social/make_reel.py episode 3           -> social/posts/reel-episode-03.mp4
  python3 social/make_reel.py news spec.json      -> social/posts/reel-news-<slug>.mp4
      spec.json is the same as for make_card.py:
      {"slug": "...", "headline": "...", "summary": "...", "source": "...", "date": "October 21, 2026"}
  Options: --out path.mp4   --secs 10.5   --bg other-clip.mp4 (default social/bg/beam.mp4; --bg none = plain card)

Text comes straight from content.js (same as make_card.py). The page is rendered with
Playwright (CSS animations stepped frame by frame) and laid over the tinted background
clip with ffmpeg. All text stays clear of Instagram's Reel UI (top ~230px, bottom ~380px).
Prints a WARNING if text runs into the bottom zone: shorten it and rerun.
"""
import shutil, subprocess, sys, tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import make_card as mc

W, H, FPS = 1080, 1920, 30
DEFAULT_BG = mc.SOCIAL / "bg" / "beam.mp4"
SAFE_BOTTOM = 1540

REEL_CSS = """
html,body{width:1080px;height:1920px}
body{display:block;position:relative;animation:drift var(--len) linear both}
@keyframes drift{from{background-position:0 0,15px 9px}to{background-position:-60px 40px,-45px 49px}}
.reel{position:absolute;left:0;right:0;top:0;height:1920px;padding:230px 80px 0;display:flex;flex-direction:column}
.brand{display:flex;align-items:center;gap:24px;animation:fade .6s ease-out .0s both}
.brand img{width:92px;height:92px;border:3px solid #f3ead6}
.brand b{font-family:Londrina;font-weight:900;font-size:40px;text-transform:uppercase;line-height:1}
.brand b span{color:#e8b45c}
.brand small{display:block;font-family:Plex;font-size:20px;letter-spacing:.08em;color:#c9c2b0;margin-top:6px}
.body{margin-top:50px;display:flex;flex-direction:column}
.badge{animation:pop .5s cubic-bezier(.2,.8,.2,1) .5s both}
.stamp{font-size:42px}
@keyframes fade{from{opacity:0}to{opacity:1}}
@keyframes pop{from{opacity:0;transform:translateY(36px)}to{opacity:1;transform:none}}
@keyframes slide{from{opacity:0;transform:translateX(-70px)}to{opacity:1;transform:none}}
@keyframes slam{0%{opacity:0;transform:scale(1.4)}60%{opacity:1;transform:scale(.97)}100%{opacity:1;transform:scale(1)}}
@keyframes stampin{0%{opacity:0;transform:rotate(-5deg) scale(2.4)}55%{opacity:1;transform:rotate(-5deg) scale(.93)}100%{opacity:1;transform:rotate(-5deg) scale(1)}}
@keyframes artin{0%{opacity:0;transform:rotate(-1.5deg) scale(1.25)}60%{opacity:1;transform:rotate(-1.5deg) scale(.98)}100%{opacity:1;transform:rotate(-1.5deg) scale(1)}}
"""

CASE_CSS = """
.cat{font-family:Plex;font-size:32px;letter-spacing:.12em;color:#c9c2b0;margin-top:44px;animation:pop .5s ease-out 1.0s both}
h1{margin-top:20px;transform-origin:left center;animation:slam .55s cubic-bezier(.2,.9,.2,1) 1.4s both}
.where{font-family:Plex;font-size:36px;color:#e8b45c;letter-spacing:.04em;margin-top:26px;line-height:1.4;animation:pop .5s ease-out 2.2s both}
.teaser{font-size:50px;line-height:1.26;margin-top:40px;max-width:920px;animation:pop .6s ease-out 3.0s both}
.facts{margin-top:50px;display:grid;gap:30px;max-width:920px}
.facts div{border-left:6px solid #e8b45c;padding-left:26px}
.facts div:nth-child(1){animation:slide .6s cubic-bezier(.2,.8,.2,1) 4.6s both}
.facts div:nth-child(2){animation:slide .6s cubic-bezier(.2,.8,.2,1) 6.4s both}
.facts b{display:block;font-family:Plex;font-weight:600;font-size:28px;letter-spacing:.12em;text-transform:uppercase;color:#e8b45c;margin-bottom:10px}
.facts p{font-size:40px;line-height:1.32;color:#f3ead6}
.verdict{margin-top:56px;display:flex;align-items:center;gap:28px}
.verdict p{font-family:Plex;font-size:30px;letter-spacing:.12em;text-transform:uppercase;color:#c9c2b0;animation:pop .4s ease-out 8.0s both}
.stamp{animation:stampin .5s cubic-bezier(.2,.9,.2,1) 8.5s both}
"""

EPISODE_CSS = """
.body{align-items:center}
.art{width:580px;height:580px;border:10px solid #f3ead6;box-shadow:18px 18px 0 #0f1412;display:block;object-fit:cover;margin-top:44px;animation:artin .7s cubic-bezier(.2,.9,.2,1) 1.0s both}
h1{text-align:center;margin-top:44px;animation:slam .55s cubic-bezier(.2,.9,.2,1) 2.2s both}
.meta{font-family:Plex;font-size:34px;letter-spacing:.1em;text-transform:uppercase;color:#e8b45c;margin-top:26px;animation:pop .5s ease-out 3.2s both}
.cta{font-family:Plex;font-size:30px;letter-spacing:.04em;color:#f3ead6;text-align:center;margin-top:40px;animation:pop .5s ease-out 4.4s both}
"""

NEWS_CSS = """
.badge.news{background:#dd7f6f}
.date{font-family:Plex;font-size:32px;letter-spacing:.12em;text-transform:uppercase;color:#c9c2b0;margin-top:50px;animation:pop .5s ease-out 1.0s both}
h1{margin-top:28px;transform-origin:left center;animation:slam .55s cubic-bezier(.2,.9,.2,1) 1.6s both}
.sum{font-size:50px;line-height:1.28;margin-top:50px;max-width:920px;animation:pop .6s ease-out 3.4s both}
.src{font-family:Plex;font-size:32px;color:#e8b45c;letter-spacing:.04em;line-height:1.45;margin-top:56px;animation:pop .5s ease-out 6.0s both}
.take{font-family:Plex;font-size:28px;color:#c9c2b0;letter-spacing:.06em;margin-top:20px;animation:pop .5s ease-out 7.2s both}
"""


def brand(sub):
    cover = (mc.ROOT / "images" / "cover.jpg").as_uri()
    return (f'<div class="brand"><img src="{cover}" alt=""><div><b>Flying Saucers <span>for the Friendly Skeptic</span></b>'
            f"<small>{mc.e(sub)}</small></div></div>")


def case_reel(c):
    label, color = mc.STATUS.get(c["status"], (c["status"], "#f3ead6"))
    title = c["title"]
    size = 170 if len(title) <= 20 else 140 if len(title) <= 32 else 116 if len(title) <= 48 else 96
    where = " · ".join(x for x in [c.get("date"), c.get("place")] if x)
    doc = (c.get("documented") or [""])[0]
    expl = mc.first_sentence(c.get("explanation"))
    facts = "".join(f"<div><b>{k}</b><p>{mc.e(v)}</p></div>"
                    for k, v in [("On the record", doc), ("Best explanation so far", expl)] if v)
    css = CASE_CSS + f"h1{{font-size:{size}px}}"
    body = f"""<div class="reel">{brand("A podcast for beginners")}
<div class="body"><span class="badge">Case of the week</span>
<p class="cat">Field guide entry {mc.e(c['cat'])}</p><h1>{mc.e(title)}</h1>
<p class="where">{mc.e(where)}</p><p class="teaser">{mc.e(c.get('teaser', ''))}</p>
<div class="facts">{facts}</div>
<div class="verdict"><p>The verdict</p><span class="stamp" style="--c:{color}">{mc.e(label)}</span></div></div></div>"""
    return css, body, ".verdict"


def episode_reel(ep):
    title = ep["title"]
    size = 120 if len(title) <= 18 else 100 if len(title) <= 26 else 84
    art = (mc.ROOT / ep["art"]).as_uri()
    meta = f"Episode {ep['number']}" + (f" · {ep['length']}" if ep.get("length") else "")
    css = EPISODE_CSS + f"h1{{font-size:{size}px}}"
    body = f"""<div class="reel">{brand("A podcast for beginners")}
<div class="body"><span class="badge">New episode · Out now</span>
<img class="art" src="{art}" alt=""><h1>{mc.e(title)}</h1><p class="meta">{mc.e(meta)}</p>
<p class="cta">Listen wherever you get podcasts · <span style="color:#e8b45c">Link in bio</span></p></div></div>"""
    return css, body, ".cta"


def news_reel(n):
    hl = n["headline"]
    size = 120 if len(hl) <= 40 else 104 if len(hl) <= 60 else 90 if len(hl) <= 85 else 76
    css = NEWS_CSS + f"h1{{font-size:{size}px}}"
    body = f"""<div class="reel">{brand("A podcast for beginners")}
<div class="body"><span class="badge news">UAP news</span>
<p class="date">{mc.e(n.get('date'))}</p><h1>{mc.e(hl)}</h1><p class="sum">{mc.e(n.get('summary'))}</p>
<p class="src">Source: {mc.e(n.get('source'))}</p><p class="take">Our skeptic's take is in the caption.</p></div></div>"""
    return css, body, ".take"


def render_video(css, body, last_sel, out, secs, bg):
    from playwright.sync_api import sync_playwright
    out = Path(out)
    out.parent.mkdir(parents=True, exist_ok=True)
    doc = mc.page(REEL_CSS + css, body).replace("<body>", f'<body style="--len:{secs}s">', 1)
    if bg:  # transparent page; the clip shows through, tinted green for legibility
        doc = doc.replace("</style>", "html,body{background:none!important}</style>", 1)
    frames = Path(tempfile.mkdtemp(prefix="reelframes_"))
    html_path = mc.SOCIAL / "_reel_tmp.html"
    html_path.write_text(doc)
    ext = "png" if bg else "jpg"
    n = int(secs * FPS)
    try:
        with sync_playwright() as p:
            b = p.chromium.launch()
            pg = b.new_page(viewport={"width": W, "height": H})
            pg.goto(html_path.as_uri())
            pg.evaluate("document.fonts.ready")
            pg.wait_for_timeout(400)
            pg.evaluate("document.getAnimations().forEach(a=>{a.pause();a.currentTime=1e5})")
            bottom = pg.evaluate(f"document.querySelector('{last_sel}').getBoundingClientRect().bottom")
            for i in range(n):
                pg.evaluate("t=>document.getAnimations().forEach(a=>{a.pause();a.currentTime=t})", i * 1000 / FPS)
                if bg:
                    pg.screenshot(path=str(frames / f"f{i:04d}.png"), omit_background=True)
                else:
                    pg.screenshot(path=str(frames / f"f{i:04d}.jpg"), type="jpeg", quality=92)
            b.close()
        if bg:
            cmd = ["ffmpeg", "-y", "-loglevel", "error", "-stream_loop", "-1", "-i", str(bg),
                   "-framerate", str(FPS), "-i", str(frames / f"f%04d.{ext}"),
                   "-f", "lavfi", "-i", "anullsrc=r=44100:cl=stereo",
                   "-filter_complex",
                   f"[0:v]fps={FPS},scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},setsar=1,"
                   "drawbox=x=0:y=0:w=iw:h=ih:color=0x1b4a42@0.78:t=fill[b];[b][1:v]overlay=shortest=1,format=yuv420p[v]",
                   "-map", "[v]", "-map", "2:a", "-t", str(secs)]
        else:
            cmd = ["ffmpeg", "-y", "-loglevel", "error", "-framerate", str(FPS), "-i", str(frames / f"f%04d.{ext}"),
                   "-f", "lavfi", "-i", "anullsrc=r=44100:cl=stereo", "-shortest"]
        subprocess.run(cmd + ["-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-pix_fmt", "yuv420p",
                              "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", str(out)], check=True)
    finally:
        html_path.unlink(missing_ok=True)
        shutil.rmtree(frames, ignore_errors=True)
    return bottom > SAFE_BOTTOM


def main():
    a = sys.argv[1:]
    opts = {}
    for k in ("--out", "--secs", "--bg"):
        if k in a:
            i = a.index(k); opts[k] = a[i + 1]; del a[i:i + 2]
    if len(a) != 2:
        sys.exit(__doc__)
    kind, arg = a
    secs = float(opts.get("--secs", 10.5))
    bg = opts.get("--bg", str(DEFAULT_BG))
    bg = None if bg == "none" else bg
    if kind == "case":
        c = next(x for x in mc.load_content()["cases"] if x["id"] == arg)
        spec, name = case_reel(c), f"reel-case-{arg}.mp4"
    elif kind == "episode":
        ep = next(x for x in mc.load_content()["episodes"] if x["number"] == int(arg))
        spec, name = episode_reel(ep), f"reel-episode-{int(arg):02d}.mp4"
    elif kind == "news":
        import json
        nws = json.load(open(arg))
        spec, name = news_reel(nws), f"reel-news-{nws['slug']}.mp4"
    else:
        sys.exit(__doc__)
    out = opts.get("--out") or mc.SOCIAL / "posts" / name
    if render_video(*spec, out, secs, bg):
        print("WARNING: text runs into the bottom safe zone; shorten it.", file=sys.stderr)
    print(out)


if __name__ == "__main__":
    main()
