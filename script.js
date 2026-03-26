// ============================================================
//   SHETKARI SAATHI v3.0 — script.js
//   Full featured — No API required
//   Features: Chat, Soil Analysis, Market+Gain/Loss,
//             Disaster Relief, Weather Advisory
//   Dialect: Vidarbha / Marathwada / Western / Konkan /
//            Nashik / Khandesh
// ============================================================

// ── STATE ──
let currentRegion = 'vidarbha';
let currentRegionDisplay = 'विदर्भ';

// ── DIALECTS ──
const dialects = {
  vidarbha: {
    greet: 'काय रं भाऊ',
    yes: 'हाय',
    address: 'भाऊ',
    doing: 'करतोय',
    good: 'चांगलं हाय',
    warning: 'सावधान राहा भाऊ',
    thanks: 'आहोतच आपण!',
    crops: ['कापूस', 'सोयाबीन', 'तूर', 'संत्रा', 'ज्वारी'],
    mainCrop: 'कापूस',
    kvk: 'KVK अमरावती: 0721-2662521'
  },
  marathwada: {
    greet: 'नमस्कार',
    yes: 'हाये',
    address: 'भाऊ',
    doing: 'करतोय',
    good: 'चांगलं हाये',
    warning: 'सावध राहावं',
    thanks: 'आपलंच आहे!',
    crops: ['सोयाबीन', 'तूर', 'कापूस', 'ज्वारी', 'हरभरा'],
    mainCrop: 'सोयाबीन',
    kvk: 'KVK औरंगाबाद: 0240-2376904'
  },
  western: {
    greet: 'नमस्कार',
    yes: 'आहे',
    address: 'तुम्ही',
    doing: 'करत आहे',
    good: 'चांगले आहे',
    warning: 'सावधगिरी बाळगा',
    thanks: 'काहीही प्रश्न असल्यास विचारा.',
    crops: ['ऊस', 'द्राक्षे', 'डाळिंब', 'कांदा', 'टोमॅटो'],
    mainCrop: 'ऊस',
    kvk: 'KVK पुणे: 020-25537200'
  },
  konkan: {
    greet: 'नमस्कार',
    yes: 'आहे',
    address: 'तुम्ही',
    doing: 'करत आहे',
    good: 'चांगले आहे',
    warning: 'जपून राहा',
    thanks: 'सेवेत आहोत.',
    crops: ['भात', 'नाचणी', 'आंबा', 'काजू', 'नारळ'],
    mainCrop: 'भात',
    kvk: 'KVK रत्नागिरी: 02352-220225'
  },
  nashik: {
    greet: 'नमस्कार',
    yes: 'आहे',
    address: 'दादा',
    doing: 'करत आहे',
    good: 'उत्तम आहे',
    warning: 'काळजी घ्या',
    thanks: 'सदैव मदतीला आहोत.',
    crops: ['द्राक्षे', 'कांदा', 'टोमॅटो', 'स्ट्रॉबेरी', 'डाळिंब'],
    mainCrop: 'द्राक्षे',
    kvk: 'KVK नाशिक: 0253-2310512'
  },
  khandesh: {
    greet: 'नमस्कार',
    yes: 'हाय कां',
    address: 'भाऊ',
    doing: 'करतो',
    good: 'बरं हाय',
    warning: 'जपा भाऊ',
    thanks: 'आपलंच!',
    crops: ['केळी', 'कापूस', 'मका', 'तूर', 'ज्वारी'],
    mainCrop: 'केळी',
    kvk: 'KVK धुळे: 02562-282488'
  }
};

// ── REGION SWITCHING ──
document.querySelectorAll('.rbtn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.rbtn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentRegion = btn.dataset.region;
    currentRegionDisplay = btn.dataset.display;
    const d = dialects[currentRegion];
    appendMsg(`प्रदेश बदलला: ${currentRegionDisplay} ✅\n${d.greet} ${d.address}! आता मी ${currentRegionDisplay} च्या शेतकऱ्यांसाठी बोलेन.`, 'bot');
    updateAlerts();
  });
});

// ── TAB SWITCHING ──
document.querySelectorAll('.ftab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.ftab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
  });
});

// ── ENTER KEY ──
document.getElementById('chatInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') sendChat();
});

// ── APPEND MESSAGE ──
function appendMsg(text, sender) {
  const box = document.getElementById('chatBox');
  const wrap = document.createElement('div');
  wrap.className = `msg ${sender}`;
  const label = document.createElement('div');
  label.className = 'msg-label';
  label.innerText = sender === 'bot' ? 'SAATHI_BOT' : 'FARMER_USER';
  const content = document.createElement('div');
  content.className = 'msg-text';
  content.innerText = text;
  wrap.appendChild(label);
  wrap.appendChild(content);
  box.appendChild(wrap);
  box.scrollTop = box.scrollHeight;
  return wrap;
}

// ── SEND CHAT ──
function sendChat() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  appendMsg(text, 'user');
  input.value = '';
  const typing = appendMsg('विचार करतोय...', 'bot');
  typing.classList.add('typing');
  setTimeout(() => {
    typing.remove();
    appendMsg(getChatReply(text), 'bot');
  }, 700);
}

// quick buttons
document.querySelectorAll('.qbtn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('chatInput').value = btn.dataset.q;
    sendChat();
  });
});

