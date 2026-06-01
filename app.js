// Telegram Web App инициализация
const tg = window.Telegram && window.Telegram.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
}

// Сабақтар деректері
const LESSONS = [
  {
    num: 1,
    title: "Binance Kazakhstan-ға тіркелу",
    sub: "Аккаунт ашу · ~15 мин",
    desc: "Binance KZ-ға дұрыс және қауіпсіз тіркелуді үйренесіз. Негізгі баптауларды орнатасыз.",
    steps: [
      "Binance Kazakhstan сайтына (binance.kz) кіру",
      "Email немесе телефон арқылы тіркелу",
      "Қауіпсіз құпия сөз қою (үлкен/кіші әріп + сан)",
      "2FA қосу — Google Authenticator ұсынылады"
    ]
  },
  {
    num: 2,
    title: "Верификациядан өту (KYC)",
    sub: "Жеке растау · ~20 мин",
    desc: "Жеке тұлға ретінде ресми растаудан өтіп, барлық функцияларды ашасыз. KYC — заңды талап.",
    steps: [
      "Профиль → Верификация бөліміне кіру",
      "Жеке куәлік немесе паспорт фотосын жүктеу",
      "Нақты уақыт селфи түсіру",
      "Нәтижені күту (1–24 сағат)"
    ]
  },
  {
    num: 3,
    title: "Теңгені USDT-ға айналдыру",
    sub: "P2P / Freedom Bank · ~20 мин",
    desc: "Freedom Bank картасы арқылы Binance-қа теңге салып, USDT-ға заңды әрі қауіпсіз түрде айналдырасыз.",
    steps: [
      "P2P бөліміне кіру",
      "Freedom Bank картасын төлем әдісі ретінде қосу",
      "Сенімді сатушыны таңдау (рейтинг 95%+ болсын)",
      "USDT сатып алу және балансты тексеру"
    ]
  },
  {
    num: 4,
    title: "Споттық сауда жасау",
    sub: "Spot Trading · ~30 мин",
    desc: "Кез келген монетаны (BTC, ETH және т.б.) сатып алу және сату, базалық трейдинг логикасын түсінесіз.",
    steps: [
      "Spot Wallet-ті ашу және USDT балансын тексеру",
      "BTC/USDT жұбын таңдау",
      "Market vs Limit ордер айырмашылығын түсіну",
      "Бірінші сатып алуды жасау (кішкентай сомадан бастаңыз!)"
    ]
  },
  {
    num: 5,
    title: "USDT-ні теңгеге шығару",
    sub: "Вывод · ~15 мин",
    desc: "Криптоны қайта KZT-ге ауыстырып, Freedom Bank картасына шешіп аласыз.",
    steps: [
      "P2P бөліміне кіру → Сату (Sell)",
      "USDT мөлшерін енгізу",
      "Freedom Bank картасы бар сатып алушыны таңдау",
      "Аударымды растап, KZT-ті алу"
    ]
  },
  {
    num: 6,
    title: "Binance Earn — пассив табыс",
    sub: "Simple Earn · ~20 мин",
    desc: "Binance Earn бөлімінде активтерді пассив табысқа салуды үйренесіз. APY дегенді түсінесіз.",
    steps: [
      "Earn → Simple Earn бөліміне кіру",
      "APY (жылдық пайыз) дегенді есептеу",
      "Flexible vs Locked айырмашылығы",
      "USDT немесе BNB-ні депозитке салу"
    ]
  },
  {
    num: 7,
    title: "Binance ID аударымдары",
    sub: "Ішкі аударым · ~10 мин",
    desc: "Комьюнити мүшелеріне немесе өз шоттарыңа жылдам және комиссиясыз аударымдар жасасыз.",
    steps: [
      "Профиль → Binance ID-ді табу",
      "Wallet → Send → Binance ID таңдау",
      "Алушының ID-ін дұрыс енгізу",
      "Аударым жылдам және тегін екенін тексеру"
    ]
  },
  {
    num: 8,
    title: "Желілер арқылы аударым",
    sub: "BEP20, ERC20, TRX · ~25 мин",
    desc: "BEP20, ERC20, TRX және басқа blockchain желілер арқылы қауіпсіз транзакциялар жасасыз.",
    steps: [
      "Желілер айырмашылығын түсіну (BEP20 = арзан, ERC20 = қымбат)",
      "Алушы биржасының дұрыс желісін анықтау",
      "Аудару алдында желіні екі рет тексеру",
      "Транзакцияны blockchain explorer-де тексеру"
    ]
  }
];

// LocalStorage арқылы прогресті сақтау
const STORAGE_KEY = 'crypto_aliphe_progress';

function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : { completed: [], streak: 0, totalTime: 0, lastDate: null };
  } catch {
    return { completed: [], streak: 0, totalTime: 0, lastDate: null };
  }
}

