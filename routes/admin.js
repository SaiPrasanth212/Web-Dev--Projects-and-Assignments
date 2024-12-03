const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/add-product', (req, res) => {
    // Send an HTML form for adding a new product
    res.sendFile(path.join(__dirname,'../','views','add-product.html'));
});
// Handle POST requests to the /product URL
router.post('/product', (req, res) => {
    // Log the submitted product details to the console
    console.log({ title: req.body.title, size: req.body.size });
    // Redirect the response back to the root URL
    res.redirect('/');
});

module.exports = router;