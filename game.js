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
      .replaceAll("{her}", CONFIG.herName)
      .replaceAll("{assistant}", CONFIG.assistantName)
      .replaceAll("{plaintiff}", CONFIG.plaintiffReveal)
      .replaceAll("{caseNo}", CONFIG.caseNo)
      .replaceAll("{court}", CONFIG.courtName + "<br><small>" + CONFIG.courtNameZh + "</small>");
  }

  const norm = (s) => String(s || "").trim().toUpperCase().replace(/\s+/g, "");
  const codeOf = (key) => CONFIG.codes[key];

  // ---------- 角色与存档 ----------
  const params = new URLSearchParams(location.search);
  if (params.has("reset")) {
    Object.keys(localStorage).filter((k) => k.startsWith("cf20_")).forEach((k) => localStorage.removeItem(k));
  }
  let role = params.get("role") || localStorage.getItem("cf20_role");
  if (role && !["counsel", "assistant"].includes(role)) role = null;

  const freshState = () => ({ ch: 0, step: 0, score: 0, flags: {}, photos: {}, sigs: {}, bucket: null, verdict: null, paced: {}, done: false });
  let S = null;

  function load() {
    try { S = JSON.parse(localStorage.getItem("cf20_" + role)) || freshState(); }
    catch (e) { S = freshState(); }
  }
  function save() {
    try { localStorage.setItem("cf20_" + role, JSON.stringify(S)); }
    catch (e) { toast("存储空间不够了，照片可能没有保存。"); }
  }
  function addScore(n) { S.score = Math.round((S.score + (n || 0)) * 10) / 10; }
  function setFlag(f) { if (f) S.flags[f] = true; }

  function toast(msg) {
    const n = el("div", { class: "toast" }, msg);
    document.body.append(n);
    setTimeout(() => n.remove(), 2600);
  }

  // ---------- 布局 ----------
  function shell(chapter) {
    const root = app();
    root.innerHTML = "";
    const header = el("header", { class: "topbar" },
      el("div", { class: "caseno" }, "CASE No. " + CONFIG.caseNo),
      el("div", { class: "role-badge " + role }, role === "counsel" ? "⚖️ 辩护律师 · " + CONFIG.herName : "📎 律师助手 · " + CONFIG.assistantName),
      role === "counsel" ? el("button", { class: "icon-btn", title: "证物", onclick: openExhibits }, "📁") : null
    );
    root.append(header);
    if (chapter) {
      root.append(el("div", { class: "chapter-head" },
        el("div", { class: "ch-sub" }, chapter.subtitle),
        el("h1", {}, chapter.title),
        progressDots()
      ));
    }
    const main = el("main", { class: "stage" });
    root.append(main);
    root.append(el("footer", { class: "foot" },
      el("button", { class: "link", onclick: confirmReset }, "重新开始"),
      el("span", {}, "🎂 生日游戏 · 情节虚构，法律程序参照伊利诺伊州真实规则，不构成法律意见")
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
    const node = fn(step, next);
    if (node) main.append(node);
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  function next() { S.step += 1; save(); render(); }

  function renderChapterEnd(main, chapter) {
    const last = S.ch >= CHAPTERS.length - 1;
    main.append(card("center",
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
      el("div", { class: "seal-big" }, "⚖︎"),
      el("p", { class: "ch-sub" }, CONFIG.courtName),
      el("h1", {}, "第二十号档案"),
      el("p", { class: "lead" }, "CASE FILE No. 20 · " + "John Doe v. " + CONFIG.herName),
      el("p", {}, "这是一个双人游戏。两个人各用一部手机，看到的内容不一样。"),
      el("div", { class: "role-pick" },
        btn("我是 " + CONFIG.herName + "（被告兼辩护律师）", () => pickRole("counsel")),
        btn("我是律师助手 " + CONFIG.assistantName, () => pickRole("assistant"), "secondary")
      ),
      el("p", { class: "doc-footnote" }, "🎂 生日游戏 · 情节纯属虚构")
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
        owned.length ? el("ul", {}, owned.map((k) => el("li", {}, EXHIBITS[k]))) : el("p", {}, "还没有证物。"),
        btn("关闭", () => box.remove(), "secondary")
      ));
    document.body.append(box);
  }

  // ---------- 步骤类型 ----------
  const STEPS = {};

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
    const submit = btn("提交答辩状", () => {
      if (Object.keys(picks).length < s.paragraphs.length) return toast("每一段都要回应！没有否认的会被视为承认。");
      let right = 0;
      s.paragraphs.forEach((p, i) => {
        const ok = picks[i] === p.correct; if (ok) right++;
        rows[i].querySelector(".seg").replaceWith(el("div", { class: "result " + (ok ? "ok" : "bad"), html:
          (ok ? "✓ " : "✗ ") + "你：" + picks[i] + (ok ? "" : " · 更好：" + p.correct) + "<br><small>" + t(p.why) + "</small>" }));
      });
      addScore(right * 0.5); save();
      submit.remove();
      c.append(el("div", { class: "feedback", html: "答对 " + right + " / " + s.paragraphs.length + " 段。" + (s.note ? "<br><br>" + t(s.note) : "") }));
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
      const day = Math.max(0, Math.ceil(left / s.seconds * 28));
      timer.textContent = "⏳ 剩余：第 " + day + " 天（" + left + " 秒）";
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
          (ok ? "✓ " : "✗ ") + (deemed ? "视为承认" : "你：" + ans) + (ok ? "" : " · 应该：" + it.correct) + "<br><small>" + t(it.why) + "</small>" }));
      });
      addScore(right * 0.5); save();
      submit.remove();
      timer.textContent = timeout ? "⌛ 28天已过！未回应的事实全部视为承认。" : "✅ 已在期限内提交。";
      c.append(el("div", { class: "feedback", html: "答对 " + right + " / " + s.items.length + "。<br><br>" + t(s.note || "") }));
      c.append(btn("继续", done));
    };
    const submit = btn("提交宣誓回应", () => {
      if (Object.keys(picks).length < s.items.length && !confirm("还有没回应的条目，它们会被视为承认。确定提交吗？")) return;
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
    el("div", { class: "muted" }, "口头告诉对方，不要直接给 TA 看屏幕。"),
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
    const code = codeOf(s.code);
    if (code && typeof code === "object") {
      const map = Object.fromEntries(Object.entries(code).map(([k, v]) => [norm(v), k]));
      return renderGateRaw(s.text, Object.values(code), (hit) => { S.bucket = map[norm(hit)]; save(); done(); }, s.success);
    }
    return renderGateRaw(s.text, [code], () => done(), s.success);
  };

  function bucketOf(score) { return score >= 12 ? "strong" : score >= 7 ? "medium" : "weak"; }

  STEPS.scoreCode = (s, done) => {
    const b = bucketOf(S.score); S.bucket = b; save();
    return card("center code-card",
      el("div", { class: "text", html: t(s.text) }),
      el("div", { class: "code" }, CONFIG.codes[s.codes][b]),
      btn("我已经告诉 TA 了", done));
  };

  STEPS.evalMemo = (s, done) => {
    const memos = {
      strong: { p: 90, txt: "证据非常有利：有协议原件里的例外条款，有证人证明发帖时不知情。原告的追认主张几乎站不住。" },
      medium: { p: 70, txt: "证据对我方有利，但还有漏洞。庭审中要抓住追认问题和例外条款。" },
      weak:   { p: 50, txt: "证据不够扎实，庭审有风险。和解是一个理性的选择，但未成年人抗辩依然是一张强牌。" }
    };
    const m = memos[S.bucket] || memos.medium;
    const lose = 100 - m.p;
    return el("div", {},
      el("div", { class: "doc-label" }, "🔒 仅助手可见 · 案件评估备忘录"),
      el("article", { class: "paper", html: `
<h3>MEMORANDUM（内部备忘录）</h3>
<p><b>致：</b>${CONFIG.herName}（被告，pro se）<br><b>自：</b>${CONFIG.assistantName}（律师助手）<br><b>事由：</b>是否接受和解</p>
<p><b>1. 胜诉概率估计：约 ${m.p}%</b></p>
<p>${m.txt}</p>
<p><b>2. 期望值分析（Expected Value）</b></p>
<p>如果败诉，法院可能判令"每年生日陪原告玩一整天"。假设这件事的\"成本\"是 C：</p>
<p class="formula">上庭的期望成本 = 败诉概率 × C = ${lose}% × C</p>
<p>和解的成本 = "每年生日做一件新的事" ≈ 几乎为零，甚至是正收益。</p>
<p><b>3. 结论</b></p>
<p>${m.p >= 80 ? "从期望值看，上庭的风险很小；但和解的条件本身就是一件好事。两种选择都合理。" : "从期望值看，和解相当划算。但最终决定权在你。"}</p>
<p class="doc-footnote">真实世界中，律师会把这类评估告诉当事人，由当事人自己决定是否和解。</p>` }),
      btn("念给她听了", done));
  };

  STEPS.jurySelect = (s, done) => {
    const struck = new Set();
    const c = card("", el("div", { class: "prompt", html: t(s.prompt) }));
    const counter = el("div", { class: "counter-line" }, "已回避 0 / " + s.strikes);
    c.append(counter);
    const grid = el("div", { class: "jurors" });
    const cards = s.jurors.map((j, i) => {
      const jc = el("button", { class: "juror", onclick: () => {
        if (struck.has(i)) { struck.delete(i); jc.classList.remove("struck"); }
        else { if (struck.size >= s.strikes) return toast("这一组最多回避 " + s.strikes + " 人"); struck.add(i); jc.classList.add("struck"); }
        counter.textContent = "已回避 " + struck.size + " / " + s.strikes;
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
        say("", "原告方举证完毕。你成功提出了 " + right + " 次异议。");
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
        if (L.ground == null) { addScore(-0.5); say("bad", "法官：<b>\"Overruled.\"</b>（异议驳回）这个问答没有问题。"); }
        else if (gi === L.ground) { addScore(1); right++; say("ok", "法官：<b>\"Sustained.\"</b>（异议成立）陪审团请忽略刚才的内容。<br><small>" + t(L.why) + "</small>"); }
        else { addScore(0.5); right++; say("ok", "法官：<b>\"Sustained.\"</b>不过更准确的理由是：" + s.grounds[L.ground] + "。<br><small>" + t(L.why) + "</small>"); }
        i++; save(); advance();
      } }, g)));
    };
    setTimeout(advance, 0);
    return c;
  };

  STEPS.present = (s, done) => {
    const c = card("", el("div", { class: "prompt", html: t(s.prompt) }));
    const list = el("div", { class: "options" });
    Object.entries(EXHIBITS).forEach(([k, name]) => {
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
    if (sc >= 26) { level = "全票通过 · 完胜"; text = "我们陪审团一致裁定：<b>支持被告</b>。原告的全部请求不予支持。陪审员们还额外写了一张纸条：\"被告是我们见过最酷的大人。\""; }
    else if (sc >= 18) { level = "一致裁定 · 胜诉"; text = "我们陪审团一致裁定：<b>支持被告</b>。该协议在被告成年后未经有效追认，且其例外条款已经触发。"; }
    else { level = "一致裁定 · 险胜"; text = "经过漫长的评议，我们陪审团一致裁定：<b>支持被告</b>。未成年人订立的合同可以撤销——这一点就足够了。"; }
    if (S.flags.settled) text += "<br><br><small>（平行宇宙记录：在主宇宙里，本案已经和解。）</small>";
    S.verdict = { level, text, score: sc }; save();
    const c = card("center verdict",
      el("div", { class: "muted" }, "陪审团回到了法庭。"),
      el("div", { class: "muted" }, "法官：\"陪审团是否已经作出裁决？\""),
      el("div", { class: "muted" }, "首席陪审员：\"是的，法官大人。\""));
    const reveal = btn("宣读裁决", () => {
      reveal.remove();
      c.append(el("div", { class: "stamp big" }, "VERDICT"), el("h2", {}, level), el("div", { class: "text", html: text }),
        el("div", { class: "muted" }, "案件评分：" + sc), btn("继续", done));
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
          if (!drawn) return toast("请先用手指签名");
          S.sigs[s.who] = cv.toDataURL("image/png"); save(); done();
        })));
  };

  function judgmentHTML() {
    const v = S.verdict || { level: "", text: "" };
    const today = new Date().toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" });
    const sig = (w) => S.sigs[w] ? `<img class="sig" src="${S.sigs[w]}" alt="签名">` : `<div class="sig empty"></div>`;
    return `
<p class="doc-court">${t("{court}")}</p>
<p class="doc-caption"><b>JOHN DOE</b>（后查明为：${t("{plaintiff}")}），原告<br>诉<br><b>${CONFIG.herName}</b>，被告</p>
<p class="doc-caseno">Case No. ${CONFIG.caseNo}</p>
<h3>JUDGMENT ON THE VERDICT<br>依陪审团裁决作出的判决</h3>
<p>本案经陪审团审理。陪审团裁决如下：</p>
<blockquote>${v.text}</blockquote>
<p><b>IT IS HEREBY ORDERED AND ADJUDGED：</b></p>
<p>判决支持被告 ${CONFIG.herName}。被告已年满20岁，依法有权成为一个大人。本庭同时判令：被告应在20岁这一年<b>继续好奇、继续冒险、继续快乐</b>。</p>
<div class="sig-row">
  <div>${sig("counsel")}<div class="sig-label">${CONFIG.herName}<br>Defendant, pro se（被告兼辩护律师）</div></div>
  <div>${sig("assistant")}<div class="sig-label">${CONFIG.assistantName}<br>Paralegal（律师助手）</div></div>
</div>
<p class="judge-line">ENTERED：${today}　　　　<span class="seal-red">时间巡回法院<br>书记员印</span></p>
<p class="doc-footnote">🎂 生日游戏道具 · 情节纯属虚构</p>`;
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
        el("p", {}, "John Doe v. " + CONFIG.herName),
        el("h4", {}, "证物清单"),
        el("ul", {}, owned.map((k) => el("li", {}, EXHIBITS[k]))),
        el("h4", {}, "证据照片"),
        photos.length ? el("div", { class: "photos" }, photos.map(([k, src]) => el("img", { src, alt: k }))) : el("p", { class: "muted" }, "（没有拍照片）"),
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
        preview.innerHTML = ""; preview.append(el("img", { src: S.photos[s.key] }));
        URL.revokeObjectURL(img.src);
      };
      img.src = URL.createObjectURL(f);
    });
    if (S.photos[s.key]) preview.append(el("img", { src: S.photos[s.key] }));
    return card("center", el("div", { class: "text", html: t(s.prompt) }), preview, input,
      el("div", { class: "row" }, btn("📸 拍照/选照片", () => input.click(), "secondary"), btn("继续", done)));
  };

  // 暴露给测试用
  window.__CF20 = { get state() { return S; }, STEPS, render };

  document.addEventListener("DOMContentLoaded", render);
})();
