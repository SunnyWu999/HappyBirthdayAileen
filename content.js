/* =========================================================================
   第二十号档案 · CASE FILE NO. 20
   所有剧情、名字、密码、地点、照片都在这里。改这个文件就行。
   占位符：{her} {herZh} {assistant} {X} {plaintiff} {caseNo}
   ========================================================================= */

const W = (f) => "https://upload.wikimedia.org/wikipedia/commons/" + f;   // 维基共享资源图片

const CONFIG = {
  herName: "Aileen",
  herNameZh: "关傲予",
  assistantName: "Sunny Wu",
  plaintiffName: "Mr. X",
  plaintiffReveal: "蛋清和蛋黄",
  plaintiffMessage: "我们不知道什么是爱。<br>我们只知道，你笑的时候，<br>整个房间都会亮一点。<br><br>所以我们只想要一件事——<br>你要快乐。<br><br>二十岁生日快乐。",
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
  giftHint: "还有四件证物，不在卷宗里。<br>它们在你的助手那里。",

  /* ---- 定位 ---- 到了才能继续（两部手机都要）。测试时可改成 false */
  useGeo: true,
  places: {
    plaza:  { name: "联邦广场 · 火烈鸟",      lat: 41.8788, lng: -87.6297, radius: 250 },
    tomb:   { name: "历史博物馆后 · Couch 墓", lat: 41.9132, lng: -87.6318, radius: 300 },
    vinyl:  { name: "Reckless Records",        lat: 41.9075, lng: -87.6735, radius: 500 },
    lodge:  { name: "Lincoln Lodge",           lat: 41.9182, lng: -87.6902, radius: 300 }
  },

  /* ---- 暗号（数组 = 几种写法都算对；口头报的时候说第一个）---- */
  codes: {
    ch0_toAssistant: ["1124", "11.24"],         // 她的生日
    ch0_toCounsel:   ["2006"],                   // 她出生的年份
    ch1_toAssistant: ["北京", "BEIJING"],         // 她生活的城市
    ch2_toAssistant: ["0914", "9.14", "914"],     // 我们认识的那天
    ch2_toCounsel:   ["天亮了", "天亮请睁眼"],
    ch3_strength:   { strong: "预言家", medium: "猎人", weak: "平民" },  // 证据强度
    ch3_toAssistant: ["鲜花", "《鲜花》"],
    ch5_toAssistant: ["20", "二十"],
    geoOverride:     "520",                      // 定位失败时的备用暗号（只在助手手机上）
    pace: { ch1: "", ch2: "", ch3: "", ch4: "", ch5: "" }
  },

  /* 背景照片的来源（Wikimedia Commons，CC 授权） */
  credits: [
    ["Calder's Flamingo", "https://commons.wikimedia.org/wiki/File:Calder-flamingo.jpg"],
    ["Chicago Federal Center", "https://commons.wikimedia.org/wiki/File:Chicago_Federal_Center.jpg"],
    ["Couch Tomb", "https://commons.wikimedia.org/wiki/File:Couch_Tomb_Lincoln_Park_Chicago_Illinois_2020-9468.jpg"],
    ["Chicago History Museum", "https://commons.wikimedia.org/wiki/File:Chicago_History.JPG"],
    ["Wicker Park", "https://commons.wikimedia.org/wiki/File:Wicker_Park,_Chicago.jpg"],
    ["CTA at night", "https://commons.wikimedia.org/wiki/File:CTA_Night.jpg"],
    ["Chicago River at night", "https://commons.wikimedia.org/wiki/File:Chicago_River_night.jpg"],
    ["Logan Square", "https://commons.wikimedia.org/wiki/File:Logan_Square_(7979593889).jpg"]
  ]
};

/* ---- 二十片记忆：一路收集，最后拼成一封信 ----
   img：褪色照片（assets/mem/）。"" = 不配照片；"none" = 一个空相框（那次没拍照）。 */
const FRAGMENTS = [
  { text: "2023.9.14 · 在 ADV dinner 上，吴妍曦正式认识了关傲予。这个人也太搞笑了，一言不合就陪我跟踪别人。", img: "assets/mem/m01.jpg" },
  { text: "2023.10.27 · 吴妍曦人生中的第一个 livehouse。2026 年 8 月，又去了人生中最震撼的一场。两场都是和关傲予一起。谢谢她，总是拉着我去感受新东西。", img: "assets/mem/m02.jpg" },
  { text: "2023.11.24 · 陪关傲予过的第一个生日。", img: "assets/mem/m03.jpg" },
  { text: "2024.1.30 · 在 Keystone Idol 一起上台表演。我划掉了「20 岁之前要做的事」清单上的第一件。", img: "" },
  { text: "2024.2.14 · 第一次和朋友出去旅行：洛阳！好玩捏。", img: "assets/mem/m05.jpg" },
  { text: "2024.4.21 · 哈佛，我们来啦！", img: "assets/mem/m06.jpg" },
  { text: "2024.5.31 · 关傲予陪我过的第一个生日！喜欢！！在酒店过生日的传统，就此种下了，哈哈哈哈。", img: "assets/mem/m07.jpg" },
  { text: "2024.6.9 · 人生中第一个漫展，哇啊啊啊。", img: "assets/mem/m08.jpg" },
  { text: "2024.11.24 · 第二个生日！没有照片，不嘻嘻……", img: "none" },
  { text: "2025.1.1 · 2025 年的第一个太阳，是一起看的。", img: "" },
  { text: "2025.2.5 · 用一年之约，赴十年之约。", img: "assets/mem/m11.jpg" },
  { text: "2025.5.25 · 我们毕业啦！", img: "assets/mem/m12.jpg" },
  { text: "2025.6.12 · 西藏，我们来啦！少年游～", img: "assets/mem/m13.jpg" },
  { text: "2025.8.8 · 浙江，我还会再回来的。", img: "assets/mem/m14.jpg" },
  { text: "2025.11.25 · 我们又见面啦～可这次生日，没能和你一起过 😭", img: "assets/mem/m15.jpg" },
  { text: "2025.12.24 · 是谁，把你送来我的家乡～", img: "assets/mem/m16.jpg" },
  { text: "2026.1.1 · 一起跨年。", img: "assets/mem/m17.jpg" },
  { text: "2026.3.22 · 夏威夷。我一直在哭。", img: "assets/mem/m18.jpg" },
  { text: "2026.3.28 · 波士顿。我一直在哭。", img: "assets/mem/m19.jpg" },
  { text: "2026.11.24 · 二十岁。这一页，今天正在写。", img: "" }
];

