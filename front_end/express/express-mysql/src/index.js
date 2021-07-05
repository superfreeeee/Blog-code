const express = require('express')

const connection = require('./db')
const { port } = require('./config')

const app = express()

app.get('/', (req, res, next) => {
  connection.query('select * from user', (err, users) => {
    if (err) {
      res.send('query error')
    } else {
      res.send(users)
    }
  })
})

app.listen(port, () => {
  console.log(`express server listen at http://localhost:${port}`)
})