// ── CHAT REPLIES ──
function getChatReply(input) {
  const q = input.toLowerCase();
  const d = dialects[currentRegion];
  const r = currentRegionDisplay;

  if (q.includes('पीक') || q.includes('crop') || q.includes('लागवड') || q.includes('हंगाम') || q.includes('पेरण')) {
    return cropAdvice(d, r);
  }
  if (q.includes('कीड') || q.includes('pest') || q.includes('रोग') || q.includes('disease') || q.includes('फवारण')) {
    return pestAdvice(d, r);
  }
  if (q.includes('जमीन') || q.includes('माती') || q.includes('खत') || q.includes('soil') || q.includes('fertilizer') || q.includes('सुपीकता')) {
    return soilGeneralAdvice(d, r);
  }
  if (q.includes('पाणी') || q.includes('सिंचन') || q.includes('water') || q.includes('ठिबक') || q.includes('irrigation')) {
    return irrigationAdvice(d, r);
  }
  if (q.includes('भाव') || q.includes('बाजार') || q.includes('market') || q.includes('price')) {
    return `${d.address}, बाजार भावासाठी वरील "💰 बाजार & नफा-तोटा" टॅब उघडा — तिथे सर्व पिकांचे भाव आणि नफा-तोटा हिशोब ${d.yes}.`;
  }
  if (q.includes('हवामान') || q.includes('पाऊस') || q.includes('weather') || q.includes('rain') || q.includes('मान्सून')) {
    return weatherGeneralAdvice(d, r);
  }
  if (q.includes('योजना') || q.includes('scheme') || q.includes('अनुदान') || q.includes('सरकार') || q.includes('विमा')) {
    return schemesAdvice(d, r);
  }
  if (q.includes('नुकसान') || q.includes('गारपीट') || q.includes('दुष्काळ') || q.includes('पूर') || q.includes('disaster')) {
    return `${d.address}, नुकसान भरपाईसाठी वरील "🆘 नुकसान & योजना" टॅब उघडा. तिथे तुमच्या नुकसानीनुसार कोणत्या योजना लागू होतात ते सांगतो.`;
  }

  return defaultReply(d, r);
}

function cropAdvice(d, r) {
  const crops = d.crops;
  return `${d.greet} ${d.address}! ${r} साठी पीक सल्ला:\n\n🌾 उत्तम पिके: ${crops.join(', ')}\n\nमुख्य पीक — ${crops[0]}:\n• पेरणी: जून मध्य ते जुलै पहिला आठवडा\n• बियाणे: एकरी 3–4 kg (BT वाण)\n• खत: DAP 1 पोते + युरिया 2 पोते (एकरी)\n• पाणी: 10–12 दिवसांच्या अंतराने\n\n⚠️ पेरणीपूर्वी माती परीक्षण करणे उत्तम.\n\n${d.kvk}`;
}

function pestAdvice(d, r) {
  return `${d.address}, ${r} साठी कीड नियंत्रण:\n\n🌿 सेंद्रिय उपाय:\n• निंबोळी अर्क 5% फवारणी\n• गोमूत्र + हळद मिश्रण (1:10)\n• पिवळे चिकट सापळे लावा\n• ट्रायकोडर्मा वापर\n\n⚗️ रासायनिक उपाय:\n• क्लोरपायरीफॉस 20EC — 2ml/L पाणी\n• कापसावर बोंड अळी: स्पिनोसॅड 45SC\n• सोयाबीनवर उंटाळा: इमिडाक्लोप्रिड\n\n⚠️ फवारणी सकाळी 7–9 किंवा संध्याकाळी 5–7 मध्येच करा\n• संरक्षण साहित्य वापरा — हातमोजे, मास्क\n\n${d.kvk}`;
}

function soilGeneralAdvice(d, r) {
  return `${d.address}, ${r} साठी जमीन सुधारणा:\n\n🪱 सेंद्रिय पद्धती:\n• शेणखत: 10 टन/एकर दरवर्षी\n• गांडूळखत: 2 टन/एकर\n• हिरवळीची खते (ताग, धैंचा)\n\n🧪 NPK खते (एकरी):\n• नत्र (N): युरिया 2–3 पोती\n• स्फुरद (P): DAP 1–2 पोती\n• पालाश (K): MOP 1 पोते\n\n💡 महत्त्वाचे:\n• pH 6.5–7.5 असेल तर उत्तम\n• pH जास्त असेल (>7.5) तर जिप्सम टाका\n• pH कमी असेल (<6.5) तर चुनखडी टाका\n\nमाती विश्लेषणासाठी "🪱 माती विश्लेषण" टॅब वापरा!\n\n${d.kvk}`;
}

function irrigationAdvice(d, r) {
  return `${d.address}, ${r} साठी सिंचन सल्ला:\n\n💧 ठिबक सिंचन (Drip Irrigation):\n• 40–70% पाणी बचत\n• PMKSY योजनेत 55–80% अनुदान\n• कापूस, द्राक्षे, डाळिंबासाठी उत्तम\n\n🚿 तुषार सिंचन (Sprinkler):\n• भाजीपाला आणि तृणधान्यांसाठी\n• 30–50% पाणी बचत\n\n📅 पिकांनुसार पाणी वेळापत्रक:\n• कापूस: 10–12 दिवस\n• सोयाबीन: 7–10 दिवस\n• ऊस: 6–8 दिवस\n• गहू: 8–10 दिवस\n\n📞 अनुदानासाठी: कृषी कार्यालय — 1800-180-1551\n${d.kvk}`;
}

function weatherGeneralAdvice(d, r) {
  return `${d.address}, ${r} साठी हवामान सल्ला:\n\n🌦️ मान्सून अंदाज:\n• विदर्भ/मराठवाडा: जून 10–15\n• पश्चिम महाराष्ट्र: जून 5–10\n• कोकण: जून 1–5\n\n📱 हवामान Apps (मोफत):\n• Meghdoot App — शेतकऱ्यांसाठी\n• Kisan Suvidha App\n• IMD Weather (imd.gov.in)\n\n⚠️ सावधगिरी:\n• गारपीट आली तर काढणी लवकर करा\n• अतिपावसात निचरा बघा\n• उष्णतेत ठिबक वापरा\n\nहवामान टॅबमध्ये सविस्तर सल्ला मिळेल!`;
}

