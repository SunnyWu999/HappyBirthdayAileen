/* =========================================================================
   第二十号档案 · CASE FILE NO. 20
   ---------------------------------------------------------------------------
   所有剧情、名字、密码都在这个文件里。改这里就行，不用碰 game.js。
   文本里可以用这些占位符，游戏会自动替换：
     {her}        她的名字/昵称
     {assistant}  你的名字
     {plaintiff}  结局揭晓的原告身份
     {caseNo}     案号
   ========================================================================= */

const CONFIG = {
  herName: "Aileen",            // ← 改成她的名字或昵称
  assistantName: "阿森",      // ← 改成你的名字
  plaintiffReveal: "10岁的Aileen", // ← 结局揭晓：神秘原告到底是谁
  plaintiffMessage:
    "我只是想确认一件事——长大以后的你，还会不会好好玩。现在我知道答案了。生日快乐，大人。",
  caseNo: "2026-L-011124",
  courtName: "THE CIRCUIT COURT OF TIME · COOK COUNTY DIVISION",
  courtNameZh: "时间巡回法院 · 库克县分庭（虚构）",
  // 最后解锁的"Z号证物"：你写给她的信（支持换行）
  letter:
`亲爱的{her}：

生日快乐！

这份"诉状"是假的，但今天的每一站都是真的。
二十岁，愿你继续做一个很酷的大人——
会弹吉他、会认鸟、会为自己辩护，也永远保留一点小孩的好奇心。

你的律师助手
{assistant}`,
  // 实体礼物线索（留空 "" 就不显示）
  giftHint: "最后一件证物藏在……（改成你藏礼物的地方）",

  // ---- 双人同步用的密码（可以改，但两边要一致）----
  codes: {
    ch0_toAssistant: "SERVE",   // 她签收传票后给你
    ch0_toCounsel:   "PARA7",   // 你给她的"助手工号"
    ch1_toAssistant: "ANSWER",  // 她提交答辩状后给你
    ch2_toAssistant: "DISCO",   // 她开始证据开示，给你（解锁证人剧本）
    ch2_toCounsel:   "DEPO20",  // 证词结束后你给她（解锁笔录）
    ch3_strength:   { strong: "EV90", medium: "EV70", weak: "EV50" }, // 证据强度码，她给你
    ch4_toAssistant: "VOIR",    // 她进入庭审，给你（解锁陪审员问卷）
    ch5_toAssistant: "VERDICT", // 判决宣读后她给你
    ch5_toCounsel:   "SEAL",    // 你给她的"书记员盖章码"
    // 节奏锁：由你在现实中合适的时刻告诉她（留空 "" 表示不锁）
    pace: { ch1: "", ch2: "", ch3: "", ch4: "", ch5: "" }
  }
};

/* 证物清单：id → 名称 */
const EXHIBITS = {
  exA: "A号证物：2016年日记",
  exB: "B号证物：18岁生日的帖子",
  exD: "D号证物：《永远不长大协议》原件",
  depo: "W证人宣誓证词笔录"
};

/* =========================================================================
   章节：每章有 counsel（她）和 assistant（你）两条线
   ========================================================================= */
