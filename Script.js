   // ===== FILL THE GAPS - STUDENT CODE HERE =====

let transactions = [];

// 1. Load transactions from localStorage on page load
// TODO: Complete this function
function loadTransactions() {
  // Get transactions from localStorage or empty array
  transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  // Update UI with transactions
  renderTransactions(transactions);
  // Update totals
  updateTotals();
}


// 2. Add new transaction
// TODO: Complete this function
function addTransaction() {
  // Get form values: description, amount, type
  const description = document.getElementById('description').value.trim();
  const amount = parseFloat(document.getElementById('amount').value);
  const type = document.getElementById('type').value;
  // Validate inputs (amount > 0, description not empty)
  if (!description || isNaN(amount) || amount <= 0) {
    alert('Please enter a valid description and amount greater than 0.');
    return;
  }
  // Create transaction object with id, date
  const transaction = {
    id: Date.now(),
    description,
    amount,
    type,
    date: new Date().toLocaleDateString()
  };
  // Add to transactions array
  transactions.push(transaction);
  // Save to localStorage
  localStorage.setItem('transactions', JSON.stringify(transactions));
  // Update UI and totals
  renderTransactions(transactions);
  updateTotals();
  // Clear form
  document.getElementById('description').value = '';
  document.getElementById('amount').value = '';
}

// 3. Delete transaction
// TODO: Complete this function
function deleteTransaction(id) {
  // Filter transactions array (remove by id)
  transactions = transactions.filter(t => t.id !== id);
  // Save to localStorage
  localStorage.setItem('transactions', JSON.stringify(transactions));
  // Update UI and totals
  renderTransactions(transactions);
  updateTotals();
}

// 4. Update summary totals
// TODO: Complete this function
function updateTotals() {
  // Calculate total income, expense, balance
  const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expense;
  // Update DOM elements: totalIncome, totalExpense, balance
  document.getElementById('totalIncome').textContent = `₹${income.toFixed(2)}`;
  document.getElementById('totalExpense').textContent = `₹${expense.toFixed(2)}`;
  document.getElementById('netBalance').textContent = `₹${balance.toFixed(2)}`;
  document.getElementById('balance').textContent = `₹${balance.toFixed(2)}`;
}

// 5. Render transactions list
// TODO: Complete this function
function renderTransactions(transactions) {
  // Clear existing list
  const list = document.getElementById('transactionsList');
  list.innerHTML = '';
  // Loop through transactions, create HTML for each
  transactions.forEach(t => {
    const item = document.createElement('div');
    item.className = 'transaction-item';
    item.innerHTML = `
      <div class="transaction-info">
        <h4>${t.description}</h4>
        <span class="date">${t.date}</span>
      </div>
      <div class="transaction-amount ${t.type}">
        ${t.type === 'income' ? '+' : '-'}₹${t.amount.toFixed(2)}
      </div>
      <button class="delete-btn" onclick="deleteTransaction(${t.id})">Delete</button>
    `;
    // Append to DOM
    list.appendChild(item);
  });
}

    // ===== INITIALIZE APP =====
    // TODO: Call loadTransactions() here
    loadTransactions();

    // ===== EVENT LISTENERS =====
    // Form submission (Enter key)
    document.addEventListener('DOMContentLoaded', function() {
      // TODO: Add event listeners
      // Form submit on Enter
      // Load data on page load
      document.getElementById('description').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addTransaction();
      });
      document.getElementById('amount').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addTransaction();
      });
    });
