# ♻️ EcoNavi

<details>
<summary>🇯🇵 日本語のドキュメントを表示 (Click to expand)</summary>

# ♻️ エコナビ (EcoNavi)
**AI技術を活用した、在留外国人向けゴミ分別サポートアプリ**

<i>「日本の複雑なゴミ分別ルールで困っていませんか？エコナビがあなたの生活をお手伝いします。」</i>

---

## 📖 概要

多くの在留外国人の方が日本での生活で直面する大きな課題の一つが、**ゴミの分別**です。
分別ルールは自治体（市区町村）ごとに異なり、非常に細かく、多くの場合、**日本語でしか情報が提供されていません**。
たとえば、ペットボトルは「キャップ」と「ラベル」を外さなければならず、割り箸や紙ゴミなどの扱いも地域によって異なります。

**EcoNavi（エコナビ）**は、こうした日本独自の複雑な分別ルールに悩む**在留外国人の方々**をサポートするために開発されました。
スマートフォンでゴミの写真を撮るだけで、AIがそのアイテムを識別し、お住まいの地域の自治体ルールに合わせた正しい分別方法を表示します。

**「日本での生活をもっとシンプルに、そして環境に優しく。」** — それがエコナビの使命です。

---

## ✨ 主な機能

- 🤖 **AI画像認識**
  ペットボトル、乾電池、アルミ缶などを瞬時に見分けます（Google Gemini APIを使用）。

- 📍 **地域に合わせた分別ルール**
  日本全国の自治体に対応しており、お住まいの地域ごとの分別ルールを表示します。

- 🗺️ **かんたんな地域設定**
  - 市区町村の名前を入力（予測入力つき）
  - GPS機能による現在地の自動検出

- 🔗 **公式情報へのアクセス**
  お住まいの自治体が公開している、公式のゴミ分別案内ページに直接アクセスできます。

- 📱 **親切なデザイン**
  日本語が苦手な方でも、直感的に操作しやすいシンプルな画面設計です。

---

## 🛠️ 技術スタック

- **フロントエンド**: HTML, CSS, JavaScript
- **CSS フレームワーク**: Tailwind CSS
- **AI / 機械学習**: Google Gemini API（画像認識用）
- **位置情報**: HeartRails Geo API（郵便番号・住所情報取得用）
- **商品データ**: Open Food Facts API（バーコード検索用）
- **バーコードスキャン**: QuaggaJS（ブラウザ側でのバーコード読み取りライブラリ）

---

## 🔑 APIキーの設定

### Google Gemini APIキーを無料で取得する方法

1. 以下のサイトにアクセスします： https://makersuite.google.com/app/apikey
2. お使いのGoogleアカウントでサインインします。
3. Generative Language APIを有効にします。
4. "Create API Key"（APIキーの作成）をクリックします。
5. 作成されたAPIキーをコピーします。

## 🪄 初回起動と機能の紹介

### APIキーの設定（一般ユーザー向け）
AIによる画像認識機能を使用するには、**Google Gemini APIキー**の設定が必要です。

アプリ下部にある**「APIキー設定」**ボタンを押して、設定画面を開きます。
入力欄にコピーしたAPIキーを貼り付け、**「保存」**をクリックしてください。

APIキーを設定せずに画像認識機能を使おうとすると、自動的に設定画面が開きます。

> **注意:** 入力したAPIキーはお使いのブラウザ内（ローカルストレージ）にのみ安全に保存され、外部に送信されることはありません。
> 設定画面からいつでも更新や削除が可能です。

---

## 💻 使用言語
- HTML5
- CSS3
- JavaScript (ES6+)

---

## 🚀 使い方

1. ブラウザで `index.html` を開きます。
2. お住まいの市区町村を手動で設定するか、「現在地を検出」ボタンを押します。
3. 分別したいゴミの写真をアップロードするか、画面にドラッグ＆ドロップします。
4. AIがゴミの種類を認識し、お住まいの地域の分別方法を分かりやすく表示します。