function schemesAdvice(d, r) {
  return `${d.address}, सरकारी योजना:\n\n1️⃣ PM किसान सन्मान निधी\n   ₹6,000/वर्ष — थेट बँकेत\n\n2️⃣ PMFBY — पीक विमा\n   नुकसान झाल्यावर भरपाई\n   खरीपसाठी जून अगोदर भरा\n\n3️⃣ PMKSY — सिंचन अनुदान\n   ठिबकसाठी 55–80% अनुदान\n\n4️⃣ KCC — किसान क्रेडिट कार्ड\n   4% व्याजदरात कर्ज\n\n5️⃣ Soil Health Card\n   मोफत माती परीक्षण\n\n6️⃣ e-NAM\n   ऑनलाइन बाजार — चांगला भाव\n\n📞 Kisan Call Centre: 1800-180-1551 (मोफत)\n${d.kvk}`;
}

function defaultReply(d, r) {
  return `${d.greet} ${d.address}! ${r} साठी मी तयार आहे.\n\nया विषयांवर मदत करू शकतो:\n🌾 पीक निवड व लागवड\n🐛 कीड व रोग नियंत्रण\n🪱 जमीन व खत व्यवस्थापन\n💧 सिंचन पद्धती\n🌦️ हवामान सल्ला\n🏛️ सरकारी योजना\n\nकिंवा वरील टॅब वापरा:\n• माती विश्लेषण — pH + खत हिशोब\n• बाजार भाव + नफा तोटा\n• नुकसान भरपाई योजना\n• हवामान सल्ला\n\n${d.thanks}`;
}

// ══════════════════════════════════════
// SOIL ANALYSIS
// ══════════════════════════════════════
function analyzeSoil() {
  const ph = parseFloat(document.getElementById('ph').value);
  const n = parseFloat(document.getElementById('nitrogen').value);
  const p = parseFloat(document.getElementById('phosphorus').value);
  const k = parseFloat(document.getElementById('potassium').value);
  const land = parseFloat(document.getElementById('landSize').value);
  const season = document.getElementById('season').value;
  const d = dialects[currentRegion];
  const result = document.getElementById('soilResult');

  if (!ph || !n || !p || !k) {
    showResult(result, '⚠️ कृपया सर्व माती परीक्षण मूल्ये भरा (pH, N, P, K).', 'error');
    return;
  }

  let lines = [];
  lines.push(`📊 माती विश्लेषण — ${currentRegionDisplay}`);
  lines.push('─'.repeat(40));

  // pH Analysis
  lines.push('\n🧪 pH विश्लेषण:');
  if (ph < 5.5) {
    lines.push(`pH ${ph} — अत्यंत आम्लयुक्त (Acidic)`);
    lines.push(`⚠️ चुना (Lime) एकरी 2 पोती टाका — नंतरच खत द्या`);
    lines.push(`⚠️ युरिया वाया जाईल — आधी pH ठीक करा`);
  } else if (ph < 6.5) {
    lines.push(`pH ${ph} — थोडी आम्लयुक्त`);
    lines.push(`✅ चुनखडी एकरी 1 पोते टाका`);
  } else if (ph <= 7.5) {
    lines.push(`pH ${ph} — आदर्श (Ideal) ✅`);
    lines.push(`✅ माती उत्तम आहे — खत चांगले काम करेल`);
  } else if (ph <= 8.5) {
    lines.push(`pH ${ph} — क्षारयुक्त (Alkaline)`);
    lines.push(`⚠️ जिप्सम एकरी ${Math.round(land)} पोते टाका आधी`);
    lines.push(`⚠️ जिप्सम न टाकता खत दिले तर वाया जाईल`);
  } else {
    lines.push(`pH ${ph} — अत्यंत क्षारयुक्त`);
    lines.push(`🚨 जिप्सम + सेंद्रिय खत — कृषी अधिकाऱ्याचा सल्ला घ्या`);
  }

  // N Analysis
  lines.push('\n🌱 नायट्रोजन (N):');
  if (n < 120) {
    lines.push(`N ${n} kg/ha — कमी आहे ⚠️`);
    lines.push(`युरिया: एकरी ${Math.round(land * 3)} पोती द्या (split doses)`);
  } else if (n <= 280) {
    lines.push(`N ${n} kg/ha — मध्यम ✅`);
    lines.push(`युरिया: एकरी ${Math.round(land * 2)} पोती पुरेसे`);
  } else {
    lines.push(`N ${n} kg/ha — जास्त आहे`);
    lines.push(`युरिया कमी द्या — जास्त N मुळे झाड वाढते पण फळ येत नाही`);
  }

  // P Analysis
  lines.push('\n🌿 फॉस्फरस (P):');
  if (p < 10) {
    lines.push(`P ${p} kg/ha — खूप कमी 🚨`);
    lines.push(`DAP: एकरी ${Math.round(land * 2)} पोती — पेरणीच्या वेळी जमिनीत मिसळा`);
  } else if (p <= 25) {
    lines.push(`P ${p} kg/ha — मध्यम ✅`);
    lines.push(`DAP: एकरी ${Math.round(land * 1)} पोते`);
  } else {
    lines.push(`P ${p} kg/ha — उत्तम ✅ — DAP कमी द्या`);
  }

  // K Analysis
  lines.push('\n🍀 पोटॅश (K):');
  if (k < 120) {
    lines.push(`K ${k} kg/ha — कमी ⚠️`);
    lines.push(`MOP (Muriate of Potash): एकरी ${Math.round(land * 1.5)} पोती`);
  } else if (k <= 280) {
    lines.push(`K ${k} kg/ha — मध्यम ✅ — MOP एकरी ${Math.round(land * 1)} पोते`);
  } else {
    lines.push(`K ${k} kg/ha — उत्तम ✅ — MOP गरज नाही`);
  }

  // Crop Recommendation
  lines.push('\n🌾 शिफारस केलेली पिके:');
  const crops = getRecommendedCrops(ph, n, p, k, season, currentRegion);
  crops.forEach((c, i) => lines.push(`${i + 1}. ${c}`));

  // Summary table
  lines.push('\n📋 खत सारांश (एकरी):');
  lines.push(`• जिप्सम: ${ph > 7.5 ? `${Math.round(land)} पोते` : 'गरज नाही'}`);
  lines.push(`• युरिया: ${n < 120 ? Math.round(land * 3) : Math.round(land * 2)} पोती`);
  lines.push(`• DAP: ${p < 10 ? Math.round(land * 2) : Math.round(land * 1)} पोते`);
  lines.push(`• MOP: ${k < 120 ? Math.round(land * 1.5) : Math.round(land * 1)} पोते`);
  lines.push(`\n${d.kvk}`);

  showResult(result, lines.join('\n'), 'success');
}

