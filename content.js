/* =========================================================================
   第二十号档案 · CASE FILE NO. 20
   所有剧情、名字、密码、地点都在这里。改这个文件就行。
   占位符：{her} {assistant} {X} {plaintiff} {caseNo}
   ========================================================================= */

const CONFIG = {
  herName: "Aileen",
  assistantName: "Sunny Wu",
  plaintiffName: "Mr. X",
  plaintiffReveal: "十岁的你",
  plaintiffMessage: "我在那个夏天等了你十年。<br>我只是想知道——<br>长大以后的你，还会不会好好地玩。<br><br>现在我知道了。<br>生日快乐。",
  caseNo: "2026-L-011124",
  courtName: "THE CIRCUIT COURT OF TIME",
  courtNameZh: "时间巡回法院",
  letter:
`{her}：

案子是假的。
可今天走过的每一条街，
看过的每一样东西，
都是真的。

二十岁快乐。

{assistant}`,
  giftHint: "",   // 例如 "最后一件证物，在你书包最里面的口袋里。" 留空就不显示

  /* ---- 定位 ----
     useGeo: true  = 到了指定地点才能继续（两部手机都要定位）
     useGeo: false = 关闭定位，测试时用
     radius 单位是米。坐标可以在 Google Maps 上右键地点复制。          */
  useGeo: true,
  places: {
    plaza:  { name: "联邦广场 · 火烈鸟",      lat: 41.8789, lng: -87.6298, radius: 250 },
    tomb:   { name: "历史博物馆后 · Couch 墓", lat: 41.9132, lng: -87.6318, radius: 300 },
    vinyl:  { name: "Reckless Records",        lat: 41.9075, lng: -87.6735, radius: 500 },
    lodge:  { name: "Lincoln Lodge",           lat: 41.9182, lng: -87.6902, radius: 300 }
  },

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
    geoOverride:     "HERE",     // 定位失败时的备用暗号（只显示在助手手机上）
    pace: { ch1: "", ch2: "", ch3: "", ch4: "", ch5: "" }
  }
};

/* 物证：每件证物会装在一个"物证袋"里显示。
   img：可以放真实照片，例如把照片放进 assets 文件夹，写 "assets/diary.jpg"。
        留空 "" 就用游戏自己画的版本。                                    */
const EXHIBITS = {
  exA: { name: "A · 2016年夏天的日记", item: "A", place: "被告的旧书架", date: "2016.07.15", img: "",
         html: `<div class="ev-diary"><div class="ev-date">7月15日　晴</div>在公园遇见一个朋友。<br>TA不肯说名字。<br>我们拉钩了。<br>我保证永远不长大。<br>TA给了我一颗糖，超好吃。<br>TA说，十年以后会回来找我。</div>` },
  exB: { name: "B · 十八岁那晚的帖子", item: "B", place: "社交媒体 · 截图", date: "2024.11.24 23:58", img: "",
         html: `<div class="ev-phone"><div class="ev-phone-bar">23:58</div><div class="ev-post-img">KTV · 包厢 302</div><div class="ev-post-text">18岁了，但我永远是个小孩</div><div class="ev-post-comment">评论 · 1　<span class="ev-blur">████████████</span></div></div>` },
  exD: { name: "D · 协议原件", item: "D", place: "林肯公园 · Couch 墓门缝", date: "2026.11.24", img: "",
         html: `<div class="crayon big">永远不长大协议<br><br>我保证永远不长大，<br>每年生日陪你玩。<br><br><span class="tiny">除非我变成一个很酷的大人。</span><br><br>— {her}，十岁</div>` },
  depo: { name: "W · 证人W的证词", item: "W", place: "林肯公园", date: "2026.11.24", img: "",
         html: `<div class="ev-transcript"><div class="ev-stamp">DEPOSITION</div>问：那晚你在哪里？<br>答：KTV 包厢。<br>问：她记得那份协议吗？<br>答：不记得。<br>问：门口有人吗？<br>答：……有一个小孩。</div>` }
};

