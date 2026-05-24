# 🚀 Самый простой способ деплоя

## Вариант 1: GitHub Pages (БЕСПЛАТНО, 2 минуты)

### Шаг 1: Включи GitHub Pages

1. Открой: https://github.com/Kamron5505/Star_PayUz_bot
2. **Settings** → **Pages**
3. **Source:** Deploy from a branch
4. **Branch:** `master` → **Folder:** `/webapp`
5. **Save**

### Шаг 2: Подожди 1-2 минуты

GitHub автоматически задеплоит твой сайт!

### Шаг 3: Получи URL

URL будет: `https://kamron5505.github.io/Star_PayUz_bot/`

### Шаг 4: Добавь в бота

```python
WEB_APP_URL = "https://kamron5505.github.io/Star_PayUz_bot/"
```

**ГОТОВО!** ✅

---

## Вариант 2: Vercel (Тоже бесплатно, 3 минуты)

### Шаг 1: Открой Vercel

https://vercel.com/

### Шаг 2: Import Project

1. **Add New** → **Project**
2. **Import Git Repository**
3. Выбери `Star_PayUz_bot`

### Шаг 3: Настрой

- **Root Directory:** `webapp`
- **Framework Preset:** Other
- **Build Command:** (оставь пустым)
- **Output Directory:** `.`

### Шаг 4: Deploy

Нажми **Deploy** и подожди 30 секунд.

### Шаг 5: Получи URL

Vercel даст URL типа: `https://star-payuz-bot.vercel.app`

### Шаг 6: Добавь в бота

```python
WEB_APP_URL = "https://star-payuz-bot.vercel.app"
```

**ГОТОВО!** ✅

---

## Вариант 3: Netlify (Тоже бесплатно)

### Drag & Drop метод:

1. Открой: https://app.netlify.com/drop
2. Перетащи папку `webapp` в окно браузера
3. Получи URL типа: `https://random-name.netlify.app`
4. Добавь в бота

**ГОТОВО!** ✅

---

## Какой выбрать?

| Вариант | Скорость | Сложность | Цена |
|---------|----------|-----------|------|
| **GitHub Pages** | ⚡⚡ | 🟢 Легко | 💰 Бесплатно |
| **Vercel** | ⚡⚡⚡ | 🟢 Легко | 💰 Бесплатно |
| **Netlify** | ⚡⚡⚡ | 🟢 Очень легко | 💰 Бесплатно |

**Рекомендую:** Vercel (самый быстрый) или GitHub Pages (проще всего)

---

## После деплоя:

### 1. Обнови API URL

В файле `webapp/js/api.js`:

```javascript
this.baseURL = 'https://web-production-3d7ba.up.railway.app/api';
```

### 2. Добавь в бота

В файле `bot.py`:

```python
from aiogram.types import WebAppInfo, InlineKeyboardButton, InlineKeyboardMarkup

WEB_APP_URL = "https://твой-url-здесь"

@router.message(Command("start"))
async def cmd_start(message: types.Message):
    keyboard = InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(
            text="🚀 Open App",
            web_app=WebAppInfo(url=WEB_APP_URL)
        )]
    ])
    
    await message.answer(
        "👋 Assalomu alaykum! StarPayUz'ga xush kelibsiz!",
        reply_markup=keyboard
    )
```

### 3. Перезапусти бота

```bash
# На Railway или где у тебя бот
railway restart
# или
pm2 restart bot
```

### 4. Тестируй!

1. Отправь `/start` боту
2. Нажми "🚀 Open App"
3. Наслаждайся! 🎉

---

## Проблемы?

### Web App не открывается

- Проверь что URL начинается с `https://`
- Проверь что файлы задеплоились (открой URL в браузере)

### Стили не загружаются

- Проверь что Tailwind CDN доступен
- Открой DevTools → Console

### API не работает

- Проверь CORS на бэкенде
- Проверь URL в `js/api.js`

---

**Нужна помощь?** Пиши: [@StarPayUzAdmin](https://t.me/StarPayUzAdmin)