function getRecommendedCrops(ph, n, p, k, season, region) {
  const regionCrops = {
    vidarbha: { kharif: ['कापूस', 'सोयाबीन', 'तूर', 'मूग'], rabi: ['हरभरा', 'गहू', 'ज्वारी'], summer: ['मूग', 'उडीद'] },
    marathwada: { kharif: ['सोयाबीन', 'तूर', 'कापूस', 'मूग'], rabi: ['हरभरा', 'गहू', 'रब्बी ज्वारी'], summer: ['उन्हाळी भुईमूग'] },
    western: { kharif: ['ऊस', 'सोयाबीन', 'कांदा', 'टोमॅटो'], rabi: ['गहू', 'हरभरा', 'कांदा'], summer: ['उन्हाळी कांदा', 'काकडी'] },
    konkan: { kharif: ['भात', 'नाचणी', 'भाजीपाला'], rabi: ['भाजीपाला', 'काजू लागवड'], summer: ['आंबा काळजी', 'नारळ'] },
    nashik: { kharif: ['द्राक्षे', 'कांदा', 'टोमॅटो', 'मका'], rabi: ['गहू', 'हरभरा', 'कांदा'], summer: ['स्ट्रॉबेरी', 'टरबूज'] },
    khandesh: { kharif: ['केळी', 'कापूस', 'मका', 'तूर'], rabi: ['हरभरा', 'गहू', 'मका'], summer: ['उन्हाळी मूग'] }
  };
  let base = regionCrops[region]?.[season] || regionCrops[region]?.kharif || ['कापूस', 'सोयाबीन'];
  if (ph > 8) base = base.filter(c => !['द्राक्षे', 'स्ट्रॉबेरी'].includes(c));
  return base.slice(0, 4);
}

// ══════════════════════════════════════
// MARKET PRICES
// ══════════════════════════════════════
const marketPrices = {
  cotton:      { name: 'कापूस',    mandis: { vidarbha: [7200, 7450, 7100], marathwada: [7100, 7300, 6950], western: [7000, 7200, 6800], nashik: [6900, 7100, 6700], konkan: [6800, 7000, 6600], khandesh: [7050, 7250, 6900] }, unit: 'क्विंटल', msp: 6620 },
  soybean:     { name: 'सोयाबीन', mandis: { vidarbha: [4500, 4700, 4300], marathwada: [4400, 4600, 4200], western: [4350, 4550, 4150], nashik: [4300, 4500, 4100], konkan: [4200, 4400, 4000], khandesh: [4400, 4600, 4200] }, unit: 'क्विंटल', msp: 4600 },
  onion:       { name: 'कांदा',    mandis: { vidarbha: [1800, 2200, 1500], marathwada: [1600, 2000, 1300], western: [2000, 2400, 1700], nashik: [2200, 2600, 1900], konkan: [1500, 1900, 1200], khandesh: [1700, 2100, 1400] }, unit: 'क्विंटल', msp: null },
  tomato:      { name: 'टोमॅटो',  mandis: { vidarbha: [1200, 1800, 900], marathwada: [1100, 1700, 800], western: [1500, 2100, 1200], nashik: [1600, 2200, 1300], konkan: [1000, 1600, 700], khandesh: [1100, 1700, 800] }, unit: 'क्विंटल', msp: null },
  wheat:       { name: 'गहू',      mandis: { vidarbha: [2300, 2450, 2200], marathwada: [2250, 2400, 2150], western: [2350, 2500, 2250], nashik: [2300, 2450, 2200], konkan: [2200, 2350, 2100], khandesh: [2300, 2450, 2200] }, unit: 'क्विंटल', msp: 2275 },
  tur:         { name: 'तूर',      mandis: { vidarbha: [7200, 7500, 7000], marathwada: [7100, 7400, 6900], western: [7000, 7300, 6800], nashik: [6900, 7200, 6700], konkan: [6800, 7100, 6600], khandesh: [7100, 7400, 6900] }, unit: 'क्विंटल', msp: 7000 },
  sugarcane:   { name: 'ऊस',       mandis: { vidarbha: [3150, 3200, 3100], marathwada: [3100, 3150, 3050], western: [3200, 3250, 3150], nashik: [3150, 3200, 3100], konkan: [3050, 3100, 3000], khandesh: [3100, 3150, 3050] }, unit: 'टन', msp: 3150 },
  grapes:      { name: 'द्राक्षे', mandis: { vidarbha: [5000, 6000, 4000], marathwada: [4500, 5500, 3500], western: [6000, 7500, 5000], nashik: [7000, 8500, 6000], konkan: [4500, 5500, 3500], khandesh: [4500, 5500, 3500] }, unit: 'क्विंटल', msp: null },
  pomegranate: { name: 'डाळिंब',  mandis: { vidarbha: [8000, 9500, 7000], marathwada: [7500, 9000, 6500], western: [9000, 11000, 8000], nashik: [8500, 10500, 7500], konkan: [7000, 8500, 6000], khandesh: [7500, 9000, 6500] }, unit: 'क्विंटल', msp: null },
  rice:        { name: 'भात',      mandis: { vidarbha: [2100, 2250, 1950], marathwada: [2050, 2200, 1900], western: [2100, 2250, 1950], nashik: [2050, 2200, 1900], konkan: [2200, 2350, 2050], khandesh: [2050, 2200, 1900] }, unit: 'क्विंटल', msp: 2183 }
};

