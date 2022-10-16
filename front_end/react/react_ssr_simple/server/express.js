const fs = require('fs');
const path = require('path');

const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

// create express application
const app = express();

// serve static assets
app.get(
  /\.(js|css|map|ico)$/,
  express.static(path.resolve(__dirname, '../dist'))
);

// for any other requests, send `index.html` as a response
app.use('^/$', (req, res) => {
  console.log(`req.path ${req.path}`);

  console.log('Request index.html');

  const { default: App } = require('../src/App.tsx');

  // read `index.html` file
  let indexHTML = fs.readFileSync(
    path.resolve(__dirname, '../dist/index.html'),
    { encoding: 'utf8' }
  );

  const html = ReactDOMServer.renderToString(<App />);

  indexHTML = indexHTML.replace(
    '<div id="app"></div>',
    `<div id="app">${html}</div>`
  );

  // set header and status
  res.contentType('text/html');
  res.status(200);

  return res.send(indexHTML);
});

// run express server on port 9000
app.listen(9000, () => {
  console.log('Express server started at http://localhost:9000');
});
