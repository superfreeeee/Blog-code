import express from 'express';

import { tryParse } from '../utils';

const wsRouter = express.Router();

wsRouter.ws('/', (ws, req, next) => {
  console.log(`on connecting`);

  // ws.send({ msg: 'Hello Client' });

  ws.on('open', (...args) => {
    console.log(`on open`, args);

    // ws.send('Hello I see you');
  });

  ws.on('message', (msg: string) => {
    const data = tryParse(msg);

    console.log(`on message`, data);

    if (data.count) {
      ws.send(JSON.stringify({ msg: `Receive Message ${data.count}` }));
    }
  });

  ws.on('error', (err) => {
    console.log(`on error`, err);
  });
});

module.exports = wsRouter;
