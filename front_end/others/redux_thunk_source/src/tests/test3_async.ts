import { bindActionCreators } from 'redux';
import createStore from '../createStore';
import * as timerActions from '../timer/actions';
import { bindLogStore } from '../utils';

const store = createStore();

const logStore = bindLogStore(store);

logStore('init');

const { incrementAsync, resetAsync } = bindActionCreators(
  timerActions,
  store.dispatch
);

async function task() {
  const DELAY = 1000;
  await incrementAsync(DELAY);

  logStore();

  await incrementAsync(DELAY / 3);
  await incrementAsync(DELAY / 3);
  await incrementAsync(DELAY / 3);

  logStore();

  await resetAsync(DELAY);

  logStore();
}

task();