---

## 🌱 今後の計画

- ゴミ収集カレンダーとの連携機能
- ゴミ出し日の通知（リマインダー）機能
- AIの認識精度の向上と、対応するゴミの種類の拡大
- 多言語対応の強化

---

## 💡 アプリ開発の背景

日本に住む多くの外国人住民は、以下のような課題に直面しています：
- 住民登録をしている自治体によってルールが大きく異なること
- 分別の説明書が日本語でしか書かれていないことが多いこと
- 分別を間違えると、近所トラブルや回収拒否に繋がること

エコナビは、これらの困りごとを解決するために作られました。
**外国人住民の暮らしを支える生活サポートツール**であると同時に、地球環境をきれいに保つための一助となることを目指しています。

---

## 🎮 ゲーム要素（追加機能！）

ゴミ分別をただ正しいだけでなく、**楽しく続けられる体験**にするために、新しく**エコポイント機能**と**テーマ着せ替えストア**を追加しました。

### 🌿 エコポイント機能
アプリ内で環境に優しい行動をとることで、ポイントがたまります：

| 行動 | 獲得ポイント |
|:--|:--:|
| ゴミ分別に成功 | +10P |
| 1日の最初のログイン | +1P |
| エコ情報（ヒント）を読む（1日1回） | +5P |

獲得した累計ポイントは画面上部に表示され、ブラウザ内に安全に記録されます。

### 🏞️ 季節のテーマ着せ替えストア
ためたポイントを使って、日本の四季を美しく表現した背景テーマと交換できます。

| テーマ名 | 必要なポイント | 説明 |
|:--|:--:|:--|
| 🌸 春 | 10P | 桜をモチーフにした優しいピンク色の背景 |
| ☀️ 夏 | 10P | 夏の青空をイメージした爽やかなブルーの背景 |
| 🍁 秋 | 10P | 紅葉をあしらった温かみのあるオレンジ色の背景 |
| ❄️ 冬 | 10P | 静かな冬を感じさせるホワイトとブルーの背景 |

購入したテーマはすぐに画面に適用され、次回以降の起動時にも保存されます。
画面下の「ポイントストア」ボタンから、いつでも交換画面を開くことができます。

### 🧠 技術的な概要
- ポイントの管理、購入したアイテム、適用中のテーマは、ブラウザの**localStorage（ローカルストレージ）**で安全に管理しています。
- ゲーム化の仕組みは、既存のプログラムに影響が出ないよう、**独立したプログラム（`gamification.js`）**として綺麗に分かれています。
- ストア画面は**モーダルウィンドウ（ポップアップ画面）**として表示され、元のすっきりしたデザインを損なうことなく配置されています。

> 💡 *エコナビは、楽しみながら自然と地球にやさしい生活を続けられるように後押しします。*

</details>

<details>
<summary>🇺🇸 Show English Document (Click to expand)</summary>

# ♻️ EcoNavi  
**AI-Powered Waste Sorting App - For Foreign Residents in Japan**

<i>“Confused about Japan’s garbage rules? EcoNavi is here to help.”</i>  

---

## 📖 Overview

One of the biggest challenges many foreign residents face in Japan is **waste sorting**.  
Rules vary by municipality, are often very detailed, and in most cases, **information is only available in Japanese**.  
For example, PET bottles must have the **cap** and **label** removed, and even items like chopsticks or paper waste are handled differently depending on the city.  

**EcoNavi** was developed to support **foreign residents in Japan** who struggle with these complex, Japan-specific rules.  
Simply take a photo of your trash with your smartphone, and the AI will identify the item and show the correct sorting method according to your local regulations.  

**“Make life in Japan easier, and kinder to the environment.”** — that is EcoNavi’s mission.  

---

## ✨ Key Features

- 🤖 **AI Image Recognition**  
  Instantly identifies PET bottles, batteries, aluminum cans, and more (powered by Google Gemini API).  

- 📍 **Region-Specific Rules**  
  Supports all municipalities across Japan and displays sorting rules based on your location.  

