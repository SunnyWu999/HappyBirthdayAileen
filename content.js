/* =========================================================================
   第二十号档案 · CASE FILE NO. 20
   所有剧情、名字、密码都在这里。改这个文件就行。
   占位符：{her} {assistant} {X} {plaintiff} {caseNo}
   ========================================================================= */

const CONFIG = {
  herName: "Aileen",
  assistantName: "Sunny Wu",
  plaintiffName: "Mr. X",
  plaintiffReveal: "10岁的你",
  plaintiffMessage: "我等了你十年。<br>只是想知道，长大以后的你，还会不会好好玩。<br><br>现在我知道了。<br>生日快乐。",
  caseNo: "2026-L-011124",
  courtName: "THE CIRCUIT COURT OF TIME",
  courtNameZh: "时间巡回法院",
  letter:
`{her}：

官司是假的。
今天走过的每一个地方，是真的。

二十岁快乐。

{assistant}`,
  giftHint: "",   // 例如 "最后一件证物，在你书包最里面的口袋里。" 留空就不显示

  codes: {
    ch0_toAssistant: "SEAL",
    ch0_toCounsel:   "QUILL",
    ch1_toAssistant: "ANSWER",
    ch2_toAssistant: "DEPO",
    ch2_toCounsel:   "INK20",
    ch3_strength:   { strong: "EV90", medium: "EV70", weak: "EV50" },
    ch4_toAssistant: "VOIR",
    ch5_toAssistant: "VERDICT",
    ch5_toCounsel:   "WAX",
    pace: { ch1: "", ch2: "", ch3: "", ch4: "", ch5: "" }
  }
};

const EXHIBITS = {
  exA: "A · 2016年的日记",
  exB: "B · 18岁那晚的帖子",
  exD: "D · 协议原件",
  depo: "W · 证人W的证词"
};

