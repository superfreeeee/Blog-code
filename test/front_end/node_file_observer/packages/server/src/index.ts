import express from 'express';
import expressWs from 'express-ws';

import { useMiddleware } from './devServer';

const app = express();
const { app: appWs } = expressWs(app);

app.use('/ws', require('./routers/ws'));

useMiddleware(appWs);

app.get('/', (req, res, next) => {
  res.send('Hello World!');
});

app.listen(3000);
