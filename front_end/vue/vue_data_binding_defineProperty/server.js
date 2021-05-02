const express = require('express')
const expressStatic = require('express-static')

const app = express()

app.use(expressStatic('./src'))

const port = 3000

app.listen(port, () => {
  console.log(`server listen at: http://localhost:${port}`)
})
