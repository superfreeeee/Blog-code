import path from 'path';
import Koa from 'koa';
import koaCors from '@koa/cors';
import koaBody from 'koa-body';
import koaJson from 'koa-json';
import koaLogger from 'koa-logger';
import koaStatic from 'koa-static';

import indexRouter from './routes';
import logRouter from './routes/log';

const app = new Koa();

// middlewares
app
  .use(koaCors())
  .use(
    koaBody({
      multipart: true,
      // encoding: 'gzip',
      formidable: {
        uploadDir: path.resolve(__dirname, '/public/upload/'),
        keepExtensions: true,
        maxFieldsSize: 2 * 1024 * 1024, // 2MB
      },
    })
  )
  .use(koaJson())
  .use(koaLogger())
  .use(koaStatic(path.resolve(__dirname, '/public')));

// routes
app.use(indexRouter.routes()).use(logRouter.routes());

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

export default app;
