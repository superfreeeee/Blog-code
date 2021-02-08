const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

app.get('/test/1', (req, res, next) => {
  setTimeout(() => {
    res.send(`response1: ${new Date()}`)
  }, 3000)
})

app.get('/test/2', (req, res, next) => {
  setTimeout(() => {
    res.send(`response2: ${new Date()}`)
  }, 3000)
})

app.listen(3000, () => {
  console.log(`server start at http://localhost:3000`)
})
