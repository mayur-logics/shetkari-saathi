// ─── State ─────────────────────────────────────────────────────────────
let currentRegion = "Vidarbha";
let currentLang   = "mr";

// ─── Language strings ───────────────────────────────────────────────────
const UI = {
  mr: {
    welcome: "नमस्कार शेतकरी! मी शेतकरी साथी AI आहे. तुमच्या शेतीसाठी मी येथे आहे. खाली दिलेले प्रश्न विचारा किंवा स्वतःचा प्रश्न टाइप करा. 🌱",
    placeholder: "प्रश्न टाइप करा...",
    you: "YOU",
    quick: ["🌾 पीक सल्ला", "🐛 कीड नियंत्रण", "💰 बाजार भाव", "🏔️ जमीन सुधारणा", "🌦️ हवामान"],
    quickQ: [
      "माझ्या प्रदेशासाठी सर्वोत्तम पीक कोणते?",
      "सेंद्रिय कीड नियंत्रण कसे करावे?",
      "आत्ता कांदा आणि टोमॅटोचा बाजारभाव काय आहे?",
      "माझी जमीन सुधारण्यासाठी काय करावे?",
      "या आठवड्यात शेतीसाठी हवामान कसे असेल?"
    ]
  },
  hi: {
    welcome: "नमस्ते किसान! मैं शेतकरी साथी AI हूँ। आपकी खेती के लिए मैं यहाँ हूँ। नीचे दिए गए प्रश्न पूछें या अपना प्रश्न टाइप करें। 🌱",
    placeholder: "अपना सवाल टाइप करें...",
    you: "YOU",
    quick: ["🌾 फसल सलाह", "🐛 कीट नियंत्रण", "💰 बाजार भाव", "🏔️ मिट्टी सुधार", "🌦️ मौसम"],
    quickQ: [
      "मेरे क्षेत्र के लिए सबसे अच्छी फसल कौन सी है?",
      "जैविक कीट नियंत्रण कैसे करें?",
      "अभी प्याज और टमाटर का बाजार भाव क्या है?",
      "मेरी मिट्टी सुधारने के लिए क्या करूँ?",
      "इस हफ्ते खेती के लिए मौसम कैसा रहेगा?"
    ]
  },
  en: {
    welcome: "Hello Farmer! I'm Shetkari Saathi AI, here to help with your farming needs. Ask from the quick options below or type your own question. 🌱",
    placeholder: "Type your question here...",
    you: "YOU",
    quick: ["🌾 Crop Advice", "🐛 Pest Control", "💰 Market Prices", "🏔️ Soil Health", "🌦️ Weather Tips"],
    quickQ: [
      "What are the best crops for my region?",
      "How to control pests organically?",
      "What are current market prices for onion and tomato?",
      "How can I improve my soil quality?",
      "What will the weather be like for farming this week?"
    ]
  }
};

