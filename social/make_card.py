#!/usr/bin/env python3
"""Make a 1080x1350 Instagram card in the site's style.

Usage (run from the repo root):
  python3 social/make_card.py episode 2               -> social/posts/episode-02.jpg
  python3 social/make_card.py case roswell            -> social/posts/case-roswell.jpg
  python3 social/make_card.py welcome show          -> social/posts/welcome.jpg
  python3 social/make_card.py news spec.json          -> social/posts/news-<slug>.jpg
      spec.json: {"slug": "...", "headline": "...", "summary": "...",
                  "source": "...", "date": "October 21, 2026"}
  Add --out path.jpg to choose the output file.
  Case cards: --record "..." and --explain "..." replace the two short fact
  lines (default: first 'documented' item and first sentence of 'explanation').
  If a card is too full, fact blocks are dropped automatically.

Episode and case text comes straight from content.js, so cards always
match the site. Needs Python Playwright (Chromium) and Node.
"""
import html, json, os, re, subprocess, sys, tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SOCIAL = ROOT / "social"
W, H = 1080, 1350

STATUS = {
    "explained": ("Explained", "#8fd0c6"),
    "likely": ("Probably explained", "#9cc7a4"),
    "unresolved": ("Unresolved", "#e8b45c"),
    "disputed": ("Disputed", "#dd7f6f"),
    "hoax": ("Hoax", "#ef6b6b"),
    "record": ("On the record", "#f3ead6"),
}


def load_content():
    js = r"""
    const fs=require('fs'),vm=require('vm');const sb={window:{}};
    vm.runInNewContext(fs.readFileSync(process.argv[1],'utf8'),sb);
    const D=sb.window.FIELD_GUIDE;
    const cases=D.cases.slice().sort((a,b)=>a.year-b.year||D.cases.indexOf(a)-D.cases.indexOf(b));
    cases.forEach((c,i)=>{c.cat='FG-'+String(i+1).padStart(3,'0')});
    process.stdout.write(JSON.stringify({cases,episodes:D.episodes}));
    """
    out = subprocess.run(["node", "-e", js, str(ROOT / "content.js")], capture_output=True, text=True, check=True)
    return json.loads(out.stdout)


e = lambda s: html.escape(str(s or ""))


def font_css():
    f = (SOCIAL / "fonts").as_uri()
    return f"""
@font-face{{font-family:Londrina;font-weight:900;src:url({f}/londrina-solid-latin-900-normal.woff2)}}
@font-face{{font-family:Karla;font-weight:400;src:url({f}/karla-latin-400-normal.woff2)}}
@font-face{{font-family:Karla;font-weight:700;src:url({f}/karla-latin-700-normal.woff2)}}
@font-face{{font-family:Plex;font-weight:400;src:url({f}/ibm-plex-mono-latin-400-normal.woff2)}}
@font-face{{font-family:Plex;font-weight:600;src:url({f}/ibm-plex-mono-latin-600-normal.woff2)}}
"""


BASE_CSS = """
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:1350px;overflow:hidden}
body{background:#1b4a42;color:#f3ead6;font-family:Karla,sans-serif;display:flex;flex-direction:column;
  background-image:radial-gradient(rgba(243,234,214,.08) 1.5px,transparent 2px),radial-gradient(rgba(15,20,18,.12) 1.5px,transparent 2px);
  background-size:30px 30px,43px 43px;background-position:0 0,15px 9px}
.main{flex:1;padding:70px 80px 40px;display:flex;flex-direction:column;min-height:0}
.badge{align-self:flex-start;font-family:Plex;font-weight:600;font-size:26px;letter-spacing:.14em;text-transform:uppercase;
  background:#e8b45c;color:#1c2421;padding:10px 22px;border-radius:8px;border:3px solid #1c2421;box-shadow:6px 6px 0 #0f1412}
.badge.news{background:#dd7f6f}
.eyebrow{font-family:Plex;font-size:26px;letter-spacing:.12em;text-transform:uppercase;color:#e8b45c}
h1{font-family:Londrina;font-weight:900;text-transform:uppercase;line-height:.95;letter-spacing:.01em;color:#f3ead6}
h1 em{font-style:normal;color:#e8b45c}
.foot{background:#1c2421;border-top:4px solid #e8b45c;padding:26px 80px;display:flex;align-items:center;gap:26px}
.foot img{width:96px;height:96px;border:3px solid #f3ead6;display:block}
.foot .t{display:grid;gap:4px}
.foot b{font-family:Londrina;font-weight:900;font-size:36px;text-transform:uppercase;letter-spacing:.02em;line-height:1}
.foot b span{color:#e8b45c}
.foot small{font-family:Plex;font-size:21px;color:#c9c2b0;letter-spacing:.06em}
.stamp{display:inline-block;font-family:Plex;font-weight:600;font-size:30px;letter-spacing:.14em;text-transform:uppercase;
  color:var(--c);background:#1c2421;border:4px solid var(--c);padding:10px 22px;border-radius:6px;box-shadow:6px 6px 0 #0f1412;transform:rotate(-5deg)}
"""


