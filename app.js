let state = {
  budget: 0,
  expenses: [],
  currentFilter: 'all'
};

const RING_CIRCUMFERENCE = 565.48;

const bodyEl = document.getElementById('spideyBody');
const budgetForm = document.getElementById('budgetForm');
const budgetInput = document.getElementById('totalBudgetInput');
const expenseForm = document.getElementById('expenseForm');
const taskInput = document.getElementById('taskNameInput');
const amountInput = document.getElementById('expenseAmountInput');
const categoryInput = document.getElementById('expenseCategory');
const hudProgressRing = document.getElementById('hudProgressRing');
const hudPercentVal = document.getElementById('hudPercentVal');
const totalFundVal = document.getElementById('totalFundVal');
const totalSpentVal = document.getElementById('totalSpentVal');
const remainingBalanceVal = document.getElementById('remainingBalanceVal');
const spiderSenseBanner = document.getElementById('spiderSenseBanner');
const spiderSenseText = document.getElementById('spiderSenseText');
const expenseListBody = document.getElementById('expenseListBody');
const emptyState = document.getElementById('emptyState');
const filterPills = document.getElementById('filterPills');
const resetBtn = document.getElementById('resetAppBtn');

function init() {
  loadData();
  setupEventListeners();
  render();
}

function loadData() {
  const savedData = localStorage.getItem('spidey_budget_data');
  if (savedData) {
    try {
      state = JSON.parse(savedData);
      state.currentFilter = 'all';
    } catch (e) {
      console.error('Error parsing storage data, resetting state.', e);
    }
  }
}

function saveData() {
  localStorage.setItem('spidey_budget_data', JSON.stringify(state));
}

function setupEventListeners() {
  budgetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newBudget = parseFloat(budgetInput.value);
    if (!isNaN(newBudget) && newBudget >= 0) {
      state.budget = newBudget;
      
      const card = document.getElementById('budgetSetupCard');
      card.classList.add('web-shoot-effect');
      setTimeout(() => card.classList.remove('web-shoot-effect'), 400);
      
      saveData();
      render();
      budgetInput.value = '';
      
      taskInput.focus();
    }
  });

  expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (state.budget <= 0) {
      const budgetCard = document.getElementById('budgetSetupCard');
      budgetCard.classList.add('web-shoot-effect');
      budgetInput.style.borderColor = 'var(--color-neon-red)';
      budgetInput.placeholder = '🕸️ PLEASE SET BUDGET FIRST!';
      budgetInput.focus();
      setTimeout(() => {
        budgetCard.classList.remove('web-shoot-effect');
        budgetInput.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        budgetInput.placeholder = '0.00';
      }, 2000);
      return;
    }

    const taskName = taskInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const category = categoryInput.value;

    if (taskName && !isNaN(amount) && amount > 0) {
      const newExpense = {
        id: Date.now().toString(),
        task: taskName,
        amount: amount,
        category: category,
        date: new Date().toISOString()
      };

      state.expenses.unshift(newExpense);
      
      const card = document.getElementById('addExpenseCard');
      card.classList.add('web-shoot-effect');
      setTimeout(() => card.classList.remove('web-shoot-effect'), 400);

      saveData();
      render();

      taskInput.value = '';
      amountInput.value = '';
      categoryInput.value = 'web';
      taskInput.focus();
    }
  });

  filterPills.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('filter-btn')) {
      document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
      target.classList.add('active');
      
      state.currentFilter = target.getAttribute('data-filter');
      renderExpenseList();
    }
  });

  resetBtn.addEventListener('click', () => {
    if (confirm('🚨 Warning, Recruit! This will reset all your budget data and clear your logs. Do you want to proceed?')) {
      state = {
        budget: 0,
        expenses: [],
        currentFilter: 'all'
      };
      
      document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
      document.querySelector('[data-filter="all"]').classList.add('active');
      
      saveData();
      render();
    }
  });
}

function render() {
  updateHUD();
  renderExpenseList();
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(amount);
}

function getCategoryBadgeHTML(category) {
  const categoryNames = {
    web: 'Web Fluid',
    tech: 'Stark Tech',
    food: 'Daily Food',
    suit: 'Suit Maint.',
    other: 'Other'
  };
  return `<span class="task-category badge-${category}">${categoryNames[category] || category}</span>`;
}

