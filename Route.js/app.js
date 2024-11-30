// Load the Express module to create a web server
const express = require('express');

// Load the body-parser module to parse URL-encoded bodies
const bodyParser = require('body-parser');

// Create an instance of an Express application
const app = express();

// Load routes from other files
const adminRoutes = require('./routes/admin.js');
const shopRoutes = require('./routes/shop.js');

// Make Express parse URL-encoded bodies using body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// Connect the admin and shop routes to the app
app.use(adminRoutes);
app.use(shopRoutes);

// Set up a catch-all middleware to send a 404 page not found response
app.use((req, res, next) => {
    res.status(404).send('<h1>Page Not Found</h1>');
});

// Start the server on port 3420
app.listen(3420, () => {
    // Log a message indicating the server is running
    console.log('Server is running on port http://localhost:3420');
});


