// ================================
//   SHETKARI SAATHI — script.js
//   No API — Smart local responses
// ================================

let selectedRegion = 'Vidarbha';
let currentLang = 'mr';

const welcomeMessages = {
  mr: 'नमस्कार शेतकरी! मी शेतकरी साथी AI आहे. तुमच्या शेतीसाठी मी येथे आहे. खाली दिलेले प्रश्न विचारा किंवा स्वतःचा प्रश्न टाइप करा. 🌾',
  hi: 'नमस्ते किसान भाई! मैं शेतकरी साथी AI हूँ। आपकी खेती के लिए मैं यहाँ हूँ। नीचे दिए सवाल पूछें या अपना सवाल टाइप करें। 🌾',
  en: 'Hello Farmer! I am Shetkari Saathi AI. I am here to help with your farming needs. Use the quick buttons below or type your own question. 🌾'
};

const placeholders = {
  mr: 'प्रश्न टाइप करा...',
  hi: 'सवाल टाइप करें...',
  en: 'Type your question...'
};

const btnLabels = {
  mr: ['पीक सल्ला', 'कीड नियंत्रण', 'बाजार भाव', 'जमीन सुधारणा', 'हवामान'],
  hi: ['फसल सलाह', 'कीट नियंत्रण', 'बाजार भाव', 'मिट्टी सुधार', 'मौसम'],
  en: ['Crop Advice', 'Pest Control', 'Market Prices', 'Soil Health', 'Weather']
};

// ── REGION SELECTOR ──
document.querySelectorAll('.region-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.region-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedRegion = btn.dataset.region;
    const msgs = { mr: `प्रदेश बदलला: ${selectedRegion} ✅`, hi: `क्षेत्र बदला: ${selectedRegion} ✅`, en: `Region changed to: ${selectedRegion} ✅` };
    appendMessage(msgs[currentLang], 'bot');
  });
});

// ── LANGUAGE TOGGLE ──
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentLang = btn.dataset.lang;

    // Update placeholder
    document.getElementById('userInput').placeholder = placeholders[currentLang];

    // Update quick button labels
    const labels = document.querySelectorAll('.btn-label');
    labels.forEach((lbl, i) => { lbl.innerText = btnLabels[currentLang][i]; });

    // Announce language change
    const msgs = { mr: 'भाषा बदलली: मराठी ✅', hi: 'भाषा बदली: हिंदी ✅', en: 'Language changed: English ✅' };
    appendMessage(msgs[currentLang], 'bot');
  });
});

// ── QUICK BUTTONS ──
document.querySelectorAll('.quick-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const q = btn.dataset[`q${currentLang.charAt(0).toUpperCase() + currentLang.slice(1)}`]
              || btn.dataset['qMr'];
    document.getElementById('userInput').value = q;
    sendMessage();
  });
});

// ── SEND ON ENTER ──
document.getElementById('userInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') sendMessage();
});

// ── APPEND MESSAGE ──
function appendMessage(text, sender) {
  const chatBox = document.getElementById('chatBox');
  const msg = document.createElement('div');
  msg.className = `message ${sender}`;

  const label = document.createElement('div');
  label.className = 'msg-label';
  label.innerText = sender === 'bot' ? 'SAATHI_BOT' : 'FARMER_USER';

  const content = document.createElement('div');
  content.className = 'msg-text';
  content.innerText = text;

  msg.appendChild(label);
  msg.appendChild(content);
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  return msg;
}

