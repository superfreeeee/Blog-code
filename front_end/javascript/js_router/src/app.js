const express = require('express')
const app = express()

app.use(express.static('public'))
// app.use(express.static('public/hash'))
app.use(express.static('public/history'))

const port = 3000

app.listen(port, () => {
  console.log(`server listen at http://localhost:${port}`)
})
