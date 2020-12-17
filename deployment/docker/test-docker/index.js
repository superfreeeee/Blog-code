console.log('Hello World')

const http = require('http')
const fs = require('fs')

const ip = "localhost"
const port = 3000

http.createServer(function(req, res) {
  console.log(req.url)
  res.writeHead(200, { "Content-Type": "text/html" })
  const page = fs.readFileSync('./index.html', 'utf-8')
  res.end(page)
}).listen(port, function() {
  console.log(`server running at http://${ip}:${port}`)
})