import { createRouter } from '../libs/router';

const router = createRouter();

router.get('/', async (ctx, next) => {
  ctx.body = 'welcome koa2';
});

router.get('/string', async (ctx) => {
  ctx.body = 'welcome koa2 in string';
});

router.get('/json', async (ctx, next) => {
  ctx.body = {
    tag: 'welcome koa2 in json',
  };
});

export default router;
