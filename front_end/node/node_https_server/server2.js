const https = require('https');
const fs = require('fs');
const express = require('express');
const path = require('path');

const options = {
  key: fs.readFileSync('./localhost-key.pem'),
  cert: fs.readFileSync('./localhost.pem'),
};

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

https.createServer(options, app).listen(3000, () => {
  console.log(`Server listen at https://localhost:${3000}`);
});
