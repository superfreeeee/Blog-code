import { logDevServer } from '../libs/logger';
import db from '../libs/mysql';
import { createRouter } from '../libs/router';

const router = createRouter();

router.prefix('/logger');

router.get('/all', async (ctx, next) => {
  const dataList = await db.query('select * from log');
  (dataList as any[]).forEach((data) => {
    data.create_time = new Date(data.create_time).getTime();
  });
  ctx.body = dataList;
});

router.post('/add', async (ctx, next) => {
  const model = ctx.request.body;
  logDevServer('model', model);
  const { app, env } = model;
  try {
    const stmt = `insert into log (app, env) values ("${app}", "${env}")`;
    logDevServer('stmt', stmt);
    await db.query(stmt);
    ctx.body = { success: true };
  } catch (e) {
    ctx.body = {
      success: false,
      msg: e,
    };
  }
});

export default router;
