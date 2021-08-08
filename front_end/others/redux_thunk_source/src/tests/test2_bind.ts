import { bindActionCreators } from 'redux';
import createStore from '../createStore';
import * as timerActions from '../timer/actions';
import { bindLogStore } from '../utils';

const store = createStore();

const logStore = bindLogStore(store);

logStore('init');

const { increment, reset } = bindActionCreators(timerActions, store.dispatch);

increment();

logStore();

increment();
increment();
increment();

logStore();

reset();

logStore();
