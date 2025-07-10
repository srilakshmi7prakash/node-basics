const http = require('http');
const calc = require('./math/calc');


const server = http.createServer((req, res) => {
    const url = req.url
    if (url === '/') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        res.end('<div>Welcome to Homepage<div>');
    } else if (url === '/about') {
        res.setHeader('Content-type', 'text/plain')
        res.statusCode = 200;
        res.end('This is a about page');
    }
    else if (url === '/calc') {
        res.writeHead(200, 'Content-type', 'application/json')
        res.end(JSON.stringify(calc));
    }
})

server.listen(3000, () => {
    console.log('listeninng at http://localhost:3000')
})