const mandiNames = {
  vidarbha: ['यवतमाळ मंडी', 'वर्धा मंडी', 'अमरावती मंडी'],
  marathwada: ['औरंगाबाद मंडी', 'लातूर मंडी', 'नांदेड मंडी'],
  western: ['पुणे मंडी', 'सातारा मंडी', 'सोलापूर मंडी'],
  konkan: ['रत्नागिरी मंडी', 'रायगड मंडी', 'सिंधुदुर्ग मंडी'],
  nashik: ['नाशिक मंडी', 'पिंपळगाव मंडी', 'लासलगाव मंडी'],
  khandesh: ['धुळे मंडी', 'जळगाव मंडी', 'नंदुरबार मंडी']
};

function showMarketPrices() {
  const crop = document.getElementById('cropSelect').value;
  const info = marketPrices[crop];
  const prices = info.mandis[currentRegion] || info.mandis.vidarbha;
  const mandis = mandiNames[currentRegion] || mandiNames.vidarbha;
  const d = dialects[currentRegion];
  const result = document.getElementById('marketResult');

  const maxPrice = Math.max(...prices);
  const maxMandi = mandis[prices.indexOf(maxPrice)];
  const minPrice = Math.min(...prices);

  let lines = [];
  lines.push(`📊 ${info.name} — आजचे बाजार भाव (${currentRegionDisplay})`);
  lines.push('─'.repeat(42));
  prices.forEach((p, i) => {
    const tag = p === maxPrice ? ' ← सर्वाधिक भाव ✅' : p === minPrice ? ' ← सर्वात कमी' : '';
    lines.push(`${mandis[i]}: ₹${p.toLocaleString('en-IN')}/${info.unit}${tag}`);
  });

  lines.push(`\n💡 सल्ला: ${maxMandi} मध्ये विका — सर्वात जास्त भाव`);
  const diff = maxPrice - minPrice;
  if (diff > 200) lines.push(`   फरक: ₹${diff}/${info.unit} — दूर जाणे परवडेल`);

  if (info.msp) {
    const aboveMsp = prices[0] > info.msp;
    lines.push(`\n🏛️ MSP (किमान आधारभूत किंमत): ₹${info.msp.toLocaleString('en-IN')}/${info.unit}`);
    lines.push(aboveMsp ? `✅ बाजार भाव MSP पेक्षा जास्त आहे` : `⚠️ बाजार भाव MSP पेक्षा कमी आहे — APMC शी संपर्क करा`);
  }

  lines.push(`\n${d.kvk}`);
  showResult(result, lines.join('\n'), prices[0] >= (info.msp || 0) ? 'success' : 'warning');
}

// ══════════════════════════════════════
// GAIN / LOSS CALCULATOR
// ══════════════════════════════════════
function calcGainLoss() {
  const qty = parseFloat(document.getElementById('yieldQtl').value);
  const price = parseFloat(document.getElementById('sellPrice').value);
  const cost = parseFloat(document.getElementById('totalCost').value);
  const transport = parseFloat(document.getElementById('transportCost').value) || 0;
  const d = dialects[currentRegion];
  const result = document.getElementById('glResult');

  if (!qty || !price || !cost) {
    showResult(result, '⚠️ कृपया उत्पन्न, विक्री भाव, आणि एकूण खर्च भरा.', 'error');
    return;
  }

  const revenue = qty * price;
  const totalExpense = cost + transport;
  const profit = revenue - totalExpense;
  const breakEven = Math.ceil(totalExpense / qty);
  const margin = ((profit / revenue) * 100).toFixed(1);
  const perAcre = profit;

  let lines = [];
  lines.push(`💰 नफा-तोटा हिशोब — ${currentRegionDisplay}`);
  lines.push('─'.repeat(40));
  lines.push(`\n📦 उत्पन्न: ${qty} क्विंटल × ₹${price.toLocaleString('en-IN')} = ₹${revenue.toLocaleString('en-IN')}`);
  lines.push(`💸 शेती खर्च: ₹${cost.toLocaleString('en-IN')}`);
  if (transport > 0) lines.push(`🚛 वाहतूक खर्च: ₹${transport.toLocaleString('en-IN')}`);
  lines.push(`📊 एकूण खर्च: ₹${totalExpense.toLocaleString('en-IN')}`);
  lines.push('\n' + '─'.repeat(40));

  if (profit > 0) {
    lines.push(`✅ निव्वळ नफा: ₹${profit.toLocaleString('en-IN')}`);
    lines.push(`📈 नफा मार्जिन: ${margin}%`);
    lines.push(`\n🎯 ${d.good}! ${d.address} यंदा नफा झाला.`);
  } else if (profit === 0) {
    lines.push(`⚖️ नफा-तोटा: शून्य (Break Even)`);
    lines.push(`खर्च निघाला पण नफा नाही.`);
  } else {
    lines.push(`🚨 तोटा: ₹${Math.abs(profit).toLocaleString('en-IN')}`);
    lines.push(`\n${d.address}, तोटा झाला. पण काळजी करू नका —`);
    lines.push(`PMFBY किंवा SDRF साठी अर्ज करता येईल.`);
    lines.push(`"🆘 नुकसान & योजना" टॅबमध्ये माहिती बघा.`);
  }

  lines.push(`\n📊 Break-Even भाव: ₹${breakEven.toLocaleString('en-IN')}/क्विंटल`);
  if (price < breakEven) {
    lines.push(`⚠️ सध्याचा भाव ₹${price} < Break-Even ₹${breakEven}`);
    lines.push(`   भाव वाढेपर्यंत थांबणे शक्य असेल तर थांबा.`);
  }

  showResult(result, lines.join('\n'), profit >= 0 ? 'success' : 'warning');
}