/* ---- 终章的四件实物（我送她的）---- */
const GIFTS = [
  { name: "人物肖像衣服", note: "画的是谁，你一看就知道。" },
  { name: "黄金蛋糕", note: "二十岁，配得上一块金子。" },
  { name: "手写书 · 拍立得", note: "每一页，都是证据。" },
  { name: "吉他支架", note: "让你的吉他，也有个地方靠一靠。" }
];

/* 物证：img 可以放 assets 里的真实照片；留空就用画出来的版本 */
const EXHIBITS = {
  exX: { name: "X · 门口的信封", item: "X", place: "被告家门口", date: "2026.11.24 06:00", img: "assets/sleeve-x.jpg" },
  exA: { name: "A · 小时候的日记", item: "A", place: "被告的旧书架", date: "很多年前的夏天", img: "assets/diary.jpg" },
  exB: { name: "B · 十八岁那晚的帖子", item: "B", place: "社交媒体 · 截图", date: "2024.11.24 23:58", img: "",
         html: `<div class="ev-phone"><div class="ev-phone-bar">23:58</div><img class="ev-post-photo" src="assets/ktv.jpg" alt="KTV"><div class="ev-post-text">18岁了，但我永远是个小孩</div><div class="ev-post-comment">评论 · 1　<span class="ev-blur">████████████</span></div></div>` },
  exD: { name: "D · 协议原件", item: "D", place: "林肯公园 · Couch 墓门缝", date: "签于她带它回家的那天", img: "",
         html: `<div class="crayon big">永远不长大协议<br><br>我保证永远不长大，<br>每天都陪你玩。<br><br><span class="tiny">除非我变成一个很酷的大人。</span><br><br>— 关傲予<br><span class="feet">ψ ψ</span></div>` },
  depo: { name: "W · 证人W的证词", item: "W", place: "林肯公园", date: "2026.11.24", img: "",
         html: `<div class="ev-transcript"><div class="ev-stamp">DEPOSITION</div>每年 11 月 24 日，<br>她都吹两次蜡烛。<br>一次跟着北京，<br>一次跟着芝加哥。<br>走得再远，<br>家里的生日歌，她都听得见。</div>` },
  card: { name: "C · 一张狼人杀卡牌", item: "C", place: "被告送给助手的", date: "—", img: "assets/wolf-card.webp" },
  cafe: { name: "E · 积木咖啡店", item: "E", place: "被告送给助手的", date: "—", img: "",
         html: `<div class="ev-gift">☕<br><b>积木咖啡店</b><br><small>一块一块拼起来的</small></div>` },
  scent: { name: "F · 绿色的香水", item: "F", place: "被告送给助手的", date: "—", img: "",
         html: `<div class="ev-gift green">❦<br><b>一瓶绿色的爱马仕</b><br><small>一种颜色的味道</small></div>` }
};

