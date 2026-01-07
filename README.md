# EcoNavi (エコナビ) - AI Waste Sorting Assistant

EcoNavi is a web-based application that helps users correctly sort their waste using AI image recognition and barcode scanning. It features a gentle, Ghibli-inspired user interface to make the recycling process more enjoyable.

## 🌟 Features

*   **AI Image Recognition**: Upload a photo of trash, and Google Gemini AI will analyze it and tell you how to sort it (Burnable, Non-burnable, PET bottle, etc.).
*   **Barcode Scanning**: Scan product barcodes to automatically retrieve the product name and get AI-powered sorting advice.
*   **Location-Based Rules**: Supports sorting rules for 1700+ municipalities in Japan (with detailed overrides for Shibuya and Yokohama).
*   **Eco Points & Badges**: Gamification system where you earn points for sorting correctly and unlock badges.
*   **Disaster Waste Info**: Provides information on waste disposal during disasters (offline capable).
*   **Ghibli-Style UI**: A soothing, hand-drawn aesthetic with animations and soft colors.

## 🚀 How to Use

1.  **Open the App**: Open `index.html` in your web browser.
2.  **Set Location**: Enter your Japanese city/ward (e.g., "横浜市") to get specific sorting advice.
3.  **Choose Method**:
    *   **Barcode**: Tap the barcode button and scan a product code.
    *   **Photo**: Tap the upload area to take a picture or select an image file.
4.  **View Results**: The AI will classify the item and show you the correct category and disposal tips.

## ⚙️ Setup

To use the AI features, you need a **Google Gemini API Key**.

1.  Get a free API key from [Google AI Studio](https://makersuite.google.com/app/apikey).
2.  In the app, click "APIキー設定" (API Key Settings) at the bottom.
3.  Paste your key and click "保存" (Save).
    *   *Note: The key is saved locally in your browser.*

## 📂 Project Structure

*   `index.html`: The main application file containing HTML, CSS, and logic.
*   `gamification.js`: Handles points, badges, and user progress.
*   `README.md`: This file.

## 🎨 New Updates

*   **UI Overhaul**: Completely redesigned with a "Ghibli-esque" theme (Zen Maru Gothic font, pastel colors, rounded UI).
*   **Barcode Fix**: Fixed the barcode scanner connection to the AI for accurate product analysis.
*   **API Update**: Updated to use the reliable `v1beta` endpoint for Gemini Flash.

---
*EcoNavi - Making recycling a little happier.*
