// server123.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
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
    password: 'developer99', 
    database: 'expense_tracker'
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// Root route to serve signup.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html')); // Serve signup page
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
            res.status(200).json({ message: 'Login successful', userID: results[0].id });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });
});

// Add Expense
app.post('/api/expenses', (req, res) => {
    const { amount, description, category, userID } = req.body; // Expecting userID from request
    db.query('INSERT INTO expenses (description, amount, category, userID) VALUES (?, ?, ?, ?)', [description, amount, category, userID], (err, result) => {
        if (err) {
            console.error('Error inserting expense:', err);
            return res.status(500).json({ message: 'Error adding expense' });
        }
        res.status(201).json({ message: 'Expense added successfully' });
    });
});

// Get Expenses for a User
app.get('/api/expenses/:userID', (req, res) => {
    const userID = req.params.userID;
    db.query('SELECT * FROM expenses WHERE userID = ?', [userID], (err, results) => {
        if (err) {
            console.error('Error fetching expenses:', err);
            return res.status(500).json({ message: 'Error fetching expenses' });
        }
        res.status(200).json(results);
    });
});

// Delete Expense
app.delete('/api/expenses/:expenseID/:userID', (req, res) => {
    const { expenseID, userID } = req.params;
    db.query('DELETE FROM expenses WHERE id = ? AND userID = ?', [expenseID, userID], (err, result) => {
        if (err) {
            console.error('Error deleting expense:', err);
            return res.status(500).json({ message: 'Error deleting expense' });
        }
        if (result.affectedRows === 0) {
            return res.status(403).json({ message: 'Unauthorized: You can only delete your own expenses' });
        }
        res.status(200).json({ message: 'Expense deleted successfully' });
    });
});

// Start server and open signup page
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}//signup.html`); // Open signup page in default browser
});
