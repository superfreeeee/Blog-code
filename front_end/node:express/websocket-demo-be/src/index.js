const express = require('express')
const expressWs = require('express-ws')

const app = express()
expressWs(app)

app.get('/', function (req, res, next) {
  res.send('Hello World!')
})

app.ws('/basic', function (ws, req) {
  console.log('connect success')
  console.log(ws)
  ws.send('connect to express server with WebSocket success')

  ws.on('message', function (msg) {
    console.log(`receive message ${msg}`)
    ws.send('default response')
  })

  // 设置定时发送消息
  let timer = setInterval(() => {
    ws.send(`interval message ${new Date()}`)
  }, 2000)

  ws.on('close', function (e) {
    console.log('close connection')
    clearInterval(timer)
    timer = undefined
  })
})

const port = 3000
app.listen(port, () => {console.log(`express server listen at http://localhost:${port}`)})