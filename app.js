const tg = window.Telegram && window.Telegram.WebApp;
if (tg) { tg.ready(); tg.expand(); }

const FREE_LESSONS = [1, 2];

const LESSONS = [
  {
    num: 1,
    title: "Binance-ға тіркелу",
    sub: "Аккаунт ашу · ~1 мин",
    desc: "Binance KZ-ға дұрыс және қауіпсіз тіркелуді үйренесіз.",
    video: "q-5et-862Bg",
    tip: "Тіркелу кезінде міндетті түрде 2FA қосыңыз — бұл сіздің аккаунтыңызды қорғайтын ең маңызды қадам.",
    steps: ["Binance Kazakhstan сайтына (binance.kz) кіру", "Email немесе телефон арқылы тіркелу", "Қауіпсіз құпия сөз қою", "2FA қосу — Google Authenticator ұсынылады"],
    links: [
      { label: "🔗 Binance-ға тіркелу (реферал)", url: "https://www.binance.com/join?ref=ASSILA" },
      { label: "🔗 Bybit Kazakhstan-ға тіркелу", url: "https://partner.bybit.kz/b/ASSILA" }
    ]
  },
  {
    num: 2,
    title: "Binance аккаунтын верификациялау",
    sub: "KYC · ~1 мин",
    desc: "Жеке тұлға ретінде ресми растаудан өтіп, барлық функцияларды ашасыз.",
    video: "pxM_vBP4ge4",
    tip: "KYC өтпей ешқандай ақша шығара алмайсыз. Бұл заңды талап, қорықпаңыз — деректеріңіз қауіпсіз.",
    steps: ["Профиль → Верификация бөліміне кіру", "Жеке куәлік немесе паспорт фотосын жүктеу", "Нақты уақыт селфи түсіру", "Нәтижені күту (1–24 сағат)"],
    links: []
  },
  {
    num: 3,
    title: "Теңгені USDT-ге айырбастау",
    sub: "P2P / Freedom Bank · ~2 мин",
    desc: "Freedom Bank картасы арқылы Binance-қа теңге салып, USDT-ға заңды айналдырасыз.",
    video: "EZTmK5N_j_E",
    tip: "P2P-де тек рейтингі 95%+ сатушылардан сатып алыңыз. Асықпаңыз — сенімді адаммен жұмыс жасаңыз.",
    steps: ["P2P бөліміне кіру", "Freedom Bank картасын қосу", "Сенімді сатушыны таңдау (рейтинг 95%+)", "USDT сатып алу және балансты тексеру"],
    links: []
  },
  {
    num: 4,
    title: "Binance Spot саудасы",
    sub: "Spot Trading · ~2 мин",
    desc: "BTC, ETH және т.б. монеталарды сатып алу және сату логикасын үйренесіз.",
    video: "DvXCg3J3uEk",
    tip: "Алғашқы сатып алуды өте кішкентай сомадан бастаңыз. Тәжірибе алу үшін 1000-2000 ₸ жеткілікті.",
    steps: ["Spot Wallet-ті ашу", "BTC/USDT жұбын таңдау", "Market vs Limit ордер айырмашылығы", "Бірінші сатып алуды жасау"],
    links: []
  },
  {
    num: 5,
    title: "USDT-ті теңгеге шығару",
    sub: "Вывод · ~2 мин",
    desc: "Криптоны KZT-ге ауыстырып, Freedom Bank картасына шешіп аласыз.",
    video: "rQiE___tJwg",
    tip: "Алғаш рет шығарғанда кішкентай соманы тексеріп алыңыз. Бәрі дұрыс болса ғана үлкен соманы жіберіңіз.",
    steps: ["P2P бөліміне кіру → Сату (Sell)", "USDT мөлшерін енгізу", "Freedom Bank сатып алушыны таңдау", "Аударымды растап, KZT алу"],
    links: []
  },
  {
    num: 6,
    title: "Earn: стейкинг — пассивті табыс",
    sub: "Simple Earn · ~2 мин",
    desc: "Binance Earn бөлімінде активтерді пассив табысқа салуды үйренесіз.",
    video: "Rf0RAs24HOA",
    tip: "Flexible Earn-ді таңдаңыз — кез келген уақытта шығара аласыз. Locked жоғарырақ % береді, бірақ ақша тіркеледі.",
    steps: ["Earn → Simple Earn бөліміне кіру", "APY (жылдық пайыз) дегенді түсіну", "Flexible vs Locked айырмашылығы", "USDT-ні депозитке салу"],
    links: []
  },
  {
    num: 7,
    title: "Binance ID арқылы аударым",
    sub: "Ішкі аударым · ~1 мин",
    desc: "Комьюнити мүшелеріне жылдам және комиссиясыз аударымдар жасасыз.",
    video: "cYYyTRs97Nc",
    tip: "Binance ID арқылы аударым — ең жылдам және тегін жол. Желі комиссиясы жоқ!",
    steps: ["Профиль → Binance ID-ді табу", "Wallet → Send → Binance ID таңдау", "Алушының ID-ін дұрыс енгізу", "Аударым растау"],
    links: []
  },
  {
    num: 8,
    title: "Блокчейн желілері арқылы аударым",
    sub: "BEP20, ERC20, TRX · ~1 мин",
    desc: "BEP20, ERC20, TRX желілер арқылы қауіпсіз транзакциялар жасасыз.",
    video: "YbPJdLeS3CM",
    tip: "Желіні ҚАТЕ таңдасаңыз — ақшаңыз жоғалуы мүмкін! Жіберер алдында алушы биржасының желісін екі рет тексеріңіз.",
    steps: ["Желілер айырмашылығын түсіну (BEP20 = арзан)", "Алушы биржасының желісін анықтау", "Аудару алдында екі рет тексеру", "Транзакцияны explorer-де тексеру"],
    links: []
  },
  {
    num: 9,
    title: "Фьючерс: сделка ашу және жабу",
    sub: "Futures · ~2 мин",
    desc: "Binance Futures негізі. Лонг және шорт позицияларын үйренесіз.",
    video: "nhvKFIBa8T4",
    tip: "Фьючерс — тәжірибелілерге арналған. Алдымен споттан бастаңыз. Левередж ақшаны жылдам жоғалтуы мүмкін!",
    steps: ["Futures бөліміне кіру", "Лонг және шорт позицияларын түсіну", "Левередж қалай жұмыс істейді", "Сделка ашу және қауіпсіз жабу"],
    links: []
  }
];

