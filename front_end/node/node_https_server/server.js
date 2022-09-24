const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('./localhost-key.pem'),
  cert: fs.readFileSync('./localhost.pem'),
};

https
  .createServer(options, (req, res) => {
    res.write(fs.readFileSync('./index.html'));
    res.end();
  })
  .listen(3000, () => {
    console.log(`Server listen at https://localhost:${3000}`);
  });
