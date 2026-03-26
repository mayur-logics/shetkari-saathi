# 🌾 Shetkari Saathi | शेतकरी साथी

> **AI-powered farming assistant website for Maharashtra's farmers — soil advice, market prices, disaster relief & weather alerts in Marathi.**

---

## 🖥️ About the Project

Shetkari Saathi is a free, AI-powered web application built for farmers across Maharashtra. The website provides region-specific agricultural guidance in Marathi — covering soil health, market intelligence, government disaster relief schemes, and weather advisories — all in one place, without any app download or technical knowledge required.

The project was built with one goal: **reduce information asymmetry for Maharashtra's farmers**, especially in Vidarbha and Marathwada where lack of timely information leads to crop loss, debt, and distress.

---

## ✨ Features

### 💬 AI Chat (चॅट)
- Marathi-language AI chatbot powered by Claude API
- Region-specific responses based on selected area
- Quick query buttons for common farming questions
- Supports Vidarbha, Marathwada, Konkan, Western Maharashtra, Nashik & Khandesh dialects

### 🪱 Soil Analysis (माती विश्लेषण)
- Input soil test values — pH, Nitrogen, Phosphorus, Potassium
- Get crop recommendations suited to your soil and season
- Fertilizer dosage in local units (bags, not kg/ha)
- Organic amendment suggestions for low-budget farmers

### 💰 Market & Gain/Loss Calculator (बाजार & नफा-तोटा)
- Current market prices for 10 major Maharashtra crops
- Gain/Loss calculator based on yield, selling price, input cost & transport
- Break-even price alert — know before you sell if you're in profit or loss

### 🆘 Disaster Relief & Schemes (नुकसान & योजना)
- Select disaster type — hail, flood, drought, heat wave, pest, unseasonal rain
- Get matched government schemes — PMFBY, NDRF, SDRF, and more
- Step-by-step guidance on documents needed and how to apply
- Farmer category aware — Marginal, Small, Large landholding

### 🌦️ Weather Advisory (हवामान)
- Season and crop specific weather advice
- Live weather alert cards — hail warnings, monsoon forecast, sowing windows, heat wave alerts

---

## 🗺️ Region Support

| Region | Dialect Style | Key Crops |
|--------|--------------|-----------|
| विदर्भ | Warm, direct | Cotton, Soybean |
| मराठवाडा | Drought-aware | Sugarcane, Soybean |
| कोकण | Soft, coastal | Rice, Cashew, Kokum |
| पश्चिम महाराष्ट्र | Progressive | Grapes, Onion, Pomegranate |
| नाशिक | Horticulture focus | Grapes, Onion, Tomato |
| खान्देश | Ahirani mix | Banana, Cotton |

---

## 🛠️ Tech Stack

- **Frontend** — HTML5, CSS3, JavaScript (Vanilla)
- **AI** — Anthropic Claude API (claude-sonnet)
- **Fonts** — Google Fonts (Rajdhani, Teko, Share Tech Mono)
- **Hosting** — GitHub Pages / Netlify / Vercel (free)

---

## 📁 Project Structure

```
shetkari-saathi/
├── index.html       # Main website
├── style.css        # Styling & dark theme
├── script.js        # Logic & Claude API integration
└── README.md        # This file
```

> ⚠️ **Important:** All files must be in the **root folder** of the repository. Do NOT place `style.css` inside a `css/` folder or `script.js` inside a `js/` folder — GitHub Pages will not find them.

---

## 🚀 How to Run Locally

1. Clone the repository
```bash
git clone https://github.com/mayur-palaskar23/shetkari-saathi.git
```

2. Open `index.html` in your browser — that's it!

> No build tools, no npm install, no server needed.

---

## 👨‍💻 Credits

**Developed by:** Mayur Palaskar  
**College:** MMIT Pune  
**Purpose:** Student project for AI in Maharashtra Agriculture

---

## 🤝 Acknowledgements

- Inspired by the real challenges faced by farmers in Vidarbha and Marathwada
- Data references: ICAR, IMD, Agmarknet, Maharashtra Government Schemes
- AI: Anthropic Claude

---

© 2026 Shetkari Saathi | MMIT Pune | Made with ❤️ for Maharashtra's Farmers
