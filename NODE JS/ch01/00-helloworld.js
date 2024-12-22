const http = require('http')
const port = process.env.PORT || 30004

const server = http.createServer((req, res)=>{
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end('Hello Word NodeJs')
})

server.listen(port, ()=> console.log(`server started on post ${port}; ` +
'press Ctrl-C to terminate....'))