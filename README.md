<div align="center">

# ♻️ EcoNavi  
**AI-Powered Waste Sorting App - For Foreign Residents in Japan**

<i>“Confused about Japan’s garbage rules? EcoNavi is here to help.”</i>  

</div>

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

---