// ─── Responses ──────────────────────────────────────────────────────────
const RESPONSES = {
  crop: {
    mr: {
      Vidarbha: "विदर्भात या हंगामात **कापूस, सोयाबीन, तूर** हे प्रमुख पीक आहेत. ऑक्टोबर-नोव्हेंबरमध्ये रब्बी हंगामासाठी **हरभरा आणि गहू** देखील घेता येतो. मृद परीक्षण करून खत व्यवस्थापन करा.",
      Marathwada: "मराठवाड्यात **सोयाबीन, कापूस, तूर** प्रमुख पीक आहेत. कमी पाण्यात येणाऱ्या **बाजरी आणि ज्वारी** चांगल्या आहेत. ठिबक सिंचनाचा वापर करा.",
      Konkan: "कोकणात **भात, नारळ, आंबा, काजू** हे मुख्य पीक आहेत. डोंगराळ भागात **वेलची, जायफळ** देखील येते. खारफुटीजवळ मत्स्यपालन फायदेशीर आहे.",
      "Western Maharashtra": "पश्चिम महाराष्ट्रात **ऊस, द्राक्षे, डाळिंब, कांदा** प्रमुख आहेत. सध्या **टोमॅटो आणि मिरची** ची मागणी जास्त आहे.",
      Nashik: "नाशिकमध्ये **द्राक्षे, कांदा, टोमॅटो, स्ट्रॉबेरी** प्रसिद्ध आहेत. निर्यातक्षम द्राक्षांसाठी **थॉम्पसन सीडलेस** जात निवडा."
    },
    hi: {
      Vidarbha: "विदर्भ में इस मौसम में **कपास, सोयाबीन, अरहर** प्रमुख फसलें हैं। रबी सीजन में **चना और गेहूं** भी ले सकते हैं। मिट्टी परीक्षण करके उर्वरक प्रबंधन करें।",
      Marathwada: "मराठवाड़ा में **सोयाबीन, कपास, अरहर** मुख्य फसलें हैं। कम पानी में **बाजरा और ज्वार** अच्छी होती हैं। ड्रिप सिंचाई का उपयोग करें।",
      Konkan: "कोंकण में **धान, नारियल, आम, काजू** प्रमुख फसलें हैं। पहाड़ी इलाकों में **इलायची और जायफल** भी होती है।",
      "Western Maharashtra": "पश्चिम महाराष्ट्र में **गन्ना, अंगूर, अनार, प्याज** प्रमुख हैं। अभी **टमाटर और मिर्च** की मांग ज्यादा है।",
      Nashik: "नासिक में **अंगूर, प्याज, टमाटर, स्ट्रॉबेरी** प्रसिद्ध हैं। निर्यात योग्य अंगूर के लिए **थॉम्पसन सीडलेस** किस्म चुनें।"
    },
    en: {
      Vidarbha: "In Vidarbha this season, **cotton, soybean, and pigeon pea (tur)** are the primary crops. For rabi season, consider **chickpea and wheat**. Get soil tested for proper fertilizer management.",
      Marathwada: "In Marathwada, **soybean, cotton, and tur** are the main crops. **Bajra and jowar** grow well with less water. Use drip irrigation for efficiency.",
      Konkan: "In Konkan, **rice, coconut, mango, and cashew** are the main crops. **Cardamom and nutmeg** also grow in hilly areas. Aquaculture near mangroves is profitable.",
      "Western Maharashtra": "In Western Maharashtra, **sugarcane, grapes, pomegranate, and onion** are prominent. Currently **tomato and chili** are in high demand.",
      Nashik: "Nashik is known for **grapes, onion, tomato, and strawberry**. For export-quality grapes, choose the **Thompson Seedless** variety."
    }
  },
  pest: {
    mr: {
      default: "**सेंद्रिय कीड नियंत्रण:**\n\n🌿 निंबोळी अर्क (5%) फवारणी करा\n🌿 गोमूत्र + आले + लसूण यांचे मिश्रण वापरा\n🌿 पिवळे चिकट सापळे लावा\n🌿 पीक फेरपालट करा\n🌿 ट्रायकोडर्मा जैविक बुरशीनाशक वापरा\n\nरासायनिक फवारणी शेवटचा पर्याय म्हणून वापरा."
    },
    hi: {
      default: "**जैविक कीट नियंत्रण:**\n\n🌿 नीम अर्क (5%) का छिड़काव करें\n🌿 गोमूत्र + अदरक + लहसुन का मिश्रण\n🌿 पीले चिपचिपे जाल लगाएं\n🌿 फसल चक्र अपनाएं\n🌿 ट्राइकोडर्मा जैव-कवकनाशी का उपयोग\n\nरासायनिक छिड़काव अंतिम विकल्प के रूप में ही करें।"
    },
    en: {
      default: "**Organic Pest Control:**\n\n🌿 Spray Neem extract (5%)\n🌿 Use mixture of cow urine + ginger + garlic\n🌿 Install yellow sticky traps\n🌿 Practice crop rotation\n🌿 Use Trichoderma bio-fungicide\n\nUse chemical sprays only as a last resort."
    }
  },
  market: {
    mr: {
      default: "**सध्याचे अंदाजे बाजारभाव (पुणे/नाशिक मंडई):**\n\n🧅 कांदा: ₹15-25/किलो\n🍅 टोमॅटो: ₹10-20/किलो\n🌶️ मिरची: ₹40-80/किलो\n🥔 बटाटा: ₹12-18/किलो\n🌾 सोयाबीन: ₹4200-4800/क्विंटल\n🌾 कापूस: ₹6500-7500/क्विंटल\n\n⚠️ अचूक भावासाठी agmarknet.gov.in किंवा तुमच्या स्थानिक मंडईशी संपर्क करा."
    },
    hi: {
      default: "**वर्तमान अनुमानित बाजार भाव (पुणे/नासिक मंडी):**\n\n🧅 प्याज: ₹15-25/किलो\n🍅 टमाटर: ₹10-20/किलो\n🌶️ मिर्च: ₹40-80/किलो\n🥔 आलू: ₹12-18/किलो\n🌾 सोयाबीन: ₹4200-4800/क्विंटल\n🌾 कपास: ₹6500-7500/क्विंटल\n\n⚠️ सटीक भाव के लिए agmarknet.gov.in या स्थानीय मंडी से संपर्क करें।"
    },
    en: {
      default: "**Approximate Current Market Prices (Pune/Nashik APMC):**\n\n🧅 Onion: ₹15-25/kg\n🍅 Tomato: ₹10-20/kg\n🌶️ Chili: ₹40-80/kg\n🥔 Potato: ₹12-18/kg\n🌾 Soybean: ₹4200-4800/quintal\n🌾 Cotton: ₹6500-7500/quintal\n\n⚠️ For exact prices visit agmarknet.gov.in or contact your local APMC."
    }
  },
  soil: {
    mr: {
      default: "**जमीन सुधारणेसाठी उपाय:**\n\n🌱 दर 3 वर्षांनी मृद परीक्षण करा\n🌱 हिरवळीचे खत (ताग, धैंचा) वापरा\n🌱 शेणखत/कंपोस्ट नियमित द्या\n🌱 जमिनीचा pH 6.5-7 मध्ये ठेवा\n🌱 जड मशिनरी वापरणे टाळा\n🌱 मल्चिंग करा"
    },
    hi: {
      default: "**मिट्टी सुधार के उपाय:**\n\n🌱 हर 3 साल में मिट्टी परीक्षण करें\n🌱 हरी खाद (ढैंचा, सनई) का उपयोग करें\n🌱 गोबर खाद/कम्पोस्ट नियमित दें\n🌱 मिट्टी का pH 6.5-7 के बीच रखें\n🌱 भारी मशीनरी से बचें\n🌱 मल्चिंग करें"
    },
    en: {
      default: "**Soil Improvement Tips:**\n\n🌱 Test soil every 3 years\n🌱 Use green manure crops (dhaincha, sunn hemp)\n🌱 Apply farmyard manure/compost regularly\n🌱 Maintain soil pH between 6.5-7\n🌱 Avoid heavy machinery compaction\n🌱 Practice mulching"
    }
  },
  weather: {
    mr: {
      default: "**हवामान सल्ला:**\n\n☀️ मार्च-एप्रिल: उन्हाळी सिंचन व्यवस्थापन करा\n🌧️ जून-सप्टेंबर: खरीप हंगाम — पेरणीसाठी उत्तम\n🍂 ऑक्टोबर-नोव्हेंबर: रब्बी पेरणी सुरू करा\n❄️ डिसेंबर-जानेवारी: दंव पडल्यास झाडांना संरक्षण द्या\n\n📱 IMD Meghdoot अ‍ॅप डाउनलोड करा — अचूक हवामान अंदाजासाठी."
    },
    hi: {
      default: "**मौसम सलाह:**\n\n☀️ मार्च-अप्रैल: ग्रीष्मकालीन सिंचाई प्रबंधन करें\n🌧️ जून-सितंबर: खरीफ सीजन — बुवाई के लिए उत्तम\n🍂 अक्टूबर-नवंबर: रबी बुवाई शुरू करें\n❄️ दिसंबर-जनवरी: पाले से फसल बचाएं\n\n📱 IMD Meghdoot ऐप डाउनलोड करें — सटीक मौसम पूर्वानुमान के लिए।"
    },
    en: {
      default: "**Weather Advisory:**\n\n☀️ March-April: Manage summer irrigation carefully\n🌧️ June-September: Kharif season — best time for sowing\n🍂 October-November: Start rabi crop sowing\n❄️ December-January: Protect crops from frost\n\n📱 Download IMD Meghdoot app for accurate local weather forecasts."
    }
  },
  unknown: {
    mr: "क्षमस्व, मला हा प्रश्न नीट समजला नाही. कृपया **पीक, कीड, बाजारभाव, जमीन, हवामान, सिंचन** यापैकी एका विषयावर प्रश्न विचारा. 🌾",
    hi: "माफ़ करें, मैं यह प्रश्न ठीक से नहीं समझ सका। कृपया **फसल, कीट, बाजार भाव, मिट्टी, मौसम, सिंचाई** इनमें से किसी विषय पर प्रश्न करें। 🌾",
    en: "Sorry, I couldn't understand that question. Please ask about **crops, pests, market prices, soil, weather, or irrigation**. 🌾"
  }
};

