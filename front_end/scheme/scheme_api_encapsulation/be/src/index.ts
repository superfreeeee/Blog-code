import express from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import chalk from 'chalk';

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

/**
 * 接口一
 */
app.get('/', (req, res, next) => {
  res.send('Hello World');
});

/**
 * 接口二
 */
enum ECreateType {
  Increment = 'increment',
  RESET = 'reset',
}

let id = 0;

app.post('/create', (req, res, next) => {
  const { type }: { type: ECreateType } = req.body;
  switch (type) {
    case ECreateType.Increment:
      id++;
      break;
    case ECreateType.RESET:
      id = 0;
      break;
    default:
      break;
  }
  res.send({ code: 200, id });
});

/**
 * 接口三
 */
app.post('/error', (req, res, next) => {
  const { success }: { success: boolean } = req.body;
  if (success) {
    res.send({ code: 200, msg: 'success' });
  } else {
    res.status(500);
    res.send({ code: 500, msg: 'fail' });
  }
});

/**
 * 启动服务
 */
const PORT = 3001;

app.listen(PORT, () => {
  console.clear();
  console.log(
    chalk.bold(`>>> start express server ${process.env.npm_package_version}`)
  );
  console.log();
  const localUrl = chalk.cyan(`http://localhost:${PORT}`);
  console.log(`    server listen at: ${localUrl}`);
});
