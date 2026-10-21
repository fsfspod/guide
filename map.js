/* =====================================================================
   FIELD GUIDE MAP
   Pins every entry with `coords` on a world map, and entries with
   `orbit` on the Earth & Moon view. Geometry lives in map-data.js;
   projection math comes from d3 (loaded by index.html).
   ===================================================================== */
window.FGMap = (function () {
  const NS = "http://www.w3.org/2000/svg";
  const COLORS = { unresolved: "#e8b45c", disputed: "#dd7f6f", likely: "#9cc7a4", explained: "#8fd0c6", hoax: "#ef6b6b", record: "#f3ead6" };
  const VIEWS = [["world", "World"], ["usa", "United States"], ["europe", "Europe"], ["south", "Latin America"]];
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  let state = { mode: "earth", view: "world" }; // remembered between visits in this session

  function mount(root, opts) {
    const B = window.FG_MAP_BASE, O = B.orbit, d3 = window.d3;
    const { cases, eras, STATUS, caseCard } = opts;

    // ---- positions ----
    const proj = d3.geoNaturalEarth1().fitExtent([[6, 6], [B.W - 6, B.H - 6]], { type: "Sphere" });
    const tilt = O.TILT * Math.PI / 180;
    const ringPt = a => { const x = O.RX * Math.cos(a), y = O.RY * Math.sin(a); return [O.EX + x * Math.cos(tilt) - y * Math.sin(tilt), O.EY + x * Math.sin(tilt) + y * Math.cos(tilt)]; };
    const [T0, C1, T1] = O.T;
    const q = t => [(1 - t) * (1 - t) * T0[0] + 2 * (1 - t) * t * C1[0] + t * t * T1[0], (1 - t) * (1 - t) * T0[1] + 2 * (1 - t) * t * C1[1] + t * t * T1[1]];
    const spread = (n, a, b) => n === 1 ? [(a + b) / 2] : Array.from({ length: n }, (_, i) => a + (b - a) * i / (n - 1));
    const byOrbit = k => cases.filter(c => c.orbit === k).sort((a, b) => a.year - b.year);
    const OP = {};
    const leo = byOrbit("leo"), tl = byOrbit("translunar"), moon = byOrbit("moon");
    spread(leo.length, .18, .84).forEach((f, i) => OP[leo[i].id] = ringPt(Math.PI * f));
    spread(tl.length, .38, .62).forEach((t, i) => OP[tl[i].id] = q(t));
    moon.forEach((c, i) => { const a = i * 2.4; OP[c.id] = [O.MX - 12 + Math.cos(a) * i * 16, O.MY + 6 + Math.sin(a) * i * 16]; });
    const pts = cases.map(c => {
      const p = c.coords ? proj([c.coords[1], c.coords[0]]) : null;
      return { c, id: c.id, s: c.status, y: c.year, pl: c.place, x: p ? p[0] : null, yy: p ? p[1] : null, ox: OP[c.id] ? OP[c.id][0] : null, oy: OP[c.id] ? OP[c.id][1] : null };
    });

    // ---- base art ----
    const EARTH_BASE = `<path d="${B.sphere}" fill="#1b2724"/><path d="${B.grat}" fill="none" stroke="rgba(243,234,214,.06)" stroke-width=".6" vector-effect="non-scaling-stroke"/><path d="${B.land}" fill="#2b5a53"/><path d="${B.borders}" fill="none" stroke="rgba(243,234,214,.22)" stroke-width=".7" vector-effect="non-scaling-stroke"/><path d="${B.sphere}" fill="none" stroke="rgba(243,234,214,.25)" stroke-width="1.2" vector-effect="non-scaling-stroke"/>`;
    let stars = "", seed = 7;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < 170; i++) { const x = rnd() * 1000, y = rnd() * 560 - 20, r = rnd() < .9 ? .9 : 1.7; stars += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="rgba(243,234,214,${(.25 + rnd() * .5).toFixed(2)})"/>`; }
    const M = (x, y) => [(O.MX + x * O.MR).toFixed(1), (O.MY + y * O.MR).toFixed(1)];
    function blob(cx, cy, rx, ry, rot, k) {
      let d = "";
      const r2 = () => (k = (k * 9301 + 49297) % 233280) / 233280;
      const wob = [r2(), r2(), r2(), r2()].map(v => v * 6.28), amp = [.12, .08, .06, .05];
      for (let a = 0; a <= 64; a++) {
        const t = a / 64 * Math.PI * 2, f = 1 + amp.reduce((s, A, n) => s + A * Math.sin((n + 2) * t + wob[n]), 0);
        let x = Math.cos(t) * rx * f, y = Math.sin(t) * ry * f;
        const c = Math.cos(rot), sn = Math.sin(rot); [x, y] = [x * c - y * sn, x * sn + y * c];
        let px = cx + x, py = cy + y; const dd = Math.hypot(px, py); if (dd > .97) { px *= .97 / dd; py *= .97 / dd; }
        const [X, Y] = M(px, py); d += (a ? "L" : "M") + X + " " + Y;
      }
      return d + "Z";
    }
    const MARIA = [
      [-.56, -.02, .26, .46, .15, 11], [-.30, -.44, .25, .21, -.3, 23], [.21, -.40, .14, .13, 0, 31], [.36, -.10, .18, .15, .4, 43],
      [.72, -.30, .10, .08, .2, 57], [.62, .14, .11, .14, .3, 61], [.42, .30, .08, .08, 0, 71], [-.14, .38, .16, .12, .2, 83],
      [-.46, .42, .09, .09, 0, 91], [.02, -.70, .38, .05, .08, 97], [.04, -.22, .08, .06, 0, 103], [-.72, .25, .1, .2, .2, 109]
    ].map(([x, y, rx, ry, r, n]) => `<path d="${blob(x, y, rx, ry, r, n)}"/>`).join("");
    const lp = ringPt(Math.PI * 1.02), tm = q(.5);
    const ORBIT_BASE = `<rect x="-600" y="-300" width="2200" height="1160" fill="#121a17"/>${stars}
      <path d="${O.ringBack}" fill="none" stroke="rgba(232,180,92,.35)" stroke-width="1.6" stroke-dasharray="5 6"/>
      <circle cx="${O.EX}" cy="${O.EY}" r="${O.ER + 7}" fill="none" stroke="rgba(143,208,198,.18)" stroke-width="10"/>
      <path d="${O.earthSphere}" fill="#1f3d38"/><path d="${O.earthGrat}" fill="none" stroke="rgba(243,234,214,.08)" stroke-width=".7"/>
      <path d="${O.earthLand}" fill="#2f6b61"/><path d="${O.earthSphere}" fill="none" stroke="rgba(243,234,214,.3)" stroke-width="1.4"/>
      <path d="${O.ringFront}" fill="none" stroke="rgba(232,180,92,.8)" stroke-width="1.8" stroke-dasharray="5 6"/>
      <path d="${O.trans}" fill="none" stroke="rgba(243,234,214,.45)" stroke-width="1.6" stroke-dasharray="2 7" stroke-linecap="round"/>
      <path d="${O.moonSphere}" fill="#2f6b61"/><g fill="#1f3d38">${MARIA}</g>
      <path d="${O.moonGrat}" fill="none" stroke="rgba(243,234,214,.08)" stroke-width=".7"/>
      <path d="${O.moonSphere}" fill="none" stroke="rgba(243,234,214,.3)" stroke-width="1.4"/>
      <text class="mp-orbit-label" x="${O.EX + 40}" y="${O.EY + 105}" font-size="13" text-anchor="middle">Low Earth orbit</text>
      <text class="mp-orbit-label" x="${tm[0].toFixed(1)}" y="${(tm[1] - 18).toFixed(1)}" font-size="13" text-anchor="middle">To the Moon</text>
      <text class="mp-orbit-label" x="${O.MX}" y="${O.MY + O.MR + 30}" font-size="13" text-anchor="middle">The Moon</text>`;

    // ---- markup ----
    root.innerHTML = `
      <div class="mp-controls">
        <div class="mp-row mp-views" role="group" aria-label="Region"><span class="mp-lbl">Region</span>${VIEWS.map(([k, l]) => `<button class="chip mp-view" type="button" data-view="${k}" aria-pressed="false">${l}</button>`).join("")}</div>
        <div class="mp-row" role="group" aria-label="Filter by stamp"><span class="mp-lbl">Stamps</span>${Object.keys(COLORS).map(k => `<button class="chip mp-stat" type="button" data-stat="${k}" aria-pressed="true"><span class="mp-dot" style="background:${COLORS[k]}"></span>${esc(STATUS[k].label)}</button>`).join("")}</div>
        <div class="mp-row" role="group" aria-label="Filter by era"><span class="mp-lbl">Era</span><button class="chip" type="button" data-era="all" aria-pressed="true">All years</button>${eras.map(e => `<button class="chip" type="button" data-era="${e.id}" aria-pressed="false">${esc(e.span)}</button>`).join("")}</div>
      </div>
      <div class="mp-layout">
        <div class="mp-card">
          <svg id="fg-map" viewBox="0 0 1000 560" role="img" aria-label="Map of Field Guide entries"><g class="mp-base"></g><g class="mp-pins"></g><g class="mp-labels"></g></svg>
          <span class="mp-compass">N ↑</span>
          <span class="mp-meta"></span>
          <button class="mp-mode" type="button"></button>
        </div>
        <aside class="mp-drawer" aria-live="polite"><div class="mp-dhead"></div><div class="mp-list"></div></aside>
      </div>`;
    const $ = s => root.querySelector(s);
    const svg = $("#fg-map"), base = $(".mp-base"), pinsG = $(".mp-pins"), labelsG = $(".mp-labels"), modeBtn = $(".mp-mode");

    // ---- views ----
    const AR = 1000 / 560;
    const fit = ([x, y, w, h], pad) => { w *= pad; h *= pad; const cx = x + w / pad / 2, cy = y + h / pad / 2; if (w / h > AR) h = w / AR; else w = h * AR; return [cx - w / 2, cy - h / 2, w, h]; };
    // World view frames the globe itself (plus a little breathing room), so it
    // stretches to the card's full width instead of sitting letterboxed.
    const SB = d3.geoPath(proj).bounds({ type: "Sphere" }), SP = 16;
    const VB = { world: [SB[0][0] - SP, SB[0][1] - SP, SB[1][0] - SB[0][0] + SP * 2, SB[1][1] - SB[0][1] + SP * 2] };
    ["usa", "europe", "south"].forEach(k => VB[k] = fit(B.views[k], 1.08));
    const ORBIT_VB = [0, -20, 1000, 560];
    let mode = state.mode, view = state.view, vb = (mode === "orbit" ? ORBIT_VB : VB[view]).slice(), sel = null, era = "all";
    const VB_CUR = () => vb;
    const onStat = new Set(Object.keys(COLORS));
    const ICON_ORBIT = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="4.5"/><ellipse cx="12" cy="12" rx="10.5" ry="4" transform="rotate(-18 12 12)"/></svg>`;
    const ICON_EARTH = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5c3 3.2 3 15.8 0 19M12 2.5c-3 3.2-3 15.8 0 19"/></svg>`;
    function setBase() {
      base.innerHTML = mode === "earth" ? EARTH_BASE : ORBIT_BASE;
      modeBtn.innerHTML = mode === "earth" ? `${ICON_ORBIT}Orbit` : `${ICON_EARTH}Earth`;
      modeBtn.setAttribute("aria-label", mode === "earth" ? "Switch to the orbit and Moon map" : "Switch back to the Earth map");
      $(".mp-views").setAttribute("aria-disabled", mode === "orbit");
      root.querySelectorAll("[data-view]").forEach(x => x.setAttribute("aria-pressed", x.dataset.view === view));
    }
    modeBtn.addEventListener("click", () => { mode = state.mode = mode === "earth" ? "orbit" : "earth"; sel = null; setBase(); vb = (mode === "orbit" ? ORBIT_VB : VB[view]).slice(); draw(); });
    $(".mp-views").addEventListener("click", e => { const b = e.target.closest("[data-view]"); if (!b || mode === "orbit") return; view = state.view = b.dataset.view; root.querySelectorAll("[data-view]").forEach(x => x.setAttribute("aria-pressed", x === b)); sel = null; animateTo(VB[view]); });
    root.querySelectorAll("[data-stat]").forEach(b => b.addEventListener("click", () => { const k = b.dataset.stat; onStat.has(k) ? onStat.delete(k) : onStat.add(k); if (!onStat.size) Object.keys(COLORS).forEach(x => onStat.add(x)); root.querySelectorAll("[data-stat]").forEach(x => x.setAttribute("aria-pressed", onStat.has(x.dataset.stat))); sel = null; draw(); }));
    root.querySelectorAll("[data-era]").forEach(b => b.addEventListener("click", () => { era = b.dataset.era; root.querySelectorAll("[data-era]").forEach(x => x.setAttribute("aria-pressed", x === b)); sel = null; draw(); }));

    // Grow a viewBox to the svg's on-screen shape (centered), so pins, labels
    // and "in view" counts match what is actually visible.
    const disp = v => {
      const r = svg.clientWidth && svg.clientHeight ? svg.clientWidth / svg.clientHeight : AR;
      let [x, y, w, h] = v;
      if (w / h < r) { const nw = h * r; x -= (nw - w) / 2; w = nw; } else { const nh = w / r; y -= (nh - h) / 2; h = nh; }
      return [x, y, w, h];
    };
    const eraOf = y => eras.find(e => y >= e.from && y <= e.to);
    const PX = p => mode === "earth" ? p.x : p.ox, PY = p => mode === "earth" ? p.yy : p.oy;
    const visible = () => pts.filter(p => PX(p) != null && onStat.has(p.s) && (era === "all" || eraOf(p.y)?.id === era));
    const inView = p => { const vb = disp(VB_CUR()); return PX(p) >= vb[0] && PX(p) <= vb[0] + vb[2] && PY(p) >= vb[1] && PY(p) <= vb[1] + vb[3]; };
    const key = g => g.items.map(p => p.id).sort().join(",");

    function clusters(list) {
      const px = svg.getBoundingClientRect().width || 800, unit = disp(vb)[2] / px, R = 13 * unit, out = [];
      list.forEach(p => {
        const cx = PX(p), cy = PY(p), hit = out.find(g => Math.hypot(g.x - cx, g.y - cy) < R);
        if (hit) { hit.items.push(p); hit.x = (hit.x * (hit.items.length - 1) + cx) / hit.items.length; hit.y = (hit.y * (hit.items.length - 1) + cy) / hit.items.length; }
        else out.push({ x: cx, y: cy, items: [p] });
      });
      return { out, unit };
    }
    function clearLabel() { labelsG.innerHTML = ""; }
    function label(g, unit) {
      const vb = disp(VB_CUR());
      const n = g.items.length, c = g.items[0].c;
      const t1 = n > 1 ? `${n} entries here` : (c.title.length > 38 ? c.title.slice(0, 37) + "…" : c.title);
      const t2 = n > 1 ? g.items.map(p => p.y).sort((a, b) => a - b).filter((v, i, a) => a.indexOf(v) === i).slice(0, 4).join(", ") + (n > 4 ? "…" : "") : `${c.date} · ${STATUS[c.status].label}`;
      const pad = 9 * unit, w = Math.max(t1.length * 7.6, t2.length * 6.9) * unit + pad * 2, h = 44 * unit;
      let x = g.x - w / 2, y = g.y - h - 16 * unit;
      x = Math.max(vb[0] + 6 * unit, Math.min(x, vb[0] + vb[2] - w - 6 * unit));
      if (y < vb[1] + 4 * unit) y = g.y + 16 * unit;
      labelsG.innerHTML = `<g class="mp-hover" pointer-events="none"><rect class="sh" x="${x + 4 * unit}" y="${y + 4 * unit}" width="${w}" height="${h}" rx="${8 * unit}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${8 * unit}" stroke-width="${2 * unit}"/><text x="${x + pad}" y="${y + 19 * unit}" font-size="${14 * unit}">${esc(t1)}</text><text class="sub" x="${x + pad}" y="${y + 35 * unit}" font-size="${11.5 * unit}">${esc(t2)}</text></g>`;
    }
    function draw() {
      if (!svg.isConnected) return;
      svg.setAttribute("viewBox", disp(vb).join(" "));
      const list = visible(), { out, unit } = clusters(list);
      pinsG.innerHTML = ""; clearLabel();
      out.sort((a, b) => a.items.length - b.items.length).forEach(g => {
        const n = g.items.length, el = document.createElementNS(NS, "g");
        el.setAttribute("class", "mp-pin" + (sel === key(g) ? " sel" : ""));
        el.setAttribute("tabindex", "0"); el.setAttribute("role", "button");
        el.setAttribute("aria-label", n > 1 ? `${n} entries near ${g.items[0].pl}` : `${g.items[0].c.title}, ${g.items[0].c.date}`);
        if (n === 1) el.innerHTML = `<circle class="b" cx="${g.x}" cy="${g.y}" r="${6.5 * unit}" fill="${COLORS[g.items[0].s]}" stroke-width="${2.4 * unit}"/>`;
        else { const r = (9 + Math.min(n, 16) * .55) * unit; el.innerHTML = `<circle cx="${g.x + 2.5 * unit}" cy="${g.y + 2.5 * unit}" r="${r}" fill="#0f1412"/><circle class="b" cx="${g.x}" cy="${g.y}" r="${r}" fill="#e8b45c" stroke-width="${2.4 * unit}"/><text x="${g.x}" y="${g.y + 4.4 * unit}" text-anchor="middle" font-size="${13 * unit}">${n}</text>`; }
        const open = () => { sel = key(g); show(g.items); draw(); };
        const lift = () => { if (pinsG.lastChild !== el) pinsG.appendChild(el); label(g, unit); };
        el.addEventListener("click", open);
        el.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
        el.addEventListener("mouseenter", lift); el.addEventListener("focus", lift);
        el.addEventListener("mouseleave", clearLabel); el.addEventListener("blur", clearLabel);
        pinsG.appendChild(el);
      });
      const shown = list.filter(inView).length;
      $(".mp-meta").textContent = mode === "orbit" ? `${shown} entries in orbit and on the Moon` : `${shown} of ${list.length} pinned entries in view`;
      if (!sel) overview(list);
    }
    function show(items) {
      const n = items.length, c = items[0].c;
      $(".mp-dhead").innerHTML = `<span class="eyebrow">${n > 1 ? "Cluster" : "Pin"}</span><h2>${esc(n > 1 ? `${n} entries here` : c.title)}</h2><p>${n > 1 ? "Entries pinned close together at this spot." : esc(c.place)}</p>`;
      $(".mp-list").innerHTML = items.slice().sort((a, b) => a.y - b.y).map(p => caseCard(p.c)).join("");
    }
    function overview(list) {
      const inv = list.filter(inView);
      const counts = Object.keys(COLORS).map(k => [k, inv.filter(p => p.s === k).length]).filter(x => x[1]);
      $(".mp-dhead").innerHTML = mode === "orbit"
        ? `<span class="eyebrow">Orbit &amp; Moon</span><h2>${inv.length} entries above the map</h2><p>Astronaut sightings in Earth orbit, on the way to the Moon, and in photos from the lunar surface.</p>`
        : `<span class="eyebrow">${VIEWS.find(v => v[0] === view)[1]}</span><h2>${inv.length} entries in view</h2><p>Tap a pin or a numbered cluster to see the cases there.</p>`;
      $(".mp-list").innerHTML = inv.length
        ? `<div class="empty" style="text-align:left">${counts.map(([k, n]) => `<span class="stamp s-${k}" style="margin:4px 8px 4px 0">${esc(STATUS[k].label)} · ${n}</span>`).join("")}${mode === "earth" ? `<p style="margin-top:10px">Busiest spot: Washington, D.C., where most hearings, reports and programs are pinned.</p>` : ""}</div>`
        : `<div class="empty">No entries match these filters here. Try another region or turn a stamp back on.</div>`;
    }
    function animateTo(target) {
      const from = vb.slice(), t0 = performance.now(), dur = matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 520;
      const step = now => {
        if (!svg.isConnected) return;
        const k = dur ? Math.min(1, (now - t0) / dur) : 1, e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        vb = from.map((v, i) => v + (target[i] - v) * e);
        svg.setAttribute("viewBox", disp(vb).join(" "));
        if (k < 1) requestAnimationFrame(step); else draw();
      };
      requestAnimationFrame(step);
    }
    const onResize = () => { if (!svg.isConnected) { window.removeEventListener("resize", onResize); return; } draw(); };
    window.addEventListener("resize", onResize);
    setBase();
    draw();
  }
  return { mount };
})();
