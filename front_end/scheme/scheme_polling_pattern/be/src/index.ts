import Koa from 'koa';
import Router from '@koa/router';
import cors from '@koa/cors';
import koaBody from 'koa-body';

const app = new Koa();
const router = new Router();

app.use(koaBody());

// logger
app.use(async (ctx, next) => {
  await next();
  const responseTime = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${responseTime}`);
});

// X-Response-Time
app.use(async (ctx, next) => {
  const startTime = Date.now();
  await next();
  const responseTime = Date.now() - startTime;
  ctx.set('X-Response-Time', `${responseTime}ms`);
});

router.get('/greeting', async (ctx) => {
  ctx.body = { message: 'Hello World' };
});

interface IPollingParams {
  pageNo: number;
  pageSize: number;
}

interface IPollingPagination {
  pageNo: number;
  pageSize: number;
  total: number;
  hasFinish: boolean;
}

interface IPollingResponse {
  data: number[];
  pagination: IPollingPagination;
}

const TOTAL = 100; // 0 .. 99

const genData = (from: number, to: number): number[] => {
  if (from >= TOTAL) {
    return [];
  } else if (to >= TOTAL) {
    return Array.from(Array(TOTAL - from), (_, index) => index + from);
  } else {
    return Array.from(Array(to - from), (_, index) => index + from);
  }
};

router.post('/polling', async (ctx) => {
  console.log('ctx.request.body', ctx.request.body);
  const { pageNo, pageSize } = ctx.request.body as IPollingParams;
  console.log('pageNo', pageNo);
  console.log('pageSize', pageSize);
  const from = (pageNo - 1) * pageSize;
  const to = pageNo * pageSize;
  console.log('from', from);
  console.log('to', to);

  const responseBody: IPollingResponse = {
    data: genData(from, to),
    pagination: {
      pageNo,
      pageSize,
      total: TOTAL,
      hasFinish: to >= TOTAL,
    },
  };

  ctx.body = responseBody;
});

app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Koa app listen at http://localhost:${PORT}`);
});
