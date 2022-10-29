const fs = require('fs');
const path = require('path');

const Koa = require('koa');
const Router = require('@koa/router');
const static = require('koa-static');

const app = new Koa();
const router = new Router();

router.get('/data', async (ctx, next) => {
  console.log('start fetch data');

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

  const dataPath = path.resolve(__dirname, './assets/bigdata.json');

  /**
   * Read and return json
   */
  // const content = JSON.parse(fs.readFileSync(dataPath));

  // ctx.headers['content-type'] = 'application/json';
  // ctx.body = content;

  /**
   * Return stream
   */
  ctx.body = fs.createReadStream(dataPath);

  console.log('finish fetch data');
});

app
  .use(static(path.resolve(__dirname, '../public')))
  .use(async (ctx, next) => {
    const startTime = performance.now();
    await next();
    const endTime = performance.now();
    console.log(`>>> Request process: ${endTime - startTime}`);
  })
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(9000);
