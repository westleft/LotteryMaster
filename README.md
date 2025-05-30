![](https://i.imgur.com/WuRTboL.jpg)

# LotteryMaster

![](https://img.shields.io/badge/-React-80DEEA?logo=react&logoColor=fff&logoWidth=12) ![](https://img.shields.io/badge/-Solidity-1C1C1C?logo=solidity&logoColor=white&logoWidth=12)

➤ 連結：https://lottery-master-git-main-westlefts-projects.vercel.app/

`Lottery Master` 是一個部屬在區塊鏈（Sepolia）上的抽獎遊戲，玩家只要選一個喜歡的數字、並投入 0.01 ETH 至獎金池即可參加抽獎，如果幸運猜中數字將可獲得總獎金的 80%，同時系統將重置隨機數字，提供下一輪玩家抽獎。

![](https://i.imgur.com/qwn0KnH.jpg)

因為是部屬在 Sepolia 測試鏈，只要領取測試幣就可以抽獎，**不用花費主網的 ETH**。

## 前端畫面一覽

| 首頁 |　抽獎頁 |
| ---- | ---- |
| ![首頁](https://i.imgur.com/AdaVV4f.jpg) | ![抽獎頁](https://i.imgur.com/A2CLaWS.jpg) |

| 抽獎規則頁 |　領取代幣頁 |
| ---- | ---- |
| ![抽獎規則頁](https://i.imgur.com/Rv0FfL0.jpg) | ![領取代幣頁](https://i.imgur.com/p1R1ILa.jpg) |

| 確認交易 |　抽獎結果頁 |
| ---- | ---- |
| ![確認交易](https://i.imgur.com/tKZH4mG.jpg) | ![抽獎結果頁](https://i.imgur.com/groL2fe.jpg) |

## 關於開發

* 智能合約：使用 `Hardhat` 框架開發，並透過 Chainlink VRF 產生隨機數字。
* 前端：使用 `React` 搭配 `ether.js` 串接合約，站內通知使用 `react-toastify`。

## 其他

* [Free Logo Maker](https://www.namecheap.com/logo-maker/app/new) 產生 LOGO
