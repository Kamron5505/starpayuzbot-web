/**
 * UI Functions
 * Handles all UI interactions and animations
 */

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    // Set icon based on type
    const icon = toast.querySelector('i');
    icon.className = type === 'success' 
        ? 'fas fa-check-circle' 
        : type === 'error' 
        ? 'fas fa-times-circle' 
        : 'fas fa-info-circle';
    
    // Set message
    toastMessage.textContent = message;
    
    // Show toast
    toast.classList.add('show');
    
    if (typeof telegramApp !== 'undefined') {
        telegramApp.notificationOccurred(type);
    }
    
    // Hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Switch tabs
function switchTab(tab) {
    // Haptic feedback
    telegramApp.hapticFeedback('light');
    
    // Update active state
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.nav-item').classList.add('active');
    
    // Handle tab content
    switch(tab) {
        case 'home':
            // Already on home
            break;
        case 'orders':
            showAllOrders();
            break;
        case 'profile':
            showProfile();
            break;
        case 'help':
            showHelp();
            break;
    }
}

// Show category
function showCategory(category) {
    telegramApp.hapticFeedback('medium');
    
    switch(category) {
        case 'stars':
            window.location.href = 'pages/stars.html';
            break;
        case 'premium':
            window.location.href = 'pages/premium.html';
            break;
        case 'gifts':
            window.location.href = 'pages/gifts.html';
            break;
    }
}

// Show topup
function showTopup() {
    telegramApp.hapticFeedback('medium');
    window.location.href = 'pages/topup.html';
}

// Show all orders
function showAllOrders() {
    telegramApp.hapticFeedback('light');
    window.location.href = 'pages/orders.html';
}

// Show profile
function showProfile() {
    telegramApp.hapticFeedback('light');
    window.location.href = 'pages/profile.html';
}

// Show help
function showHelp() {
    telegramApp.hapticFeedback('light');
    telegramApp.openTelegramLink('https://t.me/StarPayUzz');
}

// Show notifications
function showNotifications() {
    telegramApp.hapticFeedback('light');
    showToast('Yangi bildirishnomalar yo\'q', 'info');
}

// Format number with spaces
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Format currency
function formatCurrency(amount, currency = 'so\'m') {
    return `${formatNumber(amount)} ${currency}`;
}

// Create order card
function createOrderCard(order) {
    const statusIcons = {
        'pending': '<i class="fas fa-clock text-yellow-500"></i>',
        'completed': '<i class="fas fa-check-circle text-green-500"></i>',
        'cancelled': '<i class="fas fa-times-circle text-red-500"></i>'
    };
    
    const statusTexts = {
        'pending': 'Kutilmoqda',
        'completed': 'Bajarildi',
        'cancelled': 'Bekor qilindi'
    };
    
    return `
        <div class="order-card glass-card">
            <div class="order-header">
                <div class="order-icon">
                    <i class="fas fa-star"></i>
                </div>
                <div class="order-info">
                    <h4 class="order-title">${order.service}</h4>
                    <p class="order-date">${new Date(order.created_at).toLocaleDateString('uz-UZ')}</p>
                </div>
                <div class="order-status">
                    ${statusIcons[order.status]}
                    <span>${statusTexts[order.status]}</span>
                </div>
            </div>
            <div class="order-footer">
                <div class="order-amount">${formatCurrency(order.amount)}</div>
                <button class="order-details-btn" onclick="showOrderDetails(${order.order_id})">
                    Batafsil
                </button>
            </div>
        </div>
    `;
}

// Show order details
function showOrderDetails(orderId) {
    telegramApp.hapticFeedback('medium');
    window.location.href = `pages/order-details.html?id=${orderId}`;
}

// Loading animation
function showLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'flex';
        loadingScreen.classList.remove('hidden');
    }
}

function hideLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    const app = document.getElementById('app');
    
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
    
    if (app) {
        app.style.display = 'block';
    }
}

// Skeleton loader
function createSkeleton(type = 'card') {
    return `
        <div class="skeleton-${type} animate-pulse">
            <div class="skeleton-line"></div>
            <div class="skeleton-line"></div>
            <div class="skeleton-line"></div>
        </div>
    `;
}
