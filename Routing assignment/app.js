const http = require('http');
const routes = require('./routes.js');
// As routes.js is not a global one, we need to give the path of file

const server = http.createServer(routes);


server.listen(9011, () => {
    console.log('Server running at http://localhost:9011/');
});
