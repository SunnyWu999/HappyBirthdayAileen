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
  plaintiffMessage: "我们不知道什么是爱。<br>我们只知道，你笑的时候，<br>整个房间都会亮一点。<br><br>你走以后，房间暗了很久。<br>后来我们想明白了——<br>你只是去了一个，更亮的地方。<br><br>所以我们只想要一件事：<br>你要快乐。<br><br>二十岁生日快乐。",
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
  giftHint: "四件证物，不在卷宗里。",

  /* ---- 定位 ---- 到了才能继续（两部手机都要）。测试时可改成 false */
  useGeo: true,
  places: {
    plaza:  { name: "联邦广场 · 火烈鸟",      lat: 41.8788, lng: -87.6297, radius: 250 },
    tour:   { name: "71 E. Wacker · Hoyt's Tavern", lat: 41.8867, lng: -87.6252, radius: 250 },
    strip:  { name: "The Strip Club 拍照亭",   lat: 41.9125, lng: -87.6777, radius: 200 },
    guitar: { name: "Guitar Center · Lincoln Park", lat: 41.9303, lng: -87.6485, radius: 200 },
    tomb:   { name: "林肯公园南端 · Couch 墓", lat: 41.9132, lng: -87.6318, radius: 300 },
    vinyl:  { name: "Reckless Records",        lat: 41.9075, lng: -87.6735, radius: 500 },
    home:   { name: "1414 E. 59th St.",        lat: 41.7877, lng: -87.5911, radius: 200 }
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
  { text: "2025.1.1 · 2025 年的第一个太阳，是一起看的。", img: "assets/mem/m10.jpg" },
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

/* ---- 线索卡（右上角 🔍）。to = 这条线索指向谁 ---- */
const CLUES = {
  c1:  { to: "birds", title: "门口的绒毛", text: "门缝里卡着一小撮白色的绒毛，带一点点浅蓝。<br>像是从谁的羽绒服里漏出来的。" },
  c2:  { to: "birds", title: "一把金色的小颗粒", text: "传票上写着：原告收下了<b>一把金色的小颗粒</b>，作为信物。<br>糖？小孩子之间，拿什么当信物都不奇怪。" },
  c3:  { to: "birds", title: "\"带回家的那天\"", text: "协议签于\"被告把原告<b>带回家</b>的那天\"。<br>很奇怪的说法。" },
  c4:  { to: "birds", title: "红色的远房亲戚", text: "X 说，火烈鸟是它的远房亲戚：<br>\"它和我一样，总是站在原地，等一个人。\"" },
  c5:  { to: "birds", title: "最后一排", text: "法庭最后一排，有什么东西<b>窸窸窣窣</b>地动了一下。<br>椅背上，沾着一点灰白的绒毛。" },
  c6:  { to: "birds", title: "两个小影子", text: "Death Alley 的橱窗上，你的肩膀旁边，<br>映着<b>两个</b>小小的影子。像是有谁，踮着脚站在你身后。" },
  c7:  { to: "birds", title: "两个小印子", text: "协议签名旁边，有两个小小的印子：<b>ψ ψ</b>。<br>像小孩用铅笔随手画的叉子。" },
  c8:  { to: "birds", title: "W 的最后一句话", text: "W 临走前说：<br>\"X 从来没有离开过<b>那个家</b>。一直在等她回去。\"" },
  c9:  { to: "birds", title: "黄色的绒毛", text: "唱片架后面，有什么东西轻轻碰了你一下。<br>地上留下一小撮<b>黄色</b>的绒毛，软软的，像旧玩偶身上掉下来的。" },
  c10: { to: "birds", title: "\"第一个看见的\"", text: "X 在证人席上说：<br>\"她每天早上醒来，<b>第一个看见的</b>，就是我。\"<br>——镜子里的自己？" },
  c11: { to: "birds", title: "八号陪审员", text: "Iris 说：\"有些东西不会说话。<br>可它们记得你，也会一直等你回家。\"" },
  c12: { to: "birds", title: "第四格", text: "拍照亭吐出来的照片条，第四格的角落里，<br>有<b>两个</b>小小的、模糊的影子。<br>也许只是显影液没干。" },
  r1:  { to: "ten", title: "小时候的日记", text: "日记里，小时候的你写过\"永远不长大\"。<br>X，会不会就是小时候的你？" },
  r2:  { to: "ten", title: "十八岁那晚的帖子", text: "\"18岁了，但我永远是个小孩。\"<br>X 说，那晚你又答应了他一次。" },
  r3:  { to: "sunny", title: "助手的暗号", text: "{assistant} 手里，总有你看不到的东西。<br>TA 是不是知道得太多了？" },
  r4:  { to: "w", title: "W 的沉默", text: "W 知道那一天的一切，<br>却只肯说三个词：是，不是，不重要。" },
  r5:  { to: "ten", title: "歪歪扭扭的字", text: "X 的每一张明信片，字都歪歪扭扭的，<br>像一个刚学会写字的小孩。" },
  r6:  { to: "ten", title: "\"很小，很会等\"", text: "传票上，原告的职业写着：<i>being very small and waiting</i>。<br>很小。很会等。——小孩子，最会等。" }
};

/* ---- 嫌疑人（终章指认 X）。elim = 选错时，为什么不是 TA ---- */
const SUSPECTS = [
  { id: "ten", name: "十岁的关傲予", note: "动机：你答应过她，永远不长大。" },
  { id: "w", name: "证人 W", note: "动机：不明。TA 知道得太多。",
    elim: "W 是证人。证人不能同时是原告。<br>而且 W 亲口说过：X 从来没有离开过<b>那个家</b>——可 W 今天就站在芝加哥。" },
  { id: "sunny", name: "Sunny Wu（你的助手）", note: "动机：不明。暗号都在 TA 手里。",
    elim: "Sunny 今天一直在你身边，可 X 的明信片，每一次都比你们先到。<br>再说，W 说过：X 从来没有离开过<b>那个家</b>。" },
  { id: "judge", name: "法官", note: "动机：无。从不站在任何一边。",
    elim: "法官审过很多案子，从不站在任何一边。<br>况且，法官没有理由在你的门缝里留下绒毛。" }
];

/* ---- 反转：选了"十岁的你"之后，X 说"不是她，是她答应过的" ---- */
const TWIST = {
  from: "ten",
  text: "X 歪了歪头。<br>白狐面具后面，传出<b>两个</b>声音，一高一低，几乎同时：<br><br><i>\"不是她。<br>是她答应过的。\"</i><br><br>你低头，再看一遍那份协议——<br>签于\"被告把原告<b>带回家</b>的那天\"。<br><br>小时候的你，不是被谁带回家的。<br>是你，把什么带回了家。",
  ask: "小时候的你，把什么带回了家？",
  options: [
    { id: "doll", name: "一个旧布偶", elim: "布偶不会每天早上等你醒来。<br>也不会掉<b>两种颜色</b>的绒毛。" },
    { id: "diary", name: "那本日记", elim: "日记是证据，不是原告。<br>何况日记只有一本——X 是<b>两个</b>。" },
    { id: "plant", name: "一盆花", elim: "花不会在窗边等人，<br>也不会在协议上留下 ψ 形的印子。" },
    { id: "birds", name: "蛋清和蛋黄" }
  ],
  reveal: "白色带一点蓝的绒毛，黄色的绒毛——是两种颜色的<b>羽毛</b>。<br>一把金色的小颗粒——是<b>小米</b>，是鸟食。<br>ψ ψ——是<b>鸟的脚印</b>。<br>窸窸窣窣——是<b>翅膀</b>。<br>肩膀旁边的两个小影子、照片第四格里的两个小影子——是<b>一直跟着你</b>的它们。<br>\"每天醒来第一个看见的\"——是床边的<b>鸟笼</b>。<br>\"从没离开过那个家\"——它们一直在<b>北京</b>等你。<br><br>所有指向\"小孩\"的线索，都没有说谎。<br>只是那个小孩答应过的，<br>是它们。"
};

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
  exD: { name: "D · 协议原件", item: "D", place: "Death Alley · 一扇锈死的后门", date: "很多年前的一个夏天", img: "",
         html: `<div class="crayon big">永远不长大协议<br><br>我保证永远不长大，<br>每天都陪你玩。<br><br><span class="tiny">除非我变成一个很酷的大人。</span><br><br>— 关傲予<br><span class="feet">ψ ψ</span></div>` },
  depo: { name: "W · 证人W的证词", item: "W", place: "Dirksen 法院大厅", date: "2026.11.24", img: "",
         html: `<div class="ev-transcript"><div class="ev-stamp">DEPOSITION</div>一次蜡烛，<br>五句生日快乐，<br>五个时区。<br>北京，是第一个。<br>她离家再远，<br>家里的零点，永远最先到。</div>` },
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
    { type: "document", docTitle: "剧本 · 角色本", cls: "script", html: `
<h3 class="sc-title">《第二十号档案》</h3>
<p class="sc-meta">类型：本格推理 · 微恐 · 情感　｜　人数：2（被告 · 助理）　｜　时长：一整天</p>
<h4>【故事背景】</h4>
<p>芝加哥，2026 年 11 月 24 日。湖面吹来的风，已经很冷了。</p>
<p>今天是 Aileen 的二十岁生日。她原本以为，这会是普通的一天：上课，吃饭，收几条祝福，在宿舍里给远在北京的家里打一个视频。</p>
<p>直到清晨，一封没有邮票的信，出现在她的门口。</p>
<p>寄信的人自称 <b>Mr. X</b>。他说，她欠他一个约定。他说，他已经等了很久。他说，今晚十二点之前，要她给一个交代。</p>
<h4>【你的身份】</h4>
<p>你是 <b>Aileen</b>，本案被告。<br>你也是你自己的律师——没有人会替你出庭。</p>
<h4>【你的任务】</h4>
<p>一、为自己辩护，赢下这场官司；<br>二、查出 <b>Mr. X</b> 到底是谁；<br>三、还原这个案子，真正的意义。</p>
<h4>【规则】</h4>
<p>· 线索藏在今天要去的每一个地方。到了现场，手机才会解锁下一章。<br>
· 你的助理 {assistant}，手里有你看不到的东西。TA 只在你问的时候回答。<br>
· 右上角 🔍 是你收集到的线索，✧ 是记忆碎片。随时可以翻看。<br>
· 不是所有线索都说真话。<br>
· 终章，你需要当着 X 的面，说出它的名字。</p>
<p class="sc-warn">准备好了，就翻开第一页。</p>` },
    { type: "whisper", text: "2026 年 11 月 24 日。<br>芝加哥的天，还没亮透。<br>湖面吹来的风，贴着窗缝走了一夜。<br><br>门口躺着一个信封。<br>没有邮票，没有寄件人。<br>封口的火漆，还是温的——<br>像是有谁，刚刚才把它放下。<br><br>门缝里，卡着一小撮白色的绒毛。" },
    { type: "award", flag: "exX" },
    { type: "bag", items: ["exX"], text: "档案袋上，只有一个铅笔写的 <b>X</b>。<br>相框角里是空的——<br>像是有人，故意把照片拿走了。" },
    { type: "clue", id: "c1" },
    { type: "postcard", no: 1, place: "CHICAGO · 06:00", text: "{her}，<br>好久不见。<br><br>你大概已经忘了我。<br>可你答应过我的事，<br>我一直记着。", sign: "— X" },
    { type: "clue", id: "r5" },
    { type: "document", docTitle: "被告档案", html: `
<p class="doc-court">{court}</p>
<h3>被告信息</h3>
<table class="dossier-table">
<tr><td>姓名</td><td><b>关傲予</b>（Aileen）</td></tr>
<tr><td>出生</td><td>2006 年 11 月 24 日 · 澳大利亚</td></tr>
<tr><td>生活的城市</td><td>北京</td></tr>
<tr><td>地址</td><td>1414 E. 59th St.,<br>Chicago, IL, 60637</td></tr>
<tr><td>今日年龄</td><td><b class="twenty">20</b></td></tr>
</table>
<p class="doc-footnote">本案纯属虚构。</p>` },
    { type: "gate", text: "X 要先确认，你是不是本人。<br><br>你出生在哪个国家？", accept: ["澳大利亚", "澳洲", "AUSTRALIA"],
      success: "身份确认。<br>信封里滑出一张对折的纸。" },
    { type: "fragment", ids: [1] },
    { type: "document", docTitle: "传票", cls: "summons", html: `
<h1 class="sm-title">SUMMONS</h1>
<div class="sm-party">
  <div class="sm-addr">MS. AILEEN GUAN<br><span class="redact">██████████████</span><br>1414 E. 59th St.<br>Chicago, IL 60637<br><span class="redact short">████████</span></div>
  <div class="sm-role">DEFENDANT</div>
</div>
<p class="sm-caps">YOU ARE REQUIRED TO APPEAR IN THE CIRCUIT COURT OF TIME, FEDERAL PLAZA, 219 S. DEARBORN STREET, CHICAGO, ON TUESDAY THE 24<sup>TH</sup> DAY OF NOVEMBER 2026 AT 1.30 O'CLOCK IN THE AFTERNOON TO DEFEND THE ACTION OF WHICH PARTICULARS APPEAR BELOW.</p>
<p class="sm-caps">IF YOU DO NOT APPEAR JUDGMENT MAY BE GIVEN IN YOUR ABSENCE.</p>
<div class="sm-party plaintiff">
  <div class="sm-addr">MR. X, exercising the profession of<br>being very small and waiting,<br>under the name and style of<br>"X"</div>
  <div class="sm-role">PLAINTIFF</div>
</div>
<p class="sm-body">ACTIONING the Defendant for breach of the <b>"FOREVER NOT GROWING UP AGREEMENT"</b>, entered into on the day the Defendant brought the Plaintiff home, in consideration of ONE (1) HANDFUL OF SMALL GOLDEN GRAINS, whereby the Defendant promised never to grow up and to play with the Plaintiff every day; the Defendant having attained the age of <b class="twenty">TWENTY (20)</b> years on the 24<sup>th</sup> day of November 2026 and being now resident in Chicago, the whole as appears by the Agreement in the Plaintiff's favour.</p>
<p class="sm-caps">YOU WILL STOP THIS GOING TO COURT IF, BEFORE MIDNIGHT ON THE DATE GIVEN ABOVE, YOU PAY THE SUM OF:-</p>
<ol class="sm-list" type="a">
<li>one (1) honest laugh;</li>
<li>one (1) thing you have never done before;</li>
<li>twenty (20) minutes of being completely, ridiculously happy; and</li>
<li>stamp duty in the sum of one (1) photograph.</li>
</ol>
<div class="sm-foot">
  <div class="sm-sign"><span class="redact">████████████</span><br><b>PLAINTIFF</b><br>MR. X<br><br>Dated the 24<sup>th</sup> day of November 2026.</div>
  <div class="sm-stamp">CIRCUIT COURT OF TIME<br>THIS SUMMONS WAS POSTED ON<br><b>24 NOV 2026</b><br><span class="sm-scrawl">𝒳 ~~~</span><br>GREFFIER</div>
</div>
<p class="sm-zh">【译】X 告你：你答应过永远不长大，可你今天二十岁了。<br>今天下午一点半，到联邦广场出庭。不来，就缺席判决。</p>` },
    { type: "clue", id: "c2" },
    { type: "clue", id: "c3" },
    { type: "clue", id: "r6" },
    { type: "document", docTitle: "案情摘要 · CASE BRIEF", html: `
<p class="doc-court">{court}</p>
<table class="dossier-table">
<tr><td>案件编号</td><td>{caseNo}</td></tr>
<tr><td>原告</td><td>Mr. X（身份不明，从未露面）</td></tr>
<tr><td>被告</td><td>Aileen（关傲予），20 岁</td></tr>
<tr><td>案由</td><td>违反《永远不长大协议》</td></tr>
<tr><td>原告诉求</td><td>被告承认自己"长大了"，并给出交代</td></tr>
<tr><td>开庭</td><td>今晚 · 时间巡回法院</td></tr>
</table>
<h3>本案疑点</h3>
<ol class="doc-paras">
<li><b>原告是谁？</b>传票没有地址，没有照片，只有一个 X。</li>
<li><b>协议原件在哪？</b>原告声称有一份签了名的协议，却没有附在传票里。</li>
<li><b>"她去了芝加哥，就把家忘了。"</b>原告的这句指控，是真的吗？</li>
<li><b>原告为什么偏偏挑今天？</b></li>
</ol>
<p class="doc-footnote">每解开一个疑点，案子就离真相近一步。</p>` },
    { type: "document", docTitle: "嫌疑人名单 · 谁是 X？", html: `
<p>能写出这封信的，好像只有这几个人。</p>
<dl class="lawlib suspects">
<dt>① 十岁的关傲予</dt><dd>当年说"永远不长大"的人。如果有谁会为这句话记仇，大概就是她。</dd>
<dt>② 证人 W</dt><dd>身份不明。据说知道你每年生日的秘密。</dd>
<dt>③ {assistant}（你的助手）</dt><dd>今天一直跟在你身边。所有暗号，都在 TA 手里。</dd>
<dt>④ 法官</dt><dd>时间巡回法院的法官。没有人见过 TA 的脸。</dd>
</dl>
<p class="doc-footnote">好像。<br>把怀疑记在心里。终章，你要当面指认。</p>` },

    { type: "choice", prompt: "没有人会替你出庭。",
      options: [
        { label: "那就我自己来。", feedback: "很好。<br>从这一刻起，你是被告，也是自己的律师。" },
        { label: "这是谁的恶作剧？", feedback: "你把纸翻过来。<br>背面有一行极小的字：<br><br><i>\"不是。\"</i>" }
      ] },
    { type: "codeGive", text: "你不是一个人。<br>把你的<b>生日</b>，作为暗号告诉助手。", code: "ch0_toAssistant" },
    { type: "clue", id: "r3" },
    { type: "gate", text: "助手会报出你出生的<b>那一年</b>：", code: "ch0_toCounsel",
      success: "{assistant} 会一直在你身边。<br>有些东西，只有 TA 看得见。" }
  ],
  assistant: [
    { type: "document", docTitle: "剧本 · 角色本（助理）", cls: "script", html: `
<h3 class="sc-title">《第二十号档案》</h3>
<h4>【你的身份】</h4>
<p>你是 <b>{assistant}</b>，被告 Aileen 的助理。<br>你是今天唯一知道全部真相的人。</p>
<h4>【你知道的秘密】</h4>
<p>Mr. X 是<b>蛋清和蛋黄</b>——她北京家里的两只鸟。它们告她"长大"，其实只是想确认：长大以后的她，还会不会快乐。</p>
<h4>【你的任务】</h4>
<p>一、陪她走完今天的每一站；<br>二、她问的时候，才给她信息；她卡住的时候，轻轻推一把；<br>三、<b>绝不说出 X 是谁。</b>让她自己推理出来。</p>
<h4>【如果她怀疑你】</h4>
<p>嫌疑人名单里有你。这是剧本故意的。<br>她问"你是不是 X"，你可以说：<i>"我有不在场证明——我今天一直和你在一起。可 X 的信，每一次都比我们先到。"</i></p>
<h4>【反转】</h4>
<p>线索被故意写得模棱两可：歪歪扭扭的字、小孩画的叉子、"很小，很会等"……都会把她引向<b>十岁的自己</b>。这是第一层答案。</p>
<p>终章她指认"十岁的关傲予"后，X 会说"不是她，是她答应过的"，她要再推一步：小时候的她，把什么<b>带回了家</b>？答案是蛋清和蛋黄。</p>
<p>她卡住时，可以提醒："重新读一遍协议上那句'带回家的那天'。"</p>
<p class="sc-warn">终章，她要当着 X 的面指认。在那之前，守住秘密。</p>` },
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
<p>Gangsters &amp; Ghosts 步行 tour（11:00，71 E. Wacker）→ 联邦广场 · 法院（13:30，1903 房间）→ The Strip Club 拍照亭（15:05）→ Reckless Records（15:40）→ Guitar Center（16:40）→ 回家做炸酱面和蛋糕（18:00）→ 晚饭 · 开庭 → 终章</p>` },
    { type: "codeGive", text: "把她出生的<b>年份</b>报给她：", code: "ch0_toCounsel" }
  ]
},

/* =================== 第一章 · 死巷（Gangsters & Ghosts tour）=================== */
{
  id: "ch1", title: "第一章", subtitle: "死巷", place: "Gangsters & Ghosts · 71 E. Wacker", pace: "ch1",
  bg: [W("thumb/3/3b/Chicago_River_night.jpg/1280px-Chicago_River_night.jpg"), W("thumb/3/3b/Chicago_River_night.jpg/640px-Chicago_River_night.jpg"), W("3/3b/Chicago_River_night.jpg"), W("thumb/1/12/CTA_Night.jpg/1280px-CTA_Night.jpg"), W("thumb/1/12/CTA_Night.jpg/640px-CTA_Night.jpg"), W("1/12/CTA_Night.jpg")],
  counsel: [
    { type: "postcard", no: 2, place: "71 E. WACKER · 11:00", text: "这座城市的地底下，<br>埋着很多故事。<br>黑帮的，鬼的。<br><br>十一点，有个人会在河边的酒馆门口等你。<br>跟着他走。<br><br>他讲的每一个鬼故事都认真听——<br>其中有一个，是讲给你的。", sign: "— X" },
    { type: "geo", place: "tour", text: "去 71 E. Wacker Dr，Hoyt's Tavern 门口。<br><small>Gangsters &amp; Ghosts 步行 tour，11:00 出发。</small>" },
    { type: "whisper", text: "导游停在一条窄巷口。<br>他说，这里叫 Death Alley，<br>死过很多人。<br><br>巷口橱窗的玻璃上，<br>映出你的影子。<br><br>还有两个小小的影子，<br>停在你肩膀上。" },
    { type: "clue", id: "c6" },
    { type: "gate", text: "导游讲完最后一个故事，递给你一张旧明信片。背面写着一道题：<br><br><i>\"你第一次和朋友出去旅行，去的是哪座城市？\"</i>", accept: ["洛阳", "LUOYANG"],
      success: "洛阳。<br>他连这个都知道。" },
    { type: "fragment", ids: [5, 6] },
    { type: "postcard", no: 3, place: "DEATH ALLEY · 12:00", text: "你听见导游说了那条巷子的名字吗？<br><br>一百多年前，那里死过很多人。<br>后来，它成了这座城市最安静的地方。<br><br>协议的原件，我托巷子里一扇锈死的后门保管。<br>只要你说得出巷子的名字，<br>门就会开一条缝。", sign: "— X" },
    { type: "gate", text: "那条巷子，叫什么？", accept: ["DEATH ALLEY", "DEATHALLEY", "死亡巷", "死巷", "死亡小巷", "死亡之巷"],
      success: "Death Alley。<br><br>巷子里的风是冷的，后门的铁锈蹭了你一手。<br>门缝里夹着一张泛黄的纸。<br>四周的地都是湿的，<br>只有那张纸，是干的。" },
    { type: "award", flag: "exD" },
    { type: "bag", items: ["exD"], text: "签名旁边，有两个小小的印子，像叉子。<br><br>最后一行，小得几乎看不见。<br><b>X 从来没有提过它。</b>" },
    { type: "clue", id: "c7" },
    { type: "whisper", text: "疑点二，解开了。<br><br>协议原件就在你手里。<br>它比你想象的旧，也比你想象的软——<br>边角有一圈细细的小孔，<br>像是被什么，一遍一遍地碰过。" },
    { type: "fragment", ids: [7, 8, 9] },
    { type: "photo", key: "ch1b", prompt: "在巷口，留一张照片。<br><small>拍完，放大看看。</small>" },
    { type: "document", docTitle: "调查笔记 · 第一章", cls: "notes", html: `
<p><b>已解开：</b>疑点二——协议原件，就藏在 Death Alley 的一扇后门里。</p>
<p><b>新线索：</b>橱窗上，你肩膀上停着两个小小的影子；协议签名旁边，有两个叉子形的印子。</p>
<p><b>可疑：</b>X 收的信物，是一把金色的小颗粒。协议签于"带回家的那天"。</p>
<p class="doc-footnote">下一站：联邦广场。下午一点半，你要出庭了。</p>` }
  ],
  assistant: [
    { type: "geo", place: "tour", text: "跟她一起，去 71 E. Wacker（Hoyt's Tavern 门口），11:00 的 tour。" },
    { type: "document", docTitle: "🔒 今天的答案", html: `
<dl class="lawlib">
<dt>第一次和朋友旅行</dt><dd>洛阳</dd>
<dt>那条巷子的名字</dt><dd>Death Alley（导游会讲到；剧院后面那条窄巷。她没听清就提示："死过很多人的那条巷子"）</dd>
</dl>` }
  ]
},

/* =================== 第二章 · 联邦广场 · 开庭 =================== */
{
  id: "ch2", title: "第二章", subtitle: "红色的影子", place: "联邦广场 · 219 S. Dearborn", pace: "ch2",
  bg: [W("thumb/7/78/Calder-flamingo.jpg/1280px-Calder-flamingo.jpg"), W("thumb/7/78/Calder-flamingo.jpg/640px-Calder-flamingo.jpg"), W("7/78/Calder-flamingo.jpg"), W("thumb/e/ec/Chicago_Federal_Center.jpg/1280px-Chicago_Federal_Center.jpg"), W("thumb/e/ec/Chicago_Federal_Center.jpg/640px-Chicago_Federal_Center.jpg"), W("e/ec/Chicago_Federal_Center.jpg")],
  counsel: [
    { type: "postcard", no: 4, place: "FEDERAL PLAZA · 13:15", text: "我有一个红色的远房亲戚。<br><br>它和我一样，<br>总是站在原地，等一个人。<br>它站在法院对面的广场上，<br>比周围的楼都醒目，<br>五十年来，一步也没走开过。<br><br>去见见它。", sign: "— X" },
    { type: "geo", place: "plaza", text: "去广场。<br>站到它的影子里。" },
    { type: "gate", text: "它叫什么？", accept: ["FLAMINGO", "火烈鸟", "红鹤", "THE FLAMINGO"],
      success: "Calder 的《火烈鸟》。<br>它的影子里压着一张纸条，墨迹未干：<br><br><i>\"进去。看看他们怎么审判别人。<br>记住：法庭上，也有狼。\"</i>" },
    { type: "clue", id: "c4" },
    { type: "note", title: "旁听", text: "13:30，1903 房间。<br>找到那间正在开庭的法庭，坐在最后一排。<br>不要说话。<br><br>☐ 听到一次 <i>\"Objection.\"</i><br>☐ 法官看了你一眼<br>☐ 你数清楚了，法庭里有几个人<br>☐ 你听见了自己的心跳" },
    { type: "gate", any: true, key: "courtroom", text: "你走进了哪一间法庭？<br>写下门口的房间号：", success: "已记入卷宗。<br><br>你在最后一排坐下。<br>法槌落下的时候，你忽然觉得，今天被审判的，也许不止台上那一个人。" },
    { type: "whisper", text: "法庭，也是一个舞台。<br><br>你想起来，<br>你们第一次一起站上舞台的那天。" },
    { type: "fragment", ids: [3, 4] },
    { type: "whisper", text: "法官敲下法槌的那一刻，<br>旁听席最后一排，<br>有什么东西窸窸窣窣地动了一下。<br><br>你回过头。<br>座位是空的。<br>只有椅背上，沾着一点灰白的绒毛。" },
    { type: "clue", id: "c5" },
    { type: "choice", prompt: "传票在你手里。<br>你要怎么回应？",
      options: [
        { label: "撕了它", score: -1, repeat: true,
          feedback: "纸被撕成两半，落在地上。<br><br>你走出二十步，手伸进口袋——<br>那里又有一张。<br>完好如初。" },
        { label: "\"小时候说的话，不算数。\"", score: 1,
          feedback: "法官沉默了很久，才开口：<br><i>\"可他说，十八岁那晚，你又答应了他一次。\"</i><br><br>十八岁那晚。<br>你一点也想不起来了。" },
        { label: "\"没有人能不长大。\"", score: 1,
          feedback: "法官没有回答。<br>旁听席最后一排，有什么东西窸窸窣窣地动了一下。<br><br>你回过头。<br>那里没有人。" }
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
    { type: "clue", id: "r1" },
    { type: "clue", id: "r2" },
    { type: "timedAdmit", seconds: 20,
      prompt: "风忽然停了。<br>X 的问题一个接一个浮现在你手机上。<br><small><b class=\"twenty\">20</b> 秒。沉默，就是承认。</small>",
      items: [
        { text: "你答应过永远陪我玩。", correct: "承认", why: "这是真的。" },
        { text: "十八岁那晚，你想起了我。", correct: "否认", why: "你没有。" },
        { text: "你去了芝加哥，就再也没回过家。", correct: "否认", why: "你回去过。" },
        { text: "你今天，二十岁了。", correct: "承认", why: "是的。" }
      ] },
    { type: "whisper", text: "法院大厅的长椅上，坐着一个人。<br><br>是证人 <b>W</b>。<br>TA 说，TA 知道你每年生日都在做一件奇怪的事。<br><br>可 TA 只肯回答三个字：<br><b>是。不是。不重要。</b>" },
    { type: "clue", id: "r4" },
    { type: "document", docTitle: "海龟汤 · 汤面", html: `
<h3>汤面</h3>
<p class="soup">她的生日，来了五次。<br><br>她只吹了一次蜡烛。</p>
<p class="doc-zh"><b>为什么？</b></p>
<p class="doc-footnote">向 W 提问。只能问"是不是"的问题。最多 <b class="twenty">20</b> 个。</p>` },
    { type: "codeGive", text: "把暗号（你们认识的那天）告诉助手，请 W 开口：", code: "ch2_toAssistant" },
    { type: "gate", text: "问完了？输入助手给你的<b>暗号</b>，揭开汤底：", code: "ch2_toCounsel" },
    { type: "cloze", prompt: "还原那一天。<br><small>先点一个空格，再点下面的词。</small>",
      text: "五句\"生日快乐\"，来自五个不同的 {{0}}。<br>最早的一句来自 {{1}}——芝加哥那时才 23 号上午十点，家人在视频里，对着还没过生日的她唱完了生日歌。<br>傍晚六点，{{2}} 走到了零点。<br>晚上十一点，轮到 {{3}}。<br>零点整，芝加哥。身边的人，为她点起了唯一的一根蜡烛。<br>最后一句在凌晨两点到达，来自 {{4}}——那里，才刚刚走进 24 号。<br>每一个人都守着 {{5}} 的零点，只为了做第一个对她说的人。",
      answers: ["时区", "北京", "伦敦", "纽约", "洛杉矶", "自己"],
      bank: ["城市", "时区", "北京", "悉尼", "伦敦", "巴黎", "纽约", "丹佛", "洛杉矶", "东京", "自己", "她"],
      perCorrect: 0.5 },
    { type: "award", flag: "depo" },
    { type: "bag", items: ["depo"], text: "汤底，封存。<br>疑点三，解开了：五个时区里，最先到的那一句，来自北京。<br>她走得再远，也没有忘了家。<br><br>W 转身要走，又停下来，背对着你说了最后一句话。" },
    { type: "clue", id: "c8" },
    { type: "fragment", ids: [10, 11] },
    { type: "whisper", text: "你在最后一页签下：<br><i>Aileen</i>。<br><br>墨水，比平时红了一点。" },
    { type: "photo", key: "ch2", prompt: "在红色的影子下，留一张照片。" },
    { type: "whisper", text: "走出法院的时候，天色已经暗了一点。<br><br>火烈鸟红色的钢架下面，<br>有两个小小的影子，一闪就不见了。" },
    { type: "document", docTitle: "调查笔记 · 第二章", cls: "notes", html: `
<p><b>已解开：</b>疑点三——她没有忘了家。五个时区的祝福里，最先到的，永远是北京。</p>
<p><b>新线索：</b>X 说火烈鸟和它一样，"总是站在原地，等一个人"；法庭最后一排窸窸窣窣的声音；W 说 X "从来没离开过那个家"。</p>
<p><b>可疑：</b>日记和十八岁的帖子，都在说"永远不长大"——像是在把你往"十岁的你"那边引。</p>
<p><b>排除：</b>如果 X 从没离开过那个家，那今天一直在芝加哥的人……</p>
<p class="doc-footnote">剩下的疑点：X 到底是谁？它为什么偏偏挑今天？</p>` },
    { type: "codeGive", text: "告诉助手，你生活的城市：", code: "ch1_toAssistant" }
  ],
  assistant: [
    { type: "geo", place: "plaza", text: "tour 结束后，跟她一起去联邦广场。<br><small>13:30 · 1903 房间 · USA v. Young。备选：13:00 · 1719 房间。</small>" },
    { type: "bag", items: ["exA", "exB"], text: "🔒 只有你看得见。她问起时，再念给她听。", noAward: true },
    { type: "document", docTitle: "🔒 关于 X", html: `
<img class="doc-photo" src="assets/sleeve-x.jpg" alt="空档案袋">
<p>档案袋是空的。没有照片，没有名字。<br>只有一根小羽毛。</p>
<p class="doc-footnote">🔑 "它叫什么？"——答案 FLAMINGO：广场中央那座红色的大钢雕，Calder 的《火烈鸟》。她卡住了，就提示："抬头，找红色。"</p>` },
    { type: "gate", text: "她请 W 开口时，输入暗号：", code: "ch2_toAssistant" },
    { type: "document", docTitle: "🔒 你是证人 W · 汤底", html: `
<p>她会问"是不是"的问题。你只能答：<b>是 / 不是 / 不重要</b>。声音放低，慢一点。最多 20 个问题。</p>
<h3>汤底</h3>
<p class="soup">五个人，散在<b>五个时区</b>。每个人都在等<b>自己那里的</b> 11 月 24 日零点，好第一时间对她说生日快乐。<br><br>
① <b>北京</b>（家人）：北京零点 = 芝加哥 <b>23 号上午 10 点</b>。家人打来视频唱生日歌——芝加哥的日历上还是 23 号，她的生日"还没到"，所以没有点蜡烛。<br>
② <b>伦敦</b>：伦敦零点 = 芝加哥 23 号傍晚 6 点。<br>
③ <b>纽约</b>（美东）：纽约零点 = 芝加哥 23 号晚上 11 点。<br>
④ <b>芝加哥</b>：零点整，身边的人为她点起<b>唯一一次</b>蜡烛——只有这一次，是她"自己的"生日零点。<br>
⑤ <b>洛杉矶</b>（美西）：洛杉矶零点 = 芝加哥 24 号凌晨 2 点。最后一句到的时候，身边的人都睡了。<br><br>
没有人记错日子。每个人都守着自己的零点——只为了做那个"第一个"。</p>
<p class="doc-footnote">汤面只有两句：<i>"她的生日，来了五次。她只吹了一次蜡烛。"</i><br>她要自己问出：五次是五个人说的"生日快乐"、五个人在五个时区、每个人都卡着自己的零点、第一句来的时候芝加哥还是 23 号、唯一一次吹蜡烛是在芝加哥零点。<br><b>提示节奏：</b>问满 10 个 →"五次，是五个人说的。"　问满 14 个 →"他们不在同一个地方。"　问满 18 个 →"零点，是谁的零点？"</p>` },
    { type: "counter", label: "她问了几个问题", max: 20 },
    { type: "codeGive", text: "问完了（或问满 20 个），告诉她暗号：", code: "ch2_toCounsel" },
    { type: "gate", text: "输入她给你的暗号：", code: "ch1_toAssistant", success: "下一站：Reckless Records。" }
  ]
},

/* =================== 第三章 · 唱片店 =================== */
{
  id: "ch3", title: "第三章", subtitle: "显影与 B 面", place: "拍照亭 · Reckless Records · Guitar Center", pace: "ch3",
  bg: [W("thumb/5/54/Wicker_Park%2C_Chicago.jpg/1280px-Wicker_Park%2C_Chicago.jpg"), W("thumb/5/54/Wicker_Park%2C_Chicago.jpg/640px-Wicker_Park%2C_Chicago.jpg"), W("5/54/Wicker_Park%2C_Chicago.jpg")],
  counsel: [
    { type: "postcard", no: 5, place: "1702 N. DAMEN · 15:05", text: "去照一张相。<br><br>老式的那种。<br>按下去以后，要等好几分钟，<br>它才会在药水里，慢慢显出样子。<br><br>有些人也是这样——<br>要过很多年，<br>你才看得清他们是谁。", sign: "— X" },
    { type: "geo", place: "strip", text: "去 Wicker Park 的复古拍照亭：The Strip Club Photobooth Studio（1702 N. Damen Ave）。" },
    { type: "whisper", text: "闪光灯亮了四次。<br><br>你们站在机器外面，等它吐出那一条湿漉漉的相纸。<br>第一格，你在笑。第二格，她在笑。<br>第三格，你们笑成一团。<br><br>第四格的角落里，<br>好像多了点什么。" },
    { type: "clue", id: "c12" },
    { type: "photo", key: "strip", prompt: "把显影出来的那一条照片拍下来，<br>封进物证袋。" },
    { type: "postcard", no: 6, place: "MILWAUKEE AVE · 15:40", text: "去唱片店。<br><br>每一张唱片，<br>都有一面没人听。<br><br>我在 <b>B 面</b>等你。", sign: "— X" },
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
        { label: "拒绝", flag: "rejected", score: 0.5, feedback: "你把唱片放回架子。<br><br>架子后面，有什么东西轻轻碰了一下你的手指。" }
      ] },
    { type: "whisper", text: "你低头。<br><br>地上，躺着一小撮绒毛。<br><br>是黄色的。<br>软软的，像旧玩偶身上掉下来的。" },
    { type: "clue", id: "c9" },
    { type: "fragment", ids: [12, 13, 14] },
    { type: "photo", key: "ch3", prompt: "挑一张唱片，拍下它的 B 面。" },
    { type: "postcard", no: 7, place: "2633 N. HALSTED · 16:40", text: "最后，去一个满墙都是吉他的地方。<br><br>挑一把。<br>弹一首。<br><br>你知道是哪一首。<br>第一首是它，最后一首也是它。", sign: "— X" },
    { type: "geo", place: "guitar", text: "去 Lincoln Park 的 Guitar Center（2633 N. Halsted St）。" },
    { type: "note", title: "试琴", text: "挑一把你喜欢的吉他，请店员让你试一试。<br><br>☐ 弹一段《鲜花》给 {assistant} 听<br>☐ 找到店里最贵的那一把，看一眼就好<br>☐ 记住你最喜欢的那把，是什么颜色" },
    { type: "whisper", text: "琴弦停下来的时候，店里忽然很安静。<br><br>墙上几百把吉他，<br>像是一起屏住了呼吸。<br><br>你想起那句话：<br>你本来是一个音符。<br>遇到他们，组成了旋律。<br><br>今天，你又多了一个听众——<br>只是你还不知道，是谁。" },
    { type: "document", docTitle: "调查笔记 · 第三章", cls: "notes", html: `
<p>你把两小撮绒毛并排放在桌上：一撮白里带蓝，一撮黄。</p>
<p>歪歪扭扭的字。小孩画的叉子。"很小，很会等"。一把金色的小颗粒当信物。日记里的"永远不长大"。</p><p>你越来越觉得：X，是一个小孩。</p>
<p>X 提出的条件，也很奇怪：它不要钱，不要道歉，只要你<b>每年生日，做一件从没做过的事</b>。</p>
<p>一个真正想报复你的人，不会提这种条件。</p>
<p class="doc-footnote">回家。今晚开庭，X 会亲自上证人席。</p>` },
    { type: "codeGive", text: "回家吧。把你弹的那首歌的名字告诉助手：", code: "ch3_toAssistant" }
  ],
  assistant: [
    { type: "geo", place: "strip", text: "跟她一起，去 Wicker Park 的复古拍照亭（1702 N. Damen Ave）。" },
    { type: "geo", place: "vinyl", text: "拍完照，往南走去唱片店。" },
    { type: "document", docTitle: "🔒 今天的答案", html: `
<dl class="lawlib">
<dt>"我本来是一个＿＿"</dt><dd>音符</dd>
<dt>第一首和最后一首</dt><dd>《鲜花》</dd>
<dt>人生第一个＿＿</dt><dd>livehouse</dd>
</dl>` },
    { type: "gate", text: "输入她报给你的<b>身份</b>：", code: "ch3_strength" },
    { type: "evalMemo" },
    { type: "geo", place: "guitar", text: "最后一起去 Guitar Center（2633 N. Halsted St）。她会弹一段《鲜花》给你听。" },
    { type: "gate", text: "那首歌的名字：", code: "ch3_toAssistant" }
  ]
},

/* =================== 第四章 · 晚餐 · 开庭 =================== */
{
  id: "ch4", title: "第四章", subtitle: "天黑请闭眼", place: "1414 E. 59th St. · 炸酱面与蛋糕", pace: "ch4",
  bg: [W("thumb/3/3b/Chicago_River_night.jpg/1280px-Chicago_River_night.jpg"), W("thumb/3/3b/Chicago_River_night.jpg/640px-Chicago_River_night.jpg"), W("3/3b/Chicago_River_night.jpg"), W("thumb/1/12/CTA_Night.jpg/1280px-CTA_Night.jpg"), W("thumb/1/12/CTA_Night.jpg/640px-CTA_Night.jpg"), W("1/12/CTA_Night.jpg")],
  counsel: [
    { type: "postcard", no: 8, place: "THE KITCHEN · 18:00", text: "回家吧。<br><br>北京人想家的时候，<br>会给自己做一碗面。<br>过生日的人，<br>应该有一个自己烤的蛋糕。<br><br>今晚，两样都由你来做。<br>做完，我们开庭。", sign: "— X" },
    { type: "gate", text: "餐巾纸上，有人用番茄酱写了一行字：<br><br><i>\"北京人最想念的那碗面，叫什么？\"</i>", accept: ["炸酱面", "老北京炸酱面", "ZHAJIANGMIAN"],
      success: "炸酱面。<br>黄瓜丝、豆芽、心里美萝卜……<br>一碗面，是一座城。" },
    { type: "fragment", ids: [15, 16] },
    { type: "note", title: "X 的食材清单", text: "<small>厨房的桌上，压着一张清单。对一对，东西都齐了吗？</small><br><br><b>炸酱面</b><br>☐ 六必居干黄酱　☐ 甜面酱　☐ 五花肉<br>☐ 黄瓜　☐ 豆芽　☐ 心里美萝卜（或白萝卜）　☐ 黄豆<br>☐ 宽面 / 手擀面　☐ 葱　☐ 姜　☐ 大蒜<br><br><b>蛋糕</b><br>☐ 鸡蛋　☐ 低筋面粉　☐ 白糖　☐ 牛奶　☐ 黄油<br>☐ 淡奶油　☐ 草莓<br>☐ 蜡烛 · <b>一根</b>　<small>（五次生日，只点一次。）</small><br><br><small>清单背面有一行小字：<i>\"两份。有人会陪你吃。\"</i></small>" },
    { type: "whisper", text: "回到 1414 E. 59th St.。<br><br>酱在锅里咕嘟咕嘟地冒泡，<br>烤箱里的蛋糕，正一点一点鼓起来。<br>满屋子，都是北京的味道。<br><br>你放下筷子的那一刻，<br>厨房里所有的钟，<br>同时停在了 11:24。<br><br>窗外，有什么东西轻轻敲了两下玻璃。<br><br>开庭了。" },
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
        { name: "8 · Iris", job: "旧玩具修补匠", biased: false }
      ] },
    { type: "choice", prompt: "天亮了。<br>你站起来，所有的目光都落在你身上。",
      options: [
        { label: "\"小时候的约定，绑不住二十岁的人。何况，协议上写着——我可以走。\"", score: 1.5, feedback: "八号陪审员 Iris 垂下眼睛，轻声说：<br><i>\"有些东西不会说话。可它们会一直等你回家。\"</i>" },
        { label: "\"X，你出来。\"", score: 0, feedback: "灯闪了一下。<br>没有人出来。<br>只有一小撮绒毛，慢慢飘过证人席。" },
        { label: "\"我什么都不记得了。\"", score: -0.5, feedback: "法官看着你：<br><i>\"那你更该害怕。\"</i>" }
      ] },
    { type: "clue", id: "c11" },
    { type: "objection",
      prompt: "X 走上证人席。<br>他戴着一张白狐面具，<br>声音很轻，很尖。<br><br>听到不对的话，喊<b>异议</b>。",
      grounds: ["他在引导", "道听途说", "他在揣测", "与本案无关"],
      lines: [
        { speaker: "X", text: "那年夏天，她第一次叫了我的名字。", ground: null },
        { speaker: "X 的律师", text: "被告是不是一个会抛下朋友的人？", ground: 0, why: "问题里已经替证人把答案说完了。" },
        { speaker: "X", text: "有人告诉我，她去了芝加哥，就不想回家了。", ground: 1, why: "\"有人告诉我\"，不能当作证据。" },
        { speaker: "X", text: "她每天早上，都会跟我说早安。", ground: null },
        { speaker: "X", text: "我猜，她现在一点也不想我。", ground: 2, why: "他不可能知道她在想什么。" },
        { speaker: "X 的律师", text: "你狼人杀最喜欢拿什么牌？", ground: 3, why: "这与本案毫无关系。" }
      ] },
    { type: "clue", id: "c10" },
    { type: "present", prompt: "X：<b>\"协议上，没有任何例外。\"</b><br><br>出示一件证物：",
      correct: "exD", score: 2,
      success: "你把那张纸推到他面前，指尖停在最后一行：<br><b>\"除非我变成一个很酷的大人。\"</b><br><br>白狐面具后面，只剩下很轻的呼吸声。",
      fail: "不是这个。<br>你需要那张从 Death Alley 的门缝里拿到的纸。" },
    { type: "present", prompt: "X：<b>\"她去了芝加哥，就把家里忘了。\"</b><br><br>出示一件证物：",
      correct: "depo", alt: "exB", score: 1.5, altScore: 0.5,
      success: "你把汤底摊开：<br>五个时区，五句生日快乐。<br>最先到的那一句，来自北京——那时芝加哥还是 23 号，她的家人，比谁都先等到了她的零点。<br><br>X 慢慢低下了头。<br>面具后面，好像有什么东西，轻轻抖了一下。",
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
        { label: "\"你那几颗糖，太便宜了。\"", score: -0.5 },
        { label: "\"你连脸都不敢露。\"", score: -0.5 }
      ] },
    { type: "whisper", text: "陪审团退庭。<br><br>二十点二十分。<br>墙上的钟，开始走了。" },
    { type: "verdict" },
    { type: "whisper", text: "你赢了。<br><br>可法官合上卷宗之前，<br>又念了一遍原告的最后一句陈述。<br>那句话，传票上没有写。<br><br><i>\"我们没有想赢。<br>我们只是想，再见她一面。\"</i><br><br>窗外的敲击声，停了。" },
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
<dt>8 · Iris</dt><dd>"有些东西不会说话，可它们记得你。" —— 好人</dd>
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

/* =================== 终章 · 厨房 =================== */
{
  id: "ch5", title: "终章", subtitle: "白狐面具", place: "1414 E. 59th St. · 厨房", pace: "ch5",
  bg: [W("thumb/1/16/Logan_Square_%287979593889%29.jpg/1280px-Logan_Square_%287979593889%29.jpg"), W("thumb/1/16/Logan_Square_%287979593889%29.jpg/640px-Logan_Square_%287979593889%29.jpg"), W("1/16/Logan_Square_%287979593889%29.jpg"), W("thumb/7/70/Illinois_Centennial_Memorial_Column.jpg/1280px-Illinois_Centennial_Memorial_Column.jpg"), W("thumb/7/70/Illinois_Centennial_Memorial_Column.jpg/640px-Illinois_Centennial_Memorial_Column.jpg"), W("7/70/Illinois_Centennial_Memorial_Column.jpg")],
  counsel: [
    { type: "postcard", no: 9, place: "THE KITCHEN · 21:00", text: "面吃完了吗？<br>碗洗了吗？<br><br>窗外起风了。<br>我就在窗外。<br><br>把灯关掉一盏。<br>我会摘下面具。", sign: "— X" },
    { type: "whisper", text: "你关掉了一盏灯。<br><br>厨房暗下来。<br>窗玻璃上，慢慢浮出一张白狐面具。<br><br>它就停在窗台上。<br>一动不动。" },
    { type: "deduce" },
    { type: "narration", title: "面具之下", text: "X 抬起手。<br>不——是抬起了<b>两只</b>翅膀。<br><br>白狐面具从窗台上滑落，<br>在地板上转了一圈，停住。<br><br>面具后面，什么人也没有。<br><br>只有两只小鸟。<br>一只蓝白色，一只黄色。<br>挨在一起，歪着头，看着你。<br><br>像很多年前的那个夏天，<br>你第一次把它们带回家时那样。<br><br><b>{plaintiff}</b>。" },
    { type: "feathers", text: "{plaintiffMessage}" },
    { type: "postcard", no: 20, place: "THE LAST LETTER", text: "我们一共写了二十封信。<br>你只收到了九封。<br><br>剩下的十一封，没有寄出去。<br>因为它们不用寄——<br>那是你和朋友们，一起过的日子。<br><br>你离开北京以后，<br>我们每天早上都停在窗边，<br>等那扇门打开。<br><br>它没有开。<br>可我们听说，你过得很好。<br><br>那就好。", sign: "— 蛋清 & 蛋黄" },
    { type: "fragment", ids: [18, 19, 20] },
    { type: "twenty" },
    { type: "cloze", title: "还原真相", prompt: "最后一个疑点：它们为什么偏偏挑今天？<br>把这个案子，从头还原一遍。<br><small>先点一个空格，再点下面的词。</small>",
      text: "X 是 {{0}}。它们住在 {{1}}，每天早上等她说早安。<br>它们告她，不是想让她 {{2}}，<br>只是想确认：长大以后的她，还会不会 {{3}}。<br>所以协议里，藏着一条出路：除非她变成一个很酷的 {{4}}。<br>今天走过的每一站，对她来说都是 {{5}}。<br>因为三年来，是她一直拉着别人 {{6}}——<br>今天，有人把这件事，原样还给了她。",
      answers: ["蛋清和蛋黄", "北京", "认输", "快乐", "大人", "第一次", "去尝试新鲜的东西"],
      bank: ["蛋清和蛋黄", "十岁的她", "北京", "芝加哥", "认输", "快乐", "小孩", "大人", "第一次", "最后一次", "去尝试新鲜的东西", "永远不长大"],
      perCorrect: 0.5,
      okText: "全部还原。<br><br>疑点四，解开了。<br>案子，到这里，才算真正结束。" },
    { type: "signature", who: "counsel", label: "Aileen，请签名" },
    { type: "signature", who: "assistant", label: "把手机交给助手，请 TA 签名" },
    { type: "judgment" },
    { type: "dossier" },
    { type: "letter" },
    { type: "document", docTitle: "结案附言 · 法官写在卷宗最后一页", html: `
<div class="epilogue">
<p>本庭审过很多案子。这一件，原告是两只鸟，被告是一个刚满二十岁的人，呈上来的证据，是一串日期。</p>
<p>宣判以后，本庭把卷宗从头翻了一遍，才弄明白：这个案子，从一开始就不是要定谁的罪。</p>
<p>三年前的一个晚上，有个人在一张很长的餐桌边认识了你。那时候的她，还不太敢做新的事——没进过 livehouse，没上过台，没跟朋友出过远门。是你拉着她去的。你陪她一言不合地跟踪别人，陪她站在鼓声最响的地方，陪她走上 Keystone Idol 的舞台，划掉了清单上的第一件事。后来是洛阳的夜，西藏的车站，毕业那天的长袍，夏威夷的沙滩。她一直走在你旁边，学着把日子过得热闹一点。</p>
<p>你说过，你本来是一个音符。可你大概不知道，对别人来说，你也是那个让旋律响起来的人。</p>
<p>所以今天，她想把这件事还给你。</p>
<p>今天的一切，都是第一次：第一次坐进真正的联邦法庭旁听，第一次跟着导游走进 Death Alley，听这座城市的鬼故事，第一次在唱片店翻一张不认识的 B 面，第一次在芝加哥，亲手给自己做一碗北京的炸酱面。她把你教给她的事——去试试，去感受——原样做成了一整天，送回给你。</p>
<p>这就是这份礼物的意思：你总是让别人不再孤独。今天，轮到你被别人认真地惦记一次。</p>
<p>协议作废了。但判决书上附带的那一条，本庭希望你一直遵守：二十岁以后，也要好奇，也要快乐。</p>
<p class="doc-sign">你已经在家了。<br>最后一件证物，就在你身后。</p>
</div>` },
    { type: "surprise", text: "抬头。<br><br>吴妍曦有礼物给你。" }
  ],
  assistant: [
    { type: "narration", title: "最后", text: "吃完炸酱面、洗完碗，她会看到 X 摘下面具——是蛋清和蛋黄。<br>她会收齐二十片记忆，还原真相，再把手机交给你签名。<br>然后她会读到结案附言，最后一句是：<i>\"最后一件证物，就在你身后。\"</i>" },
    { type: "narration", title: "🎁 现在", text: "她的手机会写：\"抬头，吴妍曦有礼物给你\"，并开始放生日歌。<br>那一刻，你站在她身后。<br><br>人物肖像衣服 · 黄金蛋糕 · 手写书 · 吉他支架。" }
  ]
}
];