const CHAPTERS = [

/* ============ 序章 ============ */
{
  id: "ch0", title: "序章", subtitle: "火漆", place: "清晨 · 门口",
  counsel: [
    { type: "whisper", text: "天还没亮透。<br>门口躺着一个信封。<br><br>没有邮票，没有寄件人。<br>封口的火漆，还是温的。" },
    { type: "postcard", place: "CHICAGO · 06:00", text: "{her}，<br>好久不见。<br><br>你大概已经忘了我。<br>可你欠我的东西，<br>我一直记着。", sign: "— X" },
    { type: "document", docTitle: "传票", html: `
<p class="doc-court">{court}</p>
<p class="doc-caption"><b>{X}</b>　v.　<b>{her}</b></p>
<h3>案由：长大</h3>
<p>十年前的那个夏天，被告伸出小指，与原告立下约定：</p>
<p class="doc-zh"><b>"我保证永远不长大，每年生日都陪你玩。"</b></p>
<p>被告收下了原告的一颗糖，作为信物。</p>
<p>今日，被告年满二十。</p>
<p class="doc-sign">日落之前，给我一个交代。<br>— {X}</p>
<p class="doc-footnote">本案纯属虚构。</p>` },
    { type: "choice", prompt: "没有人会替你出庭。",
      options: [
        { label: "那就我自己来。", feedback: "很好。<br>从这一刻起，你是被告，也是自己的律师。" },
        { label: "这是谁的恶作剧？", feedback: "你把信封翻过来。<br>背面有一行极小的字：<br><br><i>\"不是。\"</i>" }
      ] },
    { type: "codeGive", text: "你不是一个人。<br>把<b>暗号</b>告诉你的助手。", code: "ch0_toAssistant" },
    { type: "gate", text: "助手会告诉你另一个<b>暗号</b>：", code: "ch0_toCounsel",
      success: "{assistant} 会一直在你身边。<br>有些东西，只有 TA 看得见。" }
  ],
  assistant: [
    { type: "whisper", text: "今天，{her} 会收到一封信。<br>署名是 {X}。<br><br>你知道的，比她多。<br>别一次全说出来。" },
    { type: "gate", text: "输入她告诉你的<b>暗号</b>：", code: "ch0_toAssistant", success: "卷宗已经打开。" },
    { type: "document", docTitle: "🔒 守则", html: `
<ol class="doc-paras">
<li>她问，你才答。</li>
<li>暗号用嘴说，别把屏幕给她看。</li>
<li>每一章都要两个人<b>到了地方</b>，手机定位通过，才能翻开。</li>
<li>定位失败时，备用暗号是 <b>${CONFIG.codes.geoOverride}</b>。只在真的到了却定位不准的时候用。</li>
<li>保持神秘。</li>
</ol>
<h3>路线</h3>
<p>联邦广场 → 历史博物馆 · 林肯公园 → Reckless Records → 晚餐 → Lincoln Lodge</p>` },
    { type: "codeGive", text: "把你的<b>暗号</b>告诉她：", code: "ch0_toCounsel" }
  ]
},

/* ============ 第一章 · 联邦广场 ============ */
{
  id: "ch1", title: "第一章", subtitle: "红色的影子", place: "联邦广场 · 219 S. Dearborn", pace: "ch1",
  counsel: [
    { type: "postcard", place: "FEDERAL PLAZA · 10:00", text: "蛋黄和蛋清，<br>有一个红色的远房亲戚。<br><br>它站在法院对面的广场上，<br>比周围的楼还要醒目，<br>五十年来，一步也没走开过。<br><br>去见见它。", sign: "— X" },
    { type: "geo", place: "plaza", text: "去广场。<br>站到它的影子里。" },
    { type: "gate", text: "它叫什么？", accept: ["FLAMINGO", "火烈鸟", "红鹤", "THE FLAMINGO"],
      success: "Calder 的《火烈鸟》。<br>它的影子里压着一张纸条，墨迹未干：<br><br><i>\"进去。看看他们怎么审判别人。\"</i>" },
    { type: "note", title: "旁听", text: "找一间正在开庭的法庭，坐在最后一排。<br>不要说话。<br><br>☐ 听到一次 <i>\"Objection.\"</i><br>☐ 法官看了你一眼<br>☐ 你听见了自己的心跳" },
    { type: "choice", prompt: "传票在你手里。<br>你要怎么回应？",
      options: [
        { label: "撕了它", score: -1, repeat: true,
          feedback: "纸被撕成两半，落在地上。<br><br>你走出几步，手伸进口袋——<br>那里又有一张。<br>完好如初。" },
        { label: "\"那年我才十岁。小孩的约定，不算数。\"", score: 1,
          feedback: "法官沉默了很久，才开口：<br><i>\"可他说，十八岁那晚，你又答应了他一次。\"</i><br><br>十八岁那晚。<br>你一点也想不起来了。" },
        { label: "\"没有人能不长大。\"", score: 1,
          feedback: "法官没有回答。<br>旁听席最后一排，有人轻轻笑了一声。<br><br>你回过头。<br>那里没有人。" }
      ] },
    { type: "answerTable",
      prompt: "X 的陈述，一句一句写在纸上。<br>你需要逐句回应。<br><small>拿不准的，问你的助手。</small>",
      options: ["属实", "不实", "不知"],
      paragraphs: [
        { text: "\"你不知道我是谁。\"", correct: "不知", why: "你确实不知道。" },
        { text: "\"你和我拉过钩。\"", correct: "属实", why: "日记里写得清清楚楚。" },
        { text: "\"你收下了我的糖。\"", correct: "属实", why: "日记里说：超好吃。" },
        { text: "\"十八岁那晚，你又答应了我一次。\"", correct: "不实", why: "那晚你在KTV，根本没有想起这件事。" },
        { text: "\"长大，就是背叛。\"", correct: "不实", why: "长大不是背叛。" }
      ] },
    { type: "award", flag: "exA" }, { type: "award", flag: "exB" },
    { type: "whisper", text: "你在最后一页签下名字。<br><br>墨水，比平时红了一点。" },
    { type: "bag", items: ["exA", "exB"], text: "两件物证，封入袋中。" },
    { type: "photo", key: "ch1", prompt: "在红色的影子下，留一张照片。" },
    { type: "codeGive", text: "告诉助手：", code: "ch1_toAssistant" }
  ],
  assistant: [
    { type: "geo", place: "plaza", text: "跟她一起，去广场。" },
    { type: "bag", items: ["exA", "exB"], text: "🔒 只有你看得见。她问起时，再念给她听。", noAward: true },
    { type: "document", docTitle: "🔒 关于 X", html: `
<h3>X</h3>
<p>没有照片，没有名字。<br>日记之后的十年，什么记录都没有。</p>
<p class="doc-footnote">🔑 "它叫什么？"——答案是 FLAMINGO：广场中央那座红色的大钢雕，Calder 的《火烈鸟》。她卡住了，就提示一句："抬头，找红色。"</p>` },
    { type: "gate", text: "输入她给你的暗号：", code: "ch1_toAssistant", success: "下一站：林肯公园。" }
  ]
},

/* ============ 第二章 · 林肯公园 ============ */
{
  id: "ch2", title: "第二章", subtitle: "墓园", place: "历史博物馆 · 林肯公园", pace: "ch2",
  counsel: [
    { type: "postcard", place: "1601 N. CLARK · 15:00", text: "你脚下的草地，<br>一百五十年前是一座墓园。<br><br>后来，他们把死者都迁走了。<br><br><b>只有一位，没有走。</b>", sign: "— X" },
    { type: "geo", place: "tomb", text: "去博物馆的后面。<br>那位邻居，在等你。" },
    { type: "timedAdmit", seconds: 90,
      prompt: "屏幕暗了一下。<br>X 的问题一个接一个浮现。<br><small>九十秒。沉默，就是承认。</small>",
      items: [
        { text: "你和我拉过钩。", correct: "承认", why: "这是真的。" },
        { text: "十八岁那晚，你想起了我。", correct: "否认", why: "你没有。" },
        { text: "那条帖子，是写给我的。", correct: "否认", why: "那只是KTV里随口的一句玩笑。" },
        { text: "你今天，二十岁了。", correct: "承认", why: "是的。" }
      ] },
    { type: "pickN", n: 2, prompt: "你可以问他两个问题。<br>他会把答案留在下一张纸上。",
      options: [
        { label: "你是谁？", reveal: "<i>\"某个夏天。\"</i>", score: 0 },
        { label: "你凭什么说我答应过？", reveal: "<i>\"那条帖子。\"</i><br>他只有这一条。", score: 1 },
        { label: "协议上，还写了什么？", reveal: "纸上什么也没写。<br>只有一道被橡皮擦过的痕迹。", score: 1 },
        { label: "你现在在哪？", reveal: "<i>\"别回头。\"</i>", score: -0.5 }
      ] },
    { type: "postcard", place: "LINCOLN PARK · 16:00", text: "协议的原件，<br>我托一位老邻居保管。<br><br>他住在博物馆后面，<br>已经住了一百六十多年，<br>从没出过门。<br><br>他的名字，刻在门楣上。", sign: "— X" },
    { type: "gate", text: "门楣上，刻着什么名字？", accept: ["COUCH", "IRA COUCH", "COUCH TOMB"],
      success: "COUCH。<br><br>石门锈死了，铁栏冰凉。<br>门缝里夹着一张泛黄的纸。<br>四周的草都是湿的，<br>只有那张纸，是干的。" },
    { type: "award", flag: "exD" },
    { type: "bag", items: ["exD"], text: "最后一行，小得几乎看不见。<br><b>X 从来没有提过它。</b>" },
    { type: "whisper", text: "你感觉到有人在看你。<br><br>是 <b>W</b>。<br>TA 说，十八岁那晚，TA 也在。" },
    { type: "narration", title: "质询", text: "W 由你的助手扮演。<br><br>你最多可以问 <b>二十</b> 个问题。<br>问\"是不是\"，TA 只会答\"是\"或\"不是\"。" },
    { type: "codeGive", text: "告诉助手，请 W 入座：", code: "ch2_toAssistant" },
    { type: "gate", text: "问完了，输入助手的<b>暗号</b>：", code: "ch2_toCounsel" },
    { type: "quiz", prompt: "W 说了什么？",
      questions: [
        { q: "那晚，你在哪里？", options: ["一个陌生人家里", "KTV 包厢", "公园"], correct: 1 },
        { q: "那晚，你记得那份协议吗？", options: ["记得", "完全不记得", "W 也不确定"], correct: 1 },
        { q: "帖子下面，你还补了一句什么？", options: ["什么也没有", "\"但也是一个很酷的大人\"", "\"X，别来找我\""], correct: 1 }
      ], perCorrect: 1 },
    { type: "award", flag: "depo" },
    { type: "bag", items: ["depo"], text: "证词封存。" },
    { type: "photo", key: "ch2", prompt: "在那扇门前，留一张照片。<br><small>拍完，放大看看。</small>" },
    { type: "whisper", text: "天色暗下来了。<br><br>公园里的那些人，<br>开始出来走动。" }
  ],
  assistant: [
    { type: "geo", place: "tomb", text: "跟她一起，去博物馆后面。" },
    { type: "gate", text: "她请 W 入座时，输入暗号：", code: "ch2_toAssistant" },
    { type: "document", docTitle: "🔒 你是证人 W", html: `
<p>你是她的朋友。十八岁那晚的照片，是你拍的。</p>
<p><b>只回答她问到的。</b>声音放低，说慢一点。</p>
<ol class="doc-paras">
<li>那晚在 <b>KTV 包厢</b>，很吵。</li>
<li>帖子是她随手发的。</li>
<li>她<b>完全不记得</b>什么协议。</li>
<li>帖子下面，她自己补了一句：<b>"但也是一个很酷的大人"</b>。</li>
<li>你不认识 X。<br>不过那晚，包厢门口好像站过一个小孩。你以为是走错门的。</li>
</ol>
<p class="doc-footnote">如果她找不到门楣上的名字：答案是 COUCH。Couch Tomb 就在历史博物馆正后方、LaSalle Drive 的弯道旁，一座带铁栏的小石屋，门楣上刻着 "COUCH"。</p>` },
    { type: "counter", label: "她问了几个问题", max: 20 },
    { type: "codeGive", text: "问完了，告诉她<b>暗号</b>：", code: "ch2_toCounsel" }
  ]
},

/* ============ 第三章 · 唱片店 ============ */
{
  id: "ch3", title: "第三章", subtitle: "B 面", place: "Reckless Records · 1379 N. Milwaukee", pace: "ch3",
  counsel: [
    { type: "postcard", place: "MILWAUKEE AVE · 17:30", text: "去唱片店。<br><br>每一张唱片，<br>都有一面没人听。<br><br>我在 <b>B 面</b>等你。", sign: "— X" },
    { type: "geo", place: "vinyl", text: "去 Milwaukee Avenue 上那家唱片店。" },
    { type: "document", docTitle: "B 面", html: `
<p class="doc-zh">我可以放过你。<br><br>只有一个条件：<br><b>此后每一个生日，你都要做一件从没做过的事。</b><br><br>否则，我每年都会回来。</p>
<p class="doc-sign">— {X}</p>` },
    { type: "scoreCode", text: "把<b>暗号</b>告诉助手，听听 TA 的判断：", codes: "ch3_strength" },
    { type: "choice", prompt: "你的回答？",
      options: [
        { label: "接受", flag: "settled", feedback: "唱针抬起来了。<br><br>可店里的音乐没有停。<br>同一首歌，同一句，一遍，又一遍。<br><br><i>X 还不想结束。</i>" },
        { label: "拒绝", flag: "rejected", score: 0.5, feedback: "你把唱片放回架子。<br><br>架子后面，有什么东西轻轻碰了一下你的手指。" }
      ] },
    { type: "photo", key: "ch3", prompt: "挑一张唱片，拍下它的 B 面。" },
    { type: "codeGive", text: "告诉助手：", code: "ch4_toAssistant" }
  ],
  assistant: [
    { type: "geo", place: "vinyl", text: "跟她一起，去唱片店。" },
    { type: "gate", text: "输入她的<b>暗号</b>：", code: "ch3_strength" },
    { type: "evalMemo" }
  ]
},

/* ============ 第四章 · 开庭 ============ */
{
  id: "ch4", title: "第四章", subtitle: "开庭", place: "晚餐", pace: "ch4",
  counsel: [
    { type: "whisper", text: "法庭很冷。<br>墙上所有的钟，<br>都停在 11:24。" },
    { type: "jurySelect", strikes: 3,
      prompt: "十二个陪审员里，有几个人不该坐在这里。<br>你可以<b>请走三个</b>。<br><small>他们说过什么，问助手。</small>",
      jurors: [
        { name: "1 · Margaret", job: "退休图书管理员", biased: false },
        { name: "2 · Tony", job: "糖果店老板", biased: true },
        { name: "3 · Priya", job: "夜班护士", biased: false },
        { name: "4 · Gus", job: "记不清自己几岁", biased: true },
        { name: "5 · Lena", job: "吉他老师", biased: false },
        { name: "6 · Dale", job: "从不照镜子", biased: true },
        { name: "7 · Sam", job: "末班车司机", biased: false },
        { name: "8 · Iris", job: "养着两只鸟：蛋黄和蛋清", biased: false }
      ] },
    { type: "choice", prompt: "你站起来。<br>所有的目光都落在你身上。",
      options: [
        { label: "\"十岁的约定，绑不住二十岁的人。何况，协议上写着——我可以走。\"", score: 1.5, feedback: "八号陪审员 Iris 垂下眼睛，轻声说：<br><i>\"蛋黄和蛋清，也长大了。\"</i>" },
        { label: "\"X，你出来。\"", score: 0, feedback: "灯闪了一下。<br>没有人出来。" },
        { label: "\"我什么都不记得了。\"", score: -0.5, feedback: "法官看着你：<br><i>\"那你更该害怕。\"</i>" }
      ] },
    { type: "objection",
      prompt: "X 戴着面具走上证人席。<br>他的声音，很像一个小孩。<br><br>听到不对的话，喊<b>异议</b>。",
      grounds: ["他在引导", "道听途说", "他在揣测", "与本案无关"],
      lines: [
        { speaker: "X", text: "十年前的夏天，我们在公园拉了钩。", ground: null },
        { speaker: "X 的律师", text: "被告是不是一个会抛下朋友的人？", ground: 0, why: "问题里已经替证人把答案说完了。" },
        { speaker: "X", text: "有人告诉我，她早就想忘掉我了。", ground: 1, why: "\"有人告诉我\"，不能当作证据。" },
        { speaker: "X", text: "我给了她一颗糖。", ground: null },
        { speaker: "X", text: "我猜，她每天夜里都会梦见我。", ground: 2, why: "他不可能知道她梦见了什么。" },
        { speaker: "X 的律师", text: "你最喜欢什么颜色？", ground: 3, why: "这与本案毫无关系。" }
      ] },
    { type: "present", prompt: "X：<b>\"协议上，没有任何例外。\"</b><br><br>出示一件证物：",
      correct: "exD", score: 2,
      success: "你把那张纸推到他面前，指尖停在最后一行：<br><b>\"除非我变成一个很酷的大人。\"</b><br><br>面具后面，只剩下很轻的呼吸声。",
      fail: "不是这个。<br>你需要那张从门缝里拿到的纸。" },
    { type: "present", prompt: "X：<b>\"十八岁那晚，她答应过我。\"</b><br><br>出示一件证物：",
      correct: "depo", alt: "exB", score: 1.5, altScore: 0.5,
      success: "W 的证词：那晚在 KTV，她根本不记得什么协议，还写了一句\"但也是一个很酷的大人\"。<br><br>X 慢慢低下了头。",
      altText: "帖子在这里。可它证明不了你那晚在想什么。W 的证词会更有力。",
      fail: "这个帮不了你。" },
    { type: "pickN", n: 3, prompt: "最后陈述。<br>选三句话。",
      options: [
        { label: "\"十岁的约定，不该绑住一个大人。\"", score: 1 },
        { label: "\"那晚，我根本不记得你。\"", score: 1 },
        { label: "\"协议写着：成为很酷的大人，就可以离开。我做到了。\"", score: 1 },
        { label: "\"没有人能不长大，你也一样。\"", score: 0.5 },
        { label: "\"你的糖，太便宜了。\"", score: -0.5 },
        { label: "\"你连脸都不敢露。\"", score: -0.5 }
      ] },
    { type: "whisper", text: "陪审团退庭。<br><br>墙上的钟，<br>开始走了。" },
    { type: "verdict" },
    { type: "codeGive", text: "告诉助手：", code: "ch5_toAssistant" }
  ],
  assistant: [
    { type: "gate", text: "输入她给你的暗号：", code: "ch4_toAssistant" },
    { type: "document", docTitle: "🔒 陪审员说过的话", html: `
<dl class="lawlib">
<dt>1 · Margaret</dt><dd>"每一页我都会看完。"</dd>
<dt>2 · Tony</dt><dd>"收了糖，就得一直还下去。" ⚠️</dd>
<dt>3 · Priya</dt><dd>"我见过很多人长大，也见过有人没能长大。"</dd>
<dt>4 · Gus</dt><dd>"我一直是这个年纪。一直都是。" ⚠️</dd>
<dt>5 · Lena</dt><dd>"我的学生都走了。这是好事。"</dd>
<dt>6 · Dale</dt><dd>"镜子里那个人，不是我。" ⚠️</dd>
<dt>7 · Sam</dt><dd>"末班车上什么人都有。我两边都听。"</dd>
<dt>8 · Iris</dt><dd>"蛋黄和蛋清刚到我家的时候，那么小。"</dd>
</dl>` },
    { type: "document", docTitle: "🔒 小抄（可以低声提醒她）", html: `
<dl class="lawlib">
<dt>他在引导</dt><dd>问题里已经藏着答案。</dd>
<dt>道听途说</dt><dd>"有人告诉我……"</dd>
<dt>他在揣测</dt><dd>"我猜她……"</dd>
<dt>与本案无关</dt><dd>跟案子没有关系。</dd>
</dl>` },
    { type: "gate", text: "宣判之后，输入：", code: "ch5_toAssistant" }
  ]
},

/* ============ 终章 · Lincoln Lodge ============ */
{
  id: "ch5", title: "终章", subtitle: "面具", place: "Lincoln Lodge · 2040 N. Milwaukee", pace: "ch5",
  counsel: [
    { type: "postcard", place: "2040 N. MILWAUKEE · 21:00", text: "今晚九点，<br>你会坐上另一张陪审席。<br><br>散场之后，<br>我会摘下面具。", sign: "— X" },
    { type: "geo", place: "lodge", text: "去 Lincoln Lodge。" },
    { type: "gate", any: true, key: "comicVerdict", text: "散场了。<br>今晚，你们判了谁？", success: "已记入卷宗。" },
    { type: "whisper", text: "门外的街灯，一盏一盏地熄灭。<br><br>X 站在最后一盏下面。" },
    { type: "narration", title: "面具之下", text: "X 抬起手，慢慢摘下面具。<br><br>是<b>{plaintiff}</b>。<br><br>手心里，还攥着那颗糖。" },
    { type: "narration", title: "", text: "<i>\"{plaintiffMessage}\"</i>" },
    { type: "gate", text: "输入助手的<b>暗号</b>，封存此案：", code: "ch5_toCounsel" },
    { type: "signature", who: "counsel", label: "{her}，请签名" },
    { type: "signature", who: "assistant", label: "把手机交给助手，请 TA 签名" },
    { type: "judgment" },
    { type: "dossier" },
    { type: "letter" }
  ],
  assistant: [
    { type: "geo", place: "lodge", text: "跟她一起，去 Lincoln Lodge。" },
    { type: "codeGive", text: "散场后，告诉她<b>暗号</b>：", code: "ch5_toCounsel" },
    { type: "narration", title: "最后", text: "她会把手机交给你签名。<br>然后，拆开你的信。" }
  ]
}
];