const CHAPTERS = [

/* ------------------------------------------------------------------ */
{
  id: "ch0",
  title: "序章 · 传票送达",
  subtitle: "Service of Process",
  counsel: [
    { type: "narration", title: "一个牛皮纸信封",
      text: "{her}，今天早上，有人在你门口留下了一个牛皮纸信封。<br><br>信封上没有寄件人，只盖着一个红色的印章：<b>OFFICIAL SERVICE · 正式送达</b>。" },
    { type: "document", docTitle: "SUMMONS · 传票", html: `
<p class="doc-court">{court}</p>
<p class="doc-caption"><b>JOHN DOE</b>，原告（Plaintiff）<br>诉<br><b>{her}</b>，被告（Defendant）</p>
<p class="doc-caseno">Case No. {caseNo}</p>
<h3>SUMMONS（传票）</h3>
<p>To each Defendant：</p>
<p>You are summoned and required to file an answer to the complaint in this case, a copy of which is hereto attached, or otherwise file your appearance, <b>within 30 days after service of this summons, not counting the day of service.</b></p>
<p><b>IF YOU FAIL TO DO SO, A JUDGMENT BY DEFAULT MAY BE ENTERED AGAINST YOU FOR THE RELIEF ASKED IN THE COMPLAINT.</b></p>
<p class="doc-zh">你被起诉了。请在传票送达后30天内（送达当天不计）提交答辩状或出庭登记，否则法院可能对你作出缺席判决。</p>
<p class="doc-seal">⚖︎ CLERK OF THE COURT</p>
<p class="doc-footnote">🎂 这是一份生日游戏道具，不是真正的法律文件。格式参照伊利诺伊州最高法院规则 Rule 101(d)。</p>` },
    { type: "document", docTitle: "COMPLAINT · 起诉状", html: `
<p class="doc-court">{court}</p>
<p class="doc-caption"><b>JOHN DOE</b> v. <b>{her}</b> · Case No. {caseNo}</p>
<h3>COMPLAINT AT LAW<br>COUNT I — BREACH OF CONTRACT（违约）</h3>
<ol class="doc-paras">
<li>原告 John Doe 是一名身份保密的个人。</li>
<li>被告 {her} 现居伊利诺伊州库克县，是芝加哥大学学生。</li>
<li>2016年夏天，被告与原告订立书面协议《永远不长大协议》（"The Never-Grow-Up Agreement"），被告承诺"永远做一个小孩，每年生日都陪原告玩"。</li>
<li>作为对价（consideration），原告向被告给付了一根草莓味棒棒糖。</li>
<li>原告已完全履行其在协议项下的义务。</li>
<li>2024年11月24日，被告年满18岁后，在社交媒体公开发帖称"我永远是个小孩"，从而<b>追认（ratify）</b>了该协议。</li>
<li>2026年11月24日，被告年满20岁，并以种种迹象表现得像个大人，构成违约。</li>
<li>原告因此遭受损害，包括但不限于"失去童年玩伴"。</li>
</ol>
<p><b>WHEREFORE</b>，原告请求法院判令被告：（a）赔偿损失；（b）实际履行（specific performance）——每年生日陪原告玩一整天。</p>
<p class="doc-sign">原告 John Doe（匿名）</p>` },
    { type: "note", title: "📚 真实法律知识",
      text: "在伊利诺伊州，普通民事案件的传票要求被告<b>在送达后30天内</b>（送达当天不计）出庭登记或答辩（Ill. S. Ct. R. 101(d)、R. 181(a)）。<br><br>你可以请律师，也可以<b>自己代理自己</b>，法律上叫 <b>pro se</b>。" },
    { type: "choice", prompt: "你决定怎么办？",
      options: [
        { label: "我要自己为自己辩护（Pro Se）", feedback: "很好。从现在起，你既是被告，也是你自己的辩护律师。不过，每个好律师都需要一位好助手……", score: 0 }
      ] },
    { type: "codeGive", text: "把这个<b>签收码</b>告诉你的律师助手，TA 才能开始工作：", code: "ch0_toAssistant" },
    { type: "gate", text: "输入你的助手报给你的<b>助手工号</b>：", code: "ch0_toCounsel",
      success: "助手 {assistant} 已就位。TA 手上有你看不到的资料：法律资料库、证物档案、证人剧本……遇到问题，记得问 TA。" }
  ],
  assistant: [
    { type: "narration", title: "你的身份",
      text: "{assistant}，你是 {her} 刚刚聘请的<b>律师助手（paralegal）</b>。<br><br>{her} 被一个神秘人起诉了，她决定<b>自己为自己辩护</b>。你手上有她看不到的资料，但记住：<b>所有决定都由她来做</b>。你只负责提供信息——就像真实的律师助手一样。" },
    { type: "gate", text: "等她签收传票后，输入她报给你的<b>签收码</b>：", code: "ch0_toAssistant",
      success: "已收到传票副本。案件档案已经同步到你的手机。" },
    { type: "document", docTitle: "助手工作守则", html: `
<h3>律师助手工作守则</h3>
<ol class="doc-paras">
<li>她问什么，你就查什么、念什么。她没问的，可以提示"要不要看看资料库？"，但别直接给答案。</li>
<li>每一章都有只在你手机上才有的资料，标题旁边会写着 <b>🔒 仅助手可见</b>。</li>
<li>看到"把密码告诉她"的时候，口头告诉她。</li>
<li>节奏由你掌控：现实中走到对应的地点，再推进到下一章。</li>
</ol>
<p class="doc-footnote">真实世界中，律师助手不能提供法律意见，只能在律师指导下工作。在本案中，律师就是她。</p>` },
    { type: "codeGive", text: "把你的<b>助手工号</b>告诉她：", code: "ch0_toCounsel" },
    { type: "narration", title: "准备就绪", text: "序章完成。等她进入第一章，你的资料会自动出现。" }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "ch1",
  title: "第一章 · 应诉",
  subtitle: "Answer or Motion",
  pace: "ch1",
  counsel: [
    { type: "narration", title: "30天倒计时",
      text: "传票已经送达，30天的倒计时开始了。<br><br>在伊利诺伊州，你有几种选择。<b>选之前，先让助手查一查法律资料库。</b>" },
    { type: "choice", prompt: "你的第一步行动是？", repeatOnFlag: "default",
      options: [
        { label: "什么都不做，假装没收到", score: -1, flag: "default",
          feedback: "⚠️ 30天过去了。原告申请了<b>缺席判决（default judgment）</b>，法官批准了。<br><br>好在根据 735 ILCS 5/2-1301(e)，你可以在判决作出后<b>30天内</b>申请撤销缺席判决。法官同意了你的申请——但请别再这样了。<br><br><i>请重新选择。</i>", repeat: true },
        { label: "提交 §2-615 驳回动议：起诉状在法律上不成立", score: 0,
          feedback: "法官：<i>\"在 §2-615 动议阶段，本庭必须把起诉状中陈述的事实视为真实。起诉状已经写明了违约的四个要件：有效合同、原告履约、被告违约、损害。动议驳回。被告须在28天内提交答辩状。\"</i><br><br>没关系，这一步很常见。接下来提交答辩状。" },
        { label: "提交 §2-619(a)(9) 驳回动议：以\"未成年\"为由", score: 1,
          feedback: "法官：<i>\"被告主张签约时只有10岁，这是有效的积极抗辩事由。但原告在第6段主张被告成年后<b>追认</b>了协议，这是一个有争议的事实问题，不能在动议阶段解决。动议驳回，但被告的抗辩予以保留。请提交答辩状。\"</i><br><br>很聪明的一步！你让法官注意到了本案的核心：追认。" },
        { label: "直接提交答辩状（Answer）", score: 1,
          feedback: "稳妥的选择。接下来你需要逐段回应起诉状。" }
      ] },
    { type: "answerTable",
      prompt: "逐段回应起诉状的8个段落。<br><small>每一段必须选择：承认、否认，或\"不知情\"。不确定事实的时候，问你的助手——证物档案在 TA 那里。</small>",
      options: ["承认", "否认", "不知情"],
      paragraphs: [
        { text: "¶1 原告是一名身份保密的个人。", correct: "不知情", why: "你不知道原告是谁，所以回答\"不知情\"（lack of knowledge）。在伊利诺伊州，这种回答需要附上宣誓书。" },
        { text: "¶2 被告现居库克县，是芝加哥大学学生。", correct: "承认", why: "这是事实。对真实的事实应该承认。" },
        { text: "¶3 2016年夏天，双方订立了《永远不长大协议》。", correct: "承认", why: "A号证物（日记）证明你确实拉过钩。承认协议存在不等于承认它有效：你的抗辩是签约时未成年。" },
        { text: "¶4 原告给付了一根草莓味棒棒糖作为对价。", correct: "承认", why: "日记里写着收到了棒棒糖。法院一般不审查对价是否\"足够\"，所以在这里纠缠没有意义。" },
        { text: "¶5 原告已完全履行义务。", correct: "不知情", why: "协议里原告还有什么义务、做没做到，你并不清楚。" },
        { text: "¶6 被告在18岁生日的帖子中追认了该协议。", correct: "否认", why: "关键段落！追认（ratification）要求成年人<b>明知</b>合同可撤销，并<b>有意</b>确认它。一条开玩笑的帖子不是追认。" },
        { text: "¶7 被告年满20岁，构成违约。", correct: "否认", why: "长大不是违约。这一段是原告的法律结论，应当否认。" },
        { text: "¶8 原告因此遭受损害。", correct: "否认", why: "否认损害，由原告承担举证责任。" }
      ],
      note: "📚 735 ILCS 5/2-610(b)：答辩状中<b>没有明确否认的指控，视为承认</b>。所以每一段都必须认真回应。" },
    { type: "selectMany",
      prompt: "在答辩状里，你要提出哪些<b>积极抗辩（affirmative defenses）</b>？<br><small>可以多选。不确定的话，问助手资料库里怎么说。</small>",
      options: [
        { label: "未成年人抗辩（Infancy）：签约时我只有10岁", correct: true, why: "伊利诺伊州法律：未成年人订立的合同<b>可撤销</b>；尚未履行的合同，只有在成年后被追认才有约束力。" },
        { label: "履行不能（Impossibility）：没有人能永远不长大", correct: true, why: "如果合同义务在客观上不可能履行，可以免除履行义务。年龄增长显然不受任何人控制。" },
        { label: "缺乏对价：一根棒棒糖太便宜了", correct: false, why: "法院一般不审查对价是否\"足够\"。一根棒棒糖在法律上也算对价。" },
        { label: "超过诉讼时效：协议是10年前签的", correct: false, why: "伊利诺伊州书面合同的诉讼时效是<b>10年</b>（735 ILCS 5/13-206），而且时效从违约时才开始计算。原告主张的违约发生在今天，所以没有超过时效。" }
      ],
      note: "📚 735 ILCS 5/2-613(d)：积极抗辩必须在答辩状中<b>明确提出</b>，否则可能被视为放弃。" },
    { type: "award", flag: "exA" }, { type: "award", flag: "exB" },
    { type: "narration", title: "答辩状已提交",
      text: "你签上名字，在名字下面写上<b>\"Defendant, pro se\"</b>。答辩状已经提交给法院书记员。<br><br>你获得了：<b>A号证物（2016年日记）</b>和<b>B号证物（18岁生日的帖子）</b>。" },
    { type: "photo", key: "ch1", prompt: "📸（可选）拍一张\"证据照片\"，比如你今天出门时的样子，放进案件卷宗。" },
    { type: "codeGive", text: "把这个码告诉助手，让 TA 准备下一阶段的资料：", code: "ch1_toAssistant" }
  ],
  assistant: [
    { type: "document", docTitle: "🔒 仅助手可见 · 法律资料库", html: `
<h3>法律资料库（伊利诺伊州）</h3>
<dl class="lawlib">
<dt>缺席判决（Default）</dt><dd>被告不按时出庭登记或答辩，法院可以作出缺席判决。735 ILCS 5/2-1301(e)：判决作出后30天内可以申请撤销。</dd>
<dt>§2-615 驳回动议</dt><dd>攻击起诉状的<b>法律充分性</b>。法院把起诉状里陈述的事实视为真实，只看法律上是否成立。</dd>
<dt>§2-619(a)(9) 驳回动议</dt><dd>承认起诉状的法律充分性，但提出能够击败请求的<b>其他事由</b>（affirmative matter），例如未成年。</dd>
<dt>答辩状（§2-610）</dt><dd>逐段承认、否认或声明不知情。<b>没有明确否认的，视为承认。</b></dd>
<dt>积极抗辩（§2-613(d)）</dt><dd>必须在答辩状里明确写出来。</dd>
<dt>未成年人合同</dt><dd>伊利诺伊州成年年龄是18岁。未成年人订立的合同<b>可撤销</b>（voidable）。尚未履行的合同，只有成年后被<b>追认</b>才有约束力。</dd>
<dt>追认（Ratification）</dt><dd>Barlow v. Robinson（Ill. 1898）：作为追认的行为，必须是在<b>充分了解后果</b>的情况下作出，并且<b>有意追认</b>一个已知可撤销的合同。</dd>
<dt>履行不能（Impossibility）</dt><dd>合同义务客观上不可能履行时，可以免除履行。</dd>
<dt>对价（Consideration）</dt><dd>法院一般不审查对价是否\"足够\"。</dd>
<dt>诉讼时效</dt><dd>书面合同为10年（735 ILCS 5/13-206），从违约时起算。</dd>
</dl>` },
    { type: "document", docTitle: "🔒 仅助手可见 · 证物档案", html: `
<h3>A号证物：2016年夏天的日记</h3>
<div class="crayon">7月15日 晴<br>今天在公园遇到一个神秘的朋友。我们拉钩了！我保证永远不长大，每年生日都陪TA玩。TA给了我一根草莓棒棒糖🍭 超好吃！！</div>
<h3>B号证物：18岁生日的帖子（2024年11月24日）</h3>
<div class="post">📱 "18岁了，但我永远是个小孩 ✌️" <br><small>配图：在KTV和朋友们唱歌</small></div>
<h3>关于原告</h3>
<p>原告身份<b>未知</b>。日记里只写了"神秘的朋友"。</p>
<p class="doc-footnote">她问到的时候再念给她听。</p>` },
    { type: "gate", text: "她提交答辩状后，输入她给你的码：", code: "ch1_toAssistant",
      success: "答辩状副本已收到。下一阶段：证据开示（Discovery）。" }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "ch2",
  title: "第二章 · 证据开示",
  subtitle: "Discovery",
  pace: "ch2",
  counsel: [
    { type: "narration", title: "案件管理令",
      text: "法官发布了<b>案件管理令（Case Management Order）</b>：双方进入证据开示阶段。<br><br>在美国民事诉讼中，双方在开庭前必须<b>互相交换证据</b>，没有\"突然袭击\"。" },
    { type: "timedAdmit", seconds: 120,
      prompt: "📬 原告向你送达了<b>《请求承认事实书》（Request to Admit）</b>。<br><br><b>WARNING：</b>如果你没有在28天内回应，以下所有事实将被视为承认。<br><small>（游戏里，28天 = 2分钟。你的回应是宣誓过的，必须诚实。）</small>",
      items: [
        { text: "承认你在2016年和原告拉钩订立了该协议。", correct: "承认", why: "日记证明这是事实。宣誓回应必须诚实。" },
        { text: "承认你在2024年发帖时，知道自己有权撤销该协议。", correct: "否认", why: "<b>关键！</b>追认要求\"明知\"。如果你承认了，就等于承认了追认的一个要件。" },
        { text: "承认你发那条帖子的目的是确认该协议。", correct: "否认", why: "发帖只是在KTV开玩笑，没有确认协议的意图。" },
        { text: "承认你现在已经年满20岁。", correct: "承认", why: "事实就是事实。" },
        { text: "承认你从未通知原告撤销该协议。", correct: "承认", why: "这是事实，诚实回应。不过对于尚未履行的合同，成年后不追认，它本来就没有约束力。" }
      ],
      note: "📚 Ill. S. Ct. R. 216(c)：收到请求承认事实书后<b>28天内</b>不回应，所列事实<b>视为承认</b>。真实案例里，有人就因为错过这个期限输掉了官司。" },
    { type: "pickN", n: 3,
      prompt: "📝 轮到你出招了。向原告发出<b>书面质询（Interrogatories）</b>。<br><small>真实规则（R. 213）最多30个问题，本游戏只能选3个。好好选。</small>",
      options: [
        { label: "原告的真实姓名和地址是什么？", reveal: "原告答复：\"原告请求保密。地址：你记忆里的某个夏天。\"<br>（有点诡异……）", score: 0 },
        { label: "原告主张的损害赔偿金额是多少，怎么计算的？", reveal: "原告答复：\"一辈子的生日。无法用金钱计算。\"<br>→ 损害赔偿<b>过于推测、无法计算</b>，对你有利。", score: 1 },
        { label: "原告认为被告在何时、以何种方式追认了协议？", reveal: "原告答复：\"就是那条帖子。没有其他。\"<br>→ 原告的追认主张<b>只有一条帖子</b>作为依据！", score: 1, flag: "onlyPost" },
        { label: "协议原件现在在哪里？由谁保管？", reveal: "原告答复：\"原件由原告保管，放在一个铁皮饼干盒里。\"<br>→ 你可以要求原告<b>提供原件</b>。", score: 1, flag: "knowsOriginal" },
        { label: "原告最喜欢什么口味的棒棒糖？", reveal: "原告律师提出异议：<i>与本案无关</i>。浪费了一个问题。", score: -0.5 },
        { label: "原告为什么等到今天才起诉？", reveal: "原告答复：\"因为今天她满20岁了。\"", score: 0 },
        { label: "协议是否包含任何条件或例外条款？", reveal: "原告答复：\"<b>原告拒绝回答。</b>\"<br>→ 非常可疑。", score: 1, flag: "suspectClause" }
      ] },
    { type: "pickN", n: 1,
      prompt: "📂 向原告发出<b>调取文件请求（Request for Production, R. 214）</b>。选一项：",
      options: [
        { label: "请提供《永远不长大协议》原件", reveal: "原告不情愿地交出了一张皱巴巴的蜡笔纸……<br>你仔细一看，最下面有一行小字！", score: 2, flag: "exD" },
        { label: "请提供原告的身份证明", reveal: "法官裁定：原告可以继续匿名，你可以申请在保护令下查看。但对本案的事实没有帮助。", score: 0 },
        { label: "请提供那根棒棒糖的包装纸", reveal: "原告交出了一张草莓味棒棒糖包装纸。它证明了对价存在……这对你没有帮助。", score: 0 }
      ] },
    { type: "exhibitShow", flag: "exD", docTitle: "D号证物：《永远不长大协议》原件", html: `
<div class="crayon big">永远不长大协议<br><br>我保证永远不长大，<br>每年生日都陪你玩。<br><br><span class="tiny">除非我变成一个很酷的大人。</span><br><br>签名：{her}（10岁）🍭</div>
<p class="doc-zh">⭐ <b>例外条款！</b>协议本身写着：<b>如果她变成一个很酷的大人，协议就不再适用。</b></p>` },
    { type: "narration", title: "宣誓证词（Deposition）",
      text: "最后一项证据开示：<b>宣誓证词</b>（Deposition, R. 206）。<br><br>证人W（18岁生日那天帖子的拍摄者）将宣誓作证，回答你的提问。<b>你的助手会扮演证人</b>，证人的剧本在 TA 手上。<br><br>规则：<br>• 你最多可以问 <b>20 个问题</b>（正好20岁）<br>• 证人只回答你问到的内容<br>• 问\"是不是\"的问题，证人只会回答\"是\"或\"不是\"" },
    { type: "codeGive", text: "把这个码告诉助手，TA 才能拿到证人剧本：", code: "ch2_toAssistant" },
    { type: "narration", title: "开始提问",
      text: "现在开始提问吧。证人已经宣誓。<br><br>💡 提示：想想看——那天是什么场合？她发帖的时候在想什么？帖子有没有下文？<br><br>问完以后，助手会给你<b>笔录副本码</b>。" },
    { type: "gate", text: "输入助手给你的<b>笔录副本码</b>：", code: "ch2_toCounsel", success: "笔录已到。现在请根据证词内容回答以下问题。" },
    { type: "quiz", prompt: "📄 证词笔录摘要。<br><small>根据证人W刚才的回答作答。（如果没问到，那就只能猜了。）</small>",
      questions: [
        { q: "她发那条帖子的时候，是在什么场合？", options: ["在一个正式的签约仪式上", "在KTV和朋友唱歌，大家在开玩笑", "在律师事务所"], correct: 1 },
        { q: "她发帖的时候，记不记得《永远不长大协议》？", options: ["记得，还特意提了", "完全不记得有这份协议", "证人不知道"], correct: 1 },
        { q: "那条帖子的完整内容是？", options: ["\"我永远是个小孩\"，没有下文", "\"我永远是个小孩……但也是一个很酷的大人\"", "\"我要撤销所有童年协议\""], correct: 1 }
      ],
      perCorrect: 1, flagIfAll: "depoStrong" },
    { type: "award", flag: "depo" },
    { type: "photo", key: "ch2", prompt: "📸（可选）在法院门口或今天去过的地方拍一张证据照片。" },
    { type: "narration", title: "证据开示结束", text: "你获得了：<b>W证人宣誓证词笔录</b>。现在，案件进入审前阶段。" }
  ],
  assistant: [
    { type: "gate", text: "等她让你拿证人剧本时，输入她给你的码：", code: "ch2_toAssistant", success: "证人剧本已解锁。" },
    { type: "document", docTitle: "🔒 仅助手可见 · 证人W剧本", html: `
<h3>你现在扮演：证人W</h3>
<p>W是她的朋友，18岁生日那天帖子的照片就是W拍的。你已经宣誓说实话。</p>
<p><b>表演规则：</b></p>
<ul>
<li>只回答她问到的内容，不要主动多说。</li>
<li>她问\"是不是\"的问题，只回答\"是\"或\"不是\"。</li>
<li>她问开放性问题（什么、为什么、怎么样），可以用下面的事实回答一两句。</li>
<li>用下面的计数器记录她问了几个问题，最多20个。</li>
</ul>
<h3>W知道的事实</h3>
<ol class="doc-paras">
<li>那天是她18岁生日，大家在<b>KTV唱歌</b>，气氛很欢乐，大家都在开玩笑。</li>
<li>那条帖子是她<b>随手发的</b>，配的是大家唱歌的照片。</li>
<li>W可以确定：她<b>完全不记得</b>什么《永远不长大协议》，从来没提过。</li>
<li>帖子其实<b>有下文</b>：评论区里她自己补了一句——<b>\"但也是一个很酷的大人 😎\"</b></li>
<li>W不认识原告，没听说过 John Doe。</li>
<li>（自由发挥）W觉得她是一个很酷的人。</li>
</ol>
<p class="doc-footnote">真实的宣誓证词由法庭书记员逐字记录，之后可以在庭审中使用。</p>` },
    { type: "counter", label: "她已经问了几个问题", max: 20 },
    { type: "codeGive", text: "证词结束后，把<b>笔录副本码</b>告诉她：", code: "ch2_toCounsel" },
    { type: "narration", title: "辛苦了，证人W", text: "第二章完成。下一章是和解会议，等她给你\"证据强度码\"。" }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "ch3",
  title: "第三章 · 和解会议",
  subtitle: "Settlement Conference",
  pace: "ch3",
  counsel: [
    { type: "narration", title: "审前和解会议",
      text: "开庭之前，法官要求双方参加<b>审前和解会议</b>。现实中，绝大多数民事案件都不会走到庭审，而是在这一步和解。<br><br>原告提出了和解条件：" },
    { type: "document", docTitle: "原告的和解提议", html: `
<h3>SETTLEMENT OFFER（和解提议）</h3>
<p>原告愿意撤诉，条件是：</p>
<p class="doc-zh"><b>被告承诺：从今以后，每年生日都要做一件自己从来没做过的事。</b></p>
<p>此提议在庭审开始前有效。</p>` },
    { type: "scoreCode", text: "把你的<b>证据强度码</b>告诉助手，TA 会给你一份案件评估报告（就像真实的律师助手帮你算胜诉概率）：", codes: "ch3_strength" },
    { type: "choice", prompt: "听完助手的评估，你决定：",
      options: [
        { label: "接受和解", flag: "settled", score: 0,
          feedback: "你签了和解协议。案件撤诉。<br><br>这其实是一个很温柔的结局：每年生日都做一件新的事，听起来一点也不像惩罚。<br><br><b>但是……</b>你很好奇，如果真的上了法庭会怎么样？法官允许你进入<b>\"平行宇宙\"模式</b>，继续体验庭审。" },
        { label: "拒绝和解，法庭上见", flag: "rejected", score: 0.5,
          feedback: "你把和解提议推回桌子对面。<br><br>\"我们法庭上见。\"" }
      ] },
    { type: "codeGive", text: "进入庭审前，把这个码告诉助手（解锁陪审员问卷）：", code: "ch4_toAssistant" }
  ],
  assistant: [
    { type: "gate", text: "输入她给你的<b>证据强度码</b>：", code: "ch3_strength", multi: true,
      success: "评估报告已生成。" },
    { type: "evalMemo" },
    { type: "narration", title: "下一步", text: "把评估报告念给她听，然后由她决定要不要和解。之后她会给你一个码，用来解锁庭审资料。" }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "ch4",
  title: "第四章 · 开庭审理",
  subtitle: "Trial",
  pace: "ch4",
  counsel: [
    { type: "narration", title: "全体起立",
      text: "\"All rise!\"<br><br>法官走进法庭。今天是<b>陪审团审判</b>。在伊利诺伊州，民事陪审团由<b>12人</b>组成。<br><br>第一步：<b>陪审团选任（Voir Dire）</b>。" },
    { type: "jurySelect", strikes: 3,
      prompt: "这一组有8位候选陪审员。按照 735 ILCS 5/2-1106，每一方有5次<b>无因回避（peremptory challenge）</b>的机会，不需要说明理由。在这一组里，你最多可以用 <b>3 次</b>。<br><small>他们的问卷答案在助手手上。问清楚再决定！</small>",
      jurors: [
        { name: "1号 · Margaret", job: "退休图书管理员", biased: false },
        { name: "2号 · Tony", job: "糖果店老板", biased: true },
        { name: "3号 · Priya", job: "护士", biased: false },
        { name: "4号 · Gus", job: "保险理赔员", biased: true },
        { name: "5号 · Lena", job: "高中音乐老师", biased: false },
        { name: "6号 · Dale", job: "自称\"讨厌一切生日派对\"", biased: true },
        { name: "7号 · Sam", job: "公交车司机", biased: false },
        { name: "8号 · Iris", job: "鸟类摄影师", biased: false }
      ] },
    { type: "choice", prompt: "🎤 <b>开庭陈述（Opening Statement）</b>：你站起来，面对陪审团。你选择的主题是：",
      options: [
        { label: "\"一个10岁小孩的拉钩，法律不会强迫20岁的她兑现。更何况，协议本身写着：她已经可以毕业了。\"", score: 1.5, feedback: "陪审员们点了点头。8号陪审员Iris在本子上写下了什么。" },
        { label: "\"原告是个匿名的怪人，这场官司荒谬至极。\"", score: -0.5, feedback: "法官皱眉：<i>\"律师，请针对事实和法律陈述。\"</i>攻击对方的人格，不会给陪审团留下好印象。" },
        { label: "\"我承认我拉过钩，但那根棒棒糖真的很难吃。\"", score: 0, feedback: "法庭里响起一阵笑声。很有趣，但这不是一个法律论点。" }
      ] },
    { type: "objection",
      prompt: "⚖️ <b>原告方举证</b>：原告戴着面具出庭作证，接受原告律师的<b>直接询问</b>。<br>听到有问题的问答时，按<b>异议！</b>，然后选择理由。没问题就按<b>继续</b>。",
      grounds: ["诱导性问题（Leading）", "传闻证据（Hearsay）", "推测（Speculation）", "与本案无关（Relevance）"],
      lines: [
        { speaker: "原告律师", text: "请向陪审团介绍一下你自己。", ground: null },
        { speaker: "原告", text: "2016年夏天，我在公园遇到了她，我们拉了钩。", ground: null },
        { speaker: "原告律师", text: "你是不是觉得，被告是一个冷酷无情、背信弃义的人？", ground: 0, why: "在直接询问中，不能问暗示答案的问题（Ill. R. Evid. 611(c)）。" },
        { speaker: "原告", text: "我听她的一个同学说，她早就想撕毁协议了。", ground: 1, why: "证人在转述别人在法庭外说的话，用来证明这句话是真的，这是传闻证据（Ill. R. Evid. 801、802）。" },
        { speaker: "原告律师", text: "你给了她什么作为交换？", ground: null },
        { speaker: "原告", text: "一根草莓味棒棒糖。", ground: null },
        { speaker: "原告", text: "我猜，她心里其实一直想永远当小孩。", ground: 2, why: "证人只能就自己亲身知道的事情作证，不能猜测别人心里怎么想（Ill. R. Evid. 602）。" },
        { speaker: "原告律师", text: "请告诉陪审团，你最喜欢的冰淇淋口味是什么？", ground: 3, why: "跟本案的任何争点都没有关系（Ill. R. Evid. 401、402）。" }
      ] },
    { type: "present",
      prompt: "🔍 <b>交叉询问（Cross-Examination）</b>：轮到你询问原告了。<br><br>原告说：<b>\"协议里没有任何例外条款。她必须永远当小孩。\"</b><br><br>出示一件证物来反驳：",
      correct: "exD", score: 2,
      success: "你举起D号证物，指着最下面那行小字念出来：<b>\"除非我变成一个很酷的大人。\"</b><br><br>法庭里一片哗然。原告沉默了很久。<br><br>这叫做<b>弹劾（impeachment）</b>：用证据证明证人说的不是真话。",
      fail: "这件证物没能直接反驳原告的说法。如果你在证据开示阶段拿到了某份原件就好了……" },
    { type: "present",
      prompt: "原告继续说：<b>\"她18岁的时候在网上明确追认了协议。白纸黑字！\"</b><br><br>出示一件证物来反驳：",
      correct: "depo", alt: "exB", score: 1.5, altScore: 0.5,
      success: "你出示了W证人的宣誓证词：发帖时她在KTV开玩笑，<b>完全不记得这份协议</b>，评论区还补了一句\"但也是一个很酷的大人\"。<br><br>没有\"明知\"，就没有追认。",
      altText: "你出示了帖子本身。它证明帖子是在KTV发的，但没法证明她当时在想什么。宣誓证词会更有力。",
      fail: "这件证物跟追认的问题关系不大。" },
    { type: "pickN", n: 3,
      prompt: "🎤 <b>结案陈词（Closing Argument）</b>：选出你最有力的3个论点。",
      options: [
        { label: "未成年人订立的合同可以撤销；尚未履行的合同，必须成年后追认才有约束力。", score: 1 },
        { label: "追认要求\"明知且有意\"——她发帖时根本不记得这份协议。", score: 1 },
        { label: "协议的例外条款已经触发：她已经是一个很酷的大人。", score: 1 },
        { label: "长大在客观上不可能避免，属于履行不能。", score: 0.5 },
        { label: "一根棒棒糖太便宜，不算对价。", score: -0.5 },
        { label: "原告匿名，所以起诉无效。", score: -0.5 }
      ] },
    { type: "note", title: "📚 陪审团指示（Jury Instructions）",
      text: "法官向陪审团宣读指示：<br><br>• 原告必须以<b>优势证据（preponderance of the evidence）</b>证明违约的每一个要件，也就是\"可能性大于不可能性\"。<br>• 被告对自己提出的积极抗辩承担举证责任。<br>• 陪审团的裁决必须<b>一致</b>。<br><br>陪审团退庭评议……" },
    { type: "verdict" },
    { type: "codeGive", text: "把这个码告诉助手：", code: "ch5_toAssistant" }
  ],
  assistant: [
    { type: "gate", text: "她进入庭审时，输入她给你的码：", code: "ch4_toAssistant", success: "庭审资料已解锁。" },
    { type: "document", docTitle: "🔒 仅助手可见 · 候选陪审员问卷", html: `
<h3>陪审员问卷（Juror Questionnaires）</h3>
<p>问题：\"你对小孩子之间的承诺怎么看？\" \"你有什么可能影响你公正判断的经历？\"</p>
<dl class="lawlib">
<dt>1号 · Margaret（退休图书管理员）</dt><dd>\"我会仔细读每一份证据。\"</dd>
<dt>2号 · Tony（糖果店老板）</dt><dd>\"棒棒糖是很珍贵的，收了糖就要守信用！\" ⚠️</dd>
<dt>3号 · Priya（护士）</dt><dd>\"我每天都看到人长大变老，这很正常。\"</dd>
<dt>4号 · Gus（保险理赔员）</dt><dd>\"合同就是合同，不管签的时候几岁。\" ⚠️</dd>
<dt>5号 · Lena（高中音乐老师）</dt><dd>\"我的学生们都在长大，我为他们骄傲。\"</dd>
<dt>6号 · Dale</dt><dd>\"我讨厌一切跟生日有关的东西。\" ⚠️</dd>
<dt>7号 · Sam（公交车司机）</dt><dd>\"我会听两边怎么说。\"</dd>
<dt>8号 · Iris（鸟类摄影师）</dt><dd>\"雏鸟总要离巢的。\"</dd>
</dl>
<p class="doc-footnote">⚠️ = 可能对被告有偏见。她问的时候，把答案念给她听。</p>` },
    { type: "document", docTitle: "🔒 仅助手可见 · 异议速查卡", html: `
<h3>常见异议理由（坐在律师席旁边可以小声提醒她）</h3>
<dl class="lawlib">
<dt>诱导性问题（Leading）</dt><dd>直接询问自己的证人时，问题里暗示了答案。</dd>
<dt>传闻证据（Hearsay）</dt><dd>转述别人在法庭外说的话，用来证明那句话是真的。</dd>
<dt>推测（Speculation）</dt><dd>证人猜测自己不知道的事，比如别人心里在想什么。</dd>
<dt>与本案无关（Relevance）</dt><dd>和争议的事实没有关系。</dd>
</dl>` },
    { type: "gate", text: "判决宣读后，输入她给你的码：", code: "ch5_toAssistant", success: "判决已登记。" }
  ]
},

/* ------------------------------------------------------------------ */
{
  id: "ch5",
  title: "终章 · 判决",
  subtitle: "Judgment",
  pace: "ch5",
  counsel: [
    { type: "narration", title: "面具之下",
      text: "宣判之后，原告慢慢站起来，摘下了面具。<br><br>你愣住了。<br><br>站在那里的，是<b>{plaintiff}</b>。" },
    { type: "narration", title: "原告的最后陈述", text: "<i>\"{plaintiffMessage}\"</i>" },
    { type: "gate", text: "判决书需要书记员盖章。输入助手给你的<b>书记员盖章码</b>：", code: "ch5_toCounsel", success: "印章已盖好。" },
    { type: "signature", who: "counsel", label: "辩护律师（被告本人）签名" },
    { type: "signature", who: "assistant", label: "把手机递给你的律师助手，请 TA 签名" },
    { type: "judgment" },
    { type: "dossier" },
    { type: "letter" }
  ],
  assistant: [
    { type: "codeGive", text: "把<b>书记员盖章码</b>告诉她：", code: "ch5_toCounsel" },
    { type: "narration", title: "最后一步",
      text: "她会把手机递给你，请你在判决书上签名。<br><br>然后，她会打开<b>Z号证物</b>——你写给她的信。<br><br>辛苦了，{assistant}。🎂" }
  ]
}
];
