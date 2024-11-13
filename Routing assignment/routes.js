const fs = require('fs');
const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Hello TutorialsPoint</title></head>');
        res.write('<body><form action="/username" method="POST"><input type="text" name="username"/><button type="submit">Submit</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    
    if (url === '/username' && req.method === 'POST') {
        const requestBody = [];
        req.on('data', (chunk) => {
            requestBody.push(chunk);
        });
        
        req.on('end', () => {
            const parsedData = Buffer.concat(requestBody).toString();
            const username = parsedData.split('=')[1];
            fs.writeFile('username.txt', username, (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                    res.statusCode = 500;
                    res.end('Internal Server Error');
                    return;
                }
                res.statusCode = 302;
                res.setHeader('Location', '/');
                res.end();
            });
        });
        
        return;
    }
    
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Hello TutorialsPoint</title></head>');
    res.write('<body>Hello</body>');
    res.write('</html>');
    res.end();
}



module.exports = requestHandler;
