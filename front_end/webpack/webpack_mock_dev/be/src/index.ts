import chalk from 'chalk';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  res.send({ msg: 'Hello World' });
});

app.get('/test1', (req, res, next) => {
  res.send({ code: 1, msg: 'test 1 response' });
});

app.get('/test2', (req, res, next) => {
  res.send({ code: 2, msg: 'test 2 response' });
});

app.post('/test3', (req, res, next) => {
  res.send({ code: 3, msg: 'test 3 response', body: req.body });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.clear();
  console.log(chalk.bold('start express server ...'));
  console.log(`express listen at http://localhost:${PORT}`);
});
