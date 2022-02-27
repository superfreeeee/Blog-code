const express = require('express');

const createServer = (ports) => {
  const countMap = {}; // port => count

  ports.forEach((port, i) => {
    const id = i + 1;

    const app = express();

    let count = 0;
    app.get('/', (req, res) => {
      count += 1;
      countMap[id] = count;
      res.send({
        server: id,
        count: countMap,
      });
    });

    app.listen(port, () => {
      console.log(`server${id} listen on http://localhost:${port}`);
    });
  });
};

createServer([8081, 8082, 8083]);
