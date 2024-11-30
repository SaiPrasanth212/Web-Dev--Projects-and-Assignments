const express = require('express');
const router = express.Router();

router.get('/add-product', (req, res) => {
    // Send an HTML form for adding a new product
    res.send(`
        <form action="/product" method="POST">
            <input type="text" name="title" placeholder="Product Title">
            <input type="text" name="size" placeholder="Product Size">
            <button type="submit">Add Product</button>
        </form>
    `);
});
// Handle POST requests to the /product URL
router.post('/product', (req, res) => {
    // Log the submitted product details to the console
    console.log({ title: req.body.title, size: req.body.size });
    // Redirect the response back to the root URL
    res.redirect('/');
});

module.exports = router; // Export the router object so it can be used elsewhere in the application;