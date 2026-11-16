# 第二十号档案 · Case File No. 20

一个双人网页解谜游戏，用来给 Aileen 过20岁生日。
她是**大律师**（也是被告），你是她的**助手**。神秘原告 **Mr. X** 以"违反《永远不长大协议》"为由起诉了她，她要一路搜证、审问证人、上法庭，为自己打赢这场官司。

## 文件说明

| 文件 | 作用 |
|---|---|
| `index.html` | 入口页面 |
| `content.js` | **所有剧情、名字、密码、信件都在这里，要改内容就改这个文件** |
| `game.js` | 游戏引擎（一般不用改） |
| `style.css` | 样式 |

## 第一次运行

在 VS Code 里装 **Live Server** 插件，右键 `index.html` → **Open with Live Server**。
也可以直接双击 `index.html`，用浏览器打开。

## 发布到网上（GitHub Pages）

1. 把这几个文件 commit 并 push 到 GitHub repo 的 `main` 分支
2. 打开 repo → **Settings** → **Pages**
3. Source 选 **Deploy from a branch**，Branch 选 `main` / `(root)`，点 Save
4. 等一两分钟，网址会是：`https://<你的用户名>.github.io/<repo名>/`

## 两个人怎么玩

- 她打开：`https://.../?role=counsel`
- 你打开：`https://.../?role=assistant`
- 也可以直接打开首页，自己选择身份

两部手机之间没有联网同步，靠**口头互报密码**推进剧情。进度会自动存在各自的浏览器里，关掉网页也不会丢。

想从头开始：在网址后面加 `?reset=1`，或者点页面底部的"重新开始"。

## 现场线索（需要到地点才能解开）

| 章节 | 地点 | 线索 | 答案 |
|---|---|---|---|
| 第一章 | 联邦大楼 / Federal Plaza | 蛋黄和蛋清的红色远房亲戚，站在联邦大楼前 | `FLAMINGO`（Calder 的《火烈鸟》雕塑），也接受"火烈鸟" |
| 第二章 | 芝加哥历史博物馆旁，林肯公园 | 住了一百多年的邻居，门上刻着他的名字 | `COUCH`（Couch Tomb） |
| 终章 | Lincoln Lodge（Comic Court 散场后） | 今晚喜剧法庭判了什么 | 自由填写，会写进判决书 |

如果她找不到答案，助手的手机上有提示。

## 要改的地方（都在 `content.js` 顶部的 `CONFIG`）

- `herName` / `assistantName`：两个人的名字
- `plaintiffReveal` / `plaintiffMessage`：结局揭晓原告的身份，以及原告的最后陈述
- `letter`：Z号证物，也就是你写给她的信
- `giftHint`：实体礼物藏在哪里（留空 `""` 就不显示）
- `codes.pace`：**节奏锁**。比如设置 `ch2: "COURT"`，她进入第二章前就要输入这个码。你可以等到你们真的走到法院门口，再把码告诉她。

> 情节纯属虚构，仅供娱乐。