- 🗺️ **Easy Location Setup**  
  - Enter municipality name (with autocomplete)  
  - Automatically detect location via GPS  

- 🔗 **Official Resources**  
  Direct access to your municipality’s official waste sorting guide.  

- 📱 **User-Friendly Design**  
  A simple UI, easy to use even with limited Japanese skills.  

---

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript  
- **CSS Framework**: Tailwind CSS   
- **AI / Machine Learning**:  Google Gemini API (for image recognition)
- **Geolocation**:  HeartRails Geo API (for reverse geocoding)
- **Product Data**:  Open Food Facts API (for barcode lookup)
- **Barcode Scanning**:  QuaggaJS (client-side library)

---

## 🔑 API Key Setup

### Get Your Free Google Gemini API Key

1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Enable the Generative Language API
4. Click "Create API Key"
5. Copy your API key

## 🪄 First Launch & Feature Guide

### API Key Setup (for General Users)
To use the **AI-powered image recognition feature**, you’ll need a **Google Gemini API key**.

Click the **“API Key Settings”** button at the bottom of the app to open the setup screen.  
Paste your API key into the input field and click **“Save”**.

If you attempt to use the image recognition feature without setting an API key, the setup screen will open automatically.

> **Note:** Your API key is securely stored in your browser’s local storage and is never shared externally.  
> You can update or clear your API key anytime from the settings screen.

---

## 💻 Languages

- HTML5  
- CSS3  
- JavaScript (ES6+)  

---

## 🚀 How to Use

1. Open `index.html` in your browser.  
2. Set your municipality manually, or use the “Detect Current Location” button.  
3. Upload or drag & drop a photo of the item you want to sort.  
4. The AI will recognize the item and display the correct sorting method based on your local rules.  

---

## 🌱 Future Plans

- Integration with garbage collection calendars  
- Push notification reminders for disposal days  
- Improved AI accuracy and support for more item categories
- Supports various languages 

---

## 💡 Why We Built This App

Many foreign residents in Japan face challenges such as:  
- Different rules depending on the municipality  
- Instructions often only in Japanese  
- Mistakes can result in complaints from neighbors or uncollected trash  

EcoNavi was created to eliminate these difficulties.  
It aims to be not only a **life support tool for foreign residents** but also an app that contributes to a cleaner, more sustainable environment.  

---

## 🎮 Gamification Features (New!)

To make waste sorting not only easier but also **fun and rewarding**, EcoNavi now includes a **gamified Eco Points system** and a **customizable Theme Store**.

### 🌿 Eco Points System  
Earn points for eco-friendly actions within the app:

| Action | Points |
|:--|:--:|
| Successful waste sorting | +10P |
| First login of the day | +1P |
| Viewing an eco tip (once per day) | +5P |

Your total Eco Points are displayed in the app header and stored safely in your browser via **localStorage**.

### 🏞️ Seasonal Theme Store  
Redeem your points for **seasonal background themes**, each beautifully designed to match Japan’s four seasons.

| Theme | Cost | Description |
|:--|:--:|:--|
| 🌸 Spring | 10P | Gentle pink background with cherry blossom imagery |
| ☀️ Summer | 10P | Bright blue background evoking clear summer skies |
| 🍁 Autumn | 10P | Warm orange tones inspired by falling leaves |
| ❄️ Winter | 10P | Cool white and blue hues for a calm winter mood |

Once purchased, themes are applied instantly and saved for future sessions.  
Access the Theme Store anytime from the **“Point Store”** button in the footer menu.

### 🧠 Technical Overview
- Points, purchased items, and selected themes are managed using **localStorage**.  
- All gamification logic is implemented in a **dedicated file (`gamification.js`)**, minimizing changes to existing code.  
- The store appears as a **modal window**, seamlessly integrated with the existing UI design.

> 💡 *EcoNavi now helps users live sustainably — and enjoy doing it through a simple, rewarding experience.*

</details>