const CHAPTERS = [

/* ============ 序章 ============ */
{
  id: "ch0", title: "序章", subtitle: "火漆", place: "清晨 · 门口",
  counsel: [
    { type: "whisper", text: "今天早上，门口多了一个信封。<br>没有邮票。<br>没有寄件人。<br><br>火漆还是温的。" },
    { type: "postcard", place: "CHICAGO · 06:00", text: "{her}，<br>你还记得我吗？<br><br>你欠我一个约定。", sign: "— X" },
    { type: "document", docTitle: "传票", html: `
<p class="doc-court">{court}</p>
<p class="doc-caption"><b>{X}</b>　v.　<b>{her}</b></p>
<h3>罪名：长大</h3>
<p>十年前的夏天，你和我拉钩：</p>
<p class="doc-zh"><b>"我保证永远不长大，每年生日都陪你玩。"</b></p>
<p>你收下了我的糖。</p>
<p>今天，你二十岁。</p>
<p class="doc-sign">今晚之前，给我一个答复。<br>— {X}</p>
<p class="doc-footnote">本案纯属虚构。</p>` },
    { type: "choice", prompt: "没有人会替你辩护。",
      options: [
        { label: "那我自己来。", feedback: "好。<br>从现在起，你是自己的律师。" },
        { label: "这是谁的恶作剧？", feedback: "信封背面，有一行很小的字：<br><i>\"不是恶作剧。\"</i><br><br>你只能自己来。" }
      ] },
    { type: "codeGive", text: "你不是一个人。<br>把<b>暗号</b>告诉你的助手：", code: "ch0_toAssistant" },
    { type: "gate", text: "输入助手的<b>暗号</b>：", code: "ch0_toCounsel",
      success: "{assistant} 在你身边。<br>TA 看得到一些你看不到的东西。" }
  ],
  assistant: [
    { type: "whisper", text: "{her} 今天会收到一封信。<br>寄信的人叫 {X}。<br><br>你知道的比她多。<br>别全说出来。" },
    { type: "gate", text: "输入她的<b>暗号</b>：", code: "ch0_toAssistant", success: "卷宗已打开。" },
    { type: "document", docTitle: "🔒 守则", html: `
<ol class="doc-paras">
<li>她问，你才说。</li>
<li>暗号用嘴说，不给她看屏幕。</li>
<li>到了下一个地点，再翻下一章。</li>
<li>保持神秘。</li>
</ol>
<h3>路线</h3>
<p>联邦大楼 → 历史博物馆 · 林肯公园 → 唱片店 → 晚餐 → Lincoln Lodge</p>` },
    { type: "codeGive", text: "把你的<b>暗号</b>告诉她：", code: "ch0_toCounsel" }
  ]
},

/* ============ 第一章 · 联邦大楼 ============ */
{
  id: "ch1", title: "第一章", subtitle: "红色的影子", place: "联邦大楼 · 219 S. Dearborn", pace: "ch1",
  counsel: [
    { type: "postcard", place: "FEDERAL PLAZA · 10:00", text: "蛋黄和蛋清，<br>有一个红色的远房亲戚。<br><br>它站在联邦大楼前，<br>从来不飞走。<br><br>下一封信，在它脚下。", sign: "— X" },
    { type: "gate", text: "它叫什么？", accept: ["FLAMINGO", "火烈鸟", "红鹤", "THE FLAMINGO"],
      success: "红色的《火烈鸟》。<br>它的影子里，压着一张纸条：<br><br><i>\"进去。看看他们是怎么审判别人的。\"</i>" },
    { type: "note", title: "旁听", text: "找一间正在开庭的法庭，坐到最后一排。<br><br>记住三件事：<br>☐ 有人说 <i>\"Objection\"</i><br>☐ 法官看向你<br>☐ 你听见自己的心跳" },
    { type: "choice", prompt: "传票在你手里。<br>你的第一步？",
      options: [
        { label: "撕掉它", score: -1, repeat: true,
          feedback: "你把传票撕成两半。<br><br>一分钟后，你的口袋里，又多了一张。<br>一模一样。<br><br><i>再选一次。</i>" },
        { label: "\"那年我才10岁，拉钩不算数。\"", score: 1,
          feedback: "法官看了你很久。<br><i>\"可是，X 说你18岁那晚，又答应了一次。\"</i><br><br>18岁那晚。<br>你想不起来了。" },
        { label: "\"没有人能不长大。\"", score: 1,
          feedback: "法官没有说话。<br>旁听席最后一排，有人轻轻笑了一声。<br><br>你回头。<br>座位是空的。" }
      ] },
    { type: "answerTable",
      prompt: "X 留下了几句话。<br>逐句回应。<br><small>不确定的，问助手。</small>",
      options: ["是真的", "是假的", "不知道"],
      paragraphs: [
        { text: "\"你不知道我是谁。\"", correct: "不知道", why: "你确实不知道。" },
        { text: "\"你和我拉过钩。\"", correct: "是真的", why: "你的日记里写着。" },
        { text: "\"你收了我的糖。\"", correct: "是真的", why: "日记里写着：超好吃。" },
        { text: "\"18岁那晚，你又答应了我一次。\"", correct: "是假的", why: "那晚你在KTV。你根本没想起这件事。" },
        { text: "\"长大，就是背叛。\"", correct: "是假的", why: "长大不是背叛。" }
      ] },
    { type: "award", flag: "exA" }, { type: "award", flag: "exB" },
    { type: "whisper", text: "你签下自己的名字。<br><br>墨水，比平时红一点。" },
    { type: "narration", title: "", text: "获得证物 <b>A</b>：2016年的日记<br>获得证物 <b>B</b>：18岁那晚的帖子" },
    { type: "photo", key: "ch1", prompt: "在红色的影子下，拍一张照片。" },
    { type: "codeGive", text: "告诉助手：", code: "ch1_toAssistant" }
  ],
  assistant: [
    { type: "document", docTitle: "🔒 证物档案", html: `
<h3>A · 2016年的日记</h3>
<div class="crayon">7月15日 晴<br>在公园遇到一个朋友。TA没有说名字。<br>我们拉钩了。我保证永远不长大。<br>TA给了我一颗糖。超好吃。<br>TA说，十年后会来找我。</div>
<h3>B · 18岁那晚的帖子</h3>
<div class="post">"18岁了，但我永远是个小孩"<br><small>2024.11.24 23:58 · 配图：KTV包厢</small></div>
<h3>X</h3>
<p>没有照片。没有名字。<br>日记之后的十年，没有任何记录。</p>
<p class="doc-footnote">🔑 第一章开头那道题（"它叫什么？"）：答案是 FLAMINGO。就是联邦大楼前广场上那座红色的大钢雕塑（Calder 的《火烈鸟》）。她卡住的话，可以提示："抬头，找红色的东西。"</p>` },
    { type: "gate", text: "输入她给你的暗号：", code: "ch1_toAssistant", success: "下一站：林肯公园。" }
  ]
},

/* ============ 第二章 · 林肯公园 ============ */
{
  id: "ch2", title: "第二章", subtitle: "墓园", place: "历史博物馆 · 林肯公园", pace: "ch2",
  counsel: [
    { type: "postcard", place: "1601 N. CLARK · 15:00", text: "你脚下这片草地，<br>以前是一座墓地。<br><br>他们搬走了大部分死者。<br><br><b>有一个，一直没走。</b>", sign: "— X" },
    { type: "timedAdmit", seconds: 90,
      prompt: "X 的问题，一个接一个出现在屏幕上。<br><small>90秒。不回答的，算你承认。</small>",
      items: [
        { text: "你和我拉过钩。", correct: "承认", why: "这是真的。" },
        { text: "18岁那晚，你想起了我。", correct: "否认", why: "你没有。" },
        { text: "你发那条帖子，是写给我的。", correct: "否认", why: "那只是KTV里的一句玩笑。" },
        { text: "你今天二十岁。", correct: "承认", why: "是的。" }
      ] },
    { type: "pickN", n: 2, prompt: "你可以问 X 两个问题。<br>他会把回答写在下一张纸上。",
      options: [
        { label: "你是谁？", reveal: "<i>\"你记忆里的某个夏天。\"</i>", score: 0 },
        { label: "你凭什么说我答应过？", reveal: "<i>\"那条帖子。\"</i><br>只有那一条。", score: 1 },
        { label: "协议上还写了什么？", reveal: "纸上什么都没写。<br>只有一块被擦掉的痕迹。", score: 1 },
        { label: "你现在在哪？", reveal: "<i>\"在你后面。\"</i>", score: -0.5 }
      ] },
    { type: "postcard", place: "LINCOLN PARK · 16:00", text: "协议原件，我交给了一个邻居保管。<br><br>他在这里住了一百多年。<br>他的名字，<br>刻在他家的门上。", sign: "— X" },
    { type: "gate", text: "那扇门上，刻着什么名字？", accept: ["COUCH", "IRA COUCH", "COUCH TOMB"],
      success: "COUCH。<br><br>石门紧闭。<br>门缝里，夹着一张泛黄的纸。<br>纸是干的。周围的草，是湿的。" },
    { type: "award", flag: "exD" },
    { type: "exhibitShow", flag: "exD", docTitle: "证物 D · 协议原件", html: `
<div class="crayon big">永远不长大协议<br><br>我保证永远不长大，<br>每年生日陪你玩。<br><br><span class="tiny">除非我变成一个很酷的大人。</span><br><br>— {her}，10岁</div>
<p class="doc-zh">最后一行小得几乎看不见。<br><b>X 从没提过它。</b></p>` },
    { type: "whisper", text: "有人一直在看你。<br><br>是证人 <b>W</b>。<br>TA 说，那晚TA也在。" },
    { type: "narration", title: "审问", text: "W 由你的助手扮演。<br><br>你最多问 <b>20</b> 个问题。<br>问\"是不是\"，TA 只回答\"是\"或\"不是\"。" },
    { type: "codeGive", text: "告诉助手：", code: "ch2_toAssistant" },
    { type: "gate", text: "问完了。输入助手的<b>暗号</b>：", code: "ch2_toCounsel" },
    { type: "quiz", prompt: "W 说了什么？",
      questions: [
        { q: "那晚你在哪？", options: ["一个陌生人家里", "KTV包厢", "公园"], correct: 1 },
        { q: "那晚，你记得那份协议吗？", options: ["记得", "完全不记得", "W 不确定"], correct: 1 },
        { q: "帖子下面，你还写了什么？", options: ["什么都没有", "\"但也是一个很酷的大人\"", "\"X，别来找我\""], correct: 1 }
      ], perCorrect: 1 },
    { type: "award", flag: "depo" },
    { type: "photo", key: "ch2", prompt: "在那扇门前，拍一张照片。<br><small>拍完之后，看看照片里有没有多出什么。</small>" },
    { type: "whisper", text: "天黑了。<br><br>公园里的鬼魂，<br>开始出来走动了。" }
  ],
  assistant: [
    { type: "gate", text: "她让W出场时，输入暗号：", code: "ch2_toAssistant" },
    { type: "document", docTitle: "🔒 你是证人 W", html: `
<p>你是她的朋友。18岁那晚的照片，是你拍的。</p>
<p><b>只回答她问到的。</b>说话慢一点，低一点。</p>
<ol class="doc-paras">
<li>那晚在 <b>KTV 包厢</b>，大家都很吵。</li>
<li>帖子是她随手发的。</li>
<li>她<b>完全不记得</b>什么协议。</li>
<li>帖子下面，她自己补了一句：<b>"但也是一个很酷的大人"</b>。</li>
<li>你不认识 X。<br>但那晚，包厢门口好像站着一个小孩。你以为是走错门的。</li>
</ol>
<p class="doc-footnote">如果她找不到门上的名字：答案是 COUCH（Couch Tomb，历史博物馆附近）。</p>` },
    { type: "counter", label: "她问了几个问题", max: 20 },
    { type: "codeGive", text: "问完了，告诉她<b>暗号</b>：", code: "ch2_toCounsel" }
  ]
},

/* ============ 第三章 · 唱片店 ============ */
{
  id: "ch3", title: "第三章", subtitle: "B面", place: "唱片店 · Wicker Park", pace: "ch3",
  counsel: [
    { type: "postcard", place: "MILWAUKEE AVE · 17:30", text: "去唱片店。<br><br>每张唱片都有一面，<br>没有人会去听。<br><br>我在 <b>B 面</b>等你。", sign: "— X" },
    { type: "document", docTitle: "B 面", html: `
<p class="doc-zh">我可以放过你。<br><br>条件是：<br><b>以后的每一个生日，你都要做一件从没做过的事。</b><br><br>否则，我每年都会来。</p>
<p class="doc-sign">— {X}</p>` },
    { type: "scoreCode", text: "把<b>暗号</b>告诉助手，问问 TA 怎么看：", codes: "ch3_strength" },
    { type: "choice", prompt: "你的回答？",
      options: [
        { label: "接受", flag: "settled", feedback: "唱片停了。<br><br>但店里的音乐，还在继续。<br>同一首歌，同一句，一遍，又一遍。<br><br><i>X 不想就这样结束。</i>" },
        { label: "拒绝", flag: "rejected", score: 0.5, feedback: "你把唱片放回去。<br><br>架子后面，有什么东西碰了一下你的手。" }
      ] },
    { type: "photo", key: "ch3", prompt: "挑一张唱片，拍下它的 B 面。" },
    { type: "codeGive", text: "告诉助手：", code: "ch4_toAssistant" }
  ],
  assistant: [
    { type: "gate", text: "输入她的<b>暗号</b>：", code: "ch3_strength" },
    { type: "evalMemo" }
  ]
},

/* ============ 第四章 · 开庭 ============ */
{
  id: "ch4", title: "第四章", subtitle: "开庭", place: "晚餐", pace: "ch4",
  counsel: [
    { type: "whisper", text: "法庭里很冷。<br>所有的钟，都停在 11:24。" },
    { type: "jurySelect", strikes: 3,
      prompt: "12个陪审员里，有些人不该在这里。<br>你可以<b>请走 3 个</b>。<br><small>他们说过什么，问助手。</small>",
      jurors: [
        { name: "1 · Margaret", job: "退休图书管理员", biased: false },
        { name: "2 · Tony", job: "糖果店老板", biased: true },
        { name: "3 · Priya", job: "夜班护士", biased: false },
        { name: "4 · Gus", job: "不记得自己几岁", biased: true },
        { name: "5 · Lena", job: "吉他老师", biased: false },
        { name: "6 · Dale", job: "从不照镜子", biased: true },
        { name: "7 · Sam", job: "末班车司机", biased: false },
        { name: "8 · Iris", job: "养了两只鸟：蛋黄和蛋清", biased: false }
      ] },
    { type: "choice", prompt: "你站起来。<br>所有人都在看你。",
      options: [
        { label: "\"十岁的约定，绑不住二十岁的人。而且，协议上写着：我可以离开。\"", score: 1.5, feedback: "8号陪审员 Iris 低声说：<br><i>\"蛋黄和蛋清，也长大了。\"</i>" },
        { label: "\"X，你出来。\"", score: 0, feedback: "灯闪了一下。<br>没有人出来。" },
        { label: "\"我什么都不记得。\"", score: -0.5, feedback: "法官：<i>\"那你就更该害怕了。\"</i>" }
      ] },
    { type: "objection",
      prompt: "X 戴着面具，走上证人席。<br>他的声音，像一个小孩。<br><br>听到不对的话，喊<b>异议</b>。",
      grounds: ["他在引导", "道听途说", "他在猜", "与本案无关"],
      lines: [
        { speaker: "X", text: "十年前的夏天，我们在公园拉了钩。", ground: null },
        { speaker: "X的律师", text: "被告是不是一个会抛弃朋友的人？", ground: 0, why: "问题里已经替证人回答了。" },
        { speaker: "X", text: "有人告诉我，她早就想忘掉我了。", ground: 1, why: "\"有人告诉我\"不能当证据。" },
        { speaker: "X", text: "我给了她一颗糖。", ground: null },
        { speaker: "X", text: "我猜，她每天晚上都梦见我。", ground: 2, why: "他不可能知道她梦见什么。" },
        { speaker: "X的律师", text: "你最喜欢的颜色是什么？", ground: 3, why: "这跟案子没有关系。" }
      ] },
    { type: "present", prompt: "X：<b>\"协议上，没有任何例外。\"</b><br><br>拿出一件证物：",
      correct: "exD", score: 2,
      success: "你把那张纸放在他面前，指着最后一行：<br><b>\"除非我变成一个很酷的大人。\"</b><br><br>面具后面，传来很轻的呼吸声。",
      fail: "不是这个。<br>你需要那张从门缝里拿到的纸。" },
    { type: "present", prompt: "X：<b>\"她18岁那晚，答应过我。\"</b><br><br>拿出一件证物：",
      correct: "depo", alt: "exB", score: 1.5, altScore: 0.5,
      success: "W 的证词：那晚在KTV，她根本不记得协议，还写了一句\"但也是一个很酷的大人\"。<br><br>X 低下了头。",
      altText: "帖子在这里。但它证明不了你那晚在想什么。W 的证词会更有用。",
      fail: "这个没用。" },
    { type: "pickN", n: 3, prompt: "最后陈述。<br>选三句。",
      options: [
        { label: "\"十岁的约定，不能绑住一个大人。\"", score: 1 },
        { label: "\"那晚，我根本不记得你。\"", score: 1 },
        { label: "\"协议写着：变成很酷的大人，就可以离开。我做到了。\"", score: 1 },
        { label: "\"没有人能不长大，你也一样。\"", score: 0.5 },
        { label: "\"你的糖太便宜了。\"", score: -0.5 },
        { label: "\"你连脸都不敢露。\"", score: -0.5 }
      ] },
    { type: "whisper", text: "陪审团退庭。<br><br>钟，开始走了。" },
    { type: "verdict" },
    { type: "codeGive", text: "告诉助手：", code: "ch5_toAssistant" }
  ],
  assistant: [
    { type: "gate", text: "输入她给你的暗号：", code: "ch4_toAssistant" },
    { type: "document", docTitle: "🔒 陪审员说过的话", html: `
<dl class="lawlib">
<dt>1 · Margaret</dt><dd>"我会看完每一页。"</dd>
<dt>2 · Tony</dt><dd>"收了糖，就得一直还。" ⚠️</dd>
<dt>3 · Priya</dt><dd>"我见过很多人长大，也见过很多人没能长大。"</dd>
<dt>4 · Gus</dt><dd>"我一直是这个年纪。一直都是。" ⚠️</dd>
<dt>5 · Lena</dt><dd>"我的学生们都走了。这是好事。"</dd>
<dt>6 · Dale</dt><dd>"镜子里的人，不是我。" ⚠️</dd>
<dt>7 · Sam</dt><dd>"末班车上，什么人都有。我两边都听。"</dd>
<dt>8 · Iris</dt><dd>"我家蛋黄和蛋清刚来的时候，那么小。"</dd>
</dl>` },
    { type: "document", docTitle: "🔒 小抄（可以小声提醒她）", html: `
<dl class="lawlib">
<dt>他在引导</dt><dd>问题里已经藏着答案。</dd>
<dt>道听途说</dt><dd>"有人告诉我……"</dd>
<dt>他在猜</dt><dd>"我猜她……"</dd>
<dt>与本案无关</dt><dd>跟案子没关系。</dd>
</dl>` },
    { type: "gate", text: "宣判后，输入：", code: "ch5_toAssistant" }
  ]
},

/* ============ 终章 · Lincoln Lodge ============ */
{
  id: "ch5", title: "终章", subtitle: "面具", place: "Lincoln Lodge · 2040 N. Milwaukee", pace: "ch5",
  counsel: [
    { type: "postcard", place: "2040 N. MILWAUKEE · 21:00", text: "今晚九点，<br>你会坐上另一个陪审席。<br><br>散场以后，<br>我会摘下面具。", sign: "— X" },
    { type: "gate", any: true, key: "comicVerdict", text: "散场了。<br>今晚，你们判了谁？", success: "记下了。" },
    { type: "whisper", text: "门外的街灯，一盏一盏灭了。<br><br>X 站在最后一盏下面。" },
    { type: "narration", title: "面具之下", text: "X 慢慢摘下面具。<br><br>是<b>{plaintiff}</b>。<br><br>手里还攥着那颗糖。" },
    { type: "narration", title: "", text: "<i>\"{plaintiffMessage}\"</i>" },
    { type: "gate", text: "输入助手的<b>暗号</b>，封存这个案子：", code: "ch5_toCounsel" },
    { type: "signature", who: "counsel", label: "{her}，签名" },
    { type: "signature", who: "assistant", label: "把手机交给助手，签名" },
    { type: "judgment" },
    { type: "dossier" },
    { type: "letter" }
  ],
  assistant: [
    { type: "codeGive", text: "散场后，告诉她<b>暗号</b>：", code: "ch5_toCounsel" },
    { type: "narration", title: "最后", text: "她会把手机交给你签名。<br>然后，拆开你的信。" }
  ]
}
];
