// public/js/script.js

// Check if the user is logged in
function checkLogin() {
    if (window.location.pathname === '/index.html' && !localStorage.getItem('loggedIn')) {
        alert('You need to log in to access the expense tracker!');
        window.location.href = 'login.html'; // Redirect to login if not logged in
    }
}

// Handle Signup Form Submission
document.getElementById('signup-form')?.addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        alert('Signup successful! Redirecting to login...');
        window.location.href = 'login.html'; // Redirect to login page
    } else {
        const error = await response.json();
        alert(error.message);
    }
});

// Handle Login Form Submission
document.getElementById('login-form')?.addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        alert('Login successful! Redirecting to expense tracker...');
        localStorage.setItem('loggedIn', 'true'); // Set login status in localStorage
        window.location.href = 'index.html'; // Redirect to expense tracker
    } else {
        const error = await response.json();
        alert(error.message);
    }
});

// Handle Expense Form Submission
document.getElementById('expense-form')?.addEventListener('submit', async function (e) {
    e.preventDefault();

    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;

    const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount, description, category })
    });

    if (response.ok) {
        alert('Expense added successfully!');
        document.getElementById('expense-form').reset(); // Reset the form
        loadExpenses(); // Reload the expenses
    } else {
        const error = await response.json();
        alert(error.message);
    }
});

// Load Expenses Function
async function loadExpenses() {
    const response = await fetch('/api/expenses');
    const expenses = await response.json();
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = '';

    expenses.forEach(expense => {
        const li = document.createElement('li');
        li.textContent = `${expense.description} - $${expense.amount} (${expense.category})`;
        expenseList.appendChild(li);
    });
}

// Call the loadExpenses function on the expense tracker page
if (document.getElementById('expense-list')) {
    loadExpenses();
}
checkLogin(); // Check if logged in when accessing the expense tracker