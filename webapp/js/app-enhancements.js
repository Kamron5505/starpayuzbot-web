// app-enhancements.js - Topup modal and footer navigation

class TopupModal {
  constructor() {
    this.selectedAmount = null;
    this.init();
  }

  init() {
    this.createModal();
    this.attachEventListeners();
  }

  createModal() {
    const modal = document.createElement('div');
    modal.id = 'topupModal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="purchase-modal">
        <div class="modal-header">
          <h2 class="modal-title" data-i18n="topupBalance">Балансни пополнить</h2>
          <button class="modal-close" onclick="topupModal.close()">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="input-group">
          <label class="input-label" data-i18n="selectAmount">Сумма сўм</label>
          <div class="modal-presets">
            <button class="modal-preset" data-amount="10000" onclick="topupModal.selectAmount(10000)">
              <span data-i18n="amount10k">10,000 сўм</span>
            </button>
            <button class="modal-preset" data-amount="25000" onclick="topupModal.selectAmount(25000)">
              <span data-i18n="amount25k">25,000 сўм</span>
            </button>
            <button class="modal-preset" data-amount="50000" onclick="topupModal.selectAmount(50000)">
              <span data-i18n="amount50k">50,000 сўм</span>
            </button>
            <button class="modal-preset" data-amount="100000" onclick="topupModal.selectAmount(100000)">
              <span data-i18n="amount100k">100,000 сўм</span>
            </button>
          </div>
        </div>

        <div class="input-group">
          <label class="input-label" data-i18n="selectPaymentMethod">Тўлов усули</label>
          <div class="modal-select-wrap">
            <select class="modal-select" id="paymentMethod">
              <option value="click">Click</option>
              <option value="payme">Payme</option>
              <option value="uzum">Uzum Bank</option>
            </select>
            <span class="modal-select-arrow">
              <i class="fas fa-chevron-down"></i>
            </span>
          </div>
        </div>

        <div class="summary" id="topupSummary" style="display: none;">
          <div class="summary-row">
            <span data-i18n="selectAmount">Сумма</span>
            <span id="summaryAmount">0 сўм</span>
          </div>
          <div class="summary-row">
            <span data-i18n="selectPaymentMethod">Тўлов усули</span>
            <span id="summaryMethod">-</span>
          </div>
        </div>

        <button class="btn btn-primary" id="topupBtn" onclick="topupModal.submit()" disabled>
          <span data-i18n="topupNow">Пополнить</span>
        </button>
        <button class="btn btn-secondary" onclick="topupModal.close()">
          <span data-i18n="cancel">Бекор қилиш</span>
        </button>
      </div>
    `;

    document.body.appendChild(modal);
  }

  attachEventListeners() {
    const overlay = document.getElementById('topupModal');
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        this.close();
      }
    });
  }

  open() {
    const modal = document.getElementById('topupModal');
    modal.classList.add('active');
    i18n.updatePageLanguage();
  }

  close() {
    const modal = document.getElementById('topupModal');
    modal.classList.remove('active');
    this.selectedAmount = null;
    this.updateUI();
  }

  selectAmount(amount) {
    this.selectedAmount = amount;
    this.updateUI();
  }

  updateUI() {
    // Update preset buttons
    document.querySelectorAll('.modal-preset').forEach(btn => {
      btn.classList.remove('active');
      if (parseInt(btn.dataset.amount) === this.selectedAmount) {
        btn.classList.add('active');
      }
    });

    // Update summary
    const summary = document.getElementById('topupSummary');
    const btn = document.getElementById('topupBtn');

    if (this.selectedAmount) {
      document.getElementById('summaryAmount').textContent = 
        new Intl.NumberFormat('uz-UZ').format(this.selectedAmount) + ' сўм';
      document.getElementById('summaryMethod').textContent = 
        document.getElementById('paymentMethod').options[document.getElementById('paymentMethod').selectedIndex].text;
      
      summary.style.display = 'block';
      btn.disabled = false;
    } else {
      summary.style.display = 'none';
      btn.disabled = true;
    }
  }

  async submit() {
    if (!this.selectedAmount) return;

    const btn = document.getElementById('topupBtn');
    btn.classList.add('btn-loading');
    btn.disabled = true;

    try {
      const response = await fetch('/api/bot/topup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: this.selectedAmount,
          paymentMethod: document.getElementById('paymentMethod').value,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Show success message
        showAlert(i18n.t('success'), 'success');
        this.close();
        
        // Refresh balance if available
        if (window.updateBalance) {
          window.updateBalance();
        }
      } else {
        showAlert(data.message || i18n.t('error'), 'error');
      }
    } catch (error) {
      console.error('Topup error:', error);
      showAlert(i18n.t('error'), 'error');
    } finally {
      btn.classList.remove('btn-loading');
      btn.disabled = this.selectedAmount ? false : true;
    }
  }
}

// Initialize topup modal
let topupModal;

function initTopupModal() {
  if (!topupModal) {
    topupModal = new TopupModal();
  }
}

function openTopupModal() {
  initTopupModal();
  topupModal.open();
}

// Alert system
function showAlert(message, type = 'info') {
  let alertEl = document.getElementById('globalAlert');
  
  if (!alertEl) {
    alertEl = document.createElement('div');
    alertEl.id = 'globalAlert';
    alertEl.className = 'alert';
    document.body.insertBefore(alertEl, document.body.firstChild);
  }

  alertEl.textContent = message;
  alertEl.className = `alert alert-${type} active`;

  setTimeout(() => {
    alertEl.classList.remove('active');
  }, 3000);
}

// Footer navigation
function setupFooterNavigation() {
  const currentPage = getCurrentPage();
  
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });

  const activeItem = document.querySelector(`[data-page="${currentPage}"]`);
  if (activeItem) {
    activeItem.classList.add('active');
  }
}

function getCurrentPage() {
  const path = window.location.pathname;
  if (path.includes('leaderboard')) return 'leaderboard';
  if (path.includes('settings')) return 'settings';
  if (path.includes('orders')) return 'orders';
  return 'home';
}

function navigateTo(page, event) {
  if (event) {
    event.preventDefault();
  }

  const routes = {
    home: '/',
    orders: '/orders',
    leaderboard: '/leaderboard',
    settings: '/settings',
  };

  const url = routes[page] || '/';
  window.location.href = url;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initTopupModal();
  setupFooterNavigation();
});

// Update page language when i18n changes
const originalSetLanguage = i18n.setLanguage.bind(i18n);
i18n.setLanguage = function(lang) {
  const result = originalSetLanguage(lang);
  if (result) {
    // Re-initialize modal with new language
    if (topupModal) {
      topupModal.close();
      topupModal = null;
      initTopupModal();
    }
  }
  return result;
};