// ══════════════════════════════════════
// DISASTER RELIEF & SCHEMES
// ══════════════════════════════════════
function findSchemes() {
  const disaster = document.getElementById('disasterType').value;
  const damage = parseInt(document.getElementById('damagePercent').value);
  const pmfby = document.getElementById('pmfby').value;
  const farmerType = document.getElementById('farmerType').value;
  const d = dialects[currentRegion];
  const result = document.getElementById('disasterResult');

  const disasterNames = { hail: 'गारपीट', flood: 'अतिवृष्टी/पूर', drought: 'दुष्काळ', heat: 'उष्णतेची लाट', pest: 'कीड/रोग', unseasonal: 'अवकाळी पाऊस' };

  let lines = [];
  lines.push(`🆘 नुकसान भरपाई — ${currentRegionDisplay}`);
  lines.push(`नुकसान: ${disasterNames[disaster]} | ${damage}% नुकसान`);
  lines.push('─'.repeat(42));

  // Scheme matching
  let schemes = [];

  if (pmfby === 'yes' && damage >= 25) {
    schemes.push({
      name: 'PMFBY — प्रधानमंत्री फसल बीमा योजना',
      amount: damage >= 75 ? 'पूर्ण विम्याची रक्कम' : damage >= 50 ? '75% विमा रक्कम' : '50% विमा रक्कम',
      docs: '7/12, विमा पावती, बँक पासबुक, आधार, नुकसानीचे फोटो',
      office: 'जवळच्या बँकेशी संपर्क करा',
      deadline: '72 तासांत नुकसानीची तक्रार नोंदवा'
    });
  }

  if (damage >= 50) {
    schemes.push({
      name: 'SDRF — राज्य आपत्ती निवारण निधी',
      amount: farmerType === 'marginal' ? '₹13,500/हेक्टर (जिरायत)' : '₹6,800/हेक्टर',
      docs: '7/12 उतारा, आधार कार्ड, बँक पासबुक, नुकसानीचे 4 फोटो',
      office: 'तालुका कृषी अधिकारी कार्यालय',
      deadline: 'नुकसानीनंतर 30 दिवसांत अर्ज'
    });
  }

  if (disaster === 'drought') {
    schemes.push({
      name: 'दुष्काळ मदत योजना (महाराष्ट्र शासन)',
      amount: '₹10,000–15,000/हेक्टर (जाहीर झाल्यावर)',
      docs: '7/12, आधार, बँक पासबुक, रहिवासी दाखला',
      office: 'तालुका कार्यालय / जिल्हाधिकारी कार्यालय',
      deadline: 'दुष्काळ जाहीर झाल्यावर 45 दिवस'
    });
  }

  if (farmerType === 'marginal' || farmerType === 'small') {
    schemes.push({
      name: 'PM किसान सन्मान निधी',
      amount: '₹6,000/वर्ष (₹2,000 × 3 हप्ते)',
      docs: 'आधार, बँक खाते — pmkisan.gov.in वर नोंदणी',
      office: 'ऑनलाइन / CSC केंद्र',
      deadline: 'कधीही अर्ज करता येतो'
    });
  }

  if (schemes.length === 0) {
    lines.push('\n⚠️ तुमच्या परिस्थितीत सध्या थेट योजना लागू होत नाही.');
    lines.push('पण PMFBY विमा असल्यास — त्वरित बँकेशी संपर्क करा.');
    lines.push(`\n${d.kvk}`);
  } else {
    lines.push(`\n✅ ${schemes.length} योजना लागू होतात:\n`);
    schemes.forEach((s, i) => {
      lines.push(`${i + 1}. ${s.name}`);
      lines.push(`   💰 मदत: ${s.amount}`);
      lines.push(`   📄 कागद: ${s.docs}`);
      lines.push(`   🏢 कुठे: ${s.office}`);
      lines.push(`   ⏰ मुदत: ${s.deadline}`);
      lines.push('');
    });
    lines.push('─'.repeat(42));
    lines.push('📸 महत्त्वाचे: नुकसानीचे फोटो आत्ताच काढा!');
    lines.push('   तारीख, जमीन आणि पीक दिसेल असे काढा.');
    lines.push(`\n📞 Kisan Call Centre: 1800-180-1551`);
    lines.push(`${d.kvk}`);
  }

  const type = schemes.length > 0 ? 'success' : 'warning';
  showResult(result, lines.join('\n'), type);
}