// ── SMART LOCAL RESPONSES ──
function getLocalResponse(input) {
  const q = input.toLowerCase();
  const r = selectedRegion;
  const lang = currentLang;

  // Crop advice
  if (q.includes('पीक') || q.includes('फसल') || q.includes('crop') || q.includes('लागवड') || q.includes('हंगाम') || q.includes('मौसम') || q.includes('season')) {
    const crops = {
      'Vidarbha': {
        mr: 'विदर्भात या हंगामात कापूस, सोयाबीन, तूर आणि संत्रा या पिकांसाठी उत्तम वेळ आहे. कापूस जून-जुलैमध्ये आणि सोयाबीन जूनच्या पहिल्या आठवड्यात लावावे.',
        hi: 'विदर्भ में इस मौसम में कपास, सोयाबीन, अरहर और संतरा की फसल के लिए उत्तम समय है। कपास जून-जुलाई में और सोयाबीन जून के पहले सप्ताह में बोएं।',
        en: 'In Vidarbha, this season is ideal for Cotton, Soybean, Tur (Arhar), and Orange. Sow cotton in June-July and soybean in the first week of June.'
      },
      'Marathwada': {
        mr: 'मराठवाड्यात सोयाबीन, ज्वारी, तूर आणि कापूस ही प्रमुख पिके आहेत. कमी पाण्यावर येणाऱ्या वाणांना प्राधान्य द्यावे.',
        hi: 'मराठवाड़ा में सोयाबीन, ज्वार, अरहर और कपास प्रमुख फसलें हैं। कम पानी में उगने वाली किस्मों को प्राथमिकता दें।',
        en: 'In Marathwada, Soybean, Jowar, Tur and Cotton are main crops. Prefer drought-resistant varieties suited to low rainfall.'
      },
      'Konkan': {
        mr: 'कोकणात भात, नाचणी, आंबा, काजू आणि नारळ ही पिके उत्तम येतात. भाताची लागवड जून-जुलैमध्ये करावी.',
        hi: 'कोंकण में धान, रागी, आम, काजू और नारियल की खेती उत्तम होती है। धान की रोपाई जून-जुलाई में करें।',
        en: 'In Konkan, Rice, Ragi, Mango, Cashew and Coconut grow well. Transplant paddy in June-July for best results.'
      },
      'Western Maharashtra': {
        mr: 'पश्चिम महाराष्ट्रात ऊस, द्राक्षे, डाळिंब, कांदा आणि टोमॅटो ही प्रमुख पिके आहेत.',
        hi: 'पश्चिमी महाराष्ट्र में गन्ना, अंगूर, अनार, प्याज और टमाटर प्रमुख फसलें हैं।',
        en: 'In Western Maharashtra, Sugarcane, Grapes, Pomegranate, Onion and Tomato are the main crops.'
      },
      'Nashik': {
        mr: 'नाशिकमध्ये द्राक्षे, कांदा, टोमॅटो आणि स्ट्रॉबेरी या पिकांसाठी प्रसिद्ध आहे. द्राक्षांची छाटणी वेळेत करावी.',
        hi: 'नाशिक अंगूर, प्याज, टमाटर और स्ट्रॉबेरी के लिए प्रसिद्ध है। अंगूर की छंटाई समय पर करें।',
        en: 'Nashik is famous for Grapes, Onion, Tomato and Strawberry. Prune grapevines on time for better yield.'
      }
    };
    return (crops[r] || crops['Vidarbha'])[lang];
  }

  // Pest control
  if (q.includes('कीड') || q.includes('कीट') || q.includes('pest') || q.includes('रोग') || q.includes('disease') || q.includes('फवारणी') || q.includes('spray')) {
    const resp = {
      mr: `${r} भागासाठी कीड नियंत्रण उपाय:\n\n🌿 सेंद्रिय उपाय:\n• निंबोळी अर्क (5%) फवारणी\n• गोमूत्र + हळद मिश्रण\n• पिवळे चिकट सापळे लावा\n\n⚗️ रासायनिक उपाय:\n• क्लोरपायरीफॉस 20 EC — 2ml/L पाणी\n• कापसावर बोंड अळीसाठी: स्पिनोसॅड 45SC\n\n⚠️ फवारणी सकाळी लवकर किंवा संध्याकाळी करा.`,
      hi: `${r} क्षेत्र के लिए कीट नियंत्रण उपाय:\n\n🌿 जैविक उपाय:\n• नीम का अर्क (5%) का छिड़काव\n• गोमूत्र + हल्दी का मिश्रण\n• पीले चिपचिपे जाल लगाएं\n\n⚗️ रासायनिक उपाय:\n• क्लोरपायरीफॉस 20 EC — 2ml/L पानी\n• कपास पर बॉलवर्म: स्पिनोसैड 45SC\n\n⚠️ छिड़काव सुबह जल्दी या शाम को करें।`,
      en: `Pest control tips for ${r}:\n\n🌿 Organic methods:\n• Neem extract (5%) spray\n• Cow urine + turmeric mixture\n• Yellow sticky traps\n\n⚗️ Chemical methods:\n• Chlorpyrifos 20 EC — 2ml/L water\n• For cotton bollworm: Spinosad 45SC\n\n⚠️ Spray early morning or evening. Avoid spraying against wind.`
    };
    return resp[lang];
  }

  // Market prices
  if (q.includes('भाव') || q.includes('बाजार') || q.includes('market') || q.includes('price') || q.includes('दर')) {
    const resp = {
      mr: `📊 अंदाजे बाजारभाव (${r}):\n\n• कापूस: ₹6,500–7,200 / क्विंटल\n• सोयाबीन: ₹4,200–4,800 / क्विंटल\n• कांदा: ₹1,500–2,800 / क्विंटल\n• टोमॅटो: ₹800–2,000 / क्विंटल\n• तूर: ₹7,000–7,500 / क्विंटल\n\n📍 अचूक भावासाठी agmarket.nic.in वर पहा.`,
      hi: `📊 अनुमानित बाजार भाव (${r}):\n\n• कपास: ₹6,500–7,200 / क्विंटल\n• सोयाबीन: ₹4,200–4,800 / क्विंटल\n• प्याज: ₹1,500–2,800 / क्विंटल\n• टमाटर: ₹800–2,000 / क्विंटल\n• अरहर: ₹7,000–7,500 / क्विंटल\n\n📍 सटीक भाव के लिए agmarket.nic.in देखें।`,
      en: `📊 Approximate Market Prices (${r}):\n\n• Cotton: ₹6,500–7,200 / Quintal\n• Soybean: ₹4,200–4,800 / Quintal\n• Onion: ₹1,500–2,800 / Quintal\n• Tomato: ₹800–2,000 / Quintal\n• Tur Dal: ₹7,000–7,500 / Quintal\n\n📍 For accurate prices visit agmarket.nic.in`
    };
    return resp[lang];
  }

  // Soil / fertilizer
  if (q.includes('जमीन') || q.includes('माती') || q.includes('मिट्टी') || q.includes('खत') || q.includes('soil') || q.includes('fertilizer') || q.includes('सुपीकता') || q.includes('उर्वरता')) {
    const resp = {
      mr: `🪱 जमीन सुधारणा — ${r}:\n\n✅ सेंद्रिय:\n• शेणखत: 10 टन/एकर\n• गांडूळखत: 2 टन/एकर\n• हिरवळीची खते (ताग, धैंचा)\n\n🧪 रासायनिक खते (NPK):\n• नत्र: 80–100 kg/हेक्टर\n• स्फुरद: 40–60 kg/हेक्टर\n• पालाश: 40 kg/हेक्टर\n\n⚠️ खतापूर्वी माती परीक्षण करा.`,
      hi: `🪱 मिट्टी सुधार — ${r}:\n\n✅ जैविक:\n• गोबर खाद: 10 टन/एकड़\n• वर्मीकम्पोस्ट: 2 टन/एकड़\n• हरी खाद (ढैंचा, सनई)\n\n🧪 रासायनिक उर्वरक (NPK):\n• नाइट्रोजन: 80–100 kg/हेक्टेयर\n• फास्फोरस: 40–60 kg/हेक्टेयर\n• पोटाश: 40 kg/हेक्टेयर\n\n⚠️ खाद से पहले मिट्टी परीक्षण करें।`,
      en: `🪱 Soil Improvement — ${r}:\n\n✅ Organic:\n• Farm Yard Manure: 10 ton/acre\n• Vermicompost: 2 ton/acre\n• Green manure (Dhaincha, Sunn hemp)\n\n🧪 Chemical Fertilizers (NPK):\n• Nitrogen: 80–100 kg/hectare\n• Phosphorus: 40–60 kg/hectare\n• Potassium: 40 kg/hectare\n\n⚠️ Always do Soil Testing before applying fertilizers.`
    };
    return resp[lang];
  }

  // Weather
  if (q.includes('पाऊस') || q.includes('बारिश') || q.includes('rain') || q.includes('हवामान') || q.includes('मौसम') || q.includes('weather')) {
    const resp = {
      mr: `🌦️ हवामान माहिती — ${r}:\n\n📌 सल्ला:\n• IMD (imd.gov.in) वर अंदाज पहा\n• Meghdoot App — मोफत हवामान App\n• Kisan Suvidha App वापरा\n\n☀️ उन्हाळ्यात ठिबक सिंचन वापरा\n🌧️ अतिवृष्टीत पाण्याचा निचरा करा`,
      hi: `🌦️ मौसम जानकारी — ${r}:\n\n📌 सलाह:\n• IMD (imd.gov.in) पर पूर्वानुमान देखें\n• Meghdoot App — मुफ्त मौसम ऐप\n• Kisan Suvidha App का उपयोग करें\n\n☀️ गर्मी में ड्रिप सिंचाई करें\n🌧️ अत्यधिक बारिश में जल निकासी सुनिश्चित करें`,
      en: `🌦️ Weather Info — ${r}:\n\n📌 Tips:\n• Check forecasts at imd.gov.in\n• Use Meghdoot App — free weather app for farmers\n• Kisan Suvidha App for local weather\n\n☀️ Use drip irrigation in summer\n🌧️ Ensure proper drainage during heavy rains`
    };
    return resp[lang];
  }

  // Default
  const resp = {
    mr: `नमस्कार! ${r} भागातील शेतीसाठी मी खालील विषयांवर मदत करू शकतो:\n\n🌾 पीक निवड | 🐛 कीड नियंत्रण | 💰 बाजारभाव\n🪱 जमीन सुधारणा | 🌦️ हवामान | 💧 सिंचन\n\nकृपया वरीलपैकी एका विषयावर प्रश्न विचारा!`,
    hi: `नमस्ते! ${r} क्षेत्र की खेती के लिए मैं इन विषयों पर मदद कर सकता हूँ:\n\n🌾 फसल चुनाव | 🐛 कीट नियंत्रण | 💰 बाजार भाव\n🪱 मिट्टी सुधार | 🌦️ मौसम | 💧 सिंचाई\n\nकृपया इनमें से किसी एक विषय पर सवाल पूछें!`,
    en: `Hello! For farming in ${r}, I can help with:\n\n🌾 Crop Selection | 🐛 Pest Control | 💰 Market Prices\n🪱 Soil Health | 🌦️ Weather | 💧 Irrigation\n\nPlease ask a question on any of these topics!`
  };
  return resp[lang];
}

// ── SEND MESSAGE ──
function sendMessage() {
  const input = document.getElementById('userInput');
  const userText = input.value.trim();
  if (!userText) return;

  appendMessage(userText, 'user');
  input.value = '';

  const typingMsg = appendMessage('...', 'bot');
  typingMsg.classList.add('typing');

  setTimeout(() => {
    typingMsg.remove();
    const reply = getLocalResponse(userText);
    appendMessage(reply, 'bot');
  }, 800);
}
