/* =========================================================================
   第二十号档案 · 游戏引擎
   一般不需要改这个文件；剧情都在 content.js 里。
   ========================================================================= */
(function () {
  "use strict";

  // ---------- 工具 ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const app = () => $("#app");

  function el(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") node.className = v;
      else if (k === "html") node.innerHTML = v;
      else if (k.startsWith("on")) node.addEventListener(k.slice(2), v);
      else if (v !== false && v != null) node.setAttribute(k, v);
    }
    for (const c of children.flat()) {
      if (c == null || c === false) continue;
      node.append(c.nodeType ? c : document.createTextNode(c));
    }
    return node;
  }

  function t(str) {
    if (str == null) return "";
    return String(str)
      .replaceAll("{plaintiffMessage}", CONFIG.plaintiffMessage)
      .replaceAll("{X}", CONFIG.plaintiffName)
      .replaceAll("{her}", CONFIG.herName)
      .replaceAll("{assistant}", CONFIG.assistantName)
      .replaceAll("{plaintiff}", CONFIG.plaintiffReveal)
      .replaceAll("{caseNo}", CONFIG.caseNo)
      .replaceAll("{court}", CONFIG.courtName + "<br><small>" + CONFIG.courtNameZh + "</small>");
  }

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const QUILL = '<svg viewBox="0 0 64 64" width="18" height="18" aria-hidden="true"><path d="M58 4C40 6 24 18 16 36l-4 10 3 3 10-4C42 37 56 22 58 4z" fill="currentColor" opacity=".85"/><path d="M14 48L4 60" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M50 12C38 18 28 28 20 42" stroke="#1a120b" stroke-width="1.5" fill="none" opacity=".5"/></svg>';
  const norm = (s) => String(s || "").trim().toUpperCase().replace(/\s+/g, "");
  const codeOf = (key) => CONFIG.codes[key];

  // ---------- 角色与存档 ----------
  const params = new URLSearchParams(location.search);
  if (params.has("reset")) {
    Object.keys(localStorage).filter((k) => k.startsWith("cf20_")).forEach((k) => localStorage.removeItem(k));
  }
  let role = params.get("role") || localStorage.getItem("cf20_role");
  if (role && !["counsel", "assistant"].includes(role)) role = null;

  const freshState = () => ({ ch: 0, step: 0, score: 0, flags: {}, photos: {}, sigs: {}, bucket: null, verdict: null, paced: {}, done: false, ledger: {}, flagLedger: {}, passed: {} });
  let S = null;

  function load() {
    try { S = JSON.parse(localStorage.getItem("cf20_" + role)) || freshState(); }
    catch (e) { S = freshState(); }
    S = Object.assign(freshState(), S);
  }
  function save() {
    try { localStorage.setItem("cf20_" + role, JSON.stringify(S)); }
    catch (e) { toast("存储空间不够了，照片可能没有保存。"); }
  }
  const stepKey = () => S.ch + ":" + S.step;
  function addScore(n) {
    if (!n) return;
    S.score = Math.round((S.score + n) * 10) / 10;
    const k = stepKey(); S.ledger[k] = Math.round(((S.ledger[k] || 0) + n) * 10) / 10;
  }
  function setFlag(f) {
    if (!f) return;
    S.flags[f] = true;
    const k = stepKey(); (S.flagLedger[k] = S.flagLedger[k] || []).push(f);
  }
  // 回到某一步时，撤销那一步的得分和标记
  function undoStep(k) {
    if (S.ledger[k]) { S.score = Math.round((S.score - S.ledger[k]) * 10) / 10; delete S.ledger[k]; }
    (S.flagLedger[k] || []).forEach((f) => delete S.flags[f]); delete S.flagLedger[k];
  }
  const AUTO = (st) => st.type === "award" || (st.type === "exhibitShow" && !S.flags[st.flag]) || (st.type === "bag" && !st.noAward && !st.items.some((k) => S.flags[k]));

  function toast(msg) {
    const n = el("div", { class: "toast" }, msg);
    document.body.append(n);
    setTimeout(() => n.remove(), 2600);
  }

  // ---------- 物证袋 ----------
  const exName = (k) => (typeof EXHIBITS[k] === "string" ? EXHIBITS[k] : EXHIBITS[k].name);
  function bagEl(spec, opts = {}) {
    const inner = spec.img
      ? el("img", { class: "bag-img", src: spec.img, alt: spec.name })
      : el("div", { class: "bag-art", html: t(spec.html || "") });
    const b = el("div", { class: "bag" + (opts.small ? " small" : "") },
      el("div", { class: "bag-zip" }),
      el("div", { class: "bag-label" },
        el("div", { class: "bag-title" }, el("span", {}, "EVIDENCE"), el("span", {}, "物证")),
        el("div", { class: "bag-grid" },
          el("span", {}, "CASE"), el("b", {}, CONFIG.caseNo),
          el("span", {}, "ITEM"), el("b", {}, spec.item || "—"),
          el("span", {}, "描述"), el("b", {}, (spec.name || "").replace(/^\S+\s·\s/, "")),
          el("span", {}, "地点"), el("b", {}, spec.place || "—"),
          el("span", {}, "日期"), el("b", {}, spec.date || "—"))),
      el("div", { class: "bag-content" }, inner),
      el("div", { class: "bag-custody" }, el("span", {}, "CHAIN OF CUSTODY"), el("i", {}, CONFIG.assistantName)));
    if (!opts.noZoom) b.addEventListener("click", () => zoomBag(spec));
    return b;
  }
  function zoomBag(spec) {
    const box = el("div", { class: "modal", onclick: (e) => { if (e.target === box) box.remove(); } },
      el("div", { class: "modal-bag" }, bagEl(spec, { noZoom: true }), btn("放回卷宗", () => box.remove(), "secondary")));
    document.body.append(box);
  }
  function exSpec(k) { const e = EXHIBITS[k]; return typeof e === "string" ? { name: e, item: k } : e; }
  function photoSpec(key, src, i) {
    const ch = CHAPTERS.find((c) => c.id === key);
    return { name: "现场照片", item: "P" + (i + 1), place: ch ? ch.place : "", date: "2026.11.24", img: src };
  }

  // ---------- 布局 ----------
  function shell(chapter) {
    const root = app();
    root.innerHTML = "";
    const header = el("header", { class: "topbar" },
      el("div", { class: "caseno" }, el("span", { class: "quill", html: QUILL }), "No. " + CONFIG.caseNo),
      el("div", { class: "role-badge " + role }, role === "counsel" ? "⚖️ " + CONFIG.herName : "📎 " + CONFIG.assistantName),
      role === "counsel" ? el("button", { class: "icon-btn", title: "证物", onclick: openExhibits }, "📁") : null
    );
    root.append(header);
    if (chapter) {
      root.append(el("div", { class: "chapter-head" },
        el("div", { class: "ch-sub" }, chapter.title),
        el("h1", {}, chapter.subtitle),
        chapter.place ? el("div", { class: "ch-place" }, "✒ " + chapter.place) : null,
        progressDots()
      ));
    }
    const main = el("main", { class: "stage" });
    root.append(main);
    root.append(el("footer", { class: "foot" },
      el("button", { class: "link", onclick: confirmReset }, "重新开始"),
      el("span", {}, "CASE FILE No. 20 · 纯属虚构")
    ));
    return main;
  }

  function progressDots() {
    const wrap = el("div", { class: "dots" });
    CHAPTERS.forEach((c, i) => wrap.append(el("span", { class: "dot" + (i < S.ch ? " done" : i === S.ch ? " now" : "") })));
    return wrap;
  }

  function confirmReset() {
    if (confirm("确定要清除进度、重新开始吗？")) {
      localStorage.removeItem("cf20_" + role);
      localStorage.removeItem("cf20_role");
      location.href = location.pathname;
    }
  }

  function card(cls, ...children) { return el("section", { class: "card " + (cls || "") }, ...children); }
  function btn(label, onclick, cls = "primary") { return el("button", { class: "btn " + cls, onclick }, label); }

  // ---------- 主流程 ----------
  function render() {
    if (!role) return renderLanding();
    load();
    if (S.done) return renderEnd();
    const chapter = CHAPTERS[S.ch];
    if (!chapter) { S.done = true; save(); return renderEnd(); }
    const steps = chapter[role] || [];
    const main = shell(chapter);

    // 节奏锁：只锁辩护律师，每章开头
    const paceCode = chapter.pace && CONFIG.codes.pace && CONFIG.codes.pace[chapter.pace];
    if (role === "counsel" && paceCode && !S.paced[chapter.id] && S.step === 0) {
      main.append(renderGateRaw("这一章被法院暂时封存了。等你的助手在合适的时候告诉你<b>解封码</b>：", [paceCode], () => {
        S.paced[chapter.id] = true; save(); render();
      }));
      return;
    }

    if (S.step >= steps.length) return renderChapterEnd(main, chapter);
    const step = steps[S.step];
    const fn = STEPS[step.type];
    if (!fn) { console.warn("未知步骤类型", step.type); return next(); }
    let used = false;
    const once = () => { if (used) return; used = true; next(); };   // 防止连点跳过步骤
    const node = fn(step, once);
    if (node) { node.classList.add("turn"); main.append(node); }
    if (canGoBack()) main.append(el("button", { class: "back-btn", onclick: back }, "← 上一页"));
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  function next() { S.passed[stepKey()] = true; S.step += 1; save(); render(); }

  function prevPos(ch, step) {
    // 找到上一个非自动步骤
    let c = ch, i = step - 1;
    while (c >= 0) {
      const steps = CHAPTERS[c][role] || [];
      if (i < 0) { c -= 1; if (c < 0) return null; i = (CHAPTERS[c][role] || []).length - 1; continue; }
      if (!AUTO(steps[i])) return [c, i];
      i -= 1;
    }
    return null;
  }
  function canGoBack() { return !!prevPos(S.ch, S.step); }
  function back() {
    const p = prevPos(S.ch, S.step); if (!p) return;
    // 撤销从目标步到当前步之间所有步骤的得分（包括自动步骤）
    let [c, i] = p;
    const target = [c, i];
    while (c < S.ch || (c === S.ch && i < S.step)) {
      undoStep(c + ":" + i);
      i += 1; if (i >= (CHAPTERS[c][role] || []).length) { c += 1; i = 0; }
    }
    S.ch = target[0]; S.step = target[1]; S.done = false; save(); render();
  }

  function renderChapterEnd(main, chapter) {
    const last = S.ch >= CHAPTERS.length - 1;
    main.append(el("button", { class: "back-btn", onclick: back }, "← 上一页"));
    main.prepend(card("center turn",
      el("div", { class: "stamp" }, "FILED"),
      el("h2", {}, chapter.title + " · 完成"),
      el("p", {}, last ? "全部章节已经完成。" : "准备好了就进入下一章。"),
      btn(last ? "查看结案卷宗" : "进入下一章 →", () => {
        if (last) { S.done = true; } else { S.ch += 1; S.step = 0; }
        save(); render();
      })
    ));
  }

  function renderLanding() {
    const root = app();
    root.innerHTML = "";
    root.append(el("div", { class: "landing" },
      el("div", { class: "land-env" },
        el("div", { class: "land-to" }, "To: " + CONFIG.herName),
        el("div", { class: "wax" }, "X"),
        el("div", { class: "land-from" }, "From: " + CONFIG.plaintiffName)),
      el("h1", {}, "第二十号档案"),
      el("p", { class: "lead" }, CONFIG.plaintiffName + " v. " + CONFIG.herName),
      el("p", { class: "land-hint", html: "两个人，两部手机。<br>你们看到的，不一样。" }),
      el("div", { class: "role-pick" },
        btn("我是 " + CONFIG.herName, () => pickRole("counsel")),
        btn("我是助手 " + CONFIG.assistantName, () => pickRole("assistant"), "secondary")
      ),
      el("p", { class: "doc-footnote" }, "纯属虚构")
    ));
  }
  function pickRole(r) {
    localStorage.setItem("cf20_role", r);
    role = r;
    const u = new URL(location.href); u.searchParams.set("role", r); u.searchParams.delete("reset");
    history.replaceState(null, "", u);
    render();
  }

  function renderEnd() {
    const main = shell(null);
    if (role === "assistant") {
      main.append(card("center", el("div", { class: "stamp" }, "CLOSED"), el("h2", {}, "结案"),
        el("p", { html: t("辛苦了，{assistant}。现在把舞台交给 {her} 吧。🎂") })));
      return;
    }
    main.append(card("center", el("div", { class: "stamp" }, "CLOSED"), el("h2", {}, "本案已结案"),
      el("p", {}, "随时回来翻看你的判决书、案件卷宗和Z号证物。")));
    main.append(STEPS.judgment({}, null, true));
    main.append(STEPS.dossier({}, null, true));
    main.append(STEPS.letter({}, null, true));
  }

  function openExhibits() {
    const owned = Object.keys(EXHIBITS).filter((k) => S.flags[k]);
    const box = el("div", { class: "modal", onclick: (e) => { if (e.target === box) box.remove(); } },
      el("div", { class: "modal-inner" },
        el("h3", {}, "📁 已获得的证物"),
        owned.length ? el("div", { class: "bag-shelf" }, owned.map((k) => bagEl(exSpec(k), { small: true }))) : el("p", {}, "还没有证物。"),
        btn("关闭", () => box.remove(), "secondary")
      ));
    document.body.append(box);
  }

  // ---------- 步骤类型 ----------
  const STEPS = {};

  function distM(a, b, c, d) {
    const R = 6371000, r = Math.PI / 180;
    const x = (c - a) * r, y = (d - b) * r;
    const h = Math.sin(x / 2) ** 2 + Math.cos(a * r) * Math.cos(c * r) * Math.sin(y / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  }

  STEPS.geo = (s, done) => {
    const place = CONFIG.places && CONFIG.places[s.place];
    if (!CONFIG.useGeo || !place) { setTimeout(done, 0); return null; }
    if (S.passed[stepKey()]) {
      return card("center geo", el("div", { class: "geo-pin arrived" }, "◉"), el("div", { class: "text" }, "已抵达 · " + place.name), btn("继续", done));
    }
    const status = el("div", { class: "geo-status" }, "");
    const pin = el("div", { class: "geo-pin" }, "◎");
    const arrive = () => {
      pin.classList.add("arrived"); pin.textContent = "◉";
      status.innerHTML = "你到了。";
      setTimeout(done, 900);
    };
    const check = () => {
      if (!navigator.geolocation) { status.textContent = "这台手机不支持定位。请用备用暗号。"; return; }
      status.textContent = "正在寻找你的位置……";
      pin.classList.add("searching");
      navigator.geolocation.getCurrentPosition((pos) => {
        pin.classList.remove("searching");
        const d = distM(pos.coords.latitude, pos.coords.longitude, place.lat, place.lng);
        const slack = Math.min(pos.coords.accuracy || 0, 150);
        if (d <= place.radius + slack) arrive();
        else status.innerHTML = "还没到。<br>距离 <b>" + (d >= 1000 ? (d / 1000).toFixed(1) + " 公里" : Math.round(d) + " 米") + "</b>。";
      }, (err) => {
        pin.classList.remove("searching");
        status.innerHTML = err.code === 1 ? "定位被拒绝了。<br>请在浏览器设置里允许定位，或者用备用暗号。" : "暂时找不到你的位置。再试一次？";
      }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 });
    };
    const overrideBox = el("div", { class: "geo-override hidden" });
    const input = el("input", { class: "code-input", placeholder: "备用暗号", autocapitalize: "characters", autocomplete: "off" });
    overrideBox.append(input, btn("确认", () => {
      if (norm(input.value) === norm(CONFIG.codes.geoOverride)) arrive(); else toast("不对。");
    }, "secondary"));
    return card("center geo",
      el("div", { class: "geo-label" }, "抵 达"),
      pin,
      el("div", { class: "geo-place" }, place.name),
      el("div", { class: "text", html: t(s.text) }),
      status,
      btn("📍 我到了", check),
      el("button", { class: "link small", onclick: () => overrideBox.classList.toggle("hidden") }, "定位不准？"),
      overrideBox);
  };

  STEPS.bag = (s, done) => {
    const items = s.items.filter((k) => s.noAward || S.flags[k]);
    if (!items.length) { setTimeout(done, 0); return null; }
    return el("div", { class: "bag-step" },
      el("div", { class: "bag-shelf" + (items.length === 1 ? " one" : "") }, items.map((k) => bagEl(exSpec(k)))),
      s.text ? el("div", { class: "bag-caption", html: t(s.text) }) : null,
      el("div", { class: "muted center" }, "点击物证袋可以放大"),
      btn("继续", done));
  };

  STEPS.whisper = (s, done) => {
    const box = el("div", { class: "whisper-text" });
    const go = btn("……", done, "secondary ghost");
    go.style.visibility = "hidden";
    const c = el("section", { class: "whisper" }, box, go);
    const html = t(s.text);
    let i = 0, timer = null;
    const finish = () => { clearTimeout(timer); box.innerHTML = html; go.style.visibility = "visible"; };
    const step = () => {
      if (!document.body.contains(c) && i > 0) return;
      if (i >= html.length) return finish();
      if (html[i] === "<") { i = html.indexOf(">", i) + 1; } else { i++; }
      box.innerHTML = html.slice(0, i) + '<span class="caret">▍</span>';
      timer = setTimeout(step, html[i - 1] === "。" ? 260 : 45);
    };
    c.addEventListener("click", (e) => { if (e.target !== go) finish(); });
    setTimeout(step, 300);
    return c;
  };

  STEPS.postcard = (s, done) => el("div", { class: "pc-wrap" },
    el("article", { class: "postcard" },
      el("div", { class: "pc-head" }, el("span", { class: "pc-title" }, "Carte Postale"), el("span", { class: "pc-stamp" }, "X")),
      el("div", { class: "pc-mark" }, el("span", {}, t(s.place || ""))),
      el("div", { class: "pc-text", html: t(s.text) }),
      el("div", { class: "pc-sign" }, t(s.sign || ""))),
    btn("继续", done));

  STEPS.narration = (s, done) => card("narr",
    s.title ? el("h2", {}, t(s.title)) : null,
    el("div", { class: "text", html: t(s.text) }),
    btn("继续", done));

  STEPS.note = (s, done) => card("note",
    el("h3", {}, t(s.title || "📚 法律知识")),
    el("div", { class: "text", html: t(s.text) }),
    btn("明白了", done));

  STEPS.document = (s, done) => el("div", {},
    el("div", { class: "doc-label" }, t(s.docTitle)),
    el("article", { class: "paper", html: t(s.html) }),
    btn("继续", done));

  STEPS.award = (s, done) => { setFlag(s.flag); setTimeout(done, 0); return null; };

  STEPS.exhibitShow = (s, done) => {
    if (!S.flags[s.flag]) { setTimeout(done, 0); return null; }
    return STEPS.document(s, done);
  };

  STEPS.choice = (s, done) => {
    const c = card("", el("div", { class: "prompt", html: t(s.prompt) }));
    const list = el("div", { class: "options" });
    s.options.forEach((o) => list.append(el("button", { class: "opt", onclick: () => {
      addScore(o.score); setFlag(o.flag); save();
      list.remove();
      c.append(el("div", { class: "picked" }, "你的选择：" + o.label));
      c.append(el("div", { class: "feedback", html: t(o.feedback || "") }));
      c.append(o.repeat ? btn("重新选择", () => render(), "secondary") : btn("继续", done));
    } }, o.label)));
    c.append(list);
    return c;
  };

  STEPS.answerTable = (s, done) => {
    const picks = {};
    const c = card("", el("div", { class: "prompt", html: t(s.prompt) }));
    const rows = s.paragraphs.map((p, i) => {
      const seg = el("div", { class: "seg" });
      s.options.forEach((o) => seg.append(el("button", { class: "seg-btn", onclick: (e) => {
        picks[i] = o; seg.querySelectorAll("button").forEach((b) => b.classList.remove("on")); e.target.classList.add("on");
      } }, o)));
      const row = el("div", { class: "arow" }, el("div", { class: "atext", html: t(p.text) }), seg);
      c.append(row); return row;
    });
    const submit = btn("提交", () => {
      if (Object.keys(picks).length < s.paragraphs.length) return toast("每一条都要回应！");
      let right = 0;
      s.paragraphs.forEach((p, i) => {
        const ok = picks[i] === p.correct; if (ok) right++;
        rows[i].querySelector(".seg").replaceWith(el("div", { class: "result " + (ok ? "ok" : "bad"), html:
          (ok ? "✓ " : "✗ ") + "你：" + picks[i] + (ok ? "" : " · 更好：" + p.correct) + "<br><small>" + t(p.why) + "</small>" }));
      });
      addScore(right * 0.5); save();
      submit.remove();
      c.append(el("div", { class: "feedback", html: "答对 " + right + " / " + s.paragraphs.length + "。" + (s.note ? "<br><br>" + t(s.note) : "") }));
      c.append(btn("继续", done));
    });
    c.append(submit);
    return c;
  };

  STEPS.selectMany = (s, done) => {
    const chosen = new Set();
    const c = card("", el("div", { class: "prompt", html: t(s.prompt) }));
    const items = s.options.map((o, i) => {
      const it = el("button", { class: "check", onclick: () => {
        chosen.has(i) ? chosen.delete(i) : chosen.add(i); it.classList.toggle("on");
      } }, o.label);
      c.append(it); return it;
    });
    const submit = btn("确认", () => {
      let delta = 0;
      s.options.forEach((o, i) => {
        const sel = chosen.has(i), ok = sel === o.correct;
        if (sel) delta += o.correct ? 0.5 : -0.5;
        items[i].replaceWith(el("div", { class: "result " + (ok ? "ok" : "bad"), html:
          (sel ? "☑ " : "☐ ") + o.label + "<br><small>" + (o.correct ? "✓ 应该提出。" : "✗ 不该提出。") + t(o.why) + "</small>" }));
      });
      addScore(delta); save(); submit.remove();
      if (s.note) c.append(el("div", { class: "feedback", html: t(s.note) }));
      c.append(btn("继续", done));
    });
    c.append(submit);
    return c;
  };

  STEPS.timedAdmit = (s, done) => {
    const picks = {};
    let left = s.seconds, finished = false;
    const timer = el("div", { class: "timer" });
    const c = card("timed", el("div", { class: "prompt", html: t(s.prompt) }), timer);
    const rows = s.items.map((it, i) => {
      const seg = el("div", { class: "seg" });
      ["承认", "否认"].forEach((o) => seg.append(el("button", { class: "seg-btn", onclick: (e) => {
        picks[i] = o; seg.querySelectorAll("button").forEach((b) => b.classList.remove("on")); e.target.classList.add("on");
      } }, o)));
      const row = el("div", { class: "arow" }, el("div", { class: "atext" }, (i + 1) + ". " + it.text), seg);
      c.append(row); return row;
    });
    const tick = () => {
      if (finished) return;
      timer.textContent = "⏳ 还剩 " + left + " 秒";
      timer.classList.toggle("urgent", left <= 20);
      if (left <= 0) return finish(true);
      left--; setTimeout(tick, 1000);
    };
    const finish = (timeout) => {
      if (finished) return; finished = true;
      let right = 0;
      s.items.forEach((it, i) => {
        const ans = picks[i] || "承认";
        const deemed = !picks[i];
        const ok = ans === it.correct; if (ok) right++;
        rows[i].querySelector(".seg").replaceWith(el("div", { class: "result " + (ok ? "ok" : "bad"), html:
          (ok ? "✓ " : "✗ ") + (deemed ? "没回答，算你认了" : "你：" + ans) + (ok ? "" : " · 应该：" + it.correct) + "<br><small>" + t(it.why) + "</small>" }));
      });
      addScore(right * 0.5); save();
      submit.remove();
      timer.textContent = timeout ? "⌛ 时间到！没回答的，算你认了。" : "✅ 及时交卷。";
      c.append(el("div", { class: "feedback", html: "答对 " + right + " / " + s.items.length + "。<br><br>" + t(s.note || "") }));
      c.append(btn("继续", done));
    };
    const submit = btn("交卷", () => {
      if (Object.keys(picks).length < s.items.length && !confirm("还有没回答的，会算你认了。确定交卷？")) return;
      finish(false);
    });
    c.append(submit);
    setTimeout(tick, 0);
    return c;
  };

  STEPS.pickN = (s, done) => {
    const chosen = new Set();
    const c = card("", el("div", { class: "prompt", html: t(s.prompt) }));
    const counter = el("div", { class: "counter-line" }, "已选 0 / " + s.n);
    c.append(counter);
    const items = s.options.map((o, i) => {
      const it = el("button", { class: "check", onclick: () => {
        if (chosen.has(i)) { chosen.delete(i); it.classList.remove("on"); }
        else { if (chosen.size >= s.n) return toast("最多只能选 " + s.n + " 个"); chosen.add(i); it.classList.add("on"); }
        counter.textContent = "已选 " + chosen.size + " / " + s.n;
      } }, o.label);
      c.append(it); return it;
    });
    const submit = btn("发出", () => {
      if (chosen.size < s.n) return toast("请选满 " + s.n + " 个");
      items.forEach((it) => it.remove()); counter.remove(); submit.remove();
      [...chosen].sort((a, b) => a - b).forEach((i) => {
        const o = s.options[i];
        addScore(o.score); setFlag(o.flag);
        c.append(el("div", { class: "reveal" }, el("div", { class: "q" }, "▸ " + o.label), o.reveal ? el("div", { class: "a", html: t(o.reveal) }) : null));
      });
      save();
      c.append(btn("继续", done));
    });
    c.append(submit);
    return c;
  };

  STEPS.quiz = (s, done) => {
    const picks = {};
    const c = card("", el("div", { class: "prompt", html: t(s.prompt) }));
    const blocks = s.questions.map((q, qi) => {
      const b = el("div", { class: "qblock" }, el("div", { class: "q" }, (qi + 1) + ". " + q.q));
      q.options.forEach((o, oi) => b.append(el("button", { class: "opt small", onclick: (e) => {
        picks[qi] = oi; b.querySelectorAll(".opt").forEach((x) => x.classList.remove("on")); e.target.classList.add("on");
      } }, o)));
      c.append(b); return b;
    });
    const submit = btn("提交", () => {
      if (Object.keys(picks).length < s.questions.length) return toast("每题都要作答");
      let right = 0;
      s.questions.forEach((q, qi) => {
        const ok = picks[qi] === q.correct; if (ok) right++;
        blocks[qi].append(el("div", { class: "result " + (ok ? "ok" : "bad") }, ok ? "✓ 正确" : "✗ 证词里说的是：" + q.options[q.correct]));
        blocks[qi].querySelectorAll(".opt").forEach((x) => (x.disabled = true));
      });
      addScore(right * (s.perCorrect || 1));
      if (right === s.questions.length) setFlag(s.flagIfAll);
      save(); submit.remove();
      c.append(btn("继续", done));
    });
    c.append(submit);
    return c;
  };

  STEPS.counter = (s, done) => {
    let n = S.flags["counter_" + S.ch] || 0;
    const num = el("div", { class: "big-num" }, String(n));
    const upd = (d) => { n = Math.max(0, Math.min(s.max, n + d)); num.textContent = n; S.flags["counter_" + S.ch] = n; save(); if (n === s.max) toast("20个问题用完了！证词结束。"); };
    return card("center", el("h3", {}, s.label), num, el("div", { class: "muted" }, "上限 " + s.max),
      el("div", { class: "row" }, btn("−", () => upd(-1), "secondary"), btn("+1 问题", () => upd(1))),
      btn("证词结束", done, "secondary"));
  };

  STEPS.codeGive = (s, done) => card("center code-card",
    el("div", { class: "text", html: t(s.text) }),
    el("div", { class: "code" }, codeOf(s.code)),
    el("div", { class: "muted" }, "用嘴说，别给 TA 看屏幕。"),
    btn("我已经告诉 TA 了", done));

  function renderGateRaw(text, accepted, onOk, successText) {
    const input = el("input", { class: "code-input", placeholder: "输入密码", autocapitalize: "characters", autocomplete: "off" });
    const c = card("center gate", el("div", { class: "lock" }, "🔒"), el("div", { class: "text", html: t(text) }), input);
    const check = () => {
      const v = norm(input.value);
      const hit = accepted.find((a) => norm(a) === v);
      if (!hit) { c.classList.remove("shake"); void c.offsetWidth; c.classList.add("shake"); return toast("密码不对，再问问对方？"); }
      if (successText) {
        c.innerHTML = "";
        c.append(el("div", { class: "lock" }, "🔓"), el("div", { class: "text", html: t(successText) }), btn("继续", () => onOk(hit)));
      } else onOk(hit);
    };
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") check(); });
    c.append(btn("提交", check));
    return c;
  }

  STEPS.gate = (s, done) => {
    if (S.passed[stepKey()]) {
      return card("center gate", el("div", { class: "lock" }, "🔓"), el("div", { class: "text", html: t(s.success || "已解锁。") }), btn("继续", done));
    }
    if (s.any) {
      const input = el("input", { class: "code-input free", placeholder: "写下来", autocomplete: "off" });
      const c = card("center gate", el("div", { class: "lock" }, "✒"), el("div", { class: "text", html: t(s.text) }), input);
      c.append(btn("提交", () => {
        if (!input.value.trim()) return toast("写点什么吧");
        S.flags[s.key] = input.value.trim(); save();
        if (s.success) { c.innerHTML = ""; c.append(el("div", { class: "text", html: t(s.success) }), btn("继续", done)); } else done();
      }));
      return c;
    }
    if (s.accept) return renderGateRaw(s.text, s.accept, () => done(), s.success);
    const code = codeOf(s.code);
    if (code && typeof code === "object") {
      const map = Object.fromEntries(Object.entries(code).map(([k, v]) => [norm(v), k]));
      return renderGateRaw(s.text, Object.values(code), (hit) => { S.bucket = map[norm(hit)]; save(); done(); }, s.success);
    }
    return renderGateRaw(s.text, [code], () => done(), s.success);
  };

  function bucketOf(score) { return score >= 8 ? "strong" : score >= 4 ? "medium" : "weak"; }

  STEPS.scoreCode = (s, done) => {
    const b = bucketOf(S.score); S.bucket = b; save();
    return card("center code-card",
      el("div", { class: "text", html: t(s.text) }),
      el("div", { class: "code" }, CONFIG.codes[s.codes][b]),
      btn("我已经告诉 TA 了", done));
  };

  STEPS.evalMemo = (s, done) => {
    const memos = {
      strong: { p: 90, txt: "我们有那张纸上的最后一行，还有 W 的证词。X 已经没有牌了。" },
      medium: { p: 70, txt: "证据够用，但还有漏洞。X 还藏着什么。" },
      weak:   { p: 50, txt: "证据不够。但\"那年我才10岁\"，依然是最硬的一句话。" }
    };
    const m = memos[S.bucket] || memos.medium;
    return el("div", {},
      el("div", { class: "doc-label" }, "🔒 你的判断"),
      el("article", { class: "paper", html: `
<h3>胜算：${m.p}%</h3>
<p>${m.txt}</p>
<p class="doc-zh">如果输了：每年生日，X 都会来。<br>如果接受：每年生日，做一件没做过的事。</p>
<p>${m.p >= 80 ? "上法庭，胜算很大。" : "接受条件，也许不是坏事。"}</p>
<p class="doc-footnote">念给她听，让她自己决定。</p>` }),
      btn("念给她听了", done));
  };

  STEPS.jurySelect = (s, done) => {
    const struck = new Set();
    const c = card("", el("div", { class: "prompt", html: t(s.prompt) }));
    const counter = el("div", { class: "counter-line" }, "已踢掉 0 / " + s.strikes);
    c.append(counter);
    const grid = el("div", { class: "jurors" });
    const cards = s.jurors.map((j, i) => {
      const jc = el("button", { class: "juror", onclick: () => {
        if (struck.has(i)) { struck.delete(i); jc.classList.remove("struck"); }
        else { if (struck.size >= s.strikes) return toast("最多踢掉 " + s.strikes + " 个"); struck.add(i); jc.classList.add("struck"); }
        counter.textContent = "已踢掉 " + struck.size + " / " + s.strikes;
      } }, el("div", { class: "jn" }, j.name), el("div", { class: "jj" }, j.job));
      grid.append(jc); return jc;
    });
    c.append(grid);
    const submit = btn("确认陪审团", () => {
      let delta = 0, missed = 0;
      s.jurors.forEach((j, i) => {
        const st = struck.has(i);
        if (st && j.biased) delta += 1;
        if (st && !j.biased) delta -= 0.5;
        if (!st && j.biased) missed++;
        cards[i].disabled = true;
        cards[i].append(el("div", { class: "jtag " + (j.biased ? "bad" : "ok") }, j.biased ? "⚠️ 有偏见" : "公正"));
      });
      addScore(delta); save(); submit.remove();
      c.append(el("div", { class: "feedback", html: missed ? "还有 " + missed + " 位有偏见的陪审员留在了陪审团里。" : "完美！有偏见的候选人都被你回避掉了。" }));
      c.append(btn("继续", done));
    });
    c.append(submit);
    return c;
  };

  STEPS.objection = (s, done) => {
    let i = 0, right = 0;
    const c = card("objection", el("div", { class: "prompt", html: t(s.prompt) }));
    const log = el("div", { class: "transcript" });
    const controls = el("div", { class: "controls" });
    c.append(log, controls);
    const line = (L) => el("div", { class: "tline" }, el("b", {}, L.speaker + "："), L.text);
    const say = (cls, html) => log.append(el("div", { class: "judge " + cls, html }));
    const advance = () => {
      controls.innerHTML = "";
      if (i >= s.lines.length) {
        say("", "X 说完了。你成功喊了 " + right + " 次异议。");
        controls.append(btn("继续", done)); save(); return;
      }
      const L = s.lines[i];
      log.append(line(L));
      log.scrollTop = log.scrollHeight;
      controls.append(
        btn("继续", () => {
          if (L.ground != null) say("miss", "（你错过了一次提出异议的机会：" + s.grounds[L.ground] + "）");
          i++; advance();
        }, "secondary"),
        btn("异议！", () => pickGround(L), "danger")
      );
    };
    const pickGround = (L) => {
      controls.innerHTML = "";
      controls.append(el("div", { class: "muted" }, "异议理由是？"));
      s.grounds.forEach((g, gi) => controls.append(el("button", { class: "opt small", onclick: () => {
        if (L.ground == null) { addScore(-0.5); say("bad", "法官：<b>\"驳回！\"</b>这句话没毛病。"); }
        else if (gi === L.ground) { addScore(1); right++; say("ok", "法官：<b>\"异议成立！\"</b>陪审团，刚才那句当没听见。<br><small>" + t(L.why) + "</small>"); }
        else { addScore(0.5); right++; say("ok", "法官：<b>\"异议成立！\"</b>不过更准确地说是：" + s.grounds[L.ground] + "。<br><small>" + t(L.why) + "</small>"); }
        i++; save(); advance();
      } }, g)));
    };
    setTimeout(advance, 0);
    return c;
  };

  STEPS.present = (s, done) => {
    const c = card("", el("div", { class: "prompt", html: t(s.prompt) }));
    const list = el("div", { class: "options" });
    Object.keys(EXHIBITS).forEach((k) => { const name = exName(k);
      const owned = !!S.flags[k];
      list.append(el("button", { class: "opt exhibit" + (owned ? "" : " locked"), disabled: owned ? false : "disabled", onclick: () => {
        list.remove();
        let html;
        if (k === s.correct) { addScore(s.score); html = s.success; c.classList.add("objection-flash"); }
        else if (s.alt && k === s.alt) { addScore(s.altScore || 0); html = s.altText; }
        else html = s.fail;
        save();
        c.append(el("div", { class: "picked" }, "你出示了：" + name));
        c.append(el("div", { class: "feedback", html: t(html) }));
        c.append(btn("继续", done));
      } }, (owned ? "📄 " : "🔒 ") + name + (owned ? "" : "（未获得）")));
    });
    c.append(list);
    return c;
  };

  STEPS.verdict = (s, done) => {
    const sc = S.score;
    let level, text;
    if (sc >= 21) { level = "12 : 0"; text = "陪审团全票：<b>" + CONFIG.herName + "胜诉。</b><br><br>宣判的那一刻，法庭里所有的钟，同时响了。"; }
    else if (sc >= 13) { level = "12 : 0"; text = "陪审团全票：<b>" + CONFIG.herName + "胜诉。</b><br><br>协议上的字，一行一行褪色，消失了。"; }
    else { level = "12 : 0"; text = "陪审团争论了很久。<br>灯灭了三次。<br><br>最后，全票：<b>" + CONFIG.herName + "胜诉。</b>"; }
    if (S.flags.settled) text += "<br><br><small>（在另一个时间线里，你接受了 X 的条件。）</small>";
    S.verdict = { level, text, score: sc }; save();
    const c = card("center verdict",
      el("div", { class: "muted" }, "陪审团回来了。"),
      el("div", { class: "muted" }, "法官：\"结果出来了吗？\""),
      el("div", { class: "muted" }, "陪审团长：\"出来了。\""));
    const reveal = btn("揭晓", () => {
      reveal.remove();
      c.append(el("div", { class: "stamp big" }, "VERDICT"), el("h2", {}, level), el("div", { class: "text", html: text }),
        el("div", { class: "muted" }, "得分：" + sc), btn("继续", done));
    }, "danger");
    c.append(reveal);
    return c;
  };

  STEPS.signature = (s, done) => {
    const cv = el("canvas", { class: "sigpad", width: 600, height: 220 });
    const ctx = cv.getContext("2d");
    ctx.lineWidth = 4; ctx.lineCap = "round"; ctx.strokeStyle = "#1b2a4a";
    let drawing = false, drawn = false;
    const pos = (e) => { const r = cv.getBoundingClientRect(); const p = e.touches ? e.touches[0] : e; return [(p.clientX - r.left) * cv.width / r.width, (p.clientY - r.top) * cv.height / r.height]; };
    const startD = (e) => { e.preventDefault(); drawing = true; drawn = true; const [x, y] = pos(e); ctx.beginPath(); ctx.moveTo(x, y); };
    const moveD = (e) => { if (!drawing) return; e.preventDefault(); const [x, y] = pos(e); ctx.lineTo(x, y); ctx.stroke(); };
    const endD = () => { drawing = false; };
    cv.addEventListener("mousedown", startD); cv.addEventListener("mousemove", moveD); window.addEventListener("mouseup", endD);
    cv.addEventListener("touchstart", startD, { passive: false }); cv.addEventListener("touchmove", moveD, { passive: false }); cv.addEventListener("touchend", endD);
    return card("center",
      el("h3", {}, t(s.label)), cv,
      el("div", { class: "row" },
        btn("清除", () => { ctx.clearRect(0, 0, cv.width, cv.height); drawn = false; }, "secondary"),
        btn("确认签名", () => {
          if (!drawn) return toast("用手指签个名吧");
          S.sigs[s.who] = cv.toDataURL("image/png"); save(); done();
        })));
  };

  function judgmentHTML() {
    const v = S.verdict || { level: "", text: "" };
    const today = new Date().toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" });
    const sig = (w) => S.sigs[w] ? `<img class="sig" src="${S.sigs[w]}" alt="签名">` : `<div class="sig empty"></div>`;
    return `
<p class="doc-court">${t("{court}")}</p>
<p class="doc-caption"><b>${CONFIG.plaintiffName}</b><br><small>（面具之下：${t("{plaintiff}")}）</small><br>v.<br><b>${CONFIG.herName}</b></p>
<p class="doc-caseno">Case No. ${CONFIG.caseNo}</p>
<h3>判决书 · JUDGMENT</h3>${S.flags.comicVerdict ? `<p class="doc-zh">今晚的喜剧法庭判了：“${esc(S.flags.comicVerdict)}”</p>` : ""}
<blockquote>${v.text}</blockquote>
<p>本庭判决：<b>${CONFIG.herName} 胜诉。</b>《永远不长大协议》自此失效。</p>
<p>附带一条：二十岁的她，仍须保留一点好奇心。<br>X 会每年检查。</p>
<div class="sig-row">
  <div>${sig("counsel")}<div class="sig-label">${CONFIG.herName}</div></div>
  <div>${sig("assistant")}<div class="sig-label">${CONFIG.assistantName}</div></div>
</div>
<p class="judge-line">${today}　　　　<span class="seal-red">时间巡回法院<br>印</span></p>
<p class="doc-footnote">本案纯属虚构。</p>`;
  }

  STEPS.judgment = (s, done, embedded) => el("div", { class: "printable" },
    el("div", { class: "doc-label" }, "📜 判决书"),
    el("article", { class: "paper judgment", html: judgmentHTML() }),
    el("div", { class: "row noprint" },
      btn("🖨️ 打印 / 存成PDF", () => printOnly("judgment"), "secondary"),
      embedded ? null : btn("继续", done)));

  STEPS.dossier = (s, done, embedded) => {
    const photos = Object.entries(S.photos);
    const owned = Object.keys(EXHIBITS).filter((k) => S.flags[k]);
    return el("div", { class: "printable" },
      el("div", { class: "doc-label" }, "🗂️ 案件卷宗"),
      el("article", { class: "paper dossier" },
        el("h3", {}, "案件卷宗 · " + CONFIG.caseNo),
        el("p", {}, CONFIG.plaintiffName + " v. " + CONFIG.herName),
        el("h4", {}, "证物清单"),
        el("div", { class: "bag-shelf" }, owned.map((k) => bagEl(exSpec(k), { small: true }))),
        el("h4", {}, "证据照片"),
        photos.length ? el("div", { class: "bag-shelf" }, photos.map(([k, src], i) => bagEl(photoSpec(k, src, i), { small: true }))) : el("p", { class: "muted" }, "（没有拍照片）"),
        el("p", { class: "muted" }, "最终裁决：" + ((S.verdict && S.verdict.level) || "—"))
      ),
      el("div", { class: "row noprint" },
        btn("🖨️ 打印 / 存成PDF", () => printOnly("dossier"), "secondary"),
        embedded ? null : btn("继续", done)));
  };

  function printOnly(which) {
    document.body.dataset.print = which;
    window.print();
    setTimeout(() => delete document.body.dataset.print, 500);
  }

  STEPS.letter = (s, done, embedded) => {
    const c = card("center letter-card");
    const env = el("button", { class: "envelope", onclick: () => {
      env.remove();
      c.append(el("div", { class: "doc-label" }, "Z号证物 · 密封"),
        el("article", { class: "paper letter" }, t(CONFIG.letter)));
      if (CONFIG.giftHint) c.append(el("div", { class: "gift" }, "🎁 " + t(CONFIG.giftHint)));
      if (!embedded) c.append(btn("完成", done));
    } }, el("div", { class: "env-seal" }, "Z"), el("div", {}, "Z号证物 · 密封 · 点击拆开"));
    c.append(el("h3", {}, "最后一件证物"), env);
    return c;
  };

  STEPS.photo = (s, done) => {
    const input = el("input", { type: "file", accept: "image/*", capture: "environment", class: "hidden" });
    const preview = el("div", { class: "preview" });
    input.addEventListener("change", () => {
      const f = input.files && input.files[0]; if (!f) return;
      const img = new Image();
      img.onload = () => {
        const max = 900, k = Math.min(1, max / Math.max(img.width, img.height));
        const cv = el("canvas", { width: Math.round(img.width * k), height: Math.round(img.height * k) });
        cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
        S.photos[s.key] = cv.toDataURL("image/jpeg", 0.72); save();
        preview.innerHTML = ""; preview.append(bagEl(photoSpec(s.key, S.photos[s.key], Object.keys(S.photos).indexOf(s.key)), { small: true }), el("div", { class: "muted" }, "已封入物证袋。"));
        URL.revokeObjectURL(img.src);
      };
      img.src = URL.createObjectURL(f);
    });
    if (S.photos[s.key]) preview.append(bagEl(photoSpec(s.key, S.photos[s.key], Object.keys(S.photos).indexOf(s.key)), { small: true }));
    return card("center", el("div", { class: "text", html: t(s.prompt) }), preview, input,
      el("div", { class: "row" }, btn("📸 拍照/选照片", () => input.click(), "secondary"), btn("继续", done)));
  };

  // 暴露给测试用
  window.__CF20 = { get state() { return S; }, STEPS, render };

  document.addEventListener("DOMContentLoaded", render);
})();
