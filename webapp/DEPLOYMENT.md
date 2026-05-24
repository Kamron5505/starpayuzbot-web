# 🚀 Deployment Guide - StarPayUz Web App

## 📋 Complete Project Structure

```
star_payuz_bot copy/
├── webapp/                          # Telegram Mini App
│   ├── index.html                   # Main page ✅
│   ├── css/
│   │   └── style.css               # Styles (glassmorphism, animations) ✅
│   ├── js/
│   │   ├── telegram.js             # Telegram SDK integration ✅
│   │   ├── api.js                  # API client ✅
│   │   ├── ui.js                   # UI functions ✅
│   │   └── app.js                  # Main app logic ✅
│   ├── pages/
│   │   ├── stars.html              # Stars purchase ✅
│   │   ├── premium.html            # Premium subscription ✅
│   │   ├── gifts.html              # Gifts marketplace ✅
│   │   ├── topup.html              # Balance top-up ✅
│   │   ├── orders.html             # Orders history ✅
│   │   └── profile.html            # User profile ✅
│   ├── README.md                    # Documentation ✅
│   └── DEPLOYMENT.md                # This file ✅
├── webapp_integration.py            # Bot integration code ✅
└── (other bot files...)

```

## 🎯 Step-by-Step Deployment

### Step 1: Deploy Web App to Railway

1. **Create `railway.toml` in webapp folder:**

```toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "python -m http.server 8080"
```

2. **Deploy to Railway:**

```bash
cd "star_payuz_bot copy/webapp"
railway login
railway init
railway up
```

3. **Get your URL:**
   - Railway will give you a URL like: `https://webapp-production-xxxx.up.railway.app`
   - Save this URL!

### Step 2: Update API URL in Web App

Edit `webapp/js/api.js`:

```javascript
this.baseURL = 'https://web-production-3d7ba.up.railway.app/api';
```

### Step 3: Add Web App to Bot

Add to `bot.py`:

```python
from aiogram.types import WebAppInfo, InlineKeyboardButton, InlineKeyboardMarkup

# Your deployed Web App URL
WEB_APP_URL = "https://webapp-production-xxxx.up.railway.app"

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

### Step 4: Test

1. Send `/start` to your bot
2. Click "🚀 Open App"
3. Web App should open inside Telegram!

## 🌐 Alternative Deployment Options

### Option A: Vercel (Recommended for static sites)

```bash
cd webapp
npm install -g vercel
vercel --prod
```

### Option B: Netlify

```bash
cd webapp
npm install -g netlify-cli
netlify deploy --prod --dir=.
```

### Option C: GitHub Pages

1. Push webapp folder to GitHub
2. Go to Settings → Pages
3. Deploy from branch: `main` → `/webapp`

## 🔧 Configuration

### Environment Variables (if needed)

```env
API_URL=https://web-production-3d7ba.up.railway.app/api
BOT_TOKEN=your_bot_token
```

### CORS Setup (Backend)

Make sure your backend allows requests from Web App:

```javascript
app.use(cors({
    origin: [
        'https://webapp-production-xxxx.up.railway.app',
        'https://web.telegram.org'
    ]
}));
```

## 📱 Testing

### Test in Telegram Desktop

1. Open bot
2. Click Web App button
3. Right-click → Inspect Element
4. Check Console for errors

### Test in Browser (Development)

```bash
cd webapp
python -m http.server 8000
```

Open: `http://localhost:8000`

## 🐛 Troubleshooting

### Web App doesn't open

- Check if URL is HTTPS (required by Telegram)
- Verify `WEB_APP_URL` in bot code
- Check Telegram Web App SDK is loaded

### API requests fail

- Check CORS settings on backend
- Verify API URL in `js/api.js`
- Check network tab in DevTools

### Styles not loading

- Check if Tailwind CDN is accessible
- Verify CSS file paths
- Check browser console for errors

## 🎨 Customization

### Change Colors

Edit `css/style.css`:

```css
:root {
    --bg-dark: #0a0e27;
    --accent-blue: #3b82f6;
    --gradient-main: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Add New Pages

1. Create `pages/newpage.html`
2. Copy structure from existing pages
3. Add navigation in `index.html`

### Modify API Endpoints

Edit `js/api.js`:

```javascript
async newEndpoint(data) {
    return this.request('/new/endpoint', {
        method: 'POST',
        body: JSON.stringify(data)
    });
}
```

## 📊 Monitoring

### Check Web App Usage

```javascript
// Add to app.js
console.log('User opened Web App:', {
    user_id: userData.id,
    timestamp: new Date().toISOString()
});
```

### Track Events

```javascript
// Track button clicks
function trackEvent(eventName, data) {
    console.log('Event:', eventName, data);
    // Send to analytics service
}
```

## 🔐 Security

### Best Practices

1. **Validate Telegram data:**
   ```javascript
   const initData = telegramApp.tg.initData;
   // Send to backend for validation
   ```

2. **Use HTTPS only**
3. **Sanitize user input**
4. **Rate limit API requests**

## 📞 Support

- Telegram: [@StarPayUzz](https://t.me/StarPayUzz)
- Admin: [@StarPayUzAdmin](https://t.me/StarPayUzAdmin)
- GitHub Issues: [Report Bug](https://github.com/Kamron5505/Star_PayUz_bot/issues)

## ✅ Deployment Checklist

- [ ] Web App deployed to Railway/Vercel
- [ ] API URL updated in `js/api.js`
- [ ] Web App URL added to bot code
- [ ] Bot restarted
- [ ] Tested in Telegram Desktop
- [ ] Tested in Telegram Mobile
- [ ] CORS configured on backend
- [ ] Error tracking enabled
- [ ] Analytics added (optional)

## 🎉 You're Done!

Your Telegram Mini App is now live! Users can access it by:
1. Opening your bot
2. Clicking the Web App button
3. Enjoying the premium experience!

---

**Made with ❤️ for StarPayUz**
