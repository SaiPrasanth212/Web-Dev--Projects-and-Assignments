/**
 * This is the main entry point for the chat server.
 * It sets up an express server and handles requests for the login and messages pages.
 * It also handles form submissions from the login and messages pages.
 * The messages are stored in a JSON file in the current directory.
 */
const http = require('http');
const express = require('express');
const bodyparser = require('body-parser');
const fs = require('fs');
const path = require('path');``

/**
 * Create an express app and set up the body parser middleware.
 */
const app = express();
app.use(bodyparser.urlencoded({ extended: false }));

/**
 * The file path for the messages JSON file.
 */
const messagesFilePath = path.join(__dirname, 'messages.json');

/**
 * The root route redirects to the login page.
 */
app.get('/', (req, res) => {
    res.redirect('/login'); // Redirect to the login page
});

/**
 * The login page route serves an HTML form for the user to enter their username.
 */
app.get('/login', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(`
        <html>
            <body>
                <p style='text-align:center'>
                    <span style='font-style:italic'><b><u>Login Page</u></b></span>
                </p>
                <form action="/login" method="POST">
                    <input type="text" name="username" placeholder="Enter username" required/>
                    <button type="submit">Log in</button>
                </form>
            </body>
        </html>
    `);
});

/**
 * The login form submission route stores the username in a session or cookie and redirects to the messages page.
 */
app.post('/login', (req, res) => {
    const username = req.body.username;
    // Store the username in a session or cookie (for simplicity, we'll just redirect with a query parameter)
    res.redirect(`/messages?username=${encodeURIComponent(username)}`);
});

/**
 * The messages page route serves an HTML page with a list of messages and a form to submit a new message.
 */
app.get('/messages', (req, res) => {
    const username = req.query.username;
    if (!username) {
        return res.redirect('/login'); // Redirect to login if no username is provided
    }

    // Read messages from the file
    fs.readFile(messagesFilePath, 'utf8', (err, data) => {
        let messages = [];
        if (!err && data) {
            messages = JSON.parse(data);
        }
        
        // Create a message display
        const messageList = messages.map(msg => `<li><strong>${msg.username}</strong>: ${msg.message}</li>`).join('');
        
        res.setHeader('Content-Type', 'text/html');
        res.send(`
            <html>
                <body>
                    <h1>Messages</h1>
                    <ul>${messageList}</ul>
                    <form action="/messages" method="POST">
                        <input type="hidden" name="username" value="${encodeURIComponent(username)}"/>
                        <input type="text" name="message" placeholder="Enter your message" required/>
                        <button type="submit">Send Message</button>
                    </form>
                </body>
            </html>
        `);
    });
});

/**
 * The message submission route adds a new message to the JSON file and redirects back to the messages page.
 */
app.post('/messages', (req, res) => {
    const username = req.body.username;
    const message = req.body.message;

    // Read existing messages from the file
    fs.readFile(messagesFilePath, 'utf8', (err, data) => {
        let messages = [];
        if (!err && data) {
            messages = JSON.parse(data);
        }

        // Add the new message
        messages.push({ username, message });

        // Write the updated messages back to the file
        fs.writeFile(messagesFilePath, JSON.stringify(messages, null, 2), (err) => {
            if (err) {
                console.error('Error writing to file', err);
            }
            // Redirect back to the messages page
            res.redirect(`/messages?username=${encodeURIComponent(username)}`);
        });
    });
});

/**
 * Start the server.
 */
const server = http.createServer(app);
server.listen(4678, () => {
    console.log('Server running at http://localhost:4678/');
});

