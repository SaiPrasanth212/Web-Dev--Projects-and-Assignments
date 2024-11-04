const http = require('http');

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, Prasanth!\n');
    console.log('Prasanth');
});

server.listen(4000, () => {
    console.log('Server running at http://localhost:4000/');
});
