/**
 * Main Application
 * Initializes and manages the app
 */

class App {
    constructor() {
        this.user = null;
        this.balance = 0;
        this.orders = [];
        this.init();
    }

    async init() {
        try {
            // Show loading
            showLoading();
            
            // Get user data from Telegram
            const userData = telegramApp.getUserData();
            this.user = userData;
            
            // Load user data from API
            await this.loadUserData();
            
            // Load orders
            await this.loadOrders();
            
            // Update UI
            this.updateUI();
            
            // Hide loading
            setTimeout(() => {
                hideLoading();
            }, 1000);
            
        } catch (error) {
            console.error('App initialization error:', error);
            hideLoading();
            try {
                showToast('Xatolik yuz berdi', 'error');
            } catch (_) {
                /* telegramApp unavailable */
            }
        }
    }

    async loadUserData() {
        try {
            if (!this.user.id) {
                this.balance = 0;
                return;
            }

            try {
                await api.registerUser(this.user);
            } catch (regErr) {
                console.warn('User register:', regErr.message);
            }
            
            const balanceData = await api.getUserBalance(this.user.id);
            this.balance = balanceData.data?.balance_uzs || 0;
            
        } catch (error) {
            console.error('Error loading user data:', error);
            this.balance = 0;
        }
    }

    async loadOrders() {
        try {
            if (!this.user.id) {
                this.orders = [];
                return;
            }
            
            // Get user orders
            const ordersData = await api.getUserOrders(this.user.id, 5);
            this.orders = ordersData.data || [];
            
        } catch (error) {
            console.error('Error loading orders:', error);
            this.orders = [];
        }
    }

    updateUI() {
        // Update user name
        const userName = document.getElementById('user-name');
        if (userName) {
            const fullName = `${this.user.first_name} ${this.user.last_name}`.trim();
            userName.textContent = fullName || 'User';
        }
        
        // Update user ID
        const userId = document.getElementById('user-id');
        if (userId) {
            userId.textContent = `ID: ${this.user.id || 'Demo'}`;
        }
        
        // Update balance
        const userBalance = document.getElementById('user-balance');
        if (userBalance) {
            userBalance.textContent = formatCurrency(this.balance);
        }
        
        // Update orders list
        this.updateOrdersList();
    }

    updateOrdersList() {
        const ordersList = document.getElementById('orders-list');
        if (!ordersList) return;
        
        if (this.orders.length === 0) {
            ordersList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-shopping-bag"></i>
                    <p>Buyurtmalar yo'q</p>
                </div>
            `;
            return;
        }
        
        // Create order cards
        ordersList.innerHTML = this.orders
            .map(order => createOrderCard(order))
            .join('');
    }

    async refreshData() {
        try {
            await this.loadUserData();
            await this.loadOrders();
            this.updateUI();
            showToast('Ma\'lumotlar yangilandi', 'success');
        } catch (error) {
            console.error('Error refreshing data:', error);
            showToast('Xatolik yuz berdi', 'error');
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && window.app) {
        window.app.refreshData();
    }
});
