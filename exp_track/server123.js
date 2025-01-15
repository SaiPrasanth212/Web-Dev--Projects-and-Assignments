// server123.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'developer99', // Replace with your MySQL password
    database: 'expense_tracker'
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// API Endpoints

// User Signup
app.post('/api/signup', (req, res) => {
    const { username, password } = req.body;
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err, result) => {
        if (err) {
            return res.status(400).json({ message: 'User already exists or error occurred' });
        }
        res.status(201).json({ message: 'User created successfully' });
    });
});

// User Login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error processing request' });
        }
        if (results.length > 0) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });
});

// Add Expense
app.post('/api/expenses', (req, res) => {
    const { amount, description, category } = req.body;
    db.query('INSERT INTO expenses (description, amount, category) VALUES (?, ?, ?)', [description, amount, category], (err, result) => {
        if (err) {
            console.error('Error inserting expense:', err);
            return res.status(500).json({ message: 'Error adding expense' });
        }
        res.status(201).json({ message: 'Expense added successfully' });
    });
});

// Get Expenses
app.get('/api/expenses', (req, res) => {
    db.query('SELECT * FROM expenses', (err, results) => {
        if (err) {
            console.error('Error fetching expenses:', err);
            return res.status(500).json({ message: 'Error fetching expenses' });
        }
        res.status(200).json(results);
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});