const ACHIEVEMENTS = [
  { icon: '🚀', title: 'Бірінші қадам', sub: '1-ші сабақты аяқтадың', req: 1 },
  { icon: '⭐', title: 'Жарты жол', sub: '5 сабақты аяқтадың', req: 5 },
  { icon: '🎓', title: 'Крипто Студент', sub: 'Барлық 9 сабақты аяқтадың', req: 9 },
];

const STORAGE_KEY = 'crypto_aliphe_v3';

function loadProgress() {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    return s ? JSON.parse(s) : { completed: [], streak: 0, totalTime: 0, lastDate: null, paid: false };
  } catch { return { completed: [], streak: 0, totalTime: 0, lastDate: null, paid: false }; }
}

function saveProgress(p) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch {}
}

let progress = loadProgress();

function startApp() {
  document.getElementById('screen-onboarding').style.display = 'none';
  document.getElementById('screen-main').style.display = 'block';
  renderLessons();
  renderStats();
}

function renderLessons() {
  const container = document.getElementById('tab-lessons');
  container.innerHTML = '';
  LESSONS.forEach((lesson, idx) => {
    const isDone    = progress.completed.includes(lesson.num);
    const isFree    = FREE_LESSONS.includes(lesson.num);
    const isPaid    = progress.paid;
    const isCurrent = !isDone && (idx === 0 || progress.completed.includes(LESSONS[idx - 1]?.num));
    const isLocked  = !isDone && !isCurrent;
    const isPaywall = isCurrent && !isFree && !isPaid;

    const card = document.createElement('div');
    card.className = 'lesson-card' + (isDone ? ' completed' : '') + (isLocked ? ' locked' : '');

    const numClass   = isDone ? 'done' : isCurrent ? 'current' : 'locked';
    const numContent = isDone ? '✓' : lesson.num;
    let badgeClass, badgeText;
    if (isDone)                    { badgeClass = 'badge-done';    badgeText = 'Дайын ✓'; }
    else if (isFree && isCurrent)  { badgeClass = 'badge-free';    badgeText = '🎁 Тегін'; }
    else if (isPaywall)            { badgeClass = 'badge-locked';  badgeText = '🔒 Ақылы'; }
    else if (isCurrent)            { badgeClass = 'badge-current'; badgeText = 'Жаңа'; }
    else                           { badgeClass = 'badge-locked';  badgeText = '🔒'; }

    card.innerHTML = `
      <div class="lesson-header">
        <div class="lesson-num ${numClass}">${numContent}</div>
        <div class="lesson-info">
          <div class="lesson-title">${lesson.title}</div>
          <div class="lesson-sub">${lesson.sub}</div>
        </div>
        <span class="lesson-badge ${badgeClass}">${badgeText}</span>
      </div>
    `;

    if (!isLocked) {
      card.onclick = () => isPaywall ? openPaywall() : openDetail(lesson.num);
    }
    container.appendChild(card);
  });
  updateProgressBar();
}

