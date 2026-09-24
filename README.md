# Крипто Әліппе — Telegram Mini App

**@assila.crypto** крипто обучение платформасы

## Файлдар
- `index.html` — негізгі бет (дизайн мен логика осы файлдың ішінде)
- `calculator.html` — жеке инвестиция калькуляторы
- `kaspi-qr.jpg` — Kaspi QR суреті
- `api/check-code.js` — кіру кодын серверде тексеретін Vercel функциясы

## Кіру кодтары (ACCESS_CODES)
Кодтар кодтың ішінде сақталмайды. Олар Vercel-дегі **environment variable** ішінде тұрады:

1. vercel.com → жобаңыз (`crypto-aliphe`) → **Settings** → **Environment Variables**
2. **Key:** `ACCESS_CODES`
3. **Value:** барлық кодтар үтір арқылы, мысалы: `ASSILA-2024-XXXX,ASSILA-2024-YYYY`
4. **Environments:** Production, Preview, Development — үшеуін де белгілеңіз → **Save**
5. **Deployments** → соңғы деплой → **⋯** → **Redeploy** (өзгеріс тек қайта деплойдан кейін күшіне енеді)

Жаңа код қосу үшін: осы мәнді өңдеп, соңына `,ЖАҢА-КОД` қосыңыз да, қайта Redeploy жасаңыз.

## Vercel-ге деплой (5 минут)

### 1-қадам: GitHub-қа жүктеу
1. GitHub-та жаңа репозиторий ашыңыз (мысалы: `crypto-aliphe`)
2. Осы 3 файлды жүктеңіз (Upload files)
3. Commit changes → сақтаңыз

### 2-қадам: Vercel-де деплой
1. [vercel.com](https://vercel.com) → GitHub аккаунтпен кіріңіз
2. "New Project" → өзіңіздің репозиторийді таңдаңыз
3. "Deploy" батырмасын басыңыз
4. 1-2 минуттан кейін сізге сілтеме беріледі:  
   `https://crypto-aliphe.vercel.app`

### 3-қадам: Telegram-ға қосу
1. Telegram-да **@BotFather** ботына жазыңыз
2. `/newapp` командасын жіберіңіз
3. Сұрақтарға жауап беріңіз:
   - Бот таңдаңыз (бар болса: @asilekcrypto_bot)
   - App атауы: `Крипто Әліппе`
   - Vercel сілтемесін енгізіңіз
4. BotFather сізге Mini App сілтемесін береді

## Болашақта қосуға болатын функциялар
- [ ] Видео сабақтар (YouTube embed)
- [ ] Тесттер (quiz)
- [ ] Telegram Stars арқылы төлем
- [ ] Leaderboard (кім көп аяқтады)
- [ ] Push-хабарламалар

## Байланыс
Instagram: @assila.crypto  
Telegram: t.me/asilekcrypto