const CHAPTERS = [

/* =================== 序章 · 家 =================== */
{
  id: "ch0", title: "序章", subtitle: "火漆", place: "清晨 · 门口",
  bg: ["assets/sleeve-x.jpg"],
  counsel: [
    { type: "whisper", text: "2026 年 11 月 24 日。<br>天还没亮透。<br><br>门口躺着一个信封。<br>没有邮票，没有寄件人。<br>封口的火漆，还是温的。<br><br>旁边落着一根小小的羽毛。" },
    { type: "award", flag: "exX" },
    { type: "bag", items: ["exX"], text: "档案袋上，只有一个铅笔写的 <b>X</b>。<br>相框角里是空的——<br>像是有人，故意把照片拿走了。" },
    { type: "postcard", no: 1, place: "CHICAGO · 06:00", text: "{her}，<br>好久不见。<br><br>你大概已经忘了我。<br>可你答应过我的事，<br>我一直记着。", sign: "— X" },
    { type: "document", docTitle: "被告档案", html: `
<p class="doc-court">{court}</p>
<h3>被告信息</h3>
<table class="dossier-table">
<tr><td>姓名</td><td><b>关傲予</b>（Aileen）</td></tr>
<tr><td>出生</td><td>2006 年 11 月 24 日 · 澳大利亚</td></tr>
<tr><td>生活的城市</td><td>北京</td></tr>
<tr><td>已知嗜好</td><td>吉他 · 音乐 · 二次元 · 狼人杀</td></tr>
<tr><td>今日年龄</td><td><b class="twenty">20</b></td></tr>
</table>
<p class="doc-footnote">本案纯属虚构。</p>` },
    { type: "gate", text: "X 要先确认，你是不是本人。<br><br>你出生在哪个国家？", accept: ["澳大利亚", "澳洲", "AUSTRALIA"],
      success: "身份确认。<br>信封里滑出一张对折的纸。" },
    { type: "fragment", ids: [1] },
    { type: "document", docTitle: "传票", html: `
<p class="doc-court">{court}</p>
<p class="doc-caption"><b>{X}</b>　v.　<b>Aileen</b></p>
<h3>案由：长大</h3>
<p>很多年前，被告把原告带回了家。那天她对原告说：</p>
<p class="doc-zh"><b>"我保证永远不长大，每天都陪你玩。"</b></p>
<p>原告收下了一把小米，作为信物。</p>
<p>今日，被告年满<b class="twenty">二十</b>，人在芝加哥。</p>
<p class="doc-sign">今夜十二点之前，给我一个交代。<br>— {X}</p>` },
    { type: "choice", prompt: "没有人会替你出庭。",
      options: [
        { label: "那就我自己来。", feedback: "很好。<br>从这一刻起，你是被告，也是自己的律师。" },
        { label: "这是谁的恶作剧？", feedback: "你把纸翻过来。<br>背面有一行极小的字：<br><br><i>\"不是。\"</i>" }
      ] },
    { type: "codeGive", text: "你不是一个人。<br>把你的<b>生日</b>，作为暗号告诉助手。", code: "ch0_toAssistant" },
    { type: "gate", text: "助手会报出你出生的<b>那一年</b>：", code: "ch0_toCounsel",
      success: "{assistant} 会一直在你身边。<br>有些东西，只有 TA 看得见。" }
  ],
  assistant: [
    { type: "whisper", text: "今天，Aileen 会收到一封信。<br>署名是 {X}。<br><br>你知道的，比她多。<br>别一次全说出来。" },
    { type: "gate", text: "输入她报给你的暗号（她的生日）：", code: "ch0_toAssistant", success: "卷宗已经打开。" },
    { type: "document", docTitle: "🔒 守则", html: `
<ol class="doc-paras">
<li>她问，你才答。</li>
<li>暗号用嘴说，别把屏幕给她看。</li>
<li>每一章都要两个人<b>到了地方</b>，手机定位通过，才能翻开。</li>
<li>定位失败时，备用暗号是 <b>${CONFIG.codes.geoOverride}</b>。</li>
<li>一路上，她会收集 <b>20</b> 片记忆——你们一起过的日子。</li>
<li>🤫 X 的真身是<b>蛋清和蛋黄</b>，终章才揭晓。别说漏。</li>
</ol>
<h3>路线</h3>
<p>联邦广场 → 历史博物馆 · 林肯公园 → Reckless Records → 晚餐 → Lincoln Lodge</p>` },
    { type: "codeGive", text: "把她出生的<b>年份</b>报给她：", code: "ch0_toCounsel" }
  ]
},

/* =================== 第一章 · 联邦广场 =================== */
{
  id: "ch1", title: "第一章", subtitle: "红色的影子", place: "联邦广场 · 219 S. Dearborn", pace: "ch1",
  bg: [W("thumb/7/78/Calder-flamingo.jpg/1280px-Calder-flamingo.jpg"), W("thumb/7/78/Calder-flamingo.jpg/640px-Calder-flamingo.jpg"), W("7/78/Calder-flamingo.jpg"), W("thumb/e/ec/Chicago_Federal_Center.jpg/1280px-Chicago_Federal_Center.jpg"), W("thumb/e/ec/Chicago_Federal_Center.jpg/640px-Chicago_Federal_Center.jpg"), W("e/ec/Chicago_Federal_Center.jpg")],
  counsel: [
    { type: "postcard", no: 2, place: "FEDERAL PLAZA · 10:00", text: "我有一个红色的远房亲戚。<br><br>它也是一只鸟。<br>站在法院对面的广场上，<br>比周围的楼都醒目，<br>五十年来，一步也没走开过。<br><br>去见见它。", sign: "— X" },
    { type: "geo", place: "plaza", text: "去广场。<br>站到它的影子里。" },
    { type: "gate", text: "它叫什么？", accept: ["FLAMINGO", "火烈鸟", "红鹤", "THE FLAMINGO"],
      success: "Calder 的《火烈鸟》。<br>它的影子里压着一张纸条，墨迹未干：<br><br><i>\"进去。看看他们怎么审判别人。<br>记住：法庭上，也有狼。\"</i>" },
    { type: "note", title: "旁听", text: "找一间正在开庭的法庭，坐在最后一排。<br>不要说话。<br><br>☐ 听到一次 <i>\"Objection.\"</i><br>☐ 法官看了你一眼<br>☐ 你数清楚了，法庭里有几个人<br>☐ 你听见了自己的心跳" },
    { type: "whisper", text: "法庭，也是一个舞台。<br><br>你想起来，<br>你们第一次一起站上舞台的那天。" },
    { type: "fragment", ids: [3, 4] },
    { type: "choice", prompt: "传票在你手里。<br>你要怎么回应？",
      options: [
        { label: "撕了它", score: -1, repeat: true,
          feedback: "纸被撕成两半，落在地上。<br><br>你走出二十步，手伸进口袋——<br>那里又有一张。<br>完好如初。" },
        { label: "\"小时候说的话，不算数。\"", score: 1,
          feedback: "法官沉默了很久，才开口：<br><i>\"可他说，十八岁那晚，你又答应了他一次。\"</i><br><br>十八岁那晚。<br>你一点也想不起来了。" },
        { label: "\"没有人能不长大。\"", score: 1,
          feedback: "法官没有回答。<br>旁听席最后一排，有什么东西扑棱了一下。<br><br>你回过头。<br>那里没有人。" }
      ] },
    { type: "answerTable",
      prompt: "X 的陈述，一句一句写在纸上。<br>逐句回应。<br><small>拿不准的，问你的助手。</small>",
      options: ["属实", "不实", "不知"],
      paragraphs: [
        { text: "\"你不知道我是谁。\"", correct: "不知", why: "你确实不知道。" },
        { text: "\"你答应过，每天都陪我玩。\"", correct: "属实", why: "日记里写得清清楚楚。" },
        { text: "\"你收下我的时候，很开心。\"", correct: "属实", why: "日记那一页，画满了笑脸。" },
        { text: "\"十八岁那晚，你又答应了我一次。\"", correct: "不实", why: "那条帖子，只是 KTV 里的一句玩笑。" },
        { text: "\"长大，就是背叛。\"", correct: "不实", why: "长大不是背叛。" }
      ] },
    { type: "award", flag: "exA" }, { type: "award", flag: "exB" },
    { type: "bag", items: ["exA", "exB"], text: "两件物证，封入袋中。" },
    { type: "whisper", text: "你在最后一页签下：<br><i>Aileen</i>。<br><br>墨水，比平时红了一点。" },
    { type: "photo", key: "ch1", prompt: "在红色的影子下，留一张照片。" },
    { type: "codeGive", text: "告诉助手，你生活的城市：", code: "ch1_toAssistant" }
  ],
  assistant: [
    { type: "geo", place: "plaza", text: "跟她一起，去广场。" },
    { type: "bag", items: ["exA", "exB"], text: "🔒 只有你看得见。她问起时，再念给她听。", noAward: true },
    { type: "document", docTitle: "🔒 关于 X", html: `
<img class="doc-photo" src="assets/sleeve-x.jpg" alt="空档案袋">
<p>档案袋是空的。没有照片，没有名字。<br>只有一根小羽毛。</p>
<p class="doc-footnote">🔑 "它叫什么？"——答案 FLAMINGO：广场中央那座红色的大钢雕，Calder 的《火烈鸟》。她卡住了，就提示："抬头，找红色。"</p>` },
    { type: "gate", text: "输入她给你的暗号：", code: "ch1_toAssistant", success: "下一站：林肯公园。" }
  ]
},

/* =================== 第二章 · 林肯公园 =================== */
{
  id: "ch2", title: "第二章", subtitle: "墓园与海龟汤", place: "历史博物馆 · 林肯公园", pace: "ch2",
  bg: [W("thumb/b/b9/Couch_Tomb_Lincoln_Park_Chicago_Illinois_2020-9468.jpg/1280px-Couch_Tomb_Lincoln_Park_Chicago_Illinois_2020-9468.jpg"), W("thumb/b/b9/Couch_Tomb_Lincoln_Park_Chicago_Illinois_2020-9468.jpg/640px-Couch_Tomb_Lincoln_Park_Chicago_Illinois_2020-9468.jpg"), W("b/b9/Couch_Tomb_Lincoln_Park_Chicago_Illinois_2020-9468.jpg"), W("thumb/2/24/Chicago_History.JPG/1280px-Chicago_History.JPG"), W("thumb/2/24/Chicago_History.JPG/640px-Chicago_History.JPG"), W("2/24/Chicago_History.JPG")],
  counsel: [
    { type: "postcard", no: 3, place: "1601 N. CLARK · 14:00", text: "博物馆里，收着这座城市的过去。<br><br>你的过去，收在我这里。<br><br>进去吧。<br>出来以后，往后面走。", sign: "— X" },
    { type: "geo", place: "tomb", text: "去芝加哥历史博物馆。" },
    { type: "whisper", text: "展柜的玻璃上，<br>映出你的影子。<br><br>还有两个小小的影子，<br>停在你肩膀上。" },
    { type: "gate", text: "X 在展签背面写了一道题：<br><br><i>\"你第一次和朋友出去旅行，去的是哪座城市？\"</i>", accept: ["洛阳", "LUOYANG"],
      success: "洛阳。<br>他连这个都知道。" },
    { type: "fragment", ids: [5, 6] },
    { type: "timedAdmit", seconds: 20,
      prompt: "灯忽然暗了。<br>X 的问题一个接一个浮现。<br><small><b class=\"twenty\">20</b> 秒。沉默，就是承认。</small>",
      items: [
        { text: "你答应过永远陪我玩。", correct: "承认", why: "这是真的。" },
        { text: "十八岁那晚，你想起了我。", correct: "否认", why: "你没有。" },
        { text: "你去了芝加哥，就再也没回过家。", correct: "否认", why: "你回去过。" },
        { text: "你今天，二十岁了。", correct: "承认", why: "是的。" }
      ] },
    { type: "postcard", no: 4, place: "LINCOLN PARK · 15:00", text: "你脚下的草地，<br>一百五十年前是一座墓园。<br><br>他们把死者都迁走了。<br><b>只有一位，没有走。</b><br><br>协议的原件，我托他保管。<br>他就住在博物馆后面，<br>名字刻在门楣上。", sign: "— X" },
    { type: "gate", text: "门楣上，刻着什么名字？", accept: ["COUCH", "IRA COUCH", "COUCH TOMB"],
      success: "COUCH。<br><br>石门锈死了，铁栏冰凉。<br>门缝里夹着一张泛黄的纸。<br>四周的草都是湿的，<br>只有那张纸，是干的。" },
    { type: "award", flag: "exD" },
    { type: "bag", items: ["exD"], text: "签名旁边，有两个小小的印子，像叉子。<br><br>最后一行，小得几乎看不见。<br><b>X 从来没有提过它。</b>" },
    { type: "fragment", ids: [7, 8, 9] },
    { type: "whisper", text: "墓碑后面，站着一个人。<br><br>是证人 <b>W</b>。<br>TA 说，TA 知道你每年生日都在做一件奇怪的事。<br><br>可 TA 只肯回答三个字：<br><b>是。不是。不重要。</b>" },
    { type: "document", docTitle: "海龟汤 · 汤面", html: `
<h3>汤面</h3>
<p class="soup">有一年的 11 月 24 日，她吹了两次生日蜡烛。<br><br>第一次吹的时候，她身边的朋友，全都还在睡觉。<br>第二次吹的时候，给她唱生日歌的家人那边，24 号早就过完了。<br><br>两次，都是在她生日当天。<br>没有人说谎。</p>
<p class="doc-zh"><b>为什么？</b></p>
<p class="doc-footnote">向 W 提问。只能问"是不是"的问题。最多 <b class="twenty">20</b> 个。</p>` },
    { type: "codeGive", text: "把暗号（你们认识的那天）告诉助手，请 W 开口：", code: "ch2_toAssistant" },
    { type: "gate", text: "问完了？输入助手给你的<b>暗号</b>，揭开汤底：", code: "ch2_toCounsel" },
    { type: "cloze", prompt: "还原那一天。<br><small>先点一个空格，再点下面的词。</small>",
      text: "她在 {{0}} 读书，家人在 {{1}}。<br>那边比这边快了整整 {{2}} 个小时。<br>北京的 24 号晚上，家人打来视频，唱生日歌——<br>这边才是 24 号的 {{3}}，朋友们还在睡。<br>这边的 24 号晚上，朋友们为她点起蜡烛——<br>北京已经是 {{4}} 了。",
      answers: ["芝加哥", "北京", "14", "清晨", "25 号"],
      bank: ["芝加哥", "悉尼", "北京", "上海", "14", "2", "清晨", "深夜", "25 号", "23 号"],
      perCorrect: 0.6 },
    { type: "award", flag: "depo" },
    { type: "bag", items: ["depo"], text: "汤底，封存。<br>W 临走前说：<i>\"走得再远，她也没忘了家。\"</i>" },
    { type: "fragment", ids: [10, 11] },
    { type: "photo", key: "ch2", prompt: "在那扇门前，留一张照片。<br><small>拍完，放大看看。</small>" },
    { type: "whisper", text: "天色暗下来了。<br><br>公园里，有什么东西在树上叫了两声。" }
  ],
  assistant: [
    { type: "geo", place: "tomb", text: "跟她一起，去历史博物馆。" },
    { type: "document", docTitle: "🔒 今天的答案", html: `
<dl class="lawlib">
<dt>第一次和朋友旅行</dt><dd>洛阳</dd>
<dt>门楣上的名字</dt><dd>COUCH（博物馆正后方，LaSalle Drive 弯道旁带铁栏的小石屋）</dd>
</dl>` },
    { type: "gate", text: "她请 W 开口时，输入暗号：", code: "ch2_toAssistant" },
    { type: "document", docTitle: "🔒 你是证人 W · 汤底", html: `
<p>她会问"是不是"的问题。你只能答：<b>是 / 不是 / 不重要</b>。声音放低，慢一点。最多 20 个问题。</p>
<h3>汤底</h3>
<p class="soup">她在<b>芝加哥</b>读书，家人在<b>北京</b>。北京比芝加哥快 <b>14 个小时</b>。<br><br>北京时间 24 号晚上，家人打视频给她唱生日歌——芝加哥这时才 24 号<b>清晨</b>六点，朋友们都还在睡。她对着手机吹了第一次蜡烛。<br><br>芝加哥 24 号晚上，朋友们给她过生日——北京已经是 <b>25 号</b>上午，家人那边的 24 号早就过完了。她吹了第二次。<br><br>两次都在她（当地的）生日当天。</p>
<p class="doc-footnote">提示方向：她卡住时可以说"想想地点"或"想想时间"。"不重要"用于：蛋糕什么味、唱了什么歌、几根蜡烛……</p>` },
    { type: "counter", label: "她问了几个问题", max: 20 },
    { type: "codeGive", text: "问完了（或问满 20 个），告诉她暗号：", code: "ch2_toCounsel" }
  ]
},

/* =================== 第三章 · 唱片店 =================== */
{
  id: "ch3", title: "第三章", subtitle: "B 面", place: "Reckless Records · 1379 N. Milwaukee", pace: "ch3",
  bg: [W("thumb/5/54/Wicker_Park%2C_Chicago.jpg/1280px-Wicker_Park%2C_Chicago.jpg"), W("thumb/5/54/Wicker_Park%2C_Chicago.jpg/640px-Wicker_Park%2C_Chicago.jpg"), W("5/54/Wicker_Park%2C_Chicago.jpg")],
  counsel: [
    { type: "postcard", no: 5, place: "MILWAUKEE AVE · 17:30", text: "去唱片店。<br><br>每一张唱片，<br>都有一面没人听。<br><br>我在 <b>B 面</b>等你。", sign: "— X" },
    { type: "geo", place: "vinyl", text: "去 Milwaukee Avenue 上那家唱片店。" },
    { type: "gate", text: "唱片封套里夹着一张手写卡片。<br>是你在日本的一家 livehouse 里说过的话：<br><br><i>\"我本来是一个＿＿＿，<br>遇到你们，我们组成了旋律，<br>因此我不再孤独。\"</i>", accept: ["音符", "一个音符"],
      success: "音符。<br><br>店里的音乐停了一拍。<br>像是有谁，在认真听。" },
    { type: "gate", text: "卡片背面，是一道谜：<br><br><i>有一首歌，<br>他听你唱的第一首是它，<br>最后一首，也是它。<br><br>它的名字，是一样可以送人的东西。<br>会开，也会谢。</i>", accept: ["鲜花", "《鲜花》", "花"],
      success: "《鲜花》。<br><br>第一首和最后一首，<br>中间隔着好多好多首。" },
    { type: "gate", text: "最底下还有一张旧票根，字迹模糊：<br><br><i>\"吴妍曦人生中的第一个＿＿＿＿，是你陪她去的。\"</i>", accept: ["LIVEHOUSE", "LIVE HOUSE", "现场"],
      success: "Livehouse。<br>那天的鼓声，好像还在耳朵里。" },
    { type: "fragment", ids: [2] },
    { type: "document", docTitle: "B 面 · X 的条件", html: `
<p class="doc-zh">我可以放过你。<br><br>只有一个条件：<br><b>此后每一个生日，你都要做一件从没做过的事。</b><br><br>否则，我每年都会回来。</p>
<p class="doc-sign">— {X}</p>` },
    { type: "scoreCode", text: "该估一估手里的牌了。<br><br>证据越硬，身份越高：<br><b>预言家</b> · 看穿一切，稳赢<br><b>猎人</b> · 还有一枪，能拼<br><b>平民</b> · 只能靠运气<br><br>你现在的证据，够当——<br>把这个<b>身份</b>报给助手：", codes: "ch3_strength" },
    { type: "choice", prompt: "助手说完了。<br>你的回答？",
      options: [
        { label: "接受", flag: "settled", feedback: "唱针抬起来了。<br><br>可店里的音乐没有停。<br>同一首歌，同一句，一遍，又一遍。<br><br><i>X 还不想结束。</i>" },
        { label: "拒绝", flag: "rejected", score: 0.5, feedback: "你把唱片放回架子。<br><br>架子后面，有什么东西轻轻啄了一下你的手指。" }
      ] },
    { type: "fragment", ids: [12, 13, 14] },
    { type: "photo", key: "ch3", prompt: "挑一张唱片，拍下它的 B 面。" },
    { type: "codeGive", text: "去吃晚饭吧。把那首歌的名字告诉助手：", code: "ch3_toAssistant" }
  ],
  assistant: [
    { type: "geo", place: "vinyl", text: "跟她一起，去唱片店。" },
    { type: "document", docTitle: "🔒 今天的答案", html: `
<dl class="lawlib">
<dt>"我本来是一个＿＿"</dt><dd>音符</dd>
<dt>第一首和最后一首</dt><dd>《鲜花》</dd>
<dt>人生第一个＿＿</dt><dd>livehouse</dd>
</dl>` },
    { type: "gate", text: "输入她报给你的<b>身份</b>：", code: "ch3_strength" },
    { type: "evalMemo" },
    { type: "gate", text: "那首歌的名字：", code: "ch3_toAssistant" }
  ]
},

/* =================== 第四章 · 晚餐 · 开庭 =================== */
{
  id: "ch4", title: "第四章", subtitle: "天黑请闭眼", place: "晚餐", pace: "ch4",
  bg: [W("thumb/3/3b/Chicago_River_night.jpg/1280px-Chicago_River_night.jpg"), W("thumb/3/3b/Chicago_River_night.jpg/640px-Chicago_River_night.jpg"), W("3/3b/Chicago_River_night.jpg"), W("thumb/1/12/CTA_Night.jpg/1280px-CTA_Night.jpg"), W("thumb/1/12/CTA_Night.jpg/640px-CTA_Night.jpg"), W("1/12/CTA_Night.jpg")],
  counsel: [
    { type: "postcard", no: 6, place: "DINNER · 19:00", text: "吃饱一点。<br><br>今晚的庭审，<br>会很长。", sign: "— X" },
    { type: "gate", text: "餐巾纸上，有人用番茄酱写了一行字：<br><br><i>\"北京人最想念的那碗面，叫什么？\"</i>", accept: ["炸酱面", "老北京炸酱面", "ZHAJIANGMIAN"],
      success: "炸酱面。<br>黄瓜丝、豆芽、心里美萝卜……<br>一碗面，是一座城。" },
    { type: "fragment", ids: [15, 16] },
    { type: "whisper", text: "法庭很冷。<br>墙上所有的钟，<br>都停在 11:24。" },
    { type: "jurySelect", strikes: 3,
      prompt: "天黑请闭眼。<br>八个陪审员里，混进了<b>三匹狼</b>。<br>你是预言家。可以<b>请走三个</b>。<br><small>助手替你验人。</small>",
      jurors: [
        { name: "1 · Margaret", job: "退休图书管理员", biased: false },
        { name: "2 · Tony", job: "糖果店老板", biased: true },
        { name: "3 · Priya", job: "夜班护士", biased: false },
        { name: "4 · Gus", job: "记不清自己几岁", biased: true },
        { name: "5 · Lena", job: "吉他老师", biased: false },
        { name: "6 · Dale", job: "从不照镜子", biased: true },
        { name: "7 · Sam", job: "末班车司机", biased: false },
        { name: "8 · Iris", job: "养鸟的人", biased: false }
      ] },
    { type: "choice", prompt: "天亮了。<br>你站起来，所有的目光都落在你身上。",
      options: [
        { label: "\"小时候的约定，绑不住二十岁的人。何况，协议上写着——我可以走。\"", score: 1.5, feedback: "八号陪审员 Iris 垂下眼睛，轻声说：<br><i>\"鸟不会说爱。可它们会等你回家。\"</i>" },
        { label: "\"X，你出来。\"", score: 0, feedback: "灯闪了一下。<br>没有人出来。<br>只有一根羽毛，慢慢飘过证人席。" },
        { label: "\"我什么都不记得了。\"", score: -0.5, feedback: "法官看着你：<br><i>\"那你更该害怕。\"</i>" }
      ] },
    { type: "objection",
      prompt: "X 走上证人席。<br>他戴着一张白狐面具，<br>声音很轻，很尖。<br><br>听到不对的话，喊<b>异议</b>。",
      grounds: ["他在引导", "道听途说", "他在揣测", "与本案无关"],
      lines: [
        { speaker: "X", text: "那天，她把我带回了家。", ground: null },
        { speaker: "X 的律师", text: "被告是不是一个会抛下朋友的人？", ground: 0, why: "问题里已经替证人把答案说完了。" },
        { speaker: "X", text: "有人告诉我，她去了芝加哥，就不想回家了。", ground: 1, why: "\"有人告诉我\"，不能当作证据。" },
        { speaker: "X", text: "她每天早上，都会跟我说早安。", ground: null },
        { speaker: "X", text: "我猜，她现在一点也不想我。", ground: 2, why: "他不可能知道她在想什么。" },
        { speaker: "X 的律师", text: "你狼人杀最喜欢拿什么牌？", ground: 3, why: "这与本案毫无关系。" }
      ] },
    { type: "present", prompt: "X：<b>\"协议上，没有任何例外。\"</b><br><br>出示一件证物：",
      correct: "exD", score: 2,
      success: "你把那张纸推到他面前，指尖停在最后一行：<br><b>\"除非我变成一个很酷的大人。\"</b><br><br>白狐面具后面，只剩下很轻的呼吸声。",
      fail: "不是这个。<br>你需要那张从门缝里拿到的纸。" },
    { type: "present", prompt: "X：<b>\"她去了芝加哥，就把家里忘了。\"</b><br><br>出示一件证物：",
      correct: "depo", alt: "exB", score: 1.5, altScore: 0.5,
      success: "你把汤底摊开：<br>每年生日，她都吹两次蜡烛——一次跟着北京，一次跟着芝加哥。<br><br>X 慢慢低下了头。",
      altText: "帖子在这里。可它证明不了你有没有想家。W 的证词会更有力。",
      fail: "这个帮不了你。" },
    { type: "award", flag: "card" }, { type: "award", flag: "cafe" }, { type: "award", flag: "scent" },
    { type: "bag", items: ["card", "cafe", "scent"], text: "{assistant} 站了起来：<br><i>\"我请求出示辩方证物。\"</i><br><br>三样东西，都是被告送给我的。<br>一个会把快乐分给别人的人——<br>算不算一个很酷的大人？" },
    { type: "fragment", ids: [17] },
    { type: "pickN", n: 3, prompt: "最后陈述。<br>选三句话。",
      options: [
        { label: "\"小时候的约定，不该绑住一个大人。\"", score: 1 },
        { label: "\"走得再远，家里的生日歌，我都听得见。\"", score: 1 },
        { label: "\"协议写着：成为很酷的大人，就可以离开。我做到了。\"", score: 1 },
        { label: "\"没有人能不长大，你也一样。\"", score: 0.5 },
        { label: "\"你那把小米，太便宜了。\"", score: -0.5 },
        { label: "\"你连脸都不敢露。\"", score: -0.5 }
      ] },
    { type: "whisper", text: "陪审团退庭。<br><br>二十点二十分。<br>墙上的钟，开始走了。" },
    { type: "verdict" },
    { type: "codeGive", text: "告诉助手：", code: "ch5_toAssistant" }
  ],
  assistant: [
    { type: "document", docTitle: "🔒 答案", html: `<dl class="lawlib"><dt>北京人最想念的那碗面</dt><dd>炸酱面</dd></dl>` },
    { type: "document", docTitle: "🔒 预言家的查验结果", html: `
<dl class="lawlib">
<dt>1 · Margaret</dt><dd>"每一页我都会看完。" —— 好人</dd>
<dt>2 · Tony</dt><dd>"收了东西，就得一直还下去。" —— 🐺 狼</dd>
<dt>3 · Priya</dt><dd>"我见过很多人长大。" —— 好人</dd>
<dt>4 · Gus</dt><dd>"我一直是这个年纪。一直都是。" —— 🐺 狼</dd>
<dt>5 · Lena</dt><dd>"我的学生都走了。这是好事。" —— 好人</dd>
<dt>6 · Dale</dt><dd>"镜子里那个人，不是我。" —— 🐺 狼</dd>
<dt>7 · Sam</dt><dd>"末班车上什么人都有。" —— 好人</dd>
<dt>8 · Iris</dt><dd>"鸟不会说爱。可它们会等你回家。" —— 好人</dd>
</dl>
<p class="doc-footnote">别直接说谁是狼。她问哪一个，你就验哪一个。</p>` },
    { type: "document", docTitle: "🔒 小抄（可以低声提醒她）", html: `
<dl class="lawlib">
<dt>他在引导</dt><dd>问题里已经藏着答案。</dd>
<dt>道听途说</dt><dd>"有人告诉我……"</dd>
<dt>他在揣测</dt><dd>"我猜她……"</dd>
<dt>与本案无关</dt><dd>跟案子没有关系。</dd>
</dl>
<p class="doc-footnote">庭审快结束时，她的手机上会出现"辩方证物"——那是你站起来说话的时刻：狼人杀卡牌、积木咖啡店、绿色的香水，都是她送你的。</p>` },
    { type: "gate", text: "宣判之后，输入：", code: "ch5_toAssistant" }
  ]
},

/* =================== 终章 · Lincoln Lodge =================== */
{
  id: "ch5", title: "终章", subtitle: "白狐面具", place: "Lincoln Lodge · 2040 N. Milwaukee", pace: "ch5",
  bg: [W("thumb/1/16/Logan_Square_%287979593889%29.jpg/1280px-Logan_Square_%287979593889%29.jpg"), W("thumb/1/16/Logan_Square_%287979593889%29.jpg/640px-Logan_Square_%287979593889%29.jpg"), W("1/16/Logan_Square_%287979593889%29.jpg"), W("thumb/7/70/Illinois_Centennial_Memorial_Column.jpg/1280px-Illinois_Centennial_Memorial_Column.jpg"), W("thumb/7/70/Illinois_Centennial_Memorial_Column.jpg/640px-Illinois_Centennial_Memorial_Column.jpg"), W("7/70/Illinois_Centennial_Memorial_Column.jpg")],
  counsel: [
    { type: "postcard", no: 7, place: "2040 N. MILWAUKEE · 21:00", text: "今晚九点，<br>你会坐上另一张陪审席。<br><br>散场之后，<br>我会摘下面具。", sign: "— X" },
    { type: "geo", place: "lodge", text: "去 Lincoln Lodge。" },
    { type: "whisper", text: "散场了。<br>门外的街灯，一盏一盏地熄灭。<br><br>X 站在最后一盏下面。<br>白狐面具，在黑暗里微微发亮。" },
    { type: "narration", title: "面具之下", text: "X 抬起手，慢慢摘下面具。<br><br>面具下面，不是一个人。<br><br>是两只小鸟。<br>一只蓝白色，一只黄色。<br><br><b>{plaintiff}</b>。" },
    { type: "feathers", text: "{plaintiffMessage}" },
    { type: "postcard", no: 20, place: "THE LAST LETTER", text: "我们一共写了二十封信。<br>你只收到了七封。<br><br>剩下的十三封，<br>是你和朋友们一起过的日子。<br><br>我们替你收着。", sign: "— 蛋清 & 蛋黄" },
    { type: "fragment", ids: [18, 19, 20] },
    { type: "twenty" },
    { type: "gate", any: true, key: "comicVerdict", text: "最后一件事。<br><br>写下今晚的演出里，<br>你们审判的那个人：", success: "已记入卷宗。" },
    { type: "signature", who: "counsel", label: "Aileen，请签名" },
    { type: "signature", who: "assistant", label: "把手机交给助手，请 TA 签名" },
    { type: "judgment" },
    { type: "gifts" },
    { type: "dossier" },
    { type: "letter" }
  ],
  assistant: [
    { type: "geo", place: "lodge", text: "跟她一起，去 Lincoln Lodge。" },
    { type: "narration", title: "最后", text: "散场后，她会看到 X 摘下面具——是蛋清和蛋黄。<br>她会收齐二十片记忆，写下今晚演出里审判的那个人，再把手机交给你签名。<br><br>然后，四件礼物，该登场了：<br>人物肖像衣服 · 黄金蛋糕 · 手写书 · 吉他支架。" }
  ]
}
];