function formatDate(isoString) {
  const date = new Date(isoString);
  const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return date.toLocaleDateString('en-US', options);
}

function updateHUD() {
  const totalFund = state.budget;
  const totalSpent = state.expenses.reduce((sum, item) => sum + item.amount, 0);
  const remaining = totalFund - totalSpent;
  
  let percentLeft = 100;
  if (totalFund > 0) {
    percentLeft = Math.max(0, (remaining / totalFund) * 100);
  } else if (totalSpent > 0) {
    percentLeft = 0;
  }

  totalFundVal.textContent = formatCurrency(totalFund);
  totalSpentVal.textContent = formatCurrency(totalSpent);
  remainingBalanceVal.textContent = formatCurrency(remaining);
  
  if (remaining < 0) {
    remainingBalanceVal.style.color = 'var(--color-neon-red)';
  } else {
    remainingBalanceVal.style.color = 'var(--color-neon-green)';
  }

  const offset = RING_CIRCUMFERENCE - (percentLeft / 100) * RING_CIRCUMFERENCE;
  hudProgressRing.style.strokeDashoffset = offset;
  hudPercentVal.textContent = `${Math.round(percentLeft)}%`;

  if (percentLeft > 50) {
    hudProgressRing.style.stroke = 'var(--color-neon-green)';
    hudPercentVal.style.color = 'var(--color-text)';
  } else if (percentLeft > 20) {
    hudProgressRing.style.stroke = 'var(--color-gold)';
    hudPercentVal.style.color = 'var(--color-gold)';
  } else {
    hudProgressRing.style.stroke = 'var(--color-neon-red)';
    hudPercentVal.style.color = 'var(--color-neon-red)';
  }

  const isBudgetLow = percentLeft <= 20 && totalFund > 0;
  const isBudgetExceeded = remaining < 0;

  if (isBudgetExceeded) {
    bodyEl.classList.add('spider-sense-active');
    spiderSenseBanner.classList.add('show');
    spiderSenseText.textContent = `🚨 DANGER: Your budget is exceeded by ${formatCurrency(Math.abs(remaining))}! Tap reserves or reset!`;
    spiderSenseBanner.style.background = 'rgba(255, 51, 68, 0.25)';
  } else if (isBudgetLow) {
    bodyEl.classList.add('spider-sense-active');
    spiderSenseBanner.classList.add('show');
    spiderSenseText.textContent = `🚨 WARNING: Spider-Sense tingling! Only ${Math.round(percentLeft)}% left in your budget!`;
    spiderSenseBanner.style.background = 'rgba(255, 215, 0, 0.15)';
    spiderSenseBanner.style.borderColor = 'var(--color-gold)';
    spiderSenseBanner.style.color = 'var(--color-gold)';
  } else {
    bodyEl.classList.remove('spider-sense-active');
    spiderSenseBanner.classList.remove('show');
  }
}

function renderExpenseList() {
  const filter = state.currentFilter;
  const filteredExpenses = state.expenses.filter(item => {
    return filter === 'all' || item.category === filter;
  });

  if (filteredExpenses.length === 0) {
    expenseListBody.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }
  
  emptyState.style.display = 'none';

  let html = '';
  filteredExpenses.forEach(item => {
    html += `
      <tr id="row-${item.id}" class="slide-in">
        <td><span class="task-name">${escapeHTML(item.task)}</span></td>
        <td>${getCategoryBadgeHTML(item.category)}</td>
        <td><span class="task-date">${formatDate(item.date)}</span></td>
        <td><span class="task-amount">${formatCurrency(item.amount)}</span></td>
        <td>
          <button class="delete-btn" onclick="handleDeleteExpense('${item.id}')" aria-label="Delete expense">
            ❌
          </button>
        </td>
      </tr>
    `;
  });

  expenseListBody.innerHTML = html;
}

window.handleDeleteExpense = function(id) {
  const row = document.getElementById(`row-${id}`);
  if (row) {
    row.classList.remove('slide-in');
    row.classList.add('slide-out');
    
    setTimeout(() => {
      state.expenses = state.expenses.filter(item => item.id !== id);
      saveData();
      render();
    }, 300);
  }
};

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

document.addEventListener('DOMContentLoaded', init);