def footer(line):
    cover = (ROOT / "images" / "cover.jpg").as_uri()
    return f"""<div class="foot"><img src="{cover}" alt=""><div class="t">
<b>Flying Saucers <span>for the Friendly Skeptic</span></b><small>{e(line)}</small></div></div>"""


def page(css, body):
    return f"<!doctype html><html><head><meta charset='utf-8'><style>{font_css()}{BASE_CSS}{css}</style></head><body>{body}</body></html>"


def episode_card(ep):
    art = (ROOT / ep["art"]).as_uri()
    title = ep["title"]
    size = 104 if len(title) <= 18 else 88 if len(title) <= 26 else 74
    css = f"""
.main{{align-items:center;gap:34px;padding-top:60px}}
.badge{{align-self:center}}
.art{{width:720px;height:720px;border:10px solid #f3ead6;box-shadow:18px 18px 0 #0f1412;transform:rotate(-1.5deg);display:block;object-fit:cover}}
h1{{font-size:{size}px;text-align:center}}
.meta{{font-family:Plex;font-size:26px;letter-spacing:.1em;text-transform:uppercase;color:#c9c2b0;margin-top:-14px}}
"""
    meta = f"Episode {ep['number']}" + (f" · {ep['length']}" if ep.get("length") else "")
    body = f"""<div class="main"><span class="badge">New episode · Out now</span>
<img class="art" src="{art}" alt=""><h1>{e(title)}</h1><p class="meta">{e(meta)}</p></div>
{footer("Listen wherever you get your podcasts · Link in bio")}"""
    return page(css, body)


def welcome_card():
    art = (SOCIAL / "cover-orange.jpg").as_uri()
    css = """
.main{align-items:center;gap:34px;padding-top:60px}
.badge{align-self:center}
.art{width:720px;height:720px;border:10px solid #f3ead6;box-shadow:18px 18px 0 #0f1412;transform:rotate(-1.5deg);display:block;object-fit:cover}
h1{font-size:96px;text-align:center}
.meta{font-family:Plex;font-size:26px;letter-spacing:.1em;text-transform:uppercase;color:#c9c2b0;margin-top:-14px;text-align:center}
"""
    body = f"""<div class="main"><span class="badge">Welcome aboard</span>
<img class="art" src="{art}" alt=""><h1>Welcome, <em>skeptics</em></h1>
<p class="meta">A beginner's guide to UFOs &amp; UAP<br>New episodes every Monday</p></div>
{footer("Listen wherever you get your podcasts · Link in bio")}"""
    return page(css, body)


ABBR = re.compile(r"(?:\b(?:St|Dr|Mr|Mrs|Ms|Lt|Col|Gen|Sgt|Capt|Maj|Adm|Jr|Sr|No|vs|U\.S|U\.K|D\.C|a\.m|p\.m)|\b[A-Z])\.$")


def first_sentence(t):
    t = (t or "").strip()
    for m in re.finditer(r"\. (?=[A-Z0-9\"'])", t):
        if not ABBR.search(t[:m.start() + 1]):
            return t[:m.start() + 1]
    return t


