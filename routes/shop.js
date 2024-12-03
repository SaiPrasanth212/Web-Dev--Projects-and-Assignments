const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Send a response with a welcome message
    res.sendFile(path.join(__dirname,'../','views','shop.html'));
});

module.exports = router;