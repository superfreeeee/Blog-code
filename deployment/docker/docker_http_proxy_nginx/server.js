const express = require('express');

const app = express();

const port = 8080;

app.get('/', (req, res) => {
  res.send('Response from localhost:8080');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
