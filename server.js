const http = require('http')
const fs = require('fs')
const { emitWarning } = require('process')
const _ = require('lodash')

const server = http.createServer((req, res, next) => {
// lodash
const num = _.random(0,20)
console.log(num);

// make the function run once

const greet = _.once(() => {
    console.log('hello!');
})
greet()
greet()
greet()

// set header content type
res.setHeader('content-type', 'text/html')

let path = './views/'
switch(req.url) {
    case '/':
        path +='index.html'
        res.statusCode = 200
        break
        case '/about':
        res.statusCode = 200
        path +='about.html'
        break
        case '/about-me':
            res.statusCode = 301
            res.setHeader('Location', '/about')
            res.end()
        default:
        path += '404.html'
        res.statusCode = 404
        break
    }

// send html file 
fs.readFile(path, (err, data) => {
    err 
    ? 
    console.log(err.message) 
    : 
    res.write(data)
    res.end()
    
})
})

const port = 3000
const host = 'localhost'
server.listen(port, host, () => {
    console.log(`listning on this port ${port}`);
})
