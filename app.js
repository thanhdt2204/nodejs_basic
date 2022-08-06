const http = require('http');
require('dotenv').config();

const hostname = process.env.HOST_NAME;
const port = process.env.PORT;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})