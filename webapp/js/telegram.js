/**
 * Telegram Web App Integration
 * Handles all Telegram-specific functionality
 */

class TelegramApp {
    constructor() {
        this.tg = window.Telegram?.WebApp || null;
        this.user = null;
        this.init();
    }

    init() {
        if (!this.tg) {
            console.warn('Telegram WebApp SDK not available (open inside Telegram)');
            return;
        }

        // Initialize Telegram Web App
        this.tg.ready();
        
        // Expand to full height
        this.tg.expand();
        
        // Get user data
        this.user = this.tg.initDataUnsafe?.user;
        
        // Set theme
        this.setTheme();
        
        // Enable closing confirmation (optional — not supported on all clients)
        if (typeof this.tg.enableClosingConfirmation === 'function') {
            this.tg.enableClosingConfirmation();
        }
        
        console.log('Telegram Web App initialized', {
            user: this.user,
            platform: this.tg.platform,
            version: this.tg.version
        });
    }

    setTheme() {
        // Sync with Telegram theme
        const themeParams = this.tg.themeParams;
        
        if (themeParams.bg_color) {
            document.documentElement.style.setProperty('--tg-bg-color', themeParams.bg_color);
        }
        
        if (themeParams.text_color) {
            document.documentElement.style.setProperty('--tg-text-color', themeParams.text_color);
        }
    }

    getUserData() {
        return {
            id: this.user?.id || null,
            first_name: this.user?.first_name || 'User',
            last_name: this.user?.last_name || '',
            username: this.user?.username || '',
            language_code: this.user?.language_code || 'uz',
            photo_url: this.user?.photo_url || null
        };
    }

    showMainButton(text, callback) {
        this.tg.MainButton.setText(text);
        this.tg.MainButton.show();
        this.tg.MainButton.onClick(callback);
    }

    hideMainButton() {
        this.tg.MainButton.hide();
    }

    showBackButton(callback) {
        this.tg.BackButton.show();
        this.tg.BackButton.onClick(callback);
    }

    hideBackButton() {
        this.tg.BackButton.hide();
    }

    hapticFeedback(type = 'light') {
        if (this.tg?.HapticFeedback) {
            this.tg.HapticFeedback.impactOccurred(type);
        }
    }

    notificationOccurred(type = 'success') {
        if (this.tg?.HapticFeedback) {
            this.tg.HapticFeedback.notificationOccurred(type);
        }
    }

    openLink(url, options = {}) {
        if (this.tg?.openLink) this.tg.openLink(url, options);
        else window.open(url, '_blank');
    }

    openTelegramLink(url) {
        if (this.tg?.openTelegramLink) this.tg.openTelegramLink(url);
        else window.open(url, '_blank');
    }

    close() {
        if (this.tg?.close) this.tg.close();
    }

    sendData(data) {
        if (this.tg?.sendData) this.tg.sendData(JSON.stringify(data));
    }

    showPopup(params) {
        if (this.tg?.showPopup) this.tg.showPopup(params);
    }

    showAlert(message) {
        if (this.tg?.showAlert) this.tg.showAlert(message);
        else alert(message);
    }

    showConfirm(message, callback) {
        if (this.tg?.showConfirm) this.tg.showConfirm(message, callback);
        else callback(confirm(message));
    }

    isExpanded() {
        return this.tg.isExpanded;
    }

    getViewportHeight() {
        return this.tg.viewportHeight;
    }

    getViewportStableHeight() {
        return this.tg.viewportStableHeight;
    }
}

// Initialize Telegram App
const telegramApp = new TelegramApp();
