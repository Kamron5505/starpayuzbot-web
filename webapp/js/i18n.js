// i18n.js - Multilingual support for StarPayUz Web App
const i18n = {
  currentLanguage: localStorage.getItem('language') || 'uz',
  
  translations: {
    uz: {
      // Navigation
      home: 'Асосий',
      orders: 'Буюртмалар',
      leaderboard: 'Рейтинг',
      settings: 'Созламалар',
      
      // Top bar
      topup: 'Пополнить',
      balance: 'Баланс',
      
      // Modals
      topupBalance: 'Балансни пополнить',
      selectAmount: 'Сумма сўм',
      selectPaymentMethod: 'Тўлов усули',
      topupNow: 'Пополнить',
      cancel: 'Бекор қилиш',
      
      // Amounts
      amount10k: '10,000 сўм',
      amount25k: '25,000 сўм',
      amount50k: '50,000 сўм',
      amount100k: '100,000 сўм',
      
      // Leaderboard
      leaderboardTitle: 'Энг яхши покупатели',
      today: 'Бугун',
      thisWeek: 'Бу ҳафта',
      thisMonth: 'Бу ой',
      rank: 'Ўрин',
      name: 'Исм',
      orders: 'Буюртмалар',
      total: 'Жами',
      gold: 'Олтин',
      silver: 'Кумуш',
      bronze: 'Бронза',
      
      // Settings
      settingsTitle: 'Созламалар',
      language: 'Тил',
      selectLanguage: 'Тилни танланг',
      uzbek: 'Ўзбек',
      russian: 'Русский',
      english: 'English',
      
      // Stats
      totalAmount: 'Жами сумма',
      totalUsers: 'Жами фойдаланувчилар',
      topBuyers: 'Энг яхши покупатели',
      
      // Messages
      loading: 'Юклаяпти...',
      error: 'Хато',
      success: 'Муваффақиятли',
      noData: 'Маълумот йўқ',
    },
    ru: {
      // Navigation
      home: 'Главная',
      orders: 'Заказы',
      leaderboard: 'Рейтинг',
      settings: 'Настройки',
      
      // Top bar
      topup: 'Пополнить',
      balance: 'Баланс',
      
      // Modals
      topupBalance: 'Пополнить баланс',
      selectAmount: 'Выберите сумму',
      selectPaymentMethod: 'Способ оплаты',
      topupNow: 'Пополнить',
      cancel: 'Отмена',
      
      // Amounts
      amount10k: '10,000 сум',
      amount25k: '25,000 сум',
      amount50k: '50,000 сум',
      amount100k: '100,000 сум',
      
      // Leaderboard
      leaderboardTitle: 'Лучшие покупатели',
      today: 'Сегодня',
      thisWeek: 'На этой неделе',
      thisMonth: 'В этом месяце',
      rank: 'Место',
      name: 'Имя',
      orders: 'Заказы',
      total: 'Сумма',
      gold: 'Золото',
      silver: 'Серебро',
      bronze: 'Бронза',
      
      // Settings
      settingsTitle: 'Настройки',
      language: 'Язык',
      selectLanguage: 'Выберите язык',
      uzbek: 'Ўзбек',
      russian: 'Русский',
      english: 'English',
      
      // Stats
      totalAmount: 'Общая сумма',
      totalUsers: 'Всего пользователей',
      topBuyers: 'Лучшие покупатели',
      
      // Messages
      loading: 'Загрузка...',
      error: 'Ошибка',
      success: 'Успешно',
      noData: 'Нет данных',
    },
    en: {
      // Navigation
      home: 'Home',
      orders: 'Orders',
      leaderboard: 'Leaderboard',
      settings: 'Settings',
      
      // Top bar
      topup: 'Top Up',
      balance: 'Balance',
      
      // Modals
      topupBalance: 'Top Up Balance',
      selectAmount: 'Select Amount',
      selectPaymentMethod: 'Payment Method',
      topupNow: 'Top Up',
      cancel: 'Cancel',
      
      // Amounts
      amount10k: '10,000 sum',
      amount25k: '25,000 sum',
      amount50k: '50,000 sum',
      amount100k: '100,000 sum',
      
      // Leaderboard
      leaderboardTitle: 'Top Buyers',
      today: 'Today',
      thisWeek: 'This Week',
      thisMonth: 'This Month',
      rank: 'Rank',
      name: 'Name',
      orders: 'Orders',
      total: 'Total',
      gold: 'Gold',
      silver: 'Silver',
      bronze: 'Bronze',
      
      // Settings
      settingsTitle: 'Settings',
      language: 'Language',
      selectLanguage: 'Select Language',
      uzbek: 'Ўзбек',
      russian: 'Русский',
      english: 'English',
      
      // Stats
      totalAmount: 'Total Amount',
      totalUsers: 'Total Users',
      topBuyers: 'Top Buyers',
      
      // Messages
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      noData: 'No data',
    }
  },
  
  // Get translation by key
  t(key) {
    const lang = this.currentLanguage;
    return this.translations[lang]?.[key] || this.translations.en[key] || key;
  },
  
  // Set language
  setLanguage(lang) {
    if (this.translations[lang]) {
      this.currentLanguage = lang;
      localStorage.setItem('language', lang);
      this.updatePageLanguage();
      return true;
    }
    return false;
  },
  
  // Get current language
  getLanguage() {
    return this.currentLanguage;
  },
  
  // Update all text on page
  updatePageLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = this.t(key);
    });
    
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = this.t(key);
    });
    
    document.documentElement.lang = this.currentLanguage;
  },
  
  // Initialize i18n
  init() {
    this.updatePageLanguage();
  }
};

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => i18n.init());
} else {
  i18n.init();
}
