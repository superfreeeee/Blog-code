const express = require('express')
const app = express()

// basic
app.use(
  express.static('public', {
    lastModified: false,
    etag: false,
  })
)
// 强缓存：Cache-Control
app.use(
  express.static('public', {
    maxAge: 5000,
    lastModified: false,
    etag: false,
  })
)
// 协商缓存：Etag & Last-Modified
app.use(
  express.static('public', {
    lastModified: true,
    etag: true,
  })
)

app.get('/hello', (req, res, next) => {
  res.send('Hello World!')
})

const port = 3000

app.listen(port, () => {
  console.log(`server listen at http://localhost:${port}`)
})