function updateProgressBar() {
  const count = progress.completed.length;
  const pct   = Math.round((count / 9) * 100);
  document.getElementById('prog-fill').style.width = pct + '%';
  document.getElementById('prog-text').textContent = count + ' / 9 сабақ';
  const label = count === 0 ? 'Оқуды бастаңыз 👇' : count === 9 ? '🎓 Курс аяқталды!' : `${9 - count} сабақ қалды`;
  document.getElementById('prog-label-text').textContent = label;
}

function openDetail(num) {
  const lesson = LESSONS.find(l => l.num === num);
  const isDone  = progress.completed.includes(num);

  document.getElementById('detail-heading').textContent = num + '-сабақ';

  const linksHTML = lesson.links && lesson.links.length > 0
    ? `<div class="links-section">
        <div class="steps-label">Пайдалы сілтемелер</div>
        ${lesson.links.map(l => `
          <a class="ref-link" href="${l.url}" target="_blank">${l.label}</a>
        `).join('')}
      </div>`
    : '';

  document.getElementById('detail-body').innerHTML = `
    <div class="detail-num-badge">${num}-сабақ</div>
    <div class="detail-lesson-title">${lesson.title}</div>
    <div class="detail-desc">${lesson.desc}</div>
    <div class="video-wrap">
      <iframe 
        src="https://www.youtube.com/embed/${lesson.video}?playsinline=1&rel=0&modestbranding=1" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>
    </div>
    <div class="assila-tip">
      <div class="assila-tip-label">Ассиладан кеңес 👩‍💼</div>
      <div class="assila-tip-text">${lesson.tip}</div>
    </div>
    <div class="steps-label">Сабақ жоспары</div>
    ${lesson.steps.map(s => `
      <div class="step-item">
        <div class="step-dot">✓</div>
        <div class="step-text">${s}</div>
      </div>
    `).join('')}
    ${linksHTML}
    ${isDone
      ? `<button class="done-btn">✓ Аяқталды</button>`
      : `<button class="start-btn" onclick="markDone(${num})">Сабақты аяқтадым ✓</button>`
    }
  `;
  document.getElementById('detail-view').classList.add('open');
}

function closeDetail() {
  document.getElementById('detail-view').classList.remove('open');
}

function openPaywall() {
  document.getElementById('paywall-view').classList.add('open');
}

function closePaywall() {
  document.getElementById('paywall-view').classList.remove('open');
}

function markDone(num) {
  if (progress.completed.includes(num)) return;
  progress.completed.push(num);
  const lesson = LESSONS.find(l => l.num === num);
  const mins = parseInt(lesson.sub.match(/~(\d+)/)?.[1] || '2');
  progress.totalTime += mins;
  const today = new Date().toDateString();
  if (progress.lastDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    progress.streak = progress.lastDate === yesterday.toDateString() ? progress.streak + 1 : 1;
    progress.lastDate = today;
  }
  saveProgress(progress);
  renderLessons();
  renderStats();
  openDetail(num);
}

function renderStats() {
  document.getElementById('s-done').textContent   = progress.completed.length;
  document.getElementById('s-streak').textContent = progress.streak;
  document.getElementById('s-time').textContent   = progress.totalTime;
  const unlocked = ACHIEVEMENTS.filter(a => progress.completed.length >= a.req);
  document.getElementById('s-ach').textContent = unlocked.length;
  const achList = document.getElementById('achievements-list');
  achList.innerHTML = unlocked.length === 0
    ? '<p style="text-align:center;color:#8a9bb0;font-size:13px;margin-top:16px">Сабақтарды аяқтап жетістіктер жина! 🌟</p>'
    : unlocked.map(a => `
        <div class="achievement">
          <div class="ach-icon">${a.icon}</div>
          <div><div class="ach-title">${a.title}</div><div class="ach-sub">${a.sub}</div></div>
        </div>`).join('');
}

function showTab(tab) {
  document.querySelectorAll('.tab').forEach((t, i) => {
    t.classList.toggle('active', (tab==='lessons'&&i===0)||(tab==='stats'&&i===1));
  });
  document.getElementById('tab-lessons').style.display = tab==='lessons' ? 'block' : 'none';
  document.getElementById('tab-stats').style.display   = tab==='stats'   ? 'block' : 'none';
}
