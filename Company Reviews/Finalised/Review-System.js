const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 4678;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public'

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: 'Prasanth', // Replace with your MySQL password
    database: 'company_ratings'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

// API to fetch all ratings
app.get('/api/ratings', (req, res) => {
    const query = 'SELECT * FROM ratings';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching ratings:', err.message);
            return res.status(500).send('Error fetching ratings');
        }
        res.json(results);
    });
});

// API to add a new rating
app.post('/api/ratings', (req, res) => {
    const { company_name, pros, cons, rating } = req.body;

    if (!company_name || !pros || !cons || !rating) {
        return res.status(400).send('All fields are required');
    }

    const query = 'INSERT INTO ratings (company_name, pros, cons, rating) VALUES (?, ?, ?, ?)';
    db.query(query, [company_name, pros, cons, rating], (err) => {
        if (err) {
            console.error('Error adding rating:', err.message);
            return res.status(500).send('Error adding rating');
        }
        res.status(201).send('Rating added successfully');
    });
});

// API to search ratings by company name
app.get('/api/ratings/search', (req, res) => {
    const { company_name } = req.query;

    if (!company_name) {
        return res.status(400).send('Company name is required for searching');
    }

    const query = 'SELECT * FROM ratings WHERE company_name LIKE ?';
    db.query(query, [`%${company_name}%`], (err, results) => {
        if (err) {
            console.error('Error fetching ratings:', err.message);
            return res.status(500).send('Error fetching ratings');
        }
        res.json(results);
    });
});

// Default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
