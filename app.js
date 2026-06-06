// Telegram init
try {
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();
  }
} catch(e) {}

// ── DATA ──
var FREE = [1, 2];
var CHAT = "https://t.me/assila_crypto_top";

var LESSONS = [
  { n:1, title:"Binance-ға тіркелу", sub:"~1 мин", video:"q-5et-862Bg",
    tip:"Тіркелу кезінде міндетті түрде 2FA қосыңыз.",
    steps:["Binance Kazakhstan сайтына (binance.kz) кіру","Email немесе телефон арқылы тіркелу","Қауіпсіз құпия сөз қою","2FA қосу — Google Authenticator"],
    hw:"Binance-қа тіркеліп, аккаунт ашылғанын скриншот түсіріп, комьюнити чатқа жібер ✅",
    links:[{t:"🔗 Binance реферал сілтемесі",u:"https://www.binance.com/join?ref=ASSILA"},{t:"🔗 Bybit Kazakhstan",u:"https://partner.bybit.kz/b/ASSILA"}]
  },
  { n:2, title:"Аккаунтты верификациялау", sub:"~1 мин", video:"pxM_vBP4ge4",
    tip:"KYC өтпей ешқандай ақша шығара алмайсыз.",
    steps:["Профиль → Верификация","Жеке куәлік фотосын жүктеу","Нақты уақыт селфи","Нәтижені күту 1–24 сағат"],
    hw:"KYC өтіп, 'Верификацияланды' жазуын скриншот түсіріп, чатқа жібер ✅",
    links:[]
  },
  { n:3, title:"Теңгені USDT-ге айырбастау", sub:"~2 мин", video:"EZTmK5N_j_E",
    tip:"P2P-де тек рейтингі 95%+ сатушылардан сатып алыңыз.",
    steps:["P2P бөліміне кіру","Freedom Bank картасын қосу","Сенімді сатушыны таңдау","USDT сатып алу"],
    hw:"1000 ₸ USDT сатып алып, балансты скриншот түсіріп, чатқа жібер ✅",
    links:[]
  },
  { n:4, title:"Binance Spot саудасы", sub:"~2 мин", video:"DvXCg3J3uEk",
    tip:"Алғашқы сатып алуды кішкентай сомадан бастаңыз.",
    steps:["Spot Wallet ашу","BTC/USDT жұбын таңдау","Market vs Limit айырмашылығы","Бірінші сатып алу"],
    hw:"Кез келген монетаны Spot-та сатып алып, ордер тарихын скриншот түсіріп, чатқа жібер ✅",
    links:[]
  },
  { n:5, title:"USDT-ті теңгеге шығару", sub:"~2 мин", video:"rQiE___tJwg",
    tip:"Алғаш рет шығарғанда кішкентай соманы тексеріп алыңыз.",
    steps:["P2P → Сату (Sell)","USDT мөлшерін енгізу","Freedom Bank сатып алушыны таңдау","KZT алу"],
    hw:"USDT-ті теңгеге айырбастап, Freedom Bank картасына түскенін растап, чатқа жібер ✅",
    links:[]
  },
  { n:6, title:"Earn — пассивті табыс", sub:"~2 мин", video:"Rf0RAs24HOA",
    tip:"Flexible Earn-ді таңдаңыз — кез келген уақытта шығара аласыз.",
    steps:["Earn → Simple Earn","APY дегенді түсіну","Flexible vs Locked","USDT депозитке салу"],
    hw:"Simple Earn-ге 1 USDT салып, APY пайызын жазып, чатқа жібер ✅",
    links:[]
  },
  { n:7, title:"Binance ID аударымы", sub:"~1 мин", video:"cYYyTRs97Nc",
    tip:"Binance ID арқылы аударым — ең жылдам және тегін жол.",
    steps:["Профиль → Binance ID табу","Wallet → Send → Binance ID","Алушы ID-ін енгізу","Аударым растау"],
    hw:"Комьюнити мүшесіне Binance ID арқылы 1 USDT жіберіп, транзакцияны скриншот түсір ✅",
    links:[]
  },
  { n:8, title:"Блокчейн желілері аударым", sub:"~1 мин", video:"YbPJdLeS3CM",
    tip:"Желіні ҚАТЕ таңдасаңыз ақшаңыз жоғалады! Екі рет тексеріңіз.",
    steps:["Желілер айырмашылығы (BEP20=арзан)","Алушы желісін анықтау","Екі рет тексеру","Транзакцияны explorer-де тексеру"],
    hw:"BEP20 желісімен аударым жасап, транзакция хэшін чатқа жібер ✅",
    links:[]
  },
  { n:9, title:"Фьючерс: сделка ашу/жабу", sub:"~2 мин", video:"nhvKFIBa8T4",
    tip:"Фьючерс — тәжірибелілерге арналған. Алдымен споттан бастаңыз!",
    steps:["Futures бөліміне кіру","Лонг және шорт түсіну","Левередж жұмысы","Сделка ашу және жабу"],
    hw:"Demo режимінде 1 лонг позиция ашып, скриншот түсіріп, чатқа жібер ✅",
    links:[]
  }
];

