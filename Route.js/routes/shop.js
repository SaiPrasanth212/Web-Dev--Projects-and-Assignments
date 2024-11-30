const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Send a response with a welcome message
    res.send('Welcome to home page.');
});

module.exports = router;