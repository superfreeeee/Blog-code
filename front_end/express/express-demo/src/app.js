const express = require('express')

const app = express()
const port = 3000

app.get('/', (req, res, next) => {
  console.log(Object.keys(req))
  console.log(req.headers)
  console.log(req.query)
  console.log(Object.keys(res))
  res.send('Hello World')
})

app.listen(port, () => {
  console.log(`express server start at http://localhost:${port}`)
})