// ══════════════════════════════════════
// WEATHER ADVISORY
// ══════════════════════════════════════
function getWeatherAdvisory() {
  const season = document.getElementById('weatherSeason').value;
  const crop = document.getElementById('weatherCrop').value;
  const d = dialects[currentRegion];
  const result = document.getElementById('weatherResult');

  const cropNames = { cotton: 'कापूस', soybean: 'सोयाबीन', onion: 'कांदा', wheat: 'गहू', sugarcane: 'ऊस', rice: 'भात', tur: 'तूर', grapes: 'द्राक्षे' };
  const seasonNames = { premonsoon: 'पूर्व मान्सून', monsoon: 'मान्सून', postmonsoon: 'परतीचा पाऊस', winter: 'हिवाळा', summer: 'उन्हाळा' };

  const advisories = {
    premonsoon: {
      cotton: `• जमीन नांगरणी करा — पेरणीसाठी तयार ठेवा\n• मान्सून येण्यापूर्वी बियाणे खरेदी करा\n• बांध दुरुस्ती करा — पाणी साठवण्यासाठी\n• कृषी कर्ज घ्या — KCC वापरा`,
      soybean: `• मान्सून येण्याची वाट बघा — घाईने पेरू नका\n• बियाणे उगवण तपासा — 85%+ असावी\n• बीजप्रक्रिया करा — Rhizobium culture\n• शेत सपाट करा`,
      default: `• शेत तयार करा\n• बियाणे व खते खरेदी करा\n• ठिबक सिंचन तपासा\n• PMFBY विमा भरा`
    },
    monsoon: {
      cotton: `• पेरणी: 14–20 जून (जमीन 65%+ ओली झाल्यावर)\n• पाण्याचा निचरा बघा — मुळे कुजतात\n• बोंड अळी सापळे लावा\n• जड पावसात खत देऊ नका — वाहते`,
      soybean: `• पेरणी जून पहिल्या आठवड्यात\n• पाणी साचणार नाही याची काळजी\n• चक्री भुंगा: इमिडाक्लोप्रिड फवारा\n• उगवणीनंतर 21 दिवसांत खुरपणी`,
      default: `• पेरणी वेळेत करा\n• जड पावसात शेतात पाणी साचू देऊ नका\n• कीड निरीक्षण नियमित करा`
    },
    postmonsoon: {
      cotton: `• कापूस काढणी सुरू करा — परतीच्या पावसापूर्वी\n• ओले असताना काढू नका — दर्जा खराब होतो\n• काढणीनंतर लगेच बाजारात नेऊ नका — भाव कमी\n• साठवणूक कोरड्या जागी करा`,
      wheat: `• रब्बी पेरणीची तयारी करा\n• शेत नांगरा — मागील पिकाचे अवशेष गाडा\n• ओलावा मोजा — 40%+ असेल तर पेरा\n• वाण निवड: HD-2781, GW-322`,
      default: `• काढणीची तयारी करा\n• रब्बी पिकाचे नियोजन करा\n• शेत स्वच्छ करा`
    },
    winter: {
      wheat: `• हिवाळ्यात गहू उत्तम येतो\n• पाणी 10 दिवसांच्या अंतराने\n• दव पडताना फवारणी करू नका\n• करपा रोग: Propiconazole फवारा`,
      default: `• थंडीत पाणी कमी द्या\n• धुके असताना फवारणी करू नका\n• रात्री तापमान 5°C खाली गेल्यास झाकण टाका`
    },
    summer: {
      sugarcane: `• उन्हाळ्यात ठिबक सिंचन वापरा\n• 5–6 दिवसांनी पाणी द्या\n• उष्णतेत खत देताना पाण्यासोबत द्या\n• मल्चिंग करा — ओलावा टिकतो`,
      onion: `• उन्हाळी कांदा काढणीसाठी तयार\n• जमीन कोरडी असताना काढा\n• 3–4 दिवस उन्हात सुकवा\n• थंड जागी साठवा`,
      default: `• ठिबक सिंचन वापरा\n• सकाळी 7 पूर्वी किंवा संध्याकाळी 6 नंतर काम\n• पिकावर पांढरी वस्त्रे पसरवा — उष्णतेपासून संरक्षण`
    }
  };

  const seasonAdv = advisories[season] || {};
  const advice = seasonAdv[crop] || seasonAdv.default || `${cropNames[crop]} साठी ${seasonNames[season]} मध्ये नियमित काळजी घ्या.`;

  let lines = [];
  lines.push(`🌦️ हवामान सल्ला — ${currentRegionDisplay}`);
  lines.push(`पीक: ${cropNames[crop]} | हंगाम: ${seasonNames[season]}`);
  lines.push('─'.repeat(42));
  lines.push('');
  lines.push(advice);
  lines.push('');
  lines.push('─'.repeat(42));
  lines.push('📱 हवामान Apps:');
  lines.push('• Meghdoot App (शेतकऱ्यांसाठी — मोफत)');
  lines.push('• Kisan Suvidha App');
  lines.push('• IMD: imd.gov.in');
  lines.push(`\n${d.kvk}`);

  showResult(result, lines.join('\n'), 'success');
}