// ─── Helpers ────────────────────────────────────────────────────────────
function setRegion(btn, region) {
  currentRegion = region;
  document.querySelectorAll('.region-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function setLang(btn, lang) {
  currentLang = lang;
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Update placeholders and quick buttons
  document.getElementById('userInput').placeholder = UI[lang].placeholder;
  const qBtns = document.querySelectorAll('#quickBtns button span');
  UI[lang].quick.forEach((label, i) => {
    if (qBtns[i]) qBtns[i].textContent = label.replace(/^[^\s]+ /, '');
  });

  // Update welcome message language
  document.getElementById('welcomeMsg').textContent = UI[lang].welcome;
}

function appendMessage(text, sender) {
  const chatBox = document.getElementById("chatBox");
  const div = document.createElement("div");
  div.className = `message ${sender}`;

  const senderLabel = document.createElement("span");
  senderLabel.className = "sender";
  senderLabel.textContent = sender === 'bot' ? 'SAATHI_BOT' : UI[currentLang].you;

  const textSpan = document.createElement("span");
  textSpan.textContent = text;

  div.appendChild(senderLabel);
  div.appendChild(textSpan);
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
  return div;
}

function getResponse(text) {
  const t = text.toLowerCase();
  const lang = currentLang;
  const region = currentRegion;

  const isCrop    = /पीक|crop|फसल|सोयाबीन|कापूस|कापूस|भात|ऊस|द्राक्ष|कांदा|soybean|cotton|onion|grape/.test(t);
  const isPest    = /कीड|pest|रोग|कीट|disease|नाशक|किडा/.test(t);
  const isMarket  = /बाजार|market|भाव|price|किंमत|दर|mandi/.test(t);
  const isSoil    = /जमीन|soil|माती|मिट्टी|pH|खत|fertilizer/.test(t);
  const isWeather = /हवामान|weather|पाऊस|rain|मौसम|तापमान|temperature/.test(t);

  if (isCrop) {
    const regionData = RESPONSES.crop[lang];
    return regionData[region] || regionData["Vidarbha"];
  }
  if (isPest)    return RESPONSES.pest[lang].default;
  if (isMarket)  return RESPONSES.market[lang].default;
  if (isSoil)    return RESPONSES.soil[lang].default;
  if (isWeather) return RESPONSES.weather[lang].default;

  return RESPONSES.unknown[lang];
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const text  = input.value.trim();
  if (!text) return;

  appendMessage(text, "user");
  input.value = "";

  const thinkingDiv = appendMessage("...", "bot");

  setTimeout(() => {
    const reply = getResponse(text);
    thinkingDiv.querySelector("span:last-child").textContent = reply;
    document.getElementById("chatBox").scrollTop = 9999;
  }, 500);
}

function quickAsk(index) {
  const question = UI[currentLang].quickQ[index];
  document.getElementById("userInput").value = question;
  sendMessage();
}

// Enter key
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("userInput").addEventListener("keydown", e => {
    if (e.key === "Enter") sendMessage();
  });
});