var ACHS = [
  {icon:"🚀", title:"Бірінші қадам", sub:"1-ші сабақты аяқтадың", req:1},
  {icon:"⭐", title:"Жарты жол", sub:"5 сабақты аяқтадың", req:5},
  {icon:"🎓", title:"Крипто Студент", sub:"Барлық 9 сабақты аяқтадың", req:9}
];

// ── STATE ──
var state = { done:[], streak:0, time:0, lastDate:null, paid:false };
try {
  var saved = localStorage.getItem('cryp_v5');
  if (saved) state = JSON.parse(saved);
} catch(e) {}

function save() {
  try { localStorage.setItem('cryp_v5', JSON.stringify(state)); } catch(e) {}
}

// ── PAGES ──
function show(id) {
  var pages = ['page-onboarding','page-main','page-detail','page-paywall'];
  pages.forEach(function(p) {
    document.getElementById(p).style.display = (p === id) ? 'block' : 'none';
  });
}

// ── INIT ──
document.getElementById('btn-start').onclick = function() {
  show('page-main');
  renderList();
  renderStats();
};

document.getElementById('btn-back-detail').onclick = function() {
  show('page-main');
  renderList();
};

document.getElementById('btn-back-detail2').onclick = function() {
  show('page-main');
  renderList();
};

document.getElementById('btn-back-paywall').onclick = function() {
  show('page-main');
};

// ── TABS ──
function switchTab(tab) {
  document.getElementById('tab-lessons').style.display = tab === 'lessons' ? 'block' : 'none';
  document.getElementById('tab-stats').style.display   = tab === 'stats'   ? 'block' : 'none';
  document.getElementById('tab-btn-lessons').className = tab === 'lessons' ? 'tab active' : 'tab';
  document.getElementById('tab-btn-stats').className   = tab === 'stats'   ? 'tab active' : 'tab';
}

// ── LESSON LIST ──
function renderList() {
  var el = document.getElementById('tab-lessons');
  el.innerHTML = '';

  LESSONS.forEach(function(L, idx) {
    var isDone    = state.done.indexOf(L.n) > -1;
    var isFree    = FREE.indexOf(L.n) > -1;
    var prevDone  = idx === 0 || state.done.indexOf(LESSONS[idx-1].n) > -1;
    var isCurrent = !isDone && prevDone;
    var isLocked  = !isDone && !isCurrent;
    var isPW      = isCurrent && !isFree && !state.paid;

    var numCls = isDone ? 'lnum done' : isCurrent ? 'lnum cur' : 'lnum lock';
    var numTxt = isDone ? '✓' : String(L.n);
    var badgeCls, badgeTxt;
    if (isDone)              { badgeCls = 'badge bdone';  badgeTxt = 'Дайын ✓'; }
    else if (isFree&&isCurrent){ badgeCls = 'badge bfree'; badgeTxt = '🎁 Тегін'; }
    else if (isPW)           { badgeCls = 'badge block';  badgeTxt = '🔒 Ақылы'; }
    else if (isCurrent)      { badgeCls = 'badge bcur';   badgeTxt = 'Жаңа'; }
    else                     { badgeCls = 'badge block';  badgeTxt = '🔒'; }

    var card = document.createElement('div');
    card.className = 'lcard' + (isDone?' done':'') + (isLocked?' locked':'');
    card.innerHTML =
      '<div class="lrow">' +
        '<div class="' + numCls + '">' + numTxt + '</div>' +
        '<div class="linfo"><div class="ltitle">' + L.title + '</div><div class="lsub">' + L.sub + '</div></div>' +
        '<span class="' + badgeCls + '">' + badgeTxt + '</span>' +
      '</div>';

    if (!isLocked) {
      (function(lesson, paywall) {
        card.onclick = function() {
          if (paywall) { show('page-paywall'); }
          else { openLesson(lesson.n); }
        };
      })(L, isPW);
    }

    el.appendChild(card);
  });

  // Progress
  var count = state.done.length;
  document.getElementById('prog-fill').style.width = Math.round(count/9*100) + '%';
  document.getElementById('prog-right').textContent = count + ' / 9';
  document.getElementById('prog-left').textContent =
    count === 0 ? 'Оқуды бастаңыз 👇' :
    count === 9 ? '🎓 Курс аяқталды!' :
    (9 - count) + ' сабақ қалды';
}