def case_card(c, record=None, explain=None, level=0):
    label, color = STATUS.get(c["status"], (c["status"], "#f3ead6"))
    title = c["title"]
    size = 132 if len(title) <= 20 else 112 if len(title) <= 32 else 92 if len(title) <= 48 else 78
    teaser = c.get("teaser", "")
    css = f"""
.main{{gap:0}}
.cat{{font-family:Plex;font-size:26px;letter-spacing:.12em;color:#c9c2b0;margin-top:56px}}
h1{{font-size:{size}px;margin-top:18px}}
.where{{font-family:Plex;font-size:28px;color:#e8b45c;letter-spacing:.04em;margin-top:26px;line-height:1.4}}
.teaser{{font-size:42px;line-height:1.28;margin-top:36px;max-width:900px}}
.facts{{margin-top:48px;display:grid;gap:26px;max-width:920px}}
.facts div{{border-left:6px solid #e8b45c;padding-left:24px}}
.facts b{{display:block;font-family:Plex;font-weight:600;font-size:22px;letter-spacing:.12em;text-transform:uppercase;color:#e8b45c;margin-bottom:6px}}
.facts p{{font-size:32px;line-height:1.32;color:#f3ead6}}
.verdict{{margin-top:auto;display:flex;align-items:center;gap:26px;padding-bottom:20px}}
.verdict p{{font-family:Plex;font-size:24px;letter-spacing:.12em;text-transform:uppercase;color:#c9c2b0}}
"""
    where = " · ".join(x for x in [c.get("date"), c.get("place")] if x)
    doc = record if record is not None else (c.get("documented") or [""])[0]
    expl = explain if explain is not None else first_sentence(c.get("explanation"))
    blocks = [("On the record", doc), ("Best explanation so far", expl)][: max(0, 2 - level)]
    facts = "".join(f"<div><b>{k}</b><p>{e(v)}</p></div>" for k, v in blocks if v)
    body = f"""<div class="main"><span class="badge">Case of the week</span>
<p class="cat">Field guide entry {e(c['cat'])}</p><h1>{e(title)}</h1>
<p class="where">{e(where)}</p><p class="teaser">{e(teaser)}</p>
<div class="facts">{facts}</div>
<div class="verdict"><p>The verdict</p><span class="stamp" style="--c:{color}">{e(label)}</span></div></div>
{footer("The full case file, sources included · Link in bio")}"""
    return page(css, body)


def news_card(n):
    hl = n["headline"]
    size = 112 if len(hl) <= 40 else 96 if len(hl) <= 60 else 82 if len(hl) <= 85 else 70
    css = f"""
h1{{font-size:{size}px;margin-top:50px}}
.date{{font-family:Plex;font-size:26px;letter-spacing:.12em;text-transform:uppercase;color:#c9c2b0;margin-top:56px}}
.sum{{font-size:42px;line-height:1.32;margin-top:40px;max-width:910px}}
.src{{margin-top:auto;font-family:Plex;font-size:26px;color:#e8b45c;letter-spacing:.04em;padding-bottom:20px;line-height:1.45}}
"""
    body = f"""<div class="main"><span class="badge news">UAP news</span>
<p class="date">{e(n.get('date'))}</p><h1>{e(hl)}</h1><p class="sum">{e(n.get('summary'))}</p>
<p class="src">Source: {e(n.get('source'))}<br>Our skeptic's take is in the caption.</p></div>
{footer("Listen wherever you get your podcasts · Link in bio")}"""
    return page(css, body)


def render(doc, out):
    from playwright.sync_api import sync_playwright
    out = Path(out)
    out.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False, dir=SOCIAL) as f:
        f.write(doc)
        tmp = f.name
    try:
        with sync_playwright() as p:
            b = p.chromium.launch()
            pg = b.new_page(viewport={"width": W, "height": H})
            pg.goto(Path(tmp).as_uri())
            pg.evaluate("document.fonts.ready")
            pg.wait_for_timeout(300)
            overflow = pg.evaluate("document.querySelector('.main').scrollHeight > document.querySelector('.main').clientHeight + 2")
            pg.screenshot(path=str(out), type="jpeg", quality=90)
            b.close()
    finally:
        os.unlink(tmp)
    return overflow


def main():
    a = sys.argv[1:]
    opts = {}
    for k in ("--out", "--record", "--explain"):
        if k in a:
            i = a.index(k); opts[k] = a[i + 1]; del a[i:i + 2]
    out = opts.get("--out")
    if len(a) != 2:
        sys.exit(__doc__)
    kind, arg = a
    if kind == "episode":
        D = load_content()
        ep = next(x for x in D["episodes"] if x["number"] == int(arg))
        out = out or SOCIAL / "posts" / f"episode-{int(arg):02d}.jpg"
        over = render(episode_card(ep), out)
    elif kind == "case":
        D = load_content()
        c = next(x for x in D["cases"] if x["id"] == arg)
        out = out or SOCIAL / "posts" / f"case-{arg}.jpg"
        for level in range(3):  # drop fact blocks until it fits
            over = render(case_card(c, opts.get("--record"), opts.get("--explain"), level), out)
            if not over:
                break
    elif kind == "welcome":
        out = out or SOCIAL / "posts" / "welcome.jpg"
        over = render(welcome_card(), out)
    elif kind == "news":
        n = json.load(open(arg))
        out = out or SOCIAL / "posts" / f"news-{n['slug']}.jpg"
        over = render(news_card(n), out)
    else:
        sys.exit(__doc__)
    if over:
        print("WARNING: text overflows the card; shorten it.", file=sys.stderr)
    print(out)


if __name__ == "__main__":
    main()
