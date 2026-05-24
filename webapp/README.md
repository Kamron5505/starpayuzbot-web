# StarPayUz Telegram Mini App

Modern Telegram Web App for StarPayUzAuto bot - Premium digital services marketplace.

## 📁 Project Structure

```
webapp/
├── index.html              # Main page
├── css/
│   └── style.css          # Main styles (glassmorphism, animations)
├── js/
│   ├── telegram.js        # Telegram Web App SDK integration
│   ├── api.js             # API client for backend
│   ├── ui.js              # UI functions and animations
│   └── app.js             # Main application logic
├── pages/
│   ├── stars.html         # Stars purchase page
│   ├── premium.html       # Premium subscription page
│   ├── gifts.html         # Gifts page
│   ├── topup.html         # Balance top-up page
│   ├── orders.html        # Orders history
│   └── profile.html       # User profile
├── assets/
│   └── (images, icons)
└── README.md              # This file
```

## 🚀 Features

### Core Features
- ✅ Telegram authorization
- ✅ User profile with balance
- ✅ Stars purchase (10, 50, 100, 500)
- ✅ Premium subscriptions (3, 6, 12 months)
- ✅ Gifts marketplace
- ✅ Balance top-up
- ✅ Order history
- ✅ Real-time notifications

### UI/UX Features
- 🎨 Dark fintech/neon design
- 💎 Glassmorphism effects
- ✨ Smooth animations
- 📱 Mobile-first responsive
- 🔔 Toast notifications
- ⚡ Haptic feedback
- 🎯 Bottom navigation
- 🌈 Gradient accents

## 🔧 Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, animations
- **Tailwind CSS** - Utility-first CSS
- **JavaScript (ES6+)** - Modern JS features
- **Telegram Web App SDK** - Native integration

## 📦 Installation

### 1. Clone Repository

```bash
cd star_payuz_bot\ copy/webapp
```

### 2. No Build Required!

This is a pure HTML/CSS/JS app - no build step needed.

### 3. Test Locally

```bash
# Use any static server
python -m http.server 8000
# or
npx serve
```

Open: `http://localhost:8000`

## 🌐 Deployment

### Option 1: Railway (Recommended)

1. Create `railway.toml`:

```toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "python -m http.server 8080"
```

2. Deploy:

```bash
railway up
```

### Option 2: Vercel

```bash
vercel --prod
```

### Option 3: Netlify

```bash
netlify deploy --prod --dir=.
```

### Option 4: GitHub Pages

1. Push to GitHub
2. Settings → Pages → Deploy from branch
3. Select `main` branch and `/webapp` folder

## 🤖 Connect to Telegram Bot

### 1. Update Bot Code

Add to `bot.py`:

```python
from aiogram.types import WebAppInfo, InlineKeyboardButton, InlineKeyboardMarkup

# Web App URL (replace with your deployed URL)
WEB_APP_URL = "https://your-app.railway.app"

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

### 2. Update API URL

In `webapp/js/api.js`:

```javascript
this.baseURL = 'https://web-production-3d7ba.up.railway.app/api';
```

### 3. Test

1. Send `/start` to your bot
2. Click "🚀 Open App" button
3. Web App should open inside Telegram

## 🔐 Environment Variables

Add to Railway/Vercel:

```env
API_URL=https://web-production-3d7ba.up.railway.app/api
BOT_TOKEN=your_bot_token
```

## 📱 Telegram Web App Features Used

### Initialization
```javascript
Telegram.WebApp.ready()
Telegram.WebApp.expand()
```

### User Data
```javascript
const user = Telegram.WebApp.initDataUnsafe.user
```

### Main Button
```javascript
Telegram.WebApp.MainButton.setText("Buy")
Telegram.WebApp.MainButton.show()
```

### Haptic Feedback
```javascript
Telegram.WebApp.HapticFeedback.impactOccurred('medium')
```

### Theme Sync
```javascript
const themeParams = Telegram.WebApp.themeParams
```

## 🎨 Customization

### Colors

Edit `css/style.css`:

```css
:root {
    --bg-dark: #0a0e27;
    --accent-blue: #3b82f6;
    --gradient-main: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Gradients

```css
--gradient-stars: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--gradient-premium: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
--gradient-gifts: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
```

## 🐛 Debugging

### Enable Telegram DevTools

1. Open bot in Telegram Desktop
2. Right-click Web App → Inspect Element
3. Console will show logs

### Test Without Telegram

```javascript
// Add to telegram.js for testing
if (!window.Telegram?.WebApp) {
    window.Telegram = {
        WebApp: {
            ready: () => {},
            initDataUnsafe: {
                user: {
                    id: 123456,
                    first_name: 'Test',
                    username: 'testuser'
                }
            }
        }
    };
}
```

## 📊 API Endpoints

### User
- `GET /api/bot/user/:id/balance` - Get balance
- `GET /api/bot/user/:id/orders` - Get orders

### Stars
- `POST /api/stars/purchase` - Purchase stars

### Premium
- `POST /api/premium/purchase` - Purchase premium

### Gifts
- `POST /api/gifts/purchase` - Purchase gift

## 🔄 Updates

To update the app:

1. Make changes locally
2. Test in browser
3. Push to GitHub
4. Railway/Vercel auto-deploys

## 📞 Support

- Telegram: [@StarPayUzz](https://t.me/StarPayUzz)
- Issues: GitHub Issues

## 📄 License

MIT License - feel free to use for your projects!

---

**Made with ❤️ for StarPayUz**