// ── LESSON DETAIL ──
function openLesson(num) {
  var L = null;
  for (var i=0; i<LESSONS.length; i++) { if (LESSONS[i].n === num) { L = LESSONS[i]; break; } }
  if (!L) return;

  var isDone = state.done.indexOf(num) > -1;

  var linksHtml = '';
  if (L.links && L.links.length > 0) {
    linksHtml = '<div class="section-label">Пайдалы сілтемелер</div>';
    L.links.forEach(function(lk) {
      linksHtml += '<a class="ref-btn" href="' + lk.u + '" target="_blank">' + lk.t + '</a>';
    });
  }

  var stepsHtml = '';
  L.steps.forEach(function(s) {
    stepsHtml += '<div class="step"><div class="sdot">✓</div><div class="stxt">' + s + '</div></div>';
  });

  var actionBtn = isDone
    ? '<button class="btn-done">✓ Сабақ аяқталды</button>'
    : '<button class="btn-complete" onclick="markDone(' + num + ')">Сабақты аяқтадым ✓</button>';

  document.getElementById('detail-content').innerHTML =
    '<div class="d-badge">' + num + '-сабақ</div>' +
    '<div class="d-title">' + L.title + '</div>' +
    '<div class="video-wrap"><iframe src="https://www.youtube.com/embed/' + L.video + '?playsinline=1&rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>' +
    '<div class="tip-box"><div class="tip-label">👩‍💼 Ассиладан кеңес</div><div class="tip-txt">' + L.tip + '</div></div>' +
    '<div class="section-label">Сабақ жоспары</div>' +
    stepsHtml +
    linksHtml +
    '<div class="hw-box"><div class="hw-label">📝 Үй жұмысы</div><div class="hw-txt">' + L.hw + '</div><a class="hw-btn" href="' + CHAT + '" target="_blank">📤 Чатқа жіберу</a></div>' +
    actionBtn +
    '<a class="chat-btn" href="' + CHAT + '" target="_blank">💬 Сұрақ қою — Комьюнити чат</a>';

  show('page-detail');
  document.getElementById('page-detail').scrollTop = 0;
}

function markDone(num) {
  if (state.done.indexOf(num) > -1) return;
  state.done.push(num);
  var L = null;
  for (var i=0; i<LESSONS.length; i++) { if (LESSONS[i].n === num) { L = LESSONS[i]; break; } }
  if (L) state.time += parseInt(L.sub) || 2;
  var today = new Date().toDateString();
  if (state.lastDate !== today) {
    var yest = new Date(); yest.setDate(yest.getDate()-1);
    state.streak = (state.lastDate === yest.toDateString()) ? state.streak+1 : 1;
    state.lastDate = today;
  }
  save();
  renderStats();
  openLesson(num);
}

// ── STATS ──
function renderStats() {
  document.getElementById('s-done').textContent   = state.done.length;
  document.getElementById('s-streak').textContent = state.streak;
  document.getElementById('s-time').textContent   = state.time;
  var unlocked = ACHS.filter(function(a) { return state.done.length >= a.req; });
  document.getElementById('s-ach').textContent = unlocked.length;
  var html = unlocked.length === 0
    ? '<p style="text-align:center;color:#8a9bb0;font-size:13px;margin-top:16px">Сабақтарды аяқтап жетістіктер жина! 🌟</p>'
    : '';
  unlocked.forEach(function(a) {
    html += '<div class="ach"><div class="ach-icon">' + a.icon + '</div><div><div class="ach-title">' + a.title + '</div><div class="ach-sub">' + a.sub + '</div></div></div>';
  });
  document.getElementById('ach-list').innerHTML = html;
}