function saveProgress(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

let progress = loadProgress();

// Жетістіктер
const ACHIEVEMENTS = [
  { id: 'first',    icon: '🚀', title: 'Бірінші қадам',    sub: '1-ші сабақты аяқтадың',      req: 1 },
  { id: 'half',     icon: '⭐', title: 'Жарты жол',        sub: '4 сабақты аяқтадың',          req: 4 },
  { id: 'graduate', icon: '🎓', title: 'Крипто Студент',   sub: 'Барлық 8 сабақты аяқтадың',  req: 8 },
];

function getUnlockedAchievements() {
  return ACHIEVEMENTS.filter(a => progress.completed.length >= a.req);
}

// Сабақтарды рендерлеу
function renderLessons() {
  const container = document.getElementById('tab-lessons');
  container.innerHTML = '';

  LESSONS.forEach((lesson, idx) => {
    const isDone    = progress.completed.includes(lesson.num);
    const isCurrent = !isDone && (idx === 0 || progress.completed.includes(LESSONS[idx - 1]?.num));
    const isLocked  = !isDone && !isCurrent;

    const card = document.createElement('div');
    card.className = 'lesson-card' + (isDone ? ' completed' : '') + (isLocked ? ' locked' : '');

    const numClass   = isDone ? 'done' : isCurrent ? 'current' : 'locked';
    const numContent = isDone ? '✓' : lesson.num;
    const badgeClass = isDone ? 'badge-done' : isCurrent ? 'badge-current' : 'badge-locked';
    const badgeText  = isDone ? 'Дайын ✓' : isCurrent ? 'Жаңа' : '🔒';

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
      card.onclick = () => openDetail(lesson.num);
    }

    container.appendChild(card);
  });

  updateProgressBar();
}

// Прогресс жолағы
function updateProgressBar() {
  const count = progress.completed.length;
  const pct   = Math.round((count / 8) * 100);
  document.getElementById('prog-fill').style.width = pct + '%';
  document.getElementById('prog-text').textContent = count + ' / 8 сабақ';
}

// Сабақ мазмұнын ашу
function openDetail(num) {
  const lesson = LESSONS.find(l => l.num === num);
  const isDone  = progress.completed.includes(num);

  document.getElementById('detail-heading').textContent = num + '-сабақ';

  document.getElementById('detail-body').innerHTML = `
    <div class="detail-num-badge">${num}-сабақ</div>
    <div class="detail-lesson-title">${lesson.title}</div>
    <div class="detail-desc">${lesson.desc}</div>
    <div class="steps-label">Сабақ жоспары</div>
    ${lesson.steps.map(s => `
      <div class="step-item">
        <div class="step-dot">✓</div>
        <div class="step-text">${s}</div>
      </div>
    `).join('')}
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

// Сабақты аяқталды деп белгілеу
function markDone(num) {
  if (progress.completed.includes(num)) return;

  progress.completed.push(num);

  // Уақыт қосу
  const lesson = LESSONS.find(l => l.num === num);
  const mins   = parseInt(lesson.sub.match(/~(\d+)/)?.[1] || '15');
  progress.totalTime += mins;

  // Серия жаңарту
  const today = new Date().toDateString();
  if (progress.lastDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (progress.lastDate === yesterday.toDateString()) {
      progress.streak += 1;
    } else {
      progress.streak = 1;
    }
    progress.lastDate = today;
  }

  saveProgress(progress);
  renderLessons();
  renderStats();
  openDetail(num); // жаңартылған күймен қайта ашу
}

// Статистиканы рендерлеу
function renderStats() {
  document.getElementById('s-done').textContent   = progress.completed.length;
  document.getElementById('s-streak').textContent = progress.streak;
  document.getElementById('s-time').textContent   = progress.totalTime;

  const unlocked = getUnlockedAchievements();
  document.getElementById('s-ach').textContent    = unlocked.length;

  const achList = document.getElementById('achievements-list');
  if (unlocked.length === 0) {
    achList.innerHTML = '<p style="text-align:center; color:#8a9bb0; font-size:13px; margin-top:16px">Сабақтарды аяқтап жетістіктер жина! 🌟</p>';
  } else {
    achList.innerHTML = unlocked.map(a => `
      <div class="achievement">
        <div class="ach-icon">${a.icon}</div>
        <div>
          <div class="ach-title">${a.title}</div>
          <div class="ach-sub">${a.sub}</div>
        </div>
      </div>
    `).join('');
  }
}

// Таб ауыстыру
function showTab(tab) {
  document.querySelectorAll('.tab').forEach((t, i) => {
    t.classList.toggle('active', (tab === 'lessons' && i === 0) || (tab === 'stats' && i === 1));
  });
  document.getElementById('tab-lessons').style.display  = tab === 'lessons' ? 'block' : 'none';
  document.getElementById('tab-stats').style.display    = tab === 'stats'   ? 'block' : 'none';
}

// Инициализация
renderLessons();
renderStats();
function startLearning() {
  alert("Добро пожаловать в обучение крипте 🚀");
}