// Update weather alerts based on region
function updateAlerts() {
  const alerts = {
    vidarbha: [
      { type: 'alert-warn', icon: '⚡', title: 'गारपीट सावधान', desc: 'पुढील 6 तासात विदर्भात गारपीट होण्याची शक्यता. काढता येईल ते काढा.' },
      { type: 'alert-info', icon: '🌧️', title: 'मान्सून अंदाज', desc: 'विदर्भात मान्सून 12–15 जून दरम्यान अपेक्षित. पेरणीची तयारी ठेवा.' },
      { type: 'alert-success', icon: '✅', title: 'पेरणी विंडो', desc: 'जमिनीत 65% ओलावा — कापूस पेरणीसाठी आजचा दिवस उत्तम.' },
      { type: 'alert-danger', icon: '🌡️', title: 'उष्णतेची लाट', desc: 'पुढे 3 दिवस 44°C+ तापमान. सकाळी 7 च्या आधी काम करा.' }
    ],
    marathwada: [
      { type: 'alert-danger', icon: '🏜️', title: 'दुष्काळ सावधान', desc: 'मराठवाड्यात पाऊस 20% कमी. पाणी जपून वापरा. ठिबक वापरा.' },
      { type: 'alert-info', icon: '🌧️', title: 'मान्सून उशीर', desc: 'यंदा मान्सून 5–7 दिवस उशीर. जून 15–20 पेरणीसाठी तयार राहा.' },
      { type: 'alert-warn', icon: '💧', title: 'पाणी टंचाई', desc: 'जलाशय 35% — ऊस आणि द्राक्षे पिकांना पाणी जपून द्या.' },
      { type: 'alert-success', icon: '✅', title: 'सोयाबीन सल्ला', desc: 'जून पहिल्या आठवड्यात सोयाबीन पेरणी उत्तम — बियाणे तयार ठेवा.' }
    ],
    western: [
      { type: 'alert-success', icon: '✅', title: 'कांदा काढणी', desc: 'उन्हाळी कांदा काढणीसाठी तयार. पावसापूर्वी काढा — भाव चांगला आहे.' },
      { type: 'alert-info', icon: '🌧️', title: 'पाऊस अंदाज', desc: 'पश्चिम महाराष्ट्रात जून 7–10 मान्सून येण्याची शक्यता.' },
      { type: 'alert-warn', icon: '🍇', title: 'द्राक्षे छाटणी', desc: 'द्राक्षांची छाटणी वेळेत करा — उशीर झाल्यास उत्पन्न कमी होईल.' },
      { type: 'alert-success', icon: '💰', title: 'बाजार संधी', desc: 'डाळिंबाला नाशिक मंडीत चांगला भाव — ₹9,000+/क्विंटल.' }
    ],
    konkan: [
      { type: 'alert-info', icon: '🌊', title: 'मान्सून लवकर', desc: 'कोकणात मान्सून जून 1–5 येणार. भात रोपवाटिका तयार करा.' },
      { type: 'alert-warn', icon: '🌀', title: 'चक्रीवादळ सावध', desc: 'अरबी समुद्रात हवामान बदल — किनारपट्टी भागात सावध राहा.' },
      { type: 'alert-success', icon: '🥭', title: 'आंबा हंगाम', desc: 'आंबा काढणी जोरात सुरू — हापूस ₹800–1200/डझन.' },
      { type: 'alert-success', icon: '🥥', title: 'नारळ सल्ला', desc: 'नारळाला चांगला भाव. ठिबक बसवल्यास अनुदान मिळेल.' }
    ],
    nashik: [
      { type: 'alert-warn', icon: '❄️', title: 'गारठा सावधान', desc: 'द्राक्षबागेत रात्री दव पडतेय — बुरशी होण्याची शक्यता. Copper Oxychloride फवारा.' },
      { type: 'alert-success', icon: '🍇', title: 'द्राक्षे काढणी', desc: 'द्राक्षे काढणीसाठी तयार — लासलगाव मंडीत ₹7,000+/क्विंटल.' },
      { type: 'alert-info', icon: '🧅', title: 'कांदा साठवण', desc: 'कांदा भाव वाढण्याची शक्यता — साठवण असेल तर 2–3 आठवडे थांबा.' },
      { type: 'alert-danger', icon: '🌡️', title: 'उष्णता वाढ', desc: 'उन्हाळ्यात 42°C+ — द्राक्षबागेला सकाळी पाणी द्या.' }
    ],
    khandesh: [
      { type: 'alert-success', icon: '🍌', title: 'केळी काढणी', desc: 'केळीला जळगाव मंडीत चांगला दर — ₹1,800–2,200/क्विंटल.' },
      { type: 'alert-info', icon: '🌧️', title: 'मान्सून अंदाज', desc: 'खान्देशात जून 12–18 मान्सून अपेक्षित. कापूस पेरणी तयारी ठेवा.' },
      { type: 'alert-warn', icon: '🌾', title: 'मका सल्ला', desc: 'लष्करी अळीचा प्रादुर्भाव — मक्याची नियमित तपासणी करा.' },
      { type: 'alert-danger', icon: '🌡️', title: 'उष्णतेची लाट', desc: 'धुळे-नंदुरबारमध्ये 45°C+ — शेतात उघड्यावर काम टाळा.' }
    ]
  };

  const grid = document.getElementById('alertGrid');
  const regionAlerts = alerts[currentRegion] || alerts.vidarbha;
  grid.innerHTML = regionAlerts.map(a => `
    <div class="alert-card ${a.type}">
      <div class="alert-icon">${a.icon}</div>
      <div class="alert-body">
        <div class="alert-title">${a.title}</div>
        <div class="alert-desc">${a.desc}</div>
      </div>
    </div>
  `).join('');
}

// ── UTILITY ──
function showResult(el, text, type) {
  el.className = 'result-box show ' + type;
  el.innerText = text;
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Init
updateAlerts();
