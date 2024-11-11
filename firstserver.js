// 1. import the http module
const http = require('http');

// 2. create an HTTP server
const server = http.createServer((req, res) => {
    // 3. set the response status code to 200 OK
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;
    // 4. write the response body
    res.write("<h1>P.Sai Prasanth</h1>");
    // 5. end the response by sending the string 'Hello, Prasanth!\n'
    res.end("<h3>This is assignment 1 of Sharpener.tech's Node.js course</h3>");
});

// 6. make the server listen on port 4000
server.listen(4000,() => {
    // 7. print to the console the string 'Server running at http://localhost:4000/'
    console.log("Server running at http://localhost:4000/");   
});
