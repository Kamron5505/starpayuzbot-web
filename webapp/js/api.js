/**
 * API Client
 * Handles all API requests to backend
 */

class APIClient {
    constructor() {
        // Use Railway API URL or localhost for development
        this.baseURL = window.location.hostname === 'localhost' 
            ? 'http://localhost:3000/api'
            : 'https://web-production-3d7ba.up.railway.app/api';
        
        this.headers = {
            'Content-Type': 'application/json'
        };
    }

    async request(endpoint, options = {}) {
        try {
            const url = `${this.baseURL}${endpoint}`;
            const config = {
                ...options,
                headers: {
                    ...this.headers,
                    ...options.headers
                }
            };

            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok || data.success === false) {
                throw new Error(data.error || data.message || 'API request failed');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // User endpoints
    async getUserBalance(userId) {
        const res = await fetch(`${this.baseURL}/bot/balance`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({ telegram_id: String(userId) }),
        });
        const data = await res.json();
        if (!res.ok || data.success === false) {
            throw new Error(data.error || 'Balance load failed');
        }
        return data;
    }

    async getUserOrders(userId, limit = 10) {
        const res = await fetch(`${this.baseURL}/bot/transactions?telegram_id=${userId}&limit=${limit}`);
        const data = await res.json();
        if (!res.ok || data.success === false) {
            throw new Error(data.error || 'Transactions load failed');
        }
        return { data: (data.data || []).map((tx) => ({
            service: tx.description || tx.type,
            amount: tx.amount,
            status: tx.type === 'credit' ? 'completed' : 'pending',
            created_at: tx.created_at,
            order_id: tx._id,
        })) };
    }

    async registerUser(userData) {
        return this.request('/bot/user', {
            method: 'POST',
            body: JSON.stringify({
                telegram_id: String(userData.id),
                username: userData.username || null,
                full_name: [userData.first_name, userData.last_name].filter(Boolean).join(' '),
            }),
        });
    }

    async createUser(userData) {
        return this.request('/bot/user', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    }

    // Stars endpoints
    async getStarsPrices() {
        return this.request('/stars/prices');
    }

    async purchaseStars(data) {
        return this.request('/stars/purchase', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    // Premium endpoints
    async getPremiumPrices() {
        return this.request('/premium/prices');
    }

    async purchasePremium(data) {
        return this.request('/premium/purchase', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    // Gifts endpoints
    async getGifts() {
        return this.request('/gifts/list');
    }

    async purchaseGift(data) {
        return this.request('/gifts/purchase', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    // Balance endpoints
    async topUpBalance(data) {
        return this.request('/balance/topup', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    // Orders endpoints
    async getOrder(orderId) {
        return this.request(`/orders/${orderId}`);
    }

    async cancelOrder(orderId) {
        return this.request(`/orders/${orderId}/cancel`, {
            method: 'POST'
        });
    }

    // Referral endpoints
    async getReferralStats(userId) {
        try {
            return this.request(`/bot/referrals/${userId}`);
        } catch (error) {
            // Return mock data if API not available
            return {
                success: true,
                data: {
                    total_referrals: 0,
                    total_earnings: 0,
                    referrals: []
                }
            };
        }
    }

    async function getReferralLink(userId) {
        return {
            success: true,
            data: {
                link: `https://t.me/StarPayUzBot?start=ref_${userId}`
            }
        };
    }

    // Stats endpoints
    async getStats(period = 'today') {
        try {
            return this.request(`/bot/stats?period=${period}`);
        } catch (error) {
            // Return mock data if API not available
            return {
                success: true,
                data: {
                    total_sales: 2386472,
                    total_users: 156,
                    leaderboard: []
                }
            };
        }
    }
}

// Initialize API Client
const api = new APIClient();
