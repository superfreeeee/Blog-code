const http = require('http')

const serverStartPrefix = '[httpServer][Start]'
const serverHandlerPrefix = '[httpServer][Handler]'

module.exports = {
  config: {
    port: 8080,
    ip: 'localhost',
    server: null
  },
  start: function() {
    if(this.config.server != null) {
      console.log(`${serverStartPrefix}: restart server`)
    }
    console.time(serverStartPrefix)
    const { ip, port } = this.config
    // 建立服務器
    const server = http.createServer(this.requestHandler.bind(this))
    server.listen(port, function() {
      console.log(`${serverStartPrefix}: running at http://${ip}:${port}`)
      console.timeEnd(serverStartPrefix)
    })
    this.config.server = server
  },
  // 請求處理函數
  requestHandler: function(request, response) {
    console.time(serverHandlerPrefix)
    // 請求路徑
    const requestURL = request.url
    console.log(`request with path: ${requestURL}`)
    // 處理返回，使用 end 結束並發送
    response.writeHeader(200, {'Content-Type': 'text/plain'})
    response.end('Hello World\n')

    console.timeEnd(serverHandlerPrefix)
  }

}